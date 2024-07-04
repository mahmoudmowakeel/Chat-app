import { useDispatch, useSelector } from "react-redux";
import ChatIndicator from "./ChatIndicators";
import { useEffect, useReducer, useRef, useState } from "react";
import useSignalR from "../hooks/SignalR";
import { addGroupImage, addImage, resetImage } from "../slices/imageSlice";
import fetchAndConvertImageCode from "../data/getImageByCode";
import Spinner from "./Spinner";

export default function ChatInputs({ fUserName, toShow }) {
  const [newMessage, setNewMessage] = useState("");
  const messages = useSelector((state) => state.messages.content);
  const loadMessages = useSelector((state) => state.messages.chatLoading);
  const loadGroupMessages = useSelector(
    (state) => state.community.loadGroupChat
  );
  const userId = useSelector((state) => state.auth.user.userdata[0].Id);
  const receiverId = useSelector((state) => state.info.info[0].friendId);
  const username = useSelector((state) => state.auth.user.userdata[0].UserName);
  const imageId = useSelector((state) => state.image.id);
  const dispatch = useDispatch();
  const connection = useSignalR(userId);
  const groupInfo = useSelector((state) => state.info.info);
  const selectedGroupId = groupInfo.filter((item) => item.active === true)[0]
    .groupId;
  const groupMessages = useSelector((state) => state.community.groupMessages);

  const finalGroupMessages = groupMessages.map((msg) => ({
    ...msg,
    File:
      msg.File === null
        ? null
        : msg.File?.startsWith("blob")
        ? msg.File
        : fetchAndConvertImageCode(msg.File),
  }));
  const finalMessages = messages.map((msg) => ({
    ...msg,
    File:
      msg.File === null
        ? null
        : msg.File?.startsWith("blob")
        ? msg.File
        : fetchAndConvertImageCode(msg.File),
  }));
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [finalMessages, groupMessages]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("senderId", userId);
    formData.append("receiverId", receiverId);
    formData.append("file", file);

    try {
      console.log(userId, receiverId, file);

      await dispatch(addImage(formData)).unwrap();
      console.log("success");
    } catch (error) {
      console.error("Failed to add image:", error);
    }
  };
  const handleGroupFileChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("GruopId", selectedGroupId);
    formData.append("SenderId", userId);
    formData.append("File", file);

    try {
      console.log(selectedGroupId, userId, file);

      await dispatch(addGroupImage(formData)).unwrap();
      console.log("success");
    } catch (error) {
      console.error("Failed to add image:", error);
    }
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() === "" && Number(imageId) === 0) return;
    try {
      const message = {
        fUserName: fUserName,
        Message: newMessage.trim() === "" ? null : newMessage.trim(),
        file: Number(imageId) === 0 ? null : Number(imageId),
      };

      await connection.invoke(
        "SendMessage",
        message.fUserName,
        message.Message,
        message.file
      );

      setNewMessage("");
      dispatch(resetImage());
    } catch (error) {
      console.error("Message sending error: ", error);
    }
  };

  const handleKeyPressChat = (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  async function sendGroupMessage() {
    if (newMessage.trim() === "" && Number(imageId) === 0) return;
    try {
      const message = {
        fUserName: fUserName,
        Message: newMessage.trim() === "" ? null : newMessage.trim(),
        file: Number(imageId) === 0 ? null : Number(imageId),
      };

      console.log(username, selectedGroupId, message.Message, message.file);

      await connection
        .invoke(
          "SendGroupMessage",
          selectedGroupId,
          message.Message,
          message.file
        )
        .then(() => console.log("Message sent successfully"))
        .catch((err) => console.error(`Error Sending ${err}`))
        .catch((err) => console.error("Error sending message: ", err));

      setNewMessage("");
      dispatch(resetImage());
    } catch (error) {
      console.error("Message sending error: ", error);
    }
  }

  const handleKeyPressGroup = (event) => {
    if (event.key === "Enter") {
      sendGroupMessage();
    }
  };

  return toShow === "chats" ? (
    <div className="h-[70%] overflow-auto  pb-10">
      <div className=" flex flex-col overflow-auto mt-5">
        {loadMessages ? (
          <Spinner content="Messages" />
        ) : (
          finalMessages?.map((msg, index) => (
            <ul key={index}>
              {msg.SenderId === userId || msg.user === username ? (
                msg.File !== null && msg.File !== 0 ? (
                  <li className="message1">
                    <img
                      src={msg.File}
                      alt="senderImg"
                      className="w-[300px] h-[150px] rounded-lg pt-2"
                    />
                    <p className="mt-4">{msg.Message}</p>
                  </li>
                ) : (
                  <li className="message1">{msg.Message}</li>
                )
              ) : msg.File !== null && msg.File !== 0 ? (
                <li className="message2">
                  <img
                    src={msg.File}
                    alt="receiverImg"
                    className="w-[300px] h-[150px] rounded-lg pt-2"
                  />
                  <p className="mt-4">{msg.Message}</p>
                </li>
              ) : (
                <li className="message2">{msg.Message}</li>
              )}
              <span ref={messagesEndRef} className="overflow-hidden" />
            </ul>
          ))
        )}
      </div>

      <ChatIndicator
        userId={userId}
        receiverId={receiverId}
        onSend={handleSendMessage}
        onChangeimg={handleFileChange}
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        onPressEnter={handleKeyPressChat}
      />
    </div>
  ) : (
    <div className="h-[70%] overflow-auto pb-10">
      <div className=" flex flex-col  overflow-auto mt-5">
        <ul>
          {loadGroupMessages ? (
            <Spinner content="Messages" />
          ) : (
            finalGroupMessages.map((msg) =>
              msg.senderUserName === username ||
              msg?.Sender?.UserName === username ? (
                <>
                  <p className=" text-[#777] relative text-right mx-[20px] text-xs mt-2">
                    You
                  </p>
                  <li className="flex flex-col message1">
                    {msg.File !== null && msg.File !== 0 && (
                      <img
                        src={msg.File}
                        alt="group msg"
                        className="w-[300px] h-[150px] rounded-lg pt-2"
                      ></img>
                    )}
                    <p>{msg.Message}</p>
                  </li>
                </>
              ) : (
                <>
                  <p className="text-[#777] relative mx-[20px] text-xs mt-2">
                    {msg.senderUserName || msg?.Sender?.UserName}
                  </p>
                  <li className="message2">
                    {msg.File !== null && msg.File !== 0 && (
                      <img
                        src={msg.File}
                        alt="group msg"
                        className="w-[300px] h-[150px] rounded-lg pt-2"
                      ></img>
                    )}
                    <p>{msg.Message}</p>
                  </li>
                </>
              )
            )
          )}
          <span ref={messagesEndRef} className="overflow-hidden" />
        </ul>
      </div>

      <ChatIndicator
        userId={userId}
        receiverId={receiverId}
        onSend={sendGroupMessage}
        onChangeimg={handleGroupFileChange}
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        onPressEnter={handleKeyPressGroup}
      />
    </div>
  );
}
