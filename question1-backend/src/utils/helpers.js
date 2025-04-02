const https = require('https');
const http = require('http');

const makeRequest = (url, options = {}, postData = null) => {
    return new Promise((resolve, reject) => {
        const parsedUrl = new URL(url);
        const protocol = parsedUrl.protocol === 'https:' ? https : http;
        const requestOptions = {
            hostname: parsedUrl.hostname,
            port: parsedUrl.port || (protocol === https ? 443 : 80),
            path: parsedUrl.pathname + parsedUrl.search,
            method: options.method || 'GET',
            headers: options.headers || {},
        };

        console.log(`Making request: ${requestOptions.method} ${url}`); // Logging

        const req = protocol.request(requestOptions, (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                console.log(`Response status from ${url}: ${res.statusCode}`); // Logging
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    try {
                        resolve({ statusCode: res.statusCode, body: JSON.parse(data), headers: res.headers });
                    } catch (e) {
                         console.error(`Failed to parse JSON response from ${url}:`, data); // Logging
                        reject(new Error(`Failed to parse JSON response: ${e.message}`));
                    }
                } else {
                    console.error(`Request to ${url} failed with status ${res.statusCode}:`, data); // Logging
                    reject(new Error(`Request Failed. Status Code: ${res.statusCode}. Body: ${data}`));
                }
            });
        });

        req.on('error', (e) => {
            console.error(`Request error for ${url}:`, e); // Logging
            reject(e);
        });

        if (postData) {
            req.write(JSON.stringify(postData));
        }

        req.end();
    });
};

module.exports = { makeRequest };