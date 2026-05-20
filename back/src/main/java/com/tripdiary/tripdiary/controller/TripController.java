package com.tripdiary.tripdiary.controller;

import com.tripdiary.tripdiary.dto.TripDto;
import com.tripdiary.tripdiary.service.TripService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trip")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class TripController {
    private final TripService tripService;

    @GetMapping
    public List<TripDto.TripResponse> getTripData() {
        return tripService.getTripData();
    }

    @PostMapping
    public TripDto.TripResponse crateTripData(@RequestBody TripDto.TripRequest request) {
        return tripService.createTripData(request);
    }

    @PutMapping("/{id}")
    public TripDto.TripResponse updateTripData(@RequestBody TripDto.TripRequest request) {
        return tripService.updateTripData(request);
    }

    @DeleteMapping("/{contentid}")
    public void deleteTripData(@PathVariable(name = "contentid") String contentid) {
        tripService.deleteTripData(contentid);
    }
}
