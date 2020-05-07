# Data Types

## TOC

1. [Setup](#setup)
1. [JShell](#jshell)
1. [Numbers and Strings (Variables and Scope)](#numbers-and-strings-variables-and-scope)
    1. [Primitive Types](#primitive-types)
    1. [Reference Types (the rest)](#reference-types-the-rest)
    1. [Variables and their Values](#variables-and-their-values)
1. [Stack and Heap](#stack-and-heap)
    1. [OS Process Memory](#os-process-memory)
    1. [What goes in the Java stack?](#what-goes-in-the-java-stack)
    1. [What goes in the Java Heap?](#what-goes-in-the-java-heap)
    1. [Variables without a value](#variables-without-a-value)
    1. [Can we have a reference variable without the equivalent object in the Java heap (null)?](#can-we-have-a-reference-variable-without-the-equivalent-object-in-the-java-heap-null)
        1. [What happens if we try to call a method on a null object?](#what-happens-if-we-try-to-call-a-method-on-a-null-object)
        1. [What is NullPointerException?](#what-is-nullpointerexception)
    1. [String or new String?](#string-or-new-string)
    1. [What happens to a variable when it goes out of scope?](#what-happens-to-a-variable-when-it-goes-out-of-scope)
1. [Operators](#operators)
1. [Autoboxing](#autoboxing)
1. [Enumerations](#enumerations)
1. [Imports and Packages](#imports-and-packages)
1. [Date Time API](#date-time-api)
1. [Internationalization](#internationalization)

## Setup

1. Clone Repo: [java-boot-camp-blank](https://github.com/albertattard/java-boot-camp-blank)

    ```bash
    $ git clone https://github.com/albertattard/java-boot-camp-blank.git
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

    For more information about Local Variable Type Inference please refer to the [style guidelines](http://openjdk.java.net/projects/amber/LVTIstyle.html).

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

## Numbers and Strings (Variables and Scope)

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
      String u = "\uD83D\uDC4B 🌎"; /* Equivalent to "👋 \uD83C\uDF0D" */
      System.out.printf( "My char    %s%n", c );
      System.out.printf( "My String  %s%n", s );
      System.out.printf( "My Emoji   %s%n", u );
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

### Primitive Types

Java has eight primitive types and **no more can be added**.

| Type    | Size             | Example               | Range                 |
|---------|------------------|-----------------------|-----------------------|
| byte    | 1 byte           | 123 0173 0x7B         | -128 .. +127          |
| short   | 2 bytes          | 32000 0173 0x5000     | -32768 .. +32767      |
| int     | 4 bytes          | 70000 010000 0xFFFFFF | +- 2147483647         |
| long    | 8 bytes          | 1L 0173L 0x7BL        | +-9223372036854775807 |
| char    | Unicode: 2 bytes | 'A' '\t' '\u0065'     | '\u0000'..'\uFFFF'    |
| float   | 4 bytes          | 123.0F 1.23E2F        | 3.40282347E+38F       |
| double  | 8 bytes          | 123.0 1.23E2          | 1.79769313E+308       |
| boolean | 1 byte           | true false            | true - false          |

The primitive types in Java, are all in lower case.  It is an `int` and not `Int`.

Note that the `String` type is not in the above list.

### Reference Types (the rest)

The `String` type, like anything else that is not a primitive type, is a reference type.

We can create as many new reference types as we need and this is covered in more depth in the [Classes, Methods and Control Flow section](03%20-%20Classes,%20Methods%20and%20Control%20Flow.md).

By convention, reference types start with a capital letter.  It is a `String` and not a `string`.  Nothing stops us from creating our own reference type using lower-case, but this is discouraged.

One of the main differences between primitive and reference types, is that the latter support functionality (methods).

Consider the following example.

```java
package demo;

public class App {

  public static void main( String[] args ) {
    String s = "Hello 🌎";
    int length = s.length();

    System.out.printf( "The string '%s' is %d bytes (not necessary letters) long%n", s, length );
  }
}
```

The [`String` type has a method called `length()`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/lang/String.html#length()), which returns the number of bytes (not necessary the number of letters as some of these may be more than one byte long) the string requires to store our string in memory.  The above program prints.

```bash
The string 'Hello 🌎' is 8 bytes (not necessary letters) long
```

### Variables and their Values

It is important to make the distinction between variables, types and values.

![Variables and their Values](assets/images/Variables%20and%20values.png)

Observations:
1. Variables must have a type
1. Variables' type does not change throughout their existence
1. Variables can contain values of the same type (or a type can be safely stored by the variable)

## Stack and Heap

### OS Process Memory

The OS process memory is divided into four segments:

1. The **text** segment comprises the compiled program code (**Not our Java compiled Java code, but the JVM**)
1. The **data** segment stores global and static variables, allocated and initialized prior to executing main (**Used by the JVM and not our Java code**)
1. The **heap** segment is used for dynamic memory allocation (**The JVM maintains very something similar**)
1. The **stack** segment is used for local variables (**The JVM maintains very something similar**)

![Process Memory Model](assets/images/Process%20Memory%20Model.png)

The *text* and *data* segments are fixed, and their size does not change during the program's lifetime.

The *stack* and the *heap* segments start at opposite ends of the process's free space and grow towards each other.  If they should ever meet, then either a stack overflow or out of memory error will occur.

When working with Java, we mainly work with the *Java stack* and the *Java heap*.  It is important to note that the OS process memory and the memory we work with within the JVM, behave similarly but are different things.

Consider the following command, used to start our application.

```bash
$ java -jar application.jar
```

The `java` is an executable file and when executed it starts the JVM.  The `java` command starts an instance of the JVM.  We can have many JVM instances running, each on a separate OS process, with its own OS process memory.

The JVM uses the OS process memory, shown above, to run and execute our code.  Our code runs within the JVM - a program (our code) runs within another program (JVM).  The JVM executable code (**not our code**) is loaded into the *text* OS process memory and the JVM constants are stored in the *data* segment of the OS process memory.

Internally, the JVM maintains its own *stack* and *heap* (referred to here as the *Java stack* and the *Java heap*), which while these behave similar to the OS process memory, they are different.

**We will only focus on the *Java stack* and *Java heap* from this point onwards**.

### What goes in the Java stack?

When our Java program starts, Java calls our `main()` method.  When Java does so, it adds an entry in the *Java stack*.  Every time a method is called, Java adds an entry in the *Java stack*, and it removes this entry once the method completes.

Once the *Java stack* is empty, our program completes.  Once the `main()` method finishes execution, Java will remove the last entry from the *Java stack* and the program completes.  We will revise and elaborates this point when we discuss [threads and concurrency](11%20-%20Concurrency.md).

All variables created and used within a method are stored in the method's entry in the *Java stack*.

Consider the following example.

```java
package demo;

public class App {

  public static void main( String[] args ) {
    int a = 7;
    System.out.printf( "The value of a is %d%n", a );
  }
}
```

The `main()` method is
1. receiving the command line arguments
    (`String[] args`)
1. creating a local variable
    (`int a = 7;`)
1. calling another method to print a simple message
    (`System.out.printf( "The value of a is %d%n", a );`)

A *Java stack* entry is created for the `main()` method, which will contain two variables, amongst other things.  The `main()` method calls (or invokes) the `printf()` method.  Java will create a new *Java stack* entry for the `printf()` method.  Any variables used by the `printf()` method will be stored in the `printf()`'s entry in the *Java stack*.

![Stack - main() calls printf()](assets/images/Stack%20-%20main()%20calls%20printf().png)

Every time a method is called, Java adds a new entry in the *Java stack*.

Consider the following example

![Stack - showing 4 methods](assets/images/Stack%20-%20showing%204%20methods.png)

Based on the above image, we see that
1. The `main()` method called method `a()`, which in turn called method `b()`, which called method `c()`.
1. The size of *Java stack* entry of each method depends on the number of variables each method contains.  It is clear that method `b()` is quite big when compared with the others.  This means that method `b()` has lots of variables.
1. Method `c()` is the current active method.  Java is currently executing this method.  The method at the top of the *Java stack*, is the active method.

Java has [two types of variables](https://docs.oracle.com/javase/specs/jls/se14/html/jls-4.html#jls-4.12):
1. [primitive types](https://docs.oracle.com/javase/specs/jls/se14/html/jls-4.html#jls-4.12.1)
1. [reference types (also referred to as *objects* or *object types*)](https://docs.oracle.com/javase/specs/jls/se14/html/jls-4.html#jls-4.12.2)

The primitive type variables are stored in the *Java stack*.  

Consider the following variable.

```java
int a = 7;
```

The variable named `a` is of primitive type.  The `int` value of the primitive variables, `7` in this case, is stored in the *Java stack*.

![Primitive Variable stored in the Java Stack](assets/images/Primitive%20Variable%20stored%20in%20the%20Java%20Stack.png)

Reference type variables are stored in two places in the memory.
1. The variable itself, is stored in the *Java stack*
1. The actual object is **not stored** in the *Java stack*.  It is stored in the *Java heap*.

### What goes in the Java Heap?

The *Java heap* contains all our objects.

```java
String s = "my object type";
```

The reference type variable `s` is stored in the *Java stack* while the actual object, `"my object type"`, is stored in the *Java heap*.  The reference type variable `s` will have a reference, hence the name reference type, to the object in the *Java heap*.  Note that we do not use the term *pointer*, like in C/C++, in Java despite these behave in a similar way.

Consider the following two variables

```java
int a = 7;
String s = "my object type";
```

![Stack and Heap](assets/images/Stack%20and%20Heap.png)

The variables (both types) are only found in the *Java stack*, while the objects are only found in the *Java heap*.  The size of the *Java stack* entry for our method is directly proportional to the number of variables our method has.

The size of the method itself (the number of lines of code) is not part of the *Java stack* and is stored elsewhere.

Having large objects, will not affect the *Java stack* as all objects' data is stored in the *Java heap*.

Consider the following example

```java
int a = 7;
String s = "my object type";
String s1 = s;
String s2 = s;
String s3 = s;
```

The above code fragment has 5 variables, one primitive type and four reference types, and an object.

![Many Variables One Object](assets/images/Many%20Variables%20One%20Object.png)

All reference type variables are pointing to the same object in the *Java heap*.

This is quite an important thing to note as when the object in the *Java heap* is modified through one of the variables, all the other variables will be affected.

Consider the following example.

```java
package demo;

import java.awt.Point;

public class App {

  public static void main( String[] args ) {
    /* Create an object */
    Point a = new Point( 5, 5 );
    Point b = a;
    Point c = a;

    /* Modify the object through one of the variables */
    b.x = 7;
    c.y = 3;

    System.out.printf( "Point - x:%d, y:%d%n", a.x, a.y );
  }
}
```

The [`Point` class](https://docs.oracle.com/en/java/javase/14/docs/api/java.desktop/java/awt/Point.html) is part of the Java API.  It represents a point on a cartesian space.

1. Three variables, `a`, `b` and `c` are created and assigned the same object

    ![One Point Three Variables](assets/images/One%20Point%20Three%20Variables%20-%20A.png)

1. The `x` coordinate is modified through variable `b`

    ![One Point Three Variables](assets/images/One%20Point%20Three%20Variables%20-%20B.png)

1. The `y` coordinate is modified through variable `c`

    ![One Point Three Variables](assets/images/One%20Point%20Three%20Variables%20-%20C.png)

The above program will print

```bash
Point - x:7, y:3
```

### Variables without a value

A variable can be declared but not initialised.  Such variable cannot be used before it is initialised.

**⚠️ THE FOLLOWING DOES NOT COMPILE!!**

```java
package demo;

public class App {

  public static void main( String[] args ) {
    int a;
    System.out.printf( "%d%n", a );
  }
}
```

When compiling the above code, we will get an error similar to the following.

```bash
$ ./gradlew clean build

> Task :compileJava FAILED
src/main/java/demo/App.java:7: error: variable a might not have been initialized
    System.out.printf( "%d%n", a );
                               ^
```

The variable will appear on the *Java stack* once a value is assigned to it.  There are cases, where a default value is assigned to variables, but this does not apply to local variables.

### Can we have a reference variable without the equivalent object in the Java heap (null)?

Yes.  We can have reference type variables that do not yet have an equivalent object in the *Java heap*.  As mentioned in the [previous section](#variables-without-a-value), we cannot use variables that do not have a value.

Reference types may be assigned the special value `null`.

Consider the following example

```java
package demo;

public class App {

  public static void main( String[] args ) {
    String a = null;
    System.out.printf( "a = %s%n", a );
  }
}
```

The variable `a` is assigned the special value `null`.  This is a special value, which points to a special place in memory, referred to the [Zero page](https://en.wikipedia.org/wiki/Zero_page).

![nulls](assets/images/null,%20stack%20and%20heap.png)

#### What happens if we try to call a method on a null object?

The `String` class has the `length()`, which returns the number of bytes required by the string.

In this case we are not consuming anything in the *Java heap*, thus one may assume that the `length()` should return `0`.  Unfortunately, it does not work like that.

Consider the following example.

```java
package demo;

public class App {

  public static void main( String[] args ) {
    String a = null;
    int length = a.length();
    System.out.printf( "The length of string is %d%n", length );
  }
}
```

The (reference type) variable `a` is set to the special value `null`.  The above code compiles but fails with the following error when the program is executed.

```bash
Exception in thread "main" java.lang.NullPointerException
	at demo.App.main(App.java:7)
```

#### What is NullPointerException?

The error `NullPointerException` is one of the most common errors in Java.  This is cause when we try to invoke methods on a `null` object.  It is quite simple, yet drives people crazy and [caused billions to the industry](https://www.infoq.com/presentations/Null-References-The-Billion-Dollar-Mistake-Tony-Hoare/).

### String or new String?

**Pending...**


### What happens to a variable when it goes out of scope?

**Pending...**

## Operators

Example

```java
package demo;

public class App {
  public static void main( String[] args ) {
    /* String concatenation */
    {
      int a = 7;
      int b = 3;
      String m = "The number is " + a + b;
      String n = "The number is " + ( a + b );
      System.out.println( "-- String concatenation ----" );
      System.out.printf( "Concatenation:   %s%n", m );
      System.out.printf( "Grouping before: %s%n", n );
    }

    /* Basic Arithmetic */
    {
      int a = 2;
      int b = 2;
      int c = a + b + 2;
      int d = a++;
      int e = ++b;

      int f = 1 / 2;
      int g = 1 % 2;
      int h = -1 % 2;

      System.out.println( "-- Basic Arithmetic ----------" );
      System.out.printf( "a = %d%n", a );
      System.out.printf( "b = %d%n", b );
      System.out.printf( "a + b + 2 = %d%n", c );
      System.out.printf( "a++ = %d%n", d );
      System.out.printf( "++b = %d%n", e );
      System.out.printf( "1 / 2 = %d%n", f );
      System.out.printf( "1 %% 2 = %d%n", g );
      System.out.printf( "1- %% 2 = %d%n", h );
    }

    /* Arithmetic operations return an int (or long) */
    {
      byte a = 7;
      byte b = 3;
      int plus = a + b;
      int minus = a - b;
      byte c = 7;
      c += b;
      System.out.println( "-- Arithmetic operations ---" );
      System.out.printf( "a + b = %d%n", plus );
      System.out.printf( "a - b = %d%n", minus );
      System.out.printf( "c = %d%n", c );
    }

    /* Relational operators */
    {
      boolean a = 2 > 1;
      boolean b = 2 != 2;
      boolean c = a && b;
      boolean d = a || b;
      boolean e = !a;

      System.out.println( "-- Relational operators ---" );
      System.out.printf( "2 > 1 = %s%n", a );
      System.out.printf( "2 != 2 = %s%n", b );
      System.out.printf( "%s && %s = %s%n", a, b, c );
      System.out.printf( "%s || %s = %s%n", a, b, d );
      System.out.printf( "!%s = %s%n", a, e );
    }
  }
}
```

Output

```bash
-- String concatenation ----
Concatenation:   The number is 73
Grouping before: The number is 10
-- Basic Arithmetic ----------
a = 3
b = 3
a + b + 2 = 6
a++ = 2
++b = 3
1 / 2 = 0
1 % 2 = 1
1- % 2 = -1
-- Arithmetic operations ---
a + b = 10
a - b = 4
c = 10
-- Relational operators ---
2 > 1 = true
2 != 2 = false
true && false = false
true || false = true
!true = false
```

## Autoboxing

Example

```java
package demo;

public class App {
  public static void main( String[] args ) {
    /* Objects */
    Integer a = new Integer( 10 ); /* Deprecated */
    Integer b = Integer.valueOf( 10 ); /* Unnecessary Boxing */
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

## Enumerations

**⚠️ THE FOLLOWING EXAMPLE MAKES REFERENCE TO TESTING WHICH IS NOT YET COVERED!!**

The tests require [Junit5](https://mvnrepository.com/artifact/org.junit.jupiter/junit-jupiter)

```groovy
dependencies {
  testImplementation 'org.junit.jupiter:junit-jupiter:5.7.0-M1'
}
```

Consider the [rock paper scissors hand game](https://en.wikipedia.org/wiki/Rock_paper_scissors).

![Rock Paper Scissors Game Rules](assets/images/Rock%20Paper%20Scissors.png)

Example

```java
package demo;

public class RockPaperScissors {

  /* Outcome constants */
  public static final int DRAW = 0;
  public static final int WIN_PLAYER_1 = 1;
  public static final int WIN_PLAYER_2 = 2;

  /* Hand constants */
  public static final int PAPER = 1;
  public static final int SCISSORS = 2;
  public static final int ROCK = 3;

  public static int determineOutcome( int player1, int player2 ) {
    if ( player1 == player2 ) {
      return DRAW;
    }

    return switch ( player1 ) {
      case PAPER -> player2 == ROCK ? WIN_PLAYER_1 : WIN_PLAYER_2;
      case SCISSORS -> player2 == PAPER ? WIN_PLAYER_1 : WIN_PLAYER_2;
      default -> player2 == SCISSORS ? WIN_PLAYER_1 : WIN_PLAYER_2;
    };
  }
}
```

The above example uses `int` as constants to identify what is what.  This was a common practice in the past.

```java
package demo;

import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.junit.jupiter.params.provider.ValueSource;

import static demo.RockPaperScissors.DRAW;
import static demo.RockPaperScissors.PAPER;
import static demo.RockPaperScissors.ROCK;
import static demo.RockPaperScissors.SCISSORS;
import static demo.RockPaperScissors.WIN_PLAYER_1;
import static demo.RockPaperScissors.WIN_PLAYER_2;
import static demo.RockPaperScissors.determineOutcome;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class RockPaperScissorsTest {

  @ValueSource( ints = { PAPER, SCISSORS, ROCK } )
  @ParameterizedTest( name = "should return DRAW (0) when both players play the same hand {0}" )
  void shouldReturnDraw( int hand ) {
    assertEquals( DRAW, determineOutcome( hand, hand ) );
  }

  @CsvSource( { "2,1", "3,2", "1,3" } )
  @ParameterizedTest( name = "should return WIN_PLAYER_1 (1) when player1 plays {0} and player 2 plays {1}" )
  void shouldReturnWinPlayer1( int player1, int player2 ) {
    assertEquals( WIN_PLAYER_1, determineOutcome( player1, player2 ) );
  }

  @CsvSource( { "1,2", "2,3", "3,1" } )
  @ParameterizedTest( name = "should return WIN_PLAYER_2 (2) when player1 plays {0} and player 2 plays {1}" )
  void shouldReturnWinPlayer2( int player1, int player2 ) {
    assertEquals( WIN_PLAYER_2, determineOutcome( player1, player2 ) );
  }
}
```

Java 5 introduced Enums which simplifies the above problem.

1. **Refactor Outcome**

    Replace the imports in the `RockPaperScissorsTest` class

    ```java
    import static demo.RockPaperScissors.DRAW;
    import static demo.RockPaperScissors.WIN_PLAYER_1;
    import static demo.RockPaperScissors.WIN_PLAYER_2;
    ```

    with

    ```java
    import static demo.RockPaperScissors.Outcome.DRAW;
    import static demo.RockPaperScissors.Outcome.WIN_PLAYER_1;
    import static demo.RockPaperScissors.Outcome.WIN_PLAYER_2;
    ```

    The above will not compile until we use the enum.

    Replace the outcome constants with an enum

    ```java
    package demo;

    public class RockPaperScissors {

      public enum Outcome {
        DRAW,
        WIN_PLAYER_1,
        WIN_PLAYER_2;
      }

      public static final int PAPER = 1;
      public static final int SCISSORS = 2;
      public static final int ROCK = 3;

      public static Outcome determineOutcome( int player1, int player2 ) {
        if ( player1 == player2 ) {
          return Outcome.DRAW;
        }

        return switch ( player1 ) {
          case PAPER -> player2 == ROCK ? Outcome.WIN_PLAYER_1 : Outcome.WIN_PLAYER_2;
          case SCISSORS -> player2 == PAPER ? Outcome.WIN_PLAYER_1 : Outcome.WIN_PLAYER_2;
          default -> player2 == SCISSORS ? Outcome.WIN_PLAYER_1 : Outcome.WIN_PLAYER_2;
        };
      }
    }
    ```

1. **Refactor Hand**

    Use the `@EnumSource( Hand.class )` to test against all instances of the `Hand` enum

    ```java
      @EnumSource( Hand.class )
      @ParameterizedTest( name = "should return DRAW (0) when both players play the same hand {0}" )
      void shouldReturnDraw( RockPaperScissors.Hand hand ) {
        assertEquals( DRAW, determineOutcome( hand, hand ) );
      }
    ```

    Use the enum name as input to the `@CsvSource`

    ```java
      @CsvSource( { "PAPER,ROCK", "SCISSORS,PAPER", "ROCK,SCISSORS" } )
      @ParameterizedTest( name = "should return WIN_PLAYER_1 (1) when player1 plays {0} and player 2 plays {1}" )
      void shouldReturnWinPlayer1( Hand player1, Hand player2 ) {
        assertEquals( WIN_PLAYER_1, determineOutcome( player1, player2 ) );
      }
    ```

    Complete example

    ```java
    package demo;

    import org.junit.jupiter.params.ParameterizedTest;
    import org.junit.jupiter.params.provider.CsvSource;
    import org.junit.jupiter.params.provider.EnumSource;

    import static demo.RockPaperScissors.Hand;
    import static demo.RockPaperScissors.Outcome.DRAW;
    import static demo.RockPaperScissors.Outcome.WIN_PLAYER_1;
    import static demo.RockPaperScissors.Outcome.WIN_PLAYER_2;
    import static demo.RockPaperScissors.determineOutcome;
    import static org.junit.jupiter.api.Assertions.assertEquals;

    public class RockPaperScissorsTest {

      @EnumSource( Hand.class )
      @ParameterizedTest( name = "should return DRAW (0) when both players play the same hand {0}" )
      void shouldReturnDraw( RockPaperScissors.Hand hand ) {
        assertEquals( DRAW, determineOutcome( hand, hand ) );
      }

      @CsvSource( { "PAPER,ROCK", "SCISSORS,PAPER", "ROCK,SCISSORS" } )
      @ParameterizedTest( name = "should return WIN_PLAYER_1 (1) when player1 plays {0} and player 2 plays {1}" )
      void shouldReturnWinPlayer1( Hand player1, Hand player2 ) {
        assertEquals( WIN_PLAYER_1, determineOutcome( player1, player2 ) );
      }

      @CsvSource( { "ROCK,PAPER", "PAPER,SCISSORS", "SCISSORS,ROCK" } )
      @ParameterizedTest( name = "should return WIN_PLAYER_2 (2) when player1 plays {0} and player 2 plays {1}" )
      void shouldReturnWinPlayer2( Hand player1, Hand player2 ) {
        assertEquals( WIN_PLAYER_2, determineOutcome( player1, player2 ) );
      }
    }
    ```

    Replace the hand `int` constants with the `Hand` enum

    ```java
    package demo;

    public class RockPaperScissors {

      public enum Outcome {
        DRAW,
        WIN_PLAYER_1,
        WIN_PLAYER_2;
      }

      public enum Hand {
        PAPER,
        SCISSORS,
        ROCK;
      }

      public static Outcome determineOutcome( final Hand player1, final Hand player2 ) {
        if ( player1 == player2 ) {
          return Outcome.DRAW;
        }

        return switch ( player1 ) {
          case PAPER -> player2 == Hand.ROCK ? Outcome.WIN_PLAYER_1 : Outcome.WIN_PLAYER_2;
          case SCISSORS -> player2 == Hand.PAPER ? Outcome.WIN_PLAYER_1 : Outcome.WIN_PLAYER_2;
          case ROCK -> player2 == Hand.SCISSORS ? Outcome.WIN_PLAYER_1 : Outcome.WIN_PLAYER_2;
        };
      }
    }
    ```

1. **Enums in Java can have methods**

    ````java
      public enum Hand {
        PAPER,
        SCISSORS,
        ROCK;

        public Outcome determineOutcome( final Hand other ) {
          if ( this == other ) {
            return Outcome.DRAW;
          }

          return switch ( this ) {
            case PAPER -> other == Hand.ROCK ? Outcome.WIN_PLAYER_1 : Outcome.WIN_PLAYER_2;
            case SCISSORS -> other == Hand.PAPER ? Outcome.WIN_PLAYER_1 : Outcome.WIN_PLAYER_2;
            case ROCK -> other == Hand.SCISSORS ? Outcome.WIN_PLAYER_1 : Outcome.WIN_PLAYER_2;
          };
        }
      }
    ````

    Complete example

    ```java
    package demo;

    public class RockPaperScissors {

      public enum Outcome {
        DRAW,
        WIN_PLAYER_1,
        WIN_PLAYER_2;
      }

      public enum Hand {
        PAPER,
        SCISSORS,
        ROCK;

        public Outcome determineOutcome( final Hand other ) {
          if ( this == other ) {
            return Outcome.DRAW;
          }

          return switch ( this ) {
            case PAPER -> other == Hand.ROCK ? Outcome.WIN_PLAYER_1 : Outcome.WIN_PLAYER_2;
            case SCISSORS -> other == Hand.PAPER ? Outcome.WIN_PLAYER_1 : Outcome.WIN_PLAYER_2;
            case ROCK -> other == Hand.SCISSORS ? Outcome.WIN_PLAYER_1 : Outcome.WIN_PLAYER_2;
          };
        }
      }

      public static Outcome determineOutcome( final Hand player1, final Hand player2 ) {
        return player1.determineOutcome( player2 );
      }
    }
    ```

## Imports and Packages

Example

```java
package demo;

import java.util.Random;

public class App {
  public static void main( String[] args ) {
    /* We are using a seed to always get the same sequence from this pseudo random number generator. */
    Random r = new Random( 1L );

    /* Random number between 0 (inclusive) up to 100 (exclusive) */
    int i = r.nextInt( 100 );
    System.out.printf( "The number was %d%n", i );
  }
}
```

Output

```bash
The number was 85
```

## Date Time API

Example

```java
package demo;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;

public class App {
  public static void main( String[] args ) {
    LocalDate now = LocalDate.now();
    LocalDate lastWeek = now.minusWeeks( 1 );

    LocalTime noon = LocalTime.NOON;
    LocalTime eleven = noon.minusHours( 1 );

    LocalDateTime yesterday = LocalDateTime.now().minusDays( 1 );

    ZonedDateTime malta = yesterday.atZone( ZoneId.of( "Europe/Malta" ) );
    ZonedDateTime toronto = yesterday.atZone( ZoneId.of( "America/Toronto" ) );
    ZonedDateTime vancouver = yesterday.atZone( ZoneId.of( "America/Vancouver" ) );

    DateTimeFormatter formatter = DateTimeFormatter.ofPattern( "yyyy MMM dd HH:mm '(in 'v')'" );
    String formatted = malta.format( formatter );
    LocalDate parsed = LocalDate.parse( "2020-04-27", DateTimeFormatter.ISO_DATE );

    System.out.println( "-- Date ----------" );
    System.out.printf( "Today:     %s%n", now );
    System.out.printf( "Last Week: %s%n", lastWeek );

    System.out.println( "-- Time ----------" );
    System.out.printf( "Noon:      %s%n", noon );
    System.out.printf( "Eleven:    %s%n", eleven );

    System.out.println( "-- Date/Time -----" );
    System.out.printf( "Yesterday: %s%n", yesterday );

    System.out.println( "-- With offset ---" );
    System.out.printf( "Yesterday: %s%n", malta );
    System.out.printf( "Yesterday: %s%n", toronto );
    System.out.printf( "Yesterday: %s%n", vancouver );

    System.out.println( "-- Formatter -----" );
    System.out.printf( "Formatted: %s%n", formatted );
    System.out.printf( "Parsed:    %s%n", parsed );
  }
}
```

Output

```bash
-- Date ----------
Today:     2020-04-28
Last Week: 2020-04-21
-- Time ----------
Noon:      12:00
Eleven:    11:00
-- Date/Time -----
Yesterday: 2020-04-27T20:10:46.298083
-- With offset ---
Yesterday: 2020-04-27T20:10:46.298083+02:00[Europe/Malta]
Yesterday: 2020-04-27T20:10:46.298083-04:00[America/Toronto]
Yesterday: 2020-04-27T20:10:46.298083-07:00[America/Vancouver]
-- Formatter -----
Formatted: 2020 Apr 27 20:10 (in CET)
Parsed:    2020-04-27
```

## Internationalization

Example

```java
package demo;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.TemporalField;
import java.time.temporal.WeekFields;
import java.util.Locale;

public class App {
  public static void main( String[] args ) {
    LocalDate now = LocalDate.now();

    TemporalField fieldSys = WeekFields.of( Locale.getDefault() ).dayOfWeek();
    TemporalField fieldUK = WeekFields.of( Locale.UK ).dayOfWeek();
    TemporalField fieldUS = WeekFields.of( Locale.US ).dayOfWeek();

    LocalDate firstSys = now.with( fieldSys, 1 );
    LocalDate firstUK = now.with( fieldUK, 1 );
    LocalDate firstUS = now.with( fieldUS, 1 );

    DateTimeFormatter formatter = DateTimeFormatter.ofPattern( "dd E" );

    System.out.printf( "First day of week: %s (System)%n", firstSys.format( formatter ) );
    System.out.printf( "First day of week: %s (UK)%n", firstUK.format( formatter ) );
    System.out.printf( "First day of week: %s (US)%n", firstUS.format( formatter ) );
  }
}
```

Output

```bash
First day of week: 27 Mon (System)
First day of week: 27 Mon (UK)
First day of week: 26 Sun (US)
```
