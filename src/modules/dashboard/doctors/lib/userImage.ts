export type UserImage =
  | {
      url?: string;
      public_id?: string;
    }
  | string
  | null
  | undefined;

export const resolveUserImage = (img: UserImage): string => {
  if (!img) return "";
  if (typeof img === "string") return img.trim();
  return img.url?.trim() ?? "";
};
