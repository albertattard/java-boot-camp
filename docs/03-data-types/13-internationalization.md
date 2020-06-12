---
layout: default
title: Internationalization
parent: Data Types
nav_order: 13
permalink: docs/data-types/internationalization/
---

## Internationalization

Example

```java
package demo;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.TemporalField;
import java.time.temporal.WeekFields;
import java.util.Locale;

public class App {

  public static void main( final String[] args ) {
    final LocalDate now = LocalDate.now();

    final TemporalField fieldSys = WeekFields.of( Locale.getDefault() ).dayOfWeek();
    final TemporalField fieldUK = WeekFields.of( Locale.UK ).dayOfWeek();
    final TemporalField fieldUS = WeekFields.of( Locale.US ).dayOfWeek();

    final LocalDate firstSys = now.with( fieldSys, 1 );
    final LocalDate firstUK = now.with( fieldUK, 1 );
    final LocalDate firstUS = now.with( fieldUS, 1 );

    final DateTimeFormatter formatter = DateTimeFormatter.ofPattern( "dd E" );

    System.out.printf( "First day of week: %s (System)%n", firstSys.format( formatter ) );
    System.out.printf( "First day of week: %s (UK)%n", firstUK.format( formatter ) );
    System.out.printf( "First day of week: %s (US)%n", firstUS.format( formatter ) );
  }
}
```

Output

```bash
First day of week: 27 Mon (System)
First day of week: 27 Mon (UK)
First day of week: 26 Sun (US)
```

