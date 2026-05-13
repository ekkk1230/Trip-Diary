import * as S from './Auth.styles'
import Logo from "../../assets/Trip_Diary_row.png";
import { useJoin } from '../../hooks/useJoin';

function Join() {
    const { formData, terms, profileImg, inputRefs, 
        handleImageChange, handleChange, 
        handleAllTerms, handleTermClick,
        handleCheckDuplicate, handleJoin } = useJoin();

    return (
        <>
            <S.Logo src={Logo} alt="Trip Diary" />
            <S.AuthTit className="auth_txt">여행의 순간을 기록하고 공유하세요.</S.AuthTit>

            <S.AuthBox className="auth_box">
               <form onSubmit={(e) => e.preventDefault()}>
                    <S.ProfileUploadSection>
                        <p className="auth_label_tit">프로필 사진</p>
                        <label htmlFor="profile-upload" className="profile_label">
                            <div className="img_preview">
                                {profileImg ? (
                                    <img src={profileImg} alt="Preview" />
                                ) : (
                                    <div className="placeholder">+</div>
                                )}
                            </div>
                            <p className="input_info_text">최대 1MB / (jpg, png, webp)</p>
                        </label>
                        <input 
                            id="profile-upload" 
                            type="file" 
                            accept="image/jpeg, image/png, image/webp"
                            onChange={handleImageChange} 
                            style={{ display: 'none' }} 
                        />
                    </S.ProfileUploadSection>

                    <label className="auth_label">
                        <p>닉네임</p>
                        <div className="input_with_btn">
                            <input ref={el => {inputRefs.current.nickname = el}} name="nickname" type="text" placeholder="공백없이 닉네임을 입력하세요. (최대 8자)" onChange={handleChange} maxLength={8} />
                            <button type="button" onClick={() => handleCheckDuplicate('nickname')} className="check_btn">
                                중복 확인
                            </button>
                        </div>
                    </label>
                    <label className="auth_label">
                        <p>아이디</p>
                        <div className="input_with_btn">
                            <input ref={el => {inputRefs.current.userId = el}} name="userId" type="text" placeholder="공백없이 아이디를 입력하세요. (최대 8자)" onChange={handleChange} />
                            <button type="button" onClick={() => handleCheckDuplicate('userId')} className="check_btn">
                                중복 확인
                            </button>
                        </div>
                    </label>
                    <label className="auth_label">
                        <p>비밀번호</p>
                        <input ref={el => {inputRefs.current.password = el}} name="password" type="password" placeholder="공백없이 비밀번호를 입력하세요. (최소 8자)" onChange={handleChange} />
                        <p className="input_info_text">
                            영문, 숫자, 특수문자(!@#$%^&*) 포함 8자 이상
                        </p>
                    </label>
                    <label className="auth_label">
                        <p>비밀번호 확인</p>
                        <input ref={el => {inputRefs.current.passwordConfirm = el}} name="passwordConfirm" type="password" placeholder="공백없이 비밀번호를 다시 입력하세요." onChange={handleChange} />
                    </label>
                    <label className="auth_label">
                        <p>성별</p>
                        <input type="radio" ref={el => {inputRefs.current.gender = el}} name="gender" value="male" checked={formData.gender === 'male'} onChange={handleChange} /> 남
                        <input type="radio" name="gender" value="female" checked={formData.gender === 'female'} onChange={handleChange} /> 여
                    </label>
                    <label className="auth_label">
                        <p>생년월일</p>
                        <input ref={el => {inputRefs.current.birth = el}} name="birth" type="date" className="value" onChange={handleChange} />
                    </label>
                </form>

                <S.TermsSection>
                    <div className="all_check">
                        <input 
                            type="checkbox" 
                            id="all-check" 
                            onChange={handleAllTerms}
                            checked={terms.service && terms.privacy}
                        />
                        <label htmlFor="all-check">약관 전체 동의</label>
                    </div>
                    <hr />
                    <div className="term_item">
                        <input 
                            type="checkbox" 
                            name="service" 
                            ref={el => { inputRefs.current.service = el; }}
                            checked={terms.service} 
                            onChange={handleTermClick} 
                        />
                        <span>(필수) 이용약관 동의</span>
                    </div>
                    <div className="term_item">
                        <input 
                            type="checkbox" 
                            name="privacy" 
                            ref={el => { inputRefs.current.privacy = el; }}
                            checked={terms.privacy} 
                            onChange={handleTermClick} 
                        />
                        <span>(필수) 개인정보 수집 및 이용 동의</span>
                    </div>
                </S.TermsSection>

                <button className="auth_btn" onClick={handleJoin}>회원가입</button>
            </S.AuthBox>
            
            <S.LoginLink to="/login">이미 계정이 있으신가요? 로그인</S.LoginLink>
        </>
    )
}

export default Join