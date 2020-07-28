---
layout: default
title: Concurrent Collections
parent: Collections
nav_order: 9
permalink: docs/collections/concurrent/
---

# Concurrent Collections
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Concurrency

Not all collections are thread safe and using a non-thread safe collection with multiple threads may yield unexpected results.  Consider the following example.

{% include custom/do_not_use_as_is.html details="The following example is sharing and modifying a non-thread-safe collection using multiple threads." %}

```java
package demo;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CyclicBarrier;
import java.util.function.IntConsumer;

public class App {

  public static void main( final String[] args ) throws Exception {
    final int size = 100;
    final List<String> list = new ArrayList<>( 3 );
    final IntConsumer task = index -> list.add( String.format( "Element %d", index ) );

    runUsingMultipleThreads( task, size );

    System.out.printf( "Expecting a list of %d elements but found %d%n", size, list.size() );
  }

  private static void runUsingMultipleThreads( final IntConsumer consumer, final int size ) throws Exception {
    final List<Thread> threads = createAndStartThreads( size, consumer );
    waitAllThreadsToFinish( threads );
  }

  private static List<Thread> createAndStartThreads( final int size, final IntConsumer consumer ) {
    final CyclicBarrier barrier = new CyclicBarrier( size );
    final List<Thread> threads = new ArrayList<>( size );

    for ( int i = 1; i <= size; i++ ) {
      final int index = i;
      final Thread thread = new Thread(
        awaitAllThreadsAndRun( barrier, () -> consumer.accept( index ) ),
        String.format( "THREAD-%d", i )
      );
      thread.start();
      threads.add( thread );
    }

    return threads;
  }

  private static Runnable awaitAllThreadsAndRun( final CyclicBarrier barrier, final Runnable runnable ) {
    return () -> {
      try {
        barrier.await();
        runnable.run();
      } catch ( Exception e ) {/* Suppress all errors */}
    };
  }

  private static void waitAllThreadsToFinish( final List<Thread> threads ) throws InterruptedException {
    for ( final Thread thread : threads ) {
      thread.join();
    }
  }
}
```

The example shown above populates an [`ArrayList`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/ArrayList.html) using multiple threads without applying any concurrent safe-guards.  The outcome may vary between runs.

```bash
Expecting a list of 100 elements but found 95
```

The example may be overwhelming and merits further explanation.  Let's break the example down and describe what each method is doing.

1. The example starts by creating an `ArrayList` and populates it using 100 threads, each thread adding one element, using the `runUsingMultipleThreads()`.  It then prints the actual list size.

   ```java
   package demo;

   import java.util.ArrayList;
   import java.util.List;
   import java.util.concurrent.CyclicBarrier;
   import java.util.function.IntConsumer;

   public class App {

     public static void main( final String[] args ) throws Exception {
       final int size = 100;
       final List<String> list = new ArrayList<>( 3 );
       final IntConsumer task = index -> list.add( String.format( "Element %d", index ) );

       runUsingMultipleThreads( task, size );

       System.out.printf( "Expecting a list of %d elements but found %d%n", size, list.size() );
     }

     private static void runUsingMultipleThreads( final IntConsumer consumer, final int size ) throws Exception { /* ... */ }

     private static List<Thread> createAndStartThreads( final int size, final IntConsumer consumer ) { /* ... */ }

     private static Runnable awaitAllThreadsAndRun( final CyclicBarrier barrier, final Runnable runnable ) { /* ... */ }

     private static void waitAllThreadsToFinish( final List<Thread> threads ) throws InterruptedException { /* ... */ }
   }
   ```

   The `runUsingMultipleThreads()` method will run the given task using the given number of threads and waits for all threads to finish.

1. The `runUsingMultipleThreads()` method is a high level method that invokes the `createAndStartThreads()` method to create the threads and then waits for these threads to finish by invoking the `waitAllThreadsToFinish()` method.

   ```java
     private static void runUsingMultipleThreads( final IntConsumer consumer, final int size ) throws Exception {
       final List<Thread> threads = createAndStartThreads( size, consumer );
       waitAllThreadsToFinish( threads );
     }
   ```

1. The `createAndStartThreads()` method creates and starts the threads.  Each thread will invoke the given `consumer` at _approximatelly_ the same time, using a [`CyclicBarrier`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/concurrent/CyclicBarrier.html) to coordinates this.

   ```java
     private static List<Thread> createAndStartThreads( final int size, final IntConsumer consumer ) {
       final CyclicBarrier barrier = new CyclicBarrier( size );
       final List<Thread> threads = new ArrayList<>( size );

       for ( int i = 1; i <= size; i++ ) {
         final int index = i;
         final Thread thread = new Thread(
           awaitAllThreadsAndRun( barrier, () -> consumer.accept( index ) ),
           String.format( "THREAD-%d", i )
         );
         thread.start();
         threads.add( thread );
       }

       return threads;
     }
   ```

   The given task is a [`IntConsumer`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/function/IntConsumer.html) that takes an integer.  This integer is the thread number.  The variable `i` is modified within the loop, therefore cannot be passed directly.  Instead a constant, `index` needed to be created and used instead.

1. The `awaitAllThreadsAndRun()` method wraps the given [`Runnable`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/lang/Runnable.html) in another one that waits for all threads to arrive at the same point, using the given `CyclicBarrier`.  This forces all threads to arrive at the same point before proceeding and maximises the effect of concurrency on the object under test.

   {% include custom/not_recommended.html details="The following fragment is suppressing all types of <a href='https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/lang/Exception.html'><code>Exception</code></a>s." %}

   ```java
     private static Runnable awaitAllThreadsAndRun( final CyclicBarrier barrier, final Runnable runnable ) {
       return () -> {
         try {
           barrier.await();
           runnable.run();
         } catch ( Exception e ) {/* Suppress all errors */}
       };
     }
   ```

1. The `waitAllThreadsToFinish()` method waits for all threads to finish, using the [`Thread.join()`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/lang/Thread.html#join()) method.

   ```java
     private static void waitAllThreadsToFinish( final List<Thread> threads ) throws InterruptedException {
       for ( final Thread thread : threads ) {
         thread.join();
       }
     }
   ```

The above example can be used to modify different collections, such as sets or maps, and observe how these behave when accessed by multiple threads.  The following example shows a similar example using a [`TreeSet`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/TreeSet.html).

{% include custom/do_not_use_as_is.html details="The following example is sharing and modifying a non-thread-safe collection using multiple threads." %}

```java
package demo;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.TreeSet;
import java.util.concurrent.CyclicBarrier;

public class App {

  public static void main( final String[] args ) throws Exception {
    final int size = 100;
    final Set<String> list = new TreeSet<>();
    final IntConsumer task = index -> list.add( String.format( "Element %d", index ) );

    runUsingMultipleThreads( task, size );

    System.out.printf( "Expecting a set of %d elements but found %d%n", size, list.size() );
  }

  private static void runUsingMultipleThreads( final IntConsumer consumer, final int size ) throws Exception { /* ... */ }

  private static List<Thread> createAndStartThreads( final int size, final IntConsumer consumer ) { /* ... */ }

  private static Runnable awaitAllThreadsAndRun( final CyclicBarrier barrier, final Runnable runnable ) { /* ... */ }

  private static void waitAllThreadsToFinish( final List<Thread> threads ) throws InterruptedException { /* ... */ }
}
```

The size of the set will vary between different runs.

Hash based collections, such as [`HashSet`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/HashSet.html), may seem immune to concurrency problems, but that's incorrect.  Any non-thread safe object should not be used by multiple thread without any concurrent protection.

## Concurrent List

### `CopyOnWriteArrayList`

A thread-safe list, ideal when the number of reads is much higher to the number of writes.  Java provides several concurrent lists, such as the [`CopyOnWriteArrayList`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/concurrent/CopyOnWriteArrayList.html), shown next.

```java
package demo;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.concurrent.CyclicBarrier;
import java.util.function.IntConsumer;

public class App {

  public static void main( final String[] args ) throws Exception {
    final int size = 100;
    final List<String> list = new CopyOnWriteArrayList<>();
    final IntConsumer task = index -> list.add( String.format( "Element %d", index ) );

    runUsingMultipleThreads( task, size );

    System.out.printf( "Expecting a list of %d elements but found %d%n", size, list.size() );
  }

  private static void runUsingMultipleThreads( final IntConsumer consumer, final int size ) throws Exception { /* ... */ }

  private static List<Thread> createAndStartThreads( final int size, final IntConsumer consumer ) { /* ... */ }

  private static Runnable awaitAllThreadsAndRun( final CyclicBarrier barrier, final Runnable runnable ) { /* ... */ }

  private static void waitAllThreadsToFinish( final List<Thread> threads ) throws InterruptedException { /* ... */ }
}
```

The above example will always yield the same result.  The `CopyOnWriteArrayList` is a thread-safe variant of [`ArrayList`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/ArrayList.html) in which all mutative operations (`add()`, `set()`, and so on) are implemented by **creating a fresh copy of the underlying array**.

"_This is ordinarily too costly but may be more efficient than alternatives when traversal operations vastly outnumber mutations and is useful when you cannot or don't want to synchronize traversals, yet need to preclude interference among concurrent threads.  The "snapshot" style iterator method uses a reference to the state of the array at the point that the iterator was created. This array never changes during the lifetime of the iterator, so interference is impossible and the iterator is guaranteed not to throw [`ConcurrentModificationException`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/ConcurrentModificationException.html). The iterator will not reflect additions, removals, or changes to the list since the iterator was created. Element-changing operations on iterators themselves (remove, set, and add) are not supported. These methods throw [`UnsupportedOperationException`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/lang/UnsupportedOperationException.html)._"<br />
([Reference](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/concurrent/CopyOnWriteArrayList.html))

### `Vector`

The [`Vector`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/Vector.html) class is an old collection, which all methods are `synchronized`.  Only one thread can access one method at a given point in time.

```java
package demo;

import java.util.ArrayList;
import java.util.List;
import java.util.Vector;
import java.util.concurrent.CyclicBarrier;
import java.util.function.IntConsumer;

public class App {

  public static void main( final String[] args ) throws Exception {
    final int size = 100;
    final List<String> list = new Vector<>();
    final IntConsumer task = index -> list.add( String.format( "Element %d", index ) );

    runUsingMultipleThreads( task, size );

    System.out.printf( "Expecting a list of %d elements but found %d%n", size, list.size() );
  }

  private static void runUsingMultipleThreads( final IntConsumer consumer, final int size ) throws Exception { /* ... */ }

  private static List<Thread> createAndStartThreads( final int size, final IntConsumer consumer ) { /* ... */ }

  private static Runnable awaitAllThreadsAndRun( final CyclicBarrier barrier, final Runnable runnable ) { /* ... */ }

  private static void waitAllThreadsToFinish( final List<Thread> threads ) throws InterruptedException { /* ... */ }
}
```

Being thread-safe, the `Vector` will always ends up with 100 elements.

### `Collections.synchronizedList(List)`

There are cases when we cannot control the type of list being used.  In such cases we can warp the list with a synchronized list, using the [`Collections.synchronizedList(List)`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/Collections.html#synchronizedList(java.util.List)) method.  Using the wrapped list instead, we can safely access the wrapped list from multiple threads as all access is synchronized.  This means that only one thread can access any synchronized method at any point in time.

```java
package demo;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.CyclicBarrier;
import java.util.function.IntConsumer;

public class App {

  public static void main( final String[] args ) throws Exception {
    final int size = 100;
    final List<String> list = new ArrayList<>();
    final List<String> synchronizedList = Collections.synchronizedList( list );
    final IntConsumer task = index -> synchronizedList.add( String.format( "Element %d", index ) );

    runUsingMultipleThreads( task, size );

    System.out.printf( "Expecting a list of %d elements but found %d%n", size, list.size() );
  }

  private static void runUsingMultipleThreads( final IntConsumer consumer, final int size ) throws Exception { /* ... */ }

  private static List<Thread> createAndStartThreads( final int size, final IntConsumer consumer ) { /* ... */ }

  private static Runnable awaitAllThreadsAndRun( final CyclicBarrier barrier, final Runnable runnable ) { /* ... */ }

  private static void waitAllThreadsToFinish( final List<Thread> threads ) throws InterruptedException { /* ... */ }
}
```

In the above example we are using a non-thread safe list, then `ArrayList`.

```java
    final List<String> list = new ArrayList<>();
```

Instead of adding new elements to the `ArrayList`, we wrapped the non-thread safe list into a synchronized list, using the `Collections.synchronizedList()` method.

```java
    final List<String> synchronizedList = Collections.synchronizedList( list );
    final IntConsumer task = index -> synchronizedList.add( String.format( "Element %d", index ) );
```

This guarantees that only one thread modifies the list at any given point in time and thus ensures that all 100 elements are added.

## Concurrent Queue

### `ConcurrentLinkedQueue`

[`ConcurrentLinkedQueue`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/concurrent/ConcurrentLinkedQueue.html)
