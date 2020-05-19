# Classes, Methods and Objects

[Effective Java](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/) is a very good and popular book.  Several references are made in this page to specific items described in the book.

## TOC

1. [Setup](#setup)
1. [Anatomy of a Java class](#anatomy-of-a-java-class)
    1. [Terms](#terms)
1. [Classes, methods and properties (static no OOP)](#classes-methods-and-properties-static-no-oop)
    1. [Is `void` a type?](#is-void-a-type)
    1. [Properties (static no OOP)](#properties-static-no-oop)
1. [How can we test functionality that makes use of `static` methods?](#how-can-we-test-functionality-that-makes-use-of-static-methods)
    1. [What does `static` mean?](#what-does-static-mean)
    1. [How do `static` fields behave?](#how-do-static-fields-behave)
1. [Access control](#access-control)
    1. [Classes access modifiers table](#classes-access-modifiers-table)
    1. [Class members access modifiers table](#class-members-access-modifiers-table)
    1. [Which access modifier should I pick?](#which-access-modifier-should-i-pick)
1. [Simple objects](#simple-objects)
    1. [Create a simple box object](#create-a-simple-box-object)
    1. [Add open and close functionality to the box](#add-open-and-close-functionality-to-the-box)
    1. [Is `boolean` the right choice?](#is-boolean-the-right-choice)
        1. [Are there any other advantages, besides readability?](#are-there-any-other-advantages-besides-readability)
        1. [Why is the enum declared `private`?](#why-is-the-enum-declared-private)
    1. [What does '*object state*' mean?](#what-does-object-state-mean)
    1. [How do instance methods interact with the object's state?](#how-do-instance-methods-interact-with-the-objects-state)
    1. [Adding more state to our object](#adding-more-state-to-our-object)
    1. [How can we prevent the use of invalid labels?](#how-can-we-prevent-the-use-of-invalid-labels)
        1. [Why is the `isValidLabel()` method `private` and `static`?](#why-is-the-isvalidlabel-method-private-and-static)
1. [What does `this` means?](#what-does-this-means)
    1. [Can we access `static` methods using the `this` keyword?](#can-we-access-static-methods-using-the-this-keyword)
    1. [How does the `this` keyword works with inner anonymous classes?](#how-does-the-this-keyword-works-with-inner-anonymous-classes)
    1. [🤔 How does `this` works with nested inner anonymous classes?](#-how-does-this-works-with-nested-inner-anonymous-classes)
1. [Constructors](#constructors)
    1. [How many constructors can a class have?](#how-many-constructors-can-a-class-have)
    1. [Can one constructor call another constructor in the same class?](#can-one-constructor-call-another-constructor-in-the-same-class)
    1. [What are static factory methods?](#what-are-static-factory-methods)
    1. [Should utilities classes, like the `Math` class, have a constructor?](#should-utilities-classes-like-the-math-class-have-a-constructor)
    1. [Can we call methods from within a constructor?](#can-we-call-methods-from-within-a-constructor)
1. [Mutable and immutable](#mutable-and-immutable)
    1. [How can we create immutable objects?](#how-can-we-create-immutable-objects)
    1. [How does mutability works when we have nested objects?](#how-does-mutability-works-when-we-have-nested-objects)
1. [Inheritance](#inheritance)
    1. [Extending the `Box` functionality (creating and evolving the `LightBox` class step by step)](#extending-the-box-functionality-creating-and-evolving-the-lightbox-class-step-by-step)
    1. [Can we add items to a box if the box is not open?](#can-we-add-items-to-a-box-if-the-box-is-not-open)
    1. [🤔 Can we design our classes to automatically prevents the object from going into invalid state?](#-can-we-design-our-classes-to-automatically-prevents-the-object-from-going-into-invalid-state)
    1. [Create the `HeavyBox` (complete example)](#create-the-heavybox-complete-example)
    1. [How can a subclass invoke a method in the parent class (the `super` keyword)?](#how-can-a-subclass-invoke-a-method-in-the-parent-class-the-super-keyword)
    1. [Can we prevent a class from being extended (the `final` keyword)?](#can-we-prevent-a-class-from-being-extended-the-final-keyword)
    1. [How do `private` constructor effect inheritance?](#how-do-private-constructor-effect-inheritance)
    1. [Are constructors inherited?](#are-constructors-inherited)
    1. [Can a subclass invoke the constructor of a superclass (the `super()`)?](#can-a-subclass-invoke-the-constructor-of-a-superclass-the-super)
    1. [Can a constructor in a parent class call a method in a subclass?](#can-a-constructor-in-a-parent-class-call-a-method-in-a-subclass)
    1. [What happens when not all '*children*' are '*parents*'?](#what-happens-when-not-all-children-are-parents)
    1. [Is inheritance evil and should be considered as an anti-pattern?](#is-inheritance-evil-and-should-be-considered-as-an-anti-pattern)
1. [Abstraction](#abstraction)
    1. [When a class must be abstract?](#when-a-class-must-be-abstract)
    1. [Can `final` classes be `abstract`?](#can-final-classes-be-abstract)
    1. [Can `abstract` classes have `private` constructors?](#can-abstract-classes-have-private-constructors)
1. [The `Object` class](#the-object-class)
    1. [The `toString()` method](#the-tostring-method)
    1. [The `equals()` and `hashCode()` methods](#the-equals-and-hashcode-methods)
        1. [Puzzle (Animal Farm)](#puzzle-animal-farm)
    1. [The `getClass()` method](#the-getclass-method)
    1. [The `wait()`, `notify()` and `notifyAll()` methods](#the-wait-notify-and-notifyall-methods)
1. [Interfaces](#interfaces)
    1. [What is an interface?](#what-is-an-interface)
    1. [How is an interface different from a class?](#how-is-an-interface-different-from-a-class)
    1. [How can we use interfaces?](#how-can-we-use-interfaces)
    1. [Can we create an instance of an interface?](#can-we-create-an-instance-of-an-interface)
    1. [Functional interface and lambda functions](#functional-interface-and-lambda-functions)
        1. [What is the relation between lambda and functional interfaces?](#what-is-the-relation-between-lambda-and-functional-interfaces)
    1. [Can an interface extend another class or another interface?](#can-an-interface-extend-another-class-or-another-interface)
    1. [How many interfaces can a class implement?](#how-many-interfaces-can-a-class-implement)
    1. [What happens if a class implements two interfaces that have the same abstract method?](#what-happens-if-a-class-implements-two-interfaces-that-have-the-same-abstract-method)
    1. [How can we sort the `Point` class?](#how-can-we-sort-the-point-class)
    1. [`default` and `static` methods](#default-and-static-methods)
1. [`instanceof` and `cast` operators](#instanceof-and-cast-operators)
1. [Inheritance and composition](#inheritance-and-composition)
1. [Overloading and overriding](#overloading-and-overriding)
    1. [Overloading](#overloading)
    1. [Overriding](#overriding)
1. [Initialisation blocks, outer, inner and anonymous classes](#initialisation-blocks-outer-inner-and-anonymous-classes)
    1. [Initialisation block](#initialisation-block)
    1. [`static` initialisation block](#static-initialisation-block)
    1. [Outer class](#outer-class)
    1. [Inner instance class](#inner-instance-class)
    1. [Inner static class](#inner-static-class)
    1. [Inner anonymous class](#inner-anonymous-class)
1. [Annotations](#annotations)
    1. [Project Lombok](#project-lombok)
1. [Generics](#generics)
1. [Miscellaneous](#miscellaneous)
    1. [Objects have two words headers](#objects-have-two-words-headers)
    1. [Records](#records)
    1. [Others](#others)

## Setup

1. Clone Repo: [java-boot-camp-blueprint](https://github.com/albertattard/java-boot-camp-blueprint)

    ```bash
    $ git clone https://github.com/albertattard/java-boot-camp-blueprint.git
    ```

1. Open the repo in IDE

## Anatomy of a Java class

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

1. **inner anonymous class** (missing in the above example)

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

1. **local variables** (missing in the above example)

    **🚧 Pending...**  Should we have a method anatomy?

## Classes, methods and properties (static no OOP)

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

    Not much.  The code is simpler to ready, but still very hard to test.  We will improve this [later on](#how-can-we-test-functionality-that-makes-use-of-static-methods).

    One key takeaway here is that using `static` methods, bound our `main()` method to the `Dice.roll()` and the `Display.print()` methods and this makes our method hard to test.  There are tools we can use that will allow us to test our code, but issue here is our design.

    **Always tackle the root problem and do not throw more complexity at it**.

### Is `void` a type?

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

### Properties (static no OOP)

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

## How can we test functionality that makes use of `static` methods?

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

Martin Fowler talks in more depth about this topic in his [StaticSubstitution article](https://martinfowler.com/bliki/StaticSubstitution.html).

### What does `static` mean?

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

![Access static field through class name](assets/images/Access%20static%20field%20through%20class%20name.png)

## Access control

We know that the `Random` class produces a pseudo random sequence.  This means that a skilled attacker can predict the next number to be drawn after making several observations.

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

The above example makes use of static fields to highlight other problems that may be created when having fields marked as static.

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

### Classes access modifiers table

| Access Modifier | Accessible From |
|-----------------|-----------------|
| `public`        | Anywhere        |
| (no modifier)   | same package    |

Note that inner classes are class members and thus do not make use of the above table.  Inner classes use the table shown in the [following section](#class-members-access-modifiers-table).

### Class members access modifiers table

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
      @Override
      public void run() {
        System.out.printf( "The value of c is %d%n", c );
      }
    };
    r.run();
  }
}
```

An inner anonymous class ([discussed in depth later on](#inner-anonymous-class)) is created within the `App` class.

```java
final Runnable r = new Runnable() {
  @Override
  public void run() {
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

### Which access modifier should I pick?

Always start with the least visible access modifier, `private`, and then increase the visibility only if required.  Remember that once you make something `public` it may be impossible to reduce its visibility.

## Simple objects

The post-office is automating the packaging of letters or items into boxes and is creating a program to handles this.  There are two types of boxes, the light boxes and the heavy boxes.  The light boxes only take one item in them whereas the heavy boxes can take as many items as it can fit.

### Create a simple box object

Let start by creating a simple object that will represent a box.  The box will not have any functionality.  Do not worry about light and heavy boxes just yet.

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

      public static void main( final String[] args ) {
        final Box box = new Box();
        System.out.printf( "My box %s%n", box );
      }
    }
    ```

1. Run the program

    ```bash
    My box demo.Box@2ff4acd0
    ```

1. Replace the [toString()](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/lang/Object.html#toString()) method, so that we can print something more meaningful.

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
    My box a basic box
    ```

### Add open and close functionality to the box

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

    import org.junit.jupiter.api.DisplayName;
    import org.junit.jupiter.api.Test;

    import static org.junit.jupiter.api.Assertions.assertFalse;
    import static org.junit.jupiter.api.Assertions.assertTrue;

    public class BoxTest {

      @Test
      @DisplayName( "should be open after the open method is called" )
      public void shouldBeOpen() { /* ... */ }

      @Test
      @DisplayName( "should not be open after the close method is called" )
      public void shouldNotBeOpen() {
        final Box box = new Box();
        box.close();
        assertFalse( box.isOpen() );
      }
    }
    ```

    Add the missing methods (without any special logic) just to make the program compile.

    ```java
    package demo;

    public class Box {

      public void open() { /* ... */ }

      public void close() {
      }

      public boolean isOpen() { /* ... */ }

      @Override
      public String toString() { /* ... */ }
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

### Is `boolean` the right choice?

We used a property of type `boolean` to represent that open/closed state of the box, as shown below.

```java
package demo;

public class Box {

  private boolean open;

  public void open() { /* ... */ }

  public void close() { /* ... */ }

  public boolean isOpen() { /* ... */ }

  @Override
  public String toString() { /* ... */ }
}
```

A `boolean` variable can be in either of the two states, `true` or `false`.  By just reading the value `true`, or `false`, we cannot deduct whether the box is open or closed.  The meaning of the value `true` or `false` make sense when seen relative to the property name, `open` in this case.  Consider the following example, where the property name was renamed from `open`, to `closed`.

```java
package demo;

public class Box {

  private boolean closed;

  public void open() { /* ... */ }

  public void close() { /* ... */ }

  public boolean isOpen() { /* ... */ }

  @Override
  public String toString() { /* ... */ }
}
```

Now the meaning of `true` and `false` is different from what it was before.  Before, a `true` meant that the box was open.  Now (after renaming the property), a `true` means that the box is closed.

While `boolean` types are very common, it is recommended to use an enum instead.  Consider the following refactored version of the `Box` class.

```java
package demo;

public class Box {

  private BoxForm form = BoxForm.CLOSED;

  public void open() {
    form = BoxForm.OPEN;
  }

  public void close() {
    form = BoxForm.CLOSED;
  }

  public boolean isOpen() {
    return form == BoxForm.OPEN;
  }

  @Override
  public String toString() {
    return String.format( "%s box", isOpen() ? "an open" : "a closed" );
  }

  private enum BoxForm {
    OPEN, CLOSED;
  }
}
```

The enum constants are very explicit.  The enum constants `OPEN` will always mean open, independent from the property name.  Same applies to the `CLOSED` enum constant.  The program reads better and the reader can easily understand what each value (`OPEN` or `CLOSED`) means.  In the previous example, the meaning of the `boolean` value was relative to the variable name.  Enums mitigates this ambiguity as each constant is very explicit.

**Always prefer enums over boolean**.

#### Are there any other advantages, besides readability?

Consider a flatten box, similar to those we buy form a home depot store.  When bough, the box is in a flatten form and we cannot put anything in it before we unpack it and put it in the correct form.  This scenario introduced a new state, which is the *flattened* state.  We cannot represent the box states, *flattened*, *open* and *closed* as one property of type `boolean`.  What we will end-up doing is creating a second property as shown next.

```java
package demo;

public class Box {

  private boolean open;
  private boolean flattened;

  public void open() { /* ... */ }

  public void close() { /* ... */ }

  public boolean isOpen() {
    return false == flattened && open;
  }

  @Override
  public String toString() { /* ... */ }
}
```

The `isOpen()` now depends on two properties and not one.  Another developer can easily miss the second property and only rely on the `open`.  The issue with this approach is that we have one state in the real world represented by two properties in the code.  Note that when the box is the *flattened* state in reality, the box is not considered *closed*.  Remember that in reality a box can be either *flattened*, *open* or *closed*.  Yet the `open` property will have the value of `false`, which is interpreted as *closed*.

Enums can contain more than two variants and can contain enough constants to suit our needs.

**Always prefer enums over boolean**.

#### Why is the enum declared `private`?

The enum `BoxForm` is only used within the `Box` class.  The `isOpen()` method, returns `true` or `false` depending on whether the box is open or not.  Therefore, there is no need to make this enum more visible than it is.  In the event the `BoxForm` enum needs to be used by other classes, we can increase its visibility accordingly.

### What does '*object state*' mean?

The `Box` defined a property, called `form` (of type `BoxForm`).  The properties (not the `static` fields) defined by a class represent the object's state.  When objects are created, the properties defined by their class become the object's state.  Consider the following example.

```java
Box a = new Box();
```

When the `Box` instance is created, the properties defined by the class becomes the object's state.  In this case, the object state, comprise one property of type `boolean`.  Similar to, "*an object is an instance of a class*", the objects' state is an instance of the properties defined by the class.

**The state of one object is independent from the state of another object**.  One box may be open while the box instance is closed.

### How do instance methods interact with the object's state?

The `Box` class, shown next, has four **instance** (not `static`) methods, all of which access the `form` property.

```java
package demo;

public class Box {

  private BoxForm form = BoxForm.CLOSED;

  public void open() {
    form = BoxForm.OPEN;
  }

  public void close() {
    form = BoxForm.CLOSED;
  }

  public boolean isOpen() {
    return form == BoxForm.OPEN;
  }

  @Override
  public String toString() {
    return String.format( "%s box", isOpen() ? "an open" : "a closed" );
  }

  private enum BoxForm {
    OPEN, CLOSED;
  }
}
```

When a method (*instance* or `static`) is invoked, the method's state (such as local variables) is loaded on the *Java stack* as a new frame.  All method's variables exists in the method's frame in the *Java stack*.  The method can only reach within its frame.  The classloader makes sure of that during the class loading process.  Instance methods have also access to the objects' state (represented by the property `form` in this example).  In this case, all four instance methods will have access to the same property, `form`.

**On the other hand, `static` methods cannot access the object's state**.

Different from local variables, when a method modifies the object's state (defined by its properties), then all other instance methods will observe these changes.  Consider the following sequence of events.

1. A box instance is created, and the property `form` is set to `BoxForm.CLOSED`.
1. The `open()` method will set the property `form` to `BoxForm.OPEN`.
1. When later on the `isOpen()` method is invoked, then it compares the current value of the `form` property, which is `BoxForm.OPEN`, to determine whether the box is open of not.

There is a small caveat to this, which will be discussed in more detail when we talk about [concurrency](11%20-%20Concurrency.md).

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

Two boxes are created, and one of them is modified while the other one is not.  The boxes state is printed at every step.

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

Java will fetch the object, to which the variable `x` is pointing to, and will make all object's properties available the instance method `open()`.  The above instance method will change the object's state and will only affect the object to which variable `x` points to.  The state of the object to which variable `y` is pointing to is not affected by the above instance method call.

Consider the following example.

```java
boolean isOpen = new Box().isOpen();
```

The above is a valid example.  Here a new instance of `Box` is create and then the method `isOpen()` is invoked against the new instance.  Here the `Box` instance is not assigned to any variable and instead is used directly.

**How does that works?**

Consider the following code fragment.

```java
int a = 7 + 3;
```

What's the value of variable `a`?  Is it `10` or `7 + 3`?  The answer is `10`, as the `+` operator is evaluated before the `=` operator and Java evaluates the expression and then uses the answer.  Same happens with objects.  The `new` operator creates a new object in the *Java heap* and returns the object reference.  We can assign the reference returned to a variable or use it immediately as shown next.

```java
boolean isOpen = new Box().isOpen();
```

The above example will evaluate to `false`, as by default the box is closed.

It is worth mentioning that an object is created in the *Java heap* and no variable are pointing to it.  This object will be picked up by the garbage collector, which will remove all it from the *Java heap*.

### Adding more state to our object

Boxes have labels printed on the sides.  The label is a simple text identifying the box.  Following are some examples of label:

1. `To be processed by Dept. XYZ`
1. `Need to be rechecked by MNO`

A box always has a label which is initially set to: `No label`.  **Note that the label cannot be blank or empty**.

The label can be represented by the `String` data-type.

1. By default, the label should have the value of `No label`.

    ```java
    package demo;

    import org.junit.jupiter.api.DisplayName;
    import org.junit.jupiter.api.Test;

    import static org.junit.jupiter.api.Assertions.assertEquals;
    import static org.junit.jupiter.api.Assertions.assertFalse;
    import static org.junit.jupiter.api.Assertions.assertTrue;

    public class BoxTest {

      @Test
      @DisplayName( "should be open after the open method is called" )
      public void shouldBeOpen() { /* ... */ }

      @Test
      @DisplayName( "should not be open after the close method is called" )
      public void shouldNotBeOpen() { /* ... */ }

      @Test
      @DisplayName( "should have a default label value of 'No Label'" )
      public void shouldHaveADefaultLabel() {
        final Box box = new Box();
        assertEquals( "No Label", box.getLabel() );
      }
    }
    ```

    Add the missing method (without any special logic) just to make the program compile.

    ```java
    package demo;

    public class Box {

      private BoxForm form = BoxForm.CLOSED;

      public void open() { /* ... */ }

      public void close() { /* ... */ }

      public boolean isOpen() { /* ... */ }

      public String getLabel() {
        return "No Label";
      }

      @Override
      public String toString() { /* ... */ }

      private enum BoxForm { /* ... */ }
    }
    ```

    Run the tests.  All tests should pass.

1. Add the ability to change the label (assuming that only valid values will be provided)

    ```java
    package demo;

    import org.junit.jupiter.api.DisplayName;
    import org.junit.jupiter.api.Test;

    import static org.junit.jupiter.api.Assertions.assertEquals;
    import static org.junit.jupiter.api.Assertions.assertFalse;
    import static org.junit.jupiter.api.Assertions.assertTrue;

    public class BoxTest {

      @Test
      @DisplayName( "should be open after the open method is called" )
      public void shouldBeOpen() { /* ... */ }

      @Test
      @DisplayName( "should not be open after the close method is called" )
      public void shouldNotBeOpen() { /* ... */ }

      @Test
      @DisplayName( "should have a default label value of 'No Label'" )
      public void shouldHaveADefaultLabel() { /* ... */ }

      @Test
      @DisplayName( "should have the given label value" )
      public void shouldHaveTheGivenLabel() {
        final Box box = new Box();
        box.changeLabelTo( "Test Label" );
        assertEquals( "Test Label", box.getLabel() );
      }
    }
    ```

    Note that in the above test, the name `changeLabelTo()` was used instead of `setLabel()`.  Both names are fine, but the former reads more like natural languages.  For example, we say, "_the supervisor changed the box's label_" instead of "_the supervisor set the box's label_".

    Add the missing method (without any special logic) just to make the program compile.

    ```java
    package demo;

    public class Box {

      private BoxForm form = BoxForm.CLOSED;

      public void open() { /* ... */ }

      public void close() { /* ... */ }

      public boolean isOpen() { /* ... */ }

      public String getLabel() { /* ... */ }

      public void changeLabelTo( final String label ) {
      }

      @Override
      public String toString() { /* ... */ }

      private enum BoxForm { /* ... */ }
    }
    ```

    The test should fail.

1. Implement the required logic

    ```java
    package demo;

    public class Box {

      private BoxForm form = BoxForm.CLOSED;
      private String label = "No Label";

      public void open() { /* ... */ }

      public void close() { /* ... */ }

      public boolean isOpen() { /* ... */ }

      public String getLabel() {
        return label;
      }

      public void changeLabelTo( final String label ) {
        this.label = label;
      }

      @Override
      public String toString() {
        final String openClose = isOpen() ? "an open" : "a closed";
        return String.format( "%s box labelled '%s'", openClose, label );
      }

      private enum BoxForm { /* ... */ }
    }
    ```

    Re-run the tests.  All should pass.

    The above example introduced a new keyword, `this`.  Do not worry about the new keyword just yet as it is covered in [a following section](#what-does-this-means).

### How can we prevent the use of invalid labels?

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
      protected Object convert( final Object source, final Class<?> targetType ) throws ArgumentConversionException {
        if ( "null".equals( source ) ) {
          return null;
        }

        return DefaultArgumentConverter.INSTANCE.convert( source, targetType );
      }
    }
    ```

    The above converter converts the text `"null"` to an actual `null`.  Otherwise, it calls the default converter and let it deal with the conversion.

    ```java
    return DefaultArgumentConverter.INSTANCE.convert( source, targetType );
    ```

    Add a test and use the `NullableConverter` converter.

    ```java
    package demo;

    import org.junit.jupiter.api.DisplayName;
    import org.junit.jupiter.api.Test;
    import org.junit.jupiter.params.ParameterizedTest;
    import org.junit.jupiter.params.converter.ConvertWith;
    import org.junit.jupiter.params.provider.ValueSource;

    import static org.junit.jupiter.api.Assertions.assertEquals;
    import static org.junit.jupiter.api.Assertions.assertFalse;
    import static org.junit.jupiter.api.Assertions.assertThrows;
    import static org.junit.jupiter.api.Assertions.assertTrue;

    public class BoxTest {

      @Test
      @DisplayName( "should be open after the open method is called" )
      public void shouldBeOpen() { /* ... */ }

      @Test
      @DisplayName( "should not be open after the close method is called" )
      public void shouldNotBeOpen() { /* ... */ }

      @Test
      @DisplayName( "should have a default label value of 'No Label'" )
      public void shouldHaveADefaultLabel() { /* ... */ }

      @Test
      @DisplayName( "should have the given label value" )
      public void shouldHaveTheGivenLabel() { /* ... */ }

      @ValueSource( strings = { "", " ", "null" } )
      @DisplayName( "should throw an IllegalArgumentException when given an invalid label" )
      @ParameterizedTest( name = "should throw an IllegalArgumentException when given an invalid label ''{0}''" )
      public void shouldThrowAnExceptionWhenGivenInvalidLabel( final @ConvertWith( NullableConverter.class ) String invalidLabel ) {
        final Box box = new Box();
        assertThrows( IllegalArgumentException.class, () -> box.changeLabelTo( invalidLabel ) );
      }
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

      private BoxForm form = BoxForm.CLOSED;
      private String label = "No Label";

      public void open() { /* ... */ }

      public void close() { /* ... */ }

      public boolean isOpen() { /* ... */ }

      public String getLabel() { /* ... */ }

      public void changeLabelTo( final String label ) {
        Preconditions.checkArgument( isValidLabel( label ) );
        this.label = label;
      }

      private static boolean isValidLabel( final String label ) {
        return false == Strings.nullToEmpty( label ).isBlank();
      }

      @Override
      public String toString() { /* ... */ }

      private enum BoxForm { /* ... */ }
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

1. (Optional) Use static imports

    The `checkArgument()` and `nullToEmpty()` are static methods and thus we can use the static imports if we like.

    ```java
    package demo;

    import static com.google.common.base.Preconditions.checkArgument;
    import static com.google.common.base.Strings.nullToEmpty;

    public class Box {

      private BoxForm form = BoxForm.CLOSED;
      private String label = "No Label";

      public void open() { /* ... */ }

      public void close() { /* ... */ }

      public boolean isOpen() { /* ... */ }

      public String getLabel() { /* ... */ }

      public void changeLabelTo( final String label ) {
        checkArgument( isValidLabel( label ) );
        this.label = label;
      }

      private static boolean isValidLabel( final String label ) {
        return false == nullToEmpty( label ).isBlank();
      }

      @Override
      public String toString() { /* ... */ }

      private enum BoxForm { /* ... */ }
    }
    ```

    This is a personal preference and I do not see any critical benefits when using one or the other.  Static imports are used a lot in these notes as they then to produce more concise code, which fits better in code example.

#### Why is the `isValidLabel()` method `private` and `static`?

The `isValidLabel()` does not access any state, thus is safe to have it as `static`.

```java
private static boolean isValidLabel( final String label ) {
  return false == Strings.nullToEmpty( label ).isBlank();
}
```

The `isValidLabel()` can be made public as there is no harm with that, but then we will enable other classes to bind to the `Box` class.  This can have consequences, similar to what we discussed in the [use of static methods](#how-can-we-test-functionality-that-makes-use-of-static-methods).

## What does `this` means?

The [`this` keyword](https://docs.oracle.com/javase/tutorial/java/javaOO/thiskey.html) represents the object and instance methods can access the object they are currently interacting with using `this` keyword.

One can simply say that when an instance method is invoked, a new variable is made available to the method through which the instance method can interact with the object.  In the [previous example](#adding-more-state-to-our-objects), the `this` keyword was only used in one place, and yet it works.  The `this` keyword is only required when we need to make a distinction between a local variable and a class property.  With that said, we can use the `this` keyword to refer to both properties and instance methods.

Consider the following example.

```java
package demo;

import static com.google.common.base.Preconditions.checkArgument;
import static com.google.common.base.Strings.nullToEmpty;

public class Box {

  private BoxForm form = BoxForm.CLOSED;
  private String label = "No Label";

  public void open() {
    this.form = BoxForm.OPEN;
  }

  public void close() {
    this.form = BoxForm.CLOSED;
  }

  public boolean isOpen() {
    return this.form == BoxForm.OPEN;
  }

  public String getLabel() {
    return this.label;
  }

  public void changeLabelTo( final String label ) {
    checkArgument( isValidLabel( label ) );
    this.label = label;
  }

  private static boolean isValidLabel( final String label ) {
    return false == nullToEmpty( label ).isBlank();
  }

  @Override
  public String toString() {
    final String openClosed = this.isOpen() ? "an open" : "a closed";
    final String labelLocalVariable = this.getLabel();
    return String.format( "%s box labelled '%s'", openClosed, labelLocalVariable );
  }

  private enum BoxForm { /* ... */ }
}
```

The above example goes to great length to refer to everything through the `this` keyword, and there is no need to do that.

### Can we access `static` methods using the `this` keyword?

The `this` keyword can be used to access `static` methods, **but that's not required nor recommended**.

**⚠️ NOT RECOMMENDED!!**

```java
package demo;

public class App {

  private static void staticMethod() {
    System.out.println( "Hello from the static side" );
  }

  private void instanceMethod() {
    this.staticMethod();
  }

  public static void main( final String[] args ) {
    new App().instanceMethod();
  }
}
```

### How does the `this` keyword works with inner anonymous classes?

Different from some other programming languages, like [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this), there is no need to bind it or do any gymnastics.

In Java, we can have objects within objects in the form of [inner anonymous classes, discussed in depth later on](#inner-anonymous-class).  Consider the following (*possibly advanced*) example.

**⚠️ THE FOLLOWING EXAMPLE WILL NOT COMPILE!!**

```java
package demo;

public class App {

  private final int number = 7;

  private void instanceMethod() {
    System.out.printf( "number = %d%n", this.number );

    /* Create an inner anonymous class */
    final Runnable r = new Runnable() {
      @Override
      public void run() {
        System.out.printf( "number = %d%n", this.number );
      }
    };
    r.run();
  }

  public static void main( final String[] args ) {
    new App().instanceMethod();
  }
}
```

Do not let the complexity scare you away as the main point her is that, the `this` keyword will always means the current object and we may have nested objects.

The above code dose not compile.

```bash
src/main/java/demo/App.java:13: error: cannot find symbol
        System.out.printf( "number = %d%n", this.number );
                                                ^
  symbol: variable number
```

Let's breakdown the `instanceMethod()` method down.

1. The first `printf()` method call is within the `instanceMethod()` method defined within the `App` class.  Therefore, the `this` keyword shown here refers to an object of type `App`.

    ```java
      private void instanceMethod() {
        System.out.printf( "number = %d%n", this.number );
    ```

1. The second `printf()` method call is within the inner class, defined within the `instanceMethod()` method.

    ```java
        /* Create an inner anonymous class */
        final Runnable r = new Runnable() {
          @Override
          public void run() {
            System.out.printf( "number = %d%n", this.number );
          }
        };
    ```

    The `printf()` method shown above is invoked from within the `run()` method that is within the inner anonymous class.  Therefore, the `this` keyword here refers to the objects defined by the inner anonymous class, and not the object defined by the `App` class.

We can specify which `this` we are referring to by prefixing the class name.

```java
App.this.number
```

Following is an updated example

```java
  private void instanceMethod() {
    System.out.printf( "number = %d%n", App.this.number );

    /* Create an inner anonymous class */
    final Runnable r = new Runnable() {
      @Override
      public void run() {
        System.out.printf( "number = %d%n", App.this.number );
      }
    };
    r.run();
  }
```

As before, we can always prefix the `this` keywords with the class name as shown above.

### 🤔 How does `this` works with nested inner anonymous classes?

Consider the following challenge.

**⚠️ THE FOLLOWING EXAMPLE WILL NOT COMPILE!!**

```java
package demo;

public class App {

  private final int number = 7;

  private void instanceMethod() {
    System.out.printf( "number (app) = %d%n", this.number );

    /* Inner anonymous class */
    final Runnable r = new Runnable() {

      private final int number = 3;

      @Override
      public void run() {
        System.out.printf( "number (app)  = %d%n", App.this.number );
        System.out.printf( "number (iac)  = %d%n", this.number );

        /* Inner anonymous class within another inner anonymous class */
        /* Referred to in our example as inner-inner anonymous class */
        new Runnable() {
          @Override
          public void run() {
            System.out.printf( "number (app)  = %d%n", App.this.number );
            System.out.printf( "number (iac)  = %d%n", this.number );
          }
        }.run();

      }
    };
    r.run();
  }

  public static void main( final String[] args ) {
    new App().instanceMethod();
  }
}
```

The above example will not compile.  Also, inner anonymous classes should not introduce new state as it makes things more complex for nothing.  The *inner-inner anonymous class* (the *inner-inner anonymous class* is the inner anonymous class defined within the `run()` within the *inner anonymous class*) has no way to refer to its outer class thus, there is no way we can get the `number` property defined by the *inner anonymous class*.

Moving the property to within the method would make it available to the *inner-inner anonymous class*.

```java
    /* Inner anonymous class */
    final Runnable r = new Runnable() {

      private final int number = 3;

      @Override
      public void run() {
        System.out.printf( "number (app)  = %d%n", App.this.number );
        System.out.printf( "number (iac)  = %d%n", this.number );

        /* Inner anonymous class within another inner anonymous class */
        /* Referred to in our example as inner-inner anonymous class */
        new Runnable() {
          @Override
          public void run() {
            System.out.printf( "number (app)  = %d%n", App.this.number );
            System.out.printf( "number (iac)  = %d%n", this.number );
          }
        }.run();

      }
    };
```

## Constructors

The `Box` does not contain any methods called `Box()` that takes no parameters.  What method do we call when we execute `new Box()`?

```java
package demo;

import static com.google.common.base.Preconditions.checkArgument;
import static com.google.common.base.Strings.nullToEmpty;

public class Box {

  private BoxForm form = BoxForm.CLOSED;
  private String label = "No Label";

  public void open() {
    form = BoxForm.OPEN;
  }

  public void close() {
    form = BoxForm.CLOSED;
  }

  public boolean isOpen() {
    return form == BoxForm.OPEN;
  }

  public String getLabel() {
    return label;
  }

  public void changeLabelTo( final String label ) {
    checkArgument( isValidLabel( label ) );
    this.label = label;
  }

  private static boolean isValidLabel( final String label ) {
    return false == nullToEmpty( label ).isBlank();
  }

  @Override
  public String toString() {
    final String openClose = isOpen() ? "an open" : "a closed";
    return String.format( "%s box labelled '%s'", openClose, label );
  }

  private enum BoxForm { /* ... */ }
}
```

Methods that have the same name (case-sensitive) as the classes are constructors.  Constructors are special instance like methods used to initialise objects.  All Java classes (with no exception) need to have a constructor and Java provides one if none are provided.

The `Box` class has no constructors defined, thus Java provided one for us.  Java provides a default (also known as the *no-args-constructor*) when no constructors are present in a class.

We can define a constructor as shown in the following example.

```java
package demo;

import static com.google.common.base.Preconditions.checkArgument;
import static com.google.common.base.Strings.nullToEmpty;

public class Box {

  private BoxForm form = BoxForm.CLOSED;
  private String label = "No Label";

  public Box() {
  }

  public Box( final BoxForm form ) {
    this.form = form;
  }

  public void open() { /* ... */ }

  public void close() { /* ... */ }

  public boolean isOpen() { /* ... */ }

  public String getLabel() { /* ... */ }

  public void changeLabelTo( final String label ) { /* ... */ }

  private static boolean isValidLabel( final String label ) { /* ... */ }

  @Override
  public String toString() { /* ... */ }

  private enum BoxForm { /* ... */ }
}
```

A constructor looks similar to a method but has the following constraints
1. The name of the constructor needs to be the same as the class name (case-sensitive)
1. The constructor does not return anything, do not make use of `void`, and cannot use the `return` keyword to return a value.
1. The `static` modifier cannot be used with a constructor

Apart from the above, a constructor is similar to a method.

### How many constructors can a class have?

**A class can have as many constructors as needs as long as each constructor has a unique signature**.

Let say that we would like to have the possibility to create an instance of a `Box` and also set its state (open/closed).  We can do that by using a constructor.

```java
package demo;

import static com.google.common.base.Preconditions.checkArgument;
import static com.google.common.base.Strings.nullToEmpty;

public class Box {

  private BoxForm form;
  private String label = "No Label";

  public Box( final BoxForm form ) {
    this.form = form;
  }

  public void open() { /* ... */ }

  public void close() { /* ... */ }

  public boolean isOpen() { /* ... */ }

  public String getLabel() { /* ... */ }

  public void changeLabelTo( final String label ) { /* ... */ }

  private static boolean isValidLabel( final String label ) { /* ... */ }

  @Override
  public String toString() { /* ... */ }

  public enum BoxForm { /* ... */ }
}
```

Note that the enum `BoxForm` was changed from `private` to `public`.  This is quite important as otherwise we will not be able to access the new constructor.  Now we can create boxes in the state we want them to be as shown in the following example.

```java
package demo;

import static demo.Box.BoxForm.CLOSED;
import static demo.Box.BoxForm.OPEN;

public class App {

  public static void main( final String[] args ) {
    final Box a = new Box( OPEN );
    final Box b = new Box( CLOSED );

    System.out.printf( "Box a: %s%n", a );
    System.out.printf( "Box b: %s%n", b );
  }
}
```

The `Box` shown before has **ONE** constructor.  When creating an instance of a `Box`, the caller needs to also provide the box form (either `BoxForm.OPEN` or `BoxForm.CLOSED`).

**⚠️ THE FOLLOWING EXAMPLE DOES NOT COMPILE.**

```java
package demo;

public class App {

  public static void main( final String[] args ) {
    final Box a = new Box();
  }
}
```

This is a bit annoying as we are forcing the callers to always pass a value, even when the default value suffice.  We can add the second constructor and allow the caller to pick the most suitable constructor.

```java
package demo;

import static com.google.common.base.Preconditions.checkArgument;
import static com.google.common.base.Strings.nullToEmpty;

public class Box {

  private BoxForm form = BoxForm.CLOSED;
  private String label = "No Label";

  public Box() {
  }

  public Box( final BoxForm form ) {
    this.form = form;
  }

  public void open() { /* ... */ }

  public void close() { /* ... */ }

  public boolean isOpen() { /* ... */ }

  public String getLabel() { /* ... */ }

  public void changeLabelTo( final String label ) { /* ... */ }

  private static boolean isValidLabel( final String label ) { /* ... */ }

  @Override
  public String toString() { /* ... */ }

  public enum BoxForm { /* ... */ }
}
```

All classes must have a constructor (no exception) and a default constructor is only automatically provided when no constructors are define.

### Can one constructor call another constructor in the same class?

Yes, and that's quite a common practice.  We can modify the default constructor such that it calls the second constructor and passes the value to be used when non are provided.

```java
package demo;

import static com.google.common.base.Preconditions.checkArgument;
import static com.google.common.base.Strings.nullToEmpty;

public class Box {

  private BoxForm form;
  private String label = "No Label";

  public Box() {
    this( BoxForm.CLOSED );
  }

  public Box( final BoxForm form ) {
    this.form = form;
  }

  public void open() { /* ... */ }

  public void close() { /* ... */ }

  public boolean isOpen() { /* ... */ }

  public String getLabel() { /* ... */ }

  public void changeLabelTo( final String label ) { /* ... */ }

  private static boolean isValidLabel( final String label ) { /* ... */ }

  @Override
  public String toString() { /* ... */ }

  public enum BoxForm { /* ... */ }
}
```

A constructor can call another constructor using `this()` and passes the required parameters.  `this()` needs to be the first statement called within the constructor.  The following example does not compile.

**⚠️ THE FOLLOWING EXAMPLE DOES NOT COMPILE.**

```java
package demo;

import static com.google.common.base.Preconditions.checkArgument;
import static com.google.common.base.Strings.nullToEmpty;

public class Box {

  private BoxForm form;
  private String label = "No Label";

  public Box() {
    label = "...";
    this( BoxForm.CLOSED );
  }

  public Box( final BoxForm form ) { /* ... */ }

  public void open() { /* ... */ }

  public void close() { /* ... */ }

  public boolean isOpen() { /* ... */ }

  public String getLabel() { /* ... */ }

  public void changeLabelTo( final String label ) { /* ... */ }

  private static boolean isValidLabel( final String label ) { /* ... */ }

  @Override
  public String toString() { /* ... */ }

  public enum BoxForm { /* ... */ }
}
```

The above code will not compile.

```bash
src/main/java/demo/Box.java:13: error: call to this must be first statement in constructor
    this( BoxForm.CLOSED );
        ^
```

While constructors calling each other is quite a common practice to have constructors calling each other, note that we can find ourselves in some tricky situations.  Consider the following class.

**⚠️ THE FOLLOWING EXAMPLE WILL NOT COMPILE!!**

```java
package demo;

import java.awt.Point;

public class MagicBox {

  public String name;
  public Point location;

  public MagicBox() {
    this( null );
  }

  public MagicBox( final String name ) {
    this( name, null );
  }

  public MagicBox( final Point location ) {
    this( null, location );
  }

  public MagicBox( final String name, final Point location ) {
    this.name = name;
    this.location = location;
  }
}
```

The example highlights a problem related to `null` being a *flexible* type.  `null` can be used with any reference type.  The Java compiler is not able to determine which constructor to call.

The default constructor invokes another constructor and passes `null`.

```java
public MagicBox() {
  this( null );
}
```

The call `this( null )` matches both the constructors that have one reference type parameter.

1. The constructor that takes a `String`

    ```java
    public MagicBox( final String name ) { /* ... */ }
    ```

1. The constructor that takes a `Point`

    ```java
    public MagicBox( final Point location ) { /* ... */ }
    ```

There are several ways to address this problem.  Three of which are listed below.

1. The default constructor can do nothing as by default the properties will be set to `null`.

    ```java
    public MagicBox() {
    }
    ```

1. We can cast the `null` to either a `String` as shown next or a `Point`

    ```java
    public MagicBox() {
      this( (String) null );
    }
    ```

    [Casting is covered in depth later on](#instanceof-and-cast-operators).

1. Alternatively, the default constructor can invoke the constructor that takes two parameters.

    ```java
    public MagicBox() {
      this( null, null );
    }
    ```

All approaches are valid, but a better option if to use *static factory methods*.

### What are static factory methods?

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

1. Takes two parameters the `side` and the `depth`.  The following table shows the mapping between the properties and the parameters.

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

  public BoxDimensions( final int base, final int height ) {
    this.width = base;
    this.depth = base;
    this.height = height;
  }

  public BoxDimensions( final int side, final int depth ) {
    this.width = side;
    this.height = side;
    this.depth = depth;
  }
}
```

Both constructors have the same signature, thus the Java compiler cannot tell apart.  Consider the following code fragment.

```java
new BoxDimensions(7, 3);
```

Which constructor are we referring to in the above fragment?

There were several attempts to solve this problem, some of them are not that good.  A not so good approach is to use a different type to represent one of the parameters (not the object's property).

**⚠️ NOT RECOMMENDED!!**

```java
package demo;

public class BoxDimensions {

  private int width;
  private int height;
  private int depth;

  public BoxDimensions( int base, float height ) { /* ... */ }

  public BoxDimensions( int side, int depth ) { /* ... */ }
}
```

The above code fragment uses `float` to differentiate between the constructors.

1. Calls the *base* and *height* version of the constructor.

    ```java
    new BoxDimensions(1, 2F);
    ```

1. Calls the *side* and *depth* version of the constructor.

    ```java
    new BoxDimensions(1, 1);
    ```

This will work, but we have better options and is only mentioned here so that you are aware of it.

Static methods can be used to create an instance of the same class.  These are referred to as **static factory methods**.

```java
public static BoxDimensions withBaseAndHeight( final int base, final int height ) {
  return new BoxDimensions( base, height, base );
}
```

Methods are more flexible with names compared to constructors and we can use a meaningful name.  Note that we can create an instance of any class from anywhere we need (given that we are [allowed to do so](#access-control)).

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

  public static BoxDimensions withBaseAndHeight( final int base, final int height ) {
    return new BoxDimensions( base, height, base );
  }

  public static BoxDimensions withSideAndDepth( final int side, final int depth ) {
    return new BoxDimensions( side, side, depth );
  }
}
```

### Should utilities classes, like the `Math` class, have a constructor?

There is no point to initialise stateless classes, also referred to as utilities classes, such as the `Math` class. These classes were meant to serve a different purpose than being initialised as objects.

**⚠️ THE FOLLOWING EXAMPLE WILL NOT COMPILE!!**

```java
package demo;

public class App {
  public static void main( final String[] args ) {
    final Math math = new Math();
  }
}
```

Trying to create an instance of such class does not make sense.

Such classes should have a `private` constructor to prevent others from initialising them by mistake.  This pattern is also mentioned in the [Effective Java](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/) book as [Item 4: Enforce noninstantiability with a private constructor](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/ch2.xhtml#lev4).

Java is a **general purpose programming language** that supports, [procedural programming](https://en.wikipedia.org/wiki/Procedural_programming) style, [object oriented programming](https://en.wikipedia.org/wiki/Object-oriented_programming) style and also [functional programming](https://en.wikipedia.org/wiki/Functional_programming) style.  Static constructs fall in the procedural programming style and as such does not interact with objects.

### Can we call methods from within a constructor?

**🚧 Pending...**

## Mutable and immutable

Consider the following example.

```java
package demo;

public class App {

  public static void main( final String[] args ) {
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

The variable `a` is immutable and cannot be modified.  We cannot create a new `Box` and assign it to the variable `a` or set the variable `a` to `null`.

**⚠️ THE FOLLOWING EXAMPLE WILL NOT COMPILE!!**

```java
package demo;

public class App {

  public static void main( final String[] args ) {
    final Box a = new Box();

    /* Cannot reassign!! */
    a = new Box();
  }
}
```

The above will not compile as variable `a` is marked final which means that variable `a` cannot change its value.

The `Box` object is mutable, which means we can modify its state.  While variable `a` is `final`, the object to which variable `a` points to is mutable and thus the object can be modified.

### How can we create immutable objects?

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

### How does mutability works when we have nested objects?

It is important to note that the objects may contain other objects.  Consider the following example.

```java
package demo;

public class Destination {

  private String department;

  public String getDepartment() {
    return department;
  }

  public void changeDepartmentTo( final String department ) {
    this.department = department;
  }

  @Override
  public String toString() {
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

  @Override
  public String toString() {
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

  public static void main( final String[] args ) {
    final Destination a = new Destination();
    a.changeDepartmentTo( "Testing" );

    final Item b = new Item( 1.2, a );
    System.out.println( "-- Before changing the destination ----" );
    System.out.println( b );

    /* Change the department after creating the item */
    a.changeDepartmentTo( "Programming" );
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

**It is not recommended to mix mutable and immutable types as this may give you a `false` sense of security**.  By mistake, one may believe that the `Item` is immutable, when it is not.  If you need to rely on mutable state within immutable objects, make use of mechanisms, such as defensive copying ([discussed later on](04%20-%20Collections.md#defensive-copying)), to mitigate mutation side effects.

## Inheritance

There are two types of boxes.  The light boxes, which are boxes that can contain only one item.  The heavy boxes can contain more than one item.  Both boxes can be open or closed and can be opened and closed using the methods created above.

### Extending the `Box` functionality (creating and evolving the `LightBox` class step by step)

1. Create the `LightBox`

    ```java
    package demo;

    public class LightBox {
    }
    ```

1. Like a box, the light box can be opened and closed and has a label too.  The light box has all features the box has and can be seen as an extended version of the box.

    We have several options here.  We can either replicate all properties and methods to the new class, or inherit all of it from the `Box` class.  Both options are shown next.

    1. Replicate

        ```java
        package demo;

        import static com.google.common.base.Preconditions.checkArgument;
        import static com.google.common.base.Strings.nullToEmpty;

        public class LightBox {

          private BoxForm form;
          private String label = "No Label";

          public Box() { /* ... */ }

          public Box( final BoxForm form ) { /* ... */ }

          public void open() { /* ... */ }

          public void close() { /* ... */ }

          public boolean isOpen() { /* ... */ }

          public String getLabel() { /* ... */ }

          public void changeLabelTo( final String label ) { /* ... */ }

          private static boolean isValidLabel( final String label ) { /* ... */ }

          @Override
          public String toString() { /* ... */ }

          public enum BoxForm { /* ... */ }
        }
        ```

    1. Inherit

        ```java
        package demo;

        public class LightBox extends Box {
        }
        ```

    Given that the light box is a specific type of box, it is safe to inherit from box.  We will elaborate more on this in [later sections](#inheritance-and-composition).

    The `LightBox` class [inherits from (or `extends`)](https://docs.oracle.com/javase/tutorial/java/IandI/subclasses.html) the `Box` class.  The `Box` class is referred to as the [super class](https://docs.oracle.com/javase/tutorial/java/IandI/super.html) while the `LightBox` class is known as the child class.

    ```java
    package demo;

    public class App {

      public static void main( final String[] args ) {
        final LightBox a = new LightBox();
        final Box b = new LightBox();

        a.open();
        b.close();

        System.out.printf( "Box a: %s%n", a );
        System.out.printf( "Box b: %s%n", b );
      }
    }
    ```

    All methods and state available to a `Box` object is also available to a `LightBox` object.

    ```bash
    Box a: an open box
    Box b: a closed box
    ```

    Note that **all light boxes are boxes**, and this is quite an important statement when dealing with inheritance.  We will come back to this in a [later section](#what-happens-when-the-not-all-children-are-parents), where we will see what happens when the previous statement is false.

    Note that the opposite does not hold.  In other words, **NOT all boxes are light boxes**.  Fruit is a good analogy to this.  All apples are fruit but not all fruit is apples.  Shapes are another good example.  All circles are shape, but not all shapes are circle.

    The following will not compile.

    ```java
    final LightBox a = new Box();
    ```

1. Add the `isEmpty()` method

    ```java
    package demo;

    import org.junit.jupiter.api.DisplayName;
    import org.junit.jupiter.api.Test;

    import static org.junit.jupiter.api.Assertions.assertTrue;

    public class LightBoxTest {

      @Test
      @DisplayName( "should be empty when a new light box is created and no items are yet placed" )
      public void shouldBeEmpty() {
        final LightBox box = new LightBox();
        assertTrue( box.isEmpty() );
      }
    }
    ```

    Add the missing method (without any special logic) just to make the program compile.

    ```java
    package demo;

    public class LightBox extends Box {

      public boolean isEmpty() {
        return true;
      }
    }
    ```

    Run the tests.  All tests should pass.

1. Add the ability to add an item's id (of type `long`) to the `LightBox`.

    **The light box should not be empty (the `isEmpty()` method should return `false`) once an item is placed in the box**.

    Create the test

    ```java
    package demo;

    import org.junit.jupiter.api.DisplayName;
    import org.junit.jupiter.api.Test;

    import static org.junit.jupiter.api.Assertions.assertFalse;
    import static org.junit.jupiter.api.Assertions.assertTrue;

    public class LightBoxTest {

      @Test
      @DisplayName( "should be empty when a new light box is created and no items are yet placed" )
      public void shouldBeEmpty() { /* ... */ }

      @Test
      @DisplayName( "should not be empty after an item is placed in the box" )
      public void shouldNotBeEmpty() {
        final LightBox box = new LightBox();
        box.putItem( 1 );
        assertFalse( box.isEmpty() );
      }
    }
    ```

    Add the missing method (without any special logic) just to make the program compile.

    ```java
    package demo;

    public class LightBox extends Box {

      public boolean isEmpty() { /* ... */ }

      public void putItem( final long itemId ) {
      }
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

    Like many things in programming, we can take different approaches.

    1. Using enums (preferred approach)

        ```java
        package demo;

        public class LightBox extends Box {

          private Space space = Space.AVAILABLE;

          public boolean isEmpty() {
            return space == Space.AVAILABLE;
          }

          public void putItem( final long itemId ) {
            space = Space.FULL;
          }

          private enum Space {
            AVAILABLE, FULL
          }
        }
        ```

    1. Using `boolean` (a very common approach)

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

    Please refer to the *[is boolean the right choice?](#is-boolean-the-right-choice)* section for an in-depth discussion about this topic.

    **What happens to the `itemId` value passed to the `putItem()` method?  We are not storing this value anywhere just yet as we don't have a test that retrieves the `itemId`.  Always do the bare minimum just to get the test working!!

    Sometimes a property is used for various purposes.  Instead of creating a new property, (`space` or `empty`, depending with approach you took), we could use the `itemId` property, as shown in the following example.

    **⚠️ NOT RECOMMENDED!!**

    ```java
    package demo;

    public class LightBox extends Box {

      public static final long EMPTY = -1L;
      private long itemId = EMPTY;

      public boolean isEmpty() {
        return itemId == EMPTY;
      }

      public void putItem( final long itemId ) {
        this.itemId = itemId;
      }
    }
    ```

    The property `itemId` is used for two purposes and that's discouraged.  If negative IDs become valid, for any reason, this logic becomes invalid.

1. A light box can only contain one item and an [`IllegalStateException`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/lang/IllegalStateException.html) should be thrown if an item is added to a non-empty box.

    ```java
    package demo;

    import org.junit.jupiter.api.DisplayName;
    import org.junit.jupiter.api.Test;

    import static org.junit.jupiter.api.Assertions.assertFalse;
    import static org.junit.jupiter.api.Assertions.assertThrows;
    import static org.junit.jupiter.api.Assertions.assertTrue;

    public class LightBoxTest {

      @Test
      @DisplayName( "should be empty when a new light box is created and no items are yet placed" )
      public void shouldBeEmpty() { /* ... */ }

      @Test
      @DisplayName( "should not be empty after an item is placed in the box" )
      public void shouldNotBeEmpty() { /* ... */ }

      @Test
      @DisplayName( "should thrown an IllegalStateException when adding an item to a non-empty box" )
      public void shouldThrowExceptionWhenNotEmpty() {
        final LightBox box = new LightBox();
        box.putItem( 1 );
        assertThrows( IllegalStateException.class, () -> box.putItem( 1 ) );
      }
    }
    ```

    The test should fail.

    ```bash
    $ ./gradlew test

    ...

    LightBoxTest > should thrown an IllegalStateException when adding an item to a non-empty box FAILED
        org.opentest4j.AssertionFailedError at LightBoxTest.java:32
    ...
    ```

    Fix failing tests

    ```java
    package demo;

    import static com.google.common.base.Preconditions.checkState;

    public class LightBox extends Box {

      private Space space = Space.AVAILABLE;

      public boolean isEmpty() { /* ... */ }

      public void putItem( final long itemId ) {
        checkState( isEmpty() );
        space = Space.FULL;
      }

      private enum Space { /* ... */ }
    }
    ```

    Note that we are now using the [`checkState()` method](https://guava.dev/releases/29.0-jre/api/docs/com/google/common/base/Preconditions.html#checkState-boolean-) instead of the `checkArguments()` method as we need to fail with an `IllegalStateException` when the light box already contains an item.

    Tests should pass now.

### Can we add items to a box if the box is not open?

No, our program should throw an `IllegalStateException` if the `putItem()` method is called on a `LightBox` instance that is *not open*.  We can only add an item to the box when the box is *open*.

1. Start by adding a test

    ```java
    package demo;

    import org.junit.jupiter.api.DisplayName;
    import org.junit.jupiter.api.Test;

    import static org.junit.jupiter.api.Assertions.assertFalse;
    import static org.junit.jupiter.api.Assertions.assertThrows;
    import static org.junit.jupiter.api.Assertions.assertTrue;
    import static org.junit.jupiter.api.Assumptions.assumeFalse;

    public class LightBoxTest {

      @Test
      @DisplayName( "should be empty when a new light box is created and no items are yet placed" )
      public void shouldBeEmpty() { /* ... */ }

      @Test
      @DisplayName( "should not be empty after an item is placed in the box" )
      public void shouldNotBeEmpty() { /* ... */ }

      @Test
      @DisplayName( "should thrown an IllegalStateException when adding an item to a non-empty box" )
      public void shouldThrowExceptionWhenNotEmpty() { /* ... */ }

      @Test
      @DisplayName( "should throw an IllegalStateException when trying to adding an item to a non-open box" )
      public void shouldThrowExceptionWhenClosed() {
        final LightBox box = new LightBox();
        assumeFalse( box.isOpen() );
        assertThrows( IllegalStateException.class, () -> box.putItem( 1 ) );
      }
    }
    ```

    Note that the above test, makes use of the [`assumeFalse()` method](https://junit.org/junit5/docs/5.7.0-M1/api/org.junit.jupiter.api/org/junit/jupiter/api/Assumptions.html#assumeFalse(boolean)) instead of the [`assertFalse()` method](https://junit.org/junit5/docs/5.7.0-M1/api/org.junit.jupiter.api/org/junit/jupiter/api/Assertions.html#assertFalse(boolean)) as this is a precondition and not the actual test.  In this case, we are assuming that the box is closed by default.

    The above test will fail.

1. Check whether the box is open before adding an item to it.

    ```java
    package demo;

    import static com.google.common.base.Preconditions.checkState;

    public class LightBox extends Box {

      private Space space = Space.AVAILABLE;

      public boolean isEmpty() { /* ... */ }

      public void putItem( final long itemId ) {
        checkState( isOpen() );
        checkState( isEmpty() );
        space = Space.FULL;
      }

      private enum Space { /* ... */ }
    }
    ```

    Alternatively we can have both check in one statement

    ```java
    checkState( isOpen() && isEmpty() );
    ```

1. Run the tests

    ```bash
    $ ./gradlew test

    > Task :test FAILED

    BoxTest > should be open after the open method is called PASSED

    BoxTest > should not be open after the close method is called PASSED

    LightBoxTest > should be empty when a new light box is created and no items are yet placed PASSED

    LightBoxTest > should throw an IllegalStateException when trying to adding an item to a non-open box PASSED

    LightBoxTest > should not be empty after an item is placed in the box FAILED
        java.lang.IllegalStateException at LightBoxTest.java:23

    LightBoxTest > should thrown an IllegalStateException when adding an item to a non-empty box FAILED
        java.lang.IllegalStateException at LightBoxTest.java:31

    6 tests completed, 2 failed

    ...
    ```

    To our surprise, we broke more tests than we fixed.  Some of the previous tests were adding items to a closed box.

    When you encounter such a case, **do not rush and change the tests.  Instead, make sure that the changes that will be made to the tests will not break any of the existing functionality.  Always discuss such changes with the rest of the team**.

    We know that we should not be able to add items to a closed box, in which case we can update the previous tests to have the box in the proper state.

    ```java
    package demo;

    import org.junit.jupiter.api.DisplayName;
    import org.junit.jupiter.api.Test;

    import static org.junit.jupiter.api.Assertions.assertFalse;
    import static org.junit.jupiter.api.Assertions.assertThrows;
    import static org.junit.jupiter.api.Assertions.assertTrue;
    import static org.junit.jupiter.api.Assumptions.assumeFalse;

    public class LightBoxTest {

      @Test
      @DisplayName( "should be empty when a new light box is created and no items are yet placed" )
      public void shouldBeEmpty() { /* ... */ }

      @Test
      @DisplayName( "should not be empty after an item is placed in the box" )
      public void shouldNotBeEmpty() {
        final LightBox box = new LightBox();
        box.open();
        box.putItem( 1 );
        assertFalse( box.isEmpty() );
      }

      @Test
      @DisplayName( "should thrown an IllegalStateException when adding an item to a non-empty box" )
      public void shouldThrowExceptionWhenNotEmpty() {
        final LightBox box = new LightBox();
        box.open();
        box.putItem( 1 );
        assertThrows( IllegalStateException.class, () -> box.putItem( 1 ) );
      }

      @Test
      @DisplayName( "should throw an IllegalStateException when trying to adding an item to a non-open box" )
      public void shouldThrowExceptionWhenClosed() { /* ... */ }
    }
    ```

### 🤔 Can we design our classes to automatically prevents the object from going into invalid state?

**🤔 Please note that this is quite an advance topic and it is understandable if you don't understand and comprehend the examples shown in this section**.

Yes.  We can design our classes such that our objects can never be in an invalid state.  This approach moves towards functional programming.  Our light box can be in either open/close and empty/full state.

| # | Open/Closed | Empty/Full |
|--:|:-----------:|:----------:|
| 1 |    `OPEN`   |   `EMPTY`  |
| 2 |    `OPEN`   |    `FULL`  |
| 3 |   `CLOSED`  |    `FULL`  |
| 4 |   `CLOSED`  |   `EMPTY`  |

This is captured by the following State-Transition Diagrams.

![State-Transition Diagrams](assets/images/LightBox%20State-Transition%20Diagrams.png)

Consider the following version `LightBox`.

```java
package demo;

public class LightBox {

  public static CloseEmpty newBox() {
    return new LightBox().closeEmpty;
  }

  public class CloseEmpty {
    public OpenEmpty open() {
      return openEmpty;
    }
  }

  public class OpenEmpty {
    public CloseEmpty close() {
      return closeEmpty;
    }

    public OpenFull putItem( final long itemId ) {
      return openFull;
    }
  }

  public class CloseFull {
    public OpenFull open() {
      return openFull;
    }
  }

  public class OpenFull {
    public CloseFull close() {
      return closeFull;
    }
  }

  private final CloseEmpty closeEmpty = new CloseEmpty();
  private final OpenEmpty openEmpty = new OpenEmpty();
  private final CloseFull closeFull = new CloseFull();
  private final OpenFull openFull = new OpenFull();

  private LightBox() {
  }
}
```

This is quite complex, so let's break it into smaller parts.

1. Force the box to start in a close/empty state.

    We can use static factory methods to create an instance of box and then return in the box in the desired state.

    ```java
    public static CloseEmpty newBox() {
      return new LightBox().closeEmpty;
    }
    ```

    Note that the constructor is `private` so that the class is only created using the static factory methods.

    ```java
    private LightBox() {
    }
    ```

1. Each state is captured by an inner class, which only exposes the methods that are relevant to the current state.

    ![Show only the methods available to the current state](assets/images/Show%20only%20the%20methods%20available%20to%20the%20current%20state.png)

    An empty/closed box can only be opened.

    ```java
    public class CloseEmpty extends LightBox {
      public OpenEmpty open() {
        return openEmpty;
      }
    }
    ```

    An empty/open box can be closed or an item be added to it.

    ```java
    public class OpenEmpty extends LightBox {
      public CloseEmpty close() {
        return closeEmpty;
      }

      public OpenFull putItem( final long itemId ) {
        return openFull;
      }
    }
    ```

    The inner classes can access the properties of the class.  Note that each method within the inner classes is returning a property defined within the outer class.

Following is an example of how this can be used.

```java
package demo;

public class App {

  public static void main( final String[] args ) {
    final LightBox.CloseFull a = LightBox.newBox()
      .open()
      .putItem( 1L )
      .close();
  }
}
```

While this look very promising, it is quite hard program in this fashion and not quite common in Java.

### Create the `HeavyBox` (complete example)

A heavy box is a box that can take more than one item.

1.  Tests class

    ```java
    package demo;

    import org.junit.jupiter.api.DisplayName;
    import org.junit.jupiter.api.Test;

    import static org.junit.jupiter.api.Assertions.assertFalse;
    import static org.junit.jupiter.api.Assertions.assertThrows;
    import static org.junit.jupiter.api.Assertions.assertTrue;
    import static org.junit.jupiter.api.Assumptions.assumeFalse;

    public class HeavyBoxTest {

      @Test
      @DisplayName( "should be empty when creating a new heavy box and no items are placed" )
      public void shouldBeEmpty() {
        final HeavyBox box = new HeavyBox();
        assertTrue( box.isEmpty() );
      }

      @Test
      @DisplayName( "should not be empty after an item is placed in the box" )
      public void shouldNotBeEmpty() {
        final HeavyBox box = new HeavyBox();
        box.open();
        box.addItem( 1 );
        assertFalse( box.isEmpty() );
      }

      @Test
      @DisplayName( "should allow multiple items in the box" )
      public void shouldAllowMultipleItems() {
        final HeavyBox box = new HeavyBox();
        box.open();
        box.addItem( 1 );
        box.addItem( 2 );
        box.addItem( 3 );
      }

      @Test
      @DisplayName( "should thrown an IllegalArgumentException when adding an item that is already in the box" )
      public void shouldThrowExceptionWhenItemAlreadyExists() {
        final HeavyBox box = new HeavyBox();
        box.open();
        box.addItem( 1 );
        assertThrows( IllegalArgumentException.class, () -> box.addItem( 1 ) );
      }

      @Test
      @DisplayName( "should throw an IllegalStateException when trying to adding an item to a non-open box" )
      public void shouldThrowExceptionWhenClosed() {
        final HeavyBox box = new HeavyBox();
        assumeFalse( box.isOpen() );
        assertThrows( IllegalStateException.class, () -> box.addItem( 1 ) );
      }
    }
    ```

1. Heavy box class

    ```java
    package demo;

    import java.util.ArrayList;
    import java.util.List;

    import static com.google.common.base.Preconditions.checkArgument;
    import static com.google.common.base.Preconditions.checkState;

    public class HeavyBox extends Box {

      private final List<Long> items = new ArrayList<>();

      public boolean isEmpty() {
        return items.isEmpty();
      }

      public void addItem( final long itemId ) {
        checkState( isOpen() );
        checkArgument( false == items.contains( itemId ) );
        items.add( itemId );
      }
    }
    ```

    The above example make use of `List`, which are discussed in more depth in the [Lists (ArrayList and Vector) section](04%20-%20Collections.md#lists-vector-arraylist-and-linkedlist) part of the [collections](04%20-%20Collections.md).

### How can a subclass invoke a method in the parent class (the `super` keyword)?

While heavy boxes may contain very long labels, light box labels cannot be longer than 32 letters long.  Trying to set longer labels should throw an `IllegalArgumentException`.  The `LightBox` class needs to check the label's length before passing it to the parent class to set it.

```java
package demo;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.assmueFalse;

public class LightBoxTest {

  @Test
  @DisplayName( "should be empty when a new light box is created and no items are yet placed" )
  public void shouldBeEmpty() { /* ... */ }

  @Test
  @DisplayName( "should not be empty after an item is placed in the box" )
  public void shouldNotBeEmpty() { /* ... */ }

  @Test
  @DisplayName( "should thrown an IllegalStateException when adding an item to a non-empty box" )
  public void shouldThrowExceptionWhenNotEmpty() { /* ... */ }

  @Test
  @DisplayName( "should throw an IllegalStateException when trying to adding an item to a non-open box" )
  public void shouldThrowExceptionWhenClosed() { /* ... */ }

  @Test
  @DisplayName( "should thrown an IllegalArgumentException when given a label longer than 32 letters" )
  public void shouldThrowExceptionWhenGivenLongLabels() {
    final LightBox box = new LightBox();
    assertThrows( IllegalArgumentException.class, () -> box.changeLabelTo( "123456789 123456789 123456789 123" ) );
  }
}
```

The `changeLabelTo()` method can be overridden and a new validation added as shown next.

```java
package demo;

import static com.google.common.base.Preconditions.checkArgument;
import static com.google.common.base.Preconditions.checkState;
import static com.google.common.base.Strings.nullToEmpty;

public class LightBox extends Box {

  private Space space = Space.AVAILABLE;

  public boolean isEmpty() { /* ... */ }

  public void putItem( final long itemId ) { /* ... */ }

  @Override
  public void changeLabelTo( final String label ) {
    checkArgument( isValidLabel( label ) );
    super.changeLabelTo( label );
  }

  private static boolean isValidLabel( final String label ) {
    return nullToEmpty( label ).length() <= 32;
  }

  private enum Space { /* ... */ }
}
```

The `changeLabelTo()` in the `LightBox` cannot set the `label` directly as this belongs to the `Box` class.  A child class can access its parent's methods using the `super` keyword.  Without the `super` keyword, the above method will call itself recursively until a `StackOverflowException` is thrown.

**🚧 Pending...** Should we talk about why we are not overriding `isValidLabel()` instead?

### Can we prevent a class from being extended (the `final` keyword)?

Java allows a class to extend another class by default.  The `LightBox` was able to extend the `Box` class without having to do anything to the `Box` class.  This can be prevented by the `final` keyword, as shown next.

```java
package demo;

import com.google.common.base.Preconditions;
import com.google.common.base.Strings;

public final class LightBox extends Box { /* ... */ }
```

The `LightBox` class cannot be extended by another class as the `LightBox` class is marked `final`.  Consider the following example.

**⚠️ THE FOLLOWING EXAMPLE WILL NOT COMPILE!!**

```java
package demo;

public class FeatherBox extends LightBox { /* ... */ }
```

The `FeatherBox` cannot extend `LightBox` as the latter is marked as `final`.

### How do `private` constructor effect inheritance?

For a class to be extended, the subclass needs to have access to at least one of the parent's class constructors.  Consider the following class.

```java
package demo;

public class A {
  private A() {
  }
}
```

The class is not `final`, but still cannot be extended by another class as its sole constructor is `private`.

**⚠️ THE FOLLOWING EXAMPLE WILL NOT COMPILE!!**

```java
package demo;

public class B extends A {
}
```

There are no constructors visible to class `B` in the parent class `A`, therefore, the above will not compile.  Consider the following example.

```java
package demo;

public class A {

  public static class C extends A {
  }

  private A() {
  }
}
```

The inner class `C` is an inner class within class `A`.  Like any other member within class `A`, the inner class `C` can access the private constructor of class `A`.  This is quite a common practice where the outer class defines the contract (a set of methods) and the inner classes define the implementation.

### Are constructors inherited?

**Constructors are not inherited**.  A subclass can invoke the parent's constructors, but it does not inherit them.

The `Box` class provides two constructors, a default constructor and a constructor that takes a `Box.` parameter.  The `LightBox` and the `HeavyBox` do not have constructors, therefore a default is added to each respectively.  Consider the following example.

**⚠️ THE FOLLOWING EXAMPLE WILL NOT COMPILE!!**

```java
package demo;

import static demo.Box.BoxForm.OPEN;

public class App {

  public static void main( final String[] args ) {
    final Box a = new Box( OPEN );
    final LightBox b = new LightBox( OPEN );
  }
}
```

While the `Box` class have a constructor that accepts a `boolean` parameter, the `LightBox` class only has the given default (do nothing) constructor.  A class inherits the instance methods from the parent class, and its parents, but constructors are not inherited.

### Can a subclass invoke the constructor of a superclass (the `super()`)?

Yes, a subclass can invoke any of the parent's constructors and pass the required parameters to the parent class.  The `Box` class has two constructors.  The following example shows and example of this.

```java
package demo;

import static com.google.common.base.Preconditions.checkArgument;
import static com.google.common.base.Preconditions.checkState;
import static com.google.common.base.Strings.nullToEmpty;

public class LightBox extends Box {

  private Space space = Space.AVAILABLE;

  public LightBox() {
  }

  public LightBox( final BoxForm form ) {
    super( form );
  }

  public boolean isEmpty() { /* ... */ }

  public void putItem( final long itemId ) { /* ... */ }

  @Override
  public void changeLabelTo( final String label ) { /* ... */ }

  private static boolean isValidLabel( final String label ) { /* ... */ }

  private enum Space { /* ... */ }
}
```

The `LightBox` now can be initialised open or closed as shown next.

```java
package demo;

import static demo.Box.BoxForm.OPEN;

public class App {
  public static void main( final String[] args ) {
    final LightBox a = new LightBox();
    final LightBox b = new LightBox( OPEN );

    System.out.printf( "Box a is %s%n", a.isOpen() ? "open" : "closed" );
    System.out.printf( "Box b is %s%n", b.isOpen() ? "open" : "closed" );
  }
}
```

The second instance, created an instance of an open box while the first instance creates a closed box.

```bash
Box a is closed
Box b is open
```

A class cannot invoke any of the *grandparent*'s constructors.  Consider the following hierarchy.

1. The grandparent class, `A`

    ```java
    package demo;

    public class A {

      public A() {
        System.out.println( "A()" );
      }

      public A( int a ) {
        System.out.printf( "A(int=%d)%n", a );
      }
    }
    ```

    The grandparent has two constructors, the default constructor and another constructor that takes an `int`.

1. The parent class, `B`

    ```java
    package demo;

    public class B {
    }
    ```

    The parent class, `B`, does not define any constructors and thus a default one is assigned to class `B`.

1. The child class, `C`

    **⚠️ THE FOLLOWING DOES NOT COMPILE!!**

    ```java
    package demo;

    public class C {

      public C() {
        super( 10 );
      }
    }
    ```

    Class `C`, tries to invoke a constructor that takes an `int` as its sole parameter.  Class `A` has such constructor but class `B` does not.

### Can a constructor in a parent class call a method in a subclass?

**🚧 Pending...**

### What happens when not all '*children*' are '*parents*'?

Consider the square and rectangle shapes.  All sides of a square are equals, while in a rectangle, only the opposite sides are equal.  We need one property to represent the side (or width) of a square while we need two properties to represent the height and the width of a rectangle.

Consider the following (**bad**) example of inheritance between the square and the rectangle.

**⚠️ NOT RECOMMENDED!!**

1. The `Square` class, has one property, `width`.

    ```java
    package demo;

    public class Square {

      public final int width;

      public Square( final int width ) {
        this.width = width;
      }

      public int calculatePerimeter() {
        return width * 4;
      }

      public int calculateArea() {
        return width * width;
      }
    }
    ```

1. The `Rectangle` extends the `Square` and adds a new property, `height`.

    ```java
    package demo;

    public class Rectangle extends Square {

      public final int height;

      public Rectangle( final int width, final int height ) {
        super( width );
        this.height = height;
      }

      public int calculatePerimeter() {
        return ( width + height ) * 2;
      }

      public int calculateArea() {
        return width * height;
      }
    }
    ```

The reasoning behind the design shown above is that given the rectangle has one more property than the square, we simply extend the square and add the missing property.

This is a bad example of inheritance, because despite the appearances not all rectangles are squares.  By definition:
* a *rectangle* is a quadrilateral with all four angles right angles
* a *square* is a quadrilateral with all four angles right angles and **all four sides of the same length**.

In other words, a square is a special type of rectangle.  According to the definitions listed above, **all squares are rectangles, but not all rectangles are squares**.  Therefore, the inheritance must follow this rule and the square should extend the rectangle and not vice versa.

The above implementation is incorrect.  The following example shows a better implementation that captures the above definitions.

1. The `Rectangle` class

    ```java
    package demo;

    public class Rectangle {

      public final int width;
      public final int height;

      public Rectangle( final int width, final int height ) {
        this.width = width;
        this.height = height;
      }

      public int calculatePerimeter() {
        return ( width + height ) * 2;
      }

      public int calculateArea() {
        return width * height;
      }
    }
    ```

1. The `Square` class, extends the `Rectangle` and exposes only one constructor.

    ```java
    package demo;

    public class Square extends Rectangle {

      public Square( final int width ) {
        super( width, width );
      }
    }
    ```

This is a typical problem with inheritance where the wrong hierarchy is built.  Such hierarchies may be hard to change at a later stage as other things may be depending on it.

There are many other examples.  Cats are pets but not all pets are cats.  If someone asks for cat, we cannot give them a dog.  Therefore, when designing such hierarchy, we need to be careful to capture the "*all children are parent*", otherwise we may end up with some flawed design.

The Java API has some unfortunate instances too, where the inheritance was not properly implemented.  The [`Properties` class](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/Properties.html) is a good example of bad inheritance.  The `Properties` class inherits from the [`Hashtable` class](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/Hashtable.html).

[One of the topics discussed later](#inheritance-and-composition) is touches about these problems and propose an alternative approach to inheritance.  This topic is also covered by [Item 18: Favor composition over inheritance](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/ch4.xhtml#lev18) in the [Effective Java](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/), where it provides some bad usage of inheritance within the Java API.

### Is inheritance evil and should be considered as an anti-pattern?

The internet is littered with articles reading "*inheritance is evil*" and most of them show very bad examples of inheritance.  Another common topic that is brought up when discussing inheritance is "*inheritance breaks encapsulation*".

**Is inheritance evil?**

No, inheritance is not evil and nor an anti-pattern.  Inheritance is an important part of OOP and has its place.  With that said, and like many other things, inheritance can be misused and these articles feast on that.  In fact, inheritance can be easily misused especially when the "*all children are parent*" constraint is not followed.  Furthermore, inheritance binds classes together, making the class hierarchy more brittle to change.  Adding functionality to a parent class will affect all children and that can be dangerous.

Let see an extreme example.  Say we have a `Shape` class, that defines two abstract methods, `calculateArea()` and `calculatePerimeter()`.  All shapes have an area and perimeter and that's great.  Then we create `Circle`, `Rectangle` and other shapes and make them all inherit from the `Shape` class.  Now say we add a new method, called `calculateCircumference()`, to the `Shape` class.  That would force the rectangular shapes to also have a circumference, which is not the case.

Take for example serialisation (another Java API which did not withstand the test of time).  If the parent class, in a class hierarchy, is made [`Serializable`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/io/Serializable.html), then all subclasses will become serializable.  This is not something to take lightly as it may have serious consequences.  Even [Effective Java](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/) talks about the issues of serialisation and suggested other approaches in [Item 85: Prefer alternatives to Java serialization](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/ch12.xhtml#lev85).

## Abstraction

A box can be empty or non-empty.  In fact, both the `LightBox` and the `HeavyBox` classes have the `isEmpty()` method which does the same thing for both types of boxes.  Given that **all** boxes can be empty (or non-empty), we can move the `isEmpty()` method to the `Box` class.

The `Box` class does not have enough information to determine whether it is empty or not.  The sub-classes use different mechanism to determine whether they are empty or not.

1. The `LightBox` make use of the `space` (`Space` enum) property
1. The `HeavyBox` delegates this to the `items` ([`List`'s `isEmpty()` method](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/List.html#isEmpty())) property

This means that while all boxes can be empty (or non-empty), the Box class cannot answer the question, `isEmpty()`.  The `Box` class needs to have a method for which it does not have an implementation.  Methods that do not have an implementation, or a body, are referred to as abstract methods as shown next.

```java
  public abstract boolean isEmpty();
```

The method shown above does not have a body and a semi-colon (`;`) is used instead of curly brackets (`{}`).  The full example is shown next.

```java
package demo;

import static com.google.common.base.Preconditions.checkArgument;
import static com.google.common.base.Strings.nullToEmpty;

public abstract class Box {

  private BoxForm form = BoxForm.CLOSED;
  private String label = "No Label";

  public Box() { /* ... */ }

  public Box( final BoxForm form ) { /* ... */ }

  public void open() { /* ... */ }

  public void close() { /* ... */ }

  public boolean isOpen() { /* ... */ }

  public String getLabel() { /* ... */ }

  public void changeLabelTo( final String label ) { /* ... */ }

  private static boolean isValidLabel( final String label ) { /* ... */ }

  public abstract boolean isEmpty();

  @Override
  public String toString() { /* ... */ }

  public enum BoxForm { /* ... */ }
}
```

The `isEmpty()` method needs to be `abstract` as while a box can be empty or not, the `Box` class does not know how to answer this question.

Shapes are a good analogy.  All shapes have an area, but we cannot compute the area of shape, as shape is abstract.  We cannot draw a shape as shape is abstract.  Yet we know that shapes have an area.  We can compute the area of a square or a circle, but we cannot compute the area of a shape.

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

    Note that class `B` inherits an abstract method from class `A`.  The abstract method `m()` is not implemented and thus, class `B` must be abstract.

### Can `final` classes be `abstract`?

A class that is marked `final` cannot be extended.  Therefore, a `final` class cannot be `abstract`.  Either `final` or `abstract`, but not both.

A `final` class must be concrete.  A concrete class is the opposite for an `abstract` class.

### Can `abstract` classes have `private` constructors?

This question is related to another question, [How do `private` constructor effect inheritance?](#how-do-private-constructor-effect-inheritance) discussed before.

Yes, `abstract` classes can have `private` constructors.  This might not make much sense, because how can we extend an `abstract` class if all of its constructors are `private`?  There are cases where we want to limit the types of objects we want to support, and still have a class hierarchy.

Consider the following example.

```java
package demo;

public abstract class Temperature {

  private Temperature() { }

  public abstract boolean isTooCold();

  public abstract boolean isTooHot();


  public static Temperature withFahrenheit( final double fahrenheit ) { /* ... */ }

  public static Temperature withCelsius( final double celsius ) { /* ... */ }

  public static Temperature withKelvin( final double kelvin ) { /* ... */ }


  private static class Fahrenheit extends Temperature { /* ... */ }

  private static class Celsius extends Temperature { /* ... */ }

  private static class Kelvin extends Temperature { /* ... */ }

}
```

According to [wikipedia](https://en.wikipedia.org/wiki/Temperature), "_*temperature* is a physical property of matter that quantitatively expresses hot and cold_".  The `Temperature` class is an `abstract` class that defines two `abstract` methods, `isTooCold()` and `isTooHot()`.  The temperature can be measured (or represented) in *Fahrenheit*, *Celsius* or other units.

Similar to the shapes, we cannot create a temperature without specifying its scale.  The above implementation defines three variants, all of which extend the `Temperature` class.  The above example looks a lot like enums, and that is **almost** correct.

Like enums, we can only have the types defined, `Fahrenheit`, `Celsius` and `Kelvin` and we cannot add new types (outside from the `Temperature` class).  The following will not work.

**⚠️ THE FOLLOWING EXAMPLE WILL NOT COMPILE!!**

```java
public class MyNewTemperatureType extends Temperature {

  @Override
  public boolean isTooCold() {
    return false;
  }

  @Override
  public boolean isTooHot() {
    return false;
  }
}
```

This is a form of subtypes control that while enables subclasses, only the defined subclasses are allowed.  The `Temperature` class cannot be extended by an external class, which prevents some funny code added to the application.  Different from enums, we can have multiple instances of each type.

## The `Object` class

All roads lead to rome and all classes inherit from the `Object` class.

Consider the following example.

```java
package demo;

public class Person {
}
```

The `Person` class does not use the `extends` keyword.  By default, any classes that do not use the `extends` keyword extends the `Object` class.  The following example is equivalent to the above example.

```java
package demo;

public class Person extends Object {
}
```

The `Person` class has no methods defined, yet the IDE still shows a list of methods we can use.

![Methods Inherited from the Object Class](assets/images/Methods%20Inherited%20from%20the%20Object%20Class.png)

The following sections will work with the following version of the `Person` class.

```java
package demo;

public class Person {

  private String name;
  private String surname;

  public Person() {
    this( null );
  }

  public Person( final String name ) {
    this( name, null );
  }

  public Person( final String name, final String surname ) {
    this.name = name;
    this.surname = surname;
  }
}
```

### The `toString()` method

All objects in Java have a [method called `toString()`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/lang/Object.html#toString()) which is used to convert an object into a developer friendly string.

```java
package demo;

public class App {
  public static void main( final String[] args ) {
    final Person a = new Person();
    System.out.printf( "The person object: %s%n", a );
  }
}
```

The above prints the following, unuseful, message.

```bash
The person object: demo.Person@58372a00
```

The `toString()` method is used to convert our person object into a `String`.

It is always recommended to override the `toString()` method and return something more useful.  [Item 12, titled Always override toString](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/ch3.xhtml#lev12) in the [Effective Java](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/) book talks about this too.

```java
package demo;

import static com.google.common.base.Strings.isNullOrEmpty;

public class Person {

  private String name;
  private String surname;

  public Person() { /* ... */ }

  public Person( final String name ) { /* ... */ }

  public Person( final String name, final String surname ) { /* ... */ }

  @Override
  public String toString() {
    final boolean hasName = !isNullOrEmpty( name );
    final boolean hasSurname = !isNullOrEmpty( surname );

    if ( hasName && hasSurname ) {
      // return name + " " + surname;
      return String.format( "%s %s", name, surname );
    }

    if ( hasName ) {
      return name;
    }

    if ( hasSurname ) {
      return surname;
    }

    return "Unknown Person!!";
  }
}
```

Consider the following example.

```java
package demo;

public class App {
  public static void main( final String[] args ) {
    final Person a = new Person();
    System.out.printf( "The person object: %s%n", a );

    final Person b = new Person( "Aden" );
    System.out.printf( "The person object: %s%n", b );

    final Person c = new Person( null, "Attard" );
    System.out.printf( "The person object: %s%n", c );

    final Person d = new Person( "Aden", "Attard" );
    System.out.printf( "The person object: %s%n", d );
  }
}
```

The above program will print the following.

```bash
The person object: Unknown Person!!
The person object: Aden
The person object: Attard
The person object: Aden Attard
```

Following are two important points about the `toString()` method
1. **The `toString()` method should never return a `null`**.
1. **Do not rely on the output of the `toString()` method as a source of structured input**.
    Do not parse an object based on the `toString()` output as this may change without warning.

### The `equals()` and `hashCode()` methods

Consider the following example.

```java
package demo;

public class App {
  public static void main( final String[] args ) {
    final Person a = new Person( "Aden" );
    final Person b = new Person( "Aden" );

    final boolean areEquals = a.equals( b );
    System.out.printf( "Are the objects equal? %s%n", areEquals );
  }
}
```

We have two instances which have the same content, a person with the same name.  What will the `equals()` method return?

```bash
Are the objects equal? false
```

Despite having the same name (`"Aden"`) and surname (`null`), the [`equals()` as defined by the `Object` class](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/lang/Object.html#equals(java.lang.Object)) will only check whether the variables are pointing to the same instance in the *Java heap*.

```java
package demo;

public class App {
  public static void main( final String[] args ) {
    final Person a = new Person( "Aden" );
    final Person b = a;

    final boolean areEquals = a.equals( b );
    System.out.printf( "Are the objects equal? %s%n", areEquals );
  }
}
```

In the above example, both variables `a` and `b` point to the same object in the *Java heap*.  The above will print `true`.

```bash
Are the objects equal? true
```

Overriding the `equals()` method can help us solve this problem.

**⚠️ THE FOLLOWING EXAMPLE IS MISSING AN IMPORTANT METHOD.  DO NOT USE IT AS IS!!**

```java
package demo;

import java.util.Objects;

import static com.google.common.base.Strings.isNullOrEmpty;

public class Person {

  private String name;
  private String surname;

  public Person() { /* ... */ }

  public Person( final String name ) { /* ... */ }

  public Person( final String name, final String surname ) { /* ... */ }

  @Override
  public boolean equals( final Object object ) {
    if ( this == object ) {
      return true;
    }

    if ( !( object instanceof Person ) ) {
      return false;
    }

    final Person other = (Person) object;
    return Objects.equals( name, other.name ) &&
      Objects.equals( surname, other.surname );
  }

  @Override
  public String toString() { /* ... */ }
}
```

In the above example we made use of the [`Objects`' utilities `equals()` method](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/Objects.html#equals(java.lang.Object,java.lang.Object)).  This method is not to be mistaken with the normal `equals()` method.  The utilities `equals()` method is very useful in comparing two instance variables and is a shorthand for the following.

```java
public static boolean equals(Object a, Object b) {
  return (a == b) || (a != null && a.equals(b));
}
```

**How come we didn't static import the utilities `equals()` method?**  Note that we cannot static import a method, when another method with the same name already exists in the class.

If we rerun the same program we had before, we will get the expected output, as our `equals()` method is now used.

```bash
Are the objects equal? true
```

The `equals()` method is used a lot by the Java API in conjunction to the [`hashCode()` method](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/lang/Object.html#hashCode()).  The relation between these two methods is so strong that the [Effective Java](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/) book has an item about this, [Item 11: Always override hashCode when you override equals](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/ch3.xhtml#lev11).

Failing to override the `hashCode()` will make our class incompatible with some Java API.  Consider the following example.

```java
package demo;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class App {

  public static void main( final String[] args ) {
    /* Two persons that will be added to the collections */
    final Person a = new Person( "Aden" );
    final Person b = new Person( "Jade" );

    /* Create two collections, list and set and put two persons in each */
    final List<Person> list = List.of( a, b );
    final Set<Person> set = new HashSet<>( List.of( a, b ) );
    System.out.println( "-- Collections ------------" );
    System.out.printf( "List: %s%n", list );
    System.out.printf( "Set: %s%n", set );

    /* Use different objects to search so that we do not rely on the object's identity */
    final Person m = new Person( "Aden" );
    final Person n = new Person( "Peter" );

    /* Search the list */
    System.out.println( "-- Search the list --------" );
    System.out.printf( "List contains %s? %s%n", m, list.contains( m ) );
    System.out.printf( "List contains %s? %s%n", n, list.contains( n ) );

    /* Search the set */
    System.out.println( "-- Search the set ---------" );
    System.out.printf( "Set contains %s? %s%n", m, set.contains( m ) );
    System.out.printf( "Set contains %s? %s%n", n, set.contains( n ) );
  }
}
```

The above example creates two collections, a [`List`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/List.html) and a [the `HashSet` class](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/HashSet.html) to highlight a problem.  [Collections are covered in depth at a later stage](04%20-%20Collections.md).  Running the above **may** produce the following output.

```bash
-- Collections ------------
List: [Aden, Jade]
Set: [Aden, Jade]
-- Search the list --------
List contains Aden? true
List contains Peter? false
-- Search the set ---------
Set contains Aden? false
Set contains Peter? false
```

Note that while the `List` was able to find the person with name `"Aden"`, the `HashSet` was not.

```bash
-- Search the set ---------
Set contains Aden? false
Set contains Peter? false
```

Hash-based classes, such as the `HashSet` class or [the `HashMap` class](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/HashMap.html), rely on the `hashCode()` together with the `equals()` method to function properly.  The current implemetation of the `Person` class may work or may not work, depends on how lucky we get with the value returned by the `Object`'s version of the `hashCode()` method.

Following is a better version of the `Person` class.

```java
package demo;

import java.util.Objects;

import static com.google.common.base.Strings.isNullOrEmpty;

public class Person {

  private String name;
  private String surname;

  public Person() { /* ... */ }

  public Person( final String name ) { /* ... */ }

  public Person( final String name, final String surname ) { /* ... */ }

  @Override
  public boolean equals( final Object object ) { /* ... */ }

  @Override
  public int hashCode() {
    return Objects.hash( name, surname );
  }

  @Override
  public String toString() { /* ... */ }
}
```

Note that both the overridden methods `equals()` and `hashCode()` made use of the [Objects.equals()](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/Objects.html#equals(java.lang.Object,java.lang.Object)) and [Objects.hash()]() methods.

#### Puzzle (Animal Farm)

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

### The `getClass()` method

An object is an instance of a class.  Thus, all objects have a class and this can be retrieved using [the `getClass()` method](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/lang/Object.html#getClass()).  Consider the following example.

```java
package demo;

import java.awt.Point;
import java.util.Random;

public class App {

  public static void main( final String[] args ) {
    final Object a = new Point( 1, 2 );
    final Object b = new Random();

    printType( a );
    printType( b );
  }

  private static void printType( Object o ) {
    System.out.printf( "The object is of type %s%n", o.getClass() );
  }
}
```

The above will print

```bash
The object is of type class java.awt.Point
The object is of type class java.util.Random
```

The class, of any object, can be also obtained from the actual class.  For example, we can obtain the class of the `Point` class using the `Point.class` static like field.  All classes have a static like field named `class`.  The class itself is represented as a Java object in Java.

```java
package demo;

import java.awt.Point;
import java.util.Random;

public class App {

  public static void main( final String[] args ) {
    final Object a = new Point( 1, 2 );
    final Object b = new Random();

    isOfPointType( a );
    isOfPointType( b );
  }

  private static void isOfPointType( final Object a ) {
    final boolean isSameClass = Point.class == a.getClass();
    System.out.printf( "Is the object (%s) of type Point? %s%n", a.getClass(), isSameClass );
  }
}
```

The above will print

```bash
Is the object (class java.awt.Point) of type Point? true
Is the object (class java.util.Random) of type Point? false
```

The `getClass()` method is sometimes used in the `equals()` method when the class does not have subtypes (and to make the comparison more efficient).

**⚠️ PROCEED WITH CAUTION!!**

```java
package demo;

import java.util.Objects;

import static com.google.common.base.Strings.isNullOrEmpty;

public class Person {
  private String name;
  private String surname;

  public Person() { /* ... */ }

  public Person( final String name ) { /* ... */ }

  public Person( final String name, final String surname ) { /* ... */ }

  @Override
  public boolean equals( final Object object ) {
    if ( this == object ) {
      return true;
    }

    // if ( !( object instanceof Person ) ) {
    if ( object != null && object.getClass() == Person.class ) {
      return false;
    }

    final Person other = (Person) object;
    return Objects.equals( name, other.name ) &&
      Objects.equals( surname, other.surname );
  }

  @Override
  public int hashCode() { /* ... */ }

  @Override
  public String toString() { /* ... */ }
}
```

Note that the above version of the `equals()` method is slightly different from the previous version, the one that used the `instanceof` operator.

### The `wait()`, `notify()` and `notifyAll()` methods

Java supported multithreading since its early days.  When working with threads, we may need to wait for something to happen before continuing.  Say we have a doctor's appointment.  We go to the clinic and wait for our name to be called.  This can be achieved using any of [the `wait()` methods](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/lang/Object.html#wait()).

The following example simulates a patient visiting the doctor and waiting for their name to be called.  The following example make use of multithreading, [an advance topic which is still be covered](11%20-%20Concurrency.md).

```java
package demo;

import java.time.LocalTime;

public class App {
  public static void main( final String[] args ) {
    final Person a = new Person( "Aden" );

    waitInLobby( a );
    letSomeTimePass();
    callNext( a );
  }

  private static void waitInLobby( final Person a ) {
    final Thread t = new Thread( () -> {
      synchronized ( a ) {
        try {
          display( "Waiting in the lobby for my name to be called" );
          a.wait();
          display( "My name was called!!" );
        } catch ( InterruptedException e ) { }
      }
    }, "waiting in lobby" );
    t.start();
  }

  private static void letSomeTimePass() {
    try {
      display("letting some time pass…");
      Thread.sleep( 500 );
    } catch ( InterruptedException e ) { }
  }

  private static void callNext( final Person a ) {
    synchronized ( a ) {
      displayf( "%s, the doctor is ready to see you", a );
      a.notifyAll();
    }
  }

  private static void displayf( final String pattern, final Object... parameters ) {
    display( String.format( pattern, parameters ) );
  }

  private static void display( final String message ) {
    System.out.printf( "%s [%s] %s%n", LocalTime.now(), Thread.currentThread().getName(), message );
  }
}
```

Break down of the above example.

1. The `main()` method is fairly straight forward.  An object of type `Person` is created and passed to the `waitInLobby()` method.  The `letSomeTimePass()` method is called next followed by the `callNext()` method.

    ```java
    public static void main( final String[] args ) {
      final Person a = new Person( "Aden" );

      waitInLobby( a );
      letSomeTimePass();
      callNext( a );
    }
    ```

1. The `waitInLobby()` method is harder to understand.

    ```java
    private static void waitInLobby( final Person a ) {
      final Thread t = new Thread( () -> {
        synchronized ( a ) {
          try {
            display( "Waiting in the lobby to be called" );
            a.wait();
            display( "My name was called!!" );
          } catch ( InterruptedException e ) { }
        }
      }, "waiting in lobby" );
      t.start();
    }
    ```

    The method starts by creating a thread, `t`, which will be used to wait.  A new thread is required as when the `wait()` method is invoked, the thread from which the method is called, is paused until the [`notify()`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/lang/Object.html#notify()) or [`notifyAll()`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/lang/Object.html#notifyAll()) methods are called on the same object.  If we invoke the `wait()` on the main thread, our program may hang forever.

    The `wait()` method need to be invoked within [a `synchronized` block](https://docs.oracle.com/javase/tutorial/essential/concurrency/locksync.html).  Each object (not primitives) in Java has an [intrinsic lock](https://docs.oracle.com/javase/tutorial/essential/concurrency/locksync.html), that can be used to control the access to this object by other threads.  If an object needs to be modified by multiple threads, the `synchronized` block can be used so that the threads do not step on each other and put the object in an inconsistent state.

    The `wait()` method will pause the current thread indefinitely.  The overloaded versions of this method provide a timeout to prevent threads from hanging there forever.

    Like most of the concurrent operations, the `wait()` method may throw [an `InterruptedException`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/lang/InterruptedException.html) if it is interrupted while waiting which need to be caught.  Using the `wait()` method outside a `synchronized` block will throw [an `IllegalMonitorStateException`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/lang/IllegalMonitorStateException.html).

1. The `letSomeTimePass()` pauses the current thread for 500 milliseconds.

    ```java
    private static void letSomeTimePass() {
      try {
        display("letting some time pass…");
        Thread.sleep( 500 );
      } catch ( InterruptedException e ) { }
    }
    ```

    Similar to the `wait()` method, the thread which is sleeping may be interrupted, in which case an `InterruptedException` is thrown.

1. The `callNext()` method obtains the lock on the person using the `synchronized` block and then invoked the `notifyAll()` method.

    ```java
    private static void callNext( final Person a ) {
      synchronized ( a ) {
        displayf( "%s, the doctor is ready to see you", a );
        a.notifyAll();
      }
    }
    ```

    The `notifyAll()` method notifies all threads that the object (the object to which variable `a` points to) is ready to wake up and resume operation.  This will cause the `wait()` method to stop waiting and unblocks the other thread (created in the `waitInLobby()` method).  The `notify()` method behaves similarly to the `notifyAll()` with the difference that only one thread is notified and not all threads.  If the notified thread is not the right thread (not the thread that was blocked waiting), then the notification is lost, and the blocked thread will hang waiting forever.  It is always recommended to use the `notifyAll()` method instead of the `notify()` method.

The example prints the following.

```bash
12:34:56.000022 [waiting in lobby] Waiting in the lobby for my name to be called
12:34:56.000000 [main] letting some time pass…
12:34:56.482630 [main] Aden, the doctor is ready to see you
12:34:56.483048 [waiting in lobby] My name was called!!
```

A small observation regarding the messages order.  Note that the second message happened before the first message by some nano seconds, yet it appears after the first message.  Note that the text within the square brackets, `waiting in lobby` and `main`, represents the thread's name from where the message is printed.  The example made use of two threads, the main thread and a second thread, named `waiting in lobby`.

The approach to multithreading in Java has been revised and a new concurrency API was added to the language.  The new concurrency API provider better concurrency primitives and is always recommended over intrinsic locking, shown above.  Concurrency is covered in detail, [in later sections](11%20-%20Concurrency.md).

## Interfaces

We can extend the Java language by adding new types.  So far we have created new classes ([as shown in the Simple objects section](#simple-objects)).

Consider the following example.

```java
package demo;

import java.util.Arrays;

public class App {
  public static void main( final String[] args ) {
    final String[] names = { "Mary", "Aden", "Peter", "Jade", "Mario" };
    Arrays.sort( names );
    System.out.printf( "Sorted: %s", Arrays.toString( names ) );
  }
}
```

The `Arrays.sort()` method sorts the names alphabetically.

```bash
Sorted: [Aden, Jade, Mario, Mary, Peter]
```

Can we sort any array like that?  Consider the following example.

**⚠️ THE FOLLOWING EXAMPLE WILL COMPILE BUT WILL THROW AN ClassCastException!!**

```java
package demo;

import java.awt.Point;
import java.util.Arrays;

public class App {
  public static void main( final String[] args ) {
    final Point[] points = {
      new Point( 1, 2 ),
      new Point( 1, 3 ),
      new Point( 2, 1 ),
    };
    Arrays.sort( points );
    System.out.printf( "Sorted: %s", Arrays.toString( points ) );
  }
}
```

Unfortunately, running the above program will fail with `ClassCastException`.

```bash
Exception in thread "main" java.lang.ClassCastException: class java.awt.Point cannot be cast to class java.lang.Comparable (java.awt.Point is in module java.desktop of loader 'bootstrap'; java.lang.Comparable is in module java.base of loader 'bootstrap')
	at java.base/java.util.ComparableTimSort.countRunAndMakeAscending(ComparableTimSort.java:320)
	at java.base/java.util.ComparableTimSort.sort(ComparableTimSort.java:188)
	at java.base/java.util.Arrays.sort(Arrays.java:1040)
	at demo.App.main(App.java:13)
```

**How come the program was able to sort the array of string but not the array of points?**

The [`sort()` method](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/Arrays.html#sort(java.lang.Object%5B%5D)) makes use of [the `Comparable` interface](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/lang/Comparable.html) to compare and sort the array of strings.  The `Point` does not implement this interface and thus the `sort()` method cannot compare and sort the array of points.

### What is an interface?

Interfaces define types and can be use in a similar way classes and enums are used.

```java
package demo;

public interface MyFirstInterface {
}
```

Like other types, we can have variables of this interface type.

```java
package demo;

public class App {
  public static void main( final String[] args ) {
    final MyFirstInterface a = null;
  }

  private static void useMyInterface( final MyFirstInterface a ) { /* ... */ }
}
```

The above example is a bit useless as the interface does not define any methods.

### How is an interface different from a class?

In a class we can have methods, static fields, properties, enums and inner classes (and interfaced).  In an interface we can have almost anything like we have in a class with the exception of properties and inner instance classes.  **An interface cannot have properties and cannot have inner instance classes**.

```java
package demo;

public interface MyFirstInterface {

  int STATIC_FIELD = 7;

  int anAbstractMethod();

  class InnerStaticClass {
  }

  interface InnerInterface {
  }

  default void anDefaultMethod() {
    System.out.println( "Java 8 introduced default methods" );
  }

  static void aStaticMethod() {
    System.out.println( "Java 8 introduced static methods" );
  }

  enum MyEnum {
  }
}
```

Note that the static field, `STATIC_FIELD`, is not a property.  Also, the inner static class, `InnerStaticClass`, is an inner static class and not an inner instance class.

Upto Java 7, interfaces could not have any functionality.  Java 8 introduced [default and static methods](https://docs.oracle.com/javase/tutorial/java/IandI/defaultmethods.html) to interfaces.

### How can we use interfaces?

Consider the following interface.

```java
package demo;

public interface CanShoot {

  void shoot();
}
```

The above interface has one method, `shoot()`.  Methods in an interface are `public abstract` bu default.  The following example is an identical copy of the previous example.

```java
package demo;

public interface CanShoot {

  public abstract void shoot();
}
```

There is no need to include the `public` and `abstract` modifiers.

Any class implementing this interface will have the `shoot()` method.

```java
package demo;

public class Cannon implements CanShoot {

  private double calibre;

  @Override
  public void shoot() {
    System.out.println( "Boom..." );
  }
}
```

The above class represents a cannon and can be used as shown next.

```java
package demo;

public class App {
  public static void main( final String[] args ) {
    final CanShoot a = new Cannon();
    a.shoot();
  }
}
```

We can now use a `Cannon` wherever we have a `CanShoot` type is required.

```java
package demo;

public class App {
  public static void main( final String[] args ) {
    fire( new Cannon() );
  }

  private static void fire( CanShoot a ) {
    a.shoot();
  }
}
```

Consider the following two classes.

1. A footballer

    ```java
    package demo;

    public class Footballer implements CanShoot {

      private int shirtNumber;

      @Override
      public void shoot() {
        System.out.println( "Near the pole, shooting...GOAL!!" );
      }
    }
    ```

1. A photographer

    ```java
    package demo;

    public class Photographer implements CanShoot {

      private String name;

      @Override
      public void shoot() {
        System.out.println( "Smile...Ka-chick" );
      }
    }
    ```

All three classes shown implement the `CanShoot` interface and three provide a different implementation to the `shoot()` method.  A cannot fires a shell, the photographer takes photos while the footballer shoots to score.  This means that we can use any of these types wherever the `CanShoot` is required.

```java
package demo;

public class App {
  public static void main( final String[] args ) {
    fire( new Cannon() );
    fire( new Footballer() );
    fire( new Photographer() );
  }

  private static void fire( final CanShoot a ) {
    a.shoot();
  }
}
```

Each implementation behaves in its own way.

```bash
Boom...
Near the pole, shooting...GOAL!!
Smile...Ka-chick
```

This is referred to [polymorphism](https://en.wikipedia.org/wiki/Polymorphism_(computer_science)), where the implementation of a method is determined at runtime.

### Can we create an instance of an interface?

We cannot create an instance of an interface, as interfaces are abstract by nature.  The following example will not compile.

**⚠️ THE FOLLOWING EXAMPLE WILL NOT COMPILE!!**

```java
package demo;

public class App {
  public static void main( final String[] args ) {
    final CanShoot a = new CanShoot();
    a.shoot();
  }
}
```

Say that the above will compile.  What should happen when the `shoot()` method is invoked?  The above cannot compile as we have no implementation for the `shoot()` method.  Java provides inner anonymous classes, such as the following example, [introduced in Java 1.1](https://www.cs.cornell.edu/andru/javaspec/1.1Update.html) that allow us to implement interfaces on the fly.

```java
package demo;

public class App {
  public static void main( final String[] args ) {
    final CanShoot a = new CanShoot() {
      @Override
      public void shoot() {
        System.out.println( "An inner anonymous class" );
      }
    };
    a.shoot();
  }
}
```

Inner anonymous classes, [discussed in more depth later on](#inner-anonymous-class), are not exclusive to interfaces.  We can create an inner anonymous class for classes as [discussed later on](#inner-anonymous-class).  The above example will print.

```bash
An inner anonymous class
```

### Functional interface and lambda functions

When lambdas where introduced, Java also introduced the concept of a [functional interface, denoted by the `@FunctionalInterface` annotation](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/lang/FunctionalInterface.html).  **A functional interface is an interface that has one abstract method**.

```java
package demo;

@FunctionalInterface
public interface CanShoot {

  void shoot();
}
```

The `@FunctionalInterface` annotations marks the interface as a functional interface and a compilation error will occur if the interface has more than one abstract method.  Consider the following interface example.

```java
package demo;

@FunctionalInterface
public interface CanShoot {

  void shoot();

  default void aDefaultMethod() {
  }

  static void aStaticMethod() {
  }
}
```

The above is a valid functional interface as it only has one abstract method, `shoot()`.  The other methods are not abstract.  Now consider the following interface example.

**⚠️ THE FOLLOWING EXAMPLE WILL NOT COMPILE!!**

```java
package demo;

@FunctionalInterface
public interface CanShoot {

  void shoot();

  void aSecondAbstractMethod();
}
```

The above is not a functional interface as there is more than one abstract method.

#### What is the relation between lambda and functional interfaces?

Consider the following example, presented before.

```java
package demo;

public class App {
  public static void main( final String[] args ) {
    final CanShoot a = new CanShoot() {
      @Override
      public void shoot() {
        System.out.println( "An inner anonymous class" );
      }
    };
    a.shoot();
  }
}
```

The above makes use of inner anonymous classes.  We can achieve the same thing using lambda as shown next.

```java
package demo;

public class App {
  public static void main( final String[] args ) {
    final CanShoot a = () -> System.out.println( "An inner anonymous class" );
    a.shoot();
  }
}
```

The evaluation of a lambda expression produces an instance of a functional interface ([JLS 9.8](https://docs.oracle.com/javase/specs/jls/se8/html/jls-9.html#jls-9.8)).  Both of the examples will print the same thing to the console.

```bash
An inner anonymous class
```

While these two approaches display the same thing, these are quite different.  Consider the following source classes.

```bash
$ tree src/main/java
src/main/java
└── demo
    ├── App.java
    └── CanShoot.java
```

The `CanShoot` interface is a functional interface as shown next.

```java
package demo;

@FunctionalInterface
public interface CanShoot {

  void shoot();
}
```

The `App` class creates an inner anonymous class and make use of lambda too.  Both of them have a blank implementation of the `shoot()` method.

```java
package demo;

public class App {
  public static void main( final String[] args ) {
    final CanShoot a = new CanShoot() { @Override public void shoot() {} };
    final CanShoot b = () -> {};

    System.out.printf("The type of a is %s%n", a.getClass());
    System.out.printf("The type of b is %s%n", b.getClass());
  }
}
```

Running the above we will print the following.

```bash
The type of a is class demo.App$1
The type of b is class demo.App$$Lambda$1/0x0000000800b79840
```

Lambda will return a class with a funny name, but strangely enough lambdas are not bound to any of the classes produced by the compiler.  Listing the classes files produces during the compilation, we get three classes.

```bash
$ tree build/classes/java
build/classes/java
└── main
    └── demo
        ├── App$1.class
        ├── App.class
        └── CanShoot.class
```

The `App$1.class` is the class produced by the inner anonymous class.  We have no class file for the lambda.  Everything in Java is a class and lambda are no exceptions.  In Java, classes are the smallest unit of work.  We cannot just have a method outside a class.

Different from a normal Java class files, produced by the Java compiler during the compilation time, lambda classes are created by the Java runtime environment at runtime.  The lambda classes are sometimes referred to as *lambda runtime classes*.  When the lambda is encounter for the first time, the Java runtime will compile and create the *lambda runtime class*.  Note that the lambda is only compiled, when it is first encountered and not every time it is executed.

### Can an interface extend another class or another interface?

Interfaces cannot have state, therefore that rules out interfaces extending classes.  An interface cannot extend a class.  Interfaces can extend one or many interfaces.

Consider the following three interfaces.

1. The `CanFish` interface

    ```java
    package demo;

    public interface CanFish {

      void fish();
    }
    ```

1. The `CanPaint` interface

    ```java
    package demo;

    public interface CanPaint {

      void paint();
    }
    ```

1. The `CanFixCar` interface

    ```java
    package demo;

    public interface CanFixCar {

      void fixCar();
    }
    ```

We can create a fourth interface, called `JackOfAllTrades` that extend the previously shown interfaces.

```java
package demo;

public interface JackOfAllTrades extends CanFish, CanFixCar, CanPaint {

  void canDoAll();
}
```

Any class implementing the `JackOfAllTrades` must implement all four methods, otherwise it must be marked as `abstract`.

```java
package demo;

public class BobTheBuilder implements JackOfAllTrades {

  @Override
  public void canDoAll() { /* ... */ }

  @Override
  public void fish() { /* ... */ }

  @Override
  public void fixCar() { /* ... */ }

  @Override
  public void paint() { /* ... */ }
}
```

The following table compares the different extends/imports options available between different types.

| Type      | Class          | Interface         |
|-----------|:--------------:|-------------------|
| class     | `extends` 0..1 | `implements` 0..M |
| interface | **N/A**        | `extends` 0..M    |
| enum      | **N/A**        | `implements` 0..M |

### How many interfaces can a class implement?

As hinted in the previous section, a class can implement as many interfaces it needs.  Consider the following two interfaces.

1. Has the ability to pedal, such as a *bicycle* or a *pedal boat*.

    ```java
    package demo;

    public interface CanPedal {

      void pedal();
    }
    ```

1. Has the ability to switch gears, such as a *bicycle* or a *car*.

    ```java
    package demo;

    public interface CanChangeGears {

      void shiftUp();

      void shiftDown();
    }
    ```

A class can implement both interfaces as shown in the following example.

```java
package demo;

public abstract class Bicycle implements CanPedal, CanChangeGears{
}
```

The above class is `abstract` as it does not implement all the abstract methods that the interfaces define.  We can implement some of the abstract methods defined by the interfaces, in which case the class still needs to be abstract.

```java
package demo;

public abstract class Bicycle implements CanPedal, CanChangeGears {

  @Override
  public void shiftUp() { /* ... */ }

  @Override
  public void pedal() { /* ... */ }
}
```

The new version of the `Bicycle` class is still missing the `shiftDown()` method, defined by the `CanChangeGears` interface, thus needs to be declared `abstract`.

### What happens if a class implements two interfaces that have the same abstract method?

A class can implement interfaces that have the same method signature, only if the methods have the same return type.  A class cannot implement two, or more, interfaces that have the same method name and parameters, but have a different return type.  In general, a class cannot have two methods with the same name and parameters and different return types.

Consider the following interfaces

1. An algorithm that resolves to a `double`.

    ```java
    package demo;

    public interface DoubleAlgorithm {

      double compute();
    }
    ```

1. An algorithm that resolved to an `int`

    ```java
    package demo;

    public interface IntAlgorithm {

      int compute();
    }
    ```

Both interfaces define a method, named `compute()`, that return a different type.  Now consider the following class that implements both interfaces.

```java
package demo;

public class Calculator implements IntAlgorithm, DoubleAlgorithm {

  @Override
  public int compute() { /* ... */ }

  @Override
  public double compute() { /* ... */ }
}
```

Let's for the sake of the example say that the above class compiles.  Which method would we invoke when we encounter the following code.

```java
final Calculator c = new Calculator();
c.compute();
```

There is no way for the Java compiler to link our call to the right method as two methods match.

### How can we sort the `Point` class?

```java
package demo;

import java.awt.Point;
import java.util.Arrays;
import java.util.Comparator;

public class App {
  public static void main( final String[] args ) {
    final Point[] points = {
      new Point( 1, 2 ),
      new Point( 1, 3 ),
      new Point( 2, 1 ),
    };

    final Comparator<Point> comparator =
      Comparator.comparing( Point::getX )
        .thenComparing( Point::getY );

    Arrays.sort( points, comparator );
    System.out.printf( "Sorted: %s", Arrays.toString( points ) );
  }
}
```

[Effective Java](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/)
1. [Item 20: Prefer interfaces to abstract classes](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/ch4.xhtml#lev20)
1. [Item 21: Design interfaces for posterity](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/ch4.xhtml#lev21)
1. [Item 22: Use interfaces only to define types](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/ch4.xhtml#lev22)

### `default` and `static` methods

**🚧 Pending...**

## `instanceof` and `cast` operators

**🚧 Pending...**

## Inheritance and composition

`Hashtable` accepts objects as keys to the map, something that does not fit well with the `Properties` class.

```java
package demo;

import java.awt.Point;
import java.util.Properties;

public class App {
  public static void main( final String[] args ) {
    final Properties p = new Properties();
    p.put( "age", 21 );
    p.put( new Point( 1, 2 ), 7 );

    System.out.printf( "Properties %s%n", p );
  }
}
```


**🚧 Pending...**

[Effective Java](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/) - [Item 18: Favor composition over inheritance](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/ch3.xhtml#lev18)

## Overloading and overriding

### Overloading

**🚧 Pending...**

[Effective Java](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/) - [Item 52: Use overloading judiciously](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/ch8.xhtml#lev52)

### Overriding

## Initialisation blocks, outer, inner and anonymous classes

### Initialisation block

**🚧 Pending...**

### `static` initialisation block

**🚧 Pending...**

### Outer class

**🚧 Pending...**

### Inner instance class

**🚧 Pending...**

### Inner static class

**🚧 Pending...**

The following example was [used already](#can-abstract-classes-have-private-constructors).

Consider the following example.

```java
package demo;

public abstract class Temperature {

  private Temperature() { }

  public abstract boolean isTooCold();

  public abstract boolean isTooHot();


  public static final Temperature FAHRENHEIT = new Fahrenheit();

  public static final Temperature CELSIUS = new Celsius();

  public static final Temperature KELVIN = new Kelvin();


  private static class Fahrenheit extends Temperature { /* ... */ }

  private static class Celsius extends Temperature { /* ... */ }

  private static class Kelvin extends Temperature { /* ... */ }

}
```

According to [wikipedia](https://en.wikipedia.org/wiki/Temperature), "_*temperature* is a physical property of matter that quantitatively expresses hot and cold_".  The `Temperature` class is an abstract class that defines two methods, `isTooCold()` and `isTooHot()`.  The temperature is measured (or represented) in *Fahrenheit*, *Celsius* or other units.

The above example looks a lot like enums.  And that is correct.  It can be used in a similar way enums can be used.

```java
final Temperature t = Temperature.FAHRENHEIT;
```

This was an alternative to enums, before enums where supported by Java.  Note that the above approach cannot be used with a `switch` statement.

**⚠️ THE FOLLOWING EXAMPLE WILL NOT COMPILE!!**

```java
package demo;

import static demo.Temperature.FAHRENHEIT;

public class App {
  public static void main( final String[] args ) {
    final Temperature t = FAHRENHEIT;
    switch ( t ) {
      case FAHRENHEIT:
        System.out.println( "The temperature is in Fahrenheit!!" );
    }
  }
}
```

The above approached can be relaxed a bit and allows the creation of different instances of temperature that contain the temperature value and contain different state (something that cannot be achieved with enums).

```java
package demo;

public abstract class Temperature {

  private Temperature() { /* ... */ }

  public abstract boolean isTooCold();

  public abstract boolean isTooHot();


  public static Temperature withFahrenheit( double fahrenheit ) { /* ... */ }

  public static Temperature withCelsius( double celsius ) { /* ... */ }

  public static Temperature withKelvin( double kelvin ) { /* ... */ }


  private static class Fahrenheit extends Temperature { /* ... */ }

  private static class Celsius extends Temperature { /* ... */ }

  private static class Kelvin extends Temperature { /* ... */ }
}
```

The static factory methods can be used to create different variations of the `Temperature` class.

```java
package demo;

import static demo.Temperature.withFahrenheit;

public class App {
  public static void main( final String[] args ) {
    final Temperature t = withFahrenheit( 68.8 );
  }
}
```

The `Temperature` class cannot be extended by an external class, which prevents some funny code added to the application.

### Inner anonymous class

**🚧 Pending...**

## Annotations

**🚧 Pending...**

[Effective Java](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/) - [Item 39: Prefer annotations to naming patterns](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/ch3.xhtml#lev39)

### Project Lombok

**🚧 Pending...**

## Generics

**🚧 Pending...**

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

### Objects have two words headers

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

### Records

1. [https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/lang/Record.html](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/lang/Record.html)
1. [https://docs.oracle.com/javase/specs/jls/se14/preview/specs/records-jls.html](https://docs.oracle.com/javase/specs/jls/se14/preview/specs/records-jls.html)

### Others

1. [Properties](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/Properties.html) is a bad example of inheritance.  Recent versions of Java address this issue
1. [Stack](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/Stack.html) and [Queue](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/Queue.html) extend [Vector](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/Vector.html).
1. It is bad to call instance methods from within constructors
1. Use *this* and *that* when comparing
1. Desctructors
1. Should we talk about method linking?
