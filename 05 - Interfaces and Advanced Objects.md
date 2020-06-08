# Interfaces and Advanced Objects

[Effective Java](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/) is a very good and popular book.  Several references are made in this page to specific items described in the book.

## TOC

1. [Setup](#setup)
1. [Interfaces](#interfaces)
    1. [What is an interface?](#what-is-an-interface)
    1. [How is an interface different from a class?](#how-is-an-interface-different-from-a-class)
    1. [How can we use interfaces?](#how-can-we-use-interfaces)
    1. [Can we create an instance of an interface?](#can-we-create-an-instance-of-an-interface)
    1. [Functional interface and lambda functions](#functional-interface-and-lambda-functions)
        1. [What is the relation between lambda and functional interfaces?](#what-is-the-relation-between-lambda-and-functional-interfaces)
        1. [What are the differences between lambda functions and inner anonymous classes?](#what-are-the-differences-between-lambda-functions-and-inner-anonymous-classes)
    1. [Can an interface extend another class or another interface?](#can-an-interface-extend-another-class-or-another-interface)
    1. [How many interfaces can a class implement?](#how-many-interfaces-can-a-class-implement)
    1. [What happens if a class implements two interfaces that have the same abstract method?](#what-happens-if-a-class-implements-two-interfaces-that-have-the-same-abstract-method)
    1. [What's the purpose of an interface that has no abstract methods (marker interface)?](#whats-the-purpose-of-an-interface-that-has-no-abstract-methods-marker-interface)
    1. [What are `default` and `static` methods?](#what-are-default-and-static-methods)
    1. [What happens if a class implements two interfaces that have the same `default` methods?](#what-happens-if-a-class-implements-two-interfaces-that-have-the-same-default-methods)
    1. [Can we use an interface just to define constants?](#can-we-use-an-interface-just-to-define-constants)
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
    1. [JEP 305: Pattern Matching for `instanceof` (Preview)](#jep-305-pattern-matching-for-instanceof-preview)
1. [Inheritance and composition](#inheritance-and-composition)
    1. [What is composition?](#what-is-composition)
    1. [Why is there a big push in favour of composition over inheritance?](#why-is-there-a-big-push-in-favour-of-composition-over-inheritance)
    1. [What are the disadvantages of composition?](#what-are-the-disadvantages-of-composition)
1. [Overloading, overriding, and hiding](#overloading-overriding-and-hiding)
    1. [Overriding](#overriding)
        1. [Do we need to use the `@Override` annotation?](#do-we-need-to-use-the-override-annotation)
        1. [Can we use the `@Override` annotation when overriding methods defined by an interface?](#can-we-use-the-override-annotation-when-overriding-methods-defined-by-an-interface)
        1. [Can we override a private method?](#can-we-override-a-private-method)
        1. [Can we change the visibility of an overridden method?](#can-we-change-the-visibility-of-an-overridden-method)
        1. [Can a parent class prevent a method from being overridden?](#can-a-parent-class-prevent-a-method-from-being-overridden)
        1. [Can we return something different when overriding methods?](#can-we-return-something-different-when-overriding-methods)
        1. [Can we override static methods?](#can-we-override-static-methods)
    1. [Overloading](#overloading)
        1. [Does Java support return-type-based method overloading?](#does-java-support-return-type-based-method-overloading)
        1. [Can we overload instance methods?](#can-we-overload-instance-methods)
        1. [What are the benefits of using method overloading?](#what-are-the-benefits-of-using-method-overloading)
        1. [When should we use method overloading and when should we avoid it?](#when-should-we-use-method-overloading-and-when-should-we-avoid-it)
    1. [Hiding](#hiding)
1. [Initialisation blocks, outer, inner and anonymous classes](#initialisation-blocks-outer-inner-and-anonymous-classes)
    1. [Static initialisation block](#static-initialisation-block)
        1. [Can we invoke a static initialisation block programmatically?](#can-we-invoke-a-static-initialisation-block-programmatically)
        1. [When and how many times is the static initialisation block invoked?](#when-and-how-many-times-is-the-static-initialisation-block-invoked)
        1. [What happens if an exception is thrown from within the static initialisation block?](#what-happens-if-an-exception-is-thrown-from-within-the-static-initialisation-block)
        1. [Can we have more than one static initialisation block?](#can-we-have-more-than-one-static-initialisation-block)
    1. [Initialisation block](#initialisation-block)
        1. [When is the initialisation block invoked?](#when-is-the-initialisation-block-invoked)
        1. [What is double brace initialization?](#what-is-double-brace-initialization)
    1. [Top level class](#top-level-class)
    1. [Inner instance class](#inner-instance-class)
        1. [How can inner instance classes represent data in a different form?](#how-can-inner-instance-classes-represent-data-in-a-different-form)
        1. [Internal Types](#internal-types)
        1. [Why is the use of inner instance class discouraged?](#why-is-the-use-of-inner-instance-class-discouraged)
        1. [Can we have static methods within inner instance classes?](#can-we-have-static-methods-within-inner-instance-classes)
        1. [Can we create an instance of an inner instance class from outside the enclosing class?](#can-we-create-an-instance-of-an-inner-instance-class-from-outside-the-enclosing-class)
    1. [Inner static class](#inner-static-class)
        1. [What's the difference between inner instance classes and inner static classes?](#whats-the-difference-between-inner-instance-classes-and-inner-static-classes)
    1. [Inner anonymous class](#inner-anonymous-class)
    1. [Local class](#local-class)
    1. [JEP 360: Sealed Classes (Preview)](#jep-360-sealed-classes-preview)
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

#### What are the differences between lambda functions and inner anonymous classes?

While the two approaches shown in the previous section display the same thing, these are quite different.

1. Lambda functions are not bound to a class file
1. Lambda functions do not have access to `this` or `super` and cannot invoke inherited functions.

Consider the following source files.

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

The above will print the following.

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

Different from a normal Java class files, produced by the Java compiler during the compilation time, lambda classes are created by the Java runtime environment at runtime using the bytecode produced during compile time.  The lambda classes are sometimes referred to as *lambda runtime classes*.  When the lambda is encounter for the first time, the Java runtime will create the *lambda runtime class*.  Note that the lambda is only created once, when it is first encountered and not every time it is executed.  Note that lambda functions are compiled into bytecode at compile time while its respective class is created at runtime.

The lambda function does not have access to `this` or `super` and all methods invoked will appear as if these where invoked from within the enclosing method or class.

"_Unlike code appearing in anonymous class declarations, the meaning of names and the `this` and `super` keywords appearing in a lambda body, along with the accessibility of referenced declarations, are the same as in the surrounding context (except that lambda parameters introduce new names)._"<br/>
([JLS 15.27.2](https://docs.oracle.com/javase/specs/jls/se14/html/jls-15.html#jls-15.27.2))

Consider the following example.

```java
package demo;

public class App {

  private void workWithLambda() {
    final Runnable lambda = () -> {
      System.out.printf( "Invoke the getClass(): %s%n", getClass() );
    };

    System.out.printf( "Invoke the getClass(): %s%n", lambda.getClass() );
    lambda.run();
  }

  public static void main( final String[] args ) {
    new App().workWithLambda();
  }
}
```

The lambda has to be created within an instance method as we cannot access the `getClass()` or `this.getClass()` from within a static method.  In the above example we are invoking the `getClass()` method from within the lambda function and through the variable.

```bash
Invoke the getClass(): class demo.App$$Lambda$14/0x0000000800b7dc40
Invoke the getClass(): class demo.App
```

Different to what one may have expected, these print a different value.  When invoking the `getClass()` from within the lambda function, we are invoking the `App`'s version of the `getClass()` method.  The Java compiler binds the `getClass()` invocation to the `App` class's `getClass()` method.  When we invoke the `getClass()` through the variable name, we will then obtain the lambda's class.

Now, consider the following version of a similar application, only this time using an inner anonymous class.

```java
package demo;

public class App {

  public static void main( final String[] args ) {
    final Runnable innerAnonymousClass = new Runnable() {
      @Override
      public void run() {
        System.out.printf( "Invoke the getClass(): %s%n", getClass() );
      }
    };

    System.out.printf( "Invoke the getClass(): %s%n", innerAnonymousClass.getClass() );
    innerAnonymousClass.run();
  }
}
```

Different from lambda, inner anonymous classes have access to `this` (`super` and inherit methods). This time, both messages are the same.

```bash
Invoke the getClass(): class demo.App$1
Invoke the getClass(): class demo.App$1
```

Lambda cannot access interface default methods, like inner anonymous classes or other implementations can do.  Consider the following example.

**⚠️ THE FOLLOWING EXAMPLE WILL NOT COMPILE!!**

```java
package demo;

public class App {

  public static void main( final String[] args ) {
    final PlayingWithLambda lambda = () -> {
      hello( "from lambda" );
    };
    lambda.run();
  }
}

@FunctionalInterface
interface PlayingWithLambda {

  void run();

  default void hello( String name ) {
    System.out.printf( "Hello %s%n", name );
  }
}
```

The above will not compile as there is no static method named `hello()` that takes one `String` parameter accessible to the `main()` method.

```bash
src/main/java/demo/App.java:7: error: cannot find symbol
      hello( "from lambda" );
      ^
  symbol:   method hello(String)
  location: class App
1 error
```

Converting the example to make use of inner anonymous class instead, will work.

```java
package demo;

public class App {

  public static void main( final String[] args ) {
    final PlayingWithLambda innerAnonymousClass = new PlayingWithLambda() {
      @Override
      public void run() {
        hello( "from inner anonymous class" );
      }
    };
    innerAnonymousClass.run();
  }
}

@FunctionalInterface
interface PlayingWithLambda {

  void run();

  default void hello( String name ) {
    System.out.printf( "Hello %s%n", name );
  }
}
```

The above will print, as expected.

```bash
Hello from inner anonymous class
```

While we can use lambda instead of functional interfaces, it is important to note that these two differ and you cannot do whatever you are able to do with inner anonymous classes.

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

### Can we use an interface just to define constants?

Consider the following interfaces.

```java
package demo;

import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.time.ZoneOffset;
import java.util.Currency;
import java.util.Locale;

public interface Constants {

  Locale LOCALE = Locale.GERMANY;

  Charset CHARSET = StandardCharsets.UTF_8;

  ZoneOffset ZONE_OFFSET = ZoneOffset.UTC;

  Currency CURRENCY = Currency.getInstance( "EUR" );
}
```

The above interface defines all constants used by an application.  This is discouraged as we created that can be extended and implemented.  The `Constants` interface is not a type that should be implemented or extended by other types.  We never wanted for our constants to be a type that can form part of a type hierarchy.  It simply exists as a central place where all constants are defined.  We have no means to prevent the interface from being implemented by a class or an enum or extended by another interface.

[Effective Java](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/) talks about this too in [Item 22: Use interfaces only to define types](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/ch4.xhtml#lev22).  Prefer classes to define constants as shown next instead.

```java
package demo;

import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.time.ZoneOffset;
import java.util.Currency;
import java.util.Locale;

public final class Constants {

  public static final Locale LOCALE = Locale.GERMANY;

  public static final Charset CHARSET = StandardCharsets.UTF_8;

  public static final ZoneOffset ZONE_OFFSET = ZoneOffset.UTC;

  public static final Currency CURRENCY = Currency.getInstance( "EUR" );

  private Constants() { }
}
```

The above approach has the following advantages when compared the interface version.

1.  We cannot extend the `Constants` class as this is final.  Furthermore, the `Constants` class does not define any visible constructors which will also prohibits this class to be extended by other classes.
1. We cannot initialise this `Contacts` class as its sole constructor is `private`.

There are no disadvantages in using the class version of our example.

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

The above example meets the requirements but does not make use of good programming practices.  A better approach is to make use of [polymorphism](https://en.wikipedia.org/wiki/Polymorphism_(computer_science)), discussed next.

### Is there a better approach than relying on `instanceof` and type cast operators (polymorphism)?

Instead of relying on type casting, we can take advantage of polymorphism.  Consider the following version of the `Pet` class.

```java
package demo;

public abstract class Pet {

    abstract void doIt();
}
```

The `Pet` class defined an abstract method, named `doIt()`.  All subtypes need to override this method and provide a concrete implementation.

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

Different from before, all subtypes of the `Pet` class have their own implementation of the `doIt()` method.

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

Yes, `null` can be type casted to any object ([JLS-5.5](https://docs.oracle.com/javase/specs/jls/se14/html/jls-5.html#jls-5.5)).  We already saw something similar when answering the question [can one constructor call another constructor in the same class?](04%20-%20Classes,%20Methods%20and%20Objects.md#can-one-constructor-call-another-constructor-in-the-same-class).

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

**What will happen if the value being type casted does not fit?  What happens if the value we are casting is out of the `byte` range?**

Consider the following example.

```java
package demo;

public class App {
  public static void main( final String[] args ) {
    final byte a = (byte) 130.33;
    System.out.printf( "The value of a is: %d%n", a );
  }
}
```

The literal `double` value `130.33` is outside the `byte` range (between `-128` and `127` both inclusive).  When this happens, Java will overflow and continue counting to the negative side as shown next.


```bash
The value of a is: -126
```

**Why -126?**

The maximum byte value is `127` ([`Byte.MAX_VALUE`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/lang/Byte.html#MAX_VALUE)), `3` less than our value, `130` (ignoring the decimal points).

| Add *x* to `Byte.MAX_VALUE` | Result |
|----------------------------:|-------:|
|                         `1` | `-128` |
|                         `2` | `-127` |
|                         `3` | `-126` |

We can try this in [JShell](02%20-%20Java%20Light.md#jshell).

```java
jshell> (byte) (127 + 3)
$1 ==> -126
```

Furthermore, the decimal point information is lost during the type casting as integers do not have decimal points.  Changing the number from `130.33` to `130.999_999_999` will make no difference.

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

### JEP 305: Pattern Matching for `instanceof` (Preview)

The `instanceof` operator is currently being improved ([JEP 305]( https://openjdk.java.net/jeps/305) and [JEP 375]( https://openjdk.java.net/jeps/375)).  Consider the following example.

```java
package demo;

public class App {

  public static void main( final String[] args ) {
    final Object a = "My String";

    if ( a instanceof String ) {
      final String s = (String) a;
      System.out.printf( "The string %s is %d Unicode code units long%n", s, s.length() );
    }
  }
}
```

In most, the cases the `instanceof` operator is followed by a cast as shown above example.  The `instanceof` operator is being improved a shown next.

```java
package demo;

public class App {

  public static void main( final String[] args ) {
    final Object a = "My String";

    if ( a instanceof String s ) {
      System.out.printf( "The string %s is %d Unicode code units long%n", s, s.length() );
    }
  }
}
```

The above example shows how the `instanceof` and cast can be combined in one statement.

```java
if ( a instanceof String s ) {
```

Note that variable `s` shown above is `final` and thus cannot be modified.

Since Java 12, Java started including preview features.  This enables Oracle to collect feedback about future features from the general public without committing anything.  The preview features can be modified in newer releases.  This new feature is in preview and not available by default.  You may need to change the *Project language level* (`[command] + [;]`) to also include preview features, as shown next.

![JDK 14 Preview](assets/images/JDK%2014%20Preview.png)

Building the application may fail too as we need to tell the Java compiler that we want to enable the preview features.

```bash
$ ./gradlew build

> Task :compileJava FAILED
src/main/java/demo/App.java:8: error: pattern matching in instanceof is a preview feature and is disabled by default.
    if ( a instanceof String s ) {
                             ^
  (use --enable-preview to enable pattern matching in instanceof)
1 error
```

We can enable the preview features by updating the `gradle.build` file as shown next.

```groovy
test {
  useJUnitPlatform()
  testLogging {
    events = ['FAILED', 'PASSED', 'SKIPPED', 'STANDARD_OUT']
  }

  jvmArgs(['--enable-preview'])
}

tasks.withType(JavaCompile).each {
  it.options.compilerArgs.add('--enable-preview')
}
```

Running the application may produce a similar error as we need to tell the Java runtime to enable the preview features.

```bash
$ java -jar build/libs/examples-all.jar
Error: LinkageError occurred while loading main class demo.App
	java.lang.UnsupportedClassVersionError: Preview features are not enabled for demo/App (class file version 58.65535). Try running with '--enable-preview'
```

We can enable the preview features by passing the `--enable-preview` flag to the Java runtime environment as shown next.

```bash
$ java --enable-preview -jar build/libs/examples-all.jar
```

Kindly note that preview features may change between releases, thus think twice before investing heavily in them.  When the next Java version is released, support for the preview language level may be dropped.

## Inheritance and composition

### What is composition?

The word composition comes from Latin, [*compositio*](https://en.wiktionary.org/wiki/compositio), which means "*to put together*".

In software, composition is the ability of creating new, possibly more elaborate, classes by putting together other, possibly simpler, classes.  We have been using composition throughout the boot camp, without knowing.  Take for example the following `Person` class.

```java
package demo;

public class Person {

  private final String name;
  private final int age;

  public Person( final String name, final int age ) { /* ... */ }

  @Override
  public String toString() { /* ... */ }
}
```

The `Person` **has a** `name` and **has an** `age`.  The `Person` class is composed from a `String` and an `int`.  Note that an emphasis was made on the **has a** phrase.  In the [inheritance section](04%20-%20Classes,%20Methods%20and%20Objects.md#inheritance), we use the phrase **is a** instead.  For example, a `LightBox` **is a** `Box`.  The following image shows the difference between inheritance and composition.

![Inheritance and composition](assets/images/Inheritance%20and%20composition.png)

### Why is there a big push in favour of composition over inheritance?

[Effective Java](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/) talks about this in great depth in [Item 18: Favor composition over inheritance](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/ch4.xhtml#lev18).

When a class inherits from another class, the subclass will inherit all methods that the parent class has.  Consider the [stack data structure](https://en.wikibooks.org/wiki/Data_Structures/Stacks_and_Queues#Stacks) shown next.

![Stack Data Structure](assets/images/Stack%20Data%20Structure.png)

A stack is a data structure that follows the [Last-In-First-Out](https://en.wikipedia.org/wiki/FIFO_and_LIFO_accounting#LIFO) rule.  A stack data structure, similar to a stack of dishes (or plates).  We can put dishes to the top of the stack, we can only task dishes from the top and we cannot see below the top dish.

![Stack of plates](assets/images/Stack%20of%20plates.png)

We can interact with a stack using any of the following three functionalities.

1. **push** where an item is added to the top of the stack
1. **pop** where the last added item is removed from the stack and returned to the caller
1. **peek** (also referred to *top*) where we can view what's on the top of the stack without removing it

We can create a stack data structure by extending another collection class, such as the [`Vector`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/Vector.html) class.  That's what the Java API did in the past with the [`Stack`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/Stack.html) class.  The `Stack` class inherits all methods defines by the `Vector` class, **which is incorrect**.  A stack data structure **MUST** only provides three methods and definitely **MUST not** break the Last-In-First-Out rule.

Consider the following example.

```java
package demo;

import java.util.Stack;

public class App {

  public static void main( final String[] args ) {
    final Stack<String> stack = new Stack<>();
    stack.push( "1" );
    stack.push( "2" );
    stack.push( "3" );

    /* This is not a method supported by the stack class */
    stack.add( 0, "Squeeze me in" );

    System.out.printf( "Stack: %s%n", stack );
  }
}
```

The above example was able to violate the Last-In-First-Out rule as we were able to squeeze an item at the bottom of the stack.

```bash
Stack: [Squeeze me in, 1, 2, 3]
```

This breaks our stack class as we are able to make it behave in a way it was not expected to behave.  This example of *inheritance breaks encapsulation* as we are able to put the object in an invalid state.  Here we broke the "*all stacks are vectors*" rule.  A vector is a data structure that allows random access to elements, while stack only allows the consumer to interact with the topmost item of the stack.

An alternative approach would be to use composition instead of inheritance, as shown next.

```java
package demo;

import java.util.Objects;
import java.util.Vector;
import java.util.function.IntFunction;

public class Stack<T> {

  private final Vector<T> vector = new Vector<>();

  public void push( final T item ) {
    vector.add( item );
  }

  public T pop() {
    return withLast( vector::remove );
  }

  public T peek() {
    return withLast( vector::get );
  }

  private T withLast( final IntFunction<T> handler ) {
    final int size = vector.size();
    return size == 0 ? null : handler.apply( size - 1 );
  }

  @Override
  public boolean equals( final Object object ) {
    if ( this == object ) {
      return true;
    }

    if ( !( object instanceof Stack ) ) {
      return false;
    }

    final Stack<?> stack = (Stack<?>) object;
    return Objects.equals( vector, stack.vector );
  }

  @Override
  public int hashCode() {
    return Objects.hash( vector );
  }

  @Override
  public String toString() {
    return vector.toString();
  }
}
```

Our version of the stack uses the same `Vector` as a backing data structure (composition).  We are actually storing the `Stack` items within the `Vector`, but we are shielding the `vector` property and we are not exposing it to the outside word.

A side note above the above example.

* The `withLast()` method makes use of lambda function and behaviour parameterization, as we are passing behaviour as a parameter.

    ```java
      private T withLast( final IntFunction<T> handler ) {
        final int size = vector.size();
        return size == 0 ? null : handler.apply( size - 1 );
      }
    ```

    The `withLast()` checks if the vector is empty, in which case returns `null`.  Otherwise, it provides the given function the last index and expected an object in return.

    The `peek()` method returns the element at the last position using the `Vector`'s `get()` method as shown next.

    ```java
      public T peek() {
        return withLast( vector::get );
      }
    ```

    While the `pop()` method uses the `remove()` method to remove the element at the given index.

    ```java
      public T pop() {
        return withLast( vector::remove );
      }
    ```

The new version of the `Stack` class takes advantage of encapsulation as the outside world does not know about the `Vector` class and cannot bypass our `Stack` as we did before.  We cannot invoke any method defined by the `Vector` class as our `vector` property is `private` and is never returned by our `Stack` class.

```java
package demo;

public class App {

  public static void main( final String[] args ) {
    final Stack<String> stack = new Stack<>();
    stack.push( "1" );
    stack.push( "2" );
    stack.push( "3" );

    /* This is not a method supported by our stack class */
    // stack.add( 0, "Squeeze me in" );

    System.out.printf( "Stack: %s%n", stack );
  }
}
```

We cannot invoke the [Vector's add()](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/Vector.html#add(int,E)) method as we did before.  We can only interact with our new `Stack` using the methods available.

![Stack methods when using composition](assets/images/Stack%20methods%20when%20using%20composition.png)

One of the advantages of inheritance is that we can reuse existing code.  We agree that composition reuses existing code, without creating a tight coupling between the parent class and its subtypes.  Adding new methods to the `Vector` class, will not impact our `Stack` class.  If we inherit from the `Vector` instead, adding new methods to the `Vector` class will automatically make these methods available to all the vector's children.

Another advantage of composition is that we can swap our backing collection, `Vector`, with a different one, such as [`LinkedList`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/LinkedList.html), without changing its consumers.

```java
package demo;

import java.util.LinkedList;
import java.util.Objects;

public class Stack<T> {

  private final LinkedList<T> linkedList = new LinkedList<>();

  public void push( final T item ) {
    linkedList.addLast( item );
  }

  public T pop() {
    return linkedList.removeLast();
  }

  public T peek() {
    return linkedList.getLast();
  }

  @Override
  public boolean equals( final Object object ) {
    if ( this == object ) {
      return true;
    }

    if ( !( object instanceof Stack ) ) {
      return false;
    }

    final Stack<?> stack = (Stack<?>) object;
    return Objects.equals( linkedList, stack.linkedList );
  }

  @Override
  public int hashCode() {
    return Objects.hash( linkedList );
  }

  @Override
  public String toString() {
    return linkedList.toString();
  }
}
```

Our `Stack` class did not gain or lose methods by swapping the backing collection from `Vector` to `LinkedList`.  This gives us the ability to use a better implementation when one becomes available.

### What are the disadvantages of composition?

Following are two distinctions between inheritance and composition.

1. [**Liskov substitution principle**](https://en.wikipedia.org/wiki/Liskov_substitution_principle): Composition does not adhere to the Liskov substitution principle.  In our version of the stack, we **cannot** use our `demo.Stack` wherever a `java.util.Vector` is required.  Our `demo.Stack` is not a `java.util.Vector`.

1. **Inheritance**: With inheritance, the subtypes will inherit all of their parent's methods without the subtypes needing to do anything.  If a new method is added to the parent, this becomes automatically available to all subtypes.

Personally, I do not see these two as disadvantages.  Inheritance and compositions are different tools.  Composition is used to enrich our classes with properties, such as the `vector` within the `demo.Stack` class.  There are cases where we need to use inheritance too and, in most cases, we will use both.

Say that our application has two types of coins, *gold coins* and *silver coins*.  Our application should not allow other types of coins.  Consider the following example.

```java
package demo;

public class Coin {

  private final int quantity;

  private Coin( final int quantity ) {
    this.quantity = quantity;
  }

  public static class GoldCoin extends Coin {
    public GoldCoin( final int quantity ) {
      super( quantity );
    }
  }

  public static class SilverCoin extends Coin {
    public SilverCoin( final int quantity ) {
      super( quantity );
    }
  }
}
```

Given the both the gold and silver coins are coins, we cannot go without inheritance.  Also, we need to prohibit new types of coins, therefore we cannot use interfaces as we have no means to prevent an interface from being implemented.  The `Coin` class itself makes us of composition as it contains properties.

## Overloading, overriding, and hiding

### Overriding

Overriding is the ability for a subclass to replace a method defined in its parent (or ancestors) class or interfaces it implements and provide a more suitable implementation of this method.  Consider the following image.

![Method Overriding](assets/images/Method%20Overriding.png)

The above image shows 4 types.
1. class `A` defines two methods, `pink()` and `yellow()`
1. class `B` extends class `A` and overrides method `yellow()`
1. interface `X` defines a method, `cyan()`
1. class `C` extends class `B` and implements interface `X` and overrides two methods, `pink()` and `cyan()`

**How does this work?**

All objects in Java can be printed to the console or logs files, for example.  Consider the following class.

```java
package demo;

public class Person {

  private final String name;

  public Person( final String name ) {
    this.name = name;
  }
}
```

We can create an instance of our class and print it as shown next.

```java
package demo;

public class App {

  public static void main( final String[] args ) {
    final Person a = new Person( "Aden" );
    System.out.println( a );
  }
}
```

The above will print the following, meaningless text.

```
demo.Person@6ce253f1
```

The above text comes from the `Object` class.

```java
package java.lang;

public class Object {

  public String toString() {
    return getClass().getName() + "@" + Integer.toHexString(hashCode());
  }

  /* Other methods removed for brevity */
}
```

The `Object` class defines a method called `toString()` that is used to convert any object to a `String`.

Any subclass can override a method defined in its parent class and provide a more appropriate version of the method.

```java
package demo;

public class Person {

  private final String name;

  public Person( final String name ) {
    this.name = name;
  }

  @Override
  public String toString() {
    return String.format( "Person{name=%s}", name );
  }
}
```

The `Person` class overrode the `toString()` method defined in its parent class, `Object`.  Now, our version of the `toString()` method is used when our object is printed to console.

```bash
Person{name=Aden}
```

#### Do we need to use the `@Override` annotation?

Java supported inheritance and method overloading since its early days, way before annotations were introduced.  Annotations, such as the [`@Override`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/lang/Override.html), were only added in [Java 1.5](https://docs.oracle.com/javase/1.5.0/docs/relnotes/features.html#annotations).  The `@Override` annotation is optional, **but very much recommended**.  This ensures that the method defined in the subclass is really overriding the method in its parent class.

```java
package demo;

public class Person {

  private final String name;

  public Person( final String name ) {
    this.name = name;
  }

  public String tostring() {
    return String.format( "Person{name=%s}", name );
  }
}
```

On purpose, the method `tostring()` is all written in lowercase.  A programmer may think that this method is overriding the method in the parent class, when in reality it is not.  The compiler cannot not help us here as there is no way to tell what the programmer intended to do.

```java
package demo;

public class App {

  public static void main( final String[] args ) {
    final Person a = new Person( "Aden" );
    System.out.println( a );
  }
}
```

The above will print and will not invoke our method.

```bash
demo.Person@6ce253f1
```

Using the `@Override` annotation, we can communicate our intention to the compiler, which can then check and make sure that our method is really overriding a method in the parent class.

**⚠️ THE FOLLOWING EXAMPLE WILL NOT COMPILE!!**

```java
package demo;

public class Person {

  private final String name;

  public Person( final String name ) { /* ... */ }

  @Override
  public String tostring() {
    return String.format( "Person{name=%s}", name );
  }
}
```

The above class will not compile and will produce the following error.

```bash
src/main/java/demo/Person.java:11: error: method does not override or implement a method from a supertype
  @Override
  ^
```

While the use of `@Override` is optional, it is highly recommended to use it whenever a method is being overridden.  [Effective Java](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/) talks about this in [Item 40: Consistently use the Override annotation](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/ch6.xhtml#lev40).  This communicates our intentions to the compiler and to other programmers.

#### Can we use the `@Override` annotation when overriding methods defined by an interface?

Yes, the `@Override` annotation can be used to indicate that you are overriding a method irrespective from where this was defined.  This was not always the case.  In Java 1.5, when annotations were introduced, we were not able to use `@Override` to indicate that we are overriding a method defined in an interface.

Consider the following interface.

```java
package demo;

public interface HasName {

  String getName();
}
```

In Java 1.5 we could not use the `@Override` to indicate that we are overriding this method.

**⚠️ THE FOLLOWING EXAMPLE WILL NOT COMPILE WITH VERSIONS OF JAVA PRIOR TO JAVA 1.6!!**

```java
package demo;

public class Person implements HasName {

  private final String name;

  public Person( final String name ) {
    this.name = name;
  }

  @Override
  public String getName() {
    return name;
  }
}
```

This was updated in Java 1.6 and the `@Override` annotation can now be used to mark all kinds of overriding.

#### Can we override a private method?

**No**.  A `private` method cannot be overridden.  Consider the following example.

```java
package demo;

public class Person {

  private final String name;

  public Person( final String name ) { /* ... */ }

  private String getSecret() {
    return "a person's secret";
  }

  @Override
  public String toString() {
    return String.format( "Person{name=%s, secret=%s}", name, getSecret() );
  }

  static class VeryImportantPerson extends Person {

    public VeryImportantPerson( final String name ) { /* ... */ }

    public String getSecret() {
      return "a very important person's secret";
    }
  }
}
```

The inner class `VeryImportantPerson` has access to the `Person`'s `getSecret()` method as both belong to the same class, but still cannot override this method.  This is not an issue of visibility.  Adding the `@Override` annotation will introduce a syntax error and the code will not compile.

#### Can we change the visibility of an overridden method?

An overridden method can be more visible than the one defined in the parent class.  Consider the following example.

```java
package demo;

public class Plant {

  protected void photosynthesize() {
    System.out.println( "Convert light energy into chemical energy" );
  }
}
```

The `Plant` class shown above has one `protected` method, `photosynthesize()`, which means that the method is only visible to its children or other classes within its package.

A child class, such as the `GreenAlgae` class shown next, can override this method and make it `public`.

```java
package demo;

public class GreenAlgae extends Plant {

  @Override
  public void photosynthesize() {
    super.photosynthesize();
  }
}
```

Note, we cannot reduce the visibility of a method.  For example, if a method is defined `public` in a parent class, a subclass cannot override it and make it `protected`, *package-private* or `private`.  Consider the following example.

**⚠️ THE FOLLOWING EXAMPLE WILL NOT COMPILE!!**

```java
package demo;

public class FicusLyrata extends Plant {

  @Override
  void photosynthesize() {
    super.photosynthesize();
  }
}
```

The `FicusLyrata` reduced the visibility of the `photosynthesize()` from `protected` to *package-private*.

Note that all methods defined by an interface, such as the [`compareTo()` method](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/lang/Comparable.html#compareTo(T)) defined in the [`Comparable` interface](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/lang/Comparable.html) are `public`.  All overridden methods must be public too.

#### Can a parent class prevent a method from being overridden?

**Yes**.  A class can determine what methods can be overridden by its subtypes or not using the `final` keyword.  Adding the `final` keyword to a method signature, will prevent this method from being overridden as shown next.

```java
package demo;

public class Plant {

  protected final void photosynthesize() {
    System.out.println( "Convert light energy into chemical energy" );
  }
}
```

The `Plant` class, shown above, has its `photosynthesize()` method marked as `final`.  This means that while its subtypes can invoke this method, the subtypes cannot override it.  This ensures that while a method is visible to others, the method cannot be replaced.

The `final` keyword can be used with `public`, `protected` and *package-private* methods.  While the `final` keyword can be used with `private` methods, this has no effect as `private` methods cannot be overridden.

Needless to say, `abstract` methods cannot be marked `final`.

#### Can we return something different when overriding methods?

A subtype can override a method and return something more specific to what its parent class.   Consider the following interface.

```java
package demo;

public interface Toy {
}
```

A machine can be used to produce toys as shown next.

```java
package demo;

public interface ToyMachine {

  Toy manufacture();
}
```

The `manufacture()` method defined in the `ToyMachine` interface shown above returns a `Toy`.  Consider the following toy.

```java
package demo;

public class BabyDolls implements Toy {

  private final String name;

  public BabyDolls( final String name ) {
    this.name = name;
  }

  @Override
  public String toString() {
    return String.format( "BabyDolls{name=%s}", name );
  }
}
```

The class `BabyDolls` is a subtype of `Toy`.  A machine that produces `BabyDolls` can return this type instead as shown next.

```java
package demo;

public class BabyDollsMachine implements ToyMachine {

  private final String name;

  public BabyDollsMachine( final String name ) {
    this.name = name;
  }

  @Override
  public BabyDolls manufacture() {
    return new BabyDolls( name );
  }
}
```

The above is valid as the overridden method is returning something more specific.  With that said, the `ToyMachine` returns `Toy`.  Consider the following example.

```java
package demo;

public class App {

  public static void main( final String[] args ) {
    produce( new BabyDollsMachine( "Baby Twins Dolls" ) );
  }

  private static void produce( final ToyMachine machine ) {
    final Toy toy = machine.manufacture();
    System.out.println( toy );
  }
}
```

Even though we only have one implementation, an object of type `ToyMachine` will return an object of type `Toy`.

```java
final Toy toy = machine.manufacture();
```

#### Can we override static methods?

**No**.  Static methods belong to classes and do not participate in inheritance or any other object oriented ceremonies.  Using the `@Override` annotation with a static method will always produce a compiler error.

The answer is quite simple but can create confusion.  Consider the following classes.

1. A generic class representing plants

    ```java
    package demo;

    public class Plant {
      public static String describe() {
        return "Plants are green";
      }

      @Override
      public String toString() {
        return describe();
      }
    }
    ```

1. A specific class representing the [beet plant](https://en.wikipedia.org/wiki/Beetroot)

    ```java
    package demo;

    public class BeetPlant extends Plant {
      public static String describe() {
        return "Beets are red";
      }

      @Override
      public String toString() {
        return describe();
      }
    }
    ```

These classes may seem innocent.  Both the classes have a `describe()` method that **is static** and the `toString()` simply returns what the `describe()` method returns.  Now consider the following example.

**⚠️ NOT RECOMMENDED.  DO NOT INVOKE A STATIC METHOD THROUGH A VARIABLE NAME!!**

```java
package demo;

public class App {

  public static void main( final String[] args ) {
    final Plant a = new BeetPlant();

    System.out.println( a.describe() );
    System.out.println( a );
  }
}
```

The type of variable `a` is `Plant`, but this is pointing to an object of type `BeetPlant`.  Given that the `toString()` method returns whatever the `describe()` method returns, one may wrongly assume that the above will print the same thing twice.

```bash
Plants are green
Beets are red
```

Static methods do not participate in object-oriented ceremonies can mislead programmers.

1. Avoid invoking static methods from variable names.
1. Be careful when invoking static methods from within instance methods as these do not behave polymorphically.

### Overloading

Overloading ([JLS 8.4.9](https://docs.oracle.com/javase/specs/jls/se14/html/jls-8.html#jls-8.4.9)) is the ability to have more than one method with the same name but with different parameters.  Consider the following example.

```java
package demo;

public class App {

  public static void main( final String[] args ) {
    printSquare( 12.3 );
    printSquare( 4 );
    printSquare( 5L );
  }

  private static void printSquare( final double number ) {
    System.out.printf( "The square of (double) %.2f is %.2f%n", number, number * number );
  }

  private static void printSquare( final int number ) {
    System.out.printf( "The square of (int) %d is %d%n", number, number * number );
  }

  private static void printSquare( final long number ) {
    System.out.printf( "The square of (long) %d is %d%n", number, number * number );
  }
}
```

The `square()` method is defined thrice in the `App` class, using different parameter.

```bash
The square of (double) 12,30 is 151,29
The square of (int) 4 is 16
The square of (long) 5 is 25
```

The Java compiler is able to tell apart these methods from their parameters.  If the `square()` method is invoked with `float` or `double`, the Java compiler will use the `square()` method that takes a `double`.

The following table shows how Java would match the above method when invoked with different, matching, types.

| Parameter Type | Method Used      |
|----------------|------------------|
| `byte`         | `square(int)`    |
| `short`        | `square(int)`    |
| `char`         | `square(int)`    |
| `int`          | `square(int)`    |
| `long`         | `square(long)`   |
| `float`        | `square(double)` |
| `double`       | `square(double)` |

Java will find the closest method matching the given parameters.  **The choice of which overloaded method to invoke is made at compile time**.

#### Does Java support return-type-based method overloading?

**No**.  Java does not support return-type-based method overloading.  The Java compiler cannot determine which method to use by observing the return type.  This means that a class cannot have two methods that differ only by their return type.  Consider the following example.

**⚠️ THE FOLLOWING EXAMPLE WILL NOT COMPILE!!**

```java
package demo;

import java.util.Random;

public class App {

  public static void main( final String[] args ) {
    printSquare( random() );
  }

  private static double random() {
    return RANDOM.nextDouble();
  }

  private static int random() {
    return RANDOM.nextInt();
  }

  private static void printSquare( final double number ) {
    System.out.printf( "The square of (double) %.2f is %.2f%n", number, number * number );
  }

  private static void printSquare( final int number ) {
    System.out.printf( "The square of (int) %d is %d%n", number, number * number );
  }

  private static final Random RANDOM = new Random();
}
```

Let say that, for the sake of this example, the above code compiles.  We have two `random()` and two `printSquare()` methods.  Which pair are we going to use in the above example?  Is it the `int` pair or the `double` pair?  Java has no way to answer this question.

It is not an accident that the `Random` class does not overload the `next()` method and instead it uses methods with different names, such as `nextInt()`, `nextDouble()` and the like.

#### Can we overload instance methods?

Yes.  Instance methods can be overloaded in the same manner as static methods are overloaded.

Note that instance methods can be overridden too and thus an overridden method may be invoked at runtime.

#### What are the benefits of using method overloading?

Overloading simplifies method naming.  Say that we have a set of methods that do the same thing, such as print numbers, objects, arrays and the like.  Consider the following example.

```java
package demo;

import java.util.Arrays;

public class App {

  public static void main( final String[] args ) {
    printlnInt( 1 );
    printlnDouble( 2.3 );
    printlnIntArray( new int[] { 4, 5, 6, 7, 8 } );
  }

  private static void printlnInt( int a ) {
    System.out.println( a );
  }

  private static void printlnDouble( double a ) {
    System.out.println( a );
  }

  private static void printlnIntArray( int[] a ) {
    System.out.println( Arrays.toString( a ) );
  }
}
```

All the `printlnXyz()`methods are all doing the same thing.  Instead of creating a unique name for each method, we can use a common name, such as `println`, and overload this method with new types.

#### When should we use method overloading and when should we avoid it?

Use overloading when the methods are doing the same thing and need to accommodate different input and avoid overloading when the methods are doing different things.  Try not to use overloading as a means of implementing polymorphism.

Technically, method overloading provides no benefits to the language.  Java can do without method overloading and we would not lose anything.

In some cases, method overloading gets us in trouble too.  The `remove()` method within the [`List`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/List.html) class is overloaded.  We have two variants of this method

1. [`remove(int)`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/List.html#remove(int)) removes an item at the given location
1. [`remove(T)`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/List.html#remove(java.lang.Object)) removes the first item that is equal to the given object

This worked well until [Java 1.5 introduced autoboxing](https://docs.oracle.com/javase/1.5.0/docs/relnotes/features.html#boxing).  Consider the following code example.

```java
package demo;

import java.util.ArrayList;
import java.util.List;

public class App {

  public static void main( final String[] args ) {
    final List<Integer> numbers = new ArrayList<>();
    numbers.add( 1 );
    numbers.add( 2 );
    numbers.add( 3 );

    numbers.remove( 2 );

    System.out.println( numbers );
  }
}
```

The above example adds three numbers and then removes one.  Which `remove()` method will be used?  Autoboxing allows us to use the primitive `int` where the wrapper equivalent is present.  This means that both methods will do.  In the example shown above, the `remove()` method that removes an item at a given index is used as that's the closest match.

In the above example, the `remove()` methods are removing items using different strategies.  Having the strategy part of the name would make this more meaningful without losing anything.  Following are some alternative names.

1. `removeAt(int)`
1. `removeFirstEquale(T)`

By just reading the method name, we know what will happen and we do not have to worry about using the wrong method.

[Effective Java](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/) talks about this too in [Item 52: Use overloading judiciously](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/ch8.xhtml#lev52).

### Hiding

Hiding is the ability for a subtype to hide properties defined in the superclass.

I am not a fan of property hiding and I still have to find a good example where this is useful.  The scope of this section is to introduce the concept only.

Consider the following example.

```java
package demo;

public class Point {
  int x = 0, y = 0;
  String colour;

  public void moveBy( int dx, int dy ) {
    x += dx;
    y += dy;
  }

  @Override
  public String toString() {
    return String.format( "Point{x=%d, y=%d, colour=%s}", x, y, colour );
  }
}
```

The `Point` class defined above has three properties.  Now consider the following subtype.

```java
package demo;

public class RealPoint extends Point {
  float x = 0.0f, y = 0.0f;

  @Override
  public void moveBy( int dx, int dy ) {
    moveBy( (float) dx, (float) dy );
  }

  public void moveBy( float dx, float dy ) {
    x += dx;
    y += dy;
  }

  @Override
  public String toString() {
    return String.format( "RealPoint{x=%.2f, y=%.2f, colour=%s}", x, y, colour );
  }
}
```

The `RealPoint` class hides the `x` and `y` properties defined in the parent class, `Point`, with new ones of different type.  The `colour` property was not hidden in this example.

```java
package demo;

public class App {

  public static void main( final String[] args ) {
    final RealPoint a = new RealPoint();
    a.moveBy( 2.5F, 3.5F );
    a.colour = "Blue";

    System.out.println( a );
  }
}
```

The above example prints.

```bash
RealPoint{x=2,50, y=3,50, colour=Blue}
```

This is not a common practice and one should use it with caution.  The above example breaks the "*all children are parent*" as `RealPoint`s and not `Point`s.

## Initialisation blocks, outer, inner and anonymous classes

**🚧 Pending...**

### Static initialisation block

We use constructors to initialise the object's properties.  How can we initialise static fields?  Consider the following example.

```java
package demo;

import java.util.Random;

public class App {

  private static final int SECRET_NUMBER;

  static {
    final Random random = new Random();
    SECRET_NUMBER = random.nextInt( 10 );
  }

  public static void main( final String[] args ) {
    System.out.printf("The secret number is %d%n", SECRET_NUMBER);
  }
}
```

The above example makes use of *static initialisation block* to initialise the `SECRET_NUMBER` to a random number.  An instance of `Random` class is created and used to generate a random number.  The instance of the `Random` is not available outside the static initialisation block and will be garbage collected at a later stage.  The above will print.

```bash
The secret number is 7
```

The static initialisation blocks are not very commonly used and other approaches are usually preferred, such as the following example.

```java
package demo;

import java.util.Random;

public class App {

  private static final int SECRET_NUMBER = generateSecretNumber();

  private static int generateSecretNumber() {
    final Random random = new Random();
    return random.nextInt( 10 );
  }

  public static void main( final String[] args ) {
    System.out.printf( "The secret number is %d%n", SECRET_NUMBER );
  }
}
```

#### Can we invoke a static initialisation block programmatically?

**No**.  We cannot interact with the static initialisation block as we do with methods.  The static initialisation block is invoked automatically by the Java runtime environment.

I tend to stay away from the static initialisation blocks and prefer the methods instead, unless required.

#### When and how many times is the static initialisation block invoked?

The static initialisation block is executed, **once**, when the class is loaded.  Consider the following example.

```java
package demo;

public class ExecutionOrder {

  static {
    System.out.println( "Initialisation Block" );
  }

  private static final int STATIC_FIELD = initialiseStaticField();

  private static int initialiseStaticField() {
    System.out.println( "Initialise Static Field" );
    return 7;
  }

  public static void printStaticField() {
    System.out.printf( "The static constant field value is %d%n", STATIC_FIELD );
  }
}
```

The above example contains an initialisation block and static field, which is initialised through a static method.  Let's consider several examples and see when the class is actually initialised.

1. Declaring a variable of type `ExecutionOrder` without interacting with the class nor the varialble.

    ```java
    package demo;

    public class App {

      public static void main( final String[] args ) {
        ExecutionOrder a;
        System.out.println( "Done" );
      }
    }
    ```

    The class is not used, thus will not be loaded.  Therefore, the static initialisation block is not invoked.

    ```bash
    Done
    ```

1. Create a method that takes an `ExecutionOrder` as a parameter

    ```java
    package demo;

    public class App {

      public static void main( final String[] args ) {
        doSomething( null );
        System.out.println( "Done" );
      }

      private static void doSomething( ExecutionOrder a ) {
      }
    }
    ```

    The class is not used, thus will not be loaded.

    ```bash
    Done
    ```

1. Invoke the `printStaticField()` method several times

    ```java
    package demo;

    public class App {

      public static void main( final String[] args ) {
        ExecutionOrder.printStaticField();
        ExecutionOrder.printStaticField();
        ExecutionOrder.printStaticField();
        System.out.println( "Done" );
      }
    }
    ```

    This time the class is used as the `printValue()` method is invoked several time.

    ```bash
    Initialisation Block
    Initialise Static Field
    The static constant field value is 7
    The static constant field value is 7
    The static constant field value is 7
    Done
    ```

    Note that the static initialisation block is invoked first followed by the initialising the static fields.  Both of these are invoked once, when the class is loaded.

1. Create instances of type `ExecutionOrder`

    ```java
    package demo;

    public class App {

      public static void main( final String[] args ) {
        new ExecutionOrder();
        new ExecutionOrder();
        new ExecutionOrder();
        System.out.println( "Done" );
      }
    }
    ```

    Same as before, the static initialisation block and the initialising the static fields are invoked once, when the class is loaded.

    ```bash
    Initialisation Block
    Initialise Static Field
    Done
    ```

Alternatively, we can use the JVM flags, such as `-Xlog:class+load=info`, to see what classes are being loaded.

![VM Flags -Xlog-class+load=info](assets/images/VM%20Flags%20-Xlog-class+load=info.png)

This will print all classes that are loaded by the classloader.  You will be surprised by the number of classes loaded just to run a simple program.  The following example truncates all classes, except ours.

```bash
...
[0.143s][info][class,load] demo.App source: file:out/production/classes/
[0.145s][info][class,load] demo.ExecutionOrder source: file:out/production/classes/
Initialisation Block
Initialise Static Field
...
The static constant field value is 7
Done
...
```

#### What happens if an exception is thrown from within the static initialisation block?

If an exception is thrown from within static initialisation block, an [`ExceptionInInitializerError`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/lang/ExceptionInInitializerError.html) is thrown in return.  Note that this is not an [`Exception`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/lang/Exception.html), but an [`Error`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/lang/Error.html).

Consider the following example.

```java
package demo;

public class FaultyStaticInitialisationBlock {

  static {
    if ( true ) {
      throw new RuntimeException( "Faulty static initialisation block" );
    }
  }
}
```

In the above example, we had to trick the compiler using an `if` statement.  Without the `if` statement, the example will not compile.  Consider the following example.

```java
package demo;

public class App {

  public static void main( final String[] args ) {
    new FaultyStaticInitialisationBlock();
  }
}
```

Running the above example will fail with `ExceptionInInitializerError` as shown next.

```bash
Exception in thread "main" java.lang.ExceptionInInitializerError
	at demo.App.main(App.java:6)
Caused by: java.lang.RuntimeException: Faulty static initialisation block
	at demo.FaultyStaticInitialisationBlock.<clinit>(FaultyStaticInitialisationBlock.java:7)
	... 1 more
```

#### Can we have more than one static initialisation block?

Yes.  We can have many static initialisation block.  The static initialisation blocks are executed in the order that they are defined.  Consider the following example.

```java
package demo;

public class MultipleStaticInitialisationBlocks {

  static {
    System.out.println( "First static initialisation block" );
  }

  static {
    System.out.println( "Second static initialisation block" );
  }
}
```

The above class has two static initialisation blocks.

```java
package demo;

public class App {
  public static void main( final String[] args ) {
    new MultipleStaticInitialisationBlocks();
  }
}
```

The initialisation blocks are executed in the order that they are defined.

```bash
First static initialisation block
Second static initialisation block
```

I tend to stay away from static initialisation block and prefer using methods instead.  Note that multiple initialisation block may add to some confusion.  Consider the following class.

```java
package demo;

public class MultipleStaticInitialisationBlocks {

  public static final int STATIC_FINAL_FIELD;
  public static int STATIC_FIELD;

  static {
    STATIC_FINAL_FIELD = 7;
    STATIC_FIELD = 3;
  }

  static {
    STATIC_FIELD = 33;
  }
}
```

The static field, `STATIC_FIELD` is set in both static initialisation block.  The second block will overwrite the values set by the first block as shown next.

```java
package demo;

public class App {
  public static void main( final String[] args ) {
    System.out.println( MultipleStaticInitialisationBlocks.STATIC_FIELD );
  }
}
```

The above program will print

```bash
33
```

### Initialisation block

Java provides several ways to initialise properties within an object.  Consider the following example.

```java
package demo;

import java.util.Random;

public class Person {

  private final String name;
  private final int secretNumber;

  public Person( final String name ) {
    this.name = name;

    final Random random = new Random();
    this.secretNumber = random.nextInt( 10 );
  }

  @Override
  public String toString() {
    return String.format( "Person{name=%s, secretNumber=%d}", name, secretNumber );
  }
}
```

The `Person` class has two properties, the `name` and a `secretNumber`.  The `name` is provided to the constructor while the `secretNumber` is generated in the constructor.

```java
package demo;

public class App {

  public static void main( final String[] args ) {
    final Person a = new Person( "Jade" );
    final Person b = new Person( "Aden" );

    System.out.println( a );
    System.out.println( b );
  }
}
```

When creating new instances of the `Person` class we only pass the person's name while the secret number is generated randomly.

```bash
Person{name=Jade, secretNumber=2}
Person{name=Aden, secretNumber=3}
```

There are other ways to initialise the `secretNumber`.  One other option is to use initialise blocks as shown next.

```java
package demo;

import java.util.Random;

public class Person {

  private final String name;
  private final int secretNumber;

  {
    final Random random = new Random();
    secretNumber = random.nextInt( 10 );
  }

  public Person( final String name ) {
    this.name = name;
  }

  @Override
  public String toString() {
    return String.format( "Person{name=%s, secretNumber=%d}", name, secretNumber );
  }
}
```

This is not a very common feature.  Other alternatives such as the one shown next are more commonly used.

```java
package demo;

import java.util.Random;

public class Person {

  private final String name;
  private final int secretNumber = createSecretNumber();

  public Person( final String name ) {
    this.name = name;
  }

  private static int createSecretNumber() {
    final Random random = new Random();
    return random.nextInt( 10 );
  }

  @Override
  public String toString() {
    return String.format( "Person{name=%s, secretNumber=%d}", name, secretNumber );
  }
}
```

**When using methods to initialise fields, please make sure that these cannot be overridden as otherwise you may get into some surprises**.

#### When is the initialisation block invoked?

The initialisation block is invoked before the properties are initialised but after the static initialisation block.  Consider the following example.

```java
package demo;

public class ExecutionOrder {

  static {
    System.out.println( "Initialisation static block" );
  }

  {
    System.out.println( "Initialisation block" );
  }

  private static final int STATIC_FIELD = initialiseStaticField();

  private final int property = initialiseProperty();

  public ExecutionOrder() {
    System.out.println( "Constructor" );
  }

  private static int initialiseStaticField() {
    System.out.println( "Initialise static field" );
    return 7;
  }

  private static int initialiseProperty() {
    System.out.println( "Initialise property" );
    return 7;
  }

  public static void printStaticField() {
    System.out.printf( "The static constant field value is %d%n", STATIC_FIELD );
  }
}
```

The above example tracks all five initialisation points of a class, shown in the following table.

| # | Name                            |
|--:|---------------------------------|
| 1 | Static initialisation block     |
| 2 | Static fields                   |
| 3 | Initialisation block (Instance) |
| 4 | Initialisation property         |
| 5 | Constructor                     |

The initialisation points are invoked in the order shown in the above table as we will see in the following examples.  Consider the following example.

```java
package demo;

public class App {

  public static void main( final String[] args ) {
    ExecutionOrder.printStaticField();
    System.out.println( "Done" );
  }
}
```

Note that the above example is not creating a new instance of a class.  None of the instance initialisers points are invoked.

```bash
Initialisation static block
Initialise static field
The static constant field value is 7
```

The follow table show how each initialisation point was invoked and in which order these were invoked.

| # | Name                            | Invoked              |
|--:|---------------------------------|----------------------|
| 1 | Static initialisation block     | Invoked first, once  |
| 2 | Static fields                   | Invoked second, once |
| 3 | Initialisation block (Instance) | Not invoked          |
| 4 | Initialisation property         | Not invoked          |
| 5 | Constructor                     | Not invoked          |

Now consider the following example.

```java
package demo;

public class App {

  public static void main( final String[] args ) {
    new ExecutionOrder();
    new ExecutionOrder();
    new ExecutionOrder();
    System.out.println( "Done" );
  }
}
```

This time we are creating three instances of the `ExecutionOrder`.

```bash
Initialisation static block
Initialise static field
Initialisation block
Initialise property
Constructor
Initialisation block
Initialise property
Constructor
Initialisation block
Initialise property
Constructor
Done
```

The follow table show how each initialisation point was invoked and in which order these were invoked.

| # | Name                            | Invoked                                                       |
|--:|---------------------------------|---------------------------------------------------------------|
| 1 | Static initialisation block     | Invoked first, once                                           |
| 2 | Static fields                   | Invoked second, once                                          |
| 3 | Initialisation block (Instance) | Invoked first (after static), every time an object is created |
| 4 | Initialisation property         | Invoked second, every time an object is created               |
| 5 | Constructor                     | Invoked last, every time an object is created                 |


#### What is double brace initialization?

Double brace initialization takes advantage of inner anonymous classes and initialisation block to inline the creation and population of some types.  Consider the following example.

```java
package demo;

import java.util.HashMap;
import java.util.Map;

public class App {

  public static void main( final String[] args ) {
    final Map<String, Integer> ageByName = new HashMap<>();
    ageByName.put( "Aden", 11 );
    ageByName.put( "Jade", 13 );

    print( ageByName );
  }

  private static void print( Map<String, Integer> map ) {
    map.forEach( ( name, age ) -> System.out.printf( "%s is %d years old%n", name, age ) );
  }
}
```

The above example creates a map that contains persons' names and their respective age and then passes this map to a method to be printed.  Without worry about the syntax used in this example, note that here we created an instance of [`HashMap`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/HashMap.html), populate it with values and then pass this variable to the method.

We can "simplify" this by creating the map, populate it and pass it to the method on the fly, without saving it to a variable, as shown next.

```java
package demo;

import java.util.HashMap;
import java.util.Map;

public class App {

  public static void main( final String[] args ) {
    print( new HashMap<>() {{
      put( "Aden", 11 );
      put( "Jade", 13 );
    }} );
  }

  private static void print( Map<String, Integer> map ) { /* ... */ }
}
```

**I am not fond of this pattern**, and it is more popular than you may think.  I don't like it as it is a bit cryptic to read and understand, and I consider that as a code smell.

Let's break this further.

1. Reformat the code to separate the curly brackets

    ```java
    print(
      new HashMap<>() {
        {
          put( "Aden", 11 );
          put( "Jade", 13 );
        }
      }
    );
    ```

1. Here we are creating an inner class as shown next

    ![IIB - Create anonymous inner class](assets/images/IIB%20-%20Create%20anonymous%20inner%20class.png)

1. Then we take advantage of the initialisation block to add our items

    ![IIB - Populate HashMap](assets/images/IIB%20-%20Populate%20HashMap.png)

The initialisation block is invoked before the properties are initialised and the constructor is called.  **How come this works?  The class must be in an invalid state?**

Note that the anonymous inner class, is a class that extends another class.  The parent class, the `HashMap` in our case, is initialised before the subtypes, our anonymous inner class, and that's why this works.  The map is properly setup before our initialisation block is invoked.

With that said, note how long we had to go to discuss this.  I prefer to use methods instead to create my objects.  Recent versions of Java, such as [`Map.of()`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/Map.html#of(K,V,K,V)), made this approach obsolete in some cases as shown next.

```java
print( Map.of( "Aden", 11, "Jade", 13 ) );
```

### Top level class

Top level classes are class declarations at the top-level of the source file.  A source file can have one, or more, top-level classes, as shown next.

```java
package demo;

public class TopLevelClass {
}

class AnotherTopLevelClass {
}
```

The above source file, `src/main/java/demo/TopLevelClass.java`, has two top-level classes.  Note that there can be only one `public` top-level class within one source file and that top-level class must have the same name as the source file, `TopLevelClass` in our example.

Having multiple top-level classes in one source file adds little advantages and is it not a recommended practice.  [Effective Java](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/) talks about this too in [Item 25: Limit source files to a single top-level class](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/ch4.xhtml#lev25).

### Inner instance class

An inner instance class is a class within a class.  Different from a top-level class, an inner class is another class member, like a method is for example.  The following example shows a very simple example of an inner instance class.

```java
package demo;

public class ClassWithAnInnerClass {

  public class AnInnerClass {
  }
}
```

An inner instance class can access the state of the enclosing class like any other instance method as shown in the following example.

```java
package demo;

public class ClassWithAnInnerClass {

  private int a = 7;

  public class AnInnerClass {
    public void printValue() {
      System.out.printf( "The value of a is %d%n", a );
    }
  }
}
```

Inner classes, in general, are great to represent data in a different form or to simplify internal data handling.

#### How can inner instance classes represent data in a different form?

Let say that we have a matrix of integers.

```
┌───┬───┬───┬───┬───┐
│ 1 │ 2 │ 3 │ 4 │ 5 │
├───┼───┼───┼───┼───┤
│ 1 │ 2 │ 3 │ 4 │ 5 │
├───┼───┼───┼───┼───┤
│ 1 │ 2 │ 3 │ 4 │ 5 │
└───┴───┴───┴───┴───┘
```

The above matrix can be representing as a two-dimensional array of `int` (`int[][]`), as shown next.

```java
package demo;

public class Data {

  private final int[][] matrix;

  public Data( final int[][] matrix ) {
    this. matrix = matrix;
  }
}
```

Now say that we need to get the data as rows, where each row is represented as an `int[]`, as shown next. How can we do that?

```
┌───┬───┬───┬───┬───┐
│ 1 │ 2 │ 3 │ 4 │ 5 │
└───┴───┴───┴───┴───┘
┌───┬───┬───┬───┬───┐
│ 1 │ 2 │ 3 │ 4 │ 5 │
└───┴───┴───┴───┴───┘
┌───┬───┬───┬───┬───┐
│ 1 │ 2 │ 3 │ 4 │ 5 │
└───┴───┴───┴───┴───┘
```

Furthermore, how can we represent the data as columns instead, where each column is represented as an `int[]`?

```
┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌───┐
│ 1 │ │ 2 │ │ 3 │ │ 4 │ │ 5 │
├───┤ ├───┤ ├───┤ ├───┤ ├───┤
│ 1 │ │ 2 │ │ 3 │ │ 4 │ │ 5 │
├───┤ ├───┤ ├───┤ ├───┤ ├───┤
│ 1 │ │ 2 │ │ 3 │ │ 4 │ │ 5 │
└───┘ └───┘ └───┘ └───┘ └───┘
```

We can represent the data in different forms using inner instance classes as shown next.

Note that the following example make use of [matrix transposition](https://en.wikipedia.org/wiki/Transpose) and [Java streams]().  Do not worry if you do not understand these.  These were added to the example to make it more meaningful.

```java
package demo;

import java.util.Arrays;
import java.util.Iterator;
import java.util.stream.Collectors;

public class Data {

  private final int[][] matrix;

  public Data( final int[][] matrix ) {
    this. matrix = matrix;
  }

  public Iterable<int[]> rows() {
    return new Rows();
  }

  public Iterable<int[]> columns() {
    return new Columns();
  }

  private class Rows implements Iterable<int[]> {
    @Override
    public Iterator<int[]> iterator() {
      return Arrays.stream( matrix )
        .collect( Collectors.toList() )
        .iterator();
    }
  }

  private class Columns implements Iterable<int[]> {
    @Override
    public Iterator<int[]> iterator() {
      return Arrays.stream( transposed() )
        .collect( Collectors.toList() )
        .iterator();
    }

    private int[][] transposed() {
      final int m = matrix.length;
      final int n = matrix[0].length;

      final int[][] transposed = new int[n][m];

      for ( int x = 0; x < n; x++ ) {
        for ( int y = 0; y < m; y++ ) {
          transposed[x][y] = matrix[y][x];
        }
      }

      return transposed;
    }
  }
}
```

Both the `Rows` and `Columns` inner instance classes implement the [`Iterable`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/lang/Iterable.html) of type `int[]` interface.  Any type that implements the `Iterable` interface, can be used within the for-each loop as shown in the following fragment.

```java
final Data data = ...;
for ( final int[] row : data.rows() ) { /* ... */ }
```

Let's break the `Data` class into smaller parts.

1. `Rows`

    ```java
    package demo;

    import java.util.Arrays;
    import java.util.Iterator;
    import java.util.stream.Collectors;

    public class Data {

      private final int[][] matrix;

      public Data( final int[][] matrix ) { /* ... */ }

      public Iterable<int[]> rows() {
        return new Rows();
      }

      public Iterable<int[]> columns() { /* ... */ }

      private class Rows implements Iterable<int[]> {
        @Override
        public Iterator<int[]> iterator() {
          return Arrays.stream( matrix )
            .collect( Collectors.toList() )
            .iterator();
        }
      }

      private class Columns implements Iterable<int[]> { /* ... */ }
    }
    ```

    `Rows` is an inner instance class that represents an `Iterable` of type `int[]`.  It takes the `matrix` and creates a list with each row as the list elements and then takes advantage of the [`List.iterator()`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/List.html#iterator()).

    As mentioned before, do not worry about the implementation details here as these may be beyond our pay grade.  The most important thing is that, using inner classes we are able to navigate the data in a different manner, rows in this case.

1. `Columns`

    ```java
    package demo;

    import java.util.Arrays;
    import java.util.Iterator;
    import java.util.stream.Collectors;

    public class Data {

      private final int[][] matrix;

      public Data( final int[][] matrix ) { /* ... */ }

      public Iterable<int[]> rows() { /* ... */ }

      public Iterable<int[]> columns() {
        return new Columns();
      }

      private class Rows implements Iterable<int[]> { /* ... */ }

      private class Columns implements Iterable<int[]> {
        @Override
        public Iterator<int[]> iterator() {
          return Arrays.stream( transposed() )
            .collect( Collectors.toList() )
            .iterator();
        }

        private int[][] transposed() { /* ... */ }
      }
    }
    ```

    `Columns` is almost identical to `Rows` with one small difference, it makes use of the transposed version of the matrix as we want to return the columns instead of the rows.  So first we rotate the matrix by 90 degrees and then use the same technique we used when creating the `Rows`.

Both the `Rows` and `Columns` instance classes make use of the `matrix` property defined in the enclosing class, `Data`.  This is an advantage of inner instance classes.  We don't have to pass any values.  With that said this comes with a downside as we will see [in a bit](#why-is-the-use-of-inner-instance-class-discouraged).

Consider the following example.

```java
package demo;

import java.util.Arrays;

public class App {
  public static void main( final String[] args ) {

    final int[][] matrix = {
      { 1, 2, 3, 4, 5 },
      { 1, 2, 3, 4, 5 },
      { 1, 2, 3, 4, 5 }
    };

    final Data data = new Data( matrix );

    System.out.println( "-- Rows view of the data -----" );
    for ( final int[] row : data.rows() ) {
      System.out.printf( "%s%n", Arrays.toString( row ) );
    }

    System.out.println( "-- Columns view of the data --" );
    for ( final int[] column : data.columns() ) {
      System.out.printf( "%s%n", Arrays.toString( column ) );
    }
  }
}
```

The above example shows how we can easily work with rows or columns as required.

```bash
-- Rows view of the data -----
[1, 2, 3, 4, 5]
[1, 2, 3, 4, 5]
[1, 2, 3, 4, 5]
-- Columns view of the data --
[1, 1, 1]
[2, 2, 2]
[3, 3, 3]
[4, 4, 4]
[5, 5, 5]
```

Note that both the `Rows` and `Columns` are declared as private, and these types are never returned.  Instead we return the `Iterable<int[]>` from the `rows()` and `columns()` methods.  Our example did not require anything else more than what is provided by the `Iterable<int[]>` interface.  Always start with the least possible visibility and open up only when needed.  We can always refactor this and return something more specific when this is needed.

The use of inner instance classes to represent the data in different forms is very common and used a lot within the Java collections.  The following code fragment shows how the [`ArrayList`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/ArrayList.html) makes use of this technique to return an `Iterator<E>` by its [`iterator()`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/ArrayList.html#iterator()) method using the inner instance class named `Itr`.

```java
package java.util;

public class ArrayList<E> extends AbstractList<E> implements List<E>, RandomAccess, Cloneable, Serializable {

  public Iterator<E> iterator() {
    return new Itr();
  }

  private class Itr implements Iterator<E> { /* ... */ }
}
```

As in our example the `Itr` is private and never exposed to the outside word.

#### Internal Types

Another use of inner instance classes is to represent a type internally.  Consider the following example.

**⚠️ THE FOLLOWING EXAMPLE MAKE USE OF INNER INSTANCE CLASS, WHERE A INNER STATIC CLASS WOULD HAVE SUFFICED!!**

```java
package demo;

import java.util.ArrayList;
import java.util.List;

public class Pairs {

  private final List<Pair> pairs = new ArrayList<>();

  public void add( int a, int b ) {
    pairs.add( new Pair( a, b ) );
  }

  private class Pair {
    final int a;
    final int b;

    private Pair( final int a, final int b ) {
      this.a = a;
      this.b = b;
    }

    @Override
    public String toString() {
      return String.format( "(%d,%d)", a, b );
    }
  }

  @Override
  public String toString() {
    return pairs.toString();
  }
}
```

The `Pairs` class takes pairs of `int`s and collects them in a list a shown in the following example.

```java
package demo;

public class App {

  public static void main( final String[] args ) {
    final Pairs pairs = new Pairs();
    pairs.add( 1, 2 );
    pairs.add( 3, 4 );
    pairs.add( 5, 6 );

    System.out.printf( "Pairs: %s%n", pairs );
  }
}
```

The above will print the following.

```bash
Pairs: [(1,2), (3,4), (5,6)]
```

Let's turn back to the `Pairs` class.  The `Pairs` class has an inner instance class which groups the provided ints.

```java
package demo;

import java.util.ArrayList;
import java.util.List;

public class Pairs {

  private final List<Pair> pairs = new ArrayList<>();

  public void add( int a, int b ) {
    pairs.add( new Pair( a, b ) );
  }

  private class Pair { /* ... */ }

  @Override
  public String toString() { /* ... */ }
}
```

This is quite a common practice where a class will use internal types, like our `Pair` inner instance class, to represent that data internally.  Note that in the above example the `Pair` is private and never used outside the enclosing class.  The main purpose of this inner instance class is simply to help the enclosing class organising its data.

#### Why is the use of inner instance class discouraged?

Inner instance classes have a reference to the object from where these where created.  This is not seen in the code.  We were able to access the parent's object state without had to think about it.

With reference to the `Data` class mentioned before.

```java
package demo;

import java.util.Arrays;
import java.util.Iterator;
import java.util.stream.Collectors;

public class Data {

  private final int[][] table;

  public Data( final int[][] matrix ) { /* ... */ }

  public Iterable<int[]> rows() { /* ... */ }

  public Iterable<int[]> columns() { /* ... */ }

  private class Rows implements Iterable<int[]> { /* ... */ }

  private class Columns implements Iterable<int[]> { /* ... */ }
}
```

Now consider the following example.

```java
package demo;

public class App {

  public static void main( final String[] args ) {

    final int[][] matrix = {
      { 1, 2, 3, 4, 5 },
      { 1, 2, 3, 4, 5 },
      { 1, 2, 3, 4, 5 }
    };

    final Iterable<int[]> rows = new Data( matrix ).rows();
  }
}
```

In the above example, we create an instance of `Data` and then simply return the rows, by invoking the `rows()` method.  The instance of `Data`, created by the `new Data()`, is never saved in a variable and therefore we have no variables pointing to this object in the heap as shown next.

![Inner instance classes have a reference to the object from which these are created](assets/images/Inner%20instance%20classes%20have%20a%20reference%20to%20the%20object%20from%20which%20these%20are%20created.png)

Some programmers will mistakenly think that the data object will be garbage collected as we are not referring to it.  After all, there are no reference to the `Data` class from within the `Rows` inner class, shown next.

```java
private class Rows implements Iterable<int[]> {
  @Override
  public Iterator<int[]> iterator() {
    return Arrays.stream( matrix )
      .collect( Collectors.toList() )
      .iterator();
  }
}
```

The `Rows` class shown next has no state after all.  Appearances cannot be more deceiving.  The `Rows` class has a reference to the parent class even though it is not visible.  Let's see the `Rows`' class bytecode (`View > Show Bytecode`).

```bytecode
// class version 58.65535 (-65478)
// access flags 0x20
// signature Ljava/lang/Object;Ljava/lang/Iterable<[I>;
// declaration: demo/Data$Rows implements java.lang.Iterable<int[]>
class demo/Data$Rows implements java/lang/Iterable {

  // compiled from: Data.java
  NESTHOST demo/Data
  // access flags 0x2
  private INNERCLASS demo/Data$Rows demo/Data Rows

  // access flags 0x1010
  final synthetic Ldemo/Data; this$0

  // access flags 0x2
  private <init>(Ldemo/Data;)V
   L0
    LINENUMBER 23 L0
    ALOAD 0
    ALOAD 1
    PUTFIELD demo/Data$Rows.this$0 : Ldemo/Data;
    ALOAD 0
    INVOKESPECIAL java/lang/Object.<init> ()V
    RETURN
   L1
    LOCALVARIABLE this Ldemo/Data$Rows; L0 L1 0
    MAXSTACK = 2
    MAXLOCALS = 2

  // access flags 0x1
  // signature ()Ljava/util/Iterator<[I>;
  // declaration: java.util.Iterator<int[]> iterator()
  public iterator()Ljava/util/Iterator;
   L0
    LINENUMBER 26 L0
    ALOAD 0
    GETFIELD demo/Data$Rows.this$0 : Ldemo/Data;
    GETFIELD demo/Data.table : [[I
    INVOKESTATIC java/util/Arrays.stream ([Ljava/lang/Object;)Ljava/util/stream/Stream;
   L1
    LINENUMBER 27 L1
    INVOKESTATIC java/util/stream/Collectors.toList ()Ljava/util/stream/Collector;
    INVOKEINTERFACE java/util/stream/Stream.collect (Ljava/util/stream/Collector;)Ljava/lang/Object; (itf)
    CHECKCAST java/util/List
   L2
    LINENUMBER 28 L2
    INVOKEINTERFACE java/util/List.iterator ()Ljava/util/Iterator; (itf)
   L3
    LINENUMBER 26 L3
    ARETURN
   L4
    LOCALVARIABLE this Ldemo/Data$Rows; L0 L4 0
    MAXSTACK = 2
    MAXLOCALS = 1
}
```

We don't need to understand the whole this.  Let's instead just focus on the parts relevant to us.

1. The bytecode of the `Rows` class shows that the `Rows` class actually has a property of type `demo.Data` as shown in the following fragment.

    ```bytecode
      // access flags 0x1010
      final synthetic Ldemo/Data; this$0
    ```

1. The bytecode also indicates that we have a constructor that takes an instance of `demo.Data` as shown in the following fragment.

    ```bytecode
      // access flags 0x2
      private <init>(Ldemo/Data;)V
       L0
        LINENUMBER 23 L0
        ALOAD 0
    ```

When compiling an inner instance class, the Java compiler adds a parameter of the enclosing class type, `Data` in our case, as the first parameter to each constructor, and the default constructor is not an exception.

[Effective Java](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/) dives into this too in [Item 24: Favor static member classes over nonstatic](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/ch4.xhtml#lev24)

#### Can we have static methods within inner instance classes?

**No**.  Inner instance classes, like inner anonymous classes, cannot have static members.

#### Can we create an instance of an inner instance class from outside the enclosing class?

Yes, **but I never saw this used anywhere apart from books and the syntax looks weird**.  Consider the following class that also contains an inner instance class.

```java
package demo;

public class ClassWithAnInnerClass {

  private int a = 7;

  public class AnInnerClass {
    public void printValue() {
      System.out.printf( "The value of a is %d%n", a );
    }
  }
}
```

We can create an instance of the inner class, `AnInnerClass`, from outside the enclosing class, as shown in the following example.

```java
package demo;

public class App {

  public static void main( final String[] args ) {
    final ClassWithAnInnerClass a = new ClassWithAnInnerClass();

    final ClassWithAnInnerClass.AnInnerClass b = a.new AnInnerClass();
    b.printValue();
  }
}
```

Note that an inner instance class needs to be linked to an object of its enclosing class.  That is why we need to create the inner instance class through the variable of the enclosing class, `ClassWithAnInnerClass` in our case.

```java
a.new AnInnerClass()
```

I would avoid this and instead I would use a method within the enclosing class that will return an instance of the inner class, as shown next.

```java
package demo;

public class ClassWithAnInnerClass {

  private int a = 7;

  public AnInnerClass newInnerClass() {
    return new AnInnerClass();
  }

  public class AnInnerClass {

    private AnInnerClass() { }

    public void printValue() { /* ... */ }
  }
}
```

Note that constructor of the inner instance class, `AnInnerClass`, is private to prevent it from being initialised from outside the enclosing class.  We cannot create an instance of `AnInnerClass` from the `App` class anymore.

```java
package demo;

public class App {

  public static void main( final String[] args ) {
    final ClassWithAnInnerClass a = new ClassWithAnInnerClass();

    final ClassWithAnInnerClass.AnInnerClass b = a.newInnerClass();
    b.printValue();
  }
}
```

The above example reads better as it uses a code style that every is accustom to.

### Inner static class

An inner static class is a class within a class which is marked as `static`.  Different from a top-level class, an inner static class is another class member, like a method is for example.  The following example shows a very simple example of an inner static class.

```java
package demo;

public class ClassWithAnInnerStaticClass {

  public static class AnInnerStaticClass {
  }
}
```

An inner static class *cannot* access the state of the enclosing class.  These behave similar to static methods within the same class.

```java
package demo;

public class ClassWithAnInnerStaticClass {

  private static int A = 7;

  public static class AnInnerStaticClass {
    public static void printValue() {
      System.out.printf( "The value of the static field A is %d%n", A );
    }
  }
}
```

#### What's the difference between inner instance classes and inner static classes?

Difference for inner instance classes, an inner static class is not automatically linked to the enclosing object.  Therefore, an inner static class, cannot access the state of the enclosing object as the inner instance class does.

Consider the following example.

**⚠️ THE FOLLOWING EXAMPLE WILL NOT COMPILE!!**

```java
package demo;

public class ClassWithInnerClasses {

  private final int a = 7;

  public class InnerClass {
    public void printValue() {
      System.out.printf( "The value of the property a is %d%n", a );
    }
  }

  public static class InnerStaticClass {
    public void printValue() {
      /* ⚠️ cannot access instance properties of the enclosing class */
      System.out.printf( "The value of the property a is %d%n", a );
    }
  }
}
```

As mentioned in an earlier section, titled [*why is the use of inner instance class discouraged?*](#why-is-the-use-of-inner-instance-class-discouraged), the inner instance class is provided a reference to the enclosing object automatically by the compiler.  We can refactor the inner static class and pass an instance of the enclosing object to it, as shown next.

```java
package demo;

public class ClassWithInnerClasses {

  private final int a = 7;

  public class InnerClass { /* ... */ }

  public static class InnerStaticClass {

    private final ClassWithInnerClasses enclosingObject;

    private InnerStaticClass( final ClassWithInnerClasses enclosingObject ) {
      this.enclosingObject = enclosingObject;
    }

    public void printValue() {
      System.out.printf( "The value of the property a is %d%n", enclosingObject.a );
    }
  }
}
```

Inner static classes can be seen as a super set of the inner instance classes as they can also have static members.  We can convert all inner instance classes with inner static classes, but not vice versa.  Note that inner instance classes cannot have static members as [discussed before](#can-we-have-static-methods-within-inner-instance-classes).

### Inner anonymous class

**🚧 Pending...**

```java
package demo;

import java.util.stream.Stream;

public class App {

  public static void main( final String[] args ) {
    Stream.of(
      new Person( "Aden", 16 ),
      new Person( "Jade", 32 ),
      new Person( "Mary", 57 ),
      new Person( "Peter", 92 )
    ).forEach( person -> {
        final String name = person.getName();
        final int dogAge = toDogAge( person.getAge() );
        System.out.printf( "%s would be %d years old%n", name, dogAge );
      }
    );
  }

  private static int toDogAge( int age ) {
    /* 15 human years equals the first year of a medium-sized dog's life */
    return age / 15;
  }
}
```

```bash
Aden would be 1 years old
Jade would be 2 years old
Mary would be 3 years old
Peter would be 6 years old
```

```java
package demo;

import java.util.stream.Stream;

public class App {

  public static void main( final String[] args ) {
    Stream.of(
      new Person( "Aden", 16 ),
      new Person( "Jade", 32 ),
      new Person( "Mary", 57 ),
      new Person( "Peter", 92 )
    )
      .map( person -> new Object() {
        final String name = person.getName();
        final int dogAge = toDogAge( person.getAge() );
      } )
      .forEach( person -> System.out.printf( "%s would be %d years old%n", person.name, person.dogAge )
      );
  }

  private static int toDogAge( int age ) {
    /* 15 human years equals the first year of a medium-sized dog's life */
    return age / 15;
  }
}
```


```java
new HashMap(){
{
put("", "");
}
}
```

### Local class

**🚧 Pending...**

### JEP 360: Sealed Classes (Preview)

**🚧 Pending...**

[JEP 360](https://openjdk.java.net/jeps/360)

## Annotations

**🚧 Pending...**

We have already seen many annotations like `@Override`, `@DisplayName`, `@Test`, or `@ParameterizedTest`.

[Effective Java](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/) - [Item 39: Prefer annotations to naming patterns](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/ch3.xhtml#lev39)

### Project Lombok

[Project Lombok](https://projectlombok.org)

The idea of Lombok is to make Java less verbose. Often, when we create a new Class, we expect it to have a simple constructor and override `equals` and `hashCode`. This can make up many lines of code and decrease the readability. Lombok aims to make these base features more readable, and easier to understand and change.

We revisit now our example of the `Person` class. It has the private final fields `name` and `surname`, and an `age` which can be changed through a setter. The fields can be accessed through getters. Two `Person`s are considered equal, if their `name` and `surname` are the same (`equals` and `hashCode` method). Finally, the `Person` can be converted to a String using `toString`.

```java
import java.util.Objects;

public class Person {

    private final String name;
    private final String surname;
    private int age;

    public Person( final String name, final String surname, final int age ) {
        this.name = name;
        this.surname = surname;
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public String getSurname() {
        return surname;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Person person = (Person) o;
        return Objects.equals(name, person.name) &&
                Objects.equals(surname, person.surname);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, surname);
    }

    @Override
    public String toString() {
        return "Person{" +
                "name='" + name + '\'' +
                ", surname='" + surname + '\'' +
                ", age=" + age +
                '}';
    }
}
```

Within this section, we learn how to shorten this class utilizing Lombok to this:

```java
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@ToString
@EqualsAndHashCode(exclude = "age")
public class Person {
    private final String name;
    private final String surname;
    private int age;
}
```

In order to use Lombok, we need to add the library to our gradle dependencies.

```groovy
dependencies {
  compileOnly 'org.projectlombok:lombok:1.18.12'
  annotationProcessor 'org.projectlombok:lombok:1.18.12'

  testCompileOnly 'org.projectlombok:lombok:1.18.12'
  testAnnotationProcessor 'org.projectlombok:lombok:1.18.12'
}
```

You can find a list of all stable features with examples here: [Project Lombok Documentation](https://projectlombok.org/features/all)

It also shows how an equivalent implementation would look like in Vanilla Java to compare it with.

Work through the next few subsections and then try it for yourself without looking it up.

#### @ToString

Lombok's `@ToString` annotation takes all the fields of an entity and converts them to a readable String.

```java
public class Person {

    private final String name;
    private final String surname;
    private int age;

    public Person( final String name, final String surname, final int age ) {/* ... */}

    public String getName() {/* ... */}

    public String getSurname() {/* ... */}

    public int getAge() {/* ... */}

    public void setAge(int age) {/* ... */}

    @Override
    public boolean equals(Object o) {/* ... */}

    @Override
    public int hashCode() {/* ... */}

    @Override
    public String toString() {
        return "Person{" +
                "name='" + name + '\'' +
                ", surname='" + surname + '\'' +
                ", age=" + age +
                '}';
    }
}
```

becomes

```java
@ToString
public class Person {

    private final String name;
    private final String surname;
    private int age;

    public Person( final String name, final String surname, final int age ) {/* ... */}

    public String getName() {/* ... */}

    public String getSurname() {/* ... */}

    public int getAge() {/* ... */}

    public void setAge(int age) {/* ... */}

    @Override
    public boolean equals(Object o) {/* ... */}

    @Override
    public int hashCode() {/* ... */}
}
```

This sample application prints the `String` representation of a `Person`:

```java
public class App {
    public static void main( final String[] args ) {
        Person a = new Person("Paul", "Börding", 29);
        System.out.println(a.toString());
    }
}
```

```bash
Person(name=Paul, surname=Börding, age=29)
```

We can explicitly exclude fields using the `@ToString.Exclude`:

```java
@ToString
public class Person {

    private final String name;
    @ToString.Exclude private final String surname;
    private int age;

    public Person( final String name, final String surname, final int age ) {/* ... */}

    public String getName() {/* ... */}

    public String getSurname() {/* ... */}

    public int getAge() {/* ... */}

    public void setAge(int age) {/* ... */}

    @Override
    public boolean equals(Object o) {/* ... */}

    @Override
    public int hashCode() {/* ... */}
}
```

```bash
Person(name=Paul, age=29)
```

or by defining the excluded fields at the `@ToString` annotation directly:

```java
@ToString(exclude = "surname")
public class Person {

    private final String name;
    private final String surname;
    private int age;

    public Person( final String name, final String surname, final int age ) {/* ... */}

    public String getName() {/* ... */}

    public String getSurname() {/* ... */}

    public int getAge() {/* ... */}

    public void setAge(int age) {/* ... */}

    @Override
    public boolean equals(Object o) {/* ... */}

    @Override
    public int hashCode() {/* ... */}
}
```

If we only want to use a few of the fields, we can either set them in the annotation using `of` or set `onlyExplicitlyIncluded = true` and use the `@ToString.Include` annotation:

```java
@ToString(of = "name")
public class Person {
    private final String name;
    private final String surname;
    private int age;

    public Person( final String name, final String surname, final int age ) {/* ... */}

    public String getName() {/* ... */}

    public String getSurname() {/* ... */}

    public int getAge() {/* ... */}

    public void setAge(int age) {/* ... */}

    @Override
    public boolean equals(Object o) {/* ... */}

    @Override
    public int hashCode() {/* ... */}
}
```
and
```java
@ToString(onlyExplicitlyIncluded = true)
public class Person {
    @ToString.Include private final String name;
    private final String surname;
    private int age;

    public Person( final String name, final String surname, final int age ) {/* ... */}

    public String getName() {/* ... */}

    public String getSurname() {/* ... */}

    public int getAge() {/* ... */}

    public void setAge(int age) {/* ... */}

    @Override
    public boolean equals(Object o) {/* ... */}

    @Override
    public int hashCode() {/* ... */}
}
```

both print:

```bash
Person(name=Paul)
```

If we have a static value which we also want to include, we can use the `@ToString.Include` annotation on it:

```java
@ToString
public class Person {
    @ToString.Include private final static String SPECIES = "Human";

    private final String name;
    private final String surname;
    private int age;

    public Person( final String name, final String surname, final int age ) {/* ... */}

    public String getName() {/* ... */}

    public String getSurname() {/* ... */}

    public int getAge() {/* ... */}

    public void setAge(int age) {/* ... */}

    @Override
    public boolean equals(Object o) {/* ... */}

    @Override
    public int hashCode() {/* ... */}
}
```

```bash
Person(SPECIES=Human, name=Paul, surname=Börding, age=29)
```

It also works, if other entities are involved:

```java
@ToString
public class Person {
    private final String name;
    private final String surname;
    private int age;
    private Person neighbor;

    public Person( final String name, final String surname, final int age, final Person neighbor ) {/* ... */}

    public String getName() {/* ... */}

    public String getSurname() {/* ... */}

    public int getAge() {/* ... */}

    public void setAge(int age) {/* ... */}

    @Override
    public boolean equals(Object o) {/* ... */}

    @Override
    public int hashCode() {/* ... */}
}

public class App {
    public static void main( final String[] args ) {
        Person a = new Person("Paul", "Börding", 29, null);
        Person b = new Person("Someone", "Else", 35, a);
        System.out.println(b.toString());
    }
}
```

```bash
Person(name=Someone, surname=Else, age=35, neighbor=Person(name=Paul, surname=Börding, age=29, neighbor=null))
```

Be careful with this, as it can cause an endless loop (if `a`'s neighbor is `b` and `b`'s neighbor is `a` in this example)!

#### @EqualsAndHashCode

Lombok's `@EqualsAndHashCode` annotation takes all the fields of an entity and checks them for equality when calling the `equals` method. Furthermore, it generates a hash code using all the fields.

```java
@ToString
public class Person {

    private final String name;
    private final String surname;
    private int age;

    public Person( final String name, final String surname, final int age ) {/* ... */}

    public String getName() {/* ... */}

    public String getSurname() {/* ... */}

    public int getAge() {/* ... */}

    public void setAge(int age) {/* ... */}

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Person person = (Person) o;
        return age == person.age &&
                Objects.equals(name, person.name) &&
                Objects.equals(surname, person.surname);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, surname, age);
    }
}
```

becomes

```java
@ToString
@EqualsAndHashCode
public class Person {

    private final String name;
    private final String surname;
    private int age;

    public Person( final String name, final String surname, final int age ) {/* ... */}

    public String getName() {/* ... */}

    public String getSurname() {/* ... */}

    public int getAge() {/* ... */}

    public void setAge(int age) {/* ... */}
}
```

Like for `@ToString`, we can explicitly include or exclude fields using the same parameters as for the `@ToString` annotation.

```java
@ToString
@EqualsAndHashCode(exclude = "age")
public class Person {

    private final String name;
    private final String surname;
    private int age;

    public Person( final String name, final String surname, final int age ) {/* ... */}

    public String getName() {/* ... */}

    public String getSurname() {/* ... */}

    public int getAge() {/* ... */}

    public void setAge(int age) {/* ... */}
}
```

#### @Getter and @Setter

When we access fields or want to manipulate them, it is highly recommended to use getters and setters for this operation. Getters and setters might compute or validate certain properties before performing the action.

With `@Getter`, all fields of a class will receive a getter:

```java
@ToString
@EqualsAndHashCode(exclude = "age")
public class Person {

    private final String name;
    private final String surname;
    private int age;

    public Person( final String name, final String surname, final int age ) {/* ... */}

    public String getName() {
        return name;
    }

    public String getSurname() {
        return surname;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }
}
```

becomes

```java
@Getter
@ToString
@EqualsAndHashCode(exclude = "age")
public class Person {

    private final String name;
    private final String surname;
    private int age;

    public Person( final String name, final String surname, final int age ) {/* ... */}

    public void setAge(int age) {
        this.age = age;
    }
}
```

With @Setter, all non-final fields of a class receive a setter method.

```java
@Getter
@Setter
@ToString
@EqualsAndHashCode(exclude = "age")
public class Person {

    private final String name;
    private final String surname;
    private int age;

    public Person( final String name, final String surname, final int age ) {/* ... */}
}
```

If getters or setters are only required for certain fields, the can be explicitly defined where they are needed. In the following scenario, `age` has only a setter, but no getter:

```java
@Setter
@ToString
@EqualsAndHashCode(exclude = "age")
public class Person {
    @Getter private final String name;
    @Getter private final String surname;
    private int age;

    public Person( final String name, final String surname, final int age ) {/* ... */}
}
```

By default, all getters and setters can be publicly accessed. If you want to reduce the access, you can set the `value` parameter:

```java
@Setter(value = AccessLevel.PRIVATE)
@ToString
@EqualsAndHashCode(exclude = "age")
public class Person {
    @Getter(value = AccessLevel.PROTECTED) private final String name;
    @Getter private final String surname;
    private int age;

    public Person( final String name, final String surname, final int age ) {/* ... */}
}
```

Now, only the surname can be publicly accessed; the name can be accessed by subclasses; the age can only be set within the same class.

Another feature of the `@Getter` annotation is the caching of values to improve performance and memory usage. This is done by setting the `lazy` parameter to true. As we have not yet covered caching, we will come back to this once we learned more about this topic.

#### Constructors

Instead of writing out all the constructors, we can use the Lombok constructor annotations. The `@AllArgsConstructor` creates a constructor which has all fields as input:

```java
@Getter
@Setter
@ToString
@EqualsAndHashCode(exclude = "age")
public class Person {

    private final String name;
    private final String surname;
    private int age;

    public Person( final String name, final String surname, final int age ) {
        this.name = name;
        this.surname = surname;
        this.age = age;
    }
}
```

becomes

```java
@AllArgsConstructor
@Getter
@Setter
@ToString
@EqualsAndHashCode(exclude = "age")
public class Person {

    private final String name;
    private final String surname;
    private int age;
}
```

Often, we want to only create an object with the final fields and set the non-final fields later on (e.g. when we have more information). For this, we can use the `@RequiredArgsConstructor`:

```java
@Getter
@Setter
@ToString
@EqualsAndHashCode(exclude = "age")
public class Person {

    private final String name;
    private final String surname;
    private int age;

    public Person( final String name, final String surname ) {
        this.name = name;
        this.surname = surname;
    }
}
```

becomes

```java
@RequiredArgsConstructor
@Getter
@Setter
@ToString
@EqualsAndHashCode(exclude = "age")
public class Person {

    private final String name;
    private final String surname;
    private int age;
}
```

When we have defined a constructor of a class, the empty default constructor is no longer available. If we still want to have it, we can create it using the annotation `@NoArgsConstructor`. Be aware, this is only possible if we have no unset final fields, as final fields need to be defined when creating an object.


```java
@Getter
@Setter
@ToString
@EqualsAndHashCode(exclude = "age")
public class Person {

    private String name;
    private String surname;
    private int age;

    public Person( ) {
    }

    public Person( final String name, final String surname, final int age ) {
        this.name = name;
        this.surname = surname;
        this.age = age;
    }
}
```

becomes

```java
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@EqualsAndHashCode(exclude = "age")
public class Person {

    private final String name;
    private final String surname;
    private int age;
}
```

Note: If all fields are final, `@RequiredArgsConstructor` is the same as `@AllArgsConstructor`. Don't use both at the same time.

Note: If the class has no fields at all, `@NoArgsConstructor`, `@RequiredArgsConstructor`, and `@AllArgsConstructor` are all equivalent. Don't use more than one of them at the same time.

```java
// Don't do this! Runtime error!
@AllArgsConstructor
@RequiredArgsConstructor
public class Person {
    private final String name;
    private final String surname;
}
```

```java
// Don't do this! Runtime error!
@NoArgsConstructor
@RequiredArgsConstructor
public class Person {
}
```

#### @Data

A common combination of the aforementioned annotations is:

```java
@ToString
@EqualsAndHashCode
@Getter
@Setter //on all non-final fields
@RequiredArgsConstructor
public class Person {
    private final String name;
    private final String surname;
    private int age;
}
```

This can be shortened using the `@Data` annotation:

```java
@Data
public class Person {
    private final String name;
    private final String surname;
    private int age;
}
```

Excluding certain fields from `@ToString` or `@EqualsAndHashCode` can still be done by excluding them explicitly on the field:

```java
@Data
public class Person {
  private final String name;
  @ToString.Exclude private final String surname;
  @EqualsAndHashCode.Exclude private int age;
}
```

#### @Builder

**🚧 Pending...**

#### @NonNull

**🚧 Pending...**

#### @With

**🚧 Pending...**

#### @Value

**🚧 Pending...**

#### @SneakyThrows

**🚧 Pending...**

## Generics

**🚧 Pending...**

[Diamond Operator](https://docs.oracle.com/javase/8/docs/technotes/guides/language/type-inference-generic-instance-creation.html)

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
1 effectively final variables
