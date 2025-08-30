import { Injectable } from "@nestjs/common";
import { IQuery } from "@app/common/interfaces/query";
import { AuthenticatedUser } from "@app/modules/auth/types/authenticated-user";

export type GetCurrentProfileQueryInput = {
  user: AuthenticatedUser;
};
export type GetCurrentProfileQueryOutput = {
  userId: string;
  employeeId: string;
  name: string;
  profile: "individual_contributor";
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

@Injectable()
export class GetCurrentProfileQuery
  implements IQuery<GetCurrentProfileQueryInput, GetCurrentProfileQueryOutput>
{
  async execute(
    input: GetCurrentProfileQueryInput,
  ): Promise<GetCurrentProfileQueryOutput> {
    return {
      userId: `ashduahsd`,
      name: `Someone who's been testing`,
      chapter: `Some chapter`,
      profile: "individual_contributor",
      role: {
        id: `asdasdas`,
        name: "testing",
      },
      leadership: {
        id: `asdasdas`,
        name: "testing",
      },
      peoplePartner: {
        id: `asdasdas`,
        name: "testing",
      },
      employeeId: `asdihuahsdiuhaisud`,
    };
  }
}
