# Java Light

The purpose of this section is to introduce some common aspects of the Java programming language **without delving into any depths**.  When discussing any topic in some detail we may need to also touch other topics that have not yet been mentioned.  For example, loops and collections go together and either way you start, one needs to come before the other.  This section acts as an introduction, hopefully simplifying the digesting the rest of the boot camp.  Do not worry if some of the concepts do not sink in as each item is discussed in depth later on.

## TOC

1. [Setup](#setup)
1. [JShell](#jshell)
1. [Java single file execution](#java-single-file-execution)
1. [Introduction to classes and methods](#introduction-to-classes-and-methods)
    1. [Source and class files](#source-and-class-files)
    1. [Methods](#methods)
1. [Using existing functionality](#using-existing-functionality)
1. [Introduction to variables and types](#introduction-to-variables-and-types)
1. [Introduction to collections](#introduction-to-collections)
    1. [Arrays](#arrays)
    1. [Lists](#lists)
1. [Introduction to control-flow](#introduction-to-control-flow)
    1. [If-Else](#if-else)
    1. [switch](#switch)
    1. [For loop](#for-loop)
1. [Annotations](#annotations)

## Setup

1. Clone Repo: [java-boot-camp-blueprint](https://github.com/albertattard/java-boot-camp-blueprint)

    ```bash
    $ git clone https://github.com/albertattard/java-boot-camp-blueprint.git
    ```

1. Open the repo in IDE

## JShell

The [Java Shell tool (JShell)](https://docs.oracle.com/javase/9/jshell/introduction-jshell.htm) is an interactive tool for learning the Java programming language and prototyping Java code.  JShell is a Read-Evaluate-Print Loop (REPL), which evaluates declarations, statements, and expressions as they are entered and immediately shows the results.

**⚠️ JShell maximise simplicity and relaxed some of the rules that apply to a normal Java program.  While the JShell is great to practice and try somethings out, code that works in JShell may not work in Java.**

1. Open JShell

    ```bash
    $ jshell
    ```

    The following error maybe shown

    ```bash
    Unable to locate an executable at "~/.sdkman/candidates/java/current/bin/jshell" (-1)
    ```

    Verify the version of Java

    ```bash
    $ java -version
    openjdk version "1.8.0_252"
    OpenJDK Runtime Environment (AdoptOpenJDK)(build 1.8.0_252-b09)
    OpenJDK 64-Bit Server VM (AdoptOpenJDK)(build 25.252-b09, mixed mode)
    ```

    **JShell requires Java 9 or higher**

    ```jshelllanguage
    |  Welcome to JShell -- Version 14.0.1
    |  For an introduction type: /help intro

    jshell>
    ```

    To exit JShell, type `/exit`

    ```jshelllanguage
    jshell> /exit
    ```

1. Help

    ```jshelllanguage
    jshell> /help
    |  Type a Java language expression, statement, or declaration.
    |  Or type one of the following commands:
    |  /list [<name or id>|-all|-start]
    |  	list the source you have typed
    |  /edit <name or id>
    |  	edit a source entry
    |  /drop <name or id>
    ...
    |  rerun
    |  	a description of ways to re-evaluate previously entered snippets
    ```

1. Create a variable

    ```jshelllanguage
    jshell> a = 7
    |  Error:
    |  cannot find symbol
    |    symbol:   variable a
    |  a = 7
    |  ^
    ```

    **In Java, variables require a type**.  [Java is a statically typed language](https://docs.oracle.com/javase/specs/jls/se14/html/jls-4.html).

    ```jshelllanguage
    jshell> int a = 7
    a ==> 7
    ```

    Normally, a semicolon needs to be added at the end of the statement, indicating the end of statement (as defined by the [JLS 14.8](https://docs.oracle.com/javase/specs/jls/se7/html/jls-14.html#jls-14.8)).

    ```jshelllanguage
    jshell> int a = 7;
    a ==> 7
    ```

    **⚠️ Note that while the semicolon is optional in JShell, this is required in a Java program.  The program will not compile if we ignore the semicolon at the end of the statement**.

    Enter the variable name to print its value

    ```jshelllanguage
    jshell> a
    a ==> 7
    ```

    Java 10 introduced Local Variable Type Inference ([JEP 286](https://openjdk.java.net/jeps/286)).  Previously, all local variable declarations required an explicit (manifest) type on the left-hand side.  With type inference, the explicit type can be replaced by the reserved type name `var` for local variable declarations that have initializers.  The type of the variable is inferred from the type of the initializer.

    ```jshelllanguage
    jshell> var x = 7
    x ==> 7
    ```

    For more information about Local Variable Type Inference please refer to the [style guidelines](http://openjdk.java.net/projects/amber/LVTIstyle.html) and [article Java Feature Spotlight: Local Variable Type Inference by Brian Goetz](https://www.infoq.com/articles/java-local-variable-type-inference/).

    Note that once a variable is created, it cannot change its type.  Once we create an `int`, that variable will stay an `int` and cannot accept anything else.

    ```jshelllanguage
    jshell> int x = 7
    jshell> x = 7.7
    |  Error:
    |  incompatible types: possible lossy conversion from double to int
    |  x = 7.7
    |      ^-^
    ```

    Different from many other languages, [Java is a statically typed language](https://docs.oracle.com/javase/specs/jls/se14/html/jls-4.html) and we cannot compare the integer `1` to the boolean `true`

    ```jshelllanguage
    jshell> 1 == true
    |  Error:
    |  incomparable types: int and boolean
    |  1 == true
    |  ^-------^
    ```

1. Arithmetic Operations

    ```jshelllanguage
    jshell> int b = 3
    b ==> 3

    jshell> a + b
    $4 ==> 10
    ```

    The result is stored in a new temporary variable, `$4`, (crated by JShell) which can be accessed as any other variable.

    ```jshelllanguage
    jshell> $4
    $4 ==> 10
    ```

1. Use existing functionality

    JShell imports automatically classes and functionality from the following packages

    ```jshelllanguage
    jshell> /imports
    |    import java.io.*
    |    import java.math.*
    |    import java.net.*
    |    import java.nio.file.*
    |    import java.util.*
    |    import java.util.concurrent.*
    |    import java.util.function.*
    |    import java.util.prefs.*
    |    import java.util.regex.*
    |    import java.util.stream.*
    ```

    For example, we can use the `Random` class, found in the `java.util` package.

    ```jshelllanguage
    jshell> var r = new Random()
    r ==> java.util.Random@533ddba

    jshell> r.nextInt(10)
    $3 ==> 8
    ```

    JShell has tab completion.  Type `Math.` and then press the `[tab]` key

    ```jshelllanguage
    jshell> Math.
    E                 IEEEremainder(    PI                abs(              acos(             addExact(         asin(             atan(             atan2(            cbrt(             ceil(             class             copySign(
    cos(              cosh(             decrementExact(   exp(              expm1(            floor(            floorDiv(         floorMod(         fma(              getExponent(      hypot(            incrementExact(   log(
    log10(            log1p(            max(              min(              multiplyExact(    multiplyFull(     multiplyHigh(     negateExact(      nextAfter(        nextDown(         nextUp(           pow(              random()
    rint(             round(            scalb(            signum(           sin(              sinh(             sqrt(             subtractExact(    tan(              tanh(             toDegrees(        toIntExact(       toRadians(
    ulp(
    jshell> Math.
    ```

    You will see all methods (functionality) available to the `Math` class.

    ```jshelllanguage
    jshell> int a = 7
    jshell> int b = 3
    jshell> Math.max(a, b)
    $5 ==> 7
    ```

    We can import all methods available in the `Math` class so that we can invoke these methods by their name.

    ```jshelllanguage
    jshell> import static java.lang.Math.*

    jshell> max(a, b)
    $5 ==> 7

    jshell> PI
    PI ==> 3.141592653589793
    ```

    A list of functions available in the Math class can be found [here](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/lang/Math.html).

1. Add new functionality (a method)

    ```jshelllanguage
    jshell>  int sum(int a, int b) {
       ...> return a+b;
       ...> }
    |  created method sum(int,int)
    ```

    The created a method, named `sum()`, takes two integers and returns their sum.

    ```jshelllanguage
    jshell> sum(4,5)
    $7 ==> 9
    ```

For more information about JSHell, please refer to the [JShell documentation](https://docs.oracle.com/javase/10/jshell/JSHEL.pdf).

## Java single file execution

Java 11 introduced Java Single File Execution ([JEP-330](https://openjdk.java.net/jeps/330)) which enhanced the java launcher to run a program supplied as a single file of Java source code, including usage from within a script by means of "[shebang" files](https://openjdk.java.net/jeps/330#Shebang_files) and related techniques.

```java
$ vi hello
```

**The script file name does not need to match the class name**.

```jshelllanguage
#!/usr/bin/java --source 11

public class HelloWorld {
  public static void main(String[] args) {
    System.out.println("Hello World!!");
  }
}
```

The script needs to be executable

```bash
$ chmod +x hello
```

and can be executed like any other script

```bash
$ ./hello

Hello World!!
```

The [gist x_init](https://gist.github.com/albertattard/3f9a66faf2a90dc2bf6376d37c7c6052) shows a more elaborated example.

## Introduction to classes and methods

### Source and class files

**🚧 Pending...**

```java
package demo;

public class App {
  public static void main( final String[] args ) {
    System.out.println( "Hello World!!" );
  }
}
```

```bash
Hello world!!
```

```bash
$ tree src/main/java
src/main/java
└── demo
    └── App.java
```

```bash
$ tree build/classes/java
build/classes/java
└── main
    └── demo
        └── App.class
```

```bash
$ ./gradlew run

> Task :run
Hello world!!

BUILD SUCCESSFUL in 714ms
2 actionable tasks: 2 executed
```

```bash
$ java -cp build/classes/java/main demo.App
Hello world!!
```

### Methods

**🚧 Pending...**

```java
package demo;

public class App {
  public static void main( final String[] args ) {
    printHello();
  }

  public static void printHello() {
    System.out.println( "Hello world!!" );
  }
}
```

```bash
Hello world!!
```

## Using existing functionality

```java
import java.time.LocalDate;
```

```java
package demo;

import java.time.LocalDate;

public class App {
  public static void main( final String[] args ) {
    System.out.printf( "Today's date is %s%n", LocalDate.now() );
  }
}
```

```bash
Today's date is 2020-04-27
```

## Introduction to variables and types

**🚧 Pending...**

```java
package demo;

public class App {
  public static void main( final String[] args ) {
    int a = 7;
    System.out.printf( "The value of a is %d%n", a );
  }
}
```

```bash
The value of a is 7
```

```java
package demo;

import java.time.LocalDate;

public class App {
  public static void main( final String[] args ) {
    String name = "Aden";
    LocalDate dateOfBirth = LocalDate.of( 2011, 4, 12 );
    System.out.printf( "%s was born on %s%n", name, dateOfBirth );
  }
}
```

```bash
Aden was born on 2011-04-12
```

## Introduction to collections

### Arrays

**🚧 Pending...**

```java
package demo;

import java.util.Arrays;

public class App {
  public static void main( final String[] args ) {
    int[] numbers = { 4, 7, 2, 8, 6 };
    numbers[0] = 1;

    System.out.printf( "Numbers: %s%n", Arrays.toString( numbers ) );
    System.out.printf( "Length of array: %d%n", numbers.length );
    System.out.printf( "First number: %d%n", numbers[0] );
    System.out.printf( "Last number: %d%n", numbers[4] );
  }
}
```

```java
Numbers: [1, 7, 2, 8, 6]
Length of array: 5
First number: 1
Last number: 6
```

### Lists

**🚧 Pending...**

```java
package demo;

import java.util.ArrayList;
import java.util.List;

public class App {
  public static void main( final String[] args ) {
    List<String> names = new ArrayList<>();
    names.add( "Jade" );
    names.add( "Aden" );

    System.out.printf( "Names: %s%n", names );
    System.out.printf( "Size of list: %d%n", names.size() );
    System.out.printf( "First name: %d%n", names.get( 0 ) );
  }
}
```

```bash
Names: [Jade, Aden]
Size of list: 2
First name: Jade
```

## Introduction to control-flow

### If-Else

**🚧 Pending...**

```java
package demo;

import java.util.ArrayList;
import java.util.List;

public class App {
  public static void main( final String[] args ) {
    List<String> names = new ArrayList<>();
    names.add( "Jade" );
    names.add( "Aden" );

    if ( names.size() == 0 ) {
      System.out.println( "List is empty" );
    } else if ( names.size() == 1 ) {
      System.out.println( "List has one element" );
    } else {
      System.out.println( "List has many elements" );
    }
  }
}
```

```bash
List has many elements
```

### switch

```java
package demo;

import java.util.ArrayList;
import java.util.List;

public class App {
  public static void main( final String[] args ) {
    List<String> names = new ArrayList<>();
    names.add( "Jade" );
    names.add( "Aden" );

    switch ( names.size() ) {
      case 0:
        System.out.println( "List is empty" );
      case 1:
        System.out.println( "List has one element" );
      default:
        System.out.println( "List has many elements" );
    }
  }
}
```

```bash
List has many elements
```

### For loop

```java
package demo;

import java.util.ArrayList;
import java.util.List;

public class App {
  public static void main( final String[] args ) {
    List<String> names = new ArrayList<>();
    names.add( "Jade" );
    names.add( "Aden" );

    System.out.println( "Names in the list" );
    for ( int i = 0; i < names.size(); i++ ) {
      System.out.printf( "[%d] %s%n", i, names.get( i ) );
    }
  }
}
```

```bash
Names in the list
[0] Jade
[1] Aden
```

```java
package demo;

public class App {
  public static void main( final String[] args ) {
    String[] names = { "Jade", "Aden" };

    System.out.println( "Names in array" );
    for ( int i = 0; i < names.length; i++ ) {
      System.out.printf( "[%d] %s%n", i, names[i] );
    }
  }
}
```

```bash
Names in array
[0] Jade
[1] Aden
```

## Annotations

**🚧 Pending...**
