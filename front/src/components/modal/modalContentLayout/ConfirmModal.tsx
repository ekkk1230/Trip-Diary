import { useUiStore } from "../../../store/useUiStore";
import * as S from "../Modal.styles";
import { IoCloseCircleOutline } from "react-icons/io5";


function ConfirmModal() {
    const { closeModal, modalTitle, modalContent } = useUiStore();

    return (
        <S.ModalContainer onClick={(e) => e.stopPropagation()}>
            <S.ModalHeader>
                <p>{modalTitle}</p>
                <button onClick={closeModal}><IoCloseCircleOutline /></button>
            </S.ModalHeader>

            <S.ModalBody>{modalContent}</S.ModalBody>

            <S.ModalFooter>
                <button className="btn-confirm" onClick={closeModal}>닫기</button>
            </S.ModalFooter>
        </S.ModalContainer>
    )
}

export default ConfirmModal