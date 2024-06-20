import { useNavigate } from "react-router-dom";
import { Button } from "./Button";

function UserListItem({ user }) {

    const navigate = useNavigate();

    
  return (
    <div className="pt-6 ">
      <div className="border boder-black-700 rounded flex  justify-between items-center p-2">
        <div className="flex">
          <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center items-center mr-2 mt-1">
          <span class="text-2xl text-black-400">{user?.firstName[0].toUpperCase()}</span>
          </div>
          <div className="font-normal m-0 flex  justify-between items-center">
            {`${user?.firstName} ${user?.lastName}`}
          </div>
        </div>
        <div className="flex items-center">
          <button
            className="m-0 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 "
            onClick={() => navigate("/sendmoney", {state: user})}
          >
            {" "}
            Send Money{" "}
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserListItem;
