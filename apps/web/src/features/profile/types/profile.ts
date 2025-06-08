export type Profile = {
  name: string;
  profile: "individual_contributor" | "leader";
  role: {
    id: string;
    name: string;
  };
  chapter: string;
  leadership: {
    id: string;
    name: string;
  };
  peoplePartner: {
    id: string;
    name: string;
  };
};

export type ProfileRequest = void;
export type ProfileResponse = Profile;
