---
layout: default
title: Stack and Heap
parent: Data Types
nav_order: 5
permalink: docs/data-types/stack-and-heap/
---

# Stack and Heap
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## OS Process Memory

The OS process memory is divided into four segments:

1. The **text** segment comprises the compiled program code (**Not our Java compiled Java code, but the JVM**)
1. The **data** segment stores global and static variables, allocated and initialized prior to executing main (**Used by the JVM and not our Java code**)
1. The **heap** segment is used for dynamic memory allocation (**The JVM maintains very something similar**)
1. The **stack** segment is used for local variables (**The JVM maintains very something similar**)

![Process Memory Model]({{site.baseurl}}/assets/images/Process-Memory-Model.png)

The *text* and *data* segments are fixed, and their size does not change during the program's lifetime.

The *stack* and the *heap* segments start at opposite ends of the process's free space and grow towards each other.  If they should ever meet, then either a stack overflow or out of memory error will occur.

When working with Java, we mainly work with the *Java stack* and the *Java heap*.  It is important to note that the OS process memory and the memory we work with within the JVM, behave similarly but are different things.

Consider the following command, used to start our application.

```bash
$ java -jar application.jar
```

The `java` is an executable file and when executed it starts the JVM.  The `java` command starts an instance of the JVM.  We can have many JVM instances running, each on a separate OS process, with its own OS process memory.

The JVM uses the OS process memory, shown above, to run and execute our code.  Our code runs within the JVM - a program (our code) runs within another program (JVM).  The JVM executable code (**not our code**) is loaded into the *text* OS process memory and the JVM constants are stored in the *data* segment of the OS process memory.

Internally, the JVM maintains its own *stack* and *heap* (referred to here as the *Java stack* and the *Java heap*), which while these behave similar to the OS process memory, they are different.

**We will only focus on the *Java stack* and *Java heap* from this point onwards**.

## What goes in the Java Stack?

When our Java program starts, Java calls our `main()` method.  When Java does so, it adds a new frame in the *Java stack*.  Every time a method is called, Java adds a new frame in the *Java stack*, and it removes this frame once the method completes.

Once the *Java stack* is empty, our program completes.  Once the `main()` method finishes execution, Java will remove the last frame from the *Java stack* and the program completes.  We will revise and elaborates this point when we discuss [threads and concurrency](11-Concurrency.md).

All variables created and used within a method are stored in the method's frame in the *Java stack*.

Consider the following example.

```java
package demo;

public class App {

  public static void main( String[] args ) {
    int a = 7;
    System.out.printf( "The value of a is %d%n", a );
  }
}
```

The `main()` method is
1. receiving the command line arguments
    (`String[] args`)
1. creating a local variable
    (`int a = 7;`)
1. calling another method to print a simple message
    (`System.out.printf( "The value of a is %d%n", a );`)

A new *Java stack* frame is created for the `main()` method, which will contain two variables, amongst other things.  The `main()` method calls (or invokes) the `printf()` method.  Java will create a new *Java stack* frame for the `printf()` method.  Any variables used by the `printf()` method will be stored in the `printf()`'s frame in the *Java stack*.

![Stack - main() calls printf()]({{site.baseurl}}/assets/images/Stack-main()-calls-printf().png)

Every time a method is called, Java adds a new frame in the *Java stack*.

Consider the following example

![Stack - showing 4 methods]({{site.baseurl}}/assets/images/Stack-showing-4-methods.png)

Based on the above image, we see that
1. The `main()` method called method `a()`, which in turn called method `b()`, which called method `c()`.
1. The size of *Java stack* frame of each method depends on the number of variables each method contains.  It is clear that method `b()` is quite big when compared with the others.  This means that method `b()` has lots of variables.
1. Method `c()` is the current active method.  Java is currently executing this method.  The method at the top of the *Java stack*, is the active method.

Java has [two types of variables](https://docs.oracle.com/javase/specs/jls/se14/html/jls-4.html#jls-4.12):
1. [primitive types](https://docs.oracle.com/javase/specs/jls/se14/html/jls-4.html#jls-4.12.1)
1. [reference types (also referred to as *objects* or *object types*)](https://docs.oracle.com/javase/specs/jls/se14/html/jls-4.html#jls-4.12.2)

The primitive type variables are stored in the *Java stack*.

Consider the following variable.

```java
int a = 7;
```

The variable named `a` is of primitive type.  The `int` value of the primitive variables, `7` in this case, is stored in the *Java stack*.

![Primitive Variable stored in the Java Stack]({{site.baseurl}}/assets/images/Primitive-Variable-stored-in-the-Java-Stack.png)

Consider the following example.

```java
int a = 7;
a = 3;
```

1. Variable `a` starts with the value of `7`

![Variable a starts with value 7]({{site.baseurl}}/assets/images/Primitive-Variable-stored-in-the-Java-Stack.png)

1. Then it is changed to `3` using the assignment operator (`=`)

![Variable a changed its value to 3]({{site.baseurl}}/assets/images/Java-Stack-and-Assignment-Operator.png)

Reference type variables are stored in two places in the memory.
1. The variable itself, is stored in the *Java stack*
1. The actual object is **not stored** in the *Java stack*.  It is stored in the *Java heap*.

## What goes in the Java Heap?

The *Java heap* contains all our objects.

```java
String s = "my object type";
```

The reference type variable `s` is stored in the *Java stack* while the actual object, `"my object type"`, is stored in the *Java heap*.  The reference type variable `s` will have a reference, hence the name reference type, to the object in the *Java heap*.  Note that we do not use the term *pointer*, like in C/C++, in Java despite these behave in a similar way.

Consider the following two variables

```java
int a = 7;
String s = "my object type";
```

![Stack and Heap]({{site.baseurl}}/assets/images/Stack-and-Heap.png)

The variables (both types) are only found in the *Java stack*, while the objects are only found in the *Java heap*.  The size of the *Java stack* frame for our method is directly proportional to the number of variables our method has.

The size of the method itself (such as the number of lines of code or the complex algorithms) does not affect the *Java stack* as methods are stored elsewhere.

Having large objects, will not affect the *Java stack* as all objects' data is stored in the *Java heap*.

Consider the following example

```java
int a = 7;
String s = "my object type";
String s1 = s;
String s2 = s;
String s3 = s;
```

The above code fragment has five variables, one primitive type and four reference types, and an object.

![Many Variables One Object]({{site.baseurl}}/assets/images/Many-Variables-One-Object.png)

All reference type variables are pointing to the same object in the *Java heap*.

This is quite an important thing to note as when the object in the *Java heap* is modified through one of the variables, all the other variables will be affected.

Consider the following example.

```java
package demo;

import java.awt.Point;

public class App {

  public static void main( String[] args ) {
    /* Create an object */
    Point a = new Point( 5, 5 );
    Point b = a;
    Point c = a;

    /* Modify the object through one of the variables */
    b.x = 7;
    c.y = 3;

    System.out.printf( "Point - x:%d, y:%d%n", a.x, a.y );
  }
}
```

The [`Point` class](https://docs.oracle.com/en/java/javase/14/docs/api/java.desktop/java/awt/Point.html) is part of the Java API.  It represents a point on a cartesian space.

1. Three variables, `a`, `b` and `c` are created and assigned the same object

    ![One Point Three Variables]({{site.baseurl}}/assets/images/One-Point-Three-Variables-A.png)

1. The `x` coordinate is modified through variable `b`

    ![One Point Three Variables]({{site.baseurl}}/assets/images/One-Point-Three-Variables-B.png)

1. The `y` coordinate is modified through variable `c`

    ![One Point Three Variables]({{site.baseurl}}/assets/images/One-Point-Three-Variables-C.png)

The above program will print

```bash
Point - x:7, y:3
```

## Variables without a value

A variable can be declared but not initialised.  Such variable cannot be used before it is initialised.

{% include custom/dose_not_compile.html %}

```java
package demo;

public class App {

  public static void main( String[] args ) {
    int a;
    System.out.printf( "%d%n", a );
  }
}
```

When compiling the above code, we will get an error similar to the following.

```bash
$ ./gradlew clean build

> Task :compileJava FAILED
src/main/java/demo/App.java:7: error: variable a might not have been initialized
    System.out.printf( "%d%n", a );
                               ^
```

The variable will appear on the *Java stack* once a value is assigned to it.  There are cases, where a default value is assigned to variables, but this does not apply to local variables.

## Can we have a reference variable without the equivalent object in the Java heap (null)?

Yes.  We can have reference type variables that do not yet have an equivalent object in the *Java heap*.  As mentioned in the [previous section](#variables-without-a-value), we cannot use variables that do not have a value.

Reference types may be assigned the special value `null`.

Consider the following example

```java
package demo;

public class App {

  public static void main( String[] args ) {
    String a = null;
    System.out.printf( "a = %s%n", a );
  }
}
```

The variable `a` is assigned the special value `null`.  This is a special value, which points to a special place in memory, referred to the [Zero page](https://en.wikipedia.org/wiki/Zero_page).

![nulls]({{site.baseurl}}/assets/images/null-stack-and-heap.png)

### What happens if we try to call a method on a null object?

The `String` class has the `length()`, which returns the number of bytes required by the string.

In this case we are not consuming anything in the *Java heap*, thus one may assume that the `length()` should return `0`.  Unfortunately, it does not work like that.

Consider the following example.

```java
package demo;

public class App {

  public static void main( String[] args ) {
    String a = null;
    int length = a.length();
    System.out.printf( "The length of string is %d%n", length );
  }
}
```

The (reference type) variable `a` is set to the special value `null`.  The above code compiles but fails with the following error when the program is executed.

```bash
Exception in thread "main" java.lang.NullPointerException
	at demo.App.main(App.java:7)
```

### What is `NullPointerException`?

The error `NullPointerException` is one of the most common errors in Java.  This is cause when we try to invoke methods on a `null` object.  It is quite simple, yet drives people crazy and [caused billions to the industry](https://www.infoq.com/presentations/Null-References-The-Billion-Dollar-Mistake-Tony-Hoare/).

## The new operator and the Java Heap

Objects are created using the [`new` operator](https://docs.oracle.com/javase/tutorial/java/javaOO/objectcreation.html).

Consider the following example.

```java
package demo;

import java.awt.Point;

public class App {
  public static void main( String[] args ) {
    Point p = new Point( 1, 2 );
    System.out.printf( "My point is %s%n", p );
  }
}
```

An object of type `Point` is created and assigned to the variable of the same type, `p`.

There are some exceptions to this rule.  Some types of objects can be created without using the `new` operator.

1. Strings can be created by assigning string literals

    ```java
    package demo;

    public class App {
      public static void main( String[] args ) {
        String s = "my string";
        System.out.println( s );
      }
    }
    ```

1. Arrays ([discussed later on, together with collections](07-Collections.md#arrays)) can be created without using the `new` operator

    ```java
    package demo;

    public class App {
      public static void main( String[] args ) {
        int[] a = { 1, 2, 3, 4, 5 };
        System.out.printf( "The array has %d elements%n", a.length );
      }
    }
    ```

1. Lambda function ([discussed in great depth later on](08-Lambda.md)) can be created without using the `new` operator as shown next

    ```java
    package demo;

    public class App {
      public static void main( String[] args ) {
        Runnable r = () -> {
          System.out.println( "I'm running in a lambda" );
        };
        r.run();
      }
    }
    ```

Every time the `new` operator is used, a new object is created and added to the *Java heap*.  There is no escape.

Consider the following example.

```java
package demo;

import java.awt.Point;

public class App {
  public static void main( String[] args ) {
    new Point( 1, 2 );
    new Point( 3, 4 );
    new Point( 5, 6 );
  }
}
```

Three objects of type `Point` are created and none are assigned to a variable.

![Objects in Java Heap without a Variable in the Java Stack]({{site.baseurl}}/assets/images/Objects-in-Java-Heap-without-a-Variable-in-the-Java-Stack.png)

**Is this a memory leak?**

No.  Java is immune from memory leaks and the above objects will be cleaned by the garbage collector.

## Garbage collection

Java is a managed language, which means that the programmers does not need to worry about the memory.  The following the image shows the main components of the JVM.

![Key Hotspot JVM Components]({{site.baseurl}}/assets/images/Key-Hotspot-JVM-Components.png)
([Reference](https://www.oracle.com/technetwork/tutorials/tutorials-1876574.html))

The garbage collector, featuring in the above image, is responsible from removing any objects in the *Java heap* which are not required anymore.  In a nutshell, the garbage collector scans the *Java heap* and removes any dangling objects.  Note that while the garbage collector is running, the JVM is paused.  This is a critical aspect of performance tuning.  A badly tuned system may spend most of its time paused, while the garbage collector cleans the *Java heap*.

Note that the garbage collector only cleans the *Java heap*.  The garbage collector does not clean the *Java stack*.

The main point here is that the garbage collector is not a free lunch.  With that said, **do not optimise prematurely**.  Remember, "*Premature optimization is the root of all evil*".

### Recommended reading

1. Optimizing Java ([O'Reilly Video Series](https://learning.oreilly.com/videos/optimizing-java/9781492044673))

## String or new String?

Consider the following.

```java
String s = new String( "my string" );
```

How may `String` objects do we have?

The correct answer is 2.
1. An object is used to store the literal
1. Another object is created when the `new` operator is used

**The above is discouraged as unnecessary objects are created in memory**.  Prefer the following instead.

```java
String s = "my string";
```

## What happens to a variable when it goes out of scope?

Objects that are not required anymore are cleaned by the [garbage collector](#garbage-collection).  The garbage collector cleans the objects and not the variables.

Variables are stored in the *Java stack* and are removed automatically once the variables go out of scope.  Once a variable goes out of scope, the variable is removed from the *Java stack*.
