package com.tripdiary.tripdiary.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
public class TravelPlan {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private String areaCode;

    @OneToMany(mappedBy = "travelPlan", cascade = CascadeType.ALL)
    private List<Journal> journalList = new ArrayList<>();

}
