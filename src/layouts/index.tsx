import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Content from "./content";
import SideBar from "./sideBar";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Menu } from "lucide-react";
const Layout = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className=" md:h-screen grid grid-cols-12 max-md:rows-[50px auto]">
      <div className="md:hidden col-span-full">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <SideBar />
          </SheetContent>
        </Sheet>
      </div>

      <div className="h-full col-end-3 col-start-1 max-md:hidden">
        <SideBar />
      </div>
      <div className="grid col-start-3 col-end-13 overflow-y-auto max-md:col-start-1">
        <Content />
      </div>
    </div>
  );
};

export default Layout;
