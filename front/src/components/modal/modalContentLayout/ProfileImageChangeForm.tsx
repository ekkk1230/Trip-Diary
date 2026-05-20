import { useState, type ChangeEvent } from "react";
import * as S from "../Modal.styles";
import ModalFooter from "../ModalFooter";
import { useUserStore } from "../../../store/useUserStore";
import { useUiStore } from "../../../store/useUiStore";
import TextModal from "./TextModal";

interface ProfileImageChangeFormProps {
    onImageChange: (file: File) => void;
}

function ProfileImageChangeForm({ onImageChange }: ProfileImageChangeFormProps) {
    const { user, profileImgChange } = useUserStore();
    const { openModal } = useUiStore();

    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        }
    };

    const handleConfirm = () => {
        if (selectedFile && previewUrl) {
            profileImgChange(user?.userId!, selectedFile);
            onImageChange(selectedFile);
        } else {
            openModal(
                "check",
                "프로필 변경",
                <TextModal txt={"사진을 선택해주세요."} />
            );
        }
    }

    return (
        <S.Container>
            <S.PreviewSection>
                {previewUrl ? (
                    <img src={previewUrl} alt="" />
                ) : (
                    <div className="placeholder">사진을 선택해주세요.</div>
                )}
            </S.PreviewSection>
            
            <input 
                type="file" 
                accept="image/*"
                onChange={handleFileChange}
            />

            <ModalFooter 
                onConfirm={handleConfirm}
            />
        </S.Container>
    );
}

export default ProfileImageChangeForm;