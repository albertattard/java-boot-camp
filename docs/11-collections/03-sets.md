---
layout: default
title: Sets
parent: Collections
nav_order: 3
permalink: docs/collections/sets/
---

# Sets
{: .no_toc }

The [`Set`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/Set.html) interface is the base interface for collections which allows to store unique items, no necessary in any particular order.

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Create Sets

[Java 9](https://openjdk.java.net/projects/jdk9/) added static functions to the `Set` interface, [Set.of()](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/Set.html#of(E...)), that simplifies the creation of sets.

```java
package demo;

import java.util.Set;

public class App {
  public static void main( final String[] args ) {
    final Set<String> a = Set.of( "a", "b", "c" );
    System.out.printf( "Set %s%n", a );
  }
}
```

The above will simply print the set's elements, **in no particular order**.

```bash
Set [a, b, c]
```

Sets can only contain unique elements.  The `Set.of()` method will throw an [`IllegalArgumentException`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/lang/IllegalArgumentException.html) if duplicate elements are provided.  Consider the following example.

{% include custom/compile_but_throws.html e="IllegalArgumentException" %}

```java
package demo;

import java.util.Set;

public class App {
  public static void main( final String[] args ) {
    /* ⚠️ Throws IllegalArgumentException!! */
    final Set<String> a = Set.of( "a", "a", "a" );
    System.out.printf( "Set %s%n", a );
  }
}
```

The above example will fail as expected.

```bash
Exception in thread "main" java.lang.IllegalArgumentException: duplicate element: a
	at java.base/java.util.ImmutableCollections$SetN.<init>(ImmutableCollections.java:712)
	at java.base/java.util.Set.of(Set.java:503)
	at demo.App.main(App.java:8)
```

Generally, sets do not fail when duplicates are added.  Instead duplicate elements are simply ignored.  This is a unique behaviour of the `Set.of()` methods.

## HashSet

[`HashSet`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/HashSet.html) is an implementation of the `Set` interface based on [hash functions and buckets](https://en.wikipedia.org/wiki/Hash_table), as shown in the following image.

![HashSet-Buckets.png]({{ '/assets/images/HashSet-Buckets.png' | absolute_url }})

A `HashSet` can be seen as a list of lists, where elements are placed in the bucket they belong.  A hash function is used to determine the bucket the elements belongs to, as shown in the following image.

![HashSet-Buckets-Hash-Function.png]({{ '/assets/images/HashSet-Buckets-Hash-Function.png' | absolute_url }})

A `HashSet` can be created like any other object, as shown next.

```java
package demo;

import java.util.HashSet;
import java.util.Set;

public class App {
  public static void main( final String[] args ) {
    final Set<String> a = new HashSet<>();
    a.add( "b" );
    a.add( "c" );
    a.add( "a" );

    System.out.printf( "Set %s%n", a );
  }
}
```

The above example creates a set and adds three elements to the set.  We can provide hits to the `HashSet` constructor about its _initial capacity_ and the _load factor_.  The _load factor_ is the relation between number of buckets and the size of the set.  This is a trade-off between memory used and performance.  In most cases the default _load factor_ value works well, but there are cases where this needs to be tuned.

{% include custom/note.html details="Premature optimization is the root of all evil."%}

It is always recommended to provide an initial capacity when this is known as it minimises the number of times the `HashSet` has to resize its internal data structures, as shown in the following example.

```java
package demo;

import java.util.HashSet;
import java.util.Set;

public class App {
  public static void main( final String[] args ) {
    final Set<String> a = new HashSet<>( 3 );
    a.add( "b" );
    a.add( "c" );
    a.add( "a" );

    System.out.printf( "Set %s%n", a );
  }
}
```

Both examples will print the same output.

```bash
Set [a, b, c]
```

The `HashSet`'s `add()` method returns a `boolean` indicating whether the element that was offered was added or not.  When adding an element that already exists in the set, the `add()` method returns `false`, as shown in the following example.

```java
package demo;

import java.util.HashSet;
import java.util.Set;

public class App {
  public static void main( final String[] args ) {
    final Set<String> a = new HashSet<>();
    a.add( "b" );
    a.add( "c" );
    a.add( "a" );

    /* Add an element that already exists */
    final boolean wasAdded = a.add( "a" );
    System.out.printf( "Was duplicate added? %s%n", wasAdded ? "YES" : "NO" );

    System.out.printf( "Set %s%n", a );
  }
}
```

The `add()` method is defined by the [`Collection`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/Collection.html) interface and all collections, sets included, must honour the contracts defined by the `Collection` interface.

The duplicate element is not added to the set as also indicated in the following output.

```bash
Was duplicate added? NO
Set [a, b, c]
```

In the above examples, the output is always returned in alphabetical order.  This may give the wrong impression that the `HashSet` always returns the elements in a given order.  **The order in which the elements are returned is not guaranteed and may vary between different versions of the JVM and JRE**.  There are other set implementations, such as [`LinkedHashSet`](#linkedhashset) and [`TreeSet`](#treeset), that always return the elements in a specific order.

## LinkedHashSet

[`LinkedHashSet`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/LinkedHashSet.html) is a [`HashSet`](#hashset) that also preserve the order in which items are returned.  Consider the following example.

```java
package demo;

import java.util.LinkedHashSet;
import java.util.Set;

public class App {
  public static void main( final String[] args ) {
    final Set<String> a = new LinkedHashSet<>( 3 );
    a.add( "b" );
    a.add( "c" );
    a.add( "a" );

    System.out.printf( "Set %s%n", a );
  }
}
```

The above program will always return the element in the same order these where added.

```bash
Set [b, c, a]
```

`LinkedHashSet` uses a [doubly linked list](https://en.wikipedia.org/wiki/Doubly_linked_list) to preserve the order in which the elements are added to the set.

## TreeSet

[`TreeSet`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/TreeSet.html) is another set implementation that uses a tree data structure.  The `TreeSet` is based on the [red–black self-balancing binary search tree](https://en.wikipedia.org/wiki/Red%E2%80%93black_tree) implementation.  The tree marks its nodes _red_ or _black_, hence the name, and rebalances itself following an addition or deletion of elements, guaranteeing searches in `O(log n)` time.  This makes mutation more complex as the tree needs to be rebalanced every time elements are added or removed.

{% include custom/note.html details=" Different to what many believe, the <code>TreeSet</code> <strong>does not</strong> outperform the <code>HashSet</code> when searching elements.  In most case the `HashSet` finds elements faster than the <code>TreeSet</code>." %}

Consider the following example.

```java
package demo;

import java.util.Comparator;
import java.util.Set;
import java.util.TreeSet;

public class App {
  public static void main( final String[] args ) {
    final Set<String> a = new TreeSet<>();
    a.add( "b" );
    a.add( "c" );
    a.add( "a" );

    System.out.printf( "Set %s%n", a );
  }
}
```

In the above example, the `TreeSet` stores the given strings in alphabetical order.  We can control how elements are handled by the `TreeSet` by providing a `Comparator` instance, as shown next.

```java
package demo;

import java.util.Comparator;
import java.util.Set;
import java.util.TreeSet;

public class App {
  public static void main( final String[] args ) {
    final Set<String> a = new TreeSet<>( Comparator.reverseOrder() );
    a.add( "b" );
    a.add( "c" );
    a.add( "a" );

    System.out.printf( "Set %s%n", a );
  }
}
```

Different from the previous example, the set will return the elements in reverse order, as shown next.

```bash
Set [c, b, a]
```

The order in which the elements are sorted is governed by the provided `Comparator` or by their natural ordering (in the element implements [`Comparable`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/lang/Comparable.html)).

Note that adding elements to a `TreeSet` which do not support natural ordering (elements do not implement `Comparable`) and without providing a `Comparator` will throw a [`ClassCastException`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/lang/ClassCastException.html) at runtime.

{% include custom/compile_but_throws.html e="ClassCastException" %}

```java
package demo;

import java.awt.Point;
import java.util.Set;
import java.util.TreeSet;

public class App {
  public static void main( final String[] args ) {
    final Set<Point> a = new TreeSet<>();

    /* ⚠️ Throws ClassCastException!! */
    a.add( new Point( 1, 2 ) );

    System.out.printf( "Points %s%n", a );
  }
}
```

The [`Point`](https://docs.oracle.com/en/java/javase/14/docs/api/java.desktop/java/awt/Point.html) class does not implement the `Comparable` interface, thus this type of object does not provide natural ordering.  A `Comparator` needs to be provided to the `TreeSet` to be able to work with the `Point` class, as shown in the following example.

```java
package demo;

import java.awt.Point;
import java.util.Comparator;
import java.util.Set;
import java.util.TreeSet;

public class App {
  public static void main( final String[] args ) {
    /* Compare by point x then point y */
    final Comparator<Point> comparator =
      Comparator.comparing( Point::getX ).thenComparing( Point::getY );

    final Set<Point> a = new TreeSet<>( comparator );
    a.add( new Point( 1, 2 ) );

    System.out.printf( "Points %s%n", a );
  }
}
```

We can store any object to the `TreeSet` as long as we provide a `Comparator` when the elements being stored do not implement `Comparable`.  The above will print.

```bash
Points [java.awt.Point[x=1,y=2]]
```

**The `TreeSet` always store the elements sorted**.

## Which set to use?

{% include custom/pending.html %}

## Set values **MUST BE** immutable

{% include custom/pending.html %}

## Double brace initialization

{% include custom/pending.html %}

## Mutable and immutable sets

Unmodifiable sets cannot be modified

**⚠️ THE FOLLOWING EXAMPLE WILL COMPILE BUT THROWS AN UnsupportedOperationException!!**

```java
package demo;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

public class App {
  public static void main( final String[] args ) {
    final Set<String> a = new HashSet<>( 3 );
    a.add( "a" );
    a.add( "b" );
    a.add( "c" );

    /* Cannot modify the set through b */
    final Set<String> b = Collections.unmodifiableSet( a );

    /* Throws UnsupportedOperationException */
    b.add( "d" );
  }
}
```

Changing the unmodifiable set will throw an `UnsupportedOperationException`.

```bash
Exception in thread "main" java.lang.UnsupportedOperationException
  at java.base/java.util.Collections$UnmodifiableCollection.add(Collections.java:1062)
  at demo.App.main(App.java:18)
```

Changes to the underlying set will also affect the immutable set

```java
package demo;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

public class App {
  public static void main( final String[] args ) {
    final Set<String> a = new HashSet<>( 3 );
    a.add( "a" );
    a.add( "b" );
    a.add( "c" );

    /* Cannot modify the set through b */
    final Set<String> b = Collections.unmodifiableSet( a );

    /* The immutable set b will be modified too */
    a.add( "d" );

    System.out.printf( "Set a: %s%n", a );
    System.out.printf( "Set b: %s%n", b );
  }
}
```

Output

```bash
Set a: [a, b, c, d]
Set b: [a, b, c, d]
```
