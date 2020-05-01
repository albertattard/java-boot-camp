# Testing

## TOC

1. [Setup](#setup)
1. [Testing with JUnit 5 (Hamcrest and AssertJ)](#testing-with-junit-5-hamcrest-and-assertj)
1. [Mocking (Mockito and EasyMock)](#mocking-mockito-and-easymock)
1. [Mutation Testing (PIT)](#mutation-testing-pit)
1. [Google Guava (Preconditions)](#google-guava-preconditions)

## Setup

1. Clone Repo: [java-boot-camp-blank](https://github.com/albertattard/java-boot-camp-blank)

    ```bash
    $ git clone https://github.com/albertattard/java-boot-camp-blank.git
    ```

1. Open the repo in IDE

## Testing with JUnit 5 (Hamcrest and AssertJ)

**Context**:  A player is playing a dice game and 10 or more are required for the placer to win.  Write a function that determines whether the player has won.  This function will take two integers as an input and will return true if the sum of the given integers are equal to or greater than 10.

### Add JUnit 5

1. Add the [junit-jupiter](https://mvnrepository.com/artifact/org.junit.jupiter/junit-jupiter) aggregator dependency and configure that `test` task to make use of [JUnit 5](https://junit.org/junit5/docs/current/user-guide/#running-tests-build-gradle).

    ```groovy
    dependencies {
      testImplementation 'org.junit.jupiter:junit-jupiter:5.7.0-M1'
    }

    test {
      useJUnitPlatform()
    }
    ```

    The Maven repository make use of older dependency configurations.  Use the new dependency configuration `testImplementation` that replaced the `testCompile` dependency configuration.

    ![Maven JUnit 5](assets/images/Maven%20JUnit%205.png)

    Use the latest version when possible.

    **You may need to refresh gradle to see the changes in the IDE**

    ![Refresh Gradle](assets/images/Refresh%20Gradle.png)

    Notice that the new libraries will be included under the *External Libraries*

    ![JUnit 5 Dependency](assets/images/JUnit%205%20Dependency.png)

1. Open the `App.java` class, press `[command] + [shift] + [T]` and select the *Create New Test...* menu option

    ![Create new Test](assets/images/Create%20New%20Test.png)

    A warning will appear if the test directory is missing.

    ![No Test Roots Found](assets/images/No%20Test%20Roots%20Found.png)

    Click *Cancel* and create the `test` directory under `src` folder first.

    ![New Test Directory](assets/images/New%20Test%20Directory.png)

    Create the test class.

    ![Create Test](assets/images/Create%20Test.png)

    A blank test class under the `test` directory will be created.

    ```java
    package demo;

    import static org.junit.jupiter.api.Assertions.*;

    class AppTest {

    }
    ```

    Please refer to [gradle documentation](
https://docs.gradle.org/current/userguide/java_plugin.html#sec:java_project_layout) for more information about the project structure.

1. Write the first test

    ```java
    package demo;

    import org.junit.jupiter.api.DisplayName;
    import org.junit.jupiter.api.Test;

    import static org.junit.jupiter.api.Assertions.fail;

    public class AppTest {

      @Test
      @DisplayName( "should return true if the sum of the given integers is equal to or greater than 10, false otherwise" )
      public void shouldReturnTrueIfWon() {
        fail( "Simulating error" );
      }
    }
    ```

    **Note that the method does not have the `static` key word**.

    This test fails on purpose.

1. Run the test

    ```bash
    $ ./gradlew test

    > Task :test FAILED

    AppTest > should return true if the sum of the given integers is equal to or greater than 10, false otherwise FAILED
        org.opentest4j.AssertionFailedError at AppTest.java:13
    ...
    BUILD FAILED in 1s
    3 actionable tasks: 2 executed, 1 up-to-date
    ```

1. Add the proper assertion

    ```java
    package demo;

    import org.junit.jupiter.api.DisplayName;
    import org.junit.jupiter.api.Test;

    import static org.junit.jupiter.api.Assertions.assertTrue;

    public class AppTest {

      @Test
      @DisplayName( "should return true if the sum of the given integers is equal to or greater than 10, false otherwise" )
      public void shouldReturnTrueIfWon() {
        assertTrue( App.hasWon( 5, 5 ) );
      }
    }
    ```

   Add a basic implementation (that throws an exception when invoked on purpose)

    ```java
    package demo;

    public class App {
      public static boolean hasWon( final int a, final int b ) {
        throw UnsupportedOperationException("Coming soon...");
      }
    }
    ```

    Run the tests

    ```bash
    $ ./gradlew test
    ```

    The test will fail as expected.

1. Implement the functionality

    ```java
    package demo;

    public class App {
      public static boolean hasWon( final int a, final int b ) {
        return a + b >= 10;
      }
    }
    ```

    **Note that in TDD, we would simply return `true` (just enough to make the test passes)**.

    Run the tests again, this time these should pass.

    ```bash
    $ ./gradlew test

    BUILD SUCCESSFUL in 1s
    4 actionable tasks: 4 executed
    ```

1. The output does not include the tests that were executed.

    Update `build.gradle`

    ```groovy
    test {
      useJUnitPlatform()
      testLogging {
        events = ['FAILED', 'PASSED', 'SKIPPED', 'STANDARD_OUT']
      }
    }
    ```

    Run the tests again.

    ```bash
    $ ./gradlew clean test

      > Task :test

      AppTest > should return true if the sum of the given integers is equal to or greater than 10, false otherwise PASSED
    ```

### Parameterized Test

1. Convert the test to make use of Parameters instead

    ```java
    package demo;

    import org.junit.jupiter.api.DisplayName;
    import org.junit.jupiter.params.ParameterizedTest;
    import org.junit.jupiter.params.provider.CsvSource;

    import static org.junit.jupiter.api.Assertions.assertTrue;

    public class AppTest {

      @ParameterizedTest( name = "Dice values {0} and {1} should yield a victory" )
      @CsvSource( { "5, 5", "5, 6", "6, 5", "6, 6" } )
      public void shouldReturnTrueIfWon( int a, int b ) {
        assertTrue( App.hasWon( a, b ) );
      }
    }
    ```

    Note that there is no `@Test` annotation was replaced by the `@ParameterizedTest` annotation.  The annotation `@DisplayName` is not required either as the test will take the name from the `@ParameterizedTest` annotation.

1. Run the test

    ```bash
    $ ./gradlew test
    ```

    Note that the test will be executed 4 times, one for each line

    ```bash
    > Task :test

    AppTest > Dice values 5 and 5 should yield a victory PASSED

    AppTest > Dice values 5 and 6 should yield a victory PASSED

    AppTest > Dice values 6 and 5 should yield a victory PASSED

    AppTest > Dice values 6 and 6 should yield a victory PASSED
    ```

### Hamcrest

[Hamcrest](http://hamcrest.org/JavaHamcrest/) is a framework for writing matcher objects allowing 'match' rules to be defined declaratively.

1. Add the [Hamcrest](https://mvnrepository.com/artifact/org.hamcrest/hamcrest-all/1.3) dependency

    ```groovy
    dependencies {
      testImplementation 'org.hamcrest:hamcrest-all:1.3'
    }
    ```

1. Example

    ```java
    package demo;

    import org.junit.jupiter.api.Test;

    import java.math.BigDecimal;

    import static org.hamcrest.MatcherAssert.assertThat;
    import static org.hamcrest.core.CombinableMatcher.either;
    import static org.hamcrest.core.Is.is;
    import static org.hamcrest.core.Is.isA;
    import static org.hamcrest.core.IsEqual.equalTo;
    import static org.hamcrest.core.StringStartsWith.startsWith;
    import static org.hamcrest.number.IsCloseTo.closeTo;
    import static org.hamcrest.number.OrderingComparison.comparesEqualTo;
    import static org.hamcrest.number.OrderingComparison.greaterThan;
    import static org.hamcrest.number.OrderingComparison.lessThan;

    class AppTest {

      @Test
      public void tryingOutHamcrest() {
        assertThat( "my string", equalTo( "my string" ) );
        assertThat( "Hello everyone", startsWith( "Hello" ) );

        assertThat( 10, is( greaterThan( 5 ) ) );
        assertThat( 10, isA( Integer.class ) );
        assertThat( 10, either( greaterThan( 50 ) ).or( lessThan( 20 ) ) );

        assertThat( new BigDecimal( "10" ), comparesEqualTo( new BigDecimal( "10.00" ) ) );
        assertThat( 10.01, closeTo( 10, 0.02 ) );
      }
    }
    ```

### AssertJ

[Assertj](https://assertj.github.io/doc/) is a java library providing a rich set of assertions, truly helpful error messages, improves test code readability and is designed to be super easy to use.

1. Add the [Assertj](https://mvnrepository.com/artifact/org.assertj/assertj-core/3.15.0) dependency

    ```groovy
    dependencies {
      testImplementation 'org.assertj:assertj-core:3.15.0'
    }
    ```

1. Example

    ```java
    package demo;

    import org.junit.jupiter.api.Test;

    import java.math.BigDecimal;

    import static org.assertj.core.api.Assertions.assertThat;
    import static org.assertj.core.api.Assertions.offset;

    class AppTest {

      @Test
      public void tryingOutAssertJ() {
        assertThat( "my string" ).isEqualTo( "my string" );
        assertThat( "Hello everyone" ).startsWith( "Hello" );

        assertThat( 10 ).isGreaterThan( 5 );
        assertThat( 10 ).isInstanceOfAny( Integer.class );
        /* Using Lambdas here */
        assertThat( 10 ).satisfiesAnyOf(
            i -> assertThat( i ).isGreaterThan( 50 ),
            i -> assertThat( i ).isLessThan( 20 )
        );

        assertThat( new BigDecimal( "10" ) ).isEqualByComparingTo( new BigDecimal( "10.00" ) );
        assertThat( 10.01 ).isCloseTo( 10, offset( 0.02 ) );
      }
    }
    ```

### JUnit 5, Hamcrest and AssertJ

| Library  | Test Runner | Matcher |
|----------|:-----------:|:-------:|
| JUnit 5  |   **YES**   | **YES** |
| Hamcrest |     NO      | **YES** |
| AssertJ  |     NO      | **YES** |

According to [Google Trends](https://trends.google.com/trends/explore?q=hamcrest,assertj), the matchers share similar popularity.

![Harmcrest vs AssertJ](assets/images/Harmcrest%20vs.%20AssertJ.png)

The good news is that these are not mutually exclusive and it is not uncommon to find them both.

```groovy
dependencies {
  testImplementation 'org.junit.jupiter:junit-jupiter:5.7.0-M1'
  testImplementation 'org.hamcrest:hamcrest-all:1.3'
  testImplementation 'org.assertj:assertj-core:3.15.0'
}
```

With that said, using both Hamcrest and AssertJ may be challenging as both use the same method name `assertThat()` and thus cannot just static import this method.

```java
package demo;

import org.assertj.core.api.Assertions;
import org.hamcrest.MatcherAssert;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.Test;

class AppTest {

  @Test
  public void tryingOutBothInSameTest() {
    Assertions.assertThat( 10 ).isEqualTo( 10 );
    MatcherAssert.assertThat( 10, Matchers.equalTo( 10 ) );
  }
}
```

### Test Lifecycle

JUnit 5 provides a set of powerful [annotations](https://junit.org/junit5/docs/current/user-guide/#writing-tests-annotations) that help managing the tests lifecycle.

Example

```java
package demo;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class AppTest {

  @Test
  public void test1() {
    System.out.println( "@Test 1" );
  }

  @Test
  public void test2() {
    System.out.println( "@Test 2" );
  }

  @BeforeAll
  public static void setupOnce() {
    System.out.println( "@BeforeAll" );
  }

  @AfterAll
  public static void teardownOnce() {
    System.out.println( "@AfterAll" );
  }

  @BeforeEach
  public void setupBeforeEachTest() {
    System.out.println( "@BeforeEach" );
  }

  @AfterEach
  public void teardownAfterEachTest() {
    System.out.println( "@AfterEach" );
  }
}
```

Run the tests

```bash
$ ./gradlew clean test
```

Will show how each method is called.

```bash
> Task :test

AppTest STANDARD_OUT
    @BeforeAll

AppTest > test1() STANDARD_OUT
    @BeforeEach
    @Test 1
    @AfterEach

AppTest > test1() PASSED

AppTest > test2() STANDARD_OUT
    @BeforeEach
    @Test 2
    @AfterEach

AppTest > test2() PASSED

AppTest STANDARD_OUT
    @AfterAll

BUILD SUCCESSFUL in 1s
4 actionable tasks: 4 executed
```

Note that the methods invoked by an `@AfterEach` are called even when the tests fail. Also, note that here there is a mixture of `static` and non `static` methods.

### Recommended Readings

1. Mastering Software Testing with JUnit 5 ([O'Reilly Books](https://learning.oreilly.com/library/view/mastering-software-testing/9781787285736/))
1. Pragmatic Unit Testing in Java 8 with JUnit ([O'Reilly Books](https://learning.oreilly.com/library/view/pragmatic-unit-testing/9781680500769/))

## Mocking (Mockito and EasyMock)

### What is Mocking (Test Doubles) and Why do we need it?

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

### Test Doubles

[Test Double](https://martinfowler.com/bliki/TestDouble.html) is a generic term for any case where you replace a production object for testing purposes. There are various kinds of double that Gerard lists:

* **Dummy** objects are passed around but never actually used.  Usually they are just used to fill parameter lists.
* **Stubs** provide canned answers to calls made during the test, usually not responding at all to anything outside what's programmed in for the test.
* **Spies** are stubs that also record some information based on how they were called. One form of this might be an email service that records how many messages it was sent.
* **Mocks** are pre-programmed with expectations which form a specification of the calls they are expected to receive. They can throw an exception if they receive a call they don't expect and are checked during verification to ensure they got all the calls they were expecting.
* **Fake** objects actually have working implementations, but usually take some shortcut which makes them not suitable for production (an InMemoryTestDatabase is a good example).

![Test Doubles](assets/images/Test%20Doubles.png)

### Mockito

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

#### Recommended Reading

1. Mockito Essentials ([O'Reilly Books](https://learning.oreilly.com/library/view/mockito-essentials/9781783983605/))
1. Mockito Tutorial ([O'Reilly Video Series](https://learning.oreilly.com/videos/mockito-tutorial/9781789135039))

### EasyMock

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

### Which Mocking Framework

Mockito is the most popular mocking framework according to [Google Trends](https://trends.google.com/trends/explore?q=Mockito,EasyMock,JMock,JMockit,PowerMock).

![Mockito vs. the rest](assets/images/Mockito%20vs.%20the%20Rest.png)

The mocking libraries are not mutually exclusive and can both be used in the same project.  With that said, mocks created by one framework need to be configured and verified with the same framework.  A mock created with Mockito cannot be then verified by EasyMock, for example.

## Mutation Testing (PIT)

[Mutation testing](https://en.wikipedia.org/wiki/Mutation_testing) is used to design new software tests and evaluate the quality of existing software tests.  [PIT](https://pitest.org/) is a mutation testing system, providing great test coverage for Java and the JVM.

PITest requires some Gradle configuration

1. Plugin

    ```groovy
    plugins {
      id 'info.solidsoft.pitest' version '1.4.8'
    }
    ```

1. JUnit 5 runtime dependency

    ```groovy
    dependencies {
      testRuntimeOnly 'org.pitest:pitest-junit5-plugin:0.12'
    }
    ```

1. Configuring PITest

    ```groovy
    pitest {
      testPlugin = 'junit5'
      targetClasses = ['demo.*']
      timestampedReports = false
    }
    ```

No further changes are required to the code.  Run the pitest

```bash
$ ./gradlew clean pitest
```

The `clean` task is not necessary, but it is useful in cleaning the reports from the previous run.

PITest produces a report at `build/reports/pitest/index.html`

![Pit Test Coverage Report](assets/images/Pit%20Test%20Coverage%20Report.png)

## Google Guava (Preconditions)

[Guava](https://github.com/google/guava) is a set of core Java libraries from Google that includes new collection types (such as multimap and multiset), immutable collections, a graph library, and utilities for concurrency, I/O, hashing, caching, primitives, strings, and more! It is widely used on most Java projects within Google, and widely used by many other companies as well.

```groovy
dependencies {
  implementation 'com.google.guava:guava:29.0-jre'
}
```

Example

```java
package demo;

import com.google.common.base.Preconditions;

public class App {

  public static boolean hasWon( final int a, final int b ) {
    Preconditions.checkArgument( a >= 1 && a <= 6, "Invalid dice value %d", a );
    Preconditions.checkArgument( b >= 1 && b <= 6, "Invalid dice value %d", b );
    return a + b >= 10;
  }
}
```

Passing any invalid value will cause the function to throw an `IllegalArgumentException`.

```java
App.hasWon( 7 ,1);
```

Exception

```
Exception in thread "main" java.lang.IllegalArgumentException: Invalid dice value 7
  at com.google.common.base.Preconditions.checkArgument(Preconditions.java:190)
```

Testing

```java
package demo;

import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

class AppTest {

  @ParameterizedTest( name = "should throw an IllegalArgumentException({0}) when provided the invalid dice value {1}" )
  @CsvSource( {
    "Invalid dice value 7, 7, 1",
    "Invalid dice value 7, 1, 7",
    "Invalid dice value 0, 0, 7",
  } )
  public void shouldThrowAnExceptionWhen( String expectedErrorMessage, int a, int b ) {
    final IllegalArgumentException exception = assertThrows( IllegalArgumentException.class, () -> App.hasWon( a, b ) );
    assertEquals( expectedErrorMessage, exception.getMessage() );
  }
}
```

The above example runs three tests.

```bash
$ ./gradlew test

> Task :test

AppTest > should throw an IllegalArgumentException(Invalid dice value 7) when provided the invalid dice value 7 PASSED

AppTest > should throw an IllegalArgumentException(Invalid dice value 7) when provided the invalid dice value 1 PASSED

AppTest > should throw an IllegalArgumentException(Invalid dice value 0) when provided the invalid dice value 0 PASSED
```

### Recommended Reading

1. Getting Started with Google Guava ([O'Reilly Books](https://learning.oreilly.com/library/view/getting-started-with/9781783280155/))
