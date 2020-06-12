---
layout: default
title: Puzzle (No Pain, No Gain)
parent: Strings
grand_parent: Data Types
nav_order: 8
permalink: docs/data-types/strings/puzzle-no-pain-no-gain
---

# Puzzle (No Pain, No Gain)

Consider the following example.

```java
package demo;

import java.util.Random;

public class App {

  public static void main( String[] args ) {
    Random random = new Random();
    StringBuffer word =
      switch ( random.nextInt( 2 ) ) {
        case 1 -> new StringBuffer( 'P' );
        case 2 -> new StringBuffer( 'G' );
        default -> new StringBuffer( 'M' );
      };

    word.append( 'a' );
    word.append( 'i' );
    word.append( 'n' );

    System.out.println( word );
  }
}
```

Will it output `Pain` or `Main`?  It will not print `Gain` as the `randon.nextInt(2)` will return a value between `0` and `1` both inclusive, never `2`.

This example was taken from [PUZZLE 23: NO PAIN, NO GAIN in Java™ Puzzlers: Traps, Pitfalls, and Corner Cases](https://learning.oreilly.com/library/view/javatm-puzzlers-traps/032133678X/ch03.html).

"_The last and most subtle bug is that the expression `new StringBuffer('M')` probably does not do what you think it does.  You may not be familiar with the `StringBuffer(char)` constructor, and with good reason: It does not exist.  There is a parameterless constructor, one that takes a `String` indicating the initial contents of the string buffer and one that takes an `int` indicating its initial capacity.  In this case, the compiler selects the `int` constructor, applying a widening primitive conversion to convert the char value `'M'` into the int value `77` ([JLS 5.1.2](https://docs.oracle.com/javase/specs/jls/se14/html/jls-5.html#jls-5.1.2)).  In other words, `new StringBuffer('M')` returns an empty string buffer with an initial capacity of `77`.  The remainder of the program appends the characters `a`, `i`, and `n` to the empty string buffer and prints out its contents, which are always `ain`._"
