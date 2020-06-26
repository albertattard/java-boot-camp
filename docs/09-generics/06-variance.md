---
layout: default
title: Variance
parent: Generics
nav_order: 6
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
     @Override
     public String toString() {
       return "woof";
     }
   }
   ```

* A subtype, `Cat`

   ```java
   package demo;

   public class Cat extends Pet {
     @Override
     public String toString() {
       return "meao";
     }
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

    final Pet firstPet = pets.get( 0 );
  }
}
```

We can also read from the same list as we did with the `firstPet`.

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

    /* ⚠️ This will fail at runtime!! */
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

Generics support covariance without having the pitfalls of arrays.  Consider the following example. 

```java
package demo;

import java.util.ArrayList;
import java.util.List;

public class App {

  public static void main( final String[] args ) {
    final List<Pet> pets = new ArrayList<Pet>();
    pets.add( new Dog() );
    pets.add( new Cat() );

    final List<Dog> dogs = new ArrayList<Dog>();
    dogs.add( new Dog() );

    final List<Cat> cats = new ArrayList<Cat>();
    cats.add( new Cat() );

    call( pets );
    call( dogs );
    call( cats );
  }

  private static void call( final List<? extends Pet> pets ) {
    pets.forEach( pet -> System.out.printf( "Hello %s%n", pet ) );
  }
}
```

The `call()` takes an instance of `List<? extends Pet>`.  This means that the given list will contain `Pet` or any subtype of `Pet`, such as `Dog` or `Cat`.  We are able to invoke the `call()` method with lists of all types.

This means, if `S` is a subtype of `T`, then `GenericType<S>` is a subtype of `GenericType<? extends T>`.  We can use `List<Pet>`, `List<Cat>` or `List<Dog>` where a `List<? extends Pet>` is required.  In this example we are defining an upper bound and saying that the list will contain types that are subtypes of `Pet` (including `Pet`).  The receiver of the list must have an open lower bound as the list may contain anything that extends `Pet` (including `Pet`).

{% include custom/dose_not_compile.html %}

```java
package demo;

import java.util.ArrayList;
import java.util.List;

public class App {

  public static void main( final String[] args ) {
    call( new ArrayList<Dog>() );
    call( new ArrayList<Pet>() );

    /* ⚠️ This will not compile!! */
    call( new ArrayList<Object>() );
  }

  public static void call( List<? extends Pet> pets ) {
  }
}
```

**Does this make generics susseptable to the same problem we saw with arrays before?**

**No**.

Let's revise our previous example.

```java
package demo;

public class App {

  public static void main( final String[] args ) {
    final Pet[] pets = new Dog[2];

    /* ⚠️ This will fail at runtime!! */
    pets[0] = new Cat();
  }
}
```

The issue with covariance happens when we try to add something to the array.

```java
    /* ⚠️ This will fail at runtime!! */
    pets[0] = new Cat();
```

When using the `<? extends T>`, generics does not allow us to assign values.  **We can read, but we cannot write**.  Consider the following example.

{% include custom/dose_not_compile.html %}

```java
package demo;

import java.util.ArrayList;
import java.util.List;

public class App {

  public static void main( final String[] args ) {
    final List<? extends Pet> pets = new ArrayList<>();

    /* ⚠️ This will not compile!! */
    pets.add( new Dog() );
  }
}
```

The above example does not compile as we cannot add anything to the list `pets`.

```bash
src/main/java/demo/App.java:12: error: incompatible types: Dog cannot be converted to CAP#1
    pets.add( new Dog() );
              ^
  where CAP#1 is a fresh type-variable:
    CAP#1 extends Pet from capture of ? extends Pet
```

**Where can we use covariance?**

Using covariance, we can communicate our intenet when working with generics.  If our function is only going to read the list and do something with it, without modifying the list, then we can use this approach to communicate that. 

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
