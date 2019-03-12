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

var repoOwner = process.argv[2]
var repoName = process.argv[3]
var inputlength = process.argv.length

if (inputlength === 3){
  console.log('ERROR: Please enter a repoName')
} else if (inputlength === 2){
  console.log('ERROR: Please enter repoOwner & repoName')
} else {getRepoContributors(repoOwner, repoName, function(err, result) {
  for (individuals of result) {
    downloadImageByURL(individuals.avatar_url,"avatars/" + individuals.login+ '.jpg')
  }
  // console.log("Errors:", err);
  // console.log("Result:", result);
});
}
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