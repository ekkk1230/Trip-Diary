package com.tripdiary.tripdiary.dto;

import lombok.Getter;

public class FavoriteDto {
    @Getter
    public static class FavoriteRequest {
        private String userId;
        private TripDto.TripRequest trip;
    }
}
