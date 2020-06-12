---
layout: default
title: Puzzle (What's my class?)
parent: Strings
grand_parent: Data Types
nav_order: 6
permalink: docs/data-types/strings/puzzle-what-s-my-class
---

# Puzzle (What's my class?)

Consider the following example.

```java
package demo;

public class App {
  public static void main( String[] args ) {
    String name = App.class.getName().replaceAll( ".", "/" ) + ".class";
    System.out.println( name );
  }
}
```

What will the above code prints?

```bash
////////.class
```

This example was taken from [PUZZLE 20: WHAT'S MY CLASS? in Java™ Puzzlers: Traps, Pitfalls, and Corner Cases](https://learning.oreilly.com/library/view/javatm-puzzlers-traps/032133678X/ch03.html).

"_The problem is that `String.replaceAll()` takes a regular expression as its first parameter, not a literal sequence of characters.  (Regular expressions were added to the Java platform in release 1.4.) The regular expression `"."` matches any single character, and so every character of the class name is replaced by a slash, producing the output we saw._"
