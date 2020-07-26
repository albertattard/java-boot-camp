---
layout: default
title: Queue and Stack
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

## Queues

A [`Queue`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/Queue.html) is a data structure that supports the first in first out (FIFO) ordering, as shown in the following diagram.

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

## Stacks

![Stack Data Structure]({{ '/assets/images/Stack-Data-Structure.png' | absolute_url }})

![Stack of Plates]({{ '/assets/images/Stack-of-plates.png' | absolute_url }})
