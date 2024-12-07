package org.bonsai.martiancalendarbackend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

import java.time.OffsetDateTime;

@Entity(name = "events")
@Setter
@Getter
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String description;

    private OffsetDateTime startTime;

    private OffsetDateTime endTime;
}
