const fs = require('fs');
// variables
const dataPath = './data/detailsFromUser.json';

// helper methods
const readFile = (callback, returnJson = false, filePath = dataPath, encoding = 'utf8') => {
    fs.readFile(filePath, encoding, (err, data) => {
            if (err) {
                console.log(err);
            }
            if (!data) data="{}";
            callback(returnJson ? JSON.parse(data) : data);
       });
};

const writeFile = (fileData, callback, filePath = dataPath, encoding = 'utf8') => {

        fs.writeFile(filePath, fileData, encoding, (err) => {
            if (err) {
                console.log(err);
            }
            callback();
        });
    };

    
    module.exports = {
                
    updateJson: function (req, res) 
    {
        readFile(data => {
            const tripId = req.params["id"];
            if(data[tripId]){
                delete data[tripId];
            }
            // if(!req.body) return res.status(400).send('Body is missing!');
            // if (!tripId) return res.status(400).send('Id is missing!');
            // if(data[tripId]) return res.status(400).send('tour already exists!');
            data[tripId] = req.body;
         
            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send('new tour added');
            });
        },
            true);
    }   
};
