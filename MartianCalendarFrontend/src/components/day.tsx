import './day.css'

export function DayTile({dayNumber}:{
    dayNumber:number,
}) {
    return(
        <div>
            <h3 className="day-text has-event">{dayNumber}</h3>
        </div>
    )
}
