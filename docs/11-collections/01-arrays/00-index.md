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

An [array](https://docs.oracle.com/javase/specs/jls/se14/html/jls-10.html) is a contiguous collection of homogeneous elements that can be accessed using an index.  By contiguous, we mean the elements of the array are adjacent to one another in memory with no gaps between them.  Arrays are static data structures, were their size is defined at initialisation and cannot be changed.

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Arrays declaration

To declare an array we use square brackets (`[]`) after the type of the elements we will store in array.  The following code fragment shows an _`int` array_ (or as sometimes is referred to, _an array of type `int`_).

```java
int[] a;
```

Alternatively, the square brackets can be placed after the variable name instead of the type, as shown in the following code fragment.

```java
int a[];
```

## Create arrays

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

   The array is filled with the data type default value, `0` for numeric primitives (including `char`).

   ```bash
   Array of int: [0, 0, 0, 0, 0]
   ```

1. Use the `new` operator and provide the values too.

   {% include custom/note.html details="The following example is not including the array's length." %}

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

   {% include custom/dose_not_compile.html %}

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
    final boolean empty = isEmpty( { 1, 2, 3, 4, 5 } );
    System.out.printf( "Is the array empty? %s%n", empty );
  }

  private static boolean isEmpty( final int[] array ) {
    return array.length == 0;
  }
}
```

When creating arrays and passing them directly to methods as shown above, the `new` keyword needs to be used.

```java
package demo;

public class App {
  public static void main( final String[] args ) {
    final boolean empty = isEmpty( new int[] { 1, 2, 3, 4, 5 } );
    System.out.printf( "Is the array empty? %s%n", empty );
  }

  private static boolean isEmpty( final int[] array ) {
    return array.length == 0;
  }
}
```

The above will now work and print.

```bash
Is the array empty? false
```

### Can we create a new array and use a different default value?

**NO**

By default, the arrays are filled with `0` for primitive numeric types (including `char`), `false` in case of primitive `boolean` and `null` for all object types.  Please note that `int` array and `Integer` array are two different types or arrays.  The `int` array is an array of primitives, while the `Integer` array is an array of objects.  Consider the following example.

```java
package demo;

import java.util.Arrays;

public class App {

  public static void main( final String[] args ) {
    final int[] ints = new int[5];
    final Integer[] integers = new Integer[5];
    System.out.printf( "Array of int: %s%n", Arrays.toString( ints ) );
    System.out.printf( "Array of Integers: %s%n", Arrays.toString( integers ) );
  }
}
```

The above example will print.

```bash
Array of int: [0, 0, 0, 0, 0]
Array of Integers: [null, null, null, null, null]
```

We can fill an array with a value using the [Arrays.fill()](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/Arrays.html#fill(int%5B%5D,int)) method, as shown in the following example.

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

### Can an array contain elements of different types?

**NO**

We cannot create an array of `int` and put `long` in it.  With that said, we can store `char`, `short` and `byte` in an array of `int`.

```java
package demo;

import java.util.Arrays;

public class App {

  public static void main( final String[] args ) {
    final byte b = 1;
    final short s = 2;
    final char c = 'c'; /* ASCII 99 */
    final int i = 4;

    final int[] array = { b, s, c, i };
    System.out.printf( "Array of ints %s%n", Arrays.toString( array ) );
  }
}
```

{% include custom/note.html details="While the above may give the impression that the array contains different types, the contents of the arrays are considered as <code>int</code>." %}

We cannot create an array of `String`s and put numbers in it.

{% include custom/dose_not_compile.html %}

```java
package demo;

import java.util.Arrays;

public class App {

  public static void main( final String[] args ) {
    final Long number = 7L;

    /* ⚠️ Cannot add a number to an array of String!! */
    final String[] array = { number };
    System.out.printf( "Array of strings %s%n", Arrays.toString( array ) );
  }
}
```

## Working with arrays

An array contains a number of elements.  The number of elements may be zero, in which case the array is said to be empty.  The elements contained in an array have no names.  Instead, these are referenced by array access expressions that use non-negative integer index values. If an array has _n_ components, we say _n_ is the length of the array.  The elements of the array are referenced using integer indices from `0` to `n - 1`, inclusive ([JLS-10](https://docs.oracle.com/javase/specs/jls/se14/html/jls-10.html)).

Consider the following example.

```java
package demo;

public class App {
  public static void main( final String[] args ) {
    final int[] numbers = new int[] { 1, 2, 3, 4, 5 };
    final int first = numbers[0];
    final int last = numbers[numbers.length - 1];

    System.out.printf( "First element: %d%n", first );
    System.out.printf( "Last element:  %d%n", last );
  }
}
```

The first element in the array has an index of `0`, while the last element has an index of `length - 1`.

![One-Dimensional-Array.png]({{ '/assets/images/One-Dimensional-Array.png' | absolute_url }})

We can access each element by its index (zero based), as shown in the following example.

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

The above example is incrementing the contents of the array, `a[1]++` and `a[2] += 2`.  The above will print.

```bash
Array of int: [7, 3, 5, 4, 5]
```

We can modify all array's elements using the element's index as shown in the following example.

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

The above example will print

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

The [foreach-loop]({{ '/docs/control-flow/' | absolute_url }}) cannot be used to manipulate the elements of an array.  Consider the following example.

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

## Can we read past the array's length?

**NO**

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

## Two-dimensional array

Java supports multidimensional arrays.  Consider the following example.

```java
package demo;

public class App {
  public static void main( final String[] args ) {
    final int[][] a = {
      { 1, 2, 3 },
      { 4, 5, 6 },
      { 7, 8, 9 }
    };
  }
}
```

The above example creates a two-dimensional array of type `int`.  A two-dimensional array is simply an array of arrays.  In one-dimensional arrays, we accessed the array elements using one index.  We can do the same with two-dimensional arrays, as shown in the following image.

![Two-Dimensional Array]({{ '/assets/images/Two-Dimensional-Array-1.png' | absolute_url }})

The following example captures the above image.

```java
package demo;

import java.util.Arrays;

public class App {
  public static void main( final String[] args ) {
    final int[][] a = {
      { 1, 2, 3 },
      { 4, 5, 6 },
      { 7, 8, 9 }
    };

    final int[] lastRow = a[2];
    System.out.printf( "Last row: %s%n", Arrays.toString( lastRow ) );
  }
}
```

The array variable `a` contains arrays of `int` (`int[]`).  We can access the elements of two-dimensional directly without creating an intermediate variable (`lastRow` in the previous example), as shown next.

![Two-Dimensional Array]({{ '/assets/images/Two-Dimensional-Array-2.png' | absolute_url }})

With two-dimensional arrays, we need two indices to access individual elements.  The following example captures the above image.

```java
package demo;

import java.util.Arrays;

public class App {
  public static void main( final String[] args ) {
    final int[][] a = {
      { 1, 2, 3 },
      { 4, 5, 6 },
      { 7, 8, 9 }
    };

    System.out.printf( "The value at a[2][0] is: %d%n", a[2][0] );
  }
}
```

The element at indices `[2][0]` has a value of `7`, as shown next.

```bash
The value at a[2][0] is: 7
```

We can also iterate through the two-dimensional array, as shown in the following example.

```java
package demo;

import java.util.Arrays;

public class App {
  public static void main( final String[] args ) {
    final int[][] a = {
      { 1, 2, 3 },
      { 4, 5, 6 },
      { 7, 8, 9 }
    };

    for ( int i = 0; i < a.length; i++ ) {
      int[] row = a[i];
      System.out.printf( "a[%d] = %s%n", i, Arrays.toString( row ) );
    }
  }
}
```

The above example is only iterating on the first dimension of the array.  In fact, we are only using one index, `a[i]`.  The above example will print.

```bash
a[0] = [1, 2, 3]
a[1] = [4, 5, 6]
a[2] = [7, 8, 9]
```

We can iterate through both dimensions using two, nested, for-loops, as shown in the following example.

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
      final int[] row = a[i];

      for ( int j = 0; j < row.length; j++ ) {
        System.out.printf( "a[%d][%d]=%d%n", i, j, row[j] );
      }
      System.out.println();
    }
  }
}
```

The above example, a simplified version of multidimensional array iteration, prints the following.

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

You will rarely see the above code in production as we are creating an unnecessarily variable for simplicity.  The above example is usually written as shown next.

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

Both examples will produce the same result.  The second version removes the, unnecessary, `row` variable and used the `a[i]` directly instead, as shown in the following image.

![Two-Dimensional-Array-Iteration.png]({{ '/assets/images/Two-Dimensional-Array-Iteration.png' | absolute_url }})

## Irregular arrays

Multidimensional arrays can be irregular.  This means that the arrays have different lengths.  Consider the following example.

```java
package demo;

import java.util.Arrays;

public class App {
  public static void main( final String[] args ) {
    final int[][] a = {
      { 1, 2, 3, 4 },
      { 5, 6 },
      { 7, 8, 9 }
    };

    for ( int i = 0; i < a.length; i++ ) {
      final int[] row = a[i];
      System.out.printf( "a[%d] = %s%n", i, Arrays.toString( row ) );
    }
  }
}
```

The first array has 4 elements, while the second array has only 2 elements.  Multidimensional array is nothing more that an array of arrays.  Each nested array (also known as _inner array_) is an independent array which can have its own length.

We can iterate through irregular arrays in a similar fashion we did with regular arrays.

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

The nested for-loop still works as expected, as `j` will stop when it reaches the length of the current row (`j < a[i].length`).  The above code will print the following.

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

## Three (or more) dimensions

A multidimensional array is nothing more than an array of arrays.  We can have as many dimensions as we need, as each dimension will simply contain another array.  The following example shows a three-dimensional array.

```java
package demo;

public class App {
  public static void main( final String[] args ) {
    final int[][][] a = {
      {
        { 1 },
        { 2, 2 },
        { 3, 3, 3 },
        { 4, 4, 4, 4 }
      },
      {
        { 5 },
        { 6, 6 }
      },
      {
        { 7 },
        { 8, 8 },
        { 9, 9, 9 }
      }
    };

    for ( int i = 0; i < a.length; i++ ) {
      System.out.printf( "a[%d]%n", i );
      for ( int j = 0; j < a[i].length; j++ ) {
        System.out.printf( "  a[%d][%d]%n", i, j );
        for ( int k = 0; k < a[i][j].length; k++ ) {
          System.out.printf( "    a[%d][%d][%d] = %d%n", i, j, k, a[i][j][k] );
        }
      }
    }
  }
}
```

The number of dimensions is defined by the number of nested curly brackets, as shown in the following image.

![Three-Dimensional-Array.png]({{ '/assets/images/Three-Dimensional-Array.png' | absolute_url }})

We need an index (the number of square brackets `[]`) for every dimension we have.  The previous example makes use of a three-dimensional array.  This means that we need three indices to access each element.

```java
a[i][j][k]
```

The first index refers to the first dimension, as shown next.

![Three Dimensional Array]({{ '/assets/images/Three-Dimensional-Array-1.png' | absolute_url }})

The second index refers to the second dimension.

![Three Dimensional Array]({{ '/assets/images/Three-Dimensional-Array-2.png' | absolute_url }})

The third index points to the actual value.

![Three Dimensional Array .png]({{ '/assets/images/Three-Dimensional-Array-3.png' | absolute_url }})

We drew a two-dimensional array using a table in the [previous section](#two-dimensional-array).  A three-dimensional array can be represented as a cube, which is hard to draw in a meaningful manner.  Trees are an alternative way to draw multidimensional arrays.  The above example prints the three-dimensional array as a tree, as shown next.

```bash
a[0]
  a[0][0]
    a[0][0][0] = 1
  a[0][1]
    a[0][1][0] = 2
    a[0][1][1] = 2
  a[0][2]
    a[0][2][0] = 3
    a[0][2][1] = 3
    a[0][2][2] = 3
  a[0][3]
    a[0][3][0] = 4
    a[0][3][1] = 4
    a[0][3][2] = 4
    a[0][3][3] = 4
a[1]
  a[1][0]
    a[1][0][0] = 5
  a[1][1]
    a[1][1][0] = 6
    a[1][1][1] = 6
a[2]
  a[2][0]
    a[2][0][0] = 7
  a[2][1]
    a[2][1][0] = 8
    a[2][1][1] = 8
  a[2][2]
    a[2][2][0] = 9
    a[2][2][1] = 9
    a[2][2][2] = 9
```

Multidimensional arrays are useful, especially in data science, but they are hard to visualise.

## Arrays are reference types

Arrays are reference types.  This means that arrays are objects.  Consider the following example.

```java
package demo;

import java.util.Arrays;

public class App {
  public static void main( final String[] args ) {
    final int[] numbers = { 1, 2, 3, 4, 5 };
    System.out.printf( "Numbers: %s%n", Arrays.toString( numbers ) );
  }
}
```

The above example creates an array of primitive `int`.  The array to which the variable `number` points is an object, and is found in the heap, as shown in the following diagram.

![Array - Stack and Heap]({{ '/assets/images/Array-Stack-Heap-1.png' | absolute_url }})

Like any other reference type, modifying an array from one variable will affect all other variables pointing to the same array.  Consider the following example.

```java
package demo;

import java.util.Arrays;

public class App {
  public static void main( final String[] args ) {
    final int[] a = { 1, 2, 3, 4, 5 };
    final int[] b = a;
    b[0] = 10;

    System.out.printf( "Array a contains: %s%n", Arrays.toString( a ) );
    System.out.printf( "Array b contains: %s%n", Arrays.toString( b ) );
  }
}
```

Both variables, `a` and `b`, are pointing to the same object in the Java heap.  Modifying the array from either variable will affect both as shown in the following output.

```bash
Array a contains: [10, 2, 3, 4, 5]
Array b contains: [10, 2, 3, 4, 5]
```

### How is an array of objects represented in the Java heap?

The array contains a collection of variables that can be accessed through the array's name and the index.  When creating an array of objects, the array will not contain the actual objects, but their address in the heap, like a reference type variable, as shown in the following diagram.

![Array - Stack and Heap]({{ '/assets/images/Array-Stack-Heap-2.png' | absolute_url }})

The array shown in the above example contains two strings.  In the Java heap, we will have three entries, one for each string, and another one for the array itself.  The array elements will simply point to the respective object in the Java heap.

The same concept applies when we deal with multidimensional arrays. An array is an object and like any other object it is saved in the heap.

### Can we add `null`s to arrays?

**It Depends**

Arrays are variables that can contain more than one value.  Primitive variables do not support `null`s.  Arrays of primitive types, such as `int[]`, cannot contain `null` and trying to assign `null` to an array of a primitive type will cause a compiler error.

{% include custom/dose_not_compile.html %}

```java
package demo;

import java.util.Arrays;

public class App {
  public static void main( final String[] args ) {
    final int[] numbers = { 1, 2, null, 4, 5 };
    System.out.printf( "Numbers: %s%n", Arrays.toString( numbers ) );
  }
}
```

The above will not work as we cannot set a primitive to `null`.

{% include custom/dose_not_compile.html %}

```java
package demo;

import java.util.Arrays;

public class App {
  public static void main( final String[] args ) {
    final int number = null;
    System.out.printf( "Number: %s%n", number );
  }
}
```

Both examples fail to compile for the same reason.

In Java, all reference types can be set to `null` and there is nothing, to-date, in the language that prevents that.  We can mark a variable as immutable using the final keyword, but we cannot mark a variable as non-`null`.  Other programming languages, such as [Kotlin](https://kotlinlang.org/docs/reference/null-safety.html), have mechanisms in-place to prevent `null`s.

```java
package demo;

import java.util.Arrays;

public class App {
  public static void main( final String[] args ) {
    final String name = null;
    System.out.printf( "Name: %s%n", name );
  }
}
```

In the above example, the `String` variable `name` is set to `null`.  We can do the same with an array of object, as set any element of the array to `null`.

```java
package demo;

import java.util.Arrays;

public class App {
  public static void main( final String[] args ) {
    final String[] names = { "Jade", null, "Aden" };
    System.out.printf( "Names: %s%n", Arrays.toString( names ) );
  }
}
```

The second element of the `String` array `names` is set to `null`

### Can we prevent `null`s from being added to an array?

**NO**

In Java, all reference types can be set to `null` and there is nothing, to-date, in the language that prevents that.  We can mark a variable as immutable using the final keyword, but we cannot mark a variable as non-`null`.  Other programming languages, such as [Kotlin](https://kotlinlang.org/docs/reference/null-safety.html), have mechanisms in-place to prevent `null`s.

If that's a requirement, then we need to create a wrapper class that encapsulates the array and checks before an item is added, as shown in the following example.

```java
package demo;

import java.lang.reflect.Array;
import java.util.Arrays;

import static com.google.common.base.Preconditions.checkNotNull;

public class NoNullsArray<T> {

  private final T[] array;

  public NoNullsArray( final Class<T> type, final int length, T initialValue ) {
    checkNotNull( initialValue );

    @SuppressWarnings( "unchecked" )
    final T[] array = (T[]) Array.newInstance( type, length );
    Arrays.fill( array, initialValue );

    this.array = array;
  }

  public NoNullsArray<T> set( final T value, final int index ) {
    checkNotNull( value );
    array[index] = value;
    return this;
  }

  public T get( final int index ) {
    return array[index];
  }

  @Override
  public boolean equals( final Object object ) {
    if ( this == object )
      return true;

    if ( !( object instanceof NoNullsArray ) )
      return false;

    final NoNullsArray<?> that = (NoNullsArray<?>) object;
    return Arrays.equals( array, that.array );
  }

  @Override
  public int hashCode() {
    return Arrays.hashCode( array );
  }

  @Override
  public String toString() {
    return Arrays.toString( array );
  }
}
```

The above example makes use of [generics]({{ '/docs/generics/' | absolute_url }}) and arrays, which is an advance topic.  Let's break down the above example.

1. We use generics so that we can use this generic class with any reference type

   ```java
   public class NoNullsArray<T> { /* ... */ }
   ```

1. The array type uses the type parameter

   ```java
     private final T[] array;
   ```

   The above will be replaced to an array of `Object` during [type erasure]({{ '/docs/generics/erasure/' | absolute_url }}).

1. The class constructor is a bit complicated.

   ```java
     public NoNullsArray( final Class<T> type, final int length, T initialValue ) {
       checkNotNull( initialValue );

       @SuppressWarnings( "unchecked" )
       final T[] array = (T[]) Array.newInstance( type, length );
       Arrays.fill( array, initialValue );

       this.array = array;
     }
   ```

   The array cannot contain `null`s, even when this is initialised.  When an array of `Object` is created, this is populated with `null`.  We need to overwrite this by initialising the array with a non-`null` value of the same type.

   We do not know the actual type of the array and thus we need to rely on reflection and the [`Array.newInstance()`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/lang/reflect/Array.html#newInstance(java.lang.Class,int)) method to create our array.

1. Setting the values of the array goes through the `set()` method which ensures that the new value is not `null`

   ```java
     public NoNullsArray<T> set( final T value, final int index ) {
       checkNotNull( value );
       array[index] = value;
       return this;
     }
   ```

Arrays are nothing then variables that can contain more than one value.  Any other behaviour needs to be achieved programmatically as shown above.

{% include custom/note.html details="The above example is not exposing (leaking) the array itself.  Arrays are always mutable, <a href='#arrays-are-always-mutable'>as we will see next</a>, and leaking the array property will undermine the above class." %}

## Arrays are always mutable

Consider the following example.

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

The `final` keyword indicates that a variable (and not the objects it points to) will not change its value.  In the above example, the variable `a` is assigned to an array of `int` and will always point to this array of `int` until it goes out of scope.  The array's elements can still change.

```bash
Array of int: [10, 2, 3, 4, 5]
```

{% include custom/note.html details="Java arrays are always mutable and there is nothing preventing that." %}

As we saw in [in a previous example, when we tried to prevent `null` from being added to arrays](#can-we-prevent-nulls-from-being-added-to-an-array), we need to wrap our array into a class that prevents mutability in order to prevent mutability.

[Effective Java](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/) recommends using lists instead of arrays in [Item 28: Prefer lists to arrays](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/ch5.xhtml#lev28).  A `List`, different from an array, can be immutable.

### Can we create a custom class to similar to `NoNullsArray` example to prevent mutability?

**NO NEED**

Java provides the [`Arrays.asList()`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/Arrays.html#asList(T...)) method that returns an immutable list.  We cannot modify the list once created and any attempts will throw a [`UnsupportedOperationException`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/lang/UnsupportedOperationException.html), as shown in the following example.

{% include custom/compile_but_throws.html e="UnsupportedOperationException" %}

```java
package demo;

import java.util.Arrays;
import java.util.List;

public class App {
  public static void main( final String[] args ) {
    final List<String> names = Arrays.asList( "Jade", "Aden" );

    /* ⚠️ Throws UnsupportedOperationException!! */
    names.add( "Mary" );

    System.out.printf( "Names: %s%n", names );
  }
}
```

[Java 9](https://openjdk.java.net/projects/jdk9) improved the [`List`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/List.html) interfaces and added several static methods, such as the [`of()`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/List.html#of(E...)) method, that active the same thing, as shown above, but using more efficient data structures.

{% include custom/compile_but_throws.html e="UnsupportedOperationException" %}

```java
package demo;

import java.util.List;

public class App {
  public static void main( final String[] args ) {
    final List<String> names = List.of( "Jade", "Aden" );

    /* ⚠️ Throws UnsupportedOperationException!! */
    names.add( "Mary" );

    System.out.printf( "Names: %s%n", names );
  }
}
```

The above example is more efficient that the previous example that relied on the `Arrays.asList()` method, as it does not create an array.  It simply creates a list of two elements and saves this in two variables, as shown in the following code.

{% include custom/note.html details="The following code fragment was copied from the <code>java.util.ImmutableCollections</code> class, part of the Java API." %}

```java
static final class List12<E> extends AbstractImmutableList<E> implements Serializable {

  private final E e0;
  private final E e1;

  List12(E e0) {
    this.e0 = Objects.requireNonNull(e0);
    this.e1 = null;
  }

  List12(E e0, E e1) {
    this.e0 = Objects.requireNonNull(e0);
    this.e1 = Objects.requireNonNull(e1);
  }

  /* Other methods removed for brevity */
}
```

## Defensive copying

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

The `Data` class should not be affected by changes made to the source past its creation.  The `Data` class should not be immune from side effects.  Consider the following test class.

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

{% include custom/note.html details="We are creating a copy when the array is received, and another copy every time the array is returned." %}

[Effective Java](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/) talks about defensive copying in [Item 50: Make defensive copies when needed](https://www.oreilly.com/library/view/effective-java-3rd/9780134686097/ch8.xhtml#lev50) and describes how this can be used to protect against unexpected side effects.

## Arrays in Java are covariant

As discussed in [the generics section]({{ '/docs/generics/variance/#covariance' | absolute_url }}), arrays in Java are covariant.  This means, that if `S` is a subtype of `T`, then `S[]` is a subtype of `T[]`.  Consider the following example.

{% include custom/proceed_with_caution.html %}

```java
package demo;

public class App {

  public static void main( final String[] args ) {
    /* Long is a Number */
    final Number[] a = new Long[5];

    /* String and StringBuilder are CharSequence */
    final CharSequence[] b = new String[5];
    final CharSequence[] c = new StringBuilder[5];
  }
}
```

Be very careful with covariance as this can lead to unforeseen problems.  Consider the following example.

{% include custom/compile_but_throws.html e="ArrayStoreException" %}

```java
package demo;

public class App {
  public static void main( final String[] args ) {
    final Object[] a = new Long[5];

    /* ⚠️ Throws ArrayStoreException!! */
    a[0] = "A String";
  }
}
```

An array of object can be instantiated with any other array type.  This is because arrays in Java are covariant.  This is quite dangerous as we are able to assign any value to the array as we saw able.  When doing so, the compiler will work but then it fails at runtime.

```bash
Exception in thread "main" java.lang.ArrayStoreException: java.lang.String
  at demo.App.main(App.java:6)
```

### Primitives are not objects

All classes inherit form the `Object` class, directly or indirectly.  Primitives do not take part of inheritance.  Therefore, while all arrays are covariant, primitive arrays have no alternative type, making them immune.  Consider the following example.

{% include custom/dose_not_compile.html %}

```java
package demo;

public class App {

  public static void main( final String[] args ) {
    /* ⚠️ Both of these are wrong!! */
    final int[] a = new char[5];
    final Object[] b = new char[5];
  }
}
```

The primitive `char`, is not an `Object`, thus it does not take part in any inheritance.  An array primitive type `P` is not a subtype of any other array of any other type.

## Sorting

Arrays can be sorted using the [`Arrays.sort()`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/Arrays.html#sort(int%5B%5D)) method, as shown next.

```java
package demo;

import java.util.Arrays;

public class App {
  public static void main( final String[] args ) {
    final int[] a = { 9, 10, 2, 5, 12 };
    Arrays.sort( a );

    System.out.printf( "Sorted array a: %s%n", Arrays.toString( a ) );
  }
}
```

The `sort()` is able to sort all primitives in ascending order, and all objects that implement [`Comparable`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/lang/Comparable.html).  Strings, for example, implement `Comparable` and can be sorted using the `Arrays.sort()`, as shown in the following example.

```java
package demo;

import java.util.Arrays;

public class App {

  public static void main( final String[] args ) {
    final String[] names = { "Jade", "Aden", "Mary", "John" };
    System.out.printf( "Before sorting: %s%n", Arrays.toString( names ) );

    Arrays.sort( names );
    System.out.printf( "After sorting: %s%n", Arrays.toString( names ) );
  }
}
```

### What will happen if we sort an array that is not `Comparable`?

The `Arrays.sort()` cannot sort objects that do not implement `Comparable`.  Consider the following example.

{% include custom/compile_but_throws.html e="ClassCastException" %}

```java
package demo;

import java.awt.Point;
import java.util.Arrays;

public class App {

  public static void main( final String[] args ) {
    final Point[] points = {
      new Point( 2, 3 ),
      new Point( 4, 1 ),
      new Point( 1, 4 ),
      new Point( 1, 2 )
    };
    System.out.printf( "Before sorting: %s%n", Arrays.toString( points ) );

    Arrays.sort( points );
    System.out.printf( "After sorting: %s%n", Arrays.toString( points ) );
  }
}
```

The above example will fail with a `ClassCastException`, as shown next.

```bash
Before sorting: [java.awt.Point[x=2,y=3], java.awt.Point[x=4,y=1], java.awt.Point[x=1,y=4], java.awt.Point[x=1,y=2]]
Exception in thread "main" java.lang.ClassCastException: class java.awt.Point cannot be cast to class java.lang.Comparable (java.awt.Point is in module java.desktop of loader 'bootstrap'; java.lang.Comparable is in module java.base of loader 'bootstrap')
	at java.base/java.util.ComparableTimSort.countRunAndMakeAscending(ComparableTimSort.java:320)
	at java.base/java.util.ComparableTimSort.sort(ComparableTimSort.java:188)
	at java.base/java.util.Arrays.sort(Arrays.java:1040)
	at demo.App.main(App.java:17)
```

### Can we determine how the array elements are to be sorted?

**YES**

The `Arrays.sort()` can take an instance of [`Comparator`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/Comparator.html) of a supertype of the type being sorted.  Using the `Comparator`, the `Array.sort()` method can determine what should come before what and sort the given array accordingly.

**What does this mean?**

A similar example was already discuss in a [previous section]({{ '/docs/generics/variance/#sorting-a-collection' | absolute_url }}).

Consider the following `Person` class.

```java
package demo;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.apache.commons.lang3.StringUtils;

@Data
@AllArgsConstructor
public class Person implements Comparable<Person> {

  private final String name;

  @Override
  public int compareTo( final Person that ) {
    return StringUtils.compareIgnoreCase( this.name, that.name );
  }
}
```

The `Person` class implements `Comparable` of type `Person` (`implements Comparable<Person>`).  Now consider the `Employee` class that extends the `Person` class, shown next.

```java
package demo;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Data
@EqualsAndHashCode( callSuper = false )
@ToString( callSuper = true, includeFieldNames = true )
public class Employee extends Person {

  private final String employeeNumber;

  public Employee( final String name, final String employeeNumber ) {
    super( name );
    this.employeeNumber = employeeNumber;
  }
}
```

The `Employee` class extends `Person` but does not implement `Comparable`.  The `Employee` class is a `Person` and also is a `Comparable<Person>`.

```java
package demo;

public class App {

  public static void main( final String[] args ) {
    final Employee a = new Employee( "Albert", "JVM-0110" );
    final Person b = new Employee( "Albert", "JVM-0110" );
    final Comparable<Person> c = new Employee( "Albert", "JVM-0110" );
    final Object d = new Employee( "Albert", "JVM-0110" );
  }
}
```

Each assignment is explained next.

* An `Employee` is an `Employee`

   ```java
       final Employee a = new Employee( "Albert", "JVM-0110" );
   ```

* An `Employee` is an `Person`, as `Employee` inherits from `Person`

   ```java
       final Person b = new Employee( "Albert", "JVM-0110" );
   ```

* An `Employee` is a `Comparable<Person>` transitively.  `Employee` inherits from `Person`, which in turn implements `Comparable<Person>`

   ```java
       final Comparable<Person> c = new Employee( "Albert", "JVM-0110" );
   ```

* Everything in Java is an `Object`

   ```java
       final Object d = new Employee( "Albert", "JVM-0110" );
   ```

We can sort an array of employees, because the `Employee` (`T`) implements a `Comparable` of its supertype, `Person`, (`Comparable<? super T>`).  Following is an example.

```java
package demo;

import java.util.Arrays;

public class App {

  public static void main( final String[] args ) {
    final Employee[] employees = new Employee[] {
      new Employee( "Mary", "ENG-0700" ),
      new Employee( "James", "MNG-0906" )
    };

    Arrays.sort( employees );
    Arrays.stream( employees ).forEach( System.out::println );
  }
}
```

The employees are sorted using the `Person`'s comparator as shown next.

```bash
Employee(super=Person(name=James), employeeNumber=MNG-0906)
Employee(super=Person(name=Mary), employeeNumber=ENG-0700)
```

## Searching

{% include custom/note.html details="Binary search depends on the array being sorted.  The binary search algorithm may not work if the given array is not sorted and may produce unexpected results." %}

The `Arrays` class provides the [`binarySearch()`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/Arrays.html#binarySearch(int%5B%5D,int)) method that takes two parameters, the array to search in and a criterion (also referred to as _key_), and returns the index of the element if found.  If the given criterion is not found, the method returns a negative number hinting where the criterion can be inserted while keeping the array sorted.

As the method name indicates, the `binarySearch()` method uses the [binary search algorithm](https://en.wikipedia.org/wiki/Binary_search_algorithm), which has a performance of _log(n)_.

Consider the following example.

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

The above example will print.

```bash
Sorted array a: [2, 5, 9, 10, 12]
Index of 9: 2
Index of 4: -2
```

The negative number indicates that the number is not in the array.  The number also indicates where the item can be inserted to maintain a sorted array.  The number 4 needs to be inserted in position `1`, that is `1 + the negative index`.  This offset is required as `0` is an existing index and `-0` is not a number.

Searching on an unsorted array may produce unexpected results.  Consider the following example.

{% include custom/proceed_with_caution.html %}

```java
package demo;

import java.util.Arrays;

public class App {
  public static void main( final String[] args ) {
    final int[] a = { 9, 10, 2, 5, 12 };

    /* ⚠️ Search on an unsorted array */
    final int b = Arrays.binarySearch( a, 9 );
    final int c = Arrays.binarySearch( a, 4 );

    System.out.printf( "Sorted array a: %s%n", Arrays.toString( a ) );
    System.out.printf( "Index of 9: %d%n", b );
    System.out.printf( "Index of 4: %d%n", c );
  }
}
```

Different to what one would expect, the value `9` was not found in the array despite this exit, as shown next.

```bash
Sorted array a: [9, 10, 2, 5, 12]
Index of 9: -5
Index of 4: -4
```

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

The [`String` class has a char array constructor](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/lang/String.html#%3Cinit%3E(char%5B%5D)) and a [`toCharArray()` method](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/lang/String.html#toCharArray()) that returns an array of characters containing the same character sequence as a `String`.  Modifying the source to the constructor or the returned value will not affect the string.

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
