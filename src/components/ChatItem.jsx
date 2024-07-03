import { useDispatch, useSelector } from "react-redux";
import { addInfo, removeActive } from "../slices/infoSlice";
import { clearContent, getChatMesages } from "../slices/messagesSlice";
import { CiImageOn } from "react-icons/ci";

export default function ChatItem({
  first,
  last,
  friendId,
  friendEmail,
  userName,
}) {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user.userdata[0].Id);
  const content = useSelector((state) => state.messages.content);
  const Msgs = useSelector((state) => state.chat.messages);
  const lastMsg = useSelector((state) => state.chat.messages[Msgs.length - 1]);
  const info = useSelector((state) => state.info.info);
  const selectedInfo = info.filter((item) => item.active === true)[0];

  const handleAddInfo = (
    img,
    name,
    chatContent,
    friendId,
    friendEmail,
    userName
  ) => {
    dispatch(clearContent());
    dispatch(removeActive());

    const newObject = {
      name: name,
      img: img,
      content: chatContent,
      friendId: friendId,
      friendEmail: friendEmail,
      userName,
    };

    dispatch(addInfo(newObject));
    dispatch(getChatMesages({ senderid: userId, receiverid: friendId }));
  };

  return (
    <div
      className={` mx-5 flex gap-5 pb-6   pt-4 px-4 relative hover:bg-[#cecece91]  rounded-lg cursor-pointer`}
      onClick={() =>
        handleAddInfo(
          `../imgs/user.jpg`,
          `${first} ${last}`,
          content,
          friendId,
          friendEmail,
          userName
        )
      }
    >
      <div>
        <img
          src={`../imgs/user.jpg`}
          alt="me"
          className="w-[45px] h-[50px] rounded-full"
        />
      </div>
      <div className="overflow-hidden">
        <h3 className="font-bold text-sm">
          {first} {last}
        </h3>
        <p className="text-[0.8rem] tracking-wide text-[#777] ml-1 text-nowrap max-w-full pt-3 ">
          {!lastMsg ? (
            "Click Here To Message"
          ) : lastMsg?.fileid !== null ? (
            <p className="text-md">Click Here To Message</p>
          ) : (
            <p> Click Here To Message</p>
          )}
        </p>
      </div>
      {/* <span className="absolute  right-2 text-[#777] text-xs">1:34 pm</span> */}
    </div>
  );
}
