"use client";

import { useRouter } from "next/navigation";
import { ResourceTypeForm } from "@/components/resource-type-form";
import { useTheme } from "@/components/theme-provider";

export default function NewResourceTypePage() {
  const router = useRouter();
  const { theme } = useTheme();

  const handleCancel = () => {
    router.back();
  };

  const handleSuccess = () => {
    router.push("/resource-types");
  };

  return (
    <div
      className={`min-h-screen ${
        theme === "dark" ? "bg-zinc-950" : "bg-gray-100"
      } flex items-center justify-center p-4`}
    >
      <ResourceTypeForm onCancel={handleCancel} onSuccess={handleSuccess} />
    </div>
  );
}
