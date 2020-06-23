---
layout: default
title: The instanceof and type cast operators
parent: Advanced Objects
nav_order: 1
permalink: docs/advanced-objects/instanceof-type-cast/
---

# The `instanceof` and type cast operators
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

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

## Is there a better approach than relying on `instanceof` and type cast operators (polymorphism)?

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

## Are there good examples of the `instanceof` and type cast operators?

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

## What is type upcasting and how is it different from type casting or type downcasting?

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

![Upcasting and Downcasting]({{site.baseurl}}/assets/images/Upcasting-and-Downcasting.png)

### Type Upcasting

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

### Type Downcasting

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

{% include custom/dose_not_compile.html %}

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

## Can we type cast `null`?

Yes, `null` can be type casted to any object ([JLS-5.5](https://docs.oracle.com/javase/specs/jls/se14/html/jls-5.html#jls-5.5)).  We already saw something similar when answering the question [can one constructor call another constructor in the same class?](04---Classes,-Methods-and-Objects.md#can-one-constructor-call-another-constructor-in-the-same-class).

## Can we type cast primitive types?

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

We can try this in JShell.

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

## JEP 305: Pattern Matching for `instanceof` (Preview)

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

![JDK 14 Preview]({{site.baseurl}}/assets/images/JDK-14-Preview.png)

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
