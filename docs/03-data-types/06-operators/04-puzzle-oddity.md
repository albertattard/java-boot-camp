---
layout: default
title: Puzzle (Oddity)
parent: Operators
grand_parent: Data Types
nav_order: 4
permalink: docs/data-types/operators/puzzle-oddity
---

# Puzzle (Oddity)

Consider the following example.

```java
public static boolean isOdd( int i ) {
  return i % 2 == 1;
}
```

Do you think that the above implementation is correct?

**When in doubt, write a test**.

```java
package demo;

import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

import static demo.App.isOdd;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class AppTest {

  @ParameterizedTest( name = "should return true when given the odd value {0}" )
  @ValueSource( ints = { 1, -1 } )
  void shouldReturnTrueWhenGivenOdd( int oddNumber ) {
    assertTrue( isOdd( oddNumber ) );
  }
}
```

The above test will fail.

```bash
$ ./gradlew test

> Task :test FAILED

AppTest > should return true when given the odd value 1 PASSED

AppTest > should return true when given the odd value -1 FAILED
    org.opentest4j.AssertionFailedError at AppTest.java:14
```

This example was taken from [PUZZLE 1: ODDITY in Java™ Puzzlers: Traps, Pitfalls, and Corner Cases](https://learning.oreilly.com/library/view/javatm-puzzlers-traps/032133678X/ch02.html).

"_If you divide `a` by `b`, multiply the result by `b`, and add the remainder, you are back where you started [JLS 15.17.3](https://docs.oracle.com/javase/specs/jls/se14/html/jls-15.html#jls-15.17.3).  This identity makes perfect sense, but in combination with Java’s truncating integer division operator [JLS 15.17.2](https://docs.oracle.com/javase/specs/jls/se14/html/jls-15.html#jls-15.17.2), it implies that when the remainder operation returns a nonzero result, it has the same sign as its left operand._"
