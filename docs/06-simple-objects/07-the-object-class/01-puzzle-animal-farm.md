---
layout: default
title: Puzzle (Animal Farm)
parent: The object class
grand_parent: Simple objects
nav_order: 1
permalink: docs/data-types/operators/puzzle-animal-farm
---

# Puzzle (Animal Farm)

Consider the following example

```java
package demo;

public class App {
  public static void main( final String[] args ) {
    final String pig = "length: 10";
    final String dog = "length: " + pig.length();
    System.out.println( "Animals are equal: " + pig == dog );
  }
}
```

Given that both variables have the string value: `length: 10`, what would be the outcome of the above example?  Will it be `Animals are equal: true`, `Animals are equal: false` or something else?

```bash
false
```

This example was taken from [PUZZLE 13: ANIMAL FARM in Java™ Puzzlers: Traps, Pitfalls, and Corner Cases](https://learning.oreilly.com/library/view/javatm-puzzlers-traps/032133678X/ch03.html).

1. "_If you ran the program, you found that it prints `false` and nothing else.  It doesn't print `Animals are equal: `.  How could it not print this string literal, which is right there in black and white?  The `+` operator, whether used for addition or string concatenation, binds more tightly than the `==` operator.  Therefore, the parameter of the println method is evaluated from left to right._"
