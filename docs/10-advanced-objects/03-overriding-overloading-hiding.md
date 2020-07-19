---
layout: default
title: Overriding, overloading and hiding
parent: Advanced Objects
nav_order: 3
permalink: docs/advanced-objects/overriding-overloading-hiding/
---

# Overriding, overloading and hiding
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Overriding

Overriding is the ability for a subclass to replace a method defined in its parent (or ancestors) class or interfaces it implements and provide a more suitable implementation of this method.  Consider the following image.

![Method Overriding]({{site.baseurl}}/assets/images/Method-Overriding.png)

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

### Do we need to use the `@Override` annotation?

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

{% include custom/dose_not_compile.html %}

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

### Can we use the `@Override` annotation when overriding methods defined by an interface?

Yes, the `@Override` annotation can be used to indicate that you are overriding a method irrespective from where this was defined.  This was not always the case.  In Java 1.5, when annotations were introduced, we were not able to use `@Override` to indicate that we are overriding a method defined in an interface.

Consider the following interface.

```java
package demo;

public interface HasName {

  String getName();
}
```

In Java 1.5 we could not use the `@Override` to indicate that we are overriding this method.

{% include custom/require_java_version.html v="1.6" %}

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

### Can we override a private method?

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

### Can we change the visibility of an overridden method?

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

{% include custom/dose_not_compile.html %}

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

### Can a parent class prevent a method from being overridden?

**YES**

A class can determine what methods can be overridden by its subtypes or not using the `final` keyword.  Adding the `final` keyword to a method signature, will prevent this method from being overridden as shown next.

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

### Can we return something different when overriding methods?

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

### Can we override static methods?

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

## Overloading

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

### Does Java support return-type-based method overloading?

**No**.  Java does not support return-type-based method overloading.  The Java compiler cannot determine which method to use by observing the return type.  This means that a class cannot have two methods that differ only by their return type.  Consider the following example.

{% include custom/dose_not_compile.html %}

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

### Can we overload instance methods?

Yes.  Instance methods can be overloaded in the same manner as static methods are overloaded.

Note that instance methods can be overridden too and thus an overridden method may be invoked at runtime.

### What are the benefits of using method overloading?

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

### When should we use method overloading and when should we avoid it?

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
1. `removeFirstEqual(T)`

By just reading the method name, we know what will happen and we do not have to worry about using the wrong method.

[Effective Java](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/) talks about this too in [Item 52: Use overloading judiciously](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/ch8.xhtml#lev52).

## Hiding

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
