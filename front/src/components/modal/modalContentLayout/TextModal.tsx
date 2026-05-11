import * as S from "../Modal.styles"
import ModalFooter from "../ModalFooter";

interface TextModalProps {
    txt: string;
}

function TextModal({ txt }: TextModalProps) {
    return (
        <S.Container>
            <S.Text>{txt}</S.Text>
            <ModalFooter />
        </S.Container>
    )
}

export default TextModal