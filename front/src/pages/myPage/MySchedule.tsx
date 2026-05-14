import { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable, type DropResult } from '@hello-pangea/dnd';
import { useMapStore } from '../../store/useMapStore';
import { useUserStore } from '../../store/useUserStore';
import KakaoMapPreview from '../../components/map/KakaoMapPreview';
import * as S from "../../features/map/MapComponents.styles";

const MySchedule = () => {
    const { user } = useUserStore();
    const { favoriteList } = useMapStore();

    const myFavorites = user?.userId ? favoriteList[user.userId] : [];

    const [localPlaces, setLocalPlaces] = useState(myFavorites);

    useEffect(() => {
        if (user?.userId) setLocalPlaces(favoriteList[user.userId] || []);
    }, [user?.userId, favoriteList]);
    
    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result;

        if (!destination || source.index === destination.index) return;

        // 1. 기존 리스트 복사
        const newItems = Array.from(localPlaces);
        
        // 2. 아이템 위치 변경
        const [reorderedItem] = newItems.splice(source.index, 1);
        newItems.splice(destination.index, 0, reorderedItem);
        setLocalPlaces(newItems);
    };

    return (
        <>
            <div>
                <h1>DND 작동 원리 연습</h1>
                
                <DragDropContext onDragEnd={onDragEnd}>
                    
                    <Droppable droppableId="list">
                    {(provided) => (
                        <div
                            {...provided.droppableProps} 
                            ref={provided.innerRef} 
                            >
                            {localPlaces.map((item, index) => (
                            <Draggable key={item.contentid} draggableId={item.contentid} index={index}>
                            {(provided, snapshot) => (
                                <S.DraggableCard
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                $isDragging={snapshot.isDragging}
                                >
                                <S.IndexBadge>{index + 1}</S.IndexBadge>
                                <S.ItemTitle>{item.title}</S.ItemTitle>
                                <S.DragHandle>☰</S.DragHandle>
                                </S.DraggableCard>
                            )}
                            </Draggable>
                            ))}
                            {provided.placeholder} 
                        </div>
                    )}
                    </Droppable>
                </DragDropContext>
            </div>

            <div className="flex-1 w-full bg-gray-200 relative">
                <KakaoMapPreview locations={localPlaces} />
            </div>
        </>
    );
};

export default MySchedule;