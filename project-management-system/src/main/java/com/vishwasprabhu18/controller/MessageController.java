package com.vishwasprabhu18.controller;

import com.vishwasprabhu18.modal.Chat;
import com.vishwasprabhu18.modal.Message;
import com.vishwasprabhu18.modal.User;
import com.vishwasprabhu18.request.CreateMessageRequest;
import com.vishwasprabhu18.service.MessageService;
import com.vishwasprabhu18.service.ProjectService;
import com.vishwasprabhu18.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/messages")
public class MessageController {
    @Autowired
    private MessageService messageService;

    @Autowired
    private UserService userService;

    @Autowired
    private ProjectService projectService;

    @PostMapping
    public ResponseEntity<Message> sendMessage(
            @RequestBody CreateMessageRequest createMessageRequest
    ) throws Exception {
        User user = userService.findUserById(createMessageRequest.getSenderId());
        if (user == null) throw new Exception("user not found");

        Chat chat = projectService.getProjectById(createMessageRequest.getProjectId()).getChat();
        if (chat == null) throw new Exception("chat not found");

        Message sentMessage = messageService.sendMessage(
                createMessageRequest.getSenderId(),
                createMessageRequest.getProjectId(),
                createMessageRequest.getContent()
        );

        return ResponseEntity.ok(sentMessage);
    }

    @GetMapping("/chat/{projectId}")
    public ResponseEntity<List<Message>> getMessagesByChatId(
            @PathVariable Long projectId
    ) throws Exception{
        List<Message> messages = messageService.getMessagesByProjectId(projectId);
        return ResponseEntity.ok(messages);
    }
}
