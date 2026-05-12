import React, { useState } from 'react';
import DaumPostcodeEmbed from 'react-daum-postcode';
import { useUiStore } from '../../../store/useUiStore';
import * as S from "../Modal.styles";
import { categoryMap } from '../../../store/useMapStore';


const AddPlaceModal = () => {
    const { closeModal } = useUiStore();

    // 주소 및 우편번호
    const [isSearching, setIsSearching] = useState(false);
    const [address, setAddress] = useState("");
    const [zipCode, setZipCode] = useState("");

    // 주소 선택 완료
    const handleComplete = (data: any) => {
        setAddress(data.address);
        setZipCode(data.zonecode); 
        setIsSearching(false);
    };

    const onSave = (e: React.FormEvent) => {
        e.preventDefault();
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
                        <div className="upload_box">
                            <span className="icon">📸</span>
                            <p className="label">사진 등록 기능을 만들어보세요</p>
                        </div>
                    </S.PhotoSection>

                    <S.InputSection>
                        {/* 장소명 */}
                        <div className="input_row">
                            <label>장소명</label>
                            <input type="text" placeholder="예: 개고생 카페" />
                        </div>

                        {/* 카테고리*/}
                        <div className="input_row">
                            <label>카테고리</label>
                            <div className="category_group">
                                <select name="category" id="">
                                    <option hidden value="">카테고리를 선택해주세요</option>
                                    {Object.entries(categoryMap).map(([name, id]) => (
                                        <option key={id} value="id">{name}</option>
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
                                        value={zipCode} 
                                        readOnly 
                                        placeholder="우편번호" 
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
                                        value={address} 
                                        readOnly 
                                        placeholder="주소 검색을 완료해주세요" 
                                    />
                                </div>
                            </S.AddressRow>
                        </div>

                        {/* 소개글 */}
                        <div className="input_row">
                            <label>소개글</label>
                            <textarea placeholder="장소에 대한 설명을 입력하세요" rows={3} />
                        </div>
                    </S.InputSection>

                    {/* 액션 버튼 */}
                    <S.ActionSection>
                        <button type="button" className="cancel_btn" onClick={closeModal}>취소</button>
                        <button type="submit" className="submit_btn">저장하기</button>
                    </S.ActionSection>
                </>
            )}
        </S.FormWrapper>
    );
};

export default AddPlaceModal;