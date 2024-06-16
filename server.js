var http = require("http");
var count = 0;

var fs = require("fs");

http
  .createServer(function (request, response) {
    fs.readFile("count.txt", function (err, data) {
      if (data) count = parseInt(data);
      count = count + 1;
      fs.writeFileSync("count.txt", count.toString());
    });

    response.writeHead(200, { "Content-Type": "text/plain" });
    response.end(count.toString());
  })
  .listen(8081);

console.log("Server running at http://127.0.0.1:8081/");
