import { create } from "zustand";
import type { Plan } from "../types/plan";
import API from "../api/axios";

interface PlanStore {
    plans: Plan[];
    fetchPlan: (userId: string) => Promise<void>;
    addPlan: (plan: Plan) => Promise<void>;
    deletePlan: (planId: string) => Promise<void>;
};

export const usePlanStore = create<PlanStore>((set) => ({
    plans: [],
    fetchPlan: async(userId) => {
        try {
            const response = await API.get(`/plan/${userId}`);
            const planData = response.data;

            set({ plans: planData });
        } catch (err) {
            console.error(`fetchPlan 실패: ${err}`);
        }
    },
    addPlan: async(plan) => {
        try {
            const response = await API.post('/plan', plan);
            const data = response.data;
            set(state => ({
                plans: [data, ...state.plans]
            }));
        } catch (err) {
            console.error(`addPlan 실패: ${err}`);
        }
    },
    deletePlan: async(planId) => {
        try {
            await API.delete(`/plan/${planId}`);
            set(state => ({
                plans: state.plans.filter(plan => plan.id !== Number(planId))
            }))
        } catch (err) {
            console.error(`deletePlan 실패: ${err}`);
        }
    }
}));