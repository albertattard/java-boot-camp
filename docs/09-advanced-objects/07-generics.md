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

{% include custom/not_recommended.html details="The following example makes use of raw types, which are now discouraged" %}

Item 26: Don’t use raw types
https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/ch5.xhtml#lev26

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

```bash
Children: [Jade, Aden]
```

Item 27: Eliminate unchecked warnings
https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/ch5.xhtml#lev27

```bash
Note: src/main/java/demo/App.java uses unchecked or unsafe operations.
Note: Recompile with -Xlint:unchecked for details.
```

```groovy
tasks.withType(JavaCompile).each {
  it.options.deprecation = true
  it.options.compilerArgs.add('-Xlint:unchecked')
}
```

```groovy
tasks.withType(JavaCompile).each {
  it.options.deprecation = true
  it.options.compilerArgs.add('-Xlint:unchecked')
  it.options.compilerArgs.add('--enable-preview')
}
```

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

```bash
src/main/java/demo/App.java:12: error: incompatible types: Object cannot be converted to String
    final String firstChild = children.get( 0 );
                                          ^
```

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

```bash
Children: [7, Jade, Aden]
Exception in thread "main" java.lang.ClassCastException: class java.lang.Integer cannot be cast to class java.lang.String (java.lang.Integer and java.lang.String are in module java.base of loader 'bootstrap')
	at demo.App.main(App.java:19)
```

## Generics

1. Casting is not required anymore

   ```java
   package demo;

   import java.util.ArrayList;
   import java.util.List;

   public class App {

     public static void main( final String[] args ) {
       final List<String> children = new ArrayList<String>();
       children.add( "Jade" );
       children.add( "Aden" );
       System.out.printf( "Children: %s%n", children );

       final String firstChild = children.get( 0 );
       System.out.printf( "%s is the first child%n", firstChild );
     }
   }
   ```

1. Cannot add anything else but Strings

   {% include custom/dose_not_compile.html %}

   ```java
   package demo;

   import java.util.ArrayList;
   import java.util.List;

   public class App {

     public static void main( final String[] args ) {
       final List<String> children = new ArrayList<String>();
       children.add( "Jade" );
       children.add( "Aden" );

       /* ⚠️ Cannot add an int to a list of type String */
       children.add( 0, 7 );

       System.out.printf( "Children: %s%n", children );
     }
   }
   ```

   ```bash
   src/main/java/demo/App.java:14: error: incompatible types: int cannot be converted to String
       children.add( 0, 7 );
                        ^
   ```

Some details: https://stackoverflow.com/questions/4166966/what-is-the-point-of-the-diamond-operator-in-java-7

```java
package demo;

import java.awt.Point;
import java.util.ArrayList;
import java.util.List;

public class App {

  public static void main( final String[] args ) {
    final List<String> children = createRawTypeList();
    children.add( "Jade" );
    children.add( "Aden" );
    System.out.printf( "Children: %s%n", children );
  }

  public static List createRawTypeList() {
    final List rawType = new ArrayList();
    rawType.add( 7 );
    rawType.add( new Point( 1, 2 ) );
    return rawType;
  }
}
```

```bash
Children: [7, java.awt.Point[x=1,y=2], Jade, Aden]
```

```bash
Note: src/main/java/demo/App.java uses unchecked or unsafe operations.
Note: Recompile with -Xlint:unchecked for details.
```

## Diamond Operator

[Diamond Operator](https://docs.oracle.com/javase/8/docs/technotes/guides/language/type-inference-generic-instance-creation.html)


```java
    final List<String> children = new ArrayList<String>();
```

```java
    final List<String> children = new ArrayList<>();
```

```java
package demo;

import java.util.ArrayList;
import java.util.List;

public class App {

  public static void main( final String[] args ) {
    final List<String> children = new ArrayList<>();
    children.add( "Jade" );
    children.add( "Aden" );
    System.out.printf( "Children: %s%n", children );
  }
}
```

## Others

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
