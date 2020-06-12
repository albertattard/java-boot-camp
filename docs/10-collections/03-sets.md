---
layout: default
title: Sets
parent: Collections
nav_order: 3
permalink: docs/collections/sets/
---

# Sets
{: .no_toc }

The `Set` interface is the base interface for collections which allows to store unique items no necessary in any particular order.

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Create Sets

1. Create sets

    Java 9 added a default functions to the [Set](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/Set.html) interface [Set.of()](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/Set.html#of(E...))

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

    Output

    ```bash
    Set [a, b, c]
    ```

## HashSet

[HashSet](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/HashSet.html)

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

    /* Add an element that already exists */
    a.add( "a" );

    System.out.printf( "Set %s%n", a );
  }
}
```

Output

```bash
Set [a, b, c]
```

The order in which the elements are returned is not guranteed and may vary between different versions of the JVM and JRE.

## LinkedHashSet

[LinkedHashSet](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/LinkedHashSet.html)

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

    /* Add an element that already exists */
    a.add( "a" );

    System.out.printf( "Set %s%n", a );
  }
}
```

Output

```bash
Set [b, c, a]
```

## TreeSet

[TreeSet](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/TreeSet.html)

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

    /* Add an element that already exists */
    a.add( "a" );

    System.out.printf( "Set %s%n", a );
  }
}
```

Output

```bash
Set [c, b, a]
```

The Java `TreeSet` is based on the [Red-Black tree](https://en.wikipedia.org/wiki/Red%E2%80%93black_tree).  The order in which the elements are sorted is goverend by the provided comparator or by their natural ordering.

Note that adding items to a list which do not support natural ordering and without providing a comparator will throw a `ClassCastException` at runtime.

**⚠️ THE FOLLOWING EXAMPLE WILL COMPILE BUT WILL THROW A `ClassCastException`!!**

```java
package demo;

import java.awt.Point;
import java.util.Set;
import java.util.TreeSet;

public class App {
  public static void main( final String[] args ) {
    final Set<Point> a = new TreeSet<>();
    a.add( new Point( 1, 2 ) );

    System.out.printf( "Points %s%n", a );
  }
}
```

The `Point` class does not implement the `Comparable` interface, thus this type of object does not provide natural ordering.  A comparator needs to be provided to the `TreeSet` to be able to work with the `Point` class.

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

The above will print.

```bash
Points [java.awt.Point[x=1,y=2]]
```

## Which set to use?

**🚧 Pending...**

## Set values **MUST BE** immutable

**🚧 Pending...**

## Double brace initialization

**🚧 Pending...**

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
