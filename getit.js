// Dependencies
var fs = require('fs');
var url = require('url');
var re = require("request-enhanced");
var exec = require('child_process').exec;
var cheerio = require('cheerio');

//107 and 23

// App variables

var DOWNLOAD_DIR = './downloads/';

// We will be downloading the files to a directory, so make sure it's there
// This step is not required if you have manually created the directory
var mkdir = 'mkdir -p ' + DOWNLOAD_DIR;
file_urls = getUrls(500000);
var child = exec(mkdir, function(err, stdout, stderr) {
    if (err){ conosle.log("error on makedir");}
    else {
        var j = 1;
        file_urls.forEach(function(file_url){
            download_file_httpget(file_url, j);
            j +=1;
        });
    }
});

// Function to download file using HTTP.get
var download_file_httpget = function(file_url, count) {
    var options = {
        url: file_url,
        timeout: 1,
        followRedirect: false,
        maxRedirects: 0,
        headers:{
            'User-Agent':'test mapper'
        },
        pool: { // request's default pool parameter
            maxSockets: Infinity // request's max sockets is set to Infinity to allow request-enhanced to control pooling
        }
    };


    re.get(options, function(error, response){
        //console.log(options.url);
        if(error){
            thisContent = error.code;
            //if(count % 100 == 0){
                console.log("error on getting" + count);
            //}
        } else {
            $= cheerio.load(response, {ingoreWhitespace:true});
            var thisContent = $('script');
            if(thisContent.text().length > 0 && thisContent.text().indexOf("amazon") !== -1){
                var file_name = url.parse(file_url).pathname.split('/').pop();
                var file = fs.createWriteStream(DOWNLOAD_DIR + file_name);
                console.log("found one!");
                file.write(thisContent.text());
            } else {
                console.log("no script present");
            }
        }   
    });
};

function getUrls(num){
    var urls = [];
    var primaryurl  = "http://pages.amazonservices.com/dc/CYxPtcEaQCTuvbIlCKyYXwFr0_IbQXE4VjabnLqA8niXypEz7SAmx8RSNzK8i-b4";
    var eqoperator  =  "=/" ;

    for(var i = 0; i < num; i++){
        urls.push(primaryurl + makeid(107) + eqoperator + makeid(27));
    };
    return urls;
}

function makeid(length){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-";

    for( var i=0; i < length; i++ ){
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}
