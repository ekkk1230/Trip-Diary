import CardItem from "../../features/map/CardItem";
import { useMapStore } from "../../store/useMapStore"

function FavoritePage() {
    const { favoriteList } = useMapStore();

    console.log('favoriteList', favoriteList )

    if (favoriteList.length <= 0) return <div>아직 없습니다.</div>

    return (
        <>
            {favoriteList.map(item => (
                <CardItem item={item} />
            ))}
        </>
    )
}

export default FavoritePage