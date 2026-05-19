package com.tripdiary.tripdiary.service;

import com.tripdiary.tripdiary.domain.Comment;
import com.tripdiary.tripdiary.domain.Journal;
import com.tripdiary.tripdiary.domain.Member;
import com.tripdiary.tripdiary.dto.CommentDto;
import com.tripdiary.tripdiary.repository.CommentRepository;
import com.tripdiary.tripdiary.repository.JournalRepository;
import com.tripdiary.tripdiary.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CommentService {
    private final CommentRepository commentRepository;
    private final JournalRepository journalRepository;
    private final MemberRepository memberRepository;

    public List<CommentDto.CommentResponse> getCommentByJournal(Long journalId) {
        List<Comment> comments = commentRepository.findByJournalId(journalId);
        return comments.stream().map(CommentDto.CommentResponse::new).toList();
    }

    @Transactional
    public CommentDto.CommentResponse createComment(CommentDto.CommentRequest request) {
        Long journalId = request.getJournalId();
        Journal journal = journalRepository.findById(journalId).orElseThrow(() -> new IllegalArgumentException("존재하지 않는 Id입니다." + journalId));

        String memberNickName = request.getUser();
        Member member = memberRepository.findByNickname(memberNickName).orElseThrow(() -> new IllegalArgumentException("존재하지 않는 닉네임입니다." + memberNickName));

        Comment comment = Comment.builder()
                .journal(journal)
                .text(request.getText())
                .date(LocalDateTime.now())
                .member(member)
                .build();

        Comment createdComment = commentRepository.save(comment);
        return new CommentDto.CommentResponse(createdComment);
    }

    @Transactional
    public CommentDto.CommentResponse updateComment(String commentId, CommentDto.UpdateCommentRequest request) {
        Long cId = Long.parseLong(commentId);
        Comment comment = commentRepository.findById(cId).orElseThrow(() -> new IllegalArgumentException("존재하지 않는 답변입니다." + commentId));

        comment.update(request.getText(), LocalDateTime.now());

        return new CommentDto.CommentResponse(comment);
    }

    @Transactional
    public void deleteComment(String commentId) {
        Long cId = Long.parseLong(commentId);
        Comment comment = commentRepository.findById(cId).orElseThrow(() -> new IllegalArgumentException("존재하지 않는 답변입니다. " + commentId));
        commentRepository.delete(comment);
    }

}
