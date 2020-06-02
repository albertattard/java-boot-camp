# Lambda & Streams

## TOC

1. [Setup](#setup)
1. [Lambda Expressions](#lambda-expressions)
    1. [Function as Parameters](#function-as-parameters)
    1. [Constructor as Parameters](#constructor-as-parameters)
1. [Multiple Parameters](#multiple-parameters)
1. [Dealing with Exceptions](#dealing-with-exceptions)
1. [Foreach Loops](#foreach-loops)
1. [Streams (Lambda)](#streams-lambda)
    1. [Filter](#filter)
    1. [ForEach](#foreach)
    1. [Map](#map)
    1. [FlatMap](#flatmap)
    1. [Mapping and Filtering](#mapping-and-filtering)
1. [Collectors](#collectors)
1. [Common Uses](#common-uses)
    1. [Sum numbers in List](#sum-numbers-in-list)
    1. [Sum content in List based on property](#sum-content-in-list-based-on-property)
    1. [Create Map from List](#create-map-from-list)
1. [Miscellaneous](#miscellaneous)

## Setup

**🚧 Pending...**

## Lambda Expressions

**🚧 Pending...**

### Function as Parameters

**🚧 Pending...**

### Constructor as Parameters

**🚧 Pending...**

## Multiple Parameters

**🚧 Pending...**

## Dealing with Exceptions

**🚧 Pending...**

## Foreach Loops

**🚧 Pending...**

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
