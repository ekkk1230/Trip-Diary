import { create } from "zustand";

interface JournalStore {
    currentJournal: any | null;
    isEdit: Boolean;
    editData: any;
}