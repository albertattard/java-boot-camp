---
layout: default
title: Methods
parent: Generics
nav_order: 3
permalink: docs/generics/methods/
---

# Methods
{: .no_toc }

Generics are not limited to type declaration.  These can be used with method parameters and return types as shown in this section.

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Methods type parameters

Methods can work with generics too.  Consider the following example.

```java
package demo;

import java.util.ArrayList;
import java.util.List;

public class App {

  public static void main( final String[] args ) {
    final List<String> children = new ArrayList<>();
    children.add( "Jade" );
    children.add( "Aden" );

    printNames( children );
  }

  private static void printNames( final List<String> list ) {
    list.forEach( name -> System.out.printf( "%s%n", name.toUpperCase() ) );
  }
}
```

The `printNames()` methods takes a list of `String` and prints each name in upper case, as shown next.

```bash
JADE
ADEN
```

The `printNames()` method does not need to type cast the contents of the list as this is considered to be of type `String`.

## Can we overload method using generics?

Returning the last element of a list is a tedious operation as we need to check whether the list is empty and if it is not empty, then we need to determine the size of the list and return the element at the size of the list less 1, as shown in the following fragment.

```java
var lastElement = list.isEmpty() ? null : list.get( list.size() - 1 );
```

We can capture this in a method to improve readability and maximise reuse.

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

Now say that we have two lists, one of type `String` and the other of type `Integer`, and we need to return the last element for either list type, as shown in the following example.

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

The above example, will not compile as the signature of the `last()` methods is the same.  Java cannot tell these two methods apart by using the generic types.  We can refactor these methods and use a different name for each or make better use of generics as discussed [next](#method-returning-a-generic-type).

## Method returning a generic type

The `last()` methods, shown in the [previous](#can-we-overload-method-using-generics) example, are almost equivalent.

1. Working with strings

   ```java
     private static String last( final List<String> list ) {
       return list.isEmpty() ? null : list.get( list.size() - 1 );
     }
   ```

1. Working with integers

   ```java
     private static Integer last( final List<Integer> list ) {
       return list.isEmpty() ? null : list.get( list.size() - 1 );
     }
   ```

These two methods are not working with the list's content.  These methods are simply returning the last element.  These two variations can be combined into one method using generics, as shown next.

```java
  private static <T> T last( final List<T> list ) {
    return list.isEmpty() ? null : list.get( list.size() - 1 );
  }
```

The new version of this method can take a list of any type and returns the last element in the list.  If the list is empty, this method returns `null`.  Following is a complete example that make use of the new `list()` method.

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

The above method will print the following.

```bash
The last child, Aden, is 11 years old
```
