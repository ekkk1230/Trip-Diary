import React from 'react'

function Join() {
    return (
        <>
            <S.Logo src={Logo} alt="Trip Diary" />
            <S.AuthTit className="auth_txt">여행의 순간을 기록하고 공유하세요.</S.AuthTit>

            <S.AuthBox className="auth_box">
                <p className="auth_tit">로그인</p>

                <form action="">
                    <label htmlFor="" className="auth_label">
                        <p>이름</p>
                        <input type="text" placeholder="이름을 입력하세요." />
                    </label>
                    <label htmlFor="" className="auth_label">
                        <p>아이디</p>
                        <input type="text" placeholder="아이디를 입력하세요." />
                    </label>
                    <label htmlFor="" className="auth_label">
                        <p>비밀번호</p>
                        <input type="password" placeholder="비밀번호를 입력하세요." />
                    </label>
                    <label htmlFor="" className="auth_label">
                        <p>비밀번호 확인</p>
                        <input type="password" placeholder="비밀번호를 다시 입력하세요." />
                    </label>
                </form>

                <S.AuthLink><a href="#">비밀번호를 잊으셨나요?</a></S.AuthLink>

                <button className="auth_btn">회원가입</button>
            </S.AuthBox>
            
            <S.AuthLink>이미 계정이 있으신가요? <a href="#">로그인</a></S.AuthLink>
        </>
    )
}

export default Join