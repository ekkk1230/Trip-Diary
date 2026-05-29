package com.tripdiary.tripdiary.controller;

import com.tripdiary.tripdiary.service.PlanService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class PlanController {
    private final PlanService planService;
}
