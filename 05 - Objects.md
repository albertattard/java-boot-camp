# Objects

## TOC

1. [Setup](#setup)
1. [Simple Objects](#simple-objects)
1. [Inheritance](#inheritance)
1. [Interfaces](#interfaces)
1. [Overloading and Overriding](#overloading-and-overriding)
1. [Outer, Inner and Anonymous Classes](#outer-and-inner-classes)
1. [Enumerations](#enumerations)
1. [Annotations](#annotations)
1. [Generics](#generics)

## Setup

1. Clone Repo: [java-boot-camp-blueprint](clone https://github.com/albertattard/java-boot-camp-blueprint.git)

    ```bash
    $ git clone https://github.com/albertattard/java-boot-camp-blueprint.git
    ```

    **Note that this is the blueprint repository and not the blank repository**.

1. Open the repo in IDE

1. Delete the `src/test/java/demo/AppTest.java`

1. Modify the `src/main/java/demo/App.java`

    ```java
    package demo;

    public class App {

      public static void main( String[] args ) {
        System.out.println( "Objects!!" );
      }
    }
    ```

1. Run the tests and build the project

    ```bash
    $ ./gradlew clean build

    ...
    BUILD SUCCESSFUL in 3s
    13 actionable tasks: 13 executed
    ```

## Simple Objects

The post-office is automating the packaging of letters or items into boxes and is creating a program to handles this.  There are two types of boxes, the light boxes and the heavy boxes. The light boxes only take one item in them whereas the heavy boxes can take as many items as it can fit.

### Basic Object

Let start by creating a basic object that will represent a box.  The box will not have any functionality.  Do not worry about light and heavy boxes.

1. Create the `Box` class

    ```java
    package demo;

    public class Box {
    }
    ```

1. Update the `main()` method

    ```java
    package demo;

    public class App {

      public static void main( String[] args ) {
        Box box = new Box();
        System.out.printf( "My box %s%n", box );
      }
    }
    ```

1. Run the program

    ```bash
    $ ./gradlew run

    > Task :run
    My box demo.Box@2ff4acd0
    ```

1. Replace the [toString()](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/lang/Object.html#toString()) method, so that we can print something more meaning full.

    ```java
    package demo;

    public class Box {

      @Override public String toString() {
        return "a basic box";
      }
    }
    ```

1. Run the program again

    ```bash
    ./gradlew run

    > Task :run
    My box a basic box
    ```

### Add State

A box may be open or may be closed.  The program needs to determine whether the box is open or closed before puts things inside.  The `Box` needs to have methods that will allow the program to open and/or close the box and determine whether the box is open or not.

1. Create a test

    ```java
    package demo;

    import org.junit.jupiter.api.DisplayName;
    import org.junit.jupiter.api.Test;

    import static org.junit.jupiter.api.Assertions.assertTrue;

    public class BoxTest {

      @Test
      @DisplayName( "should be open after the open method is called" )
      public void shouldBeOpen() {
        final Box box = new Box();
        box.open();
        assertTrue( box.isOpen() );
      }
    }
    ```

    Add the missing methods (without any special logic) just to make the program compile.

    ```java
    package demo;

    public class Box {

      public void open() {
      }

      public boolean isOpen() {
        return true;
      }

      @Override public String toString() {
        return "a basic box";
      }
    }
    ```

    Run the test.  The test should pass.

1. Add the `close()` functionality

    ```java
    package demo;

    import static org.junit.jupiter.api.Assertions.assertFalse;
    /* Other imports removed for brevity */

    public class BoxTest {
      @Test
      @DisplayName( "should not be open after the close method is called" )
      public void shouldNotBeOpen() {
        final Box box = new Box();
        box.close();
        assertFalse( box.isOpen() );
      }

      /* Other test removed for brevity */
    }
    ```

    Add the missing methods (without any special logic) just to make the program compile.

    ```java
    package demo;

    public class Box {
      public void close() {
      }

      /* Other methods removed for brevity */
    }
    ```

    Run the test.  While the open test passes, the close test fails.

    ```bash
    $ ./gradlew test

    > Task :test FAILED

    BoxTest > should be open after the open method is called PASSED

    BoxTest > should not be open after the close method is called FAILED
        org.opentest4j.AssertionFailedError at BoxTest.java:24

    2 tests completed, 1 failed
    ```

1. Add state to the `Box`

    ```java
    package demo;

    public class Box {

      private boolean open;

      public void open() {
        open = true;
      }

      public void close() {
        open = false;
      }

      public boolean isOpen() {
        return open;
      }

      @Override public String toString() {
        return String.format( "an %s box", open ? "open" : "closed" );
      }
    }
    ```

    Made the `toString()` returning something more meaning full.

1. Run the tests

    ```bash
    $ ./gradlew test

    > Task :test

    BoxTest > should be open after the open method is called PASSED

    BoxTest > should not be open after the close method is called PASSED
    ```

    Both tests pass

## Inheritance

## Interfaces

## Overloading and Overriding

## Outer and Inner Classes

## Enumerations

## Annotations

## Generics
