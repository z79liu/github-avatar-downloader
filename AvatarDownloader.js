var request = require('request');
var fs = require('fs');

request.get('https://sytantris.github.io/http-examples/future.jpg')           // Note 1
       .on('error', function (err) {                                   // Note 2
         throw err;
       })
       .on('response', function (response) {
          console.log('Downloading image...')                         // Note 3
         console.log('Response Status Message: ', response.statusMessage)
         console.log('Response content type: ', response.headers['content-type'])
         console.log('Download complete.')
       })
       .pipe(fs.createWriteStream('./future.jpg'));