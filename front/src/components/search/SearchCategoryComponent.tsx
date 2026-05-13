import * as S from "../Components.styles";
import { useState } from "react";
import { FaFilter } from "react-icons/fa";
import { CATEGORIES } from "../../constants/region";

export interface Category {
    id: number;
    name: string;
}

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