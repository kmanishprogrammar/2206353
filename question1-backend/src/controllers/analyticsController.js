const analyticsService = require('../services/analyticsService');

const handleGetTopUsers = async (req, res) => {
    try {
        const start = process.hrtime();
        const topUsers = await analyticsService.getTopUsers();
        const diff = process.hrtime(start);
        const responseTime = (diff[0] * 1e9 + diff[1]) / 1e6;
         console.log(`[${req.method} ${req.path}] Response Time: ${responseTime.toFixed(3)} ms`);
        res.json({ users: topUsers, responseTimeMs: responseTime });
    } catch (error) {
        console.error("Error in getTopUsers:", error);
        res.status(500).json({ error: 'Failed to fetch top users', details: error.message });
    }
};

const handleGetPosts = async (req, res) => {
    const type = req.query.type;
    try {
         const start = process.hrtime();
        let posts;
        if (type === 'latest') {
            posts = await analyticsService.getLatestPosts(5);
        } else if (type === 'popular') {
            posts = await analyticsService.getPopularPosts();
        } else {
            return res.status(400).json({ error: 'Invalid type query parameter. Use "latest" or "popular".' });
        }
         const diff = process.hrtime(start);
        const responseTime = (diff[0] * 1e9 + diff[1]) / 1e6;
        console.log(`[${req.method} ${req.path}?type=${type}] Response Time: ${responseTime.toFixed(3)} ms`);
        res.json({ posts: posts, responseTimeMs: responseTime });
    } catch (error) {
        console.error(`Error in getPosts (type: ${type}):`, error);
        res.status(500).json({ error: 'Failed to fetch posts', details: error.message });
    }
};


module.exports = {
    handleGetTopUsers,
    handleGetPosts,
};