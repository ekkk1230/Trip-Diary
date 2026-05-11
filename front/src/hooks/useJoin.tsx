import { useNavigate } from "react-router-dom"
import { useUserStore } from "../store/useUserStore";
import { useUiStore } from "../store/useUiStore";
import React, { useRef, useState, type ChangeEvent } from "react";
import TextModal from "../components/modal/modalContentLayout/TextModal";

export const useJoin = () => {
    const navigate = useNavigate();
    const { joinUser } = useUserStore();
    const { openModal } = useUiStore();

    const [profileImg, setProfileImg] = useState<string | null>('');
    const [formData, setFormData] = useState({
        nickname: '', userId: '',
        password: '', passwordConfirm: '', 
        gender: 'male', birth: '',
        profileImg: '',
    })
    const [terms, setTerms] = useState({
        service: false, privacy: false,
    })

    const inputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            
            reader.onloadend = () => {
                const base64String = reader.result as string;
                setProfileImg(base64String);

                setFormData(prev => ({
                    ...prev,
                    profileImg: base64String
                }))
            };
            reader.readAsDataURL(file);
        }
    }

    const focusTo = (key: string) => inputRefs.current[key]?.focus();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    const handleJoin = () => {
        const requiredFields: Record<string, string> = {
            nickname: "닉네임", userId: "아이디", password: "비밀번호", birth: "생년월일"
        };

        for (const [key, label] of Object.entries(requiredFields)) {
            if (!formData[key as keyof typeof formData]?.trim()) {
                openModal(
                    "check",
                    "입력 오류",
                    <TextModal txt={`${label}을(를) 입력해주세요.`} onConfirm={() => focusTo(label)} />,
                );
                return;
            }
        }
        
        if (formData.password !== formData.passwordConfirm) {
            openModal("check", "비밀번호 오류", <TextModal txt={"비밀번호가 잘못 입력되었습니다."} onConfirm={() => focusTo("passwordConfirm")} />);
            return;
        }

        if (!terms.service || !terms.privacy) {
            const target = !terms.service ? "이용약관" : "개인정보 수집 및 이용";

            openModal("check", "약관동의 오류", <TextModal txt={`${target} 동의를 확인해주세요.`} onConfirm={() => focusTo(target)} />);
            return;
        }

        const user = {
            id: crypto.randomUUID(),
            nickname: formData.nickname,
            userId: formData.userId,
            password: formData.password,
            gender: formData.gender,
            birth: formData.birth,
            profileImg: formData.profileImg || '',
            agreements: {
                service: terms.service,
                privacy: terms.privacy,
                agreedAt: new Date().toISOString().split('T')[0],
            }
        };

        joinUser(user);

        openModal(
            "check",
            "회원가입 완료",
            (<TextModal txt={"회원가입이 완료되었습니다."} />)
        );

        navigate('/login');
    }

    const handleAllTerms = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { checked } = e.target;
        setTerms({
            service: checked,
            privacy: checked
        });
    }

    const handleTermClick = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setTerms(prev => ({
            ...prev,
            [name]: checked
        }));
    }

    return { 
        formData, terms, profileImg, inputRefs, 
        setFormData, setTerms, setProfileImg, 
        handleImageChange, handleChange, 
        handleAllTerms, handleTermClick, handleJoin
    };
}