import type { Trip } from "./map";

export type PlanTripItem = Trip & {
    day: number;
    visitOrder: number;
};

export interface PlanTripItemRequest {
    contentid: string; 
    visitOrder: number;
    day: number;
}

export interface PlanRequest {
    userId: string;
    title: string;
    startDate: string;
    endDate: string;
    memo?: string;
    planItem: PlanTripItemRequest[];
}

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