package com.vishwasprabhu18.repository;

import com.vishwasprabhu18.modal.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findCommentByIssueId(Long issueId);
}
