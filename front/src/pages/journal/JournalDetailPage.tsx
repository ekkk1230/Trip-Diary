import JournalDetail from '../../features/journal/JournalDetail'
import JournalComment from '../../features/journal/JournalComment'
import { useEffect } from 'react';
import { useUiStore } from '../../store/useUiStore';

function JournalDetailPage() {
    const { setTitle } = useUiStore();
   
    useEffect(() => {
        setTitle("저널")
    }, [setTitle])

    return (
        <>
            <JournalDetail />
            <JournalComment />
        </>
    )
}

export default JournalDetailPage