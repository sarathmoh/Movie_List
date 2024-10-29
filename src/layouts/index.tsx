import Content from "./content";
import SideBar from "./sideBar";
const Layout = () => {
  return (
    <div className=" h-screen grid grid-cols-12 ">
      <div className="h-full overflow-y-auto col-end-3 col-start-1">
        <SideBar />
      </div>
      <div className="grid col-start-3 col-end-13 overflow-y-auto">
        <Content />
      </div>
    </div>
  );
};

export default Layout;
