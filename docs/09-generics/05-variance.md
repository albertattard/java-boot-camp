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

* A type, `Pet`

   ```java
   package demo;

   public class Pet {
   }
   ```

* A subtype, `Dog`

   ```java
   package demo;

   public class Dog extends Pet {
   }
   ```

* A subtype, `Cat`

   ```java
   package demo;

   public class Cat extends Pet {
   }
   ```

According to the LSP, we can use an instance of `Dog` (or `Cat`), wherever a `Pet` is required, as shown next.

```java
package demo;

public class App {

  public static void main( final String[] args ) {
    final Pet a = new Dog();
    final Pet b = new Cat();
  }
}
```

This applies to collections too.  For example an `ArrayList` implements the `List` interface, and we can use an instance of `ArrayList` whenever a `List` is required, as shown next.

```java
package demo;

import java.util.ArrayList;
import java.util.List;

public class App {

  public static void main( final String[] args ) {
    final List<Pet> pets = new ArrayList<Pet>();
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
    final Pet[] array = new Dog[0];

    /* ⚠️ This will not compile!! */
    final List<Pet> list = new ArrayList<Dog>();
  }
}
```

[Variance](https://en.wikipedia.org/wiki/Covariance_and_contravariance_(computer_science)) defines how subtyping between containers types, such as lists, or method's types relates to subtyping.  In Java, arrays are covariant while generics are invariant.  There are four types of variance that effect the behaviour of generics.

1. [Invariance](#invariance)
1. [Covariance](#covariance)
1. [Contravariance](#contravariance)
1. [Bi-variance](#bi-variance)

Each of these is discussed in depth in the following sections.

## Invariance

The types `Cat` and `Dog` are both subtypes of `Pet` and we can add them to a list of type `Pet`, as shown next.

```java
package demo;

import java.util.ArrayList;
import java.util.List;

public class App {

  public static void main( final String[] args ) {
    final List<Pet> pets = new ArrayList<Pet>();
    pets.add( new Dog() );
    pets.add( new Cat() );
  }
}
```

Generics are invariant which means that, if `S` is a subtype of `T`, then `GenericType<S>` is not a subtype of `GenericType<T>` and vice versa.

{% include custom/dose_not_compile.html %}

```java
package demo;

import java.util.ArrayList;
import java.util.List;

public class App {

  public static void main( final String[] args ) {
    /* ⚠️ This will not compile!! */
    final List<Pet> pets = new ArrayList<Dog>();
  }
}
```

Generics are invariant which means that `ArrayList<Dog>` is not a subtype of `ArrayList<Pet>` (or `List<Pet>`), therefore we cannot use `ArrayList<Dog>` where `List<Pet>` this is required.  The same applies to method parameters.  You cannot pass a `ArrayList<Dog>` to a method that requires a `List<Pet>`.

Arrays on the other hand are covariant, which means that `Dog[]` is a subtype of `Pet[]`.  Consider the following example.

{% include custom/compile_but_throws.html e="ArrayStoreException" %}

```java
package demo;

public class App {

  public static void main( final String[] args ) {
    final Pet[] pets = new Dog[2];
    pets[0] = new Cat();
  }
}
```

While compiles, it will fail at runtime with a `ArrayStoreException`, as shown next.

```bash
Exception in thread "main" java.lang.ArrayStoreException: demo.Cat
	at demo.App.main(App.java:7)
```

[Effective Java](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/) talks about this in [Item 28: Prefer lists to arrays](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/ch5.xhtml#lev28), whereas the title suggests, it recommends lists over arrays as much as possible.

## Covariance

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

## Contravariance

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
