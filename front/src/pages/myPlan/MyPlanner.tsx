import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import KakaoMapPreview from '../../components/map/KakaoMapPreview';
import * as S from "./MyPlan.styles";
import { CATEGORIES, MAP_SEARCH_MENUS } from '../../constants/region';
import { calculateTravelTime } from "../../utils/mapUtils";
import { RiResetLeftLine } from "react-icons/ri";
import { MdClear } from "react-icons/md";
import { useMyPlanner } from '../../hooks/useMyPlanner';
import { useUserStore } from '../../store/useUserStore';

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
			<S.PlannerHeader>
				<S.HeaderTopRows>
					<S.InputGroup className="title-input">
						<label>여행 제목</label>
						<input 
							type="text" 
							placeholder="멋진 여행 제목을 적어주세요." 
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
					</S.InputGroup>

					<S.InputGroup className="date-input">
						<label>여행 기간</label>
						<div className="date-picker-wrap">
							<input type="date" value={startDate} min={todayString} onChange={e => setStartDate(e.target.value)} />
							<span>~</span>
							<input type="date" value={endDate} min={startDate || todayString} onChange={e => setEndDate(e.target.value)} />
						</div>
					</S.InputGroup>

					<S.InputGroup className="memo-input">
						<label>여행 메모</label>
						<textarea 
							placeholder="여행 시 참고할 메모를 자유롭게 적어보세요." 
							value={memo}
							onChange={(e) => setMemo(e.target.value)}
						/>
					</S.InputGroup>

					<S.SaveButton onClick={handleSavePlan}>
						{planData ? "수정 완료" : "일정 저장"}
					</S.SaveButton>
				</S.HeaderTopRows>
			</S.PlannerHeader>

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
					
					<DragDropContext onDragEnd={onDragEnd}>
						<Droppable droppableId="schedule-list">
							{(provided) => (
								<S.ScheduleList {...provided.droppableProps} ref={provided.innerRef}>
									{currentDayPlaces.map((item, index) => (
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
													<MdClear />
												</S.RemoveButton>
											</S.DraggableItem>
											)}
										</Draggable>


										{index < currentDayPlaces.length - 1 && (() => {
											const nextItem = currentDayPlaces[index + 1];
											
											if (!nextItem) return null; 

											return (
												<S.TravelInfoTag>
													<div className="line"></div>
													<div className="info">
														예상 소요시간 약 {
															calculateTravelTime(
																{ mapx: Number(item.mapx || 0), mapy: Number(item.mapy || 0) }, 
																{ mapx: Number(nextItem.mapx || 0), mapy: Number(nextItem.mapy || 0) } 
															).time
														}분 
														<span>({
															calculateTravelTime(
																{ mapx: Number(item.mapx || 0), mapy: Number(item.mapy || 0) }, 
																{ mapx: Number(nextItem.mapx || 0), mapy: Number(nextItem.mapy || 0) }
															).distance
														}km)</span>
													</div>
												</S.TravelInfoTag>
											);
										})()}
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

				<KakaoMapPreview locations={currentDayPlaces} activeCategory={mapCategory} onMarkerClick={handleSelected} />
			</S.MapWrapper>
		</S.PlannerContainer>
	);
};

export default MyPlanner;