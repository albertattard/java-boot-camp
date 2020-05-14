# Collections

## TOC

1. [Setup](#setup)
1. [Arrays](#arrays)
    1. [Create Arrays](#create-arrays)
        1. [Puzzle (ABC)](#puzzle-abc)
    1. [Working with Arrays](#working-with-arrays)
    1. [Read past the array's length](#read-past-the-arrays-length)
    1. [Multidimensional Arrays](#multidimensional-arrays)
        1. [Two dimensional array](#two-dimensional-array)
        1. [Irregular Arrays](#irregular-arrays)
    1. [Arrays are always Mutable](#arrays-are-always-mutable)
    1. [Defensive Copying](#defensive-copying)
    1. [Arrays of Objects](#arrays-of-objects)
    1. [Sorting and Searching](#sorting-and-searching)
    1. [An Array of Characters Is Not a String](#an-array-of-characters-is-not-a-string)
1. [Lists (Vector, ArrayList and LinkedList)](#lists-vector-arraylist-and-linkedlist)
    1. [Create Lists](#create-lists)
    1. [Types of Lists](#types-of-lists)
        1. [Vector](#vector)
        1. [ArrayList](#arraylist)
        1. [LinkedList](#linkedlist)
        1. [Which List to Use?](#which-list-to-use)
    1. [Double Brace Initialization](#double-brace-initialization)
    1. [Mutable and Immutable Lists](#mutable-and-immutable-lists)
1. [Set (HashSet, LinkedHashSet and TreeSet)](#set-hashset-linkedhashset-and-treeset)
    1. [Create Sets](#create-sets)
    1. [Set values MUST BE Immutable](#set-values-must-be-immutable)
    1. [Types of Sets](#types-of-sets)
        1. [HashSet](#hashset)
        1. [LinkedHashSet](#linkedhashset)
        1. [TreeSet](#treeset)
        1. [Which Set to Use?](#which-set-to-use)
    1. [Mutable and Immutable Sets](#mutable-and-immutable-sets)
1. [Map (Hashtable, HashMap, LinkedHashMap and TreeMap)](#map-hashtable-hashmap-linkedhashmap-and-treemap)
    1. [Create Maps](#create-maps)
    1. [Map Keys MUST BE Immutable](#map-keys-must-be-immutable)
    1. [Types of Maps](#types-of-maps)
        1. [Hashtable](#hashtable)
        1. [HashMap](#hashmap)
        1. [LinkedHashMap](#linkedhashmap)
        1. [TreeMap](#treemap)
        1. [Which Map to Use?](#which-map-to-use)
    1. [Relation between Collections the Objects they contain](#relation-between-collections-the-objects-they-contain)
        1. [List and the equals() method](#list-and-the-equals-method)
        1. [Hash based Collections and the equals() and hashCode() methods](#hash-based-collections-and-the-equals-and-hashcode-methods)
1. [Queue and Stack](#queue-and-stack)
    1. [Queues](#queues)
    1. [Stacks](#stacks)
1. [Java Collections Framework](#java-collections-framework)
1. [Google Guava (Collections)](#google-guava-collections)

## Setup

1. Clone Repo: [java-boot-camp-blueprint](https://github.com/albertattard/java-boot-camp-blueprint.git)

    ```bash
    $ git clone https://github.com/albertattard/java-boot-camp-blank.git
    ```

1. Open the repo in IDE

## Arrays

### Create Arrays

Create an integer array of 5 elements

```java
package demo;

public class App {
  public static void main( final String[] args ) {
    final int[] a = { 1, 2, 3, 4, 5 };
    System.out.printf( "Array of int: %s%n", a );
  }
}
```

The square brackets can be placed after the variable name instead of the type

```java
int a[] = { 1, 2, 3, 4, 5 };
```

Output

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

Output

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

    Note that the array's length was not included.  The following is invalid and will not compile.

    ```java
    final int[] a = new int[5] { 1, 2, 3, 4, 5 };
    ```

When creating and passing array to a function, the `new` keyword needs to be used.

**⚠️ THE FOLLOWING EXAMPLE DOES NOT COMPILE.**

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

The [Arrays.fill()](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/Arrays.html#fill(int%5B%5D,int)) function can be used to fill an array with a set of values.

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

Output

```bash
Array of int: [1, 1, 1, 1, 1]
```

#### Puzzle (ABC)

```java
package demo;

public class App {
  public static void main( final String[] args ) {
    final String letters = "ABC";
    final char[] numbers = { '1', '2', '3' };
    System.out.println( letters + " easy as " + numbers );
  }
}
```

```bash
ABC easy as [C@3764951d
```

This example was taken from [PUZZLE 12: ABC in Java™ Puzzlers: Traps, Pitfalls, and Corner Cases](https://learning.oreilly.com/library/view/javatm-puzzlers-traps/032133678X/ch03.html).

1. "_The string concatenation operator is defined to perform string conversion on both of its operands and then to concatenate the resulting strings.  String conversion for object references, which include arrays, is defined as follows ([JLS 15.18.1.1](https://docs.oracle.com/javase/specs/jls/se14/html/jls-15.html#jls-15.18.1.1))._"

    "_If the reference is `null`, it is converted to the string `"null"`.  Otherwise, the conversion is performed as if by an invocation of the `toString()` method of the referenced object with no arguments; but if the result of invoking the `toString()` method is `null`, then the string `"null"` is used instead._"

1. "_So what is the behavior of invoking `toString()` on a non-null `char` array?  Arrays inherit the `toString()` method from `Object` ([JLS 10.7](https://docs.oracle.com/javase/specs/jls/se14/html/jls-10.html#jls-10.7))._"

### Working with Arrays

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

    Output

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

    **⚠️ THE EXAMPLE MAKES REFERENCE TO FOR LOOP WHICH IS DISCUSSED LATER ON!!**

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

### Read past the array's length

Consider the following example.

**⚠️ THE FOLLOWING EXAMPLE WILL COMPILE BUT WILL THROW AN ArrayIndexOutOfBoundsException!!**

```java
package demo;

public class App {
  public static void main( final String[] args ) {
    final int[] a = new int[] { 1, 2, 3, 4, 5 };

    /* Throws ArrayIndexOutOfBoundsException */
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

### Multidimensional Arrays

#### Two dimensional array

```java
package demo;

public class App {
  public static void main( final String[] args ) {
    final int[][] a = { { 1, 2, 3 }, { 4, 5, 6 }, { 7, 8, 9 } };

    for ( int i = 0; i < a.length; i++ ) {
      for ( int j = 0; j < a[i].length; j++ ) {
        System.out.printf( "a[%d][%d]=%d%n", i, j, a[i][j] );
      }
      System.out.println();
    }
  }
}
```

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

#### Irregular Arrays

```java
package demo;

public class App {
  public static void main( final String[] args ) {
    final int[][] a = { { 1, 2, 3, 4 }, { 5, 6 }, { 7, 8, 9 } };

    for ( int i = 0; i < a.length; i++ ) {
      for ( int j = 0; j < a[i].length; j++ ) {
        System.out.printf( "a[%d][%d]=%d%n", i, j, a[i][j] );
      }
      System.out.println();
    }
  }
}
```

Output

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

### Arrays are always Mutable

**Making and array variable `final` does not make it immutable**.

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

**Java arrays are always mutable and there is nothing preventing that**.

[Item 28: Prefer lists to arrays](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/ch5.xhtml#lev28)

### Defensive Copying

**Defensive copying** is a technique which mitigates the negative effects caused by unintentional (or intentional) modifications of shared objects. Instead of sharing the original object, we share a copy of it and thus any modification made to the copy will not affect the original object.

Note that while this may sound bad, there may be valid cases when we need to modify data and no need to apply defensive copying.

**⚠️ THE FOLLOWING EXAMPLE MAKES USE OF OBJECTS and TESTING WHICH IS COVERED LATER ON.**

Consider the following class.

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

  @Override public String toString() {
    return String.format( "Data: %s", Arrays.toString( sample ) );
  }
}
```

The `Data` class holds a set of sample measurements as an array of `int`, named `sample`.  This array of `int` can be modified from outside the data objects **breaking encapsulation**.

The `Data` class should not be effected by changes made to the source past its creation.  The Data class should not be immune from side effects.

```java
package demo;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class DataTest {

  @Test
  @DisplayName( "should be immune from side effects as changes made to the sample source should not affect the data" )
  public void shouldBeImmuneToSideEffects() {
    final int[] source = { 1, 2, 3, 4, 5 };
    final Data data = new Data( source );

    /* The value of the first element should be 1 */
    assertEquals( 1, data.getSample()[0] );

    /* Modify the source and verify that the value of the first element is still 1 */
    source[0] = 10;
    assertEquals( 1, data.getSample()[0] );
  }
}
```

The above test will fail.

```bash
DataTest > should be immune from side effects as changes made to the sample source should not affect the data FAILED
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
    final int[] source = new int[] { 1, 2, 3, 4, 5 };
    final Data data = new Data( source );

    /* Modify the source from outside the data object */
    source[0] = 10;

    /* Modifying the sample returned by the data object */
    int[] sample = data.getSample();
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

This can be prevented using **Defensive Copying**.

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

  @Override public String toString() {
    return String.format( "Data: %s", Arrays.toString( sample ) );
  }
}
```

Running the same test now, will work and will not fail.  Note that we are also creating a copy when the sample is returned by the `getSample()` method.

[Effective Java](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/) - [Item 50: Make defensive copies when needed](https://www.oreilly.com/library/view/effective-java-3rd/9780134686097/ch8.xhtml#lev50)

### Arrays of Objects

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

        /* Throws ArrayStoreException */
        a[0] = "A String";
      }
    }
    ```

    An array of object can be instantiated with any other array, but then can only accept types of that type.  The above will fail.

    ```bash
    Exception in thread "main" java.lang.ArrayStoreException: java.lang.String
      at demo.App.main(App.java:6)
    ```

### Sorting and Searching

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

### An Array of Characters Is Not a String

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

## Lists (Vector, ArrayList and LinkedList)

### Create Lists

1. Create lists

    ```java
    package demo;

    import java.util.Arrays;
    import java.util.List;

    public class App {
      public static void main( final String[] args ) {
        final List<String> a = Arrays.asList( "a", "b", "c" );
        System.out.printf( "List %s%n", a );
      }
    }
    ```

    Java 9 added a default functions to the [List](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/List.html) interface [List.of()](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/List.html#of(E...))

    ```java
    package demo;

    import java.util.List;

    public class App {
      public static void main( final String[] args ) {
        final List<String> a = List.of( "a", "b", "c" );
        System.out.printf( "List %s%n", a );
      }
    }
    ```

    Output

    ```bash
    List [a, b, c]
    ```

### Types of Lists

#### Vector

[Vector](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/Vector.html)

```java
package demo;

import java.util.List;
import java.util.Vector;

public class App {
  public static void main( final String[] args ) {
    final List<String> a = new Vector<>( 3 );
    a.add( "b" );
    a.add( "c" );

    /* Add at a given existing location */
    a.add( 0, "a" );

    System.out.printf( "List %s%n", a );
  }
}
```

Output

```bash
List [a, b, c]
```

#### ArrayList

[ArrayList](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/ArrayList.html)

```java
package demo;

import java.util.ArrayList;
import java.util.List;

public class App {
  public static void main( final String[] args ) {
    final List<String> a = new ArrayList<>( 3 );
    a.add( "b" );
    a.add( "c" );

    /* Add at a given existing location */
    a.add( 0, "a" );

    System.out.printf( "List %s%n", a );
  }
}
```

Output

```bash
List [a, b, c]
```

#### LinkedList

[LinkedList](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/LinkedList.html)

```java
package demo;

import java.util.LinkedList;
import java.util.List;

public class App {
  public static void main( final String[] args ) {
    final List<String> a = new LinkedList<>();
    a.add( "b" );
    a.add( "c" );

    /* Add at a given existing location */
    a.add( 0, "a" );

    System.out.printf( "List %s%n", a );
  }
}
```

Output

```bash
List [a, b, c]
```

#### Which List to Use?

**Pending...**

### Double Brace Initialization

**⚠️ THE FOLLOWING EXAMPLE MAKES USE OF OBJECTS WHICH IS COVERED LATER ON.**

Consider the following example.

```java
package demo;

import java.util.ArrayList;
import java.util.List;

public class App {
  public static void main( final String[] args ) {
    final List<String> a = new ArrayList<>() {{
      add( "a" );
      add( "b" );
      add( "c" );
    }};
    System.out.printf( "List %s%n", a );
  }
}
```

The above example makes use of double brace initialization.  An [inner anonymous class](06%20-%20Objects.md#outer-inner-and-anonymous-classes) is created and the init block is used to add the elements to the list.  The above example is similar to the following.

```java
package demo;

import java.util.ArrayList;

public class MyStringList extends ArrayList<String> {

  /* Initialisation block */
  {
    add( "a" );
    add( "b" );
    add( "c" );
  }
}
```

I've never used this pattern and prefer other constructs instead, such as [Guava.asList()](https://guava.dev/releases/21.0/api/docs/com/google/common/collect/Lists.html#asList-E-E:A-).  I've added this example here as you may encounter this in code.

### Mutable and Immutable Lists

Unmodifiable lists cannot be modified

**⚠️ THE FOLLOWING EXAMPLE WILL COMPILE BUT THROWS AN UnsupportedOperationException!!**

```java
package demo;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class App {
  public static void main( final String[] args ) {
    final List<String> a = new ArrayList<>( 3 );
    a.add( "a" );
    a.add( "b" );
    a.add( "c" );

    /* Cannot modify the list through b */
    final List<String> b = Collections.unmodifiableList( a );

    /* Throws UnsupportedOperationException */
    b.add( "d" );
  }
}
```

Changing the unmodifiable list will throw an `UnsupportedOperationException`.

```bash
Exception in thread "main" java.lang.UnsupportedOperationException
  at java.base/java.util.Collections$UnmodifiableCollection.add(Collections.java:1062)
  at demo.App.main(App.java:18)
```

Changes to the underlying list will also affect the immutable list

```java
package demo;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class App {
  public static void main( final String[] args ) {
    final List<String> a = new ArrayList<>( 3 );
    a.add( "a" );
    a.add( "b" );
    a.add( "c" );

    /* Cannot modify the list through b */
    final List<String> b = Collections.unmodifiableList( a );

    /* The immutable list b will be modified too */
    a.add( "d" );

    System.out.printf( "List a: %s%n", a );
    System.out.printf( "List b: %s%n", b );
  }
}
```

Output

```bash
List a: [a, b, c, d]
List b: [a, b, c, d]
```

## Set (HashSet, LinkedHashSet and TreeSet)

### Create Sets

1. Create sets

    Java 9 added a default functions to the [Set](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/Set.html) interface [Set.of()](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/Set.html#of(E...))

    ```java
    package demo;

    import java.util.Set;

    public class App {
      public static void main( final String[] args ) {
        final Set<String> a = Set.of( "a", "b", "c" );
        System.out.printf( "Set %s%n", a );
      }
    }
    ```

    Output

    ```bash
    Set [a, b, c]
    ```

### Set values MUST BE Immutable

**Pending...**

### Types of Sets

#### HashSet

[HashSet](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/HashSet.html)

```java
package demo;

import java.util.HashSet;
import java.util.Set;

public class App {
  public static void main( final String[] args ) {
    final Set<String> a = new HashSet<>( 3 );
    a.add( "b" );
    a.add( "c" );
    a.add( "a" );

    /* Add an element that already exists */
    a.add( "a" );

    System.out.printf( "Set %s%n", a );
  }
}
```

Output

```bash
Set [a, b, c]
```

The order in which the elements are returned is not guranteed and may vary between different versions of the JVM and JRE.

#### LinkedHashSet

[LinkedHashSet](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/LinkedHashSet.html)

```java
package demo;

import java.util.LinkedHashSet;
import java.util.Set;

public class App {
  public static void main( final String[] args ) {
    final Set<String> a = new LinkedHashSet<>( 3 );
    a.add( "b" );
    a.add( "c" );
    a.add( "a" );

    /* Add an element that already exists */
    a.add( "a" );

    System.out.printf( "Set %s%n", a );
  }
}
```

Output

```bash
Set [b, c, a]
```

#### TreeSet

[TreeSet](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/TreeSet.html)

```java
package demo;

import java.util.Comparator;
import java.util.Set;
import java.util.TreeSet;

public class App {
  public static void main( final String[] args ) {
    final Set<String> a = new TreeSet<>( Comparator.reverseOrder() );
    a.add( "b" );
    a.add( "c" );
    a.add( "a" );

    /* Add an element that already exists */
    a.add( "a" );

    System.out.printf( "Set %s%n", a );
  }
}
```

Output

```bash
Set [c, b, a]
```

The Java `TreeSet` is based on the [Red-Black tree](https://en.wikipedia.org/wiki/Red%E2%80%93black_tree).  The order in which the elements are sorted is goverend by the provided comparator or by their natural ordering.

Note that adding items to a list which do not support natural ordering and without providing a comparator will throw a `ClassCastException` at runtime.

**⚠️ THE FOLLOWING EXAMPLE WILL COMPILE BUT WILL THROW A ClassCastException.**

```java
package demo;

import java.awt.Point;
import java.util.Set;
import java.util.TreeSet;

public class App {
  public static void main( final String[] args ) {
    final Set<Point> a = new TreeSet<>();
    a.add( new Point( 1, 2 ) );

    System.out.printf( "Points %s%n", a );
  }
}
```

The `Point` class does not implement the `Comparable` interface, thus this type of object does not provide natural ordering.  A comparator needs to be provided to the `TreeSet` to be able to work with the `Point` class.

```java
package demo;

import java.awt.Point;
import java.util.Comparator;
import java.util.Set;
import java.util.TreeSet;

public class App {
  public static void main( final String[] args ) {
    /* Compare by point x then point y */
    final Comparator<Point> comparator =
      Comparator.comparing( Point::getX ).thenComparing( Point::getY );

    final Set<Point> a = new TreeSet<>( comparator );
    a.add( new Point( 1, 2 ) );

    System.out.printf( "Points %s%n", a );
  }
}
```

The above will print.

```bash
Points [java.awt.Point[x=1,y=2]]
```

#### Which Set to Use?

**Pending...**

### Mutable and Immutable Sets

Unmodifiable sets cannot be modified

**⚠️ THE FOLLOWING EXAMPLE WILL COMPILE BUT THROWS AN UnsupportedOperationException!!**

```java
package demo;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

public class App {
  public static void main( final String[] args ) {
    final Set<String> a = new HashSet<>( 3 );
    a.add( "a" );
    a.add( "b" );
    a.add( "c" );

    /* Cannot modify the set through b */
    final Set<String> b = Collections.unmodifiableSet( a );

    /* Throws UnsupportedOperationException */
    b.add( "d" );
  }
}
```

Changing the unmodifiable set will throw an `UnsupportedOperationException`.

```bash
Exception in thread "main" java.lang.UnsupportedOperationException
  at java.base/java.util.Collections$UnmodifiableCollection.add(Collections.java:1062)
  at demo.App.main(App.java:18)
```

Changes to the underlying set will also affect the immutable set

```java
package demo;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

public class App {
  public static void main( final String[] args ) {
    final Set<String> a = new HashSet<>( 3 );
    a.add( "a" );
    a.add( "b" );
    a.add( "c" );

    /* Cannot modify the set through b */
    final Set<String> b = Collections.unmodifiableSet( a );

    /* The immutable set b will be modified too */
    a.add( "d" );

    System.out.printf( "Set a: %s%n", a );
    System.out.printf( "Set b: %s%n", b );
  }
}
```

Output

```bash
Set a: [a, b, c, d]
Set b: [a, b, c, d]
```

## Map (Hashtable, HashMap, LinkedHashMap and TreeMap)

### Create Maps

Java 9 added a default functions to the [Map](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/Map.html) interface [List.of()](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/Map.html#of(E...))

```java
package demo;

import java.util.Map;

public class App {
  public static void main( final String[] args ) {
    final Map<String, Integer> a = Map.of(
      "Aden", 82,
      "Jade", 92,
      "Peter", 74,
      "Jane", 68
    );
    System.out.printf( "Marks: %s%n", a );
  }
}
```

The above example will print

```bash
Marks: {Albert=82, Jane=68, Peter=74, Mary=92}
```

### Map Keys MUST BE Immutable

Consider the following example

```java
package demo;

import java.awt.*;
import java.util.HashMap;
import java.util.Map;

public class App {
  public static void main( final String[] args ) {
    final Point a = new Point( 1, 1 );

    final Map<Point, String> m = new HashMap<>( 3 );
    m.put( a, "Lower left corner" );

    System.out.println( "-- Before modifying the key ----" );
    System.out.printf( "The map contains %d points%n", m.size() );
    System.out.printf( "Is point %s in map? %s%n", a, m.containsKey( a ) );

    /* Modify the key */
    a.y = 10;

    System.out.println( "-- After modifying the key -----" );
    System.out.printf( "The map contains %d points%n", m.size() );
    System.out.printf( "Is point %s in map? %s%n", a, m.containsKey( a ) );
  }
}
```

The `Point` class is mutable and thus not suitable to be used as a key in any `Map`.  Modifying the point's state, as shown above example, will break the map.  In the above example, the map is not able to locate the same key object after it is modified.

```bash
-- Before modifying the key ----
The map contains 1 points
Is point java.awt.Point[x=1,y=1] in map? true
-- After modifying the key -----
The map contains 1 points
Is point java.awt.Point[x=1,y=10] in map? false
```

**Mutable objects are not good candidates as map keys**

### Types of Maps

#### Hashtable

[Hashtable](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/Hashtable.html) example.

```java
package demo;

import java.util.Hashtable;
import java.util.Map;

public class App {
  public static void main( final String[] args ) {
    final Map<String, Integer> a = new Hashtable<>();
    a.put( "Aden", 82 );
    a.put( "Jade", 92 );
    a.put( "Peter", 74 );
    a.put( "Jane", 68 );

    /* Update an existing entry */
    a.put( "Aden", 72 );

    /* Only added if the key is not found */
    a.putIfAbsent( "Jade", 0 );
    a.putIfAbsent( "John", 91 );

    System.out.printf( "Marks: %s%n", a );
  }
}
```

The order in which the items are returned is not guaranteed.

```bash
Marks: {John=91, Jane=68, Mary=92, Albert=72, Peter=74}
```

#### HashMap

[HashMap](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/HashMap.html) example.

```java
package demo;

import java.util.HashMap;
import java.util.Map;

public class App {
  public static void main( final String[] args ) {
    final Map<String, Integer> a = new HashMap<>();
    a.put( "Aden", 82 );
    a.put( "Jade", 92 );
    a.put( "Peter", 74 );
    a.put( "Jane", 68 );

    /* Update an existing entry */
    a.put( "Aden", 72 );

    /* Only added if the key is not found */
    a.putIfAbsent( "Jade", 0 );
    a.putIfAbsent( "John", 91 );

    System.out.printf( "Marks: %s%n", a );
  }
}
```

The order in which the items are returned is not guaranteed.

```bash
Marks: {John=91, Albert=72, Peter=74, Jane=68, Mary=92}
```

#### LinkedHashMap

[LinkedHashMap](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/LinkedHashMap.html) example.

```java
package demo;

import java.util.LinkedHashMap;
import java.util.Map;

public class App {
  public static void main( final String[] args ) {
    final Map<String, Integer> a = new LinkedHashMap<>();
    a.put( "Aden", 82 );
    a.put( "Jade", 92 );
    a.put( "Peter", 74 );
    a.put( "Jane", 68 );

    /* Update an existing entry */
    a.put( "Aden", 72 );

    /* Only added if the key is not found */
    a.putIfAbsent( "Jade", 0 );
    a.putIfAbsent( "John", 91 );

    System.out.printf( "Marks: %s%n", a );
  }
}
```

Items will preserv the order and will be returned in the order these are added.

```bash
Marks: {Albert=72, Mary=92, Peter=74, Jane=68, John=91}
```

#### TreeMap

[TreeMap](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/TreeMap.html) example.

```java
package demo;

import java.util.Map;
import java.util.TreeMap;

public class App {
  public static void main( final String[] args ) {
    final Map<String, Integer> a = new TreeMap<>();
    a.put( "Aden", 82 );
    a.put( "Jade", 92 );
    a.put( "Peter", 74 );
    a.put( "Jane", 68 );

    /* Update an existing entry */
    a.put( "Aden", 72 );

    /* Only added if the key is not found */
    a.putIfAbsent( "Jade", 0 );
    a.putIfAbsent( "John", 91 );

    System.out.printf( "Marks: %s%n", a );
  }
}
```

The items are returned in the key's natural order.

```bash
Marks: {Albert=72, Jane=68, John=91, Mary=92, Peter=74}
```

#### Which Map to Use?

HashTable synchronised

Hashmap
1. HashMap is non synchronized. It is not-thread safe and can’t be shared between many threads without proper synchronization code whereas Hashtable is synchronized. It is thread-safe and can be shared with many threads.
2. HashMap allows one null key and multiple null values whereas Hashtable doesn’t allow any null key or value.
3. HashMap is generally preferred over HashTable if thread synchronization is not needed

Why HashTable doesn’t allow null and HashMap does?
To successfully store and retrieve objects from a HashTable, the objects used as keys must implement the hashCode method and the equals method. Since null is not an object, it can’t implement these methods. HashMap is an advanced version and improvement on the Hashtable. HashMap was created later.

### Relation between Collections the Objects they contain

The collection classes interact with the objects they contain.  Somehow the set needs to know whether an object that it contains already exists or not.  The collections use methods defined by the [Object](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/lang/Object.html) class.

1. [equals()](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/lang/Object.html#equals(java.lang.Object))
1. [hashCode()](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/lang/Object.html#hashCode())

#### List and the equals() method

Consider the following example.

```java
package demo;

import java.util.ArrayList;
import java.util.List;

public class App {

  public static class Person {
    private String name;

    public Person( final String name ) {
      this.name = name;
    }

    @Override
    public String toString() {
      return name == null ? "Unknown" : name;
    }
  }

  public static void main( String[] args ) {
    final List<Person> list = new ArrayList<>();

    final Person aden = new Person( "Aden" );
    list.add( aden );

    System.out.printf( "Is %s in the list? %s%n", aden, list.contains( aden ) );

    final Person search = new Person( "Aden" );
    System.out.printf( "Is %s in the list? %s%n", search, list.contains( search ) );
  }
}
```

The program is able to first a match for the first example, but fails on the second try.

```bash
Is Albert in the list? true
Is Albert in the list? false
```

This is happening as the `equals()` is not overridden.  Java thus relies on the `==` operator.  In the first case, we used the same object instance that is available in the list to search.  The `==` operator returns `true` then, as that's the same object in the *Java heap*.  In the second case, we have two objects that have the same value.  Given that these are two objects in the *Java heap*, the `==` operator will return `false`.

In order to address this problem we need to override the `equals()` method.

```java
@Override
public boolean equals( final Object object ) {
  if ( this == object )
    return true;

  if ( object == null || object.getClass() != getClass() )
    return false;

  final Person other = (Person) object;
  return Objects.equals( name, other.name );
}
```

```java
package demo;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class App {

  public static class Person {
    private String name;

    public Person( final String name ) {
      this.name = name;
    }

    @Override
    public boolean equals( final Object object ) {
      if ( this == object )
        return true;

      if ( object == null || object.getClass() != getClass() )
        return false;

      final Person other = (Person) object;
      return Objects.equals( name, other.name );
    }

    @Override
    public String toString() {
      return name == null ? "Unknown" : name;
    }
  }

  public static void main( String[] args ) {
    final List<Person> list = new ArrayList<>();

    final Person aden = new Person( "Aden" );
    list.add( aden );

    System.out.printf( "Is %s in the list? %s%n", aden, list.contains( aden ) );

    final Person search = new Person( "Aden" );
    System.out.printf( "Is %s in the list? %s%n", search, list.contains( search ) );
  }
}
```

This seems to be have fixed the problem.

```bash
Is Albert in the list? true
Is Albert in the list? true
```

The above example is **incorrect** as we only overrode the `equals()` method.

[Effective Java](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/)
1. [Item 11: Always override hashCode when you override equals](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/ch3.xhtml#lev11)

When we override the `equals()` we should also override the `hashCode()` method.

```java
@Override
public int hashCode() {
  return Objects.hash( name );
}
```

Following is a correct example.

```java
package demo;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class App {

  public static class Person {
    private String name;

    public Person( final String name ) {
      this.name = name;
    }

    @Override
    public boolean equals( final Object object ) {
      if ( this == object )
        return true;

      if ( object == null || object.getClass() != getClass() )
        return false;

      final Person other = (Person) object;
      return Objects.equals( name, other.name );
    }

    @Override
    public int hashCode() {
      return Objects.hash( name );
    }

    @Override
    public String toString() {
      return name == null ? "Unknown" : name;
    }
  }

  public static void main( String[] args ) {
    final List<Person> list = new ArrayList<>();

    final Person aden = new Person( "Aden" );
    list.add( aden );

    System.out.printf( "Is %s in the list? %s%n", aden, list.contains( aden ) );

    final Person search = new Person( "Aden" );
    System.out.printf( "Is %s in the list? %s%n", search, list.contains( search ) );
  }
}
```

#### Hash based Collections and the equals() and hashCode() methods

Consider the following example.

```java
package demo;

import java.util.HashSet;
import java.util.Set;

public class App {

  public static class Key {
    private final String value;

    public Key( final String value ) {
      this.value = value;
    }
  }

  public static void main( String[] args ) {
    final Set<Key> set = new HashSet<>();

    set.add( new Key( "x" ) );
    set.add( new Key( "x" ) );

    System.out.printf( "Set contains %d elements%n", set.size() );
  }
}
```

The inner class `Key` has one constant field of type `String`.  The `Key` class is immutable and once created its state cannot be changed.  While this seems to be a good candidate for sets, or as a map key, the above example will not work as expected.  Despite the fact that both `Key` instances have the same value, the `Set` treats them as different objects.

```bash
Set contains 2 elements
```

This is because the `equals()` and `hashCode()` methods were not overloaded.

1. Implement `equals()` method

    ```bash
    @Override
    public boolean equals( final Object object ) {
      if ( this == object )
        return true;

      if ( object == null || object.getClass() != getClass() )
        return false;

      final Key other = (Key) object;
      return Objects.equals( value, other.value );
    }
    ```

1. Implement `hashCode()` method

    ```java
    @Override
    public int hashCode() {
      return Objects.hash( value );
    }
    ```

Complete example

```java
package demo;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

public class App {

  public static class Key {
    private final String value;

    public Key( final String value ) {
      this.value = value;
    }

    @Override
    public boolean equals( final Object object ) {
      if ( this == object )
        return true;

      if ( object == null || object.getClass() != getClass() )
        return false;

      final Key other = (Key) object;
      return Objects.equals( value, other.value );
    }

    @Override
    public int hashCode() {
      return Objects.hash( value );
    }
  }

  public static void main( String[] args ) {
    final Set<Key> set = new HashSet<>();

    set.add( new Key( "x" ) );
    set.add( new Key( "x" ) );

    System.out.printf( "Set contains %d elements%n", set.size() );
  }
}
```

Now that both `equals()` and `hashCode()` are implements, the set and map will work as expected.

```bash
Set contains 1 elements
```

## Queue and Stack

### Queues

**Pending...**

### Stacks

**Pending...**

## Java Collections Framework

**Pending...**

## Google Guava (Collections)

**Pending...**
