import { useNavigate } from "react-router-dom"
import { useUserStore } from "../store/useUserStore";
import { useUiStore } from "../store/useUiStore";
import React, { useRef, useState, type ChangeEvent } from "react";
import TextModal from "../components/modal/modalContentLayout/TextModal";

export const useJoin = () => {
    const navigate = useNavigate();
    const { joinUser, checkNickname, checkId } = useUserStore();
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
    const [isDuplicated, setIsDuplicated] = useState({
        nicknameDup: false,
        idDup: false
    })

    const nicknameArr = checkNickname();
    const idArr = checkId();
    const inputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.webp)$/i;
        if (!allowedExtensions.exec(file.name)) {
            openModal(
                "check",
                "형식 오류",
                <TextModal txt={"이미지 파일(jpg, png, webp)만 업로드 가능합니다."} />
            );
            e.target.value = "";
            return;
        }

        const maxSize = 1 * 1024 * 1024;
        if (file.size > maxSize) {
            openModal(
                "check",
                "용량 초과",
                <TextModal txt={"이미지 크기는 1MB를 초과할 수 없습니다."} />
            );
            e.target.value = ""; 
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result as string;
            setProfileImg(base64String);
            setFormData(prev => ({ ...prev, profileImg: base64String }));
        };
        reader.readAsDataURL(file);
    }

    const focusTo = (key: string) => inputRefs.current[key]?.focus();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        const noSpaceFields = ['userId', 'nickname', 'password', 'passwordConfirm'];
        let cleanValue = noSpaceFields.includes(name) ? value.replace(/\s/g, '') : value;

        if (name === 'nickname') {
            // 닉네임: 한글, 영문, 숫자만 허용 (8자 제한)
            const nicknameRegex = /[^ㄱ-ㅎ가-힣a-zA-Z0-9]/g;
            cleanValue = cleanValue.replace(nicknameRegex, '').substring(0, 8);
        } 
        else if (name === 'userId') {
            // 아이디: 영문, 숫자만 허용 (8자 제한)
            const idRegex = /[^a-zA-Z0-9]/g;
            cleanValue = cleanValue.replace(idRegex, '').substring(0, 8);
        }
        else if (name === 'password' || name === 'passwordConfirm') {
            // 비밀번호: 영문, 숫자, 허용된 특수문자만 허용
            const pwdRegex = /[^a-zA-Z0-9!@#$%^&*]/g;
            cleanValue = cleanValue.replace(pwdRegex, '');
        }
        
        setFormData(prev => ({ ...prev, [name]: cleanValue }));

        if (name === 'nickname') setIsDuplicated(prev => ({ ...prev, nicknameDup: false }));
        if (name === 'userId') setIsDuplicated(prev => ({ ...prev, idDup: false }));
    }

    const handleCheckDuplicate = (type: string) => {
        if (type === 'nickname') {
            if (formData.nickname.trim() === '')  {
                openModal("check", "중복 오류", <TextModal txt={"닉네임을 입력해주세요."} onConfirm={() => focusTo("nickname")} />);
                return;
            }
            const isExist = nicknameArr.includes(formData.nickname);
            if (isExist) {
                openModal("check", "중복 오류", <TextModal txt={"동일한 닉네임이 존재합니다."} onConfirm={() => focusTo("nickname")} />);
                setIsDuplicated(prev => ({ ...prev, nicknameDup: false }));
                return;
            }
            setIsDuplicated(prev => ({ ...prev, nicknameDup: true }));
            openModal("check", "중복 확인", <TextModal txt={"사용 가능한 닉네임입니다."} />);
    
        } else if (type === "userId") {
            if (formData.userId.trim() === '')  {
                openModal("check", "중복 오류", <TextModal txt={"아이디를 입력해주세요."} onConfirm={() => focusTo("userId")} />);
                return;
            }
            const isExist = idArr.includes(formData.userId);
            if (isExist) {
                openModal("check", "중복 오류", <TextModal txt={"동일한 아이디가 존재합니다."} onConfirm={() => focusTo("userId")} />);
                setIsDuplicated(prev => ({ ...prev, idDup: false }));
                return;
            }
            setIsDuplicated(prev => ({ ...prev, idDup: true }));
            openModal("check", "중복 확인", <TextModal txt={"사용 가능한 아이디입니다."} />);
        }
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
                    <TextModal txt={`${label}을(를) 입력해주세요.`} onConfirm={() => focusTo(key)} />,
                );
                return;
            }
        }

        const pwdHardRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/;

        if (!pwdHardRegex.test(formData.password)) {
            openModal(
                "check",
                "비밀번호 오류",
                <TextModal 
                    txt={"비밀번호는 영문, 숫자, 특수문자(!@#$%^&*)를 각각 최소 1개 이상 포함하여 8자 이상이어야 합니다."} 
                    onConfirm={() => focusTo("password")} 
                />
            );
            return;
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

        const { nicknameDup, idDup } = isDuplicated;
        if (!nicknameDup || !idDup) {
            const target = nicknameDup ? "아이디" : "닉네임";
            const focusTarget = nicknameDup ? "userId" : "nickname";
            openModal("check", "중복 오류", <TextModal txt={`${target} 중복확인을 해주세요.`} onConfirm={() => focusTo(focusTarget)} />);
            return;
        }

        const user = {
            id: crypto.randomUUID(),
            nickname: formData.nickname.trim(),
            userId: formData.userId.trim(),
            password: formData.password.trim(),
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
        handleAllTerms, handleTermClick, handleCheckDuplicate, handleJoin
    };
}