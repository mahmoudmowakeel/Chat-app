import { useDispatch, useSelector } from "react-redux";

import useSignalR from "../hooks/SignalR";
import { getGroupMembers, removeGroupMember } from "../slices/friendsSlice";

export default function RemoveGroupMember({ first, last, username }) {
    const dispatch = useDispatch();
    const groupInfo = useSelector((state) => state.info.info);
    const groupId = groupInfo?.filter((item) => item.active === true)[0]?.groupId;
    const userId = useSelector(state => state.auth.user.userdata[0].Id);
    const connection = useSignalR(userId);

    const handleRemoveMember = async () => {

        await connection.invoke("RemoveMemberFromGroup", groupId, username);
        dispatch(removeGroupMember(username))
    }

    return (
        <div className="flex justify-between items-center rounded-lg py-2 px-4 mt-3 mx-1 shadow-xl">
            <img src="../imgs/user.jpg" alt="" className="h-[30px] w-[30px] rounded-full" />
            <h1 className="text-sm">{`${first} ${last}`}</h1>
            <button className=" text-md  py-1 px-3 rounded-lg bg-red/90 text-white " onClick={handleRemoveMember} >-</button>
        </div >
    )

}