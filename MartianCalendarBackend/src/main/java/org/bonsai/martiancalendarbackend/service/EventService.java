package org.bonsai.martiancalendarbackend.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.bonsai.martiancalendarbackend.dto.EventDto;
import org.bonsai.martiancalendarbackend.mapper.EventMapper;
import org.bonsai.martiancalendarbackend.model.Event;
import org.bonsai.martiancalendarbackend.repository.EventRepository;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class EventService {

    private final EventRepository eventRepository;

    public EventDto createEvent(EventDto eventDto) {
        Event event = new Event();
        event.setTitle(eventDto.getTitle());
        event.setDescription(eventDto.getDescription());
        event.setStartTime(eventDto.getStart());
        event.setEndTime(eventDto.getEnd());
        eventRepository.save(event);
        log.error("Created event {}", event);
        return eventDto;
    }

    public List<EventDto> getEventsForDay(OffsetDateTime date) {
        return eventRepository.findAll().stream()
                .filter(event -> !event.getStartTime().isAfter(date) && !event.getEndTime().isBefore(date))
                .map(EventMapper::toDto)
                .toList();
    }

    public List<EventDto> getAllEvents() {
        return eventRepository.findAll().stream().map(EventMapper::toDto).toList();
    }

}
