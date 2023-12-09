`use client`;

import { LucideIcon } from 'lucide-react';

interface SidebarRouteProps {
  icon: LucideIcon;
  label: string;
  href: string;
}

const SidebarRoute = ({ icon: Icon, label, href }: SidebarRouteProps) => {
  return <div>Sidebar Route</div>;
};

export default SidebarRoute;
