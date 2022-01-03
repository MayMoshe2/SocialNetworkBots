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
            const userId = req.params["id"];
            if(data[userId]){
                delete data[userId];
            }
            data[userId] = req.body;
            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send('user Updated');
            });
        },
            true);
    }   
};