// Dependencies
var fs = require('fs');
var url = require('url');
var http = require('http');
var exec = require('child_process').exec;
var spawn = require('child_process').spawn;

// App variables
var file_url = 'http://upload.wikimedia.org/wikipedia/commons/4/4f/Big%26Small_edit_1.jpg';
var file_url = getUrl();
var DOWNLOAD_DIR = './downloads/';

// We will be downloading the files to a directory, so make sure it's there
// This step is not required if you have manually created the directory
var mkdir = 'mkdir -p ' + DOWNLOAD_DIR;
var child = exec(mkdir, function(err, stdout, stderr) {
    if (err) throw err;
    else download_file_httpget(file_url);
});

// Function to download file using HTTP.get
var download_file_httpget = function(file_url) {
var options = {
    host: url.parse(file_url).host,
    port: 80,
    path: url.parse(file_url).pathname
};

var file_name = url.parse(file_url).pathname.split('/').pop();
var file = fs.createWriteStream(DOWNLOAD_DIR + file_name);

http.get(options, function(res) {
    res.on('data', function(data) {
            file.write(data);
        }).on('end', function() {
            file.end();
            console.log(file_name + ' downloaded to ' + DOWNLOAD_DIR);
        });
    });
};

function getUrl(){
    var url = "http://pages.amazonservices.com/dc/CYxPtcEaQCTuvbIlCKyYXwFr0_IbQXE4VjabnLqA8niXypEz7SAmx8RSNzK8i-";
    var randomstring = "b49gF0QkPaJGPt2rGJHYitcGOTp8WvUylgnQieHUQEzgHuAB6r9jnLnLjTKZGQgNm_a92KAbu4uZhtLCiYAh80_OV_YKr3ujPj4rbIZSdmS24=/R00ODj2R5o0030sfGOW28P1";
    return url+randomstring;

}
