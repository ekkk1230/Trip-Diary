import * as S from "../Components.styles";
import { useState } from "react";
import { FaFilter } from "react-icons/fa";

interface Category {
    id: number;
    name: string;
}

const CATEGORIES: Category[] = [
    { id: 12, name: "관광지" },
    { id: 14, name: "문화시설" },
    { id: 15, name: "축제/공연/행사" },
    { id: 25, name: "여행코스" },
    { id: 28, name: "레포츠" },
    { id: 32, name: "숙박" },
    { id: 38, name: "쇼핑" },
    { id: 39, name: "음식점" },
]

interface SearchCategoryComponentProps {
    selectedCategory: number | null;
    onSelectedCategory: (id: number) => void;
}

const SearchCategoryComponent = ({ selectedCategory, onSelectedCategory }: SearchCategoryComponentProps) => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    return (
        <S.SearchCategoryContainer>
            <button 
                className="filter-btn"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
                <FaFilter />
            </button>

            <div className={`btn-wrap ${isFilterOpen ? 'isOpen' : ''}`}>
                {CATEGORIES.map(cate => (
                    <button 
                        key={cate.id}
                        onClick={() => onSelectedCategory(cate.id)}
                        className={selectedCategory === cate.id ? 'active' : ''}
                    >
                        {cate.name}
                    </button>
                ))}
            </div>
        </S.SearchCategoryContainer>
    )
}

export default SearchCategoryComponent