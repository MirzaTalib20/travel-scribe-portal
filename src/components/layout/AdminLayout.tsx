
import React from 'react';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { useNavigate, Link, Outlet } from 'react-router-dom';
import { Compass, FileText, Home, LogOut, Package, Settings } from 'lucide-react';

export default function AdminLayout({ children }: { children?: React.ReactNode }) {
  const navigate = useNavigate();
  
  return (
    <div className="flex min-h-screen w-full bg-gray-50">
      <Sidebar className="border-r border-gray-200">
        <SidebarHeader className="flex items-center px-4 h-14">
          <Link to="/admin" className="flex items-center gap-2">
            <Compass className="w-6 h-6 text-travel-teal" />
            <span className="font-bold text-lg text-travel-dark">TravelScribe</span>
          </Link>
        </SidebarHeader>
        <SidebarContent className="flex flex-col py-2">
          <div className="px-4 py-2">
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Management
            </h2>
            <nav className="mt-2 flex flex-col gap-1">
              <Button
                variant="ghost"
                className="justify-start gap-2"
                onClick={() => navigate('/admin')}
              >
                <Home className="w-4 h-4" />
                Dashboard
              </Button>
              <Button
                variant="ghost"
                className="justify-start gap-2"
                onClick={() => navigate('/admin/packages')}
              >
                <Package className="w-4 h-4" />
                Travel Packages
              </Button>
              <Button
                variant="ghost"
                className="justify-start gap-2"
                onClick={() => navigate('/admin/content')}
              >
                <FileText className="w-4 h-4" />
                Website Content
              </Button>
            </nav>
          </div>
        </SidebarContent>
        <SidebarFooter className="p-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Settings className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
            <div className="text-xs text-gray-500">
              Admin Panel v1.0
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-14 border-b border-gray-200 bg-white px-6 flex items-center justify-between">
          <h1 className="font-medium">Admin Dashboard</h1>
          <div className="flex items-center gap-2">
            <div className="text-sm font-medium">Admin User</div>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-6">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
}
