package org.bonsai.martiancalendarbackend.dto;

import lombok.Builder;
import lombok.Data;

import java.time.OffsetDateTime;

@Data
@Builder
public class EventDto {
    private String title;
    private String description;
    private OffsetDateTime start;
    private OffsetDateTime end;
}
