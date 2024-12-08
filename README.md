# AstroBridge - Technical Documentation

## Overview
AstroBridge is an interplanetary time synchronization system that enables conversion between Martian (Darian) and Earth calendars. The application allows users to manage events across both planetary time systems with real-time synchronization.

## Architecture

### Frontend (Next.js)
- Built with Next.js, React, and TypeScript
- Uses shadcn/ui components and Tailwind CSS for styling
- Responsive calendar interface with multiple views (day, week, month, year)
- Real-time time conversion between Earth and Mars time

### Backend (Spring Boot)
- Java Spring Boot application 
- RESTful API endpoints for event management and time conversion
- MySQL database for event storage
- Implements the Darian calendar system for Mars time calculations

## Core Features

### Time Conversion System
- Converts between Earth time and Mars time (Darian calendar)
- Handles leap years and months in the Darian calendar
- Real-time synchronization with 1-second updates

```java
private static final long SOL_TO_SECONDS = 24 * 60 * 60 + 39 * 60 + 35; // Mars day in seconds
```

### Event Management
- CRUD operations for events
- Cross-planetary event scheduling
- Event visualization in different calendar views
- Automatic time zone handling

### Calendar Views
- Day view with hourly slots
- Week view with daily columns
- Month view with event indicators
- Year view with month overview
- Toggle between Earth and Mars calendars

## API Endpoints

### Time Conversion
```
POST /api/conversions/toMartian
POST /api/conversions/toEarth
```

### Event Management
```
GET /api/events
POST /api/events
PUT /api/events/{eventId}
DELETE /api/events/{eventId}
GET /api/events/martian
```

## Data Models

### Earth Event
```typescript
interface Event {
  id: number;
  title: string;
  description: string;
  start: string; // ISO date string
  end: string;
}
```

### Mars Event
```typescript
interface MartianEvent {
  id: number;
  title: string;
  description: string;
  startMartianDate: MartianDate;
  endMartianDate: MartianDate;
}
```

## Setup Instructions

### Prerequisites
- Node.js (Frontend)
- Java 21 (Backend)
- MySQL

### Frontend Setup
```bash
cd MartianCalendarFrontend
npm install
npm run dev
```

### Backend Setup
```bash
cd MartianCalendarBackend
./mvnw spring-boot:run
```

## Configuration

### Database
```properties
spring.datasource.url=jdbc:mysql://localhost:5432/events_db
spring.datasource.username=root
spring.datasource.password=root_password
```

### CORS
```java
configuration.setAllowedOrigins(List.of("http://localhost:3000"));
configuration.setAllowedMethods(List.of("POST", "GET", "PUT", "DELETE", "OPTIONS"));
```

## Styling
The application uses a theme system with both Earth and Mars color schemes:

```typescript
const earthTheme = {
  primary: "hsl(210, 20%, 50%)",
  secondary: "hsl(180, 15%, 70%)",
  background: "hsl(0, 0%, 98%)",
  text: "hsl(210, 20%, 25%)"
}

const marsTheme = {
  primary: "hsl(15, 40%, 50%)",
  secondary: "hsl(30, 30%, 60%)",
  background: "hsl(15, 25%, 95%)",
  text: "hsl(15, 40%, 25%)"
}
```

## Testing
The project includes unit tests for critical components, especially the time conversion logic:

```java
@Test
void convertLocalDateTimeToDarianYear() {
    ZonedDateTime dateTime = ZonedDateTime.of(2025, 12, 25, 0, 0, 0, 0, ZoneId.of("UTC"));
    MartianDate martianDate = darianYearConverter.convertLocalDateTimeToDarianYear(dateTime);
    ZonedDateTime convertedDate = darianYearConverter.martianDateToEarthDate(martianDate);
    assertEquals(dateTime, convertedDate);
}
```

## Authors
- Aleksander Gajowniczek
- Błażej Laskus
- Tomasz Lewiński
- Jakub Malewicz