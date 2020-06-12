---
layout: default
title: Puzzle (Inclement Increment)
parent: Operators
grand_parent: Data Types
nav_order: 8
permalink: docs/data-types/operators/puzzle-inclement-increment
---

# Puzzle (Inclement Increment)

Consider the following example.

```java
package demo;

public class App {

  public static void main( String[] args ) {
    int j = 0;
    for ( int i = 0; i < 100; i++ )
      j = j++;
    System.out.println( j );
  }
}
```

What will be the value of `j`?

```
0
```

This example was taken from [PUZZLE 25: INCLEMENT INCREMENT in Java™ Puzzlers: Traps, Pitfalls, and Corner Cases](https://learning.oreilly.com/library/view/javatm-puzzlers-traps/032133678X/ch04.html).

"_Presumably, the author of the statement meant for it to add `1` to the value of `j`, which is what the expression `j++` does.  Unfortunately, the author inadvertently assigned the value of this expression back to `j`.  When placed after a variable, the `++` operator functions as the postfix increment operator ([JLS 15.14.2](https://docs.oracle.com/javase/specs/jls/se14/html/jls-15.html#jls-15.14.2)): The value of the expression `j++` is the original value of `j` before it was incremented.  Therefore, the preceding assignment first saves the value of `j`, then sets `j` to its value plus `1`, and, finally, resets `j` back to its original value._"
