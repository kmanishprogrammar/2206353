require('dotenv').config();

module.exports = {
    testServerBaseUrl: process.env.TEST_SERVER_BASE_URL,
    userEmail: process.env.USER_EMAIL,
    userName: process.env.USER_NAME,     
    rollNo: process.env.ROLL_NO,
    accessCode: process.env.ACCESS_CODE,
    clientId: process.env.CLIENT_ID,     
    clientSecret: process.env.CLIENT_SECRET,
    port: process.env.PORT || 3001,
};
