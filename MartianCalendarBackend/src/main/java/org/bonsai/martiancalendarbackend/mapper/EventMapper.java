package org.bonsai.martiancalendarbackend.mapper;

import org.bonsai.martiancalendarbackend.darian.service.DarianYearConverter;
import org.bonsai.martiancalendarbackend.dto.EventDto;
import org.bonsai.martiancalendarbackend.dto.MartianEventDto;
import org.bonsai.martiancalendarbackend.model.Event;

public class EventMapper {

    public static EventDto toDto(Event event){
        return EventDto.builder()
                .id(event.getId())
                .title(event.getTitle())
                .description(event.getDescription())
                .category(event.getCategory())
                .start(event.getStartTime())
                .end(event.getEndTime())
                .build();
    }

    public static MartianEventDto toMartianDto(Event event){
        DarianYearConverter converter = new DarianYearConverter();
        return MartianEventDto.builder()
                .id(event.getId())
                .title(event.getTitle())
                .description(event.getDescription())
                .startMartianDate(converter.convertLocalDateTimeToDarianYear(event.getStartTime()))
                .endMartianDate(converter.convertLocalDateTimeToDarianYear(event.getEndTime()))
                .build();
    }
}
