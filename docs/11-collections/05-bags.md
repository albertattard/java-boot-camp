---
layout: default
title: Bags
parent: Collections
nav_order: 4
permalink: docs/collections/bags/
---

# Bags
{: .no_toc }

The _bag data type_ is a collection that allows storing of elements **and their cardinality**, in no particular order.  A `Bag<T>` can be seen as a special `Map<T, Integer>` (or `Map<T, Long>`), where together with the element, it stores the number of occurrences.

Bags are not part of the Java collections framework.  In this page will use two popular collections libraries, [Google Guava](#google-guava) and [Eclipse Collections](#eclipse-collections) to demonstrate some of the bag data type functionality.

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## The bag data type

Consider a fruit basket containing two _apples_ and an _orange_.  Storing the fruit in a bag data type will look like the following diagram.

![Bag Data Type]({{ '/assets/images/Bag Data Type.png' | absolute_url }})

Taking an apple and an orange will reduce the count for apple and will remove the orange from the bag, as shown in the following diagram.

![Take Fruit from Bag]({{ '/assets/images/Bag - Take Fruit from Bag.png' | absolute_url }})

Elements which count is less than 1 are removed from the bag.

A `Bag<T>` can be seen as a special `Map<T, Integer>` (or `Map<T, Long>`), where together with the element, it stores the number of occurrences.  The bag is a good option when a Map<T, Integer> is required as the bag type provides most of the boilerplate core required.  For example, [counting an element that does not exist](#retrieve-the-count-of-an-element-that-does-not-exist) will yield `0` instead of `null`.

### Google Guava

[Google Guava](https://github.com/google/guava) support bags as [`Multiset`](https://guava.dev/releases/29.0-jre/api/docs/com/google/common/collect/Multiset.html) types.

```groovy
dependencies {
  implementation 'com.google.guava:guava:29.0-jre'
}
```

Following is a simple example of the fruit basket containing two apples and an orange.

```java
package demo;

import com.google.common.collect.HashMultiset;
import com.google.common.collect.Multiset;

public class App {
  public static void main( final String[] args ) {
    final Multiset<String> fruitBasket = HashMultiset.create();
    fruitBasket.add( "Apple" );
    fruitBasket.add( "Apple" );
    fruitBasket.add( "Orange" );

    final int apples = fruitBasket.count( "Apple" );
    System.out.printf( "We have %d apples in the basket%n", apples );
  }
}
```

### Eclipse Collections

[Eclipse Collections](https://www.eclipse.org/collections/) support bags as [`Bag`](https://www.eclipse.org/collections/javadoc/10.2.0/org/eclipse/collections/api/bag/Bag.html)

```groovy
dependencies {
  implementation 'org.eclipse.collections:eclipse-collections:10.2.0'
}
```

Following is a simple example of the fruit basket containing two apples and an orange.

```java
package demo;

import org.eclipse.collections.api.bag.MutableBag;
import org.eclipse.collections.api.factory.Bags;

public class App {
  public static void main( final String[] args ) {
    final MutableBag<String> fruitBasket = Bags.mutable.of( "Apple", "Orange" );
    fruitBasket.add( "Apple" );

    final int apples = fruitBasket.occurrencesOf( "Apple" );
    System.out.printf( "We have %d apples in the basket%n", apples );
  }
}
```

## Size of a bag

The size of the bag is equivalent to the sum of all its elements.  In our bag of fruit, we have three fruits, two apples and an orange.  In this case, the bag's size is `3`.  This is different for the `Map` data type, where the size of the map is the number of its keys.  In this case, it will be `2`.

### Google Guava

Consider the following example.

```java
package demo;

import com.google.common.collect.HashMultiset;
import com.google.common.collect.Multiset;

public class App {
  public static void main( final String[] args ) {
    final Multiset<String> fruitBasket = HashMultiset.create();
    fruitBasket.add( "Apple" );
    fruitBasket.add( "Apple" );
    fruitBasket.add( "Orange" );

    final int numberOfFruit = fruitBasket.size();
    System.out.printf( "We have %d fruit in the basket%n", numberOfFruit );
  }
}
```

The size of the above bag is `3` as shown in the following output.

```bash
We have 3 fruit in the basket
```

### Eclipse Collections

Consider the following example.

```java
package demo;

import org.eclipse.collections.api.bag.MutableBag;
import org.eclipse.collections.api.factory.Bags;

public class App {
  public static void main( final String[] args ) {
    final MutableBag<String> fruitBasket = Bags.mutable.of( "Apple", "Orange" );
    fruitBasket.add( "Apple" );

    final int numberOfFruit = fruitBasket.size();
    System.out.printf( "We have %d fruit in the basket%n", numberOfFruit );
  }
}
```

The size of the above bag is `3` as shown in the following output.

```bash
We have 3 fruit in the basket
```

## Retrieve the count of an element that does not exist

While bags can be seen as `Map<T, Integer>`, these behave slightly different.  Counting elements that do not exist will return a `0` and not `null`.

### Google Guava

Consider the following example.

```java
package demo;

import com.google.common.collect.HashMultiset;
import com.google.common.collect.Multiset;

public class App {
  public static void main( final String[] args ) {
    final Multiset<String> fruitBasket = HashMultiset.create();
    fruitBasket.add( "Apple" );
    fruitBasket.add( "Apple" );
    fruitBasket.add( "Orange" );

    final int banana = fruitBasket.count( "Banana" );
    System.out.printf( "We have %d banana in the basket%n", banana );
  }
}
```

The fruit `"Banana"` does not exists in the bag, yet the [`count()`](https://guava.dev/releases/29.0-jre/api/docs/com/google/common/collect/Multiset.html#count-java.lang.Object-) method returns an `int` (primitive type and not [the `Integer` object wrapper](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/lang/Integer.html)) and not a `null`.  If the item does not exist, the `count()` method returns `0`.

Guava's `count()` method relies on the object's [`equals()`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/lang/Object.html#equals(java.lang.Object)) and [`hashCode()`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/lang/Object.html#hashCode()) methods.

{% include custom/do_not_use_as_is.html details="The following example does not work as expected as the <code>hashCode()</code> method is not implemented on purpose." %}

```java
package demo;

import com.google.common.collect.HashMultiset;
import com.google.common.collect.Multiset;
import lombok.AllArgsConstructor;

import java.util.Objects;

public class App {
  public static void main( final String[] args ) {
    final Multiset<Fruit> fruitBasket = HashMultiset.create();
    fruitBasket.add( new Fruit( "Apple" ) );
    fruitBasket.add( new Fruit( "Apple" ) );
    fruitBasket.add( new Fruit( "Orange" ) );

    final int apples = fruitBasket.count( new Fruit( "Apple" ) );
    System.out.printf( "We have %d apples in the basket%n", apples );
  }
}

@AllArgsConstructor
class Fruit {

  private final String name;

  @Override
  public boolean equals( final Object object ) {
    if ( this == object )
      return true;

    if ( !( object instanceof Fruit ) )
      return false;

    final Fruit that = (Fruit) object;
    return Objects.equals( name, that.name );
  }
}
```

Running the above example, will produce unexpected results as the `hashCode()` method is not implemented.

```bash
We have 0 apple in the basket
```

{% include custom/note.html details="This is above result may vary between runs." %}

The relation between these two methods is so strong that the [Effective Java](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/) book has an item about this, [Item 11: Always override hashCode when you override equals](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/ch3.xhtml#lev11).

### Eclipse Collections

The Eclipse collection `Bag`'s [`count()`](https://www.eclipse.org/collections/javadoc/10.2.0/org/eclipse/collections/api/RichIterable.html#count-org.eclipse.collections.api.block.predicate.Predicate-) method takes a [`Predicate`](https://www.eclipse.org/collections/javadoc/10.2.0/org/eclipse/collections/api/block/predicate/Predicate.html), which provides more control to the caller but adds to the verbosity.

```java
package demo;

import org.eclipse.collections.api.bag.MutableBag;
import org.eclipse.collections.api.factory.Bags;

public class App {
  public static void main( final String[] args ) {
    final MutableBag<String> fruitBasket = Bags.mutable.of( "Apple", "Apple", "Orange" );

    final int banana = fruitBasket.count( f -> f.equals( "Banana" ) );
    System.out.printf( "We have %d banana in the basket%n", banana );
  }
}
```

The `Bag` interface also provides the [`occurrencesOf()`](https://www.eclipse.org/collections/javadoc/10.2.0/org/eclipse/collections/api/bag/Bag.html#occurrencesOf-java.lang.Object-) method which achieves the same thing.

```java
package demo;

import org.eclipse.collections.api.bag.MutableBag;
import org.eclipse.collections.api.factory.Bags;

public class App {
  public static void main( final String[] args ) {
    final MutableBag<String> fruitBasket = Bags.mutable.of( "Apple", "Apple", "Orange" );

    final int banana = fruitBasket.occurrencesOf( "Banana" );
    System.out.printf( "We have %d banana in the basket%n", banana );
  }
}
```

The `occurrencesOf()` method relies on the object's [`equals()`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/lang/Object.html#equals(java.lang.Object)) and [`hashCode()`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/lang/Object.html#hashCode()) methods.

{% include custom/do_not_use_as_is.html details="The following example does not work as expected as the <code>hashCode()</code> method is not implemented on purpose." %}

```java
package demo;

import lombok.AllArgsConstructor;
import org.eclipse.collections.api.bag.MutableBag;
import org.eclipse.collections.api.factory.Bags;

import java.util.Objects;

public class App {
  public static void main( final String[] args ) {
    final MutableBag<Fruit> fruitBasket = Bags.mutable.of( new Fruit( "Apple" ), new Fruit( "Apple" ), new Fruit( "Orange" ) );
    System.out.printf( "The basket has %s%n", fruitBasket );

    final int apples = fruitBasket.occurrencesOf( new Fruit( "Apple" ) );
    System.out.printf( "We have %d apples in the basket%n", apples );
  }
}

@AllArgsConstructor
class Fruit {

  private final String name;

  @Override
  public boolean equals( final Object object ) {
    if ( this == object )
      return true;

    if ( !( object instanceof Fruit ) )
      return false;

    final Fruit that = (Fruit) object;
    return Objects.equals( name, that.name );
  }

  @Override
  public String toString() {
    return name;
  }
}
```

Running the above example, will produce unexpected results as the `hashCode()` method is not implemented.

```bash
The basket has [Apple, Orange, Apple]
We have 0 apple in the basket
```

{% include custom/note.html details="This is above result may vary between runs." %}

The relation between these two methods is so strong that the [Effective Java](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/) book has an item about this, [Item 11: Always override hashCode when you override equals](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/ch3.xhtml#lev11).

## Take elements from the bag

Elements can be added and removed from the bag in a similar fashion to other collections.  We can only take things that exists in the bag.  We cannot take more than available in the bag, thus we will never have negative counts.

### Google Guava

Consider the following example.

```java
package demo;

import com.google.common.collect.HashMultiset;
import com.google.common.collect.Multiset;

public class App {
  public static void main( final String[] args ) {
    final Multiset<String> fruitBasket = HashMultiset.create();
    fruitBasket.add( "Apple" );
    fruitBasket.add( "Apple" );
    fruitBasket.add( "Orange" );

    final boolean tookOneOrange = fruitBasket.remove( "Orange" );
    System.out.printf( "Managed to take one orange from the basket. %s%n", tookOneOrange ? "YES" : "NO" );

    final boolean tookTheSecondOrange = fruitBasket.remove( "Orange" );
    System.out.printf( "Managed to take the second orange from the basket. %s%n", tookTheSecondOrange ? "YES" : "NO" );

    final int oranges = fruitBasket.count( "Orange" );
    System.out.printf( "We have %d oranges in the basket%n", oranges );
  }
}
```

The above example takes two oranges from the basket that contains one orange, using the [`remove()`](https://guava.dev/releases/21.0/api/docs/com/google/common/collect/HashMultiset.html#remove-java.lang.Object-) method.  The `remove()` method removes one occurrence from the bag if one is found and returns `true`.  The `remove()` method will simply return `false` if there are no more elements in the bag for the given key.

```bash
Managed to take one orange from the basket. YES
Managed to take the second orange from the basket. NO
We have 0 oranges in the basket
```

### Eclipse Collections

Consider the following example.

```java
package demo;

import org.eclipse.collections.api.bag.MutableBag;
import org.eclipse.collections.api.factory.Bags;

public class App {
  public static void main( final String[] args ) {
    final MutableBag<String> fruitBasket = Bags.mutable.of( "Apple", "Apple", "Orange" );

    final boolean tookOneOrange = fruitBasket.remove( "Orange" );
    System.out.printf( "Managed to take one orange from the basket. %s%n", tookOneOrange ? "YES" : "NO" );

    final boolean tookTheSecondOrange = fruitBasket.remove( "Orange" );
    System.out.printf( "Managed to take the second orange from the basket. %s%n", tookTheSecondOrange ? "YES" : "NO" );

    final int oranges = fruitBasket.occurrencesOf( "Orange" );
    System.out.printf( "We have %d oranges in the basket%n", oranges );
  }
}
```

The above example takes two oranges from the basket that contains one orange, using the [`remove()`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/Collection.html#remove(java.lang.Object)) method.  The `remove()` method removes one occurrence from the bag if one is found and returns `true`.  The `remove()` method will simply return `false` if there are no more elements in the bag for the given key.

```bash
Managed to take one orange from the basket. YES
Managed to take the second orange from the basket. NO
We have 0 oranges in the basket
```
