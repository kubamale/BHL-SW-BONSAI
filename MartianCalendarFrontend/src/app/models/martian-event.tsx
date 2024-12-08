export interface MartianEvent {
    id: number,
    title: string,
    description: string,
    startMartianDate: MartianDate,
    endMartianDate: MartianDate,
}

export interface MartianDate {
    year: number,
    month: string,
    day: number,
    hour: number,
    minute: number,
    second: number,
    monthNumber: number,
}