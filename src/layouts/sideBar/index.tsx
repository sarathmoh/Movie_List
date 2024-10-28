import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useAuthContext } from "@/contexts/authContext";
import { useNavigate } from "react-router-dom";

import { House, CircleUser } from "lucide-react";
import { useWatchListContext } from "@/contexts/watchListContext";

const SideBar = () => {
  const { user, logout } = useAuthContext();
  const { myList } = useWatchListContext();
  const navigate = useNavigate();
  const logoutHandler = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="flex flex-col justify-between h-[100%] p-8">
      <div className="flex flex-col justify-evenly gap-10 ">
        <div className="self-center text-red-700 text-3xl font-semibold">
          Watchlists
        </div>
        <div>
          <Input type="email" placeholder="search" />
        </div>
        <div
          className="flex gap-2 self-center bg-red-700 text-white font-semibold w-[100%] min-h-10 items-center rounded-[4px] p-2 "
          onClick={() => {
            navigate("/dashboard/home");
          }}
        >
          <House />
          Home
        </div>
        <hr></hr>
        <div className="font-semibold">
          <p>MyLists</p>
          <div className="flex flex-col gap-2">
            {myList.map((name) => {
              return (
                <div
                  className="bg-green-500"
                  key={name}
                  onClick={() => {
                    navigate(`/dashboard/list/${name}`);
                  }}
                >
                  {name}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <CircleUser />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>{user?.email}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logoutHandler}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
export default SideBar;
