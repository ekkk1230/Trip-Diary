import { create } from "zustand";
import { persist } from "zustand/middleware";
import { fetchAllTourData } from "../api/tourApi";
import { API_CODE_MAP } from "../constants/API_CODE_MAP";

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
    author?: string;
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
    updateCustomPlace: (updatePlace: Trip) => void;
    removeCustomPlace: (contentid: string) => void;

    getMyPlaces: (nickname: string | undefined) => Trip[];

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
            
                const { name: sigunguName, areaCode: targetAreaCode } = selectedSigungu;
            
                // console.log("기준 시군구:", sigunguName);
                // console.log("기준 지역코드(targetAreaCode):", targetAreaCode);
            
                const filterFn = (item: Trip) => {
                    // 1. 지역코드 비교 디버깅
                    if (item.areacode) {
                        const isAreaMatch = String(item.areacode) === String(targetAreaCode);
                        if (!isAreaMatch) {
                            return false;
                        }
                    } else {
                        console.warn(`contentid: ${item.contentid} 에 areacode가 없습니다.`);
                    }
            
                    if (!item.addr1) return false;
            
                    // 2. 주소 텍스트 비교 로직
                    const cleanKeyword = sigunguName.replace(/시|군|구/g, "").replace(/\s+/g, "");
                    const addrParts = item.addr1.split(" ");
                    
                    const combinedAddr = (addrParts[1] + (addrParts[2] || ""))
                        .replace(/\s+/g, "")
                        .replace(/시|군|구/g, "");
            
                    const isMatch = combinedAddr.startsWith(cleanKeyword);
            
                    if (isMatch) {
                        console.log(`일치: [${item.title}] 주소: ${item.addr1} / 코드: ${item.areacode}`);
                    }
            
                    return isMatch;
                };
            
                const myLocalPlaces = customPlaces.filter(filterFn);
                const filteredApiItems = apiItems.filter(filterFn);
            
                // console.log("필터링된 내 장소 개수:", myLocalPlaces.length);
                // console.log("필터링된 API 장소 개수:", filteredApiItems.length);
            
                set({ filteredData: [...myLocalPlaces, ...filteredApiItems] });
            },
            
            fetchAndFilterData: async (geo: any, contentTypeId?: string | number | null) => {
                const name = geo.properties.name;
                const code = geo.properties.code;
                const provinceCode = code.substring(0, 2);
                const apiAreaCode = API_CODE_MAP[provinceCode] || provinceCode;
            
                // console.log(`지역 선택됨: ${name} (코드: ${code}, API지역코드: ${apiAreaCode})`);
            
                set({ 
                    filteredData: [], 
                    isLoading: true, 
                    selectedSigungu: { name, areaCode: apiAreaCode }, 
                    isSearched: true 
                });
            
                try {
                    const allItems = await fetchAllTourData(apiAreaCode, contentTypeId);
                    // console.log(`API 데이터 수신 완료: ${allItems.length}건`);
            
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
                // console.log(place)
                set((state) => ({ customPlaces: [place, ...state.customPlaces] }));
                const { filteredData } = get();
                set({ filteredData: [place, ...filteredData] });
            },
            updateCustomPlace: updatePlace => set(state => ({
                customPlaces: state.customPlaces.map(cp => cp.contentid === updatePlace.contentid ? { ...cp, ...updatePlace } : cp),
                filteredData: state.filteredData.map(p => p.contentid === updatePlace.contentid ? { ...p, ...updatePlace } : p)
            })),
            removeCustomPlace: contentid => set(state => ({
                customPlaces: state.customPlaces.filter(cp => cp.contentid !== contentid),
                filteredData: state.filteredData.filter(p => p.contentid !== contentid)
            })),

            getMyPlaces: (nickname) => {
                if (!nickname) return [];
                return get().customPlaces.filter(place => place.author === nickname);
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