---
layout: default
title: Reference types (the rest)
parent: Data Types
nav_order: 4
permalink: docs/data-types/reference-types/
---

# Reference types (the rest)
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## What are the reference types?

The `String` type, like anything else that is not a primitive type, is a reference type.  We can create as many new reference types as we need.

By convention, reference types start with a capital letter.  It is a `String` and not a `string`.  Nothing stops us from creating our own reference type using lower-case, but this is discouraged.

One of the main differences between primitive and reference types, is that the latter support functionality (methods).

Consider the following example.

```java
package demo;

public class App {

  public static void main( String[] args ) {
    String s = "Hello 🌎";
    int length = s.length();

    System.out.printf( "The string '%s' is %d bytes (not necessary letters) long%n", s, length );
  }
}
```

The [`String` type has a method called `length()`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/lang/String.html#length()), which returns the number of bytes (not necessary the number of letters as some of these may be more than one byte long) the string requires to store our string in memory.  The above program prints.

```bash
The string 'Hello 🌎' is 8 bytes (not necessary letters) long
```

## Variables and their values

It is important to make the distinction between variables, types and values.

![Variables and their Values]({{site.baseurl}}/assets/images/Variables-and-values.png)

Observations:
1. Variables must have a type
1. Variables' type does not change throughout their existence
1. Variables can contain values of the same type (or a type can be safely stored by the variable)
