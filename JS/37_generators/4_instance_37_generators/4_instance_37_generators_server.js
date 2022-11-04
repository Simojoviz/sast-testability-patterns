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
        //it takes element from a form 
        const parsed = route.parse(req.url);
        const query  = querystring.parse(parsed.query);
        var b_to_func = query.name;
        var generator = gen_one_to_three(b_to_func);
        res.writeHead(200, {"Content-Type" : "text/html"});
	    res.write(generator.next().value); 
	    res.write(generator.next().value); 
	    res.write(generator.next().value); 
        res.end();        
            
    }else{
        res.writeHead(404, {"Content-Type": "text/plain"});
        res.end('Page not found');
    }
}

http.createServer(handleServer).listen(8080);
console.log('Server running on port 8080.');

//PATTERN CODE {2}
function *gen_one_to_three(b) {
	yield 'safe1';
	yield 'safe2';
	return b;
}

