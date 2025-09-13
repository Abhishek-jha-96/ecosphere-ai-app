"use client";

import * as React from "react";
import { toast as sonnerToast } from "sonner";

type Toast = {
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
};

function useToast() {
  return {
    toast: ({ title, description, action }: Toast) => {
      sonnerToast(title, {
        description,
        action,
      });
    },
    dismiss: (toastId?: string) => {
      sonnerToast.dismiss(toastId);
    },
  };
}

export { useToast, sonnerToast as toast };
