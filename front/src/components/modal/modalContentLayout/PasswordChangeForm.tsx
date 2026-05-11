import { useState } from "react";
import * as S from "../Modal.styles";
import ModalFooter from "../ModalFooter";

interface PasswordChangeFormProps {
    onConfirm: (newPassword: string) => void
}
function PasswordChangeForm({ onConfirm }: PasswordChangeFormProps) {
    const [password, setPassword] = useState<string>("");
    const [rePassword, setRePassword] = useState<string>("");


    const handleConfirm = () => {
        if (password !== rePassword) return alert("비밀번호를 다시 입력해주세요.");

        onConfirm(password);
    }


    return (
        <>
            <S.Container>
                <S.Input 
                    name="newPassword" type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="새 비밀번호" />
                <S.Input 
                    name="confirmPassword" type="password" 
                    value={rePassword} 
                    onChange={(e) => setRePassword(e.target.value)} 
                    placeholder="새 비밀번호 확인" />
            </S.Container>
            <ModalFooter onConfirm={handleConfirm} />
        </>
    )
}

export default PasswordChangeForm;