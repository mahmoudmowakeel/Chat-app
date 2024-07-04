import { useRef, useState } from "react";
import Home from "./Home";
import ChatInfo from "./ChatInfo";
import AboutChat from "./AboutChat";

export default function Main() {
  const aboutRef = useRef(null);
  const chatInfoRef = useRef(null);
  const removeMembersRef = useRef(null);
  const addMembersRef = useRef(null);
  const [toShow, setToShow] = useState("chats");

  function handleShowAddMembers() {
    addMembersRef.current.classList.toggle("hidden");
    removeMembersRef.current.classList.add("hidden");
    aboutRef.current.classList.toggle("hidden");
    aboutRef.current.classList.toggle("opacity-0");
    if (chatInfoRef.current.classList.contains("md:col-span-7")) {
      chatInfoRef.current.classList.remove("md:col-span-7");
      chatInfoRef.current.classList.add("md:col-span-5");
    } else {
      chatInfoRef.current.classList.remove("md:col-span-5");
      chatInfoRef.current.classList.add("md:col-span-7");
    }
  }
  function handleShowRemoveMembers() {
    removeMembersRef.current.classList.toggle("hidden");
    addMembersRef.current.classList.add("hidden");
    aboutRef.current.classList.toggle("hidden");
    aboutRef.current.classList.toggle("opacity-0");
    if (chatInfoRef.current.classList.contains("md:col-span-7")) {
      chatInfoRef.current.classList.remove("md:col-span-7");
      chatInfoRef.current.classList.add("md:col-span-5");
    } else {
      chatInfoRef.current.classList.remove("md:col-span-5");
      chatInfoRef.current.classList.add("md:col-span-7");
    }
  }
  return (
    <div className="w-full relative md:static md:grid md:grid-cols-10 overflow-hidden h-screen">
      <Home
        toShow={toShow}
        setToShow={setToShow}
        aboutRef={aboutRef}
        chatInfoRef={chatInfoRef}
      />
      <ChatInfo
        aboutRef={aboutRef}
        toShow={toShow}
        chatInfoRef={chatInfoRef}
        removeMembersRef={removeMembersRef}
        addMembersRef={addMembersRef}
        onAdd={handleShowAddMembers}
        onRemove={handleShowRemoveMembers}
      />
      <AboutChat
        toShow={toShow}
        aboutRef={aboutRef}
        chatInfoRef={chatInfoRef}
        removeMembersRef={removeMembersRef}
        addMembersRef={addMembersRef}
        onAdd={handleShowAddMembers}
        onRemove={handleShowRemoveMembers}
      />
    </div>
  );
}
