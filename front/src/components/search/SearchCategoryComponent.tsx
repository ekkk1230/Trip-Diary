import { useState } from "react";
import * as S from "../Components.styles";

const CATEGORIES = [
    { id: 12, name: "관광지" },
    { id: 14, name: "문화시설" },
    { id: 15, name: "축제/공연/행사" },
    { id: 25, name: "여행코스" },
    { id: 28, name: "레포츠" },
    { id: 32, name: "숙박" },
    { id: 38, name: "쇼핑" },
    { id: 39, name: "음식점" },
]

const SearchCategoryComponent = () => {
    const [selected, setSelected] = useState(false);

    return (
        <S.SearchCategoryContainer>
            {CATEGORIES.map(cate => (
                <button 
                    key={cate.id}
                >
                    {cate.name}
                </button>
            ))}
        </S.SearchCategoryContainer>
    )
}

export default SearchCategoryComponent