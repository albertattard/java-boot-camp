# Testing

## TOC

1. [Setup](#setup)
1. [Testing with JUnit 5 (Hamcrest and AssertJ)](#testing-with-junit-5-hamcrest-and-assertj)
1. [Mocking (Mockito and Easy Mock)](#mocking-mockito-and-easy-mock)
1. [Google Guava (Preconditions)](#google-guava-preconditions)
1. [PIT Mutation Testing](#pit-mutation-testing)

## Setup

1. Clone Repo: [java-boot-camp-blank](https://github.com/albertattard/java-boot-camp-blank)

    ```bash
    $ git clone https://github.com/albertattard/java-boot-camp-blank.git
    ```

1. Open the repo in IDE

## Testing with JUnit 5 (Hamcrest and AssertJ)

## Add JUnit 5

1. Add the [junit-jupiter](https://mvnrepository.com/artifact/org.junit.jupiter/junit-jupiter) aggregator dependency.

    File: `build.gradle`

    ```groovy
    dependencies {
      testImplementation group: 'org.junit.jupiter', name: 'junit-jupiter', version: '5.7.0-M1'
    }

    test {
      useJUnitPlatform()
    }
    ```

    Use the latest version when possible.

    The Maven repository make use of older dependency configurations.  Use the new dependency configuration `testImplementation` that replaced the `testCompile` dependency configuration.

    **You may need to refresh gradle through the IDE**

    ![Refresh Gradle](assets/images/Refresh%20Gradle.png)

    Notice that the new libraries will be included under the *External Libraries*

    ![JUnit 5 Dependency](assets/images/JUnit%205%20Dependency.png)

1. Open the `App.java` class, click `[command] + [shift] + [T]` and select the *Create New Test...* menu option

    ![Create new Test](assets/images/Create%20New%20Test.png)

    A warning will appear if the test directory is missing.

    ![No Test Roots Found](assets/images/No%20Test%20Roots%20Found.png)

    Click *Cancel* and create a new directory under `src` folder.

    ![New Test Directory](assets/images/New%20Test%20Directory.png)

    Create the test class.

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

    Note that in TDD, we would simply return `true` (just enough to make the test passes).

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

      @DisplayName( "should return true if the sum of the given integers is equal to or greater than 10, false otherwise" )
      @ParameterizedTest( name = "Dice values {0} and {1} should yield a victory" )
      @CsvSource( { "5, 5", "5, 6", "6, 5", "6, 6" } )
      public void shouldReturnTrueIfWon( int a, int b ) {
        assertTrue( App.hasWon( a, b ) );
      }
    }
    ```

    Note that there is no `@Test` annotation was replaced by the `@ParameterizedTest` annotation.

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

### AssertJ

### Recommended Readings

## Mocking (Mockito and Easy Mock)

### Mockito

### Easy Mock

## Google Guava (Preconditions)

## PIT Mutation Testing
