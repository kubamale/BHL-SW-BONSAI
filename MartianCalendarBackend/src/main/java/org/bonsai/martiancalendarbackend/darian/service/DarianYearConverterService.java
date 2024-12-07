package org.bonsai.martiancalendarbackend.darian.service;

import org.bonsai.martiancalendarbackend.darian.model.MartianDate;

import java.time.ZonedDateTime;

public interface DarianYearConverterService {
    MartianDate convertLocalDateTimeToDarianYear(ZonedDateTime dateTime);
}
