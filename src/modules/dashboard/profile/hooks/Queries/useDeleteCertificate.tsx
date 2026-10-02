import { useApiMutation } from "@/shared/hooks/useApiMutation";
import { DeleteCertificateRequest } from "../Requests/useDeleteAwards";
import { useQueryClient } from "@tanstack/react-query";
import { DeleteAwardResponse } from "../../lib/Profile";

export function useDeleteCertificate() {
  const queryClient = useQueryClient();
  return useApiMutation<string, DeleteAwardResponse>({
    mutationFn: DeleteCertificateRequest,
    options: {
      onSuccess: async () => {
        queryClient.invalidateQueries({
          queryKey: ["Certificate"],
        });
      },
    },
  });
}
