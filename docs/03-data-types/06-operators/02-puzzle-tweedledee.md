---
layout: default
title: Puzzle (Tweedledee)
parent: Operators
grand_parent: Data Types
nav_order: 2
permalink: docs/data-types/operators/puzzle-tweedledee
---

# Puzzle (Tweedledee)

Contrariwise, provide declarations for the variables `x` and `i` such that this is a legal statement:

```java
x = x + i;
```

but this is not:

```java
x += i;
```

At first glance, this puzzle might appear to be the same as the [previous one](puzzle-tweedledum).  Rest assured, it's different.

This example was taken from [PUZZLE 10: TWEEDLEDEE in Java™ Puzzlers: Traps, Pitfalls, and Corner Cases](https://learning.oreilly.com/library/view/javatm-puzzlers-traps/032133678X/ch02.html).

"_Compound assignment operators require both operands to be primitives, such as `int`, or boxed primitives, such as `Integer`, with one exception: The `+=` operator allows its right-hand operand to be of any type if the variable on the left-hand side is of type `String`, in which case the operator performs string concatenation ([JLS 15.26.2](https://docs.oracle.com/javase/specs/jls/se14/html/jls-15.html#jls-15.26.2)).  The simple assignment operator (`=`) is much less picky when it comes to allowing object reference types on the left-hand side: You can use them to your heart's content so long as the expression on the right-hand side is assignment compatible with the variable on the left ([JLS 5.2](https://docs.oracle.com/javase/specs/jls/se14/html/jls-5.html#jls-5.2))._"
