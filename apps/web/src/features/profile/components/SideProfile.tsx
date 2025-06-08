import Image from "next/image";
import NoProfilePicture from "../../../../public/images/no-profile-picture.webp";
import { useContext } from "react";
import { ProfileContext } from "../../../lib/providers/ProfileProvider";

const ProfileImage = () => (
  <div className="flex justify-center">
    <Image
      src={NoProfilePicture}
      alt="Profile picture"
      width={133}
      height={133}
      className="rounded-full"
    />
  </div>
);

interface ProfileContentItemProps {
  label: string;
  value: string;
}

const ProfileContentItem = ({ label, value }: ProfileContentItemProps) => {
  return (
    <div>
      <p className="text-sm font-light">{label}</p>
      <p className="text-lg">{value}</p>
    </div>
  );
};

const SideProfile = () => {
  const profile = useContext(ProfileContext);

  if (!profile) return <p>No profile</p>;

  return (
    <div className="h-[calc(100vh_-_theme(spacing.20)_-_10rem)] flex flex-col items-center border rounded-lg p-8 gap-8">
      <ProfileImage />
      <h3 className="font-medium text-lg">{profile.name}</h3>
      <div className="flex flex-col self-start gap-8">
        <ProfileContentItem label="Cargo" value={profile.role.name} />
        <ProfileContentItem label="Chapter" value={profile.chapter} />
        <ProfileContentItem label="Liderança" value={profile.leadership.name} />
        <ProfileContentItem label="RH" value={profile.peoplePartner.name} />
      </div>
    </div>
  );
};

export { SideProfile };
