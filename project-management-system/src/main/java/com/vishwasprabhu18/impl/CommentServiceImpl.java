package com.vishwasprabhu18.impl;

import com.vishwasprabhu18.modal.Comment;
import com.vishwasprabhu18.modal.Issue;
import com.vishwasprabhu18.modal.User;
import com.vishwasprabhu18.repository.CommentRepository;
import com.vishwasprabhu18.repository.IssueRepository;
import com.vishwasprabhu18.repository.UserRepository;
import com.vishwasprabhu18.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class CommentServiceImpl implements CommentService {
    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private IssueRepository issueRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public Comment createComment(Long issueId, Long userId, String content) throws Exception {
        Optional<Issue> optionalIssue = issueRepository.findById(issueId);
        Optional<User> optionalUser = userRepository.findById(userId);

        if(optionalIssue.isEmpty()) {
            throw new Exception("issue not found");
        }
        if(optionalUser.isEmpty()){
            throw new Exception("user not found");
        }

        Issue issue = optionalIssue.get();
        User user = optionalUser.get();

        Comment comment = new Comment();
        comment.setIssue(issue);
        comment.setUser(user);
        comment.setCreateDateTime(LocalDateTime.now());
        comment.setContent(content);

        Comment savedComment = commentRepository.save(comment);

        issue.getComments().add(savedComment);

        return savedComment;
    }

    @Override
    public void deleteComment(Long commentId, Long userId) throws Exception {
        Optional<Comment> optionalComment = commentRepository.findById(commentId);
        Optional<User> optionalUser = userRepository.findById(userId);

        if(optionalComment.isEmpty()) {
            throw new Exception("comment not found");
        }
        if(optionalUser.isEmpty()) {
            throw new Exception("user not found");
        }

        Comment comment = optionalComment.get();
        User user = optionalUser.get();

        if(comment.getUser().equals(user)) {
            commentRepository.delete(comment);
        } else  {
            throw new Exception("user does not have permission to delete this comment");
        }
    }

    @Override
    public List<Comment> findCommentsByIssueId(Long issueOd) throws Exception {
        return commentRepository.findCommentByIssueId(issueOd);
    }
}
