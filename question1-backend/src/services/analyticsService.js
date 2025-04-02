const testApiService = require('./testApiService');

let cache = {
    users: null,
    posts: null,
    userPostCounts: null,
    lastFetchTime: 0,
};
const CACHE_DURATION = 5 * 60 * 1000;

const needsRefresh = () => !cache.lastFetchTime || (Date.now() - cache.lastFetchTime > CACHE_DURATION);

const fetchAndProcessAllData = async () => {
    console.log('Refreshing all data from test server...');
    const startTime = Date.now();

    
    const usersData = await testApiService.getUsers();
    const userIds = Object.keys(usersData);
    cache.users = usersData;

    
    const postPromises = userIds.map(id => testApiService.getPostsForUser(id));
    const userPostsArray = await Promise.all(postPromises);
    const allPosts = userPostsArray.flat(); 

    
    cache.userPostCounts = userIds.reduce((acc, userId) => {
        acc[userId] = 0;
        return acc;
    }, {});
    allPosts.forEach(post => {
        if (cache.userPostCounts[post.userid] !== undefined) {
            cache.userPostCounts[post.userid]++;
        }
    });

    
    cache.posts = {};
    const commentPromises = allPosts.map(async (post) => {
        const comments = await testApiService.getCommentsForPost(post.id);
        
         cache.posts[post.id] = {
            id: post.id,
            userId: post.userid,
            content: post.content,
            commentCount: comments.length,
            timestamp: Date.now(),
            
            userName: cache.users[post.userid] || 'Unknown User'
        };
    });
    await Promise.all(commentPromises);

    cache.lastFetchTime = Date.now();
    console.log(`Data refresh completed in ${Date.now() - startTime}ms.`);
};

const getTopUsers = async () => {
    if (needsRefresh()) {
        await fetchAndProcessAllData();
    }
    if (!cache.userPostCounts || !cache.users) {
         throw new Error("Data not available");
    }

    const sortedUserIds = Object.keys(cache.userPostCounts).sort(
        (a, b) => cache.userPostCounts[b] - cache.userPostCounts[a]
    );

    const top5UserIds = sortedUserIds.slice(0, 5);

    return top5UserIds.map(id => ({
        id: id,
        name: cache.users[id] || 'Unknown User', 
        postCount: cache.userPostCounts[id],
    }));
};

const getLatestPosts = async (count = 5) => {
     if (needsRefresh()) {
        await fetchAndProcessAllData();
    }
     if (!cache.posts) {
         throw new Error("Data not available");
    }

    
    const sortedPosts = Object.values(cache.posts).sort((a, b) => b.id - a.id);

    return sortedPosts.slice(0, count);
};

const getPopularPosts = async () => {
    if (needsRefresh()) {
        await fetchAndProcessAllData();
    }
    if (!cache.posts) {
         throw new Error("Data not available");
    }

    const postsArray = Object.values(cache.posts);
    if (postsArray.length === 0) return [];

    let maxComments = -1;
    postsArray.forEach(post => {
        if (post.commentCount > maxComments) {
            maxComments = post.commentCount;
        }
    });

    const popularPosts = postsArray.filter(post => post.commentCount === maxComments);

    return popularPosts;
};

module.exports = {
    getTopUsers,
    getLatestPosts,
    getPopularPosts,
};