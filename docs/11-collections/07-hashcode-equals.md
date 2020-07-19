---
layout: default
title: The <code>hashCode()</code> and <code>equals()</code> methods
parent: Collections
nav_order: 7
permalink: docs/collections/hashcode-equals/
---

# The `hashCode()` and `equals()` methods
{: .no_toc }

The collection classes interact with the objects they contain.  Somehow the set needs to know whether an object that it contains already exists or not.

Some of the collections, such as [`ArrayList`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/ArrayList.html) or [`HashSet`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/HashSet.html) use methods defined by the [`Object`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/lang/Object.html) class, such as the [`equals()`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/lang/Object.html#equals(java.lang.Object)) and the [`hashCode()`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/lang/Object.html#hashCode()) methods.  Some other types of collections make use of the [`Comparable`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/lang/Comparable.html) or [`Comparator`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/Comparator.html) interfaces to determine whether an element already exists or not and where to store the element in the collection.

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## The `List` and the `equals()` method

Consider the following example.

```java
package demo;

import lombok.AllArgsConstructor;

import java.util.ArrayList;
import java.util.List;

public class App {

  @AllArgsConstructor
  public static class Person {
    private String name;

    @Override
    public String toString() {
      return name;
    }
  }

  public static void main( String[] args ) {
    final List<Person> list = new ArrayList<>();

    final Person aden = new Person( "Aden" );
    list.add( aden );

    System.out.printf( "Is %s in the list? %s%n", aden, list.contains( aden ) );

    final Person search = new Person( "Aden" );
    System.out.printf( "Is %s in the list? %s%n", search, list.contains( search ) );
  }
}
```

The program is able to first a match for the first example, but fails on the second try.

```bash
Is Aden in the list? true
Is Aden in the list? false
```

This is happening as the `equals()` is not overridden.  The `Object`'s version of the  relies on the `==` operator.  In the first case, we used the same object instance that is available in the list to search.  The `==` operator returns `true` then, as that's the same object in the *Java heap*.  In the second case, we have two objects that have the same value.  Given that these are two objects in the *Java heap*, the `==` operator will return `false`.

In order to address this problem we need to override the `equals()` method.

```java
    @Override
    public boolean equals( final Object object ) {
      if ( this == object )
        return true;
      if ( !( object instanceof Person ) )
        return false;
      final Person other = (Person) object;
      return Objects.equals( name, other.name );
    }
```

Following is a complete example.

{% include custom/do_not_use_as_is.html details="The above example is missing the <code>hashCode()</code> method.  While it works for this example, this is highly discouraged and considered as bad programming practice." %}

```java
package demo;

import lombok.AllArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class App {

  @AllArgsConstructor
  public static class Person {
    private String name;

    @Override
    public boolean equals( final Object object ) {
      if ( this == object )
        return true;
      if ( !( object instanceof Person ) )
        return false;
      final Person other = (Person) object;
      return Objects.equals( name, other.name );
    }

    @Override
    public String toString() {
      return name;
    }
  }

  public static void main( String[] args ) {
    final List<Person> list = new ArrayList<>();

    final Person aden = new Person( "Aden" );
    list.add( aden );

    System.out.printf( "Is %s in the list? %s%n", aden, list.contains( aden ) );

    final Person search = new Person( "Aden" );
    System.out.printf( "Is %s in the list? %s%n", search, list.contains( search ) );
  }
}
```

This seems to be have fixed the problem.

```bash
Is Aden in the list? true
Is Aden in the list? true
```

The above example is **incorrect** as we only overrode the `equals()` method.  The relation between these the `equals()` and the `hashCode()` methods is so strong that the [Effective Java](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/) book has an item about this, [Item 11: Always override hashCode when you override equals](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/ch3.xhtml#lev11).

When we override the `equals()` we should also override the `hashCode()` method.

```java
@Override
public int hashCode() {
  return Objects.hash( name );
}
```

Following is a correct example.

```java
package demo;

import lombok.AllArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class App {

  @AllArgsConstructor
  public static class Person {
    private String name;

    @Override
    public boolean equals( final Object object ) {
      if ( this == object )
        return true;
      if ( !( object instanceof Person ) )
        return false;
      final Person other = (Person) object;
      return Objects.equals( name, other.name );
    }

    @Override
    public int hashCode() {
      return Objects.hash( name );
    }

    @Override
    public String toString() {
      return name;
    }
  }

  public static void main( String[] args ) {
    final List<Person> list = new ArrayList<>();

    final Person aden = new Person( "Aden" );
    list.add( aden );

    System.out.printf( "Is %s in the list? %s%n", aden, list.contains( aden ) );

    final Person search = new Person( "Aden" );
    System.out.printf( "Is %s in the list? %s%n", search, list.contains( search ) );
  }
}
```

## Hash based Collections and the `equals()` and `hashCode()` methods

Consider the following example.

```java
package demo;

import lombok.AllArgsConstructor;

import java.util.HashSet;
import java.util.Set;

public class App {

  @AllArgsConstructor
  public static class Key {
    private final String value;
  }

  public static void main( String[] args ) {
    final Set<Key> set = new HashSet<>();

    set.add( new Key( "x" ) );
    set.add( new Key( "x" ) );

    System.out.printf( "Set contains %d elements%n", set.size() );
  }
}
```

The inner class `Key` has one constant field of type `String`.  The `Key` class is immutable and once created its state cannot be changed.  While this seems to be a [good candidate for sets]({{ '/docs/collections/sets/#set-values-must-be-immutable' | absolute_url }}), or as [a map key]({{ '/docs/collections/maps/#map-keys-must-be-immutable' | absolute_url }}), the above example will not work as expected.  Despite the fact that both `Key` instances have the same value, the `Set` treats them as different objects.

```bash
Set contains 2 elements
```

This is because the `equals()` and `hashCode()` methods were not overloaded.

1. Implement `equals()` method

    ```bash
    @Override
    public boolean equals( final Object object ) {
      if ( this == object )
        return true;

      if ( !( object instanceof Key ) )
        return false;

      final Key other = (Key) object;
      return Objects.equals( value, other.value );
    }
    ```

1. Implement `hashCode()` method

    ```java
    @Override
    public int hashCode() {
      return Objects.hash( value );
    }
    ```

Complete example

```java
package demo;

import lombok.AllArgsConstructor;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

public class App {

  @AllArgsConstructor
  public static class Key {
    private final String value;

    @Override
    public boolean equals( final Object object ) {
      if ( this == object )
        return true;
      if ( !( object instanceof Key ) )
        return false;
      final Key key = (Key) object;
      return Objects.equals( value, key.value );
    }

    @Override
    public int hashCode() {
      return Objects.hash( value );
    }
  }

  public static void main( String[] args ) {
    final Set<Key> set = new HashSet<>();

    set.add( new Key( "x" ) );
    set.add( new Key( "x" ) );

    System.out.printf( "Set contains %d elements%n", set.size() );
  }
}
```

Now that both the `equals()` and `hashCode()` methods are implements, the hash based set and map will work as expected.

```bash
Set contains 1 elements
```
