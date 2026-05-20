package com.tripdiary.tripdiary.controller;

import com.tripdiary.tripdiary.dto.MemberDto;
import com.tripdiary.tripdiary.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class MemberController {
    private final MemberService memberService;

    @PostMapping
    public ResponseEntity<?> joinMember(
            @RequestPart("user") MemberDto.JoinRequest request,
            @RequestPart(value = "file", required = false) MultipartFile file) {
        MemberDto.JoinResponse response = memberService.joinMember(request, file);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public MemberDto.LoginResponse loginMember(@RequestBody MemberDto.LoginRequest request) {
        return memberService.loginMember(request);
    }

    @PostMapping("/{userId}/profile-image")
    public ResponseEntity<?> uploadProfileImage(
            @PathVariable String userId,
            @RequestParam("file") MultipartFile file ) {
        String imageUrl = memberService.uploadProfileImage(file);
        memberService.updateMemberProfileImage(userId, imageUrl);
        return ResponseEntity.ok(Map.of("imageUrl", imageUrl));
    }
}
