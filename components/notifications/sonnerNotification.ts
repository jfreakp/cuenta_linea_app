import { toast } from "sonner";

interface SonnerNotificationProps {
  type: "success" | "error" | "info";
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "top-center" | "bottom-center";
  message: string;
  description?: string;
  duration?: number;
}

/**
 * Small helper to show Sonner toasts from non-React contexts.
 * Use as: SonnerNotification({ type: 'error', message: '...' })
 */
export const SonnerNotification = ({
  type,
  message,
  description,
  duration,
  position,
}: SonnerNotificationProps): void => {
  const opts = { description, duration: duration ?? 5000, position };

  if (type === "success") {
    toast.success(message, { ...opts, style: { background: "#16a34a", color: "#fff" } });
    return;
  }

  if (type === "error") {
    toast.error(message, { ...opts, style: { background: "#dc2626", color: "#fff" } });
    return;
  }

  // info
  toast.info(message, { ...opts, style: { background: "#2563eb", color: "#fff" } });
};
