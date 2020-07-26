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

```java
package demo;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CyclicBarrier;

public class App {

  public static void main( final String[] args ) throws Exception {
    final int size = 100;
    final List<String> list = new ArrayList<>( 3 );
    final Consumer<Integer> task = index -> list.add( String.format( "Element %d", index ) );

    runUsingMultipleThreads( task, size );

    System.out.printf( "Expecting a list of %d elements but found %d%n", size, list.size() );
  }

  private static void runUsingMultipleThreads( final Consumer<Integer> consumer, final int size ) throws Exception {
    final List<Thread> threads = createAndStartThreads( size, consumer );
    waitAllThreadsToFinish( threads );
  }

  private static List<Thread> createAndStartThreads( final int size, final Consumer<Integer> consumer ) {
    final CyclicBarrier barrier = new CyclicBarrier( size );
    final List<Thread> threads = new ArrayList<>( size );

    for ( int i = 1; i <= size; i++ ) {
      final int index = i;
      final Thread thread = new Thread(
        awaitAllThreadsAndRun( barrier, () -> consumer.consume( index ) ),
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
      } catch ( Exception e ) {/* Suppress the errors*/}
    };
  }

  private static void waitAllThreadsToFinish( final List<Thread> threads ) throws InterruptedException {
    for ( final Thread thread : threads ) {
      thread.join();
    }
  }
}
```

```bash
Expecting a list of 100 elements but found 95
```

1. A

   ```java
     private static void runUsingMultipleThreads( final Consumer<Integer> consumer, final int size ) throws Exception {
       final List<Thread> threads = createAndStartThreads( size, consumer );
       waitAllThreadsToFinish( threads );
     }
   ```

1. B

   ```java
     private static List<Thread> createAndStartThreads( final int size, final Consumer<Integer> consumer ) {
       final CyclicBarrier barrier = new CyclicBarrier( size );
       final List<Thread> threads = new ArrayList<>( size );

       for ( int i = 1; i <= size; i++ ) {
         final int index = i;
         final Thread thread = new Thread(
           awaitAllThreadsAndRun( barrier, () -> consumer.consume( index ) ),
           String.format( "THREAD-%d", i )
         );
         thread.start();
         threads.add( thread );
       }

       return threads;
     }
   ```

1. C

   ```java
     private static List<Thread> createAndStartThreads( final int size, final Consumer<Integer> consumer ) {
       final CyclicBarrier barrier = new CyclicBarrier( size );
       final List<Thread> threads = new ArrayList<>( size );

       for ( int i = 1; i <= size; i++ ) {
         final int index = i;
         final Thread thread = new Thread(
           awaitAllThreadsAndRun( barrier, () -> consumer.consume( index ) ),
           String.format( "THREAD-%d", i )
         );
         thread.start();
         threads.add( thread );
       }

       return threads;
     }
   ```

1. D

   ```java
     private static void waitAllThreadsToFinish( final List<Thread> threads ) throws InterruptedException {
       for ( final Thread thread : threads ) {
         thread.join();
       }
     }
   ```
