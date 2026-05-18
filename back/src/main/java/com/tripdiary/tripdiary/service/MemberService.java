package com.tripdiary.tripdiary.service;

import com.tripdiary.tripdiary.domain.Agreements;
import com.tripdiary.tripdiary.domain.Member;
import com.tripdiary.tripdiary.dto.MemberDto;
import com.tripdiary.tripdiary.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MemberService {
    private final MemberRepository memberRepository;

    @Transactional
    public MemberDto.JoinResponse joinMember(MemberDto.JoinRequest request) {
        Agreements agreementsEntity = Agreements.builder()
                .service(request.getAgreements().isService())
                .privacy(request.getAgreements().isPrivacy())
                .agreedAt(request.getAgreements().getAgreedAt() != null ? java.time.LocalDate.parse(request.getAgreements().getAgreedAt()).atStartOfDay() : null)
                .build();

        Member newMember = Member.builder()
            .userId(request.getUserId())
            .password(request.getPassword())
            .nickname(request.getNickname())
            .gender(request.getGender())
            .birth(request.getBirth())
            .profileImg(request.getProfileImg())
            .agreements(agreementsEntity)
            .build();

        Member savedMember = memberRepository.save(newMember);

        return new MemberDto.JoinResponse(savedMember);
    }

    public MemberDto.LoginResponse loginMember(MemberDto.LoginRequest request) {
        Member member = memberRepository.findByUserId(request.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("아이디 또는 비밀번호가 잘못되었습니다."));

        if (!member.getPassword().equals(request.getPassword())) {
            throw new IllegalArgumentException("아이디 또는 비밀번호가 잘못되었습니다.");
        }

        return new MemberDto.LoginResponse(member);
    }
}
