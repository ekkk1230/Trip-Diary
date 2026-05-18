package com.tripdiary.tripdiary.controller;

import com.tripdiary.tripdiary.dto.MemberDto;
import com.tripdiary.tripdiary.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class MemberController {
    private final MemberService memberService;

    @PostMapping
    public MemberDto.JoinResponse joinMember(@RequestBody MemberDto.JoinRequest request) {
        return memberService.joinMember(request);
    }

    @PostMapping("/login")
    public MemberDto.LoginResponse loginMember(@RequestBody MemberDto.LoginRequest request) {
        return memberService.loginMember(request);
    }
}
