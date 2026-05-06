import { useEffect } from 'react';
import JournalList from '../../components/journal/JournalList'
import { useUiStore } from '../../store/useUiStore'

function JournalPage() {
    const { setTitle } = useUiStore();
   
    useEffect(() => {
        setTitle("저널")
    }, [setTitle])

    return (
        <JournalList type="list" />
    )
}

export default JournalPage