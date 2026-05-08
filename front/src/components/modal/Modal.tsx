import * as S from "./Modal.styles";
import CheckModal from "./modalContentLayout/CheckModal";
import ConfirmModal from "./modalContentLayout/ConfirmModal";

interface ModalProps {
    type: "confirm" | "check";
    title: string;
    content: string;
}

function Modal({type, title, content}: ModalProps   ) {
    return (
        <>
            <S.ModalOverlay>
                {type === "confirm" ? (
                    <ConfirmModal title={title} content={content} />
                ) : (
                    <CheckModal title={title} content={content} />
                )}
            </S.ModalOverlay>
        </>
    )
}

export default Modal