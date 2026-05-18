package com.tripdiary.tripdiary.service;

import com.tripdiary.tripdiary.domain.Journal;
import com.tripdiary.tripdiary.dto.JournalResponse;
import com.tripdiary.tripdiary.repository.JournalRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class JournalService {
    private final JournalRepository journalRepository;

    public List<JournalResponse> getAllJournals() {
        List<Journal> journals = journalRepository.findAll();

        return journals.stream().map(JournalResponse::new).collect(Collectors.toList());
    }

    public JournalResponse createJournal() {
        Journal journal = 
    }
}
