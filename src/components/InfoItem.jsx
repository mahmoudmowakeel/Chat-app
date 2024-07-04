import ChatInputs from "./ChatInputs";
import { RiRadioButtonLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useRef } from "react";
import AddGroupMember from "./AddGroupMember";
import RemoveMemberSec from "./RemoveMemberSec";
import { FaArrowLeft } from "react-icons/fa";
import { removeActive } from "../slices/infoSlice";
export default function InfoItem({
  aboutRef,
  name,
  img,
  fUserName,
  toShow,
  chatInfoRef,
  onAdd,
  onRemove,
  addMembersRef,
  removeMembersRef,
}) {
  const info = useSelector((state) => state.info.info);
  const selectedInfo = info.filter((item) => item.active === true)[0];

  const dispatch = useDispatch();

  const handleShowAbout = () => {
    aboutRef.current.classList.toggle("hidden");
    aboutRef.current.classList.toggle("opacity-0");
    if (chatInfoRef.current.classList.contains("md:col-span-7")) {
      chatInfoRef.current.classList.remove("md:col-span-7");
      chatInfoRef.current.classList.add("md:col-span-5");
    } else {
      chatInfoRef.current.classList.remove("md:col-span-5");
      chatInfoRef.current.classList.add("md:col-span-7");
    }
  };

  return (
    <div className="h-[100vh] overflow-hidden ">
      <AddGroupMember
        addMembersRef={addMembersRef}
        addRemoveRefhandle={onAdd}
      />
      <RemoveMemberSec
        removeMembersRef={removeMembersRef}
        handleShowRemoveMembers={onRemove}
      />
      <div className="flex transition-all duration-300    bg-white justify-between px-10 w-full items-center border-b border-[#cfcfcfc4] py-7 ">
        <section className="flex items-center  md:gap-5 mt-3">
          <FaArrowLeft
            className="inline mr-7 text-2xl cursor-pointer"
            onClick={() => dispatch(removeActive())}
          />{" "}
          <div>
            <img
              src={selectedInfo?.img}
              alt="me"
              className="md:w-[50px] md:h-[50px] w-[60px] h-[60px] rounded-full "
            />
          </div>
          <div className="mt-2">
            <h1 className="font-bold text-sm ml-4 md:text-xl">
              {selectedInfo?.name}
            </h1>
          </div>
        </section>

        <span
          className=" cursor-pointer text-2xl bg-primary w-9 h-9  font-semibold rounded-full text-center text-white"
          onClick={handleShowAbout}
        >
          i
        </span>
      </div>
      <ChatInputs fUserName={fUserName} toShow={toShow} />
    </div>
  );
}
