import { useState, useMemo } from 'react';
import { REGION_LIST } from '../../utils/mapUtils'; 
import * as S from "../Components.styles";

interface SearchInputComponentProps {
	placeholderTxt: string;
	onSearch: (geo: any) => void;
}

const SearchInputComponent = ({ placeholderTxt, onSearch }: SearchInputComponentProps) => {
  	const [keyword, setKeyword] = useState('');
	const [isOpen, setIsOpen] = useState(false);
	const [selectedRegion, setSelectedRegion] = useState<any>(null);

	const filteredRegions = useMemo(() => {
		const trimmedKeyword = keyword.trim();
		if (!trimmedKeyword) return [];
		return REGION_LIST.filter(r => r.name.includes(trimmedKeyword));
	}, [keyword]);

	const handleSelect = (region: any) => {
		// onSearch(mockGeo);
		setSelectedRegion(region);
		setKeyword(region.name);
		setIsOpen(false);
	};

	const handleSearch = () => {
		if (selectedRegion) {
			const mockGeo = { properties: { name: selectedRegion.name, code: selectedRegion.code } };
			onSearch(mockGeo);
		} else {
			const exactRegion = REGION_LIST.find(r => r.name === keyword.trim());
			if(exactRegion) {
				const mockGeo = { properties: { name: exactRegion.name, code: exactRegion.code } };
				onSearch(mockGeo);
			}
		}
	}

	return (
		<>
			<S.SearchInputArea>
				<input 
				type="text" 
				placeholder={placeholderTxt}
				value={keyword}
				onChange={(e) => {
					setKeyword(e.target.value);
					setSelectedRegion(null);
					setIsOpen(true);
				}}
				/>
				<button onClick={handleSearch}>검색</button>
			</S.SearchInputArea>
			
			{isOpen && filteredRegions.length > 0 && (
			<S.SuggestionList>
				{filteredRegions.map((r) => (
				<li key={r.code} onClick={() => handleSelect(r)}>
					{r.name}
				</li>
				))}
			</S.SuggestionList>
			)}
		</>
	);
}

export default SearchInputComponent;