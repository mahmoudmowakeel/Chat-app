import { useSelector } from "react-redux";
import { FaArrowLeft } from "react-icons/fa";
import RemoveGroupMember from "./RemoveGroupMember";

export default function RemoveMemberSec({
  removeMembersRef,
  handleShowRemoveMembers,
}) {
  const userId = useSelector((state) => state.auth.user.userdata[0].Id);
  const groupMembers = useSelector((state) => state.community.members);
  const filterdMembers = groupMembers.filter(
    (member) => member.UserId !== userId
  );

  return (
    <div
      ref={removeMembersRef}
      className="hidden text-left py-10 px-5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[100]  bg-white w-[350px] md:w-[600px] h-fit shadow-2xl rounded-lg overflow-hidden"
    >
      <h1 className="text-2xl border-b border-[#cfcfcfe5] pb-6">
        <FaArrowLeft
          className="inline mr-7 cursor-pointer"
          onClick={handleShowRemoveMembers}
        />
      </h1>
      <ul>
        {filterdMembers.map((member) => (
          <li>
            <RemoveGroupMember
              first={member.User.FirstName}
              last={member.User.LastName}
              username={member.User.UserName}
              key={member.User.Id}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
