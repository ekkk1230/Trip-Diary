import { useState } from "react";
import * as S from "../Components.styles"
import SearchCategoryComponent from "./SearchCategoryComponent"
import SearchInputComponent from "./SearchInputComponent"

interface SearchContainerComponentProps {
    placeholderTxt: string;
    fetchAndFilterData: (geo: any, categoryId: string | number | null) => void;
    hasCategory?: boolean;
}

function SearchCotainerComponent({ placeholderTxt, fetchAndFilterData, hasCategory = true }: SearchContainerComponentProps) {
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

    const handleSearch = (geo: any) => fetchAndFilterData(geo, selectedCategory || null);

    return (
        <S.SearchContainer>
            <SearchInputComponent onSearch={handleSearch} placeholderTxt={placeholderTxt} />
            { hasCategory === true && <SearchCategoryComponent selectedCategory={selectedCategory} onSelectedCategory={setSelectedCategory} /> }
        </S.SearchContainer>
    )
}

export default SearchCotainerComponent