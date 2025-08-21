import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Title,
} from "@pipu/ui/components";
import { useEmployeeAvatarQuery } from "../hooks/useEmployeeAvatarQuery";

export interface EmployeeAvatarProps {
  image: string;
  fallback: string;
}

export function EmployeeAvatar({ image, fallback }: EmployeeAvatarProps) {
  return (
    <Avatar className="h-16 w-16">
      <AvatarImage src={image} />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
}

export interface EmployeeAvatarCardProps {
  employeeId: string;
}

export function EmployeeAvatarCard({ employeeId }: EmployeeAvatarCardProps) {
  const { data } = useEmployeeAvatarQuery({ id: employeeId });

  return (
    <div className="flex flex-row gap-4">
      <EmployeeAvatar image={data?.image} fallback={data?.fallback} />
      <div>
        <Title as="h3" className="text-black">
          {data?.name}
        </Title>
        <p>{data?.role?.name}</p>
      </div>
    </div>
  );
}
