package com.tripdiary.tripdiary.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter @Builder
@NoArgsConstructor
@AllArgsConstructor
public class Likes {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    // 여러 좋아요가 한 게시글에 달림
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "journal_id")
    private Journal journal;

    // 여러 좋아요가 한 유저에 의해 생성됨
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    private LocalDateTime created_at;
}
