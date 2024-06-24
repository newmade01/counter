var http = require("http");
var count = 0;
//var fs = require("fs");
var redis = require("redis");

http
  .createServer(function (request, response) {
    var redisClient = redis.createClient({
      url: "redis://redis-0.redis.default.svc.cluster.local:6379", //redis-0로 직접 명령을 요청 가능
      legacyMode: true,
    });
    redisClient.connect();

    redisClient.incr("count", function (err, count) {
      //redis-0 pod에 master에만 요청해야함
      //redis는 키 값 count를 저장
      response.writeHead(200, { "Content-Type": "text/plain" });
      response.end(count.toString());
    });
  })
  .listen(8082);

console.log("Server running at http://127.0.0.1:8082/");
