package com.vishwasprabhu18.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateMessageRequest {
    private Long senderId;
    private Long projectId;
    private String content;
}
