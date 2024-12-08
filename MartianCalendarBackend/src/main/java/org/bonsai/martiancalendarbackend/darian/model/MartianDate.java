package org.bonsai.martiancalendarbackend.darian.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.time.ZoneId;
import java.time.ZonedDateTime;

@Builder
@Getter
@AllArgsConstructor
@ToString
public class MartianDate {
    public static ZonedDateTime baseDateTime = ZonedDateTime.of(1609, 3, 11, 0, 40, 34, 0, ZoneId.of("UTC"));

    private int year;
    private DarianMonth month;
    private int day;
    private int hour;
    private int minute;
    private int second;

    public int getMonthNumber() {
        return this.month.ordinal();
    }
}
