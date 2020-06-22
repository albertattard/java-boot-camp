---
layout: default
title: Methods
parent: Generics
nav_order: 3
permalink: docs/generics/methods/
---

# Methods
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Methods

```java
package demo;

import java.util.ArrayList;
import java.util.List;

public class App {

  public static void main( final String[] args ) {
    final List<String> children = new ArrayList<>();
    children.add( "Jade" );
    children.add( "Aden" );

    final String last = last( children );
    System.out.printf( "Last child: %s%n", last );
  }

  private static String last( final List<String> list ) {
    return list.isEmpty() ? null : list.get( list.size() - 1 );
  }
}
```

{% include custom/dose_not_compile.html %}

```java
package demo;

import java.util.ArrayList;
import java.util.List;

public class App {

  public static void main( final String[] args ) {
    final List<String> children = new ArrayList<>();
    children.add( "Jade" );
    children.add( "Aden" );

    final List<Integer> ages = new ArrayList<>();
    ages.add( 13 );
    ages.add( 11 );

    final String lastChild = last( children );
    final Integer lastAge = last( ages );
    System.out.printf( "The last child, %s, is %d years old%n", lastChild, lastAge );
  }

  private static String last( final List<String> list ) {
    return list.isEmpty() ? null : list.get( list.size() - 1 );
  }

  private static Integer last( final List<Integer> list ) {
    return list.isEmpty() ? null : list.get( list.size() - 1 );
  }
}
```

```java
package demo;

import java.util.ArrayList;
import java.util.List;

public class App {

  public static void main( final String[] args ) {
    final List<String> children = new ArrayList<>();
    children.add( "Jade" );
    children.add( "Aden" );

    final List<Integer> ages = new ArrayList<>();
    ages.add( 13 );
    ages.add( 11 );

    final String lastChild = last( children );
    final Integer lastAge = last( ages );
    System.out.printf( "The last child, %s, is %d years old%n", lastChild, lastAge );
  }

  private static <T> T last( final List<T> list ) {
    return list.isEmpty() ? null : list.get( list.size() - 1 );
  }
}
```

```bash
The last child, Aden, is 11 years old
```
