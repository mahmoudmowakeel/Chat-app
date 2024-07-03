import { useSelector } from "react-redux";
import InfoItem from "./InfoItem";

export default function ChatInfo({
  aboutRef,
  toShow,
  chatInfoRef,
  onAdd,
  onRemove,
  addMembersRef,
  removeMembersRef,
}) {
  const info = useSelector((state) => state.info.info);
  const selectedInfo = info.filter((item) => item.active === true)[0];
  const fUserName = selectedInfo?.userName;
  return (
    <div
      ref={chatInfoRef}
      className="bg-white   md:bg-[#BDBDBD]/40 w-full md:relative  absolute z-50 md:z-30 md:col-span-7  transition-all duration-500   "
    >
      {selectedInfo ? (
        <InfoItem
          toShow={toShow}
          aboutRef={aboutRef}
          chatInfoRef={chatInfoRef}
          fUserName={fUserName}
          onAdd={onAdd}
          onRemove={onRemove}
          addMembersRef={addMembersRef}
          removeMembersRef={removeMembersRef}
        />
      ) : (
        <p className="hidden md:flex md:flex-col justify-center items-center h-full text-2xl ">
          Welcome to Our Chat app 😍{" "}
          <span className="block mt-5 text-sm "> Pleaes Select A Chat ...</span>{" "}
        </p>
      )}
    </div>
  );
}
