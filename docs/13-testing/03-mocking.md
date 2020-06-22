---
layout: default
title: Mocking (Mockito and EasyMock)
parent: Testing
nav_order: 3
permalink: docs/testing/mocking/
---

# Mocking (Mockito and EasyMock)
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## What is mocking (test doubles) and why do we need it?

A game company developed a new game and would like to test the game well before release it to the players.  The game is very simple.  The player is given three chances to guess a number between 1 and 10 both inclusive.

Example:

```java
package demo;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.Random;

public class Game {

  public static void main( String[] args ) {
    final BufferedReader reader = new BufferedReader( new InputStreamReader( System.in, StandardCharsets.UTF_8 ) );
    final Random random = new Random();

    final int numberToBeGuessed = random.nextInt( 10 ) + 1;
    boolean guessed = false;

    for ( int attempts = 1; attempts <= 3; ) {
      String input = "";
      try {
        System.out.print( "Enter a number between 1 and 10 (both inclusive): " );
        input = reader.readLine();
        final int numberEntered = Integer.parseInt( input );

        if ( numberEntered < 1 || numberEntered > 10 ) {
          System.out.printf( "The number %d is out of range%n", numberEntered  );
          continue;
        }

        if ( numberToBeGuessed == numberEntered ) {
          guessed = true;
          break;
        }

        if ( numberEntered < numberToBeGuessed ) {
          System.out.printf( "Not quite right. Try a number greater than %d%n", numberEntered );
        } else {
          System.out.printf( "Not quite right. Try a number smaller than %d%n", numberEntered );
        }
        attempts++;
      } catch ( NumberFormatException e ) {
        System.out.printf( "The input '%s' is not a number%n", input );
      } catch ( IOException e ) {
        System.out.println( "Encountered an error" );
        return;
      }
    }

    if ( guessed ) {
      System.out.println( "WOW!! You got it" );
    } else {
      System.out.printf( "The number was: %d. Better luck next time!!%n", numberToBeGuessed );
    }
  }
}
```

The game needs to be robust and should handle invalid inputs by printing an error message on the screen.

The above game is very hard to test as everything is in one place.  For example, it is hard to simulate an IO Error and it is not easy to see what messages are being printed on the screen.

Finally, there is a big prize associate with this game and we need to make sure only those really guess the number win.

**Some Challenges**

1. It is hard to predict the random number
1. It is hard to simulate errors
1. It is not easy to simulate the input
1. It is not easy to confirm that the correct messages are being displayed

**An Alternative Approach**

The game can be refactored such that we have anything which is not related to logic is moved to another class, called `GamePeripherals` and then the game interacts with this class to perform IO.

```java
package demo;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.Random;

public class GamePeripherals {

  public int generateRandomNumber() {
    return random.nextInt( 10 ) + 1;
  }

  public String readInput( String prompt ) throws IOException {
    System.out.print( prompt );
    return reader.readLine();
  }

  public void display( String message ) {
    System.out.println( message );
  }

  public void displayf( String pattern, Object... values ) {
    display( String.format( pattern, values ) );
  }

  private final BufferedReader reader = new BufferedReader( new InputStreamReader( System.in, StandardCharsets.UTF_8 ) );
  private final Random random = new Random();
}
```

Note that all methods in this class are not `static`.  This is covered in more detail later on.

The `Game` class is refactored to make use of the `GamePeripherals` class to get input and display messages.

```java
package demo;

import java.io.IOException;

public class Game {

  public static void main( String[] args ) {
    final GamePeripherals peripherals = new GamePeripherals();
    playGame( peripherals );
  }

  public static void playGame( GamePeripherals peripherals ) {
    final int numberToBeGuessed = peripherals.generateRandomNumber();
    boolean guessed = false;

    for ( int attempts = 1; attempts <= 3; ) {
      String input = "";
      try {
        input = peripherals.readInput( "Enter a number between 1 and 10 (both inclusive): " );
        final int numberEntered = Integer.parseInt( input );

        if ( numberEntered < 1 || numberEntered > 10 ) {
          peripherals.displayf( "The number %d is out of range", numberEntered );
          continue;
        }

        if ( numberToBeGuessed == numberEntered ) {
          guessed = true;
          break;
        }

        if ( numberEntered < numberToBeGuessed ) {
          peripherals.displayf( "Not quite right. Try a number greater than %d", numberEntered );
        } else {
          peripherals.displayf( "Not quite right. Try a number smaller than %d", numberEntered );
        }
        attempts++;
      } catch ( NumberFormatException e ) {
        peripherals.displayf( "The input '%s' is not a number", input );
      } catch ( IOException e ) {
        peripherals.display( "Encountered an error" );
        return;
      }
    }

    if ( guessed ) {
      peripherals.display( "WOW!! You got it" );
    } else {
      peripherals.displayf( "The number was: %d. Better luck next time!!", numberToBeGuessed );
    }
  }
}
```

Now we can test the game logic and simulate all the scenarios we need by replacing the `GamePeripherals` with a version we can easily control.

```java
package demo;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class GameTest {

  @Test
  @DisplayName( "should display an error when an IO Exception is thrown while reading input" )
  public void shouldHandleIoException() throws Exception {
    /* Create the naïve mock */
    final NaïveIoErrorMockGamePeripherals mocked = new NaïveIoErrorMockGamePeripherals();

    /* Run the game with the mocked peripherals */
    Game.playGame( mocked );

    /* Verify that the error message is displayed */
    mocked.verify( "Encountered an error" );
  }
}
```

The above example make use of `NaïveIoErrorMockGamePeripherals` instead the original.

```java
package demo;

import java.io.IOException;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class NaïveIoErrorMockGamePeripherals extends GamePeripherals {

  public String readInput( String prompt ) throws IOException {
    exceptionThrown = true;
    throw new IOException( "Simulating an error" );
  }

  public void display( String message ) {
    displayed = message;
  }

  public void verify( String output ) {
    assertTrue( exceptionThrown, "The readInput() method was not called and the exception was not thrown" );
    assertEquals( displayed, output );
  }

  private boolean exceptionThrown;
  private String displayed;
}
```

This is a naïve mock which has limited flexibility and only used to demonstrate the problem that mocks address.

## Test Doubles

[Test Double](https://martinfowler.com/bliki/TestDouble.html) is a generic term for any case where you replace a production object for testing purposes. There are various kinds of double that Gerard lists:

* **Dummy** objects are passed around but never actually used.  Usually they are just used to fill parameter lists.
* **Stubs** provide canned answers to calls made during the test, usually not responding at all to anything outside what's programmed in for the test.
* **Spies** are stubs that also record some information based on how they were called. One form of this might be an email service that records how many messages it was sent.
* **Mocks** are pre-programmed with expectations which form a specification of the calls they are expected to receive. They can throw an exception if they receive a call they don't expect and are checked during verification to ensure they got all the calls they were expecting.
* **Fake** objects actually have working implementations, but usually take some shortcut which makes them not suitable for production (an InMemoryTestDatabase is a good example).

![Test Doubles]({{site.baseurl}}/assets/images/Test-Doubles.png)

## Mockito

Instead of creating a specific mock objects for each type or situation, we can leverage existing mocking frameworks such as [Mockito](https://github.com/mockito/mockito).

```groovy
dependencies {
  testImplementation 'org.mockito:mockito-core:3.3.3'
}
```

The previous example can be converted to use Mockito instead.

```java
package demo;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.io.IOException;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

class GameTest {

  @Test
  @DisplayName( "should display an error when an IO Exception is thrown while reading input" )
  public void shouldHandleIoException() throws Exception {
    /* Create the mock */
    final GamePeripherals mocked = mock( GamePeripherals.class );

    /* Configure the mock to behave as we need it to */
    when( mocked.generateRandomNumber() ).thenReturn( 1 );
    when( mocked.readInput( anyString() ) ).thenThrow( new IOException( "Simulating an error" ) );

    /* Run the game with the mocked peripherals */
    Game.playGame( mocked );

    /* Verify that the error message is displayed */
    verify( mocked ).display( "Encountered an error" );
  }
}
```

## EasyMock

[EasyMock](https://easymock.org/user-guide.html) is an alternative to Mockito.

```java
package demo;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.io.IOException;

import static org.easymock.EasyMock.anyString;
import static org.easymock.EasyMock.expect;
import static org.easymock.EasyMock.mock;
import static org.easymock.EasyMock.replay;
import static org.easymock.EasyMock.verify;

class GameTest {

  @Test
  @DisplayName( "should display an error when an IO Exception is thrown while reading input" )
  public void shouldHandleIoException() throws Exception {
    /* Create the mock */
    final GamePeripherals mocked = mock( GamePeripherals.class );

    /* Configure the mock to behave as we need it to */
    expect( mocked.generateRandomNumber() ).andReturn( 1 );
    expect( mocked.readInput( anyString() ) ).andThrow( new IOException( "Simulating an error" ) );
    mocked.display( "Encountered an error" );
    replay( mocked );

    /* Run the game with the mocked peripherals */
    Game.playGame( mocked );

    /* Verify that the error message is displayed */
    verify( mocked );
  }
}
```

The syntax is very similar to Mockito.

```groovy
dependencies {
  testImplementation 'org.easymock:easymock:4.2'
}
```

Note that EasyMock will produce warnings when used with Java 9 or newer.

```bash
$ ./gradlew test

> Task :test
WARNING: An illegal reflective access operation has occurred
WARNING: Illegal reflective access by org.easymock.cglib.core.ReflectUtils$1 (file:/Users/albertattard/.gradle/caches/modules-2/files-2.1/org.easymock/easymock/4.2/251b26f1b853673c1aac277fd2fb0c8d5844cdc8/easymock-4.2.jar) to method java.lang.ClassLoader.defineClass(java.lang.String,byte[],int,int,java.security.ProtectionDomain)
WARNING: Please consider reporting this to the maintainers of org.easymock.cglib.core.ReflectUtils$1
WARNING: Use --illegal-access=warn to enable warnings of further illegal reflective access operations
WARNING: All illegal access operations will be denied in a future release

GameTest > should display an error when an IO Exception is thrown while reading input PASSED
```

## Which mocking framework should I use?

Mockito is the most popular mocking framework according to [Google Trends](https://trends.google.com/trends/explore?q=Mockito,EasyMock,JMock,JMockit,PowerMock).

![Mockito vs. the rest]({{site.baseurl}}/assets/images/Mockito-vs.-the-Rest.png)

The mocking libraries are not mutually exclusive and can both be used in the same project.  With that said, mocks created by one framework need to be configured and verified with the same framework.  A mock created with Mockito cannot be then verified by EasyMock, for example.

## Recommended reading

1. Mockito Essentials ([O'Reilly Books](https://learning.oreilly.com/library/view/mockito-essentials/9781783983605/))
1. Mockito Tutorial ([O'Reilly Video Series](https://learning.oreilly.com/videos/mockito-tutorial/9781789135039))
