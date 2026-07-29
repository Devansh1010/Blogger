import { useQuery } from "@tanstack/react-query";
import { checkUsernameUnique } from "../../axios/user.axios";

interface UseCheckUsernameProps {
  username: string;
  currentUsername?: string;
}

export const useCheckUsername = ({
  username,
  currentUsername,
}: UseCheckUsernameProps) => {

  const normalizedUsername = username.trim().toLowerCase();
  const normalizedCurrentUsername = currentUsername?.trim().toLowerCase();

  return useQuery({
    queryKey: ["check-username", normalizedUsername],

    queryFn: () => checkUsernameUnique(normalizedUsername),

    enabled:
      normalizedUsername.length >= 3 &&
      normalizedUsername !== normalizedCurrentUsername,

    retry: false,

    staleTime: 0,
  });
};