package com.tripdiary.tripdiary.dto;

import com.tripdiary.tripdiary.domain.Plan;
import com.tripdiary.tripdiary.domain.PlanItem;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

public class PlanDto {
    @Getter @NoArgsConstructor
    public static class PlanRequest {
        private String userId;
        private String title;
        private String memo;
        private String startDate;
        private String endDate;
        private List<PlanItemRequest> planItem;
    }

    @Getter @NoArgsConstructor
    public static class PlanItemRequest {
        private String contentid;
        private String title;
        private String addr1;
        private String firstimage;
        private String mapx;
        private String mapy;
        private String contenttypeid;
        private boolean isCustom;
        private int visitOrder;
        private int day;
    }

    @Getter
    public static class PlanResponse {
        private Long id;
        private String userId;
        private String title;
        private String memo;
        private LocalDate startDate;
        private LocalDate endDate;
        private List<PlanItemResponse> planItem;
        private LocalDateTime createdAt;

        public PlanResponse(Plan plan) {
            this.id = plan.getId();
            this.userId = plan.getMember().getUserId();
            this.title = plan.getTitle();
            this.memo = plan.getMemo();
            this.startDate = plan.getStartDate();
            this.endDate = plan.getEndDate();
            this.planItem = plan.getPlanItem().stream().map(PlanItemResponse::new).toList();
            this.createdAt = plan.getCreatedAt();
        }
    }

    @Getter
    public static class PlanItemResponse {
        private Long id;
        private String contentid;
        private String title;
        private String addr1;
        private String firstimage;
        private String mapx;
        private String mapy;
        private String contenttypeid;
        private boolean isCustom;
        private int visitOrder;
        private int day;

        public PlanItemResponse(PlanItem item) {
            this.id = item.getId();
            this.contentid = item.getTrip().getContentid();
            this.title = item.getTrip().getTitle();
            this.addr1 = item.getTrip().getAddr1();
            this.firstimage = item.getTrip().getFirstimage();
            this.mapx = item.getTrip().getMapx();
            this.mapy = item.getTrip().getMapy();
            this.contenttypeid = item.getTrip().getContenttypeid();
            this.isCustom = item.getTrip().isCustom();
            this.visitOrder = item.getVisitOrder();
            this.day = item.getDay();
        }
    }
}
