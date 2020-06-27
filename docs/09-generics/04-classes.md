---
layout: default
title: Classes
parent: Generics
nav_order: 4
permalink: docs/generics/classes/
---

# Classes
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Generic types

We can use generics with classes too.  Consider the following example.

```java
package demo;

import java.awt.Point;
import java.math.BigDecimal;

public class App {

  public static void main( final String[] args ) {
    final String childName = "Jade";
    final int childAge = 13;

    final String productName = "Crisps";
    final BigDecimal productPrice = new BigDecimal( "1.99" );

    final String originName = "Origin";
    final Point originPoint = new Point( 0, 0 );

    System.out.printf( "%s: %s%n", childName, childAge );
    System.out.printf( "%s: %s%n", productName, productPrice );
    System.out.printf( "%s: %s%n", originName, originPoint );
  }
}
```

The above example has three pairs of values.

* A child name and age
* A product and its price
* A point and its coordinates  

These two pairs of variables can be bound together by a class, `Pair`.  Before generics this was annoying as we had to manually cast the type and the compiler did not provide any safety, as discussed in the [raw types]({{ '/docs/generics/raw-types/' | absolute_url }}) section.  Generics made this simpler, as shown next. 

```java
package demo;

import lombok.Data;

@Data(staticConstructor = "of")
public class Pair<N, V> {

  private final N name;
  private final V value;
}
```

The `Pair` class, shown above, is an immutable class that has two generic types.

```java
package demo;

import java.awt.Point;
import java.math.BigDecimal;

public class App {

  public static void main( final String[] args ) {
    final Pair<String, Integer> child = Pair.of( "Jade", 13 );
    final Pair<String, BigDecimal> product = Pair.of( "Crisps", new BigDecimal( "1.99" ) );
    final Pair<String, Point> origin = Pair.of( "Origin", new Point( 0, 0 ) );

    System.out.printf( "%s%n", child );
    System.out.printf( "%s%n", product );
    System.out.printf( "%s%n", origin );
  }
}
```

Each pair of variables, such as `childName` and `childAge`, are now grouped into one variable, such as `child`.

* From
   ```java
       final String childName = "Jade";
       final int childAge = 13;
   ```

* To
   ```java
       final Pair<String, Integer> child = Pair.of( "Jade", 13 );
   ```

The example can be simplified further, by using the `var` as shown next.

```java
package demo;

import java.awt.Point;

public class App {

  public static void main( final String[] args ) {
    final var child = Pair.of( "Jade", 13 );
    final var product = Pair.of( "Crisps", new BigDecimal( "1.99" ) );
    final var origin = Pair.of( "Origin", new Point( 0, 0 ) );

    System.out.printf( "%s%n", child );
    System.out.printf( "%s%n", product );
    System.out.printf( "%s%n", origin );
  }
}
```

The example will print.

```bash
Pair(name=Jade, value=13)
Pair(name=Crisps, value=1.99)
Pair(name=Origin, value=java.awt.Point[x=0,y=0])
```

Our new class can be used in another generic context, as shown next.

```java
package demo;

import java.util.ArrayList;
import java.util.List;

public class App {

  public static void main( final String[] args ) {
    final List<Pair<String, Integer>> children = new ArrayList<>();
    children.add( Pair.of( "Jade", 13 ) );
    children.add( Pair.of( "Aden", 11 ) );

    System.out.printf( "Children: %s%n", children );
  }
}
```

The type of the `children` variable is quite verbose, `List<Pair<String, Integer>>`, and we may be tempted to use `var` instead, as shown next.

{% include custom/proceed_with_caution.html details="The list named, <code>children</code> can contain any <code>Object</code>." %}

```java
package demo;

import java.util.ArrayList;
import java.util.List;

public class App {

  public static void main( final String[] args ) {
    final var children = new ArrayList<>();
    children.add( Pair.of( "Jade", 13 ) );
    children.add( Pair.of( "Aden", 11 ) );

    System.out.printf( "Children: %s%n", children );
  }
}
```

As hinted already in a previous example in this page, this is not the same as the one that defined the type.  Using `var` in this case, the `children` variable is now an `ArrayList` of type `Object`.
