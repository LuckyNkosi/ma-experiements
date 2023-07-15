// require('dotenv').config();
const express = require('express');
const { logger } = require('./core/logger');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const { getData, postData, updateData } = require('./data/airtable');
const { generateNewName } = require('./data/pseudoname');

const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());


app.use(express.static('public'));
app.use('/drone', express.static(path.join(__dirname, 'drone')));
app.use('/game', express.static(path.join(__dirname, 'asteroid')));

app.post('/logActivity', async (req, res) => {
    const { id, logKey, data } = req.body;
    const result = await updateData('Participants', id, { [logKey]: JSON.stringify(data) });
    res.json({ res: result });
})

app.get('/test', async (req, res) => {
    const result = await getData('Participants');
    res.json({ res: result });
});

app.post('/addParticipant', async (req, res) => {
    const { name } = req.body;
    const result = await postData('Participants', { name });
    res.json(result);
});

app.put('/test', async (req, res, next,) => {
    const { id, name, timeToCompleteDrone, restarts } = req.body;
    const result = await updateData('Participants', id, { restarts }).catch(next);
    if (result) res.json({ res: result });
});

app.get('/getName', async (req, res) => {
    const result = generateNewName();
    res.json({ result: result });
});

const errorHandling = (err, req, res, next) => {
    res.status(err.statusCode).json({
        message: err.message,
        success: false,
        statusCode: err.statusCode,
    });
};
app.use(errorHandling);

app.listen(PORT, () => {
    logger.warn('App Started:// Ziyakhala ke manje 💫');
    logger.info(`http://localhost:${PORT}`);
});
