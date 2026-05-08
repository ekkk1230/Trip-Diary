import JournalDetail from '../../features/journal/JournalDetail'
import JournalComment from '../../features/journal/JournalComment'
import { useEffect } from 'react';
import { useUiStore } from '../../store/useUiStore';
import { useJournalStore } from '../../store/useJournalStore';
import * as S from "../../features/journal/Journal.styles";

function JournalDetailPage() {
    const { setTitle } = useUiStore();
    const { isEdit } = useJournalStore();
   
    const isEditMode = isEdit;
   

    useEffect(() => {
        setTitle("저널")
    }, [setTitle]);

    return (
        <S.DetailContainer>
            <JournalDetail />
            {!isEditMode && <JournalComment />}
        </S.DetailContainer>
    )
}

export default JournalDetailPage