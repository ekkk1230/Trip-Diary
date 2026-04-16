import React from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

// 현재 정상 작동하는 대한민국 시도 단위 GeoJSON 주소입니다.
const KOREA_URL = "https://raw.githubusercontent.com/southkorea/southkorea-maps/master/kostat/2013/json/skorea_provinces_geo_simple.json";

interface KoreaMapProps {
  onRegionClick: (name: string) => void;
}

const KoreaMap: React.FC<KoreaMapProps> = ({ onRegionClick }) => {
  return (
    <div style={{ width: "100%", height: "auto" }}>
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          center: [127.5, 36], // 대한민국 중심 좌표
          scale: 5000,         // 지도 크기 (화면에 맞춰 조절)
        }}
        viewBox="0 0 500 600"
      >
        <Geographies geography={KOREA_URL}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                onClick={() => {
                  // 이 데이터의 지역 이름 키값은 'name'입니다.
                  const { name } = geo.properties;
                  onRegionClick(name);
                }}
                style={{
                  default: {
                    fill: "#F1F8E9",
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
                  },
                }}
              />
            ))
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
};

export default KoreaMap;