const express = require('express');
const { logger } = require('./core/logger');

const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
app.use('/drone', express.static(path.join(__dirname, 'drone')));
app.post('/log', (req, res) => {
    console.log('here', req.body);
    logger.info(req.body);
    res.json({ res: 'ok' });
})
app.listen(PORT, () => {
    logger.warn('App Started:// Ziyakhala ke manje 💫');
    logger.info(`http://localhost:${PORT}`);
});
