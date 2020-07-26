---
layout: default
title: Queue, Priority Queue and Stack
description: An introduction to FIFO queue, priority queue and LIFO queue (stack)
parent: Collections
nav_order: 8
permalink: docs/collections/queue-stack/
---

# Queue and Stack
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Queue

A [`Queue`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/Queue.html) is an abstract data structure that elements can be added and removed one at a time.  The order in which the elements are retrieved is defined by the queue implementation.

There are three main queue implementations

1. The [FIFO queue](#fifo-queue) is the most common implementation of a queue, where elements are retrieved in a first in first out manner.
1. The [Priority queue](#priority-queue) orders the elements based on their priority.  Elements with the highest priority are returned first.
1. The [LIFO queue](#stack), also known as **stack**, returns the element that was added last first, hence LIFO queue.

There are other queue implementations, such as [`BlockingQueue`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/concurrent/BlockingQueue.html) where the caller may block until more elements are added to the queue.  These implementations do not define the order in which elements are retrieved and are suited for more specific applications, such as concurrency.

## FIFO Queue

A FIFO queue is a data structure that supports the first in first out (FIFO) ordering, as shown in the following diagram.

![Queue Data Structure]({{ '/assets/images/Queue Data Structure.png' | absolute_url }})

Elements are added at the back of the queue and are retrieved from the front of the queue, in the order these were added.  A line of people waiting to use the ATM is an example of a queue, as shown next.

![Queue of People]({{ '/assets/images/Queue of People.png' | absolute_url }})

The person at the front of the queue will use the ATM next, while new persons will join the queue at the back.

`Queue` is an interface in Java, which has several implementations.  Two common implementations are [`ArrayDeque`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/ArrayDeque.html) and [`LinkedList`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/LinkedList.html).  `LinkedList` was covered [before, when we covered lists]({{ '/docs/collections/lists/' | absolute_url }}).  We will cover `ArrayDeque` in this example.

Consider the following example.

```java
package demo;

import java.util.ArrayDeque;
import java.util.Queue;

public class App {

  public static void main( final String[] args ) {
    final Queue<String> waitingInLine = new ArrayDeque<>();
    waitingInLine.add( "Jade" );
    waitingInLine.add( "Aden" );

    while ( false == waitingInLine.isEmpty() ) {
      String next = waitingInLine.poll();
      System.out.printf( "Serving %s (people remaining in the queue %d)%n", next, waitingInLine.size() );
    }

    System.out.println( "No one else is waiting in the queue" );
  }
}
```

The elements within the queue are retrieved in the order these where added.

```bash
Serving Jade (people remaining in the queue 1)
Serving Aden (people remaining in the queue 0)
No one else is waiting in the queue
```

## Priority Queue

The Java collections framework also provides a [`PriorityQueue`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/PriorityQueue.html), where the elements are ordered based on their priority and not based on the order these are added.  Consider the following example.

```java
package demo;

import lombok.Data;
import org.apache.commons.lang3.StringUtils;

import java.util.PriorityQueue;
import java.util.Queue;

public class App {

  @Data
  private static class Student implements Comparable<Student> {

    private final String name;
    private final int mark;

    @Override
    public int compareTo( final Student that ) {
      return StringUtils.compare( name, that.name );
    }
  }

  public static void main( final String[] args ) {
    final Queue<Student> students = new PriorityQueue<>();
    students.add( new Student( "Jade", 85 ) );
    students.add( new Student( "Aden", 82 ) );

    while ( false == students.isEmpty() ) {
      Student next = students.poll();
      System.out.printf( "Processing %s (students remaining in the queue %d)%n", next, students.size() );
    }

    System.out.println( "No one else is waiting in the queue" );
  }
}
```

Elements added to the `PriorityQueue` needs to implement [`Comparable`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/lang/Comparable.html) as the `PriorityQueue` will use the elements natural ordering to place them in the right order in the queue.  The `Student` are ordered by their name, alphabetically.

```bash
Processing App.Student(name=Aden, mark=82) (students remaining in the queue 1)
Processing App.Student(name=Jade, mark=85) (students remaining in the queue 0)
No one else is waiting in the queue
```

A [`Comparator`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/Comparator.html) can be used instead to order the elements in the `PriorityQueue`.  Consider the following example.

```java
package demo;

import lombok.Data;
import org.apache.commons.lang3.StringUtils;

import java.util.Comparator;
import java.util.PriorityQueue;
import java.util.Queue;

public class App {

  @Data
  private static class Student implements Comparable<Student> {

/**/public static final Comparator<Student> BY_BEST_MARK = Comparator.comparingInt( Student::getMark ).reversed();

    private final String name;
    private final int mark;

    @Override
    public int compareTo( final Student that ) {
      return StringUtils.compare( name, that.name );
    }
  }

  public static void main( final String[] args ) {

/**/final Queue<Student> students = new PriorityQueue<>( Student.BY_BEST_MARK );
    students.add( new Student( "Jade", 85 ) );
    students.add( new Student( "Aden", 82 ) );

    while ( false == students.isEmpty() ) {
      Student next = students.poll();
      System.out.printf( "Processing %s (students remaining in the queue %d)%n", next, students.size() );
    }

    System.out.println( "No one else is waiting in the queue" );
  }
}
```

A `Comparator` is added to the `Student` class which compares the students by their marks.  Students with the highest marks will comes first.

```bash
Processing App.Student(name=Jade, mark=85) (students remaining in the queue 1)
Processing App.Student(name=Aden, mark=82) (students remaining in the queue 0)
No one else is waiting in the queue
```

{% include custom/note.html details="When a <code>Comparator</code> is provided, the elements being places in the <code>PriorityQueue</code> do not need to implement <code>Comparable</code>." %}

The practice shown above, where a `Comparator` is provided by the same data class is quite common and found in many classes, such as the [`String`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/lang/String.html) class and its [`CASE_INSENSITIVE_ORDER`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/lang/String.html#CASE_INSENSITIVE_ORDER) static field.

## Stack

A [`Stack`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/Stack.html) is a data structure that supports the last in first out (LIFO) ordering, as shown in the following diagram.

![Stack Data Structure]({{ '/assets/images/Stack-Data-Structure.png' | absolute_url }})

Elements are added and retrieved from one end of the stack, the top of the stack. A stack of plates is an example of a stack, as shown next.

![Stack of Plates]({{ '/assets/images/Stack-of-plates.png' | absolute_url }})

We can only interact with the top of the stack.  We cannot retrieve the bottom plate without first retrieving all the plates above it.

{% include custom/note.html details="Do not use the <code>Stack</code> class as this was not well implemented." %}

The [`Deque`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/Deque.html) is a preferred implementation.  This is not a pure stack as it supports both LIFO and FIFO ordering.
