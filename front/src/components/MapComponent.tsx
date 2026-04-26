import { useMapStore } from "../store/useMapStore";
import { useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { geoCentroid, geoMercator } from "d3-geo";

const PROVINCE_URL = "https://raw.githubusercontent.com/southkorea/southkorea-maps/master/kostat/2013/json/skorea_provinces_geo_simple.json";
const MUNICIPALITY_URL = "https://raw.githubusercontent.com/southkorea/southkorea-maps/master/kostat/2013/json/skorea_municipalities_geo_simple.json";

const MapComponent: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<any | null>(null);
  const { setTitle } = useMapStore();

  const projection = geoMercator()
    .center(selectedRegion ? geoCentroid(selectedRegion) : [127.5, 36])
    .scale(selectedRegion ? 16000 : 4000) 
    .translate([250, 300]);

  return (
    <div style={{ width: "500px", margin: "0 auto" }}>
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
                  onClick={() => {
                    if (!selectedRegion) {
                      setSelectedRegion(geo);
                      setTitle(geo.properties.name)
                    } else {
                      alert(`${geo.properties.name}을(를) 선택하셨습니다.`);
                      setTitle(geo.properties.name);
                    }
                  }}
                  style={{
                    default: { fill: "#F1F8E9", stroke: "#2E7D32", strokeWidth: 0.5 },
                    hover: { fill: "#C8E6C9", cursor: "pointer" },
                  }}
                />
              ))
          }
        </Geographies>
      </ComposableMap>
      {selectedRegion && (
        <button 
          onClick={() => { 
            setSelectedRegion(null) 
            setTitle("지도") 
          }}
          style={{ display: "block", margin: "10px auto" }}
        >
          전체 지도로 돌아가기
        </button>
      )}
    </div>
  );
};

export default MapComponent;