`use client`;

import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

interface SidebarRouteProps {
  icon: LucideIcon;
  label: string;
  href: string;
}

const SidebarRoute = ({ icon: Icon, label, href }: SidebarRouteProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = pathname === href || pathname?.startsWith(`${href}/`);

  const onClick = () => {
    router.push(href);
  };

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        'flex items-center gap-x-2 text-slate-500 text-sm font-medium pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20',
        isActive &&
          'text-sky-700 bg-sky-200/20 hover:bg-sky-200/20 hover:text-sky-700',
      )}
    >
      {label}
    </button>
  );
};

export default SidebarRoute;
