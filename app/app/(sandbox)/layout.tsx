import { Sidebar } from "@/components/sandbox/sidebar";
import { Header } from "@/components/sandbox/header";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col ml-64">
          <Header />
          <main className="flex-1 overflow-auto bg-gray-50">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
