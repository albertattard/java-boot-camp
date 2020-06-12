---
layout: default
title: JShell
parent: Java Light
nav_order: 1
permalink: docs/java-light/jshell/
---

# JShell

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

    ```java
    |  Welcome to JShell -- Version 14.0.1
    |  For an introduction type: /help intro

    jshell>
    ```

    To exit JShell, type `/exit`

    ```java
    jshell> /exit
    ```

1. Help

    ```java
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

    ```java
    jshell> a = 7
    |  Error:
    |  cannot find symbol
    |    symbol:   variable a
    |  a = 7
    |  ^
    ```

    **In Java, variables require a type**.  [Java is a statically typed language](https://docs.oracle.com/javase/specs/jls/se14/html/jls-4.html).

    ```java
    jshell> int a = 7
    a ==> 7
    ```

    Normally, a semicolon needs to be added at the end of the statement, indicating the end of statement (as defined by the [JLS 14.8](https://docs.oracle.com/javase/specs/jls/se7/html/jls-14.html#jls-14.8)).

    ```java
    jshell> int a = 7;
    a ==> 7
    ```

    **⚠️ Note that while the semicolon is optional in JShell, this is required in a Java program.  The program will not compile if we ignore the semicolon at the end of the statement**.

    Enter the variable name to print its value

    ```java
    jshell> a
    a ==> 7
    ```

    Java 10 introduced Local Variable Type Inference ([JEP 286](https://openjdk.java.net/jeps/286)).  Previously, all local variable declarations required an explicit (manifest) type on the left-hand side.  With type inference, the explicit type can be replaced by the reserved type name `var` for local variable declarations that have initializers.  The type of the variable is inferred from the type of the initializer.

    ```java
    jshell> var x = 7
    x ==> 7
    ```

    For more information about Local Variable Type Inference please refer to the [style guidelines](http://openjdk.java.net/projects/amber/LVTIstyle.html) and [article Java Feature Spotlight: Local Variable Type Inference by Brian Goetz](https://www.infoq.com/articles/java-local-variable-type-inference/).

    Note that once a variable is created, it cannot change its type.  Once we create an `int`, that variable will stay an `int` and cannot accept anything else.

    ```java
    jshell> int x = 7
    jshell> x = 7.7
    |  Error:
    |  incompatible types: possible lossy conversion from double to int
    |  x = 7.7
    |      ^-^
    ```

    Different from many other languages, [Java is a statically typed language](https://docs.oracle.com/javase/specs/jls/se14/html/jls-4.html) and we cannot compare the integer `1` to the boolean `true`

    ```java
    jshell> 1 == true
    |  Error:
    |  incomparable types: int and boolean
    |  1 == true
    |  ^-------^
    ```

1. Arithmetic Operations

    ```java
    jshell> int b = 3
    b ==> 3

    jshell> a + b
    $4 ==> 10
    ```

    The result is stored in a new temporary variable, `$4`, (crated by JShell) which can be accessed as any other variable.

    ```java
    jshell> $4
    $4 ==> 10
    ```

1. Use existing functionality

    JShell imports automatically classes and functionality from the following packages

    ```java
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

    ```java
    jshell> var r = new Random()
    r ==> java.util.Random@533ddba

    jshell> r.nextInt(10)
    $3 ==> 8
    ```

    JShell has tab completion.  Type `Math.` and then press the `[tab]` key

    ```java
    jshell> Math.
    E                 IEEEremainder(    PI                abs(              acos(             addExact(         asin(             atan(             atan2(            cbrt(             ceil(             class             copySign(
    cos(              cosh(             decrementExact(   exp(              expm1(            floor(            floorDiv(         floorMod(         fma(              getExponent(      hypot(            incrementExact(   log(
    log10(            log1p(            max(              min(              multiplyExact(    multiplyFull(     multiplyHigh(     negateExact(      nextAfter(        nextDown(         nextUp(           pow(              random()
    rint(             round(            scalb(            signum(           sin(              sinh(             sqrt(             subtractExact(    tan(              tanh(             toDegrees(        toIntExact(       toRadians(
    ulp(
    jshell> Math.
    ```

    You will see all methods (functionality) available to the `Math` class.

    ```java
    jshell> int a = 7
    jshell> int b = 3
    jshell> Math.max(a, b)
    $5 ==> 7
    ```

    We can import all methods available in the `Math` class so that we can invoke these methods by their name.

    ```java
    jshell> import static java.lang.Math.*

    jshell> max(a, b)
    $5 ==> 7

    jshell> PI
    PI ==> 3.141592653589793
    ```

    A list of functions available in the Math class can be found [here](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/lang/Math.html).

1. Add new functionality (a method)

    ```java
    jshell>  int sum(int a, int b) {
       ...> return a+b;
       ...> }
    |  created method sum(int,int)
    ```

    The created a method, named `sum()`, takes two integers and returns their sum.

    ```java
    jshell> sum(4,5)
    $7 ==> 9
    ```

For more information about JSHell, please refer to the [JShell documentation](https://docs.oracle.com/javase/10/jshell/JSHEL.pdf).
