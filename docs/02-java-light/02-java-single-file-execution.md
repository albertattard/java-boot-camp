---
layout: default
title: Java single file execution
parent: Java Light
nav_order: 2
permalink: docs/java-light/java-single-file-execution/
---

# Java single file execution

Java 11 introduced Java Single File Execution ([JEP-330](https://openjdk.java.net/jeps/330)) which enhanced the java launcher to run a program supplied as a single file of Java source code, including usage from within a script by means of "[shebang" files](https://openjdk.java.net/jeps/330#Shebang_files) and related techniques.

```java
$ vi hello
```

**The script file name does not need to match the class name**.

```java
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
