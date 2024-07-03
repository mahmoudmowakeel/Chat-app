import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useSelector } from "react-redux";
import FriendMember from "./FriendMember";

export default function AddFriend({ addFriendRef }) {
  const [searchName, setSearchName] = useState("");
  const users = useSelector((state) => state.community.users);

  const friends = useSelector((state) => state.community.friends);

  const userNotFriends = users.filter(
    (user) => !friends.some((friend) => friend.Id === user?.Id)
  );
  let filteredUsers = userNotFriends.filter((friend) =>
    friend.UserName.toLowerCase().includes(searchName.toLowerCase())
  );

  const handleCloseAddFriend = () => {
    addFriendRef.current.classList.add("hidden");
  };

  return (
    <div
      ref={addFriendRef}
      className="hidden  text-left py-10 px-5 absolute   top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50  bg-white w-[400px] h-[400px] md:w-[600px] md:h-[600px] shadow-2xl rounded-lg overflow-auto"
    >
      <h1 className="text-lg md:text-2xl border-b border-[#cfcfcfe5] pb-2 md:pb-6">
        <FaArrowLeft
          className="inline mr-7 cursor-pointer"
          onClick={handleCloseAddFriend}
        />{" "}
        Add Friend
      </h1>

      <section className="p-5 md:p-10  mx-auto">
        <input
          type="text"
          placeholder="Search By Username "
          className="w-[100%] p-2 border border-[#77777793] rounded-lg"
          onChange={(e) => setSearchName(e.target.value)}
        />
      </section>

      <div>
        <ul>
          {filteredUsers.map((user) => (
            <li key={user.Id} className="w-full md:w-[70%] mx-auto">
              {" "}
              <FriendMember
                id={user.Id}
                first={user.FirstName}
                last={user.LastName}
              />{" "}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
