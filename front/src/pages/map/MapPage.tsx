
import SearchCotainerComponent from "../../components/search/SearchCotainerComponent";
import MapComponent from "../../features/map/MapComponent"
import { useMapStore } from "../../store/useMapStore";

function MapPage() {
    const { fetchAndFilterData } = useMapStore();
    const searchPlaceholderText = "예) 해운대구, 강남구";

    return (
        <>
            <SearchCotainerComponent fetchAndFilterData={fetchAndFilterData} placeholderTxt={searchPlaceholderText} />
            <MapComponent />
        </>
    )
}

export default MapPage