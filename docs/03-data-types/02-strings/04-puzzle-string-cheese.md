---
layout: default
title: Puzzle (String Cheese)
parent: Strings
grand_parent: Data Types
nav_order: 4
permalink: docs/data-types/strings/puzzle-string-cheese
---

# Puzzle (String Cheese)

Consider the following example.

```java
package demo;

public class App {
  public static void main( String[] args ) {
    byte[] bytes = new byte[256];
    for ( int i = 0; i < 256; i++ )
      bytes[i] = (byte) i;
    String str = new String( bytes );
    for ( int i = 0, n = str.length(); i < n; i++ )
      System.out.print( (int) str.charAt( i ) + " " );
  }
}
```

This program creates a string from a sequence of bytes, then iterates over the characters in the string and prints them as numbers. Describe the sequence of numbers that the program prints:

```bash
... 125 126 127 65533 65533 65533 ...
```

This example was taken from [PUZZLE 18: STRING CHEESE in Java™ Puzzlers: Traps, Pitfalls, and Corner Cases](https://learning.oreilly.com/library/view/javatm-puzzlers-traps/032133678X/ch03.html).

"_If you ran the program, maybe you saw this sequence. Then again, maybe you didn't.  We ran it on four machines and saw four different sequences, including the one described previously.  This program isn't even guaranteed to terminate normally, much less to print any particular sequence.  Its behavior is completely unspecified._"

"_The culprit here is the `String( byte[ ] )` constructor.  Its specification says: `"Constructs a new String by decoding the specified byte array using the platform's default charset. The length of the new String is a function of the charset, and hence may not be equal to the length of the byte array. The behavior of this constructor when the given bytes are not valid in the default charset is unspecified"` ([Java-API](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/lang/String.html#%3Cinit%3E(byte%5B%5D)))._"
