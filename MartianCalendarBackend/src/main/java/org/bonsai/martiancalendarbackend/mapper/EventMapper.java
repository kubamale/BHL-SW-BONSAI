package org.bonsai.martiancalendarbackend.mapper;

import org.bonsai.martiancalendarbackend.dto.EventDto;
import org.bonsai.martiancalendarbackend.model.Event;

public class EventMapper {

    public static EventDto toDto(Event event){
        return EventDto.builder()
                .title(event.getTitle())
                .description(event.getDescription())
                .startTime(event.getStartTime())
                .endTime(event.getEndTime())
                .build();
    }
}
