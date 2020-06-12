---
layout: default
title: If/Else
parent: Control flow
nav_order: 1
permalink: docs/control-flow/if-else/
---

# If/Else
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## If (if/else) Control Flow Statement

The following program simulates a player playing a dice game.  Two dice are rolled and their sum, referred to as the score, is printed.

```java
package demo;

import java.util.Random;

public class App {

  public static void main( final String[] args ) {
    final int a = rollDice();
    final int b = rollDice();
    final int score = a + b;

    System.out.printf( "You scored %d%n", score );
  }

  private static int rollDice() {
    return random.nextInt( 6 ) + 1;
  }

  private static final Random random = new Random();
}
```

## If Example

The player will win the game if the player rolls `10` or higher.  Change the program, such that, it only prints the following message when the player wins.

```bash
You won!! You scored 10
```

The `if` statement can be used

```java
if ( score >= 10 ) {
  System.out.printf( "You won!! You scored %d%n", score );
}
```

Complete solution

```java
package demo;

import java.util.Random;

public class App {

  public static void main( final String[] args ) {
    final int a = rollDice();
    final int b = rollDice();
    final int score = a + b;

    if ( score >= 10 ) {
      System.out.printf( "You won!! You scored %d%n", score );
    }
  }

  private static int rollDice() {
    return random.nextInt( 6 ) + 1;
  }

  private static final Random random = new Random();
}
```

**Refactoring**

1. Create a function that returns `true` if the score is high enough, `false` otherwise

    ```java
      private static boolean hasWon( final int score ) {
        return score >= 10;
      }
    ```

1. Use the `hasWon()` function instead

    ```java
        if ( hasWon( score ) ) {
    ```

    Complete example

    ```java
    package demo;

    import java.util.Random;

    public class App {

      public static void main( final String[] args ) {
        final int a = rollDice();
        final int b = rollDice();
        final int score = a + b;

        if ( hasWon( score ) ) {
          System.out.printf( "You won!! You scored %d%n", score );
        }
      }

      public static boolean hasWon( final int score ) {
        return score >= 10;
      }

      public static int rollDice() {
        return random.nextInt( 6 ) + 1;
      }

      public static final Random random = new Random();
    }
    ```

## If/else Example

After trying the program, it was notices that nothing is shown on the screen when the player loses.

Display the follow message whenever the player scores lower than `10`.

```bash
Better luck next time!! You scored too low 9
```

The `else` statement can be added to the existing `if` statement

```java
if ( hasWon( score ) ) {
  System.out.printf( "You won!! You scored %d%n", score );
} else {
  System.out.printf( "Better luck next time!! You scored too low (%d)%n", score );
}
```

**Note that an `else` cannot exists without an `if` as is always the last block**.

Complete example

```java
package demo;

import java.util.Random;

public class App {

  public static void main( final String[] args ) {
    final int a = rollDice();
    final int b = rollDice();
    final int score = a + b;

    if ( hasWon( score ) ) {
      System.out.printf( "You won!! You scored %d%n", score );
    } else {
      System.out.printf( "Better luck next time!! You scored too low (%d)%n", score );
    }
  }

  public static boolean hasWon( final int score ) {
    return score >= 10;
  }

  private static int rollDice() {
    return random.nextInt( 6 ) + 1;
  }

  private static final Random random = new Random();
}
```

## If/else-if/else Example

Improve the program such that if a player scores `12`, then the program displays a message

```bash
Max score. You won a bonus!!  Well done.
```

If a player scores between `10` and `11` (both inclusive), the program shows the original message.

```bash
You won!! You scored 11
```

If the player scores below `10`, the program shows the original message.

```bash
Better luck next time!! You scored too low (9)
```

The `if/else-if/else` statement can be used in this case

```java
if ( hasWonWithBonus( score ) ) {
  System.out.println( "Max score. You won a bonus!!  Well done." );
} else if ( hasWon( score ) ) {
  System.out.printf( "You won!! You scored %d%n", score );
} else {
  System.out.printf( "Better luck next time!! You scored too low (%d)%n", score );
}
```

Complete solution

```java
package demo;

import java.util.Random;

public class App {

  public static void main( final String[] args ) {
    final int a = rollDice();
    final int b = rollDice();
    final int score = a + b;

    if ( hasWonWithBonus( score ) ) {
      System.out.println( "Max score. You won a bonus!!  Well done." );
    } else if ( hasWon( score ) ) {
      System.out.printf( "You won!! You scored %d%n", score );
    } else {
      System.out.printf( "Better luck next time!! You scored too low (%d)%n", score );
    }
  }

  public static boolean hasWonWithBonus( final int score ) {
    return score == 12;
  }

  public static boolean hasWon( final int score ) {
    return score >= 10;
  }

  private static int rollDice() {
    return random.nextInt( 6 ) + 1;
  }

  private static final Random random = new Random();
}
```

**Tip**

The `Random` produces a sequence based on its seed.  For example, if we seed `Random` with the seed `63`, then the player will score `12` and wins with bonus.

```java
private static final Random random = new Random( 63 );
```

The following table list some seeds that can be used to produce a deterministic result.

|`seed`|`a`|`b`|`score`|
|-----:|--:|--:|------:|
|   17 | 1 | 1 |     2 |
|   36 | 2 | 2 |     4 |
|    3 | 3 | 3 |     6 |
|   33 | 4 | 4 |     8 |
|    8 | 5 | 5 |    10 |
|   34 | 5 | 6 |    11 |
|    5 | 6 | 5 |    11 |
|   63 | 6 | 6 |    12 |

Random number generation is a hard problem and in some cases [hardware random number generators](https://en.wikipedia.org/wiki/Hardware_random_number_generator) are required for security or legislative purposes.

## Java Ternary Operator

Java has one ternary operator.

```java
package demo;

import java.util.Random;

public class App {

  public static void main( String[] args ) {
    final Random r = new Random();
    final int a = r.nextInt( 10 );
    final String s = a % 2 == 0 ? "even" : "odd";
    System.out.printf( "The number %d is an %s number%n", a, s );
  }
}
```

The above program will print.

```bash
The number 8 is an even number
```

The ternary operator has one catch that takes many by surprise.  Consider the following example, where the second and third statements are of different types.

```java
package demo;

public class App {

  public static void main( String[] args ) {
    char x = 'X';
    int i = 0;
    System.out.print( true ? x : 0 );
    System.out.print( false ? i : x );
  }
}
```

Will print.

```bash
X88
```

This example was taken from [PUZZLE 8: DOS EQUIS in Java™ Puzzlers: Traps, Pitfalls, and Corner Cases](https://learning.oreilly.com/library/view/javatm-puzzlers-traps/032133678X/ch02.html).

1. "_The answer lies in a dark corner of the specification for the conditional operator [JLS 15.25](https://docs.oracle.com/javase/specs/jls/se14/html/jls-15.html#jls-15.25).  Note that the types of the second and third operands are different from each other in both of the conditional expressions: `x` is of type `char`, whereas `0` and `i` are both of type `int`.  Mixed-type computation can be confusing.  Nowhere is this more apparent than in conditional expressions.  You might think that the result types of the two conditional expressions in this program would be identical, as their operand types are identical, though reversed, but it isn’t so._"

1. "_Putting the `final` modifier on the declaration for `i` would turn `i` into a constant expression, causing the program to print `XX`, but it would still be confusing.  To eliminate the confusion, it is best to change the type of `i` from `int` to `char`, avoiding the mixed-type computation._"


## Can we throw an exception from a ternary operator?

**🚧 Pending...**
