import KakaoMapPreview from '../../components/map/KakaoMapPreview';
import * as S from "./MyPlan.styles";
import { CATEGORIES, MAP_SEARCH_MENUS } from '../../constants/region';
import { RiResetLeftLine } from "react-icons/ri";
import { useMyPlanner } from '../../hooks/useMyPlanner';
import { useUserStore } from '../../store/useUserStore';
import PlanHeader from '../../components/myplan/PlanHeader';
import ScheduleListSection from '../../components/myplan/ScheduleListSection';

const MyPlanner = () => {

    const { user } = useUserStore();
    if (!user) return <div>회원정보를 찾을 수 없습니다.</div>;

	const {
        planData,
        title, setTitle, startDate, setStartDate, endDate, setEndDate, memo, setMemo,
        todayString, handleSavePlan,
        category, setCategory, filteredFavoriteList, selectedPlaces, 
        daysArray, activeDate, setActiveDate,
        handleSelected, handleClearSchedule, onDragEnd, currentDayPlaces,
        mapCategory, setMapCategory
    } = useMyPlanner(user);

	return (
		<S.PlannerContainer>
			
			<PlanHeader title={title} setTitle={setTitle} startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate} memo={memo} setMemo={setMemo} planData={planData} handleSavePlan={handleSavePlan} todayString={todayString} />

			<S.TopSection>
				<S.PlaceStorage>
					<S.StorageHeader>
						<h3>장소 보관함</h3>
						<S.CategoryTabs>
							{CATEGORIES.map(({ id, name }) => (
								<S.CategoryTab 
									key={id} 
									$active={category === String(id)} 
									onClick={() => setCategory(prev => prev === String(id) ? '' : String(id))}
								>
									{name}
								</S.CategoryTab>
							))}
						</S.CategoryTabs>
					</S.StorageHeader>
					<S.StorageList>
						{filteredFavoriteList.map((item: any) => (
							<S.StorageItemButton 
								key={item.contentid} 
								$active={selectedPlaces.some(p => p.contentid === item.contentid)} 
								onClick={() => handleSelected(item)}
							>
								{item.title}
							</S.StorageItemButton>
						))}
					</S.StorageList>
				</S.PlaceStorage>

				<S.SchedulePanel>
					<S.ScheduleHeader>
						<div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
							<h3>여행 일정 ({selectedPlaces.length})</h3>
						</div>
						{selectedPlaces.length > 0 && (
							<S.ClearButton type="button" onClick={handleClearSchedule}>
								<RiResetLeftLine />
								초기화
							</S.ClearButton>
						)}
					</S.ScheduleHeader>

					<S.DayTabWrapper>
						{daysArray.map(item => (
							<S.DayTabButton 
								$isActive={activeDate === item} 
								onClick={() => setActiveDate(item)}
								key={item}>
								{item}일 차
							</S.DayTabButton>
						))}
					</S.DayTabWrapper>
					
					<ScheduleListSection onDragEnd={onDragEnd} currentDayPlaces={currentDayPlaces} handleSelected={handleSelected} />
				</S.SchedulePanel>
			</S.TopSection>

			<S.MapWrapper>
				<S.MapCategoryNav>
				{MAP_SEARCH_MENUS.map((menu) => (
					<S.MapCategoryBtn 
						key={menu.kakaoCode}
						$active={mapCategory === menu.kakaoCode}
						onClick={() => setMapCategory(prev => prev === menu.kakaoCode ? '' : menu.kakaoCode)}
					>
						{menu.name}
					</S.MapCategoryBtn>
				))}
				</S.MapCategoryNav>

				<KakaoMapPreview locations={currentDayPlaces} activeCategory={mapCategory} onMarkerClick={item => handleSelected(item as any)} />
			</S.MapWrapper>
		</S.PlannerContainer>
	);
};

export default MyPlanner;