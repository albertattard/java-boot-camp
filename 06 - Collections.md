# Collections

## TOC

1. [Setup](#setup)
1. [Arrays](#arrays)
    1. [Create Arrays](#create-arrays)
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

