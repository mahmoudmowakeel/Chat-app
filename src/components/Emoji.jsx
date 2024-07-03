import EmojiPicker from "emoji-picker-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { MdOutlineEmojiEmotions } from "react-icons/md";

export default function Emoji({ setNewMessage, newMessage }) {
  const [emojiIsOpen, setEmojiIsOpen] = useState(false);
  const dispatch = useDispatch();

  const handleOpenEmoji = () => {
    setEmojiIsOpen((prev) => !prev);
  };

  const onEmojiClick = (event) => {
    console.log(newMessage);
    dispatch(setNewMessage(newMessage + event.emoji));
    setEmojiIsOpen(true);
  };

  const getEmojiPickerStyle = () => {
    if (window.innerWidth < 768) {
      return {
        position: "absolute",
        zIndex: "100",
        bottom: "100%",
        right: "-100px",
        width: "270px",
        height: "300px",
      };
    } else {
      return {
        position: "absolute",
        zIndex: "100",
        bottom: "100%",
        right: "0px",
        width: "370px",
        height: "400px",
      };
    }
  };

  return (
    <div className="my-auto relative">
      {emojiIsOpen && (
        <EmojiPicker
          style={getEmojiPickerStyle()}
          onEmojiClick={onEmojiClick}
          open={emojiIsOpen}
        />
      )}

      <button onClick={handleOpenEmoji}>
        <MdOutlineEmojiEmotions className="text-3xl " />
      </button>
    </div>
  );
}
