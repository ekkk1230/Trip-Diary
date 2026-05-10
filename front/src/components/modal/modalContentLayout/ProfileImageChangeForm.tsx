import { useState } from "react";

interface ProfileImageChangeFormProps {
    onImageChange: (newImage: string) => void;
}

function ProfileImageChangeForm({ onImageChange }: ProfileImageChangeFormProps) {
    const [newImage, setNewImage] = useState("");

    const handleSave = () => {
        onImageChange(newImage);
    };

    return (
        <div>
            <input
                type="text"
                value={newImage}
                onChange={(e) => setNewImage(e.target.value)}
                placeholder="새 프로필 사진 URL"
            />
            <button onClick={handleSave}>저장하기</button>
        </div>
    );
}

export default ProfileImageChangeForm;