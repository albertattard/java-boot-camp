# Data Types

## TOC

1. [Setup](#setup)
1. [Numbers and Strings (Variables)](#numbers-and-strings-variables)
1. Autoboxing
1. Imports and Packages
1. Date Time API
1. Internationalization

## Setup

1. Clone Repo

    ```bash
    $ git clone https://github.com/albertattard/java-boot-camp-blank.git
    ```
   
1. Open the repo in IDE

## Numbers and Strings (Variables)

Example

```java
package demo;

public class App {
  public static void main( String[] args ) {
    /* Boolean */
    {
      boolean b = true;
      System.out.printf( "My boolean %s%n", b );
    }

    /* Integers Numbers */
    {
      byte b = 7;
      short s = 1_234;
      int i = 5_000;
      long l = 123_456_789L;
      System.out.printf( "My byte    %d%n", b );
      System.out.printf( "My short   %d%n", s );
      System.out.printf( "My short   %d%n", i );
      System.out.printf( "My short   %d%n", l );
    }

    /* Floating Point Numbers */
    {
      float f = 5.99f;
      double d = 123_456.123_456;
      System.out.printf( "My float   %.2f%n", f );
      System.out.printf( "My double  %.4f%n", d );
    }

    /* Characters and Strings */
    {
      char c = 'J';
      String s = "Hello, this is my string";
      System.out.printf( "My char    %s%n", c );
      System.out.printf( "My String  %s%n", s );
    }
  }
}
```

Output

```bash
My boolean true
My byte    7
My short   1234
My short   5000
My short   123456789
My float   5,99
My double  123456,1235
My char    J
My String  Hello, this is my string
```

## Autoboxing

Example

```java
package demo;

public class App {
  public static void main( String[] args ) {
    /* Objects */
    Integer a = new Integer( 10 );
    Integer b = Integer.valueOf( 10 );
    Integer c = Integer.valueOf( "10" );
    Integer d = Integer.valueOf( "1010", 2 );

    /* Primitives */
    int e = 10;
    int f = Integer.parseInt( "10" );
    int g = Integer.parseInt( "1010", 2 );

    /* Auto-Boxing */
    Integer h = e;
    int i = a;

    System.out.println( "-- Objects -----" );
    System.out.printf( "Integer a %d%n", a );
    System.out.printf( "Integer b %d%n", b );
    System.out.printf( "Integer c %d%n", c );
    System.out.printf( "Integer d %d%n", d );

    System.out.println( "-- Primitives --" );
    System.out.printf( "int e     %d%n", e );
    System.out.printf( "int f     %d%n", f );
    System.out.printf( "int g     %d%n", g );

    System.out.println( "-- Auto-Boxing -" );
    System.out.printf( "Integer h %d%n", h );
    System.out.printf( "int i     %d%n", i );
  }
}
```

Output

```bash
-- Objects -----
Integer a 10
Integer b 10
Integer c 10
Integer d 10
-- Primitives --
int e     10
int f     10
int g     10
-- Auto-Boxing -
Integer h 10
int i     10
```

## Imports and Packages

## Date Time API

## Internationalization
