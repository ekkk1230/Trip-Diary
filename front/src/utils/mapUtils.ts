import geoData from "../assets/data/skorea_municipalities_geo_simple.json";
const { kakao } = window as any;

export const REGION_LIST = geoData.features.map((feature: any) => ({
    name: feature.properties.name,
    code: feature.properties.code
}));

export const calculateTravelTime = (start: { mapx: number; mapy: number }, end: { mapx: number; mapy: number }) => {
    const startPos = new kakao.maps.LatLng(start.mapy, start.mapx);
    const endPos = new kakao.maps.LatLng(end.mapy, end.mapx);

    const polyline = new kakao.maps.Polyline({
        path: [startPos, endPos]
    });

    const distance = polyline.getLength();

    const averageSpeedMin = 666;
    const correctionFactor = 1.3;
    const estimatedTime = Math.ceil((distance * correctionFactor) / averageSpeedMin);

    return {
        distance: (distance / 1000).toFixed(1),
        time: estimatedTime < 1 ? 1 : estimatedTime
    };
};