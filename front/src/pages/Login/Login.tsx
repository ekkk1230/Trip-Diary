import React from 'react'

function Login() {
    return (
        <>
            <p className="login_txt">여행의 순간을 기록하고 공유하세요.</p>

            <div className="login_box">
                <p className="login_tit">로그인</p>

                <form action="">
                    <label htmlFor="" className="login_label">
                        <p>아이디</p>
                        <input type="text" placeholder="아이디를 입력하세요." />
                    </label>
                    <label htmlFor="" className="login_label">
                        <p>비밀번호</p>
                        <input type="password" placeholder="비밀번호를 입력하세요." />
                    </label>
                </form>

                <a href="#">비밀번호를 잊으셨나요?</a>

                <button>로그인</button>
            </div>
            
            <p>아직 계정이 없으신가요? <a href="#">회원가입</a></p>
        </>
    )
}

export default Login