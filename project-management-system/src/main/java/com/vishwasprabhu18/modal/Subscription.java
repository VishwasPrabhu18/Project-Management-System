package com.vishwasprabhu18.modal;

import com.vishwasprabhu18.constant.PlanType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Subscription {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private LocalDate subscriptionStartDate;
    private LocalDate subscriptionEndDate;
    private PlanType planType;
    private boolean isvalid;
    @OneToOne
    private User user;
}
