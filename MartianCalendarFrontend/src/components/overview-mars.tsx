import './overview-mars.css'
import {DarianMonth, isLeapYear} from "@/app/models/darian-months";
import {DayTile} from "@/components/day";
import {MartianEvent} from "@/app/models/martian-event";

export default function OverviewMars({
                                         year,
                                         month,
                                         currentView,
                                         events,
                                     }: {
    year: number;
    month: DarianMonth;
    currentView: string;
    events: MartianEvent[]
}) {
    console.log(events)
    if (currentView == 'month') {
        const index = Object.values(DarianMonth).indexOf(month);
        const monthEvents = events.filter((v) => v.startMartianDate.monthNumber == index);
        console.log("asdasdasdasdmasod");
        console.log(Object.values(DarianMonth).indexOf(month));

        console.log(month)
        console.log(monthEvents);
        return renderMonthView(month, year, monthEvents);
    } else if (currentView == 'week') {
        return <p>week</p>
    } else if (currentView == 'day') {
        <p>day</p>
    } else if (currentView == 'year') {
        return renderYearView(month, year, events);
    }
}


// overview-mars.tsx - update the renderMonthView function
function renderMonthView(month: number, year: number, events: MartianEvent[]) {
    const daysNames = ["So", "Lu", "Ma", "Me", "Jo", "Ve", "Sa"];
    let startday = 1;
    
    const hasEventOnDay = (day: number) => {
        return events.some(event => 
            event.startMartianDate.day <= day && 
            event.endMartianDate.day >= day &&
            event.startMartianDate.monthNumber === month
        );
    };

    return (
        <div className="overview-mars">
            <h2>{Object.values(DarianMonth).at(month)}</h2>
            <table>
                <thead className='header'>
                    {daysNames.map((day: string, index: number) => (
                        <th key={index}>{day}</th>
                    ))}
                </thead>
                <tbody>
                    {[0, 1, 2, 3].map((row) => (
                        <tr key={row} className='row'>
                            {daysNames.map((day: string, index: number) => {
                                const currentDay = row * 7 + index + 1;
                                if (currentDay <= 28 || (currentDay === 28 && month + 1 === 24 && isLeapYear(year))) {
                                    return (
                                        <td key={index}>
                                            <DayTile 
                                                dayNumber={currentDay} 
                                                hasEvent={hasEventOnDay(currentDay)}
                                            />
                                        </td>
                                    );
                                }
                                return null;
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

// overview-mars.tsx - update the renderYearView function
function renderYearView(month: DarianMonth, year: number, events: MartianEvent[]) {
    return (
        <div className="year-container">
            {Object.values(DarianMonth).filter((v) => (isNaN(Number(v)))).map((value, index) => {
                const monthEvents = events.filter((e) => e.startMartianDate.monthNumber === index);
                return (
                    <div key={index} className="calendar-container">
                        {renderMonthView(index, year, monthEvents)}
                    </div>
                );
            })}
        </div>
    );
}