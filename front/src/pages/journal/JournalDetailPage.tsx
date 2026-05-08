import JournalDetail from '../../features/journal/JournalDetail'
import JournalComment from '../../features/journal/JournalComment'
import { useEffect } from 'react';
import { useUiStore } from '../../store/useUiStore';
import { useJournalStore } from '../../store/useJournalStore';

function JournalDetailPage() {
    const { setTitle } = useUiStore();
    const { isEdit } = useJournalStore();
   
    const isEditMode = isEdit;
   

    useEffect(() => {
        setTitle("저널")
    }, [setTitle]);

    return (
        <>
            <JournalDetail />
            {!isEditMode && <JournalComment />}
        </>
    )
}

export default JournalDetailPage