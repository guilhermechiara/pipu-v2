export interface Employee {
    name: string;
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
}