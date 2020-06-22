---
layout: default
title: Generics
parent: Advanced Objects
nav_order: 7
permalink: docs/advanced-objects/generics/
---

# Generics
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Raw Types

```java
package demo;

import java.util.Arrays;
import java.util.List;

public class App {

  public static void main( final String[] args ) {
    final List children = Arrays.asList( "Jade", "Aden" );
    System.out.printf( "Children: %s%n", children );
  }
}
```

{% include custom/dose_not_compile.html %}

## Generics

**🚧 Pending...**

[Diamond Operator](https://docs.oracle.com/javase/8/docs/technotes/guides/language/type-inference-generic-instance-creation.html)

Are not 100% Erased

```java
package demo;

import java.util.concurrent.Callable;

public class PiCallable implements Callable<Double> {

  @Override
  public Double call() {
    return Math.PI;
  }
}
```

```bash
$ ./gradlew clean build
```

```bash
javap build/classes/java/main/demo/PiCallable.class
Compiled from "PiCallable.java"
public class demo.PiCallable implements java.util.concurrent.Callable<java.lang.Double> {
  public demo.PiCallable();
  public java.lang.Double call();
  public java.lang.Object call() throws java.lang.Exception;
}
```

Some generic information is retained for linking purposes, otherwise the compiler will not be able to determine whether this is the correct generic.

```java
public void readDouble(Callable<Double> callable) { /**/ }
```

Generics need to be backward compatible and need to support raw types.  That's why we have two versions of the `call()` method.

```java
public void linkToRawType(Callable callable) { /**/ }
```
