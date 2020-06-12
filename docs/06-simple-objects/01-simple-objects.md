---
layout: default
title: Example
parent: Simple objects
nav_order: 3
permalink: docs/simple-objects/objects/
---

# Example
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Scenario

The post-office is automating the packaging of letters or items into boxes and is creating a program to handles this.  There are two types of boxes, the light boxes and the heavy boxes.  The light boxes only take one item in them whereas the heavy boxes can take as many items as it can fit.

## Create a simple box object

Let start by creating a simple object that will represent a box.  The box will not have any functionality.  Do not worry about light and heavy boxes just yet.

1. Create the `Box` class

    ```java
    package demo;

    public class Box {
    }
    ```

1. Update the `main()` method

    ```java
    package demo;

    public class App {

      public static void main( final String[] args ) {
        final Box box = new Box();
        System.out.printf( "My box %s%n", box );
      }
    }
    ```

1. Run the program

    ```bash
    My box demo.Box@2ff4acd0
    ```

1. Replace the [toString()](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/lang/Object.html#toString()) method, so that we can print something more meaningful.

    ```java
    package demo;

    public class Box {

      @Override
      public String toString() {
        return "a basic box";
      }
    }
    ```

    [Effective Java](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/)
    1. [Item 12: Always override toString](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/ch3.xhtml#lev12)
    1. [Item 40: Consistently use the Override annotation](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/ch6.xhtml#lev40)

    The above example shows [overriding which is discussed in depth later on](#overriding).

1. Run the program again

    ```bash
    My box a basic box
    ```

## Add open and close functionality to the box

A box may be open or may be closed.  The program needs to determine whether the box is open or closed before putting things inside.  The `Box` needs to have methods that will allow the program to open and/or close the box and determine whether the box is open or not.

1. Assert the default state

    By default, a box is always created in a close state.

    ```java
    package demo;

    import org.junit.jupiter.api.DisplayName;
    import org.junit.jupiter.api.Test;

    import static org.junit.jupiter.api.Assertions.assertFalse;

    public class BoxTest {

      @Test
      @DisplayName( "should be closed by default" )
      public void shouldBeClosedByDefault() {
        final Box box = new Box();
        assertFalse( box.isOpen() );
      }
    }
    ```

    Add the missing methods (without any special logic) just to make the program compile.

    ```java
    package demo;

    public class Box {

      public boolean isOpen() {
        return false;
      }

      @Override
      public String toString() { /* ... */ }
    }
    ```

    Run the test.  The test should pass.


1. Add the `close()` functionality

    ```java
    package demo;

    import org.junit.jupiter.api.DisplayName;
    import org.junit.jupiter.api.Test;

    import static org.junit.jupiter.api.Assertions.assertFalse;

    public class BoxTest {

      @Test
      @DisplayName( "should be closed by default" )
      public void shouldBeClosedByDefault() { /* ... */ }

      @Test
      @DisplayName( "should not be open after the close method is called" )
      public void shouldNotBeOpen() {
        final Box box = new Box();
        box.close();
        assertFalse( box.isOpen() );
      }
    }
    ```

    Add the missing methods (without any special logic) just to make the program compile.

    ```java
    package demo;

    public class Box {

      public void close() {
      }

      @Override
      public String toString() { /* ... */ }
    }
    ```

    Run the test.  Both tests should pass.

1. Add the open functionality

    ```java
    package demo;

    import org.junit.jupiter.api.DisplayName;
    import org.junit.jupiter.api.Test;

    import static org.junit.jupiter.api.Assertions.assertFalse;
    import static org.junit.jupiter.api.Assertions.assertTrue;

    public class BoxTest {

      @Test
      @DisplayName( "should be closed by default" )
      public void shouldBeClosedByDefault() { /* ... */ }

      @Test
      @DisplayName( "should not be open after the close method is called" )
      public void shouldNotBeOpen() { /* ... */ }

      @Test
      @DisplayName( "should be open after the open method is called" )
      public void shouldBeOpen() {
        final Box box = new Box();
        box.open();
        assertTrue( box.isOpen() );
      }
    }
    ```

    Add the missing methods (without any special logic) just to make the program compile.

    ```java
    package demo;

    public class Box {

      public void open() {
      }

      public void close() { /* ... */ }

      public boolean isOpen() { /* ... */ }

      @Override
      public String toString() {
        return "a basic box";
      }
    }
    ```

    Run the test.  The new test should fail, as the `isOpen()` method always return `false`.

    ```bash
    $ ./gradlew clean test

      > Task :test FAILED

      BoxTest > should be closed by default PASSED

      BoxTest > should be open after the open method is called FAILED
          org.opentest4j.AssertionFailedError at BoxTest.java:31

      BoxTest > should not be open after the close method is called PASSED

    ...
    ```

1. Add state to the `Box`

    ```java
    package demo;

    public class Box {

      private boolean open;

      public void open() {
        open = true;
      }

      public void close() {
        open = false;
      }

      public boolean isOpen() {
        return open;
      }

      @Override
      public String toString() {
        return String.format( "%s box", open ? "an open" : "a closed" );
      }
    }
    ```

    Updated the `toString()` to return something more meaningful.

1. Run the tests

    ```bash
    $ ./gradlew test

    > Task :test

    BoxTest > should be open after the open method is called PASSED

    BoxTest > should not be open after the close method is called PASSED
    ```

    Both tests pass

## Is `boolean` the right choice (prefer enums)?

We used a property of type `boolean` to represent that open/closed state of the box, as shown below.

```java
package demo;

public class Box {

  private boolean open;

  public void open() { /* ... */ }

  public void close() { /* ... */ }

  public boolean isOpen() { /* ... */ }

  @Override
  public String toString() { /* ... */ }
}
```

A `boolean` variable can be in either of the two states, `true` or `false`.  By just reading the value `true`, or `false`, we cannot deduct whether the box is open or closed.  The meaning of the value `true` or `false` make sense when seen relative to the property name, `open` in this case.  Consider the following example, where the property name was renamed from `open`, to `closed`.

```java
package demo;

public class Box {

  private boolean closed;

  public void open() { /* ... */ }

  public void close() { /* ... */ }

  public boolean isOpen() { /* ... */ }

  @Override
  public String toString() { /* ... */ }
}
```

Now the meaning of `true` and `false` is different from what it was before.  Before, a `true` meant that the box was open.  Now (after renaming the property), a `true` means that the box is closed.

While `boolean` types are very common, it is recommended to use an enum instead.  Consider the following refactored version of the `Box` class.

```java
package demo;

public class Box {

  private BoxForm form = BoxForm.CLOSED;

  public void open() {
    form = BoxForm.OPEN;
  }

  public void close() {
    form = BoxForm.CLOSED;
  }

  public boolean isOpen() {
    return form == BoxForm.OPEN;
  }

  @Override
  public String toString() {
    return String.format( "%s box", isOpen() ? "an open" : "a closed" );
  }

  private enum BoxForm {
    OPEN, CLOSED;
  }
}
```

The enum constants are very explicit.  The enum constants `OPEN` will always mean open, independent from the property name.  Same applies to the `CLOSED` enum constant.  The program reads better and the reader can easily understand what each value (`OPEN` or `CLOSED`) means.  In the previous example, the meaning of the `boolean` value was relative to the variable name.  Enums mitigates this ambiguity as each constant is very explicit.

**Always prefer enums over boolean**.

### Are there any other advantages, besides readability?

Consider a flatten box, similar to those we buy form a home depot store.  When bough, the box is in a flatten form and we cannot put anything in it before we unpack it and put it in the correct form.  This scenario introduced a new state, which is the *flattened* state.  We cannot represent the box states, *flattened*, *open* and *closed* as one property of type `boolean`.  What we will end-up doing is creating a second property as shown next.

```java
package demo;

public class Box {

  private boolean open;
  private boolean flattened;

  public void open() { /* ... */ }

  public void close() { /* ... */ }

  public boolean isOpen() {
    return false == flattened && open;
  }

  @Override
  public String toString() { /* ... */ }
}
```

The `isOpen()` now depends on two properties and not one.  Another developer can easily miss the second property and only rely on the `open`.  The issue with this approach is that we have one state in the real world represented by two properties in the code.  Note that when the box is the *flattened* state in reality, the box is not considered *closed*.  Remember that in reality a box can be either *flattened*, *open* or *closed*.  Yet the `open` property will have the value of `false`, which is interpreted as *closed*.

Enums can contain more than two variants and can contain enough constants to suit our needs.

**Always prefer enums over boolean**.

### Why is the enum declared `private`?

The enum `BoxForm` is only used within the `Box` class.  The `isOpen()` method, returns `true` or `false` depending on whether the box is open or not.  Therefore, there is no need to make this enum more visible than it is.  In the event the `BoxForm` enum needs to be used by other classes, we can increase its visibility accordingly.

## What does '*object state*' mean?

The `Box` defined a property, called `form` (of type `BoxForm`).  The properties (not the `static` fields) defined by a class represent the object's state.  When objects are created, the properties defined by their class become the object's state.  Consider the following example.

```java
Box a = new Box();
```

When the `Box` instance is created, the properties defined by the class becomes the object's state.  In this case, the object state, comprise one property of type `boolean`.  Similar to, "*an object is an instance of a class*", the objects' state is an instance of the properties defined by the class.

**The state of one object is independent from the state of another object**.  One box may be open while the box instance is closed.

## How do instance methods interact with the object's state?

The `Box` class, shown next, has four **instance** (not `static`) methods, all of which access the `form` property.

```java
package demo;

public class Box {

  private BoxForm form = BoxForm.CLOSED;

  public void open() {
    form = BoxForm.OPEN;
  }

  public void close() {
    form = BoxForm.CLOSED;
  }

  public boolean isOpen() {
    return form == BoxForm.OPEN;
  }

  @Override
  public String toString() {
    return String.format( "%s box", isOpen() ? "an open" : "a closed" );
  }

  private enum BoxForm {
    OPEN, CLOSED;
  }
}
```

When a method (*instance* or `static`) is invoked, the method's state (such as local variables) is loaded on the *Java stack* as a new frame.  All method's variables exists in the method's frame in the *Java stack*.  The method can only reach within its frame.  The classloader makes sure of that during the class loading process.  Instance methods have also access to the objects' state (represented by the property `form` in this example).  In this case, all four instance methods will have access to the same property, `form`.

**On the other hand, `static` methods cannot access the object's state**.

Different from local variables, when a method modifies the object's state (defined by its properties), then all other instance methods will observe these changes.  Consider the following sequence of events.

1. A box instance is created, and the property `form` is set to `BoxForm.CLOSED`.
1. The `open()` method will set the property `form` to `BoxForm.OPEN`.
1. When later on the `isOpen()` method is invoked, then it compares the current value of the `form` property, which is `BoxForm.OPEN`, to determine whether the box is open of not.

There is a small caveat to this, which will be discussed in more detail when we talk about [concurrency](11%20-%20Concurrency.md).

Consider the following example.

```java
package demo;

public class App {

  public static void main( final String[] args ) {
    /* Create two boxes */
    final Box a = new Box();
    final Box b = new Box();

    System.out.println( "-- Two boxes --------" );
    System.out.printf( "Box a: %s%n", a );
    System.out.printf( "Box b: %s%n", b );

    /* Open only one of the boxes */
    b.open();

    System.out.println( "-- Opened box b -----" );
    System.out.printf( "Box a: %s%n", a );
    System.out.printf( "Box b: %s%n", b );

    /* Close one of the boxes */
    b.close();

    System.out.println( "-- Closed box b -----" );
    System.out.printf( "Box a: %s%n", a );
    System.out.printf( "Box b: %s%n", b );
  }
}
```

Two boxes are created, and one of them is modified while the other one is not.  The boxes state is printed at every step.

```bash
-- Two boxes --------
Box a: a closed box
Box b: a closed box
-- Opened box b -----
Box a: a closed box
Box b: an open box
-- Closed box b -----
Box a: a closed box
Box b: a closed box
```

Both boxes are independent and while one of the boxes is opened, the other one is unaffected.  The state of one box is independent from all other boxes.  Note that the same methods are used by all instances of the object, while each object maintain its state.  Instance methods need to work with an instance, and that's why a `NullPointerException` is thrown when the we try to invoke an instance method on a `null` variable.

Consider the following two objects and the variables `x` and `y`, both of type `Box`.

```java
final Box x = new Box();
final Box y = new Box();
```

An instance method needs to be invoked on an object or a non-null variable.  When an instance method is invoked, Java will fetch all properties for that object and make them available to the instance method.

Consider the following code fragment.

```java
x.open();
```

Java will fetch the object, to which the variable `x` is pointing to, and will make all object's properties available the instance method `open()`.  The above instance method will change the object's state and will only affect the object to which variable `x` points to.  The state of the object to which variable `y` is pointing to is not affected by the above instance method call.

Consider the following example.

```java
boolean isOpen = new Box().isOpen();
```

The above is a valid example.  Here a new instance of `Box` is create and then the method `isOpen()` is invoked against the new instance.  Here the `Box` instance is not assigned to any variable and instead is used directly.

**How does that works?**

Consider the following code fragment.

```java
int a = 7 + 3;
```

What's the value of variable `a`?  Is it `10` or `7 + 3`?  The answer is `10`, as the `+` operator is evaluated before the `=` operator and Java evaluates the expression and then uses the answer.  Same happens with objects.  The `new` operator creates a new object in the *Java heap* and returns the object reference.  We can assign the reference returned to a variable or use it immediately as shown next.

```java
boolean isOpen = new Box().isOpen();
```

The above example will evaluate to `false`, as by default the box is closed.

It is worth mentioning that an object is created in the *Java heap* and no variable are pointing to it.  This object will be picked up by the garbage collector, which will remove all it from the *Java heap*.

## Adding more state to our object

Boxes have labels printed on the sides.  The label is a simple text identifying the box.  Following are some examples of label:

1. `To be processed by Dept. XYZ`
1. `Need to be rechecked by MNO`

A box always has a label which is initially set to: `No label`.  **Note that the label cannot be blank or empty**.

The label can be represented by the `String` data-type.

1. By default, the label should have the value of `No label`.

    ```java
    package demo;

    import org.junit.jupiter.api.DisplayName;
    import org.junit.jupiter.api.Test;

    import static org.junit.jupiter.api.Assertions.assertEquals;
    import static org.junit.jupiter.api.Assertions.assertFalse;
    import static org.junit.jupiter.api.Assertions.assertTrue;

    public class BoxTest {

      @Test
      @DisplayName( "should be closed by default" )
      public void shouldBeClosedByDefault() { /* ... */ }

      @Test
      @DisplayName( "should be open after the open method is called" )
      public void shouldBeOpen() { /* ... */ }

      @Test
      @DisplayName( "should not be open after the close method is called" )
      public void shouldNotBeOpen() { /* ... */ }

      @Test
      @DisplayName( "should have a default label value of 'No Label'" )
      public void shouldHaveADefaultLabel() {
        final Box box = new Box();
        assertEquals( "No Label", box.getLabel() );
      }
    }
    ```

    Add the missing method (without any special logic) just to make the program compile.

    ```java
    package demo;

    public class Box {

      private BoxForm form = BoxForm.CLOSED;

      public void open() { /* ... */ }

      public void close() { /* ... */ }

      public boolean isOpen() { /* ... */ }

      public String getLabel() {
        return "No Label";
      }

      @Override
      public String toString() { /* ... */ }

      private enum BoxForm { /* ... */ }
    }
    ```

    Run the tests.  All tests should pass.

1. Add the ability to change the label (assuming that only valid values will be provided)

    ```java
    package demo;

    import org.junit.jupiter.api.DisplayName;
    import org.junit.jupiter.api.Test;

    import static org.junit.jupiter.api.Assertions.assertEquals;
    import static org.junit.jupiter.api.Assertions.assertFalse;
    import static org.junit.jupiter.api.Assertions.assertTrue;

    public class BoxTest {

      @Test
      @DisplayName( "should be closed by default" )
      public void shouldBeClosedByDefault() { /* ... */ }

      @Test
      @DisplayName( "should be open after the open method is called" )
      public void shouldBeOpen() { /* ... */ }

      @Test
      @DisplayName( "should not be open after the close method is called" )
      public void shouldNotBeOpen() { /* ... */ }

      @Test
      @DisplayName( "should have a default label value of 'No Label'" )
      public void shouldHaveADefaultLabel() { /* ... */ }

      @Test
      @DisplayName( "should have the given label value" )
      public void shouldHaveTheGivenLabel() {
        final Box box = new Box();
        box.changeLabelTo( "Test Label" );
        assertEquals( "Test Label", box.getLabel() );
      }
    }
    ```

    Note that in the above test, the name `changeLabelTo()` was used instead of `setLabel()`.  Both names are fine, but the former reads more like natural languages.  For example, we say, "_the supervisor changed the box's label_" instead of "_the supervisor set the box's label_".

    Add the missing method (without any special logic) just to make the program compile.

    ```java
    package demo;

    public class Box {

      private BoxForm form = BoxForm.CLOSED;

      public void open() { /* ... */ }

      public void close() { /* ... */ }

      public boolean isOpen() { /* ... */ }

      public String getLabel() { /* ... */ }

      public void changeLabelTo( final String label ) {
      }

      @Override
      public String toString() { /* ... */ }

      private enum BoxForm { /* ... */ }
    }
    ```

    The test should fail.

1. Implement the required logic

    ```java
    package demo;

    public class Box {

      private BoxForm form = BoxForm.CLOSED;
      private String label = "No Label";

      public void open() { /* ... */ }

      public void close() { /* ... */ }

      public boolean isOpen() { /* ... */ }

      public String getLabel() {
        return label;
      }

      public void changeLabelTo( final String label ) {
        this.label = label;
      }

      @Override
      public String toString() {
        final String openClose = isOpen() ? "an open" : "a closed";
        return String.format( "%s box labelled '%s'", openClose, label );
      }

      private enum BoxForm { /* ... */ }
    }
    ```

    Re-run the tests.  All should pass.

    The above example introduced a new keyword, `this`.  Do not worry about the new keyword just yet as it is covered in [a following section](what-does-this-means).

## How can we prevent the use of invalid labels?

1. Make sure that invalid labels are rejected by throwing an `IllegalArgumaneException`

    Following is a list of some invalid labels
    * `null` (null)
    * `""` (blank string)
    * `"   "` (only whitespaces)

    The [`@ValueSource` annotation](https://junit.org/junit5/docs/5.2.0/api/org/junit/jupiter/params/provider/ValueSource.html) does not support `null`s and the following will not compile.

    ```java
    @ValueSource( strings = { "", " ", null } )
    ```

    We can pass `"null"` as a string value, as shown next, but this will be treated as string

    ```java
    @ValueSource( strings = { "", " ", "null" } )
    ```

    We can use a custom converter that help us convert the above sample.

    ```java
    package demo;

    import org.junit.jupiter.params.converter.ArgumentConversionException;
    import org.junit.jupiter.params.converter.DefaultArgumentConverter;
    import org.junit.jupiter.params.converter.SimpleArgumentConverter;

    public final class NullableConverter extends SimpleArgumentConverter {
      @Override
      protected Object convert( final Object source, final Class<?> targetType ) throws ArgumentConversionException {
        if ( "null".equals( source ) ) {
          return null;
        }

        return DefaultArgumentConverter.INSTANCE.convert( source, targetType );
      }
    }
    ```

    The above converter converts the text `"null"` to an actual `null`.  Otherwise, it calls the default converter and let it deal with the conversion.

    ```java
    return DefaultArgumentConverter.INSTANCE.convert( source, targetType );
    ```

    Add a test and use the `NullableConverter` converter.

    ```java
    package demo;

    import org.junit.jupiter.api.DisplayName;
    import org.junit.jupiter.api.Test;
    import org.junit.jupiter.params.ParameterizedTest;
    import org.junit.jupiter.params.converter.ConvertWith;
    import org.junit.jupiter.params.provider.ValueSource;

    import static org.junit.jupiter.api.Assertions.assertEquals;
    import static org.junit.jupiter.api.Assertions.assertFalse;
    import static org.junit.jupiter.api.Assertions.assertThrows;
    import static org.junit.jupiter.api.Assertions.assertTrue;

    public class BoxTest {

      @Test
      @DisplayName( "should be closed by default" )
      public void shouldBeClosedByDefault() { /* ... */ }

      @Test
      @DisplayName( "should be open after the open method is called" )
      public void shouldBeOpen() { /* ... */ }

      @Test
      @DisplayName( "should not be open after the close method is called" )
      public void shouldNotBeOpen() { /* ... */ }

      @Test
      @DisplayName( "should have a default label value of 'No Label'" )
      public void shouldHaveADefaultLabel() { /* ... */ }

      @Test
      @DisplayName( "should have the given label value" )
      public void shouldHaveTheGivenLabel() { /* ... */ }

      @ValueSource( strings = { "", " ", "null" } )
      @DisplayName( "should throw an IllegalArgumentException when given an invalid label" )
      @ParameterizedTest( name = "should throw an IllegalArgumentException when given an invalid label ''{0}''" )
      public void shouldThrowAnExceptionWhenGivenInvalidLabel( final @ConvertWith( NullableConverter.class ) String invalidLabel ) {
        final Box box = new Box();
        assertThrows( IllegalArgumentException.class, () -> box.changeLabelTo( invalidLabel ) );
      }
    }
    ```

    Run the test.  The test should fail as we have no validations in place yet.

    ```bash
    $ ./gradlew test

    ...

    BoxTest > should throw an IllegalArgumentException when given and invalid label '' FAILED
        org.opentest4j.AssertionFailedError at BoxTest.java:51

    BoxTest > should throw an IllegalArgumentException when given and invalid label ' ' FAILED
        org.opentest4j.AssertionFailedError at BoxTest.java:51

    BoxTest > should throw an IllegalArgumentException when given and invalid label 'null' FAILED
        org.opentest4j.AssertionFailedError at BoxTest.java:51

    ...
    ```

1. Add the validation

    ```java
    package demo;

    import com.google.common.base.Preconditions;
    import com.google.common.base.Strings;

    public class Box {

      private BoxForm form = BoxForm.CLOSED;
      private String label = "No Label";

      public void open() { /* ... */ }

      public void close() { /* ... */ }

      public boolean isOpen() { /* ... */ }

      public String getLabel() { /* ... */ }

      public void changeLabelTo( final String label ) {
        Preconditions.checkArgument( isValidLabel( label ) );
        this.label = label;
      }

      private static boolean isValidLabel( final String label ) {
        return false == Strings.nullToEmpty( label ).isBlank();
      }

      @Override
      public String toString() { /* ... */ }

      private enum BoxForm { /* ... */ }
    }
    ```

    The above example makes use of [Google Guava](https://mvnrepository.com/artifact/com.google.guava/guava).

    ```groovy
    dependencies {
      implementation 'com.google.guava:guava:29.0-jre'
    }
    ```

    Run the tests again.  All tests should pass.

    ```bash
    $ ./gradlew test

    ...

    BoxTest > should throw an IllegalArgumentException when given and invalid label '' PASSED

    BoxTest > should throw an IllegalArgumentException when given and invalid label ' ' PASSED

    BoxTest > should throw an IllegalArgumentException when given and invalid label 'null' PASSED

    ...
    ```

1. (Optional) Use static imports

    The `checkArgument()` and `nullToEmpty()` are static methods and thus we can use the static imports if we like.

    ```java
    package demo;

    import static com.google.common.base.Preconditions.checkArgument;
    import static com.google.common.base.Strings.nullToEmpty;

    public class Box {

      private BoxForm form = BoxForm.CLOSED;
      private String label = "No Label";

      public void open() { /* ... */ }

      public void close() { /* ... */ }

      public boolean isOpen() { /* ... */ }

      public String getLabel() { /* ... */ }

      public void changeLabelTo( final String label ) {
        checkArgument( isValidLabel( label ) );
        this.label = label;
      }

      private static boolean isValidLabel( final String label ) {
        return false == nullToEmpty( label ).isBlank();
      }

      @Override
      public String toString() { /* ... */ }

      private enum BoxForm { /* ... */ }
    }
    ```

    This is a personal preference and I do not see any critical benefits when using one or the other.  Static imports are used a lot in these notes as they then to produce more concise code, which fits better in code example.

### Why is the `isValidLabel()` method `private` and `static`?

The `isValidLabel()` does not access any state, thus is safe to have it as `static`.

```java
private static boolean isValidLabel( final String label ) {
  return false == Strings.nullToEmpty( label ).isBlank();
}
```

The `isValidLabel()` can be made public as there is no harm with that, but then we will enable other classes to bind to the `Box` class.  This can have consequences, similar to what we discussed in the [use of static methods](#how-can-we-test-functionality-that-makes-use-of-static-methods).
