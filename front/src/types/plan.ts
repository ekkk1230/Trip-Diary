import type { Trip } from "./map";

export interface Plan {
    id?: number;
    userId: string;
    title: string;
    startDate: string;
    endDate: string;
    memo?: string;
    planItem: Trip[];
    createdAt?: string;
}