---
layout: default
title: Basics
parent: Generics
nav_order: 2
permalink: docs/generics/basics/
---

# Basics
{: .no_toc }

This section provides an introduction to generics and compares these to [raw types]({{ 'docs/generics/raw-types/' | absolute_url }}), discussed before.

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Generics

Java 1.5 introduced [generics](https://docs.oracle.com/javase/tutorial/java/generics/index.html).  Generics allows us to provide hints to the Java compiler about the contents of our containers, such as [`List`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/List.html) or [`Set`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/Set.html) to name two, as shown in the following example.

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
  }
}
```

In the above example, we declared a list of type `String`.  This means that our list can only contain `String`s and we cannot put in any other type.  Generics have the following advantages when compared to [raw types]({{ '/docs/generics/basics/' | absolute_url }}).

1. Casting is not required anymore

   We can retrieve items and use them without having to type cast them as shown in the following fragment.

   ```java
          final String firstChild = children.get( 0 );
   ```

   Following is the complete example.

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

   This is quite convenient.

1. Cannot add anything else but `String`s

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

   The above example does not compile as, when we use generics, the Java compilers check and fails if the wrong type is provided, as shown next.

   ```bash
   src/main/java/demo/App.java:14: error: incompatible types: int cannot be converted to String
       children.add( 0, 7 );
                        ^
   ```

   This ensures that our list only contains the correct elements.

## Can we assign a raw type to a generics list?

Yes.  Consider the following example.

{% include custom/not_recommended.html details="The following example gives the illusion of using generics while actually using raw types" %}

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

The method `createRawTypeList()` returns a raw type `List`, which is then assigned to a `List` of type `String`.  The above example compiles and print the following.

```bash
Children: [7, java.awt.Point[x=1,y=2], Jade, Aden]
```

With that said, this example produces warning as shown next,

```bash
Note: src/main/java/demo/App.java uses unchecked or unsafe operations.
Note: Recompile with -Xlint:unchecked for details.
```

As already discuses in the [raw types section]({{ '/docs/generics/raw-types/' | absolute_url }}), **raw types are discouraged**.  The above example is even worse than the previous ones.  This example gives the illusion that the `List` named `children` only contains `String`s, where it contains other types too.

[Effective Java](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097) advise against usage of raw types, in [Item 26: Don’t use raw types](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/ch5.xhtml#lev26), and recommends the use of [Generics, discussed next]({{ 'docs/generics/basics/' | absolute_url }}).  The next item in the same chapter, [Item 27: Eliminate unchecked warnings](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/ch5.xhtml#lev27), strongly recommends getting rid of unchecked warnings too.

## Diamond Operator

[Java 7]( https://openjdk.java.net/projects/jdk7/features/) provided a new operator, called the [diamond operator](https://docs.oracle.com/javase/8/docs/technotes/guides/language/type-inference-generic-instance-creation.html) as part of [JSR 334: Small Enhancements to the JavaTM Programming Language (a.k.a _project coin_)](https://jcp.org/en/jsr/detail?id=334).

Consider the following code fragment.

```java
    final List<String> children = new ArrayList<String>();
```

As of Java 7, we can make use of the diamond operator, `<>`, and remove the type from the initialisation, as shown next.

```java
    final List<String> children = new ArrayList<>();
```

Following is the complete example.

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

The compilers can use the variable declaration to determine the type of the list.  In our case, the list will be of type `String` and there is no need to provide it twice.

The diamond operator can be safely used anywhere where the type can be inferred from the left-hand side of the expression.  Consider the following example.

{% include custom/proceed_with_caution.html details="Do not use the diamond operator where the type cannot be easily inferred, as this may lead to surprises" %}

```java
package demo;

import java.util.ArrayList;

public class App {

  public static void main( final String[] args ) {
    final var children = new ArrayList<>();
    children.add( "Jade" );
    children.add( "Aden" );
    System.out.printf( "Children: %s%n", children );
  }
}
```

**What is the type of the variable `children`?**

One can easily mistake the type of the variable `children` to a `List`.  The variable with the name `children` is an `ArrayList` of type `Object`.

```java
    final ArrayList<Object> children = new ArrayList<>();
```

Consider the following example.

```java
package demo;

import java.util.ArrayList;

public class App {

  public static void main( final String[] args ) {
    final var children = new ArrayList<>();
    children.add( "Jade" );
    children.add( "Aden" );

    /* ⚠️ We can add anything to the list */
    children.add( 7 );

    System.out.printf( "Children: %s%n", children );
  }
}
```

The above example, compiles as the list can contain `Object`s and not just `String`s.  **Avoid using the diamond operator when the type cannot be deducted from the left-hand side of the expression**.

## Can we use generics with primitive types?


**No**.  Generics only work with reference types.

Java 1.5 also introduced [autoboxing]({{ '/docs/data-types/autoboxing/' | absolute_url }}), which simplifies the use of [primitive types]({{ '/docs/data-types/primitive-types/' | absolute_url }}).  In a nutshell, Java converts our primitives into reference type through the respective [wrapper]({{ '/docs/data-types/primitive-types/#what-are-the-wrapper-types' | absolute_url }}).

Generics work only with reference types and primitives are converted to reference types.  Consider the following example.

```java
package demo;

import java.util.ArrayList;
import java.util.List;

public class App {

  public static void main( final String[] args ) {
    final List<Integer> numbers = new ArrayList<>();
    numbers.add( 7 );
    numbers.add( 4 );

    System.out.printf( "Numbers: %s%n", numbers );
  }
}
```

The variable `numbers` is a list of type `Integer` (reference type) and not `int` (reference type).  The `int` literals `7` and `4` are converted to `Integer`s using the [`Integer.valueOf()`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/lang/Integer.html#valueOf(int)) method.

Creating an object from a primitive takes more space as objects carry an overhead.  With that said, the [static factory method]({{ '/docs/simple-objects/constructors/#what-are-static-factory-methods' | absolute_url }}) `valueOf()` caches some values to save up memory.

## Are there cases where we cannot use generics?

**YES**

There are some cases where we cannot use generics.

1. Cannot have generic static fields

   {% include custom/dose_not_compile.html %}

   ```java
   /* pending example */
   ```

1. Cannot create generic instance

   {% include custom/dose_not_compile.html %}

   ```java
   /* pending example */
   ```

1. Cannot create generic arrays

   {% include custom/dose_not_compile.html %}

   ```java
   package demo;

   public class App {

     public static void main( final String[] args ) {
       final String[] array = createArray();
     }

     private static <T> T[] createArray() {
       /* ⚠️ cannot create generic arrays */
       final T[] array = new T[0];
       return array;
     }
   }
   ```

   We cannot use raw types in this example, but worth noting that we cannot create generic arrays.

1. Cannot catch a generic exception

   {% include custom/dose_not_compile.html %}

   ```java
   /* pending example */
   ```
