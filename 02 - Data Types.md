# Data Types

## TOC

1. [Setup](#setup)
1. [JShell](#jshell)
1. [Numbers and Strings (Variables and Scope)](#numbers-and-strings-variables-and-scope)
1. [Operators](#operators)
1. [Autoboxing](#autoboxing)
1. [Enumerations](#enumerations)
1. [Imports and Packages](#imports-and-packages)
1. [Date Time API](#date-time-api)
1. [Internationalization](#internationalization)

## Setup

1. Clone Repo: [java-boot-camp-blank](https://github.com/albertattard/java-boot-camp-blank)

    ```bash
    $ git clone https://github.com/albertattard/java-boot-camp-blank.git
    ```

1. Open the repo in IDE

## JShell

The [Java Shell tool (JShell)](https://docs.oracle.com/javase/9/jshell/introduction-jshell.htm) is an interactive tool for learning the Java programming language and prototyping Java code.  JShell is a Read-Evaluate-Print Loop (REPL), which evaluates declarations, statements, and expressions as they are entered and immediately shows the results.

1. Open JShell

    ```bash
    $ jshell
    ```

    The following error maybe shown

    ```bash
    Unable to locate an executable at "~/.sdkman/candidates/java/current/bin/jshell" (-1)
    ```

    Verify the version of Java

    ```bash
    $ java -version
    openjdk version "1.8.0_252"
    OpenJDK Runtime Environment (AdoptOpenJDK)(build 1.8.0_252-b09)
    OpenJDK 64-Bit Server VM (AdoptOpenJDK)(build 25.252-b09, mixed mode)
    ```

    **JShell requires Java 9 or higher**

    ```jshelllanguage
    |  Welcome to JShell -- Version 14.0.1
    |  For an introduction type: /help intro

    jshell>
    ```

    To exit type `/exit`

    ```jshelllanguage
    jshell> /exit
    ```

1. Create a variable

    ```jshelllanguage
    jshell> a = 7
    |  Error:
    |  cannot find symbol
    |    symbol:   variable a
    |  a = 7
    |  ^
    ```

    In Java, variables require a type

    ```jshelllanguage
    jshell> int a = 7
    a ==> 7
    ```

    Alternatively, a semicolon can be added at the end indicating the end of statement (as defined by the [JLS 14.8](https://docs.oracle.com/javase/specs/jls/se7/html/jls-14.html#jls-14.8)).

    ```jshelllanguage
    jshell> int a = 7;
    a ==> 7
    ```

    Enter the variable name to print its value

    ```jshelllanguage
    jshell> a
    a ==> 7
    ```

    Java 10 introduced Local Variable Type Inference ([JEP 286](https://openjdk.java.net/jeps/286)).  Previously, all local variable declarations required an explicit (manifest) type on the left-hand side.  With type inference, the explicit type can be replaced by the reserved type name `var` for local variable declarations that have initializers.  The type of the variable is inferred from the type of the initializer.

    ```jshelllanguage
    jshell> var x = 7
    x ==> 7
    ```

    For more information about Local Variable Type Inference please refer to the [style guidelines](http://openjdk.java.net/projects/amber/LVTIstyle.html).

1. Arithmetic Operations

    ```jshelllanguage
    jshell> int b = 3
    b ==> 3

    jshell> a + b
    $4 ==> 10
    ```

    The result is stored in a new variable `$4` which can be accessed as any other variable.

    ```jshelllanguage
    jshell> $4
    $4 ==> 10
    ```

1. Use libraries

    ```jshelllanguage
    jshell> import static java.lang.Math.*

    jshell> max(a, b)
    $5 ==> 7
    ```

    A list of functions available in the Math class can be found [here](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/lang/Math.html).

## Numbers and Strings (Variables and Scope)

Example

```java
package demo;

public class App {
  public static void main( String[] args ) {
    /* Boolean */
    {
      boolean b = true;
      System.out.printf( "My boolean %s%n", b );
    }

    /* Integers Numbers */
    {
      byte b = 7;
      short s = 1_234;
      int i = 5_000;
      long l = 123_456_789L;
      System.out.printf( "My byte    %d%n", b );
      System.out.printf( "My short   %d%n", s );
      System.out.printf( "My short   %d%n", i );
      System.out.printf( "My short   %d%n", l );
    }

    /* Floating Point Numbers */
    {
      float f = 5.99f;
      double d = 123_456.123_456;
      System.out.printf( "My float   %.2f%n", f );
      System.out.printf( "My double  %.4f%n", d );
    }

    /* Characters and Strings */
    {
      char c = 'J';
      String s = "Hello, this is my string";
      String u = "\uD83D\uDC4B 🌎"; /* Equivalent to "👋 \uD83C\uDF0D" */
      System.out.printf( "My char    %s%n", c );
      System.out.printf( "My String  %s%n", s );
      System.out.printf( "My Emoji   %s%n", u );
    }
  }
}
```

Output

```bash
My boolean true
My byte    7
My short   1234
My short   5000
My short   123456789
My float   5,99
My double  123456,1235
My char    J
My String  Hello, this is my string
```

## Operators

Example

```java
package demo;

public class App {
  public static void main( String[] args ) {
    /* String concatenation */
    {
      int a = 7;
      int b = 3;
      String m = "The number is " + a + b;
      String n = "The number is " + ( a + b );
      System.out.println( "-- String concatenation ----" );
      System.out.printf( "Concatenation:   %s%n", m );
      System.out.printf( "Grouping before: %s%n", n );
    }

    /* Basic Arithmetic */
    {
      int a = 2;
      int b = 2;
      int c = a + b + 2;
      int d = a++;
      int e = ++b;

      int f = 1 / 2;
      int g = 1 % 2;
      int h = -1 % 2;

      System.out.println( "-- Basic Arithmetic ----------" );
      System.out.printf( "a = %d%n", a );
      System.out.printf( "b = %d%n", b );
      System.out.printf( "a + b + 2 = %d%n", c );
      System.out.printf( "a++ = %d%n", d );
      System.out.printf( "++b = %d%n", e );
      System.out.printf( "1 / 2 = %d%n", f );
      System.out.printf( "1 %% 2 = %d%n", g );
      System.out.printf( "1- %% 2 = %d%n", h );
    }

    /* Arithmetic operations return an int (or long) */
    {
      byte a = 7;
      byte b = 3;
      int plus = a + b;
      int minus = a - b;
      byte c = 7;
      c += b;
      System.out.println( "-- Arithmetic operations ---" );
      System.out.printf( "a + b = %d%n", plus );
      System.out.printf( "a - b = %d%n", minus );
      System.out.printf( "c = %d%n", c );
    }

    /* Relational operators */
    {
      boolean a = 2 > 1;
      boolean b = 2 != 2;
      boolean c = a && b;
      boolean d = a || b;
      boolean e = !a;

      System.out.println( "-- Relational operators ---" );
      System.out.printf( "2 > 1 = %s%n", a );
      System.out.printf( "2 != 2 = %s%n", b );
      System.out.printf( "%s && %s = %s%n", a, b, c );
      System.out.printf( "%s || %s = %s%n", a, b, d );
      System.out.printf( "!%s = %s%n", a, e );
    }
  }
}
```

Output

```bash
-- String concatenation ----
Concatenation:   The number is 73
Grouping before: The number is 10
-- Basic Arithmetic ----------
a = 3
b = 3
a + b + 2 = 6
a++ = 2
++b = 3
1 / 2 = 0
1 % 2 = 1
1- % 2 = -1
-- Arithmetic operations ---
a + b = 10
a - b = 4
c = 10
-- Relational operators ---
2 > 1 = true
2 != 2 = false
true && false = false
true || false = true
!true = false
```

## Autoboxing

Example

```java
package demo;

public class App {
  public static void main( String[] args ) {
    /* Objects */
    Integer a = new Integer( 10 ); /* Deprecated */
    Integer b = Integer.valueOf( 10 ); /* Unnecessary Boxing */
    Integer c = Integer.valueOf( "10" );
    Integer d = Integer.valueOf( "1010", 2 );

    /* Primitives */
    int e = 10;
    int f = Integer.parseInt( "10" );
    int g = Integer.parseInt( "1010", 2 );

    /* Auto-Boxing */
    Integer h = e;
    int i = a;

    System.out.println( "-- Objects -----" );
    System.out.printf( "Integer a %d%n", a );
    System.out.printf( "Integer b %d%n", b );
    System.out.printf( "Integer c %d%n", c );
    System.out.printf( "Integer d %d%n", d );

    System.out.println( "-- Primitives --" );
    System.out.printf( "int e     %d%n", e );
    System.out.printf( "int f     %d%n", f );
    System.out.printf( "int g     %d%n", g );

    System.out.println( "-- Auto-Boxing -" );
    System.out.printf( "Integer h %d%n", h );
    System.out.printf( "int i     %d%n", i );
  }
}
```

Output

```bash
-- Objects -----
Integer a 10
Integer b 10
Integer c 10
Integer d 10
-- Primitives --
int e     10
int f     10
int g     10
-- Auto-Boxing -
Integer h 10
int i     10
```

## Enumerations

**⚠️ THE FOLLOWING EXAMPLE MAKES REFERENCE TO TESTING WHICH IS NOT YET COVERED!!**

The tests require [Junit5](https://mvnrepository.com/artifact/org.junit.jupiter/junit-jupiter)

```groovy
dependencies {
  testImplementation 'org.junit.jupiter:junit-jupiter:5.7.0-M1'
}
```

Consider the [rock paper scissors hand game](https://en.wikipedia.org/wiki/Rock_paper_scissors).

![Rock Paper Scissors Game Rules](assets/images/Rock%20Paper%20Scissors.png)

Example

```java
package demo;

public class RockPaperScissors {

  /* Outcome constants */
  public static final int DRAW = 0;
  public static final int WIN_PLAYER_1 = 1;
  public static final int WIN_PLAYER_2 = 2;

  /* Hand constants */
  public static final int PAPER = 1;
  public static final int SCISSORS = 2;
  public static final int ROCK = 3;

  public static int determineOutcome( int player1, int player2 ) {
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

The above example uses `int` as constants to identify what is what.  This was a common practice in the past.

```java
package demo;

import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.junit.jupiter.params.provider.ValueSource;

import static demo.RockPaperScissors.DRAW;
import static demo.RockPaperScissors.PAPER;
import static demo.RockPaperScissors.ROCK;
import static demo.RockPaperScissors.SCISSORS;
import static demo.RockPaperScissors.WIN_PLAYER_1;
import static demo.RockPaperScissors.WIN_PLAYER_2;
import static demo.RockPaperScissors.determineOutcome;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class RockPaperScissorsTest {

  @ValueSource( ints = { PAPER, SCISSORS, ROCK } )
  @ParameterizedTest( name = "should return DRAW (0) when both players play the same hand {0}" )
  void shouldReturnDraw( int hand ) {
    assertEquals( DRAW, determineOutcome( hand, hand ) );
  }

  @CsvSource( { "2,1", "3,2", "1,3" } )
  @ParameterizedTest( name = "should return WIN_PLAYER_1 (1) when player1 plays {0} and player 2 plays {1}" )
  void shouldReturnWinPlayer1( int player1, int player2 ) {
    assertEquals( WIN_PLAYER_1, determineOutcome( player1, player2 ) );
  }

  @CsvSource( { "1,2", "2,3", "3,1" } )
  @ParameterizedTest( name = "should return WIN_PLAYER_2 (2) when player1 plays {0} and player 2 plays {1}" )
  void shouldReturnWinPlayer2( int player1, int player2 ) {
    assertEquals( WIN_PLAYER_2, determineOutcome( player1, player2 ) );
  }
}
```

Java 5 introduced Enums which simplifies the above problem.

1. **Refactor Outcome**

    **⚠️ THE FOLLOWING EXAMPLE MAKES REFERENCE TO TESTING WHICH IS NOT YET COVERED!!**

    Replace the imports in the `RockPaperScissorsTest` class

    ```java
    import static demo.RockPaperScissors.DRAW;
    import static demo.RockPaperScissors.WIN_PLAYER_1;
    import static demo.RockPaperScissors.WIN_PLAYER_2;
    ```

    with

    ```java
    import static demo.RockPaperScissors.Outcome.DRAW;
    import static demo.RockPaperScissors.Outcome.WIN_PLAYER_1;
    import static demo.RockPaperScissors.Outcome.WIN_PLAYER_2;
    ```

    The above will not compile until we use the enum.

    Replace the outcome constants with an enum

    ```java
    package demo;

    public class RockPaperScissors {

      public enum Outcome {
        DRAW,
        WIN_PLAYER_1,
        WIN_PLAYER_2;
      }

      public static final int PAPER = 1;
      public static final int SCISSORS = 2;
      public static final int ROCK = 3;

      public static Outcome determineOutcome( int player1, int player2 ) {
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

1. **Refactor Hand**

    Use the `@EnumSource( Hand.class )` to test against all instances of the `Hand` enum

    ```java
      @EnumSource( Hand.class )
      @ParameterizedTest( name = "should return DRAW (0) when both players play the same hand {0}" )
      void shouldReturnDraw( RockPaperScissors.Hand hand ) {
        assertEquals( DRAW, determineOutcome( hand, hand ) );
      }
    ```

    Use the enum name as input to the `@CsvSource`

    ```java
      @CsvSource( { "PAPER,ROCK", "SCISSORS,PAPER", "ROCK,SCISSORS" } )
      @ParameterizedTest( name = "should return WIN_PLAYER_1 (1) when player1 plays {0} and player 2 plays {1}" )
      void shouldReturnWinPlayer1( Hand player1, Hand player2 ) {
        assertEquals( WIN_PLAYER_1, determineOutcome( player1, player2 ) );
      }
    ```

    Complete example

    ```java
    package demo;

    import org.junit.jupiter.params.ParameterizedTest;
    import org.junit.jupiter.params.provider.CsvSource;
    import org.junit.jupiter.params.provider.EnumSource;

    import static demo.RockPaperScissors.Hand;
    import static demo.RockPaperScissors.Outcome.DRAW;
    import static demo.RockPaperScissors.Outcome.WIN_PLAYER_1;
    import static demo.RockPaperScissors.Outcome.WIN_PLAYER_2;
    import static demo.RockPaperScissors.determineOutcome;
    import static org.junit.jupiter.api.Assertions.assertEquals;

    public class RockPaperScissorsTest {

      @EnumSource( Hand.class )
      @ParameterizedTest( name = "should return DRAW (0) when both players play the same hand {0}" )
      void shouldReturnDraw( RockPaperScissors.Hand hand ) {
        assertEquals( DRAW, determineOutcome( hand, hand ) );
      }

      @CsvSource( { "PAPER,ROCK", "SCISSORS,PAPER", "ROCK,SCISSORS" } )
      @ParameterizedTest( name = "should return WIN_PLAYER_1 (1) when player1 plays {0} and player 2 plays {1}" )
      void shouldReturnWinPlayer1( Hand player1, Hand player2 ) {
        assertEquals( WIN_PLAYER_1, determineOutcome( player1, player2 ) );
      }

      @CsvSource( { "ROCK,PAPER", "PAPER,SCISSORS", "SCISSORS,ROCK" } )
      @ParameterizedTest( name = "should return WIN_PLAYER_2 (2) when player1 plays {0} and player 2 plays {1}" )
      void shouldReturnWinPlayer2( Hand player1, Hand player2 ) {
        assertEquals( WIN_PLAYER_2, determineOutcome( player1, player2 ) );
      }
    }
    ```

    Replace the hand `int` constants with the `Hand` enum

    ```java
    package demo;

    public class PaperScissorsRock {

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

1. **Enums in Java can have methods**

    ```java
    package demo;

    public class RockPaperScissors {

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

## Imports and Packages

Example

```java
package demo;

import java.util.Random;

public class App {
  public static void main( String[] args ) {
    /* We are using a seed to always get the same sequence from this pseudo random number generator. */
    Random r = new Random( 1L );

    /* Random number between 0 (inclusive) up to 100 (exclusive) */
    int i = r.nextInt( 100 );
    System.out.printf( "The number was %d%n", i );
  }
}
```

Output

```bash
The number was 85
```

## Date Time API

Example

```java
package demo;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;

public class App {
  public static void main( String[] args ) {
    LocalDate now = LocalDate.now();
    LocalDate lastWeek = now.minusWeeks( 1 );

    LocalTime noon = LocalTime.NOON;
    LocalTime eleven = noon.minusHours( 1 );

    LocalDateTime yesterday = LocalDateTime.now().minusDays( 1 );

    ZonedDateTime malta = yesterday.atZone( ZoneId.of( "Europe/Malta" ) );
    ZonedDateTime toronto = yesterday.atZone( ZoneId.of( "America/Toronto" ) );
    ZonedDateTime vancouver = yesterday.atZone( ZoneId.of( "America/Vancouver" ) );

    DateTimeFormatter formatter = DateTimeFormatter.ofPattern( "yyyy MMM dd HH:mm '(in 'v')'" );
    String formatted = malta.format( formatter );
    LocalDate parsed = LocalDate.parse( "2020-04-27", DateTimeFormatter.ISO_DATE );

    System.out.println( "-- Date ----------" );
    System.out.printf( "Today:     %s%n", now );
    System.out.printf( "Last Week: %s%n", lastWeek );

    System.out.println( "-- Time ----------" );
    System.out.printf( "Noon:      %s%n", noon );
    System.out.printf( "Eleven:    %s%n", eleven );

    System.out.println( "-- Date/Time -----" );
    System.out.printf( "Yesterday: %s%n", yesterday );

    System.out.println( "-- With offset ---" );
    System.out.printf( "Yesterday: %s%n", malta );
    System.out.printf( "Yesterday: %s%n", toronto );
    System.out.printf( "Yesterday: %s%n", vancouver );

    System.out.println( "-- Formatter -----" );
    System.out.printf( "Formatted: %s%n", formatted );
    System.out.printf( "Parsed:    %s%n", parsed );
  }
}
```

Output

```bash
-- Date ----------
Today:     2020-04-28
Last Week: 2020-04-21
-- Time ----------
Noon:      12:00
Eleven:    11:00
-- Date/Time -----
Yesterday: 2020-04-27T20:10:46.298083
-- With offset ---
Yesterday: 2020-04-27T20:10:46.298083+02:00[Europe/Malta]
Yesterday: 2020-04-27T20:10:46.298083-04:00[America/Toronto]
Yesterday: 2020-04-27T20:10:46.298083-07:00[America/Vancouver]
-- Formatter -----
Formatted: 2020 Apr 27 20:10 (in CET)
Parsed:    2020-04-27
```

## Internationalization

Example

```java
package demo;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.TemporalField;
import java.time.temporal.WeekFields;
import java.util.Locale;

public class App {
  public static void main( String[] args ) {
    LocalDate now = LocalDate.now();

    TemporalField fieldSys = WeekFields.of( Locale.getDefault() ).dayOfWeek();
    TemporalField fieldUK = WeekFields.of( Locale.UK ).dayOfWeek();
    TemporalField fieldUS = WeekFields.of( Locale.US ).dayOfWeek();

    LocalDate firstSys = now.with( fieldSys, 1 );
    LocalDate firstUK = now.with( fieldUK, 1 );
    LocalDate firstUS = now.with( fieldUS, 1 );

    DateTimeFormatter formatter = DateTimeFormatter.ofPattern( "dd E" );

    System.out.printf( "First day of week: %s (System)%n", firstSys.format( formatter ) );
    System.out.printf( "First day of week: %s (UK)%n", firstUK.format( formatter ) );
    System.out.printf( "First day of week: %s (US)%n", firstUS.format( formatter ) );
  }
}
```

Output

```bash
First day of week: 27 Mon (System)
First day of week: 27 Mon (UK)
First day of week: 26 Sun (US)
```
