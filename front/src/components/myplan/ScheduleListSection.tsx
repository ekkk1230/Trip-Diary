import { DragDropContext, Droppable, Draggable, type DropResult } from '@hello-pangea/dnd';
import { calculateTravelTime } from "../../utils/mapUtils";
import { MdClear } from "react-icons/md";
import * as S from "../../pages/myPlan/MyPlan.styles"
import type { PlanTripItem } from '../../types/plan';

interface ScheduleListSectionProps {
    onDragEnd: (result: DropResult) => void;
    currentDayPlaces: PlanTripItem[];
    handleSelected: (item: PlanTripItem) => void;
}

function ScheduleListSection({ onDragEnd, currentDayPlaces, handleSelected }: ScheduleListSectionProps) {
    return (
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
    )
}

export default ScheduleListSection