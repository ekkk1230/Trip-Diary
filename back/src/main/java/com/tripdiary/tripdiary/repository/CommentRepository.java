package com.tripdiary.tripdiary.repository;

import com.tripdiary.tripdiary.domain.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByJournalId(Long journalId);

    @Modifying
    @Query("delete from Comment c where c.journal.id = :journalId")
    void deleteByJournalId(@Param("journalId") Long journalId);
}
