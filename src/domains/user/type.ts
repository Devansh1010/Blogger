export interface UserData {
  username?: string;
  email?: string;
  avatar?: string | null;
  coverImage?: string | null
  selectedBadges: string[] | []
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

export interface ActionsProps {
  id: string;
  slug: string;
  isFeatured?: boolean;
  isPublished?: boolean;
  isArticle: boolean;

  onDelete?: (id: string) => void;
  onFeature?: (id: string) => void;
  onUnpublish?: (id: string) => void;
}

export interface Badges {
  id: string,
  name: string,
  description?: string,
  icon: string,
  // optional metadata populated from BADGES constants
  category?: string,
  rarity?: string,
  color?: string,
}