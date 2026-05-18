package com.tripdiary.tripdiary.dto;

import com.tripdiary.tripdiary.domain.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class MemberDto {

    @Getter
    @NoArgsConstructor
    public static class JoinRequest {
        private String userId;
        private String password;
        private String nickname;
        private String gender;
        private String birth;
        private String profileImg;

        private AgreementsDto agreements;

        @Getter
        @NoArgsConstructor
        public static class AgreementsDto {
            private boolean service;
            private boolean privacy;
            private String agreedAt;
        }
    }

    @Getter
    @NoArgsConstructor
    public static class LoginRequest {
        private String userId;
        private String password;
    }

    @Getter
    public static class JoinResponse {
        private String id;
        private String userId;
        private String nickname;

        public JoinResponse(Member member) {
            this.id = member.getId() != null ? String.valueOf(member.getId()) : null;
            this.userId = member.getUserId();
            this.nickname = member.getNickname();
        }
    }

    @Getter
    public static class LoginResponse {
        private String id;
        private String userId;
        private String nickname;
        private String gender;
        private String birth;
        private String profileImg;

        public LoginResponse(Member member) {
            this.id = member.getId() != null ? String.valueOf(member.getId()) : null;
            this.userId = member.getUserId();
            this.nickname = member.getNickname();
            this.gender = member.getGender();
            this.birth = member.getBirth();
            this.profileImg = member.getProfileImg();
        }
    }

}
