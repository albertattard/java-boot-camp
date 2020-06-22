---
layout: default
title: Raw Types
parent: Generics
nav_order: 7
permalink: docs/generics/raw-types/
---

# Raw Types
{: .no_toc }

Raw types are considered bad programming practice as of Java 1.5 and should be avoided.  These are introduced so that the reader understands what these are and why raw types are discouraged.

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Raw Types

Consider a list of names, as shown in the following example.

{% include custom/not_recommended.html details="The following example makes use of <em>raw types</em>, which are discouraged" %}

```java
package demo;

import java.util.ArrayList;
import java.util.List;

public class App {

  public static void main( final String[] args ) {
    final List children = new ArrayList();
    children.add( "Jade" );
    children.add( "Aden" );
    System.out.printf( "Children: %s%n", children );
  }
}
```

The above example makes use of _raw types_, where we create a list without providing any hints to Java about the type of content of the lists.  Our list will contain names, represented by the `String` type.  This example will print the following.

```bash
Children: [Jade, Aden]
```

Before Java 1.5, we had no means to indicate to Java what's the content of the list.  This was quite annoying as we could not use the output of the list without casting it.  Consider the following example.

{% include custom/dose_not_compile.html %}

```java
package demo;

import java.util.ArrayList;
import java.util.List;

public class App {

  public static void main( final String[] args ) {
    final List children = new ArrayList();
    children.add( "Jade" );
    children.add( "Aden" );
    System.out.printf( "Children: %s%n", children );

    final String firstChild = children.get( 0 );
    System.out.printf( "%s is the first child%n", firstChild );
  }
}
```

The above example does not compile.  The list may contain anything and thus Java has no way to be certain that the given element is of type `String`.

```bash
src/main/java/demo/App.java:12: error: incompatible types: Object cannot be converted to String
    final String firstChild = children.get( 0 );
                                          ^
```

Despite the fact that we know what the content of the list is, we have to type cast the result to the required type, as shown in the following fragment.

```java
    final String firstChild = (String) children.get( 0 );
```

Following is the complete example.

```java
package demo;

import java.util.ArrayList;
import java.util.List;

public class App {

  public static void main( final String[] args ) {
    final List children = new ArrayList();
    children.add( "Jade" );
    children.add( "Aden" );
    System.out.printf( "Children: %s%n", children );

    final String firstChild = (String) children.get( 0 );
    System.out.printf( "%s is the first child%n", firstChild );
  }
}
```

While casting elements was annoying this was not the main problem with raw types.  Consider the following example.

{% include custom/compile_but_throws.html e="ClassCastException" %}

```java
package demo;

import java.util.ArrayList;
import java.util.List;

public class App {

  public static void main( final String[] args ) {
    final List children = new ArrayList();
    children.add( "Jade" );
    children.add( "Aden" );

    /* ⚠️ We can add anything to a raw-typed list */
    /* ⚠️ Added an integer as the first element of the list */
    children.add( 0, 7 );

    System.out.printf( "Children: %s%n", children );

    final String firstChild = (String) children.get( 0 );
    System.out.printf( "%s is the first child%n", firstChild );
  }
}
```

In the above example, we are adding a new element of type `Integer` in the list as the first element.  Later on, we are retrieving the same first element and casting it into a `String`.  This will cause a `ClassCastException` to be thrown, as shown next.

```bash
Children: [7, Jade, Aden]
Exception in thread "main" java.lang.ClassCastException: class java.lang.Integer cannot be cast to class java.lang.String (java.lang.Integer and java.lang.String are in module java.base of loader 'bootstrap')
	at demo.App.main(App.java:19)
```

Raw types are quite error prone as the compiler cannot help us here.  As of Java 1.5, the Java compiler produces warnings whenever raw types are used.

```bash
Note: src/main/java/demo/App.java uses unchecked or unsafe operations.
Note: Recompile with -Xlint:unchecked for details.
```

We can see the warnings by adding the `-Xlint:unchecked` flag to the Java compiler within the `build.gradle` file, as shown next.

```groovy
tasks.withType(JavaCompile).each {
  it.options.deprecation = true
  it.options.compilerArgs.add('-Xlint:unchecked')
}
```

We can have more than one Java compiler flag.  For example, when using Java preview features, we also add the `--enable-preview` flag as shown next.

```groovy
tasks.withType(JavaCompile).each {
  it.options.deprecation = true
  it.options.compilerArgs.add('-Xlint:unchecked')
  it.options.compilerArgs.add('--enable-preview')
}
```

Compiling the previous example with the `-Xlint:unchecked` flag will show all warnings, as shown next.

```bash
$ ./gradlew clean build

> Task :compileJava
src/main/java/demo/App.java:10: warning: [unchecked] unchecked call to add(E) as a member of the raw type List
    children.add( "Jade" );
                ^
  where E is a type-variable:
    E extends Object declared in interface List
src/main/java/demo/App.java:11: warning: [unchecked] unchecked call to add(E) as a member of the raw type List
    children.add( "Aden" );
                ^
  where E is a type-variable:
    E extends Object declared in interface List
2 warnings

BUILD SUCCESSFUL in 2s
10 actionable tasks: 10 executed
```

[Effective Java](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097) advise against usage of raw types, in [Item 26: Don’t use raw types](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/ch5.xhtml#lev26), and recommends the use of [Generics, discussed next]({{ 'docs/generics/basics/' | absolute_url }}).  The next item in the same chapter, [Item 27: Eliminate unchecked warnings](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/ch5.xhtml#lev27), strongly recommends getting rid of unchecked warnings too.
