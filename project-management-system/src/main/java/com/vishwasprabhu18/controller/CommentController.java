package com.vishwasprabhu18.controller;

import com.vishwasprabhu18.modal.Comment;
import com.vishwasprabhu18.modal.User;
import com.vishwasprabhu18.request.CreateCommentRequest;
import com.vishwasprabhu18.response.MessageResponse;
import com.vishwasprabhu18.service.CommentService;
import com.vishwasprabhu18.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
public class CommentController {
    @Autowired
    private CommentService commentService;

    @Autowired
    private UserService userService;

    @PostMapping()
    public ResponseEntity<Comment> createComment(
            @RequestBody CreateCommentRequest commentRequest,
            @RequestHeader("Authorization") String jwt
    ) throws Exception {
        User user = userService.findUserProfileByJwt(jwt);
        Comment createdComment = commentService.createComment(commentRequest.getIssueId(), user.getId(), commentRequest.getContent());
        return new ResponseEntity<>(createdComment, HttpStatus.CREATED);
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<MessageResponse> deleteComment(
            @PathVariable Long commentId,
            @RequestHeader("Authorization") String jwt
    ) throws Exception {
        User user = userService.findUserProfileByJwt(jwt);
        commentService.deleteComment(commentId, user.getId());
        MessageResponse messageResponse = new MessageResponse();
        messageResponse.setMessage("comment deleted successfully");
        return new ResponseEntity<>(messageResponse, HttpStatus.OK);
    }

    @GetMapping("/{issueId}")
    public ResponseEntity<List<Comment>> getCommentsByIssueId(
            @PathVariable Long issueId
    ) throws Exception {
        List<Comment> comments = commentService.findCommentsByIssueId(issueId);
        return new ResponseEntity<>(comments, HttpStatus.OK);
    }
}
