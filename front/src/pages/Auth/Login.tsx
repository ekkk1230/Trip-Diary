import * as S from './Auth.styles'
import Logo from "../../assets/Trip_Diary.png"

function Login() {
    return (
        <>
            <S.Logo src={Logo} alt="Trip Diary" />
            <S.AuthTit className="auth_txt">여행의 순간을 기록하고 공유하세요.</S.AuthTit>

            <S.AuthBox className="auth_box">
                <p className="auth_tit">로그인</p>

                <form action="">
                    <label htmlFor="" className="auth_label">
                        <p>아이디</p>
                        <input type="text" placeholder="아이디를 입력하세요." />
                    </label>
                    <label htmlFor="" className="auth_label">
                        <p>비밀번호</p>
                        <input type="password" placeholder="비밀번호를 입력하세요." />
                    </label>
                </form>

                <S.AuthLink><a href="#">비밀번호를 잊으셨나요?</a></S.AuthLink>

                <button className="auth_btn">로그인</button>
            </S.AuthBox>
            
            <S.AuthLink>아직 계정이 없으신가요? <a href="#">회원가입</a></S.AuthLink>
        </>
    )
}

export default Login