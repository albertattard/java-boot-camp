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

## Invariance

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
