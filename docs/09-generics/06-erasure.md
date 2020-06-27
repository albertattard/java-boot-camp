---
layout: default
title: Type Erasure
parent: Generics
nav_order: 6
permalink: docs/generics/erasure/
---

# Type Erasure
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## What is type erasure?

[Generics](https://jcp.org/en/jsr/detail?id=14) came late to the language (Java 1.5) and was implemented in a way that it is still compatible to code that does not use generics ([raw types]({{ '/docs/generics/raw-types/' | absolute_url }})).  [Type Erasure](https://docs.oracle.com/javase/tutorial/java/generics/erasure.html) is the process, that happens at compile time, that makes sure of this.  Type Erasure performs three things:

* Replace all type parameters in generic types with their upper bounds.  The generic type `T` is replaced by the upper bound if one is defined or `Object`.
* Insert type casts if necessary to preserve type safety.
* Generate bridge methods to preserve polymorphism in extended generic types.

Consider the following example.

```java
package demo;

public interface Consumer<T> {
  void consume( T t );
}
```

The generic type `T` is unbound, which means it can be any object.  Now consider the following example.

```java
package demo;

public class DoubleConsumer implements Consumer<Double> {
  @Override
  public void consume( final Double value ) {
    System.out.printf( "Double %f%n", value );
  }

  public void consume( final Long value ) {
    System.out.printf( "Long %d%n", value );
  }

  public void consume( final Object value ) {
    System.out.printf( "Object %s%n", value );
  }
}
```

The `DoubleConsumer` class implements the interface `Consumer<Double>` and defines three methods.  Surprisingly enough, the above class does not compile.

```bash
$ ./gradlew clean build
```

The compiler will produce the following errors.

```bash
Task :compileJava FAILED
src/main/java/demo/DoubleConsumer.java:5: error: name clash: class DoubleConsumer has two methods with the same erasure, yet neither overrides the other
  public void consume( final Double value ) {
              ^
  first method:  consume(Double) in Consumer
  second method: consume(Object) in DoubleConsumer
src/main/java/demo/DoubleConsumer.java:13: error: name clash: consume(Object) in DoubleConsumer and consume(Double) in Consumer have the same erasure, yet neither overrides the other
  public void consume( final Object value ) {
              ^
2 errors
```

In order to understand the above error, we need to understand how type erasure works.

Let's update our `DoubleConsumer` class and delete the `consume(Long)` and `consume(Object)` methods as shown next.

```java
package demo;

public class DoubleConsumer implements Consumer<Long> {
  @Override
  public void consume( final Double value ) {
    System.out.printf( "Double %f%n", value );
  }
}
```

```bash
$ javap build/classes/java/main/demo/DoubleConsumer.class
Compiled from "DoubleConsumer.java"
public class demo.DoubleConsumer implements demo.Consumer<java.lang.Double> {
  public demo.DoubleConsumer();
  public void consume(java.lang.Double);
  public void consume(java.lang.Object);
}
```

```
// class version 58.65535 (-65478)
// access flags 0x21
// signature Ljava/lang/Object;Ldemo/Consumer<Ljava/lang/Double;>;
// declaration: demo/DoubleConsumer implements demo.Consumer<java.lang.Double>
public class demo/DoubleConsumer implements demo/Consumer {

  // compiled from: DoubleConsumer.java

  // access flags 0x1
  public <init>()V
   L0
    LINENUMBER 3 L0
    ALOAD 0
    INVOKESPECIAL java/lang/Object.<init> ()V
    RETURN
   L1
    LOCALVARIABLE this Ldemo/DoubleConsumer; L0 L1 0
    MAXSTACK = 1
    MAXLOCALS = 1

  // access flags 0x1
  public consume(Ljava/lang/Double;)V
   L0
    LINENUMBER 6 L0
    GETSTATIC java/lang/System.out : Ljava/io/PrintStream;
    LDC "Double %f%n"
    ICONST_1
    ANEWARRAY java/lang/Object
    DUP
    ICONST_0
    ALOAD 1
    AASTORE
    INVOKEVIRTUAL java/io/PrintStream.printf (Ljava/lang/String;[Ljava/lang/Object;)Ljava/io/PrintStream;
    POP
   L1
    LINENUMBER 7 L1
    RETURN
   L2
    LOCALVARIABLE this Ldemo/DoubleConsumer; L0 L2 0
    LOCALVARIABLE value Ljava/lang/Double; L0 L2 1
    MAXSTACK = 6
    MAXLOCALS = 2

  // access flags 0x1041
  public synthetic bridge consume(Ljava/lang/Object;)V
   L0
    LINENUMBER 3 L0
    ALOAD 0
    ALOAD 1
    CHECKCAST java/lang/Double
    INVOKEVIRTUAL demo/DoubleConsumer.consume (Ljava/lang/Double;)V
    RETURN
   L1
    LOCALVARIABLE this Ldemo/DoubleConsumer; L0 L1 0
    MAXSTACK = 2
    MAXLOCALS = 2
}
```

```
  // access flags 0x1041
  public synthetic bridge consume(Ljava/lang/Object;)V
   L0
    LINENUMBER 3 L0
    ALOAD 0
    ALOAD 1
    CHECKCAST java/lang/Double
    INVOKEVIRTUAL demo/DoubleConsumer.consume (Ljava/lang/Double;)V
    RETURN
   L1
    LOCALVARIABLE this Ldemo/DoubleConsumer; L0 L1 0
    MAXSTACK = 2
    MAXLOCALS = 2
```



| Flag Name       | Description                                         |
| --------------- | --------------------------------------------------- |
| `ACC_BRIDGE`    | A bridge method, generated by the compiler.         |
| `ACC_SYNTHETIC` | Declared synthetic; not present in the source code. |

[Table 4.6-A. Method access and property flags](https://docs.oracle.com/javase/specs/jvms/se14/html/jvms-4.html#jvms-4.6-200-A.1)

```
    INVOKEVIRTUAL demo/DoubleConsumer.consume (Ljava/lang/Double;)V
```

[`INVOKEVIRTUAL`](https://docs.oracle.com/javase/specs/jvms/se14/html/jvms-4.html#jvms-4.10.1.9.invokevirtual)



```java
package demo;

public interface Worker<T> {
  T produce();
}
```




```java
package demo;

public class PiWorker implements Worker<Double> {
  @Override
  public Double produce() {
    return Math.PI;
  }
}
```



```bash
$ javap build/classes/java/main/demo/PiWorker.class
```

```bash
Compiled from "PiWorker.java"
public class demo.PiWorker implements demo.Worker<java.lang.Double> {
  public demo.PiWorker();
  public java.lang.Double produce();
  public java.lang.Object produce();
}
```

```
// class version 58.65535 (-65478)
// access flags 0x21
// signature Ljava/lang/Object;Ldemo/Worker<Ljava/lang/Double;>;
// declaration: demo/PiWorker implements demo.Worker<java.lang.Double>
public class demo/PiWorker implements demo/Worker {

  // compiled from: PiWorker.java

  // access flags 0x1
  public <init>()V
   L0
    LINENUMBER 3 L0
    ALOAD 0
    INVOKESPECIAL java/lang/Object.<init> ()V
    RETURN
   L1
    LOCALVARIABLE this Ldemo/PiWorker; L0 L1 0
    MAXSTACK = 1
    MAXLOCALS = 1

  // access flags 0x1
  public produce()Ljava/lang/Double;
   L0
    LINENUMBER 6 L0
    LDC 3.141592653589793
    INVOKESTATIC java/lang/Double.valueOf (D)Ljava/lang/Double;
    ARETURN
   L1
    LOCALVARIABLE this Ldemo/PiWorker; L0 L1 0
    MAXSTACK = 2
    MAXLOCALS = 1

  // access flags 0x1041
  public synthetic bridge produce()Ljava/lang/Object;
   L0
    LINENUMBER 3 L0
    ALOAD 0
    INVOKEVIRTUAL demo/PiWorker.produce ()Ljava/lang/Double;
    ARETURN
   L1
    LOCALVARIABLE this Ldemo/PiWorker; L0 L1 0
    MAXSTACK = 1
    MAXLOCALS = 1
}
```


```
  public produce()Ljava/lang/Double;
```

```
  public synthetic bridge produce()Ljava/lang/Object;
```

| Flag Name       | Description                                         |
| --------------- | --------------------------------------------------- |
| `ACC_BRIDGE`    | A bridge method, generated by the compiler.         |
| `ACC_SYNTHETIC` | Declared synthetic; not present in the source code. |

[Table 4.6-A. Method access and property flags](https://docs.oracle.com/javase/specs/jvms/se14/html/jvms-4.html#jvms-4.6-200-A.1)

```
    INVOKEVIRTUAL demo/PiWorker.produce ()Ljava/lang/Double;
```

[`INVOKEVIRTUAL`](https://docs.oracle.com/javase/specs/jvms/se14/html/jvms-4.html#jvms-4.10.1.9.invokevirtual)


```java
package demo;

public interface Consumer<T> {
  void consume( T t );
}
```

```java
package demo;

public class DoubleConsumer implements Consumer<Double> {
  @Override
  public void consume( final Double value ) {
    System.out.printf( "Received %f%n", value );
  }
}
```

```bash
$ javap build/classes/java/main/demo/DoubleConsumer.class
```

```bash
Compiled from "DoubleConsumer.java"
public class demo.DoubleConsumer implements demo.Consumer<java.lang.Double> {
  public demo.DoubleConsumer();
  public void consume(java.lang.Double);
  public void consume(java.lang.Object);
}
```


## Type Erasure

Are not 100% Erased

```java
package java.util.concurrent;

@FunctionalInterface
public interface Callable<V> {

    V call() throws Exception;
}
```

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
$ javap build/classes/java/main/demo/PiCallable.class

Compiled from "PiCallable.java"
public class demo.PiCallable implements java.util.concurrent.Callable<java.lang.Double> {
  public demo.PiCallable();
  public java.lang.Double call();
  public java.lang.Object call() throws java.lang.Exception;
}
```

Some generic information is retained for linking purposes, otherwise the compiler will not be able to determine whether this is the correct generic.

```java
public void readDouble(Callable<Double> callable) { /* ... */ }
```

Generics need to be backward compatible and need to support raw types.  That's why we have two versions of the `call()` method.

```java
public void linkToRawType(Callable callable) { /* ... */ }
```
