import { useRef } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import useSignalR from "../hooks/SignalR";
import { removeActive } from "../slices/infoSlice";
import { removeGroupMember } from "../slices/friendsSlice";
import { FaArrowLeft } from "react-icons/fa";
import fetchAndConvertImageCode from "../data/getImageByCode";
import AddGroupMember from "./AddGroupMember";
import RemoveMemberSec from "./RemoveMemberSec";

export default function AboutChat({
  aboutRef,
  toShow,
  chatInfoRef,
  onAdd,
  onRemove,
}) {
  const mediaRef = useRef(null);
  const linksRef = useRef(null);
  const info = useSelector((state) => state.info.info);
  const selectedInfo = info.filter((item) => item.active === true)[0];
  const selectedGroupId = info.filter((item) => item.active === true)[0]
    ?.groupId;
  const ownerId = info.filter((item) => item.active === true)[0]?.ownerId;
  const groupMembers = useSelector((state) => state.community.members);
  const userId = useSelector((state) => state.auth.user.userdata[0].Id);
  const userName = useSelector((state) => state.auth.user.userdata[0].UserName);
  const connection = useSignalR(userId);
  const messages = useSelector((state) => state.messages.content);
  const finalMessages = messages.map((msg) => ({
    ...msg,
    File:
      msg.File === null
        ? null
        : msg.File?.startsWith("blob")
        ? msg.File
        : fetchAndConvertImageCode(msg.File),
  }));
  const dispatch = useDispatch();
  const chatLinks = finalMessages
    .map((msg) =>
      msg.Message?.startsWith("http") || msg.Message?.startsWith("www")
        ? msg.Message
        : null
    )
    .filter((msg) => msg !== null);
  const chatImgs = finalMessages
    .map((msg) => msg.File !== null && msg.File)
    .filter((msg) => msg !== false);

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

  const groupLinks = finalGroupMessages
    .map((msg) =>
      msg.Message?.startsWith("http") || msg.Message?.startsWith("www")
        ? msg.Message
        : null
    )
    .filter((msg) => msg !== null);
  const groupImgs = finalGroupMessages
    .map((msg) => msg.File !== null && msg.File)
    .filter((msg) => msg !== false);

  console.log(groupImgs);

  const handleShowMedia = () => {
    mediaRef.current.classList.toggle("hidden");
  };
  const handleShowLinks = () => {
    linksRef.current.classList.toggle("hidden");
  };

  const handleDeleteGroup = async () => {
    await connection.invoke("DeleteGroup", selectedGroupId);
    aboutRef.current.classList.add("hidden");
    aboutRef.current.classList.add("opacity-0");
    dispatch(removeActive());
  };
  const handleLeaveGroup = async () => {
    await connection.invoke("RemoveMemberFromGroup", selectedGroupId, userName);
    dispatch(removeGroupMember(userName));
    aboutRef.current.classList.add("hidden");
    aboutRef.current.classList.add("opacity-0");
    dispatch(removeActive());
  };

  return (
    <div
      ref={aboutRef}
      className="absolute z-50 md:static md:z-30 w-full h-screen md:w-full md:h-fit bg-white px-7 py-2  md:col-span-2 mx-4 overflow-y-auto overflow-x-hidden hidden opacity-0 transition-all duration-500 "
    >
      <section className="flex flex-col justify-center items-center mt-[15px]">
        <FaArrowLeft
          className=" md:hidden absolute left-10 top-[50px]  inline mr-7 text-xl cursor-pointer "
          onClick={() => {
            aboutRef.current.classList.add("hidden");
            aboutRef.current.classList.add("opacity-0");
          }}
        />{" "}
        <img
          src={selectedInfo?.img}
          className="w-[110px] h-[110px] rounded-full"
          alt=""
        />
        <h1 className="font-semibold text-2xl mt-5">{selectedInfo?.name}</h1>
      </section>
      <section>
        <button
          className="w-full text-left flex justify-between mt-5 text-md"
          onClick={handleShowMedia}
        >
          Media
          <span>
            {toShow === "chats" ? chatImgs?.length : groupImgs?.length}{" "}
            <IoIosArrowDown className="inline ml-1" />{" "}
          </span>
        </button>
        <div
          ref={mediaRef}
          className="grid grid-cols-2 flex-col overflow-auto max-h-[250px] items-center gap-4 mt-[35px] hidden"
        >
          {chatImgs?.length || groupImgs.length > 0 ? (
            toShow === "chats" ? (
              chatImgs.map((img) => (
                <img className="w-[90px] h-[90px]" src={img} alt="no"></img>
              ))
            ) : (
              groupImgs.map((img) => (
                <img className="w-[90px] h-[90px]" src={img} alt="no"></img>
              ))
            )
          ) : (
            <p className="text-sm text-[#777]">There Is No Photos To Show</p>
          )}
        </div>
        <button
          className="w-full text-left flex justify-between mt-5 text-md"
          onClick={handleShowLinks}
        >
          Links
          <span>
            {toShow === "chats" ? chatLinks?.length : groupLinks?.length}{" "}
            <IoIosArrowDown className="inline ml-1" />{" "}
          </span>
        </button>
        <div
          ref={linksRef}
          className="flex flex-col text-left w-full max-h-[250px]  overflow-auto items-center gap-4 mt-[35px] hidden"
        >
          {chatLinks?.length > 0 ? (
            toShow === "chats" ? (
              chatLinks.map((link) => (
                <a
                  href={link}
                  className="text-sm w-full mr-auto hover:text-primary hover:underline  text-[#777]"
                >
                  - {link}
                </a>
              ))
            ) : (
              groupLinks.map((link) => (
                <a
                  href={link}
                  className="text-sm w-full mr-auto hover:text-primary hover:underline  text-[#777]"
                >
                  - {link}
                </a>
              ))
            )
          ) : (
            <p className="text-sm w-full mr-auto   text-[#777]">
              There Is No Links To Show
            </p>
          )}
        </div>
      </section>
      <section>
        {toShow === "groups" && (
          <details className="mt-5 ">
            <summary>Group Members</summary>
            <ol type="1" className="h-[200px] overflow-auto">
              {groupMembers?.map((member) => (
                <li className="border flex justify-between items-center border-black/50 py-1 px-2 mt-2 rounded-lg">
                  - {member?.User?.FirstName || member?.FirstName}{" "}
                  {member?.User?.LastName || member?.LastName}{" "}
                  <span className="text-green text-xs font-bold text-right">
                    {" "}
                    {member?.IsAdmin && `Admin`}{" "}
                  </span>{" "}
                </li>
              ))}
            </ol>
          </details>
        )}
      </section>
      {toShow === "groups" && (
        <section className="mt-5 flex flex-col ml-auto gap-5 text-left justify-between items-center">
          {ownerId === userId ? (
            <>
              <button
                className="bg-primary text-sm text-white py-1 px-5 rounded-lg"
                onClick={onAdd}
              >
                {" "}
                Add Members
              </button>

              <button
                className="bg-primary text-sm text-white py-1 px-5 rounded-lg"
                onClick={onRemove}
              >
                Remove Members
              </button>

              <button
                className="bg-primary text-sm text-white py-1 px-5 rounded-lg"
                onClick={handleDeleteGroup}
              >
                Delete Group
              </button>
            </>
          ) : (
            <button
              className="bg-primary text-sm text-white py-1 px-5 rounded-lg"
              onClick={handleLeaveGroup}
            >
              Leave Group
            </button>
          )}
        </section>
      )}
    </div>
  );
}
