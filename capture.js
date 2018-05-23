var http = require('http');
http.createServer(function (req, res) {
    console.log('=================================================');
    console.log('Request at : ' + new Date());
    console.log('METHOD  : ' + req.method);
    console.log('URL     : ' + req.url);

    var hdr_names = Object.keys(req.headers);
    for(var hdrn in hdr_names) {
        console.log('HEADER  : ' + hdr_names[hdrn] + ' : ' + req.headers[hdr_names[hdrn]]);
    }

    if(req.method === 'POST') {
        extract_post_data(req, res, function(post_data) {
            console.log('BODY    : ' + post_data);
            console.log('=================================================');
            res.writeHead(200, 'OK', {'Content-Type': 'text/plain'});
            res.end();
        });
    } else {
        console.log('=================================================');
        res.writeHead(200, 'OK', {'Content-Type': 'text/plain'});
        res.end();
    }
}).listen(9599, '127.0.0.1');
console.log('Server running at http://127.0.0.1:9599/');

function extract_post_data(req, res, cb) {
    var post_data = '';
    if(typeof(cb) !== 'function') {
        return null;
    }

    if(req.method === 'POST') {
        req.on('data', function(data) {
            post_data += data;
        });

        req.on('end', function() {
            cb(post_data);
        });
    } else {
        return null;
    }
}
