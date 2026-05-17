import { create } from "zustand";
import { persist } from "zustand/middleware";
import { fetchAllTourData } from "../api/tourApi";
import { API_CODE_MAP } from "../constants/region";
import type { Trip } from "../types/map";

interface MapStore {
    allTourList: Trip[];
    customPlaces: Trip[];
    favoriteList: { [userId: string]: Trip[] };
    selectedRegion: any | null;
    selectedSigungu: any | null;
    filteredData: Trip[];
    isLoading: boolean;
    isSearched: boolean;

    toggleFavorite: (userId: string, id: string) => void;
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
            favoriteList: { '': [] },
            selectedRegion: null,
            selectedSigungu: null,
            filteredData: [],
            isLoading: false,
            isSearched: false,
        
            /**
             * 
             * @param userId 
             * @param id 
             * @returns 
             * 찜 목록 추가/삭제 토글
             * 1. 로그인 상태의 userId와 찜목록 객체 userId 비교하여 개인 유저의 찜목록 userFavoriteList 구하기
             * 2. userFavoriteList의 아이템과 현재 누른 관광지 contentid 비교하여 개인 유저의 찜목록에 있는지 확인
             * 3. 해당 아이템일 경우 userFavoriteList에서 필터 / 해당하지 않을 경우 기존 [전체 관광지, 커스텀 관광지] 배열에서 클릭한 item의 아이디와 동일한 contentid를 가진 아이템 반환하여 userFavoriteList에 추가
             */
            toggleFavorite: (userId, id) => set(state => {
                // console.log(userId, id);
                let userFavoriteList = state.favoriteList[userId] || [];
                // console.log(state.favoriteList)

                const isExisted = userFavoriteList.some(item => item.contentid === id);
                if (isExisted) {
                    userFavoriteList = userFavoriteList.filter(item => item.contentid !== id);
                } else {
                    const item = [...state.allTourList, ...state.customPlaces].find(t => t.contentid === id);
                    if (item) userFavoriteList = [item, ...userFavoriteList];
                }

                return {
                    favoriteList: {
                        ...state.favoriteList,
                        [userId]: userFavoriteList
                    }
                };
            }),

            setSelectedRegion: (region) => set({ selectedRegion: region }),
            setSelectedSigungu: (sigungu) => set({ selectedSigungu: sigungu }),
            setFilteredData: (data) => set({ filteredData: data }),
    
            /**
             * 
             * @param apiItems 
             * @returns 
             * 지도 검색 시 api데이터와 커스텀 장소를 합쳐서 filterData 에 저장
             * 
             */
            refreshFilteredData: (apiItems) => {
                const { customPlaces, selectedSigungu } = get();
            
                if (!selectedSigungu) set({ filteredData: [] });
            
                const { name: sigunguName, areaCode: targetAreaCode } = selectedSigungu;
                
                const filterFn = (item: Trip) => {
                    if (String(item.areacode) !== String(targetAreaCode)) return false; // areaCode로 시, 도 동일 여부 체크
                    if (!item.addr1) return false; // 주소 존재 여부 체크

                    const cleanKeyword = sigunguName.replace(/시|군|구/g, "").replace(/\s+/g, ""); // 수원시 팔달구 매산로 1 => 시, 군, 구 제거
                    const fullAddrWithoutSido = item.addr1.split(" ").slice(1).join("").replace(/시|군|구/g, "").replace(/\s+/g, ""); // ['경기도', '수원시', '팔달구', '매산로', '1'] => 수원팔달매산로1
                    const isMatch = fullAddrWithoutSido.includes(cleanKeyword);

                    // if (isMatch) {
                    //     console.log(`매칭 성공: [${item.title}]`);
                    // }

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
            
                // console.log(`지역: ${name} (코드: ${code}, API지역코드: ${apiAreaCode})`);
            
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