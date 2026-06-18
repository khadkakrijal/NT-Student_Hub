import { redirect } from "next/navigation";
import { createClient } from "../lib/supabase/server";
import AdminSidebar from "../components/admin/AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") redirect("/dashboard");

  return (
    <div className="min-h-screen bg-[#12091f]">
      <AdminSidebar />

      <main className="px-6 py-10 lg:ml-72 lg:px-10">{children}</main>
    </div>
  );
}
