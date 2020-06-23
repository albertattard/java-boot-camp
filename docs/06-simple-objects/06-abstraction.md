---
layout: default
title: Abstraction
parent: Simple objects
nav_order: 6
permalink: docs/simple-objects/abstraction/
---

# Abstraction
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Abstraction

A box can be empty or non-empty.  In fact, both the `LightBox` and the `HeavyBox` classes have the `isEmpty()` method which does the same thing for both types of boxes.  Given that **all** boxes can be empty (or non-empty), we can move the `isEmpty()` method to the `Box` class.

The `Box` class does not have enough information to determine whether it is empty or not.  The sub-classes use different mechanism to determine whether they are empty or not.

1. The `LightBox` make use of the `space` (`Space` enum) property
1. The `HeavyBox` delegates this to the `items` ([`List`'s `isEmpty()` method](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/List.html#isEmpty())) property

This means that while all boxes can be empty (or non-empty), the `Box` class cannot answer the question, `isEmpty()`.  The `Box` class needs to have a method for which it does not have an implementation.  Methods that do not have an implementation, or a body, are referred to as *abstract methods*, as shown next.

```java
  public abstract boolean isEmpty();
```

The method shown above does not have a body and a semi-colon (`;`) is used instead of curly brackets (`{}`).  The full example is shown next.

```java
package demo;

import static com.google.common.base.Preconditions.checkArgument;
import static com.google.common.base.Strings.nullToEmpty;

public abstract class Box {

  private BoxForm form = BoxForm.CLOSED;
  private String label = "No Label";

  public Box() { /* ... */ }

  public Box( final BoxForm form ) { /* ... */ }

  public void open() { /* ... */ }

  public void close() { /* ... */ }

  public boolean isOpen() { /* ... */ }

  public String getLabel() { /* ... */ }

  public void changeLabelTo( final String label ) { /* ... */ }

  private static boolean isValidLabel( final String label ) { /* ... */ }

  public abstract boolean isEmpty();

  @Override
  public String toString() { /* ... */ }

  public enum BoxForm { /* ... */ }
}
```

The `isEmpty()` method needs to be `abstract` as while a box can be empty or not, the `Box` class does not know how to answer this question.

Shapes are a good analogy.  All shapes have an area, but we cannot compute the area of shape, as shape is abstract.  We cannot draw a shape as shape is abstract.  Yet we know that shapes have an area.  We can compute the area of a square or a circle, but we cannot compute the area of a shape.

## When a class must be abstract?

1. A class can be abstract

    ```java
    public abstract class A {
    }
    ```

1. A class that has abstract methods must be abstract

    ```java
    public abstract class A {

      public abstract void m();
    }
    ```

1. A class that inherits abstract methods that are not implemented must be abstract

    ```java
    public abstract class A {

      public abstract void m();
    }

    public abstract class B extends A {
      /* Inherited abstract methods not implemented */
    }
    ```

    Note that class `B` inherits an abstract method from class `A`.  The abstract method `m()` is not implemented and thus, class `B` must be abstract.

## Can `final` classes be `abstract`?

A class that is marked `final` cannot be extended.  Therefore, a `final` class cannot be `abstract`.  Either `final` or `abstract`, but not both.

A `final` class must be concrete.  A concrete class is the opposite for an `abstract` class.

## Can `abstract` classes have `private` constructors?

Yes, `abstract` classes can have `private` constructors.  This might not make much sense, because how can we extend an `abstract` class if all of its constructors are `private`?  There are cases where we want to limit the types of objects we want to support, and still have a class hierarchy.

Consider the following example.

```java
package demo;

public abstract class Temperature {

  private Temperature() { }

  public abstract boolean isTooCold();

  public abstract boolean isTooHot();


  public static Temperature withFahrenheit( final double fahrenheit ) { /* ... */ }

  public static Temperature withCelsius( final double celsius ) { /* ... */ }

  public static Temperature withKelvin( final double kelvin ) { /* ... */ }


  private static class Fahrenheit extends Temperature { /* ... */ }

  private static class Celsius extends Temperature { /* ... */ }

  private static class Kelvin extends Temperature { /* ... */ }

}
```

According to [wikipedia](https://en.wikipedia.org/wiki/Temperature), "_*temperature* is a physical property of matter that quantitatively expresses hot and cold_".  The `Temperature` class is an `abstract` class that defines two `abstract` methods, `isTooCold()` and `isTooHot()`.  The temperature can be measured (or represented) in *Fahrenheit*, *Celsius* or other units.

Similar to the shapes, we cannot create a temperature without specifying its scale.  The above implementation defines three variants, all of which extend the `Temperature` class.  The above example looks a lot like enums, and that is **almost** correct.

Like enums, we can only have the types defined, `Fahrenheit`, `Celsius` and `Kelvin` and we cannot add new types (outside from the `Temperature` class).  The following will not work.

{% include custom/dose_not_compile.html %}

```java
public class MyNewTemperatureType extends Temperature {

  @Override
  public boolean isTooCold() {
    return false;
  }

  @Override
  public boolean isTooHot() {
    return false;
  }
}
```

This is a form of subtypes control that while enables subclasses, only the defined subclasses are allowed.  The `Temperature` class cannot be extended by an external class, which prevents some funny code added to the application.  Different from enums, we can have multiple instances of each type.
