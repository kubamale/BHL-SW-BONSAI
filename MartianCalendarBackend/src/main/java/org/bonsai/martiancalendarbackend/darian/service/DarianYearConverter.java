package org.bonsai.martiancalendarbackend.darian.service;

import org.bonsai.martiancalendarbackend.darian.model.DarianMonth;
import org.bonsai.martiancalendarbackend.darian.model.MartianDate;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;
import java.time.temporal.ChronoUnit;

@Service
public class DarianYearConverter implements DarianYearConverterService {

    private static final long SOL_TO_SECONDS = 24 * 60 * 60 + 39 * 60 + 35;
    private static final long HOUR_TO_SECONDS = 60 * 60;
    private static final long MINUTE_TO_SECONDS = 60;

    @Override
    public MartianDate convertLocalDateTimeToDarianYear(ZonedDateTime dateTime) {
        long secondsPassed = ChronoUnit.SECONDS.between(MartianDate.baseDateTime, dateTime);
        int year = 0;
        int month = 1;
        int day = 1;
        int hour = 0;
        int minute = 0;
        int second = 0;
        while (secondsPassed > 0) {
            if (secondsPassed >= SOL_TO_SECONDS * getYearsLength(year)) {
                year++;
                secondsPassed -= SOL_TO_SECONDS * getYearsLength(year);
            } else if (secondsPassed >= SOL_TO_SECONDS * getDaysInMonth(month, year)) {
                month++;
                secondsPassed -= SOL_TO_SECONDS * getDaysInMonth(month, year);
            } else if (secondsPassed >= SOL_TO_SECONDS) {
                day++;
                secondsPassed -= SOL_TO_SECONDS;
            } else if (secondsPassed >= HOUR_TO_SECONDS) {
                System.out.println();
                hour++;
                secondsPassed -= HOUR_TO_SECONDS;
            } else if (secondsPassed >= MINUTE_TO_SECONDS) {
                minute++;
                secondsPassed -= MINUTE_TO_SECONDS;
            } else {
                second += (int) secondsPassed;
                secondsPassed -= secondsPassed;
            }
        }

        return MartianDate.builder()
                .year(year)
                .month(DarianMonth.values()[month - 1])
                .day(day)
                .hour(hour)
                .minute(minute)
                .second(second)
                .build();
    }

    public ZonedDateTime martianDateToEarthDate(MartianDate date) {
        long time = 0;
        for (int i = 1; i <= date.getYear(); i++) {
            time += getYearsLength(i)*SOL_TO_SECONDS;
        }

        for (int i = 1 ; i < date.getMonth().ordinal() + 1; i ++) {
            time += getDaysInMonth(i, date.getYear())*SOL_TO_SECONDS;
        }

        time += (date.getDay()-1)*SOL_TO_SECONDS;
        time += date.getHour()*HOUR_TO_SECONDS;
        time += date.getMinute()*MINUTE_TO_SECONDS;
        time += date.getSecond();

        return MartianDate.baseDateTime.plusSeconds(time);
    }


    private int getYearsLength(int year) {
        if (isLeapYear(year)) {
            return 669;
        }

        return 668;
    }

    private int getDaysInMonth(int month, int year) {
        if (isLeapYear(year) && month == 24) {
            return 28;
        }

        if (month % 6 == 0) {
            return 27;
        }

        return 28;
    }

    private boolean isLeapYear(int year) {
        return !((year % 2 == 0 && year % 10 != 0) || (year % 100 == 0 && year % 500 != 0));
    }

}
