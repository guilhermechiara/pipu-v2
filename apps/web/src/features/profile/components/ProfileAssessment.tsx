import { ProfileAssessmentCompleted } from "./ProfileAssessmentCompleted";
import { Employee } from "../../employees/types/Employee";
import { ProfileNoAssessment } from "./ProfileNoAssessment";
import { useMyAssessments } from "../../assessments/hooks/useMyAssessments";

const ProfileAssessment = () => {
  const { data: assessments } = useMyAssessments();

  const employee: Employee = {
    name: "Vernon Dibbert",
    role: {
      id: "ce019b6f-6254-473a-9448-dada8a09dad4",
      name: "Direct Program Liaison",
    },
    chapter: "Tools",
    leadership: {
      id: "5ee142c3-bb7a-479d-9c9e-ce6103d7b795",
      name: "Leigh Kunze",
    },
    peoplePartner: {
      id: "7766fc6d-cdac-4a29-a21b-c5afe3d85c72",
      name: "Lauren Lakin",
    },
  };

  const hasAssessment = assessments && assessments.length > 0;

  if (hasAssessment) {
    return <ProfileAssessmentCompleted assessment={assessments[0]} />;
  }

  return <ProfileNoAssessment employee={employee} />;
};

export { ProfileAssessment };
