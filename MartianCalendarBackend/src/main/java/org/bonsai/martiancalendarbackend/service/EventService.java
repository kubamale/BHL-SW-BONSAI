package org.bonsai.martiancalendarbackend.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.bonsai.martiancalendarbackend.dto.EventDto;
import org.bonsai.martiancalendarbackend.mapper.EventMapper;
import org.bonsai.martiancalendarbackend.model.Event;
import org.bonsai.martiancalendarbackend.repository.EventRepository;
import org.springframework.stereotype.Service;

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
        log.info("Created event {}", event);
        return EventMapper.toDto(eventRepository.save(event));
    }

    public List<EventDto> getAllEvents() {
        return eventRepository.findAll().stream().map(EventMapper::toDto).toList();
    }

    @Transactional
    public EventDto editEvent(Long eventId, EventDto eventDto) {
        Event event = eventRepository.findById(eventId).orElseThrow(IllegalArgumentException::new);
        event.setTitle(eventDto.getTitle());
        event.setDescription(eventDto.getDescription());
        event.setStartTime(eventDto.getStart());
        event.setEndTime(eventDto.getEnd());
        log.info("Edited event {}", event);
        return EventMapper.toDto(event);
    }
}
