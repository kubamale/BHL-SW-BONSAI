package org.bonsai.martiancalendarbackend.repository;

import org.bonsai.martiancalendarbackend.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<Event, Long> {
}
