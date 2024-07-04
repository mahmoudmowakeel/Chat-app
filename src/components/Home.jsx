import { AiOutlineUserAdd } from "react-icons/ai";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { IoPersonRemoveOutline } from "react-icons/io5";
import { IoMdSearch } from "react-icons/io";
import ChatItem from "./ChatItem";
import { useDispatch, useSelector } from "react-redux";
import AddGroup from "./AddGroup";
import { useRef } from "react";
import AddFriend from "./AddFriend";
import { logout } from "../slices/AuthenticationSlice";
import Spinner from "./Spinner";
import RemoveFriend from "./RemoveFriend";
import GroupItem from "./GroupItem";
import { removeActive } from "../slices/infoSlice";

export default function Home({ toShow, setToShow, aboutRef, chatInfoRef }) {
  const logoutRef = useRef(null);
  const friends = useSelector((state) => state.community.friends);
  const userId = useSelector((state) => state.auth.user.userdata[0].Id);
  const filterdFriends = friends.filter((friend) => friend.Id !== userId);
  const groups = useSelector((state) => state.community.groups);
  const addGroupRef = useRef(null);
  const addFriendRef = useRef(null);
  const removeFriendRef = useRef(null);
  const dispatch = useDispatch();
  const firstName = useSelector((state) => state.auth.user).userdata[0]
    .FirstName;
  const LastName = useSelector((state) => state.auth.user).userdata[0].LastName;
  const friendsIsLoading = useSelector((state) => state.community.loading);

  const handleShowAddGroup = () => {
    addGroupRef.current.classList.toggle("hidden");
    addFriendRef.current.classList.add("hidden");
    removeFriendRef.current.classList.add("hidden");
  };
  const handleShowAddFriend = () => {
    addFriendRef.current.classList.toggle("hidden");
    addGroupRef.current.classList.add("hidden");
    removeFriendRef.current.classList.add("hidden");
  };
  const handleShowRemoveFriend = () => {
    removeFriendRef.current.classList.toggle("hidden");
    addFriendRef.current.classList.add("hidden");
    addGroupRef.current.classList.add("hidden");
  };
  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("jwtToken");
  };

  const handleShowLogout = () => {
    logoutRef.current.classList.toggle("hidden");
  };

  return (
    <div className="h-screen absolute md:static overflow-y-auto  w-full md:col-span-3  ">
      <div>
        <div className="flex flex-col justify-between px-10 pb-4 pt-10">
          <section className=" z-50 md:z-10 flex justify-between items-center relative border-b border-[#bebebed2] mb-5">
            <p className="font-coiny text-xl">{`${firstName} ${LastName}`}</p>

            <img
              src="../imgs/user.jpg"
              alt=""
              className="w-[40px] h-[40px] rounded-full mb-5 cursor-pointer"
              onClick={handleShowLogout}
            />
            <button
              ref={logoutRef}
              onClick={handleLogout}
              className="hidden logout absolute right-5 bottom-[-20px]  bg-primary text-white px-3 py-1 rounded-lg"
            >
              Log out
            </button>
          </section>

          <section className="flex justify-between items-center">
            <h1 className="font-bold text-3xl font-coiny">My Chats</h1>
          </section>
        </div>
        <section className="flex md:flex-wrap  w-full md:w-fit mx-3 px-7 items-center justify-center text-xs  text-center space-x-2">
          <button
            className="font-extrabold flex justify-center items-center p-2 shadow-xl rounded-xl"
            onClick={handleShowAddFriend}
          >
            {" "}
            <AiOutlineUserAdd className="inline mr-2 text-4xl md:text-xl" />
            <span className="text-center">Add Friend</span>
          </button>
          <AddFriend addFriendRef={addFriendRef} />
          <button
            className="font-extrabold flex justify-center items-center p-2 shadow-xl rounded-xl"
            onClick={handleShowRemoveFriend}
          >
            {" "}
            <IoPersonRemoveOutline className="inline mr-2 text-3xl md:text-xl" />
            <span className="text-center">Remove Friend</span>
          </button>
          <RemoveFriend removeFriendRef={removeFriendRef} />
          <button
            className="font-extrabold flex justify-center items-center p-2 shadow-xl rounded-xl"
            onClick={handleShowAddGroup}
          >
            {" "}
            <AiOutlineUsergroupAdd className="inline mr-2 text-4xl md:text-xl" />
            <span className="text-center">New Group</span>
          </button>
          <AddGroup addGroupRef={addGroupRef} />
        </section>
      </div>
      {/* <section className="text-center mt-5 mx-auto ">
        <input
          className="py-2 px-5 rounded-xl w-[90%] mx-5  shadow-lg"
          type="search"
          placeholder="search"
        />

        <IoMdSearch className="ml-[-50px] inline" />
      </section> */}

      <section className="mt-5 w-full ">
        <div className="flex justify-center gap-4 items-center mb-5 mx-10">
          <button
            className={`${
              toShow === "chats" && `bg-primary text-white`
            } py-1 px-2 border border-black rounded-lg w-full hover:bg-primary hover:text-white font-coiny transition-all duration-300`}
            onClick={() => {
              setToShow("chats");
              aboutRef.current.classList.add("hidden");
              aboutRef.current.classList.add("opacity-0");
              chatInfoRef.current.classList.remove("md:col-span-5");
              chatInfoRef.current.classList.add("md:col-span-7");

              dispatch(removeActive());
            }}
          >
            Chats
          </button>
          <button
            className={`${
              toShow === "groups" && `bg-primary text-white`
            } py-1 px-2 border border-black rounded-lg w-full hover:bg-primary hover:text-white font-coiny transition-all duration-300`}
            onClick={() => {
              setToShow("groups");
              aboutRef.current.classList.add("hidden");
              aboutRef.current.classList.add("opacity-0");
              chatInfoRef.current.classList.remove("md:col-span-5");
              chatInfoRef.current.classList.add("md:col-span-7");

              dispatch(removeActive());
            }}
          >
            Groups
          </button>
        </div>

        {toShow === "chats" ? (
          <div className=" pb-1">
            {friendsIsLoading ? (
              <Spinner content="friends list" />
            ) : filterdFriends.length < 1 ? (
              <p className="text-center text-[#777] mt-10">
                No Friends To Show
              </p>
            ) : (
              filterdFriends.map((friend) => (
                <ChatItem
                  key={friend.Id}
                  first={friend.FirstName}
                  last={friend.LastName}
                  friendId={friend.Id}
                  friendEmail={friend.Email}
                  userName={friend.UserName}
                />
              ))
            )}
          </div>
        ) : (
          <div>
            {friendsIsLoading ? (
              <Spinner content="Groups list" />
            ) : (
              groups.map((group) => (
                <GroupItem
                  key={group.Id}
                  groupName={group.Name}
                  members={group.Members}
                  messages={group.Messages}
                  ownerId={group.OwnerId}
                  groupId={group.Id}
                />
              ))
            )}
          </div>
        )}
      </section>
    </div>
  );
}
