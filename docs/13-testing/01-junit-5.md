---
layout: default
title: JUnit 5
parent: Testing
nav_order: 1
permalink: docs/testing/junit-5/
---

# JUnit 5
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Scenario

A player is playing a dice game that requires 10 or more to win.  Write a method that determines whether the player has won.  This method will take two integers as an input and will return `true` if the sum of the given integers is equal to or greater than `10`.

## Add JUnit 5

1. Add the [junit-jupiter](https://mvnrepository.com/artifact/org.junit.jupiter/junit-jupiter) aggregator dependency and configure that `test` task to make use of [JUnit 5](https://junit.org/junit5/docs/current/user-guide/#running-tests-build-gradle).

   ```groovy
   dependencies {
     testImplementation 'org.junit.jupiter:junit-jupiter:5.7.0-M1'
   }

   test {
     useJUnitPlatform()
   }
   ```

   The Maven repository make use of older Gradle dependency configurations.  Use the new dependency configuration `testImplementation` that replaced the `testCompile` dependency configuration, as the latter is now [deprecated]( https://docs.gradle.org/current/userguide/java_plugin.html).

   ![Maven JUnit 5]({{ '/assets/images/Maven-JUnit-5.png' | absolute_url }})
   ([Reference](https://mvnrepository.com/artifact/org.junit.jupiter/junit-jupiter/5.7.0-M1))

   Use the latest version when possible.

   You may need to refresh Gradle to see the changes in the IDE.

   ![Refresh Gradle]({{ '/assets/images/Refresh-Gradle.png' | absolute_url }})

   You can press the `[command] + [shift] + [I]` shortcut to refresh Gradle and update the external dependencies.  The new libraries will be included under the *External Libraries*, a shown next.

   ![JUnit 5 Dependency]({{ '/assets/images/JUnit-5-Dependency.png' | absolute_url }})

## Create the first test

1. Open the `App.java` class, press `[command] + [shift] + [T]` and select the *Create New Test...* menu option

   ![Create new Test]({{ '/assets/images/Create-New-Test.png' | absolute_url }})

   A warning will appear if the test directory is missing.

   ![No Test Roots Found]({{ '/assets/images/No-Test-Roots-Found.png' | absolute_url }})

   Click *Cancel* and create the `test` directory under `src` folder first.

   ![New Test Directory]({{ '/assets/images/New-Test-Directory.png' | absolute_url }})

   Create the test class.

   ![Create Test]({{ '/assets/images/Create-Test.png' | absolute_url }})

   A blank test class under the `test` directory will be created.

   ```java
   package demo;

   import static org.junit.jupiter.api.Assertions.*;

   class AppTest {

   }
   ```

   Please refer to [Gradle documentation](
https://docs.gradle.org/current/userguide/java_plugin.html#sec:java_project_layout) for more information about the project structure.

1. Provide a better description

   Update file: `src/test/java/demo/AppTest.java`

   {% include custom/note.html details="The following test class uses the package-private access modifier.  <a href='https://github.com/junit-team/junit5/issues/679'>JUnit 4 required the class and test method to be <code>public</code>, which is not required in JUnit 5 to improve test encapsulation.</a>" %}

   ```java
   package demo;

   import org.junit.jupiter.api.DisplayName;

   @DisplayName( "Dice game test" )
   class AppTest {

   }
   ```

1. Write the first test

   Update file: `src/test/java/demo/AppTest.java`

   {% include custom/note.html details="The test method does not have the <code>static</code> key word." %}

   ```java
   package demo;

   import org.junit.jupiter.api.DisplayName;
   import org.junit.jupiter.api.Test;

   import static org.junit.jupiter.api.Assertions.fail;

   @DisplayName( "Dice game test" )
   class AppTest {

    @Test
    @DisplayName( "should return true if the sum of the given integers is equal to or greater than 10, false otherwise" )
    void shouldReturnTrueIfWon() {
      fail( "Simulating error" );
    }
   }
   ```

   This test fails on purpose.

1. Run the test

   ```bash
   $ ./gradlew clean test

   > Task :test FAILED

   Dice game test > should return true if the sum of the given integers is equal to or greater than 10, false otherwise FAILED
     org.opentest4j.AssertionFailedError at AppTest.java:14

   ...

   BUILD FAILED in 1s
   4 actionable tasks: 2 executed, 2 up-to-date
   ```

1. Add the proper assertion

   Update file: `src/test/java/demo/AppTest.java`

   {% include custom/dose_not_compile.html %}

   ```java
   package demo;

   import org.junit.jupiter.api.DisplayName;
   import org.junit.jupiter.api.Test;

   import static org.junit.jupiter.api.Assertions.assertTrue;

   @DisplayName( "Dice game test" )
   class AppTest {

     @Test
     @DisplayName( "should return true if the sum of the given integers is equal to or greater than 10, false otherwise" )
     void shouldReturnTrueIfWon() {
       assertTrue( App.hasWon( 5, 5 ) );
     }
   }
   ```

   Add a basic implementation (that throws an exception when invoked on purpose)

   Update file: `src/main/java/demo/App.java`

   ```java
   package demo;

   public class App {
     public static boolean hasWon( final int a, final int b ) {
       throw new UnsupportedOperationException("Coming soon...");
     }
   }
   ```

   Run the tests

   ```bash
   $ ./gradlew clean test
   ```

   The test will fail as expected.

1. Implement the functionality

   Update file: `src/main/java/demo/App.java`

   ```java
   package demo;

   public class App {
     public static boolean hasWon( final int a, final int b ) {
       return a + b >= 10;
     }
   }
   ```

   {% include custom/note.html details="Note that in TDD, we would simply return <code>true</code> (just enough to make the test passes)." %}

   Run the tests again, this time these should pass.

   ```bash
   $ ./gradlew clean test

   BUILD SUCCESSFUL in 1s
   4 actionable tasks: 4 executed
   ```

1. The output does not include the tests that were executed.

   Update file: `build.gradle`

   ```groovy
   test {
     useJUnitPlatform()
     testLogging {
       events = ['FAILED', 'PASSED', 'SKIPPED', 'STANDARD_OUT']
     }
   }
   ```

   Run the tests again.

   {% include custom/note.html details="It is important to run the <code>clean</code> Gradle task as otherwise the tests may not run given that no changes are made to the code." %}

   ```bash
   $ ./gradlew clean test

   > Task :test

   Dice game test > should return true if the sum of the given integers is equal to or greater than 10, false otherwise PASSED
   ```

## IntelliJ and `@DisplayName`

IntelliJ may not pick up the `@DisplayName` annotation values. as shown next.

![IntelliJ Test Name]({{ '/assets/images/IntelliJ Test Name - 1.png' | absolute_url }})

This can be easily fixed.

1. Open IntelliJ preferences and filter for `gradle`, as shown next

   {% include custom/note.html details="Press <code>[command] + [,]</code> to open the preferences for any application running on a Mac OS." %}

   ![IntelliJ Preferences Gradle]({{ '/assets/images/IntelliJ Preferences Gradle.png' | absolute_url }})

   Our project is using Gradle to build, run and test our project.

1. Change the *Run tests using* to *IntelliJ*, as shown next.

   ![IntelliJ Preferences Gradle]({{ '/assets/images/IntelliJ Preferences Gradle - Run Tests.png' | absolute_url }})

1. Run the test from within IntelliJ

   Open the test class `AppTest` and press `[control] + [shift] + [R]`

   ![IntelliJ Test Name]({{ '/assets/images/IntelliJ Test Name - 2.png' | absolute_url }})

   The tests names should not reflect the `@DisplayName` annotation values.

## Parameterized test

The following example makes use of the [`@CsvSource`](https://junit.org/junit5/docs/current/api/org.junit.jupiter.params/org/junit/jupiter/params/provider/CsvSource.html) annotation as we have multiple parameters.  In case of single parameters, the [`@ValueSource`](https://junit.org/junit5/docs/current/api/org.junit.jupiter.params/org/junit/jupiter/params/provider/ValueSource.html) annotation can be used.

1. Convert the test to make use of parameters instead

   Update file: `src/test/java/demo/AppTest.java`

   {% include custom/note.html details="The <code>@Test</code> annotation is replaced by the <code>@ParameterizedTest</code> annotation." %}

   ```java
   package demo;

   import org.junit.jupiter.api.DisplayName;
   import org.junit.jupiter.params.ParameterizedTest;
   import org.junit.jupiter.params.provider.CsvSource;

   import static org.junit.jupiter.api.Assertions.assertTrue;

   @DisplayName( "Dice game test" )
   class AppTest {

     @CsvSource( { "5, 5", "5, 6", "6, 5", "6, 6" } )
     @ParameterizedTest( name = "Dice values {0} and {1} should yield a victory" )
     @DisplayName( "should return true if the sum of the given integers is equal to or greater than 10, false otherwise" )
     void shouldReturnTrueIfWon( int a, int b ) {
       assertTrue( App.hasWon( a, b ) );
     }
   }
   ```

1. Run the test

   ```bash
   $ ./gradlew clean test
   ```

   Note that the test will be executed 4 times, one for each line

   ```bash
   > Task :test

   Dice game test > Dice values 5 and 5 should yield a victory PASSED

   Dice game test > Dice values 5 and 6 should yield a victory PASSED

   Dice game test > Dice values 6 and 5 should yield a victory PASSED

   Dice game test > Dice values 6 and 6 should yield a victory PASSED
   ```

## Load test data from files (`@CsvFileSource`)

Instead of putting all the inputs in the source code, we can put the inputs in a CSV file and have these loaded by the test, using the [`@CsvFileSource`](https://junit.org/junit5/docs/5.7.0-M1/api/org.junit.jupiter.params/org/junit/jupiter/params/provider/CsvFileSource.html) annotation.

1. Create the test sample file

   Create file: `src/test/resources/samples/game_won.csv`

   ```
   Die 1,Die 2
   5,5
   5,6
   6,5
   6,6
   ```

1. IntelliJ treats CSV files differently, as shown in the following image.

   ![IntelliJ see CSV data as table]({{ '/assets/images/IntelliJ see CSV data as table - 1.png' | absolute_url }})

   A small table like icon will appear at the top right corner and two tabs are shown at the bottom left corner of the editor.

1. Click on the table like icon to open the CSV preferences for this file.

   ![IntelliJ see CSV data as table]({{ '/assets/images/IntelliJ see CSV data as table - 2.png' | absolute_url }})

1. The data tab is now selected, as shown next.

   ![IntelliJ see CSV data as table]({{ '/assets/images/IntelliJ see CSV data as table - 3.png' | absolute_url }})

   We can easily edit the CSV using the data tab which will automatically add the delimiters for us.

## Custom converters

In some applications, negative numbers are wrapped in round brackets.  For example, the negative ten is represented as `(10)`.

```java
package demo;

import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;

import static org.junit.jupiter.api.Assertions.assertEquals;

class AppTest {

  @ParameterizedTest( name = "The value {0} should be converted to {1}" )
  @CsvSource( { "(10), -10" } )
  void shouldConvertInput( int actual, int expected ) {
   assertEquals( actual, expected );
  }
}
```

The above will fail to convert the value `(10)` to `-10`

```bash
org.junit.jupiter.api.extension.ParameterResolutionException: Error converting parameter at index 0: Failed to convert String "(10)" to type java.lang.Integer

  at org.junit.jupiter.params.ParameterizedTestMethodContext.parameterResolutionException(ParameterizedTestMethodContext.java:273)
  ...
```

1. Create a custom converter

   ```java
   package demo;

   import org.junit.jupiter.params.converter.ArgumentConversionException;
   import org.junit.jupiter.params.converter.DefaultArgumentConverter;
   import org.junit.jupiter.params.converter.SimpleArgumentConverter;

   import java.util.regex.Pattern;

   public final class CustomNumberConverter extends SimpleArgumentConverter {

     private static final Pattern REGEX = Pattern.compile( "\\(\\d+\\)" );

     @Override
     protected Object convert( final Object source, final Class<?> targetType ) throws ArgumentConversionException {
       final String updated = replaceRoundBracketsWithMinus( source );
       return DefaultArgumentConverter.INSTANCE.convert( updated, targetType );
     }

     private String replaceRoundBracketsWithMinus( final Object source ) {
       final String value = source.toString();
       if ( REGEX.matcher( value ).matches() ) {
         return "-" + value.subSequence( 1, value.length() - 1 );
       }
       return value;
     }
   }
   ```

1. Use the custom converter

   ```java
   package demo;

   import org.junit.jupiter.params.ParameterizedTest;
   import org.junit.jupiter.params.converter.ConvertWith;
   import org.junit.jupiter.params.provider.CsvSource;

   import static org.junit.jupiter.api.Assertions.assertEquals;

   class AppTest {

     @ParameterizedTest( name = "The value {0} should be converted to {1}" )
     @CsvSource( { "(1), -1", "(10), -10", "(100), -100", "(1000), -1000", "10, 10" } )
     void shouldConvertInput(
       @ConvertWith( CustomNumberConverter.class ) int actual,
       int expected
     ) {
       assertEquals( actual, expected );
     }
   }
   ```

1. Run the test

   ```bash
   $ ./gradlew clean test

   ...

   AppTest > The value (1) should be converted to -1 PASSED

   AppTest > The value (10) should be converted to -10 PASSED

   AppTest > The value (100) should be converted to -100 PASSED

   AppTest > The value (1000) should be converted to -1000 PASSED

   AppTest > The value 10 should be converted to 10 PASSED

   ...
   ```

   The values are converted using our converter and then by the default converter.

## Tests tagging

{% include custom/pending.html %}

## Nested tests

{% include custom/pending.html %}

## How to verify that an exception is thrown?

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
  void shouldThrowAnExceptionWhen( String expectedErrorMessage, int a, int b ) {
   final IllegalArgumentException exception = assertThrows( IllegalArgumentException.class, () -> App.hasWon( a, b ) );
   assertEquals( expectedErrorMessage, exception.getMessage() );
  }
}
```

The above example runs three tests.

```bash
$ ./gradlew clean test

> Task :test

AppTest > should throw an IllegalArgumentException(Invalid dice value 7) when provided the invalid dice value 7 PASSED

AppTest > should throw an IllegalArgumentException(Invalid dice value 7) when provided the invalid dice value 1 PASSED

AppTest > should throw an IllegalArgumentException(Invalid dice value 0) when provided the invalid dice value 0 PASSED
```

## Test lifecycle

JUnit 5 provides a set of powerful [annotations](https://junit.org/junit5/docs/current/user-guide/#writing-tests-annotations) that help managing the tests lifecycle.

Example

```java
package demo;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class AppTest {

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

## Recommended reading

1. Mastering Software Testing with JUnit 5 ([O'Reilly Books](https://learning.oreilly.com/library/view/mastering-software-testing/9781787285736/))
1. Pragmatic Unit Testing in Java 8 with JUnit ([O'Reilly Books](https://learning.oreilly.com/library/view/pragmatic-unit-testing/9781680500769/))

## Miscellaneous

1. [`@Disabled`](https://junit.org/junit5/docs/5.7.0-M1/api/org.junit.jupiter.api/org/junit/jupiter/api/Disabled.html)
1. [`TestInfo`](https://junit.org/junit5/docs/5.7.0-M1/api/org.junit.jupiter.api/org/junit/jupiter/api/TestInfo.html)
1. [`TestReporter`](https://junit.org/junit5/docs/5.7.0-M1/api/org.junit.jupiter.api/org/junit/jupiter/api/TestReporter.html)
1. [`MethodOrderer`](https://junit.org/junit5/docs/5.7.0-M1/api/org.junit.jupiter.api/org/junit/jupiter/api/MethodOrderer.html)
1. [`IgnoreCondition`](https://junit.org/junit5/docs/5.7.0-M1/api/org.junit.jupiter.migrationsupport/org/junit/jupiter/migrationsupport/conditions/IgnoreCondition.html)
1. [`assertAll()`](https://junit.org/junit5/docs/5.7.0-M1/api/org.junit.jupiter.api/org/junit/jupiter/api/Assertions.html#assertAll(java.util.Collection))
1. [Assumptions](https://junit.org/junit5/docs/5.7.0-M1/api/org/junit/jupiter/api/Assumptions.html) class in Junit 5 :
   1. Assumptions.assumeTrue() –  If the  condition is true, then run the test, else aborting the test.
   1. Assumptions.false() –  If the  condition is false, then run the test, else aborting the test.
   1. Assumptions.assumingThat() –   is much more flexible, If condition is true then executes, else do not abort test continue rest of code in test.
1. TestNG (alternative to JUnit)
1. [add an aggregator example](https://junit.org/junit5/docs/5.7.0-M1/api/org.junit.jupiter.params/org/junit/jupiter/params/aggregator/AggregateWith.html)
