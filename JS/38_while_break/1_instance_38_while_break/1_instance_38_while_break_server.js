var http = require('http');
var fs = require('fs');
var route = require('url');
const querystring = require('querystring');

function handleServer(req, res){
    var path = route.parse(req.url, true);

    if(req.url === '/'){
        res.writeHead(200, {"Content-Type" : "text/html"});
        fs.createReadStream('./index.html').pipe(res);
    }else if(path.pathname === '/query/'){
        console.log(req.method);

        //PATTERN CODE {1} 
        const parsed = route.parse(req.url);
        const query  = querystring.parse(parsed.query);
        let b = query.name;

        res.writeHead(200, {"Content-Type" : "text/html"});
        res.write(F(b));
        res.end();

    }else{
        res.writeHead(404, {"Content-Type": "text/plain"});
        res.end('Page not found');
    }
}

http.createServer(handleServer).listen(8080);
console.log('Server running on port 8080.');

//PATTERN CODE {2}
function F(val){
    let return_value='returned_value';
    let index = 0;
    while(true){
        index ++;
        if(index === 1){
            break;
        }
        //dead code
        return_value = val;
    }
    return return_value;
}

