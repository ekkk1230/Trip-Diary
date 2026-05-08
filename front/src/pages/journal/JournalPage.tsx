import { useEffect } from 'react';
import JournalList from '../../components/journal/JournalList'
import SearchCotainerComponent from '../../components/search/SearchCotainerComponent';
import { useJournalStore } from '../../store/useJournalStore';

function JournalPage() {
    const { searchJournals } = useJournalStore();
   
    useEffect(() => {
        searchJournals("", null);
    }, [searchJournals]);

    const placeTxt = '지역, 장소 명을 입력해주세요.';

    const handleJournalSearch = (geo: any) => {
        const keyword = typeof geo === 'string' ? geo : geo?.keyword || "";
        searchJournals(keyword, null);
    }

    return (
        <>
            <SearchCotainerComponent placeholderTxt={placeTxt} fetchAndFilterData={handleJournalSearch} hasCategory={false} />
            <JournalList type="list" />
        </>
    )
}

export default JournalPage