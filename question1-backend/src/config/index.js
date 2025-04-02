// src/config/index.js
require('dotenv').config();

module.exports = {
    testServerBaseUrl: process.env.TEST_SERVER_BASE_URL,
    userEmail: process.env.USER_EMAIL,
    userName: process.env.USER_NAME,     // Make sure this line is present
    rollNo: process.env.ROLL_NO,
    accessCode: process.env.ACCESS_CODE,
    clientId: process.env.CLIENT_ID,     // Ensure this key ('clientId') is consistent
    clientSecret: process.env.CLIENT_SECRET, // Ensure this key ('clientSecret') is consistent
    port: process.env.PORT || 3001,
};