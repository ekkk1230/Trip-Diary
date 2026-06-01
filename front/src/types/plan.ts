import type { Trip } from "./map";

export type PlanTripItem = Trip & {
    contentid: string;
    title: string;
    addr1: string;
    firstimage: string;
    mapx: string;
    mapy: string;
    contenttypeid: string;
    isCustom: boolean;
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