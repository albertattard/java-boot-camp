---
layout: default
title: Maps
parent: Collections
nav_order: 4
permalink: docs/collections/maps/
---

# Maps
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Create Maps

Java 9 added a default functions to the [Map](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/Map.html) interface [List.of()](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/Map.html#of(E...))

```java
package demo;

import java.util.Map;

public class App {
  public static void main( final String[] args ) {
    final Map<String, Integer> a = Map.of(
      "Aden", 82,
      "Jade", 92,
      "Peter", 74,
      "Jane", 68
    );
    System.out.printf( "Marks: %s%n", a );
  }
}
```

The above example will print

```bash
Marks: {Aden=82, Jane=68, Peter=74, Jade=92}
```

## Hashtable

[Hashtable](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/Hashtable.html) example.

```java
package demo;

import java.util.Hashtable;
import java.util.Map;

public class App {
  public static void main( final String[] args ) {
    final Map<String, Integer> a = new Hashtable<>();
    a.put( "Aden", 82 );
    a.put( "Jade", 92 );
    a.put( "Peter", 74 );
    a.put( "Jane", 68 );

    /* Update an existing entry */
    a.put( "Aden", 72 );

    /* Only added if the key is not found */
    a.putIfAbsent( "Jade", 0 );
    a.putIfAbsent( "John", 91 );

    System.out.printf( "Marks: %s%n", a );
  }
}
```

The order in which the items are returned is not guaranteed.

```bash
Marks: {John=91, Jane=68, Jade=92, Aden=72, Peter=74}
```

## HashMap

[HashMap](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/HashMap.html) example.

```java
package demo;

import java.util.HashMap;
import java.util.Map;

public class App {
  public static void main( final String[] args ) {
    final Map<String, Integer> a = new HashMap<>();
    a.put( "Aden", 82 );
    a.put( "Jade", 92 );
    a.put( "Peter", 74 );
    a.put( "Jane", 68 );

    /* Update an existing entry */
    a.put( "Aden", 72 );

    /* Only added if the key is not found */
    a.putIfAbsent( "Jade", 0 );
    a.putIfAbsent( "John", 91 );

    System.out.printf( "Marks: %s%n", a );
  }
}
```

The order in which the items are returned is not guaranteed.

```bash
Marks: {John=91, Aden=72, Peter=74, Jane=68, Jade=92}
```

## LinkedHashMap

[LinkedHashMap](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/LinkedHashMap.html) example.

```java
package demo;

import java.util.LinkedHashMap;
import java.util.Map;

public class App {
  public static void main( final String[] args ) {
    final Map<String, Integer> a = new LinkedHashMap<>();
    a.put( "Aden", 82 );
    a.put( "Jade", 92 );
    a.put( "Peter", 74 );
    a.put( "Jane", 68 );

    /* Update an existing entry */
    a.put( "Aden", 72 );

    /* Only added if the key is not found */
    a.putIfAbsent( "Jade", 0 );
    a.putIfAbsent( "John", 91 );

    System.out.printf( "Marks: %s%n", a );
  }
}
```

Items will preserv the order and will be returned in the order these are added.

```bash
Marks: {Aden=72, Jade=92, Peter=74, Jane=68, John=91}
```

## TreeMap

[TreeMap](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/TreeMap.html) example.

```java
package demo;

import java.util.Map;
import java.util.TreeMap;

public class App {
  public static void main( final String[] args ) {
    final Map<String, Integer> a = new TreeMap<>();
    a.put( "Aden", 82 );
    a.put( "Jade", 92 );
    a.put( "Peter", 74 );
    a.put( "Jane", 68 );

    /* Update an existing entry */
    a.put( "Aden", 72 );

    /* Only added if the key is not found */
    a.putIfAbsent( "Jade", 0 );
    a.putIfAbsent( "John", 91 );

    System.out.printf( "Marks: %s%n", a );
  }
}
```

The items are returned in the key's natural order.

```bash
Marks: {Aden=72, Jane=68, John=91, Jade=92, Peter=74}
```

## Which Map to Use?

HashTable synchronised

Hashmap
1. HashMap is non synchronized. It is not-thread safe and can’t be shared between many threads without proper synchronization code whereas Hashtable is synchronized. It is thread-safe and can be shared with many threads.
2. HashMap allows one null key and multiple null values whereas Hashtable doesn’t allow any null key or value.
3. HashMap is generally preferred over HashTable if thread synchronization is not needed

Why HashTable doesn’t allow null and HashMap does?
To successfully store and retrieve objects from a HashTable, the objects used as keys must implement the hashCode method and the equals method. Since null is not an object, it can’t implement these methods. HashMap is an advanced version and improvement on the Hashtable. HashMap was created later.

## Map keys **MUST BE** immutable

Consider the following example

```java
package demo;

import java.awt.point;
import java.util.HashMap;
import java.util.Map;

public class App {
  public static void main( final String[] args ) {
    final Point a = new Point( 1, 1 );

    final Map<Point, String> m = new HashMap<>( 3 );
    m.put( a, "Lower left corner" );

    System.out.println( "-- Before modifying the key ----" );
    System.out.printf( "The map contains %d points%n", m.size() );
    System.out.printf( "Is point %s in map? %s%n", a, m.containsKey( a ) );

    /* Modify the key */
    a.y = 10;

    System.out.println( "-- After modifying the key -----" );
    System.out.printf( "The map contains %d points%n", m.size() );
    System.out.printf( "Is point %s in map? %s%n", a, m.containsKey( a ) );
  }
}
```

The `Point` class is mutable and thus not suitable to be used as a key in any `Map`.  Modifying the point's state, as shown above example, will break the map.  In the above example, the map is not able to locate the same key object after it is modified.

```bash
-- Before modifying the key ----
The map contains 1 points
Is point java.awt.Point[x=1,y=1] in map? true
-- After modifying the key -----
The map contains 1 points
Is point java.awt.Point[x=1,y=10] in map? false
```

**Mutable objects are not good candidates as map keys**

## Double brace initialization

{% include custom/pending.html %}

## Mutable and immutable maps

{% include custom/pending.html %}
