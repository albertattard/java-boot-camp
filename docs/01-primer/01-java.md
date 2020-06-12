---
layout: default
title: Java
parent: Primer
nav_order: 1
permalink: docs/primer/java/
---

# Java
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## What is Java?

Java is a general-purpose programming language and computing platform first released by Sun Microsystems in 1995.

Java is fast, secure, and reliable. From smartcards to datacentres, game consoles to scientific supercomputers, cell phones to the Internet, Java is everywhere!

Java is an overloaded term. Sometimes the term Java is used to refer to the programming language while other times it is used to refer to the Java Virtual Machine.

1. The Java Programming Language
1. The Java Language Specification
1. The Java Standard Library
1. The Java Virtual Machine (JVM)
1. The Java Virtual Machine Specification
1. The Java Development Kit (JDK)
1. The Java Runtime Environment (JRE) sometimes also referred to as Platform
1. The Java Standard Edition (JSE)
1. The Java Micro Edition (JME)
1. The Java Enterprise Environment (JEE)

## How do we develop Java Applications?

An application running on the Java platform starts from source code written in one of the JVM languages as shown next.

![Java from Development to Runtime]({{site.baseurl}}/assets/images/Java-from-Development-to-Runtime.png)

The source code is compiled into Bytecode. Bytecode is a form of instruction set designed for efficient execution by the Java JIT compiler. Each Bytecode is composed of one byte that represents the [opcode](https://docs.oracle.com/javase/specs/jvms/se8/html/jvms-7.html), along with zero or more bytes for operands. Of the 256 possible byte-long `opcodes`, 202 are currently in use.

**The Bytecode is machine independent and it does not matter on which OS the Bytecode is generated**. The source code can be compiled into Bytecode on a Windows machine and then used on a Mac or vice versa. The JIT takes the Bytecode and then convert this into machine dependent code.

It is important to note that to develop and compile Java source code you need to have a JDK installed. To run a Java application (including all programming languages that run on the JVM) you need to have the JRE installed. Note that a JDK also includes the JRE and no need to install a separate JRE when you have a JDK installed.

## Java Language Specification

The [Java Language Specification (JLS)](https://docs.oracle.com/javase/specs/jls/se14/html/index.html) is the definitive technical reference for the Java programming language. Anything related to the Java programming language and its behaviour is documented in the Java language specification.

The specification is the authority on language behaviour, but it is terse and not user-friendly. If you are ever in any doubt about the behaviour of Java code, the specification provides the definitive answer.

These specifications are not always easy to read and not meant as a beginner's tutorial.

### 🤔 Given that the specification is hard to read and understand, why should I care?

With the understanding that this may be too technical and do not worry if you do not understand any of this.

Consider the following code fragment.

{% capture code %}{% raw %}int a = -7;
int b = +a;{% endraw %}{% endcapture %}
{% include code.html code=code lang="java" file="Unary Operator Example" %}

The above code fragment shows the use of the `+` unary operator. This operator is rarely used, and its behaviour is unknown to many. The description provided by an official [Java tutorial](https://docs.oracle.com/javase/tutorial/java/nutsandbolts/op1.html) is:

"_Unary plus operator; indicates positive value (numbers are positive without this, however)_"

Many believe that the unary `+` operator is the opposite of the unary `-` operator, and the following should print `7`.

```java
int a = -7;
int b = +a;
System.out.println(b);
```

That is very misleading. This operator's real functionality is explained in the [Java Language Specifications, section 15.15.3. Unary Plus Operator +](https://docs.oracle.com/javase/specs/jls/se14/html/jls-15.html#jls-15.15.3).

"_Unary numeric promotion ([§5.6](https://docs.oracle.com/javase/specs/jls/se14/html/jls-5.html#jls-5.6)) is performed on the operand. The type of the unary plus expression is the promoted type of the operand. The result of the unary plus expression is not a variable, but a value, even if the result of the operand expression is a variable._"

In other words, variables of types `byte`, `short` and `char` are promoted to type `int`. The previous example will simply print `-7`.

## Recommended reading

1. Java in a Nutshell, 7th Edition ([O'Reilly Books](https://learning.oreilly.com/library/view/java-in-a/9781492037248/))
1. Java: A Beginner's Guide, Eighth Edition, 8th Edition ([O'Reilly Books](https://learning.oreilly.com/library/view/java-a-beginners/9781260440225/))
1. Effective Java, 3rd Edition ([O'Reilly Books](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/))
1. Java: The Complete Reference, Eleventh Edition, 11th Edition ([O'Reilly Books](https://learning.oreilly.com/library/view/java-the-complete/9781260440249/))
1. Java Cookbook, 4th Edition ([O'Reilly Books](https://learning.oreilly.com/library/view/java-cookbook-4th/9781492072577/))
1. Java By Comparison ([O'Reilly Books](https://learning.oreilly.com/library/view/java-by-comparison/9781680505887/))
1. Introduction to Java 8 ([O'Reilly Video Series](https://learning.oreilly.com/videos/introduction-to-java/9781491907795))
