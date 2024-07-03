import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getGroups } from "../slices/friendsSlice";
import useSignalR from "../hooks/SignalR";

export default function AddGroup({ addGroupRef }) {
  const dispatch = useDispatch();
  const currentUserId = useSelector((state) => state.auth.user)?.userdata[0].Id;

  const [groupName, setGroupName] = useState("");

  const [groupImg, setGroupImg] = useState("user.jpg");
  const userId = useSelector((state) => state.auth.user.userdata[0].Id);
  const username = useSelector((state) => state.auth.user.userdata[0].UserName);
  const connection = useSignalR(userId);

  const handleGroupName = (e) => {
    setGroupName(e.target.value);
  };
  const closeAddGroup = () => {
    addGroupRef.current.classList.add("hidden");
  };

  const handleCreateGroup = async () => {
    await connection.invoke("CreateGroup", username, groupName);
    dispatch(getGroups({ UserId: currentUserId }));
    addGroupRef.current.classList.add("hidden");
    setGroupName("");
  };

  return (
    <div
      ref={addGroupRef}
      className=" hidden text-left py-10 px-5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50  bg-white w-[400px] md:w-[600px] h-[300px] shadow-2xl rounded-lg overflow-hidden"
    >
      <div className="relative h-full">
        <h1 className="text-2xl border-b border-[#cfcfcfe5] pb-6">
          <FaArrowLeft
            onClick={closeAddGroup}
            className="inline mr-7 cursor-pointer"
          />{" "}
          New Group
        </h1>
        <section className="relative flex gap-7 p-7 justify-center items-center  border-b border-[#cfcfcfe5] pb-6">
          {groupImg && (
            <img
              src={`../imgs/${groupImg}`}
              alt=""
              className=" w-[70px] h-[70px] rounded-full"
            />
          )}

          <input
            type="text"
            placeholder="type group name"
            className="w-full text-sm h-fit py-3 mb-3 px-3 border border-[#c4c4c4f6] rounded-lg"
            onChange={handleGroupName}
            value={groupName}
          />
        </section>
        <section className="absolute bottom-0 right-0">
          <button
            className="bg-primary text-sm md:text-xl text-white py-1 px-3 rounded-lg"
            onClick={handleCreateGroup}
          >
            Create Group
          </button>
        </section>
      </div>
    </div>
  );
}
