import { ReactNode } from "react";
import { Header } from "../components/admin-header";
import { AdminSidebar } from "../components/admin-sidebar";

const AdminPage = ({ children }: { children?: ReactNode }) => {
  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
};

export default AdminPage;
