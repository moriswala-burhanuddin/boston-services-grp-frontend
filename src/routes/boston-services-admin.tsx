import { createFileRoute, Outlet, Link, useLocation, redirect, useNavigate } from "@tanstack/react-router";
import { LayoutDashboard, Inbox, Blocks, Settings, LogOut, Menu, X, Search, Bell } from "lucide-react";
import { useState } from "react";
import { getToken, removeToken } from "@/lib/auth";
import logo from "@/assets/final-logo-Photoroom.png";

export const Route = createFileRoute("/boston-services-admin")({
  beforeLoad: ({ location }) => {
    if (!getToken() && location.pathname !== '/boston-services-admin/login') {
      throw redirect({
        to: "/boston-services-admin/login",
      });
    }
  },
  component: AdminLayout,
});

const navigation = [
  { name: "Overview", href: "/boston-services-admin", icon: LayoutDashboard },
  { name: "Inbox", href: "/boston-services-admin/quotes", icon: Inbox },
  { name: "Services", href: "/boston-services-admin/services", icon: Blocks },
  // { name: "Settings", href: "/boston-services-admin/settings", icon: Settings },
];

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    navigate({ to: "/boston-services-admin/login" });
  };

  if (location.pathname === '/boston-services-admin/login') {
    return <Outlet />;
  }

  const currentRouteName = navigation.find((n) => n.href === location.pathname)?.name || "Overview";

  return (
    <div className="min-h-screen bg-[#f3f4f6] flex font-sans text-ink overflow-hidden">

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-ink/50 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Full Height Orange Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-[280px] bg-[#ff6b00] text-white shadow-2xl transform transition-transform duration-300 ease-out lg:translate-x-0 lg:static flex flex-col ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        {/* Sidebar Header with Logo */}
        <div className="flex items-center justify-between h-20 px-8 shrink-0">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg p-1.5 shrink-0">
              <img src={logo} alt="Boston Services Logo" className="w-full h-full object-contain" />
            </div>
            <span className="text-xl font-black tracking-tight text-white leading-tight">
              Admin Hub
            </span>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-white/70 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-8 space-y-1.5 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold text-[14px] transition-all duration-200 ${isActive
                    ? "bg-white text-[#ff6b00] shadow-[0_4px_12px_rgba(0,0,0,0.1)]"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                  }`}
              >
                <item.icon className={`w-[18px] h-[18px] ${isActive ? "text-[#ff6b00]" : "text-white/70"}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 shrink-0">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3.5 rounded-xl font-bold text-[14px] text-white/80 hover:bg-white/10 hover:text-white transition-colors duration-200"
          >
            <LogOut className="w-[18px] h-[18px]" />
            Log out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-white h-screen overflow-hidden relative shadow-[-10px_0_30px_rgba(0,0,0,0.05)] z-10">

        {/* Top Header */}
        <header className="h-20 flex items-center justify-between px-8 lg:px-12 border-b border-gray-100 shrink-0 bg-white z-20">

          {/* Left: Breadcrumb / Mobile Menu Toggle */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-gray-500 hover:text-ink transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="hidden sm:flex items-center gap-2 text-sm font-bold">
              <span className="text-gray-400">Admin</span>
              <span className="text-gray-300">/</span>
              <span className="text-ink">{currentRouteName}</span>
            </div>
          </div>

          {/* Right: Search & Profile */}
          <div className="flex items-center gap-6">
            {/* Search */}
            <div className="hidden md:flex items-center gap-2 px-4 py-2.5 bg-gray-50 rounded-full border border-gray-100 focus-within:ring-2 focus-within:ring-[#ff6b00]/20 focus-within:border-[#ff6b00] transition-all">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search anything..."
                className="bg-transparent border-none outline-none text-[13px] font-medium w-48 placeholder:text-gray-400 text-ink"
              />
            </div>

            {/* Notifications */}
            <button className="relative text-gray-400 hover:text-ink transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-[#ff6b00] rounded-full border border-white"></span>
            </button>

            {/* Profile */}
            <div className="flex items-center gap-3 pl-6 border-l border-gray-100">
              <div className="text-right hidden lg:block">
                <div className="text-[13px] font-bold text-ink">Admin User</div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Workspace Owner</div>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#ff6b00]/10 text-[#ff6b00] flex items-center justify-center font-black text-sm border border-[#ff6b00]/20">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Page Content */}
        <div className="flex-1 overflow-auto bg-[#f8f9fc]">
          <div className="max-w-[1400px] mx-auto p-8 lg:p-12">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
