import { useLocation, useNavigate, useParams } from "react-router-dom"
import { useUserStore } from "../store/useUserStore";
import { useJournalStore } from "../store/useJournalStore";
import React, { useEffect, useState, type ChangeEvent } from "react";
import { REGION_DATA } from "../constants/region";
import { useUiStore } from "../store/useUiStore";
import TextModal from "../components/modal/modalContentLayout/TextModal";

export const useJournalDetail = () => {
    const location = useLocation();
    const { id } = useParams();
    const { user } = useUserStore();
    const { journals, addJournal, updateJournal, removeJournal, likedJournal, likedJournalIds,
        isEdit, setIsEdit ,fetchComments } = useJournalStore();
    const { openModal } = useUiStore();
    
    const journal = journals.find(j => j.id === id);
    const isNew = location.pathname.includes('/write');
    const isEditMode = location.pathname.includes('/edit');
    const mood = isNew ? 'new' : (isEditMode ? 'edit' : 'view');
    const sidos = Object.keys(REGION_DATA);
    const isLiked = likedJournalIds.includes(journal?.id!);
    const userId = user?.id!;

    useEffect(() => { fetchComments(parseInt(id!)) }, [id]);
    useEffect(() => {
        if (!location.pathname.includes('/write') && !location.pathname.includes('/edit')) setIsEdit(undefined, undefined, false);
    }, [location.pathname]);
    useEffect(() => {
        const isEditMode = mood === "edit" || mood === "new";
        setIsEdit(undefined, undefined, isEditMode);
    }, [mood]);

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [editData, setEditData] = useState({
        logTitle: journal?.logTitle || "",
        travelDate: journal?.travelDate || "",
        weather: journal?.weather || "",
        sido: journal?.location.split(" ")[0] || "",
        sigungu: journal?.location?.split(" ")[1] || "",
        placeName: journal?.placeName || "",
        description: journal?.description || "",
        keywords: journal?.keywords || [],
        contentId: journal?.contentId || "",
        mainImage: journal?.mainImage || "",
    })
    
    const navigate = useNavigate();
    const updateField = (key: string, value: any) => {
        setEditData(prev => ({
            ...prev,
            [key]: value,
            ...(key === "sido" && { sigungu: "" })
        }));
    };

    const handleSubmit = async (e: React.MouseEvent) => {
        e.preventDefault();
        if (isEdit) {
            try {
                const finalLocation = `${editData.sido} ${editData.sigungu}`.trim();
                const { mainImage, ...resData } = editData;
                const finalData = { ...resData, location: finalLocation };

                let targetJournal: any;

                if (mood === "new") {
                    const newJournal = {
                        ...finalData,
                        placeName: "",
                        author: user?.nickname || "",
                        stats: { likes: 0, comments: 0, views: 0 },
                        keywords: [],
                    };
                    targetJournal = await addJournal(newJournal, imageFile);
                } else targetJournal = await updateJournal(journal?.id!, finalData);

                setIsEdit(undefined, undefined, false);

                if (targetJournal.id) navigate(`/journal/${targetJournal.id}`, { state: { mood: 'view' } });
                else navigate("journal");
            } catch (err) {
                console.error("저장 중 오류 발생: " + err);
                openModal(
                    "check",
                    "저장 실패",
                    <TextModal txt={"저장에 실패했습니다. 다시 시도해 주세요."} />
                )
            }
        }
    }

    const handleImageUpdate = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => updateField("mainImage", reader.result);
            reader.readAsDataURL(file);
        }
    }

    const handleDelete = (journalId: string) => {
        if (confirm("기록을 삭제하시겠습니까?")) {
            removeJournal(journalId);
            navigate("/journal");
        }
    }

    return {
        userId, editData, isEdit, setIsEdit, setImageFile, likedJournal, journal, mood, sidos, isLiked,
        updateField, handleImageUpdate, handleSubmit, handleDelete
    }

}