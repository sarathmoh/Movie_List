import Content from "./content";
import SideBar from "./sideBar";
const Layout = () => {
  return (
    <div className=" max-h-screen grid grid-cols-12 ">
      <div className=" col-end-3 col-start-1">
        <SideBar />
      </div>
      <div className="bg-amber-400 grid col-start-3 col-end-13">
        <Content />
      </div>
    </div>
  );
};

export default Layout;
