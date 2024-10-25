import { Input } from "@/components/ui/input";
import { House } from "lucide-react";
const SideBar = () => {
  return (
    <div className="flex flex-col justify-between h-[100%] p-8">
      <div className="flex flex-col justify-evenly gap-10 ">
        <div className="self-center text-red-700 text-3xl font-semibold">
          Watchlists
        </div>
        <div>
          <Input type="email" placeholder="search" />
        </div>
        <div className="flex gap-2 self-center bg-red-700 text-white font-semibold w-[100%] min-h-10 items-center rounded-[4px] p-2">
          <House />
          Home
        </div>
        <hr></hr>
        <div className="font-semibold">My Lists</div>
      </div>
      <div className="bg-blue-500 ">
        <div>5</div>
      </div>
    </div>
  );
};
export default SideBar;
