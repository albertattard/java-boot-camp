---
layout: default
title: Puzzle (It's Elementary)
parent: Basic types (variables and scope)
grand_parent: Data Types
nav_order: 3
permalink: docs/data-types/basic-types/puzzle-it-s-elementary
---

# Puzzle (It's Elementary)

Consider the following example.

```java
package demo;

public class App {
  public static void main( String[] args ) {
    System.out.println( 12345 + 5432l );
  }
}
```

What do you think the above will print?

```bash
17777
```

This example was taken from [PUZZLE 4: IT'S ELEMENTARY in Java™ Puzzlers: Traps, Pitfalls, and Corner Cases](https://learning.oreilly.com/library/view/javatm-puzzlers-traps/032133678X/ch02.html).

"_Things are seldom what they seem.  Take this program, for instance.  It doesn't say what you think it does.  Take a careful look at the two operands of the `+` operator.  We are adding the `int` value `12345` to the `long` value `5432l`.  Note the subtle difference in shape between the digit `1` at the beginning of the left operand and the lowercase letter *el* at the end of the right operand._"
