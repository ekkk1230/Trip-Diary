import { useUiStore } from "../../../store/useUiStore";
import * as S from "../Modal.styles";
import { IoCloseCircleOutline } from "react-icons/io5";

interface CheckModalProps {
    title: string;
    content: string;
}

function CheckModal({ title, content }: CheckModalProps) {
    const { onClose } = useUiStore();
    return (
        <>
            <S.ModalContainer onClick={(e) => e.stopPropagation()}>
                <S.ModalHeader>
                    <p>{title}</p>
                    <button onClick={onClose}><IoCloseCircleOutline /></button>
                </S.ModalHeader>

                <S.ModalBody>{content}</S.ModalBody>

                <S.ModalFooter>
                    <button className="btn-confirm" onClick={onClose}>닫기</button>
                </S.ModalFooter>
            </S.ModalContainer>
        </>
    )
}

export default CheckModal