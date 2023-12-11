import { UserButton } from '@clerk/nextjs';
import MobileSidebar from './mobile-sidebar';

const Navbar = () => {
  return (
    <div className="p-4 border-b flex items-center bg-white shadow-sm">
      <MobileSidebar />
      <UserButton afterSignOutUrl="/" />
    </div>
  );
};

export default Navbar;
