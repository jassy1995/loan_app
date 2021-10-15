import React, { useState, useEffect } from "react";
import { customAxios } from "../../axiosAuth";

function UserMessage() {
  let [messages, setMessages] = useState([]);

  useEffect(() => {
    customAxios
      .get("user/message")
      .then((res) => {
        if (res.data.messages) {
          setMessages(res.data.messages);
        }
      })
      .catch((err) => console.log(err));
  }, [messages]);
  return (
    <>
      <main>
        <div className="container  mt-4">
          {messages?.length > 0 ? (
            messages?.map((message, index) => (
              <ul key={index}>
                <li>
                  {message.message}
                  <span className="ml-3  text-primary">
                    {new Date(message.date).toLocaleDateString()}
                  </span>
                </li>
                <hr />
              </ul>
            ))
          ) : (
            <div>loading...</div>
          )}
        </div>
      </main>
    </>
  );
}

export default UserMessage;
