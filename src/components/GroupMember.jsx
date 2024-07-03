export default function GroupMember({ name, index, onDelete, username }) {
  return (
    <div className="flex justify-between items-center rounded-lg py-2 px-4 mt-3 mx-1 shadow-xl">
      <img
        src="imgs/user.jpg"
        alt=""
        className="h-[30px] w-[30px] rounded-full"
      />
      <h1 className="text-sm">{name}</h1>
      <button
        className=" text-sm  py-1 px-3 rounded-lg bg-[#4a51fd] text-white "
        onClick={() => onDelete(username)}
      >
        -
      </button>
    </div>
  );
}
