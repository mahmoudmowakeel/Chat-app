import { FaArrowLeft } from "react-icons/fa";
import { useSelector } from "react-redux";
import RemoveMember from "./RemoveMember";

export default function RemoveFriend({ removeFriendRef }) {
  const friends = useSelector((state) => state.community.friends);
  const userId = useSelector((state) => state.auth.user.userdata[0].Id);
  const filterdFriends = friends.filter((friend) => friend.Id !== userId);

  const handleCloseRemoveFriend = () => {
    removeFriendRef.current.classList.add("hidden");
  };

  return (
    <div
      ref={removeFriendRef}
      className="hidden text-left py-5 px-4 md:py-10 md:px-5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50  bg-white w-[400px] md:w-[600px] h-[400px] md:h-[600px] shadow-2xl rounded-lg overflow-auto"
    >
      <h1 className="text-lg md:text-2xl border-b border-[#cfcfcfe5] pb-6">
        <FaArrowLeft
          className="inline mr-7 cursor-pointer"
          onClick={handleCloseRemoveFriend}
        />{" "}
        Remove Friend
      </h1>
      <div>
        <ul>
          {filterdFriends.map((user) => (
            <li className="w-[70%] mx-auto" key={user.Id}>
              <RemoveMember
                id={user.Id}
                first={user.FirstName}
                last={user.LastName}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
