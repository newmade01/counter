var http = require("http");
var count = 0;
//var fs = require("fs");
var redis = require("redis");

http
  .createServer(function (request, response) {
    var redisClient = redis.createClient({
      url: "redis://redis.default.svc.cluster.local:6379", //redis-0로 직접 명령을 요청하지않고 read는 아무 pod에서도 가능하므로 서비스에 바로 요청해서 분배
      legacyMode: true,
    });
    redisClient.connect();

    redisClient.get("count", function (err, data) {
      //redis-0 master에만 요청해야함
      //redis는 키 값 count를 저장
      response.writeHead(200, { "Content-Type": "text/plain" });
      response.end(data);
    });

    /*
    var redisClient = redis.createClient({
      url: "redis://redis-0.redis.default.svc.cluster.local:6379", //redis-0로 직접 명령을 요청 가능
      legacyMode: true,
    });
    redisClient.connect();

    redisClient.incr("count", function (err, count) {   //redis-0 master에만 요청해야함
      //redis는 키 값 count를 저장

      response.writeHead(200, { "Content-Type": "text/plain" });
      response.end(count.toString());
    });

    //싱글쓰레드로 count가 증가하기 전에 콜백 함수가 실행될 수 있음
    //python도 기본으로 싱글쓰레드
    //response.writeHead(200, { "Content-Type": "text/plain" });
    //response.end(count.toString());
    */
  })
  .listen(8082);

console.log("Server running at http://127.0.0.1:8082/");
