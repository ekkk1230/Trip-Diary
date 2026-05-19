package com.tripdiary.tripdiary.controller;

import com.tripdiary.tripdiary.dto.JournalDto;
import com.tripdiary.tripdiary.service.JournalService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
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

    @PutMapping("/{id}")
    public JournalDto.JournalResponse updateJournal(
            @PathVariable(name = "id") Long id,
            @RequestBody JournalDto.UpdateJournalRequest request) {
        return journalService.updateJournal(id, request);
    }

    @DeleteMapping("/{id}")
    public void deleteJournal(@PathVariable(name = "id") Long id) {
        journalService.deleteJournal(id);
    }

    @PostMapping("/{id}/view")
    public ResponseEntity<Void> increaseViewCount(@PathVariable(name = "id") Long id) {
        journalService.increaseViewCount(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{id}/like")
    public ResponseEntity<Void> increaseLikeCount(@PathVariable(name = "id") Long id) {
        journalService.toggleLike(id);
        return ResponseEntity.ok().build();
    }
}
