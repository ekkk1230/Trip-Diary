package com.tripdiary.tripdiary.repository;

import com.tripdiary.tripdiary.domain.Likes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LikesRepository extends JpaRepository<Likes, Long> {
    Optional<Likes> findByJournalIdAndMemberId(Long journalId, Long memberId);
}
