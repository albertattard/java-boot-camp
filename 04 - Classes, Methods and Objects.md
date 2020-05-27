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
    1. [🤔 Can we design our classes to automatically prevents the object from going into invalid state (finite state machine)?](#-can-we-design-our-classes-to-automatically-prevents-the-object-from-going-into-invalid-state-finite-state-machine)
    1. [Create the `HeavyBox` (complete example)](#create-the-heavybox-complete-example)
    1. [How can a subclass invoke a method in the parent class (the `super` keyword)?](#how-can-a-subclass-invoke-a-method-in-the-parent-class-the-super-keyword)
    1. [Can we prevent a class from being extended (the `final` keyword)?](#can-we-prevent-a-class-from-being-extended-the-final-keyword)
    1. [Are constructors inherited?](#are-constructors-inherited)
    1. [How do `private` constructor effect inheritance?](#how-do-private-constructor-effect-inheritance)
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
        1. [Be careful with sensitive information](#be-careful-with-sensitive-information)
        1. [Be careful with recursive `toString()` calls](#be-careful-with-recursive-tostring-calls)
    1. [The `equals()` and `hashCode()` methods](#the-equals-and-hashcode-methods)
        1. [Be careful with recursive `equals()` (and `hashCode()`) calls](#be-careful-with-recursive-equals-and-hashcode-calls)
        1. [Puzzle (Animal Farm)](#puzzle-animal-farm)
    1. [The `getClass()` method](#the-getclass-method)
    1. [🤔 The `wait()`, `notify()` and `notifyAll()` methods](#-the-wait-notify-and-notifyall-methods)
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
    1. [What's the purpose of an interface that has no abstract methods (marker interface)?](#whats-the-purpose-of-an-interface-that-has-no-abstract-methods-marker-interface)
    1. [What are `default` and `static` methods?](#what-are-default-and-static-methods)
    1. [What happens if a class implements two interfaces that have the same `default` methods?](#what-happens-if-a-class-implements-two-interfaces-that-have-the-same-default-methods)
1. [Sorting (the `Comparable` and `Comparator` interfaces)](#sorting-the-comparable-and-comparator-interfaces)
    1. [How can we apply natural ordering to a custom class (the `Comparable` interface)?](#how-can-we-apply-natural-ordering-to-a-custom-class-the-comparable-interface)
    1. [How does the `compareTo()` method works?](#how-does-the-compareto-method-works)
    1. [What will happen if one of the properties used is `null`?](#what-will-happen-if-one-of-the-properties-used-is-null)
    1. [Can we use multiple properties to determine natural ordering?](#can-we-use-multiple-properties-to-determine-natural-ordering)
    1. [How can we sort the `Point` or any other custom class (the `Comparator` interface)?](#how-can-we-sort-the-point-or-any-other-custom-class-the-comparator-interface)
    1. [Can we compare two integers by subtracting one from the other?](#can-we-compare-two-integers-by-subtracting-one-from-the-other)
1. [The `instanceof` and type cast operators](#the-instanceof-and-type-cast-operators)
    1. [Is there a better approach than relying on `instanceof` and type cast operators (polymorphism)?](#is-there-a-better-approach-than-relying-on-instanceof-and-type-cast-operators-polymorphism)
    1. [Are there good examples of the `instanceof` and type cast operators?](#are-there-good-examples-of-the-instanceof-and-type-cast-operators)
    1. [What is type upcasting and how is it different from type casting or type downcasting?](#what-is-type-upcasting-and-how-is-it-different-from-type-casting-or-type-downcasting)
        1. [Type Upcasting](#type-upcasting)
        1. [Type Downcasting](#type-downcasting)
    1. [Can we type cast `null`?](#can-we-type-cast-null)
    1. [Can we type cast primitive types?](#can-we-type-cast-primitive-types)
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
    1. [Local class](#local-class)
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

1. Assert the default state

    By default, a box is always created in a close state.

    ```java
    package demo;

    import org.junit.jupiter.api.DisplayName;
    import org.junit.jupiter.api.Test;

    import static org.junit.jupiter.api.Assertions.assertFalse;

    public class BoxTest {

      @Test
      @DisplayName( "should be closed by default" )
      public void shouldBeClosedByDefault() {
        final Box box = new Box();
        assertFalse( box.isOpen() );
      }
    }
    ```

    Add the missing methods (without any special logic) just to make the program compile.

    ```java
    package demo;

    public class Box {

      public boolean isOpen() {
        return false;
      }

      @Override
      public String toString() { /* ... */ }
    }
    ```

    Run the test.  The test should pass.


1. Add the `close()` functionality

    ```java
    package demo;

    import org.junit.jupiter.api.DisplayName;
    import org.junit.jupiter.api.Test;

    import static org.junit.jupiter.api.Assertions.assertFalse;

    public class BoxTest {

      @Test
      @DisplayName( "should be closed by default" )
      public void shouldBeClosedByDefault() { /* ... */ }

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

      public void close() {
      }

      @Override
      public String toString() { /* ... */ }
    }
    ```

    Run the test.  Both tests should pass.

1. Add the open functionality

    ```java
    package demo;

    import org.junit.jupiter.api.DisplayName;
    import org.junit.jupiter.api.Test;

    import static org.junit.jupiter.api.Assertions.assertFalse;
    import static org.junit.jupiter.api.Assertions.assertTrue;

    public class BoxTest {

      @Test
      @DisplayName( "should be closed by default" )
      public void shouldBeClosedByDefault() { /* ... */ }

      @Test
      @DisplayName( "should not be open after the close method is called" )
      public void shouldNotBeOpen() { /* ... */ }

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

      public void close() { /* ... */ }

      public boolean isOpen() { /* ... */ }

      @Override
      public String toString() {
        return "a basic box";
      }
    }
    ```

    Run the test.  The new test should fail, as the `isOpen()` method always return `false`.

    ```bash
    $ ./gradlew clean test

      > Task :test FAILED

      BoxTest > should be closed by default PASSED

      BoxTest > should be open after the open method is called FAILED
          org.opentest4j.AssertionFailedError at BoxTest.java:31

      BoxTest > should not be open after the close method is called PASSED

    ...
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
      @DisplayName( "should be closed by default" )
      public void shouldBeClosedByDefault() { /* ... */ }

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
      @DisplayName( "should be closed by default" )
      public void shouldBeClosedByDefault() { /* ... */ }

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
      @DisplayName( "should be closed by default" )
      public void shouldBeClosedByDefault() { /* ... */ }

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

**⚠️ THE FOLLOWING EXAMPLE DOES NOT COMPILE!!**

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

**⚠️ THE FOLLOWING EXAMPLE DOES NOT COMPILE!!**

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

1. We can type cast the `null` to either a `String` as shown next or a `Point`

    ```java
    public MagicBox() {
      this( (String) null );
    }
    ```

    [Type casting is covered in depth later on](#the-instanceof-and-type-cast-operators).

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

**⚠️ THE FOLLOWING EXAMPLE DOES NOT COMPILE!!**

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

Yes, but that's not recommended as you may experiences some surprises.  The [section *Can a constructor in a parent class call a method in a subclass?*](#can-a-constructor-in-a-parent-class-call-a-method-in-a-subclass) covers this question in some depths.

Be mindful when invoking methods from within the constructors.  Prefer [static factory methods](#what-are-static-factory-methods) over constructors and invoke the setup methods before returning the object.

```java
package demo;

public class PreferStaticFactoryMethods {

  public static PreferStaticFactoryMethods create() {
    final PreferStaticFactoryMethods a = new PreferStaticFactoryMethods();
    a.init();
    return a;
  }

  private PreferStaticFactoryMethods() { /* ... */ }

  private void init() { /* ... */ }
}
```

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

There are two types of boxes.  The light boxes, which are boxes that can contain only one item.  The heavy boxes can contain more than one item.  Both boxes can be open or closed and change their label using the methods created before.

### Extending the `Box` functionality (creating and evolving the `LightBox` class step by step)

1. Create the `LightBox`

    ```java
    package demo;

    public class LightBox {
    }
    ```

1. Like a box, the light box can be opened and closed and has a label too.  The light box has all features the box has and can be seen as an extended version of the box.  Note that a light box can only contain one item.  A light box is empty if it has no item, otherwise non-empty.  We should not be able to add an item to a non-empty box.

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

    The `LightBox` class [inherits from (or `extends`)](https://docs.oracle.com/javase/tutorial/java/IandI/subclasses.html) the `Box` class.  The `Box` class is referred to as the [super class](https://docs.oracle.com/javase/tutorial/java/IandI/super.html) while the `LightBox` class is known as the child class (or the subclass).

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

    We can only place an item in a light box if this is empty.  Adding this functionality before the ability to add an item to the box seems more natural since that the latter relies on the box being empty.

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

### 🤔 Can we design our classes to automatically prevents the object from going into invalid state (finite state machine)?

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

Consider the following (more complicated) version of the `LightBox` class.

```java
package demo;

import java.util.Optional;

public class LightBox {

  private Optional<Long> itemId = Optional.empty();

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
      LightBox.this.itemId = Optional.of( itemId );
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

While this look very promising, it is quite hard program in this fashion and not quite common in Java.  The above example has a flaw as we can save the state and invoked one of the methods that belong to that state more than once.  Consider the following example.

```java
package demo;

public class App {
  public static void main( final String[] args ) {
    final LightBox.EmptyOpen emptyOpen = LightBox.newBox().open();
    emptyOpen.putItem( 1L );
    emptyOpen.putItem( 2L );
  }
}
```

The above code compiles and works, and the second item will replace the first item.  That's not the expected behaviour.  The light box's current state needs to be captured and checked before executing any action.  Consider the following finite state machine.

```java
package demo.complete;

import static com.google.common.base.Preconditions.checkState;

public class FiniteStateMachine {

  private State activeState;

  public FiniteStateMachine( final State initialState ) {
    this.activeState = initialState;
  }

  public <T extends State> T changeState( State current, T next, Runnable block ) {
    checkState( current == activeState );
    block.run();
    activeState = next;
    return next;
  }

  public <T extends State> T changeState( State current, T next ) {
    return changeState( current, next, BLANK );
  }

  private static final Runnable BLANK = () -> { };

  public interface State { }
}
```

This is a generic state machine that first checks whether the action being executed belongs to the current state or not.  Using our previous example, once the item is added (through the `putItem()` method), the light box should now be in the full/open state.  Therefore, we should not be able to invoke the `putItem()` method for the second time.

We can refactor the `LightBox` class and use the finite state machine created before.

```java
package demo;

import demo.complete.FiniteStateMachine;

import java.util.Optional;

public class LightBox {

  private Optional<Long> itemId = Optional.empty();

  public static EmptyClosed newBox() { /* ... */ }

  public class EmptyClosed implements FiniteStateMachine.State {
    public EmptyOpen open() {
      return stateMachine.changeState( this, emptyOpen );
    }
  }

  public class EmptyOpen implements FiniteStateMachine.State {
    public EmptyClosed close() {
      return stateMachine.changeState( this, emptyClosed );
    }

    public FullOpen putItem( final long itemId ) {
      return stateMachine.changeState( this, fullOpen, () -> {
        LightBox.this.itemId = Optional.of( itemId );
      } );
    }
  }

  public class FullOpen implements FiniteStateMachine.State {
    public FullClosed close() {
      return stateMachine.changeState( this, fullClosed );
    }
  }

  public class FullClosed implements FiniteStateMachine.State {
    public FullOpen open() {
      return stateMachine.changeState( this, fullOpen );
    }
  }

  private final EmptyClosed emptyClosed = new EmptyClosed();
  private final EmptyOpen emptyOpen = new EmptyOpen();
  private final FullOpen fullOpen = new FullOpen();
  private final FullClosed fullClosed = new FullClosed();

  private final FiniteStateMachine stateMachine = new FiniteStateMachine( emptyClosed );

  private LightBox() { }
}
```

Using the finite state machine, only the active state can invoke method.  Trying to invoke a method through a non-active state will throw an `IllegalStateException`.

**⚠️ THE FOLLOWING EXAMPLE WILL COMPILE BUT WILL THROW AN `IllegalStateException`!!**

```java
package demo;

public class App {
  public static void main( final String[] args ) {
    final LightBox.EmptyOpen emptyOpen = LightBox.newBox().open();
    emptyOpen.putItem( 1L );
    emptyOpen.putItem( 2L );
  }
}
```

Rerunning the same code will now throw an `IllegalStateException`.

As mentioned before, while the final state machine provides some advantages, it adds a level of complexity.

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

### How do `private` constructor effect inheritance?

For a class to be extended, the subclass needs to have access to at least one of the parent's class constructors.  Consider the following class.

```java
package demo;

public class Parent {
  private Parent() {
  }
}
```

The class is not `final`, but still cannot be extended by another class as its sole constructor is `private`.

**⚠️ THE FOLLOWING EXAMPLE WILL NOT COMPILE!!**

```java
package demo;

public class Child extends Parent {
}
```

There are no constructors visible to class `Child` in the parent class `Parent`, therefore, the above will not compile.  Consider the following example.

```java
package demo;

public class Parent {

  public static class InnerChild extends Parent {
  }

  private Parent() {
  }
}
```

The inner class `InnerChild` is an inner class within class `Parent`.  Like any other member within class `Parent`, the inner class `InnerChild` can access the private constructor of class `Parent`.  This is quite a common practice where while allowing the benefits of inheritance is also controls what types of objects can be created.  Consider the following example.

```java
package demo;

public class Box {

  public static final class LightBox extends Box { /* ... */ }

  public static final class HeavyBox extends Box { /* ... */ }

  private Box() { /* ... */ }
}
```

In the above example, while supports inheritance, we are limiting what kind of boxes can be created.  It is not possible for another class to extend the Box class due to the private constructor.  We will delve into this aspect [later on](#can-abstract-classes-have-private-constructors).

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

Yes, but that's a slippery and dangerous slope.  The parent constructor executes before the child's properties are initialised and the child's constructor is executed.  This means that the child may have not been initialised yet and it may behave in an unexpected manner.

Consider the following parent class

**⚠️ NOT RECOMMENDED!!**

```java
package demo;

public class Parent {

  public Parent() {
    aMethodThatMayAccessTheChildState();
  }

  public void aMethodThatMayAccessTheChildState() {
  }
}
```

The method `aMethodThatMayAccessTheChildState()` can be overridden by any child class and access the state.  Now consider the following example of a child class.

```java
package demo;

public class Child extends Parent {

  private int a = 7;

  public void aMethodThatMayAccessTheChildState() {
    System.out.printf( "The value of property a is: %d%n", a );
  }
}
```

This is a trivial class that has a single property named `a`.  The property is also initialised to `7`.  Given that the `aMethodThatMayAccessTheChildState()` is invoked by the `Parent`'s constructor.  Consider the following example.

```java
package demo;

public class App {
  public static void main( final String[] args ) {
    new Child();
  }
}
```

Surprisingly enough, this will print `0` as shown next.

```bash
The value of property a is: 0
```

The property exists, but it has not yet been initialised.  The property is not `final` for a purpose as this will behave differently.

To help us visualise the problem, let's add some print outs at each stage.

**⚠️ NOT RECOMMENDED!!**

```java
package demo;

public class Parent {

  {
    System.out.println( "Parent::{}" );
  }

  public Parent() {
    System.out.println( "Parent::Parent()" );
    aMethodThatMayAccessTheChildState();
  }

  public void aMethodThatMayAccessTheChildState() {
    System.out.println( "Parent::aMethodThatMayAccessTheChildState()" );
  }
}
```

Will do the same to the child class.

```java
package demo;

public class Child extends Parent {

  private int a = 7;

  {
    System.out.println( "Child::{}" );
  }

  public Child() {
    System.out.println( "Child::Child()" );
  }

  public void aMethodThatMayAccessTheChildState() {
    System.out.println( "Child::aMethodThatMayAccessTheChildState()" );
    System.out.printf( "The value of property a is: %d%n", a );
  }
}
```

Running the same example will print the following.

```bash
Parent::{}
Parent::Parent()
Child::aMethodThatMayAccessTheChildState()
The value of property a is: 0
Child::{}
Child::Child()
```

Note that the overridden method `aMethodThatMayAccessTheChildState()` is invoked before the child's initialisation block (`Child::{}`) and the child's constructor (`Child::Child()`).

Be mindful when invoking methods from within constructors.  Prefer [static factory methods](#what-are-static-factory-methods) over constructors and invoke the setup methods before returning the object.

```java
package demo;

public class PreferStaticFactoryMethods {

  public static PreferStaticFactoryMethods create() {
    final PreferStaticFactoryMethods a = new PreferStaticFactoryMethods();
    a.init();
    return a;
  }

  private PreferStaticFactoryMethods() { /* ... */ }

  private void init() { /* ... */ }
}
```

### What happens when not all '*children*' are '*parents*'?

Consider the *square* and *rectangle* shapes.  All sides of a square are equals, while in a rectangle, only the opposite sides are equal.  We need one property to represent the *side* (or *width*) of a square while we need two properties to represent the *height* and the *width* of a rectangle.

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

The reasoning behind the above design is that given the rectangle has one more property than the square, we simply extend the square and add the missing property.

This is a bad example of inheritance, because despite the appearances not all rectangles are squares.  By definition:
* a *rectangle* is a quadrilateral with all four angles right angles
* a *square* is a quadrilateral with all four angles right angles **and all four sides of the same length**.

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

This is a typical problem with inheritance where the wrong hierarchy is built.  Such hierarchies maybe hard to change at a later stage as other things may be depending on it.

There are many other examples.  Cats and dogs are pets but not all pets are cats.  If someone asks for cat, we cannot give them a dog.  Therefore, when designing such hierarchy, we need to be careful to capture the "*all children are parent*", otherwise we may end up with some flawed design.

The Java API has some unfortunate examples of bad inheritance too.  The [`Properties` class](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/Properties.html) is a "good" example of bad inheritance.  The `Properties` class inherits from the [`Hashtable` class](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/Hashtable.html).  The [`Stack` class](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/Stack.html) is another bad example of inheritance within the Java API,  The `Stack` class extends the [`Vector` class](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/Vector.html) and inherits all methods the `Vector` defined.  Some of these methods do not make sense from a stack data structure perspective.

[One of the topics discussed later on](#inheritance-and-composition) touches about these problems and propose an alternative approach to inheritance (composition).  This topic is also covered in great depths in [Item 18: Favor composition over inheritance](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/ch4.xhtml#lev18) in the [Effective Java](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/).

### Is inheritance evil and should be considered as an anti-pattern?

The internet is littered with articles reading "*inheritance is evil*" and most of them show very bad examples of inheritance.  Another common topic that is brought up when discussing inheritance is "*inheritance breaks encapsulation*".

**Is inheritance evil?**

No, inheritance is not evil and nor an anti-pattern.  Inheritance is an important part of OOP and has its place.  With that said, and like many other things, inheritance can be misused and these articles feast on that.  In fact, inheritance can be easily misused especially when the "*all children are parent*" rule is not followed.  Furthermore, inheritance binds classes together, making the class hierarchy brittle.  Adding functionality to a parent class, for example, will affect all children and that can be dangerous.

Let see an extreme example.  Say we have a `Shape` class, that defines two abstract methods, `calculateArea()` and `calculatePerimeter()`.  All shapes have an area and perimeter and that's great.  Then we create `Circle`, `Rectangle` and other shapes and make them all inherit from the `Shape` class.  Now say we add a new method, called `calculateCircumference()`, to the `Shape` class.  That would force the rectangular shapes to also have a circumference, which is not the case.

Take for example, serialisation, another Java API which did not withstand the test of time.  If the parent class, in a class hierarchy, is made [`Serializable`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/io/Serializable.html), then all subclasses will become serializable.  This is not something to take lightly as it may have serious consequences.  Even [Effective Java](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/) talks about the issues of serialisation and suggested other approaches in [Item 85: Prefer alternatives to Java serialization](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/ch12.xhtml#lev85).

## Abstraction

A box can be empty or non-empty.  In fact, both the `LightBox` and the `HeavyBox` classes have the `isEmpty()` method which does the same thing for both types of boxes.  Given that **all** boxes can be empty (or non-empty), we can move the `isEmpty()` method to the `Box` class.

The `Box` class does not have enough information to determine whether it is empty or not.  The sub-classes use different mechanism to determine whether they are empty or not.

1. The `LightBox` make use of the `space` (`Space` enum) property
1. The `HeavyBox` delegates this to the `items` ([`List`'s `isEmpty()` method](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/List.html#isEmpty())) property

This means that while all boxes can be empty (or non-empty), the `Box` class cannot answer the question, `isEmpty()`.  The `Box` class needs to have a method for which it does not have an implementation.  Methods that do not have an implementation, or a body, are referred to as *abstract methods*, as shown next.

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

The `Person` class does not use the `extends` keyword.  By default, any class that dose not use the `extends` keyword, it automatically extends the `Object` class.  The following example is equivalent to the above example.

```java
package demo;

public class Person extends Object {
}
```

The `Person` class has no methods defined, yet the IDE still shows a list of methods we can use.

![Methods Inherited from the Object Class](assets/images/Methods%20Inherited%20from%20the%20Object%20Class.png)

consider the following example.

```java
package demo;

public class Person {

  private final String name;
  private final String surname;

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

The following sections will work with the above `Person` class.

### The `toString()` method

All objects in Java have a [method called `toString()`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/lang/Object.html#toString()) which is used to convert an object into a *programmer friendly string*.

```java
package demo;

public class App {
  public static void main( final String[] args ) {
    final Person a = new Person();
    System.out.printf( "The person object: %s%n", a );
  }
}
```

The above prints the following, *meaningless*, message.

```bash
The person object: demo.Person@58372a00
```

The `toString()` method is used to convert our person object into a *programmer friendly string*.

It is always recommended to override the `toString()` method and return something more useful.  [Item 12, Always override toString](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/ch3.xhtml#lev12) in the [Effective Java](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/) book talks about the importance of overriding this method too.

```java
package demo;

public class Person {

  private final String name;
  private final String surname;

  public Person() { /* ... */ }

  public Person( final String name ) { /* ... */ }

  public Person( final String name, final String surname ) { /* ... */ }

  @Override
  public String toString() {
    return String.format( "Person{name=%s, surname=%s}", name, surname );
  }
}
```

Consider the following example.

```java
package demo;

public class App {
  public static void main( final String[] args ) {
    final Person a = new Person();
    final Person b = new Person( "Aden" );
    final Person c = new Person( null, "Attard" );
    final Person d = new Person( "Aden", "Attard" );

    System.out.printf( "a = %s%n", a );
    System.out.printf( "b = %s%n", b );
    System.out.printf( "c = %s%n", c );
    System.out.printf( "d = %s%n", d );
  }
}
```

The above program will print the following.

```bash
a = Person{name=null, surname=null}
b = Person{name=Aden, surname=null}
c = Person{name=null, surname=Attard}
d = Person{name=Aden, surname=Attard}
```

The above is more useful when compared to the original message as we can see the object's state.

Following are some important rules about the `toString()` method
1. **The `toString()` method should never return a `null`**.
1. **Do not rely on the output of the `toString()` method as a source of structured input**.<br/>
    Do not parse an object based on the `toString()` method's output as this may change without warning.
1. **Do not leak sensitive information through the `toString()` method**.

There are cases where we may need to have a more meaningful output, such as constructing the *full name* from the *name* and *surname*, as shown in the following example.

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

The result of the `toString()` method depends on the state and running the previous example would now yield the following.

```bash
The person object: Unknown Person!!
The person object: Aden
The person object: Attard
The person object: Aden Attard
```

The above result is more appealing.  While this is all good, the purpose of the `toString()` method is to enable the programmer to display the object's state, **in no specific format**, and such output can be used in log files, for example.  When an object needs to be presented in a specific manner, I prefer to have a dedicated method, such as `getFullName()`, instead of reusing the `toString()` method.  In this case, each method will serve only one purpose.

```java
package demo;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.converter.ConvertWith;
import org.junit.jupiter.params.provider.CsvSource;

import static org.junit.jupiter.api.Assertions.assertEquals;

@DisplayName( "Person" )
public class PersonTest {

  @CsvSource( {
    "null,null,Unknown Person!!",
    "null,Attard,Attard",
    "Aden,null,Aden",
    "Aden,Attard,Aden Attard"
  } )
  @DisplayName( "should return the full name" )
  @ParameterizedTest( name = "should return {2}, when the name is {0} and surname is {1}" )
  public void shouldReturnFullName(
    final @ConvertWith( NullableConverter.class ) String name,
    final @ConvertWith( NullableConverter.class ) String surname,
    final String expectedFullName ) {

    final Person subject = new Person( name, surname );
    assertEquals( expectedFullName, subject.getFullName() );
  }
}
```

We can move the contents of the `toString()` method to the new `getFullName()` method.

```java
package demo;

import static com.google.common.base.Strings.isNullOrEmpty;

public class Person {

  public final String name;
  public final String surname;

  public Person() { /* ... */ }

  public Person( final String name ) { /* ... */ }

  public Person( final String name, final String surname ) { /* ... */ }

  public String getFullName() {
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

  @Override
  public String toString() { /* ... */ }
}
```

#### Be careful with sensitive information

Unfortunately, sensitive information tends to get leaked through the `toString()` method.  Consider the following example of a credit card.

**⚠️ THE FOLLOWING EXAMPLE LEAKS SENSITIVE INFORMATION.  DO NOT USE IT AS IS!!**

```java
package demo;

public class CreditCard {

  private final long number;
  private final int cvv;

  public CreditCard( final long number, final int cvv ) {
    this.number = number;
    this.cvv = cvv;
  }

  @Override
  public String toString() {
    return String.format( "CreditCard{number=%d, cvv=%d}", number, cvv );
  }
}
```

The object's sensitive state is leaked through the `toString()` method as shown next.

```java
package demo;

public class App {
  public static void main( final String[] args ) {
    final CreditCard a = new CreditCard( 1234_5678_9012_3456L, 123 );
    System.out.printf( "Paying with: %s%n", a );
  }
}
```

The above example will print the following

```bash
Paying with: CreditCard{number=1234567890123456, cvv=123}
```

Both the credit card number and the card verification value (cvv) are sensitive information and should not be part of the `toString()` method.  Given the nature of this problem, as test is in order to make sure that no sensitive information is leaked through the `toString()` method.

Let say that only the last 4 digits of the credit card number should be part of the `toString()`'s method output and the cvv should be completely masked.

```java
package demo;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertFalse;

@DisplayName( "Credit card" )
public class CreditCardTest {

  @Test
  @DisplayName( "should only contain the last four digits of the credit card number and the cvv should be completely masked" )
  public void shouldNotLeakSensitiveInformation() {
    final CreditCard subject = new CreditCard( 1234_5678_9123_0000L, 123 );
    assertFalse( subject.toString().matches( ".*[1-9]+.*" ) );
  }
}
```

Given that only the last four digits of the credit card number are returned by the `toString()` method and these have the value of `0000` on purpose, the `toString()` method should not contain any numbers between 1 and 9 both inclusive.  This makes sure that the first 12 digit of the credit card and the cvv are not part of the `toString()` method output.

The following example shows a better version of the `toString()` method.

```java
package demo;

public class CreditCard {

  private final long number;
  private final int cvv;

  public CreditCard( final long number, final int cvv ) { /* ... */ }

  @Override
  public String toString() {
    final long lastFourDigits = number % 10_000;
    return String.format( "CreditCard{number=XXXX-XXXX-XXXX-%04d, cvv=XXX}", lastFourDigits );
  }
}
```

Running the previous example will now print.

```bash
Paying with: CreditCard{number=XXXX-XXXX-XXXX-3456, cvv=XXX}
```

#### Be careful with recursive `toString()` calls

Consider the following example.

**⚠️ THE FOLLOWING PROGRAM COMPILES BUT THROWS A StackOverflowError!!**

```java
package demo;

public class Person {

  private final String name;
  private final String surname;

  private Person friend;

  public Person() { /* ... */ }

  public Person( final String name ) { /* ... */ }

  public Person( final String name, final String surname ) { /* ... */ }

  public void setFriend( final Person friend ) {
    this.friend = friend;
  }

  @Override
  public String toString() {
    return String.format( "Person{name=%s, surname=%s, friend=%s}", name, surname, friend );
  }
}
```

Two persons can be friends.  Consider the following example.

```java
package demo;

public class App {
  public static void main( final String[] args ) {
    final Person albert = new Person( "Albert", "Attard" );
    final Person john = new Person( "John", "Ferry" );

    /* Albert and John are friends */
    albert.setFriend( john );
    john.setFriend( albert );

    System.out.printf( "%s%n", albert );
  }
}
```

When printing variable `albert`, we print `albert`'s `name` and `surname` properties and his `friend` (`john`) using `albert`'s ` toString()` method.  Then, Java invokes `john`'s `toString()` method to convert `john` to a `String`.  Now, given that `albert` is `john`'s friend, `albert`'s `toString()` method is called again from within `john`'s `toString()` method and the cycles starts all over again.  This is a recursive call and will theoretically run forever as shown in the following image.

![Recursive toString() method](assets/images/Recursive%20toString%20method.png)

The above recursive call will keep going until we run out of memory and a `StackOverflowError` is thrown and the program crash.

```bash
albert->toString()->john->toString()->albert->toString()->john->toString()->...until we consume all memory.
```

The above program will fail with an `StackOverflowError`.

```bash
Exception in thread "main" java.lang.StackOverflowError
	at java.base/java.lang.StringUTF16.checkIndex(StringUTF16.java:1587)
	at java.base/java.lang.StringUTF16.charAt(StringUTF16.java:1384)
	at java.base/java.lang.StringUTF16$CharsSpliterator.tryAdvance(StringUTF16.java:1194)
	at java.base/java.util.stream.IntPipeline.forEachWithCancel(IntPipeline.java:163)
	at java.base/java.util.stream.AbstractPipeline.copyIntoWithCancel(AbstractPipeline.java:502)
	at java.base/java.util.stream.AbstractPipeline.copyInto(AbstractPipeline.java:488)
	at java.base/java.util.stream.AbstractPipeline.wrapAndCopyInto(AbstractPipeline.java:474)
	at java.base/java.util.stream.FindOps$FindOp.evaluateSequential(FindOps.java:150)
	at java.base/java.util.stream.AbstractPipeline.evaluate(AbstractPipeline.java:234)
	at java.base/java.util.stream.IntPipeline.findFirst(IntPipeline.java:528)
	at java.base/java.text.DecimalFormatSymbols.findNonFormatChar(DecimalFormatSymbols.java:778)
	at java.base/java.text.DecimalFormatSymbols.initialize(DecimalFormatSymbols.java:758)
	at java.base/java.text.DecimalFormatSymbols.<init>(DecimalFormatSymbols.java:115)
	at java.base/sun.util.locale.provider.DecimalFormatSymbolsProviderImpl.getInstance(DecimalFormatSymbolsProviderImpl.java:85)
	at java.base/java.text.DecimalFormatSymbols.getInstance(DecimalFormatSymbols.java:182)
	at java.base/java.util.Formatter.getZero(Formatter.java:2437)
	at java.base/java.util.Formatter.<init>(Formatter.java:1956)
	at java.base/java.util.Formatter.<init>(Formatter.java:1978)
	at java.base/java.lang.String.format(String.java:3302)
	at demo.Person.toString(Person.java:29)
	at java.base/java.util.Formatter$FormatSpecifier.printString(Formatter.java:3031)
	at java.base/java.util.Formatter$FormatSpecifier.print(Formatter.java:2908)
	at java.base/java.util.Formatter.format(Formatter.java:2673)
	at java.base/java.util.Formatter.format(Formatter.java:2609)
	at java.base/java.lang.String.format(String.java:3302)
	at demo.Person.toString(Person.java:29)
    ...
	at java.base/java.util.Formatter$FormatSpecifier.printString(Formatter.java:3031)
	at java.base/java.util.Formatter$FormatSpecifier.print(Formatter.java:2908)
	at java.base/java.util.Formatter.format(Formatter.java:2673)
	at java.base/java.util.Formatter.format(Formatter.java:2609)
	at java.base/java.lang.String.format(String.java:3302)
	at demo.Person.toString(Person.java:29)
	at java.base/java.util.Formatter$FormatSpecifier.printString(Formatter.java:3031)
	at java.base/java.util.Formatter$FormatSpecifier.print(Formatter.java:2908)
```

Following is a better example that avoids recursive `toString()` method.

```java
package demo;

public class Person {

  private final String name;
  private final String surname;

  private Person friend;

  public Person() { /* ... */ }

  public Person( final String name ) { /* ... */ }

  public Person( final String name, final String surname ) { /* ... */ }

  public void setFriend( final Person friend ) { /* ... */ }

  @Override
  public String toString() {
    final String friendToString =
      friend == null ? "no friend"
        : String.format( "{name=%s, surname=%s}", friend.name, friend.surname );
    return String.format( "Person{name=%s, surname=%s, friend=%s}", name, surname, friendToString );
  }
}
```

Running the previous example will not print.

```bash
Person{name=Albert, surname=Attard, friend={name=John, surname=Ferry}}
```

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

  private final String name;
  private final String surname;

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

    final Person that = (Person) object;
    return Objects.equals( name, that.name ) &&
      Objects.equals( surname, that.surname );
  }

  @Override
  public String toString() { /* ... */ }
}
```

In the above example we made use of the [`Objects`' utilities `equals()` method](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/Objects.html#equals(java.lang.Object,java.lang.Object)).  This method is not to be mistaken with the normal `equals()` method.  The utilities `equals()` method is very useful when comparing two instance variables and is a shorthand for the following.

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

The `equals()` method is used a lot by the Java API in conjunction with the [`hashCode()` method](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/lang/Object.html#hashCode()).  The relation between these two methods is so strong that the [Effective Java](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/) book has an item about this, [Item 11: Always override hashCode when you override equals](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/ch3.xhtml#lev11).

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

The above example creates two collections, a [`List`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/List.html) and a [`HashSet`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/HashSet.html) to highlight a problem.  [Collections are covered in depth at a later stage](05%20-%20Collections.md).  Running the above **may** produce the following output.

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

Hash-based classes, such as the `HashSet` class or [the `HashMap` class](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/HashMap.html), rely on the `hashCode()` together with the `equals()` method to function properly.  The current implementation of the `Person` class may work or may not work, depends on how lucky we get with the value returned by the `Object`'s version of the `hashCode()` method.

Following is a better version of the `Person` class.

```java
package demo;

import java.util.Objects;

import static com.google.common.base.Strings.isNullOrEmpty;

public class Person {

  private final String name;
  private final String surname;

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

The `equals()` and `hashCode()` methods are very important methods as these are extensively used by other classes.  [Effective Java](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/) talks in detail about this in [Item 10: Obey the general contract when overriding equals](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/ch3.xhtml#lev10).  Following are some important rules related to the `equals()` method.

1. **Reflexive**: An object is always equal to itself.<br/>
    `a.equals(a)` always return `true`.
1. **Symmetry**: If an object, `a`, is equal to another object, `b`, then the second object `b` must also be equal to the first object `a`.<br/>
    | When          | Returns | Then          | Must    |
    |---------------|---------|---------------|---------|
    | `a.equals(b)` | `true`  | `b.equals(a)` | `true`  |
    | `a.equals(b)` | `false` | `b.equals(a)` | `false` |
1. **Transitive**: If an object, `a`, is equal to another object, `b`, and the second object `b` is equals to yet another object, `c`, then the first object `a` must also be equal to the third object `c`.<br/>
    | When          | Returns | And           |Returns  | Then          | Must    |
    |---------------|---------|---------------|---------|---------------|---------|
    | `a.equals(b)` | `true`  | `b.equals(c)` | `true`  | `a.equals(c)` | `true`  |
    | `a.equals(b)` | `true`  | `b.equals(c)` | `false` | `a.equals(c)` | `false` |
    | `a.equals(b)` | `false` | `b.equals(c)` | `true`  | `a.equals(c)` | `false` |
1. **Consistent**: If two objects are equal at one point in time, and nothing has changed in the meantime, these objects should remain equal.<br/>
    As mentioned in [Effective Java](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/), the [`URL` class](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/net/URL.html) "_relies on comparison of the IP addresses of the hosts associated with the URLs. Translating a host name to an IP address can require network access, and it isn't guaranteed to yield the same results over time. This can cause the URL equals method to violate the equals contract and has caused problems in practice. The behavior of URL’s equals method was a big mistake and should not be emulated. Unfortunately, it cannot be changed due to compatibility requirements. To avoid this sort of problem, equals methods should perform only deterministic computations on memory-resident objects._"<br/>
    ([reference](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/ch3.xhtml#lev10))
1. **No external influence**: An object should not rely on external factors to determine whether two objects are equal or not, for the reasons described above.
1. **No object is equal to `null`**: An object `a` is never equal to `null`.<br/>
    `a.equals(null)` always return `false`.

The above rules do not mention the relation between the outcome of the `equals()` method and the outcome of the `hashCode()` method.  Following is a set of rules that govern this relation.

1. **Consistent**: The hash code value of an object should remain the same throughout the execution of the program, as long as the object does not change.<br/>
    The hash code value of an object can change between different executions of the program.
1. **If equal, same hash code**: If two objects, `a` and `b`, are equal, then these two objects must have the same hash code value.<br/>
    | When          | Returns | Then                           | Must   |
    |---------------|---------|--------------------------------|--------|
    | `a.equals(b)` | `true`  | `a.hashCode() == b.hashCode()` | `true` |
1. **If same hash code, not necessarily equal**.  Hash code does not replace equality as two objects may have the same hash code and not be equal.<br/>
    | When                           | Returns | Then          | May be  |
    |--------------------------------|---------|---------------|---------|
    | `a.hashCode() == b.hashCode()` | `true`  | `a.equals(b)` | `true`  |
    | `a.hashCode() == b.hashCode()` | `true`  | `a.equals(b)` | `false` |

    Note that if two objects have a different hash code value, then these objects must not be equal.<br/>
    | When                           | Returns | Then          | Must    |
    |--------------------------------|---------|---------------|---------|
    | `a.hashCode() == b.hashCode()` | `false` | `a.equals(b)` | `false` |

#### Be careful with recursive `equals()` (and `hashCode()`) calls

This is very similar to [Be careful with recursive `toString()` calls](#be-careful-with-recursive-tostring-calls) section.

Consider the following example.

**⚠️ THE FOLLOWING PROGRAM COMPILES BUT THROWS A StackOverflowError!!**

```java
package demo;

import java.util.Objects;

public class Person {

  private final String name;
  private final String surname;

  private Person friend;

  public Person() { /* ... */ }

  public Person( final String name ) { /* ... */ }

  public Person( final String name, final String surname ) { /* ... */ }

  public void setFriend( final Person friend ) { /* ... */ }

  @Override
  public boolean equals( final Object object ) {
    if ( this == object ) {
      return true;
    }

    if ( !( object instanceof Person ) ) {
      return false;
    }

    final Person that = (Person) object;
    return Objects.equals( name, that.name ) &&
      Objects.equals( surname, that.surname ) &&
      Objects.equals( friend, that.friend );
  }

  @Override
  public int hashCode() {
    return Objects.hash( name, surname, friend );
  }

  @Override
  public String toString() { /* ... */ }
}
```

Invoking the `hashCode()` function will cause a recursive chain that will only stop by the program crashing with a `StackOverflowError`.

```java
package demo;

public class App {
  public static void main( final String[] args ) {
    final Person albert = new Person( "Albert", "Attard" );
    final Person john = new Person( "John", "Ferry" );

    /* Albert and John are friends */
    albert.setFriend( john );
    john.setFriend( albert );

    System.out.printf( "albert's hash code: %d%n", albert.hashCode() );
  }
}
```

The following image shows how this deadly friendship cases an infinite recursive call.

![Recursive hashCode() method](assets/images/Recursive%20hashCode%20method.png)

```bash
Exception in thread "main" java.lang.StackOverflowError
	at java.base/java.util.Arrays.hashCode(Arrays.java:4498)
	at java.base/java.util.Objects.hash(Objects.java:147)
	at demo.Person.hashCode(Person.java:48)
	at java.base/java.util.Arrays.hashCode(Arrays.java:4498)
	at java.base/java.util.Objects.hash(Objects.java:147)
    ...
	at demo.Person.hashCode(Person.java:48)
	at java.base/java.util.Arrays.hashCode(Arrays.java:4498)
```

Same applies to the `equals()` method.  The example that triggers this problem is a bit more elaborate as we need to create a matching pair of objects which will cause the `equals()` to enter into a deadly recursive dance.

```java
package demo;

public class App {
  public static void main( final String[] args ) {
    final Person albert = new Person( "Albert", "Attard" );
    final Person john = new Person( "John", "Ferry" );

    /* Albert and John are friends */
    albert.setFriend( john );
    john.setFriend( albert );

    /* Another version of Albert and John */
    final Person anotherAlbert = new Person( "Albert", "Attard" );
    final Person anotherJohn = new Person( "John", "Ferry" );
    anotherAlbert.setFriend( anotherJohn );
    anotherJohn.setFriend( anotherAlbert );

    System.out.printf( "Are equal? %s%n", albert.equals( anotherAlbert ) );
  }
}
```

As expected, the `equals()` methods will enter a recursive call that will only end by the program crashing with a `StackOverflowError`.

```bash
Exception in thread "main" java.lang.StackOverflowError
	at java.base/java.util.regex.Pattern$BmpCharPredicate.lambda$union$2(Pattern.java:5646)
	at java.base/java.util.regex.Pattern$BmpCharPredicate.lambda$union$2(Pattern.java:5646)
	at java.base/java.util.regex.Pattern$BmpCharProperty.match(Pattern.java:3973)
	at java.base/java.util.regex.Pattern$GroupHead.match(Pattern.java:4809)
	at java.base/java.util.regex.Pattern$Branch.match(Pattern.java:4752)
	at java.base/java.util.regex.Pattern$Branch.match(Pattern.java:4752)
	at java.base/java.util.regex.Pattern$Branch.match(Pattern.java:4752)
	at java.base/java.util.regex.Pattern$BranchConn.match(Pattern.java:4718)
	at java.base/java.util.regex.Pattern$GroupTail.match(Pattern.java:4840)
	at java.base/java.util.regex.Pattern$BmpCharPropertyGreedy.match(Pattern.java:4349)
	at java.base/java.util.regex.Pattern$GroupHead.match(Pattern.java:4809)
	at java.base/java.util.regex.Pattern$Branch.match(Pattern.java:4754)
	at java.base/java.util.regex.Pattern$Branch.match(Pattern.java:4752)
	at java.base/java.util.regex.Pattern$BmpCharProperty.match(Pattern.java:3974)
	at java.base/java.util.regex.Pattern$Start.match(Pattern.java:3627)
	at java.base/java.util.regex.Matcher.search(Matcher.java:1729)
	at java.base/java.util.regex.Matcher.find(Matcher.java:773)
	at java.base/java.util.Formatter.parse(Formatter.java:2702)
	at java.base/java.util.Formatter.format(Formatter.java:2655)
	at java.base/java.util.Formatter.format(Formatter.java:2609)
	at java.base/java.lang.String.format(String.java:3302)
	at demo.Person.toString(Person.java:55)
	at java.base/java.util.Formatter$FormatSpecifier.printString(Formatter.java:3031)
	at java.base/java.util.Formatter$FormatSpecifier.print(Formatter.java:2908)
	at java.base/java.util.Formatter.format(Formatter.java:2673)
	at java.base/java.io.PrintStream.format(PrintStream.java:1209)
	at java.base/java.io.PrintStream.printf(PrintStream.java:1105)
	at demo.Person.equals(Person.java:31)
	at java.base/java.util.Objects.equals(Objects.java:78)
    ...
	at java.base/java.util.Objects.equals(Objects.java:78)
	at demo.Person.equals(Person.java:43)
	at java.base/java.util.Objects.equals(Objects.java:78)
	at demo.Person.equals(Person.java:43)
```

**How can we avoid this problem?**

There are several approaches to address this problem.

1. Do not have the `friend` property (or any other property that leads to recursive calls) as part of the equality/hash computation

    ```java
    package demo;

    import java.util.Objects;

    public class Person {

      private final String name;
      private final String surname;

      private Person friend;

      public Person() { /* ... */ }

      public Person( final String name ) { /* ... */ }

      public Person( final String name, final String surname ) { /* ... */ }

      public void setFriend( final Person friend ) { /* ... */ }

      @Override
      public boolean equals( final Object object ) {
        if ( this == object ) {
          return true;
        }

        if ( !( object instanceof Person ) ) {
          return false;
        }

        final Person that = (Person) object;
        return Objects.equals( name, that.name ) &&
          Objects.equals( surname, that.surname );
      }

      @Override
      public int hashCode() {
        return Objects.hash( name, surname );
      }

      @Override
      public String toString() { /* ... */ }
    }
    ```

1. Refactor the classes such that it avoids recursive calls

    Create a class that represents friendship.

    ```java
    package demo;

    import java.util.Objects;

    public class Friendship {

      private final Person a;
      private final Person b;

      public Friends( final Person a, final Person b ) {
        this.a = a;
        this.b = b;
      }

      @Override
      public boolean equals( final Object object ) {
        if ( this == object ) {
          return true;
        }

        if ( !( object instanceof Friends ) ) {
          return false;
        }

        final Friends that = (Friends) object;
        return Objects.equals( a, that.a ) &&
          Objects.equals( b, that.b );
      }

      @Override
      public int hashCode() {
        return Objects.hash( a, b );
      }

      @Override
      public String toString() {
        return String.format( "Friendship{a=%s, b=%s}", a, b );
      }
    }
    ```

    Remove the `friend` property from the `Person` class.

    ```java
    package demo;

    import java.util.Objects;

    public class Person {

      private final String name;
      private final String surname;

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

        final Person that = (Person) object;
        return Objects.equals( name, that.name ) &&
          Objects.equals( surname, that.surname );
      }

      @Override
      public int hashCode() {
        return Objects.hash( name, surname );
      }

      @Override
      public String toString() {
        return String.format( "Person{name=%s, surname=%s}", name, surname );
      }
    }
    ```

There may be other valid approaches that avoid recursive calls.

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

  private static void printType( final Object object ) {
    System.out.printf( "The object is of type %s%n", object.getClass() );
  }
}
```

The above will print

```bash
The object is of type class java.awt.Point
The object is of type class java.util.Random
```

The class, of any object, can be also obtained from the actual class name (or primitive type) using the class literal ([as defined by JLS-15.8.2](https://docs.oracle.com/javase/specs/jls/se14/html/jls-15.html#jls-15.8.2)).  For example, we can obtain the class of the `Point` class using the class literal `Point.class`.  The class itself is represented as a Java object in Java.

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

  private static void isOfPointType( final Object object ) {
    final boolean isSameClass = Point.class == object.getClass();
    System.out.printf( "Is the object (%s) of type Point? %s%n", object.getClass(), isSameClass );
  }
}
```

The above will print

```bash
Is the object (class java.awt.Point) of type Point? true
Is the object (class java.util.Random) of type Point? false
```

The `getClass()` method is sometimes used in the `equals()` method when the class does not have subtypes (and to make the comparison more efficient).

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
    if ( object != null && object.getClass() == getClass() ) {
      return false;
    }

    final Person that = (Person) object;
    return Objects.equals( name, that.name ) &&
      Objects.equals( surname, that.surname );
  }

  @Override
  public int hashCode() { /* ... */ }

  @Override
  public String toString() { /* ... */ }
}
```

Note that the above version of the `equals()` method is slightly different from the previous version.  Instead of using the `instanceof` operator we are comparing the classes.

### 🤔 The `wait()`, `notify()` and `notifyAll()` methods

**🤔 This section touches a quite advanced topic and it is understandable if you do not comprehend any of the methods mentioned here**.  It is perfectly safe to skip this section and move to the next.

Java supported multithreading since its early days ([more than 25 years ago](https://en.wikipedia.org/wiki/Java_(software_platform))).  When working with threads, we may need to wait for something to happen before continuing.  Say we have a doctor's appointment.  We go to the clinic, register at the desk and then wait for our name to be called.  This can be achieved using any of [the `wait()` methods](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/lang/Object.html#wait()).

The following example simulates a patient visiting the doctor and waiting for their name to be called.  The following example make use of multithreading, [an advance topic which is still be covered](11%20-%20Concurrency.md).

```java
package demo;

import java.time.LocalTime;

public class App {
  public static void main( final String[] args ) {
    final Person patient = new Person( "Aden" );

    waitInLobby( patient );
    letSomeTimePass();
    callNext( patient );
  }

  private static void waitInLobby( final Person patient ) {
    final Thread t = new Thread( () -> {
      synchronized ( patient ) {
        try {
          display( "Waiting in the lobby for my name to be called" );
          patient.wait();
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

  private static void callNext( final Person patient ) {
    synchronized ( patient ) {
      displayf( "%s, the doctor is ready to see you", patient );
      patient.notifyAll();
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
      final Person patient = new Person( "Aden" );

      waitInLobby( patient );
      letSomeTimePass();
      callNext( patient );
    }
    ```

1. The `waitInLobby()` method is harder to understand.

    ```java
    private static void waitInLobby( final Person patient ) {
      final Thread t = new Thread( () -> {
        synchronized ( patient ) {
          try {
            display( "Waiting in the lobby to be called" );
            patient.wait();
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
    private static void callNext( final Person patient ) {
      synchronized ( patient ) {
        displayf( "%s, the doctor is ready to see you", patient );
        a.notifyAll();
      }
    }
    ```

    The `notifyAll()` method notifies all threads that the object (the object to which variable `patient` points to) is ready to wake up and resume operation.  This will cause the `wait()` method to stop waiting and unblocks the other thread (created in the `waitInLobby()` method).  The `notify()` method behaves similarly to the `notifyAll()` with the difference that only one thread is notified and not all threads.  If the notified thread is not the right thread (not the thread that was blocked waiting), then the notification is lost, and the blocked thread will hang waiting forever.  It is always recommended to use the `notifyAll()` method instead of the `notify()` method.

The example prints the following.

```bash
12:34:56.000022 [waiting in lobby] Waiting in the lobby for my name to be called
12:34:56.000000 [main] letting some time pass…
12:34:56.482630 [main] Aden, the doctor is ready to see you
12:34:56.483048 [waiting in lobby] My name was called!!
```

A small observation regarding the messages order.  Note that the second message happened before the first message by some nano seconds, yet it appears after the first message.  Note that the text within the square brackets, `waiting in lobby` and `main`, represents the thread's name from where the message is printed.  The example made use of two threads, the main thread and a second thread, named `waiting in lobby`.

The approach to multithreading in Java has been revised and a new concurrency API was added to the language.  The new concurrency API provider better concurrency primitives and is always recommended over intrinsic locking, shown above.  Concurrency is covered in detail, [in later sections](12%20-%20Concurrency.md).

## Interfaces

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

The above example is a bit useless as the interface does not define any methods and we have no implementations of this interface yet.

### How is an interface different from a class?

In a class we can have methods, static fields, properties, enums and inner classes (and interfaces).  In an interface we can have almost anything like we have in a class with the exception of properties and inner instance classes.  **An interface cannot have properties and cannot have inner instance classes**.  Following is an example of an interface.

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

Up till Java 7, interfaces could not have any functionality.  Java 8 introduced [default and static methods](https://docs.oracle.com/javase/tutorial/java/IandI/defaultmethods.html) to interfaces, [discussed in more depth in later sections](#what-are-default-and-static-methods).

### How can we use interfaces?

Consider the following interface.

```java
package demo;

public interface CanShoot {

  void shoot();
}
```

The above interface has one method, `shoot()`.  Methods in an interface are `public` and  `abstract` by default.  The following example is an identical copy of the previous example.

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

      @Override
      public void shoot() {
        System.out.println( "Smile...Ka-chick" );
      }
    }
    ```

All three classes shown implement the `CanShoot` interface and the three provide a different implementation to the `shoot()` method.  A cannot fires a shell, the photographer takes photos while the footballer shoots to score.  We can use any of these types wherever the `CanShoot` is required.

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

In our example, the `CanShoot` interface simply defines a method that returns nothing.  In other cases, the methods of the interface define methods that should behave or return in specific way so that they can be with the rest of the application.

The ability to determine what method will be executed is referred to as a [polymorphism](https://en.wikipedia.org/wiki/Polymorphism_(computer_science)).

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

Say that the above will compile.  What should happen when the `shoot()` method is invoked?  The above cannot compile as we have no implementation for the `shoot()` method.  Java supports [inner anonymous classes](#inner-anonymous-class), such as the following example, [introduced in Java 1.1](https://www.cs.cornell.edu/andru/javaspec/1.1Update.html) that allow us to implement interfaces on the fly.

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

Inner anonymous classes, are not exclusive to interfaces and we can create an inner anonymous class for classes too.  The above example will print.

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

Different from a normal Java class files, produced by the Java compiler during the compilation time, lambda classes are created by the Java runtime environment at runtime.  The lambda classes are sometimes referred to as *lambda runtime classes*.  When the lambda is encounter for the first time, the Java runtime will compile and create the *lambda runtime class*.  Note that the lambda is only compiled once, when it is first encountered and not every time it is executed.

### Can an interface extend another class or another interface?

Interfaces cannot have state, therefore that rules out interfaces extending classes.  An interface can extend one or many interfaces.

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

We can create a fourth interface, called `JackOfAllTrades` that extends all three interfaces.

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

The following table compares the different extends/implements options available between different types.

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

public abstract class Bicycle implements CanPedal, CanChangeGears {
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

A class can implement two or more interfaces that have the same method signature, only if the methods have the same return type.

Consider the following two interfaces.

1. The `DoubleAlgorithm` interface has a `compute()` method that returns a `double`.

    ```java
    package demo;

    public interface DoubleAlgorithm {

      double compute();
    }
    ```

1. The `ComplexAlgorithm` interface has a `compute()` method that returns a `double`.

    ```java
    package demo;

    public interface ComplexAlgorithm {

      double compute();
    }
    ```

A class can safely implement both interfaces as their methods have the same signature (name and parameters) and also have the same return type.

```java
package demo;

public class Calculator implements ComplexAlgorithm, DoubleAlgorithm {

  @Override
  public double compute() {
    return 0;
  }
}
```

The `Calculator` class implements both interfaces and only has one method.  Any instance of the `Calculator` class can be use when a `ComplexAlgorithm` or `DoubleAlgorithm` type is required.

**A class cannot implement two, or more, interfaces that have the same method signature (name and parameters), but have a different return type**.  In general, a class cannot have two methods with the same signature (name and parameters) and different return types.

Consider the following interfaces

1. An algorithm that resolves to a `double`.

    ```java
    package demo;

    public interface DoubleAlgorithm {

      double compute();
    }
    ```

1. An algorithm that resolved to an `int`.

    ```java
    package demo;

    public interface IntAlgorithm {

      int compute();
    }
    ```

Both interfaces define a method, named `compute()`, that return a different type.  Now consider the following class that implements both interfaces.

**⚠️ THE FOLLOWING EXAMPLE DOES NOT COMPILE!!**

```java
package demo;

public class Calculator implements IntAlgorithm, DoubleAlgorithm {

  @Override
  public int compute() { /* ... */ }

  @Override
  public double compute() { /* ... */ }
}
```

Let's for the sake of the example say that the above class compiles.  Which method would we invoke when the `compute()` method is invoked on an instance of the Calculator class?

```java
final Calculator c = new Calculator();
c.compute();
```

There is no way for the Java compiler to link our call to the right method as both methods match.

### What's the purpose of an interface that has no abstract methods (marker interface)?

Say that we have an application that sends data to the client in some form.  Some of the data handled by the application is sensitive while other data is not.

Consider the following example.

```java
package demo;

public class App {
  public static void main( final String[] args ) {
    final SensitiveInformation a = new SensitiveInformation();
    final NonSensitiveInformation b = new NonSensitiveInformation();

    sendToClient( a );
    sendToClient( b );
  }

  private static void sendToClient( final Object a ) {
    System.out.printf( "Sending data %s to client%n", a );
  }
}

class SensitiveInformation {
  private final String information = "Something very sensitive";

  @Override
  public String toString() {
    return String.format( "SensitiveInformation{information='%s'}", information );
  }
}

class NonSensitiveInformation {
  private final String information = "Non sensitive information";

  @Override
  public String toString() {
    return String.format( "NonSensitiveInformation{information='%s'}", information );
  }
}
```

Note that, for simplicity, the above example has three top-level classes in one source file. The file name is `App.java`, the same as the public class name.  Furthermore, the above example categorises all sensitive data as one type, the `SensitiveInformation`.  In reality we will have many different classes, each containing some kind of sensitive information.  For simplicity, I've only added one class.  Same applies for the `NonSensitiveInformation` class.

Running the above class will print the following.

```java
Sending data SensitiveInformation{information='Something very sensitive'} to client
Sending data NonSensitiveInformation{information='Non sensitive information'} to client
```

Both the sensitive and non-sensitive information were printed alike.

**How can we prevent any data that the business deems sensitive (such as the `SensitiveInformation`) from being sent to the client?**

Note that we cannot change the method's `sendToClient()` parameter to the `NonSensitiveInformation` type as we may have many classes which do not contain sensitive data and can be safely sent to the client.

One solution is to use marker interfaces.  An interface defines a type and any class implementing the interface can be used wherever this interface is required.  Consider the following marker interface.

```java
public interface CanShareWithClient {
}
```

We can refactor the method `sendToClient()` such that it takes an instance of `CanShareWithClient` instead of `Object`.

**⚠️ THE FOLLOWING EXAMPLE WILL NOT COMPILE!!**

```java
package demo;

public class App {
  public static void main( final String[] args ) { /* ... */ }

  private static void sendToClient( final CanShareWithClient a ) {
    System.out.printf( "Sending data %s to client%n", a );
  }
}

class SensitiveInformation { /* ... */ }

class NonSensitiveInformation { /* ... */ }
```

Our `SensitiveInformation` and `NonSensitiveInformation` classes do not implement the marker interface `CanShareWithClient`, thus we cannot call the `sendToClient()` method and pass our objects, as yet.  We can have any class that can be safely shared with the client implement the marker interface `CanShareWithClient` and then use the `sendToClient()` method.

**⚠️ THE FOLLOWING EXAMPLE WILL NOT COMPILE!!**

```java
package demo;

public class App {
  public static void main( final String[] args ) {
    final SensitiveInformation a = new SensitiveInformation();
    final NonSensitiveInformation b = new NonSensitiveInformation();

    sendToClient( a ); /* ⚠️ This will not compile!! */
    sendToClient( b ); /* 👍 This will work */
  }

  private static void sendToClient( final CanShareWithClient a ) { /* ... */ }
}

class SensitiveInformation { /* ... */ }

class NonSensitiveInformation implements CanShareWithClient { /* ... */ }
```

Using the marker interface `CanShareWithClient`, only classes that are marked by this interface (classes that implement the `CanShareWithClient` marker interface) can now be passed to the `sendToClient()` method.  The compiler will fail if we pass anything that does not implement this interface.

The above solution works great if all classes that need to be sent to the client can implement the marker interface, `CanShareWithClient`.  This may not always be the case and we may need to go through a different route.  Another, personally less preferred, approach is to accept all objects but skip those that should not be sent.

Consider another marker interface.

```java
public interface Sensitive {
}
```

Any class marked by the `Sensitive` interface (classes that implement the `Sensitive` marker interface) is skipped by the `sendToClient()` as shown next.

```java
package demo;

public class App {
  public static void main( final String[] args ) { /* ... */ }

  private static void sendToClient( final Object a ) {
    if ( !( a instanceof Sensitive ) ) {
      System.out.printf( "Sending data %s to client%n", a );
    }
  }
}

class SensitiveInformation implements Sensitive { /* ... */ }

class NonSensitiveInformation { /* ... */ }
```

Note that the sensitive information is skipped and only the classes that are **not** marked by the `Sensitive` are printed.

```bash
Sending data NonSensitiveInformation{information='Non sensitive information'} to client
```

I prefer the first approach where the `sendToClient()` only accepts types that implement a marker interface, because the compiler makes sure that only classes of the right type are passed.  This approach is not always possible in which case we need to fallback on the second approach.  **In either case, we need to add tests**.

1. First approach, using the `CanShareWithClient` marker interface

    In the first case we need to make sure that all sensitive objects are not implementing the `CanShareWithClient`

    ```java
    package demo;

    import org.junit.jupiter.api.DisplayName;
    import org.junit.jupiter.api.Test;

    import static org.junit.jupiter.api.Assertions.assertFalse;

    @DisplayName( "Sensitive Classes" )
    public class SensitiveClassesTest {

      @Test
      @DisplayName( "should not implement the CanShareWithClient interface" )
      public void shouldNotImplementCanShareWithClient() {
        final Object a = new SensitiveInformation();
        assertFalse( a instanceof CanShareWithClient );
      }
    }
    ```

    This test is required to make sure that all sensitive classes do not implement the `CanShareWithClient` marker interface by mistake.  In the event someone marks a sensitive class by the `CanShareWithClient`, this test will catch that and will fails.

    No need to test whether the non-sensitive data is implementing the interface as the compiler will check that.  It is not possible to call the `sendToClient()` and pass anything that does not implement `CanShareWithClient`.

1. Second approach, using the `Sensitive` marker interface to exclude sensitive classes

    The example is a bit complex and is omitted as it is beyond the scope as it requires a more complex setup.

    We need to try all types of objects that can be (non-sensitive), and should not be (sensitive), sent to the client and use mocks to make sure that only the classes that you are expecting to be send to the client are actually sent.  If the mock is called when given an object deemed sensitive, the test should fail.  On the other hand, if the mock is not called when given a non-sensitive data, then the test should fail too.

In both cases, testing can be a bit tricky and in some cases is missed.

### What are `default` and `static` methods?

Before Java 1.8, interfaces could not have non-abstract methods.  All methods within the interface had to be `abstract`.  The reason behind this comes from [the diamond problem, also known as *Deadly Diamond of Death*](https://en.wikipedia.org/wiki/Multiple_inheritance#The_diamond_problem).  A class in Java can extend one other class and can implement many interfaces (with only abstract methods) to avoid the diamond problem.

Consider the following interface.

```java
package demo;

public interface Display {

  void display( final String message );
}
```

The implementation of this interface will display a message somewhere, such as the system console.  Now, say that we want to format a message as well.  We can make use of a `static` method to do that.

```java
package demo;

public class Displays {

  static String format( final String pattern, final Object... parameters ) {
    return String.format( pattern, parameters );
  }

  private Displays() {
  }
}
```

Note that we created new class, ` Displays`, and provided a `private` constructor as [this class was not meant to be initialised](#should-utilities-classes-like-the-math-class-have-a-constructor).  We can use this method to format messages independent from where this is going to be displayed.  Say that we want to support some custom messages, such as "*hello …*".  This could be added using abstract classes as shown next.

```java
package demo;

public abstract class AbstractDisplay implements Display {

  public void displayf( final String pattern, final Object... parameters ) {
    display( Displays.format( pattern, parameters ) );
  }

  public void hello( final String name ) {
    displayf( "Hello %s", name );
  }
}
```

When working with older versions of Java (before Java 1.8), we had to split our code into several classes.  This is why we have classes like [`Collections`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/Collections.html), which supports implementation of the [`Collection`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/Collection.html) interface, such as [`List`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/List.html).

As of Java 1.8, interfaces started supporting `static` and `default` methods too, which simplifies our design as shown in the following interface.

```java
package demo;

public interface Display {

  void display( final String message );

  default void displayf( final String pattern, final Object... parameters ) {
    display( format( pattern, parameters ) );
  }

  default void hello( final String name ) {
    displayf( "Hello %s", name );
  }

  static String format( final String pattern, final Object... parameters ) {
    return String.format( pattern, parameters );
  }
}
```

As of Java 1.8, we are able to consolidate the abstract class, `AbstractDisplay`, and utilities class `Displays` into one interface.  Our class can simply implement the interface and make use of its `default` and `static` methods.

```java
package demo;

public class SystemConsole implements Display {

  @Override
  public void display( final String message ) {
    System.out.println( message );
  }
}
```

Another implementation can take advantage of the same interface.

```java
package demo;

public class Log implements Display {

  @Override
  public void display( final String message ) {
    /* Write to log file */
  }
}
```

### What happens if a class implements two interfaces that have the same `default` methods?

This question is very similar to another question we have explored before: [*What happens if a class implements two interfaces that have the same abstract method?*](#what-happens-if-a-class-implements-two-interfaces-that-have-the-same-abstract-method)

A class can implement two or more interfaces that have the same default method signatures.  There is one small caveat.  A class that implements two or more interfaces that have the same default method signature, then the class must override the common default method.

Consider the following two interfaces

1. A car

    ```java
    package demo;

    public interface Car {

      default void ignite() {
        System.out.println( "Ignite the engine" );
      }
    }
    ```

1. A boat

    ```java
    package demo;

    public interface Boat {

      default void ignite() {
        System.out.println( "Ignite the inboard motor" );
      }
    }
    ```

Both interfaces have a default method, `ignite()`.  Note that the methods need to have the same return type, otherwise a call cannot implement both.  Now consider a boat car, such as the *Fiat 1110 Boat Car*, shown next.

![the Fiat 1110 Boat Car](https://www.italianways.com/wp-content/uploads/2014/03/IW-fiat-1100-coriasco-boat-car-04.jpg)<br/>
([Reference](https://www.italianways.com/the-fiat-1110-boat-car-a-boat-on-wheels/))

Consider the following example.

**⚠️ THE FOLLOWING EXAMPLE WILL NOT COMPILE!!**

```java
package demo;

public class BoatCar implements Car, Boat {
}
```

Let say that for the sake of the example, the above class compiles.  Consider the following example.

```java
final BoatCar car = new BoatCar();
car.ignite();
```

**Which of the two default methods will be the above invoke?**  We can ask a different question.  **Which default method will the `BoatCar` inherit?**

The `BoatCar` **MUST** override the default `ignite()` method and provide a concrete implementation.

```java
package demo;

public class BoatCar implements Car, Boat {

  @Override
  public void ignite() {
    Car.super.ignite();
    Boat.super.ignite();
  }
}
```

The child class, in this case the `BoatCar` class, can invoke the interface's default method.  The `BoatCar` class can ignore both default methods, pick any of the default methods and execute them in any order, or simply pick one.  Consider the following, not necessary useful, example.

```java
package demo;

public class BoatCar implements Car, Boat {

  @Override
  public void ignite() {
    Boat.super.ignite();
    Car.super.ignite();
    Boat.super.ignite();
    Car.super.ignite();
    Boat.super.ignite();
  }
}
```

We can now invoke the `ignite()` method as we have a concrete implementation.

```java
package demo;

public class App {
  public static void main( final String[] args ) {
    final BoatCar car = new BoatCar();
    car.ignite();
  }
}
```

The above example will produce.

```bash
Ignite the inboard motor
Ignite the engine
Ignite the inboard motor
Ignite the engine
Ignite the inboard motor
```

## Sorting (the `Comparable` and `Comparator` interfaces)

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

**⚠️ THE FOLLOWING EXAMPLE WILL COMPILE BUT WILL THROW A `ClassCastException`!!**

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

### How can we apply natural ordering to a custom class (the `Comparable` interface)?

In a previous example, we were able to sort an array of string using natural ordering.  Consider the following `Person` class.

```java
package demo;

public class Person {

  private final String name;

  public Person( final String name ) {
    this.name = name;
  }

  @Override
  public String toString() {
    return String.format( "Person{name='%s'}", name );
  }
}
```

A `Person` has one property which can be initialise through the constructor.

```java
package demo;

import java.util.Arrays;

public class App {
  public static void main( final String[] args ) {
    final Person[] persons = {
      new Person( "Jade" ),
      new Person( "Aden" ),
      new Person( "Mary" ),
      new Person( "Peter" ),
    };

    System.out.printf( "Persons: %s%n", Arrays.toString( persons ) );
  }
}
```

The above class creates an array of persons and print it.

```bash
Persons: [Person{name='Jade'}, Person{name='Aden'}, Person{name='Mary'}, Person{name='Peter'}]
```

Trying to sort the array of persons will throw a `ClassCastException`, as we saw before, as the sort method requires an instance of `Comparable`

```java
Arrays.sort( persons );
```

We can implement the `Comparable` interface and add natural ordering as shown next.

**⚠️ THE FOLLOWING EXAMPLE WILL COMPILE BUT IT IS NOT SAFE!!**

```java
package demo;

public class Person implements Comparable<Person> {

  private final String name;

  public Person( final String name ) { /* ... */ }

  @Override
  public int compareTo( final Person that ) {
    return name.compareTo( that.name );
  }

  @Override
  public String toString() { /* ... */ }
}
```

Now that our class implements the `Comparable` interface, we can use [the `Arrays`' `sort()` method](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/Arrays.html#sort(java.lang.Object%5B%5D)) to sort our array of persons.

```java
package demo;

import java.util.Arrays;

public class App {
  public static void main( final String[] args ) {
    final Person[] persons = {
      new Person( "Jade" ),
      new Person( "Aden" ),
      new Person( "Mary" ),
      new Person( "Peter" ),
    };

    System.out.println( "--- Before Sorting -------" );
    System.out.printf( "Persons: %s%n", Arrays.toString( persons ) );

    Arrays.sort( persons );

    System.out.println( "--- After Sorting --------" );
    System.out.printf( "Persons: %s%n", Arrays.toString( persons ) );
  }
}
```

The above example will print the array of persons alphabetically.

```bash
--- Before Sorting -------
Persons: [Person{name='Jade'}, Person{name='Aden'}, Person{name='Mary'}, Person{name='Peter'}]
--- After Sorting --------
Persons: [Person{name='Aden'}, Person{name='Jade'}, Person{name='Mary'}, Person{name='Peter'}]
```

Please note that the person's name can be `null`, which will cause the `compareTo()` method to throw a `NullPointerException`.  The following sessions discuss this in more depth.

### How does the `compareTo()` method works?

The [`compareTo()` method is defined by the `Comparable` interface]( https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/lang/Comparable.html).  The `compareTo()` method **must** return: "_a negative integer, zero, or a positive integer as this object is less than, equal to, or greater than the specified object_".  Note that here the interface is defining a contract between the implementer and the consumer of the interface.  The `sort()` method relies on this contract to work properly.  If the implementer does not follow the contract, the result of the `sort()` may not be as expected.

Let say we have two objects that implement the `Comparable` interface, `a` and `b`.

`a.compareTo(b)` will return:

| Return | Condition                               |
|-------:|-----------------------------------------|
|      0 | When `a` and `b` are considered equal   |
|   <=-1 | When `a` is considered smaller than `b` |
|    >=1 | When `a` is considered larger than `b`  |

Please note that the`compareTo()` may not just return `-1`, but it can return any negative value to indicate that `a` is smaller than `b`.  Same applies when `a` is larger than `b`.

Note that `b` cannot be `null`.  We cannot pass a `null` to the `compareTo()` method.  The contract ([Java Docs](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/lang/Comparable.html#compareTo(T))) specifies that a `NullPointerException` will be thrown if the given object is `null`.

### What will happen if one of the properties used is `null`?

Consider the following example.

**⚠️ THE FOLLOWING EXAMPLE WILL COMPILE BUT WILL THROW A `NullPointerException`!!**

```java
package demo;

import java.util.Arrays;

public class App {
  public static void main( final String[] args ) {
    final Person[] persons = {
      new Person( "Jade" ),
      new Person( "Aden" ),
      new Person( null ),
      new Person( "Peter" ),
    };

    Arrays.sort( persons );

    System.out.printf( "Persons: %s%n", Arrays.toString( persons ) );
  }
}
```

One of the persons creates has a `null` name.  Trying to sort this array will throw an `NullPointerException`.

```bash
Exception in thread "main" java.lang.NullPointerException
	at demo.Person.compareTo(Person.java:13)
	at demo.Person.compareTo(Person.java:3)
	at java.base/java.util.ComparableTimSort.countRunAndMakeAscending(ComparableTimSort.java:321)
	at java.base/java.util.ComparableTimSort.sort(ComparableTimSort.java:188)
	at java.base/java.util.Arrays.sort(Arrays.java:1040)
	at demo.App.main(App.java:14)
```

The `compareTo()` does not take `null`s and a `NullPointerException` will be thrown if the given object is `null` as documented in the interface's [Java Docs](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/lang/Comparable.html#compareTo(T)).

```java
  @Override
  public int compareTo( final Person that ) {
    return name.compareTo( that.name );
  }
```

Therefore, we need to check whether the `name` property is `null` before comparing it.

```java
package demo;

public class Person implements Comparable<Person> {

  private final String name;

  public Person( final String name ) { /* ... */ }

  @Override
  public int compareTo( final Person that ) {
    /* If both are null or the same String instance */
    if ( name == that.name ) {
      return 0;
    }

    /* If name is null */
    if ( name == null ) {
      return -1;
    }

    /* If the other name is null */
    if ( that.name == null ) {
      return 1;
    }

    return name.compareTo( that.name );
  }

  @Override
  public String toString() { /* ... */ }
}
```

The simple comparison got a bit more complicated, just because of `null`s.  At least now we can sort the persons that have a `null` name.

```bash
Persons: [Person{name='null'}, Person{name='Aden'}, Person{name='Jade'}, Person{name='Peter'}]
```

Luckily we can use another common library to simplify our code.

```groovy
dependencies {
  implementation 'org.apache.commons:commons-lang3:3.10'
}
```

The old [apache commons lang]( https://mvnrepository.com/artifact/org.apache.commons/commons-lang) and its successor the [apache commons lang3]( https://mvnrepository.com/artifact/org.apache.commons/commons-lang3) are very popular libraries that have lots of useful functionality, similar to Guava.

```java
package demo;

import static org.apache.commons.lang3.StringUtils.compare;

public class Person implements Comparable<Person> {

  private final String name;

  public Person( final String name ) { /* ... */ }

  @Override
  public int compareTo( final Person that ) {
    return compare( name, that.name );
  }

  @Override
  public String toString() { /* ... */ }
}
```

We simply delegated the whole comparison to the [`StringUtils`'s ` compare()` method](http://commons.apache.org/proper/commons-lang/apidocs/org/apache/commons/lang3/StringUtils.html#compare-java.lang.String-java.lang.String-), which also `null`-safe.

### Can we use multiple properties to determine natural ordering?

We can use all the properties we need when comparing objects.  Consider the following example.

```java
package demo;

import static org.apache.commons.lang3.StringUtils.compare;

public class Person implements Comparable<Person> {

  private final String name;
  private final String surname;

  public Person( final String name, final String surname ) {
    this.name = name;
    this.surname = surname;
  }

  @Override
  public int compareTo( final Person that ) {
    final int diff = compare( name, that.name );
    if ( diff == 0 ) {
      return compare( surname, that.surname );
    }

    return diff;
  }

  @Override
  public String toString() {
    return String.format( "Person{name='%s', surname='%s'}", name, surname );
  }
}
```

When using multiple properties to compare objects, we will start with one property and then if that property for both objects is the same, we move to the next.  In the above example we first compared the two objects by their `name`, and then if the `name`s are the same, we fall back to the `surname`.  The `surname` is compared only if the `name`s are not the same.

We can use the [ternary operator](https://docs.oracle.com/javase/specs/jls/se14/html/jls-15.html#jls-15.25) instead.

```java
  @Override
  public int compareTo( final Person that ) {
    int diff = compare( name, that.name );
    return diff != 0 ? diff : compare( surname, that.surname );
  }
```

The new `Person` class now supports natural ordering based on two properties.

```java
package demo;

import java.util.Arrays;

public class App {
  public static void main( final String[] args ) {
    final Person[] persons = {
      new Person( "Jade", null ),
      new Person( null, null ),
      new Person( "Jade", "Attard" ),
      new Person( null, "Attard" )
    };

    System.out.println( "--- Before Sorting -------" );
    System.out.printf( "Persons: %s%n", Arrays.toString( persons ) );


    Arrays.sort( persons );

    System.out.println( "--- After Sorting --------" );
    System.out.printf( "Persons: %s%n", Arrays.toString( persons ) );
  }
}
```

Like before, `null`'s are placed before non-`null`s.

```bash
--- Before Sorting -------
Persons: [Person{name='Jade', surname='null'}, Person{name='null', surname='null'}, Person{name='Jade', surname='Attard'}, Person{name='null', surname='Attard'}]
--- After Sorting --------
Persons: [Person{name='null', surname='null'}, Person{name='null', surname='Attard'}, Person{name='Jade', surname='null'}, Person{name='Jade', surname='Attard'}]
```

### How can we sort the `Point` or any other custom class (the `Comparator` interface)?

The `Point` class belongs to the Java API and we cannot modify it.  In such cases, or in cases when we want to use a different ordering than the natural ordering, we can use the [`Comparator`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/Comparator.html) interface.

The [`Comparator` interface provides a set of static methods](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/Comparator.html#comparing(java.util.function.Function)) that are very handy to sort objects as shown in the following example.

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

We cannot modify the `Point` class as this is not part of our code.  Yet, we can still sort an array of points in the way we need it to be sorted by providing an instance of the `Comparator` interface.  This applies to any data type.  We can sort anything we want in the way we want by using a `Comparator`.

The `Comparator` works very similar to the `Comparable`, discussed in the [how does the `compareTo()` method works](#how-does-the-compareto-method-works).  The `Comparator` defines one [method `compare()`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/Comparator.html#compare(T,T)) that takes two (non-`null`) objects of the same type (not just one) and returns, `0` if both are equal, a negative number (`<=-1`) if the first is smaller than the second, and a positive number (`>=1`) if the first is larger than the second.

Given any two objects of the same type, `a` and `b` (these objects do not have to implement any interface or extend any special class).

`comparator.compare(a, b)` will return:

| Return | Condition                               |
|-------:|-----------------------------------------|
|      0 | When `a` and `b` are considered equal   |
|   <=-1 | When `a` is considered smaller than `b` |
|    >=1 | When `a` is considered larger than `b`  |

Before Java 8, we had to implement the `Comparator` interface.  Java 8 introduced lambda and interface static method, which simplified the use of the `Comparator` interface.  Following is a longer version of the above code, that will achieve the same thing.

**⚠️ THE FOLLOWING EXAMPLE DOES NOT TAKE ADVANTAGE OF NEW CODE STYLE!!**

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

    /* Works with Java 1.5 or newer */
    final Comparator<Point> comparator = new Comparator<Point>() {
      @Override
      public int compare( final Point a, final Point b ) {
        int diff = Integer.compare( a.x, b.x );
        return diff != 0 ? diff : Integer.compare( a.y, b.y );
      }
    };

    Arrays.sort( points, comparator );
    System.out.printf( "Sorted: %s", Arrays.toString( points ) );
  }
}
```

The above example will work, and it is the only approach available (from those shown here) if you are using an older version of Java.  Both approaches will print the same output.

```bash
Sorted: [java.awt.Point[x=1,y=2], java.awt.Point[x=1,y=3], java.awt.Point[x=2,y=1]]
```

The points are ordered based on the value of the properties `x` and `y` respectively.

There are several approaches available to sort an array using a custom `Comparator`:

1. Extend the `Comparator` (works with versions of Java 1.5 or newer)

    ```java
    final Comparator<Point> comparator = new Comparator<Point>() {
      @Override
      public int compare( final Point a, final Point b ) {
        int diff = Integer.compare( a.x, b.x );
        return diff != 0 ? diff : Integer.compare( a.y, b.y );
      }
    };
    ```

1. Using lambda functions (works with versions of Java 1.8 or newer)

    ```java
    final Comparator<Point> comparator = ( a, b ) -> {
      int diff = Integer.compare( a.x, b.x );
      return diff != 0 ? diff : Integer.compare( a.y, b.y );
    };
    ```

1. (**Recommended**) Using the `Comparator` static methods (works with versions of Java 1.8 or newer)

    ```java
    final Comparator<Point> comparator =
      Comparator.comparing( Point::getX )
        .thenComparing( Point::getY );
    ```

All three approaches will produce the same result.

Note that `null`s can be tricky to handle and [the static methods provided by the `Comparator` interface](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/Comparator.html#nullsFirst(java.util.Comparator)) may not suffice.  Consider the following class.

```java
package demo;

public class Person {

  public final String name;

  public Person( final String name ) {
    this.name = name;
  }

  public String getName() {
    return name;
  }

  @Override
  public String toString() {
    return String.format( "Person{name=%s}", name );
  }
}
```

Now consider the following example, were we try to sort an array of persons that have `null` as their `name`.  Note that the person objects are not `null`, but the property being used to sort the array is `null`.

**⚠️ THE FOLLOWING EXAMPLE WILL COMPILE BUT WILL THROW A `NullPointerException`!!**

```java
package demo;

import java.util.Arrays;
import java.util.Comparator;

public class App {
  public static void main( final String[] args ) {
    final Person[] persons = {
      new Person( "Jade" ),
      new Person( null ),
      new Person( "Aden" )
    };

    final Comparator<Person> comparator =
      Comparator.nullsFirst( Comparator.comparing( Person::getName ) );

    Arrays.sort( persons, comparator );
    System.out.printf( "Persons: %s%n", Arrays.toString( persons ) );
  }
}
```

The above will fail with a `NullPointerException`, despite use of the `nullsFirst()` method.

```bash
Exception in thread "main" java.lang.NullPointerException
	at java.base/java.util.Comparator.lambda$comparing$77a9974f$1(Comparator.java:469)
	at java.base/java.util.Comparators$NullComparator.compare(Comparators.java:85)
	at java.base/java.util.TimSort.countRunAndMakeAscending(TimSort.java:355)
	at java.base/java.util.TimSort.sort(TimSort.java:220)
	at java.base/java.util.Arrays.sort(Arrays.java:1232)
	at demo.App.main(App.java:17)
```

The `nullsFirst()` method works well when the array contains `null`, but falls short when properties used by the `Comparator` are `null`.  Following is a version that works well with `null`s.

```java
package demo;

import org.apache.commons.lang3.StringUtils;

import java.util.Arrays;
import java.util.Comparator;

public class App {
  public static void main( final String[] args ) {
    final Person[] persons = {
      new Person( "Jade" ),
      new Person( null ),
      new Person( "Aden" )
    };

    final Comparator<Person> comparator = new Comparator<Person>() {
      @Override
      public int compare( final Person a, final Person b ) {
        return StringUtils.compare( a.name, b.name );
      }
    };

    Arrays.sort( persons, comparator );
    System.out.printf( "Persons: %s%n", Arrays.toString( persons ) );
  }
}
```

The above example will sort the array as expected.

```bash
Persons: [Person{name=null}, Person{name=Aden}, Person{name=Jade}]
```

Notice how `null`s complicate things.  No wonder why [`NullPointerException` is consider the billion-dollar mistake](https://www.infoq.com/presentations/Null-References-The-Billion-Dollar-Mistake-Tony-Hoare/).  Prevent `null`s when possible.  If a person must have a name (name should not be `null`), then don't accept `null`s as the person's name.  Consider the following version of the `Person` class.

```java
package demo;

import javax.annotation.Nonnull;

import static com.google.common.base.Preconditions.checkNotNull;

public class Person {

  public final String name;

  public Person( @Nonnull final String name ) {
    this.name = checkNotNull( name );
  }

  public @Nonnull String getName() { /* ... */ }

  @Override
  public String toString() { /* ... */ }
}
```

The constructor will throw a `NullPointerException` if `null` is provided as the `name`.

The [`@Nonnull` annotation](http://checkstyle-addons.github.io/jsr305-javadoc/3.0.1/javax/annotation/Nonnull.html) is used by frameworks and IDEs to verify, as it best can, whether the given parameter is `null` and catch such error as early as possible.  Note that the `@Nonnull` has no effect at runtime and will not prevent `null`s to be passed.  It is just an annotation used by tools to analyse your code and help point out any problems.

![Nonnull warning by IDE](assets/images/Nonnull%20warning%20by%20IDE.png)

Now that the person class prevents `null`s, we can safely use the `Comparator` static methods to sort the array of persons.

```java
package demo;

import java.util.Arrays;
import java.util.Comparator;

public class App {
  public static void main( final String[] args ) {
    final Person[] persons = {
      new Person( "Jade" ),
      new Person( "Aden" )
    };

    final Comparator<Person> comparator = Comparator.comparing( Person::getName );

    Arrays.sort( persons, comparator );
    System.out.printf( "Persons: %s%n", Arrays.toString( persons ) );
  }
}
```

### Can we compare two integers by subtracting one from the other?

Some literature compares integers by subtracting them.  Consider the following class.

```java
package demo;

public class Person {

  public final String name;
  public final int age;

  public Person( final String name, final int age ) {
    this.name = name;
    this.age = age;
  }

  @Override
  public String toString() {
    return String.format( "Person{name='%s', age=%d}", name, age );
  }
}
```

Note that the properties are set to `public` for convenience.

Say that we would like to sort the persons based on their age.  We will use a `Comparator`, but the same applies if we use a `Comparable` instead.

**⚠️ THE FOLLOWING EXAMPLE WILL COMPILE BUT IT IS NOT SAFE!!**

```java
package demo;

import java.util.Arrays;
import java.util.Comparator;

public class App {
  public static void main( final String[] args ) {
    final Person[] persons = {
      new Person( "Jade", 13 ),
      new Person( "Aden", 11 )
    };

    final Comparator<Person> comparator = new Comparator<Person>() {
      @Override
      public int compare( final Person a, final Person b ) {
        /* ⚠️ BAD DESIGN!! */
        return a.age - b.age;
      }
    };

    Arrays.sort( persons, comparator );
    System.out.printf( "Sorted by age: %s", Arrays.toString( persons ) );
  }
}
```

The persons are sorted by their age as expected.  The value of `11` is smaller than the value of `13`.

```bash
Sorted by age: [Person{name='Aden', age=11}, Person{name='Jade', age=13}]
```

The above instance of the `Comparator` interface is broken despite its appearance.  Consider the following (extreme) situation

**⚠️ THE FOLLOWING EXAMPLE WILL COMPILE BUT IT IS NOT SAFE!!**

```java
package demo;

import java.util.Arrays;
import java.util.Comparator;

public class App {
  public static void main( final String[] args ) {
    final Person[] persons = {
      new Person( "Jade", Integer.MAX_VALUE ),
      new Person( "Aden", -2 )
    };

    final Comparator<Person> comparator = new Comparator<Person>() {
      @Override
      public int compare( final Person a, final Person b ) {
        /* ⚠️ BAD DESIGN!! */
        return a.age - b.age;
      }
    };

    Arrays.sort( persons, comparator );
    System.out.printf( "Sorted by age: %s", Arrays.toString( persons ) );
  }
}
```

Note that the above example is using very large values to highlight the problem when we negate an integer from another.

```bash
Sorted by age: [Person{name='Jade', age=2147483647}, Person{name='Aden', age=-2}]
```

The person with age `2147483647` is placed before the person with age `-2`.  That is incorrect!!  We all know that `-2` is smaller than `2147483647`, yet our instance of `Comparator` thinks otherwise.

The above problem arises from the fact that integer arithmetic in Java overflows and produces unexpected behaviour.  When we subtract a negative value from a positive value, we simply add the two numbers.

```
jshell> 10 - -2
$1 ==> 12
```

A positive number indicates that the left operand (value of `10`) is larger than the right operand (value of `-2`), which is correct.

Now consider our extreme values

```
jshell> 2147483647 - -2
$2 ==> -2147483647
```

The evaluation of `2147483647 - -2` is equivalent to `2147483647 + 2` which overflows and returns a negative value.  A negative value, on the other hand, indicates that the left operand (value of `2147483647`) is smaller than the right operand (value of `-2`), which is incorrect!!

This is quite a big problem which caused big bugs, even within Java API.  The [`Arrays.binarySerach()`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/Arrays.html#binarySearch(int%5B%5D,int)) method was [broken because of this oversight](https://ai.googleblog.com/2006/06/extra-extra-read-all-about-it-nearly.html).

Luckily we can rely on the [`Integer` wrapper class's `compare()` method](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/lang/Integer.html#compare(int,int)).  Consider the following example.

```java
package demo;

import java.util.Arrays;
import java.util.Comparator;

public class App {
  public static void main( final String[] args ) {
    final Person[] persons = {
      new Person( "Jade", Integer.MAX_VALUE ),
      new Person( "Aden", -2 ),
    };

    final Comparator<Person> comparator = new Comparator<Person>() {
      @Override
      public int compare( final Person a, final Person b ) {
        return Integer.compare( a.age, b.age );
      }
    };

    Arrays.sort( persons, comparator );
    System.out.printf( "Sorted by age: %s", Arrays.toString( persons ) );
  }
}
```

Now the persons are properly sorted by their age, where `-2` is considered smaller than `2147483647`.

```bash
Sorted by age: [Person{name='Aden', age=-2}, Person{name='Jade', age=2147483647}]
```

## The `instanceof` and type cast operators

Two operators that usually indicate bad design practice are the [`instanceof`](https://docs.oracle.com/javase/specs/jls/se14/html/jls-15.html#jls-15.20.2) and the [type cast](https://docs.oracle.com/javase/specs/jls/se14/html/jls-5.html#jls-5.5) operators.

**Why? You may be asking**.  Consider the following example.

```java
package demo;

public abstract class Pet {
}
```

The `Pet` class defines any pet.  Following are some implementation of `Pet`

1. A dog that barks

    ```java
    package demo;

    public class Dog extends Pet {
      public void bark() {
        System.out.println( "Woof..." );
      }
    }
    ```

1. A cat that meows

    ```java
    package demo;

    public class Cat extends Pet {
      public void meow() {
        System.out.println( "Meow..." );
      }
    }
    ```

1. A bird that tweets

    ```java
    package demo;

    public class Bird extends Pet {
      public void chirp() {
        System.out.println( "Tweet..." );
      }
    }
    ```

We can use a `Dog`, `Cat` and `Bird` wherever a `Pet` is required.  Now say that we need to write a method, say `doYourThing()`, that takes a `Pet` and if it is a dog it barks, if it is a cat it meows and if it is a bird is tweets.  Consider the following example.

**⚠️ BAD PROGRAMMING PRACTICE!!**

```java
package demo;

public class App {
  public static void main( final String[] args ) {
    final Pet pet = new Dog();
    doYourThing( pet );
  }

  private static void doYourThing( final Pet pet ) {
    if ( pet instanceof Dog ) {
      final Dog dog = (Dog) pet;
      dog.bark();
    } else if ( pet instanceof Cat ) {
      ( (Cat) pet ).meow();
    } else if ( pet instanceof Bird ) {
      ( (Bird) pet ).chirp();
    }
  }
}
```

The above example meets the requirements but does not make use of good programming practices.  A better approach is to make use of [polymorphism](), discussed [later on in *Is there a better approach than relying on `instanceof` and type cast operators?* section](#is-there-a-better-approach-than-relying-on-instanceof-and-type-cast-operators-polymorphism).

### Is there a better approach than relying on `instanceof` and type cast operators (polymorphism)?

Instead of relying on type casting, we can take advantage of polymorphism.  Consider the following version of the `Pet` class.

```java
package demo;

public abstract class Pet {

    abstract void doIt();
}
```

The `Pet` class defined an abstract method, named `doIt()`.  All subclasses need to override this method and provide a concrete implementation.

1. A dog that barks

    ```java
    package demo;

    public class Dog extends Pet {

      @Override
      public void doIt() {
        System.out.println( "Woof..." );
      }
    }
    ```

1. A cat that meows

    ```java
    package demo;

    public class Cat extends Pet {

      @Override
      public void doIt() {
        System.out.println( "Meow..." );
      }
    }
    ```

1. A bird that tweets

    ```java
    package demo;

    public class Bird extends Pet {

      @Override
      public void doIt() {
        System.out.println( "Tweet..." );
      }
    }
    ```

Different from before, all subclasses of the `Pet` class have their own implementation of the `doIt()` method.

```java
package demo;

public class App {
  public static void main( final String[] args ) {
    final Pet pet = new Dog();
    doYourThing( pet );
  }

  private static void doYourThing( final Pet pet ) {
    pet.doIt();
  }
}
```

All pets have the `doIt()` method and we don't need to check the type and invoke specific methods as we did before.  Furthermore, if later on we add new types, such as `Fish` or `Tiger`, we don't have to change the `doYourThing()` method shown above as all pets will have the `doIt()` method.

### Are there good examples of the `instanceof` and type cast operators?

Yes. Frameworks, such as [Spring](https://spring.io/), use the `instanceof` and type cast operators to decorate objects.  Consider the following two interfaces:

1. [`InitializingBean`](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/beans/factory/InitializingBean.html)
1. [`DisposableBean`](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/beans/factory/DisposableBean.html)

Implementing any (or both) of these two interfaces will tell Spring how to interact with your [beans](https://docs.spring.io/spring/docs/current/spring-framework-reference/core.html#beans-definition).  It is important to note that Spring has been with us for quite some time, [since October 2002](https://en.wikipedia.org/wiki/Spring_Framework), and Spring had to work with older versions of Java where features like [interface default methods](#what-are-default-and-static-methods) were not available.  Using the `instanceof` and type cast operators together with these two interfaces, Spring was able to initialise beans after creating them and dispose beans before stopping them.

Consider the following two interfaces

1. A simple replacement of the `InitializingBean` interface

    ```java
    package demo;

    interface RequireInit {
      void init();
    }
    ```

1. Another simple replacement of the `DisposableBean` interface

    ```java
    package demo;

    interface RequireCleanUp {
      void cleanUp();
    }
    ```

As the names indicate, one interface should be executed before and the other should be executed after.  To keep it very simple, we are simply executing a task.  Consider the following two tasks

1. A simple task that does not require any initialisation or clean up

    ```java
    package demo;

    public class SimpleTask implements Runnable {

      @Override
      public void run() {
        System.out.println( "SimpleTask::run()" );
      }
    }
    ```

1. A more elaborate task that requires both initialisation and clean up.

    ```java
    package demo;

    public class ComplexTask implements Runnable, RequireInit, RequireCleanup {

      @Override
      public void init() {
        System.out.println( "ComplexTask::init()" );
      }

      @Override
      public void run() {
        System.out.println( "ComplexTask::run()" );
      }

      @Override
      public void cleanUp() {
        System.out.println( "ComplexTask::cleanup()" );
      }
    }
    ```

Now consider our light version of *the framework*.

```java
package demo;

public class App {
  public static void main( final String[] args ) {
    runTask( new SimpleTask() );
    runTask( new ComplexTask() );
  }

  private static void runTask( final Runnable task ) {
    if ( task instanceof RequireInit ) {
      ( (RequireInit) task ).init();
    }

    task.run();

    if ( task instanceof RequireCleanUp ) {
      ( (RequireCleanUp) task ).cleanUp();
    }
  }
}
```

Our `runTask()` method takes a [`Runnable`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/lang/Runnable.html).  If the `Runnable` object is also a `RequireInit`, the `init()` is invoked and if it requires clean up, the `cleanUp()` method is invoked.

```bash
SimpleTask::run()
ComplexTask::init()
ComplexTask::run()
ComplexTask::cleanup()
```

Java 1.8 provides default methods, which can be used to simplify our example.

```java
package demo;

public interface Task extends Runnable {
  default void init() { }

  default void cleanup() { }
}
```

Our objects can implement the `Task` interface and implement either or both lifecycle methods.

1. The `SimpleTask` still implements the `Runnable`.

    ```java
    package demo;

    public class SimpleTask implements Runnable { /* ... */ }
    ```

1. A new task, `ModerateTask` still implements the `Task` and overrides the `init()` method only.

    ```java
    package demo;

    public class ModerateTask implements Task {
      @Override
      public void init() {
        System.out.println( "ModerateTask::init()" );
      }

      @Override
      public void run() {
        System.out.println( "ModerateTask::run()" );
      }
    }
    ```

1. The `ComplexTask` implements the `Task` interface and overrides all methods.

    ```java
    package demo;

    public class ComplexTask implements Task { /* ... */ }
    ```

We can now have two methods that handle these differently.

```java
package demo;

public class App {
  public static void main( final String[] args ) {
    runTask( new SimpleTask() );
    runTask( new ModerateTask() );
    runTask( new ComplexTask() );
  }

  private static void runTask( final Runnable task ) {
    task.run();
  }

  private static void runTask( final Task task ) {
    task.init();

    runTask( (Runnable) task );

    task.cleanup();
  }
}
```

The above will print

```bash
SimpleTask::run()
ModerateTask::init()
ModerateTask::run()
ComplexTask::init()
ComplexTask::run()
ComplexTask::cleanup()
```

The above example is making use of type upcasting to use the `runTask()` method that takes a `Runnable`.

```java
runTask( (Runnable) task );
```

### What is type upcasting and how is it different from type casting or type downcasting?

Consider the following class hierarchy

1. A class that represents a person

    ```java
    package demo;

    public class Person {

      public final String name;

      public Person( final String name ) {
        this.name =  name ;
      }

      @Override
      public String toString() {
        return String.format( "Person{name=%s}", name );
      }
    }
    ```

1. A class that represent a special type of person, a VIP

    ```java
    package demo;

    public class VeryImportantPerson extends Person {

      public VeryImportantPerson( final String name ) {
        super( name );
      }

      @Override
      public String toString() {
        return String.format( "VeryImportantPerson{name=%s}", name );
      }
    }
    ```

The `Person` class does not extends anything, thus inherits from the `Object` class.  The `VeryImportantPerson` class is a subclass of the `Person` class.

Type casting is the ability of making a type appearing as another, **compatible**, type.  There are two types of type casting:
* [Type upcasting](#type-upcasting)
* [Type downcasting](#type-downcasting).

![Upcasting and Downcasting](assets/images/Upcasting%20and%20Downcasting.png)

#### Type Upcasting

Type upcasting, also referred to as [widening reference conversion in JLS 5.1.5](https://docs.oracle.com/javase/specs/jls/se14/html/jls-5.html#jls-5.1.5), is when we convert a type to more generic type, thus *widening*.  For example, type cast a variable of type `VeryImportantPerson` to type `Person` or type `Object`.

```java
package demo;

public class App {
  public static void main( final String[] args ) {
    final Person a = new Person( "Jade" );
    final Object b = (Object) a;
  }
}
```

The above example shows an explicit type upcasting from type `Person` to type `Object`.  We can type upcast implicitly.

```java
package demo;

public class App {
  public static void main( final String[] args ) {
    final Person a = new Person( "Jade" );
    final Object b = a;
  }
}
```

In both examples, variable `b` is of type `Object` despite it points to an object of type `Person`.  Type upcasting always works and no checks are required, all persons are objects.

**Why do we need explicit type upcasting?**

Consider the following example.

```java
package demo;

public class App {
  public static void main( final String[] args ) {
    final VeryImportantPerson a = new VeryImportantPerson( "Aden" );
    handle( a );
  }

  public static void handle( final Person guest ) {
    System.out.printf( "Water for %s%n", guest );
  }

  public static void handle( final VeryImportantPerson guest ) {
    System.out.printf( "Champagne for %s%n", guest );
  }
}
```

The `handle()` method is overloaded.  The first method takes a `Person` as its parameter while the second takes a `VeryImportantPerson`.  The above example will always invoke the second method as variable `a` is of type `VeryImportantPerson`, and will print.

```bash
Champagne for VeryImportantPerson{name=Aden}
```

Say that we need to serve *champagne* and *water* when handling VIPs.  In order words, VIPs get all that normal persons get and more.

| Type                  | Water   | Champagne |
|-----------------------|:-------:|:---------:|
| `Person`              | **YES** | NO        |
| `VeryImportantPerson` | **YES** | **YES**   |

We can invoke the first method, `handle(Person)`, by using explicit type upcasting as shown in the following example.

```java
package demo;

public class App {
  public static void main( final String[] args ) {
    final VeryImportantPerson a = new VeryImportantPerson( "Aden" );
    handle( a );
  }

  public static void handle( final Person guest ) {
    System.out.printf( "Water for %s%n", guest );
  }

  public static void handle( final VeryImportantPerson guest ) {
    handle( (Person) guest );
    System.out.printf( "Champagne for %s%n", guest );
  }
}
```

The above will print.

```bash
Water for VeryImportantPerson{name=Aden}
Champagne for VeryImportantPerson{name=Aden}
```

#### Type Downcasting

Type downcasting, also referred to as [narrowing reference conversion in JLS 5.1.6](https://docs.oracle.com/javase/specs/jls/se14/html/jls-5.html#jls-5.1.6), is when we convert a type to more specific type, thus *narrowing*.  For example, type cast a variable of type `Object` to type `Person` or type `VeryImportantPerson`.

```java
package demo;

public class App {
  public static void main( final String[] args ) {
    final Object a = new Person( "Jade" );
    final Person b = (Person) a;
  }
}
```

In the above example, we create a `Person` and then assign it to the variable `a`, of type `Object`.  It is important to understand that variable `a` is of type `Object`.  Variable `b` is of type `Person`, which is more specific than `Object`.  We cannot simply assign `a` to `b`.  The following example will not compile.

**⚠️ THE FOLLOWING EXAMPLE WILL NOT COMPILE!!**

```java
package demo;

public class App {
  public static void main( final String[] args ) {
    final Object a = new Person( "Jade" );
    final Person b = a;
  }
}
```

Note that type downcasting is checked and a [`ClassCastException`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/lang/ClassCastException.html) is thrown if the types are not compatible.  Consider the following example.

**⚠️ THE FOLLOWING EXAMPLE WILL COMPILE BUT WILL THROW A `ClassCastException`!!**

```java
package demo;

import java.awt.Point;

public class App {
  public static void main( final String[] args ) {
    final Object a = new Point( 1, 2 );
    final Person b = (Person) a;
  }
}
```

The above example will fail with a `ClassCastException` as `Point` is not a `Person`.

```bash
Exception in thread "main" java.lang.ClassCastException: class java.awt.Point cannot be cast to class demo.Person (java.awt.Point is in module java.desktop of loader 'bootstrap'; demo.Person is in unnamed module of loader 'app')
	at demo.App.main(App.java:8)
```

**Can we have an object of type `VeryImportantPerson` assigned to a variable of type `Object` type downcasted to a `Person`?**  Consider the following example.

```java
package demo;

public class App {
  public static void main( final String[] args ) {
    final Object a = new VeryImportantPerson( "Jade" );
    final Person b = (Person) a;
  }
}
```

The above works, as all `VeryImportantPerson` are `Person`.

### Can we type cast `null`?

Yes, `null` can be type casted to any object ([JLS-5.5](https://docs.oracle.com/javase/specs/jls/se14/html/jls-5.html#jls-5.5)).  We already saw this when answering the question [can one constructor call another constructor in the same class?](#can-one-constructor-call-another-constructor-in-the-same-class).

### Can we type cast primitive types?

Yes, primitives can be type casted too, as defined in the [widening primitive conversion (JLS-5.1.2)](https://docs.oracle.com/javase/specs/jls/se14/html/jls-5.html#jls-5.1.2) and the [narrowing primitive conversion (JLS-5.1.3)](https://docs.oracle.com/javase/specs/jls/se14/html/jls-5.html#jls-5.1.3) sections of the [Java Language Specifications](https://docs.oracle.com/javase/specs/jls/se14).

Consider the following example.

```java
package demo;

import java.util.Random;

public class App {
  public static void main( final String[] args ) {
    final Random r = new Random();
    final byte a = (byte) r.nextInt( 10 );
    System.out.printf( "The value of a is: %d%n", a );
  }
}
```

The `Random` class does not provide a `nextByte()` method and we need to rely on the `nextInt()` method and then type cast the returned `int` type to `byte`.

```bash
The value of a is: 7
```

**What will happen if the value being type casted does not fit?  What happens if the value we are casting is our of the `byte` range?**  Consider the following example.

```java
package demo;

public class App {
  public static void main( final String[] args ) {
    final byte a = (byte) 130.33;
    System.out.printf( "The value of a is: %d%n", a );
  }
}
```

The literal value `130.33` is a literal of type `double` (`64` bit).  A `byte` is an 8-bit variable.  When this happens, Java will overflow and continue counting to the negative side as shown next.


```bash
The value of a is: -126
```

Furthermore, the decimal point information is lost.  Changing the number from `130.33` to `130.999_999_999` will not make any difference.

```java
package demo;

public class App {
  public static void main( final String[] args ) {
    final byte a = (byte) 130.999_999_999;
    System.out.printf( "The value of a is: %d%n", a );
  }
}
```

All decimal places are dropped with this type casting and the following is printed.

```bash
The value of a is: -126
```

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

### Local class

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
1. [Effective Java](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/)
    1. [Item 20: Prefer interfaces to abstract classes](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/ch4.xhtml#lev20)
    1. [Item 21: Design interfaces for posterity](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/ch4.xhtml#lev21)
    1. [Item 22: Use interfaces only to define types](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/ch4.xhtml#lev22)
1. [Liskov Substitution Principle](https://stackify.com/solid-design-liskov-substitution-principle/)
