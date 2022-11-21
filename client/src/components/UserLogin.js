import React, { useState } from "react";
import _ from "lodash";

const button = {
  width: "10%",
  height: 50,
  fontWeight: "bold",
  borderRadius: 10,
  fontSize: 18,
  backgroundColor: "#075e54",
  borderWidth: 0,
  color: "#fff",
  margin: 10,
};

export default function UserLogin({ setUser }) {
  const [user, setAUser] = useState("");

  // 로그인 버튼 클릭시
  function handleSetUser() {
    if (!user) {
      // 유저 아니라면 아니라고
      console.log("너 유저 아니잖아!");
    }
    // Props로 받아온 변수에 유저 정보에 담아주고 localStorage에 저장
    localStorage.setItem("user", user);
    setUser(user);
    localStorage.setItem("avatar", `https://picsum.photos/id/${_.random(1, 500)}/200/300`);
  }

  return (
    <div>
      <h1 style={{ margin: 10, textAlign: "center" }}>Super Chat </h1>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <input style={{ margin: 10, height: 30, width: "25%", borderRadius: 10, borderWidth: 10, fontSize: 15, paddingInline: 5 }} value={user} onChange={(e) => setAUser(e.target.value)} placeholder="사용할 닉네임을 입력하세요."></input>
        <button onClick={() => handleSetUser()} style={button}>
          로그인
        </button>
      </div>
    </div>
  );
}
