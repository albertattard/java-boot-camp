---
layout: default
title: The this keyword
parent: Simple objects
nav_order: 3
permalink: docs/simple-objects/this/
---

# The `this` keyword
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## What does `this` means?

The [`this` keyword](https://docs.oracle.com/javase/tutorial/java/javaOO/thiskey.html) represents the object and instance methods can access the object they are currently interacting with using `this` keyword.

One can simply say that when an instance method is invoked, a new variable is made available to the method through which the instance method can interact with the object.  In a previous example, the `this` keyword was only used in one place, and yet it works.  The `this` keyword is only required when we need to make a distinction between a local variable and a class property.  With that said, we can use the `this` keyword to refer to both properties and instance methods.

Consider the following example.

```java
package demo;

import static com.google.common.base.Preconditions.checkArgument;
import static com.google.common.base.Strings.nullToEmpty;

public class Box {

  private BoxForm form = BoxForm.CLOSED;
  private String label = "No Label";

  public void open() {
    this.form = BoxForm.OPEN;
  }

  public void close() {
    this.form = BoxForm.CLOSED;
  }

  public boolean isOpen() {
    return this.form == BoxForm.OPEN;
  }

  public String getLabel() {
    return this.label;
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
    final String openClosed = this.isOpen() ? "an open" : "a closed";
    final String labelLocalVariable = this.getLabel();
    return String.format( "%s box labelled '%s'", openClosed, labelLocalVariable );
  }

  private enum BoxForm { /* ... */ }
}
```

The above example goes to great length to refer to everything through the `this` keyword, and there is no need to do that.

## Can we access `static` methods using the `this` keyword?

The `this` keyword can be used to access `static` methods, **but that's not required nor recommended**.

**⚠️ NOT RECOMMENDED!!**

```java
package demo;

public class App {

  private static void staticMethod() {
    System.out.println( "Hello from the static side" );
  }

  private void instanceMethod() {
    this.staticMethod();
  }

  public static void main( final String[] args ) {
    new App().instanceMethod();
  }
}
```

## How does the `this` keyword works with inner anonymous classes?

Different from some other programming languages, like [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this), there is no need to bind it or do any gymnastics.

In Java, we can have objects within objects in the form of inner anonymous classes.  Consider the following (*possibly advanced*) example.

**⚠️ THE FOLLOWING EXAMPLE WILL NOT COMPILE!!**

```java
package demo;

public class App {

  private final int number = 7;

  private void instanceMethod() {
    System.out.printf( "number = %d%n", this.number );

    /* Create an inner anonymous class */
    final Runnable r = new Runnable() {
      @Override
      public void run() {
        System.out.printf( "number = %d%n", this.number );
      }
    };
    r.run();
  }

  public static void main( final String[] args ) {
    new App().instanceMethod();
  }
}
```

Do not let the complexity scare you away as the main point her is that, the `this` keyword will always means the current object and we may have nested objects.

The above code dose not compile.

```bash
src/main/java/demo/App.java:13: error: cannot find symbol
        System.out.printf( "number = %d%n", this.number );
                                                ^
  symbol: variable number
```

Let's breakdown the `instanceMethod()` method down.

1. The first `printf()` method call is within the `instanceMethod()` method defined within the `App` class.  Therefore, the `this` keyword shown here refers to an object of type `App`.

    ```java
      private void instanceMethod() {
        System.out.printf( "number = %d%n", this.number );
    ```

1. The second `printf()` method call is within the inner class, defined within the `instanceMethod()` method.

    ```java
        /* Create an inner anonymous class */
        final Runnable r = new Runnable() {
          @Override
          public void run() {
            System.out.printf( "number = %d%n", this.number );
          }
        };
    ```

    The `printf()` method shown above is invoked from within the `run()` method that is within the inner anonymous class.  Therefore, the `this` keyword here refers to the objects defined by the inner anonymous class, and not the object defined by the `App` class.

We can specify which `this` we are referring to by prefixing the class name.

```java
App.this.number
```

Following is an updated example

```java
  private void instanceMethod() {
    System.out.printf( "number = %d%n", App.this.number );

    /* Create an inner anonymous class */
    final Runnable r = new Runnable() {
      @Override
      public void run() {
        System.out.printf( "number = %d%n", App.this.number );
      }
    };
    r.run();
  }
```

As before, we can always prefix the `this` keywords with the class name as shown above.

## 🤔 How does `this` works with nested inner anonymous classes?

Consider the following challenge.

**⚠️ THE FOLLOWING EXAMPLE WILL NOT COMPILE!!**

```java
package demo;

public class App {

  private final int number = 7;

  private void instanceMethod() {
    System.out.printf( "number (app) = %d%n", this.number );

    /* Inner anonymous class */
    final Runnable r = new Runnable() {

      private final int number = 3;

      @Override
      public void run() {
        System.out.printf( "number (app)  = %d%n", App.this.number );
        System.out.printf( "number (iac)  = %d%n", this.number );

        /* 
         * Inner anonymous class within another inner anonymous class 
         * referred to in our example as inner-inner anonymous class 
         */
        new Runnable() {
          @Override
          public void run() {
            System.out.printf( "number (app)  = %d%n", App.this.number );
            System.out.printf( "number (iac)  = %d%n", this.number );
          }
        }.run();

      }
    };
    r.run();
  }

  public static void main( final String[] args ) {
    new App().instanceMethod();
  }
}
```

The above example will not compile.  Also, inner anonymous classes should not introduce new state as it makes things more complex for nothing.  The *inner-inner anonymous class* (the *inner-inner anonymous class* is the inner anonymous class defined within the `run()` within the *inner anonymous class*) has no way to refer to its outer class thus, there is no way we can get the `number` property defined by the *inner anonymous class*.

Moving the property to within the method would make it available to the *inner-inner anonymous class*.

```java
    /* Inner anonymous class */
    final Runnable r = new Runnable() {

      private final int number = 3;

      @Override
      public void run() {
        System.out.printf( "number (app)  = %d%n", App.this.number );
        System.out.printf( "number (iac)  = %d%n", this.number );

        /* 
         * Inner anonymous class within another inner anonymous class 
         * referred to in our example as inner-inner anonymous class 
         */
        new Runnable() {
          @Override
          public void run() {
            System.out.printf( "number (app)  = %d%n", App.this.number );
            System.out.printf( "number (iac)  = %d%n", this.number );
          }
        }.run();

      }
    };
```

