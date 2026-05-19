package com.tripdiary.tripdiary.domain;

import jakarta.persistence.Embeddable;
import lombok.*;

@Embeddable
@Getter @Setter @Builder
@NoArgsConstructor
@AllArgsConstructor
public class Stats {
    private Integer likes;
    private Integer comments;
    private Integer views;
}
