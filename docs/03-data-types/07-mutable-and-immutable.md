---
layout: default
title: Mutable and immutable
parent: Data Types
nav_order: 7
permalink: docs/data-types/mutable-and-immutable/
---

# Mutable and immutable
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Mutable and immutable

Example

```java
package demo;

public class App {

  public static void main( String[] args ) {
    /* Mutable */
    int a = 2;
    a++;

    /* Immutable */
    final int b = 3;

    /* Immutable (initialised after declared) */
    final int c;
    c = 3;

    System.out.printf( "a = %d%n", a );
    System.out.printf( "b = %d%n", b );
    System.out.printf( "c = %d%n", c );
  }
}
```

Output

```
a = 3
b = 3
c = 3
```

## The `final` keyword

The `final` keyword marks a variable as immutable.  This means that the variable's value, be it the primitive value itself or the reference, cannot be changed.  This means that the *Java stack* value, **and not the *Java heap* value**, cannot be modified.

**The `final` keyword affects the *Java stack* and not the *Java heap* contents**.

## When should I use the final keyword?

**🚧 Pending...**
