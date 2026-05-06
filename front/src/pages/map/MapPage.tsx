
import { useEffect } from "react";
import SearchCotainerComponent from "../../components/search/SearchCotainerComponent";
import MapComponent from "../../features/map/MapComponent"
import { useMapStore } from "../../store/useMapStore";
import { useUiStore } from "../../store/useUiStore";

function MapPage() {
    const { setTitle } = useUiStore();
    const { fetchAndFilterData } = useMapStore();
    const searchPlaceholderText = "예) 해운대구, 강남구";

	useEffect(() => {
		setTitle("지도")
	}, [setTitle]);

    return (
        <>
            <SearchCotainerComponent fetchAndFilterData={fetchAndFilterData} placeholderTxt={searchPlaceholderText} />
            <MapComponent isMainPage={true} />
        </>
    )
}

export default MapPage