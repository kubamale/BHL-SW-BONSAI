package org.bonsai.martiancalendarbackend.darian.service;

import org.bonsai.martiancalendarbackend.darian.model.MartianDate;
import org.junit.jupiter.api.Test;

import java.time.ZoneId;
import java.time.ZonedDateTime;

import static org.junit.jupiter.api.Assertions.assertEquals;


class DarianYearConverterTest {

    private final DarianYearConverter darianYearConverter = new DarianYearConverter();

    @Test
    void convertLocalDateTimeToDarianYear() {
        ZonedDateTime dateTime = ZonedDateTime.of(2025, 12, 25, 0, 0, 0, 0, ZoneId.of("UTC"));
        MartianDate martianDate = darianYearConverter.convertLocalDateTimeToDarianYear(dateTime);
        System.out.println(martianDate);
        ZonedDateTime convertedDate = darianYearConverter.martianDateToEarthDate(martianDate);
        assertEquals(dateTime, convertedDate);
    }

}