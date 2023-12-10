import Logo from './logo';
import SidebarRoutes from './sidebar-routes';

const Sidebar = () => {
  return (
    <div className="bg-white border-r overflow-y-auto shadow-sm flex flex-col w-full h-full">
      <div className="p-6">
        <Logo />
      </div>
      <SidebarRoutes />
    </div>
  );
};

export default Sidebar;
