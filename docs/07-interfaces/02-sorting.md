---
layout: default
title: Sorting
parent: Interfaces
nav_order: 2
permalink: docs/interfaces/sorting/
---

# Sorting
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Sorting (the `Comparable` and `Comparator` interfaces)

Consider the following example.

```java
package demo;

import java.util.Arrays;

public class App {
  public static void main( final String[] args ) {
    final String[] names = { "Mary", "Aden", "Peter", "Jade", "Mario" };
    Arrays.sort( names );
    System.out.printf( "Sorted: %s", Arrays.toString( names ) );
  }
}
```

The `Arrays.sort()` method sorts the names alphabetically.

```bash
Sorted: [Aden, Jade, Mario, Mary, Peter]
```

Can we sort any array like that?  Consider the following example.

**⚠️ THE FOLLOWING EXAMPLE WILL COMPILE BUT WILL THROW A `ClassCastException`!!**

```java
package demo;

import java.awt.Point;
import java.util.Arrays;

public class App {
  public static void main( final String[] args ) {
    final Point[] points = {
      new Point( 1, 2 ),
      new Point( 1, 3 ),
      new Point( 2, 1 ),
    };
    Arrays.sort( points );
    System.out.printf( "Sorted: %s", Arrays.toString( points ) );
  }
}
```

Unfortunately, running the above program will fail with `ClassCastException`.

```bash
Exception in thread "main" java.lang.ClassCastException: class java.awt.Point cannot be cast to class java.lang.Comparable (java.awt.Point is in module java.desktop of loader 'bootstrap'; java.lang.Comparable is in module java.base of loader 'bootstrap')
	at java.base/java.util.ComparableTimSort.countRunAndMakeAscending(ComparableTimSort.java:320)
	at java.base/java.util.ComparableTimSort.sort(ComparableTimSort.java:188)
	at java.base/java.util.Arrays.sort(Arrays.java:1040)
	at demo.App.main(App.java:13)
```

**How come the program was able to sort the array of string but not the array of points?**

The [`sort()` method](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/Arrays.html#sort(java.lang.Object%5B%5D)) makes use of [the `Comparable` interface](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/lang/Comparable.html) to compare and sort the array of strings.  The `Point` does not implement this interface and thus the `sort()` method cannot compare and sort the array of points.

## How can we apply natural ordering to a custom class (the `Comparable` interface)?

In a previous example, we were able to sort an array of string using natural ordering.  Consider the following `Person` class.

```java
package demo;

public class Person {

  private final String name;

  public Person( final String name ) {
    this.name = name;
  }

  @Override
  public String toString() {
    return String.format( "Person{name='%s'}", name );
  }
}
```

A `Person` has one property which can be initialise through the constructor.

```java
package demo;

import java.util.Arrays;

public class App {
  public static void main( final String[] args ) {
    final Person[] persons = {
      new Person( "Jade" ),
      new Person( "Aden" ),
      new Person( "Mary" ),
      new Person( "Peter" ),
    };

    System.out.printf( "Persons: %s%n", Arrays.toString( persons ) );
  }
}
```

The above class creates an array of persons and print it.

```bash
Persons: [Person{name='Jade'}, Person{name='Aden'}, Person{name='Mary'}, Person{name='Peter'}]
```

Trying to sort the array of persons will throw a `ClassCastException`, as we saw before, as the sort method requires an instance of `Comparable`

```java
Arrays.sort( persons );
```

We can implement the `Comparable` interface and add natural ordering as shown next.

**⚠️ THE FOLLOWING EXAMPLE WILL COMPILE BUT IT IS NOT SAFE!!**

```java
package demo;

public class Person implements Comparable<Person> {

  private final String name;

  public Person( final String name ) { /* ... */ }

  @Override
  public int compareTo( final Person that ) {
    return name.compareTo( that.name );
  }

  @Override
  public String toString() { /* ... */ }
}
```

Now that our class implements the `Comparable` interface, we can use [the `Arrays`' `sort()` method](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/Arrays.html#sort(java.lang.Object%5B%5D)) to sort our array of persons.

```java
package demo;

import java.util.Arrays;

public class App {
  public static void main( final String[] args ) {
    final Person[] persons = {
      new Person( "Jade" ),
      new Person( "Aden" ),
      new Person( "Mary" ),
      new Person( "Peter" ),
    };

    System.out.println( "--- Before Sorting -------" );
    System.out.printf( "Persons: %s%n", Arrays.toString( persons ) );

    Arrays.sort( persons );

    System.out.println( "--- After Sorting --------" );
    System.out.printf( "Persons: %s%n", Arrays.toString( persons ) );
  }
}
```

The above example will print the array of persons alphabetically.

```bash
--- Before Sorting -------
Persons: [Person{name='Jade'}, Person{name='Aden'}, Person{name='Mary'}, Person{name='Peter'}]
--- After Sorting --------
Persons: [Person{name='Aden'}, Person{name='Jade'}, Person{name='Mary'}, Person{name='Peter'}]
```

Please note that the person's name can be `null`, which will cause the `compareTo()` method to throw a `NullPointerException`.  The following sessions discuss this in more depth.

## How does the `compareTo()` method works?

The [`compareTo()` method is defined by the `Comparable` interface]( https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/lang/Comparable.html).  The `compareTo()` method **must** return: "_a negative integer, zero, or a positive integer as this object is less than, equal to, or greater than the specified object_".  Note that here the interface is defining a contract between the implementer and the consumer of the interface.  The `sort()` method relies on this contract to work properly.  If the implementer does not follow the contract, the result of the `sort()` may not be as expected.

Let say we have two objects that implement the `Comparable` interface, `a` and `b`.

`a.compareTo(b)` will return:

| Return | Condition                               |
|-------:|-----------------------------------------|
|      0 | When `a` and `b` are considered equal   |
|   <=-1 | When `a` is considered smaller than `b` |
|    >=1 | When `a` is considered larger than `b`  |

Please note that the`compareTo()` may not just return `-1`, but it can return any negative value to indicate that `a` is smaller than `b`.  Same applies when `a` is larger than `b`.

Note that `b` cannot be `null`.  We cannot pass a `null` to the `compareTo()` method.  The contract ([Java Docs](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/lang/Comparable.html#compareTo(T))) specifies that a `NullPointerException` will be thrown if the given object is `null`.

## What will happen if one of the properties used is `null`?

Consider the following example.

**⚠️ THE FOLLOWING EXAMPLE WILL COMPILE BUT WILL THROW A `NullPointerException`!!**

```java
package demo;

import java.util.Arrays;

public class App {
  public static void main( final String[] args ) {
    final Person[] persons = {
      new Person( "Jade" ),
      new Person( "Aden" ),
      new Person( null ),
      new Person( "Peter" ),
    };

    Arrays.sort( persons );

    System.out.printf( "Persons: %s%n", Arrays.toString( persons ) );
  }
}
```

One of the persons creates has a `null` name.  Trying to sort this array will throw an `NullPointerException`.

```bash
Exception in thread "main" java.lang.NullPointerException
	at demo.Person.compareTo(Person.java:13)
	at demo.Person.compareTo(Person.java:3)
	at java.base/java.util.ComparableTimSort.countRunAndMakeAscending(ComparableTimSort.java:321)
	at java.base/java.util.ComparableTimSort.sort(ComparableTimSort.java:188)
	at java.base/java.util.Arrays.sort(Arrays.java:1040)
	at demo.App.main(App.java:14)
```

The `compareTo()` does not take `null`s and a `NullPointerException` will be thrown if the given object is `null` as documented in the interface's [Java Docs](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/lang/Comparable.html#compareTo(T)).

```java
  @Override
  public int compareTo( final Person that ) {
    return name.compareTo( that.name );
  }
```

Therefore, we need to check whether the `name` property is `null` before comparing it.

```java
package demo;

public class Person implements Comparable<Person> {

  private final String name;

  public Person( final String name ) { /* ... */ }

  @Override
  public int compareTo( final Person that ) {
    /* If both are null or the same String instance */
    if ( name == that.name ) {
      return 0;
    }

    /* If name is null */
    if ( name == null ) {
      return -1;
    }

    /* If the other name is null */
    if ( that.name == null ) {
      return 1;
    }

    return name.compareTo( that.name );
  }

  @Override
  public String toString() { /* ... */ }
}
```

The simple comparison got a bit more complicated, just because of `null`s.  At least now we can sort the persons that have a `null` name.

```bash
Persons: [Person{name='null'}, Person{name='Aden'}, Person{name='Jade'}, Person{name='Peter'}]
```

Luckily we can use another common library to simplify our code.

```groovy
dependencies {
  implementation 'org.apache.commons:commons-lang3:3.10'
}
```

The old [apache commons lang]( https://mvnrepository.com/artifact/org.apache.commons/commons-lang) and its successor the [apache commons lang3]( https://mvnrepository.com/artifact/org.apache.commons/commons-lang3) are very popular libraries that have lots of useful functionality, similar to Guava.

```java
package demo;

import static org.apache.commons.lang3.StringUtils.compare;

public class Person implements Comparable<Person> {

  private final String name;

  public Person( final String name ) { /* ... */ }

  @Override
  public int compareTo( final Person that ) {
    return compare( name, that.name );
  }

  @Override
  public String toString() { /* ... */ }
}
```

We simply delegated the whole comparison to the [`StringUtils`'s ` compare()` method](http://commons.apache.org/proper/commons-lang/apidocs/org/apache/commons/lang3/StringUtils.html#compare-java.lang.String-java.lang.String-), which also `null`-safe.

## Can we use multiple properties to determine natural ordering?

We can use all the properties we need when comparing objects.  Consider the following example.

```java
package demo;

import static org.apache.commons.lang3.StringUtils.compare;

public class Person implements Comparable<Person> {

  private final String name;
  private final String surname;

  public Person( final String name, final String surname ) {
    this.name = name;
    this.surname = surname;
  }

  @Override
  public int compareTo( final Person that ) {
    final int diff = compare( name, that.name );
    if ( diff == 0 ) {
      return compare( surname, that.surname );
    }

    return diff;
  }

  @Override
  public String toString() {
    return String.format( "Person{name='%s', surname='%s'}", name, surname );
  }
}
```

When using multiple properties to compare objects, we will start with one property and then if that property for both objects is the same, we move to the next.  In the above example we first compared the two objects by their `name`, and then if the `name`s are the same, we fall back to the `surname`.  The `surname` is compared only if the `name`s are not the same.

We can use the [ternary operator](https://docs.oracle.com/javase/specs/jls/se14/html/jls-15.html#jls-15.25) instead.

```java
  @Override
  public int compareTo( final Person that ) {
    int diff = compare( name, that.name );
    return diff != 0 ? diff : compare( surname, that.surname );
  }
```

The new `Person` class now supports natural ordering based on two properties.

```java
package demo;

import java.util.Arrays;

public class App {
  public static void main( final String[] args ) {
    final Person[] persons = {
      new Person( "Jade", null ),
      new Person( null, null ),
      new Person( "Jade", "Attard" ),
      new Person( null, "Attard" )
    };

    System.out.println( "--- Before Sorting -------" );
    System.out.printf( "Persons: %s%n", Arrays.toString( persons ) );


    Arrays.sort( persons );

    System.out.println( "--- After Sorting --------" );
    System.out.printf( "Persons: %s%n", Arrays.toString( persons ) );
  }
}
```

Like before, `null`'s are placed before non-`null`s.

```bash
--- Before Sorting -------
Persons: [Person{name='Jade', surname='null'}, Person{name='null', surname='null'}, Person{name='Jade', surname='Attard'}, Person{name='null', surname='Attard'}]
--- After Sorting --------
Persons: [Person{name='null', surname='null'}, Person{name='null', surname='Attard'}, Person{name='Jade', surname='null'}, Person{name='Jade', surname='Attard'}]
```

## How can we sort the `Point` or any other custom class (the `Comparator` interface)?

The `Point` class belongs to the Java API and we cannot modify it.  In such cases, or in cases when we want to use a different ordering than the natural ordering, we can use the [`Comparator`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/Comparator.html) interface.

The [`Comparator` interface provides a set of static methods](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/Comparator.html#comparing(java.util.function.Function)) that are very handy to sort objects as shown in the following example.

```java
package demo;

import java.awt.Point;
import java.util.Arrays;
import java.util.Comparator;

public class App {
  public static void main( final String[] args ) {
    final Point[] points = {
      new Point( 1, 2 ),
      new Point( 1, 3 ),
      new Point( 2, 1 ),
    };

    final Comparator<Point> comparator =
      Comparator.comparing( Point::getX )
        .thenComparing( Point::getY );

    Arrays.sort( points, comparator );
    System.out.printf( "Sorted: %s", Arrays.toString( points ) );
  }
}
```

We cannot modify the `Point` class as this is not part of our code.  Yet, we can still sort an array of points in the way we need it to be sorted by providing an instance of the `Comparator` interface.  This applies to any data type.  We can sort anything we want in the way we want by using a `Comparator`.

The `Comparator` works very similar to the `Comparable`, discussed in the [how does the `compareTo()` method works](#how-does-the-compareto-method-works).  The `Comparator` defines one [method `compare()`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/Comparator.html#compare(T,T)) that takes two (non-`null`) objects of the same type (not just one) and returns, `0` if both are equal, a negative number (`<=-1`) if the first is smaller than the second, and a positive number (`>=1`) if the first is larger than the second.

Given any two objects of the same type, `a` and `b` (these objects do not have to implement any interface or extend any special class).

`comparator.compare(a, b)` will return:

| Return | Condition                               |
|-------:|-----------------------------------------|
|      0 | When `a` and `b` are considered equal   |
|   <=-1 | When `a` is considered smaller than `b` |
|    >=1 | When `a` is considered larger than `b`  |

Before Java 8, we had to implement the `Comparator` interface.  Java 8 introduced lambda and interface static method, which simplified the use of the `Comparator` interface.  Following is a longer version of the above code, that will achieve the same thing.

**⚠️ THE FOLLOWING EXAMPLE DOES NOT TAKE ADVANTAGE OF NEW CODE STYLE!!**

```java
package demo;

import java.awt.Point;
import java.util.Arrays;
import java.util.Comparator;

public class App {
  public static void main( final String[] args ) {
    final Point[] points = {
      new Point( 1, 2 ),
      new Point( 1, 3 ),
      new Point( 2, 1 ),
    };

    /* Works with Java 1.5 or newer */
    final Comparator<Point> comparator = new Comparator<Point>() {
      @Override
      public int compare( final Point a, final Point b ) {
        int diff = Integer.compare( a.x, b.x );
        return diff != 0 ? diff : Integer.compare( a.y, b.y );
      }
    };

    Arrays.sort( points, comparator );
    System.out.printf( "Sorted: %s", Arrays.toString( points ) );
  }
}
```

The above example will work, and it is the only approach available (from those shown here) if you are using an older version of Java.  Both approaches will print the same output.

```bash
Sorted: [java.awt.Point[x=1,y=2], java.awt.Point[x=1,y=3], java.awt.Point[x=2,y=1]]
```

The points are ordered based on the value of the properties `x` and `y` respectively.

There are several approaches available to sort an array using a custom `Comparator`:

1. Extend the `Comparator` (works with versions of Java 1.5 or newer)

    ```java
    final Comparator<Point> comparator = new Comparator<Point>() {
      @Override
      public int compare( final Point a, final Point b ) {
        int diff = Integer.compare( a.x, b.x );
        return diff != 0 ? diff : Integer.compare( a.y, b.y );
      }
    };
    ```

1. Using lambda functions (works with versions of Java 1.8 or newer)

    ```java
    final Comparator<Point> comparator = ( a, b ) -> {
      int diff = Integer.compare( a.x, b.x );
      return diff != 0 ? diff : Integer.compare( a.y, b.y );
    };
    ```

1. (**Recommended**) Using the `Comparator` static methods (works with versions of Java 1.8 or newer)

    ```java
    final Comparator<Point> comparator =
      Comparator.comparing( Point::getX )
        .thenComparing( Point::getY );
    ```

All three approaches will produce the same result.

Note that `null`s can be tricky to handle and [the static methods provided by the `Comparator` interface](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/Comparator.html#nullsFirst(java.util.Comparator)) may not suffice.  Consider the following class.

```java
package demo;

public class Person {

  public final String name;

  public Person( final String name ) {
    this.name = name;
  }

  public String getName() {
    return name;
  }

  @Override
  public String toString() {
    return String.format( "Person{name=%s}", name );
  }
}
```

Now consider the following example, were we try to sort an array of persons that have `null` as their `name`.  Note that the person objects are not `null`, but the property being used to sort the array is `null`.

**⚠️ THE FOLLOWING EXAMPLE WILL COMPILE BUT WILL THROW A `NullPointerException`!!**

```java
package demo;

import java.util.Arrays;
import java.util.Comparator;

public class App {
  public static void main( final String[] args ) {
    final Person[] persons = {
      new Person( "Jade" ),
      new Person( null ),
      new Person( "Aden" )
    };

    final Comparator<Person> comparator =
      Comparator.nullsFirst( Comparator.comparing( Person::getName ) );

    Arrays.sort( persons, comparator );
    System.out.printf( "Persons: %s%n", Arrays.toString( persons ) );
  }
}
```

The above will fail with a `NullPointerException`, despite use of the `nullsFirst()` method.

```bash
Exception in thread "main" java.lang.NullPointerException
	at java.base/java.util.Comparator.lambda$comparing$77a9974f$1(Comparator.java:469)
	at java.base/java.util.Comparators$NullComparator.compare(Comparators.java:85)
	at java.base/java.util.TimSort.countRunAndMakeAscending(TimSort.java:355)
	at java.base/java.util.TimSort.sort(TimSort.java:220)
	at java.base/java.util.Arrays.sort(Arrays.java:1232)
	at demo.App.main(App.java:17)
```

The `nullsFirst()` method works well when the array contains `null`, but falls short when properties used by the `Comparator` are `null`.  Following is a version that works well with `null`s.

```java
package demo;

import org.apache.commons.lang3.StringUtils;

import java.util.Arrays;
import java.util.Comparator;

public class App {
  public static void main( final String[] args ) {
    final Person[] persons = {
      new Person( "Jade" ),
      new Person( null ),
      new Person( "Aden" )
    };

    final Comparator<Person> comparator = new Comparator<Person>() {
      @Override
      public int compare( final Person a, final Person b ) {
        return StringUtils.compare( a.name, b.name );
      }
    };

    Arrays.sort( persons, comparator );
    System.out.printf( "Persons: %s%n", Arrays.toString( persons ) );
  }
}
```

The above example will sort the array as expected.

```bash
Persons: [Person{name=null}, Person{name=Aden}, Person{name=Jade}]
```

Notice how `null`s complicate things.  No wonder why [`NullPointerException` is consider the billion-dollar mistake](https://www.infoq.com/presentations/Null-References-The-Billion-Dollar-Mistake-Tony-Hoare/).  Prevent `null`s when possible.  If a person must have a name (name should not be `null`), then don't accept `null`s as the person's name.  Consider the following version of the `Person` class.

```java
package demo;

import javax.annotation.Nonnull;

import static com.google.common.base.Preconditions.checkNotNull;

public class Person {

  public final String name;

  public Person( @Nonnull final String name ) {
    this.name = checkNotNull( name );
  }

  public @Nonnull String getName() { /* ... */ }

  @Override
  public String toString() { /* ... */ }
}
```

The constructor will throw a `NullPointerException` if `null` is provided as the `name`.

The [`@Nonnull` annotation](http://checkstyle-addons.github.io/jsr305-javadoc/3.0.1/javax/annotation/Nonnull.html) is used by frameworks and IDEs to verify, as it best can, whether the given parameter is `null` and catch such error as early as possible.  Note that the `@Nonnull` has no effect at runtime and will not prevent `null`s to be passed.  It is just an annotation used by tools to analyse your code and help point out any problems.

![Nonnull warning by IDE]({{site.baseurl}}/assets/images/Nonnull-warning-by-IDE.png)

Now that the person class prevents `null`s, we can safely use the `Comparator` static methods to sort the array of persons.

```java
package demo;

import java.util.Arrays;
import java.util.Comparator;

public class App {
  public static void main( final String[] args ) {
    final Person[] persons = {
      new Person( "Jade" ),
      new Person( "Aden" )
    };

    final Comparator<Person> comparator = Comparator.comparing( Person::getName );

    Arrays.sort( persons, comparator );
    System.out.printf( "Persons: %s%n", Arrays.toString( persons ) );
  }
}
```

## Can we compare two integers by subtracting one from the other?

Some literature compares integers by subtracting them.  Consider the following class.

```java
package demo;

public class Person {

  public final String name;
  public final int age;

  public Person( final String name, final int age ) {
    this.name = name;
    this.age = age;
  }

  @Override
  public String toString() {
    return String.format( "Person{name='%s', age=%d}", name, age );
  }
}
```

Note that the properties are set to `public` for convenience.

Say that we would like to sort the persons based on their age.  We will use a `Comparator`, but the same applies if we use a `Comparable` instead.

**⚠️ THE FOLLOWING EXAMPLE WILL COMPILE BUT IT IS NOT SAFE!!**

```java
package demo;

import java.util.Arrays;
import java.util.Comparator;

public class App {
  public static void main( final String[] args ) {
    final Person[] persons = {
      new Person( "Jade", 13 ),
      new Person( "Aden", 11 )
    };

    final Comparator<Person> comparator = new Comparator<Person>() {
      @Override
      public int compare( final Person a, final Person b ) {
        /* ⚠️ BAD DESIGN!! */
        return a.age - b.age;
      }
    };

    Arrays.sort( persons, comparator );
    System.out.printf( "Sorted by age: %s", Arrays.toString( persons ) );
  }
}
```

The persons are sorted by their age as expected.  The value of `11` is smaller than the value of `13`.

```bash
Sorted by age: [Person{name='Aden', age=11}, Person{name='Jade', age=13}]
```

The above instance of the `Comparator` interface is broken despite its appearance.  Consider the following (extreme) situation

**⚠️ THE FOLLOWING EXAMPLE WILL COMPILE BUT IT IS NOT SAFE!!**

```java
package demo;

import java.util.Arrays;
import java.util.Comparator;

public class App {
  public static void main( final String[] args ) {
    final Person[] persons = {
      new Person( "Jade", Integer.MAX_VALUE ),
      new Person( "Aden", -2 )
    };

    final Comparator<Person> comparator = new Comparator<Person>() {
      @Override
      public int compare( final Person a, final Person b ) {
        /* ⚠️ BAD DESIGN!! */
        return a.age - b.age;
      }
    };

    Arrays.sort( persons, comparator );
    System.out.printf( "Sorted by age: %s", Arrays.toString( persons ) );
  }
}
```

Note that the above example is using very large values to highlight the problem when we negate an integer from another.

```bash
Sorted by age: [Person{name='Jade', age=2147483647}, Person{name='Aden', age=-2}]
```

The person with age `2147483647` is placed before the person with age `-2`.  That is incorrect!!  We all know that `-2` is smaller than `2147483647`, yet our instance of `Comparator` thinks otherwise.

The above problem arises from the fact that integer arithmetic in Java overflows and produces unexpected behaviour.  When we subtract a negative value from a positive value, we simply add the two numbers.

```
jshell> 10 - -2
$1 ==> 12
```

A positive number indicates that the left operand (value of `10`) is larger than the right operand (value of `-2`), which is correct.

Now consider our extreme values

```
jshell> 2147483647 - -2
$2 ==> -2147483647
```

The evaluation of `2147483647 - -2` is equivalent to `2147483647 + 2` which overflows and returns a negative value.  A negative value, on the other hand, indicates that the left operand (value of `2147483647`) is smaller than the right operand (value of `-2`), which is incorrect!!

This is quite a big problem which caused big bugs, even within Java API.  The [`Arrays.binarySerach()`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/Arrays.html#binarySearch(int%5B%5D,int)) method was [broken because of this oversight](https://ai.googleblog.com/2006/06/extra-extra-read-all-about-it-nearly.html).

Luckily we can rely on the [`Integer` wrapper class's `compare()` method](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/lang/Integer.html#compare(int,int)).  Consider the following example.

```java
package demo;

import java.util.Arrays;
import java.util.Comparator;

public class App {
  public static void main( final String[] args ) {
    final Person[] persons = {
      new Person( "Jade", Integer.MAX_VALUE ),
      new Person( "Aden", -2 ),
    };

    final Comparator<Person> comparator = new Comparator<Person>() {
      @Override
      public int compare( final Person a, final Person b ) {
        return Integer.compare( a.age, b.age );
      }
    };

    Arrays.sort( persons, comparator );
    System.out.printf( "Sorted by age: %s", Arrays.toString( persons ) );
  }
}
```

Now the persons are properly sorted by their age, where `-2` is considered smaller than `2147483647`.

```bash
Sorted by age: [Person{name='Aden', age=-2}, Person{name='Jade', age=2147483647}]
```
