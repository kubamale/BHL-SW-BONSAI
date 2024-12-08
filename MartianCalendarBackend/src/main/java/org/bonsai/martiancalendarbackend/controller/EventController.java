package org.bonsai.martiancalendarbackend.controller;

import lombok.RequiredArgsConstructor;
import org.bonsai.martiancalendarbackend.dto.EventDto;
import org.bonsai.martiancalendarbackend.dto.MartianEventDto;
import org.bonsai.martiancalendarbackend.service.EventService;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

    @GetMapping("/martian")
    public List<MartianEventDto> getMartianEvents() {
        return eventService.getMartianEvents();
    }
}
