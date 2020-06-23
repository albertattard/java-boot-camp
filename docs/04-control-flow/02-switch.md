---
layout: default
title: Switch
parent: Control flow
nav_order: 2
permalink: docs/control-flow/switch/
---

# Switch
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Switch Control Flow Statement

Consider an application that prints a menu to the console and preforms the action selected by the user.

```java
package demo;

public class App {

  public static void main( final String[] args ) {
    System.out.println( "---------------------" );
    System.out.println( "Menu" );
    System.out.println( "---------------------" );
    System.out.println( " a c    Add Data" );
    System.out.println( " u      Update Data" );
    System.out.println( " x      Delete Data" );
    System.out.println( "---------------------" );

    final char input = 'a';
    System.out.printf( "User selected %s%n", input );
  }

  private static void addData() { /* add */ }

  private static void updateData() { /* update */ }

  private static void deleteData() { /* delete */ }
}
```

### Switch Example

The `if/else-if/else` can be used to solve this problem, but the `switch` statement is a better fit

```java
switch ( input ) {
  case 'a':
    addData();
    break;
}
```

Complete solution

```java
package demo;

public class App {

  public static void main( final String[] args ) {
    System.out.println( "---------------------" );
    System.out.println( "Menu" );
    System.out.println( "---------------------" );
    System.out.println( " a c    Add Data" );
    System.out.println( " u      Update Data" );
    System.out.println( " x      Delete Data" );
    System.out.println( "---------------------" );

    final char input = 'a';

    switch ( input ) {
      case 'a':
        addData();
        break;
      case 'c':
        addData();
        break;
      case 'u':
        updateData();
        break;
      case 'x':
        deleteData();
        break;
    }
  }

  private static void addData() { /* add */ }

  private static void updateData() { /* update */ }

  private static void deleteData() { /* delete */ }
}
```

## Switch Fallthrough Example

Both 'a' and 'c' call the `addData()` function.  The `switch` statement supports fallthrough which enables the switch to continue from the first match until this is stopped or reaches the end of the switch.

```java
switch ( input ) {
  case 'a':
  case 'c':
    addData();
    break;
}
```

Complete solution

```java
package demo;

public class App {

  public static void main( final String[] args ) {
    System.out.println( "---------------------" );
    System.out.println( "Menu" );
    System.out.println( "---------------------" );
    System.out.println( " a c    Add Data" );
    System.out.println( " u      Update Data" );
    System.out.println( " x      Delete Data" );
    System.out.println( "---------------------" );

    final char input = 'a';

    switch ( input ) {
      case 'a':
      case 'c':
        addData();
        break;
      case 'u':
        updateData();
        break;
      case 'x':
        deleteData();
        break;
    }
  }

  private static void addData() { /* add */ }

  private static void updateData() { /* update */ }

  private static void deleteData() { /* delete */ }
}
```

Fallthrough is a discouraged practice by some because it can lead to issues.  For example, if we forget the break between the cases, we may end up executing all cases.  I use the fallthrough option whenever I see fit as it.  With that said, one needs to be aware of the potential problem.

## Switch Default Example

When the user input an invalid option, the program simple exits.  Improve the program such that it displays a message indicating that the input is invalid.

```bash
Invalid input provided!!
```

The `switch` statement provides the `default` block which captures any other cases.  The `default` block needs to be the last block, thus `break` statement is not required.

```java
switch ( input ) {
  case 'x':
    deleteData();
    break;
  default:
    System.out.println( "Invalid input provided!!" );
}
```

Complete solution

```java
package demo;

public class App {

  public static void main( final String[] args ) {
    System.out.println( "---------------------" );
    System.out.println( "Menu" );
    System.out.println( "---------------------" );
    System.out.println( " a c    Add Data" );
    System.out.println( " u      Update Data" );
    System.out.println( " x      Delete Data" );
    System.out.println( "---------------------" );

    final char input = 'z';

    switch ( input ) {
      case 'a':
      case 'c':
        addData();
        break;
      case 'u':
        updateData();
        break;
      case 'x':
        deleteData();
        break;
      default:
        System.out.println( "Invalid input provided!!" );
    }
  }

  private static void addData() { /* add */ }

  private static void updateData() { /* update */ }

  private static void deleteData() { /* delete */ }
}
```

## Switch Expressions

Java 14 introduced [switch expressions (JEP 361)](https://openjdk.java.net/jeps/361)

Consider the following example

```java
package demo;

public class App {
  public static void main( final String[] args ) {
    final int a = 2;

    switch ( a ) {
      case 1:
      case 3:
        System.out.println( "Options 1 or 3" );
        break;
      case 2:
        System.out.println( "Option 2" );
        break;
      default:
        System.out.println( "Anything other than 1, 2 or 3" );
    }
  }
}
```

The switch statement is printing a `String` based on the value if variable `a`.

This can be converted such that the `switch` statement becomes and expression that evaluates to a value, `String` this time.

```java
package demo;

public class App {
  public static void main( final String[] args ) {
    final int a = 2;

    final String result = switch ( a ) {
      case 1, 3 -> "Options 1 or 3";
      case 2 -> "Option 2";
      default -> "Anything other than 1, 2 or 3";
    };

    System.out.println( result );
  }
}
```

Both examples will output

```bash
Option 2
```

## Pattern matching for switch

{% include custom/pending.html %}

[JEP draft: Pattern matching for switch (Preview)](https://openjdk.java.net/jeps/8213076)
