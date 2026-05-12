import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
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
import { useEffect, useMemo, useState } from "react";
import AddPlaceModal from "../../components/modal/modalContentLayout/AddPlaceModal";

const PROVINCE_URL = "https://raw.githubusercontent.com/southkorea/southkorea-maps/master/kostat/2013/json/skorea_provinces_geo_simple.json";
const MUNICIPALITY_URL = "https://raw.githubusercontent.com/southkorea/southkorea-maps/master/kostat/2013/json/skorea_municipalities_geo_simple.json";

interface mapComponentProps {
	isMainPage?: boolean;
	visitedLocations?: string[];
}

const GEO_STYLE = {
    default: { stroke: "#2E7D32", strokeWidth: 0.5, outline: "none" },
    hover: { fill: "#C8E6C9", cursor: "pointer", outline: "none" },
    pressed: { fill: "#81C784", outline: "none" }
};

const MapComponent = ({ isMainPage, visitedLocations = [] }: mapComponentProps) => {
	const { setTitle, openModal } = useUiStore();
	
	const { 
		selectedRegion, setSelectedRegion, selectedSigungu, setSelectedSigungu,
		filteredData, isLoading, fetchAndFilterData, isSearched
	} = useMapStore();

	const [isMain, setIsMain] = useState<Boolean>(false);
	useEffect(() => {
		if (isMainPage) setIsMain(isMainPage);
	}, []);
	
	const projection = useMemo(() => 
        geoMercator().center([127.5, 36]).scale(5000).translate([250, 300]), 
    []);


	const handleRegionClick = async (geo: any) => {
		if (!selectedRegion) {
			setSelectedRegion(geo);
			setTitle(geo.properties.name);
		} else {
			fetchAndFilterData(geo); 
		}
	};

	// console.log('visitedLocations', visitedLocations)

	const { provinceCounts, sigunguCounts } = useMemo(() => {
		const pCounts: Record<string, number> = {};
		const sCounts: Record<string, number> = {};

		visitedLocations.forEach((loc: string) => {
			const parts = loc.split(' ');

			if (parts[0]) {
				const province = parts[0];
				pCounts[province] = (pCounts[province] || 0) + 1;
			}

			if (parts.length > 1) {
				const sigungu = parts[1];
				sCounts[sigungu] = (sCounts[sigungu] || 0) + 1;
			}
		});

		return { provinceCounts: pCounts, sigunguCounts: sCounts };
	}, [visitedLocations]);

	const getGeoColor = (geo: any) => {
        const geoName = geo.properties.name;
        if (isMainPage) {
            return selectedSigungu === geoName ? "#A5D6A7" : "#F1F8E9";
        }
        const count = !selectedRegion ? provinceCounts[geoName] : sigunguCounts[geoName];
        if (!count) return "rgba(232, 249, 211, 0.5)";
        const opacity = Math.min(0.2 + (count || 0) * 0.25, 1.0);
        return `rgba(38, 166, 154, ${opacity})`;
    };

	return (
		<>
			<S.MapContainer>
				<ComposableMap projection={projection as any} width={500} height={600}>
					<ZoomableGroup 
						center={selectedRegion ? geoCentroid(selectedRegion) : [127.5, 36]}
						zoom={selectedRegion ? 2 : 1}
					>
						<Geographies geography={selectedRegion ? MUNICIPALITY_URL : PROVINCE_URL}>
							{({ geographies }) =>
								geographies
									.filter((geo) => {
										if (!selectedRegion) return true;
										return geo.properties.code.startsWith(selectedRegion.properties.code);
									})
									.map((geo) => (
										<Geography
											key={geo.rsmKey}
											geography={geo}
											fill={getGeoColor(geo)}
											onClick={() => handleRegionClick(geo)}
											style={GEO_STYLE}
										/>
									))
							}
						</Geographies>
					</ZoomableGroup>
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
							grid={{ rows: 3, fill: 'row' }}
							spaceBetween={10} 
							pagination={{ type: 'fraction', clickable: true }}
						>
							{filteredData.map((item, idx) => (
								<SwiperSlide key={idx}>
									<CardItem item={item} /> 
								</SwiperSlide>
							))}
							
							<SwiperSlide>
								<S.AddCardBtn onClick={() => openModal("confirm", "장소 추가", <AddPlaceModal />)}>
									<div className="add_content">
										<span>+</span>
										<p>나만의 장소 추가</p>
									</div>
								</S.AddCardBtn>
							</SwiperSlide>
						</S.StyledSwiper>
					) : isSearched ? ( 
						// 💡 2. 검색 결과가 없을 때 버튼 노출
						<S.NoResultWrap>
							<S.SearchTxt>검색 결과가 없습니다.</S.SearchTxt>
							<button className="add_direct_btn" onClick={() => openModal("confirm", "장소 추가", <AddPlaceModal />)}>
								직접 장소 추가하기
							</button>
						</S.NoResultWrap>
					) : (
						<S.SearchTxt>지역을 선택하여 관광지 정보를 확인하세요.</S.SearchTxt>
					)
				)}

				{selectedRegion && (
					<button 
						className="btn_map"
						onClick={() => { 
							setSelectedRegion(null) 
							setSelectedSigungu(null)
							setTitle("지도") 
						}}
					>
						전체 지도로 돌아가기
					</button>
				)}
			</S.MapContainer>
		</>
	);
};

export default MapComponent;