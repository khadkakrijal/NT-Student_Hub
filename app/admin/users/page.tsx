import { getAllUsers } from "@/app/api/apiServices/adminService";
import EditUserDialog from "@/app/components/admin/EditUserDialog";
import DeleteUserButton from "@/app/components/admin/DeleteUserButton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function AdminUsersPage() {
  const users = await getAllUsers();

  return (
    <div>
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-fuchsia-300">
            Admin Users
          </p>

          <h1 className="mt-3 text-2xl font-black">Users</h1>

          <p className="mt-3 text-violet-50/70">
            Manage student, host, and admin profile records.
          </p>
        </div>
      </div>

      <div className="mt-8 overflow-hidden rounded-3xl border border-violet-100/10 bg-white/[0.06] backdrop-blur-xl">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-violet-100/10 hover:bg-transparent">
                <TableHead className="text-violet-100/70">Name</TableHead>
                <TableHead className="text-violet-100/70">Email</TableHead>
                <TableHead className="text-violet-100/70">Phone</TableHead>
                <TableHead className="text-violet-100/70">University</TableHead>
                <TableHead className="text-violet-100/70">Role</TableHead>
                <TableHead className="text-right text-violet-100/70">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {users.map((user) => (
                <TableRow
                  key={user.id}
                  className="border-violet-100/10 hover:bg-white/[0.04]"
                >
                  <TableCell className="font-medium text-white">
                    {user.full_name || "No name"}
                  </TableCell>

                  <TableCell className="text-violet-50/70">
                    {user.email || "No email"}
                  </TableCell>

                  <TableCell className="text-violet-50/70">
                    {user.phone || "-"}
                  </TableCell>

                  <TableCell className="text-violet-50/70">
                    {user.university || "-"}
                  </TableCell>

                  <TableCell>
                    <span className="rounded-full bg-violet-400/15 px-3 py-1 text-xs font-semibold capitalize text-fuchsia-200">
                      {user.role || "student"}
                    </span>
                  </TableCell>

                  <TableCell>
                    <div className="flex justify-end gap-2">
                      <EditUserDialog
                        user={{
                          id: user.id,
                          full_name: user.full_name,
                          email: user.email,
                          phone: user.phone,
                          university: user.university,
                          role: user.role || "student",
                        }}
                      />

                      <DeleteUserButton userId={user.id} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}

              {!users.length && (
                <TableRow>
                  <TableCell colSpan={6} className="py-12 text-center">
                    <h2 className="text-xl font-bold text-white">
                      No users found
                    </h2>
                    <p className="mt-2 text-violet-50/60">
                      User profiles will appear here after signup.
                    </p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
