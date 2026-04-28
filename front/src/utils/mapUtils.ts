import geoData from "../assets/data/skorea_municipalities_geo_simple.json";

export const REGION_LIST = geoData.features.map((feature: any) => ({
    name: feature.properties.name,
    code: feature.properties.code
}));