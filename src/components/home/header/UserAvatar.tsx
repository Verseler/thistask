import { AvatarImage, AvatarFallback, Avatar } from "@radix-ui/react-avatar";

type UserAvatarProps = {
  src: string;
  name: string;
};

const UserAvatar = ({ src, name }: UserAvatarProps) => {
  const nameInitial = getInitials(name);
  return (
    <Avatar>
      <AvatarImage className="rounded-full " src={src} alt="user profile" />
      <AvatarFallback>{nameInitial}</AvatarFallback>
    </Avatar>
  );
};

function getInitials(name: string) {
  const nameParts = name?.split(" ") || "?";

  if (nameParts.length >= 2) {
    return nameParts[0][0]?.toUpperCase();
  }

  return nameParts[0]?.toUpperCase();
}

export default UserAvatar;
