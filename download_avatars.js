var request = require('request');
var fs = require('fs');


var secret = require('./secrets.js')
console.log(secret)
console.log('Welcome to the GitHub Avatar Downloader!');


function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': secret.GITHUB_TOKEN
    }
  };


  request(options, function(err, res, body) {
    let data = JSON.parse(body);
    cb(err, data);

  });
}


getRepoContributors("jquery", "jquery", function(err, result) {
  for (individuals of result) {
    downloadImageByURL(individuals.avatar_url,"avatars/" + individuals.login+ '.jpg')
  }
  // console.log("Errors:", err);
  // console.log("Result:", result);
});

function downloadImageByURL(url, filePath) {
  request.get(url)               // Note 1
       .on('error', function (err) {                                   // Note 2
         throw err;
       })
       .on('response', function (response) {                           // Note 3
         console.log('Response Status Code: ', response.statusCode);
       })
       .pipe(fs.createWriteStream(filePath));
}

downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg")

