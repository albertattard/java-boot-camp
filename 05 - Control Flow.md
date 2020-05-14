# Classes, Methods and Control Flow

## TOC

1. [Setup](#setup)
1. [Control Flow and Loops](#control-flow-and-loops)
    1. [If (if/else) Control Flow Statement](#if-ifelse-control-flow-statement)
        1. [If Example](#if-example)
        1. [If/else Example](#ifelse-example)
        1. [If/else-if/else Example](#ifelse-ifelse-example)
        1. [Java Ternary Operator](#java-ternary-operator)
    1. [Switch Control Flow Statement](#switch-control-flow-statement)
        1. [Switch Example](#switch-example)
        1. [Switch Fallthrough Example](#switch-fallthrough-example)
        1. [Switch Default Example](#switch-default-example)
        1. [Switch Expressions](#switch-expressions)
    1. [For Loop](#for-loop)
        1. [Puzzles (In the Loop)](#puzzles-in-the-loop)
    1. [While Loop](#while-loop)
        1. [Puzzle (Shifty i's)](#puzzle-shifty-is)
        1. [Puzzles (Looper)](#puzzles-looper)
        1. [Puzzle (Bride of Looper)](#puzzle-bride-of-looper)
        1. [Puzzle (Son of Looper)](#puzzle-son-of-looper)
        1. [Puzzle (Ghost of Looper)](#puzzle-ghost-of-looper)
    1. [Do/While Loop](#dowhile-loop)
    1. [Foreach Loop](#foreach-loop)
    1. [Nested Loops](#nested-loops)
    1. [Break, Continue, Labels and Return](#break-continue-labels-and-return)
        1. [Break](#break)
        1. [Label](#label)
            1. [Puzzle (Dupe of URL)](#puzzle-dupe-of-url)
        1. [Continue](#continue)
        1. [Return](#return)
    1. [Loop and Control Flow Examples](#loop-and-control-flow-examples)
        1. [How many rolls it takes to roll a 6?](#how-many-rolls-it-takes-to-roll-a-6)
        1. [A simple game with dice and random numbers](#a-simple-game-with-dice-and-random-numbers)
1. [Exceptions](#exceptions)
    1. [Alternative Approach](#alternative-approach)
1. [Java Single File Execution](#java-single-file-execution)

## Setup

1. Clone Repo: [java-boot-camp-blank](https://github.com/albertattard/java-boot-camp-blank)

    ```bash
    $ git clone https://github.com/albertattard/java-boot-camp-blank.git
    ```

1. Open the repo in IDE

## Control Flow and Loops

### If (if/else) Control Flow Statement

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

#### If Example

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

#### If/else Example

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

#### If/else-if/else Example

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

#### Java Ternary Operator

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

### Switch Control Flow Statement

Consider an application that prints a menu to the console and preforms the action selected by the user.

```java
package demo;

public class App {

  public static void main( final String[] args ) {
    System.out.println( "---------------------" );
    System.out.println( "Menu" );
    System.out.println( "---------------------" );
    System.out.println( " a c    Add Data" );
    System.out.println( " u      Update Data" );
    System.out.println( " x      Delete Data" );
    System.out.println( "---------------------" );

    final char input = 'a';
    System.out.printf( "User selected %s%n", input );
  }

  private static void addData() { /* add */ }

  private static void updateData() { /* update */ }

  private static void deleteData() { /* delete */ }
}
```

#### Switch Example

The `if/else-if/else` can be used to solve this problem, but the `switch` statement is a better fit

```java
switch ( input ) {
  case 'a':
    addData();
    break;
}
```

Complete solution

```java
package demo;

public class App {

  public static void main( final String[] args ) {
    System.out.println( "---------------------" );
    System.out.println( "Menu" );
    System.out.println( "---------------------" );
    System.out.println( " a c    Add Data" );
    System.out.println( " u      Update Data" );
    System.out.println( " x      Delete Data" );
    System.out.println( "---------------------" );

    final char input = 'a';

    switch ( input ) {
      case 'a':
        addData();
        break;
      case 'c':
        addData();
        break;
      case 'u':
        updateData();
        break;
      case 'x':
        deleteData();
        break;
    }
  }

  private static void addData() { /* add */ }

  private static void updateData() { /* update */ }

  private static void deleteData() { /* delete */ }
}
```

#### Switch Fallthrough Example

Both 'a' and 'c' call the `addData()` function.  The `switch` statement supports fallthrough which enables the switch to continue from the first match until this is stopped or reaches the end of the switch.

```java
switch ( input ) {
  case 'a':
  case 'c':
    addData();
    break;
}
```

Complete solution

```java
package demo;

public class App {

  public static void main( final String[] args ) {
    System.out.println( "---------------------" );
    System.out.println( "Menu" );
    System.out.println( "---------------------" );
    System.out.println( " a c    Add Data" );
    System.out.println( " u      Update Data" );
    System.out.println( " x      Delete Data" );
    System.out.println( "---------------------" );

    final char input = 'a';

    switch ( input ) {
      case 'a':
      case 'c':
        addData();
        break;
      case 'u':
        updateData();
        break;
      case 'x':
        deleteData();
        break;
    }
  }

  private static void addData() { /* add */ }

  private static void updateData() { /* update */ }

  private static void deleteData() { /* delete */ }
}
```

Fallthrough is a discouraged practice by some because it can lead to issues.  For example, if we forget the break between the cases, we may end up executing all cases.  I use the fallthrough option whenever I see fit as it.  With that said, one needs to be aware of the potential problem.

#### Switch Default Example

When the user input an invalid option, the program simple exits.  Improve the program such that it displays a message indicating that the input is invalid.

```bash
Invalid input provided!!
```

The `switch` statement provides the `default` block which captures any other cases.  The `default` block needs to be the last block, thus `break` statement is not required.

```java
switch ( input ) {
  case 'x':
    deleteData();
    break;
  default:
    System.out.println( "Invalid input provided!!" );
}
```

Complete solution

```java
package demo;

public class App {

  public static void main( final String[] args ) {
    System.out.println( "---------------------" );
    System.out.println( "Menu" );
    System.out.println( "---------------------" );
    System.out.println( " a c    Add Data" );
    System.out.println( " u      Update Data" );
    System.out.println( " x      Delete Data" );
    System.out.println( "---------------------" );

    final char input = 'z';

    switch ( input ) {
      case 'a':
      case 'c':
        addData();
        break;
      case 'u':
        updateData();
        break;
      case 'x':
        deleteData();
        break;
      default:
        System.out.println( "Invalid input provided!!" );
    }
  }

  private static void addData() { /* add */ }

  private static void updateData() { /* update */ }

  private static void deleteData() { /* delete */ }
}
```

#### Switch Expressions

Java 14 introduced [switch expressions (JEP 361)](https://openjdk.java.net/jeps/361)

Consider the following example

```java
package demo;

public class App {
  public static void main( final String[] args ) {
    final int a = 2;

    switch ( a ) {
      case 1:
      case 3:
        System.out.println( "Options 1 or 3" );
        break;
      case 2:
        System.out.println( "Option 2" );
        break;
      default:
        System.out.println( "Anything other than 1, 2 or 3" );
    }
  }
}
```

The switch statement is printing a `String` based on the value if variable `a`.

This can be converted such that the `switch` statement becomes and expression that evaluates to a value, `String` this time.

```java
package demo;

public class App {
  public static void main( final String[] args ) {
    final int a = 2;

    final String result = switch ( a ) {
      case 1, 3 -> "Options 1 or 3";
      case 2 -> "Option 2";
      default -> "Anything other than 1, 2 or 3";
    };

    System.out.println( result );
  }
}
```

Both examples will output

```bash
Option 2
```

### For Loop

A children's school asked us to write a small program than they can use to print the table for a given number.

Consider the following example.

```java
package demo;

public class App {
  public static void main( String[] args ) {
    printTableOf( 3 );
  }

  public static void printTableOf( int number ) {  }
}

```

The above program should print something like the following

```bash
----------------
 The table of 3
----------------
 [ 1 × 3]     3
 [ 2 × 3]     6
 [ 3 × 3]     9
 [ 4 × 3]    12
 [ 5 × 3]    15
 [ 6 × 3]    18
 [ 7 × 3]    21
 [ 8 × 3]    24
 [ 9 × 3]    27
 [10 × 3]    30
----------------
```

One solution would be to print the table for a given number as shown next.

```java
package demo;

public class App {
  public static void main( String[] args ) {
    printTableOf( 3 );
  }

  public static void printTableOf( int number ) {
    System.out.println( "----------------" );
    System.out.printf( " The table of %d%n", number );
    System.out.println( "----------------" );

    System.out.printf( " [%2s × %d] %5s%n", 1, number, number * 1 );
    System.out.printf( " [%2s × %d] %5s%n", 2, number, number * 2 );
    System.out.printf( " [%2s × %d] %5s%n", 3, number, number * 3 );
    System.out.printf( " [%2s × %d] %5s%n", 4, number, number * 4 );
    System.out.printf( " [%2s × %d] %5s%n", 5, number, number * 5 );
    System.out.printf( " [%2s × %d] %5s%n", 6, number, number * 6 );
    System.out.printf( " [%2s × %d] %5s%n", 7, number, number * 7 );
    System.out.printf( " [%2s × %d] %5s%n", 8, number, number * 8 );
    System.out.printf( " [%2s × %d] %5s%n", 9, number, number * 9 );
    System.out.printf( " [%2s × %d] %5s%n", 10, number, number * 10 );

    System.out.println( "----------------" );
  }
}
```

The above example has lots of repetition.  Another limitation the above code has is that we cannot adjust the number of rows to display.  The school may want to show the table of a number past `10`.

The above code can be improved by using loops instead.

```java
for ( int i = 1, n = number; i <= 10; i++, n += number ) {
  System.out.printf( " [%2s × %d] %5s%n", i, number, n );
}
```

Complete example.

```java
package demo;

public class App {
  public static void main( String[] args ) {
    printTableOf( 3 );
  }

  public static void printTableOf( int number ) {
    System.out.println( "----------------" );
    System.out.printf( " The table of %d%n", number );
    System.out.println( "----------------" );

    for ( int i = 1, n = number; i <= 10; i++, n += number ) {
      System.out.printf( " [%2s × %d] %5s%n", i, number, n );
    }

    System.out.println( "----------------" );
  }
}
```

#### Puzzles (In the Loop)

Consider the following example.

```java
package demo;

public class App {
  public static final int END = Integer.MAX_VALUE;
  public static final int START = END - 100;

  public static void main( String[] args ) {
    int count = 0;
    for ( int i = START; i <= END; i++ )
      count++;
    System.out.println( count );
  }
}
```

What will the above program prints?  Unfortunately, the program gets stuck in the for loop.

This example was taken from [PUZZLE 26: IN THE LOOP in Java™ Puzzlers: Traps, Pitfalls, and Corner Cases](https://learning.oreilly.com/library/view/javatm-puzzlers-traps/032133678X/ch04.html).

1. "_The problem is that the loop continues as long as the loop index (`i`) is less than or equal to `Integer.MAX_VALUE`, but all `int` variables are always less than or equal to `Integer.MAX_VALUE`.  It is, after all, defined to be the highest `int` value in existence. When `i` gets to `Integer.MAX_VALUE` and is incremented, it silently wraps around to `Integer.MIN_VALUE`._"

### While Loop

The same example used in the for loop can be written with a while loop instead.

```java
int i = 1, n = number;
while ( i <= 10 ) {
  System.out.printf( " [%2s × %d] %5s%n", i, number, n );

  i++;
  n += number;
}
```

Complete example.

```java
package demo;

public class App {
  public static void main( String[] args ) {
    printTableOf( 3 );
  }

  public static void printTableOf( int number ) {
    System.out.println( "----------------" );
    System.out.printf( " The table of %d%n", number );
    System.out.println( "----------------" );

    int i = 1, n = number;
    while ( i <= 10 ) {
      System.out.printf( " [%2s × %d] %5s%n", i, number, n );

      i++;
      n += number;
    }

    System.out.println( "----------------" );
  }
}
```

Note that different from the for loop, the variables `i` and `n` are available within the while loop and also outside the loop.  I personally prefer the for loop over the while loop just because of that.

#### Puzzle (Shifty i's)

Consider the following example.

```java
package demo;

public class App {
  public static void main( String[] args ) {
    int i = 0;
    while ( -1 << i != 0 )
      i++;
    System.out.println( i );
  }
}
```

Will this program print something, or will it loop until the end of times?

This example was taken from [PUZZLE 27: SHIFTY I’S in Java™ Puzzlers: Traps, Pitfalls, and Corner Cases](https://learning.oreilly.com/library/view/javatm-puzzlers-traps/032133678X/ch04.html).

1. "_The problem is that (`-1 << 32`) is equal to `−1` rather than `0`, because shift operators use only the five low-order bits of their right operand as the shift distance, or six bits if the left operand is a long ([JLS 15.19](https://docs.oracle.com/javase/specs/jls/se14/html/jls-15.html#jls-15.19)).  This applies to all three shift operators: `<<`, `>>`, and `>>>`.  The shift distance is always between `0` and `31`, or `0` and `63` if the left operand is a `long`.  It is calculated mod `32`, or mod `64` if the left operand is a `long`.  Attempting to shift an `int` value `32` bits or a long value `64` bits just returns the value itself.  There is no shift distance that discards all `32` bits of an `int` value or all `64` bits of a `long` value._"

#### Puzzles (Looper)

What declaration turns this loop into an infinite loop?

```java
while (i == i + 1) {
}
```

This example was taken from [PUZZLE 28: LOOPER in Java™ Puzzlers: Traps, Pitfalls, and Corner Cases](https://learning.oreilly.com/library/view/javatm-puzzlers-traps/032133678X/ch04.html).

1. "_Looking at the while loop, it really seems as though it ought to terminate immediately.  A number is never equal to itself plus `1`, right?  Well, what if the number is infinity?  Java mandates the use of IEEE 754 floating-point arithmetic ([IEEE-754](https://en.wikipedia.org/wiki/IEEE_754)), which lets you represent infinity as a `double` or `float`.  As we learned in school, infinity plus `1` is still infinity.  If `i` is initialized to infinity before the loop starts, the termination test (`i == i + 1`) evaluates to `true`, and the loop never terminates._"

    "_In fact, you don't have to initialize `i` to infinity to make the loop spin forever.  Any sufficiently large floating-point value will do; for example: `double i = 1.0e40;`_"

#### Puzzle (Bride of Looper)

Provide a declaration for i that turns this loop into an infinite loop:

```java
while (i != i) {
}
```

This example was taken from [PUZZLE 29: BRIDE OF LOOPER in Java™ Puzzlers: Traps, Pitfalls, and Corner Cases](https://learning.oreilly.com/library/view/javatm-puzzlers-traps/032133678X/ch04.html).

1. "_A number is always equal to itself, right?_"

    "_Right, but IEEE 754 floating-point arithmetic reserves a special value to represent a quantity that is not a number ([IEEE-754](https://en.wikipedia.org/wiki/IEEE_754)).  This value, known as `NaN` (short for "Not a Number"), is the value of all floating-point computations that do not have well-defined numeric values, such as `0.0 / 0.0`.  The specification says that `NaN` is not equal to any floating-point value, including itself ([JLS 15.21.1](https://docs.oracle.com/javase/specs/jls/se14/html/jls-15.html#jls-15.21.1)). Therefore, if `i` is initialized to `NaN` before the loop starts, the termination test (`i != i`) evaluates to `true`, and the loop never terminates._"

#### Puzzle (Son of Looper)

Provide a declaration for `i` that turns this loop into an infinite loop:

```java
while (i != i + 0) {
}
```

Unlike previous loopers, you must not use floating-point in your answer. In other words, you must not declare `i` to be of type `double` or `float`.

This example was taken from [PUZZLE 30: SON OF LOOPER in Java™ Puzzlers: Traps, Pitfalls, and Corner Cases](https://learning.oreilly.com/library/view/javatm-puzzlers-traps/032133678X/ch04.html).

1. "_The inescapable conclusion is that the type of `i` must be non-numeric, and therein lies the solution.  The only non-numeric type for which the `+` operator is defined is `String`.  The `+` operator is overloaded: For the `String` type, it performs not addition but string concatenation.  If one operand in the concatenation is of some type other than `String`, that operand is converted to a string prior to concatenation ([JLS 15.18.1](https://docs.oracle.com/javase/specs/jls/se14/html/jls-15.html#jls-15.18.1))._"

#### Puzzle (Ghost of Looper)

Provide a declaration for `i` that turns this loop into an infinite loop:

```java
while (i != 0)
    i >>>= 1;
```

This example was taken from [PUZZLE 31: GHOST OF LOOPER in Java™ Puzzlers: Traps, Pitfalls, and Corner Cases](https://learning.oreilly.com/library/view/javatm-puzzlers-traps/032133678X/ch04.html).

1. "_How could you possibly turn this into an infinite loop?  The key to solving this puzzle is that `>>>=` is a compound assignment operator. (The compound assignment operators are `*=`, `/=`, `%=`, `+=`, `−=`, `<<=`, `>>=`, `>>>=`, `&=`, `^=`, and `|=`.)  An unfortunate fact about the compound assignment operators is that they can silently perform narrowing primitive conversions ([JLS 15.26.2](https://docs.oracle.com/javase/specs/jls/se14/html/jls-15.html#jls-15.26.2)), which are conversions from one numeric type to a less expressive numeric type. **Narrowing primitive conversions can lose information about the magnitude or precision of numeric values** ([JLS 5.1.3](https://docs.oracle.com/javase/specs/jls/se14/html/jls-5.html#jls-5.1.3))._"

    "_To make this concrete, suppose that you precede the loop with the following declaration:

    ```java
    short i = -1;
    ```

    "_Because the initial value of `i` (`(short)0xffff`) is nonzero, the body of the loop is executed.  The first step in the execution of the shift operation is that the value of `i` is promoted to an `int`.  All arithmetic operations do this to operands of type `short`, `byte`, or `char`.  This promotion is a widening primitive conversion, so no information is lost. This promotion performs sign extension, so the resulting int value is `0xffffffff`.  This value is then shifted to the right by one bit without sign extension to yield the int value `0x7fffffff`.  Finally, this value is stored back into `i`.  In order to store the `int` value into the `short` variable, Java performs the dreaded narrowing primitive conversion, which simply lops off the high-order `16` bits of the value.  This leaves `(short)0xffff`, and we are back where we started.  The second and successive iterations of the loop behave identically, so the loop never terminates._"

### Do/While Loop

Another, not so popular loop is the do/while loop.  The same example can be written with the do/while loop.

```java
int i = 1, n = number;
do {
  System.out.printf( " [%2s × %d] %5s%n", i, number, n );

  i++;
  n += number;
} while ( i <= 10 );
```

Complete example

```java
package demo;

public class App {
  public static void main( String[] args ) {
    printTableOf( 3 );
  }

  public static void printTableOf( int number ) {
    System.out.println( "----------------" );
    System.out.printf( " The table of %d%n", number );
    System.out.println( "----------------" );

    int i = 1, n = number;
    do {
      System.out.printf( " [%2s × %d] %5s%n", i, number, n );

      i++;
      n += number;
    } while ( i <= 10 );

    System.out.println( "----------------" );
  }
}
```

Note that in the do/while the body of the loop is at least executed once, even if the condition is `false`.

```java
package demo;

public class App {
  public static void main( String[] args ) {
    do {
      System.out.println( "The body of the do/while is always executed at least once" );
    } while ( false );
  }
}
```

The above example will print

```bash
The body of the do/while is always executed at least once
```

### Foreach Loop

Java 5 introduced many new features to the Java language, one of which was the foreach loop.

```java
package demo;

public class App {
  public static void main( String[] args ) {
    int[] a = { 1, 2, 3, 4, 5 };
    for ( int i : a ) {
      System.out.println( i );
    }
  }
}
```

One of the advantages of the foreach loop is that you do not need to worry about the end of the array.  A common mistake when looping an array is exceeding the array's length as shown next.

**⚠️ THE FOLLOWING PROGRAM COMPILES BUT THROWS AN ArrayIndexOutOfBoundsException!!**

```java
package demo;

public class App {
  public static void main( String[] args ) {
    int[] a = { 1, 2, 3, 4, 5 };
    for ( int i = 0; i <= a.length; i++ ) {
      System.out.println( a[i] );
    }
  }
}
```

```bash
Exception in thread "main" java.lang.ArrayIndexOutOfBoundsException: Index 5 out of bounds for length 5
	at demo.App.main(App.java:7)
```

The foreach loop is immune to this problem, but it comes short to provide the current array index.  When iterating with a foreach loop, you do not have access to the array index as this is handled internally by the foreach loop.

The foreach loop returns the array's values and hides the array.  This means that we cannot work on the array.  For example, we cannot modify the contents of an array using a foreach loop.

Consider the following example.

```java
package demo;

import java.util.Arrays;

public class App {
  public static void main( String[] args ) {
    int[] a = { 1, 2, 3, 4, 5 };
    for ( int i = 0; i < a.length; i++ ) {
      a[i]++;
    }

    System.out.println( Arrays.toString( a ) );
  }
}
```

The above cannot be achieved using a foreach loop.

### Nested Loops

The children's school liked our program and would like to create another program that prints the whole table, starting from `1` until `10`, as shown next.

```bash
   |    1   2   3   4   5   6   7   8   9  10
---+-----------------------------------------
 1 |    1   2   3   4   5   6   7   8   9  10
 2 |    2   4   6   8  10  12  14  16  18  20
 3 |    3   6   9  12  15  18  21  24  27  30
 4 |    4   8  12  16  20  24  28  32  36  40
 5 |    5  10  15  20  25  30  35  40  45  50
 6 |    6  12  18  24  30  36  42  48  54  60
 7 |    7  14  21  28  35  42  49  56  63  70
 8 |    8  16  24  32  40  48  56  64  72  80
 9 |    9  18  27  36  45  54  63  72  81  90
10 |   10  20  30  40  50  60  70  80  90 100
```

Nested loops can solve this problem.

```java
private static void printTable() {
  for ( int i = 1; i <= 10; i++ ) {
    System.out.printf( "%2s | ", i );

    for ( int j = 1; j <= 10; j++ ) {
      System.out.printf( " %3s", i * j );
    }

    System.out.println();
  }
}
```

Full example

```java
package demo;

public class App {

  public static void main( String[] args ) {
    printHeader();
    printSeparator();
    printTable();
  }

  private static void printHeader() {
    System.out.printf( "   | " );
    for ( int i = 1; i <= 10; i++ ) {
      System.out.printf( " %3s", i );
    }
    System.out.println();
  }

  private static void printSeparator() {
    for ( int i = 0; i < 45; i++ ) {
      final String s = i == 3 ? "+" : "-";
      System.out.print( s );
    }
    System.out.println();
  }

  private static void printTable() {
    for ( int i = 1; i <= 10; i++ ) {
      System.out.printf( "%2s | ", i );

      for ( int j = 1; j <= 10; j++ ) {
        System.out.printf( " %3s", i * j );
      }

      System.out.println();
    }
  }
}
```

### Break, Continue, Labels and Return

#### Break

Consider the following code example.

```java
package demo;

public class App {

  public static void main( String[] args ) {
    for ( int i = 0; i < 5; i++ ) {
      for ( int j = 0; j < 5; j++ ) {
        if ( j == 4 ) {
          display( i, j );
          break;
        }
      }
    }
  }

  private static void display( int i, int j ) {
    System.out.printf( "i=%d and j=%d%n", i, j );
  }
}
```

The above code will print the following.

```bash
i=0 and j=4
i=1 and j=4
i=2 and j=4
i=3 and j=4
i=4 and j=4
```

The `break` keyword breaks the inner loop but the outer loop is unaffected.  Use [labels section](#label) to control which loop to break.

#### Label

Blocks can be labelled, as defined by [JLS 14.7](https://docs.oracle.com/javase/specs/jls/se14/html/jls-14.html#jls-14.7).

```java
package demo;

public class App {

  public static void main( String[] args ) {
    blockLabel:
    {
      System.out.println( "a. Code, within the block, before the break" );

      if ( true ) {
        break blockLabel;
      }

      System.out.println( "b. Code, within the block, but after the break" );
    }

    System.out.println( "c. Code, right after the block" );
  }
}
```

The above will print.

```bash
a. Code, within the block, before the break
c. Code, right after the block
```

Labels can be used with loops too.

```java
package demo;

public class App {

  public static void main( String[] args ) {
    outerLoop:
    for ( int i = 0; i < 5; i++ ) {
      for ( int j = 0; j < 5; j++ ) {
        if ( j == 4 ) {
          display( i, j );
          break outerLoop;
        }
      }
    }
  }

  private static void display( int i, int j ) {
    System.out.printf( "i=%d and j=%d%n", i, j );
  }
}
```

The above will print

```bash
i=0 and j=4
```

##### Puzzle (Dupe of URL)

Consider the following example.

```bash
package demo;

public class App {
  public static void main( String[] args ) {
    System.out.print("chrome:");
    http://www.google.com;
    System.out.println(":maximize");
  }
}
```

Will this program compile and if it does, what will it print?

```bash
chrome::maximize
```

This example was taken from [PUZZLE 22: DUPE OF URL in Java™ Puzzlers: Traps, Pitfalls, and Corner Cases](https://learning.oreilly.com/library/view/javatm-puzzlers-traps/032133678X/ch03.html).

1. "_This is a bit of a trick question.  The program doesn't do anything special.  It simply prints `chrome::maximize`.  The URL that appears in the middle of the program is a statement label ([JLS 14.7](https://docs.oracle.com/javase/specs/jls/se14/html/jls-14.html#jls-14.7)) followed by an end-of-line comment ([JLS 3.7](https://docs.oracle.com/javase/specs/jls/se14/html/jls-3.html#jls-3.7)).  Labels are rarely needed in Java, which thankfully lacks a goto statement.  The `"little-known feature of the Java programming language"` to which the puzzle refers is that you are allowed to put a label on any statement. This program labels an expression statement, which is legal but useless._"

#### Continue

Consider the following example.

```java
package demo;

public class App {

  public static void main( String[] args ) {
    for ( int i = 1; i <= 10; i++ ) {
      if ( isMultipleOf3( i ) ) {
        continue;
      }

      System.out.printf( "i=%s%n", i );
    }
  }

  public static boolean isMultipleOf3( int a ) {
    return a % 3 == 0;
  }
}
```

Will skip all multiple of `3`

```bash
i=1
i=2
i=4
i=5
i=7
i=8
i=10
```

The `continue` keyword can be used with labels but cannot be used outside of a loop.

#### Return

The `return` keyword can be used from within a loop to exit from the metho and, possibly return a value.  **The `return` keyword will always exit from the current method**.

Consider the following example.

```java
private static int findIndexOf( final String[] names, final String name ) {
  for ( int i = 0; i < names.length; i++ ) {
    if ( name.equalsIgnoreCase( names[i] ) ) {
      return i;
    }
  }

  return -1;
}
```

The function loops through the array until it finds an entry in the given array.  If the name is found in the given array, then the array index for the given name is returned, otherwise it will return `-1`.

```java
package demo;

public class App {

  public static void main( final String[] args ) {
    final String name = "Jade";
    final String[] names = { "Aden", "Jade", "Peter", "Jane" };
    final int index = findIndexOf( names, name );

    if ( index == -1 ) {
      displayf( "The name %s was not found", name );
    } else {
      displayf( "The name %s was found at index: %d", name, index );
    }
  }

  private static int findIndexOf( final String[] names, final String name ) {
    for ( int i = 0; i < names.length; i++ ) {
      if ( name.equalsIgnoreCase( names[i] ) ) {
        return i;
      }
    }

    return -1;
  }

  private static void displayf( final String pattern, final Object... parameters ) {
    System.out.println( String.format( pattern, parameters ) );
  }
}
```

The above example will print

```bash
The name Mary was found at index: 1
```

### Loop and Control Flow Examples

#### How many rolls it takes to roll a 6?

Write a small program that counts the number of times it takes to roll a `6`, using an unseeded instance of `Random`.

Solution

```java
package demo;

import java.util.Random;

public class App {

  public static void main( String[] args ) {
    for ( int i = 1; ; i++ ) {
      int r = rollDice();
      if ( r == 6 ) {
        System.out.printf( "Rolled a 6 after %d tries%n", i );
        break;
      }
    }
  }

  private static int rollDice() {
    return random.nextInt( 6 ) + 1;
  }

  private static final Random random = new Random();
}
```

#### A simple game with dice and random numbers

Using `Random` as a source of input, write a simple game where the player is given three chances to roll `10` or above.  If the players rolls `10` or above, the program should print the following.

```bash
You won!!
```

If the player does not beat the game within three chances, the program should print.

```bash
Better luck next time
```

If the sum of the rolled dice is less than `10`, then the program should print the following and try again.

```bash
Not enough, please try again.
```

Every time the dice are rolled, the program should print the numbers rolled.

```bash
You rolled 1 and 2
```

Solution

```java
package demo;

import java.util.Random;

public class App {

  public static void main( String[] args ) {

    boolean won = false;

    for ( int i = 0; i < 3; i++ ) {
      final int a = rollDice();
      final int b = rollDice();
      displayf( "You rolled %d and %d%n", a, b );

      if ( hasWon( a, b ) ) {
        won = true;
        break;
      }

      display( "Not enough, please try again." );
    }

    if ( won ) {
      display( "You won!!" );
    } else {
      display( "Better luck next time" );
    }
  }

  private static void displayf( String pattern, Object... parameters ) {
    display( String.format( pattern, parameters ) );
  }

  private static void display( String message ) {
    System.out.println( message );
  }

  private static boolean hasWon( int a, int b ) {
    return a + b >= 10;
  }

  private static int rollDice() {
    return random.nextInt( 6 ) + 1;
  }

  private static final Random random = new Random();
}
```

The following example shows an alternative approach using the `return` instead of `break`.

```java
package demo;

import java.util.Random;

public class App {

  public static void main( String[] args ) {
    for ( int i = 0; i < 3; i++ ) {
      final int a = rollDice();
      final int b = rollDice();
      displayf( "You rolled %d and %d%n", a, b );

      if ( hasWon( a, b ) ) {
        display( "You won!!" );
        return;
      }

      display( "Not enough, please try again." );
    }

    display( "Better luck next time" );
  }

  private static void displayf( String pattern, Object... parameters ) {
    display( String.format( pattern, parameters ) );
  }

  private static void display( String message ) {
    System.out.println( message );
  }

  private static boolean hasWon( int a, int b ) {
    return a + b >= 10;
  }

  private static int rollDice() {
    return random.nextInt( 6 ) + 1;
  }

  private static final Random random = new Random();
}
```

Output

```bash
You rolled 1 and 3
Not enough, please try again.
You rolled 5 and 6
You won!!
```

## Exceptions

Example

```java
package demo;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

public class App {

  public static void main( String[] args ) {
    String input = "";
    try {
      input = readUserInput( "Input a number: " );
      final int number = Integer.parseInt( input );
      displayf( "You have entered the number %d", number );
    } catch ( NumberFormatException e ) {
      displayf( "Cannot parse the input '%s' into a number", input );
    } catch ( IOException e ) {
      display( "Failed to read user input due to a technical failure" );
    } finally {
      display( "I am always called before the try/catch block exists" );
    }
  }

  private static void displayf( String pattern, Object... parameters ) {
    display( String.format( pattern, parameters ) );
  }

  private static void display( String message ) {
    System.out.println( message );
  }

  private static String readUserInput( String prompt ) throws IOException {
    System.out.print( prompt );
    return reader.readLine();
  }

  private static final BufferedReader reader =
    new BufferedReader( new InputStreamReader( System.in, StandardCharsets.UTF_8 ) );
}
```

Output (for the input `4`)

```bash
Input a number: 4
You have entered the number 4
I am always called before the try/catch block exists
```

Output (for the input `Hello there`)

```bash
Input a number: Hello there
Cannot parse the input 'Hello there' into a number
I am always called before the try/catch block exists
```

### Alternative Approach

**Pending...**

Java exceptions are an expensive operation and alternative approach should be preferred to signal failures when possible.

```groovy
dependencies {
  implementation('io.vavr:vavr:1.0.0-alpha-3')
  testImplementation 'org.junit.jupiter:junit-jupiter:5.7.0-M1'
}
```

## Java Single File Execution

Java 11 introduced Java Single File Execution ([JEP-330](https://openjdk.java.net/jeps/330)) which enhanced the java launcher to run a program supplied as a single file of Java source code, including usage from within a script by means of "[shebang" files](https://openjdk.java.net/jeps/330#Shebang_files) and related techniques.

```java
$ vi hello
```

**The script file name does not need to match the class name**.

```jshelllanguage
#!/usr/bin/java --source 11

public class HelloWorld {
  public static void main(String[] args) {
    System.out.println("Hello World!!");
  }
}
```

The script needs to be executable

```bash
$ chmod +x hello
```

and can be executed like any other script

```bash
$ ./hello

Hello World!!
```

The [gist x_init](https://gist.github.com/albertattard/3f9a66faf2a90dc2bf6376d37c7c6052) shows a more elaborated example.
