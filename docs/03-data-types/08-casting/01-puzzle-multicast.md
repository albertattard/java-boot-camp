---
layout: default
title: Puzzle (Multicast)
parent: Casting
grand_parent: Data Types
nav_order: 1
permalink: docs/data-types/casting/puzzle-multicast
---

# Puzzle (Multicast)

Consider the following example.

```java
package demo;

public class App {
  public static void main( final String[] args ) {
    System.out.println( (int) (char) (byte) -1 );
  }
}
```

What do you think the above example, will print?

```bash
65535
```

This example was taken from [PUZZLE 6: MULTICAST in Java™ Puzzlers: Traps, Pitfalls, and Corner Cases](https://learning.oreilly.com/library/view/javatm-puzzlers-traps/032133678X/ch02.html).

"_The cast from `byte` to `char` is trickier because `byte` is a signed type and `char` unsigned.  It is usually possible to convert from one integral type to a wider one while preserving numerical value, but it is impossible to represent a negative `byte` value as a `char`.  Therefore, the conversion from `byte` to `char` is not considered a widening primitive conversion ([JLS 5.1.2](https://docs.oracle.com/javase/specs/jls/se14/html/jls-5.html#jls-5.1.2)), but a widening and narrowing primitive conversion ([JLS 5.1.4]((https://docs.oracle.com/javase/specs/jls/se14/html/jls-5.html#jls-5.1.4))): The `byte` is converted to an `int` and the `int` to a `char`._"
