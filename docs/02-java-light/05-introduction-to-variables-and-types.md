---
layout: default
title: Introduction to variables and types
parent: Java Light
nav_order: 5
permalink: docs/java-light/introduction-to-variables-and-types/
---

# Introduction to variables and types

**🚧 Pending...**

```java
package demo;

public class App {
  public static void main( final String[] args ) {
    int a = 7;
    System.out.printf( "The value of a is %d%n", a );
  }
}
```

```bash
The value of a is 7
```

```java
package demo;

import java.time.LocalDate;

public class App {
  public static void main( final String[] args ) {
    String name = "Aden";
    LocalDate dateOfBirth = LocalDate.of( 2011, 4, 12 );
    System.out.printf( "%s was born on %s%n", name, dateOfBirth );
  }
}
```

```bash
Aden was born on 2011-04-12
```
