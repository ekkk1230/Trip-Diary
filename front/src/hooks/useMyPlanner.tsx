import { useLocation } from "react-router-dom"
import { type PlanTripItem, type Plan } from "../types/plan";
import { useMapStore } from "../store/useMapStore";
import { useEffect, useMemo, useState } from "react";
import type { DropResult } from "@hello-pangea/dnd";
import { usePlanStore } from "../store/usePlanStore";

export const useMyPlanner = (user: any) => {
    const location = useLocation();
    const planData = location.state as | Plan | undefined;

    const { favoriteList, fetchFavorites } = useMapStore();
    const { addPlan } = usePlanStore();

    useEffect(() => { fetchFavorites(user.userId) }, [user]);

    const myFavorites = useMemo(() => {
        return user?.userId ? favoriteList[user.userId] || [] : [];
    }, [favoriteList, user?.userId]);

    const [category, setCategory] = useState("");
    const [selectedPlaces, setSelectedPlaces] = useState<PlanTripItem[]>(planData ? planData.planItem : []);
    const [mapCategory, setMapCategory] = useState("");

    const [title, setTitle] = useState(planData ? planData.title : "");
    const [startDate, setStartDate] = useState(planData ? planData.startDate : "");
    const [endDate, setEndDate] = useState(planData ? planData.endDate : "");
    const [memo, setMemo] = useState(planData ? planData.memo : "");

    const getTodayString = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        
        return `${year}-${month}-${day}`;
    };
    const todayString = getTodayString();

    const travelDays = useMemo(() => {
        const diffMs = new Date(endDate).getTime() - new Date(startDate).getTime();
        return (startDate && endDate) ? (diffMs / (1000 * 60 * 60 * 24) + 1) : 1;
    }, [startDate, endDate]);

    const daysArray = useMemo(() => {
        return Array.from({ length: travelDays }, (_, i) => i + 1);
    }, [travelDays]);

    const [activeDate, setActiveDate] = useState(1);
	const currentDayPlaces = selectedPlaces.filter(item => item.day === activeDate);

    const filteredFavoriteList = category !== '' 
		? myFavorites.filter(f => String(f.contenttypeid) === category) 
		: myFavorites;

    const handleSelected = (item: PlanTripItem) => {
        setSelectedPlaces(prev => {
            const isExist = prev.some(p => p.contentid === item.contentid);
            if (isExist) return prev.filter(p => p.contentid !== item.contentid);
            return [...prev, { ...item, day: activeDate }];
        });
    };

    const handleClearSchedule = () => {
        setSelectedPlaces([])
        setActiveDate(1);
    };

    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result;
        // 1. 올바른 위치에 떨어뜨린 게 아니거나 제자리에 둔 거라면 리턴
        if (!destination || source.index === destination.index) return;

        // 2. 현재 활성화된 일차의 아이템들로 가짜 배열 생성
        const currentDayItems = selectedPlaces.filter(item => item.day === activeDate);
        
        // 3. 다른 일차의 아이템들도 따로 격리
        const otherDayItems = selectedPlaces.filter(item => item.day !== activeDate);
    
        // 4. 오늘 자 리스트 안에서 드래그 앤 드롭 순서 재조정
        const [reorderedItem] = currentDayItems.splice(source.index, 1);
        currentDayItems.splice(destination.index, 0, reorderedItem);
    
        // 5. 격리해 뒀던 다른 날짜 아이템들과 순서가 바뀐 오늘 날짜 아이템들을 합쳐서 셋팅
        setSelectedPlaces([...otherDayItems, ...currentDayItems]);
    };

    const handleSavePlan = (plan: Plan) => addPlan(plan);

    return {
        planData,
        title, setTitle, startDate, setStartDate, endDate, setEndDate, memo, setMemo,
        todayString, handleSavePlan,
        category, setCategory, filteredFavoriteList, selectedPlaces, 
        daysArray, activeDate, setActiveDate,
        handleSelected, handleClearSchedule, onDragEnd, currentDayPlaces,
        mapCategory, setMapCategory
    }
}