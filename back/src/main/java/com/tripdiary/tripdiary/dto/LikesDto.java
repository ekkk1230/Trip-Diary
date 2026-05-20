package com.tripdiary.tripdiary.dto;

import com.tripdiary.tripdiary.domain.Journal;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class LikesDto {
    @Getter
    @NoArgsConstructor
    public static class LikesRequest {
        private String journalId;
        private String memberId;
    }
}
