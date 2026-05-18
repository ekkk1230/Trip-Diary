package com.tripdiary.tripdiary.dto;

import com.tripdiary.tripdiary.domain.Journal;
import com.tripdiary.tripdiary.domain.Stats;
import lombok.Getter;

import java.util.List;

@Getter
public class JournalResponse {
    private Long id;
    private String contentId;
    private String logTitle;
    private String location;
    private String placeName;
    private String travelDate;
    private String weather;
    private String mainImage;
    private String author;
    private String description;
    private List<String> keywords;
    private StatsDto stats;

    public JournalResponse(Journal journal) {
        this.id = journal.getId();
        this.contentId = journal.getContentId();
        this.logTitle = journal.getLogTitle();
        this.location = journal.getLocation();
        this.placeName = journal.getPlaceName();
        this.travelDate = journal.getTravelDate() != null ? journal.getTravelDate().toString() : null;
        this.weather = journal.getWeather();
        this.mainImage = journal.getMainImage();
        this.keywords = journal.getKeywords();
        this.author = journal.getMember().getNickname();
        if (journal.getStats() != null) {
            this.stats = new StatsDto(journal.getStats().getLikes(), journal.getStats().getComments());
        }
    }

    @Getter
    public static class StatsDto {
        private Integer likes;
        private Integer comments;

        public StatsDto(Integer likes, Integer comments) {
            this.likes = likes != null ? likes : 0;
            this.comments = comments != null ? comments : 0;
        }
    }


}
