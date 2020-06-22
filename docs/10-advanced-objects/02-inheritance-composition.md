---
layout: default
title: Inheritance and composition
parent: Advanced Objects
nav_order: 2
permalink: docs/advanced-objects/inheritance-composition/
---

# Inheritance and composition
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## What is composition?

The word composition comes from Latin, [*compositio*](https://en.wiktionary.org/wiki/compositio), which means "*to put together*".

In software, composition is the ability of creating new, possibly more elaborate, classes by putting together other, possibly simpler, classes.  We have been using composition throughout the boot camp, without knowing.  Take for example the following `Person` class.

```java
package demo;

public class Person {

  private final String name;
  private final int age;

  public Person( final String name, final int age ) { /* ... */ }

  @Override
  public String toString() { /* ... */ }
}
```

The `Person` **has a** `name` and **has an** `age`.  The `Person` class is composed from a `String` and an `int`.  Note that an emphasis was made on the **has a** phrase.  In the inheritance section, we use the phrase **is a** instead.  For example, a `LightBox` **is a** `Box`.  The following image shows the difference between inheritance and composition.

![Inheritance and composition]({{site.baseurl}}//assets/images/Inheritance-and-composition.png)

## Why is there a big push in favour of composition over inheritance?

[Effective Java](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/) talks about this in great depth in [Item 18: Favor composition over inheritance](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/ch4.xhtml#lev18).

When a class inherits from another class, the subclass will inherit all methods that the parent class has.  Consider the [stack data structure](https://en.wikibooks.org/wiki/Data_Structures/Stacks_and_Queues#Stacks) shown next.

![Stack Data Structure]({{site.baseurl}}//assets/images/Stack-Data-Structure.png)

A stack is a data structure that follows the [Last-In-First-Out](https://en.wikipedia.org/wiki/FIFO_and_LIFO_accounting#LIFO) rule.  A stack data structure, similar to a stack of dishes (or plates).  We can put dishes to the top of the stack, we can only task dishes from the top and we cannot see below the top dish.

![Stack of plates]({{site.baseurl}}//assets/images/Stack-of-plates.png)

We can interact with a stack using any of the following three functionalities.

1. **push** where an item is added to the top of the stack
1. **pop** where the last added item is removed from the stack and returned to the caller
1. **peek** (also referred to *top*) where we can view what's on the top of the stack without removing it

We can create a stack data structure by extending another collection class, such as the [`Vector`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/Vector.html) class.  That's what the Java API did in the past with the [`Stack`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/Stack.html) class.  The `Stack` class inherits all methods defines by the `Vector` class, **which is incorrect**.  A stack data structure **MUST** only provides three methods and definitely **MUST not** break the Last-In-First-Out rule.

Consider the following example.

```java
package demo;

import java.util.Stack;

public class App {

  public static void main( final String[] args ) {
    final Stack<String> stack = new Stack<>();
    stack.push( "1" );
    stack.push( "2" );
    stack.push( "3" );

    /* This is not a method supported by the stack class */
    stack.add( 0, "Squeeze me in" );

    System.out.printf( "Stack: %s%n", stack );
  }
}
```

The above example was able to violate the Last-In-First-Out rule as we were able to squeeze an item at the bottom of the stack.

```bash
Stack: [Squeeze me in, 1, 2, 3]
```

This breaks our stack class as we are able to make it behave in a way it was not expected to behave.  This example of *inheritance breaks encapsulation* as we are able to put the object in an invalid state.  Here we broke the "*all stacks are vectors*" rule.  A vector is a data structure that allows random access to elements, while stack only allows the consumer to interact with the topmost item of the stack.

An alternative approach would be to use composition instead of inheritance, as shown next.

```java
package demo;

import java.util.Objects;
import java.util.Vector;
import java.util.function.IntFunction;

public class Stack<T> {

  private final Vector<T> vector = new Vector<>();

  public void push( final T item ) {
    vector.add( item );
  }

  public T pop() {
    return withLast( vector::remove );
  }

  public T peek() {
    return withLast( vector::get );
  }

  private T withLast( final IntFunction<T> handler ) {
    final int size = vector.size();
    return size == 0 ? null : handler.apply( size - 1 );
  }

  @Override
  public boolean equals( final Object object ) {
    if ( this == object ) {
      return true;
    }

    if ( !( object instanceof Stack ) ) {
      return false;
    }

    final Stack<?> stack = (Stack<?>) object;
    return Objects.equals( vector, stack.vector );
  }

  @Override
  public int hashCode() {
    return Objects.hash( vector );
  }

  @Override
  public String toString() {
    return vector.toString();
  }
}
```

Our version of the stack uses the same `Vector` as a backing data structure (composition).  We are actually storing the `Stack` items within the `Vector`, but we are shielding the `vector` property and we are not exposing it to the outside word.

A side note above the above example.

* The `withLast()` method makes use of lambda function and behaviour parameterization, as we are passing behaviour as a parameter.

    ```java
      private T withLast( final IntFunction<T> handler ) {
        final int size = vector.size();
        return size == 0 ? null : handler.apply( size - 1 );
      }
    ```

    The `withLast()` checks if the vector is empty, in which case returns `null`.  Otherwise, it provides the given function the last index and expected an object in return.

    The `peek()` method returns the element at the last position using the `Vector`'s `get()` method as shown next.

    ```java
      public T peek() {
        return withLast( vector::get );
      }
    ```

    While the `pop()` method uses the `remove()` method to remove the element at the given index.

    ```java
      public T pop() {
        return withLast( vector::remove );
      }
    ```

The new version of the `Stack` class takes advantage of encapsulation as the outside world does not know about the `Vector` class and cannot bypass our `Stack` as we did before.  We cannot invoke any method defined by the `Vector` class as our `vector` property is `private` and is never returned by our `Stack` class.

```java
package demo;

public class App {

  public static void main( final String[] args ) {
    final Stack<String> stack = new Stack<>();
    stack.push( "1" );
    stack.push( "2" );
    stack.push( "3" );

    /* This is not a method supported by our stack class */
    // stack.add( 0, "Squeeze me in" );

    System.out.printf( "Stack: %s%n", stack );
  }
}
```

We cannot invoke the [Vector's add()](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/Vector.html#add(int,E)) method as we did before.  We can only interact with our new `Stack` using the methods available.

![Stack methods when using composition]({{site.baseurl}}//assets/images/Stack-methods-when-using-composition.png)

One of the advantages of inheritance is that we can reuse existing code.  We agree that composition reuses existing code, without creating a tight coupling between the parent class and its subtypes.  Adding new methods to the `Vector` class, will not impact our `Stack` class.  If we inherit from the `Vector` instead, adding new methods to the `Vector` class will automatically make these methods available to all the vector's children.

Another advantage of composition is that we can swap our backing collection, `Vector`, with a different one, such as [`LinkedList`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/LinkedList.html), without changing its consumers.

```java
package demo;

import java.util.LinkedList;
import java.util.Objects;

public class Stack<T> {

  private final LinkedList<T> linkedList = new LinkedList<>();

  public void push( final T item ) {
    linkedList.addLast( item );
  }

  public T pop() {
    return linkedList.removeLast();
  }

  public T peek() {
    return linkedList.getLast();
  }

  @Override
  public boolean equals( final Object object ) {
    if ( this == object ) {
      return true;
    }

    if ( !( object instanceof Stack ) ) {
      return false;
    }

    final Stack<?> stack = (Stack<?>) object;
    return Objects.equals( linkedList, stack.linkedList );
  }

  @Override
  public int hashCode() {
    return Objects.hash( linkedList );
  }

  @Override
  public String toString() {
    return linkedList.toString();
  }
}
```

Our `Stack` class did not gain or lose methods by swapping the backing collection from `Vector` to `LinkedList`.  This gives us the ability to use a better implementation when one becomes available.

## What are the disadvantages of composition?

Following are two distinctions between inheritance and composition.

1. [**Liskov substitution principle**](https://en.wikipedia.org/wiki/Liskov_substitution_principle): Composition does not adhere to the Liskov substitution principle.  In our version of the stack, we **cannot** use our `demo.Stack` wherever a `java.util.Vector` is required.  Our `demo.Stack` is not a `java.util.Vector`.

1. **Inheritance**: With inheritance, the subtypes will inherit all of their parent's methods without the subtypes needing to do anything.  If a new method is added to the parent, this becomes automatically available to all subtypes.

Personally, I do not see these two as disadvantages.  Inheritance and compositions are different tools.  Composition is used to enrich our classes with properties, such as the `vector` within the `demo.Stack` class.  There are cases where we need to use inheritance too and, in most cases, we will use both.

Say that our application has two types of coins, *gold coins* and *silver coins*.  Our application should not allow other types of coins.  Consider the following example.

```java
package demo;

public class Coin {

  private final int quantity;

  private Coin( final int quantity ) {
    this.quantity = quantity;
  }

  public static class GoldCoin extends Coin {
    public GoldCoin( final int quantity ) {
      super( quantity );
    }
  }

  public static class SilverCoin extends Coin {
    public SilverCoin( final int quantity ) {
      super( quantity );
    }
  }
}
```

Given the both the gold and silver coins are coins, we cannot go without inheritance.  Also, we need to prohibit new types of coins, therefore we cannot use interfaces as we have no means to prevent an interface from being implemented.  The `Coin` class itself makes us of composition as it contains properties.
