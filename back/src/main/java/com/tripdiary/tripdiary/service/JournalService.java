package com.tripdiary.tripdiary.service;

import com.tripdiary.tripdiary.domain.*;
import com.tripdiary.tripdiary.dto.JournalDto;
import com.tripdiary.tripdiary.dto.LikesDto;
import com.tripdiary.tripdiary.repository.CommentRepository;
import com.tripdiary.tripdiary.repository.JournalRepository;
import com.tripdiary.tripdiary.repository.LikesRepository;
import com.tripdiary.tripdiary.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class JournalService {
    private final JournalRepository journalRepository;
    private final MemberRepository memberRepository;
    private final CommentRepository commentRepository;
    private final LikesRepository likesRepository;

    public List<JournalDto.JournalResponse> getAllJournals() {
        List<Journal> journals = journalRepository.findAll();

        return journals.stream().map(JournalDto.JournalResponse::new).collect(Collectors.toList());
    }

    @Transactional
    public JournalDto.JournalResponse createJournal(JournalDto.JournalRequest request, MultipartFile imageFile) {
        String finalLocation = (request.getSido() + " " + request.getSigungu()).trim();

        Member member = memberRepository.findByNickname(request.getAuthor())
                                        .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 유저입니다."));

        String imagePath = null;
        if (imageFile != null && !imageFile.isEmpty()) {
            try {
                String basePath = java.nio.file.Paths.get("").toAbsolutePath().toString();
                String uploadDir;

                if (basePath.endsWith("back")) {
                    uploadDir = basePath + java.io.File.separator + "uploads" + java.io.File.separator;
                } else {
                    uploadDir = basePath + java.io.File.separator + "back" + java.io.File.separator + "uploads" + java.io.File.separator;
                }

                java.io.File folder = new java.io.File(uploadDir);
                if (!folder.exists()) {
                    folder.mkdirs();
                }

                String originalFilename = imageFile.getOriginalFilename();
                String savedFilename = java.util.UUID.randomUUID().toString() + "_" + originalFilename;

                java.io.File destination = new java.io.File(uploadDir + savedFilename);
                imageFile.transferTo(destination);

                imagePath = "/uploads/" + savedFilename;

            } catch (java.io.IOException e) {
                throw new RuntimeException("이미지 저장 중 오류가 발생했습니다.", e);
            }
        }

        Stats stats = Stats.builder()
                .likes(request.getStats() != null ? request.getStats().getLikes() : 0)
                .comments(request.getStats() != null ? request.getStats().getComments() : 0)
                .views(request.getStats() != null ? request.getStats().getViews() : 0)
                .build();

        Journal journal = Journal.builder()
            .contentId(request.getContentId())
            .logTitle(request.getLogTitle())
            .location(finalLocation)
            .placeName(request.getPlaceName())
            .travelDate(request.getTravelDate() != null ? java.time.LocalDate.parse(request.getTravelDate()).atStartOfDay() : null)
            .weather(request.getWeather())
            .mainImage(imagePath)
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

        LocalDateTime updatedDate = request.getTravelDate() != null ? request.getTravelDate().atStartOfDay() : null;

        journal.update(
                request.getLogTitle(),
                finalLocation,
                request.getDescription(),
                request.getWeather(),
                request.getMainImage(),
                request.getKeywords(),
                request.getContentId(),
                updatedDate
        );

        return new JournalDto.JournalResponse(journal);
    }

    @Transactional
    public void deleteJournal(String id) {
        Journal journal = journalRepository.findById(Long.parseLong(id)).orElseThrow(() -> new IllegalArgumentException("존재하지 않는 게시글입니다." + id));
        commentRepository.deleteByJournalId(Long.parseLong(id));
        journalRepository.delete(journal);
    }

    @Transactional
    public void increaseViewCount(Long id) {
        Journal journal = journalRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("존재하지 않는 게시글입니다." + id));
        journal.increaseViewCount();
    }

    @Transactional
    public int toggleLike(LikesDto.LikesRequest request) {
        Long journalId = Long.parseLong(request.getJournalId());
        Long memberId = Long.parseLong(request.getMemberId());
        Journal journal = journalRepository.findById(journalId).orElseThrow(() -> new IllegalArgumentException("존재하지 않는 게시글입니다." + journalId));

        Optional<Likes> likesOptional = likesRepository.findByJournalIdAndMemberId(journalId, memberId);
        if (likesOptional.isPresent()) {
            likesRepository.delete(likesOptional.get());
            journal.decreaseLikeCount();
        } else {
            Member member = memberRepository.findById(memberId).orElseThrow(() -> new IllegalArgumentException("존재하지 않는 회원입니다." + memberId));
            Likes likes = Likes.builder()
                            .journal(journal)
                            .member(member)
                            .created_at(LocalDateTime.now())
                            .build();

            likesRepository.save(likes);
            journal.increaseLikeCount();
        }
        return journal.getStats().getLikes();
    }
}
