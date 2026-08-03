import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function useModal(success: boolean, redirectTo: string, delay = 3000) {
  const router = useRouter();

  useEffect(() => {
    if (!success) return;
    const timer = setTimeout(() => {
      router.push(redirectTo);
    }, delay);

    return () => clearTimeout(timer);
  }, [success, redirectTo, delay, router]);
}
