import * as S from "../Components.styles"
import SearchCategoryComponent from "./SearchCategoryComponent"
import SearchInputComponent from "./SearchInputComponent"

interface SearchContainerComponentProps {
    placeholderTxt: string;
    fetchAndFilterData: (geo: any) => void;
}

function SearchCotainerComponent({ placeholderTxt, fetchAndFilterData }: SearchContainerComponentProps) {
    return (
        <S.SearchContainer>
            <SearchCategoryComponent />
            <SearchInputComponent onSearch={fetchAndFilterData} placeholderTxt={placeholderTxt} />
        </S.SearchContainer>
    )
}

export default SearchCotainerComponent