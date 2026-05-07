import { useMapStore } from "../../store/useMapStore";
import * as S from "./MapComponents.styles";
import { Link } from "react-router-dom";

import { BsBookmarkHeart, BsBookmarkHeartFill } from "react-icons/bs";

interface CardItemProps {
    item: any
}

function CardItem({ item }: CardItemProps) {
    const { toggleFavorite, favoriteList } = useMapStore();

    const handleFavoriteClick = (contentid: any) => {
        toggleFavorite(contentid)
    };

    const isFavorite = favoriteList.some(fav => fav.contentid === item.contentid);

    return (
        <S.Card>
            <S.FavoriteButton onClick={() => handleFavoriteClick(item.contentid)}>
                {isFavorite ?  <BsBookmarkHeartFill/> : <BsBookmarkHeart/>}
            </S.FavoriteButton>

            <Link to={`/detail/${item.contentid}`}>
                <S.CardImage 
                    src={item.firstimage || "/default-image.png"} 
                    alt={item.title}
                />
                <S.CardBody>
                    <S.CardTitle>{item.title}</S.CardTitle>
                    <S.CardAddress>{item.addr1}</S.CardAddress>
                </S.CardBody>
            </Link>
        </S.Card>
    )
}

export default CardItem