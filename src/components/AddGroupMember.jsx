import { FaArrowLeft, FaUserFriends } from "react-icons/fa";
import { useSelector } from "react-redux";
import FriendOfGroup from "./FriendOfGroup";
import { useState } from "react";
import { MdGroups2 } from "react-icons/md";
import GroupMember from "./GroupMember";
import useSignalR from "../hooks/SignalR";

export default function AddGroupMember({ addMembersRef, addRemoveRefhandle }) {
  const friends = useSelector((state) => state.community.friends);
  const username = useSelector((state) => state.auth.user.userdata[0].UserName);
  const groupInfo = useSelector((state) => state.info.info);
  const groupId = groupInfo.filter((item) => item.active === true)[0].groupId;
  const userId = useSelector((state) => state.auth.user.userdata[0].Id);
  const realGroupMembers = useSelector((state) => state.community.members);
  const [groupMembers, setGroupMembers] = useState([]);
  const friendOnly = friends.filter(
    (friend) =>
      !friend.admins &&
      friend.UserName !== username &&
      !groupMembers.some((member) => member.username === friend.UserName) &&
      !realGroupMembers.some(
        (member) => member.User.UserName === friend.UserName
      )
  );
  const connection = useSignalR(userId); // Establish SignalR connection
  const usersOfMembers = groupMembers.map((member) => member.username);

  const handleGroupMembers = (img, name, index, username) => {
    groupMembers.length > 0
      ? groupMembers.map((member) =>
          member.username === username
            ? setGroupMembers([...groupMembers])
            : setGroupMembers([...groupMembers, { img, name, index, username }])
        )
      : setGroupMembers([...groupMembers, { img, name, index, username }]);
  };

  const handleDeleteGroupMember = (username) => {
    const deletedMember = groupMembers.filter(
      (member) => member.username !== username
    );
    setGroupMembers(deletedMember);
  };

  const onAddMembers = async () => {
    const MembersArray = usersOfMembers.map((user) => ({
      GroupID: groupId,
      UserName: user,
      IsAdmin: false,
    }));
    await connection.invoke("AddMemberToGroup", MembersArray);
    setGroupMembers([]);
  };

  return (
    <div
      ref={addMembersRef}
      className=" hidden text-left py-5 md:py-10 px-2 md:px-5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50  bg-white w-[370px] md:w-[600px] h-fit shadow-2xl rounded-lg overflow-hidden"
    >
      <h1 className="text-2xl border-b border-[#cfcfcfe5] pb-6">
        <FaArrowLeft
          className="inline ml-7 cursor-pointer"
          onClick={addRemoveRefhandle}
        />
      </h1>
      <section className="py-5  grid grid-cols-2 text-center h-fit">
        <div className="border-r border-[#cfcfcfe5]">
          <h1 className="text-xl font-semibold">
            {" "}
            <FaUserFriends className="inline mr-2" /> Friends
          </h1>
          <div className=" h-[300px] overflow-auto">
            {friendOnly.map((friend) => (
              <FriendOfGroup
                key={friend.UserName}
                first={friend.FirstName}
                last={friend.LastName}
                index={friendOnly.indexOf(friend)}
                username={friend.UserName}
                onAddMember={handleGroupMembers}
              />
            ))}
          </div>
        </div>
        <div className="h-[300px] overflow-auto">
          <h1 className="text-xl font-semibold">
            <MdGroups2 className="inline text-2xl mr-2" />
            Members
          </h1>
          {groupMembers &&
            groupMembers.map((member) => (
              <GroupMember
                name={member.name}
                index={member.index}
                username={member.username}
                onDelete={handleDeleteGroupMember}
              />
            ))}
        </div>
      </section>
      <section className="flex justify-end">
        <button
          className=" py-1 px-2 bg-primary text-white rounded-lg text-right"
          onClick={onAddMembers}
        >
          Add Members
        </button>
      </section>
    </div>
  );
}
