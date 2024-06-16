var http = require("http");
var count = 0;
http
  .createServer(function (request, response) {
    count = count + 1;
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.end(count.toString());
  })
  .listen(8081);

console.log("Server running at http://127.0.0.1:8081/");
