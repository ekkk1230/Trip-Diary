package com.tripdiary.tripdiary.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class JournalCreateRequest {
    private String contentId;
    private String logTitle;
    private String location;
    private String placeName;
    private String travelDate;
    private String weather;
    private String mainImage;
    private String author;
    private String description;
    private String sido;
    private String sigungu;
    private List<String> keywords;
    private StatsDto stats;

    @Getter
    @NoArgsConstructor
    public static class StatsDto {
        private Integer likes;
        private Integer comments;
    }
}
