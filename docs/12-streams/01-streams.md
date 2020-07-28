---
layout: default
title: Introduction to Streams
parent: Streams
nav_order: 1
permalink: docs/streams/introduction/
---

# Introduction to Streams
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Streams
 
Java 8 introduced streams, which can ve visualised as a pipeline through which data can pass through.

![Pipeline](https://www.ekathimerini.com/resources/2020-06/05s10energ-thumb-large-thumb-large-thumb-large.jpg)
([Reference](https://www.ekathimerini.com/resources/2020-06/05s10energ-thumb-large-thumb-large-thumb-large.jpg))

Streams comprise three parts.

1. Source
1. A number of Intermediate Operations
1. A Terminal Operation 

![Stream Parts.png]({{ '/assets/images/Stream Parts.png' | absolute_url }})

Consider the following example

```java
package demo;

import java.util.stream.Stream;

public class App {

  public static void main( final String[] args ) {
    final int sum = Stream.of( "1", "2", "3", "4" )
      .mapToInt( Integer::parseInt )
      .filter( App::isEvenNumber )
      .map( App::doubleNumber )
      .sum();

    System.out.printf( "The sum is %d%n", sum );
  }

  private static int doubleNumber( final int number ) {
    return number * 2;
  }

  private static boolean isEvenNumber( final int number ) {
    return number % 2 == 0;
  }
}
```

The above example makes use of streams.

1. It starts with a source of Strings

   ```java
   Stream.of( "1", "2", "3", "4" )
   ```

1. Then performs several intermediate operations

   1. Converts the `String` to `int`

      ```java
        .mapToInt( Integer::parseInt )
      ```

   1. Removes the odd numbers

      ```java
        .filter( App::isEvenNumber )
      ```

   1. Doubles the numbers

      ```java
        map( App::doubleNumber )
      ```

1. Finally, it performs a terminal operation which sums all numbers

   ```java
   .sum()
   ```
