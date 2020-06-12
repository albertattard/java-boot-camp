---
layout: default
title: Testing static methods
parent: Classes and methods
nav_order: 2
permalink: docs/classes-methods/testing-static/
---

# Testing static methods
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## How can we test functionality that makes use of static methods?

**The scope of this section is to highlight shortcomings of static methods and while itt refers to objects it is not a comprehensive guide to OOP.**  OOP is discussed in depth in the following sections.

The following test invokes our game.

```java
package demo;

import org.junit.jupiter.api.Test;

public class AppTest {

  @Test
  public void shouldDisplayTheDiceRolled() {
    App.main( null );
  }
}
```

This test will print something similar to the following to the output.

```bash
[12:34:56] Game started
[12:34:56] Please roll the 🎲
[12:34:56] You rolled 4 and 2
```

It is hard to verify that the two numbers printed are actually the values that were rolled.

The simplest way to make this example testable is to use objects.  In a nutshell we will need to create and use [test doubles](https://martinfowler.com/bliki/TestDouble.html) to control and verify that our game is behaving as expected.

**Refactoring**

Note that it is hard to refactor code that does not have tests and also maintaining the code functionality intact.

1. Move the game into a separate method `playGame()`.

    ```java
    package demo;

    public class App {
      public static void main( final String[] args ) {
        playGame();
      }

      public static void playGame() {
        Display.print( "Game started" );
        Display.print( "Please roll the 🎲" );

        final int a = Dice.roll();
        final int b = Dice.roll();

        Display.printf( "You rolled %d and %d", a, b );
      }
    }
    ```

    This will not solve the problem, but it's one small step in the right direction.

    Later on, we need to work with test doubles.  Given that we cannot change the signature of the `main()` method, we need to create a new method and use this one.

    ```java
    package demo;

    import org.junit.jupiter.api.Test;

    public class AppTest {

      @Test
      public void shouldDisplayTheDiceRolled() {
        App.playGame();
      }
    }
    ```

    The test will still print something to the console, which is hard to assert.

    ```bash
    [12:34:56] Game started
    [12:34:56] Please roll the 🎲
    [12:34:56] You rolled 3 and 3
    ```

1. Predict the next `roll()` outcome

    One of the challenges we face in testing this application is that we cannot predict the next roll outcome using the current `Dice` class, as the `Dice` class uses a random number generator.

1. Use weighted dice for testing

    ```java
    package demo;

    public class WeightedDice {

      public static int roll() {
        return nextRollValue;
      }

      public static int NEXT_ROLL_VALUE = 6;
    }
    ```

    The `WeightedDice` does not use random number generator.  Instead, it returns the value of `NEXT_ROLL_VALUE`.  Using this version of the dice will allow us to control the behaviour of the game.

1. How can we us the `WeightedDice`?

    The `playGame()` method is calling the `Dice`'s `roll()`.  If we need to swap this we need pass the `Dice` as a parameter to the `playGame()` method.  If we want to pass the `Dice` as a parameter to the `playGame()` method, then we need to convert the `Dice` to an object.

1. Make `Dice` an object

    Somehow, we need to control what the dice rolls are and what is it being printed.  We can do that be controlling the `Dice` output and capturing the `Display` inputs.

    ```java
    package demo;

    import java.util.Random;

    public class Dice {

      public int roll() {
        return randomGenerator.nextInt( 6 ) + 1;
      }

      public final Random randomGenerator = new Random();
    }
    ```

    Note that the variable name was changed from `RANDOM_GENERATOR` to `randomGenerator` too.  `static` fields are written upper case and use underscore to delimit words.  Properties and all methods are usually written in camelcase.

    Use the `Dice` object in the `playGame()` method.

    ```java
    final Dice dice = new Dice();
    final int a = dice.roll();
    final int b = dice.roll();
    ```

    Complete example.

    ```java
    package demo;

    public class App {
      public static void main( final String[] args ) {
        playGame();
      }

      public static void playGame() {
        Display.print( "Game started" );
        Display.print( "Please roll the 🎲" );

        final Dice dice = new Dice();
        final int a = dice.roll();
        final int b = dice.roll();

        Display.printf( "You rolled %d and %d", a, b );
      }
    }
    ```

    The above example is creating the `Dice` object.  The next step would be to pass an instance of the `Dice` class to the `playGame()` method.

1. Provide a `Dice` instance to the `playGame()` method

    ```java
    package demo;

    public class App {
      public static void main( final String[] args ) {
        final Dice dice = new Dice();
        playGame( dice );
      }

      public static void playGame( final Dice dice ) {
        Display.print( "Game started" );
        Display.print( "Please roll the 🎲" );

        final int a = dice.roll();
        final int b = dice.roll();

        Display.printf( "You rolled %d and %d", a, b );
      }
    }
    ```

    Note that now we need to provide an instance of `Dice` in the test too.

    ```java
    package demo;

    import org.junit.jupiter.api.Test;

    public class AppTest {

      @Test
      public void shouldDisplayTheDiceRolled() {
        final Dice dice = new Dice();
        App.playGame( dice );
      }
    }
    ```

1. Convert the `WeightedDice` to an object too.

    If we want to swap the `Dice` with a `WeightedDice` during testing, we need to convert the latter to an object too.

    ```java
    package demo;

    public class WeightedDice {

      public int roll() {
        return nextRollValue;
      }

      public int nextRollValue = 6;
    }
    ```

1. How can we us the `WeightedDice`?

    **⚠️ THE FOLLOWING EXAMPLE WILL NOT COMPILE!!**

    ```java
    package demo;

    import org.junit.jupiter.api.Test;

    public class AppTest {

      @Test
      public void shouldDisplayTheDiceRolled() {
        final Dice dice = new WeightedDice();
        App.playGame( dice );
      }
    }
    ```

    `Dice` and `WeightedDice` are two different types.  The `WeightedDice` class is only used for testing and can inherit from the `Dice` class.  Inheritance will be covered in depth in the [inheritance section](#inheritance).

    ```java
    public class WeightedDice extends Dice {
    ```

    Complete example

    ```java
    package demo;

    public class WeightedDice extends Dice {

      @Override
      public int roll() {
        return nextRollValue;
      }

      public int nextRollValue = 6;
    }
    ```

    Now the `WeightedDice` can be used instead of the `Dice`.  The test will now work.

    ```java
    package demo;

    import org.junit.jupiter.api.Test;

    public class AppTest {

      @Test
      public void shouldDisplayTheDiceRolled() {
        final WeightedDice dice = new WeightedDice();
        dice.nextRollValue = 2;

        App.playGame( dice );
      }
    }
    ```

    Note that irrespective how many times we run the above test, the dice values will always be `2`.  This is great for testing.

    ```bash
    [12:34:56] Game started
    [12:34:56] Please roll the 🎲
    [12:34:56] You rolled 2 and 2
    ```

    The `WeightedDice` is also referred as a [test double](https://martinfowler.com/bliki/TestDouble.html).

We can continue refactoring the application and provide a test double for the `Display` and verify that the right message is being printed.

Martin Fowler talks in more depth about this topic in his [StaticSubstitution article](https://martinfowler.com/bliki/StaticSubstitution.html).

## What does `static` mean?

When a class member (field or method) is marked `static`, that means that this member belongs to the class and not to any instance.  When the `roll()` was `static`, we were able to call it through the `Dice` class name.

```java
Dice.roll()
```

Methods that do not have any state, can be safely marked as `static`, but use this carefully.  As we saw above, it is hard to test functionality that depends on other static methods.

The `Math` class is a good example.

```java
package demo;

public class App {
  public static void main( final String[] args ) {
    final int a = 7;
    final int b = 3;
    final int m = Math.max( a, b );
    System.out.printf( "%d is the largest between %d and %d%n", m, a, b );
  }
}
```

The `max()` method is stateless and thus no need to make it an instance method.

Consider the following example.

```java
package demo;

public class App {
  public static void main( final String[] args ) {
    final Math nullVariable = null;
    final int m = nullVariable.max( 7, 3 );
    System.out.printf( "%d is the largest number%n", m );
  }
}
```

**Will the above example throw a `NullPointerException`?**

The variable `nullVariable` is of type `Math` and is set to `null`.  Invoking the `max()` method should throw a `NullPointerException` but it does not.  The above code will work.

```bash
7 is the largest number
```

**Why this works and does not throw a `NullPointerException`?**

The `max()` method is `static` which means it does not work with the *Java heap*.  `static` members are part of the class metadata, which is not saved in the *Java heap*, but elsewhere.  The class metadata is loaded **once** (per [classloader](https://docs.oracle.com/javase/tutorial/ext/basics/load.html)), which include all `static` fields and all methods definition.  `static` methods cannot access the object's state in the same way the non-static (or instance) method do, thus `static` methods do not interact with the *Java heap*.

When the `max()` method is called in the above context, the `max()` method is simply loaded in the *Java stack* and executed and no interaction with the *Java heap* is made during this process.  When invoking an instance method, the object's state is also involved in the process, which is found in the *Java heap*.

The variable `nullVariable` is of type `Math` and can access any member that this type defines.  The `Math` class has the `max()` `static` method which can be access or through the `Math` class name or through a variable of type `Math`.

### How do `static` fields behave?

The Java API has a [`Point` class](https://docs.oracle.com/en/java/javase/14/docs/api/java.desktop/java/awt/Point.html) that can be used to represent a point on a [cartesian plane](https://en.wikipedia.org/wiki/Cartesian_coordinate_system).

```java
package demo;

import java.awt.Point;

public class App {

  public static void main( final String[] args ) {
    final Point a = new Point( 1, 2 );
    final Point b = new Point( 3, 4 );

    System.out.printf( "Point a: %s%n", a );
    System.out.printf( "Point b: %s%n", b );
  }
}
```

The above example creates two points and prints their state.

```bash
Point a: java.awt.Point[x=1,y=2]
Point b: java.awt.Point[x=3,y=4]
```

Say that we need to capture the persons' name to be then added to an online fictitious address book.  Consider the following example.

```java
package demo;

public class Person {
  public static String name;
}
```

The `Person` class has one `static` field called `name`.

```java
package demo;

public class App {

  public static void main( final String[] args ) {
    final Person aden = new Person();
    aden.name = "Aden";

    System.out.printf( "Person name (aden): %s%n", aden.name );
  }
}
```

The above creates an instance of the `Person` class and print it.

```bash
Person name (aden): Aden
```

Works!!  Let create a second instance of the `Person` class and print both instances.

```java
package demo;

public class App {

  public static void main( final String[] args ) {
    final Person aden = new Person();
    aden.name = "Aden";

    final Person jade = new Person();
    jade.name = "Jade";

    System.out.printf( "Person name (aden): %s%n", aden.name );
    System.out.printf( "Person name (jade): %s%n", jade.name );
  }
}
```

The above will print the following.

```bash
Person name (aden): Jade
Person name (jade): Jade
```

Oops!! What went wrong?  Why we are able to print two different points but not able to print two different persons?

Let's compare the two classes.

The `Point` class has two properties as shown next.

```java
package java.awt;

/* The class was heavily simplified from brevity */

public class Point {
  public int x;
  public int y;

}
```

Different from our `Person`, the two properties shown above do not make use of the `static` modifier.

```java
package demo;

public class Person {
  public static String name;
}
```

A `static` field is not part of the object and thus it is not part of the *Java heap*.  The `static` fields are saved together with the class metadata, which is not saved in the *Java heap*, but elsewhere.  The class metadata is loaded **once** (per [classloader](https://docs.oracle.com/javase/tutorial/ext/basics/load.html)), which include all `static` fields and all methods definition.

Therefore, there is only one copy of the `static` field, `name`.  If one modifies a `static` field, all variables will be affected.  IntelliJ suggests refactoring the code and access the `static` field through the class name.

![Access static field through class name]({{site.baseurl}}/assets/images/Access-static-field-through-class-name.png)

