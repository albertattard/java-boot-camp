---
layout: default
title: Puzzle (Time for a change)
parent: Basic types (variables and scope)
grand_parent: Data Types
nav_order: 1
permalink: docs/data-types/basic-types/puzzle-time-for-a-change
---

# Puzzle (Time for a change)

Consider the following example.

```java
package demo;

public class App {
  public static void main( String[] args ) {
    System.out.println( 2.00 - 1.10 );
  }
}
```

What do you think it will print?

```bash
0.8999999999999999
```

This example was taken from [PUZZLE 2: TIME FOR A CHANGE in Java™ Puzzlers: Traps, Pitfalls, and Corner Cases](https://learning.oreilly.com/library/view/javatm-puzzlers-traps/032133678X/ch02.html).

"_The problem is that the number `1.1` can't be represented exactly as a `double`, so it is represented by the closest `double` value.  The program subtracts this value from `2`.  Unfortunately, the result of this calculation is not the closest `double` value to `0.9`.  The shortest representation of the resulting `double` value is the hideous number that you see printed._"

"_Binary floating-point is particularly ill-suited to monetary calculations, as it is impossible to represent `0.1`—or any other negative power of `10`—exactly as a finite-length binary fraction ([Effective Java - Item 60: Avoid float and double if exact answers are required](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/ch9.xhtml#lev60))._"
