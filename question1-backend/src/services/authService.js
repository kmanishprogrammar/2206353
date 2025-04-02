const config = require('../config');
const { makeRequest } = require('../utils/helpers');

let tokenCache = {
    accessToken: null,
    expiresAt: 0,
};

const getAuthToken = async () => {
    const now = Date.now();
    if (!tokenCache.accessToken || tokenCache.expiresAt < now + 60000) {
        console.log('Fetching new auth token...');
        try {
            const authUrl = `${config.testServerBaseUrl}/auth`;
            // THIS PAYLOAD MUST MATCH THE /auth REQUEST BODY STRUCTURE
            const payload = {
                email: config.userEmail,
                name: config.userName,        // Ensure this field is included
                rollNo: config.rollNo,
                accessCode: config.accessCode,
                clientID: config.clientId,     // Key MUST be 'clientID'
                clientSecret: config.clientSecret // Key MUST be 'clientSecret'
            };
            const response = await makeRequest(authUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            }, payload); // Send the payload as the third argument

            if (response.body.token_type === 'Bearer' && response.body.access_token) {
                tokenCache.accessToken = response.body.access_token;
                tokenCache.expiresAt = now + (response.body.expires_in * 1000) - 60000;
                 console.log('New auth token obtained.');
            } else {
                throw new Error('Invalid token response format');
            }
        } catch (error) {
            console.error('Error fetching auth token:', error.message);
            tokenCache.accessToken = null; 
            tokenCache.expiresAt = 0;
            throw error; 
        }
    }
    return tokenCache.accessToken;
};

module.exports = { getAuthToken };