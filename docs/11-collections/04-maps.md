---
layout: default
title: Maps
parent: Collections
nav_order: 4
permalink: docs/collections/maps/
---

# Maps
{: .no_toc }

The [`Map`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/Map.html) interface is the base interface for collections which allows to store unique key/value pairs, no necessary in any particular order.

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Create Maps

[Java 9](https://openjdk.java.net/projects/jdk9/) added static methods to the [Map](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/Map.html) interface [Map.of()](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/Map.html#of(E...)).  Consider the following example.

```java
package demo;

import java.util.Map;

public class App {
  public static void main( final String[] args ) {
    final Map<String, Integer> marks = Map.of(
      "Aden", 82,
      "Jade", 92,
      "Peter", 74,
      "Jane", 68
    );
    System.out.printf( "Marks: %s%n", marks );
  }
}
```

The above example create a map of students and their tests' mark, and simply print the map's elements (also referred to as _entries_), in no particular order.

```bash
Marks: {Aden=82, Jane=68, Peter=74, Jade=92}
```

Maps take a _key_ and a _value_, the students' name and their marks in the above example, and stores them as _entries_, as shown in the following image,

![Map-Entry.png]({{ '/assets/images/Map-Entry.png' | absolute_url }})

Maps can only contain unique keys.  We cannot have two entries with the same key.  The `Map.of()` method will throw an [`IllegalArgumentException`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/lang/IllegalArgumentException.html) if duplicate keys are provided. Consider the following example.

{% include custom/compile_but_throws.html e="IllegalArgumentException" %}

```java
package demo;

import java.util.Map;

public class App {
  public static void main( final String[] args ) {
    final Map<String, Integer> marks = Map.of(
      "Aden", 82,
      "Aden", 92
    );
    System.out.printf( "Marks: %s%n", marks );
  }
}
```

The above example will fail as expected.

```bash
Exception in thread "main" java.lang.IllegalArgumentException: duplicate key: Aden
	at java.base/java.util.ImmutableCollections$MapN.<init>(ImmutableCollections.java:977)
	at java.base/java.util.Map.of(Map.java:1328)
	at demo.App.main(App.java:7)
```

Generally, maps do not fail when duplicate keys are added.  Instead, the value associated with the duplicate key will simply replace the existing value.  This is a unique behaviour of the `Map.of()` methods.

## Hashtable

[Hashtable](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/Hashtable.html) is an implementation of `Map` interface based on [hash functions and buckets](https://en.wikipedia.org/wiki/Hash_table), as shown in the following image.

![Hashtable-Buckets-Entries.png]({{ '/assets/images/Hashtable-Buckets-Entries.png' | absolute_url }})

The image shown above is very similar to another image shown in the [sets page]({{ '/docs/collections/sets/#hashset' | absolute_url }}).  Hash bases sets, use maps 

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

## Can we store `null`s?

{% include custom/pending.html %}

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
