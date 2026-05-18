package com.tripdiary.tripdiary.domain;

import jakarta.persistence.Embeddable;
import lombok.*;

import java.time.LocalDateTime;

@Embeddable
@Getter @Setter @Builder
@NoArgsConstructor
@AllArgsConstructor
public class Agreements {
    private boolean service;
    private boolean privacy;
    private LocalDateTime agreedAt;
}
