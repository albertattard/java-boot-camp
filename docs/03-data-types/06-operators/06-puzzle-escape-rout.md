---
layout: default
title: Puzzle (Escape Rout)
parent: Operators
grand_parent: Data Types
nav_order: 6
permalink: docs/data-types/operators/puzzle-escape-rout
---

# Puzzle (Escape Rout)

Consider the following example.

```java
package demo;

public class App {
  public static void main( final String[] args ) {
    // \u0022 is the Unicode escape for double quote (")
    System.out.println( "a\u0022.length( ) + \u0022b".length() );
  }
}
```

What would it print?

```bash
2
```

This example was taken from [PUZZLE 14: ESCAPE ROUT in Java™ Puzzlers: Traps, Pitfalls, and Corner Cases](https://learning.oreilly.com/library/view/javatm-puzzlers-traps/032133678X/ch03.html).

"_The key to understanding this puzzle is that Java provides no special treatment for Unicode escapes within string literals.  The compiler translates Unicode escapes into the characters they represent before it parses the program into tokens, such as strings literals ([JLS 3.2](https://docs.oracle.com/javase/specs/jls/se14/html/jls-3.html#jls-3.2)).  Therefore, the first Unicode escape in the program closes a one-character string literal (`"a"`), and the second one opens a one-character string literal (`"b"`).  The program prints the value of the expression `"a".length() + "b".length()`, or `2`._"
