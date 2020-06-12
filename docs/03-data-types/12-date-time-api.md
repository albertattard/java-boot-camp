---
layout: default
title: Date Time API
parent: Data Types
nav_order: 12
permalink: docs/data-types/date-time-api/
---

# Date Time API

Example

```java
package demo;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;

public class App {
  public static void main( String[] args ) {
    final LocalDate now = LocalDate.now();
    final LocalDate lastWeek = now.minusWeeks( 1 );

    final LocalTime noon = LocalTime.NOON;
    final LocalTime eleven = noon.minusHours( 1 );

    final LocalDateTime yesterday = LocalDateTime.now().minusDays( 1 );

    final ZonedDateTime malta = yesterday.atZone( ZoneId.of( "Europe/Malta" ) );
    final ZonedDateTime toronto = yesterday.atZone( ZoneId.of( "America/Toronto" ) );
    final ZonedDateTime vancouver = yesterday.atZone( ZoneId.of( "America/Vancouver" ) );

    final DateTimeFormatter formatter = DateTimeFormatter.ofPattern( "yyyy MMM dd HH:mm '(in 'v')'" );
    final String formatted = malta.format( formatter );
    final LocalDate parsed = LocalDate.parse( "2020-04-27", DateTimeFormatter.ISO_DATE );

    System.out.println( "-- Date ----------" );
    System.out.printf( "Today:     %s%n", now );
    System.out.printf( "Last Week: %s%n", lastWeek );

    System.out.println( "-- Time ----------" );
    System.out.printf( "Noon:      %s%n", noon );
    System.out.printf( "Eleven:    %s%n", eleven );

    System.out.println( "-- Date/Time -----" );
    System.out.printf( "Yesterday: %s%n", yesterday );

    System.out.println( "-- With offset ---" );
    System.out.printf( "Yesterday: %s%n", malta );
    System.out.printf( "Yesterday: %s%n", toronto );
    System.out.printf( "Yesterday: %s%n", vancouver );

    System.out.println( "-- Formatter -----" );
    System.out.printf( "Formatted: %s%n", formatted );
    System.out.printf( "Parsed:    %s%n", parsed );
  }
}
```

Output

```bash
-- Date ----------
Today:     2020-04-28
Last Week: 2020-04-21
-- Time ----------
Noon:      12:00
Eleven:    11:00
-- Date/Time -----
Yesterday: 2020-04-27T20:10:46.298083
-- With offset ---
Yesterday: 2020-04-27T20:10:46.298083+02:00[Europe/Malta]
Yesterday: 2020-04-27T20:10:46.298083-04:00[America/Toronto]
Yesterday: 2020-04-27T20:10:46.298083-07:00[America/Vancouver]
-- Formatter -----
Formatted: 2020 Apr 27 20:10 (in CET)
Parsed:    2020-04-27
```
