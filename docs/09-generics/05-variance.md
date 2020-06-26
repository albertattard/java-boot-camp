---
layout: default
title: Variance
parent: Generics
nav_order: 5
permalink: docs/generics/variance/
---

# Variance
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Variance

The [Liskov substitution principle (LSP)](https://en.wikipedia.org/wiki/Liskov_substitution_principle) tells us that any subtypes of `T` can be used when `T` is required.

Consider the following classes.

![Shapes]({{ '/assets/images/Generics-Shapes.png' | absolute_url }})

* A type, `Shape`

   ```java
   package demo;

   public interface Shape {

     double perimeter();

     double area();
   }
   ```

* A subtype, `Rectangle`

   ```java
   package demo;

   import lombok.AllArgsConstructor;

   @AllArgsConstructor
   public class Rectangle implements Shape {

     private final double a;
     private final double b;

     @Override
     public double perimeter() {
       return ( a + b ) * 2;
     }

     @Override
     public double area() {
       return a * b;
     }
   }
   ```

* A subtype, `Square`

   ```java
   package demo;

   public class Square extends Rectangle {

     public Square( final double a ) {
       super( a, a );
     }
   }
   ```

* A subtype, `Circle`

   ```java
   package demo;

   import lombok.AllArgsConstructor;

   @AllArgsConstructor
   public class Circle implements Shape {

     private final double d;

     @Override
     public double perimeter() {
       return Math.PI * d;
     }

     @Override
     public double area() {
       final double r = d / 2;
       return Math.PI * r * r;
     }
   }
   ```

* A subtype, `Triangle` (_may be removed if not used in the examples_)

   ```java
   package demo;

   import lombok.AllArgsConstructor;

   @AllArgsConstructor
   public class Triangle implements Shape {

     private final double a;
     private final double b;
     private final double c;

     @Override
     public double perimeter() {
       return a + b + c;
     }

     @Override
     public double area() {
       double p = perimeter() / 2;
       return Math.sqrt( p * ( p - a ) * ( p - b ) * ( p - c ) );
     }
   }
   ```

According to the LSP, we can use an instance of `Triangle` (or `Circle` or `Rectangle` or `Square`) , wherever a `Shape` is required, as shown next.

```java
package demo;

public class App {

  public static void main( final String[] args ) {
    final Shape a = new Circle( 7 );
    final Shape b = new Square( 4 );
  }
}
```

This applies to collections too.  For example an [`ArrayList`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/ArrayList.html) implements the [`List`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/List.html) interface, and we can use an instance of `ArrayList` whenever a `List` is required, as shown next.

```java
package demo;

import java.util.ArrayList;
import java.util.List;

public class App {

  public static void main( final String[] args ) {
    final List<Shape> shapes = new ArrayList<Shape>();
  }
}
```

{% include custom/note.html details="We are not using the <a href='/java-boot-camp/docs/generics/basics/#diamond-operator'>diamond operator</a> on purpose in these examples." %}

Now consider the following example.

{% include custom/dose_not_compile.html %}

```java
package demo;

import java.util.ArrayList;
import java.util.List;

public class App {

  public static void main( final String[] args ) {
    final Shape[] array = new Circle[0];

    /* ⚠️ This will not compile!! */
    final List<Shape> list = new ArrayList<Circle>();
  }
}
```

[Variance](https://en.wikipedia.org/wiki/Covariance_and_contravariance_(computer_science)) defines how subtyping between containers types, such as lists, or methods' types (parameters and return values) relates to subtyping.  In Java, arrays are covariant while generics are invariant.  There are four types of variance that effect the behaviour of generics.

1. [Invariance](#invariance)
1. [Covariance](#covariance)
1. [Contravariance](#contravariance)
1. [Bi-variance](#bi-variance)

Each of these is discussed in depth in the following sections.

## Invariance

The types `Triangle`, `Circle`, `Rectangle`, and `Square` are both subtypes of `Shape` and we can add them to a list of type `Shape`, as shown next.

```java
package demo;

import java.util.ArrayList;
import java.util.List;

public class App {

  public static void main( final String[] args ) {
    final List<Shape> shapes = new ArrayList<Shape>();
    shapes.add( new Square( 7 ) );
    shapes.add( new Circle( 7 ) );

    final Shape shape = shapes.get( 0 );
    System.out.printf( "Area is: %.2f%n", shape.area() );
  }
}
```

We can also read from the same list as we did with the `shape` variable.

Generics are invariant which means that, if `S` is a subtype of `T`, then `GenericType<S>` is not a subtype of `GenericType<T>` and `GenericType<T>` is not a supertype of `GenericType<S>`.

{% include custom/dose_not_compile.html %}

```java
package demo;

import java.util.ArrayList;
import java.util.List;

public class App {

  public static void main( final String[] args ) {
    /* ⚠️ This will not compile!! */
    final List<Shape> shapes = new ArrayList<Circle>();
  }
}
```

Generics are invariant which means that `ArrayList<Circle>` is not a subtype of `ArrayList<Shape>` (or `List<Shape>`), therefore we cannot use `ArrayList<Circle>` where `List<Shape>` this is required.  The same applies to method parameters.  You cannot pass a `ArrayList<Circle>` to a method that requires a `List<Shape>`.

```java
package demo;

import java.util.ArrayList;
import java.util.List;

public class App {

  public static void main( final String[] args ) {
    final List<Circle> circles = new ArrayList<Circle>();
    circles.add( new Circle( 7 ) );
    circles.add( new Circle( 4 ) );

    /* ⚠️ This will not compile!! */
    totalArea( circles );
  }

  private static double totalArea( final List<Shape> shapes ) {
    return shapes
      .stream()
      .map( Shape::area )
      .reduce( Double::sum )
      .orElse( 0D );
  }
}
```

The above is quite annoying as `Circle` is a `Shape` and thus the above should work.  Before we continue ranting, let consider a different example.

{% include custom/compile_but_throws.html e="ArrayStoreException" %}

```java
package demo;

public class App {

  public static void main( final String[] args ) {
    final Shape[] shapes = new Square[2];

    /* ⚠️ This will fail at runtime!! */
    shapes[0] = new Circle( 7 );
  }
}
```

Arrays on the other hand are covariant, which means that `Circle[]` is a subtype of `Shape[]`.  Being so flexible, we have opened ourselves to new set os problems.  While compiling, the above example fails at runtime with a `ArrayStoreException`, as shown next.

```bash
Exception in thread "main" java.lang.ArrayStoreException: demo.Circle
	at demo.App.main(App.java:9)
```

[Effective Java](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/) talks about this in [Item 28: Prefer lists to arrays](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/ch5.xhtml#lev28), whereas the title suggests, it recommends lists over arrays as much as possible.

We can still achieve the same degree of flexibility with Generics without having to pay the same price as arrays as we will see in [Covariance](#covariance), [Contravariance](#contravariance) and [Bi-variance](#bi-variance)

## Covariance

Generics support covariance without having the pitfalls of arrays.  Consider the following example.

```java
package demo;

import java.util.ArrayList;
import java.util.List;

public class App {

  public static void main( final String[] args ) {
    final List<Circle> circles = new ArrayList<Circle>();
    circles.add( new Circle( 7 ) );
    circles.add( new Circle( 4 ) );

    final double area = totalArea( circles );
    System.out.printf( "Total area is: %.2f%n", area );
  }

  private static double totalArea( final List<? extends Shape> shapes ) {
    return shapes
      .stream()
      .map( Shape::area )
      .reduce( Double::sum )
      .orElse( 0D );
  }
}
```

The `totalArea()` takes an instance of `List<? extends Shape>`.  This means that the given list will contain `Shape` or any subtype of `Shape`, such as `Circle` or `Square`.

This means, if `S` is a subtype of `T`, then `GenericType<S>` is a subtype of `GenericType<? extends T>`.  We can use `List<Shape>`, `List<Circle>` or `List<Square>` where a `List<? extends Shape>` is required.  In this example we are defining an upper bound and saying that the list will contain types that are subtypes of `Shape` (including `Shape`).  The receiver of the list must have an open lower bound as the list may contain anything that extends `Shape` (including `Shape`), as shown next.

```java
package demo;

import java.util.ArrayList;
import java.util.List;

public class App {

  public static void main( final String[] args ) {
    totalArea( new ArrayList<Shape>() );
    totalArea( new ArrayList<Circle>() );
    totalArea( new ArrayList<Rectangle>() );
    totalArea( new ArrayList<Square>() );
    totalArea( new ArrayList<Triangle>() );
  }

  private static double totalArea( final List<? extends Shape> shapes ) { /* ... */ }
}
```

We can pass any list which contains shapes.  With that said, we cannot pass any list to the `totalArea()` method.  Consider the following example.

{% include custom/dose_not_compile.html %}

```java
package demo;

import java.util.ArrayList;
import java.util.List;

public class App {

  public static void main( final String[] args ) {
    /* ⚠️ This will not compile!! */
    totalArea( new ArrayList<Object>() );
  }

  private static double totalArea( final List<? extends Shape> shapes ) { /* ... */ }
}
```

### Does covariance make generics susceptible to the same problem we saw with arrays before?

**No**.

Let's revise our previous example.

```java
package demo;

public class App {

  public static void main( final String[] args ) {
    final Shape[] shapes = new Square[2];

    /* ⚠️ This will fail at runtime!! */
    shapes[0] = new Circle( 7 );
  }
}
```

The issue with covariance happens when we try to add something to the array.

```java
    /* ⚠️ This will fail at runtime!! */
    shapes[0] = new Circle( 7 );
```

When using the `<? extends T>`, generics does not allow us to assign values.  **We can read, but we cannot write**.  Consider the following example.

{% include custom/dose_not_compile.html %}

```java
package demo;

import java.util.ArrayList;
import java.util.List;

public class App {

  public static void main( final String[] args ) {
    final List<? extends Shape> shapes = new ArrayList<Circle>();

    /* ⚠️ This will not compile!! */
    shapes.add( new Circle( 7 ) );
  }
}
```

The above example does not compile as we cannot add anything to the list `shapes`.

```bash
src/main/java/demo/App.java:12: error: incompatible types: Circle cannot be converted to CAP#1
    shapes.add( new Circle( 7 ) );
                ^
  where CAP#1 is a fresh type-variable:
    CAP#1 extends Shape from capture of ? extends Shape
```

## Contravariance

We can use generics to control what we can do and cannot do to a collection.  Using [covariance](#covariance) we can read from a list but we cannot write to the list.  Using contravariance we can (_somewhat_) achieve the opposite.  Consider the following example.

{% include custom/dose_not_compile.html %}

```java
package demo;

import java.util.ArrayList;
import java.util.List;

public class App {

  public static void main( final String[] args ) {
    final List<? super Pet> pets = new ArrayList<>();
    pets.add( new Pet() );
    pets.add( new Dog() );
    pets.add( new Cat() );

    /* ⚠️ This will not compile!! */
    final Pet firstPet = pets.get( 0 );
  }
}
```

While we can add pets to the list, we cannot read a `Pet` from the list.

```bash
src/main/java/demo/App.java:15: error: incompatible types: CAP#1 cannot be converted to Pet
    final Pet pet = pets.get( 0 );
                          ^
  where CAP#1 is a fresh type-variable:
    CAP#1 extends Object super: Pet from capture of ? super Pet
```

{% include custom/dose_not_compile.html %}

```java
package demo;

import java.util.ArrayList;
import java.util.List;

public class App {

  public static void main( final String[] args ) {
    call( new ArrayList<Object>() );
    call( new ArrayList<Pet>() );

    /* ⚠️ This will not compile!! */
    call( new ArrayList<Dog>() );
  }

  public static void call( List<? super Pet> pets ) {
  }
}
```

In

The use-site must have an open upper bound on the type parameter.

    If S is a subtype of T, then GenericType<S> is a supertype of GenericType<? super B>.

In Java everything is an object, which means we can read from the `pets` list, only that we need to save it in a variable of type `Object`.

```java
package demo;

import java.util.ArrayList;
import java.util.List;

public class App {

  public static void main( final String[] args ) {
    final List<? super Pet> pets = new ArrayList<>();
    pets.add( new Pet() );
    pets.add( new Dog() );
    pets.add( new Cat() );

    final Object firstPet = pets.get( 0 );
  }
}
```

Alternatively, we can use the `var` keyword which will achieve the same result.

```java
package demo;

import java.util.ArrayList;
import java.util.List;

public class App {

  public static void main( final String[] args ) {
    final List<? super Pet> pets = new ArrayList<>();
    pets.add( new Pet() );
    pets.add( new Dog() );
    pets.add( new Cat() );

    final var firstPet = pets.get( 0 );
  }
}
```

## Bi-variance

There are cases where we need to operate on a collection without interacting with its content.  Say we need to write a function that verifies whether the _i_th element in a collection is not `null`.  Consider the following example.

```java
package demo;

import java.util.List;

public class App {

  public static void main( final String[] args ) {

    final List<String> names = List.of( "Jade", "Aden" );
    final List<Pet> pets = List.of( new Dog(), new Cat() );

    isSet( names, 3 );
    isSet( pets, 1 );
  }

  public static boolean isSet( final List<?> list, final int index ) {
    return index < list.size() && list.get( index ) != null;
  }
}
```

The `isSet()` method takes a list of any type, `List<?>`.  This is bi-variant, as it has not upper or lower bound.

```java
package demo;

import java.util.ArrayList;
import java.util.List;

public class App {

  public static void main( final String[] args ) {
    final List<Pet> pets = new ArrayList<>();
    pets.add( new Dog( "Fido" ) );
    pets.add( new Cat( "Fluffy" ) );
  }

  private static void call( final List<?> pets ) {
    pets.forEach( pet -> System.out.printf( "Hello %s%n", pet ) );
  }
}
```
