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

The above example creates a map of students and their tests' mark, and simply print the map's elements (also referred to as _entries_), in no particular order.

```bash
Marks: {Aden=82, Jane=68, Peter=74, Jade=92}
```

Maps take a _key_ and a _value_, the students' name and their marks in the above example, and stores them as _entries_, as shown in the following image,

![Map-Entry.png]({{ '/assets/images/Map-Entry.png' | absolute_url }})

Maps can be seen as a collection of entries that use the entry’s key to determine where to save the entity.  Maps can only contain unique keys.  We cannot have two entries with the same key.  The `Map.of()` method will throw an [`IllegalArgumentException`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/lang/IllegalArgumentException.html) if duplicate keys are provided.  Consider the following example.

{% include custom/compile_but_throws.html e="IllegalArgumentException" %}

```java
package demo;

import java.util.Map;

public class App {
  public static void main( final String[] args ) {
    /* ⚠️ Throws IllegalArgumentException!! */
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
	at demo.App.main(App.java:8)
```

Generally, maps do not fail when duplicate keys are added.  Instead, the value associated with the duplicate key will simply replace the existing value.  This is a unique behaviour of the `Map.of()` methods.

Some implementations of `Map` support `null` keys and/or values.  Unfortunately, the `Map.of()` method does not support `null`s, either as key or value and a `NullPointerException` is thrown when `null` is passed.

{% include custom/compile_but_throws.html e="NullPointerException" %}

```java
package demo;

import java.util.Map;

public class App {
  public static void main( final String[] args ) {
    /* ⚠️ Throws NullPointerException!! */
    final Map<String, Integer> marks = Map.of( "Aden", null );
    System.out.printf( "Marks: %s%n", marks );
  }
}
```

The above example will fail as expected.

```bash
Exception in thread "main" java.lang.NullPointerException
	at java.base/java.util.Objects.requireNonNull(Objects.java:222)
	at java.base/java.util.ImmutableCollections$Map1.<init>(ImmutableCollections.java:884)
	at java.base/java.util.Map.of(Map.java:1308)
	at demo.App.main(App.java:8)
```

## Hashtable

[Hashtable](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/Hashtable.html) is an implementation of `Map` interface based on [hash functions and buckets](https://en.wikipedia.org/wiki/Hash_table), as shown in the following diagram.

![Hashtable-Buckets-Entries.png]({{ '/assets/images/Hashtable-Buckets-Entries.png' | absolute_url }})

The image shown above is very similar to another image shown in the [sets page]({{ '/docs/collections/sets/#hashset' | absolute_url }}).  Hash based sets, use hash-based maps as their underlying data structure.

A `Hashtable` can be seen as a list of lists, where entities are placed in the bucket they belong.  A hash function is used to determine the bucket the entities belongs to, as shown in the following diagram.

![Hashtable-Buckets-Hash-Function.png]({{ '/assets/images/Hashtable-Buckets-Hash-Function.png' | absolute_url }})

The `Hashtable` will use the entry's **key** [`hashCode()`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/lang/Object.html#hashCode()) method to determine the bucket to which the entry belongs, then the [`equals()`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/lang/Object.html#equals(java.lang.Object)) method to determine whether this already exists within the bucket, as shown in the following diagram.

 {% include custom/note.html details="The entry's value does not take part in finding the entry in the map." %}

![Hashtable-Buckets-HashCode-Equals.png]({{ '/assets/images/Hashtable-Buckets-HashCode-Equals.png' | absolute_url }})

The relation between these two methods is so strong that the [Effective Java](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/) book has an item about this, [Item 11: Always override hashCode when you override equals](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/ch3.xhtml#lev11).

A `Hashtable` can be created like any other object, as shown next.

```java
package demo;

import java.util.Hashtable;
import java.util.Map;

public class App {
  public static void main( final String[] args ) {
    final Map<String, Integer> marksByName = new Hashtable<>();
    marksByName.put( "Aden", 82 );
    marksByName.put( "Jade", 92 );
    marksByName.put( "Peter", 74 );
    marksByName.put( "Jane", 68 );

    System.out.printf( "Marks: %s%n", marksByName );
  }
}
```

The above example creates a map and adds (puts) four entries to the set.  We can provide hits to the `Hashtable` constructor about its _initial capacity_ and the _load factor_.  The _load factor_ is the relation between number of buckets and the size of the map.  This is a trade-off between memory used and performance.  In most cases the default _load factor_ value works well, but there are cases where this needs to be tuned.

{% include custom/note.html details="Premature optimization is the root of all evil."%}

It is always recommended to provide an initial capacity when this is known as it minimises the number of times the `Hashtable` has to resize its internal data structures, as shown in the following example.

```java
package demo;

import java.util.Hashtable;
import java.util.Map;

public class App {
  public static void main( final String[] args ) {
    final Map<String, Integer> marksByName = new Hashtable<>( 4 );
    marksByName.put( "Aden", 82 );
    marksByName.put( "Jade", 92 );
    marksByName.put( "Peter", 74 );
    marksByName.put( "Jane", 68 );

    System.out.printf( "Marks: %s%n", marksByName );
  }
}
```

Both examples will print the same output.

```bash
Marks: {Jane=68, Peter=74, Jade=92, Aden=82}
```

The `Hashtable`'s `put()` method returns the previous value, if one exists and `null` if no value exists.

{% include custom/note.html details="Some types of maps may contain <code>null</code> as the entry's value.  Therefore, a <code>null</code> does not necessarily indicate that an entry did not exist for the given key." %}

When adding (putting) an entry, which key already exists in the map, the `put()` method will replace the existing entry with the new one and returns the previous entry's value, as shown in the following example.

```java
package demo;

import java.util.Hashtable;
import java.util.Map;

public class App {
  public static void main( final String[] args ) {
    final Map<String, Integer> marksByName = new Hashtable<>( 4 );
    marksByName.put( "Aden", 82 );
    marksByName.put( "Jade", 92 );
    marksByName.put( "Peter", 74 );
    marksByName.put( "Jane", 68 );

    final Integer previousMark = marksByName.put( "Aden", 84 );
    System.out.printf( "Previous mark: %s%n", previousMark );
  }
}
```

The entry for the given key is replaced by the new entry and the previous entry's values is returned, if one exists otherwise `null`, as also indicated in the following output.

```bash
Previous mark: 82
```

In some of above examples, the output is always returned in particular order.  This may give the wrong impression that the `Hashtable` always returns the elements in a given order.  **The order in which the elements are returned is not guaranteed and may vary between different versions of the JVM and JRE**.  There are other map implementations, such as [`LinkedHashMap`](#linkedhashmap) and [`TreeMap`](#treemap), that always return the elements in a specific order.

`Hashtable` is one of the oldest `Map` implementation.  Java provides better implementations of `Map`, such as [`HashMap`](#hashmap) when concurrency is not an issue or [`ConcurrentHashMap`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/concurrent/ConcurrentHashMap.html) when we need to work with multiple threads.

## HashMap

[HashMap](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/HashMap.html) is another implementation of the `Map` interface that works in a similar fashion as the [`Hashtable` described before](#hashtable).  Consider the following example.

```java
package demo;

import java.util.HashMap;
import java.util.Map;

public class App {
  public static void main( final String[] args ) {
    final Map<String, Integer> marksByName = new HashMap<>( 4 );
    marksByName.put( "Aden", 82 );
    marksByName.put( "Jade", 92 );
    marksByName.put( "Peter", 74 );
    marksByName.put( "Jane", 68 );

    /* Update an existing entry */
    marksByName.put( "Aden", 84 );

    System.out.printf( "Marks: %s%n", a );
  }
}
```

The order in which the items are returned is not guaranteed.

```bash
Marks: {John=91, Aden=72, Peter=74, Jane=68, Jade=92}
```

### What's the difference between the `Hashtable` and `HashMap` implementations?

These two `Map` implementations are very similar.

1. `Hashtable` (available since Java 1.0) came before `HashMap` (added in Java 1.2)

1. `Hashtable` methods are synchronized, which means that only one thread can access each method at any point in time keeping the data within the map consistent.  The `Hashtable`, despite being thread-safe, is still susceptible to [the check-then-act problem](https://en.wikipedia.org/wiki/Race_condition) when multiple methods are used as one operation.  The `HashMap` is not synchronized and thus cannot safely be used by multiple threads without additional safeguards.

1. `HashMap` supports `null`s for both the key and the value.  `Hashtable` does not support `null`s either as key or the value.

   `Hashtable` does not support `null` to mitigate the check-then-act problem.  The `put()` method of the `Hashtable` will **only** return `null` if the map does not contain an entry for the given key.  This does not apply to the `HashMap` as it can contain `null` values.

1. `Hashtable` is slower when compared to `HashMap` as synchronisation comes at a performance cost.

## Is `HashMap` the successor of the `Hashtable`?

**NO**

`HashMap` does not provide any concurrent safety and was never intended to.  Concurrency adds complexity and slows things down.  The `HashMap` is ideal for situations where concurrency is not a requirement.

The [`ConcurrentHashMap`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/concurrent/ConcurrentHashMap.html) supersedes the `Hashtable` as it provides a highly performant [concurrent map](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/concurrent/ConcurrentMap.html).

## LinkedHashMap

[`LinkedHashMap`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/LinkedHashMap.html) is a [`HashMap`](#hashmap) that also preserve the order in which entries are returned.  Consider the following example.

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

    System.out.printf( "Marks: %s%n", a );
  }
}
```

The entries will always be return in the same order these were added, as shown next.

```bash
Marks: {Aden=82, Jade=92, Peter=74, Jane=68}
```

`LinkedHashSet` uses a [doubly linked list](https://en.wikipedia.org/wiki/Doubly_linked_list) to preserve the order in which the elements are added to the set.

## TreeMap

[`TreeMap`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/TreeMap.html) is another `Map` implementation that uses a tree data structure.  The `TreeMap` is based on the red–black self-balancing binary search tree implementation.

![Red Black Tree](https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Red-black_tree_example.svg/2880px-Red-black_tree_example.svg.png)
([Reference](https://en.wikipedia.org/wiki/Red%E2%80%93black_tree))

Similar to other map implementations, only the entry's key take part in indexing and finding entries.  In the above image, the keys are integers and the value can be any object.

The tree marks its nodes _red_ or _black_, hence the name, and rebalances itself following an addition or deletion of elements, guaranteeing searches in `O(log n)` time.  This makes mutation more complex as the tree needs to be rebalanced every time elements are added or removed.

{% include custom/note.html details="Different to what many believe, the <code>TreeMap</code> <strong>does not</strong> outperform the <code>HashMap</code> when searching elements.  In most case the `HashMap` finds elements faster than the <code>TreeMap</code>." %}

Consider the following example.

```java
package demo;

import java.util.Map;
import java.util.TreeMap;

public class App {
  public static void main( final String[] args ) {
    final Map<String, Integer> marksByName = new TreeMap<>();
    marksByName.put( "Aden", 82 );
    marksByName.put( "Jade", 92 );
    marksByName.put( "Peter", 74 );
    marksByName.put( "Jane", 68 );

    System.out.printf( "Marks: %s%n", marksByName );
  }
}
```

In the above example, the `TreeMap` stores the given entries in alphabetical order, using the entry's key.  We can control how entries are handled by the `TreeMap` by providing a `Comparator` instance, as shown next.

```java
package demo;

import java.util.Comparator;
import java.util.Map;
import java.util.TreeMap;

public class App {
  public static void main( final String[] args ) {
    final Map<String, Integer> marksByName = new TreeMap<>( Comparator.reverseOrder() );
    marksByName.put( "Aden", 82 );
    marksByName.put( "Jade", 92 );
    marksByName.put( "Peter", 74 );
    marksByName.put( "Jane", 68 );

    System.out.printf( "Marks: %s%n", marksByName );
  }
}
```

Different from the previous example, the map will return the elements in reverse order, as shown next.

```bash
Marks: {Peter=74, Jane=68, Jade=92, Aden=82}
```

The order in which the entries are sorted is governed by the provided `Comparator` or by their natural ordering (the entry's key implements [`Comparable`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/lang/Comparable.html)).

Note that adding entries to a `TreeMap` which key does not support natural ordering (the key does not implement `Comparable`) and without providing a `Comparator` will throw a [`ClassCastException`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/lang/ClassCastException.html) at runtime.

{% include custom/compile_but_throws.html e="ClassCastException" %}

```java
package demo;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Map;
import java.util.TreeMap;

public class App {
  public static void main( final String[] args ) {
    final Map<Student, Integer> marksByName = new TreeMap<>();

    /* ⚠️ Throws ClassCastException!! */
    marksByName.put( new Student( "Aden" ), 82 );

    System.out.printf( "Marks: %s%n", marksByName );
  }
}

@Data
@AllArgsConstructor
class Student {
  private String name;
}
```

The `Student` class does not implement the `Comparable` interface, thus this type of object does not provide natural ordering.  A `Comparator` needs to be provided to the `TreeMap` to be able to work with the `Student` class, as shown in the following example.

```java
package demo;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Comparator;
import java.util.Map;
import java.util.TreeMap;

public class App {
  public static void main( final String[] args ) {
    final Comparator<Student> comparator = Comparator.comparing( Student::getName );

    final Map<Student, Integer> marksByName = new TreeMap<>( comparator );

    /* ⚠️ Throws ClassCastException!! */
    marksByName.put( new Student( "Aden" ), 82 );

    System.out.printf( "Marks: %s%n", marksByName );
  }
}

@Data
@AllArgsConstructor
class Student {
  private String name;
}
```

We can work with any key, as long as we provide a `Comparator` when the key being used do not implement `Comparable`.  The above will print.

```bash
Marks: {Student(name=Aden)=82}
```

**The `TreeMap` always store the elements sorted**.

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
