import './day.css'

export function DayTile({dayNumber, hasEvent = false}: {
    dayNumber: number,
    hasEvent?: boolean
}) {
    return (
        <div>
            <h3 className={`day-text ${hasEvent ? 'has-event' : ''}`}>{dayNumber}</h3>
        </div>
    )
}
