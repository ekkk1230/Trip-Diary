import type { Trip } from "./map";

export type PlanTripItem = Trip & {
    day: number;
};

export interface Plan {
    id?: number;
    userId: string;
    title: string;
    startDate: string;
    endDate: string;
    memo?: string;
    planItem: PlanTripItem[];
    createdAt?: string;
}