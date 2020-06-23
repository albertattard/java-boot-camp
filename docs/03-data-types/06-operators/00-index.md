---
layout: default
title: Operators
parent: Data Types
nav_order: 6
has_children: true
permalink: docs/data-types/operators/
---

# Operators
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Operators

Example

```java
package demo;

public class App {
  public static void main( String[] args ) {
    /* String concatenation */
    {
      int a = 7;
      int b = 3;
      String m = "The number is " + a + b;
      String n = "The number is " + ( a + b );
      String o = a + b + " is the number";
      System.out.println( "-- String concatenation ----" );
      System.out.printf( "Concatenation:   %s%n", m );
      System.out.printf( "Grouping before: %s%n", n );
      System.out.printf( "Adding before:   %s%n", o );
    }

    /* Basic Arithmetic */
    {
      int a = 2;
      int b = 2;
      int c = a + b + 2;
      int d = a++;
      int e = ++b;

      int f = 1 / 2;
      int g = 1 % 2;
      int h = -1 % 2;

      System.out.println( "-- Basic Arithmetic ----------" );
      System.out.printf( "a = %d%n", a );
      System.out.printf( "b = %d%n", b );
      System.out.printf( "a + b + 2 = %d%n", c );
      System.out.printf( "a++ = %d%n", d );
      System.out.printf( "++b = %d%n", e );
      System.out.printf( "1 / 2 = %d%n", f );
      System.out.printf( "1 %% 2 = %d%n", g );
      System.out.printf( "1- %% 2 = %d%n", h );
    }

    /* Arithmetic operations return an int (or long) */
    {
      byte a = 7;
      byte b = 3;
      int plus = a + b;
      int minus = a - b;
      byte c = 7;
      c += b;
      System.out.println( "-- Arithmetic operations ---" );
      System.out.printf( "a + b = %d%n", plus );
      System.out.printf( "a - b = %d%n", minus );
      System.out.printf( "c = %d%n", c );
    }

    /* Relational operators */
    {
      boolean a = 2 > 1;
      boolean b = 2 != 2;
      boolean c = a && b;
      boolean d = a || b;
      boolean e = !a;

      System.out.println( "-- Relational operators ---" );
      System.out.printf( "2 > 1 = %s%n", a );
      System.out.printf( "2 != 2 = %s%n", b );
      System.out.printf( "%s && %s = %s%n", a, b, c );
      System.out.printf( "%s || %s = %s%n", a, b, d );
      System.out.printf( "!%s = %s%n", a, e );
    }
  }
}
```

Output

```bash
-- String concatenation ----
Concatenation:   The number is 73
Grouping before: The number is 10
Adding before:   10 is the number
-- Basic Arithmetic ----------
a = 3
b = 3
a + b + 2 = 6
a++ = 2
++b = 3
1 / 2 = 0
1 % 2 = 1
1- % 2 = -1
-- Arithmetic operations ---
a + b = 10
a - b = 4
c = 10
-- Relational operators ---
2 > 1 = true
2 != 2 = false
true && false = false
true || false = true
!true = false
```

## Why does the `+` does not return `byte`, `short` or `char`?

{% include custom/pending.html %}

## Miscellaneous

1. `==` and `equals()`
