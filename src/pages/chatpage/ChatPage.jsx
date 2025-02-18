import React, { useState } from 'react'
import Chat from '../..//components/chat/chat'
import Join from '../../components/join/Join'

function ChatPage() {
  const [chatVisibility, setChatVisibility] = useState(false);
  const [socket, setSocket] = useState(null);

  return (
    <div
      style={{display: "flex", justifyContent: "center", paddingTop: "20px"}}
    >
      {chatVisibility ? (
        <Chat socket={socket} />
      ) : (
        <Join setSocket={setSocket} setChatVisibility={setChatVisibility} />
      )}
    </div>
  );
}

export default ChatPage;