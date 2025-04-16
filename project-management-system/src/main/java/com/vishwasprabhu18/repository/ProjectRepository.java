package com.vishwasprabhu18.repository;

import com.vishwasprabhu18.modal.Project;
import com.vishwasprabhu18.modal.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findByOwner(User user);

    List<Project> findByNameContainingAndTeamContains(String partialName, User user);

//    @Query("SELECT p FROM project p JOIN p.team t WHERE t=:user")
//    List<Project> findProjectByTeam(@Param("user") User user);

    List<Project> findByTeamContainingOrOwner(User user, User owner);
}
