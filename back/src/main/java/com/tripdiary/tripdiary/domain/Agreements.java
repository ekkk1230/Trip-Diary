package com.tripdiary.tripdiary.domain;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Embeddable
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class Agreements {
    private boolean service;
    private boolean privacy;
    private LocalDateTime agreedAt;
}
