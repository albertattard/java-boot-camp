---
layout: default
title: Introduction to classes and methods
parent: Java Light
nav_order: 3
permalink: docs/java-light/introduction-to-classes-and-methods/
---

# Introduction to classes and methods
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Source and class files

{% include custom/pending.html %}

```java
package demo;

public class App {
  public static void main( final String[] args ) {
    System.out.println( "Hello World!!" );
  }
}
```

```bash
Hello world!!
```

```bash
$ tree src/main/java
src/main/java
└── demo
    └── App.java
```

```bash
$ tree build/classes/java
build/classes/java
└── main
    └── demo
        └── App.class
```

```bash
$ ./gradlew run

> Task :run
Hello world!!

BUILD SUCCESSFUL in 714ms
2 actionable tasks: 2 executed
```

```bash
$ java -cp build/classes/java/main demo.App
Hello world!!
```

## Methods

{% include custom/pending.html %}

```java
package demo;

public class App {
  public static void main( final String[] args ) {
    printHello();
  }

  public static void printHello() {
    System.out.println( "Hello world!!" );
  }
}
```

```bash
Hello world!!
```
