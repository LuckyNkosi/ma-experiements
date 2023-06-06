const airtable = require('airtable');
const { get } = require('express/lib/response');
console.log('key', process.env.AIRTABLE_API_KEY);

airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: process.env.AIRTABLE_API_KEY,
});

const base = airtable.base(`${process.env.AIRTABLE_BASE}`);
// let participantIdLookup = null;
const getData = (tableName) => {
    return new Promise((resolve, reject) => {
        base(tableName).select({
            // Selecting the first 3 records in Grid view:
            // maxRecords: 3,
            view: "Grid view"
        }).firstPage((err, records) => {
            if (err) {
                console.error(err);
                reject(err);
                return;
            }
            const data = records.map((record) => { return { ...record.fields, id: record.id } });
            resolve(data);
        });
    });
};

const postData = (tableName, data) => {
    return new Promise((resolve, reject) => {
        let dataToPost = data;
        //if array, map to array of objects
        if (Array.isArray(data))
            dataToPost = data.map((d) => { return { fields: d } });
        base(tableName).create(dataToPost, (err, record) => {
            if (err) {
                console.error(err);
                reject(err);
                return;
            }
            let response = Array.isArray(record)
                ? record.map((r) => { return { id: r.id, ...r.fields } })
                : { id: record.id, ...record.fields };
            resolve(response);
        });
    });
}


const updateData = async (tableName, id, data) => {

    return new Promise((resolve, reject) => {
        base(tableName).update(id, data, (err, record) => {
            if (err) {
                console.error(err);
                reject(err);
                throw err;
                return;
            }
            console.log('record', record);
            resolve({
                id: record.id, ...record.fields
            });
        })
    });
};

module.exports = { getData, postData, updateData }