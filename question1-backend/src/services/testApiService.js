const config = require('../config');
const { makeRequest } = require('../utils/helpers');
const { getAuthToken } = require('./authService');

const makeAuthenticatedRequest = async (path, options = {}) => {
    const token = await getAuthToken();
    if (!token) {
        throw new Error('Authentication failed, cannot get token.');
    }
    const url = `${config.testServerBaseUrl}${path}`;
    const requestOptions = {
        ...options,
        headers: {
            ...options.headers,
            'Authorization': `Bearer ${token}`,
        },
    };
    return makeRequest(url, requestOptions);
};

const getUsers = async () => {
    const response = await makeAuthenticatedRequest('/users');
    return response.body.users || {}; 
};

const getPostsForUser = async (userId) => {
    try {
        const response = await makeAuthenticatedRequest(`/users/${userId}/posts`);
        return response.body.posts || []; 
    } catch (error) {
        console.error(`Error fetching posts for user ${userId}: ${error.message}`);
        return []; 
    }
};

const getCommentsForPost = async (postId) => {
     try {
        const response = await makeAuthenticatedRequest(`/posts/${postId}/comments`);
        return response.body.comments || [];
     } catch (error) {
        console.error(`Error fetching comments for post ${postId}: ${error.message}`);
        return []; 
     }
};

module.exports = { getUsers, getPostsForUser, getCommentsForPost };