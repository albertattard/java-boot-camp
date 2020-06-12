---
layout: default
title: Swap Meat
parent: Operators
grand_parent: Data Types
nav_order: 5
permalink: docs/data-types/operators/puzzle-swap-meat
---

# Puzzle (Swap Meat)

Consider the following example.

```java
package demo;

public class App {
  public static void main( String[] args ) {
    cleverSwap();
  }

  public static void cleverSwap() {
    int x = 1984;  // (0x7c0)
    int y = 2001;  // (0x7d1)
    x ^= y ^= x ^= y;
    System.out.printf( "x = %d; y = %d%n", x, y );
  }
}
```

Unfortunately the above swap variables trick does not work in Java.

```bash
x = 0; y = 1984
```

This example was taken from [PUZZLE 7: SWAP MEAT in Java™ Puzzlers: Traps, Pitfalls, and Corner Cases](https://learning.oreilly.com/library/view/javatm-puzzlers-traps/032133678X/ch02.html).

"_Long ago, when central processing units had few registers, it was discovered that one could avoid the use of a temporary variable by taking advantage of the property of the exclusive OR operator (`^`) that `(x ^ y ^ x) == y`_"

"_This idiom was used in the C programming language and from there made its way into C++ but is not guaranteed to work in either of these languages.  **It is guaranteed not to work in Java**. The Java language specification says that operands of operators are evaluated from left to right ([JLS 15.7](https://docs.oracle.com/javase/specs/jls/se14/html/jls-15.html#jls-15.7)).  To evaluate the expression `x ^= expr`, the value of `x` is sampled before expr is evaluated, and the exclusive OR of these two values is assigned to the variable `x` ([JLS 15.26.2](https://docs.oracle.com/javase/specs/jls/se14/html/jls-15.html#jls-15.26.2)).  In the `cleverSwap()` function, the variable `x` is sampled twice—once for each appearance in the expression—but both samplings occur before any assignments._"
