# Classes, Methods and Control Flow

## TOC

1. [Setup](#setup)
1. [Classes and methods (static no OOP)](#classes-and-methods-static-no-oop)
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
    1. [Switch Control Flow Statement](#switch-control-flow-statement)
        1. [Switch Example](#switch-example)
        1. [Switch Fallthrough Example](#switch-fallthrough-example)
        1. [Switch Default Example](#switch-default-example)
        1. [Switch Expressions](#switch-expressions)
    1. [Loop and Control Flow Example](#loop-and-control-flow-example)
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

Both classes are defined in the same file, `A.java`, yet these are two different classes within the same package.

![One Source File Produces Two Class Files](assets/images/One%20Source%20File%20Produces%20Two%20Class%20Files.png)

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

An inner anonymous class is created within the `App` class.

```java
Runnable r = new Runnable() {
  @Override public void run() {
    System.out.printf( "The value of c is %d%n", c );
  }
};
```

This is compiled as  separate class file, `App$1.class`.

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

### Loop and Control Flow Example

Example

```java
package demo;

import java.util.Random;

public class App {

  public static void main( String[] args ) {

    boolean won = false;

    for ( int i = 0; i < 3; i++ ) {
      final int a = rollDice();
      final int b = rollDice();
      System.out.printf( "You rolled %d and %d%n", a, b );

      if ( a + b >= 10 ) {
        won = true;
        break;
      }

      System.out.println( "Not enough, please try again." );
    }

    if ( won ) {
      System.out.println( "You won!!" );
    } else {
      System.out.println( "Better luck next time" );
    }
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

The script file name dose not need to match the class name.

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
