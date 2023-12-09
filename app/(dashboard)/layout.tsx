const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <div className="hidden md:flex h-full w-56 fixed z-50"></div>
      {children}
    </div>
  );
};

export default DashboardLayout;
