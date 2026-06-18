"use client";

import Swal from "sweetalert2";
import { deleteUserProfile, updateUserRole } from "@/app/actions/adminActions";

type Role = "student" | "host" | "admin";

export default function AdminUserActions({
  userId,
  currentRole,
}: {
  userId: string;
  currentRole: Role;
}) {
  async function handleRoleChange(role: Role) {
    const result = await updateUserRole(userId, role);

    Swal.fire({
      icon: result.success ? "success" : "error",
      title: result.success ? "Updated" : "Failed",
      text: result.message,
      background: "#1d0f33",
      color: "#fff",
      confirmButtonColor: "#a78bfa",
    });
  }

  async function handleDelete() {
    const confirm = await Swal.fire({
      icon: "warning",
      title: "Delete user profile?",
      text: "This removes the profile row, not the auth user.",
      showCancelButton: true,
      confirmButtonText: "Delete",
      background: "#1d0f33",
      color: "#fff",
      confirmButtonColor: "#ef4444",
    });

    if (!confirm.isConfirmed) return;

    const result = await deleteUserProfile(userId);

    Swal.fire({
      icon: result.success ? "success" : "error",
      title: result.success ? "Deleted" : "Failed",
      text: result.message,
      background: "#1d0f33",
      color: "#fff",
      confirmButtonColor: "#a78bfa",
    });
  }

  return (
    <div className="flex flex-wrap gap-2 w-full">
      <select
        defaultValue={currentRole}
        onChange={(e) => handleRoleChange(e.target.value as Role)}
        className="rounded-full border border-violet-100/10 bg-[#1d0f33] px-3 py-2 text-xs text-white outline-none cursor-pointer"
      >
        <option value="student">Student</option>
        <option value="host">Host</option>
        <option value="admin">Admin</option>
      </select>

      <button
        onClick={handleDelete}
        className="rounded-full bg-red-500 px-4 py-2 text-xs font-bold text-white hover:bg-red-400 cursor-pointer"
      >
        Delete
      </button>
    </div>
  );
}
