import { useState } from "react";
import * as S from "./Auth.styles";

function FindUser() {
    const [activeTab, setActiveTab] = useState<"id" | "password">("id");

    return (
        <S.FindUserContainer>
            <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>계정 찾기</h2>

            {/* 탭 전환 스위치 */}
            <S.TabWrapper>
                <S.TabButton 
                $isActive={activeTab === "id"} 
                onClick={() => setActiveTab("id")}
                >
                아이디 찾기
                </S.TabButton>
                <S.TabButton 
                $isActive={activeTab === "password"} 
                onClick={() => setActiveTab("password")}
                >
                비밀번호 찾기
                </S.TabButton>
            </S.TabWrapper>

            {/* 탭 내용 */}
            <S.FormBox>
                {activeTab === "id" ? (
                // 아이디 찾기 폼
                <>
                    <S.InputGroup>
                    <p>이름</p>
                    <input type="text" placeholder="가입하신 이름을 입력하세요" />
                    </S.InputGroup>
                    <S.InputGroup>
                    <p>생년월일</p>
                    <input type="date" />
                    </S.InputGroup>
                    <S.ActionButton>아이디 찾기</S.ActionButton>
                </>
                ) : (
                // 비밀번호 찾기 폼
                <>
                    <S.InputGroup>
                    <p>아이디</p>
                    <input type="text" placeholder="아이디를 입력하세요" />
                    </S.InputGroup>
                    <S.InputGroup>
                    <p>이메일</p>
                    <input type="email" placeholder="가입 시 등록한 이메일을 입력하세요" />
                    </S.InputGroup>
                    <S.ActionButton>임시 비밀번호 발송</S.ActionButton>
                </>
                )}
            </S.FormBox>
        </S.FindUserContainer>
    );
}

export default FindUser