---
layout: default
title: Puzzle (Tweedledum)
parent: Operators
grand_parent: Data Types
nav_order: 1
permalink: docs/data-types/operators/puzzle-tweedledum
---

# Puzzle (Tweedledum)

Provide declarations for the variables `x` and `i` such that this is a legal statement:

```java
x += i;
```

but this is not:

```java
x = x + i;
```

This example was taken from [PUZZLE 9: TWEEDLEDUM in Java™ Puzzlers: Traps, Pitfalls, and Corner Cases](https://learning.oreilly.com/library/view/javatm-puzzlers-traps/032133678X/ch02.html).

"_Many programmers think that the first statement in this puzzle (`x += i`) is simply a shorthand for the second (`x = x + i`).  **This isn't quite true**.  Both of these statements are assignment expressions ([JLS 15.26](https://docs.oracle.com/javase/specs/jls/se14/html/jls-15.html#jls-15.26)).  The second statement uses the simple assignment operator (`=`), whereas the first uses a compound assignment operator.  The compound assignment operators are `+=`, `-=`, `*=`, `/=`, `%=`, `<<=`, `>>=`, `>>>=`, `&=`, `^=`, and `|=`.  The Java language specification says that the compound assignment `E1 op= E2` is equivalent to the simple assignment `E1 = (T) ((E1) op (E2))`, where `T` is the type of `E1`, except that `E1` is evaluated only once ([JLS 15.26.2](https://docs.oracle.com/javase/specs/jls/se14/html/jls-15.html#jls-15.26.2))._"

"_In other words, compound assignment expressions automatically cast the result of the computation they perform to the type of the variable on their left-hand side.  If the type of the result is identical to the type of the variable, the cast has no effect.  If, however, the type of the result is wider than that of the variable, the compound assignment operator performs a silent narrowing primitive conversion ([JLS 5.1.3](https://docs.oracle.com/javase/specs/jls/se14/html/jls-5.html#jls-5.1.3)).  Attempting to perform the equivalent simple assignment would generate a compilation error, with good reason._"
