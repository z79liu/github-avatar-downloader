var request = require('request');
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
  for (login of result) {
    console.log(login.avatar_url)
  }
  // console.log("Errors:", err);
  // console.log("Result:", result);
});