#

## TOC

1. [Setup](#setup)
1. [Classes and methods (static no OOP)](#classes-and-methods-static-no-oop)
1. [Properties (static no OOP)](#properties-static-no-oop)
1. [Mutable and Immutable](#mutable-and-immutable)
1. [Access Control](#access-control)
1. [Control Flow and Loops](#control-flow-and-loops)
1. [Exceptions](#exceptions)

## Setup

1. Clone Repo: [java-boot-camp-blank](https://github.com/albertattard/java-boot-camp-blank)

    ```bash
    $ git clone https://github.com/albertattard/java-boot-camp-blank.git
    ```

1. Open the repo in IDE

## Classes and methods (static no OOP)

Example (`Dice.java`)

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

Example (`App.java`)

```java
package demo;

import java.time.LocalTime;

public class App {
  public static void main( String[] args ) {
    printStartGameMessage();

    int a = Dice.roll();
    int b = Dice.roll();
    displayf( "You rolled %d and %d", a, b );
  }

  public static void printStartGameMessage() {
    System.out.println( "Game started.  Please roll the \uD83C\uDFB2" );
  }

  public static void display( String message ) {
    System.out.println( format( message ) );
  }

  public static void displayf( String format, Object... values ) {
    String formatted = String.format( format, values );
    display( formatted );
  }

  public static String format( String message ) {
    return String.format( "[%tH:%<tM:%<tS] %s%n", LocalTime.now(), message );
  }
}
```

Output

```bash
Game started.  Please roll the 🎲
[21:32:38] You rolled 5 and 2
```

## Properties (static no OOP)

Example

```java
package demo;

import java.util.Random;

public class App {

  public static void main( String[] args ) {
    int a = rollDice();
    System.out.printf( "You rolled %d%n", a );
  }

  public static int rollDice() {
    return random.nextInt( 6 ) + 1;
  }

  public static Random random = new Random();
}
```

Output

```bash
You rolled a 1
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

    /* Immutable (initialised after declared)*/
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

## Access Control

Example (`Dice.java`)

```java
package demo;

import java.util.Random;

class Dice {
  private static Random random = new Random();

  static int roll() {
    return random.nextInt( 6 ) + 1;
  }
}
```

Example (`App.java`)

```java
package demo;

public class App {

  public static void main( String[] args ) {
    int a = Dice.roll();
    System.out.printf( "You rolled a %d%n", a );
  }
}
```

Output

```bash
You rolled a 5
```

## Control Flow and Loops

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
