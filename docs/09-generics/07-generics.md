---
layout: default
title: Generics
parent: Generics
nav_order: 7
permalink: docs/generics/generics/
---

# Generics
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Raw Types

Consider a list of names, as shown in the following example.

{% include custom/not_recommended.html details="The following example makes use of <em>raw types</em>, which are now discouraged" %}

```java
package demo;

import java.util.ArrayList;
import java.util.List;

public class App {

  public static void main( final String[] args ) {
    final List children = new ArrayList();
    children.add( "Jade" );
    children.add( "Aden" );
    System.out.printf( "Children: %s%n", children );
  }
}
```

The above example makes use of _raw types_, where we create a list without providing any hints to Java about the contents of the lists.  Our list will contain names, represented by the `String` type. This example will print the following.

```bash
Children: [Jade, Aden]
```

Before Java 1.5, we had no means to indicate to Java what's the content of the list.  This was quite annoying as we could not use the output of the list without casting it.  Consider the following example.

{% include custom/dose_not_compile.html %}

```java
package demo;

import java.util.ArrayList;
import java.util.List;

public class App {

  public static void main( final String[] args ) {
    final List children = new ArrayList();
    children.add( "Jade" );
    children.add( "Aden" );
    System.out.printf( "Children: %s%n", children );

    final String firstChild = children.get( 0 );
    System.out.printf( "%s is the first child%n", firstChild );
  }
}
```

The above example does not compile.  The list may contain anything and thus Java has no way to be certain that the given element is of type `String`.

```bash
src/main/java/demo/App.java:12: error: incompatible types: Object cannot be converted to String
    final String firstChild = children.get( 0 );
                                          ^
```

Despite teh fact that we know what the content of the list is, we have to type cast the result to the required type, as shown in the following fragment.

```java
    final String firstChild = (String) children.get( 0 );
```

Following is the complete example.

```java
package demo;

import java.util.ArrayList;
import java.util.List;

public class App {

  public static void main( final String[] args ) {
    final List children = new ArrayList();
    children.add( "Jade" );
    children.add( "Aden" );
    System.out.printf( "Children: %s%n", children );

    final String firstChild = (String) children.get( 0 );
    System.out.printf( "%s is the first child%n", firstChild );
  }
}
```

While casting elements was annoying this was not the main problem with raw types.  Consider the following example.

{% include custom/compile_but_throws.html e="ClassCastException" %}

```java
package demo;

import java.util.ArrayList;
import java.util.List;

public class App {

  public static void main( final String[] args ) {
    final List children = new ArrayList();
    children.add( "Jade" );
    children.add( "Aden" );

    /* ⚠️ We can add anything to a raw-typed list */
    /* ⚠️ Added an integer as the first element of the list */
    children.add( 0, 7 );

    System.out.printf( "Children: %s%n", children );

    final String firstChild = (String) children.get( 0 );
    System.out.printf( "%s is the first child%n", firstChild );
  }
}
```

In the above example, we are adding a new element in the list as the first element of type `Integer`.  Later on, we are retrieving the first element and casting it into a `String`, which will cause a `ClassCastException` to be thrown, as shown next.

```bash
Children: [7, Jade, Aden]
Exception in thread "main" java.lang.ClassCastException: class java.lang.Integer cannot be cast to class java.lang.String (java.lang.Integer and java.lang.String are in module java.base of loader 'bootstrap')
	at demo.App.main(App.java:19)
```

Raw types are quite error prone as the compiler cannot help us here.  The compiler produces warnings whenever these are used.

```bash
Note: src/main/java/demo/App.java uses unchecked or unsafe operations.
Note: Recompile with -Xlint:unchecked for details.
```

We can see the warnings by adding a new flag to the compiler within the `build.gradle` file, as shown next.

```groovy
tasks.withType(JavaCompile).each {
  it.options.deprecation = true
  it.options.compilerArgs.add('-Xlint:unchecked')
}
```

We can have more than one compiler flag.  For example, when using preview features, we also as the `--enable-preview` flag as shown next.

```groovy
tasks.withType(JavaCompile).each {
  it.options.deprecation = true
  it.options.compilerArgs.add('-Xlint:unchecked')
  it.options.compilerArgs.add('--enable-preview')
}
```

Compiling the class with the `-Xlint:unchecked` flag will show all warnings.

```bash
$ ./gradlew clean build

> Task :compileJava
src/main/java/demo/App.java:10: warning: [unchecked] unchecked call to add(E) as a member of the raw type List
    children.add( "Jade" );
                ^
  where E is a type-variable:
    E extends Object declared in interface List
src/main/java/demo/App.java:11: warning: [unchecked] unchecked call to add(E) as a member of the raw type List
    children.add( "Aden" );
                ^
  where E is a type-variable:
    E extends Object declared in interface List
2 warnings

BUILD SUCCESSFUL in 2s
10 actionable tasks: 10 executed
```

[Effective Java](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097) advise against usage of raw types, in [Item 26: Don’t use raw types](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/ch5.xhtml#lev26), and recommends the use of [Generics, discussed next](#generics).  The next item in the same chapter, [Item 27: Eliminate unchecked warnings](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/ch5.xhtml#lev27), strongly recommends getting rid of unchecked warnings too.

## Generics

1. Casting is not required anymore

   ```java
   package demo;

   import java.util.ArrayList;
   import java.util.List;

   public class App {

     public static void main( final String[] args ) {
       final List<String> children = new ArrayList<String>();
       children.add( "Jade" );
       children.add( "Aden" );
       System.out.printf( "Children: %s%n", children );

       final String firstChild = children.get( 0 );
       System.out.printf( "%s is the first child%n", firstChild );
     }
   }
   ```

1. Cannot add anything else but Strings

   {% include custom/dose_not_compile.html %}

   ```java
   package demo;

   import java.util.ArrayList;
   import java.util.List;

   public class App {

     public static void main( final String[] args ) {
       final List<String> children = new ArrayList<String>();
       children.add( "Jade" );
       children.add( "Aden" );

       /* ⚠️ Cannot add an int to a list of type String */
       children.add( 0, 7 );

       System.out.printf( "Children: %s%n", children );
     }
   }
   ```

   ```bash
   src/main/java/demo/App.java:14: error: incompatible types: int cannot be converted to String
       children.add( 0, 7 );
                        ^
   ```

Some details: https://stackoverflow.com/questions/4166966/what-is-the-point-of-the-diamond-operator-in-java-7

```java
package demo;

import java.awt.Point;
import java.util.ArrayList;
import java.util.List;

public class App {

  public static void main( final String[] args ) {
    final List<String> children = createRawTypeList();
    children.add( "Jade" );
    children.add( "Aden" );
    System.out.printf( "Children: %s%n", children );
  }

  public static List createRawTypeList() {
    final List rawType = new ArrayList();
    rawType.add( 7 );
    rawType.add( new Point( 1, 2 ) );
    return rawType;
  }
}
```

```bash
Children: [7, java.awt.Point[x=1,y=2], Jade, Aden]
```

```bash
Note: src/main/java/demo/App.java uses unchecked or unsafe operations.
Note: Recompile with -Xlint:unchecked for details.
```

## Diamond Operator

[Diamond Operator](https://docs.oracle.com/javase/8/docs/technotes/guides/language/type-inference-generic-instance-creation.html)


```java
    final List<String> children = new ArrayList<String>();
```

```java
    final List<String> children = new ArrayList<>();
```

```java
package demo;

import java.util.ArrayList;
import java.util.List;

public class App {

  public static void main( final String[] args ) {
    final List<String> children = new ArrayList<>();
    children.add( "Jade" );
    children.add( "Aden" );
    System.out.printf( "Children: %s%n", children );
  }
}
```

TODO: there are cases where this cannot be used.

## Methods

```java
package demo;

import java.util.ArrayList;
import java.util.List;

public class App {

  public static void main( final String[] args ) {
    final List<String> children = new ArrayList<>();
    children.add( "Jade" );
    children.add( "Aden" );

    final String last = last( children );
    System.out.printf( "Last child: %s%n", last );
  }

  private static String last( final List<String> list ) {
    return list.isEmpty() ? null : list.get( list.size() - 1 );
  }
}
```

{% include custom/dose_not_compile.html %}

```java
package demo;

import java.util.ArrayList;
import java.util.List;

public class App {

  public static void main( final String[] args ) {
    final List<String> children = new ArrayList<>();
    children.add( "Jade" );
    children.add( "Aden" );

    final List<Integer> ages = new ArrayList<>();
    ages.add( 13 );
    ages.add( 11 );

    final String lastChild = last( children );
    final Integer lastAge = last( ages );
    System.out.printf( "The last child, %s, is %d years old%n", lastChild, lastAge );
  }

  private static String last( final List<String> list ) {
    return list.isEmpty() ? null : list.get( list.size() - 1 );
  }

  private static Integer last( final List<Integer> list ) {
    return list.isEmpty() ? null : list.get( list.size() - 1 );
  }
}
```

```java
package demo;

import java.util.ArrayList;
import java.util.List;

public class App {

  public static void main( final String[] args ) {
    final List<String> children = new ArrayList<>();
    children.add( "Jade" );
    children.add( "Aden" );

    final List<Integer> ages = new ArrayList<>();
    ages.add( 13 );
    ages.add( 11 );

    final String lastChild = last( children );
    final Integer lastAge = last( ages );
    System.out.printf( "The last child, %s, is %d years old%n", lastChild, lastAge );
  }

  private static <T> T last( final List<T> list ) {
    return list.isEmpty() ? null : list.get( list.size() - 1 );
  }
}
```

```bash
The last child, Aden, is 11 years old
```

## Classes

```java
package demo;

import lombok.Data;

@Data(staticConstructor = "of")
public class Pair<N, V> {

  private final N name;
  private final V value;
}
```

```java
package demo;

import java.awt.Point;

public class App {

  public static void main( final String[] args ) {
    final Pair<String, Integer> a = Pair.of( "Jade", 13 );
    final Pair<String, Point> b = Pair.of( "Origin", new Point( 0, 0 ) );

    System.out.printf( "a: %s%n", a );
    System.out.printf( "b: %s%n", b );
  }
}
```

```bash
a: Pair(name=Jade, value=13)
b: Pair(name=Origin, value=java.awt.Point[x=0,y=0])
```

```java
package demo;

import java.awt.Point;

public class App {

  public static void main( final String[] args ) {
    final var a = Pair.of( "Jade", 13 );
    final var b = Pair.of( "Origin", new Point( 0, 0 ) );

    System.out.printf( "a: %s%n", a );
    System.out.printf( "b: %s%n", b );
  }
}
```

```java
package demo;

import java.util.ArrayList;
import java.util.List;

public class App {

  public static void main( final String[] args ) {
    final List<Pair<String, Integer>> children = new ArrayList<>();
    children.add( Pair.of( "Jade", 13 ) );
    children.add( Pair.of( "Aden", 11 ) );

    System.out.printf( "Children: %s%n", children );
  }
}
```

Not the same!!

{% include custom/proceed_with_caution.html details="The list named, <code>children</code> can contain any <code>Object</code>." %}

```java
package demo;

import java.util.ArrayList;
import java.util.List;

public class App {

  public static void main( final String[] args ) {
    final var children = new ArrayList<>();
    children.add( Pair.of( "Jade", 13 ) );
    children.add( Pair.of( "Aden", 11 ) );

    System.out.printf( "Children: %s%n", children );
  }
}
```

```java
    final var children = new ArrayList<Object>();
```

## Type Erasure

Are not 100% Erased

```java
package java.util.concurrent;

@FunctionalInterface
public interface Callable<V> {

    V call() throws Exception;
}
```

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
$ javap build/classes/java/main/demo/PiCallable.class

Compiled from "PiCallable.java"
public class demo.PiCallable implements java.util.concurrent.Callable<java.lang.Double> {
  public demo.PiCallable();
  public java.lang.Double call();
  public java.lang.Object call() throws java.lang.Exception;
}
```

Some generic information is retained for linking purposes, otherwise the compiler will not be able to determine whether this is the correct generic.

```java
public void readDouble(Callable<Double> callable) { /* ... */ }
```

Generics need to be backward compatible and need to support raw types.  That's why we have two versions of the `call()` method.

```java
public void linkToRawType(Callable callable) { /* ... */ }
```

## Variance

### Invariance

```java
package demo;

public class Pet {
}
```

```java
package demo;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode( callSuper = false )
public class Dog extends Pet {

  private final String name;
}
```

{% include custom/dose_not_compile.html %}

```java
package demo;

import java.util.ArrayList;
import java.util.List;

public class App {

  public static void main( final String[] args ) {
    final List<Pet> pets = new ArrayList<Dog>();
  }
}
```

Arrays

```java
package demo;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode( callSuper = false )
public class Cat extends Pet {

  private final String name;
}
```

{% include custom/compile_but_throws.html e="ArrayStoreException" %}

Arrays Are Covariant!!

Item 28: Prefer lists to arrays
https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/ch5.xhtml#lev28

```java
package demo;

public class App {

  public static void main( final String[] args ) {
    final Pet[] pets = new Dog[2];
    pets[0] = new Cat();
  }
}
```

```bash
Exception in thread "main" java.lang.ArrayStoreException: demo.Cat
	at demo.App.main(App.java:7)
```

```java
package demo;

import java.util.ArrayList;
import java.util.List;

public class App {

  public static void main( final String[] args ) {
    final List<Pet> pets = new ArrayList<>();
    pets.add( new Dog( "Fido" ) );
    pets.add( new Cat( "Fluffy" ) );

    System.out.printf( "Pets %s%n", pets );
  }
}
```

```bash
Pets [Dog(name=Fido), Cat(name=Fluffy)]
```

```java
package demo;

import java.util.ArrayList;
import java.util.List;

public class App {

  public static void main( final String[] args ) {
    final List<Pet> pets = new ArrayList<>();
    pets.add( new Dog( "Fido" ) );
    pets.add( new Cat( "Fluffy" ) );

    call( pets );
  }

  private static void call( final List<Pet> pets ) {
    pets.forEach( pet -> System.out.printf( "Hello %s%n", pet ) );
  }
}
```

### Covariance

```java
package demo;

import java.util.ArrayList;
import java.util.List;

public class App {

  public static void main( final String[] args ) {
    final List<Pet> pets = new ArrayList<>();
    pets.add( new Dog( "Fido" ) );
    pets.add( new Cat( "Fluffy" ) );

    call( pets );
  }

  private static void call( final List<? extends Pet> pets ) {
    pets.forEach( pet -> System.out.printf( "Hello %s%n", pet ) );
  }
}
```

{% include custom/dose_not_compile.html %}

```java
package demo;

import java.util.ArrayList;
import java.util.List;

public class App {

  public static void main( final String[] args ) {
    final List<? extends Pet> pets = new ArrayList<>();
    pets.add( new Dog( "Fido" ) );
    pets.add( new Cat( "Fluffy" ) );

    call( pets );
  }

  private static void call( final List<? extends Pet> pets ) { /* ... */ }
}
```

```bash
src/main/java/demo/App.java:10: error: incompatible types: Dog cannot be converted to CAP#1
    pets.add( new Dog( "Fido" ) );
              ^
  where CAP#1 is a fresh type-variable:
    CAP#1 extends Pet from capture of ? extends Pet
```

### Contravariance

{% include custom/dose_not_compile.html %}

```java
package demo;

import java.util.ArrayList;
import java.util.List;

public class App {

  public static void main( final String[] args ) {
    final List<? super Pet> pets = new ArrayList<>();
    pets.add( new Dog( "Fido" ) );
    pets.add( new Cat( "Fluffy" ) );

    final Pet pet = pets.get( 0 );
  }
}
```

```bash
src/main/java/demo/App.java:13: error: incompatible types: CAP#1 cannot be converted to Pet
    final Pet pet = pets.get( 0 );
                          ^
  where CAP#1 is a fresh type-variable:
    CAP#1 extends Object super: Pet from capture of ? super Pet
```

```java
package demo;

import java.util.ArrayList;
import java.util.List;

public class App {

  public static void main( final String[] args ) {
    final List<? super Pet> pets = new ArrayList<>();
    pets.add( new Dog( "Fido" ) );
    pets.add( new Cat( "Fluffy" ) );

    final var pet = pets.get( 0 );
    System.out.printf( "My pet is %s%n", pet );
  }
}
```

```bash
My pet is Dog(name=Fido)
```

## Bi-variance

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
