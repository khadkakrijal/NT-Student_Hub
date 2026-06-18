"use client";

import { useState } from "react";
import Swal from "sweetalert2";
import { Pencil } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { updateUserProfile } from "@/app/actions/adminActions";

type Role = "student" | "host" | "admin";

type UserProfile = {
  id: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  university: string | null;
  role: Role;
};

export default function EditUserDialog({ user }: { user: UserProfile }) {
  const [open, setOpen] = useState(false);
  const [fullName, setFullName] = useState(user.full_name || "");
  const [email, setEmail] = useState(user.email || "");
  const [phone, setPhone] = useState(user.phone || "");
  const [university, setUniversity] = useState(user.university || "");
  const [role, setRole] = useState<Role>(user.role || "student");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const result = await updateUserProfile({
      id: user.id,
      full_name: fullName,
      email,
      phone,
      university,
      role,
    });

    setLoading(false);

    await Swal.fire({
      icon: result.success ? "success" : "error",
      title: result.success ? "Updated" : "Failed",
      text: result.message,
      background: "#1d0f33",
      color: "#fff",
      confirmButtonColor: "#a78bfa",
    });

    if (result.success) setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="rounded-full bg-violet-400 px-4 py-2 text-xs font-bold text-[#160524] hover:bg-violet-300">
          <Pencil className="mr-1 inline h-3 w-3" />
          Edit
        </button>
      </DialogTrigger>

      <DialogContent className="border-violet-100/10 bg-[#1d0f33] text-white sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription className="text-violet-100/70">
            Update user profile and role.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-4 grid gap-4">
          <Field label="Full Name">
            <input
              className="input-style"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </Field>

          <Field label="Email">
            <input
              className="input-style"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Field>

          <Field label="Phone">
            <input
              className="input-style"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </Field>

          <Field label="Role">
            <select
              className="input-style bg-[#1d0f33] text-white"
              value={role}
              onChange={(e) => {
                const selected = e.target.value as Role;
                setRole(selected);
                if (selected !== "student") setUniversity("");
              }}
            >
              <option value="student">Student</option>
              <option value="host">Host / Housemate</option>
              <option value="admin">Admin</option>
            </select>
          </Field>

          {role === "student" && (
            <Field label="University">
              <input
                className="input-style"
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
              />
            </Field>
          )}

          <button
            disabled={loading}
            className="rounded-2xl bg-violet-400 px-5 py-3 font-bold text-[#160524] hover:bg-violet-300 disabled:opacity-60"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-violet-50">
        {label}
      </label>
      {children}
    </div>
  );
}
