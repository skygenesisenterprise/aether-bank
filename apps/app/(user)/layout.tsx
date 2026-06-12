import { UserSidebar } from "@/components/user/user-sidebar";
import { UserHeader } from "@/components/user/user-header";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <div className="flex h-screen">
        <UserSidebar />
        <div className="flex-1 flex flex-col ml-64">
          <UserHeader />
          <main className="flex-1 overflow-auto bg-gray-50">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
