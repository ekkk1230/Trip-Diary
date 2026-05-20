package com.tripdiary.tripdiary.dto;

import com.tripdiary.tripdiary.domain.Member;
import com.tripdiary.tripdiary.domain.Trip;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class TripDto {
    @Getter
    @NoArgsConstructor
    public static class TripRequest {
        private String addr1;
        private String addr2;
        private String areacode;
        private String contentid;
        private String contenttypeid;
        private String firstimage;
        private String overview;
        private String title;
        private String zipcode;
        private String mapx;
        private String mapy;
        private boolean isCustom;
        private String author;
    }

    @Getter
    public static class TripResponse {
        private String id;
        private String title;
        private String contentid;
        private String contenttypeid;
        private String addr1;
        private String addr2;
        private String firstimage;
        private String zipcode;
        private String mapx;
        private String mapy;
        private String overview;
        private boolean isCustom;
        private String author;
        private String areacode;

        public TripResponse(Trip trip) {
            this.id = trip.getId() != null ? String.valueOf(trip.getId()) : null;
            this.title = trip.getTitle();
            this.contentid = trip.getContentid();
            this.contenttypeid = trip.getContenttypeid();
            this.addr1 = trip.getAddr1();
            this.addr2 = trip.getAddr2();
            this.firstimage = (trip.getFirstimage() == null || trip.getFirstimage().isEmpty() ? "" : trip.getFirstimage());
            this.zipcode = trip.getZipcode();
            this.mapx = trip.getMapx();
            this.mapy = trip.getMapy();
            this.overview = trip.getOverview();
            this.isCustom = trip.isCustom();
            this.author = trip.getAuthor().getNickname();
            this.areacode = trip.getAreacode();
        }
    }
}
