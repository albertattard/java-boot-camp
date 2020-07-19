---
layout: default
title: Lists
parent: Collections
nav_order: 2
permalink: docs/collections/lists/
---

# Lists
{: .no_toc }

The [`List`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/List.html) interface is the base interface for collections which allows to store an ordered collection of elements in a resizable container.

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Create Lists

There are several ways how a list can be created.  Following is an example of how a list be can created from an array, using the [`Arrays`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/Arrays.html) class.

```java
package demo;

import java.util.Arrays;
import java.util.List;

public class App {
  public static void main( final String[] args ) {
    final List<String> a = Arrays.asList( "a", "b", "c" );
    System.out.printf( "List %s%n", a );
  }
}
```

[Java 9](https://openjdk.java.net/projects/jdk9/) added static methods to the `List` interface [`List.of()`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/List.html#of(E...))

```java
package demo;

import java.util.List;

public class App {
  public static void main( final String[] args ) {
    final List<String> a = List.of( "a", "b", "c" );
    System.out.printf( "List %s%n", a );
  }
}
```

Output

```bash
List [a, b, c]
```

## Vector

[`Vector`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/Vector.html) uses an array internally as data structure.  They are dynamically resizable.  By default, `Vector` doubles the size of its array when its size is increased.

```java
package demo;

import java.util.List;
import java.util.Vector;

public class App {
  public static void main( final String[] args ) {
    final List<String> a = new Vector<>();
    a.add( "b" );
    a.add( "c" );

    /* Add at a given existing location */
    a.add( 0, "a" );

    System.out.printf( "List %s%n", a );
  }
}
```

When initialising the `Vector`, it is best to provide an indication of the `Vector`'s size.  This enables the `Vector` to create an array once and mitigate the need of array resize.

```java
package demo;

import java.util.List;
import java.util.Vector;

public class App {
  public static void main( final String[] args ) {
    final List<String> a = new Vector<>( 3 );
    a.add( "b" );
    a.add( "c" );

    /* Add at a given existing location */
    a.add( 0, "a" );

    System.out.printf( "List %s%n", a );
  }
}
```

Both examples will produce the same output.

```bash
List [a, b, c]
```

The `Vector`'s methods are `syncronised`.  This provides a thread-safety.

{% include custom/note.html details="While each individual method is thread-safe and atomic, a gaurd is needed when wworking with multiple methods." %}

```java
```

## ArrayList

[`ArrayList`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/ArrayList.html) uses Array internally as data structure. They are dynamically resizable.  By default, ArrayList increases by half of its size when its size is increased.

```java
package demo;

import java.util.ArrayList;
import java.util.List;

public class App {
  public static void main( final String[] args ) {
    final List<String> a = new ArrayList<>( 3 );
    a.add( "b" );
    a.add( "c" );

    /* Add at a given existing location */
    a.add( 0, "a" );

    System.out.printf( "List %s%n", a );
  }
}
```

Output

```bash
List [a, b, c]
```

## LinkedList

LinkedList is implemented as a double linked list.

[LinkedList](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/LinkedList.html)

```java
package demo;

import java.util.LinkedList;
import java.util.List;

public class App {
  public static void main( final String[] args ) {
    final List<String> a = new LinkedList<>();
    a.add( "b" );
    a.add( "c" );

    /* Add at a given existing location */
    a.add( 0, "a" );

    System.out.printf( "List %s%n", a );
  }
}
```

Output

```bash
List [a, b, c]
```

## Which list to use?

Array based collections are faster and take less space when compare to linked list based. Linked list has higher overheads per item when compared to arrays based.  The only one place linked list out performs the array is FIFO queue.  Iterating is faster with arrays as items in the array are close to each other.  ArrayList is slow when we need to add or remove elements as we need to shift things down.

Technically, `Stack` and other classes also implement the `List` interface and provide the list features you expect. However, they are meant for other purposes, and their use as a list is therefore discouraged.

## Double brace initialization

Consider the following example.

```java
package demo;

import java.util.ArrayList;
import java.util.List;

public class App {
  public static void main( final String[] args ) {
    final List<String> a = new ArrayList<>() { {
      add( "a" );
      add( "b" );
      add( "c" );
    } };
    System.out.printf( "List %s%n", a );
  }
}
```

The above example makes use of double brace initialization. An inner anonymous class is created and the init block is used to add the elements to the list.  The above example is similar to the following.

```java
package demo;

import java.util.ArrayList;

public class MyStringList extends ArrayList<String> {

  /* Initialisation block */
  {
    add( "a" );
    add( "b" );
    add( "c" );
  }
}
```

I've never used this pattern and prefer other constructs instead, such as `List.of()` or [Guava.'s `Lists.asList()`](https://guava.dev/releases/21.0/api/docs/com/google/common/collect/Lists.html#asList-E-E:A-).  I've added this example here as you may encounter this in code.

## Mutable and Immutable Lists

Unmodifiable lists cannot be modified

{% include custom/compile_but_throws.html e="UnsupportedOperationException" %}

```java
package demo;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class App {
  public static void main( final String[] args ) {
    final List<String> a = new ArrayList<>( 3 );
    a.add( "a" );
    a.add( "b" );
    a.add( "c" );

    /* Cannot modify the list through b */
    final List<String> b = Collections.unmodifiableList( a );

    /* Throws UnsupportedOperationException */
    b.add( "d" );
  }
}
```

Changing the unmodifiable list will throw an `UnsupportedOperationException`.

```bash
Exception in thread "main" java.lang.UnsupportedOperationException
  at java.base/java.util.Collections$UnmodifiableCollection.add(Collections.java:1062)
  at demo.App.main(App.java:18)
```

Changes to the underlying list will also affect the immutable list

```java
package demo;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class App {
  public static void main( final String[] args ) {
    final List<String> a = new ArrayList<>( 3 );
    a.add( "a" );
    a.add( "b" );
    a.add( "c" );

    /* Cannot modify the list through b */
    final List<String> b = Collections.unmodifiableList( a );

    /* The immutable list b will be modified too */
    a.add( "d" );

    System.out.printf( "List a: %s%n", a );
    System.out.printf( "List b: %s%n", b );
  }
}
```

Output

```bash
List a: [a, b, c, d]
List b: [a, b, c, d]
```
