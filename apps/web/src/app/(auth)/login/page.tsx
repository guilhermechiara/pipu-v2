import { LoginForm } from "../../../features/auth/components/LoginForm";
import MainImage from "../../../../public/images/people_mountain.png";
import Image from "next/image";
import Logo from "../../../../public/images/pipu-logo-white.png";

export default function Page() {
  return (
    <div className="grid h-[calc(100vh_-_theme(spacing.20))] grid-cols-5 gap-0">
      <div
        className="bg-cover bg-center bg-no-repeat flex justify-center col-span-2"
        style={{ backgroundImage: `url(${MainImage.src})` }}
      >
        <div className="mt-48">
          <Image src={Logo} alt="Pipu Logo" width={310} height={99} />
        </div>
      </div>

      <div className="h-full bg-background flex justify-center items-center col-span-3">
        <LoginForm />
      </div>
    </div>
  );
}
