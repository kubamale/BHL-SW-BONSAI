package org.bonsai.martiancalendarbackend.controller;

import lombok.RequiredArgsConstructor;
import org.bonsai.martiancalendarbackend.darian.model.MartianDate;
import org.bonsai.martiancalendarbackend.darian.service.DarianYearConverter;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.ZonedDateTime;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/conversions")
public class ConvertController {

    private final DarianYearConverter darianYearConverter;

    @PostMapping("/toMartian")
    public MartianDate convert(@RequestBody ZonedDateTime earthDate) {
        return darianYearConverter.convertLocalDateTimeToDarianYear(earthDate);
    }

    @PostMapping("/toEarth")
    public ZonedDateTime covertReverse(@RequestBody MartianDate martianDate) {
        return darianYearConverter.martianDateToEarthDate(martianDate);
    }
}
