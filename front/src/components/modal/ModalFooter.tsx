import { useUiStore } from "../../store/useUiStore"
import * as S from "./Modal.styles"

interface ModalFooterProps {
    onConfirm?: () => void;
}

function ModalFooter({ onConfirm }: ModalFooterProps) {
    const { modalType, closeModal } = useUiStore();

    return (
        <S.ModalFooter>
        {modalType === "confirm" ? (
            <div className="btn-wrap">
                <button className="btn-confirm" onClick={onConfirm}>확인</button>
                <button className="btn-confirm" onClick={closeModal}>취소</button>
            </div>
        ) : (
            <div className="btn-wrap">
                <button className="btn-confirm" onClick={closeModal}>닫기</button>
            </div>
        )}
        </S.ModalFooter>
    )
}

export default ModalFooter