---
layout: default
title: Arrays
parent: Collections
nav_order: 1
has_children: true
permalink: docs/collections/arrays/
---

# Arrays
{: .no_toc }

An array is a contiguous collection of homogeneous elements that can be accessed using an index.  By contiguous, we mean the elements of the array are adjacent to one another in memory with no gaps between them.  Arrays are static data structures, were their size is defined at initialisation and cannot be changed.

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Arrays Declaration

To declare an array we use square brackets (`[]`) after the type of the elements we will store in array.  The following code fragment shows an _`int` array_ (or as some times is referred to, _an array of type `int`_).

```java
int[] a;
```

Alternatively, the square brackets can be placed after the variable name instead of the type, as shown in the following code fragment.

```java
int a[];
```

## Create Arrays

Create an integer array of 5 elements and initialise it.

```java
package demo;

public class App {
  public static void main( final String[] args ) {
    final int[] a = { 1, 2, 3, 4, 5 };
    System.out.printf( "Array of int: %s%n", a );
  }
}
```

The above will print the following (meaningless) string.

```bash
Array of int: [I@279f2327
```

Use [Arrays.toString()](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/Arrays.html#toString(int%5B%5D)) to convert the array to a string

```java
package demo;

public class App {
  public static void main( final String[] args ) {
    final int[] a = { 1, 2, 3, 4, 5 };
    System.out.printf( "Array of int: %s%n", Arrays.toString( a ) );
  }
}
```

The program will now print the array's elements, as shown next.

```bash
Array of int: [1, 2, 3, 4, 5]
```

The above example did not make use of the `new` keyword, yet an object of type array is created.  This is one of the few exceptions where objects are created without using the `new` keyword.

Alternative methods of array creation

1. Use the `new` operator and provide the array's length

   ```java
   package demo;

   import java.util.Arrays;

   public class App {
     public static void main( final String[] args ) {
       final int[] a = new int[5];
       System.out.printf( "Array of int: %s%n", Arrays.toString( a ) );
     }
   }
   ```

   The array is filled with the data type default value, `0` for numbers.

   ```bash
   Array of int: [0, 0, 0, 0, 0]
   ```

1. Use the `new` operator and provide the values too.

   ```java
   package demo;

   import java.util.Arrays;

   public class App {
     public static void main( final String[] args ) {
       final int[] a = new int[] { 1, 2, 3, 4, 5 };
       System.out.printf( "Array of int: %s%n", Arrays.toString( a ) );
     }
   }
   ```

   Output

   ```bash
   Array of int: [1, 2, 3, 4, 5]
   ```

   {% include custom/note.html details="The above example did not include the array's length.  The following code fragment makes use of invalid syntax and will not compile." %}

   ```java
   final int[] a = new int[5] { 1, 2, 3, 4, 5 };
   ```

### Can we create and pass arrays to a method on the fly?

**YES**

When creating and passing array to a method, the `new` keyword needs to be used.  Consider the following example.

{% include custom/dose_not_compile.html %}

```java
package demo;

public class App {
  public static void main( final String[] args ) {
    final int a = last( { 1, 2, 3, 4, 5 } );
    System.out.printf( "The last element of the array is %d%n", a );
  }

  private static int last( final int[] a ) {
    return a[a.length - 1];
  }
}
```

When creating arrays and passing them directly to methods as shown above, the `new` keyword needs to be used.

```java
package demo;

public class App {
  public static void main( final String[] args ) {
    final int a = last( new int[] { 1, 2, 3, 4, 5 } );
    System.out.printf( "The last element of the array is %d%n", a );
  }

  private static int last( final int[] a ) {
    return a[a.length - 1];
  }
}
```

The above will now work and print.

```bash
The last element of the array is 5
```

### Can we create a new array and use a different initial value?

**YES** (but not directly)

The [Arrays.fill()](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/Arrays.html#fill(int%5B%5D,int)) method can be used to fill an array with a set of values, as shown in the following example.

```java
package demo;

import java.util.Arrays;

public class App {
  public static void main( final String[] args ) {
    final int[] a = new int[5];
    Arrays.fill( a, 1 );
    System.out.printf( "Array of int: %s%n", Arrays.toString( a ) );
  }
}
```

The `int` array is filled with the value of `1`.

```bash
Array of int: [1, 1, 1, 1, 1]
```

## Working with Arrays

1. Access each element by its index (zero based)

   ```java
   package demo;

   import java.util.Arrays;

   public class App {
     public static void main( final String[] args ) {
       final int[] a = new int[] { 1, 2, 3, 4, 5 };
       a[0] = 7;
       a[1]++;
       a[2] += 2;

       System.out.printf( "Array of int: %s%n", Arrays.toString( a ) );
     }
   }
   ```

   The above will print.

   ```bash
   Array of int: [7, 3, 5, 4, 5]
   ```

1. Modify all arrays's elements

   ```java
   package demo;

   import java.util.Arrays;

   public class App {
     public static void main( final String[] args ) {
       final int[] a = new int[] { 1, 2, 3, 4, 5 };

       /* Increment all elements by two */
       a[0] += 2;
       a[1] += 2;
       a[2] += 2;
       a[3] += 2;
       a[4] += 2;

       System.out.printf( "Array of int: %s%n", Arrays.toString( a ) );
     }
   }
   ```

   Output

   ```bash
   Array of int: [3, 4, 5, 6, 7]
   ```

   The above example does not scale well.  Imagine updating an array of 100 elements.  A for-loop is a better fit for this task.

   ```java
   package demo;

   import java.util.Arrays;

   public class App {
     public static void main( final String[] args ) {
       final int[] a = new int[] { 1, 2, 3, 4, 5 };

       /* Increment all elements by two */
       for ( int i = 0; i < a.length; i++ ) {
         a[i] += 2;
       }

       System.out.printf( "Array of int: %s%n", Arrays.toString( a ) );
     }
   }
   ```

   This program will produce the same result and scales better.

### Can we manipulate an array using the foreach loop?

**NO**

The [foreach loop]({{ '/docs/control-flow/' | absolute_url }}) cannot be used to manipulate the elements of an array.  Consider the following example.

```java
package demo;

import java.util.Arrays;

public class App {

  public static void main( final String[] args ) {
    final int[] a = new int[] { 1, 2, 3, 4, 5 };

    /* ⚠️ This will not increment the array's elements as one would expect */
    for ( int i : a ) {
      i += 2;
    }

    System.out.printf( "Array of int: %s%n", Arrays.toString( a ) );
  }
}
```

The array `a` elements are left unchanged after the loop and will print.

```bash
Array of int: [1, 2, 3, 4, 5]
```

The example shown above is equivalent to the following example that makes use of the normal for-loop.

```java
package demo;

import java.util.Arrays;

public class App {

  public static void main( final String[] args ) {
    final int[] a = new int[] { 1, 2, 3, 4, 5 };

    for ( int i = 0; i < a.length; i++ ) {
      int x = a[i];
      /* ⚠️ This only increments x and not the array element */
      x += 2;
    }

    System.out.printf( "Array of int: %s%n", Arrays.toString( a ) );
  }
}
```

## Read past the array's length

Consider the following example.

{% include custom/compile_but_throws.html e="ArrayIndexOutOfBoundsException" %}

```java
package demo;

public class App {
  public static void main( final String[] args ) {
    final int[] a = new int[] { 1, 2, 3, 4, 5 };

    /* ⚠️ Throws ArrayIndexOutOfBoundsException */
    a[a.length] = 10;
  }
}
```

The program will compile but then will throw an `ArrayIndexOutOfBoundsException` as the last element of the array is at index `4`.

```bash
Exception in thread "main" java.lang.ArrayIndexOutOfBoundsException: Index 5 out of bounds for length 5
    at demo.App.main(App.java:8)
```

Array's range is always between `0` (inclusive) and the array's length (exclusive).

## Two dimensional array

Java supports multidimentional arrays.  Consider the following example.

```java
package demo;

public class App {
  public static void main( final String[] args ) {
    final int[][] a = {
      { 1, 2, 3 },
      { 4, 5, 6 },
      { 7, 8, 9 }
    };

    for ( int i = 0; i < a.length; i++ ) {
      for ( int j = 0; j < a[i].length; j++ ) {
        System.out.printf( "a[%d][%d]=%d%n", i, j, a[i][j] );
      }
      System.out.println();
    }
  }
}
```

The above example creates a two-dimensional array, a matrix, and iterate over each element.

Output

```bash
a[0][0]=1
a[0][1]=2
a[0][2]=3

a[1][0]=4
a[1][1]=5
a[1][2]=6

a[2][0]=7
a[2][1]=8
a[2][2]=9
```

## Irregular Arrays

Multi-dimensional arrays can be irregular.  This means that the arrays have different lengths.  Consider the following example.

```java
package demo;

public class App {
  public static void main( final String[] args ) {
    final int[][] a = {
      { 1, 2, 3, 4 },
      { 5, 6 },
      { 7, 8, 9 }
    };

    for ( int i = 0; i < a.length; i++ ) {
      for ( int j = 0; j < a[i].length; j++ ) {
        System.out.printf( "a[%d][%d]=%d%n", i, j, a[i][j] );
      }
      System.out.println();
    }
  }
}
```

The first array, has 4 elements, while the second array has only 2.  The nested for-loop still works as expected, as `j` will stop when it reaches the length of the current row (`j < a[i].length`).

The above code will print the following.

```bash
a[0][0]=1
a[0][1]=2
a[0][2]=3
a[0][3]=4

a[1][0]=5
a[1][1]=6

a[2][0]=7
a[2][1]=8
a[2][2]=9
```

## Arrays are reference types

Arrays are reference types.  Like any other reference type, modifying an array from one variable will effect all other variables pointing to the same array.  Consider the following example.

```java
package demo;

import java.util.Arrays;

public class App {
  public static void main( final String[] args ) {
    int[] a = { 1, 2, 3, 4, 5 };
    int[] b = a;
    b[0] = 10;

    System.out.printf( "Array a contains: %s%n", Arrays.toString( a ) );
    System.out.printf( "Array b contains: %s%n", Arrays.toString( b ) );
  }
}
```

Both variables, `a` and `b`, are pointing to the same object in the Java heap.  Modifying the array from either variable will effect both as shown in the following output.

```bash
Array a contains: [10, 2, 3, 4, 5]
Array b contains: [10, 2, 3, 4, 5]
```

## Arrays are always mutable

{% include custom/note.html details="Making and array variable <code>final</code> does not make the array immutable" %}

```java
package demo;

import java.util.Arrays;

public class App {
  public static void main( final String[] args ) {
    final int[] a = { 1, 2, 3, 4, 5 };
    a[0] = 10;

    System.out.printf( "Array of int: %s%n", Arrays.toString( a ) );
  }
}
```

Output

```bash
Array of int: [10, 2, 3, 4, 5]
```

{% include custom/note.html details="Java arrays are always mutable and there is nothing preventing that." %}

[Effective Java](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/) recommends using lists instead of arrays in [Item 28: Prefer lists to arrays](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/ch5.xhtml#lev28).  A `List`, different from an array, can be immutable.

## Defensive Copying

Defensive copying is a technique which mitigates the negative effects caused by unintentional (_or intentional_) modifications of shared objects.  Instead of sharing the reference to the original object, we create a new object and share the reference to the newly created copy of it.  Thus, any modification made to the copy will not affect the original object.

Consider the following example.

```java
package demo;

import java.util.Arrays;

public class Data {

  private final int[] sample;

  public Data( final int[] sample ) {
    this.sample = sample;
  }

  public int[] getSample() {
    return sample;
  }

  @Override
  public String toString() {
    return String.format( "Data: %s", Arrays.toString( sample ) );
  }
}
```

The `Data` class holds a set of sample measurements, as an array of `int`, named `sample`.  This array of `int` can be modified from outside the data objects, thus **breaking encapsulation**.

The `Data` class should not be effected by changes made to the source past its creation.  The `Data` class should not be immune from side effects.  Consider the following test class.

```java
package demo;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class DataTest {

  @Test
  @DisplayName( "should be immune from side effects after the object is created" )
  public void shouldBeImmuneToSideEffectsPastCreation() {
    final int[] source = { 1, 2, 3, 4, 5 };
    final Data data = new Data( source );

    /* The value of the first element should be 1 */
    assertEquals( 1, data.getSample()[0] );

    /* Modify the source after passing creating the Data object */
    source[0] = 10;

    /* Verify that the value of the first element is still 1 */
    assertEquals( 1, data.getSample()[0] );
  }
}
```

The above test will fail.

```bash
DataTest > should be immune from side effects after the object is created FAILED
    org.opentest4j.AssertionFailedError at DataTest.java:21
```

The array within the `Data` class was affected when the source array was modified from outside.

```bash
org.opentest4j.AssertionFailedError:
Expected :1
Actual   :10
```

The following example demonstrate that the side effects are also observed when the sample returned by the `getSample()` is modified.

```java
package demo;

public class App {
  public static void main( final String[] args ) {
    final Data data = new Data( new int[] { 1, 2, 3, 4, 5 } );

    /* Modifying the sample returned by the data object */
    final int[] sample = data.getSample();
    sample[2] = 30;

    System.out.printf( "%s%n", data );
  }
}
```

Output

```bash
Data: [10, 2, 30, 4, 5]
```

When in doubt always write a test, as the test will stay with the code and can be used as documentation.

```java
package demo;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class DataTest {

  @Test
  @DisplayName( "should be immune from side effects after the object is created" )
  public void shouldBeImmuneToSideEffectsPastCreation() { /* ... */ }

  @Test
  @DisplayName( "should be immune from side effects after the sample data is returned" )
  public void shouldBeImmuneToSideEffectsPastReturningData() {
    final Data data = new Data( new int[] { 1, 2, 3, 4, 5 } );

    /* The value of the first element should be 1 */
    assertEquals( 1, data.getSample()[0] );

    /* Modify the array after retrieving it from the data */
    final int[] sample = data.getSample();
    sample[0] = 10;

    /* Verify that the value of the first element is still 1 */
    assertEquals( 1, data.getSample()[0] );
  }
}
```

This problem can be prevented using defensive copying.  Consider the following example.

```java
package demo;

import java.util.Arrays;

public class Data {

  private final int[] sample;

  public Data( final int[] sample ) {
    this.sample = Arrays.copyOf( sample, sample.length );
  }

  public int[] getSample() {
    return Arrays.copyOf( sample, sample.length );
  }

  @Override
  public String toString() {
    return String.format( "Data: %s", Arrays.toString( sample ) );
  }
}
```

The [`copyOf()`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/Arrays.html#copyOf(int%5B%5D,int)) method define in the [`Arrays`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/Arrays.html) class creates a new array of the same size and copies the elements from the source array to the newly created copy.

Running the same tests now, will pass.

{% include custom/note.html details="We are creating a copy when the array is received and another copy every time the array is returned." %}

[Effective Java](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/) talks about defensive copying in [Item 50: Make defensive copies when needed](https://www.oreilly.com/library/view/effective-java-3rd/9780134686097/ch8.xhtml#lev50) and describes how this can be used to protect against unexpected side effects.

## Arrays of Objects

1. Arrays are objects

    ```java
    package demo;

    import java.lang.reflect.Array;

    public class App {
      public static void main( final String[] args ) {
        final int[] a = { 1, 2, 3, 4, 5 };
        final Object b = a;
        System.out.printf( "Array of %d elements%n", Array.getLength( b ) );
      }
    }
    ```

    Output

    ```bash
    Array of 5 elements
    ```

1. An array of objects can hold any type

    **⚠️ PROCEED WITH CAUTION!!**

    ```java
    package demo;

    import java.util.Arrays;

    public class App {
      public static void main( final String[] args ) {
        final Object[] a = new Object[5];
        a[0] = "A String";
        a[1] = 21; /* Integer */
        a[2] = 42L; /* Long */
        a[3] = true; /* Boolean */
        a[4] = 'c'; /* Character */
        System.out.printf( "Array: %s%n", Arrays.toString( a ) );
      }
    }
    ```

    Output

    ```bash
    Array: [A String, 21, 42, true, c]
    ```

1. A word of caution

    **⚠️ PROCEED WITH CAUTION!!**

    ```java
    package demo;

    public class App {
      public static void main( final String[] args ) {
        final Object[] a = new Long[5];

        /* Throws ArrayStoreException!! */
        a[0] = "A String";
      }
    }
    ```

    An array of object can be instantiated with any other array, but then can only accept types of that type.  The above will fail.

    ```bash
    Exception in thread "main" java.lang.ArrayStoreException: java.lang.String
      at demo.App.main(App.java:6)
    ```

## Working title!!

Does not work

```java
char[] a = {'a', 'b', 'c'};
Object[] b = a;
```

## Sorting and searching arrays

1. Sorting and Searching

    ```java
    package demo;

    import java.util.Arrays;

    public class App {
      public static void main( final String[] args ) {
        final int[] a = { 9, 10, 2, 5, 12 };
        Arrays.sort( a );

        final int b = Arrays.binarySearch( a, 9 );
        final int c = Arrays.binarySearch( a, 4 );

        System.out.printf( "Sorted array a: %s%n", Arrays.toString( a ) );
        System.out.printf( "Index of 9: %d%n", b );
        System.out.printf( "Index of 4: %d%n", c );
      }
    }
    ```

    Output

    ```bash
    Sorted array a: [2, 5, 9, 10, 12]
    Index of 9: 2
    Index of 4: -2
    ```

    The negative number indicates that the number is not in the array.  The number also indicates where the item can be inserted to maintain a sorted array.  The number 4 needs to b inserted in position `1`, that it `1 + the negative index`.

1. Searching on an unsorted array may produce unexpected results

    **⚠️ PROCEED WITH CAUTION!!**

    ```java
    package demo;

    import java.util.Arrays;

    public class App {
      public static void main( final String[] args ) {
        final int[] a = { 9, 10, 2, 5, 12 };

        /* Search on an unsorted array */
        final int b = Arrays.binarySearch( a, 9 );
        final int c = Arrays.binarySearch( a, 4 );

        System.out.printf( "Sorted array a: %s%n", Arrays.toString( a ) );
        System.out.printf( "Index of 9: %d%n", b );
        System.out.printf( "Index of 4: %d%n", c );
      }
    }
    ```

    Output

    ```bash
    Sorted array a: [9, 10, 2, 5, 12]
    Index of 9: -5
    Index of 4: -4
    ```

    The binary search was not able to find `9`, and provided the wrong insertion point for the value `4`.

## An array of characters is not a String

Unlike in some other programming languages, such as C, an array of `char` is not a `String` ([JLS-10.9](https://docs.oracle.com/javase/specs/jls/se14/html/jls-10.html#jls-10.9)).

```java
package demo;

public class App {
  public static void main( final String[] args ) {
    final String s = "Hello";
    final char[] a = { 'H', 'e', 'l', 'l', 'o' };

    System.out.printf( "Are these two equal? %s%n", s.equals( a ) );
  }
}
```

Strings (or char arrays) in Java are terminated by the `'\u0000'` (`NUL`) character.

A `String` object is immutable but an array of `char` is mutable (as discussed in the [arrays are always mutable](#arrays-are-always-mutable) section).

The [`String` class has a char array constructor](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/lang/String.html#%3Cinit%3E(char%5B%5D)) and a [`toCharArray()` method](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/lang/String.html#toCharArray()) that returns an array of characters containing the same character sequence as a `String`.  Modifying the source to the constructor or the returned value will not effect the string.

Consider the following example.

```java
package demo;

import java.util.Arrays;

public class App {
  public static void main( final String[] args ) {
    final char[] source = { 'H', 'e', 'l', 'l', 'o' };
    final String s = new String( source );

    /* Modify the source array */
    source[1] = 'E';

    System.out.printf( "Source %s%n", Arrays.toString( source ) );
    System.out.printf( "String %s%n", s );
  }
}
```

The above will always print.

```bash
Source [H, E, l, l, o]
String Hello
```
