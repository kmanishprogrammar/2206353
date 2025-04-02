const express = require('express');
const cors = require('cors'); 
const config = require('./src/config');
const apiRoutes = require('./src/routes');

const app = express();

app.use(cors({
    origin: 'http://localhost:3000' 
}));


app.use(express.json()); 

app.use('/', apiRoutes);

app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

app.listen(config.port, () => {
    console.log(`Backend server running on http://localhost:${config.port}`);
});