import { useUiStore } from "../../store/useUiStore";
import * as S from "./Modal.styles";
import CheckModal from "./modalContentLayout/CheckModal";
import ConfirmModal from "./modalContentLayout/ConfirmModal";



function Modal() {
    const { modalType } = useUiStore();
    return (
        <>
            <S.ModalOverlay>
                {modalType === "confirm" ? (
                    <ConfirmModal />
                ) : (
                    <CheckModal />
                )}
            </S.ModalOverlay>
        </>
    )
}

export default Modal