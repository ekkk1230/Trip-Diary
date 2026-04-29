import * as S from "./MapComponents.styles";

interface CardItemProps {
    item: any
}

function CardItem({ item }: CardItemProps) {
    return (
        <S.Card>
            <S.CardImage 
                src={item.firstimage}
            />
            <S.CardBody>
                <S.CardTitle>{item.title}</S.CardTitle>
            </S.CardBody>
        </S.Card>
    )
}

export default CardItem