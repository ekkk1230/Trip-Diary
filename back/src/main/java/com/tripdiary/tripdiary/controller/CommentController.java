package com.tripdiary.tripdiary.controller;

import com.tripdiary.tripdiary.dto.CommentDto;
import com.tripdiary.tripdiary.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class CommentController {
    private final CommentService commentService;

    @GetMapping("/journal/{journalId}")
    public List<CommentDto.CommentResponse> getCommentByJournal(@PathVariable(name = "journalId") Long journalId) {
        return commentService.getCommentByJournal(journalId);
    }

    @PostMapping("/journal/{journalId}")
    public CommentDto.CommentResponse createComment(@RequestBody CommentDto.CommentRequest request) {
        return commentService.createComment(request);
    }

    @PutMapping("/{commentId}")
    public CommentDto.CommentResponse updateComment(
            @PathVariable(name = "commentId") String commentId,
            @RequestBody CommentDto.UpdateCommentRequest request) {
        return commentService.updateComment(commentId, request);
    }

    @DeleteMapping("/{commentId}")
    public void deleteComment(@PathVariable(name = "commentId") String commentId) {
        commentService.deleteComment(commentId);
    }
}
