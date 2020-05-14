# Classes, Methods and Objects

[Effective Java](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/) is a very good and popular book.  Several references are made in this page to specific items described in the book.

## TOC

1. [Setup](#setup)
1. [Anatomy of a Java Class](#anatomy-of-a-java-class)
    1. [Terms](#terms)
1. [Classes and methods (static no OOP)](#classes-and-methods-static-no-oop)
    1. [Is void a type?](#is-void-a-type)
1. [Properties (static no OOP)](#properties-static-no-oop)
1. [How can we test functionality that makes use of static methods?](#how-can-we-test-functionality-that-makes-use-of-static-methods)
    1. [What does static mean?](#what-does-static-mean)
    1. [static Fields](#static-fields)
1. [Access Control](#access-control)
    1. [Classes Access Modifiers Table](#classes-access-modifiers-table)
    1. [Class Members Access Modifiers Table](#class-members-access-modifiers-table)
1. [Simple Objects](#simple-objects)
    1. [Basic Object](#basic-object)
    1. [Add State](#add-state)
    1. [How do instance methods access the object's state?](#how-do-instance-methods-access-the-objects-state)
    1. [Multiple Instances](#multiple-instances)
    1. [Constructors](#constructors)
        1. [How many constructors can a class have?](#how-many-constructors-can-a-class-have)
        1. [What are static factory methods?](#what-are-static-factory-methods)
    1. [More State](#more-state)
    1. [Mutable and Immutable](#mutable-and-immutable)
        1. [How can we create immutable objects?](#how-can-we-create-immutable-objects)
1. [Inheritance](#inheritance)
    1. [Light Box Example](#light-box-example)
    1. [Heavy Box Example](#heavy-box-example)
    1. [The `super` keyword](#the-super-keyword)
    1. [The `final` keyword](#the-final-keyword)
    1. [Private Constructor](#private-constructor)
1. [Abstraction](#abstraction)
    1. [When a class must be abstract?](#when-a-class-must-be-abstract)
    1. [Final Classes](#final-classes)
1. [The Object Class](#the-object-class)
    1. [Puzzle (Animal Farm)](#puzzle-animal-farm)
1. [Interfaces](#interfaces)
    1. [Default methods](#default-methods)
1. [instanceof and cast operators](#instanceof-and-cast-operators)
1. [Inheritance and Composition](#inheritance-and-composition)
1. [Overloading and Overriding](#overloading-and-overriding)
    1. [Overloading](#overloading)
    1. [Overriding](#overriding)
1. [Initialisation Blocks, Outer, Inner and Anonymous Classes](#initialisation-blocks-outer-inner-and-anonymous-classes)
    1. [Initialisation Block](#initialisation-block)
    1. [Static Initialisation Block](#static-initialisation-block)
    1. [Outer Class](#outer-class)
    1. [Inner Class](#inner-class)
    1. [Inner Anonymous Class](#inner-anonymous-class)
1. [Annotations](#annotations)
    1. [Project Lombok](#project-lombok)
1. [Generics](#generics)
1. [Miscellaneous](#miscellaneous)

## Setup

1. Clone Repo: [java-boot-camp-blank](https://github.com/albertattard/java-boot-camp-blank)

    ```bash
    $ git clone https://github.com/albertattard/java-boot-camp-blank.git
    ```

1. Open the repo in IDE

## Anatomy of a Java Class

**The scope of this section is to provide a bird's-eye view of the Java class without diving in any particular depths**.

Throughout the page, there will be mentioned terms such as *property*, *`static` field*, *instance method* and the like.  The following example shows various combinations of these terms all in one place.

```java
package demo;

public class AnatomyJavaClass {

  private int propertyX = 7;

  private static int STATIC_FIELD_X = 3;

  /* Initialisation Block */
  { /* ... */ }

  /* Static Initialisation Block */
  static { /* ... */ }

  public AnatomyJavaClass() { /* ... */ }

  public void instanceMethod() { /* ... */ }

  public static void staticMethod() { /* ... */ }

  public class InnerInstanceClass {

    private int propertyY = 8;

    public void innerInstanceClassInstanceMethod() { /* ... */ }
  }

  public static class InnerStaticClass {

    private int propertyZ = 9;

    private static int STATIC_FIELD_Z = 4;

    public void innerStaticClassInstanceMethod() { /* ... */ }

    public static void innerStaticClassStaticMethod() { /* ... */ }
  }
}

class AnotherTopLevelClassInTheSameSourceFile { /* ... */ }
```

### Terms

1. **package** is the namespace and folder path where the source file is saved

    ```java
    package demo;
    ```

1. **class** the term class always refers to the top level class that has the same name as the file.

    ```java
    public class AnatomyJavaClass { /* ... */ }
    ```

1. **class members** anything that belongs to the class, such as (but not limited to)

    * constructors
    * properties
    * static fields
    * methods
    * inner classes

1. **property** are the instance fields.  In the above example we have four classes including inner classes, three of which have properties.

    1. Property of class `AnatomyJavaClass`

        ```java
        private int propertyX = 7;
        ```

    1. Property of inner instance class `InnerInstanceClass`

        ```java
        private int propertyY = 8;
        ```

    1. Property of inner `static` class `InnerStaticClass`

        ```java
        private int propertyZ = 9;
        ```

1. **`static` field** are fields that belong to the class.  In the above example we have four classes including inner classes, two of which have `static` fields.

    1. `static` field of class `AnatomyJavaClass`

        ```java
        private static int STATIC_FIELD_X = 3;
        ```

    1. `static` field of inner `static` class `InnerStaticClass`

        ```java
        private static int STATIC_FIELD_Z = 4;
        ```

1. **initialisation block**

    ```java
    /* Initialisation Block */
    { /* ... */ }
    ```

1. **static initialisation block**

    ```java
    /* Static Initialisation Block */
    static { /* ... */ }
    ```

1. **constructors** are object initialisation methods that have the same name of the class.

    ```java
    public AnatomyJavaClass() { /* ... */ }
    ```

1. **methods** both instance and `static` methods in a class

    1. instance method in the `AnatomyJavaClass` class

        ```java
        public void instanceMethod() { /* ... */ }
        ```

    1. `static` method in the `AnatomyJavaClass` class

        ```java
        public static void staticMethod() { /* ... */ }
        ```

1. **instance methods**

    1. instance method in the `AnatomyJavaClass` class

        ```java
        public void instanceMethod() { /* ... */ }
        ```

    1. instance method in the `InnerInstanceClass` class

        ```java
        public void innerInstanceClassInstanceMethod() { /* ... */ }
        ```

    1. instance method in the `InnerStaticClass` class

        ```java
        public void innerStaticClassInstanceMethod() { /* ... */ }
        ```

1. **`static` methods**

    1. instance method in the `AnatomyJavaClass` class

        ```java
        public static void staticMethod() { /* ... */ }
        ```

    1. instance method in the `InnerStaticClass` class

        ```java
        public static void innerStaticClassStaticMethod() { /* ... */ }
        ```

1. **inner classes**

    1. The `InnerInstanceClass` class

        ```java
        public class InnerInstanceClass { /* ... */ }
        ```

    1. The `InnerStaticClass` class

        ```java
        public static class InnerStaticClass { /* ... */ }
        ```

1. **inner instance class**

    ```java
    public class InnerInstanceClass { /* ... */ }
    ```

1. **inner anonymous class** (missing in the above)

1. **`static` inner class**

    ```java
    public static class InnerStaticClass { /* ... */ }
    ```

1. **Top Level Classes**

    1. The public class with the same name as the file containing it

        ```java
        public class AnatomyJavaClass { /* ... */ }
        ```

    1. The second class that has a different name from the source file containing it

        ```java
        class AnotherTopLevelClassInTheSameSourceFile { /* ... */ }
        ```

## Classes and methods (static no OOP)

Consider the following example

```java
package demo;

import java.time.LocalTime;
import java.util.Random;

public class App {
  public static void main( final String[] args ) {
    System.out.printf( "[%tH:%<tM:%<tS] Game started%n", LocalTime.now() );
    System.out.printf( "[%tH:%<tM:%<tS] Please roll the 🎲%n", LocalTime.now() );

    final Random r = new Random();
    final int a = r.nextInt( 6 ) + 1;
    final int b = r.nextInt( 6 ) + 1;

    System.out.printf( "[%tH:%<tM:%<tS] You rolled %d and %d%n", LocalTime.now(), a, b );
  }
}
```

Output

```bash
[12:34:56] Game started
[12:34:56] Please roll the 🎲
[12:34:56] You rolled 2 and 1
```

**Observations**

1. The `main()` method is cluttered and cannot easily say what's happening

1. Cannot understand what the following is doing by simply reading the code

    ```java
    final int a = r.nextInt( 6 ) + 1;
    ```

    We can deduct that this is related to rolling of dice based on the log messages preceding and following this statement.

1. All output messages have the same format:

    ```java
    System.out.printf( "[%tH:%<tM:%<tS] message%n", LocalTime.now() );
    ```

1. It is not easy to test the above code despite its simplicity

**Refactoring**

1. Move the dice logic to a separate class

    Create a file called `Dice.java`

    ```java
    package demo;

    import java.util.Random;

    public class Dice {

      public static int roll() {
        final Random r = new Random();
        return r.nextInt( 6 ) + 1;
      }
    }
    ```

    **Note that a class which is declared `public` should be in a file of the same name**, otherwise it will not compile.  The public class `Dice` must be in a file with the same name, `Dice.java`.

1. Use the new method `roll()` defined in the `Dice` class

    ```java
    package demo;

    import java.time.LocalTime;

    public class App {
      public static void main( final String[] args ) {
        System.out.printf( "[%tH:%<tM:%<tS] Game started%n", LocalTime.now() );
        System.out.printf( "[%tH:%<tM:%<tS] Please roll the 🎲%n", LocalTime.now() );

        final int a = Dice.roll();
        final int b = Dice.roll();

        System.out.printf( "[%tH:%<tM:%<tS] You rolled %d and %d%n", LocalTime.now(), a, b );
      }
    }
    ```

1. Move the messaging logic to a separate class

    Create a file called `Display.java`

    ```java
    package demo;

    import java.time.LocalTime;

    public class Display {
      public static void print( final String message ) {
        System.out.printf( "[%tH:%<tM:%<tS] %s%n", LocalTime.now(), message );
      }
    }
    ```

1. Use the new method `print()` defined in the `Display` class

    ```java
    package demo;

    public class App {
      public static void main( final String[] args ) {
        Display.print( "Game started" );
        Display.print( "Please roll the 🎲" );

        final int a = Dice.roll();
        final int b = Dice.roll();

        /* We still had to format the string */
        Display.print( String.format( "You rolled %d and %d", a, b ) );
      }
    }
    ```

1. Add formatting support to the `Display` class

    ```java
      public static void printf( final String pattern, final Object... parameters ) {
        print( String.format( pattern, parameters ) );
      }
    ```

    Full example

    ```java
    package demo;

    import java.time.LocalTime;

    public class Display {
      public static void printf( final String pattern, final Object... parameters ) {
        print( String.format( pattern, parameters ) );
      }

      public static void print( final String message ) {
        System.out.printf( "[%tH:%<tM:%<tS] %s%n", LocalTime.now(), message );
      }
    }
    ```

1. Use the new `printf()` method

    ```java
    package demo;

    public class App {
      public static void main( final String[] args ) {
        Display.print( "Game started" );
        Display.print( "Please roll the 🎲" );

        final int a = Dice.roll();
        final int b = Dice.roll();

        Display.printf( "You rolled %d and %d", a, b );
      }
    }
    ```

1. How does refactoring simplify testing?

    Not much.  The code is simpler to ready, but still very hard to test.  We will improve this [later on](#how-can-we-test-functionality-that-makes-use-of-static).

    One key takeaway here is that using `static` methods, bound our `main()` method to the `Dice.roll()` and the `Display.print()` methods and this makes our method hard to test.  There are tools we can use that will allow us to test our code, but issue here is our design.

    **Always tackle the root problem and do not throw more complexity at it**.

### Is void a type?

The `roll()` method in the `Dice` class returns `int`

```java
public static int roll() {
  final Random r = new Random();
  return r.nextInt( 6 ) + 1;
}
```

The `print()` method in the `Display` returns `void`.

```java
public static void print( final String message ) {
  System.out.printf( "[%tH:%<tM:%<tS] %s%n", LocalTime.now(), message );
}
```

Is `void` a type?  No, the keyword `void` is not a type.

Consider the following example.

**⚠️ THE FOLLOWING EXAMPLE WILL NOT COMPILE!!**

```java
package demo;

public class App {

  public static void main( final String[] args ) {
    int a;
    void b;
  }
}
```

While `int` is a type and we can create a variable of type `int`, `void` is not a type.  The keyword `void` is used by methods to indicate that the method returns nothing.

This quite unique to Java as other languages always return a type.  The decision of having `void` as a non-type caused some complications in the newer versions of Java, such as lambda.

## Properties (static no OOP)

Consider the following program

```java
package demo;

import java.util.Random;

public class Dice {

  public static int roll() {
    final Random r = new Random();
    return r.nextInt( 6 ) + 1;
  }
}
```

**Observation**

1. Every time the `roll()` method is invoked, a new instance of `Random` is created.

    Do we need to create a new instance, every time we invoke the `roll()` method?

**Refactoring**

1. The `random` variable can be moved outside the method and make it a class level variable

    ```java
    package demo;

    import java.util.Random;

    public class Dice {

      public static int roll() {
        return RANDOM_GENERATOR.nextInt( 6 ) + 1;
      }

      public static final Random RANDOM_GENERATOR = new Random();
    }
    ```

    Note that we now have a longer and more meaningful name, `RANDOM_GENERATOR`.  The bigger the variable scope, the more thought needs to be put into the variable's name.

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

    The `WeightedDice` is also referred as a [test double](https://martinfowler.com/bliki/TestDouble.html).  These are covered in detail in the [testing section](06%20-%20Testing.md).

We can continue refactoring the application and provide a test double for the `Display` and verify that the right message is being printed.  This is beyond the scope of this exercise and is covered in detail in the [testing section](06%20-%20Testing.md).

### What does static mean?

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

The `max()` method is `static` which means it does not work with the *Java heap*.  `static` members are part of the class metadata, which is not saved in the *Java heap*, but elsewhere.  The class metadata is loaded **once** (per [classloader](https://docs.oracle.com/javase/tutorial/ext/basics/load.html)), which include all `static` fields and all methods definition.  `static` methods cannot access the object state in the same way the non-static (or instance) method do, thus `static` methods do not interact with the *Java heap*.

When the `max()` method is called in the above context, the `max()` method is simply loaded in the *Java stack* and executed and no interaction with the *Java heap* is made during this process.  When invoking an instance method, the object's state is also involved in the process, which is found in the *Java heap*.

The variable `nullVariable` is of type `Math` and can access any member that this type defines.  The `Math` class has the `max()` `static` method which can be access or through the `Math` class name or through a variable of type `Math`.

### static Fields

The Java API has a [`Point` class](https://docs.oracle.com/en/java/javase/14/docs/api/java.desktop/java/awt/Point.html) that represents a point on a [cartesian plane](https://en.wikipedia.org/wiki/Cartesian_coordinate_system).

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
    final Person albert = new Person();
    albert.name = "Albert";

    System.out.printf( "Person name (albert): %s%n", albert.name );
  }
}
```

The above creates an instance of the `Person` class and print it.

```bash
Person name (albert): Albert
```

Works!!  Let create a second instance of the `Person` class and print both instances.

```java
package demo;

public class App {

  public static void main( final String[] args ) {
    final Person albert = new Person();
    albert.name = "Albert";

    final Person mary = new Person();
    mary.name = "Mary";

    System.out.printf( "Person name (albert): %s%n", albert.name );
    System.out.printf( "Person name (mary): %s%n", mary.name );
  }
}
```

The above will print the following.

```bash
Person name (albert): Mary
Person name (mary): Mary
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

![Access static field through class name](assets/images/Access%20static%20field%20through%20class%20name.png)

## Access Control

We know that the `Random` class created a pseudo random sequence.  This means that we can predict the next number to be drawn after making several observations.

Consider the following example.

```java
package demo;

import java.util.Random;

public class Dice {

  public static int roll() {
    return RANDOM_GENERATOR.nextInt( 6 ) + 1;
  }

  public static final Random RANDOM_GENERATOR = new Random(1);
}
```

The `Random` object is initialised with a seed to simplify the example.  Both the `roll()` method and the `random` static field can be accessed from anywhere.  An attacker can take advantage of that and force the next dice roll to be a `6`.

Consider the following example.

```java
package demo;

public class App {

  public static void main( final String[] args ) {
    /* This method is hacked by an attacker */
    initGame();

    /* This will always roll a 6 */
    playGame();
  }

  public static void playGame() {
    final int a = Dice.roll();
    System.out.printf( "I rolled a %s%n", a );
  }

  public static void initGame() {
    /* Skip some numbers so that the next roll, rolls a 6 */
    for ( int i = 0; i < 19; i++ ) {
      Dice.RANDOM_GENERATOR.nextInt();
    }
  }
}
```

Observations

1. The attacker first called the `nextInt()` method `19` times.

    ```java
        for ( int i = 0; i < 19; i++ ) {
          Dice.random.nextInt();
        }
    ```

   The attacker knows that the 20th roll will yield a `6`.

1. The attacker then rolled the dice normally

    ```java
        final int a = Dice.roll();
        System.out.printf( "I rolled a %s%n", a );
    ```

    and obtained the expected the attacker wanted.

    ```bash
    I rolled a 6
    ```

    The attacker can also skip ahead some numbers to make the opponent lose, by rolling a smaller number.

1. The `Dice` class uses static fields on purpose.  Only one instance of the `static` field `RANDOM_GENERATOR` exists and anyone can access it from anywhere in the code.

Using access modifies, access to classes and their members (properties, static fields and methods) can be restricted.  Making the static field `random` `private` will not allow an attacker to access the static field directly.

```java
package demo;

import java.util.Random;

public class Dice {

  public static int roll() {
    return RANDOM_GENERATOR.nextInt( 6 ) + 1;
  }

  private static final Random RANDOM_GENERATOR = new Random( 1 );
}
```

The attacker cannot now access the `random` field.

**⚠️ THE FOLLOWING EXAMPLE WILL NOT COMPILE!!**

```java
package demo;

public class App {

  public static void main( final String[] args ) {
    /* This method is hacked by an attacker */
    initGame();

    /* This will always roll a 6 */
    playGame();
  }

  public static void playGame() {
    final int a = Dice.roll();
    System.out.printf( "I rolled a %s%n", a );
  }

  public static void initGame() {
    /* Skip some numbers */
    for ( int i = 0; i < 19; i++ ) {
      Dice.RANDOM_GENERATOR.nextInt();
    }
  }
}
```

The following error will be produced

```bash
src/main/java/demo/App.java:21: error: RANDOM_GENERATOR has private access in Dice
      Dice.RANDOM_GENERATOR.nextInt();
          ^
```

### Classes Access Modifiers Table

| Access Modifier | Accessible From |
|-----------------|-----------------|
| `public`        | Anywhere        |
| (no modifier)   | same package    |

### Class Members Access Modifiers Table

| Access Modifier | From Same Class | From Same Package | From Subclass | From Anywhere |
|-----------------|:---------------:|:-----------------:|:-------------:|:-------------:|
| `public`        |       Yes       |       Yes         |      Yes      |      Yes      |
| `protected`     |       Yes       |       Yes         |      Yes      |       No      |
| (no modifier)   |       Yes       |       Yes         |       No      |       No      |
| `private`       |       Yes       |        No         |       No      |       No      |

Note that there can be more than one class within the same file.  Two or more classes in the same file are considered as classes in the same package.

**⚠️ THE FOLLOWING EXAMPLE WILL NOT COMPILE!!**

```java
package demo;

public class A {
  public static void printIt() {
    System.out.printf( "The value of c is %d%n", B.c );
  }
}

class B {
  private static final int c = 7;
}
```

Both classes are defined in the same source file, `A.java`, yet these are two different classes within the same package.

```bash
$ tree build/classes/java
build/classes/java
└── main
    └── demo
        ├── A.class
        └── B.class
```

There is one exception to this rule.  Consider the following example.

```java
package demo;

public class App {

  private static final int c = 7;

  public static void main( final String[] args ) {
    final Runnable r = new Runnable() {
      @Override public void run() {
        System.out.printf( "The value of c is %d%n", c );
      }
    };
    r.run();
  }
}
```

An inner anonymous class ([discussed in depth later on](#outer-inner-and-anonymous-classes)) is created within the `App` class.

```java
final Runnable r = new Runnable() {
  @Override public void run() {
    System.out.printf( "The value of c is %d%n", c );
  }
};
```

This is compiled as a separate class file, `App$1.class`.

```bash
$ tree build/classes/java
build/classes/java
└── main
    └── demo
        ├── App$1.class
        └── App.class
```

Despite being a different class within the same package, the inner anonymous class is still allowed to access `private` members within the parent class.

More information about [access control can be found in this tutorial](https://docs.oracle.com/javase/tutorial/java/javaOO/accesscontrol.html).

## Simple Objects

The post-office is automating the packaging of letters or items into boxes and is creating a program to handles this.  There are two types of boxes, the light boxes and the heavy boxes.  The light boxes only take one item in them whereas the heavy boxes can take as many items as it can fit.

### Basic Object

Let start by creating a basic object that will represent a box.  The box will not have any functionality.  Do not worry about light and heavy boxes just yet.

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

      @Override
      public String toString() {
        return "a basic box";
      }
    }
    ```

    [Effective Java](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/)
    1. [Item 12: Always override toString](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/ch3.xhtml#lev12)
    1. [Item 40: Consistently use the Override annotation](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/ch6.xhtml#lev40)

    The above example shows [overriding which is discussed in depth later on](#overriding).

1. Run the program again

    ```bash
    $ ./gradlew run

    > Task :run
    My box a basic box
    ```

### Add State

A box may be open or may be closed.  The program needs to determine whether the box is open or closed before putting things inside.  The `Box` needs to have methods that will allow the program to open and/or close the box and determine whether the box is open or not.

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

      @Override
      public String toString() {
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

    Run the test.  While the *open* test passes, the *close* test fails.

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

      @Override
      public String toString() {
        return String.format( "%s box", open ? "an open" : "a closed" );
      }
    }
    ```

    Updated the `toString()` to return something more meaningful.

1. Run the tests

    ```bash
    $ ./gradlew test

    > Task :test

    BoxTest > should be open after the open method is called PASSED

    BoxTest > should not be open after the close method is called PASSED
    ```

    Both tests pass

### How do instance methods access the object's state?

The `Box` class, shown next, has four **instance** (not `static`) methods, all of which access the `open` property.

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

  @Override
  public String toString() {
    return String.format( "%s box", open ? "an open" : "a closed" );
  }
}
```

When a method (*instance* or `static`) is invoked, the method's state (such as local variables) is loaded on the *Java stack* as a new frame.  All method's variables exists in the method's frame in the *Java stack*.  The method can only reach within its frame.  The classloader makes sure of that during the class loading process.  Instance methods have also access to the objects' properties.  In this case, all four instance methods will have access to all object's properties too.

**On the other hand, `static` methods cannot access the object state**.

Different from local variables, when a method modifies the object's state, then all other methods will observe these changes.  There is a small caveat on this which will be discussed in more detail when we talk about [concurrency]().

### Multiple Instances

Consider the following example.

```java
package demo;

public class App {

  public static void main( final String[] args ) {
    /* Create two boxes */
    final Box a = new Box();
    final Box b = new Box();

    System.out.println( "-- Two boxes --------" );
    System.out.printf( "Box a: %s%n", a );
    System.out.printf( "Box b: %s%n", b );

    /* Open only one of the boxes */
    b.open();

    System.out.println( "-- Opened box b -----" );
    System.out.printf( "Box a: %s%n", a );
    System.out.printf( "Box b: %s%n", b );

    /* Close one of the boxes */
    b.close();

    System.out.println( "-- Closed box b -----" );
    System.out.printf( "Box a: %s%n", a );
    System.out.printf( "Box b: %s%n", b );
  }
}
```

Output

```bash
-- Two boxes --------
Box a: a closed box
Box b: a closed box
-- Opened box b -----
Box a: a closed box
Box b: an open box
-- Closed box b -----
Box a: a closed box
Box b: a closed box
```

Both boxes are independent and while one of the boxes is opened, the other one is unaffected.  The state of one box is independent from all other boxes.  Note that the same methods are used by all instances of the object, while each object maintain its state.  Instance methods need to work with an instance, and that's why a `NullPointerException` is thrown when the we try to invoke an instance method on a `null` variable.

Consider the following two objects and the variables `x` and `y`, both of type `Box`.

```java
final Box x = new Box();
final Box y = new Box();
```

An instance method needs to be invoked on an object or a non-null variable.  When an instance method is invoked, Java will fetch all properties for that object and make them available to the instance method.

Consider the following code fragment.

```java
x.open();
```

Java will fetch the object, to which the variable `x` is pointing to, and will make all object's properties available the instance method `open()`.  The above instance method will change the object's state and will only affects the object to which variable `x` points to.  The state of the object to which variable `y` is pointing to is not affected by the above instance method call.

Consider the following example.

```java
boolean isOpen = new Box().isOpen();
```

The above is a valid example.  Here a new instance of `Box` is create and then the method `isOpen()` is invoked against the new instance.  Here the `Box` instance is not assigned to any variable and instead is used directly.  The above example will evaluate to `false`, which is the default value of the `open` property.

It is worth mentioning that an object is created in the *Java heap* and no variable are pointing to it.  This object will be picked up by the garbage collector and removes it from the *Java heap*.

### Constructors

The `Box` does not contain any methods called `Box()` that take no parameters.  What method do we call when we execute `new Box()`?

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

  @Override
  public String toString() {
    return String.format( "%s box", open ? "an open" : "a closed" );
  }
}
```

Methods that have the same name (case-sensitive) as the classes are constructors.  Constructors are special instance like methods used to initialise objects.  All Java classes (with no exception) need to have a constructor and Java provides one if none are provided.

The `Box` class has no constructors defined, thus Java provided one for us.  Java provides a default (also known as the *no-args-constructor*) when no constructors are present in a class.

We can define a constructor as shown in the following example.

```java
package demo;

public class Box {

  public Box() {
  }

  /* Members removed for brevity */
}
```

A constructor looks similar to a method but has the following constraints
1. The name of the constructor needs to be the same as the class name (case-sensitive)
1. The constructor does not return anything, do not make use of `void`, and cannot use the `return` keyword to return a value.
1. The `static` modifier cannot be used with a constructor

Apart from the above, a constructor is similar to a method.

#### How many constructors can a class have?

**A class can have as many constructors as needs as long as each constructor has a unique signature**.

Let say that we would like to have the possibility to create an instance of a `Box` and also set its state.  We can do that by using a constructor.

```java
package demo;

public class Box {

  private boolean open;

  public Box( boolean open ) {
    this.open = open;
  }

  public void open() {
    open = true;
  }

  public void close() {
    open = false;
  }

  public boolean isOpen() {
    return open;
  }

  @Override
  public String toString() {
    return String.format( "%s box", open ? "an open" : "a closed" );
  }
}
```

The `Box` shown in the above example has **ONE** constructor.  When creating an instance of a `Box`, the caller needs to also provide the state (either *open* or *closed*).

**⚠️ THE FOLLOWING EXAMPLE DOES NOT COMPILE.**

```java
package demo;

public class App {

  public static void main( String[] args ) {
    final Box a = new Box();
  }
}
```

This is a bit annoying as we are forcing the callers to always pass a `open` state.  We can add the second constructor and allow the caller to pick the most suitable constructor.

```java
package demo;

public class Box {

  private boolean open;

  public Box() {
  }

  public Box( boolean open ) {
    this.open = open;
  }

  /* Methods removed for brevity */
}
```

Java will only provide a default constructor when no constructors are provided.

#### What are static factory methods?

The [first item in the Effective Java book](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/ch2.xhtml#lev1) talks about static factory methods and recommends them over constructors.

Consider the following example.

```java
package demo;

public class BoxDimensions {

  private int width;
  private int height;
  private int depth;

}
```

The class `BoxDimensions` captures the dimensions of a box.  Say that we would like to create the following constructors:

1. Takes two parameters the `base` and the `height`.  The following table shows the mapping between the properties and the parameters.

    | Parameter | Property |
    |-----------|----------|
    | `base`    | `width`  |
    | `base`    | `depth`  |
    | `height`  | `height` |

1. Take two parameters the `side` and the `depth`.  The following table shows the mapping between the properties and the parameters.

    | Parameter | Property |
    |-----------|----------|
    | `side`    | `width`  |
    | `side`    | `height` |
    | `depth`   | `depth`  |

These two constructors have the same signature as shown in the following example.

**⚠️ THE FOLLOWING EXAMPLE DOES NOT COMPILE.**

```java
package demo;

public class BoxDimensions {

  private int width;
  private int height;
  private int depth;

  public BoxDimensions( int base, int height ) {
    this.width = base;
    this.depth = base;
    this.height = height;
  }

  public BoxDimensions( int side, int depth ) {
    this.width = side;
    this.height = side;
    this.depth = depth;
  }
}
```

Both constructors have the same signature, thus Java cannot tell apart.  Consider the following code fragment.

```java
new BoxDimensions(7, 3);
```

Which constructor are we referring to in the above fragment?

There were several attempts to solve this problem, some of them are not that good.  A not so good approach is to use a different type to represent one of the parameters (not the object's property).

```java
public BoxDimensions( int base, float height ) { /*...*/ }

public BoxDimensions( int side, int depth ) { /*...*/ }
```

The above code fragment uses `float` to differentiate between the constructors.  This will work, but we have better options and is only mentioned here so that you are aware of it.

`static` methods can be used to create an instance of the same class.  These are referred to as **static factory methods**.

```java
public static BoxDimensions withBaseAndHeight( int base, int height ) {
  return new BoxDimensions( base, height, base );
}
```

Methods are more flexible with names compared to constructors and we can use a meaningful name.  Note that we can create an instance of any class from anywhere we need (given that we are allowed to do so).

```java
package demo;

public class BoxDimensions {

  private int width;
  private int height;
  private int depth;

  public BoxDimensions( final int width, final int height, final int depth ) {
    this.width = width;
    this.height = height;
    this.depth = depth;
  }

  public static BoxDimensions withBaseAndHeight( int base, int height ) {
    return new BoxDimensions( base, height, base );
  }

  public static BoxDimensions withSideAndDepth( int side, int depth ) {
    return new BoxDimensions( side, side, depth );
  }
}
```

### More State

Boxes have labels printed on the sides.  The label is a simple text identifying the box.  Following are some examples of label:

1. `To be processed by Dept. XYZ`
1. `Need to be rechecked by MNO`

A box always has a label which is initially set to: `No label`.  **Note that the label cannot be blank/empty**.

The label can be represented by the `String` data-type.

1. By default, the label should have the value of `No label`.

    ```java
    package demo;

    import static org.junit.jupiter.api.Assertions.assertEquals;
    /* Other imports removed for brevity */

    public class BoxTest {

      @Test
      @DisplayName( "should have a default label value of 'No Label'" )
      public void shouldHaveADefaultLabel() {
        final Box box = new Box();
        assertEquals( "No Label", box.getLabel() );
      }

      /* Other test removed for brevity */
    }
    ```

    Add the missing method (without any special logic) just to make the program compile.

    ```java
    package demo;

    public class Box {

      public String getLabel() {
        return "No Label";
      }

      /* Other members removed for brevity */
    }
    ```

    Run the tests.  All tests should pass.

1. Add the ability to change the label (assuming that only valid values will be provided)

    ```java
    package demo;

    /* Imports removed for brevity */

    public class BoxTest {

      @Test
      @DisplayName( "should have the given label value" )
      public void shouldHaveTheGivenLabel() {
        final Box box = new Box();
        box.setLabel( "Test Label" );
        assertEquals( "Test Label", box.getLabel() );
      }

      /* Other tests removed for brevity */
    }
    ```

    Add the missing method (without any special logic) just to make the program compile.

    ```java
    package demo;

    public class Box {

      public void setLabel( final String label ) {
      }

      /* Other members removed for brevity */
    }
    ```

    The test should fail.

1. Implement the required logic

    ```java
    package demo;

    public class Box {

      private String label = "No Label";

      public void setLabel( final String label ) {
        this.label = label;
      }

      public String getLabel() {
        return label;
      }

      @Override
      public String toString() {
        final String openClose = open ? "an open" : "a closed";
        return String.format( "%s box labelled '%s'", openClose, label );
      }

      /* Other members removed for brevity */
    }
    ```

    Re-run the tests.  All should pass.

    The [`this` keyword](https://docs.oracle.com/javase/tutorial/java/javaOO/thiskey.html) always represents the object.  Different from some other languages like [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this), there is not need to bind it or do any gymnastics.

1. Make sure that invalid labels are rejected by throwing an `IllegalArgumaneException`

    Following is a list of some invalid labels
    * `null` (null)
    * `""` (blank string)
    * `"   "` (only whitespaces)

    The [`@ValueSource` annotation](https://junit.org/junit5/docs/5.2.0/api/org/junit/jupiter/params/provider/ValueSource.html) does not support `null`s and the following will not compile.

    ```java
    @ValueSource( strings = { "", " ", null } )
    ```

    We can pass `"null"` as a string value, as shown next, but this will be treated as string

    ```java
    @ValueSource( strings = { "", " ", "null" } )
    ```

    We can use a custom converter that help us convert the above sample.

    ```java
    package demo;

    import org.junit.jupiter.params.converter.ArgumentConversionException;
    import org.junit.jupiter.params.converter.DefaultArgumentConverter;
    import org.junit.jupiter.params.converter.SimpleArgumentConverter;

    public final class NullableConverter extends SimpleArgumentConverter {
      @Override
      protected Object convert( Object source, Class<?> targetType ) throws ArgumentConversionException {
        if ( "null".equals( source ) ) {
          return null;
        }
        return DefaultArgumentConverter.INSTANCE.convert( source, targetType );
      }
    }
    ```

    The above converter converts the text `"null"` to an actual `null`.  Otherwise, it calls the default converter and let it deal with the conversion.

    Add a test and use the `NullableConverter` converter.

    ```java
    package demo;

    import org.junit.jupiter.params.ParameterizedTest;
    import org.junit.jupiter.params.converter.ConvertWith;
    import org.junit.jupiter.params.provider.ValueSource;

    import static org.junit.jupiter.api.Assertions.assertThrows;
    /* Other imports removed for brevity */

    public class BoxTest {

      @ParameterizedTest( name = "should throw an IllegalArgumentException when given and invalid label ''{0}''" )
      @ValueSource( strings = { "", " ", "null" } )
      public void shouldThrowAnExceptionWhenGivenInvalidLabel( @ConvertWith( NullableConverter.class ) String invalidLabel ) {
        final Box box = new Box();
        assertThrows( IllegalArgumentException.class, () -> box.setLabel( invalidLabel ) );
      }

      /* Other tests removed for brevity */
    }
    ```

    Run the test.  The test should fail as we have no validations in place yet.

    ```bash
    $ ./gradlew test

    ...

    BoxTest > should throw an IllegalArgumentException when given and invalid label '' FAILED
        org.opentest4j.AssertionFailedError at BoxTest.java:51

    BoxTest > should throw an IllegalArgumentException when given and invalid label ' ' FAILED
        org.opentest4j.AssertionFailedError at BoxTest.java:51

    BoxTest > should throw an IllegalArgumentException when given and invalid label 'null' FAILED
        org.opentest4j.AssertionFailedError at BoxTest.java:51

    ...
    ```

1. Add the validation

    ```java
    package demo;

    import com.google.common.base.Preconditions;
    import com.google.common.base.Strings;

    public class Box {

      public void setLabel( String label ) throws IllegalArgumentException {
        Preconditions.checkArgument( false == Strings.nullToEmpty( label ).isBlank() );
        this.label = label;
      }

      /* Other members removed for brevity */
    }
    ```

    The above example makes use of [Google Guava](https://mvnrepository.com/artifact/com.google.guava/guava).

    ```groovy
    dependencies {
      implementation 'com.google.guava:guava:29.0-jre'
    }
    ```

    Run the tests again.  All tests should pass.

    ```bash
    $ ./gradlew test

    ...

    BoxTest > should throw an IllegalArgumentException when given and invalid label '' PASSED

    BoxTest > should throw an IllegalArgumentException when given and invalid label ' ' PASSED

    BoxTest > should throw an IllegalArgumentException when given and invalid label 'null' PASSED

    ...
    ```

### Mutable and Immutable

Consider the following example.

```java
package demo;

public class App {

  public static void main( String[] args ) {
    final Box a = new Box();

    System.out.println( "-- Initial State ----" );
    System.out.printf( "Box: %s%n", a );

    a.open();
    System.out.println( "-- Mutated State ----" );
    System.out.printf( "Box: %s%n", a );
  }
}
```

Output

```bash
-- Initial State ----
Box: a closed box labelled 'No Label'
-- Mutated State ----
Box: an open box labelled 'No Label'
```

The variable `a` is immutable and cannot be modified.  We cannot create a new `Box` and assign it to the variable `a`.

⚠️ THE FOLLOWING EXAMPLE WILL NOT COMPILE!!

```java
package demo;

public class App {

  public static void main( String[] args ) {
    final Box a = new Box();

    /* Cannot reassign!! */
    a = new Box();
  }
}
```

The above will not compile as variable `a` is marked final which means that variable `a` cannot change its value.

The `Box` object is mutable, which means we can modify its state.  While variable `a` is final, the object to which variable `a` points to is mutable and thus the object can be modified.

#### How can we create immutable objects?

Consider the following example.

```java
package demo;

public class Item {

  private final double weight;

  public Item( final double weight ) {
    this.weight = weight;
  }

  public double getWeight() {
    return weight;
  }

  @Override
  public String toString() {
    return String.format( "Item weighs %.4fKg", weight );
  }
}
```

The `Item` class shown above, represents an item and its weight as a property of type `double`, named `weight`.  The property is `final`, which means that it cannot be modified once it is set.

Note that the above example has a constructor that takes the `weight` as its parameter.  The item's weight needs to be provided when the item is created as otherwise the `weight` property will not have a value.

It is important to note that the objects may point to other objects.  Consider the following example.  Consider the following class.

```java
package demo;

public class Destination {

  private String department;

  public String getDepartment() {
    return department;
  }

  public void setDepartment( final String department ) {
    this.department = department;
  }

  @Override public String toString() {
    return String.format( "Destination: %s", department );
  }
}
```

The above class represents a destination where the item needs to be sent to.  The **`department` property is mutable**, as it is **not** marked `final`.  Consider the following updated version of the `Item` class.

```java
package demo;

public class Item {

  private final double weight;
  private final Destination destination;

  public Item( final double weight, final Destination destination ) {
    this.weight = weight;
    this.destination = destination;
  }

  public double getWeight() {
    return weight;
  }

  public Destination getDestination() {
    return destination;
  }

  @Override public String toString() {
    return String.format( "Item weighing %.4fKg, needs to go to %s", weight, destination );
  }
}
```

The state defined by the `Item` class is immutable as both properties are marked `final`.

```java
private final double weight;
private final Destination destination;
```

This means that we cannot change the variable values of these two properties after the object is created.

The state defined by the `Destination` class is mutable.  This means that we can change the destination of an item even after the item is created.

```java
package demo;

public class App {

  public static void main( String[] args ) {
    final Destination a = new Destination();
    a.setDepartment( "Testing" );

    final Item b = new Item( 1.2, a );
    System.out.println( "-- Before changing the destination ----" );
    System.out.println( b );

    /* Change the department after creating the item */
    a.setDepartment( "Programming" );
    System.out.println( "-- After changing the destination -----" );
    System.out.println( b );
  }
}
```

The above example will print

```bash
-- Before changing the destination ----
Item weighing 1,2000Kg, needs to go to Destination: Testing
-- After changing the destination -----
Item weighing 1,2000Kg, needs to go to Destination: Programming
```

**It is not recommended to mix mutable and immutable types as this may give you a `false` sense of security**.  By mistake, one may believe that the `Item` is immutable, when it is not.  If you need to rely on mutable state within immutable objects, make use of mechanisms, such as defensive copying ([discussed later on](04%20-%20Collections.md#defensive-copyings)), to mitigate mutation side effects.

## Inheritance

There are two types of boxes.  The light boxes, which are boxes that can contain only one item.  The heavy boxes can take more than one item.  Both boxes can be open or closed and can be opened and closed using the methods created above.

### Light Box Example

1. Create the `LightBox` and add the `isEmpty()` method

    ```java
    package demo;

    import org.junit.jupiter.api.DisplayName;
    import org.junit.jupiter.api.Test;

    import static org.junit.jupiter.api.Assertions.assertTrue;

    public class LightBoxTest {

      @Test
      @DisplayName( "should be empty when no items are placed" )
      public void shouldBeEmpty() {
        final LightBox box = new LightBox();
        assertTrue( box.isEmpty() );
      }
    }
    ```

    Add the missing method (without any special logic) just to make the program compile.

    ```java
    package demo;

    public class LightBox {

      public boolean isEmpty() {
        return true;
      }
    }
    ```

    Test should pass.

1.  Like a box, light box can be opened and closed.  This logic can either be copied here, or inherited from the `Box` class.

    ```java
    package demo;

    public class LightBox extends Box {

      public boolean isEmpty() {
        return true;
      }
    }
    ```

    The `LightBox` [inherits from (or extends)](https://docs.oracle.com/javase/tutorial/java/IandI/subclasses.html) `Box`, which is referred to as the [super class](https://docs.oracle.com/javase/tutorial/java/IandI/super.html).

    All `LightBox`es are `Box`es.

    ```java
    package demo;

    public class App {

      public static void main( String[] args ) {
        final LightBox a = new LightBox();
        final Box b = new LightBox();

        a.open();
        b.close();

        System.out.printf( "Box a: %s%n", a );
        System.out.printf( "Box b: %s%n", b );
      }
    }
    ```

    All methods and state available to the `Box` is not also available to the `LightBox`.

    ```bash
    Box a: an open box
    Box b: a closed box
    ```

    Note that the opposite does not hold.  In other words, not all `Box`es are `LightBox`es.  Fruit is a good analogy to this.  All apples are fruit but not all fruit are apples.

    The following will not compile.

    ```java
    final LightBox a = new Box();
    ```

    This is discussed further in the [instanceof and cast operators section](#instanceof-and-cast-operators).

1. Add the ability to add an item's id (of type `long`) to the `LightBox`.

    **The light box should not be empty (the `isEmpty()` function should return `false`) once an item is placed in the box**.

    Create the test

    ```java
    package demo;

    import static org.junit.jupiter.api.Assertions.assertFalse;
    /* Other imports removed for brevity */

    public class LightBoxTest {

      @Test
      @DisplayName( "should not be empty when an item is placed in the box" )
      public void shouldNotBeEmpty() {
        final LightBox box = new LightBox();
        box.putItem( 1 );
        assertFalse( box.isEmpty() );
      }

      /* Other test removed for brevity */
    }
    ```

    Add the missing method (without any special logic) just to make the program compile.

    ```java
    package demo;

    public class LightBox extends Box {

      public void putItem( final long itemId ) {
      }

      /* Other method removed for brevity */
    }
    ```

    Run the tests.  The second test will fail as expected.

    ```bash
    $ ./gradlew test

    ...
    LightBoxTest > should not be empty when an item is placed in the box FAILED
        org.opentest4j.AssertionFailedError at LightBoxTest.java:23
    ...
    ```

1. Add state to the `LightBox` class.

    ```java
    package demo;

    public class LightBox extends Box {

      private boolean empty = true;

      public boolean isEmpty() {
        return empty;
      }

      public void putItem( final long itemId ) {
        empty = false;
      }
    }
    ```

    Sometimes a property is used for various purposes.  Instead of creating a new property, `empty`, we could use the following.

    **⚠️ NOT RECOMMENDED!!**

    ```java
    package demo;

    public class LightBox extends Box {

      private long itemId = -1L;

      public boolean isEmpty() {
        return itemId == -1L;
      }

      public void putItem( final long itemId ) {
        this.itemId = itemId;
      }
    }
    ```

    The property `itemId` is used for two purposes and that's discouraged.  If negative IDs become valid, for any reason, this logic becomes invalid.

1. A light box can only contain one item and an `IllegalArgumentException` should be thrown if an item is added to a non-empty box.

    ```java
    package demo;

    import static org.junit.jupiter.api.Assertions.assertThrows;
    /* Other imports removed for brevity */

    public class LightBoxTest {

      @Test
      @DisplayName( "should thrown an IllegalArgumentException when adding an item to a non-empty box" )
      public void shouldThrowExceptionWhenItemAlreadyExists() {
        final LightBox box = new LightBox();
        box.putItem( 1 );
        assertThrows( IllegalArgumentException.class, () -> box.putItem( 1 ) );
      }

      /* Other tests removed for brevity */
    }
    ```

    The test should fail.

    ```bash
    ./gradlew test

    ...

    LightBoxTest > should thrown an IllegalArgumentException when adding an item to a non-empty box FAILED
        org.opentest4j.AssertionFailedError at LightBoxTest.java:32
    ...
    ```

    Fix failing tests

    ```java
    package demo;

    import com.google.common.base.Preconditions;

    public class LightBox extends Box {

      public void putItem( final long itemId ) {
        Preconditions.checkArgument( empty );
        empty = false;
      }

      /* Other members removed for brevity */
    }
    ```

    Tests should pass now.

### Heavy Box Example

A heavy box is a box that can take more than one item.

1.  Tests class

    ```java
    package demo;

    import org.junit.jupiter.api.DisplayName;
    import org.junit.jupiter.api.Test;

    import static org.junit.jupiter.api.Assertions.assertFalse;
    import static org.junit.jupiter.api.Assertions.assertThrows;
    import static org.junit.jupiter.api.Assertions.assertTrue;

    public class HeavyBoxTest {

      @Test
      @DisplayName( "should be empty when no items are placed" )
      public void shouldBeEmpty() {
        final HeavyBox box = new HeavyBox();
        assertTrue( box.isEmpty() );
      }

      @Test
      @DisplayName( "should not be empty when an item is placed in the box" )
      public void shouldNotBeEmpty() {
        final HeavyBox box = new HeavyBox();
        box.addItem( 1 );
        assertFalse( box.isEmpty() );
      }

      @Test
      @DisplayName( "should allow multiple items in the box" )
      public void shouldAllowMultipleItems() {
        final HeavyBox box = new HeavyBox();
        box.addItem( 1 );
        box.addItem( 2 );
        box.addItem( 3 );
      }

      @Test
      @DisplayName( "should thrown an IllegalArgumentException when adding an item that is already in the box" )
      public void shouldThrowExceptionWhenItemAlreadyExists() {
        final HeavyBox box = new HeavyBox();
        box.addItem( 1 );
        assertThrows( IllegalArgumentException.class, () -> box.addItem( 1 ) );
      }
    }
    ```

1. Heavy box class

    ```java
    package demo;

    import com.google.common.base.Preconditions;

    import java.util.ArrayList;
    import java.util.List;

    public class HeavyBox extends Box {

      private final List<Long> items = new ArrayList<>();

      public boolean isEmpty() {
        return items.isEmpty();
      }

      public void addItem( final long itemId ) {
        Preconditions.checkArgument( false == items.contains( itemId ) );
        items.add( itemId );
      }
    }
    ```

    The above example make use of `List`, which are discussed in more depth in the [Lists (ArrayList and Vector) section](06%20-%20Collections.md#lists-arraylist-and-vector) part of the [collections](06%20-%20Collections.md).

### The `super` keyword

While heavy boxes may contain very long labels, light box labels cannot be longer than 32 letters long.  Trying to set longer labels should raise an `IllegalArgumentException`

1. Tests

    ```java
    package demo;

    /* Imports removed for brevity */

    public class LightBoxTest {

      @Test
      @DisplayName( "should thrown an IllegalArgumentException when setting a label longer than 32 letters" )
      public void shouldThrowExceptionWhenSettingLongLabels() {
        final LightBox box = new LightBox();
        assertThrows( IllegalArgumentException.class, () -> box.setLabel( "123456789 123456789 123456789 123" ) );
      }

      /* Other tests removed for brevity */
    }
    ```

1. Solution

    ```java
    package demo;

    import com.google.common.base.Preconditions;
    import com.google.common.base.Strings;

    public class LightBox extends Box {

      @Override
      public void setLabel( final String label ) {
        Preconditions.checkArgument( Strings.nullToEmpty( label ).length() <= 32 );
        super.setLabel( label );
      }

      /* Other members removed for brevity */
    }
    ```

### The `final` keyword

Java allows a class to extend another by default.  This can be prevented by the `final` keyword.

```java
package demo;

/* Imports removed for brevity */

public final class LightBox extends Box {

  /* Members removed for brevity */
}
```

The `LightBox` class cannot be extended.

### Private Constructor

Constructors can be `private` and if all constructors of a class are `private`, then this class cannot be extended.

[Effective Java](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/) - [Item 4: Enforce noninstantiability with a private constructor](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/ch2.xhtml#lev4)

## Abstraction

Both the `LightBox` and the `HeavyBox` have the `isEmpty()` method which does the something for both types of boxes.  All types of boxes can be empty or non-empty.  Given that all boxes can be empty, can we move this method to the `Box` super class.

The `Box` class does not have enough information to determine whether it is empty or not.  The sub-classes use different mechanism to determine whether they are empty or not.

1. The `LightBox` make use of the `empty` field
1. The `HeavyBox` delegates this to the `items` (`List`) field

```java
package demo;

/* Imports removed for brevity */

public abstract class Box {

  public abstract boolean isEmpty();

  /* Other members removed for brevity */
}
```

### When a class must be abstract?

1. A class can be abstract

    ```java
    public abstract class A {
    }
    ```

1. A class that has abstract methods must be abstract

    ```java
    public abstract class A {

      public abstract void m();
    }
    ```

1. A class that inherits abstract methods that are not implemented must be abstract

    ```java
    public abstract class A {

      public abstract void m();
    }

    public abstract class B extends A {
      /* Inherited abstract methods not implemented */
    }
    ```

### Final Classes

A class that is marked `final` cannot be extended.  Therefore, a `final` class cannot be abstract.

## The Object Class

**Pending...**

[Effective Java](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/) - [Item 11: Always override hashCode when you override equals](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/ch3.xhtml#lev11)

### Puzzle (Animal Farm)

Consider the following example

```java
package demo;

public class App {
  public static void main( final String[] args ) {
    final String pig = "length: 10";
    final String dog = "length: " + pig.length();
    System.out.println( "Animals are equal: " + pig == dog );
  }
}
```

Given that both variables have the string value: `length: 10`, what would be the outcome of the above example?  Will it be `Animals are equal: true`, `Animals are equal: false` or something else?

```bash
false
```

This example was taken from [PUZZLE 13: ANIMAL FARM in Java™ Puzzlers: Traps, Pitfalls, and Corner Cases](https://learning.oreilly.com/library/view/javatm-puzzlers-traps/032133678X/ch03.html).

1. "_If you ran the program, you found that it prints `false` and nothing else.  It doesn't print `Animals are equal: `.  How could it not print this string literal, which is right there in black and white?  The `+` operator, whether used for addition or string concatenation, binds more tightly than the `==` operator.  Therefore, the parameter of the println method is evaluated from left to right._"

## Interfaces

**Pending...**

[Effective Java](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/) - [Item 20: Prefer interfaces to abstract classes](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/ch3.xhtml#lev20)

### Default methods

## instanceof and cast operators

**Pending...**

## Inheritance and Composition

**Pending...**

[Effective Java](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/) - [Item 18: Favor composition over inheritance](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/ch3.xhtml#lev18)

## Overloading and Overriding

### Overloading

**Pending...**

[Effective Java](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/) - [Item 52: Use overloading judiciously](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/ch8.xhtml#lev52)

### Overriding

## Initialisation Blocks, Outer, Inner and Anonymous Classes

### Initialisation Block

**Pending...**

### Static Initialisation Block

**Pending...**

### Outer Class

**Pending...**

### Inner Class

**Pending...**

### Inner Anonymous Class

**Pending...**

## Annotations

**Pending...**

[Effective Java](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/) - [Item 39: Prefer annotations to naming patterns](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/ch3.xhtml#lev39)

### Project Lombok

**Pending...**

## Generics

**Pending...**

Are not 100% Erased

```java
package demo;

import java.util.concurrent.Callable;

public class PiCallable implements Callable<Double> {

  @Override
  public Double call() {
    return Math.PI;
  }
}
```

```bash
$ ./gradlew clean build
```

```bash
javap build/classes/java/main/demo/PiCallable.class
Compiled from "PiCallable.java"
public class demo.PiCallable implements java.util.concurrent.Callable<java.lang.Double> {
  public demo.PiCallable();
  public java.lang.Double call();
  public java.lang.Object call() throws java.lang.Exception;
}
```

Some generic information is retained for linking purposes, otherwise the compiler will not be able to determine whether this is the correct generic.

```java
public void readDouble(Callable<Double> callable) { /**/ }
```

Generics need to be backward compatible and need to support raw types.  That's why we have two versions of the `call()` method.

```java
public void linkToRawType(Callable callable) { /**/ }
```

## Miscellaneous

Objects have two words headers

1. Mark word
    1. For locking object
        1. Unlocked
        1. Biased
        1. Lightweight Locked
        1. Heavyweight Locked
    1. During Garbage Collection
1. Klass word
    A pointer to where the class metadata is located.  Before Java 8, this was the *permgem* (within the *Java Heap*).  In Java 8 this was migrated to *metaspace*, outside the *Java Heap*.

    Note that this pointer is not pointing to an object.

Arrays have three words
    1. Mark word
    1. Klass word
    1. The length of the array.
