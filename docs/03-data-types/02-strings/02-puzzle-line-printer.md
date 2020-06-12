---
layout: default
title: Puzzle (Line Printer)
parent: Strings
grand_parent: Data Types
nav_order: 2
permalink: docs/data-types/strings/puzzle-line-printer
---

# Puzzle (Line Printer)

```java
package demo;

public class App {
  public static void main( final String[] args ) {
    // Note: \u000A is Unicode representation of linefeed (LF)
    char c = 0x000A;
    System.out.println( c );
  }
}
```

What will this program print, if it compiles!!

```bash
src/main/java/demo/App.java:5: error: ';' expected
    // Note: \u000A is Unicode representation of linefeed (LF)
```

This example was taken from [PUZZLE 16: LINE PRINTER in Java™ Puzzlers: Traps, Pitfalls, and Corner Cases](https://learning.oreilly.com/library/view/javatm-puzzlers-traps/032133678X/ch03.html).

"_The key to this puzzle is the comment on the third line of the program. Like the best of comments, this one is `true`.  Unfortunately, this one is a bit too `true`.  The compiler not only translates Unicode escapes into the characters they represent before it parses a program into tokens, but it does so before discarding comments and white space ([JLS 3.2](https://docs.oracle.com/javase/specs/jls/se14/html/jls-3.html#jls-3.2))._"
