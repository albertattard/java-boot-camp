# Collections

## TOC

1. [Setup](#setup)
1. [Arrays](#arrays)
    1. [Create Arrays](#create-arrays)
    1. [Working with Arrays](#working-with-arrays)
    1. [Arrays are always Mutable](#arrays-are-always-mutable)
        1. [Defensive Copying](#defensive-copying)
    1. [Arrays of Objects](#arrays-of-objects)
1. [Lists (ArrayList and Vector)](#lists-arraylist-and-vector)
1. [Set (HashSet, linkedHashSet and TreeSet)](#set-hashset-linkedhashset-and-treeset)
1. [Map (HashMap, LinkedHashMap and TreeMap)](#map-hashmap-linkedhashmap-and-treemap)
1. [Queue and Stack](#queue-and-stack)
1. [Java Collections Framework](#java-collections-framework)
1. [Google Guava (Collections)](#google-guava-collections)

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

## Arrays

### Create Arrays

1. Create an integer array of 5 elements

    ```java
    package demo;

    public class App {
      public static void main( String[] args ) {
        int[] a = { 1, 2, 3, 4, 5 };
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

1. Use [Arrays.toString()](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/Arrays.html#toString(int%5B%5D)) to convert the array to a string

    ```java
    package demo;

    public class App {
      public static void main( String[] args ) {
        int[] a = { 1, 2, 3, 4, 5 };
        System.out.printf( "Array of int: %s%n", Arrays.toString( a ) );
      }
    }
    ```

    Output

    ```bash
    Array of int: [1, 2, 3, 4, 5]
    ```

1. Alternative methods to create an array

    ```java
    package demo;

    import java.util.Arrays;

    public class App {
      public static void main( String[] args ) {
        int[] a = new int[] { 1, 2, 3, 4, 5 };
        System.out.printf( "Array of int: %s%n", Arrays.toString( a ) );
      }
    }
    ```

    Or

    ```java
    package demo;

    import java.util.Arrays;

    public class App {
      public static void main( String[] args ) {
        int[] a = new int[5];
        System.out.printf( "Array of int: %s%n", Arrays.toString( a ) );
      }
    }
    ```

    The array is filled with the data type default value

    ```bash
    Array of int: [0, 0, 0, 0, 0]
    ```

1. The [Arrays.fill()](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/Arrays.html#fill(int%5B%5D,int)) function

    ```java
    package demo;

    import java.util.Arrays;

    public class App {
      public static void main( String[] args ) {
        int[] a = new int[5];
        Arrays.fill( a, 1 );
        System.out.printf( "Array of int: %s%n", Arrays.toString( a ) );
      }
    }
    ```

    Output

    ```bash
    Array of int: [1, 1, 1, 1, 1]
    ```

### Working with Arrays

1. Access each element by its index (zero based)

    ```java
    package demo;

    import java.util.Arrays;

    public class App {
      public static void main( String[] args ) {
        int[] a = new int[] { 1, 2, 3, 4, 5 };
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

1. Iterate and modify arrays

    ```java
    package demo;

    import java.util.Arrays;

    public class App {
      public static void main( String[] args ) {
        int[] a = new int[] { 1, 2, 3, 4, 5 };

        /* Increment all elements by two */
        for ( int i = 0; i < a.length; i++ ) {
          a[i] += 2;
        }

        System.out.printf( "Array of int: %s%n", Arrays.toString( a ) );
      }
    }
    ```

    Output

    ```bash
    Array of int: [3, 4, 5, 6, 7]
    ```

1. Read past the Array length

    ```java
    package demo;

    public class App {
      public static void main( String[] args ) {
        final int[] a = new int[] { 1, 2, 3, 4, 5 };

        /* Throws ArrayIndexOutOfBoundsException */
        a[a.length] = 10;
      }
    }
    ```

    Will fail

    ```bash
    Exception in thread "main" java.lang.ArrayIndexOutOfBoundsException: Index 5 out of bounds for length 5
        at demo.App.main(App.java:8)
    ```

    Array's range is always between 0 (inclusive) and the array's length (exclusive)

### Arrays are always Mutable

Making and array variable `final `dose not make it immutable

```java
package demo;

import java.util.Arrays;

public class App {
  public static void main( String[] args ) {
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

Java arrays are always mutable and there is nothing preventing that.

[Item 28: Prefer lists to arrays](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/ch5.xhtml#lev28)

#### Defensive Copying

1. A data class contains an array of it

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

1. The array of int, `sample`, within the `Data` class can be modified from outside the data objects **breaking encapsulation**.

    ```java
    package demo;

    public class App {
      public static void main( String[] args ) {
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

1. This can be prevented using **Defensive Copying**.

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

    Output

    ```bash
    Data: [1, 2, 3, 4, 5]
    ```

[Effective Java](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/) - [Item 50: Make defensive copies when needed](https://www.oreilly.com/library/view/effective-java-3rd/9780134686097/ch8.xhtml#lev50)

### Arrays of Objects

**Pending...**

## Lists (ArrayList and Vector)

**Pending...**

## Set (HashSet, linkedHashSet and TreeSet)

**Pending...**

## Map (HashMap, LinkedHashMap and TreeMap)

**Pending...**

## Queue and Stack

**Pending...**

## Java Collections Framework

**Pending...**

## Google Guava (Collections)

**Pending...**

