package com.tripdiary.tripdiary.dto;

import com.tripdiary.tripdiary.domain.Comment;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class CommentDto {
    @Getter
    @NoArgsConstructor
    public static class CommentRequest {
        private String user;
        private Long journalId;
        private String text;
    }

    @Getter
    @NoArgsConstructor
    public static class UpdateCommentRequest {
        private String id;
        private String text;
    }

    @Getter
    public static class CommentResponse {
        private String id;
        private String user;
        private Long journalId;
        private LocalDateTime date;
        private String text;

        public CommentResponse(Comment comment) {
            this.id = comment.getId() != null ? String.valueOf(comment.getId()) : null;
            this.user = comment.getMember().getNickname();
            this.journalId = comment.getJournal().getId();
            this.date = comment.getDate();
            this.text = comment.getText();
        }
    }
}
