package com.tripdiary.tripdiary.controller;

import com.tripdiary.tripdiary.dto.JournalDto;
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
    public List<JournalDto.JournalResponse> getAllJournals() {
        return journalService.getAllJournals();
    }

    @PostMapping
    public JournalDto.JournalResponse createJournal(@RequestBody JournalDto.JournalRequest request) {
        return journalService.createJournal(request);
    }
}
