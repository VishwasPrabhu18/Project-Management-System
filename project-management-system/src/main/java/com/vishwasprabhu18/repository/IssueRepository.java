package com.vishwasprabhu18.repository;

import com.vishwasprabhu18.modal.Issue;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IssueRepository extends JpaRepository<Issue, Long> {
    List<Issue> findByProjectId(Long projectId);
}
