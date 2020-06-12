---
layout: default
title: Primitive types
parent: Data Types
nav_order: 3
permalink: docs/data-types/primitive-types/
---

# Primitive types
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

# What are the primitive types?

Java has eight primitive types and **no more can be added**.

| Type    | Size             | Example               | Range                 |
|---------|------------------|-----------------------|-----------------------|
| byte    | 1 byte           | 123 0173 0x7B         | -128 .. +127          |
| short   | 2 bytes          | 32000 0173 0x5000     | -32768 .. +32767      |
| int     | 4 bytes          | 70000 010000 0xFFFFFF | +- 2147483647         |
| long    | 8 bytes          | 1L 0173L 0x7BL        | +-9223372036854775807 |
| char    | Unicode: 2 bytes | 'A' '\t' '\u0065'     | '\u0000'..'\uFFFF'    |
| float   | 4 bytes          | 123.0F 1.23E2F        | 3.40282347E+38F       |
| double  | 8 bytes          | 123.0 1.23E2          | 1.79769313E+308       |
| boolean | 1 byte           | true false            | true - false          |

The primitive types in Java, are all in lower case.  It is an `int` and not `Int`.

Note that the `String` type is not in the above list.

## Signed and unsigned integrals

Java 8 introduces unsigned `int` and `long` as shown in the following example.

```java
package demo;

public class App {
  public static void main( final String[] args ) {
    long unsignedLong = Long.parseUnsignedLong( "18446744073709551615" );

    System.out.printf( "The primitive type: %d%n", unsignedLong );
    System.out.printf( "Using the wrapper functions: %s%n", Long.toUnsignedString( unsignedLong ) );
  }
}
```

Note that we need to go through the respective wrapper class in order to obtain the unsigned number.  The wrapper classes have added a set of methods to handle unsigned version as shown next.

1. [compareUnsigned()](https://docs.oracle.com/javase/8/docs/api/java/lang/Long.html#compareUnsigned-long-long-)
1. [divideUnsigned()](https://docs.oracle.com/javase/8/docs/api/java/lang/Long.html#divideUnsigned-long-long-)
1. [parseUnsignedLong()](https://docs.oracle.com/javase/8/docs/api/java/lang/Long.html#parseUnsignedLong-java.lang.String-)
1. [remainderUnsigned()](https://docs.oracle.com/javase/8/docs/api/java/lang/Long.html#remainderUnsigned-long-long-)
1. [toUnsignedString()](https://docs.oracle.com/javase/8/docs/api/java/lang/Long.html#toUnsignedString-long-)

Note that the above methods needs to be used to perform any simple operaiton on the unsigned version of integrals.
