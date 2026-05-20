package com.tripdiary.tripdiary.service;

import com.tripdiary.tripdiary.domain.Agreements;
import com.tripdiary.tripdiary.domain.Member;
import com.tripdiary.tripdiary.dto.MemberDto;
import com.tripdiary.tripdiary.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MemberService {
    private final MemberRepository memberRepository;

    @Transactional
    public MemberDto.JoinResponse joinMember(MemberDto.JoinRequest request, MultipartFile imageFile) {
        String imagePath = null;
        if (imageFile != null && !imageFile.isEmpty()) {
            imagePath = uploadProfileImage(imageFile);
        }

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
                .profileImg(imagePath)
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

    public String uploadProfileImage(MultipartFile imageFile) {
        if (imageFile == null || imageFile.isEmpty()) return null;

        try {
            String basePath = java.nio.file.Paths.get("").toAbsolutePath().toString();
            String uploadDir = basePath.endsWith("back")
                    ? basePath + java.io.File.separator + "uploads" + java.io.File.separator
                    : basePath + java.io.File.separator + "back" + java.io.File.separator + "uploads" + java.io.File.separator;

            java.io.File folder = new java.io.File(uploadDir);
            if (!folder.exists()) folder.mkdirs();

            String savedFilename = java.util.UUID.randomUUID().toString() + "_" + imageFile.getOriginalFilename();
            java.io.File destination = new java.io.File(uploadDir + savedFilename);

            imageFile.transferTo(destination);

            return "/uploads/" + savedFilename;

        } catch (java.io.IOException e) {
            throw new RuntimeException("프로필 이미지 저장 중 오류가 발생했습니다.", e);
        }
    }

    public void updateMemberProfileImage(String userId, String imageUrl) {
        Member member = memberRepository.findByUserId(userId).orElseThrow(() -> new IllegalArgumentException("유저를 찾을 수 없습니다."));

        member.changeProfileImg(imageUrl);

        memberRepository.save(member);
    }
}
