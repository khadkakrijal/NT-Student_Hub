"use client";

import Image from "next/image";
import { Upload, Trash2 } from "lucide-react";

type Props = {
  preview: string | null;
  onFileChange: (file: File | null) => void;
};

export default function ImageUploader({
  preview,
  onFileChange,
}: Props) {
  return (
    <div className="space-y-4">
      {preview ? (
        <div className="relative overflow-hidden rounded-3xl border border-violet-100/10">
          <Image
            src={preview}
            alt="Preview"
            width={1200}
            height={600}
            className="h-64 w-full object-cover"
          />
        </div>
      ) : (
        <div className="flex h-64 items-center justify-center rounded-3xl border border-dashed border-violet-100/15 bg-white/[0.04]">
          <div className="text-center">
            <Upload className="mx-auto h-10 w-10 text-fuchsia-300" />
            <p className="mt-3 text-sm text-violet-50/60">
              Upload Event Banner
            </p>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        <label className="cursor-pointer rounded-2xl bg-violet-400 px-5 py-3 font-bold text-[#160524] hover:bg-violet-300">
          Choose Image

          <input
            hidden
            type="file"
            accept="image/*"
            onChange={(e) =>
              onFileChange(
                e.target.files?.[0] || null
              )
            }
          />
        </label>

        {preview && (
          <button
            type="button"
            onClick={() => onFileChange(null)}
            className="rounded-2xl bg-red-500 px-5 py-3 font-bold text-white hover:bg-red-400"
          >
            <Trash2 className="mr-2 inline h-4 w-4" />
            Remove
          </button>
        )}
      </div>
    </div>
  );
}