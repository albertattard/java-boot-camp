---
layout: default
title: Puzzle (The Last Laugh)
parent: Operators
grand_parent: Data Types
nav_order: 3
permalink: docs/data-types/operators/puzzle-the-last-laugh
---

# Puzzle (The Last Laugh)

Consider the following example.

```java
package demo;

public class App {
  public static void main( String[] args ) {
    System.out.print( "H" + "a" );
    System.out.print( 'H' + 'a' );
  }
}
```

What do you think the above will print?  Will it be `HaHa`?

```bash
Ha169
```

This example was taken from [PUZZLE 11: THE LAST LAUGH in Java™ Puzzlers: Traps, Pitfalls, and Corner Cases](https://learning.oreilly.com/library/view/javatm-puzzlers-traps/032133678X/ch03.html).

"_The compiler evaluates the constant expression `'H' + 'a'` by promoting each of the char-valued operands (`'H'` and `'a'`) to `int` values through a process known as widening primitive conversion ([JLS 5.1.2](https://docs.oracle.com/javase/specs/jls/se14/html/jls-5.html#jls-5.1.2), [JLS 5.6.2](https://docs.oracle.com/javase/specs/jls/se14/html/jls-5.html#jls-5.6.2)).  Widening primitive conversion of a `char` to an int zero extends the 16-bit `char` value to fill the 32-bit int.  In the case of `'H'`, the `char` value is `72` and in the case of `'a'`, it is `97`, so the expression `'H' + 'a'` is equivalent to the int constant `72 + 97`, or `169`._"
