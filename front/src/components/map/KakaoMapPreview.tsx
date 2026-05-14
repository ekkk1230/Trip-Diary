import { useEffect, useRef } from 'react';
import type { Trip } from '../../types/map';
const { kakao } = window as any;
import * as S from "../Components.styles";

interface KakaoMapProps {
  	locations: Trip[];
}

function KakaoMapPreview({ locations }: KakaoMapProps) {
	const mapRef = useRef<HTMLDivElement>(null);
	const mapInstance = useRef<any>(null);
	const markersRef = useRef<any[]>([]);
	const polylineRef = useRef<any>(null);

	useEffect(() => {
		if (!mapInstance.current && mapRef.current) {
			// 우선 순위: 1번 장소 > 내 위치(비동기) > 기본값(0, 0)
			const initialPos = locations.length > 0 
				? new kakao.maps.LatLng(locations[0].mapy, locations[0].mapx)
				: new kakao.maps.LatLng(37.5665, 126.9780); // 임시 좌표
	
			const options = {
				center: initialPos,
				level: 3,
			};
			mapInstance.current = new kakao.maps.Map(mapRef.current, options);
	
			// 2. 1번 장소가 없고, 위치 정보를 지원한다면 내 위치로 이동
			if (locations.length === 0 && navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(
					(position) => {
						const { latitude, longitude } = position.coords;
						const myPos = new kakao.maps.LatLng(latitude, longitude);
						
						mapInstance.current.panTo(myPos);
					},
					(error) => {
						console.error("위치 획득 실패:", error);
					}
				);
			}
		}
	}, []);

	useEffect(() => {
		if (!mapInstance.current || locations.length === 0) return;

		markersRef.current.forEach(m => m.setMap(null));
		if (polylineRef.current) polylineRef.current.setMap(null);

		const linePath: any[] = [];
		const bounds = new kakao.maps.LatLngBounds();

		const newMarkers = locations.map((loc, index) => {
		const position = new kakao.maps.LatLng(loc.mapy, loc.mapx);
		linePath.push(position);
		bounds.extend(position);

		const content = `
			<div style="
			background-color: #2563eb; 
			color: white; 
			width: 24px; 
			height: 24px; 
			border-radius: 50%; 
			display: flex; 
			align-items: center; 
			justify-content: center; 
			font-size: 12px; 
			font-weight: bold;
			box-shadow: 0 2px 4px rgba(0,0,0,0.3);
			border: 2px solid white;
			">
			${index + 1}
			</div>
		`;

		const customOverlay = new kakao.maps.CustomOverlay({
			position: position,
			content: content,
			yAnchor: 0.5
		});

		customOverlay.setMap(mapInstance.current);
		return customOverlay;
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

		mapInstance.current.setBounds(bounds);

	}, [locations]);

	return <S.MapContainer ref={mapRef} />
}

export default KakaoMapPreview