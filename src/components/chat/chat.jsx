import React, {useRef, useState, useEffect} from "react";
import "./chat.css";

export default function Chat({socket}) {
  const bottomRef = useRef(null);
  const messageRef = useRef(null);
  const [messageList, setMessageList] = useState([]);

  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((current) => [...current, data]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, [socket]);

  useEffect(() => {
    scrollDown();
  }, [messageList]);

  const handleSubmit = () => {
    if (!messageRef.current) return;

    const newMessage = messageRef.current.value;

    if (!newMessage.trim()) return;

    socket.emit("message", newMessage);
    clearInput();
    focusInput();
  };

  const clearInput = () => {
    if (messageRef.current) {
      messageRef.current.value = "";
      setInputValue("");
    }
  };

  const focusInput = () => {
    if (messageRef.current) {
      messageRef.current.focus();
    }
  };

  const getEnterKey = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const scrollDown = () => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({behavior: "smooth"});
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        <div className="chat-header">Bate Papo</div>
        <div className="chat-messages">
          {messageList.map((message, index) => (
            <div
              className={`chat-message ${
                message.authorId === socket.id ? "own-message" : "other-message"
              }`}
              key={index}
            >
              <div>
                <strong>{message.author}</strong>
              </div>
              <div>{message.text}</div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
        <div className="chat-input-container">
          <input
            ref={messageRef}
            placeholder="Mensagem"
            onKeyDown={(e) => getEnterKey(e)}
            className="chat-input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button className="chat-button" onClick={() => handleSubmit()}>
            Enviar Mensagem
          </button>
        </div>
      </div>
    </div>
  );
}