---
layout: default
title: Introduction to collections (arrays, lists, sets and maps)
parent: Java Light
nav_order: 6
permalink: docs/java-light/introduction-to-collections/
---

# Introduction to collections (arrays, lists, sets and maps)
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Arrays

**🚧 Pending...**

```java
package demo;

import java.util.Arrays;

public class App {
  public static void main( final String[] args ) {
    int[] numbers = { 4, 7, 2, 8, 6 };
    numbers[0] = 1;

    System.out.printf( "Numbers: %s%n", Arrays.toString( numbers ) );
    System.out.printf( "Length of array: %d%n", numbers.length );
    System.out.printf( "First number: %d%n", numbers[0] );
    System.out.printf( "Last number: %d%n", numbers[4] );
  }
}
```

```java
Numbers: [1, 7, 2, 8, 6]
Length of array: 5
First number: 1
Last number: 6
```

## Lists

**🚧 Pending...**

```java
package demo;

import java.util.ArrayList;
import java.util.List;

public class App {
  public static void main( final String[] args ) {
    List<String> names = new ArrayList<>();
    names.add( "Jade" );
    names.add( "Aden" );

    System.out.printf( "Names: %s%n", names );
    System.out.printf( "Size of list: %d%n", names.size() );
    System.out.printf( "First name: %d%n", names.get( 0 ) );
  }
}
```

```bash
Names: [Jade, Aden]
Size of list: 2
First name: Jade
```

## Sets

**🚧 Pending...**

## Maps

**🚧 Pending...**
