import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useMapStore } from "../store/useMapStore";
import { useUiStore } from "../store/useUiStore";
import { useUserStore } from "../store/useUserStore"
import TextModal from "../components/modal/modalContentLayout/TextModal";
import { SIDO_NAME_TO_CODE } from "../constants/region";
const { kakao } = window as any;

export const useAppPlace = (detail?: any) => {
    const { user } = useUserStore();
    const { openModal, closeModal } = useUiStore();
    const { addCustomPlaces, updateCustomPlace } = useMapStore();

    const [ isSearching, setIsSearching ] = useState(false);
    const [ formData, setFormData ] = useState({
        placeNm: '', category: '',
        zipCode: '', address: '', address2: '',
        placeInfo: '',
        mapx: '', mapy: ''
    });
    const [ previewURL, setPreviewURL ] = useState<string | null>(null);
    const [ selectedFile, setSelectedFile ] = useState<File | null>(null);

    useEffect(() => {
        if (!user) {
            openModal("check", "이용 오류", <TextModal txt={"로그인 후 이용해주세요."} />);
        }
    }, [user, openModal]);

    useEffect(() => {
        if (detail) {
            setPreviewURL(detail.firstimage);
            setFormData(prev => ({
                ...prev,
                placeNm: detail.title,
                category: detail.contenttypeid,
                zipCode: detail.zipcode,
                address: detail.addr1,
                address2: detail.addr2,
                placeInfo: detail.overview
            }))
        }
    }, [detail]);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleComplete = (data: any) => {
        const fullAddress = data.address;

        const geocoder = new kakao.maps.services.Geocoder();

        geocoder.addressSearch(fullAddress, (result: any, status: any) =>  {
            if (status === kakao.maps.services.Status.OK) {
                setFormData(prev => ({
                    ...prev,
                    address: fullAddress,
                    zipCode: data.zonecode,
                    mapx: result[0].x,
                    mapy: result[0].y
                }));
                console.log("좌표 저장 완료:", result[0].x, result[0].y);
            }
        })
        setIsSearching(false);
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            const url = URL.createObjectURL(file);
            setPreviewURL(url);
        };
    };

    const handleImageRemove = () => {
        setSelectedFile(null);
        setPreviewURL(null);
    }

    const handleSubmit = (e?: FormEvent) => {
        if (e) e.preventDefault();

        if (!formData.placeNm || !formData.address) {
            openModal(
                "check",
                "입력 오류",
                <TextModal txt={"장소명과 주소를 입력해주세요."} />
            );
            return;
        }

        const sidoName = formData.address.substring(0, 2);
        const areaCode = SIDO_NAME_TO_CODE[sidoName];

        const place = {
            addr1: formData.address,
            addr2: formData.address2,
            areacode: areaCode,
            contentid: detail ? detail.contentid : `custom_${crypto.randomUUID()}`,
            contenttypeid: formData.category,
            firstimage: previewURL || `${import.meta.env.BASE_URL}default-image.png`, 
            overview: formData.placeInfo,
            title: formData.placeNm,
            zipcode: formData.zipCode,
            mapx: formData.mapx,
            mapy: formData.mapy,
            isCustom: true,
            author: user?.nickname
        };

        if (detail) updateCustomPlace(place);
        else addCustomPlaces(place);

        closeModal();
    }

    return {
        isSearching, setIsSearching, formData, previewURL,
        handleChange, handleComplete, handleFileChange, handleImageRemove, handleSubmit
    }
}