---
layout: default
title: Enumerations
parent: Data Types
nav_order: 10
permalink: docs/data-types/enumerations/
---

# Enumerations
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Rock paper scissors

The tests require [Junit5](https://mvnrepository.com/artifact/org.junit.jupiter/junit-jupiter)

```groovy
dependencies {
  testImplementation 'org.junit.jupiter:junit-jupiter:5.7.0-M1'
}
```

Consider the [rock paper scissors hand game](https://en.wikipedia.org/wiki/Rock_paper_scissors).

![Rock Paper Scissors Game Rules](assets/images/Rock%20Paper%20Scissors.png)

How can we represent the hand played (*rock*, *paper* or *scissors*) and the game outcome (*draw*, *player 1 wins* or *player 2 wins*).

A common approach, before Java 1.5, was to create a constant table where an `int` value will represent a state.

1. Hand constants

    | Hand     | Value |
    |----------|------:|
    | Paper    |     1 |
    | Scissors |     2 |
    | Rock     |     3 |

1. Outcome constants

    | Outcome      | Value |
    |--------------|------:|
    | Draw         |     0 |
    | Player 1 Win |     1 |
    | Player 2 Win |     2 |

This simplifies coding as we can compare `int`s

| Player 1 | Player 2 | Result |
|---------:|---------:|-------:|
|        1 |        1 |      0 |
|        1 |        2 |      2 |
|        1 |        3 |      1 |
|        2 |        1 |      1 |
|        2 |        2 |      0 |
|        2 |        3 |      2 |
|        3 |        1 |      2 |
|        3 |        2 |      1 |
|        3 |        3 |      0 |

Example

```java
package demo;

public class App {

  public static int determineOutcome( final int player1, final int player2 ) {
    if ( player1 == player2 ) {
      return 0;
    }

    return switch ( player1 ) {
      case 1 -> player2 == 3 ? 1 : 2;
      case 2 -> player2 == 1 ? 1 : 2;
      default -> player2 == 2 ? 1 : 2;
    };
  }
}
```

The following tests confirms that our implementation is correct

```java
package demo;

import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.junit.jupiter.params.provider.ValueSource;

import static demo.App.determineOutcome;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class AppTest {

  @ValueSource( ints = { 1, 2, 3 } )
  @ParameterizedTest( name = "should return 0 when both players play the same hand {0}" )
  void shouldReturnDraw( final int hand ) {
    assertEquals( 0, determineOutcome( hand, hand ) );
  }

  @CsvSource( { "2,1", "3,2", "1,3" } )
  @ParameterizedTest( name = "should return 1 when player1 plays {0} and player 2 plays {1}" )
  void shouldReturnWinPlayer1( final int player1, final int player2 ) {
    assertEquals( 1, determineOutcome( player1, player2 ) );
  }

  @CsvSource( { "1,2", "2,3", "3,1" } )
  @ParameterizedTest( name = "should return 2 when player1 plays {0} and player 2 plays {1}" )
  void shouldReturnWinPlayer2( final int player1, final int player2 ) {
    assertEquals( 2, determineOutcome( player1, player2 ) );
  }
}
```

The above is very hard to read.  By just looking the table, it is hard to understand what is what.

| Player 1 | Player 2 | Result |
|---------:|---------:|-------:|
|        1 |        1 |      0 |
|        1 |        2 |      2 |
|        1 |        3 |      1 |
|        2 |        1 |      1 |
|        2 |        2 |      0 |
|        2 |        3 |      2 |
|        3 |        1 |      2 |
|        3 |        2 |      1 |
|        3 |        3 |      0 |

A better option (always before Java 1.5) is to use `int` constants

1. Hand constants

    | Hand     | Constant | Value |
    |----------|----------|------:|
    | Paper    | PAPER    |     1 |
    | Scissors | SCISSORS |     2 |
    | Rock     | ROCK     |     3 |

1. Outcome constants

    | Outcome      | Constant     | Value |
    |--------------|--------------|------:|
    | Draw         | DRAW         |     0 |
    | Player 1 Win | WIN_PLAYER_1 |     1 |
    | Player 2 Win | WIN_PLAYER_2 |     2 |

The table is now can be easily read and understood

| Player 1 | Player 2 | Result       |
|----------|----------|--------------|
| PAPER    | PAPER    | DRAW         |
| PAPER    | SCISSORS | WIN_PLAYER_2 |
| PAPER    | ROCK     | WIN_PLAYER_1 |
| SCISSORS | PAPER    | WIN_PLAYER_1 |
| SCISSORS | SCISSORS | DRAW         |
| SCISSORS | ROCK     | WIN_PLAYER_2 |
| ROCK     | PAPER    | WIN_PLAYER_2 |
| ROCK     | SCISSORS | WIN_PLAYER_1 |
| ROCK     | ROCK     | DRAW         |

Refactored the code to use the `int` constants instead.

```java
package demo;

public class App {

  /* Outcome constants */
  public static final int DRAW = 0;
  public static final int WIN_PLAYER_1 = 1;
  public static final int WIN_PLAYER_2 = 2;

  /* Hand constants */
  public static final int PAPER = 1;
  public static final int SCISSORS = 2;
  public static final int ROCK = 3;

  public static int determineOutcome( final int player1, final int player2 ) {
    if ( player1 == player2 ) {
      return DRAW;
    }

    return switch ( player1 ) {
      case PAPER -> player2 == ROCK ? WIN_PLAYER_1 : WIN_PLAYER_2;
      case SCISSORS -> player2 == PAPER ? WIN_PLAYER_1 : WIN_PLAYER_2;
      default -> player2 == SCISSORS ? WIN_PLAYER_1 : WIN_PLAYER_2;
    };
  }
}
```

Update the tests to make use of the `int` constants instead.

```java
package demo;

import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.junit.jupiter.params.provider.ValueSource;

import static demo.App.DRAW;
import static demo.App.PAPER;
import static demo.App.ROCK;
import static demo.App.SCISSORS;
import static demo.App.WIN_PLAYER_1;
import static demo.App.WIN_PLAYER_2;
import static demo.App.determineOutcome;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class AppTest {

  @ValueSource( ints = { PAPER, SCISSORS, ROCK } )
  @ParameterizedTest( name = "should return DRAW (0) when both players play the same hand {0}" )
  void shouldReturnDraw( final int hand ) {
    assertEquals( DRAW, determineOutcome( hand, hand ) );
  }

  @CsvSource( { "2,1", "3,2", "1,3" } )
  @ParameterizedTest( name = "should return WIN_PLAYER_1 (1) when player1 plays {0} and player 2 plays {1}" )
  void shouldReturnWinPlayer1( final int player1, final int player2 ) {
    assertEquals( WIN_PLAYER_1, determineOutcome( player1, player2 ) );
  }

  @CsvSource( { "1,2", "2,3", "3,1" } )
  @ParameterizedTest( name = "should return WIN_PLAYER_2 (2) when player1 plays {0} and player 2 plays {1}" )
  void shouldReturnWinPlayer2( int player1, int player2 ) {
    assertEquals( WIN_PLAYER_2, determineOutcome( player1, player2 ) );
  }
}
```

[Java 5 introduced Enums](https://docs.oracle.com/javase/1.5.0/docs/guide/language/enums.html) which simplifies the above problem.

Refactor the current solution into using enums

1. **Refactor Outcome**

    Replace the imports in the `AppTest` class

    ```java
    import static demo.App.DRAW;
    import static demo.App.WIN_PLAYER_1;
    import static demo.App.WIN_PLAYER_2;
    ```

    with

    ```java
    import static demo.App.Outcome.DRAW;
    import static demo.App.Outcome.WIN_PLAYER_1;
    import static demo.App.Outcome.WIN_PLAYER_2;
    ```

    The above will not compile until we add the enum to the `App` class.

    Replace the outcome constants with an enum

    ```java
    package demo;

    public class App {

      public enum Outcome {
        DRAW,
        WIN_PLAYER_1,
        WIN_PLAYER_2;
      }

      public static final int PAPER = 1;
      public static final int SCISSORS = 2;
      public static final int ROCK = 3;

      public static Outcome determineOutcome( final int player1, final int player2 ) {
        if ( player1 == player2 ) {
          return Outcome.DRAW;
        }

        return switch ( player1 ) {
          case PAPER -> player2 == ROCK ? Outcome.WIN_PLAYER_1 : Outcome.WIN_PLAYER_2;
          case SCISSORS -> player2 == PAPER ? Outcome.WIN_PLAYER_1 : Outcome.WIN_PLAYER_2;
          default -> player2 == SCISSORS ? Outcome.WIN_PLAYER_1 : Outcome.WIN_PLAYER_2;
        };
      }
    }
    ```

    Note that the transition between `int` constants and enums is quite simple.  Kept the same names, and simply moved them inside the enum.

1. **Refactor Hand**

    Use the `@EnumSource( Hand.class )` to test against all instances of the `Hand` enum

    ```java
      @EnumSource( Hand.class )
      @ParameterizedTest( name = "should return DRAW when both players play the same hand {0}" )
      void shouldReturnDraw( final Hand hand ) {
        assertEquals( DRAW, determineOutcome( hand, hand ) );
      }
    ```

    Use the enum name as input to the `@CsvSource`

    ```java
      @CsvSource( { "PAPER,ROCK", "SCISSORS,PAPER", "ROCK,SCISSORS" } )
      @ParameterizedTest( name = "should return WIN_PLAYER_1 when player1 plays {0} and player 2 plays {1}" )
      void shouldReturnWinPlayer1( final Hand player1, final Hand player2 ) {
        assertEquals( WIN_PLAYER_1, determineOutcome( player1, player2 ) );
      }
    ```

    Complete example

    ```java
    package demo;

    import org.junit.jupiter.params.ParameterizedTest;
    import org.junit.jupiter.params.provider.CsvSource;
    import org.junit.jupiter.params.provider.EnumSource;

    import static demo.App.Hand;
    import static demo.App.Outcome.DRAW;
    import static demo.App.Outcome.WIN_PLAYER_1;
    import static demo.App.Outcome.WIN_PLAYER_2;
    import static demo.App.determineOutcome;
    import static org.junit.jupiter.api.Assertions.assertEquals;

    public class AppTest {

      @EnumSource( Hand.class )
      @ParameterizedTest( name = "should return DRAW when both players play the same hand {0}" )
      void shouldReturnDraw( final Hand hand ) {
        assertEquals( DRAW, determineOutcome( hand, hand ) );
      }

      @CsvSource( { "PAPER,ROCK", "SCISSORS,PAPER", "ROCK,SCISSORS" } )
      @ParameterizedTest( name = "should return WIN_PLAYER_1 when player1 plays {0} and player 2 plays {1}" )
      void shouldReturnWinPlayer1( final Hand player1, final Hand player2 ) {
        assertEquals( WIN_PLAYER_1, determineOutcome( player1, player2 ) );
      }

      @CsvSource( { "ROCK,PAPER", "PAPER,SCISSORS", "SCISSORS,ROCK" } )
      @ParameterizedTest( name = "should return WIN_PLAYER_2 when player1 plays {0} and player 2 plays {1}" )
      void shouldReturnWinPlayer2( final Hand player1, final Hand player2 ) {
        assertEquals( WIN_PLAYER_2, determineOutcome( player1, player2 ) );
      }
    }
    ```

    Replace the hand `int` constants with the `Hand` enum

    ```java
    package demo;

    public class App {

      public enum Outcome {
        DRAW,
        WIN_PLAYER_1,
        WIN_PLAYER_2;
      }

      public enum Hand {
        PAPER,
        SCISSORS,
        ROCK;
      }

      public static Outcome determineOutcome( final Hand player1, final Hand player2 ) {
        if ( player1 == player2 ) {
          return Outcome.DRAW;
        }

        return switch ( player1 ) {
          case PAPER -> player2 == Hand.ROCK ? Outcome.WIN_PLAYER_1 : Outcome.WIN_PLAYER_2;
          case SCISSORS -> player2 == Hand.PAPER ? Outcome.WIN_PLAYER_1 : Outcome.WIN_PLAYER_2;
          case ROCK -> player2 == Hand.SCISSORS ? Outcome.WIN_PLAYER_1 : Outcome.WIN_PLAYER_2;
        };
      }
    }
    ```

## Can we create an instance of an enum?

Java does not allow us to create new instances of any enum.  Consider the following example.

{% include custom/dose_not_compile.html %}

```java
package demo;

import java.awt.Point;

public class App {

  public enum Hand {
    PAPER,
    SCISSORS,
    ROCK;
  }

  public static void main( final String[] args ) {
    /* We can create instance of the point class */
    final Point p = new Point( 1, 2 );

    /* We cannot create an instance of an enum */
    final Hand h = new Hand();
  }
}
```

The above will not compile as we cannot create an instance of an enum.

```bash
src/main/java/demo/App.java:18: error: enum types may not be instantiated
    final Hand h = new Hand();
                   ^
```

We can only use the existing enum constants and cannot create new one.

## Enums in Java can have methods

The `determineOutcome()` method can be moved to the `Hand` enum as shown in the following example.

````java
  public enum Hand {
    PAPER,
    SCISSORS,
    ROCK;

    public Outcome determineOutcome( final Hand other ) {
      if ( this == other ) {
        return Outcome.DRAW;
      }

      return switch ( this ) {
        case PAPER -> other == Hand.ROCK ? Outcome.WIN_PLAYER_1 : Outcome.WIN_PLAYER_2;
        case SCISSORS -> other == Hand.PAPER ? Outcome.WIN_PLAYER_1 : Outcome.WIN_PLAYER_2;
        case ROCK -> other == Hand.SCISSORS ? Outcome.WIN_PLAYER_1 : Outcome.WIN_PLAYER_2;
      };
    }
  }
````

Complete example

```java
package demo;

public class App {

  public enum Outcome {
    DRAW,
    WIN_PLAYER_1,
    WIN_PLAYER_2;
  }

  public enum Hand {
    PAPER,
    SCISSORS,
    ROCK;

    public Outcome determineOutcome( final Hand other ) {
      if ( this == other ) {
        return Outcome.DRAW;
      }

      return switch ( this ) {
        case PAPER -> other == Hand.ROCK ? Outcome.WIN_PLAYER_1 : Outcome.WIN_PLAYER_2;
        case SCISSORS -> other == Hand.PAPER ? Outcome.WIN_PLAYER_1 : Outcome.WIN_PLAYER_2;
        case ROCK -> other == Hand.SCISSORS ? Outcome.WIN_PLAYER_1 : Outcome.WIN_PLAYER_2;
      };
    }
  }

  public static Outcome determineOutcome( final Hand player1, final Hand player2 ) {
    return player1.determineOutcome( player2 );
  }
}
```

## Even enums have names too

Each enum in Java has a unique name.

Consider the following example.

```java
package demo;

public class App {
  enum Suit {
    CLUBS, DIAMONDS, HEARTS, SPADES;
  }

  public static void main( final String[] args ) {
    final Suit s = Suit.DIAMONDS;
    System.out.printf( "The enum name is: %s%n", s.name() );
  }
}
```

The above example will print.

```bash
The enum name is: DIAMONDS
```

The name of any enum is the same constant name.  The enum's name (as a `String`) can be used to retrieve the enum.  Consider the following code.

```java
package demo;

public class App {
  enum Suit {
    CLUBS, DIAMONDS, HEARTS, SPADES;
  }

  public static void main( final String[] args ) {
    final String name = "SPADES";
    final Suit s = Suit.valueOf( name );
    System.out.printf( "The enum is: %s%n", s );
  }
}
```

The above will print.

```bash
The enum is: SPADES
```

**What happens if no enum is found matching the given name?**

The [`valueOf()` method](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/lang/Enum.html#valueOf(java.lang.Class,java.lang.String)) will thrown an `IllegalArgumentException` if the given name does not match (case-sensitive) any of the enum constants.  Consider the following example.

{% include custom/compile_but_throws.html e="IllegalArgumentException" %}

```java
package demo;

public class App {
  enum Suit {
    CLUBS, DIAMONDS, HEARTS, SPADES;
  }

  public static void main( final String[] args ) {
    final String name = "SPADE";
    final Suit s = Suit.valueOf( name );
    System.out.printf( "The enum is: %s%n", s );
  }
}
```

The above example will throw an `IllegalArgumentException` as shown next.

```bash
Exception in thread "main" java.lang.IllegalArgumentException: No enum constant demo.App.Suit.SPADE
	at java.base/java.lang.Enum.valueOf(Enum.java:273)
	at demo.App$Suit.valueOf(App.java:4)
	at demo.App.main(App.java:10)
```

The name needs to match perfectly including the case.

## Enum's Ordinal

Each enum in Java is associated with a number, referred to as [the ordinal](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/lang/Enum.html#ordinal()).

Consider the following example.

```java
package demo;

public class App {
  enum Suit {
    CLUBS, DIAMONDS, HEARTS, SPADES;
  }

  public static void main( final String[] args ) {
    final Suit s = Suit.DIAMONDS;
    System.out.printf( "The enum %s has an ordinal of %d%n", s, s.ordinal() );
  }
}
```

The first enum constant, `CLUBS` has an ordinal of `0`.  The above example will print.

```bash
The enum DIAMONDS has an ordinal of 1
```

The following table shows the ordinals for the `Suit` enum.

| Enum       | Ordinal |
|------------|--------:|
| `CLUBS`    |     `0` |
| `DIAMONDS` |     `1` |
| `HEARTS`   |     `2` |
| `SPADES`   |     `3` |

The previous example, the rock paper scissors example, can take advantage from the ordinal as shown next.

```java
public enum Hand {
  PAPER,
  SCISSORS,
  ROCK;

  public Outcome determineOutcome( final Hand other ) {
    if ( this == other ) {
      return Outcome.DRAW;
    }

    return beatenBy() == other ? Outcome.WIN_PLAYER_2 : Outcome.WIN_PLAYER_1;
  }

  public Hand beatenBy() {
    final Hand[] hands = Hand.values();
    return hands[( ordinal() + 1 ) % hands.length];
  }
}
```

### Can we retrieve the enum through the ordinal?

Yes.  Enums can be retrieved based on their ordinal.  The enums have an [implicit method called `values()`](https://docs.oracle.com/javase/specs/jls/se14/html/jls-8.html#jls-8.9.3) which returns an array of all enum constants.

```java
package demo;

public class App {
  enum Suit {
    CLUBS, DIAMONDS, HEARTS, SPADES;
  }

  public static void main( final String[] args ) {
    final Suit[] allSuits = Suit.values();
    final Suit s = allSuits[2];
    System.out.printf( "The enum %s has an ordinal of %d%n", s, s.ordinal() );
  }
}
```

The above will print.

```bash
The enum HEARTS has an ordinal of 2
```

**What will happen if we use an ordinal that does not exist?**

Surprisingly enough, this question belongs to arrays ([discussed later on](04%20-%20Collections.md#arrays)).  The array returned by the `values()` method will have four elements.  Trying to retrieve an element from the array past the enum ordinal will throw an `ArrayIndexOutOfBoundsException`.

{% include custom/compile_but_throws.html e="ArrayIndexOutOfBoundsException" %}

```java
package demo;

public class App {
  enum Suit {
    CLUBS, DIAMONDS, HEARTS, SPADES;
  }

  public static void main( final String[] args ) {
    final Suit[] allSuits = Suit.values();
    final Suit s = allSuits[10];
    System.out.printf( "The enum %s has an ordinal of %d%n", s, s.ordinal() );
  }
}
```

The above example will throw an `ArrayIndexOutOfBoundsException` as shown next, because the array only has `4` elements and we tried to retrieve the 11th element.  Arrays are `0` based, so the first element is at index `0`.

```bash
Exception in thread "main" java.lang.ArrayIndexOutOfBoundsException: Index 10 out of bounds for length 4
	at demo.App.main(App.java:10)
```

## Enums in Java can have state

Can we add the cards' icons to the enum?  Consider the following example.

```java
package demo;

public class App {
  enum Suit {
    CLUBS( "♣️" ),
    DIAMONDS( "♦️" ),
    HEARTS( "♥️" ),
    SPADES( "♠️" );

    private final String icon;

    Suit( final String icon ) {
      this.icon = icon;
    }
  }

  public static void main( final String[] args ) {
    final Suit s = Suit.DIAMONDS;
    System.out.printf( "The suit %s has the icon: %s%n", s, s.icon );
  }
}
```

Enums can have state like any other object in Java.  The above will print.

```bash
The suit DIAMONDS has the icon: ♦️
```

We can make use of more elaborate state.  Consider the following example.

```java
package demo;

public class App {

  enum Colour {
    RED( "Red" ),
    BLACK( "Blank" );

    private final String label;

    Colour( final String label ) {
      this.label = label;
    }

    @Override
    public String toString() {
      return label;
    }
  }

  enum Suit {
    CLUBS( "♣️", Colour.BLACK ),
    DIAMONDS( "♦️", Colour.RED ),
    HEARTS( "♥️", Colour.RED ),
    SPADES( "♠️", Colour.BLACK );

    private final String icon;
    private final Colour colour;

    Suit( final String icon, final Colour colour ) {
      this.icon = icon;
      this.colour = colour;
    }

    @Override
    public String toString() {
      return icon;
    }
  }

  public static void main( final String[] args ) {
    final Suit s = Suit.DIAMONDS;
    System.out.printf( "The suit %s has a colour of %s%n", s, s.colour );
  }
}
```

A new enum, `Colour`, was added that represents the suit's colour.  The above will print.

```bash
The suit ♦️ has a colour of Red
```

**Note that the enum state SHOULD NOT be modified as otherwise you may get unexpected behaviour**.  Note that enum's properties are `final` and only immutable types should be used as enum properties.  More about mutability and immutability is covered [later on](03%20-%20Classes,%20Methods%20and%20Objects.md#mutable-and-immutable).

## Considerations before persisting Enums

Let say that we have a simple credit transfer application that allows users to send credit to other users.  When working with the application the user can encounter one of a set of errors.

1. **No Sufficient Credit**: when users try to send more credit that they have
1. **Invalid Amount**: when users input an invalid value
1. **Credit Transfer Exceeded**: when users exceed the credit transfer

Given that the errors are fixed the following enum was created to capture them

```java
package demo;

public enum AppError {
  NO_SUFFICIENT_CREDIT,
  INVALID_AMOUNT,
  CREDIT_TRANSFER_EXCEEDED
}
```

We need to capture the errors produced by the application and persist these in a database for further analysis.

There are several ways to persist an enum into a database, each have their advantages and disadvantages.

### Using the enum's ordinal as the unit of persistence

All enums have an ordinal and this can be saved in the database as shown next.

```java
package demo;

public class App {

  public enum AppError {
    NO_SUFFICIENT_CREDIT,
    INVALID_AMOUNT,
    CREDIT_TRANSFER_EXCEEDED
  }

  public static void main( final String[] args ) {
    persist( AppError.INVALID_AMOUNT );
  }

  public static void persist( final AppError error ) {
    /* Simply logging it out to the console */
    System.out.println( error.ordinal() );
  }
}
```

The above example is simply printing the ordinal to the console, which prints.

```bash
1
```

The following table shows the current ordinal for the `AppError`

| Enum                       | Ordinal |
|----------------------------|--------:|
| `NO_SUFFICIENT_CREDIT`     |     `0` |
| `INVALID_AMOUNT`           |     `1` |
| `CREDIT_TRANSFER_EXCEEDED` |     `2` |

We can add a method that will read the ordinal from the database and return the enum.  Let assume that the ordinal value of `1` is saved in the database and the `read()` method is used to read the enum from the database.

```java
package demo;

public class App {

  public enum AppError {
    NO_SUFFICIENT_CREDIT,
    INVALID_AMOUNT,
    CREDIT_TRANSFER_EXCEEDED
  }

  public static void main( final String[] args ) {
    final AppError error = read();
    System.out.printf( "Error with ordinal 1: %s%n", error );
  }

  public static AppError read() {
    /* Assuming that this is the persisted value in the database */
    final int ordinal = 1;
    return AppError.values()[ordinal];
  }
}
```

The above will print.

```bash
Error with ordinal 1: INVALID_AMOUNT
```

The ordinal is based on the constant's order/position.  If the order of the constants in the enum is changed it will invalidate the ordinal saved in the database.

```java
public enum AppError {
  INVALID_AMOUNT,
  CREDIT_TRANSFER_EXCEEDED,
  NO_SUFFICIENT_CREDIT
}
```

The `INVALID_AMOUNT` is moved as the first constant.  Rerunning the program will produce a different enum.

```java
package demo;

public class App {

  public enum AppError {
    INVALID_AMOUNT,
    CREDIT_TRANSFER_EXCEEDED,
    NO_SUFFICIENT_CREDIT
  }

  public static void main( final String[] args ) {
    final AppError error = read();
    System.out.printf( "Error with ordinal 1: %s%n", error );
  }

  public static AppError read() {
    /* Assuming that this is the persisted value in the database */
    final int ordinal = 1;
    return AppError.values()[ordinal];
  }
}
```

Note that the code may change while the data persisted in the database stays the same.  We have originally saved `1` to represent the enum `INVALID_AMOUNT` in the database.  Running the above program will return a different enum.

```bash
Error with ordinal 1: CREDIT_TRANSFER_EXCEEDED
```

If the enum ordinal will be used as a persistent unit, then make sure that this is captured by tests to make sure that any changes made to the order will break the test.

```java
package demo;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class AppTest {

  @DisplayName( "should have the expected ordinal" )
  @ParameterizedTest( name = "enum {0} should have the ordinal of {1}" )
  @CsvSource( value = { "NO_SUFFICIENT_CREDIT,0", "INVALID_AMOUNT,1", "CREDIT_TRANSFER_EXCEEDED,2" } )
  public void shouldPreserveEnumOrder( final App.AppError error, final int expectedOrdinal ) {
    assertEquals( expectedOrdinal, error.ordinal() );
  }
}
```

Shuffling the enum's constants will break the above test and such change will not go unnoticed.

### Using the enum's name as the unit of persistence

Enums have names too, and a common practice is to use save the enum's name in the database instead of the ordinal.  Saving the name of the enum makes it immutable from reordering of the enum constants.  Furthermore, names are more readable and simplifies data reading.  The data becomes more meaningful for a person looking at it.  Viewing the value of `NO_SUFFICIENT_CREDIT` in a query results, one can easily understand what type of error is.

While this is a common practice, one needs to be careful when using the enum's name as a persistence unit.  The enums can be refactored (renamed) in which case, it would invalidate the respective persisted data.

If the enum's name is to be used as persistence unit, make sure that tests are employed to protect against renaming.

```java
package demo;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

import static demo.App.AppError;

public class AppTest {

  @DisplayName( "should have the expected name" )
  @ParameterizedTest( name = "should exists enum with name {0}" )
  @ValueSource( strings = { "NO_SUFFICIENT_CREDIT", "INVALID_AMOUNT", "CREDIT_TRANSFER_EXCEEDED" } )
  public void shouldExistEnumWithName( final String name ) {
    AppError.valueOf( name );
  }
}
```

Please note that the IntelliJ may rename names and strings alike.  Be careful when renaming objects as we may rename the test samples and undermine the whole test. A better version (but a bit more complex) is shown next.

```java
package demo;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;

import java.nio.charset.StandardCharsets;

import static com.google.common.hash.Hashing.sha256;
import static demo.App.AppError;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class AppTest {

  @DisplayName( "should have the expected name" )
  @ParameterizedTest( name = "should exists enum with name {0}" )
  @CsvSource( value = {
    "NO_SUFFICIENT_CREDIT,91b5d5be922a703f9339b64f233129260c2e0e17764cf13755b682d72024a26b"
    , "INVALID_AMOUNT,bf0a7a01052ee64c75ed878e581c0bc5a1ea0e2c868108aefa8aa47eb53142a8"
    , "CREDIT_TRANSFER_EXCEEDED,1875c1b5559559051e814667827c260668842b699a058300bcb2e8e4a609cd00"
  } )
  public void shouldExistEnumWithName( final String name, final String expectedSha256 ) {
    assertEquals( expectedSha256, computeSha256( name ) );
    AppError.valueOf( name );
  }

  private static String computeSha256( final String text ) {
    return sha256().hashString( text, StandardCharsets.UTF_8 ).toString();
  }
}
```

The [SHA256 hash function](https://en.wikipedia.org/wiki/SHA-2) can be used to create a hash for the enum name.  If the enum name is changed and by mistake the IDE also renames the sample data too, the SHA256 value will not match anymore and the test will fail.

### Using a specific property as the unit of persistence

My recommended approach is to use a specific property as a persistence unit.

```java
public enum AppError {
  NO_SUFFICIENT_CREDIT( "X_CREDIT" ),
  INVALID_AMOUNT( "U_AMOUNT" ),
  CREDIT_TRANSFER_EXCEEDED( "X_TRANSFER_LIMIT" );

  public final String persistenceCode;

  AppError( final String persistenceCode ) {
    this.persistenceCode = persistenceCode;
  }
}
```

The property `persistenceCode` exists for one purpose only.

**How do we convert a given `persistenceCode` to enum?**

We can add a method to the `AppError` enum that given a `String`, it returns the error which `persistenceCode` is equal (case-sensitive) to the given `String`.  If no match is found, `null` is returned.

```java
public enum AppError {
  NO_SUFFICIENT_CREDIT( "X_CREDIT" ),
  INVALID_AMOUNT( "U_AMOUNT" ),
  CREDIT_TRANSFER_EXCEEDED( "X_TRANSFER_LIMIT" );

  public final String persistenceCode;

  AppError( final String persistenceCode ) {
    this.persistenceCode = persistenceCode;
  }

  public static AppError fromPersistenceCode( final String persistenceCode ) {
    for ( final AppError error : values() ) {
      if ( persistenceCode.equals( error.persistenceCode ) ) {
        return error;
      }
    }

    return null;
  }
}
```

While this approach is immutable from renaming for enums and reordering of enums, it is not failsafe either.  Enum name are unique and Java guarantees that.  Nothing stops us from using the same `persistenceCode` value more than once.

```java
public enum AppError {
  NO_SUFFICIENT_CREDIT( "X_CREDIT" ),
  INVALID_AMOUNT( "X_CREDIT" ),
  CREDIT_TRANSFER_EXCEEDED( "X_CREDIT" );

  /* Members removed for brevity */
}
```

All enum constants have the same `persistenceCode`.  The above code will compile and all enums will persists the same `persistenceCode`.

A test is required to make sure that the relation between the `persistenceCode` is one-to-one with the enum constants.

```java
package demo;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.EnumSource;

import static demo.App.AppError;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class AppTest {

  @EnumSource( AppError.class )
  @DisplayName( "should have the expected persistenceCode" )
  @ParameterizedTest( name = "should return the enum {0} when retrieving the enum with the persistenceCode" )
  public void shouldExistEnumWithName( final AppError error ) {
    assertEquals( error, AppError.fromPersistenceCode( error.persistenceCode ) );
  }
}
```

Running the test when all the enum constants have the same `persistanceCode` will fail as shown next.

```bash
$ ./gradlew clean test

> Task :test FAILED

AppTest > should return the enum NO_SUFFICIENT_CREDIT when retrieving the enum with the persistenceCode PASSED

AppTest > should return the enum INVALID_AMOUNT when retrieving the enum with the persistenceCode FAILED
    org.opentest4j.AssertionFailedError at AppTest.java:16

AppTest > should return the enum CREDIT_TRANSFER_EXCEEDED when retrieving the enum with the persistenceCode FAILED
    org.opentest4j.AssertionFailedError at AppTest.java:16

3 tests completed, 2 failed
```

This test ensures that there is a one-to-one relation between the `persistanceCode` and each enum constants.

## Enums can extend functionality

**This is quite an advanced topic and all you need to understand for now is that enums can implement interfaces**.

Java enums are simply special classes which we cannot instantiate.  Consider the following example.

```java
enum Task {
  SWEEPER,
  RUNNER;
}
```

The above enum represents a task that can be executed by some process.  We have two tasks, that do different things.  A sweeper swipes, while a runner runs.  These two perform different tasks.

Consider the following example.

```java
package demo;

public class App {

  enum Task {
    SWEEPER,
    RUNNER;

    public void execute() {
      System.out.println( "Executing..." );
    }
  }

  public static void main( final String[] args ) {
    run( Task.SWEEPER );
    run( Task.RUNNER );
  }

  public static void run( final Task task ) {
    task.execute();
  }
}
```

The `Task` enum introduced the `execute()` method that always prints the same message.

```bash
Executing...
Executing...
```

Enums, like objects, can take advantage of [polymorphism](https://en.wikipedia.org/wiki/Polymorphism_(computer_science)) ([discussed later on](03%20-%20Classes,%20Methods%20and%20Objects.md)).  Consider the following updated example.

```java
package demo;

public class App {

  enum Task {
    SWEEPER() {
      @Override
      public void execute() {
        System.out.println( "Swiping..." );
      }
    },
    RUNNER() {
      @Override
      public void execute() {
        System.out.println( "Running..." );
      }
    };

    public abstract void execute();
  }

  public static void main( final String[] args ) {
    run( Task.SWEEPER );
    run( Task.RUNNER );
  }

  public static void run( final Task task ) {
    task.execute();
  }
}
```

Each enum constant has it own implementation of the `execute()` method.  The above will not print a different message based on the enum being executed.

```bash
Swiping...
Running...
```

An alternative, less recommended approach is to use a `switch` statement instead, as shown next.

```java
enum Task {
  SWEEPER,
  RUNNER;

  public void execute() {
    switch ( this ) {
      case SWEEPER:
        System.out.println( "Swiping..." );
        break;
      case RUNNER:
        System.out.println( "Running..." );
        break;
    }
  }
}
```

I do not prefer this approach as we can easily forget to add a new case to the `switch` when new enum constants are added.  The first approach is immune from this problem as the compiler will produce an error.

We have another type of task which runs in batches, called `BatchTask`, shown next.

```java
enum BatchTask {
  NIGHTLY_BACKUPS() {
    @Override
    public void execute() {
      System.out.println( "Backing up the data..." );
    }
  };

  public abstract void execute();
}
```

Like the first enum, `Task`, the `BatchTask` has a method called `execute()`.  Can we reuse the `run()` method to run the `BatchTask`?

{% include custom/dose_not_compile.html %}

```java
package demo;

public class App {

  enum Task {
    SWEEPER() {
      @Override
      public void execute() {
        System.out.println( "Swiping..." );
      }
    },
    RUNNER() {
      @Override
      public void execute() {
        System.out.println( "Running..." );
      }
    };

    public abstract void execute();
  }

  enum BatchTask {
    NIGHTLY_BACKUPS() {
      @Override
      public void execute() {
        System.out.println( "Backing up the data..." );
      }
    };

    public abstract void execute();
  }

  public static void main( final String[] args ) {
    run( Task.SWEEPER );
    run( Task.RUNNER );
    run( BatchTask.NIGHTLY_BACKUPS );
  }

  public static void run( Task task ) {
    task.execute();
  }
}
```

`Task` and `BatchTask` are different types, and like we cannot assign a `double` to an `int`, we cannot assign `BatchTask` to `Task`.  We can create an interface ([discussed in depth later on](03%20-%20Classes,%20Methods%20and%20Objects.md#interfaces)), as shown next.

```java
interface CanBeExecuted {
  void execute();
}
```

We can have both enums implement the new interface and use the interface as the method parameter instead, as shown next.

```java
package demo;

public class App {

  enum Task implements CanBeExecuted {
    SWEEPER() {
      @Override
      public void execute() {
        System.out.println( "Swiping..." );
      }
    },
    RUNNER() {
      @Override
      public void execute() {
        System.out.println( "Running..." );
      }
    };

    public abstract void execute();
  }

  enum BatchTask implements CanBeExecuted {
    NIGHTLY_BACKUPS() {
      @Override
      public void execute() {
        System.out.println( "Backing up the data..." );
      }
    };

    public abstract void execute();
  }

  interface CanBeExecuted {
    void execute();
  }

  public static void main( final String[] args ) {
    run( Task.SWEEPER );
    run( Task.RUNNER );
    run( BatchTask.NIGHTLY_BACKUPS );
  }

  public static void run( final CanBeExecuted a ) {
    a.execute();
  }
}
```

The above program now runs and prints.

```bash
Swiping...
Running...
Backing up the data...
```

**This is quite an advanced topic and all you need to understand for now is that enums can implement interfaces**.
