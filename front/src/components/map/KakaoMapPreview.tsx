import { useEffect, useRef, useCallback } from 'react';
import type { Trip } from '../../types/map';
const { kakao } = window as any;
import * as S from "../Components.styles";

interface KakaoMapProps {
    locations: Trip[];
    activeCategory: string;
    onMarkerClick: (item: Trip) => void;
}

function KakaoMapPreview({ locations, activeCategory, onMarkerClick }: KakaoMapProps) {
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstance = useRef<any>(null);
    const markersRef = useRef<any[]>([]); // 일정 마커 (파란색 숫자)
    const searchMarkersRef = useRef<any[]>([]); // 검색 마커 (주황색 라벨)
    const polylineRef = useRef<any>(null);

    // 주변 장소 검색 로직
    const searchPlaces = useCallback(() => {
        if (!mapInstance.current || !activeCategory) return;

        const ps = new kakao.maps.services.Places(mapInstance.current);
        
        ps.categorySearch(activeCategory, (data: any[], status: any) => {
            if (status === kakao.maps.services.Status.OK) {
                searchMarkersRef.current.forEach(m => m.setMap(null));
                
                const newSearchMarkers = data.map((place) => {
                    const position = new kakao.maps.LatLng(place.y, place.x);

                    // 마커 디자인 (CustomOverlay)
                    const content = document.createElement('div');
                    content.innerHTML = `
                        <div style="
                            background-color: #f59e0b; 
                            color: white; 
                            padding: 5px 10px; 
                            border-radius: 20px; 
                            font-size: 1rem; 
                            font-weight: bold; 
                            box-shadow: 0 2px 6px rgba(0,0,0,0.3); 
                            border: 2px solid white; 
                            white-space: nowrap; 
                            cursor: pointer;
                        ">
                            ${place.place_name}
                        </div>
                    `;
                    
                    content.onclick = () => {
                        const tripItem: Trip = {
                            contentid: place.id,
                            title: place.place_name,
                            addr1: place.address_name,
                            mapx: place.x,
                            mapy: place.y,
                            contenttypeid: activeCategory,
                        };
                        onMarkerClick(tripItem);
                    };

                    const overlay = new kakao.maps.CustomOverlay({
                        position: position,
                        content: content,
                        map: mapInstance.current,
                        yAnchor: 1.5
                    });

                    return overlay;
                });

                searchMarkersRef.current = newSearchMarkers;
            }
        }, { useMapBounds: true }); 
    }, [activeCategory, onMarkerClick]);

    // [Effect] 지도 초기화
    useEffect(() => {
        if (!mapInstance.current && mapRef.current) {
            const initialPos = locations.length > 0 
                ? new kakao.maps.LatLng(locations[0].mapy, locations[0].mapx)
                : new kakao.maps.LatLng(37.5665, 126.9780);
    
            mapInstance.current = new kakao.maps.Map(mapRef.current, {
                center: initialPos,
                level: 3,
            });
    
            if (locations.length === 0 && navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((pos) => {
                    mapInstance.current.panTo(new kakao.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
                });
            }
        }
    }, []);

    // [Effect] 일정 마커 및 경로 선 그리기
    useEffect(() => {
        if (!mapInstance.current) return;

        markersRef.current.forEach(m => m.setMap(null));
        if (polylineRef.current) polylineRef.current.setMap(null);
        if (locations.length === 0) return;

        const linePath: any[] = [];
        const bounds = new kakao.maps.LatLngBounds();

        const newMarkers = locations.map((loc, index) => {
            const position = new kakao.maps.LatLng(loc.mapy, loc.mapx);
            linePath.push(position);
            bounds.extend(position);

            const overlay = new kakao.maps.CustomOverlay({
                position: position,
                content: `<div style="background-color: #2563eb; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.3); border: 2px dashed white;">${index + 1}</div>`,
                yAnchor: 0.5
            });

            overlay.setMap(mapInstance.current);
            return overlay;
        });

        markersRef.current = newMarkers;

        const polyline = new kakao.maps.Polyline({
            path: linePath,
            strokeWeight: 4,
            strokeColor: '#3b82f6',
            strokeOpacity: 0.8,
            strokeStyle: 'dashed',
        });

        polyline.setMap(mapInstance.current);
        polylineRef.current = polyline;

        if (locations.length > 0) mapInstance.current.setBounds(bounds);

    }, [locations]);

    // [Effect] 카테고리 검색 및 지도 이동 이벤트 등록
    useEffect(() => {
        if (!mapInstance.current) return;

        if (!activeCategory) {
            searchMarkersRef.current.forEach(m => m.setMap(null));
            searchMarkersRef.current = [];
            kakao.maps.event.removeListener(mapInstance.current, 'idle', searchPlaces);
            return;
        }

        searchPlaces();
        kakao.maps.event.addListener(mapInstance.current, 'idle', searchPlaces);

        return () => {
            kakao.maps.event.removeListener(mapInstance.current, 'idle', searchPlaces);
        };
    }, [activeCategory, searchPlaces]);

    return <S.MapContainer ref={mapRef} />
}

export default KakaoMapPreview;