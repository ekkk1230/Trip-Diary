import * as S from "./MapComponents.styles";
import { Link } from "react-router-dom";

interface CardItemProps {
    item: any
}

function CardItem({ item }: CardItemProps) {
    return (
        <S.Card>
            <Link to={`/detail/${item.contentid}`}>
                <S.CardImage 
                    src={item.firstimage}
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