import { create } from "zustand";
import { persist } from "zustand/middleware";
import { fetchAllTourData } from "../api/tourApi";

const API_CODE_MAP: { [key: string]: string } = {
  "21": "6",  "26": "7",  "38": "36", 
  "22": "4",  "11": "1",  "31": "31", 
  "32": "32", "33": "33", "34": "34", 
  "35": "37", "36": "38", "37": "35", 
  "39": "39", "23": "2",  "12": "3",
  "24": "5",  "25": "8"
};

export const categoryMap = {
    "관광지": "12",
    "문화시설": "14",
    "축제/공연/행사": "15",
    "여행코스": "25",
    "레포츠": "28",
    "숙박": "32",
    "쇼핑": "38",
    "음식점": "39",
} as const;

export interface Trip {
    addr1: string;
    addr2?: string;
    areacode?: string;
    cat1?: string;
    cat2?: string;
    cat3?: string;
    contentid: string;
    contenttypeid: string;
    cpyrhtDivCd?: string;
    createdtime?: string;
    firstimage?: string;
    firstimage2?: string;
    homepage?: string;
    lDongRegnCd?: string;
    lDongSignguCd? : string;
    lclsSystm1?: string;
    lclsSystm2?: string;
    lclsSystm3?: string;
    mapx?: string;
    mapy?: string;
    mlevel?: string;
    modifiedtime?: string;
    overview: string;
    sigungucode?: string;
    tel?: string;
    telname?: string;
    title: string;
    zipcode?: string;
    isCustom?: boolean;
}

interface MapStore {
    allTourList: Trip[];
    customPlaces: Trip[];
    favoriteList: any[];
    selectedRegion: any | null;
    selectedSigungu: any | null;
    filteredData: Trip[];
    isLoading: boolean;
    isSearched: boolean;

    toggleFavorite: (id: string) => void;
    setSelectedRegion: (region: any | null) => void;
    setSelectedSigungu: (sigungu: any | null) => void;
    setFilteredData: (data: Trip[]) => void;
    refreshFilteredData: (apiItems: any[]) => void;
    fetchAndFilterData: (geo: any) => Promise<void>;
    addCustomPlaces: (place: Trip) => void;
    resetMap: () => void;
}

export const useMapStore = create<MapStore>()(
    persist(
        (set, get) => ({
            allTourList: [],
            customPlaces: [],
            favoriteList: [],
            selectedRegion: null,
            selectedSigungu: null,
            filteredData: [],
            isLoading: false,
            isSearched: false,
        
            toggleFavorite: id => set(state => {
                const isExisted = state.favoriteList.some(item => item.contentid === id);
        
                if (isExisted) {
                    return { favoriteList: state.favoriteList.filter(item => item.contentid !== id) };
                } else {
                    const item = [...state.allTourList, ...state.customPlaces].find(t => t.contentid === id);
                    return item ? { favoriteList: [item, ...state.favoriteList] } : state;
                }
            }),
            setSelectedRegion: (region) => set({ selectedRegion: region }),
            setSelectedSigungu: (sigungu) => set({ selectedSigungu: sigungu }),
            setFilteredData: (data) => set({ filteredData: data }),
        
        
            refreshFilteredData: (apiItems) => {
                const { customPlaces, selectedSigungu } = get();

                if (!selectedSigungu) {
                    set({ filteredData: apiItems });
                    return;
                }
        
                const keyword = selectedSigungu.replace(/시|군|구/g, "").replace(/\s+/g, "");
                if (!keyword) {
                    set({ filteredData: apiItems });
                    return;
                }
                
                const filterFn = (item: Trip) => {
                    if (!item.addr1) return false;
                
                    const keyword = selectedSigungu
                        .replace(/\s+/g, "")
                        .replace(/시|군|구/g, "");
                
                    const addrParts = item.addr1.split(" ");
                    
                    const combinedAddr = (addrParts[1] + (addrParts[2] || ""))
                        .replace(/\s+/g, "")
                        .replace(/시|군|구/g, "");
                
                    return combinedAddr.startsWith(keyword);
                };

                const myLocalPlaces = customPlaces.filter(filterFn);
                const filteredApiItems = apiItems.filter(filterFn);
        
                set({ filteredData: [...myLocalPlaces, ...filteredApiItems] });
            },
            fetchAndFilterData: async (geo: any, contentTypeId?: string | number | null) => {
                // console.log("전달된 geo 데이터:", geo);
                const name = geo.properties.name;
                const code = geo.properties.code;
                const provinceCode = code.substring(0, 2);
                const apiAreaCode = API_CODE_MAP[provinceCode] || provinceCode;
        
                set({ filteredData: [], isLoading: true, selectedSigungu: name, isSearched: true });
        
                try {
                    const allItems = await fetchAllTourData(apiAreaCode, contentTypeId);
        
                    set((state) => {
                        const newAllList = [...state.allTourList];
                        allItems.forEach((newItem: Trip) => {
                            if (!newAllList.some(existing => existing.contentid === newItem.contentid)) {
                                newAllList.push(newItem);
                            }
                        });
        
                        return { allTourList: newAllList };
                    });
        
                    get().refreshFilteredData(allItems);
         
                    set({ isLoading: false });
                } catch (error) {
                    console.error("데이터 로딩 실패:", error);
                    set({ isLoading: false });
                }
            },
            addCustomPlaces: (place) => {
                console.log(place)
                set((state) => ({ customPlaces: [place, ...state.customPlaces] }));
                const { filteredData } = get();
                set({ filteredData: [place, ...filteredData] });
            },
        
            resetMap: () => set({ selectedRegion: null, selectedSigungu: null, filteredData: [], isSearched: false }),
        
        }),
        {
            name: "map-storage",
            partialize: (state) => ({ 
                customPlaces: state.customPlaces, 
                favoriteList: state.favoriteList 
            }),
        }
    )
)