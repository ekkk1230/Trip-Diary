package com.tripdiary.tripdiary.controller;

import com.tripdiary.tripdiary.dto.JournalCreateRequest;
import com.tripdiary.tripdiary.dto.JournalResponse;
import com.tripdiary.tripdiary.service.JournalService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/journals")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class JournalController {
    private final JournalService journalService;

    @GetMapping
    public List<JournalResponse> getAllJournals() {
        return journalService.getAllJournals();
    }

    @PostMapping
    public JournalResponse createJournal(@RequestBody JournalCreateRequest request) {
        return journalService.createJournal(request);
    }
}
