import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import ChatBoxReciever, { ChatBoxSender } from "./ChatBox";
import InputText from "./InputText";
import UserLogin from "./UserLogin";

export default function ChatContainer() {
  let socketio = socketIOClient("http://localhost:8000");
  const [chats, setChats] = useState([]);
  const [user, setUser] = useState(localStorage.getItem("user"));
  const avatar = localStorage.getItem("avatar");

  // 재렌더링시마다 chat 요청을 받아서 보낸 말들을 chats에 저장
  useEffect(() => {
    socketio.on("chat", (senderCharts) => {
      setChats(senderCharts);
    });
  });

  // chat에다가 한 말 써서 내보내기
  function sendChatToSocket(chat) {
    socketio.emit("chat", chat);
  }

  function addMessage(chat) {
    const newChat = { ...chat, user, avatar };
    // 안에 있었던 모든 것들 다 갖고 와서 붙임
    setChats([...chats, newChat]);
    // 서버에 보내줌
    sendChatToSocket([...chats, newChat]);
  }

  // 로그아웃시 다른 유저가 판별하려고 storage비우기
  function logout() {
    localStorage.clear();
    setUser("");
  }

  function ChatsList() {
    return chats.map((chat, i) => {
      if (chat.user === user) return <ChatBoxSender key={i} message={chat.message} avatar={chat.avatar} user={chat.user} />;
      return <ChatBoxReciever key={i} message={chat.message} avatar={chat.avatar} user={chat.user} />;
    });
  }

  return (
    <div>
      {user ? ( // 등록 해놨던 유저라면 상단바와 대화창 다 불러오기
        <div>
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
            <h4>닉네임: {user}</h4>
            <p onClick={() => logout()} style={{ color: "blue", cursor: "pointer" }}>
              로그아웃
            </p>
          </div>
          <ChatsList />

          <InputText addMessage={addMessage} />
        </div>
      ) : (
        // 등록돼있던 유저 아니라면 Login창
        <UserLogin setUser={setUser} />
      )}
    </div>
  );
}
