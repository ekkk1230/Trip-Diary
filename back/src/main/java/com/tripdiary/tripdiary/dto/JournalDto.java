package com.tripdiary.tripdiary.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.tripdiary.tripdiary.domain.Journal;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

public class JournalDto {

    @Getter
    @NoArgsConstructor
    public static class JournalRequest {
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
            private Integer views;
        }
    }

    @Getter
    @NoArgsConstructor
    public static class UpdateJournalRequest {
        private Long id;
        private String contentId;
        private String logTitle;
        private String placeName;
        @JsonFormat(pattern = "yyyy-MM-dd")
        private LocalDate travelDate;
        private String weather;
        private String mainImage;
        private String description;
        private String sido;
        private String sigungu;
        private List<String> keywords;
        private JournalRequest.StatsDto stats;

        @Getter
        @NoArgsConstructor
        public static class StatsDto {
            private Integer likes;
            private Integer comments;
            private Integer views;
        }
    }

    @Getter
    public static class JournalResponse {
        private String id;
        private String contentId;
        private String logTitle;
        private String location;
        private String placeName;
        @JsonFormat(pattern = "yyyy-MM-dd")
        private String travelDate;
        private String weather;
        private String mainImage;
        private String author;
        private String description;
        private List<String> keywords;
        private StatsDto stats;

        public JournalResponse(Journal journal) {
            this.id = journal.getId() != null ? String.valueOf(journal.getId()) : null;
            this.contentId = journal.getContentId();
            this.logTitle = journal.getLogTitle();
            this.location = journal.getLocation();
            this.placeName = journal.getPlaceName();
            this.travelDate = journal.getTravelDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
            this.weather = journal.getWeather();
            this.mainImage = journal.getMainImage();
            this.keywords = journal.getKeywords();

            this.author = journal.getMember() != null ? journal.getMember().getNickname() : "알 수 없음";

            this.description = journal.getDescription();

            if (journal.getStats() != null) {
                this.stats = new StatsDto(journal.getStats().getLikes(), journal.getStats().getComments(), journal.getStats().getViews());
            } else {
                this.stats = new StatsDto(0, 0, 0);
            }
        }

        @Getter
        public static class StatsDto {
            private Integer likes;
            private Integer comments;
            private Integer views;

            public StatsDto(Integer likes, Integer comments, Integer views) {
                this.likes = likes != null ? likes : 0;
                this.comments = comments != null ? comments : 0;
                this.views = views != null ? views : 0;
            }
        }
    }
}