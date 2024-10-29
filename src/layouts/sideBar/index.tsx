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
import { useNavigate, NavLink } from "react-router-dom";

import { House, CircleUser, Home } from "lucide-react";
import { useWatchListContext } from "@/contexts/watchListContext";
import { SetStateAction, useEffect, useState } from "react";

const SideBar = () => {
  const { user, logout } = useAuthContext();
  const { myList } = useWatchListContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [sideLists, setSideLists] = useState(myList);
  const navigate = useNavigate();
  const logoutHandler = () => {
    logout();
    navigate("/");
  };

  const searchHandler = (e: { target: { value: SetStateAction<string> } }) => {
    setSearchTerm(e.target.value);
  };
  function searchArray(keyword: string) {
    const regex = new RegExp(keyword, "i");
    return myList.filter((item) => regex.test(item));
  }

  useEffect(() => {
    const result = searchArray(searchTerm);
    setSideLists(result);
  }, [searchTerm, myList]);

  return (
    <div className="flex flex-col justify-between h-[100%] p-8">
      <div className="flex flex-col justify-evenly gap-10 ">
        <div className="self-center text-red-700 text-3xl font-semibold">
          Watchlists
        </div>
        <div>
          <Input type="email" placeholder="search" onChange={searchHandler} />
        </div>

        <NavLink
          to="/dashboard/home"
          className={({ isActive }) =>
            `${
              isActive ? "bg-red-600" : "bg-slate-200"
            } flex gap-2 self-center text-white font-semibold w-[100%] min-h-10 items-center rounded-[4px] p-2`
          }
        >
          {({ isActive }) => (
            <>
              <House color={isActive ? "white" : "black"} />
              <span className={isActive ? "text-white" : "text-black"}>
                Home
              </span>
            </>
          )}
        </NavLink>

        <hr></hr>
        <div className="font-semibold">
          <p className="mb-8">MyLists</p>
          <div className="flex flex-col gap-2">
            {sideLists.map((name) => {
              return (
                <NavLink
                  key={name}
                  to={`/dashboard/list/${name}`}
                  className={({ isActive }) =>
                    `${
                      isActive ? "bg-red-600" : "bg-slate-200"
                    } flex gap-2 self-center text-white font-semibold w-[100%] min-h-10 items-center rounded-[4px] p-2`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span className={isActive ? "text-white" : "text-black"}>
                        {name}
                      </span>
                    </>
                  )}
                </NavLink>
               
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
