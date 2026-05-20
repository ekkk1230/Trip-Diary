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

    @Column(columnDefinition = "TEXT")
    private String mainImage;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Builder.Default
    @ElementCollection
    @CollectionTable(name = "journal_keywords", joinColumns = @JoinColumn(name = "journal_id"))
    @Column(name = "keyword")
    private List<String> keywords = new ArrayList<>();

    // 1:N 양방향 관계 설정
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "travel_plan_id")
    private TravelPlan travelPlan;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Embedded
    private Stats stats;

    public void update(
            String logTitle, String location,
            String description, String weather,
            String mainImage, List<String> keywords,
            String placeName, LocalDateTime travelDate) {
        this.logTitle = logTitle;
        this.location = location;
        this.description = description;
        this.weather = weather;
        this.mainImage = mainImage;
        this.keywords = keywords;
        this.placeName = placeName;
        this.travelDate = travelDate;
    }

    public void increaseViewCount() {
        if (this.stats == null) {
            this.stats = new Stats(0, 0, 0);
        }
        Integer currentViews = this.stats.getViews();
        this.stats.setViews(currentViews == null ? 1 : currentViews + 1);
    }

    public void increaseLikeCount() {
        if (this.stats == null) {
            this.stats = new Stats(0, 0, 0);
        }
        Integer currentLikes = this.stats.getLikes();
        this.stats.setLikes(currentLikes == null ? 1 : currentLikes + 1);
    }

    public void decreaseLikeCount() {
        if (this.stats == null) {
            this.stats = new Stats(0, 0, 0);
        }
        Integer currentLikes = this.stats.getLikes();
        int count = (currentLikes == null) ? 0 : currentLikes;
        if (count > 0) {
            this.stats.setLikes(count - 1);
        }
    }
}
