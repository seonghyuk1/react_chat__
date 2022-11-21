const express = require("express");
const app = express();
const path = require("path");

const http = require("http");
const Server = require("socket.io").Server;

// emit 데이터를 보내는 함수
// on 데이터를 받는 함수

// server에 http담아서
const server = http.createServer(app);
// 소켓 뚫기
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
const _dirname = path.dirname("");
const buildPath = path.join(_dirname, "../client/build");
app.use(express.static(buildPath));

server.listen(8000, () => console.log("8000에서 돌아가는 중"));

io.on("connection", (socket) => {
  // 연결시
  console.log("연결 되었습니다.");
  // 연결 해제시
  socket.on("disconnect", () => {
    console.log("연결 해제!");
  });

  // chat이벤트를 받으면 받은 말들을 전체에 뿌려주세요
  socket.on("chat", (data) => {
    io.emit("chat", data);
  });
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"), function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});
