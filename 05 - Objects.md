# Objects

[Effective Java](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/) is a very good and popular book.  Several references are made in this page to specific items described in the book.

## TOC

1. [Setup](#setup)
1. [Simple Objects](#simple-objects)
    1. [Basic Object](#basic-object)
    1. [Add State](#add-state)
    1. [More State](#more-state)
    1. [Multiple Instances](#multiple-instances)
    1. [Mutable and Immutable](#mutable-and-immutable)
1. [Inheritance](#inheritance)
    1. [Light Box Example](#light-box-example)
    1. [Heavy Box Example](#heavy-box-example)
    1. [The `super` keyword](#the-super-keyword)
    1. [The `final` keyword](#the-final-keyword)
    1. [Private Constructor](#private-constructor)
1. [Abstraction](#abstraction)
    1. [When a class must be abstract?](#when-a-class-must-be-abstract)
    1. [Final Classes](#final-classes)
1. [The Object Class](#the-object-class)
1. [Interfaces](#interfaces)
1. [instanceof and cast operators](#instanceof-and-cast-operators)
1. [Inheritance and Composition](#inheritance-and-composition)
1. [Overloading and Overriding](#overloading-and-overriding)
1. [Outer, Inner and Anonymous Classes](#outer-inner-and-anonymous-classes)
1. [Annotations](#annotations)
1. [Generics](#generics)
1. [Miscellaneous](#miscellaneous)

## Setup

1. Clone Repo: [java-boot-camp-blueprint](https://github.com/albertattard/java-boot-camp-blueprint.git)

    ```bash
    $ git clone https://github.com/albertattard/java-boot-camp-blueprint.git
    ```

    **Note that this is the blueprint repository and not the blank repository**.

1. Open the repo in IDE

1. Delete the `src/test/java/demo/AppTest.java`

1. Modify the `src/main/java/demo/App.java`

    ```java
    package demo;

    public class App {

      public static void main( String[] args ) {
        System.out.println( "Objects!!" );
      }
    }
    ```

1. Run the tests and build the project

    ```bash
    $ ./gradlew clean build

    ...
    BUILD SUCCESSFUL in 3s
    13 actionable tasks: 13 executed
    ```

## Simple Objects

The post-office is automating the packaging of letters or items into boxes and is creating a program to handles this.  There are two types of boxes, the light boxes and the heavy boxes.  The light boxes only take one item in them whereas the heavy boxes can take as many items as it can fit.

### Basic Object

Let start by creating a basic object that will represent a box.  The box will not have any functionality.  Do not worry about light and heavy boxes just yet.

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

      public static void main( String[] args ) {
        Box box = new Box();
        System.out.printf( "My box %s%n", box );
      }
    }
    ```

1. Run the program

    ```bash
    $ ./gradlew run

    > Task :run
    My box demo.Box@2ff4acd0
    ```

1. Replace the [toString()](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/lang/Object.html#toString()) method, so that we can print something more meaning full.

    ```java
    package demo;

    public class Box {

      @Override public String toString() {
        return "a basic box";
      }
    }
    ```

    [Effective Java](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/)
    1. [Item 12: Always override toString](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/ch3.xhtml#lev12)
    1. [Item 40: Consistently use the Override annotation](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/ch6.xhtml#lev40)

1. Run the program again

    ```bash
    ./gradlew run

    > Task :run
    My box a basic box
    ```

### Add State

A box may be open or may be closed.  The program needs to determine whether the box is open or closed before puts things inside.  The `Box` needs to have methods that will allow the program to open and/or close the box and determine whether the box is open or not.

1. Create a test

    ```java
    package demo;

    import org.junit.jupiter.api.DisplayName;
    import org.junit.jupiter.api.Test;

    import static org.junit.jupiter.api.Assertions.assertTrue;

    public class BoxTest {

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

      public boolean isOpen() {
        return true;
      }

      @Override public String toString() {
        return "a basic box";
      }
    }
    ```

    Run the test.  The test should pass.

1. Add the `close()` functionality

    ```java
    package demo;

    import static org.junit.jupiter.api.Assertions.assertFalse;
    /* Other imports removed for brevity */

    public class BoxTest {

      @Test
      @DisplayName( "should not be open after the close method is called" )
      public void shouldNotBeOpen() {
        final Box box = new Box();
        box.close();
        assertFalse( box.isOpen() );
      }

      /* Other test removed for brevity */
    }
    ```

    Add the missing methods (without any special logic) just to make the program compile.

    ```java
    package demo;

    public class Box {

      public void close() {
      }

      /* Other methods removed for brevity */
    }
    ```

    Run the test.  While the open test passes, the close test fails.

    ```bash
    $ ./gradlew test

    > Task :test FAILED

    BoxTest > should be open after the open method is called PASSED

    BoxTest > should not be open after the close method is called FAILED
        org.opentest4j.AssertionFailedError at BoxTest.java:24

    2 tests completed, 1 failed
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

      @Override public String toString() {
        return String.format( "%s box", open ? "an open" : "a closed" );
      }
    }
    ```

    Made the `toString()` returning something more meaning full.

1. Run the tests

    ```bash
    $ ./gradlew test

    > Task :test

    BoxTest > should be open after the open method is called PASSED

    BoxTest > should not be open after the close method is called PASSED
    ```

    Both tests pass

### More State

Boxes have labels printed on the sides.  The label is a simple text identifying the box.  Following are some examples of label: `To be processsed by Dept. XYZ` or `Need to be rechecked by MNO`.  A box always has a label which is initially set to `No label`.  **Note that the label cannot be blank/empty**.

The label can be represented by the `String` data-type.

1. By default, the label should have the value of `No label`.

    ```java
    package demo;

    import static org.junit.jupiter.api.Assertions.assertEquals;
    /* Other imports removed for brevity */

    public class BoxTest {

      @Test
      @DisplayName( "should have a default label value of 'No Label'" )
      public void shouldHaveADefaultLabel() {
        final Box box = new Box();
        assertEquals( "No Label", box.getLabel() );
      }

      /* Other test removed for brevity */
    }
    ```

    Add the missing method (without any special logic) just to make the program compile.

    ```java
    package demo;

    public class Box {

      public String getLabel() {
        return "No Label";
      }

      /* Other members removed for brevity */
    }
    ```

    Run the tests.  All tests should pass.

1. Add the ability to change the label (assuming that only valid values will be provided)

    ```java
    package demo;

    /* Imports removed for brevity */

    public class BoxTest {

      @Test
      @DisplayName( "should have the given label value" )
      public void shouldHaveTheGivenLabel() {
        final Box box = new Box();
        box.setLabel( "Test Label" );
        assertEquals( "Test Label", box.getLabel() );
      }

      /* Other tests removed for brevity */
    }
    ```

    Add the missing method (without any special logic) just to make the program compile.

    ```java
    package demo;

    public class Box {

      public void setLabel( final String label ) {
      }

      /* Other members removed for brevity */
    }
    ```

    The test should fail.

1. Implement the required logic

    ```java
    package demo;

    public class Box {

      private String label = "No Label";

      public void setLabel( final String label ) {
        this.label = label;
      }

      public String getLabel() {
        return label;
      }

      @Override public String toString() {
        final String openClose = open ? "an open" : "a closed";
        return String.format( "%s box labelled '%s'", openClose, label );
      }

      /* Other members removed for brevity */
    }
    ```

    Re-run the tests.  All should pass.

    The [`this` keyword](https://docs.oracle.com/javase/tutorial/java/javaOO/thiskey.html) always represents the object.  Different from some other languages like [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this), there is not need to bind it or do any gymnastics.

1. Create custom Converter.

    ```java
    package demo;

    import org.junit.jupiter.params.converter.ArgumentConversionException;
    import org.junit.jupiter.params.converter.DefaultArgumentConverter;
    import org.junit.jupiter.params.converter.SimpleArgumentConverter;

    public final class NullableConverter extends SimpleArgumentConverter {
      @Override
      protected Object convert( Object source, Class<?> targetType ) throws ArgumentConversionException {
        if ( "null".equals( source ) ) {
          return null;
        }
        return DefaultArgumentConverter.INSTANCE.convert( source, targetType );
      }
    }
    ```

    Converts the text `"null"` to an actual `null`.

1. Add a test and use the `NullableConverter` converter.

    The label cannot be empty and an `IllegalArgumaneException` should be thrown if an invalid value is passed.

    ```java
    package demo;

    import org.junit.jupiter.params.ParameterizedTest;
    import org.junit.jupiter.params.converter.ConvertWith;
    import org.junit.jupiter.params.provider.ValueSource;

    import static org.junit.jupiter.api.Assertions.assertThrows;
    /* Other imports removed for brevity */

    public class BoxTest {

      @ParameterizedTest( name = "should throw an IllegalArgumentException when given and invalid label ''{0}''" )
      @ValueSource( strings = { "", " ", "null" } )
      public void shouldThrowAnExceptionWhenGivenInvalidLabel( @ConvertWith( NullableConverter.class ) String invalidLabel ) {
        final Box box = new Box();
        assertThrows( IllegalArgumentException.class, () -> box.setLabel( invalidLabel ) );
      }

      /* Other tests removed for brevity */
    }
    ```

    Run the test

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

      public void setLabel( String label ) throws IllegalArgumentException {
        Preconditions.checkArgument( false == Strings.nullToEmpty( label ).isBlank() );
        this.label = label;
      }

      /* Other members removed for brevity */
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

### Multiple Instances

Example

```java
package demo;

public class App {

  public static void main( String[] args ) {
    /* Create two boxes */
    Box a = new Box();
    Box b = new Box();

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

Output

```bash
-- Two boxes --------
Box a: a closed box labelled 'No Label'
Box b: a closed box labelled 'No Label'
-- Opened box b -----
Box a: a closed box labelled 'No Label'
Box b: an open box labelled 'No Label'
-- Closed box b -----
Box a: a closed box labelled 'No Label'
Box b: a closed box labelled 'No Label'
```

This can be captured by a test, but it is too naïve.

### Mutable and Immutable

Example

```java
package demo;

public class App {

  public static void main( String[] args ) {
    final Box a = new Box();

    System.out.println( "-- Initial State ----" );
    System.out.printf( "Box: %s%n", a );

    a.open();
    System.out.println( "-- Mutated State ----" );
    System.out.printf( "Box: %s%n", a );
  }
}
```

Output

```bash
-- Initial State ----
Box: a closed box labelled 'No Label'
-- Mutated State ----
Box: an open box labelled 'No Label'
```

## Inheritance

There are two types of boxes.  The light boxes, which are boxes that can contain only one item.  The heavy boxes can take more than one item.  Both boxes can be open or closed and can be opened and closed using the methods created above.

### Light Box Example

1. Create the `LightBox` and add the `isEmpty()` method

    ```java
    package demo;

    import org.junit.jupiter.api.DisplayName;
    import org.junit.jupiter.api.Test;

    import static org.junit.jupiter.api.Assertions.assertTrue;

    public class LightBoxTest {

      @Test
      @DisplayName( "should be empty when no items are placed" )
      public void shouldBeEmpty() {
        final LightBox box = new LightBox();
        assertTrue( box.isEmpty() );
      }
    }
    ```

    Add the missing method (without any special logic) just to make the program compile.

    ```java
    package demo;

    public class LightBox {

      public boolean isEmpty() {
        return true;
      }
    }
    ```

    Test should pass.

1.  Like a box, light box can be opened and closed.  This logic can either be copied here, or inherited from the `Box` class.

    ```java
    package demo;

    public class LightBox extends Box {

      public boolean isEmpty() {
        return true;
      }
    }
    ```

    The `LightBox` [inherits from (or extends)](https://docs.oracle.com/javase/tutorial/java/IandI/subclasses.html) `Box`, which is referred to as the [super class](https://docs.oracle.com/javase/tutorial/java/IandI/super.html).

    All `LightBox`es are `Box`es.

    ```java
    package demo;

    public class App {

      public static void main( String[] args ) {
        final LightBox a = new LightBox();
        final Box b = new LightBox();

        a.open();
        b.close();

        System.out.printf( "Box a: %s%n", a );
        System.out.printf( "Box b: %s%n", b );
      }
    }
    ```

    All methods and state available to the `Box` is not also available to the `LightBox`.

    ```bash
    Box a: an open box
    Box b: a closed box
    ```

    Note that the opposite does not hold.  In other words, not all `Box`es are `LightBox`es.  Fruit is a good analogy to this.  All apples are fruit but not all fruit are apples.

    The following will not compile.

    ```java
    final LightBox a = new Box();
    ```

    This is discussed further in the [instanceof and cast operators section](#instanceof-and-cast-operators).

1. Add the ability to add an item's id (of type `long`) to the `LightBox`.

    **The light box should not be empty (the `isEmpty()` function should return `false`) once an item is placed in the box**.

    Create the test

    ```java
    package demo;

    import static org.junit.jupiter.api.Assertions.assertFalse;
    /* Other imports removed for brevity */

    public class LightBoxTest {

      @Test
      @DisplayName( "should not be empty when an item is placed in the box" )
      public void shouldNotBeEmpty() {
        final LightBox box = new LightBox();
        box.putItem( 1 );
        assertFalse( box.isEmpty() );
      }

      /* Other test removed for brevity */
    }
    ```

    Add the missing method (without any special logic) just to make the program compile.

    ```java
    package demo;

    public class LightBox extends Box {

      public void putItem( final long itemId ) {
      }

      /* Other method removed for brevity */
    }
    ```

    Run the tests.  The second test will fail as expected.

    ```bash
    $ ./gradlew test

    ...
    LightBoxTest > should not be empty when an item is placed in the box FAILED
        org.opentest4j.AssertionFailedError at LightBoxTest.java:23
    ...
    ```

1. Add state to the `LightBox` class.

    ```java
    package demo;

    public class LightBox extends Box {

      private boolean empty = true;

      public boolean isEmpty() {
        return empty;
      }

      public void putItem( final long itemId ) {
        empty = false;
      }
    }
    ```

    Sometimes a property is used for various purposes.  Instead of creating a new property, `empty`, we could use the following.

    **⚠️ NOT RECOMMENDED!!**

    ```java
    package demo;

    public class LightBox extends Box {

      private long itemId = -1L;

      public boolean isEmpty() {
        return itemId == -1L;
      }

      public void putItem( final long itemId ) {
        this.itemId = itemId;
      }
    }
    ```

    The property `itemId` is used for two purposes and that's discouraged.  If negative IDs become valid, for any reason, this logic becomes invalid.

1. A light box can only contain one item and an `IllegalArgumentException` should be thrown if an item is added to a non-empty box.

    ```java
    package demo;

    import static org.junit.jupiter.api.Assertions.assertThrows;
    /* Other imports removed for brevity */

    public class LightBoxTest {

      @Test
      @DisplayName( "should thrown an IllegalArgumentException when adding an item to a non-empty box" )
      public void shouldThrowExceptionWhenItemAlreadyExists() {
        final LightBox box = new LightBox();
        box.putItem( 1 );
        assertThrows( IllegalArgumentException.class, () -> box.putItem( 1 ) );
      }

      /* Other tests removed for brevity */
    }
    ```

    The test should fail.

    ```bash
    ./gradlew test

    ...

    LightBoxTest > should thrown an IllegalArgumentException when adding an item to a non-empty box FAILED
        org.opentest4j.AssertionFailedError at LightBoxTest.java:32
    ...
    ```

    Fix failing tests

    ```java
    package demo;

    import com.google.common.base.Preconditions;

    public class LightBox extends Box {

      public void putItem( final long itemId ) {
        Preconditions.checkArgument( empty );
        empty = false;
      }

      /* Other members removed for brevity */
    }
    ```

    Tests should pass now.

### Heavy Box Example

A heavy box is a box that can take more than one item.

1.  Tests class

    ```java
    package demo;

    import org.junit.jupiter.api.DisplayName;
    import org.junit.jupiter.api.Test;

    import static org.junit.jupiter.api.Assertions.assertFalse;
    import static org.junit.jupiter.api.Assertions.assertThrows;
    import static org.junit.jupiter.api.Assertions.assertTrue;

    public class HeavyBoxTest {

      @Test
      @DisplayName( "should be empty when no items are placed" )
      public void shouldBeEmpty() {
        final HeavyBox box = new HeavyBox();
        assertTrue( box.isEmpty() );
      }

      @Test
      @DisplayName( "should not be empty when an item is placed in the box" )
      public void shouldNotBeEmpty() {
        final HeavyBox box = new HeavyBox();
        box.addItem( 1 );
        assertFalse( box.isEmpty() );
      }

      @Test
      @DisplayName( "should allow multiple items in the box" )
      public void shouldAllowMultipleItems() {
        final HeavyBox box = new HeavyBox();
        box.addItem( 1 );
        box.addItem( 2 );
        box.addItem( 3 );
      }

      @Test
      @DisplayName( "should thrown an IllegalArgumentException when adding an item that is already in the box" )
      public void shouldThrowExceptionWhenItemAlreadyExists() {
        final HeavyBox box = new HeavyBox();
        box.addItem( 1 );
        assertThrows( IllegalArgumentException.class, () -> box.addItem( 1 ) );
      }
    }
    ```

1. Heavy box class

    ```java
    package demo;

    import com.google.common.base.Preconditions;

    import java.util.ArrayList;
    import java.util.List;

    public class HeavyBox extends Box {

      private final List<Long> items = new ArrayList<>();

      public boolean isEmpty() {
        return items.isEmpty();
      }

      public void addItem( final long itemId ) {
        Preconditions.checkArgument( false == items.contains( itemId ) );
        items.add( itemId );
      }
    }
    ```

    The above example make use of `List`, which are discussed in more depth in the [Lists (ArrayList and Vector) section](06%20-%20Collections.md#lists-arraylist-and-vector) part of the [collections](06%20-%20Collections.md).

### The `super` keyword

While heavy boxes may contain very long labels, light box labels cannot be longer than 32 letters long.  Trying to set longer labels should raise an `IllegalArgumentException`

1. Tests

    ```java
    package demo;

    /* Imports removed for brevity */

    public class LightBoxTest {

      @Test
      @DisplayName( "should thrown an IllegalArgumentException when setting a label longer than 32 letters" )
      public void shouldThrowExceptionWhenSettingLongLabels() {
        final LightBox box = new LightBox();
        assertThrows( IllegalArgumentException.class, () -> box.setLabel( "123456789 123456789 123456789 123" ) );
      }

      /* Other tests removed for brevity */
    }
    ```

1. Solution

    ```java
    package demo;

    import com.google.common.base.Preconditions;
    import com.google.common.base.Strings;

    public class LightBox extends Box {

      @Override public void setLabel( final String label ) {
        Preconditions.checkArgument( Strings.nullToEmpty( label ).length() <= 32 );
        super.setLabel( label );
      }

      /* Other members removed for brevity */
    }
    ```

### The `final` keyword

Java allows a class to extend another by default.  This can be prevented by the `final` keyword.

```java
package demo;

/* Imports removed for brevity */

public final class LightBox extends Box {

  /* Members removed for brevity */
}
```

The `LightBox` class cannot be extended.

### Private Constructor

Constructors can be `private` and if all constructors of a class are `private`, then this class cannot be extended.

[Effective Java](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/) - [Item 4: Enforce noninstantiability with a private constructor](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/ch2.xhtml#lev4)

## Abstraction

Both the `LightBox` and the `HeavyBox` have the `isEmpty()` method which does the something for both types of boxes.  All types of boxes can be empty or non-empty.  Given that all boxes can be empty, can we move this method to the `Box` super class.

The `Box` class does not have enough information to determine whether it is empty or not.  The sub-classes use different mechanism to determine whether they are empty or not.

1. The `LightBox` make use of the `empty` field
1. The `HeavyBox` delegates this to the `items` (`List`) field

```java
package demo;

/* Imports removed for brevity */

public abstract class Box {

  public abstract boolean isEmpty();

  /* Other members removed for brevity */
}
```

### When a class must be abstract?

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

### Final Classes

A class that is marked `final` cannot be extended.  Therefore, a `final` class cannot be abstract.

## The Object Class

**Pending...**

[Effective Java](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/) - [Item 11: Always override hashCode when you override equals](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/ch3.xhtml#lev11)

## Interfaces

**Pending...**

[Effective Java](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/) - [Item 20: Prefer interfaces to abstract classes](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/ch3.xhtml#lev20)

## instanceof and cast operators

**Pending...**

## Inheritance and Composition

**Pending...**

[Effective Java](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/) - [Item 18: Favor composition over inheritance](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/ch3.xhtml#lev18)

## Overloading and Overriding

**Pending...**

[Effective Java](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/) - [Item 52: Use overloading judiciously](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/ch8.xhtml#lev52)

## Outer, Inner and Anonymous Classes

**Pending...**

## Annotations

**Pending...**

[Effective Java](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/) - [Item 39: Prefer annotations to naming patterns](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/ch3.xhtml#lev39)

## Generics

**Pending...**

Are not 100% Erased

```java
package demo;

import java.util.concurrent.Callable;

public class PiCallable implements Callable<Double> {

  @Override public Double call() {
    return Math.PI;
  }
}
```

```bash
$ ./gradlew clean build
```

```bash
javap build/classes/java/main/demo/PiCallable.class
Compiled from "PiCallable.java"
public class demo.PiCallable implements java.util.concurrent.Callable<java.lang.Double> {
  public demo.PiCallable();
  public java.lang.Double call();
  public java.lang.Object call() throws java.lang.Exception;
}
```

Some generic information is retained for linking purposes, otherwise the compiler will not be able to determine whether this is the correct generic.

```java
public void readDouble(Callable<Double> callable) { /**/ }
```

Generics need to be backward compatible and need to support raw types.  That's why we have two versions of the `call()` method.

```java
public void linkToRawType(Callable callable) { /**/ }
```

## Miscellaneous

Objects have two words headers

1. Mark word
    1. For locking object
        1. Unlocked
        1. Biased
        1. Lightweight Locked
        1. Heavyweight Locked
    1. During Garbage Collection
1. Klass word
    A pointer to where the class metadata is located.  Before Java 8, this was the *permgem* (within the *Java Heap*).  In Java 8 this was migrated to *metaspace*, outside the *Java Heap*.
    
    Note that this pointer is not pointing to an object.

Arrays have three words
    1. Mark word
    1. Klass word
    1. The length of the array.
