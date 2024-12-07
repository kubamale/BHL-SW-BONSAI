package org.bonsai.martiancalendarbackend.dto;

import lombok.Data;

import java.time.OffsetDateTime;

@Data
public class EventDto {
    private Long id;
    private String title;
    private String description;
    private OffsetDateTime startTime;
    private OffsetDateTime endTime;
}
