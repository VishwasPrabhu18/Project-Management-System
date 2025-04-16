package com.vishwasprabhu18.service;

import com.vishwasprabhu18.modal.Comment;

import java.util.List;

public interface CommentService {
    Comment createComment(Long issueId, Long userId, String content) throws Exception;

    void deleteComment(Long commentId, Long userId) throws Exception;

    List<Comment> findCommentsByIssueId(Long issueOd) throws Exception;
}
