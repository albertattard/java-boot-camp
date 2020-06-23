---
layout: default
title: Constructors
parent: Simple objects
nav_order: 3
permalink: docs/simple-objects/constructors/
---

# Constructors
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Constructors

The `Box` does not contain any methods called `Box()` that takes no parameters.  What method do we call when we execute `new Box()`?

```java
package demo;

import static com.google.common.base.Preconditions.checkArgument;
import static com.google.common.base.Strings.nullToEmpty;

public class Box {

  private BoxForm form = BoxForm.CLOSED;
  private String label = "No Label";

  public void open() {
    form = BoxForm.OPEN;
  }

  public void close() {
    form = BoxForm.CLOSED;
  }

  public boolean isOpen() {
    return form == BoxForm.OPEN;
  }

  public String getLabel() {
    return label;
  }

  public void changeLabelTo( final String label ) {
    checkArgument( isValidLabel( label ) );
    this.label = label;
  }

  private static boolean isValidLabel( final String label ) {
    return false == nullToEmpty( label ).isBlank();
  }

  @Override
  public String toString() {
    final String openClose = isOpen() ? "an open" : "a closed";
    return String.format( "%s box labelled '%s'", openClose, label );
  }

  private enum BoxForm { /* ... */ }
}
```

Methods that have the same name (case-sensitive) as the classes are constructors.  Constructors are special instance like methods used to initialise objects.  All Java classes (with no exception) need to have a constructor and Java provides one if none are provided.

The `Box` class has no constructors defined, thus Java provided one for us.  Java provides a default (also known as the *no-args-constructor*) when no constructors are present in a class.

We can define a constructor as shown in the following example.

```java
package demo;

import static com.google.common.base.Preconditions.checkArgument;
import static com.google.common.base.Strings.nullToEmpty;

public class Box {

  private BoxForm form = BoxForm.CLOSED;
  private String label = "No Label";

  public Box() {
  }

  public Box( final BoxForm form ) {
    this.form = form;
  }

  public void open() { /* ... */ }

  public void close() { /* ... */ }

  public boolean isOpen() { /* ... */ }

  public String getLabel() { /* ... */ }

  public void changeLabelTo( final String label ) { /* ... */ }

  private static boolean isValidLabel( final String label ) { /* ... */ }

  @Override
  public String toString() { /* ... */ }

  private enum BoxForm { /* ... */ }
}
```

A constructor looks similar to a method but has the following constraints
1. The name of the constructor needs to be the same as the class name (case-sensitive)
1. The constructor does not return anything, do not make use of `void`, and cannot use the `return` keyword to return a value.
1. The `static` modifier cannot be used with a constructor

Apart from the above, a constructor is similar to a method.

## How many constructors can a class have?

**A class can have as many constructors as needs as long as each constructor has a unique signature**.

Let say that we would like to have the possibility to create an instance of a `Box` and also set its state (open/closed).  We can do that by using a constructor.

```java
package demo;

import static com.google.common.base.Preconditions.checkArgument;
import static com.google.common.base.Strings.nullToEmpty;

public class Box {

  private BoxForm form;
  private String label = "No Label";

  public Box( final BoxForm form ) {
    this.form = form;
  }

  public void open() { /* ... */ }

  public void close() { /* ... */ }

  public boolean isOpen() { /* ... */ }

  public String getLabel() { /* ... */ }

  public void changeLabelTo( final String label ) { /* ... */ }

  private static boolean isValidLabel( final String label ) { /* ... */ }

  @Override
  public String toString() { /* ... */ }

  public enum BoxForm { /* ... */ }
}
```

Note that the enum `BoxForm` was changed from `private` to `public`.  This is quite important as otherwise we will not be able to access the new constructor.  Now we can create boxes in the state we want them to be as shown in the following example.

```java
package demo;

import static demo.Box.BoxForm.CLOSED;
import static demo.Box.BoxForm.OPEN;

public class App {

  public static void main( final String[] args ) {
    final Box a = new Box( OPEN );
    final Box b = new Box( CLOSED );

    System.out.printf( "Box a: %s%n", a );
    System.out.printf( "Box b: %s%n", b );
  }
}
```

The `Box` shown before has **ONE** constructor.  When creating an instance of a `Box`, the caller needs to also provide the box form (either `BoxForm.OPEN` or `BoxForm.CLOSED`).

**⚠️ THE FOLLOWING EXAMPLE DOES NOT COMPILE!!**

```java
package demo;

public class App {

  public static void main( final String[] args ) {
    final Box a = new Box();
  }
}
```

This is a bit annoying as we are forcing the callers to always pass a value, even when the default value suffice.  We can add the second constructor and allow the caller to pick the most suitable constructor.

```java
package demo;

import static com.google.common.base.Preconditions.checkArgument;
import static com.google.common.base.Strings.nullToEmpty;

public class Box {

  private BoxForm form = BoxForm.CLOSED;
  private String label = "No Label";

  public Box() {
  }

  public Box( final BoxForm form ) {
    this.form = form;
  }

  public void open() { /* ... */ }

  public void close() { /* ... */ }

  public boolean isOpen() { /* ... */ }

  public String getLabel() { /* ... */ }

  public void changeLabelTo( final String label ) { /* ... */ }

  private static boolean isValidLabel( final String label ) { /* ... */ }

  @Override
  public String toString() { /* ... */ }

  public enum BoxForm { /* ... */ }
}
```

All classes must have a constructor (no exception) and a default constructor is only automatically provided when no constructors are define.

## Can one constructor call another constructor in the same class?

Yes, and that's quite a common practice.  We can modify the default constructor such that it calls the second constructor and passes the value to be used when non are provided.

```java
package demo;

import static com.google.common.base.Preconditions.checkArgument;
import static com.google.common.base.Strings.nullToEmpty;

public class Box {

  private BoxForm form;
  private String label = "No Label";

  public Box() {
    this( BoxForm.CLOSED );
  }

  public Box( final BoxForm form ) {
    this.form = form;
  }

  public void open() { /* ... */ }

  public void close() { /* ... */ }

  public boolean isOpen() { /* ... */ }

  public String getLabel() { /* ... */ }

  public void changeLabelTo( final String label ) { /* ... */ }

  private static boolean isValidLabel( final String label ) { /* ... */ }

  @Override
  public String toString() { /* ... */ }

  public enum BoxForm { /* ... */ }
}
```

A constructor can call another constructor using `this()` and passes the required parameters.  `this()` needs to be the first statement called within the constructor.  The following example does not compile.

**⚠️ THE FOLLOWING EXAMPLE DOES NOT COMPILE!!**

```java
package demo;

import static com.google.common.base.Preconditions.checkArgument;
import static com.google.common.base.Strings.nullToEmpty;

public class Box {

  private BoxForm form;
  private String label = "No Label";

  public Box() {
    label = "...";
    this( BoxForm.CLOSED );
  }

  public Box( final BoxForm form ) { /* ... */ }

  public void open() { /* ... */ }

  public void close() { /* ... */ }

  public boolean isOpen() { /* ... */ }

  public String getLabel() { /* ... */ }

  public void changeLabelTo( final String label ) { /* ... */ }

  private static boolean isValidLabel( final String label ) { /* ... */ }

  @Override
  public String toString() { /* ... */ }

  public enum BoxForm { /* ... */ }
}
```

The above code will not compile.

```bash
src/main/java/demo/Box.java:13: error: call to this must be first statement in constructor
    this( BoxForm.CLOSED );
        ^
```

While constructors calling each other is quite a common practice to have constructors calling each other, note that we can find ourselves in some tricky situations.  Consider the following class.

{% include custom/dose_not_compile.html %}

```java
package demo;

import java.awt.Point;

public class MagicBox {

  public final String name;
  public final Point location;

  public MagicBox() {
    this( null );
  }

  public MagicBox( final String name ) {
    this( name, null );
  }

  public MagicBox( final Point location ) {
    this( null, location );
  }

  public MagicBox( final String name, final Point location ) {
    this.name = name;
    this.location = location;
  }
}
```

The example highlights a problem related to `null` being a *flexible* type.  `null` can be used with any reference type.  The Java compiler is not able to determine which constructor to call.

The default constructor invokes another constructor and passes `null`.

```java
public MagicBox() {
  this( null );
}
```

The call `this( null )` matches both the constructors that have one reference type parameter.

1. The constructor that takes a `String`

    ```java
    public MagicBox( final String name ) { /* ... */ }
    ```

1. The constructor that takes a `Point`

    ```java
    public MagicBox( final Point location ) { /* ... */ }
    ```

There are several ways to address this problem.  Three of which are listed below.

1. The default constructor can do nothing as by default the properties will be set to `null`.

    ```java
    public MagicBox() {
    }
    ```

1. We can type cast the `null` to either a `String` as shown next or a `Point`

    ```java
    public MagicBox() {
      this( (String) null );
    }
    ```

    [Type casting is covered in depth later on](#the-instanceof-and-type-cast-operators).

1. Alternatively, the default constructor can invoke the constructor that takes two parameters.

    ```java
    public MagicBox() {
      this( null, null );
    }
    ```

All approaches are valid, but a better option if to use *static factory methods*.

## What are static factory methods?

The [first item in the Effective Java book](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/ch2.xhtml#lev1) talks about static factory methods and recommends them over constructors.

Consider the following example.

```java
package demo;

public class BoxDimensions {

  private final int width;
  private final int height;
  private final int depth;

}
```

The class `BoxDimensions` captures the dimensions of a box.  Say that we would like to create the following constructors:

1. Takes two parameters the `base` and the `height`.  The following table shows the mapping between the properties and the parameters.

    | Parameter | Property |
    |-----------|----------|
    | `base`    | `width`  |
    | `base`    | `depth`  |
    | `height`  | `height` |

1. Takes two parameters the `side` and the `depth`.  The following table shows the mapping between the properties and the parameters.

    | Parameter | Property |
    |-----------|----------|
    | `side`    | `width`  |
    | `side`    | `height` |
    | `depth`   | `depth`  |

These two constructors have the same signature as shown in the following example.

**⚠️ THE FOLLOWING EXAMPLE DOES NOT COMPILE!!**

```java
package demo;

public class BoxDimensions {

  private final int width;
  private final int height;
  private final int depth;

  public BoxDimensions( final int base, final int height ) {
    this.width = base;
    this.depth = base;
    this.height = height;
  }

  public BoxDimensions( final int side, final int depth ) {
    this.width = side;
    this.height = side;
    this.depth = depth;
  }
}
```

Both constructors have the same signature, thus the Java compiler cannot tell apart.  Consider the following code fragment.

```java
new BoxDimensions(7, 3);
```

Which constructor are we referring to in the above fragment?

There were several attempts to solve this problem, some of them are not that good.  A not so good approach is to use a different type to represent one of the parameters (not the object's property).

**⚠️ NOT RECOMMENDED!!**

```java
package demo;

public class BoxDimensions {

  private final int width;
  private final int height;
  private final int depth;

  public BoxDimensions( final int base, final float height ) { /* ... */ }

  public BoxDimensions( final int side, final int depth ) { /* ... */ }
}
```

The above code fragment uses `float` to differentiate between the constructors.

1. Calls the *base* and *height* version of the constructor.

    ```java
    new BoxDimensions(1, 2F);
    ```

1. Calls the *side* and *depth* version of the constructor.

    ```java
    new BoxDimensions(1, 1);
    ```

This will work, but we have better options and is only mentioned here so that you are aware of it.

Static methods can be used to create an instance of the same class.  These are referred to as **static factory methods**.

```java
public static BoxDimensions withBaseAndHeight( final int base, final int height ) {
  return new BoxDimensions( base, height, base );
}
```

Methods are more flexible with names compared to constructors and we can use a meaningful name.  Note that we can create an instance of any class from anywhere we need (given that we are allowed to do so).

```java
package demo;

public class BoxDimensions {

  private final int width;
  private final int height;
  private final int depth;

  public BoxDimensions( final int width, final int height, final int depth ) {
    this.width = width;
    this.height = height;
    this.depth = depth;
  }

  public static BoxDimensions withBaseAndHeight( final int base, final int height ) {
    return new BoxDimensions( base, height, base );
  }

  public static BoxDimensions withSideAndDepth( final int side, final int depth ) {
    return new BoxDimensions( side, side, depth );
  }
}
```

## Should utilities classes, like the `Math` class, have a constructor?

There is no point to initialise stateless classes, also referred to as utilities classes, such as the `Math` class. These classes were meant to serve a different purpose than being initialised as objects.

{% include custom/dose_not_compile.html %}

```java
package demo;

public class App {
  public static void main( final String[] args ) {
    final Math math = new Math();
  }
}
```

Trying to create an instance of such class does not make sense.

Such classes should have a `private` constructor to prevent others from initialising them by mistake.  This pattern is also mentioned in the [Effective Java](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/) book as [Item 4: Enforce noninstantiability with a private constructor](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/ch2.xhtml#lev4).

Java is a **general purpose programming language** that supports, [procedural programming](https://en.wikipedia.org/wiki/Procedural_programming) style, [object oriented programming](https://en.wikipedia.org/wiki/Object-oriented_programming) style and also [functional programming](https://en.wikipedia.org/wiki/Functional_programming) style.  Static constructs fall in the procedural programming style and as such does not interact with objects.

## Can we call methods from within a constructor?

Yes, but that's not recommended as you may experiences some surprises.  The [section *Can a constructor in a parent class call a method in a subclass?*](#can-a-constructor-in-a-parent-class-call-a-method-in-a-subclass) covers this question in some depths.

Be mindful when invoking methods from within the constructors.  Prefer [static factory methods](#what-are-static-factory-methods) over constructors and invoke the setup methods before returning the object.

```java
package demo;

public class PreferStaticFactoryMethods {

  public static PreferStaticFactoryMethods create() {
    final PreferStaticFactoryMethods a = new PreferStaticFactoryMethods();
    a.init();
    return a;
  }

  private PreferStaticFactoryMethods() { /* ... */ }

  private void init() { /* ... */ }
}
```

## Desctructors

{% include custom/pending.html %}
