import { useDispatch, useSelector } from "react-redux";
import { addInfo, removeActive } from "../slices/infoSlice";
import { clearContent } from "../slices/messagesSlice";
import { CiImageOn } from "react-icons/ci";
import { getGroupMembers } from "../slices/friendsSlice";
import { useRef } from "react";
import { current } from "@reduxjs/toolkit";

export default function GroupItem({
  groupName,
  messages,
  members,
  ownerId,
  groupId,
}) {
  const dispatch = useDispatch();
  const content = useSelector((state) => state.messages.content);
  const info = useSelector((state) => state.info.info);
  const Msgs = useSelector((state) => state.chat.messages);

  const lastMsg = useSelector((state) => state.chat.messages[Msgs.length - 1]);

  const handleAddInfo = (
    img,
    name,
    chatContent,
    friendId,
    friendEmail,
    userName
  ) => {
    dispatch(clearContent());

    const newObject = {
      name: name,
      img: img,
      content: chatContent,
      friendId: friendId,
      friendEmail: friendEmail,
      userName,
      groupId: groupId,
      members: members,
      ownerId: ownerId,
    };
    dispatch(removeActive());
    dispatch(addInfo(newObject));
    dispatch(getGroupMembers({ groupid: groupId }));
  };

  console.log(info);

  return (
    <div
      className="mx-5 flex gap-5 py-4 px-4 relative hover:bg-[#cecece91] rounded-lg cursor-pointer"
      onClick={() =>
        handleAddInfo(
          `../imgs/user.jpg`,
          groupName,
          content,
          null,
          null,
          null,
          groupId,
          members,
          ownerId
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
        <h3 className="font-bold text-sm">{groupName}</h3>
        <p className="text-[0.8rem] tracking-wide text-[#777] ml-1 text-nowrap max-w-full pt-3 ">
          {!lastMsg ? (
            "Click Here To Message"
          ) : lastMsg?.fileid !== null ? (
            <p className="text-md">Click Here To Message</p>
          ) : (
            <p>Click Here To Message</p>
          )}
        </p>
      </div>
      <span className="absolute  right-2 text-[#777] text-xs">1:34 pm</span>
    </div>
  );
}
