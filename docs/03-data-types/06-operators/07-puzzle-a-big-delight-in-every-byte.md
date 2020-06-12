---
layout: default
title: Puzzle (A Big Delight in Every Byte)
parent: Operators
grand_parent: Data Types
nav_order: 7
permalink: docs/data-types/operators/puzzle-a-big-delight-in-every-byte
---

# Puzzle (A Big Delight in Every Byte)

Consider the follow example.

```java
package demo;

public class App {

  public static void main( String[] args ) {
    for ( byte b = Byte.MIN_VALUE; b < Byte.MAX_VALUE; b++ ) {
      if ( b == 0x90 )
        System.out.println( "Joy!" );
    }
  }
}
```

How many times the above program prints `Joy`?  Never?

This example was taken from [PUZZLE 24: A BIG DELIGHT IN EVERY BYTE in Java™ Puzzlers: Traps, Pitfalls, and Corner Cases](https://learning.oreilly.com/library/view/javatm-puzzlers-traps/032133678X/ch04.html).

"_Simply put, `0x90` is an `int` constant that is outside the range of `byte` values.  This is counterintuitive because `0x90` is a two-digit hexadecimal literal.  Each hex digit takes up `4` bits, so the entire value takes up `8` bits, or `1` byte. The problem is that `byte` is a signed type.  The constant `0x90` is a positive `int` value of `8` bits with the highest bit set.  Legal `byte` values range from `−128` to `+127`, but the int constant `0x90` is equal to `+144`._"

"_The comparison of a `byte` to an `int` is a mixed-type comparison.  If you think of `byte` values as apples and `int` values as oranges, the program is comparing apples to oranges.  Consider the expression (`(byte)0x90 == 0x90`).  Appearances notwithstanding, it evaluates to `false`.  To compare the byte value `(byte)0x90` to the int value `0x90`, Java promotes the `byte` to an `int` with a widening primitive conversion ([JLS 5.1.2](https://docs.oracle.com/javase/specs/jls/se14/html/jls-5.html#jls-5.1.2)) and compares the two `int` values.  Because `byte` is a signed type, the conversion performs sign extension, promoting negative `byte` values to numerically equal `int` values.  In this case, the conversion promotes `(byte)0x90` to the `int` value `-112`, which is unequal to the `int` value `0x90`, or `+144`._"
