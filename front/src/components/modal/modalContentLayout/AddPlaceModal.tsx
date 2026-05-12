import { useState, type ChangeEvent } from 'react';
import DaumPostcodeEmbed from 'react-daum-postcode';
import * as S from "../Modal.styles";
import { categoryMap, useMapStore } from '../../../store/useMapStore';
import ModalFooter from '../ModalFooter';
import { IoIosCloseCircle } from "react-icons/io";


const AddPlaceModal = () => {
    const { addCustomPlaces } = useMapStore();

    const [isSearching, setIsSearching] = useState(false);
    const [formData, setFormData] = useState({
        placeNm: '', category: '',
        zipCode: '', address: '',
        placeInfo: ''
    });
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleComplete = (data: any) => {
        setFormData(prev => ({
            ...prev,
            address: data.address,
            zipCode: data.zonecode
        }))
        setIsSearching(false);
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            setSelectedFile(file);
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        }
    }

    const handleImageRemove = () => {
        setSelectedFile(null);
        setPreviewUrl(null);
    }

    const onSave = (formData: any) => {
        const place = {
            addr1: formData.address,
            contentid: `custom_${crypto.randomUUID()}`,
            contenttypeid: formData.category,
            firstimage: previewUrl || '',
            overview: formData.placeInfo,
            title: formData.placeNm,
            zipcode: formData.zipCode,
            isCustom: true,
        }
        addCustomPlaces(place);
    };

    return (
        <S.FormWrapper onSubmit={onSave}>
            {isSearching ? (
                /* 주소 검색 화면 */
                <S.AddressSearchWrapper>
                    <button type="button" onClick={() => setIsSearching(false)}>뒤로가기</button>
                    <div className="daum_postcode_container">
                        <DaumPostcodeEmbed onComplete={handleComplete} style={{ height: '400px' }} />
                    </div>
                </S.AddressSearchWrapper>
            ) : (
                /* 입력 폼 화면 */
                <>
                    <S.PhotoSection>
                        {previewUrl ? (
                            <div className='upload_box'>
                                <img src={previewUrl} alt="" />
                                <button onClick={handleImageRemove} className='image_clear'><IoIosCloseCircle/></button>
                            </div>
                        ) : (
                            <div className="upload_box">
                                <label>
                                    <span className="icon">📸</span>
                                    <p className="label">사진을 등록해주세요.</p>
                                    <input type="file" onChange={handleFileChange} className='hidden_input' />
                                </label>
                            </div>
                        )}
                    </S.PhotoSection>

                    <S.InputSection>
                        {/* 장소명 */}
                        <div className="input_row">
                            <label>장소명</label>
                            <input type="text" name="placeNm" value={formData.placeNm} onChange={handleChange} placeholder="예: 개고생 카페" />
                        </div>

                        {/* 카테고리*/}
                        <div className="input_row">
                            <label>카테고리</label>
                            <div className="category_group">
                                <select name="category" value={formData.category} onChange={handleChange}>
                                    <option hidden value="">카테고리를 선택해주세요</option>
                                    {Object.entries(categoryMap).map(([name, id]) => (
                                        <option key={id} value={id}>{name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* 주소 정보 (우편번호 & 주소) */}
                        <div className="input_row">
                            <label>주소 정보</label>
                            <S.AddressRow>
                                <div className="zip_code_group">
                                    <input 
                                        type="text" 
                                        value={formData.zipCode} 
                                        name="zipCode"
                                        readOnly 
                                        placeholder="우편번호" 
                                        onChange={handleChange}
                                    />
                                    <button 
                                        type="button" 
                                        className="addr_btn" 
                                        onClick={() => setIsSearching(true)}
                                    >
                                        주소 검색
                                    </button>
                                </div>
                                <div className="main_address_group">
                                    <input 
                                        type="text" 
                                        value={formData.address} 
                                        name="address"
                                        readOnly 
                                        placeholder="주소 검색을 완료해주세요." 
                                        onChange={handleChange}
                                    />
                                </div>
                            </S.AddressRow>
                        </div>

                        {/* 소개글 */}
                        <div className="input_row">
                            <label>소개글</label>
                            <textarea name="placeInfo" value={formData.placeInfo} onChange={handleChange} placeholder="장소에 대한 설명을 입력하세요." rows={3}></textarea>
                        </div>
                    </S.InputSection>

                    {/* 액션 버튼 */}
                    <ModalFooter onConfirm={() => onSave(formData)} />
                </>
            )}
        </S.FormWrapper>
    );
};

export default AddPlaceModal;