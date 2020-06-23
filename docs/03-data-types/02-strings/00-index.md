---
layout: default
title: Strings
parent: Data Types
nav_order: 2
has_children: true
permalink: docs/data-types/strings/
---

# Strings
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Strings

{% include custom/pending.html %}

## Mutable strings (`StringBuilder` and `StringBuffer`)

{% include custom/pending.html %}

## Text blocks and multiline strings

As of Java 15, Java will start supporting text block, also referred to as multiline Strings, defined by [JEP-378](https://openjdk.java.net/jeps/378).  The text block will be defined by the [Java language specification 3.10.6, currently available as preview](https://docs.oracle.com/javase/specs/jls/se14/preview/specs/text-blocks-jls.html).

**⚠️ THE FOLLOWING EXAMPLE WILL NOT COMPILE WITH JAVA 14 OR BEFORE!!**

```java
package demo;

public class App {
  public static void main( String[] args ) {
    String s = """
               “This is the day upon which
                we are reminded of what we
                are on the other 364.”
                —Mark Twain
               """;
    System.out.println(s);
  }
}
```

The above example will print.

```bash
“This is the day upon which
 we are reminded of what we
 are on the other 364.”
 —Mark Twain
```

Note how the second, third and fourth lines are indented by one space, preserving the formatting.

## Does Java supports string interpolation?

**No**.

{% include custom/pending.html %}
