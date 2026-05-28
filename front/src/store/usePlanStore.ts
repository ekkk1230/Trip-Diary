import { create } from "zustand";
import type { Plan } from "../types/plan";
import API from "../api/axios";

interface PlanStore {
    plans: Plan[];
    fetchPlan: (userId: string) => Promise<void>;
};

export const usePlanStore = create<PlanStore>((set) => ({
    plans: [],
    fetchPlan: async(userId) => {
        try {
            const response = await API.get('/plan');
            const planData = response.data;

            set({ plans: planData });
        } catch (err) {
            console.error(`fetchPlan 실패: ${err}`);
        }
    },
}));