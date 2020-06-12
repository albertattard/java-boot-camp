---
layout: default
title: Puzzle (The Joy of Hex)
parent: Basic types (variables and scope)
grand_parent: Data Types
nav_order: 4
permalink: docs/data-types/basic-types/puzzle-the-joy-of-hex
---

# Puzzle (The Joy of Hex)

Consider the following example.

```java
package demo;

public class App {
  public static void main( String[] args ) {
    System.out.println( Long.toHexString( 0x100000000L + 0xcafebabe ) );
  }
}
```

The above seems to be adding the following two Hexadecimal numbers

```hex
100000000
 cafebabe
```

This output represents the low-order 32 bits of the correct sum, but somehow the thirty-third bit gets lost.

```bash
cafebabe
```

This example was taken from [PUZZLE 5: THE JOY OF HEX in Java™ Puzzlers: Traps, Pitfalls, and Corner Cases](https://learning.oreilly.com/library/view/javatm-puzzlers-traps/032133678X/ch02.html).

"_Decimal literals have a nice property that is not shared by hexadecimal or octal literals: Decimal literals are all positive [JLS 3.10.1](https://docs.oracle.com/javase/specs/jls/se14/html/jls-3.html#jls-3.10.1).  To write a negative decimal constant, you use the unary negation operator (`-`) in combination with a decimal literal.  In this way, you can write any `int` or `long` value, whether positive or negative, in decimal form, and negative decimal constants are clearly identifiable by the presence of a minus sign.  Not so for hexadecimal and octal literals.  They can take on both positive and negative values. Hex and octal literals are negative if their high-order bit is set.  In this program, the number `0xcafebabe` is an `int` constant with its high-order bit set, so it is negative.  It is equivalent to the decimal value `-889275714`._"

"_The addition performed by the program is a mixed-type computation: The left operand is of type `long`, and the right operand is of type `int`.  To perform the computation, Java promotes the `int` value to a `long` with a widening primitive conversion [JLS 5.1.2](https://docs.oracle.com/javase/specs/jls/se14/html/jls-5.html#jls-5.1.2) and adds the two `long` values.  Because `int` is a signed integral type, the conversion performs sign extension: It promotes the negative `int` value to a numerically equal `long` value._"
