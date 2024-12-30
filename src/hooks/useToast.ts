"use client";

import { toast } from "sonner";

export const useToast = () => {
  const notify = ({
    type,
    action,
    message,
    description,
  }: {
    action?: { label: string; onClick: () => void };
    message: string;
    description: string;
    type: "error" | "info" | "success" | "warning";
  }) => {
    return toast[type](message, {
      description,
      action,
    });
  };

  return { notify };
};
