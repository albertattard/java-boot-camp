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

## Mutable and Immutable

## Access Control

## Control Flow and Loops

## Exceptions
