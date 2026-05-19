package com.tripdiary.tripdiary.service;

import com.tripdiary.tripdiary.domain.Journal;
import com.tripdiary.tripdiary.domain.Member;
import com.tripdiary.tripdiary.domain.Stats;
import com.tripdiary.tripdiary.dto.JournalDto;
import com.tripdiary.tripdiary.repository.JournalRepository;
import com.tripdiary.tripdiary.repository.MemberRepository;
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
    private final MemberRepository memberRepository;

    public List<JournalDto.JournalResponse> getAllJournals() {
        List<Journal> journals = journalRepository.findAll();

        return journals.stream().map(JournalDto.JournalResponse::new).collect(Collectors.toList());
    }

    @Transactional
    public JournalDto.JournalResponse createJournal(JournalDto.JournalRequest request) {
        String finalLocation = (request.getSido() + " " + request.getSigungu()).trim();

        Member member = memberRepository.findByNickname(request.getAuthor())
                                        .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 유저입니다."));

        Stats stats = Stats.builder()
                .likes(request.getStats() != null ? request.getStats().getLikes() : 0)
                .comments(request.getStats() != null ? request.getStats().getComments() : 0)
                .build();

        Journal journal = Journal.builder()
            .contentId(request.getContentId())
            .logTitle(request.getLogTitle())
            .location(finalLocation)
            .placeName(request.getPlaceName())
            .travelDate(request.getTravelDate() != null ? java.time.LocalDate.parse(request.getTravelDate()).atStartOfDay() : null)
            .weather(request.getWeather())
            .mainImage(request.getMainImage())
            .member(member)
            .description(request.getDescription())
            .keywords(request.getKeywords())
            .stats(stats)
            .build();

        Journal savedJournal = journalRepository.save(journal);
        return new JournalDto.JournalResponse(savedJournal);
    }

    @Transactional
    public JournalDto.JournalResponse updateJournal(Long id, JournalDto.UpdateJournalRequest request) {
        Journal journal = journalRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 게시글입니다." + request.getId()));

        String finalLocation = (request.getSido() + " " + request.getSigungu()).trim();

        journal.update(
                request.getLogTitle(),
                finalLocation,
                request.getDescription(),
                request.getWeather(),
                request.getMainImage(),
                request.getKeywords(),
                request.getContentId()
        );

        return new JournalDto.JournalResponse(journal);
    }

    @Transactional
    public void deleteJournal(Long id) {
        Journal journal = journalRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("존재하지 않는 게시글입니다." + id));
        journalRepository.delete(journal);
    }
}
