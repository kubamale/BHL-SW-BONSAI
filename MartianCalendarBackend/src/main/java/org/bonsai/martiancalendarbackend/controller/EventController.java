package org.bonsai.martiancalendarbackend.controller;

import lombok.RequiredArgsConstructor;
import org.bonsai.martiancalendarbackend.dto.EventDto;
import org.bonsai.martiancalendarbackend.service.EventService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/events")
public class EventController {

    private final EventService eventService;

    @PostMapping
    public EventDto addEvent(@RequestBody EventDto eventDto) {
        return eventService.createEvent(eventDto);
    }

    @GetMapping
    public List<EventDto> getAllEvents() {
        return eventService.getAllEvents();
    }

    @PutMapping("{eventId}")
    public EventDto updateEvent(@PathVariable Long eventId, @RequestBody EventDto eventDto) {
        return eventService.editEvent(eventId, eventDto);
    }

    @DeleteMapping("{eventId}")
    public void deleteEvent(@PathVariable Long eventId) {
        eventService.deleteEvent(eventId);
    }
}
