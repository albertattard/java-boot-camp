---
layout: default
title: Puzzle (What's my class, Take 2)
parent: Strings
grand_parent: Data Types
nav_order: 7
permalink: docs/data-types/strings/puzzle-what-s-my-class-take-2
---

# Puzzle (What's my class, Take 2)

```java
package demo;

import java.io.File;

public class App {
  public static void main( String[] args ) {
    String name = App.class.getName().replaceAll( "\\.", File.separator ) + ".class";
    System.out.println( name );
  }
}
```

Java is said to be [write once and run everywhere](https://docs.oracle.com/javase/tutorial/getStarted/intro/changemylife.html) and that's true, if you avoid some corner cases.  The above will fail on a [Windows operating system](https://www.microsoft.com/en-us/windows).

```bash
Exception in thread "main" StringIndexOutOfBoundsException: String index out of range: 1
  at java.lang.String.charAt(String.java:558)
  at java.util.regex.Matcher.appendReplacement(Matcher.java:696)
  at java.util.regex.Matcher.replaceAll(Matcher.java:806)
  at java.lang.String.replaceAll(String.java:2000)
  at com.javapuzzlers.MeToo.main(MeToo.java:6)
```

This example was taken from [PUZZLE 21: WHAT’S MY CLASS, TAKE 2 in Java™ Puzzlers: Traps, Pitfalls, and Corner Cases](https://learning.oreilly.com/library/view/javatm-puzzlers-traps/032133678X/ch03.html).

"_Although this behavior is platform dependent, it isn't exactly what we were looking for. What went wrong on Windows?  It turns out that the second parameter of `String.replaceAll()` is a not an ordinary string but a replacement string, as defined in the `java.util.regex` specification ([Java-API](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/lang/String.html#replaceAll(java.lang.String,java.lang.String))).  A backslash appearing in a replacement string escapes the following character, causing it to be treated literally.  When you run the program on Windows, the replacement string is a lone backslash character, which is invalid.  Admittedly, the exception could be a little more informative._"
