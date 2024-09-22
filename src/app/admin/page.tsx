// app/(panel)/admin/page.tsx
import AdminCard from "@/components/AdminCard";
import AdminSidebar from "@/components/AdminSideBar";
import AdminHeader from "@/components/AdminHeader";

export const description = "Un dashboard des produits et catégories";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <AdminSidebar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <AdminHeader />
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <AdminCard />
        </main>
      </div>
    </div>
  );
}