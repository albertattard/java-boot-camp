---
layout: default
title: Using existing functionality
parent: Java Light
nav_order: 4
permalink: docs/java-light/using-existing-functionality/
---

# Using existing functionality

```java
import java.time.LocalDate;
```

```java
package demo;

import java.time.LocalDate;

public class App {
  public static void main( final String[] args ) {
    System.out.printf( "Today's date is %s%n", LocalDate.now() );
  }
}
```

```bash
Today's date is 2020-04-27
```

