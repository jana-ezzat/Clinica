import { useApiMutation } from "@/shared/hooks/useApiMutation";
import { useQueryClient } from "@tanstack/react-query";
import { DeleteAwardRequest } from "../Requests/useDeleteAwards";
import { DeleteAwardResponse } from "../../lib/Profile";

export function useDeleteAward() {
  const queryClient = useQueryClient();
  return useApiMutation<string, DeleteAwardResponse>({
    mutationFn: DeleteAwardRequest,
    options: {
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: ["Awards"],
        });
      },
    },
  });
}
