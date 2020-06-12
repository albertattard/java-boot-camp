---
layout: default
title: The interfaces
parent: Interfaces
nav_order: 1
permalink: docs/interfaces/interfaces/
---

# The interfaces
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## What is an interface?

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

## How is an interface different from a class?

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

## How can we use interfaces?

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

## Can we create an instance of an interface?

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

## Functional interface and lambda functions

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

### What is the relation between lambda and functional interfaces?

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

### What are the differences between lambda functions and inner anonymous classes?

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

## Can an interface extend another class or another interface?

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

## How many interfaces can a class implement?

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

## What happens if a class implements two interfaces that have the same abstract method?

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

## What's the purpose of an interface that has no abstract methods (marker interface)?

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

## What are `default` and `static` methods?

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

## What happens if a class implements two interfaces that have the same `default` methods?

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

## Can we use an interface just to define constants?

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
