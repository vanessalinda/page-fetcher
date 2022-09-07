const request = require("request");
const fs = require("fs");
const args = process.argv.slice(2);
const [url, filePath] = args;

const requestAndSaveFile = (url, filePath, functionToRunWhenDone) => {
  request(url, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      functionToRunWhenDone(filePath, body);
    } else if (response.statusCode !== 200) {
      console.log(
        `Unfortunately, your file could not be written because we hit a ${response.statusCode}`
      );
      return;
    }
  });
};

const writeAndSaveFile = (filePath, text) => {
  fs.writeFile(filePath, text, (err) => {
    console.log(`Downloaded and saved ${text.length} bytes to ${filePath}`);
  });
};

requestAndSaveFile(url, filePath, writeAndSaveFile);
