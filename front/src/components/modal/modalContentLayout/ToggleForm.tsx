import { useUiStore } from "../../../store/useUiStore"
import * as S from "../Modal.styles"
import ModalFooter from "../ModalFooter";

interface ToggleFormProps {
    subTit: string;
    subLabel: string;
    type: string
}

function ToggleForm({ subTit, subLabel, type }: ToggleFormProps) {
    const { isDark, setIsDark, alarm ,setAlarm } = useUiStore();

    const handleToggleEvent = (type: string) => {
        if (type === "setting") setIsDark(); 
        else if (type === "alarm") setAlarm();
    }

    return (
        <S.Container>
            <S.OptionItem>
                <div className="info">
                    <span className="label">{subTit}</span>
                    <span className="sub-label">{subLabel}</span>
                </div>
                
                <S.ToggleWrapper 
                    onClick={() => handleToggleEvent(type)} 
                    $active={type === "setting" ? isDark : alarm}
                >
                    <div className="circle" />
                </S.ToggleWrapper>
            </S.OptionItem>

            <ModalFooter />
        </S.Container>
    )
}

export default ToggleForm