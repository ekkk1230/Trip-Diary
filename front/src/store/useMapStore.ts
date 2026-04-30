import { create } from "zustand";
import { fetchAllTourData } from "../api/tourApi";

const API_CODE_MAP: { [key: string]: string } = {
  "21": "6",  "26": "7",  "38": "36", 
  "22": "4",  "11": "1",  "31": "31", 
  "32": "32", "33": "33", "34": "34", 
  "35": "37", "36": "38", "37": "35", 
  "39": "39", "23": "2",  "12": "3",
  "24": "5",  "25": "8"
};

interface MapStore {
    title: string;
    selectedRegion: any | null;
    selectedSigungu: any | null;
    filteredData: any[];
    isLoading: boolean;
    isSearched: boolean;

    setTitle: (newTitle: string) => void;
    setSelectedRegion: (region: any | null) => void;
    setSelectedSigungu: (sigungu: any | null) => void;
    setFilteredData: (data: any[]) => void;
    fetchAndFilterData: (geo: any) => Promise<void>;
    resetMap: () => void;
}

export const useMapStore = create<MapStore>((set, get) => ({
    title: '지도',
    selectedRegion: null,
    selectedSigungu: null,
    filteredData: [],
    isLoading: false,
    isSearched: false,

    setTitle: (newTitle) => set({ title: newTitle }),
    setSelectedRegion: (region) => set({ selectedRegion: region }),
    setSelectedSigungu: (sigungu) => set({ selectedSigungu: sigungu }),
    setFilteredData: (data) => set({ filteredData: data }),

    fetchAndFilterData: async (geo: any, contentTypeId?: string | number | null) => {
        // console.log("전달된 geo 데이터:", geo);
        const name = geo.properties.name;
        const code = geo.properties.code;
        const provinceCode = code.substring(0, 2);
        const apiAreaCode = API_CODE_MAP[provinceCode] || provinceCode;

        set({ filteredData: [], isLoading: true, selectedSigungu: name, isSearched: true });

        try {
            const allItems = await fetchAllTourData(apiAreaCode, contentTypeId);
            
            const keyword = name.replace(/시|군|구/g, "");
            const filtered = allItems.filter((item: any) => 
                item.addr1 && item.addr1.includes(keyword)
            );

            set({ filteredData: filtered, isLoading: false });
        } catch (error) {
            console.error("데이터 로딩 실패:", error);
            set({ isLoading: false });
        }
    },

    resetMap: () => set({ selectedRegion: null, selectedSigungu: null, filteredData: [], title: "지도" }),
}))