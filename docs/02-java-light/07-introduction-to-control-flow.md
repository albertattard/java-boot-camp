---
layout: default
title: Introduction to control-flow (if/else, switch, for, while and do/while loops)
parent: Java Light
nav_order: 7
permalink: docs/java-light/introduction-to-control-flow/
---

# Introduction to control-flow (if/else, switch, for, while and do/while loops)
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## If-Else

{% include custom/pending.html %}

```java
package demo;

import java.util.ArrayList;
import java.util.List;

public class App {
  public static void main( final String[] args ) {
    List<String> names = new ArrayList<>();
    names.add( "Jade" );
    names.add( "Aden" );

    if ( names.size() == 0 ) {
      System.out.println( "List is empty" );
    } else if ( names.size() == 1 ) {
      System.out.println( "List has one element" );
    } else {
      System.out.println( "List has many elements" );
    }
  }
}
```

```bash
List has many elements
```

## Switch

```java
package demo;

import java.util.ArrayList;
import java.util.List;

public class App {
  public static void main( final String[] args ) {
    List<String> names = new ArrayList<>();
    names.add( "Jade" );
    names.add( "Aden" );

    switch ( names.size() ) {
      case 0:
        System.out.println( "List is empty" );
      case 1:
        System.out.println( "List has one element" );
      default:
        System.out.println( "List has many elements" );
    }
  }
}
```

```bash
List has many elements
```

## For loop

```java
package demo;

import java.util.ArrayList;
import java.util.List;

public class App {
  public static void main( final String[] args ) {
    List<String> names = new ArrayList<>();
    names.add( "Jade" );
    names.add( "Aden" );

    System.out.println( "Names in the list" );
    for ( int i = 0; i < names.size(); i++ ) {
      System.out.printf( "[%d] %s%n", i, names.get( i ) );
    }
  }
}
```

```bash
Names in the list
[0] Jade
[1] Aden
```

```java
package demo;

public class App {
  public static void main( final String[] args ) {
    String[] names = { "Jade", "Aden" };

    System.out.println( "Names in array" );
    for ( int i = 0; i < names.length; i++ ) {
      System.out.printf( "[%d] %s%n", i, names[i] );
    }
  }
}
```

```bash
Names in array
[0] Jade
[1] Aden
```
