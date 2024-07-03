import { useDispatch, useSelector } from "react-redux";
import { removeFriend } from "../slices/friendsSlice";

export default function RemoveMember({ first, last, id }) {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user.userdata[0].Id);

  const handleRemoveFriend = async () => {
    dispatch(removeFriend({ friendid: id, userid: userId }));
  };

  return (
    <div className="flex justify-between items-center rounded-lg py-2 px-4 mt-3 mx-1 shadow-xl">
      <img
        src="../imgs/user.jpg"
        alt=""
        className="h-[30px] w-[30px] rounded-full"
      />
      <h1 className="text-sm">{`${first} ${last}`}</h1>
      <button
        className=" text-md  py-1 px-3 rounded-lg bg-red/90 text-white "
        onClick={handleRemoveFriend}
      >
        -
      </button>
    </div>
  );
}
