# Concurrency

## TOC

1. [Setup](#setup)
1. [Java Memory Model](#java-memory-model)
1. [Threads](#threads)
    1. [Daemons](#daemons)
    1. [Waiting for a thread to finish (Join)](#waiting-for-a-thread-to-finish-join)
    1. [ThreadLocal](#threadlocal)
    1. [Stale Caches](#stale-caches)
    1. [Race Conditions](#race-conditions)
    1. [Methods that should never be used.](#methods-that-should-never-be-used)
1. [Concurrent Data Classes](#concurrent-data-classes)
    1. [Primitive Wrappers](#primitive-wrappers)
    1. [List](#list)
    1. [Set](#set)
    1. [Map](#map)
    1. [Queue](#queue)
    1. [Exchanger](#exchanger)
1. [Classic Concurrency Control](#classic-concurrency-control)
    1. [Volatile](#volatile)
    1. [Synchronized](#synchronized)
    1. [Deadlocks](#deadlocks)
1. [New Approach to Concurrency](#new-approach-to-concurrency)
    1. [Executors and Schedulers](#executors-and-schedulers)
    1. [Lock and ReentrantLock](#lock-and-reentrantlock)
    1. [Latch](#latch)
    1. [CyclicBarrier](#cyclicbarrier)
    1. [Fork Join Framework](#fork-join-framework)
1. [Cost of Concurrency](#cost-of-concurrency)
1. [Miscellaneous](#miscellaneous)

## Setup

{% include custom/pending.html %}

## Java Memory Model

{% include custom/pending.html %}

## Threads

![Thread Lifecycle](assets/images/Thread%20Lifecycle.png)
Image copied from: [Theory: Operating Systems and Code Execution](https://learning.oreilly.com/videos/optimizing-java/9781492044673/9781492044673-video323887)

{% include custom/pending.html %}

### Daemons

{% include custom/pending.html %}

### Waiting for a thread to finish (Join)

{% include custom/pending.html %}

### ThreadLocal

{% include custom/pending.html %}

### Stale Caches

{% include custom/pending.html %}

### Race Conditions

{% include custom/pending.html %}

### Methods that should never be used.

{% include custom/pending.html %}

1. `stop()`
1. `suspend()`

## Concurrent Data Classes

{% include custom/pending.html %}

### Primitive Wrappers

{% include custom/pending.html %}

### List

{% include custom/pending.html %}

### Set

{% include custom/pending.html %}

### Map

{% include custom/pending.html %}

### Queue

{% include custom/pending.html %}

### Exchanger

{% include custom/pending.html %}

## Classic Concurrency Control

### Volatile

{% include custom/pending.html %}

### Synchronized

{% include custom/pending.html %}

### Deadlocks

{% include custom/pending.html %}

## New Approach to Concurrency

### Executors and Schedulers

{% include custom/pending.html %}

### Lock and ReentrantLock

{% include custom/pending.html %}

### Latch

{% include custom/pending.html %}

### CyclicBarrier

{% include custom/pending.html %}

### Fork Join Framework

{% include custom/pending.html %}

## Cost of Concurrency

Cost of context switching

{% include custom/pending.html %}

## Miscellaneous

1. `InterruptedException`
1. [Flow](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/concurrent/Flow.html)
