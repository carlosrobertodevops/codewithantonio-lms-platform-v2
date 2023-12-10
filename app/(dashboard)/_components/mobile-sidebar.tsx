import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import Sidebar from './sidebar';

const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu />
      </SheetTrigger>
      <SheetContent>
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
