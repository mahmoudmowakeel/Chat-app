import { RiSendPlaneLine } from "react-icons/ri";
import { CiImageOn } from "react-icons/ci";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { BiSolidCloudUpload } from "react-icons/bi";
import { FaFileUpload } from "react-icons/fa";
import Emoji from "./Emoji";

export default function ChatIndicator({
  userId,
  receiverId,
  onSend,
  onChangeimg,
  newMessage,
  setNewMessage,
  onPressEnter,
}) {
  const imageLoading = useSelector((state) => state.image.loading);
  const fileRef = useRef(null);

  return (
    <div className="grid grid-cols-10 gap-5 right-0 w-full absolute bottom-[-5px] bg-white p-4 rounded-xl text-xl">
      <section className="w-full col-span-7 flex items-center gap-2">
        <div>
          {imageLoading === "uploading" ? (
            <p className="text-xs text-center text-red font-bold ">
              <BiSolidCloudUpload className="text-xl mx-auto mb-2 text-black" />
              Uploading...
            </p>
          ) : imageLoading === "uploaded" ? (
            <p className="text-xs text-center text-green font-bold ">
              <FaFileUpload className="text-xl mx-auto mb-2 text-black" /> image
              Uploaded successfully.
            </p>
          ) : (
            <>
              {" "}
              <input
                id="file"
                type="file"
                onChange={onChangeimg}
                ref={fileRef}
                style={{ display: "none" }}
              />
              <label htmlFor="file" className=" cursor-pointer">
                <CiImageOn className="text-4xl md:text-3xl" />
              </label>
            </>
          )}
        </div>

        <input
          className="w-[100%] md:p-2  outline-none text-xs md:text-lg"
          type="text"
          name="message"
          id="message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type Message Here"
          onKeyDown={onPressEnter}
        />
      </section>
      <section className="flex text-2xl  w-full justify-end gap-4 col-span-3">
        <Emoji setNewMessage={setNewMessage} newMessage={newMessage} />
        <button
          className="bg-primary  text-white  flex justify-center items-center gap-1 text-2xl md:text-xl py-1 px-3 rounded-lg hover:-translate-y-1 hover:bg-primary/85 transition-all duration-300"
          disabled={imageLoading === "uploading"}
          onClick={onSend}
        >
          Send <RiSendPlaneLine className="inline" />
        </button>
      </section>
    </div>
  );
}
