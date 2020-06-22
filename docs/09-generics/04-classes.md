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

## Classes

```java
package demo;

import lombok.Data;

@Data(staticConstructor = "of")
public class Pair<N, V> {

  private final N name;
  private final V value;
}
```

```java
package demo;

import java.awt.Point;

public class App {

  public static void main( final String[] args ) {
    final Pair<String, Integer> a = Pair.of( "Jade", 13 );
    final Pair<String, Point> b = Pair.of( "Origin", new Point( 0, 0 ) );

    System.out.printf( "a: %s%n", a );
    System.out.printf( "b: %s%n", b );
  }
}
```

```bash
a: Pair(name=Jade, value=13)
b: Pair(name=Origin, value=java.awt.Point[x=0,y=0])
```

```java
package demo;

import java.awt.Point;

public class App {

  public static void main( final String[] args ) {
    final var a = Pair.of( "Jade", 13 );
    final var b = Pair.of( "Origin", new Point( 0, 0 ) );

    System.out.printf( "a: %s%n", a );
    System.out.printf( "b: %s%n", b );
  }
}
```

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

Not the same!!

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

```java
    final var children = new ArrayList<Object>();
```
