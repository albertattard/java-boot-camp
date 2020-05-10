# Classes, Methods and Control Flow

## TOC

1. [Setup](#setup)
1. [Classes and methods (static no OOP)](#classes-and-methods-static-no-oop)
    1. [Is void a type?](#is-void-a-type)
1. [Properties (static no OOP)](#properties-static-no-oop)
1. [Mutable and Immutable](#mutable-and-immutable)
    1. [The final keyword](#the-final-keyword)
1. [Access Control](#access-control)
    1. [Classes Access Modifiers Table](#classes-access-modifiers-table)
    1. [Class Members Access Modifiers Table](#class-members-access-modifiers-table)
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
1. [Java Single File Execution](#java-single-file-execution)

## Setup

1. Clone Repo: [java-boot-camp-blank](https://github.com/albertattard/java-boot-camp-blank)

    ```bash
    $ git clone https://github.com/albertattard/java-boot-camp-blank.git
    ```

1. Open the repo in IDE

## Classes and methods (static no OOP)

Consider the following example

```java
package demo;

import java.time.LocalTime;
import java.util.Random;

public class App {
  public static void main( String[] args ) {
    System.out.printf( "[%tH:%<tM:%<tS] Game started%n", LocalTime.now() );
    System.out.printf( "[%tH:%<tM:%<tS] Please roll the \uD83C\uDFB2%n", LocalTime.now() );

    Random r = new Random();
    int a = r.nextInt( 6 ) + 1;
    int b = r.nextInt( 6 ) + 1;

    System.out.printf( "[%tH:%<tM:%<tS] You rolled %d and %d%n", LocalTime.now(), a, b );
  }
}
```

Output

```bash
[12:34:56] Game started
[12:34:56] Please roll the 🎲
[12:34:56] You rolled 2 and 1
```

**Observations**

1. The `main()` method is cluttered and cannot easily say what's happening

1. Cannot understand what the following is doing by simply reading the code

    ```java
    int a = r.nextInt( 6 ) + 1;
    ```

    We can deduct that this is related to rolling of dice based on the log messages preceding and following this statement

1. All output messages have the same format:

    ```java
    System.out.printf( "[%tH:%<tM:%<tS] message%n", LocalTime.now() );
    ```

**Refactoring**

1. Move the dice logic to a separate class

    Create a file called `Dice.java`

    ```java
    package demo;

    import java.util.Random;

    public class Dice {

      public static int roll() {
        Random r = new Random();
        return r.nextInt( 6 ) + 1;
      }
    }
    ```

    **Note that a class which is declared `public` should be in a file of the same name**, otherwise it will not compile.  The public class `Dice` must be in a file with the same name, `Dice.java`.

1. Use the new method `roll()` defined in the `Dice` class

    ```java
    package demo;

    import java.time.LocalTime;

    public class App {
      public static void main( String[] args ) {
        System.out.printf( "[%tH:%<tM:%<tS] Game started%n", LocalTime.now() );
        System.out.printf( "[%tH:%<tM:%<tS] Please roll the \uD83C\uDFB2%n", LocalTime.now() );

        int a = Dice.roll();
        int b = Dice.roll();

        System.out.printf( "[%tH:%<tM:%<tS] You rolled %d and %d%n", LocalTime.now(), a, b );
      }
    }
    ```

1. Move the messaging logic to a separate class

    Create a file called `Display.java`

    ```java
    package demo;

    import java.time.LocalTime;

    public class Display {
      public static void print( String message ) {
        System.out.printf( "[%tH:%<tM:%<tS] %s%n", LocalTime.now(), message );
      }
    }
    ```

1. Use the new method `print()` defined in the `Display` class

    ```java
    package demo;

    public class App {
      public static void main( String[] args ) {
        Display.print( "Game started" );
        Display.print( "Please roll the \uD83C\uDFB2" );

        int a = Dice.roll();
        int b = Dice.roll();

        /* We still had to format the string */
        Display.print( String.format( "You rolled %d and %d", a, b ) );
      }
    }
    ```

1. Add formatting support to the `Display` class

    ```java
      public static void printf( String pattern, Object... parameters ) {
        print( String.format( pattern, parameters ) );
      }
    ```

    Full example

    ```java
    package demo;

    import java.time.LocalTime;

    public class Display {
      public static void printf( String pattern, Object... parameters ) {
        print( String.format( pattern, parameters ) );
      }

      public static void print( String message ) {
        System.out.printf( "[%tH:%<tM:%<tS] %s%n", LocalTime.now(), message );
      }
    }
    ```

1. Use the new `printf()` method

    ```java
    package demo;

    public class App {
      public static void main( String[] args ) {
        Display.print( "Game started" );
        Display.print( "Please roll the \uD83C\uDFB2" );

        int a = Dice.roll();
        int b = Dice.roll();

        Display.printf( "You rolled %d and %d", a, b );
      }
    }
    ```

### Is void a type?

No.  The keyword `void` indicates that the method returns nothing.

This quite unique to Java as other languages always return a type.  The decision of having `void` as a non-type caused some complications in the newer versions of Java, such as lambda.

## Properties (static no OOP)

Consider the following program

```java
package demo;

import java.util.Random;

public class App {

  public static void main( String[] args ) {
    Random random = new Random();
    int a = random.nextInt( 6 ) + 1;
    int b = random.nextInt( 6 ) + 1;
    System.out.printf( "You rolled %d and %d%n", a, b );
  }
}
```

Output

```bash
You rolled 1 and 6
```

**Observation**

1. Even though the code is small and simple it is a bit cluttered

1. Cannot understand what the following is doing by simply reading the code

    ```java
    int a = r.nextInt( 6 ) + 1;
    ```

    We can deduct that this is related to rolling of dice based on the log messages following this statement

**Refactoring**

1. The dice rolling can be refactored into a separate method, making the code more readable

    ```java
    package demo;

    import java.util.Random;

    public class App {

      public static void main( String[] args ) {
        int a = rollDice();
        int b = rollDice();
        System.out.printf( "You rolled %d and %d%n", a, b );
      }

      public static int rollDice() {
        Random random = new Random();
        return random.nextInt( 6 ) + 1;
      }
    }
    ```

    The `main()` method is more readable now as you can read the code.  The following method calls tells the reader what's happening.

    ```java
    int a = rollDice();
    ```

    Cannot say the same for the previous version

    ```java
    int a = random.nextInt( 6 ) + 1;
    ```

1. The new change is creating an instance of `Random` every time it is called.

    Can we reuse the same instance?

    ```java
    package demo;

    import java.util.Random;

    public class App {

      public static void main( String[] args ) {
        int a = rollDice();
        int b = rollDice();
        System.out.printf( "You rolled %d and %d%n", a, b );
      }

      public static int rollDice() {
        return random.nextInt( 6 ) + 1;
      }

      public static Random random = new Random();
    }
    ```

## Mutable and Immutable

Example

```java
package demo;

public class App {

  public static void main( String[] args ) {
    /* Mutable */
    int a = 2;
    a++;

    /* Immutable */
    final int b = 3;

    /* Immutable (initialised after declared) */
    final int c;
    c = 3;

    System.out.printf( "a = %d%n", a );
    System.out.printf( "b = %d%n", b );
    System.out.printf( "c = %d%n", c );
  }
}
```

Output

```
a = 3
b = 3
c = 3
```

### The final keyword

The `final` keyword marks a variable as immutable.  This means that the variable's value, be it the primitive value itself or the reference, cannot be changed.  This means that the *Java stack* value, **and not the *Java heap* value**, cannot be modified.

**The `final` keyword affects the *Java stack* and not the *Java heap* contents**.

## Access Control

We know that the `Random` class created a pseudo random sequence.  This means that we can predict the next number to be drawn after making several observations.

Consider the following example.

```java
package demo;

import java.util.Random;

class Dice {
  static final Random random = new Random(1);

  static int roll() {
    return random.nextInt( 6 ) + 1;
  }
}
```

The `Random` object is initialised with a seed to simplify the example.  Both the `roll()` method and the `random` static field can be accessed.  An attacker can take advantage of that and force the next dice roll to be a `6`.

Consider the following example.

```java
package demo;

public class App {

  public static void main( String[] args ) {
    /* Skip some numbers */
    for ( int i = 0; i < 19; i++ ) {
      Dice.random.nextInt();
    }

    /* This will always roll a 6 */
    int a = Dice.roll();
    System.out.printf( "I rolled a %s%n", a );
  }
}
```

Observations

1. The attacker first called the `nextInt()` method `19` times.

    ```java
        for ( int i = 0; i < 19; i++ ) {
          Dice.random.nextInt();
        }
    ```

   The attacker knows that the 20th roll will yield a `6`.

1. The attacker then rolled the dice normally

    ```java
        int a = Dice.roll();
        System.out.printf( "I rolled a %s%n", a );
    ```

    and obtained the expected the attacker wanted.

    ```bash
    I rolled a 6
    ```

    The attacker can also skip ahead some numbers to make the opponent lose, by rolling a smaller number.

Using access modifies, access to classes and their members can be restricted.

Making the static field `random` `private` will not allow an attacker to access the static field directly.

```java
package demo;

import java.util.Random;

class Dice {
  private static final Random random = new Random();

  static int roll() {
    return random.nextInt( 6 ) + 1;
  }
}
```

The attacker cannot now access the `random` field.

**⚠️ THE FOLLOWING EXAMPLE WILL NOT COMPILE!!**

```java
package demo;

public class App {

  public static void main( String[] args ) {
    for ( int i = 0; i < 19; i++ ) {
      Dice.random.nextInt();
    }

    int a = Dice.roll();
    System.out.printf( "I rolled a %s%n", a );
  }
}
```

The following error will be produced

```bash
src/main/java/demo/App.java:7: error: random has private access in Dice
      Dice.random.nextInt();
          ^
```

### Classes Access Modifiers Table

| Access Modifier | Accessible From |
|-----------------|-----------------|
| `public`        | Anywhere        |
| (no modifier)   | same package    |

### Class Members Access Modifiers Table

| Access Modifier | From Same Class | From Same Package | From Subclass | From Anywhere |
|-----------------|:---------------:|:-----------------:|:-------------:|:-------------:|
| `public`        |       Yes       |       Yes         |      Yes      |      Yes      |
| `protected`     |       Yes       |       Yes         |      Yes      |       No      |
| (no modifier)   |       Yes       |       Yes         |       No      |       No      |
| `private`       |       Yes       |        No         |       No      |       No      |

Note that there can be more than one class within the same file.  Two or more classes in the same file are considered as classes in the same package.

**⚠️ THE FOLLOWING EXAMPLE WILL NOT COMPILE!!**

```java
package demo;

public class A {
  public static void printIt() {
    System.out.printf( "The value of c is %d%n", B.c );
  }
}

class B {
  private static int c = 7;
}
```

Both classes are defined in the same source file, `A.java`, yet these are two different classes within the same package.

```bash
$ tree build/classes/java
build/classes/java
└── main
    └── demo
        ├── A.class
        └── B.class
```

There is one exception to this rule.  Consider the following example.

```java
package demo;

public class App {

  private static int c = 7;

  public static void main( String[] args ) {
    Runnable r = new Runnable() {
      @Override public void run() {
        System.out.printf( "The value of c is %d%n", c );
      }
    };
    r.run();
  }
}
```

An inner anonymous class ([discussed in more depth when we cover objects](05%20-%20Objects.md#outer-inner-and-anonymous-classes)) is created within the `App` class.

```java
Runnable r = new Runnable() {
  @Override public void run() {
    System.out.printf( "The value of c is %d%n", c );
  }
};
```

This is compiled as a separate class file, `App$1.class`.

```bash
$ tree build/classes/java
build/classes/java
└── main
    └── demo
        ├── App$1.class
        └── App.class
```

Despite being a different class within the same package, the inner anonymous class is still allowed to access `private` members within the parent class.

More information about [access control can be found in this tutorial](https://docs.oracle.com/javase/tutorial/java/javaOO/accesscontrol.html).

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

Java 5 introduced may new features to the Java language, one of which was the foreach loop.

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

**⚠️ THE FOLLOWING PROGRAM COMPILES BUT THROWS ArrayIndexOutOfBoundsException!!**

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

#### Puzzle (Dupe of URL)

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

**Pending...**

#### Return

**Pending...**

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
    System.out.print( "Input a number: " );
    String input = "";
    try {
      input = readUserInput();
      final int number = Integer.parseInt( input );
      System.out.printf( "You have entered the number %d%n", number );
    } catch ( NumberFormatException e ) {
      System.out.printf( "Cannot parse the input '%s' into a number%n", input );
    } catch ( IOException e ) {
      System.out.println( "Failed to read user input due to a technical failure" );
    } finally {
      System.out.println( "I am always called before the try/catch block exists" );
    }
  }

  private static String readUserInput() throws IOException {
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

## Java Single File Execution

Java 11 introduced Java Single File Execution ([JEP-330](https://openjdk.java.net/jeps/330)) which enhanced the java launcher to run a program supplied as a single file of Java source code, including usage from within a script by means of "[shebang" files](https://openjdk.java.net/jeps/330#Shebang_files) and related techniques.

```java
$ vi hello
```

The script file name does not need to match the class name.

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
