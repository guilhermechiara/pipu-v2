import { Role } from "../types/role";
import {
  OutlineCard,
  OutlineCardContent,
  OutlineCardHeader,
} from "@pipu/ui/components";
import { User } from "lucide-react";

interface RoleOutlineCardProps {
  role: Role;
}

const RoleOutlineCard = ({ role }: RoleOutlineCardProps) => {
  return (
    <OutlineCard type="warning">
      <OutlineCardHeader className="flex flex-row">
        <User className="mr-4" /> {role.name}
      </OutlineCardHeader>
      <OutlineCardContent>{role.description}</OutlineCardContent>
    </OutlineCard>
  );
};

export { RoleOutlineCard };
