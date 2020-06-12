---
layout: default
title: Streams and Lambda
parent: Streams
nav_order: 1
permalink: docs/streams/Streams/
---

# Streams and Lambda
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Streams (Lambda)

**🚧 Pending...**

### Filter

**🚧 Pending...**

### ForEach

**🚧 Pending...**

### Map

**🚧 Pending...**

### FlatMap

**🚧 Pending...**

### Mapping and Filtering

**🚧 Pending...**

## Collectors

**🚧 Pending...**

## Common Uses

**🚧 Pending...**

### Sum numbers in List

**🚧 Pending...**

### Sum content in List based on property

**🚧 Pending...**

### Create Map from List

**🚧 Pending...**

## Miscellaneous

1. [FP vs OO: Choose Two by Brian Goetz](https://www.youtube.com/watch?v=8GWZE2Y2O9E)
1. Java Stream are map/reduce
1. Collections in Java predates Streams and were not designed with Streams in mind.  The `stream()` needs to be used.
1. `this` and Lambda
    ```java
    final Runnable lambda = () -> {
      System.out.printf( "My class is %s%n", getClass() );
    };

    System.out.printf( "My class is %s%n", lambda.getClass() );
    lambda.run();
    ```
1. [`Function.andThen()`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/function/Function.html#andThen(java.util.function.Function))
1. Higher order functions
1. Phases
    1. Source
    1. Zero or many intermediate operations<br/>
        Operations can be stateless or stateful.  Stateful operations will read all stream.  Some intermediate operations will short-circuit and will ignore any further data.
    1. One Terminal operation
        1. Run to completion
            1. `forEach()` or `foreEachOrdered()`
            1. `collect()`
            1. `reduce()`
        1. Short-circuit
            1. `findFirst()`
1. `map()` produces `1-to-1` while `flatMap()` produces `M-to-1` or `1-to-M` as required
1. `spliterator()`
