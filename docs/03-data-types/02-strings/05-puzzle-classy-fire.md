---
layout: default
title: Puzzle (Classy Fire)
parent: Strings
grand_parent: Data Types
nav_order: 5
permalink: docs/data-types/strings/puzzle-classy-fire
---

# Puzzle (Classy Fire)

Consider the following example.

```java
package demo;

public class App {
  public static void main( String[] args ) {
    System.out.println( classify( 'n' ) + classify( '+' ) + classify( '2' ) );
  }

  static String classify( char ch ) {
    if ( "0123456789".indexOf( ch ) >= 0 )
      return "NUMERAL ";

    if ( "abcdefghijklmnopqrstuvwxyz".indexOf( ch ) >= 0 )
      return "LETTER ";

    /* (Operators not supported yet)
        if ("+-*/&|!=".indexOf(ch) >= 0)
    return "OPERATOR ";
    */

    return "UNKNOWN ";
  }
}
```

What do you think the program will print?

This example was taken from [PUZZLE 19: CLASSY FIRE in Java™ Puzzlers: Traps, Pitfalls, and Corner Cases](https://learning.oreilly.com/library/view/javatm-puzzlers-traps/032133678X/ch03.html).

"_As you can see, the comment ends inside the string, which quite naturally contains the characters `*/`.  The resulting program is syntactically invalid.  Our attempt to comment out a section of the program failed because string literals are not treated specially within comments._"
