---
layout: default
title: Autoboxing
parent: Data Types
nav_order: 9
permalink: docs/data-types/autoboxing/
---

# Autoboxing
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Autoboxing

Example

```java
package demo;

public class App {
  public static void main( final String[] args ) {
    /* Objects */
    final Integer a = new Integer( 10 ); /* Deprecated */
    final Integer b = Integer.valueOf( 10 ); /* Unnecessary Boxing */
    final Integer c = Integer.valueOf( "10" );
    final Integer d = Integer.valueOf( "1010", 2 );

    /* Primitives */
    final int e = 10;
    final int f = Integer.parseInt( "10" );
    final int g = Integer.parseInt( "1010", 2 );

    /* Auto-Boxing */
    final Integer h = e;
    final int i = a;

    System.out.println( "-- Objects -----" );
    System.out.printf( "Integer a %d%n", a );
    System.out.printf( "Integer b %d%n", b );
    System.out.printf( "Integer c %d%n", c );
    System.out.printf( "Integer d %d%n", d );

    System.out.println( "-- Primitives --" );
    System.out.printf( "int e     %d%n", e );
    System.out.printf( "int f     %d%n", f );
    System.out.printf( "int g     %d%n", g );

    System.out.println( "-- Auto-Boxing -" );
    System.out.printf( "Integer h %d%n", h );
    System.out.printf( "int i     %d%n", i );
  }
}
```

Output

```bash
-- Objects -----
Integer a 10
Integer b 10
Integer c 10
Integer d 10
-- Primitives --
int e     10
int f     10
int g     10
-- Auto-Boxing -
Integer h 10
int i     10
```

## Autoboxing is an easy target for `NullPointerException`

```java
package demo;

public class App {
  public static void main( final String[] args ) {
    final Integer a = null;
    final int b = a;
    System.out.printf( "The autoboxed value of null is %d%n", b );
  }
}
```

Running this program will throw a `NullPointerException`.

```bash
Exception in thread "main" java.lang.NullPointerException
	at demo.App.main(App.java:6)
```
