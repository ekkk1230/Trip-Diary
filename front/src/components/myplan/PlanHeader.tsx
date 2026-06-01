import type { ChangeEvent } from "react";
import * as S from "../../pages/myPlan/MyPlan.styles";
import type { Plan } from "../../types/plan";

interface PlanHeaderProps {
    title: string;
    startDate: string;
    endDate: string;
    memo: string | undefined;
    todayString: string;
    planData: Plan | undefined;
    setTitle: (value: string) => void;
    setStartDate: (value: string) => void;
    setEndDate: (value: string) => void;
    setMemo: (value: string) => void;
    handleSavePlan: () => void;
}

function PlanHeader({ title, startDate, endDate, planData, memo, setTitle, setStartDate, setEndDate, setMemo, todayString, handleSavePlan }: PlanHeaderProps) {

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
    const onChangeStart = (e: ChangeEvent<HTMLInputElement>) => setStartDate(e.target.value);
    const onChangeEnd = (e: ChangeEvent<HTMLInputElement>) => setEndDate(e.target.value);
    const onChangeMemo = (e: ChangeEvent<HTMLTextAreaElement>) => setMemo(e.target.value);

    const onSave = () => handleSavePlan();

    return (
        <S.PlannerHeader>
            <S.HeaderTopRows>
                <S.InputGroup className="title-input">
                    <label>여행 제목</label>
                    <input 
                        type="text" 
                        placeholder="멋진 여행 제목을 적어주세요." 
                        value={title}
                        onChange={onChangeTitle}
                    />
                </S.InputGroup>

                <S.InputGroup className="date-input">
                    <label>여행 기간</label>
                    <div className="date-picker-wrap">
                        <input type="date" value={startDate} min={todayString} onChange={onChangeStart} />
                        <span>~</span>
                        <input type="date" value={endDate} min={startDate || todayString} onChange={onChangeEnd} />
                    </div>
                </S.InputGroup>

                <S.InputGroup className="memo-input">
                    <label>여행 메모</label>
                    <textarea 
                        placeholder="여행 시 참고할 메모를 자유롭게 적어보세요." 
                        value={memo}
                        onChange={onChangeMemo}
                    />
                </S.InputGroup>

                <S.SaveButton onClick={handleSavePlan}>
                    {planData ? "수정 완료" : "일정 저장"}
                </S.SaveButton>
            </S.HeaderTopRows>
        </S.PlannerHeader>
    )
}

export default PlanHeader