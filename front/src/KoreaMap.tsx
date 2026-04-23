import React, { useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { geoCentroid } from "d3-geo";
const PROVINCE_URL = "https://raw.githubusercontent.com/southkorea/southkorea-maps/master/kostat/2013/json/skorea_provinces_geo_simple.json";
const MUNICIPALITY_URL = "https://raw.githubusercontent.com/southkorea/southkorea-maps/master/kostat/2013/json/skorea_municipalities_geo_simple.json";

const KoreaMap: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<any | null>(null);

  // 중심점 계산 함수
  const getCenter = (geo: any) => {
    return geoCentroid(geo);
  };

  return (
    <div style={{ width: "500px", margin: "0 auto" }}>
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          // 1. 여기서 center를 직접 제어하기보다 
          // 2. ComposableMap이 전체 뷰포트에서 계산하도록 중심점을 넘깁니다.
          scale: selectedRegion ? 15000 : 4500,
          center: selectedRegion ? getCenter(selectedRegion) : [127.5, 36],
        }}
        // 3. 뷰박스를 0,0 기반이 아니라 실제 지도 영역 중앙을 향하게 조정
        viewBox={selectedRegion ? "100 100 300 400" : "0 0 500 600"}
      >
        <Geographies geography={selectedRegion ? MUNICIPALITY_URL : PROVINCE_URL}>
          {({ geographies }) =>
            geographies
              .filter((geo) => !selectedRegion || geo.properties.name.startsWith(selectedRegion.properties.name.substring(0, 2)))
              .map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onClick={() => {
                    if (!selectedRegion) {
                      setSelectedRegion(geo); // 도 선택 시 저장
                    } else {
                      alert(`${geo.properties.name}을(를) 선택하셨습니다.`);
                    }
                  }}
                  style={{
                    default: { fill: selectedRegion ? "#E8F5E9" : "#F1F8E9", stroke: "#2E7D32", strokeWidth: 0.5 },
                    hover: { fill: "#C8E6C9", cursor: "pointer" },
                  }}
                />
              ))
          }
        </Geographies>
      </ComposableMap>
      {selectedRegion && <button onClick={() => setSelectedRegion(null)}>전체 지도로 돌아가기</button>}
    </div>
  );
};

export default KoreaMap;