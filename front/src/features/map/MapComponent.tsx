import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { geoCentroid, geoMercator } from "d3-geo";
import { SwiperSlide } from 'swiper/react';
import { Grid, Navigation, Pagination } from 'swiper/modules'; 
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';
import * as S from "./MapComponents.styles";
import CardItem from "./CardItem";
import { useUiStore } from "../../store/useUiStore";
import { useMapStore } from "../../store/useMapStore";
import { useEffect, useState } from "react";

const PROVINCE_URL = "https://raw.githubusercontent.com/southkorea/southkorea-maps/master/kostat/2013/json/skorea_provinces_geo_simple.json";
const MUNICIPALITY_URL = "https://raw.githubusercontent.com/southkorea/southkorea-maps/master/kostat/2013/json/skorea_municipalities_geo_simple.json";

interface mapComponentProps {
	isMainPage?: boolean;
	visitedLocations?: string[];
}

const MapComponent = ({ isMainPage, visitedLocations = [] }: mapComponentProps) => {
	const { setTitle } = useUiStore();
	const { 
		 selectedRegion, setSelectedRegion, selectedSigungu, setSelectedSigungu,
		filteredData, isLoading, fetchAndFilterData, isSearched
	} = useMapStore();

	const [isMain, setIsMain] = useState<Boolean>(false);
	useEffect(() => {
		if (isMainPage) setIsMain(isMainPage);
	}, [])

	const projection = geoMercator()
		.center(selectedRegion ? geoCentroid(selectedRegion) : [127.5, 36])
		.scale(selectedRegion ? 15000 : 4000) 
		.translate([250, 300]);


	const handleRegionClick = async (geo: any) => {
		if (!selectedRegion) {
			setSelectedRegion(geo);
			setTitle(geo.properties.name);
		} else {
			fetchAndFilterData(geo); 
		}
	}

	// console.log('visitedLocations', visitedLocations)

	const provinceCounts = visitedLocations?.reduce((acc: any, loc: any) => {
		const province = loc.split(' ')[0];
		acc[province] = (acc[province] || 0) + 1;
		return acc;
	}, {}) || {};

	const sigunguCounts = visitedLocations?.reduce((acc: any, loc: any) => {
		const parts = loc.split(' ');
		if (parts.length > 1) {
			const sigungu = parts[1]; 
			acc[sigungu] = (acc[sigungu] || 0) + 1;
		}
   		return acc;
	}, {}) || {};

	const getColor = (count: number) => {
		if (!count) return "rgba(241, 248, 233, 0.5)"; // 방문 안 함: 아주 연한 미색 + 반투명

		const opacity = Math.min(0.2 + count * 0.25, 1.0); 
		return `rgba(38, 166, 154, ${opacity})`; 
	};

	return (
		<>
			<div className="MapContainer" style={{ width: "500px", margin: "0 auto" }}>
				<ComposableMap projection={projection as any} width={500} height={600}>
					<Geographies geography={selectedRegion ? MUNICIPALITY_URL : PROVINCE_URL}>
						{({ geographies }) =>
							geographies
								.filter((geo) => {
									if (!selectedRegion) return true;
									const provinceCode = selectedRegion.properties.code;
									const municipalityCode = geo.properties.code;

									return municipalityCode.startsWith(provinceCode);
								})
								.map((geo) => (
									<Geography
										key={geo.rsmKey}
										geography={geo}
										fill={(() => {
											const geoName = geo.properties.name;

											const count = !selectedRegion 
											? (provinceCounts?.[geoName] || 0) 
											: (sigunguCounts?.[geoName] || 0);

											if (count > 0) console.log(`${geoName}: ${count}`);

											if (isMainPage) {
												return selectedSigungu === geo.properties.name ? "#A5D6A7" : "#F1F8E9";
											} else {
												return getColor(count);
											}
										})()}
										onClick={() => {
											if (!selectedRegion) {
												handleRegionClick(geo);
											} else {
												handleRegionClick(geo);
											}
										}}
										style={{
											default: {
												stroke: "#2E7D32", 
												strokeWidth: 0.5,
												outline: "none",
											},
											hover: { 
												fill: "#C8E6C9", 
												cursor: "pointer",
												outline: "none",
											},
											pressed: {
												fill: "#81C784",
												outline: "none",
											}
										}}
									/>
								))
						}
					</Geographies>
				</ComposableMap>

				{isMain && (
					isLoading ? (
						<S.SpinnerWrap style={{ textAlign: "center", padding: "20px" }}>
							<p>관광지 정보를 불러오는 중입니다...</p>
							<S.Spinner />
						</S.SpinnerWrap>
					) : filteredData.length > 0 ? (
						<S.StyledSwiper
							modules={[Grid, Navigation, Pagination]}
							slidesPerView={2}
							slidesPerGroup={2}
							grid={{
								rows: 3,
								fill: 'row' 
							}}
							spaceBetween={10} 
							pagination={{ 
								type: 'fraction',
								clickable: true 
							}}
						>
							{filteredData.map((item, idx) => (
								<SwiperSlide key={idx}>
									<CardItem item={item} /> 
								</SwiperSlide>
							))}
						</S.StyledSwiper>
					) : isSearched ? ( 
						<S.SearchTxt>검색 결과가 없습니다.</S.SearchTxt>
					) : (
						<S.SearchTxt>지역을 선택하여 관광지 정보를 확인하세요.</S.SearchTxt>
					)
				)}

				{selectedRegion && (
					<button 
						onClick={() => { 
							setSelectedRegion(null) 
							setSelectedSigungu(null)
							setTitle("지도") 
						}}
						style={{ display: "block", margin: "10px auto" }}
					>
						전체 지도로 돌아가기
					</button>
				)}
			</div>
		</>
	);
};

export default MapComponent;