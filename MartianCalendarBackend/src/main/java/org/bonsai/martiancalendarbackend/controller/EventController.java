package org.bonsai.martiancalendarbackend.controller;

import lombok.RequiredArgsConstructor;
import org.bonsai.martiancalendarbackend.dto.EventDto;
import org.bonsai.martiancalendarbackend.service.EventService;
import org.springframework.web.bind.annotation.*;

import java.time.OffsetDateTime;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class EventController {

    private final EventService eventService;

    @PostMapping
    public EventDto addEvent(@RequestBody EventDto eventDto) {
        return eventService.createEvent(eventDto);
    }

    @GetMapping
    public List<EventDto> getEventsForDay(@RequestParam OffsetDateTime date){
        return eventService.getEventsForDay(date);
    }
}
