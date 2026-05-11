import * as S from "../Modal.styles"
import ModalFooter from "../ModalFooter";

interface TextModalProps {
    txt: string;
    onConfirm?: () => void;
}

function TextModal({ txt, onConfirm }: TextModalProps) {
    return (
        <S.Container>
            <S.Text>{txt}</S.Text>
            <ModalFooter onConfirm={onConfirm} />
        </S.Container>
    )
}

export default TextModal