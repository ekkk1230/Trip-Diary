package com.tripdiary.tripdiary.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Builder
@NoArgsConstructor
@AllArgsConstructor
public class Journal {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String contentId;
    private String logTitle;
    private String location;
    private String placeName;
    private LocalDateTime travelDate;
    private String weather;

    @Column(length = 500)
    private String mainImage;

    @Column(columnDefinition = "TEXT")
    private String description;

    @ElementCollection
    @CollectionTable(name = "journal_keywords", joinColumns = @JoinColumn(name = "journal_id"))
    @Column(name = "keyword")
    private List<String> keywords = new ArrayList<>();

    // 1:N 양방향 관계 설정
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "travle_plan_id")
    private TravelPlan travelPlan;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Embedded
    private Stats stats;
}
