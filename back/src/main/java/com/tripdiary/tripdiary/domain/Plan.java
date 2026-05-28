package com.tripdiary.tripdiary.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Builder
@NoArgsConstructor
@AllArgsConstructor
public class Plan {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;
    private String title;
    private LocalDate startDate;
    private LocalDate endDate;
    private String memo;
    @Builder.Default
    @OneToMany(mappedBy = "plan", cascade = Cascade.ALL, orphanRemoval = true)
    private List<Trip> planItems = new ArrayList<>();
    private LocalDateTime createdAt; 
}
