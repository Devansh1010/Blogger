export interface UserData {
  username?: string;
  email?: string;
  avatar?: string | null;
  coverImage?: string | null
}

interface CheckUsernameResponse {
  success: boolean,
  message: string
}
export interface UsernameFieldProps {
  mutationPending: boolean;
  currentUsername: string
  usernameData?: CheckUsernameResponse;
  debouncedValue?: string
}