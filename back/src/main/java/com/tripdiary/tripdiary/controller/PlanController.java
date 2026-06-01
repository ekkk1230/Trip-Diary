package com.tripdiary.tripdiary.controller;

import com.tripdiary.tripdiary.dto.PlanDto;
import com.tripdiary.tripdiary.service.PlanService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/plan")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class PlanController {
    private final PlanService planService;

    @PostMapping
    public PlanDto.PlanResponse addPlan(@RequestBody PlanDto.PlanRequest request) {
        return planService.addPlan(request);
    }
}
