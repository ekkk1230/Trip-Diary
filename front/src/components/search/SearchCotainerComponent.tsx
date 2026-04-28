import { useState } from "react";
import * as S from "../Components.styles"
import SearchCategoryComponent from "./SearchCategoryComponent"
import SearchInputComponent from "./SearchInputComponent"

interface SearchContainerComponentProps {
    placeholderTxt: string;
    fetchAndFilterData: (geo: any, categoryId: string | number) => void;
}

function SearchCotainerComponent({ placeholderTxt, fetchAndFilterData }: SearchContainerComponentProps) {
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

    const handleSearch = (geo: any) => {
        fetchAndFilterData(geo, selectedCategory || "");
    }

    return (
        <S.SearchContainer>
            <SearchCategoryComponent selectedCategory={selectedCategory} onSelectedCategory={setSelectedCategory} />
            <SearchInputComponent onSearch={handleSearch} placeholderTxt={placeholderTxt} />
        </S.SearchContainer>
    )
}

export default SearchCotainerComponent