---
layout: default
title: Puzzle (ABC)
parent: Arrays
grand_parent: Collections
nav_order: 99
permalink: docs/collections/arrays/puzzle-abc
---

# Puzzle (ABC)

```java
package demo;

public class App {
  public static void main( final String[] args ) {
    final String letters = "ABC";
    final char[] numbers = { '1', '2', '3' };
    System.out.println( letters + " easy as " + numbers );
  }
}
```

```bash
ABC easy as [C@3764951d
```

This example was taken from [PUZZLE 12: ABC in Java™ Puzzlers: Traps, Pitfalls, and Corner Cases](https://learning.oreilly.com/library/view/javatm-puzzlers-traps/032133678X/ch03.html).

"_The string concatenation operator is defined to perform string conversion on both of its operands and then to concatenate the resulting strings.  String conversion for object references, which include arrays, is defined as follows ([JLS 15.18.1.1](https://docs.oracle.com/javase/specs/jls/se14/html/jls-15.html#jls-15.18.1.1))._"

"_If the reference is `null`, it is converted to the string `"null"`.  Otherwise, the conversion is performed as if by an invocation of the `toString()` method of the referenced object with no arguments; but if the result of invoking the `toString()` method is `null`, then the string `"null"` is used instead._"

"_So what is the behavior of invoking `toString()` on a non-null `char` array?  Arrays inherit the `toString()` method from `Object` ([JLS 10.7](https://docs.oracle.com/javase/specs/jls/se14/html/jls-10.html#jls-10.7))._"
