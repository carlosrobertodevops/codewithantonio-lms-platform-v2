import Logo from './logo';

const Sidebar = () => {
  return (
    <div className="bg-white border-r overflow-y-auto shadow-sm flex flex-col w-full">
      <div className="p-6">
        <Logo />
      </div>
    </div>
  );
};

export default Sidebar;
