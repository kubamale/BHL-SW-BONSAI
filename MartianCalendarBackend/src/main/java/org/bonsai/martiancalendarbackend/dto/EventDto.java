package org.bonsai.martiancalendarbackend.dto;

import lombok.Builder;
import lombok.Data;

import java.time.ZonedDateTime;

@Data
@Builder
public class EventDto {
    private Long id;
    private String title;
    private String description;
    private String category;
    private ZonedDateTime start;
    private ZonedDateTime end;
}
