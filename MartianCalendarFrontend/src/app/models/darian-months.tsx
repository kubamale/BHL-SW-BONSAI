export enum DarianMonth {
    SAGITTARIUS,
    DHANUS,
    CAPRICORNUS,
    MAKARA,
    AQUARIUS,
    KUMBHA,
    PISCES,
    MINA,
    ARIES,
    MESHA,
    TAURUS,
    RISHABHA,
    GEMINI,
    MITHUNA,
    CANCER,
    KARKA,
    LEO,
    SIMHA,
    VIRGO,
    KANYA,
    LIBRA,
    TULA,
    SCORPIUS,
    VRISHIKA
}

export function isLeapMonth(month: number, year: number) {
    return (month+1 %6 != 0) || (month+1 == 24 && isLeapYear(year));
}

export function isLeapYear(year: number) {
    return !((year % 2 == 0 && year % 10 != 0) || (year % 100 == 0 && year % 500 != 0));
}