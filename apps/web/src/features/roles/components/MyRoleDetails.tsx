import { RoleOutlineCard } from "./RoleOutlineCard";
import { useRole } from "../hooks/useRole";
import { useContext } from "react";
import { ProfileContext } from "../../../lib/providers/ProfileProvider";
import { ExpectedCompetencesCard } from "../../competences/components/ExpectedCompetencesCard";

const MyRoleDetails = () => {
  const profile = useContext(ProfileContext);
  const { data: role } = useRole({ id: profile.role.id });

  return (
    <div className="flex flex-col gap-8">
      <RoleOutlineCard role={role} />
      <ExpectedCompetencesCard competences={role.competences} />
    </div>
  );
};

export { MyRoleDetails };
