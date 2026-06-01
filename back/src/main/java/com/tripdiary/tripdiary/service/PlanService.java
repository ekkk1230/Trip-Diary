package com.tripdiary.tripdiary.service;

import com.tripdiary.tripdiary.domain.Member;
import com.tripdiary.tripdiary.domain.Plan;
import com.tripdiary.tripdiary.domain.PlanItem;
import com.tripdiary.tripdiary.domain.Trip;
import com.tripdiary.tripdiary.dto.PlanDto;
import com.tripdiary.tripdiary.repository.MemberRepository;
import com.tripdiary.tripdiary.repository.PlanRepository;
import com.tripdiary.tripdiary.repository.TripRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.text.DateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
@Transactional(readOnly = true)
public class PlanService {
    private final PlanRepository planRepository;
    private final MemberRepository memberRepository;
    private final TripRepository tripRepository;

    @Transactional
    public PlanDto.PlanResponse addPlan(PlanDto.PlanRequest request) {
        Member member = memberRepository.findByUserId(request.getUserId()).orElseThrow(() -> new IllegalArgumentException("존재하지 않는 회원정보 입니다." + request.getUserId()));

        Plan plan = Plan.builder()
                .member(member)
                .title(request.getTitle())
                .startDate(LocalDate.parse(request.getStartDate()))
                .endDate(LocalDate.parse(request.getEndDate()))
                .memo(request.getMemo())
                .createdAt(LocalDateTime.now())
                .build();

        List<PlanItem> items = request.getPlanItem().stream().map(dto -> {
            Trip trip = tripRepository.findByContentid(dto.getContentid())
                .orElseGet(() -> {
                    Trip newTrip = Trip.builder()
                            .contentid(dto.getContentid())
                            .title(dto.getTitle())
                            .addr1(dto.getAddr1())
                            .firstimage(dto.getFirstimage())
                            .mapx(dto.getMapx())
                            .mapy(dto.getMapy())
                            .build();
                    return tripRepository.save(newTrip);
                });

            return PlanItem.builder()
                    .plan(plan)
                    .trip(trip)
                    .visitOrder(dto.getVisitOrder())
                    .day(dto.getDay())
                    .build();
        }).toList();

        plan.getPlanItem().addAll(items);
        planRepository.save(plan);

        return new PlanDto.PlanResponse(plan);
    }
}
