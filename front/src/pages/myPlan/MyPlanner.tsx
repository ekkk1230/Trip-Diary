import { useState } from 'react';
import { DragDropContext, Droppable, Draggable, type DropResult } from '@hello-pangea/dnd';
import { useMapStore } from '../../store/useMapStore';
import { useUserStore } from '../../store/useUserStore';
import KakaoMapPreview from '../../components/map/KakaoMapPreview';
import * as S from "./MyPlan.styles";
import { CATEGORIES, MAP_SEARCH_MENUS } from '../../constants/region';
import type { Trip } from '../../types/map';
import { calculateTravelTime } from "../../utils/mapUtils";
import { useLocation } from 'react-router-dom';
import type { Plan } from '../../types/plan';
import { RiResetLeftLine } from "react-icons/ri";

const MyPlanner = () => {
	const location = useLocation();
	const planData = location.state as Plan | undefined;
	// console.log(planData)
	const { user } = useUserStore();
	const { favoriteList } = useMapStore();

	const myFavorites = user?.userId ? favoriteList[user.userId] || [] : [];
	const [category, setCategory] = useState('');
	const [selectedPlaces, setSelectedPlaces] = useState<Trip[]>(planData ? planData.planItem : []);
	const [mapCategory, setMapCategory] = useState<string>(''); 

	const filteredFavoriteList = category !== '' 
		? myFavorites.filter(f => String(f.contenttypeid) === category) 
		: myFavorites;

	const handleSelected = (item: Trip) => {
		setSelectedPlaces(prev => {
			const isExist = prev.some(p => p.contentid === item.contentid);
			if (isExist) return prev.filter(p => p.contentid !== item.contentid);
			return [...prev, item];
		});
	};

	const handleClearSchedule = () => setSelectedPlaces([]);

	const onDragEnd = (result: DropResult) => {
		const { source, destination } = result;
		if (!destination || source.index === destination.index) return;

		const newItems = Array.from(selectedPlaces);
		const [reorderedItem] = newItems.splice(source.index, 1);
		newItems.splice(destination.index, 0, reorderedItem);

		setSelectedPlaces(newItems);
	};

	return (
		<S.PlannerContainer>
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
								{filteredFavoriteList.map(item => (
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
								<S.ClearButton onClick={handleClearSchedule}>
									<RiResetLeftLine />
									초기화
								</S.ClearButton>
							)}
							</S.ScheduleHeader>
							
							<DragDropContext onDragEnd={onDragEnd}>
								<Droppable droppableId="schedule-list">
									{(provided) => (
										<S.ScheduleList {...provided.droppableProps} ref={provided.innerRef}>
											{selectedPlaces.map((item, index) => (
												<div key={item.contentid}>
													<Draggable key={String(item.contentid)} draggableId={String(item.contentid)} index={index}>
													{(provided, snapshot) => (
														<S.DraggableItem
															ref={provided.innerRef}
															{...provided.draggableProps}
															{...provided.dragHandleProps}
															$isDragging={snapshot.isDragging}
															style={provided.draggableProps.style}
														>
														{/* 1. 순서 번호 */}
														<S.IndexBadge>{index + 1}</S.IndexBadge>

														{/* 2. 장소 정보 */}
														<S.ItemInfo>
															<strong>{item.title}</strong>
															<span>{item.addr1 || '주소 정보 없음'}</span>
														</S.ItemInfo>

														{/* 3. 삭제 버튼 */}
														<S.RemoveButton onClick={(e) => {
															e.stopPropagation();
															handleSelected(item);
														}}>
															<svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
																<path d="M6 18L18 6M6 6l12 12" />
															</svg>
														</S.RemoveButton>
													</S.DraggableItem>
													)}
												</Draggable>


												{index < selectedPlaces.length - 1 && (
													<S.TravelInfoTag>
														<div className="line"></div>
														<div className="info">
															예상 소요시간 약 {calculateTravelTime({ mapx: Number(item.mapx || 0), mapy: Number(item.mapy || 0) }, { mapx: Number(selectedPlaces[index + 1].mapx || 0), mapy: Number(selectedPlaces[index + 1].mapy || 0)}).time}분 
															<span>({calculateTravelTime({ mapx: Number(item.mapx || 0), mapy: Number(item.mapy || 0) }, { mapx: Number(selectedPlaces[index + 1].mapx || 0), mapy: Number(selectedPlaces[index + 1].mapy || 0) }).distance}km)</span>
														</div>
													</S.TravelInfoTag>									
												)}
												</div>
											))}
										{provided.placeholder}
									</S.ScheduleList>
								)}
							</Droppable>
						</DragDropContext>
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

					<KakaoMapPreview locations={selectedPlaces} activeCategory={mapCategory} onMarkerClick={handleSelected} />
				</S.MapWrapper>
		</S.PlannerContainer>
	);
};

export default MyPlanner;