import { AdminSidebar } from "@/components/platform/sidebar";
import { AdminHeader } from "@/components/platform/header";

export default function PlatformLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <div className="flex-1 flex flex-col ml-64">
        <AdminHeader title="Dashboard" />
        <main className="flex-1 overflow-auto bg-gray-50">{children}</main>
      </div>
    </div>
  );
}
