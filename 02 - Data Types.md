# Data Types

## TOC

1. [Setup](#setup)
1. [JShell](#jshell)
1. [Numbers and Strings (Variables and Scope)](#numbers-and-strings-variables-and-scope)
    1. [Puzzle (Time for a change)](#puzzle-time-for-a-change)
    1. [Puzzle (Long Division)](#puzzle-long-division)
    1. [Puzzle (It's Elementary)](#puzzle-its-elementary)
    1. [Puzzle (The Joy of Hex)](#puzzle-the-joy-of-hex)
    1. [Puzzle (Hello Whirled)](#puzzle-hello-whirled)
    1. [Puzzle (Line Printer)](#puzzle-line-printer)
    1. [Puzzle (huh?)](#puzzle-huh)
    1. [Puzzle (String Cheese)](#puzzle-string-cheese)
    1. [Puzzle (Classy Fire)](#puzzle-classy-fire)
    1. [Puzzle (What's my class?)](#puzzle-whats-my-class)
    1. [Puzzle (What's my class, Take 2)](#puzzle-whats-my-class-take-2)
    1. [Mutable Strings](#mutable-strings)
        1. [Puzzle (No Pain, No Gain)](#puzzle-no-pain-no-gain)
    1. [Multiline Strings](#multiline-strings)
    1. [Primitive Types](#primitive-types)
    1. [Signed and Unsigned Integrals](#signed-and-unsigned-integrals)
    1. [Reference Types (the rest)](#reference-types-the-rest)
    1. [Variables and their Values](#variables-and-their-values)
1. [Stack and Heap](#stack-and-heap)
    1. [OS Process Memory](#os-process-memory)
    1. [What goes in the Java Stack?](#what-goes-in-the-java-stack)
    1. [What goes in the Java Heap?](#what-goes-in-the-java-heap)
    1. [Variables without a value](#variables-without-a-value)
    1. [Can we have a reference variable without the equivalent object in the Java heap (null)?](#can-we-have-a-reference-variable-without-the-equivalent-object-in-the-java-heap-null)
        1. [What happens if we try to call a method on a null object?](#what-happens-if-we-try-to-call-a-method-on-a-null-object)
        1. [What is NullPointerException?](#what-is-nullpointerexception)
    1. [The new operator and the Java Heap](#the-new-operator-and-the-java-heap)
    1. [Garbage Collection](#garbage-collection)
    1. [String or new String?](#string-or-new-string)
    1. [What happens to a variable when it goes out of scope?](#what-happens-to-a-variable-when-it-goes-out-of-scope)
1. [Operators](#operators)
    1. [Puzzle (Tweedledum)](#puzzle-tweedledum)
    1. [Puzzle (Tweedledee)](#puzzle-tweedledee)
    1. [Puzzle (The Last Laugh)](#puzzle-the-last-laugh)
    1. [Puzzle (Oddity)](#puzzle-oddity)
    1. [Puzzle (Swap Meat)](#puzzle-swap-meat)
    1. [Puzzle (Escape Rout)](#puzzle-escape-rout)
    1. [Puzzle (A Big Delight in Every Byte)](#puzzle-a-big-delight-in-every-byte)
    1. [Puzzle (Inclement Increment)](#puzzle-inclement-increment)
1. [Mutable and Immutable](#mutable-and-immutable)
    1. [The final keyword](#the-final-keyword)
1. [Casting](#casting)
    1. [Puzzle (Multicast)](#puzzle-multicast)
1. [Autoboxing](#autoboxing)
    1. [Autoboxing is an easy target for NullPointerException](#autoboxing-is-an-easy-target-for-nullpointerexception)
1. [Enumerations](#enumerations)
    1. [Can we create an instance of an enum?](#can-we-create-an-instance-of-an-enum)
    1. [Enums in Java can have methods](#enums-in-java-can-have-methods)
    1. [Even enums have names too](#even-enums-have-names-too)
    1. [Enum's Ordinal](#enums-ordinal)
        1. [Can we retrieve the enum through the ordinal?](#can-we-retrieve-the-enum-through-the-ordinal)
    1. [Enums in Java can have state](#enums-in-java-can-have-state)
    1. [Considerations before Persisting Enums](#considerations-before-persisting-enums)
        1. [Using the Enum's Ordinal as the unit of Persistence](#using-the-enums-ordinal-as-the-unit-of-persistence)
        1. [Using the Enum's Name as the unit of Persistence](#using-the-enums-name-as-the-unit-of-persistence)
        1. [Using a specific property as the unit of Persistence](#using-a-specific-property-as-the-unit-of-persistence)
    1. [Enums can extend functionality](#enums-can-extend-functionality)
1. [Packages, Imports and Static Imports](#packages-imports-and-static-imports)
    1. [Packages](#packages)
        1. [Organise Packages by Technology](#organise-packages-by-technology)
        1. [Organise Packages by Feature](#organise-packages-by-feature)
        1. [Organise Packages by Feature and Technology (Hybrid)](#organise-packages-by-feature-and-technology-hybrid)
    1. [Imports](#imports)
    1. [Static Imports](#static-imports)
1. [Date Time API](#date-time-api)
1. [Internationalization](#internationalization)

## Setup

1. Clone Repo: [java-boot-camp-blank](https://github.com/albertattard/java-boot-camp-blank)

    ```bash
    $ git clone https://github.com/albertattard/java-boot-camp-blank.git
    ```

1. Open the repo in IDE

1. **⚠️ SOME EXAMPLES MAKES REFERENCE TO TESTING WHICH IS NOT YET COVERED!!**

    Make sure you have a recent version of [JUnit 5 Aggregator](https://mvnrepository.com/artifact/org.junit.jupiter/junit-jupiter) as part of your dependencies.

    ```groovy
    dependencies {
      testImplementation 'org.junit.jupiter:junit-jupiter:5.7.0-M1'
    }
    ```

    Testing is covered in depth in the [testing section](04%20-%20Testing.md).

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

### Puzzle (Time for a change)

Consider the following example.

```java
package demo;

public class App {
  public static void main( String[] args ) {
    System.out.println( 2.00 - 1.10 );
  }
}
```

What do you think it will print?

```bash
0.8999999999999999
```

This example was taken from [PUZZLE 2: TIME FOR A CHANGE in Java™ Puzzlers: Traps, Pitfalls, and Corner Cases](https://learning.oreilly.com/library/view/javatm-puzzlers-traps/032133678X/ch02.html).

1. "_The problem is that the number `1.1` can't be represented exactly as a `double`, so it is represented by the closest `double` value.  The program subtracts this value from `2`.  Unfortunately, the result of this calculation is not the closest `double` value to `0.9`.  The shortest representation of the resulting `double` value is the hideous number that you see printed._"

1. "_Binary floating-point is particularly ill-suited to monetary calculations, as it is impossible to represent `0.1`—or any other negative power of `10`—exactly as a finite-length binary fraction ([Effective Java - Item 60: Avoid float and double if exact answers are required](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/ch9.xhtml#lev60))._"

### Puzzle (Long Division)

Consider the following example.

```java
package demo;

public class App {
  public static void main( String[] args ) {
    long microsPerDay = 24 * 60 * 60 * 1000 * 1000;
    long millisPerDay = 24 * 60 * 60 * 1000;
    System.out.println( microsPerDay / millisPerDay );
  }
}
```

The program should print `1000`, but unfortunately, it prints `5`. What exactly is going on here?

```bash
5
```

This example was taken from [PUZZLE 3: LONG DIVISION in Java™ Puzzlers: Traps, Pitfalls, and Corner Cases](https://learning.oreilly.com/library/view/javatm-puzzlers-traps/032133678X/ch02.html).

1. "_The problem is that the computation of the constant `microsPerDay` does overflow.  Although the result of the computation fits in a `long` with room to spare, it doesn't fit in an `int`.  The computation is performed entirely in `int` arithmetic, and only after the computation completes is the result promoted to a `long`.  By then, it's too late: The computation has already overflowed, returning a value that is too low by a factor of `200`.  The promotion from `int` to `long` is a widening primitive conversion [JLS 5.1.2](https://docs.oracle.com/javase/specs/jls/se14/html/jls-5.html#jls-5.1.2), which preserves the (incorrect) numerical value.  This value is then divided by `millisPerDay`, which was computed correctly because it does fit in an `int`.  The result of this division is `5`._"

### Puzzle (It's Elementary)

Consider the following example.

```java
package demo;

public class App {
  public static void main( String[] args ) {
    System.out.println( 12345 + 5432l );
  }
}
```

What do you think the above will print?

```bash
17777
```

This example was taken from [PUZZLE 4: IT'S ELEMENTARY in Java™ Puzzlers: Traps, Pitfalls, and Corner Cases](https://learning.oreilly.com/library/view/javatm-puzzlers-traps/032133678X/ch02.html).

1. "_Things are seldom what they seem.  Take this program, for instance.  It doesn't say what you think it does.  Take a careful look at the two operands of the `+` operator.  We are adding the `int` value `12345` to the `long` value `5432l`.  Note the subtle difference in shape between the digit `1` at the beginning of the left operand and the lowercase letter *el* at the end of the right operand._"

### Puzzle (The Joy of Hex)

Consider the following example.

```java
package demo;

public class App {
  public static void main( String[] args ) {
    System.out.println( Long.toHexString( 0x100000000L + 0xcafebabe ) );
  }
}
```

The above seems to be adding the following two Hexadecimal numbers

```hex
100000000
 cafebabe
```

This output represents the low-order 32 bits of the correct sum, but somehow the thirty-third bit gets lost.

```bash
cafebabe
```

This example was taken from [PUZZLE 5: THE JOY OF HEX in Java™ Puzzlers: Traps, Pitfalls, and Corner Cases](https://learning.oreilly.com/library/view/javatm-puzzlers-traps/032133678X/ch02.html).

1. "_Decimal literals have a nice property that is not shared by hexadecimal or octal literals: Decimal literals are all positive [JLS 3.10.1](https://docs.oracle.com/javase/specs/jls/se14/html/jls-3.html#jls-3.10.1).  To write a negative decimal constant, you use the unary negation operator (`-`) in combination with a decimal literal.  In this way, you can write any `int` or `long` value, whether positive or negative, in decimal form, and negative decimal constants are clearly identifiable by the presence of a minus sign.  Not so for hexadecimal and octal literals.  They can take on both positive and negative values. Hex and octal literals are negative if their high-order bit is set.  In this program, the number `0xcafebabe` is an `int` constant with its high-order bit set, so it is negative.  It is equivalent to the decimal value `-889275714`._"

1. "_The addition performed by the program is a mixed-type computation: The left operand is of type `long`, and the right operand is of type `int`.  To perform the computation, Java promotes the `int` value to a `long` with a widening primitive conversion [JLS 5.1.2](https://docs.oracle.com/javase/specs/jls/se14/html/jls-5.html#jls-5.1.2) and adds the two `long` values.  Because `int` is a signed integral type, the conversion performs sign extension: It promotes the negative `int` value to a numerically equal `long` value._"

### Puzzle (Hello Whirled)

```java
/**
 * Generated by the IBM IDL-to-Java compiler, version 1.0
 * from F:\TestRoot\apps\a1\units\include\PolicyHome.idl
 * Wednesday, June 17, 1998 6:44:40 o'clock AM GMT+00:00
 */
package demo;

public class App {
  public static void main( final String[] args ) {
    System.out.print( "Hell" );
    System.out.println( "o world" );
  }
}
```

What do you think the above will print, if you get it to compile!!

This example was taken from [PUZZLE 15: HELLO WHIRLED in Java™ Puzzlers: Traps, Pitfalls, and Corner Cases](https://learning.oreilly.com/library/view/javatm-puzzlers-traps/032133678X/ch03.html).

1. "_The problem is in the third line of the comment, which contains the characters `\units`.  These characters begin with a backslash (`\`) followed by the letter `u`, which denotes the start of a Unicode escape.  Unfortunately, these characters are not followed by four hexadecimal digits, so the Unicode escape is ill-formed, and the compiler is required to reject the program.  Unicode escapes must be well formed, even if they appear in comments._"

### Puzzle (Line Printer)

```java
package demo;

public class App {
  public static void main( final String[] args ) {
    // Note: \u000A is Unicode representation of linefeed (LF)
    char c = 0x000A;
    System.out.println( c );
  }
}
```

What will this program print, if it compiles!!

```bash
src/main/java/demo/App.java:5: error: ';' expected
    // Note: \u000A is Unicode representation of linefeed (LF)
```

This example was taken from [PUZZLE 16: LINE PRINTER in Java™ Puzzlers: Traps, Pitfalls, and Corner Cases](https://learning.oreilly.com/library/view/javatm-puzzlers-traps/032133678X/ch03.html).

1. "_The key to this puzzle is the comment on the third line of the program. Like the best of comments, this one is `true`.  Unfortunately, this one is a bit too `true`.  The compiler not only translates Unicode escapes into the characters they represent before it parses a program into tokens, but it does so before discarding comments and white space ([JLS 3.2](https://docs.oracle.com/javase/specs/jls/se14/html/jls-3.html#jls-3.2))._"

### Puzzle (huh?)

Is the following a valid program?  Easy right?

```java
\u0070\u0075\u0062\u006c\u0069\u0063\u0020\u0020\u0020\u0020
\u0063\u006c\u0061\u0073\u0073\u0020\u0055\u0067\u006c\u0079
\u007b\u0070\u0075\u0062\u006c\u0069\u0063\u0020\u0020\u0020
\u0020\u0020\u0020\u0020\u0073\u0074\u0061\u0074\u0069\u0063
\u0076\u006f\u0069\u0064\u0020\u006d\u0061\u0069\u006e\u0028
\u0053\u0074\u0072\u0069\u006e\u0067\u005b\u005d\u0020\u0020
\u0020\u0020\u0020\u0020\u0061\u0072\u0067\u0073\u0029\u007b
\u0053\u0079\u0073\u0074\u0065\u006d\u002e\u006f\u0075\u0074
\u002e\u0070\u0072\u0069\u006e\u0074\u006c\u006e\u0028\u0020
\u0022\u0048\u0065\u006c\u006c\u006f\u0020\u0077\u0022\u002b
\u0022\u006f\u0072\u006c\u0064\u0022\u0029\u003b\u007d\u007d
```

The above is equivalent to

```java
public
class Ugly
{public
    static
void main(
String[ ]
    args){
System.out
.println(
"Hello w"+
"orld");}}
```

This example was taken from [PUZZLE 17: HUH? in Java™ Puzzlers: Traps, Pitfalls, and Corner Cases](https://learning.oreilly.com/library/view/javatm-puzzlers-traps/032133678X/ch03.html).

1. "_The lesson of this puzzle is: Just because you can doesn't mean you should.  Alternatively, If it hurts when you do it, don't do it!  More seriously, this puzzle serves to reinforce the lessons of the previous three: Unicode escapes are essential when you need to insert characters that can't be represented in any other way into your program.  **Avoid them in all other cases**.  Unicode escapes reduce program clarity and increase the potential for bugs._"

### Puzzle (String Cheese)

Consider the following example.

```java
package demo;

public class App {
  public static void main( String[] args ) {
    byte[] bytes = new byte[256];
    for ( int i = 0; i < 256; i++ )
      bytes[i] = (byte) i;
    String str = new String( bytes );
    for ( int i = 0, n = str.length(); i < n; i++ )
      System.out.print( (int) str.charAt( i ) + " " );
  }
}
```

This program creates a string from a sequence of bytes, then iterates over the characters in the string and prints them as numbers. Describe the sequence of numbers that the program prints:

```bash
... 125 126 127 65533 65533 65533 ...
```

This example was taken from [PUZZLE 18: STRING CHEESE in Java™ Puzzlers: Traps, Pitfalls, and Corner Cases](https://learning.oreilly.com/library/view/javatm-puzzlers-traps/032133678X/ch03.html).

1. "_If you ran the program, maybe you saw this sequence. Then again, maybe you didn't.  We ran it on four machines and saw four different sequences, including the one described previously.  This program isn't even guaranteed to terminate normally, much less to print any particular sequence.  Its behavior is completely unspecified._"

1. "_The culprit here is the `String( byte[ ] )` constructor.  Its specification says: `"Constructs a new String by decoding the specified byte array using the platform's default charset. The length of the new String is a function of the charset, and hence may not be equal to the length of the byte array. The behavior of this constructor when the given bytes are not valid in the default charset is unspecified"` ([Java-API](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/lang/String.html#%3Cinit%3E(byte%5B%5D)))._"

### Puzzle (Classy Fire)

Consider the following example.

```java
package demo;

public class App {
  public static void main( String[] args ) {
    System.out.println( classify( 'n' ) + classify( '+' ) + classify( '2' ) );
  }

  static String classify( char ch ) {
    if ( "0123456789".indexOf( ch ) >= 0 )
      return "NUMERAL ";

    if ( "abcdefghijklmnopqrstuvwxyz".indexOf( ch ) >= 0 )
      return "LETTER ";

    /* (Operators not supported yet)
        if ("+-*/&|!=".indexOf(ch) >= 0)
    return "OPERATOR ";
    */

    return "UNKNOWN ";
  }
}
```

What do you think the program will print?

This example was taken from [PUZZLE 19: CLASSY FIRE in Java™ Puzzlers: Traps, Pitfalls, and Corner Cases](https://learning.oreilly.com/library/view/javatm-puzzlers-traps/032133678X/ch03.html).

1. "_As you can see, the comment ends inside the string, which quite naturally contains the characters `*/`.  The resulting program is syntactically invalid.  Our attempt to comment out a section of the program failed because string literals are not treated specially within comments._"

### Puzzle (What's my class?)

Consider the following example.

```java
package demo;

public class App {
  public static void main( String[] args ) {
    String name = App.class.getName().replaceAll( ".", "/" ) + ".class";
    System.out.println( name );
  }
}
```

What will the above code prints?

```bash
////////.class
```

This example was taken from [PUZZLE 20: WHAT'S MY CLASS? in Java™ Puzzlers: Traps, Pitfalls, and Corner Cases](https://learning.oreilly.com/library/view/javatm-puzzlers-traps/032133678X/ch03.html).

1. "_The problem is that `String.replaceAll()` takes a regular expression as its first parameter, not a literal sequence of characters.  (Regular expressions were added to the Java platform in release 1.4.) The regular expression `"."` matches any single character, and so every character of the class name is replaced by a slash, producing the output we saw._"

### Puzzle (What's my class, Take 2)

```java
package demo;

import java.io.File;

public class App {
  public static void main( String[] args ) {
    String name = App.class.getName().replaceAll( "\\.", File.separator ) + ".class";
    System.out.println( name );
  }
}
```

Java is said to be [write once and run everywhere](https://docs.oracle.com/javase/tutorial/getStarted/intro/changemylife.html) and that's true, if you avoid some corner cases.  The above will fail on a [Windows operating system](https://www.microsoft.com/en-us/windows).

```bash
Exception in thread "main" StringIndexOutOfBoundsException: String index out of range: 1
  at java.lang.String.charAt(String.java:558)
  at java.util.regex.Matcher.appendReplacement(Matcher.java:696)
  at java.util.regex.Matcher.replaceAll(Matcher.java:806)
  at java.lang.String.replaceAll(String.java:2000)
  at com.javapuzzlers.MeToo.main(MeToo.java:6)
```

This example was taken from [PUZZLE 21: WHAT’S MY CLASS, TAKE 2 in Java™ Puzzlers: Traps, Pitfalls, and Corner Cases](https://learning.oreilly.com/library/view/javatm-puzzlers-traps/032133678X/ch03.html).

1. "_Although this behavior is platform dependent, it isn't exactly what we were looking for. What went wrong on Windows?  It turns out that the second parameter of `String.replaceAll()` is a not an ordinary string but a replacement string, as defined in the `java.util.regex` specification ([Java-API](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/lang/String.html#replaceAll(java.lang.String,java.lang.String))).  A backslash appearing in a replacement string escapes the following character, causing it to be treated literally.  When you run the program on Windows, the replacement string is a lone backslash character, which is invalid.  Admittedly, the exception could be a little more informative._"

### Mutable Strings

**Pending...**

#### Puzzle (No Pain, No Gain)

Consider the following example.

**⚠️ THE FOLLOWING EXAMPLE MAKE USE OF THE SWITCH STATEMENT, DISCUSSED LATER ON**

```java
package demo;

import java.util.Random;

public class App {

  public static void main( String[] args ) {
    Random random = new Random();
    StringBuffer word =
      switch ( random.nextInt( 2 ) ) {
        case 1 -> new StringBuffer( 'P' );
        case 2 -> new StringBuffer( 'G' );
        default -> new StringBuffer( 'M' );
      };

    word.append( 'a' );
    word.append( 'i' );
    word.append( 'n' );

    System.out.println( word );
  }
}
```

Will it output `Pain` or `Main`?  It will not print `Gain` as the `randon.nextInt(2)` will return a value between `0` and `1` both inclusive, never `2`.

This example was taken from [PUZZLE 23: NO PAIN, NO GAIN in Java™ Puzzlers: Traps, Pitfalls, and Corner Cases](https://learning.oreilly.com/library/view/javatm-puzzlers-traps/032133678X/ch03.html).

1. "_The last and most subtle bug is that the expression `new StringBuffer('M')` probably does not do what you think it does.  You may not be familiar with the `StringBuffer(char)` constructor, and with good reason: It does not exist.  There is a parameterless constructor, one that takes a `String` indicating the initial contents of the string buffer and one that takes an `int` indicating its initial capacity.  In this case, the compiler selects the `int` constructor, applying a widening primitive conversion to convert the char value `'M'` into the int value `77` ([JLS 5.1.2](https://docs.oracle.com/javase/specs/jls/se14/html/jls-5.html#jls-5.1.2)).  In other words, `new StringBuffer('M')` returns an empty string buffer with an initial capacity of `77`.  The remainder of the program appends the characters `a`, `i`, and `n` to the empty string buffer and prints out its contents, which are always `ain`._"

### Multiline Strings

As of Java 15, Java will start supporting multiline Strings as defined by [JEP-378](https://openjdk.java.net/jeps/378).

**⚠️ THE FOLLOWING EXAMPLE WILL NOT COMPILE WITH JAVA 14 OR BEFORE!!**

```java
package demo;

public class App {
  public static void main( String[] args ) {
    String s = """
                “This is the day upon which
                 we are reminded of what we
                 are on the other 364.”
                 —Mark Twain
               """;
    System.out.println(s);
  }
}
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

### Signed and Unsigned Integrals

Java 8 introduces unsigned `int` and `long` as shown in the following example.

```java
package demo;

public class App {
  public static void main( final String[] args ) {
    long unsignedLong = Long.parseUnsignedLong( "18446744073709551615" );

    System.out.printf( "The primitive type: %d%n", unsignedLong );
    System.out.printf( "Using the wrapper functions: %s%n", Long.toUnsignedString( unsignedLong ) );
  }
}
```

Note that we need to go through the respective wrapper class in order to obtain the unsigned number.  The wrapper classes have added a set of methods to handle unsigned version as shown next.

1. [compareUnsigned()](https://docs.oracle.com/javase/8/docs/api/java/lang/Long.html#compareUnsigned-long-long-)
1. [divideUnsigned()](https://docs.oracle.com/javase/8/docs/api/java/lang/Long.html#divideUnsigned-long-long-)
1. [parseUnsignedLong()](https://docs.oracle.com/javase/8/docs/api/java/lang/Long.html#parseUnsignedLong-java.lang.String-)
1. [remainderUnsigned()](https://docs.oracle.com/javase/8/docs/api/java/lang/Long.html#remainderUnsigned-long-long-)
1. [toUnsignedString()](https://docs.oracle.com/javase/8/docs/api/java/lang/Long.html#toUnsignedString-long-)

Note that the above methods needs to be used to perform any simple operaiton on the unsigned version of integrals.

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

### What goes in the Java Stack?

When our Java program starts, Java calls our `main()` method.  When Java does so, it adds a new frame in the *Java stack*.  Every time a method is called, Java adds a new frame in the *Java stack*, and it removes this frame once the method completes.

Once the *Java stack* is empty, our program completes.  Once the `main()` method finishes execution, Java will remove the last frame from the *Java stack* and the program completes.  We will revise and elaborates this point when we discuss [threads and concurrency](11%20-%20Concurrency.md).

All variables created and used within a method are stored in the method's frame in the *Java stack*.

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

A new *Java stack* frame is created for the `main()` method, which will contain two variables, amongst other things.  The `main()` method calls (or invokes) the `printf()` method.  Java will create a new *Java stack* frame for the `printf()` method.  Any variables used by the `printf()` method will be stored in the `printf()`'s frame in the *Java stack*.

![Stack - main() calls printf()](assets/images/Stack%20-%20main()%20calls%20printf().png)

Every time a method is called, Java adds a new frame in the *Java stack*.

Consider the following example

![Stack - showing 4 methods](assets/images/Stack%20-%20showing%204%20methods.png)

Based on the above image, we see that
1. The `main()` method called method `a()`, which in turn called method `b()`, which called method `c()`.
1. The size of *Java stack* frame of each method depends on the number of variables each method contains.  It is clear that method `b()` is quite big when compared with the others.  This means that method `b()` has lots of variables.
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

Consider the following example.

```java
int a = 7;
a = 3;
```

1. Variable `a` starts with the value of `7`

![Variable a starts with value 7](assets/images/Primitive%20Variable%20stored%20in%20the%20Java%20Stack.png)

1. Then it is changed to `3` using the assignment operator (`=`)

![Variable a changed its value to 3](assets/images/Java%20Stack%20and%20Assignment%20Operator.png)

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

The variables (both types) are only found in the *Java stack*, while the objects are only found in the *Java heap*.  The size of the *Java stack* frame for our method is directly proportional to the number of variables our method has.

The size of the method itself (such as the number of lines of code or the complex algorithms) does not affect the *Java stack* as methods are stored elsewhere.

Having large objects, will not affect the *Java stack* as all objects' data is stored in the *Java heap*.

Consider the following example

```java
int a = 7;
String s = "my object type";
String s1 = s;
String s2 = s;
String s3 = s;
```

The above code fragment has five variables, one primitive type and four reference types, and an object.

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

### The new operator and the Java Heap

Objects are created using the [`new` operator](https://docs.oracle.com/javase/tutorial/java/javaOO/objectcreation.html).

Consider the following example.

```java
package demo;

import java.awt.Point;

public class App {
  public static void main( String[] args ) {
    Point p = new Point( 1, 2 );
    System.out.printf( "My point is %s%n", p );
  }
}
```

An object of type `Point` is created and assigned to the variable of the same type, `p`.

There are some exceptions to this rule.  Some types of objects can be created without using the `new` operator.

1. Strings can be created by assigning string literals

    ```java
    package demo;

    public class App {
      public static void main( String[] args ) {
        String s = "my string";
        System.out.println( s );
      }
    }
    ```

1. Arrays ([discussed later on, together with collections](07%20-%20Collections.md#arrays)) can be created without using the `new` operator

    ```java
    package demo;

    public class App {
      public static void main( String[] args ) {
        int[] a = { 1, 2, 3, 4, 5 };
        System.out.printf( "The array has %d elements%n", a.length );
      }
    }
    ```

1. Lambda function ([discussed in great depth later on](08%20-%20Lambda.md)) can be created without using the `new` operator as shown next

    ```java
    package demo;

    public class App {
      public static void main( String[] args ) {
        Runnable r = () -> {
          System.out.println( "I'm running in a lambda" );
        };
        r.run();
      }
    }
    ```

Every time the `new` operator is used, a new object is created and added to the *Java heap*.  There is no escape.

Consider the following example.

```java
package demo;

import java.awt.Point;

public class App {
  public static void main( String[] args ) {
    new Point( 1, 2 );
    new Point( 3, 4 );
    new Point( 5, 6 );
  }
}
```

Three objects of type `Point` are created and none are assigned to a variable.

![Objects in Java Heap without a Variable in the Java Stack](assets/images/Objects%20in%20Java%20Heap%20without%20a%20Variable%20in%20the%20Java%20Stack.png)

**Is this a memory leak?**

No.  Java is immune from memory leaks and the above objects will be cleaned by the garbage collector.

### Garbage Collection

Java is a managed language, which means that the programmers does not need to worry about the memory.  The following the image shows the main components of the JVM.

![Key Hotspot JVM Components](assets/images/Key%20Hotspot%20JVM%20Components.png)
([Reference](https://www.oracle.com/technetwork/tutorials/tutorials-1876574.html))

The garbage collector, featuring in the above image, is responsible from removing any objects in the *Java heap* which are not required anymore.  In a nutshell, the garbage collector scans the *Java heap* and removes any dangling objects.  Note that while the garbage collector is running, the JVM is paused.  This is a critical aspect of performance tuning.  A badly tuned system may spend most of its time paused, while the garbage collector cleans the *Java heap*.

Note that the garbage collector only cleans the *Java heap*.  The garbage collector does not clean the *Java stack*.

The main point here is that the garbage collector is not a free lunch.  With that said, **do not optimise prematurely**.  Remember, "*Premature optimization is the root of all evil*".

#### Recommended Reading

1. Optimizing Java ([O'Reilly Video Series](https://learning.oreilly.com/videos/optimizing-java/9781492044673))

### String or new String?

Consider the following.

```java
String s = new String( "my string" );
```

How may `String` objects do we have?

The correct answer is 2.
1. An object is used to store the literal
1. Another object is created when the `new` operator is used

**The above is discouraged as unnecessary objects are created in memory**.  Prefer the following instead.

```java
String s = "my string";
```

### What happens to a variable when it goes out of scope?

Objects that are not required anymore are cleaned by the [garbage collector](#garbage-collection).  The garbage collector cleans the objects and not the variables.

Variables are stored in the *Java stack* and are removed automatically once the variables go out of scope.  Once a variable goes out of scope, the variable is removed from the *Java stack*.

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
      String o = a + b + " is the number";
      System.out.println( "-- String concatenation ----" );
      System.out.printf( "Concatenation:   %s%n", m );
      System.out.printf( "Grouping before: %s%n", n );
      System.out.printf( "Adding before:   %s%n", o );
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
Adding before:   10 is the number
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

### Puzzle (Tweedledum)

Provide declarations for the variables `x` and `i` such that this is a legal statement:

```java
x += i;
```

but this is not:

```java
x = x + i;
```

This example was taken from [PUZZLE 9: TWEEDLEDUM in Java™ Puzzlers: Traps, Pitfalls, and Corner Cases](https://learning.oreilly.com/library/view/javatm-puzzlers-traps/032133678X/ch02.html).

1. "_Many programmers think that the first statement in this puzzle (`x += i`) is simply a shorthand for the second (`x = x + i`).  **This isn't quite true**.  Both of these statements are assignment expressions ([JLS 15.26](https://docs.oracle.com/javase/specs/jls/se14/html/jls-15.html#jls-15.26)).  The second statement uses the simple assignment operator (`=`), whereas the first uses a compound assignment operator.  The compound assignment operators are `+=`, `-=`, `*=`, `/=`, `%=`, `<<=`, `>>=`, `>>>=`, `&=`, `^=`, and `|=`.  The Java language specification says that the compound assignment `E1 op= E2` is equivalent to the simple assignment `E1 = (T) ((E1) op (E2))`, where `T` is the type of `E1`, except that `E1` is evaluated only once ([JLS 15.26.2](https://docs.oracle.com/javase/specs/jls/se14/html/jls-15.html#jls-15.26.2))._"

1. "_In other words, compound assignment expressions automatically cast the result of the computation they perform to the type of the variable on their left-hand side.  If the type of the result is identical to the type of the variable, the cast has no effect.  If, however, the type of the result is wider than that of the variable, the compound assignment operator performs a silent narrowing primitive conversion ([JLS 5.1.3](https://docs.oracle.com/javase/specs/jls/se14/html/jls-5.html#jls-5.1.3)).  Attempting to perform the equivalent simple assignment would generate a compilation error, with good reason._"

### Puzzle (Tweedledee)

Contrariwise, provide declarations for the variables `x` and `i` such that this is a legal statement:

```java
x = x + i;
```

but this is not:

```java
x += i;
```

At first glance, this puzzle might appear to be the same as the [previous one](#puzzle-tweedledum).  Rest assured, it's different.

This example was taken from [PUZZLE 10: TWEEDLEDEE in Java™ Puzzlers: Traps, Pitfalls, and Corner Cases](https://learning.oreilly.com/library/view/javatm-puzzlers-traps/032133678X/ch02.html).

1. "_Compound assignment operators require both operands to be primitives, such as `int`, or boxed primitives, such as `Integer`, with one exception: The `+=` operator allows its right-hand operand to be of any type if the variable on the left-hand side is of type `String`, in which case the operator performs string concatenation ([JLS 15.26.2](https://docs.oracle.com/javase/specs/jls/se14/html/jls-15.html#jls-15.26.2)).  The simple assignment operator (`=`) is much less picky when it comes to allowing object reference types on the left-hand side: You can use them to your heart's content so long as the expression on the right-hand side is assignment compatible with the variable on the left ([JLS 5.2](https://docs.oracle.com/javase/specs/jls/se14/html/jls-5.html#jls-5.2))._"

### Puzzle (The Last Laugh)

Consider the following example.

```java
package demo;

public class App {
  public static void main( String[] args ) {
    System.out.print( "H" + "a" );
    System.out.print( 'H' + 'a' );
  }
}
```

What do you think the above will print?  Will it be `HaHa`?

```bash
Ha169
```

This example was taken from [PUZZLE 11: THE LAST LAUGH in Java™ Puzzlers: Traps, Pitfalls, and Corner Cases](https://learning.oreilly.com/library/view/javatm-puzzlers-traps/032133678X/ch03.html).

1. "_The compiler evaluates the constant expression `'H' + 'a'` by promoting each of the char-valued operands (`'H'` and `'a'`) to `int` values through a process known as widening primitive conversion ([JLS 5.1.2](https://docs.oracle.com/javase/specs/jls/se14/html/jls-5.html#jls-5.1.2), [JLS 5.6.2](https://docs.oracle.com/javase/specs/jls/se14/html/jls-5.html#jls-5.6.2)).  Widening primitive conversion of a `char` to an int zero extends the 16-bit `char` value to fill the 32-bit int.  In the case of `'H'`, the `char` value is `72` and in the case of `'a'`, it is `97`, so the expression `'H' + 'a'` is equivalent to the int constant `72 + 97`, or `169`._"

### Puzzle (Oddity)

Consider the following example.

```java
public static boolean isOdd( int i ) {
  return i % 2 == 1;
}
```

Do you think that the above implementation is correct?

**When in doubt, write a test**.

```java
package demo;

import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

import static demo.App.isOdd;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class AppTest {

  @ParameterizedTest( name = "should return true when given the odd value {0}" )
  @ValueSource( ints = { 1, -1 } )
  void shouldReturnTrueWhenGivenOdd( int oddNumber ) {
    assertTrue( isOdd( oddNumber ) );
  }
}
```

The above test will fail.

```bash
./gradlew test

> Task :test FAILED

AppTest > should return true when given the odd value 1 PASSED

AppTest > should return true when given the odd value -1 FAILED
    org.opentest4j.AssertionFailedError at AppTest.java:14
```

This example was taken from [PUZZLE 1: ODDITY in Java™ Puzzlers: Traps, Pitfalls, and Corner Cases](https://learning.oreilly.com/library/view/javatm-puzzlers-traps/032133678X/ch02.html).

1. "_If you divide `a` by `b`, multiply the result by `b`, and add the remainder, you are back where you started [JLS 15.17.3](https://docs.oracle.com/javase/specs/jls/se14/html/jls-15.html#jls-15.17.3).  This identity makes perfect sense, but in combination with Java’s truncating integer division operator [JLS 15.17.2](https://docs.oracle.com/javase/specs/jls/se14/html/jls-15.html#jls-15.17.2), it implies that when the remainder operation returns a nonzero result, it has the same sign as its left operand._"

### Puzzle (Swap Meat)

Consider the following example.

```java
package demo;

public class App {
  public static void main( String[] args ) {
    cleverSwap();
  }

  public static void cleverSwap() {
    int x = 1984;  // (0x7c0)
    int y = 2001;  // (0x7d1)
    x ^= y ^= x ^= y;
    System.out.printf( "x = %d; y = %d%n", x, y );
  }
}
```

Unfortunately the above swap variables trick does not work in Java.

```bash
x = 0; y = 1984
```

This example was taken from [PUZZLE 7: SWAP MEAT in Java™ Puzzlers: Traps, Pitfalls, and Corner Cases](https://learning.oreilly.com/library/view/javatm-puzzlers-traps/032133678X/ch02.html).

1. "_Long ago, when central processing units had few registers, it was discovered that one could avoid the use of a temporary variable by taking advantage of the property of the exclusive OR operator (`^`) that `(x ^ y ^ x) == y`_"

1. "_This idiom was used in the C programming language and from there made its way into C++ but is not guaranteed to work in either of these languages.  **It is guaranteed not to work in Java**. The Java language specification says that operands of operators are evaluated from left to right ([JLS 15.7](https://docs.oracle.com/javase/specs/jls/se14/html/jls-15.html#jls-15.7)).  To evaluate the expression `x ^= expr`, the value of `x` is sampled before expr is evaluated, and the exclusive OR of these two values is assigned to the variable `x` ([JLS 15.26.2](https://docs.oracle.com/javase/specs/jls/se14/html/jls-15.html#jls-15.26.2)).  In the `cleverSwap()` function, the variable `x` is sampled twice—once for each appearance in the expression—but both samplings occur before any assignments._"

### Puzzle (Escape Rout)

Consider the following example.

```java
package demo;

public class App {
  public static void main( final String[] args ) {
    // \u0022 is the Unicode escape for double quote (")
    System.out.println( "a\u0022.length( ) + \u0022b".length() );
  }
}
```

What would it print?

```bash
2
```

This example was taken from [PUZZLE 14: ESCAPE ROUT in Java™ Puzzlers: Traps, Pitfalls, and Corner Cases](https://learning.oreilly.com/library/view/javatm-puzzlers-traps/032133678X/ch03.html).

1. "_The key to understanding this puzzle is that Java provides no special treatment for Unicode escapes within string literals.  The compiler translates Unicode escapes into the characters they represent before it parses the program into tokens, such as strings literals ([JLS 3.2](https://docs.oracle.com/javase/specs/jls/se14/html/jls-3.html#jls-3.2)).  Therefore, the first Unicode escape in the program closes a one-character string literal (`"a"`), and the second one opens a one-character string literal (`"b"`).  The program prints the value of the expression `"a".length() + "b".length()`, or `2`._"

### Puzzle (A Big Delight in Every Byte)

Consider the follow example.

**⚠️ THE FOLLOWING EXAMPLE MAKE USE OF THE FOOR LOOP STATEMENT, DISCUSSED LATER ON**

```java
package demo;

public class App {

  public static void main( String[] args ) {
    for ( byte b = Byte.MIN_VALUE; b < Byte.MAX_VALUE; b++ ) {
      if ( b == 0x90 )
        System.out.println( "Joy!" );
    }
  }
}
```

How many times the above program prints `Joy`?  Never?

This example was taken from [PUZZLE 24: A BIG DELIGHT IN EVERY BYTE in Java™ Puzzlers: Traps, Pitfalls, and Corner Cases](https://learning.oreilly.com/library/view/javatm-puzzlers-traps/032133678X/ch04.html).

1. "_Simply put, `0x90` is an `int` constant that is outside the range of `byte` values.  This is counterintuitive because `0x90` is a two-digit hexadecimal literal.  Each hex digit takes up `4` bits, so the entire value takes up `8` bits, or `1` byte. The problem is that `byte` is a signed type.  The constant `0x90` is a positive `int` value of `8` bits with the highest bit set.  Legal `byte` values range from `−128` to `+127`, but the int constant `0x90` is equal to `+144`._"

    "_The comparison of a `byte` to an `int` is a mixed-type comparison.  If you think of `byte` values as apples and `int` values as oranges, the program is comparing apples to oranges.  Consider the expression (`(byte)0x90 == 0x90`).  Appearances notwithstanding, it evaluates to `false`.  To compare the byte value `(byte)0x90` to the int value `0x90`, Java promotes the `byte` to an `int` with a widening primitive conversion ([JLS 5.1.2](https://docs.oracle.com/javase/specs/jls/se14/html/jls-5.html#jls-5.1.2)) and compares the two `int` values.  Because `byte` is a signed type, the conversion performs sign extension, promoting negative `byte` values to numerically equal `int` values.  In this case, the conversion promotes `(byte)0x90` to the `int` value `-112`, which is unequal to the `int` value `0x90`, or `+144`._"

### Puzzle (Inclement Increment)

Consider the following example.

**⚠️ THE FOLLOWING EXAMPLE MAKE USE OF THE FOOR LOOP STATEMENT, DISCUSSED LATER ON**

```java
package demo;

public class App {

  public static void main( String[] args ) {
    int j = 0;
    for ( int i = 0; i < 100; i++ )
      j = j++;
    System.out.println( j );
  }
}
```

What will be the value of `j`?

```
0
```

This example was taken from [PUZZLE 25: INCLEMENT INCREMENT in Java™ Puzzlers: Traps, Pitfalls, and Corner Cases](https://learning.oreilly.com/library/view/javatm-puzzlers-traps/032133678X/ch04.html).

1. "_Presumably, the author of the statement meant for it to add `1` to the value of `j`, which is what the expression `j++` does.  Unfortunately, the author inadvertently assigned the value of this expression back to `j`.  When placed after a variable, the `++` operator functions as the postfix increment operator ([JLS 15.14.2](https://docs.oracle.com/javase/specs/jls/se14/html/jls-15.html#jls-15.14.2)): The value of the expression `j++` is the original value of `j` before it was incremented.  Therefore, the preceding assignment first saves the value of `j`, then sets `j` to its value plus `1`, and, finally, resets `j` back to its original value._"

## Mutable and Immutable

Example

```java
package demo;

public class App {

  public static void main( String[] args ) {
    /* Mutable */
    int a = 2;
    a++;

    /* Immutable */
    final int b = 3;

    /* Immutable (initialised after declared) */
    final int c;
    c = 3;

    System.out.printf( "a = %d%n", a );
    System.out.printf( "b = %d%n", b );
    System.out.printf( "c = %d%n", c );
  }
}
```

Output

```
a = 3
b = 3
c = 3
```

### The final keyword

The `final` keyword marks a variable as immutable.  This means that the variable's value, be it the primitive value itself or the reference, cannot be changed.  This means that the *Java stack* value, **and not the *Java heap* value**, cannot be modified.

**The `final` keyword affects the *Java stack* and not the *Java heap* contents**.

## Casting

```java
package demo;

public class App {
  public static void main( String[] args ) {
    final byte a = 7;
    final byte b = 3;
    final byte c = (byte) ( a + b );

    System.out.printf( "c = %d%n", c );
  }
}
```

### Puzzle (Multicast)

Consider the following example.

```java
package demo;

public class App {
  public static void main( final String[] args ) {
    System.out.println( (int) (char) (byte) -1 );
  }
}
```

What do you think the above example, will print?

```bash
65535
```

This example was taken from [PUZZLE 6: MULTICAST in Java™ Puzzlers: Traps, Pitfalls, and Corner Cases](https://learning.oreilly.com/library/view/javatm-puzzlers-traps/032133678X/ch02.html).

1. "_The cast from `byte` to `char` is trickier because `byte` is a signed type and `char` unsigned.  It is usually possible to convert from one integral type to a wider one while preserving numerical value, but it is impossible to represent a negative `byte` value as a `char`.  Therefore, the conversion from `byte` to `char` is not considered a widening primitive conversion ([JLS 5.1.2](https://docs.oracle.com/javase/specs/jls/se14/html/jls-5.html#jls-5.1.2)), but a widening and narrowing primitive conversion ([JLS 5.1.4]((https://docs.oracle.com/javase/specs/jls/se14/html/jls-5.html#jls-5.1.4))): The `byte` is converted to an `int` and the `int` to a `char`._"

## Autoboxing

Example

```java
package demo;

public class App {
  public static void main( final String[] args ) {
    /* Objects */
    final Integer a = new Integer( 10 ); /* Deprecated */
    final Integer b = Integer.valueOf( 10 ); /* Unnecessary Boxing */
    final Integer c = Integer.valueOf( "10" );
    final Integer d = Integer.valueOf( "1010", 2 );

    /* Primitives */
    final int e = 10;
    final int f = Integer.parseInt( "10" );
    final int g = Integer.parseInt( "1010", 2 );

    /* Auto-Boxing */
    final Integer h = e;
    final int i = a;

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

### Autoboxing is an easy target for NullPointerException

**⚠️ THE FOLLOWING EXAMPLE COMPILES BUT PRODUCES A NullPointerException!!**

```java
package demo;

public class App {
  public static void main( final String[] args ) {
    final Integer a = null;
    final int b = a;
    System.out.printf( "The autoboxed value of null is %d%n", b );
  }
}
```

Running this program will throw a `NullPointerException`.

```bash
Exception in thread "main" java.lang.NullPointerException
	at demo.App.main(App.java:6)
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

How can we represent the hand played (*rock*, *paper* or *scissors*) and the game outcome (*draw*, *player 1 wins* or *player 2 wins*).

A common approach, before Java 1.5, was to create a constant table where an `int` value will represent a state.

1. Hand constants

    | Hand     | Value |
    |----------|------:|
    | Paper    |     1 |
    | Scissors |     2 |
    | Rock     |     3 |

1. Outcome constants

    | Outcome      | Value |
    |--------------|------:|
    | Draw         |     0 |
    | Player 1 Win |     1 |
    | Player 2 Win |     2 |

This simplifies coding as we can compare `int`s

| Player 1 | Player 2 | Result |
|---------:|---------:|-------:|
|        1 |        1 |      0 |
|        1 |        2 |      2 |
|        1 |        3 |      1 |
|        2 |        1 |      1 |
|        2 |        2 |      0 |
|        2 |        3 |      2 |
|        3 |        1 |      2 |
|        3 |        2 |      1 |
|        3 |        3 |      0 |

Example

```java
package demo;

public class RockPaperScissors {

  public static int determineOutcome( final int player1, final int player2 ) {
    if ( player1 == player2 ) {
      return 0;
    }

    return switch ( player1 ) {
      case 1 -> player2 == 3 ? 1 : 2;
      case 2 -> player2 == 1 ? 1 : 2;
      default -> player2 == 2 ? 1 : 2;
    };
  }
}
```

The following tests confirms that our implementation is correct

```java
package demo;

import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.junit.jupiter.params.provider.ValueSource;

import static demo.RockPaperScissors.determineOutcome;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class RockPaperScissorsTest {

  @ValueSource( ints = { 1, 2, 3 } )
  @ParameterizedTest( name = "should return 0 when both players play the same hand {0}" )
  void shouldReturnDraw( final int hand ) {
    assertEquals( 0, determineOutcome( hand, hand ) );
  }

  @CsvSource( { "2,1", "3,2", "1,3" } )
  @ParameterizedTest( name = "should return 1 when player1 plays {0} and player 2 plays {1}" )
  void shouldReturnWinPlayer1( final int player1, final int player2 ) {
    assertEquals( 1, determineOutcome( player1, player2 ) );
  }

  @CsvSource( { "1,2", "2,3", "3,1" } )
  @ParameterizedTest( name = "should return 2 when player1 plays {0} and player 2 plays {1}" )
  void shouldReturnWinPlayer2( final int player1, final int player2 ) {
    assertEquals( 2, determineOutcome( player1, player2 ) );
  }
}
```

The above is very hard to read.  By just looking the table, it is hard to understand what is what.

| Player 1 | Player 2 | Result |
|---------:|---------:|-------:|
|        1 |        1 |      0 |
|        1 |        2 |      2 |
|        1 |        3 |      1 |
|        2 |        1 |      1 |
|        2 |        2 |      0 |
|        2 |        3 |      2 |
|        3 |        1 |      2 |
|        3 |        2 |      1 |
|        3 |        3 |      0 |

A better option (always before Java 1.5) is to use `int` constants

1. Hand constants

    | Hand     | Constant | Value |
    |----------|----------|------:|
    | Paper    | PAPER    |     1 |
    | Scissors | SCISSORS |     2 |
    | Rock     | ROCK     |     3 |

1. Outcome constants

    | Outcome      | Constant     | Value |
    |--------------|--------------|------:|
    | Draw         | DRAW         |     0 |
    | Player 1 Win | WIN_PLAYER_1 |     1 |
    | Player 2 Win | WIN_PLAYER_2 |     2 |

The table is now can be easily read and understood

| Player 1 | Player 2 | Result       |
|----------|----------|--------------|
| PAPER    | PAPER    | DRAW         |
| PAPER    | SCISSORS | WIN_PLAYER_2 |
| PAPER    | ROCK     | WIN_PLAYER_1 |
| SCISSORS | PAPER    | WIN_PLAYER_1 |
| SCISSORS | SCISSORS | DRAW         |
| SCISSORS | ROCK     | WIN_PLAYER_2 |
| ROCK     | PAPER    | WIN_PLAYER_2 |
| ROCK     | SCISSORS | WIN_PLAYER_1 |
| ROCK     | ROCK     | DRAW         |

Refactored the code to use the `int` constants instead.

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

  public static int determineOutcome( final int player1, final int player2 ) {
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

Update the tests to make use of the `int` constants instead.

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
  void shouldReturnDraw( final int hand ) {
    assertEquals( DRAW, determineOutcome( hand, hand ) );
  }

  @CsvSource( { "2,1", "3,2", "1,3" } )
  @ParameterizedTest( name = "should return WIN_PLAYER_1 (1) when player1 plays {0} and player 2 plays {1}" )
  void shouldReturnWinPlayer1( final int player1, final int player2 ) {
    assertEquals( WIN_PLAYER_1, determineOutcome( player1, player2 ) );
  }

  @CsvSource( { "1,2", "2,3", "3,1" } )
  @ParameterizedTest( name = "should return WIN_PLAYER_2 (2) when player1 plays {0} and player 2 plays {1}" )
  void shouldReturnWinPlayer2( int player1, int player2 ) {
    assertEquals( WIN_PLAYER_2, determineOutcome( player1, player2 ) );
  }
}
```

[Java 5 introduced Enums](https://docs.oracle.com/javase/1.5.0/docs/guide/language/enums.html) which simplifies the above problem.

Refactor the current solution into using enums

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

    The above will not compile until we add the enum to the `RockPaperScissors` class.

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

      public static Outcome determineOutcome( final int player1, final int player2 ) {
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

    Note that the transition between `int` constants and enums is quite simple.  Kept the same names, and simply moved them inside the enum.

1. **Refactor Hand**

    Use the `@EnumSource( Hand.class )` to test against all instances of the `Hand` enum

    ```java
      @EnumSource( Hand.class )
      @ParameterizedTest( name = "should return DRAW when both players play the same hand {0}" )
      void shouldReturnDraw( final Hand hand ) {
        assertEquals( DRAW, determineOutcome( hand, hand ) );
      }
    ```

    Use the enum name as input to the `@CsvSource`

    ```java
      @CsvSource( { "PAPER,ROCK", "SCISSORS,PAPER", "ROCK,SCISSORS" } )
      @ParameterizedTest( name = "should return WIN_PLAYER_1 when player1 plays {0} and player 2 plays {1}" )
      void shouldReturnWinPlayer1( final Hand player1, final Hand player2 ) {
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
      @ParameterizedTest( name = "should return DRAW when both players play the same hand {0}" )
      void shouldReturnDraw( final Hand hand ) {
        assertEquals( DRAW, determineOutcome( hand, hand ) );
      }

      @CsvSource( { "PAPER,ROCK", "SCISSORS,PAPER", "ROCK,SCISSORS" } )
      @ParameterizedTest( name = "should return WIN_PLAYER_1 when player1 plays {0} and player 2 plays {1}" )
      void shouldReturnWinPlayer1( final Hand player1, final Hand player2 ) {
        assertEquals( WIN_PLAYER_1, determineOutcome( player1, player2 ) );
      }

      @CsvSource( { "ROCK,PAPER", "PAPER,SCISSORS", "SCISSORS,ROCK" } )
      @ParameterizedTest( name = "should return WIN_PLAYER_2 when player1 plays {0} and player 2 plays {1}" )
      void shouldReturnWinPlayer2( final Hand player1, final Hand player2 ) {
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

### Can we create an instance of an enum?

Java does not allow us to create new instances of any enum.  Consider the following example.

**⚠️ THE FOLLOWING EXAMPLE WILL NOT COMPILE!!**

```java
package demo;

import java.awt.Point;

public class App {

  public enum Hand {
    PAPER,
    SCISSORS,
    ROCK;
  }

  public static void main( final String[] args ) {
    /* We can create instance of the point class */
    final Point p = new Point( 1, 2 );

    /* We cannot create an instance of an enum */
    final Hand h = new Hand();
  }
}
```

The above will not compile as we cannot create an instance of an enum.

```bash
src/main/java/demo/App.java:18: error: enum types may not be instantiated
    final Hand h = new Hand();
                   ^
```

We can only use the existing enum constants and cannot create new one.

### Enums in Java can have methods

The `determineOutcome()` method can be moved to the `Hand` enum as shown in the following example.

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

### Even enums have names too

Each enum in Java has a unique name.

Consider the following example.

```java
package demo;

public class App {
  enum Suit {
    CLUBS, DIAMONDS, HEARTS, SPADES;
  }

  public static void main( final String[] args ) {
    final Suit s = Suit.DIAMONDS;
    System.out.printf( "The enum name is: %s%n", s.name() );
  }
}
```

The above example will print.

```bash
The enum name is: DIAMONDS
```

The name of any enum is the same constant name.  The enum's name (as a `String`) can be used to retrieve the enum.  Consider the following code.

```java
package demo;

public class App {
  enum Suit {
    CLUBS, DIAMONDS, HEARTS, SPADES;
  }

  public static void main( final String[] args ) {
    final String name = "SPADES";
    final Suit s = Suit.valueOf( name );
    System.out.printf( "The enum is: %s%n", s );
  }
}
```

The above will print.

```bash
The enum is: SPADES
```

**What happens if no enum is found matching the given name?**

The [`valueOf()` method](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/lang/Enum.html#valueOf(java.lang.Class,java.lang.String)) will thrown an `IllegalArgumentException` if the given name does not match (case-sensitive) any of the enum constants.  Consider the following example.

**⚠️ THE FOLLOWING EXAMPLE WILL COMPILE BUT WILL THROW AN IllegalArgumentException!!**

```java
package demo;

public class App {
  enum Suit {
    CLUBS, DIAMONDS, HEARTS, SPADES;
  }

  public static void main( final String[] args ) {
    final String name = "SPADE";
    final Suit s = Suit.valueOf( name );
    System.out.printf( "The enum is: %s%n", s );
  }
}
```

The above example will throw an `IllegalArgumentException` as shown next.

```bash
Exception in thread "main" java.lang.IllegalArgumentException: No enum constant demo.App.Suit.SPADE
	at java.base/java.lang.Enum.valueOf(Enum.java:273)
	at demo.App$Suit.valueOf(App.java:4)
	at demo.App.main(App.java:10)
```

The name needs to match perfectly including the case.

### Enum's Ordinal

Each enum in Java is associated with a number, referred to as [the ordinal](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/lang/Enum.html#ordinal()).

Consider the following example.

```java
package demo;

public class App {
  enum Suit {
    CLUBS, DIAMONDS, HEARTS, SPADES;
  }

  public static void main( final String[] args ) {
    final Suit s = Suit.DIAMONDS;
    System.out.printf( "The enum %s has an ordinal of %d%n", s, s.ordinal() );
  }
}
```

The first enum constant, `CLUBS` has an ordinal of `0`.  The above example will print.

```bash
The enum DIAMONDS has an ordinal of 1
```

The following table shows the ordinals for the `Suit` enum.

| Enum       | Ordinal |
|------------|--------:|
| `CLUBS`    |     `0` |
| `DIAMONDS` |     `1` |
| `HEARTS`   |     `2` |
| `SPADES`   |     `3` |

The previous example, the rock paper scissors example, can take advantage from the ordinal as shown next.

```java
public enum Hand {
  PAPER,
  SCISSORS,
  ROCK;

  public Outcome determineOutcome( final Hand other ) {
    if ( this == other ) {
      return Outcome.DRAW;
    }

    return beatenBy() == other ? Outcome.WIN_PLAYER_2 : Outcome.WIN_PLAYER_1;
  }

  public Hand beatenBy() {
    final Hand[] hands = Hand.values();
    return hands[( ordinal() + 1 ) % hands.length];
  }
}
```

#### Can we retrieve the enum through the ordinal?

Yes.  Enums can be retrieved based on their ordinal.  The enums have an [implicit method called `values()`](https://docs.oracle.com/javase/specs/jls/se14/html/jls-8.html#jls-8.9.3) which returns an array of all enum constants.

```java
package demo;

public class App {
  enum Suit {
    CLUBS, DIAMONDS, HEARTS, SPADES;
  }

  public static void main( final String[] args ) {
    final Suit[] allSuits = Suit.values();
    final Suit s = allSuits[2];
    System.out.printf( "The enum %s has an ordinal of %d%n", s, s.ordinal() );
  }
}
```

The above will print.

```bash
The enum HEARTS has an ordinal of 2
```

**What will happen if we use an ordinal that does not exists?**

Surprisingly enough, this question belongs to arrays ([discussed later on](04%20-%20Collections.md#arrays)).  The array returned by the `values()` method will have four elements.  Trying to retrieve an element from the array past the enum ordinal will throw an `ArrayIndexOutOfBoundsException`.

**⚠️ THE FOLLOWING EXAMPLE WILL COMPILE BUT WILL THROW AN ArrayIndexOutOfBoundsException!!**

```java
package demo;

public class App {
  enum Suit {
    CLUBS, DIAMONDS, HEARTS, SPADES;
  }

  public static void main( final String[] args ) {
    final Suit[] allSuits = Suit.values();
    final Suit s = allSuits[10];
    System.out.printf( "The enum %s has an ordinal of %d%n", s, s.ordinal() );
  }
}
```

The above example will throw an `ArrayIndexOutOfBoundsException` as shown next, because the array only has `4` elements and we tried to retrieve the 11th element.  Arrays are `0` based, so the first element is at index `0`.

```bash
Exception in thread "main" java.lang.ArrayIndexOutOfBoundsException: Index 10 out of bounds for length 4
	at demo.App.main(App.java:10)
```

### Enums in Java can have state

Can we add the cards' icons to the enum?  Consider the following example.

```java
package demo;

public class App {
  enum Suit {
    CLUBS( "♣️" ),
    DIAMONDS( "♦️" ),
    HEARTS( "♥️" ),
    SPADES( "♠️" );

    private final String icon;

    Suit( final String icon ) {
      this.icon = icon;
    }
  }

  public static void main( final String[] args ) {
    final Suit s = Suit.DIAMONDS;
    System.out.printf( "The suit %s has the icon: %s%n", s, s.icon );
  }
}
```

Enums can have state like any other object in Java.  The above will print.

```bash
The suit DIAMONDS has the icon: ♦️
```

We can make use of more elaborate state.  Consider the following example.

```java
package demo;

public class App {

  enum Colour {
    RED( "Red" ),
    BLACK( "Blank" );

    private final String label;

    Colour( final String label ) {
      this.label = label;
    }

    @Override
    public String toString() {
      return label;
    }
  }

  enum Suit {
    CLUBS( "♣️", Colour.BLACK ),
    DIAMONDS( "♦️", Colour.RED ),
    HEARTS( "♥️", Colour.RED ),
    SPADES( "♠️", Colour.BLACK );

    private final String icon;
    private final Colour colour;

    Suit( final String icon, final Colour colour ) {
      this.icon = icon;
      this.colour = colour;
    }

    @Override
    public String toString() {
      return icon;
    }
  }

  public static void main( final String[] args ) {
    final Suit s = Suit.DIAMONDS;
    System.out.printf( "The suit %s has a colour of %s%n", s, s.colour );
  }
}
```

A new enum, `Colour`, was added that represents the suit's colour.  The above will print.

```bash
The suit ♦️ has a colour of Red
```

**Note that the enum state SHOULD NOT be modified as otherwise you may get unexpected behaviour**.  Note that enum's properties are `final` and only immutable types should be used as enum properties.  More about mutability and immutability is covered [later on](03%20-%20Classes,%20Methods%20and%20Objects.md#mutable-and-immutable).

### Considerations before Persisting Enums

Let say that we have a simple credit transfer application that allows users to send credit to other users.  When working with the application the user can encounter one of a set of errors.

1. **No Sufficient Credit**: when users try to send more credit that they have
1. **Invalid Amount**: when users input an invalid value
1. **Credit Transfer Exceeded**: when users exceed the credit transfer

Given that the errors are fixed the following enum was created to capture them

```java
package demo;

public enum AppError {
  NO_SUFFICIENT_CREDIT,
  INVALID_AMOUNT,
  CREDIT_TRANSFER_EXCEEDED
}
```

We need to capture the errors produced by the application and persist these in a database for further analysis.

There are several ways to persist an enum into a database, each have their advantages and disadvantages.

#### Using the Enum's Ordinal as the unit of Persistence

All enums have an ordinal and this can be saved in the database as shown next.

```java
package demo;

public class App {

  public enum AppError {
    NO_SUFFICIENT_CREDIT,
    INVALID_AMOUNT,
    CREDIT_TRANSFER_EXCEEDED
  }

  public static void main( final String[] args ) {
    persist( AppError.INVALID_AMOUNT );
  }

  public static void persist( final AppError error ) {
    /* Simply logging it out to the console */
    System.out.println( error.ordinal() );
  }
}
```

The above example is simply printing the ordinal to the console, which prints.

```bash
1
```

The following table shows the current ordinal for the `AppError`

| Enum                       | Ordinal |
|----------------------------|--------:|
| `NO_SUFFICIENT_CREDIT`     |     `0` |
| `INVALID_AMOUNT`           |     `1` |
| `CREDIT_TRANSFER_EXCEEDED` |     `2` |

We can add a method that will read the ordinal from the database and return the enum.  Let assume that the ordinal value of `1` is saved in the database and the `read()` method is used to read the enum from the database.

```java
package demo;

public class App {

  public enum AppError {
    NO_SUFFICIENT_CREDIT,
    INVALID_AMOUNT,
    CREDIT_TRANSFER_EXCEEDED
  }

  public static void main( final String[] args ) {
    final AppError error = read();
    System.out.printf( "Error with ordinal 1: %s%n", error );
  }

  public static AppError read() {
    /* Assuming that this is the persisted value in the database */
    final int ordinal = 1;
    return AppError.values()[ordinal];
  }
}
```

The above will print.

```bash
Error with ordinal 1: INVALID_AMOUNT
```

The ordinal is based on the constant's order/position.  If the order of the constants in the enum is changed it will invalidate the ordinal saved in the database.

```java
public enum AppError {
  INVALID_AMOUNT,
  CREDIT_TRANSFER_EXCEEDED,
  NO_SUFFICIENT_CREDIT
}
```

The `INVALID_AMOUNT` is moved as the first constant.  Rerunning the program will produce a different enum.

```java
package demo;

public class App {

  public enum AppError {
    INVALID_AMOUNT,
    CREDIT_TRANSFER_EXCEEDED,
    NO_SUFFICIENT_CREDIT
  }

  public static void main( final String[] args ) {
    final AppError error = read();
    System.out.printf( "Error with ordinal 1: %s%n", error );
  }

  public static AppError read() {
    /* Assuming that this is the persisted value in the database */
    final int ordinal = 1;
    return AppError.values()[ordinal];
  }
}
```

Note that the code may change while the data persisted in the database stays the same.  We have originally saved `1` to represent the enum `INVALID_AMOUNT` in the database.  Running the above program will return a different enum.

```bash
Error with ordinal 1: CREDIT_TRANSFER_EXCEEDED
```

If the enum ordinal will be used as a persistent unit, then make sure that this is captured by tests to make sure that any changes made to the order will break the test.

```java
package demo;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class AppTest {

  @DisplayName( "should have the expected ordinal" )
  @ParameterizedTest( name = "enum {0} should have the ordinal of {1}" )
  @CsvSource( value = { "NO_SUFFICIENT_CREDIT,0", "INVALID_AMOUNT,1", "CREDIT_TRANSFER_EXCEEDED,2" } )
  public void shouldPreserveEnumOrder( final App.AppError error, final int expectedOrdinal ) {
    assertEquals( expectedOrdinal, error.ordinal() );
  }
}
```

Shuffling the enum's constants will break the above test and such change will not go unnoticed.

#### Using the Enum's Name as the unit of Persistence

Enums have names too, and a common practice is to use save the enum's name in the database instead of the ordinal.  Saving the name of the enum makes it immutable from reordering of the enum constants.  Furthermore, names are more readable and simplifies data reading.  The data becomes more meaningful for a person looking at it.  Viewing the value of `NO_SUFFICIENT_CREDIT` in a query results, one can easily understand what type of error is.

While this is a common practice, one needs to be careful when using the enum's name as a persistence unit.  The enums can be refactored (renamed) in which case, it would invalidate the respective persisted data.

If the enum's name is to be used as persistence unit, make sure that tests are employed to protect against renaming.

```java
package demo;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

import static demo.App.AppError;

public class AppTest {

  @DisplayName( "should have the expected name" )
  @ParameterizedTest( name = "should exists enum with name {0}" )
  @ValueSource( strings = { "NO_SUFFICIENT_CREDIT", "INVALID_AMOUNT", "CREDIT_TRANSFER_EXCEEDED" } )
  public void shouldExistEnumWithName( final String name ) {
    AppError.valueOf( name );
  }
}
```

Please note that the IntelliJ may rename names and strings alike.  Be careful when renaming objects as we may rename the test samples and undermine the whole test. A better version (but a bit more complex) is shown next.

```java
package demo;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;

import java.nio.charset.StandardCharsets;

import static com.google.common.hash.Hashing.sha256;
import static demo.App.AppError;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class AppTest {

  @DisplayName( "should have the expected name" )
  @ParameterizedTest( name = "should exists enum with name {0}" )
  @CsvSource( value = {
    "NO_SUFFICIENT_CREDIT,91b5d5be922a703f9339b64f233129260c2e0e17764cf13755b682d72024a26b"
    , "INVALID_AMOUNT,bf0a7a01052ee64c75ed878e581c0bc5a1ea0e2c868108aefa8aa47eb53142a8"
    , "CREDIT_TRANSFER_EXCEEDED,1875c1b5559559051e814667827c260668842b699a058300bcb2e8e4a609cd00"
  } )
  public void shouldExistEnumWithName( final String name, final String expectedSha256 ) {
    assertEquals( expectedSha256, computeSha256( name ) );
    AppError.valueOf( name );
  }

  private static String computeSha256( final String text ) {
    return sha256().hashString( text, StandardCharsets.UTF_8 ).toString();
  }
}
```

The [SHA256 hash function](https://en.wikipedia.org/wiki/SHA-2) can be used to create a hash for the enum name.  If the enum name is changed and by mistake the IDE also renames the sample data too, the SHA256 value will not match anymore and the test will fail.

#### Using a specific property as the unit of Persistence

My recommended approach is to use a specific property as a persistence unit.

```java
public enum AppError {
  NO_SUFFICIENT_CREDIT( "X_CREDIT" ),
  INVALID_AMOUNT( "U_AMOUNT" ),
  CREDIT_TRANSFER_EXCEEDED( "X_TRANSFER_LIMIT" );

  public final String persistenceCode;

  AppError( final String persistenceCode ) {
    this.persistenceCode = persistenceCode;
  }
}
```

The property `persistenceCode` exists for one purpose only.

**How do we convert a given `persistenceCode` to enum?**

We can add a method to the `AppError` enum that given a `String`, it returns the error which `persistenceCode` is equal (case-sensitive) to the given `String`.  If no match is found, `null` is returned.

```java
public enum AppError {
  NO_SUFFICIENT_CREDIT( "X_CREDIT" ),
  INVALID_AMOUNT( "U_AMOUNT" ),
  CREDIT_TRANSFER_EXCEEDED( "X_TRANSFER_LIMIT" );

  public final String persistenceCode;

  AppError( final String persistenceCode ) {
    this.persistenceCode = persistenceCode;
  }

  public static AppError fromPersistenceCode( final String persistenceCode ) {
    for ( final AppError error : values() ) {
      if ( persistenceCode.equals( error.persistenceCode ) ) {
        return error;
      }
    }

    return null;
  }
}
```

While this approach is immutable from renaming for enums and reordering of enums, it is not failsafe either.  Enum name are unique and Java guarantees that.  Nothing stops us from using the same `persistenceCode` value more than once.

```java
public enum AppError {
  NO_SUFFICIENT_CREDIT( "X_CREDIT" ),
  INVALID_AMOUNT( "X_CREDIT" ),
  CREDIT_TRANSFER_EXCEEDED( "X_CREDIT" );

  /* Members removed for brevity */
}
```

All enum constants have the same `persistenceCode`.  The above code will compile and all enums will persists the same `persistenceCode`.

A test is required to make sure that the relation between the `persistenceCode` is one-to-one with the enum constants.

```java
package demo;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.EnumSource;

import static demo.App.AppError;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class AppTest {

  @EnumSource( AppError.class )
  @DisplayName( "should have the expected persistenceCode" )
  @ParameterizedTest( name = "should return the enum {0} when retrieving the enum with the persistenceCode" )
  public void shouldExistEnumWithName( final AppError error ) {
    assertEquals( error, AppError.fromPersistenceCode( error.persistenceCode ) );
  }
}
```

Running the test when all the enum constants have the same `persistanceCode` will fail as shown next.

```bash
$ ./gradlew clean test

> Task :test FAILED

AppTest > should return the enum NO_SUFFICIENT_CREDIT when retrieving the enum with the persistenceCode PASSED

AppTest > should return the enum INVALID_AMOUNT when retrieving the enum with the persistenceCode FAILED
    org.opentest4j.AssertionFailedError at AppTest.java:16

AppTest > should return the enum CREDIT_TRANSFER_EXCEEDED when retrieving the enum with the persistenceCode FAILED
    org.opentest4j.AssertionFailedError at AppTest.java:16

3 tests completed, 2 failed
```

This test ensures that there is a one-to-one relation between the `persistanceCode` and each enum constants.

### Enums can extend functionality

**This is quite an advanced topic and all you need to understand for now is that enums can implement interfaces**.

Java enums are simply special classes which we cannot instantiate.  Consider the following example.

```java
enum Task {
  SWEEPER,
  RUNNER;
}
```

The above enum represents a task that can be executed by some process.  We have two tasks, that do different things.  A sweeper swipes, while a runner runs.  These two perform different tasks.

Consider the following example.

```java
package demo;

public class App {

  enum Task {
    SWEEPER,
    RUNNER;

    public void execute() {
      System.out.println( "Executing..." );
    }
  }

  public static void main( final String[] args ) {
    run( Task.SWEEPER );
    run( Task.RUNNER );
  }

  public static void run( final Task task ) {
    task.execute();
  }
}
```

The `Task` enum introduced the `execute()` method that always prints the same message.

```bash
Executing...
Executing...
```

Enums, like objects, can take advantage of [polymorphism](https://en.wikipedia.org/wiki/Polymorphism_(computer_science)) ([discussed later on](03%20-%20Classes,%20Methods%20and%20Objects.md)).  Consider the following updated example.

```java
package demo;

public class App {

  enum Task {
    SWEEPER() {
      @Override
      public void execute() {
        System.out.println( "Swiping..." );
      }
    },
    RUNNER() {
      @Override
      public void execute() {
        System.out.println( "Running..." );
      }
    };

    public abstract void execute();
  }

  public static void main( final String[] args ) {
    run( Task.SWEEPER );
    run( Task.RUNNER );
  }

  public static void run( final Task task ) {
    task.execute();
  }
}
```

Each enum constant has it own implementation of the `execute()` method.  The above will not print a different message based on the enum being executed.

```bash
Swiping...
Running...
```

An alternative, less recommended approach is to use a `switch` statement instead, as shown next.

```java
enum Task {
  SWEEPER,
  RUNNER;

  public void execute() {
    switch ( this ) {
      case SWEEPER:
        System.out.println( "Swiping..." );
        break;
      case RUNNER:
        System.out.println( "Running..." );
        break;
    }
  }
}
```

I do not prefer this approach as we can easily forget to add a new case to the `switch` when new enum constants are added.  The first approach is immune from this problem as the compiler will produce an error.

We have another type of task which runs in batches, called `BatchTask`, shown next.

```java
enum BatchTask {
  NIGHTLY_BACKUPS() {
    @Override
    public void execute() {
      System.out.println( "Backing up the data..." );
    }
  };

  public abstract void execute();
}
```

Like the first enum, `Task`, the `BatchTask` has a method called `execute()`.  Can we reuse the `run()` method to run the `BatchTask`?

**⚠️ THE FOLLOWING EXAMPLE WILL NOT COMPILE!!**

```java
package demo;

public class App {

  enum Task {
    SWEEPER() {
      @Override
      public void execute() {
        System.out.println( "Swiping..." );
      }
    },
    RUNNER() {
      @Override
      public void execute() {
        System.out.println( "Running..." );
      }
    };

    public abstract void execute();
  }

  enum BatchTask {
    NIGHTLY_BACKUPS() {
      @Override
      public void execute() {
        System.out.println( "Backing up the data..." );
      }
    };

    public abstract void execute();
  }

  public static void main( final String[] args ) {
    run( Task.SWEEPER );
    run( Task.RUNNER );
    run( BatchTask.NIGHTLY_BACKUPS );
  }

  public static void run( Task task ) {
    task.execute();
  }
}
```

`Task` and `BatchTask` are different types, and like we cannot assign a `double` to an `int`, we cannot assign `BatchTask` to `Task`.  We can create an interface ([discussed in depth later on](03%20-%20Classes,%20Methods%20and%20Objects.md#interfaces)), as shown next.

```java
interface CanBeExecuted {
  void execute();
}
```

We can have both enums implement the new interface and use the interface as the method parameter instead, as shown next.

```java
package demo;

public class App {

  enum Task implements CanBeExecuted {
    SWEEPER() {
      @Override
      public void execute() {
        System.out.println( "Swiping..." );
      }
    },
    RUNNER() {
      @Override
      public void execute() {
        System.out.println( "Running..." );
      }
    };

    public abstract void execute();
  }

  enum BatchTask implements CanBeExecuted {
    NIGHTLY_BACKUPS() {
      @Override
      public void execute() {
        System.out.println( "Backing up the data..." );
      }
    };

    public abstract void execute();
  }

  interface CanBeExecuted {
    void execute();
  }

  public static void main( final String[] args ) {
    run( Task.SWEEPER );
    run( Task.RUNNER );
    run( BatchTask.NIGHTLY_BACKUPS );
  }

  public static void run( final CanBeExecuted a ) {
    a.execute();
  }
}
```

The above program now runs and prints.

```bash
Swiping...
Running...
Backing up the data...
```

**This is quite an advanced topic and all you need to understand for now is that enums can implement interfaces**.

## Packages, Imports and Static Imports

### Packages

Classes in Java are organised into packages.  Our `App` class is part of the `demo` package.

```java
package demo;

public class App {
  public static void main( String[] args ) {
    System.out.println( "a simple app" );
  }
}
```

The packages are defined by the `package` keyword and this is always the first executable code.

```java
package demo;
```

Only comments can precede the package declaration.

```java
/* A simple application */
package demo;

public class App {
  public static void main( String[] args ) {
    System.out.println( "a simple app" );
  }
}
```

The package name is not random.

```bash
$ tree src/main/java
src/main/java
└── demo
    └── App.java
```

The package name maps the folder structure.  Say that we move the `App` class to a new package.

```java
package demo.a.b.c;

public class App {
  public static void main( String[] args ) {
    System.out.println( "a simple app" );
  }
}
```

Now the source file needs to be located in folder `c`, which is in folder `b` and so on and so forth.

```bash
tree src/main/java
src/main/java
└── demo
    └── a
        └── b
            └── c
                └── App.java
```

Our examples were small and a very limited number of classes where created.  In most cases we reused the same `App` class.  An application will have tens, hundreds if not thousands of classes.  Having all the classes in one folder will make it hard to find something.  Classes can be organised into packages instead.

Say that we have some classes related to payments and other classes related to orders.  Following is a list of classes used in our fictitious problem.

```bash
$ tree src/main/java
src/main/java
└── demo
    ├── App.java
    ├── BankTransfer.java
    ├── BillingAddress.java
    ├── CreditCard.java
    ├── Item.java
    ├── ItemPrice.java
    ├── Order.java
    ├── OrderController.java
    ├── OrderQuantity.java
    ├── OrderRepository.java
    ├── OrderService.java
    ├── PaymentController.java
    ├── PaymentGateway.java
    ├── PaymentMethod.java
    ├── PaymentRepository.java
    ├── PaymentRequest.java
    ├── PaymentResponse.java
    ├── PaymentService.java
    └── PaypalAccount.java
```

All our classes are saved in one package.  It is clear here that we can organise these better.  There classes can be organised in different ways.  There are different ways how classes can be organised.  We will be discussing two common methods.

#### Organise Packages by Technology

It is very common to see classes organised by technology.  For example, all controllers will be saved under a controller package.

```bash
tree src/main/java
src/main/java
└── demo
    ├── App.java
    ├── contoller
    │   ├── OrderController.java
    │   └── PaymentController.java
    ├── gateway
    │   └── PaymentGateway.java
    ├── model
    │   ├── BankTransfer.java
    │   ├── BillingAddress.java
    │   ├── CreditCard.java
    │   ├── Item.java
    │   ├── ItemPrice.java
    │   ├── Order.java
    │   ├── OrderQuantity.java
    │   ├── PaymentMethod.java
    │   ├── PaymentRequest.java
    │   ├── PaymentResponse.java
    │   └── PaypalAccount.java
    ├── repository
    │   ├── OrderRepository.java
    │   └── PaymentRepository.java
    └── service
        ├── OrderService.java
        └── PaymentService.java
```

As the application grows, it is hard to maintain a healthy architecture.  For example, a controller should depend on a service and never vice versa.  This is not easy to maintain as the team grows and team members change.

Fortunately, this type of organisation enables the use of fitness functions that ensure that only controllers depends on service.  Tools, such as [JDepend](https://github.com/clarkware/jdepend), can be used to ensure that services do not depend on controllers, for example.

The following test is an example of how JDepend can be used to make sure that only the controllers depend on the services and not vice versa.

```java
package demo;

import jdepend.framework.DependencyConstraint;
import jdepend.framework.JDepend;
import jdepend.framework.JavaPackage;
import jdepend.framework.PackageFilter;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;

import java.io.IOException;

import static org.junit.jupiter.api.Assertions.assertTrue;

@TestInstance( TestInstance.Lifecycle.PER_CLASS )
class DependenciesTest {

  private JDepend jdepend;

  @BeforeAll
  public void setUp() throws IOException {
    final PackageFilter filter = new PackageFilter();
    filter.addPackage( "java.*" );
    filter.addPackage( "javax.*" );

    jdepend = new JDepend( filter );
    jdepend.addDirectory( "build/classes/java/main" );
  }

  @Test
  public void shouldContainProperDependencies() {
    final DependencyConstraint constraint = new DependencyConstraint();
    constraint.addPackage( "demo" );
    final JavaPackage controllers = constraint.addPackage( "demo.controller" );
    final JavaPackage services = constraint.addPackage( "demo.service" );
    controllers.dependsUpon( services );

    jdepend.analyze();

    assertTrue( jdepend.dependencyMatch( constraint ), "Controllers should depend on services and not vice versa" );
  }
}
```

The above test makes use of the JDepend library.

```groovy
dependencies {
  testImplementation 'jdepend:jdepend:2.9.1'
}
```

While this is very common, I do not quite like this kind of organisation.  Normally, we either work on payments or on orders but rarely on both at the same type.  For example, say we want to add a new payment method, bank transfer.  The order related classes are not going to be affected by this change.

#### Organise Packages by Feature

Alternatively classes can be organised by their feature.  We have two features, *orders* and *payments*.

```bash
tree src/main/java
src/main/java
└── demo
    ├── App.java
    ├── order
    │   ├── Item.java
    │   ├── ItemPrice.java
    │   ├── Order.java
    │   ├── OrderController.java
    │   ├── OrderQuantity.java
    │   ├── OrderRepository.java
    │   └── OrderService.java
    └── payment
        ├── BankTransfer.java
        ├── BillingAddress.java
        ├── CreditCard.java
        ├── PaymentController.java
        ├── PaymentGateway.java
        ├── PaymentMethod.java
        ├── PaymentRepository.java
        ├── PaymentRequest.java
        ├── PaymentResponse.java
        ├── PaymentService.java
        └── PaypalAccount.java
```

The classes are organised by the feature they belong to.

JDepend works with packages and the above organisation does help with that as all classes related to the same feature are in the same package.

#### Organise Packages by Feature and Technology (Hybrid)

Luckily we can obtain the best of both worlds.  Consider the following organisation.

```bash
$ tree src/main/java
src/main/java
└── demo
    ├── App.java
    ├── order
    │   ├── controller
    │   │   └── OrderController.java
    │   ├── model
    │   │   ├── Item.java
    │   │   ├── ItemPrice.java
    │   │   ├── Order.java
    │   │   └── OrderQuantity.java
    │   ├── repository
    │   │   └── OrderRepository.java
    │   └── service
    │       └── OrderService.java
    └── payment
        ├── controller
        │   └── PaymentController.java
        ├── gateway
        │   └── PaymentGateway.java
        ├── model
        │   ├── BankTransfer.java
        │   ├── BillingAddress.java
        │   ├── CreditCard.java
        │   ├── PaymentMethod.java
        │   ├── PaymentRequest.java
        │   ├── PaymentResponse.java
        │   └── PaypalAccount.java
        ├── repository
        │   └── PaymentRepository.java
        └── service
            └── PaymentService.java
```

Now we can use JDepend to make sure that the classes' dependencies are kept as these were intended to be.

```java
package demo;

import jdepend.framework.DependencyConstraint;
import jdepend.framework.JDepend;
import jdepend.framework.JavaPackage;
import jdepend.framework.PackageFilter;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;

import java.io.IOException;

import static org.junit.jupiter.api.Assertions.assertTrue;

@TestInstance( TestInstance.Lifecycle.PER_CLASS )
class DependenciesTest {

  private JDepend jdepend;

  @BeforeAll
  public void setUp() throws IOException {
    final PackageFilter filter = new PackageFilter();
    filter.addPackage( "java.*" );
    filter.addPackage( "javax.*" );

    jdepend = new JDepend( filter );
    jdepend.addDirectory( "build/classes/java/main" );
  }

  @Test
  public void shouldContainProperDependencies() {
    final DependencyConstraint constraint = new DependencyConstraint();
    constraint.addPackage( "demo" );
    addOrderMappings( constraint );
    addPaymentMappings( constraint );

    jdepend.analyze();

    assertTrue( jdepend.dependencyMatch( constraint ), "Controllers should depend on services and not vice versa" );
  }

  private void addOrderMappings( final DependencyConstraint constraint ) {
    final JavaPackage model = constraint.addPackage( "demo.order.model" );
    final JavaPackage repository = constraint.addPackage( "demo.order.repository" );
    final JavaPackage controllers = constraint.addPackage( "demo.order.controller" );
    final JavaPackage services = constraint.addPackage( "demo.order.service" );
    controllers.dependsUpon( services );
    controllers.dependsUpon( model );
    services.dependsUpon( model );
    services.dependsUpon( repository );
    repository.dependsUpon( model );
  }

  private void addPaymentMappings( final DependencyConstraint constraint ) {
    final JavaPackage model = constraint.addPackage( "demo.payment.model" );
    final JavaPackage repository = constraint.addPackage( "demo.payment.repository" );
    final JavaPackage controllers = constraint.addPackage( "demo.payment.controller" );
    final JavaPackage services = constraint.addPackage( "demo.payment.service" );
    final JavaPackage gateway = constraint.addPackage( "demo.payment.gateway" );
    controllers.dependsUpon( services );
    controllers.dependsUpon( model );
    services.dependsUpon( model );
    services.dependsUpon( repository );
    services.dependsUpon( gateway );
    repository.dependsUpon( model );
  }
}
```

### Imports

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

### Static Imports

**Pending...**

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
