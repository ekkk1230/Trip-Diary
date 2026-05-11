import { useUiStore } from "../../store/useUiStore";
import * as S from "./Modal.styles";
import { IoCloseCircleOutline } from "react-icons/io5";



function Modal() {
    const { closeModal, modalTitle, modalContent } = useUiStore();
    return (
        <>
            <S.ModalOverlay>
                <S.ModalContainer onClick={(e) => e.stopPropagation()}>
                    <S.ModalHeader>
                        <p>{modalTitle}</p>
                        <button onClick={closeModal}><IoCloseCircleOutline /></button>
                    </S.ModalHeader>

                    <S.ModalBody>{modalContent}</S.ModalBody>
                </S.ModalContainer>
            </S.ModalOverlay>
        </>
    )
}

export default Modal