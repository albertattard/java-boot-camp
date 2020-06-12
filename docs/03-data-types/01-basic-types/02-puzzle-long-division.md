---
layout: default
title: Puzzle (Long Division)
parent: Basic types (variables and scope)
grand_parent: Data Types
nav_order: 2
permalink: docs/data-types/basic-types/puzzle-long-division
---

# Puzzle (Long Division)

Consider the following example.

```java
package demo;

public class App {
  public static void main( String[] args ) {
    long microsPerDay = 24 * 60 * 60 * 1000 * 1000;
    long millisPerDay = 24 * 60 * 60 * 1000;
    System.out.println( microsPerDay / millisPerDay );
  }
}
```

The program should print `1000`, but unfortunately, it prints `5`. What exactly is going on here?

```bash
5
```

This example was taken from [PUZZLE 3: LONG DIVISION in Java™ Puzzlers: Traps, Pitfalls, and Corner Cases](https://learning.oreilly.com/library/view/javatm-puzzlers-traps/032133678X/ch02.html).

"_The problem is that the computation of the constant `microsPerDay` does overflow.  Although the result of the computation fits in a `long` with room to spare, it doesn't fit in an `int`.  The computation is performed entirely in `int` arithmetic, and only after the computation completes is the result promoted to a `long`.  By then, it's too late: The computation has already overflowed, returning a value that is too low by a factor of `200`.  The promotion from `int` to `long` is a widening primitive conversion [JLS 5.1.2](https://docs.oracle.com/javase/specs/jls/se14/html/jls-5.html#jls-5.1.2), which preserves the (incorrect) numerical value.  This value is then divided by `millisPerDay`, which was computed correctly because it does fit in an `int`.  The result of this division is `5`._"
