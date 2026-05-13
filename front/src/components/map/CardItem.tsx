import { useMapStore } from "../../store/useMapStore";
import * as S from "../../features/map/MapComponents.styles";
import { Link } from "react-router-dom";

import { BsBookmarkHeart, BsBookmarkHeartFill } from "react-icons/bs";
import { useUserStore } from "../../store/useUserStore";

interface CardItemProps {
    item: any,
    link: string,
}

function CardItem({ item, link }: CardItemProps) {
    const { toggleFavorite, favoriteList } = useMapStore();
    const { user } = useUserStore();

    const handleFavoriteClick = (contentid: any) => {
        toggleFavorite(user?.userId!, contentid)
    };

    const isFavorite = favoriteList[user?.userId!].some(fav => fav.contentid === item.contentid);

    return (
        <S.Card>
            <S.FavoriteButton onClick={() => handleFavoriteClick(item.contentid)}>
                {isFavorite ?  <BsBookmarkHeartFill/> : <BsBookmarkHeart/>}
            </S.FavoriteButton>

            <Link to={link}>
                <S.CardImage 
                    src={item.firstimage || `${import.meta.env.BASE_URL}default-image.png`} 
                    alt={item.title}
                    $noImage={!item.firstimage}
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