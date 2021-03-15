---
layout: default
title: Hello world application (from source to executable application)
parent: Primer
nav_order: 6
permalink: docs/primer/hello-world-application/
---

# Hello world application (from source to executable application)
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Gradle task dependency tree

1. Run the project

   ```console
   $ ./gradlew run

   > Task :run
   Hello world.
   ```

1. Adjust Logging Level

   The [run](https://docs.gradle.org/current/userguide/command_line_interface.html#running_applications) tasks will also compile the code and perform all necessary things.  It performs three more tasks:

   1. [compileJava](https://docs.gradle.org/current/userguide/java_plugin.html#sec:java_tasks)
   1. [processResources](https://docs.gradle.org/current/userguide/java_plugin.html#sec:java_tasks)
   1. [classes](https://docs.gradle.org/current/userguide/java_plugin.html#sec:java_tasks)

   Using the `-i` (or `--info`) [logging option](https://docs.gradle.org/current/userguide/logging.html#logging), Gradle will produce more information.

   ```console
   $ ./gradlew run -i
   ...
   > Configure project :
   Evaluating root project 'demo' using build file 'build.gradle'.
   All projects evaluated.
   Selected primary task 'run' from project :
   Tasks to be executed: [task ':compileJava', task ':processResources', task ':classes', task ':run']
   Tasks that were excluded: []
   :compileJava (Thread[Execution worker for ':',5,main]) started.
   ...
   ```

1. Display Task Dependency Tree

   Add the [task tree](https://plugins.gradle.org/plugin/com.dorongold.task-tree) plugin

   ```groovy
   plugins {
     id 'com.dorongold.task-tree' version '1.5'
   }
   ```

   Display the other tasks the `run` task depends on

   ```console
   $ ./gradlew run taskTree
   ```

   The result shows an inverted tree, where the top nodes depend on the lower nodes

   ```console
   :run
   \--- :classes
        +--- :compileJava
        \--- :processResources
   ```

   The `run` task depends on the `classes` task which depends on two more tasks.

Demo

![Display Task Dependency Tree]({{site.baseurl}}/assets/gifs/Display-Task-Dependency-Tree.gif)

## Project Dependencies

Gradle tasks add functionality to Gradle.  Dependencies add functionality to the project.  Instead of re-inventing the wheel, we can leverage code developed by others and just focus on the task at hand.

1. List project dependencies

   ```console
   $ ./gradlew dep
   ```

   This is very useful to identify any conflicting dependencies

   ```console
   Test
   ```

## Package Project

1. Build the project

   ```console
   $ ./gradlew clean build
   ```

   This will produce a [JAR](https://docs.oracle.com/javase/8/docs/technotes/guides/jar/jarGuide.html) file at

   ```console
   build/libs/demo.jar
   ```

   JAR is a simple ZIP file.  Unzip it.

   ```console
   $ unzip build/libs/demo.jar -d temp
   Archive:  build/libs/demo.jar
     creating: temp/META-INF/
    inflating: temp/META-INF/MANIFEST.MF
     creating: temp/demo/
    inflating: temp/demo/App.class
   ```

   The `temp` directory contains two folders and each folder will contain one file.

   ```console
   $ tree temp
   temp
   ├── META-INF
   │   └── MANIFEST.MF
   └── demo
       └── App.class

   2 directories, 2 files
   ```

   The `temp/META-INF/MANIFEST.MF` file is a text file created by one of the Gradle tasks.

   ```console
   $ cat temp/META-INF/MANIFEST.MF
   Manifest-Version: 1.0
   ```

   The `demo/App.class` file is the compiled version (Bytecode) of the source file: `src/main/java/demo/App.java`.

   ![What does a modern JVM look like]({{site.baseurl}}/assets/images/What-does-a-modern-JVM-look-like.png)
   Image copied from: [Theory: JVM Subsystems](https://learning.oreilly.com/videos/optimizing-java/9781492044673/9781492044673-video323884)

   The Bytecode produced when compiling this class can be viewed using the `javap` command as shown next.

   ```console
   $ ./gradlew build
   $ javap -c build/classes/java/main/demo/App.class
   Compiled from "App.java"
   public class demo.App {
     public demo.App();
       Code:
          0: aload_0
          1: invokespecial #1                  // Method java/lang/Object."<init>":()V
          4: return

     public java.lang.String getGreeting();
       Code:
          0: ldc           #7                  // String Hello world.
          2: areturn

     public static void main(java.lang.String[]);
       Code:
          0: getstatic     #9                  // Field java/lang/System.out:Ljava/io/PrintStream;
          3: new           #15                 // class demo/App
          6: dup
          7: invokespecial #17                 // Method "<init>":()V
         10: invokevirtual #18                 // Method getGreeting:()Ljava/lang/String;
         13: invokevirtual #22                 // Method java/io/PrintStream.println:(Ljava/lang/String;)V
         16: return
   }
   ```

   Alternatively, we can use the [IntelliJ Jclasslib plugin](https://plugins.jetbrains.com/plugin/9248-jclasslib-Bytecode-viewer).

   Click on _View > Show Bytecode with Jclasslib_

   ![Show Bytecode With Jclasslib]({{site.baseurl}}/assets/images/Show-Bytecode-With-Jclasslib.png)

   Expand _Methods > main > Code_

   ![Bytecode]({{site.baseurl}}/assets/images/App-Main-Method-Bytecode.png)

   The section [Internals: Bytecode Basics](https://learning.oreilly.com/videos/optimizing-java/9781492044673/9781492044673-video323889), part of the [Optimizing Java O'Reilly Video Series](https://learning.oreilly.com/videos/optimizing-java/9781492044673), covers this topic in some depth and is a recommended follow up.

1. Run the application

   ```console
   $ java -jar build/libs/demo.jar
   no main manifest attribute, in build/libs/demo.jar
   ```

   This JAR is not yet an executable JAR.  The `MANIFEST.MF` is missing the `Main-Class` attribute.  Java does not know where to go and which class to execute.  Note that a project may contain hundreds if not thousands to classes.  Java will look into the `MANIFEST.MF` for the `Main-Class` attribute and will execute that.

1. Configure the `jar` task

   File: `build.gradle`

   ```groovy
   jar {
     manifest {
       attributes 'Main-Class': application.mainClassName
     }
   }
   ```

   Note that the above fragment is referring to another value defined elsewhere.

   Build the project

   ```console
   $ ./gradlew clean build
   ```

   Remove the `temp` directory and unzip it again

   ```console
   $ rm -rf temp
   $ unzip build/libs/demo.jar -d temp
   ```

   The manifest now contains the `Main-Class` attribute.

   ```console
   $ cat temp/META-INF/MANIFEST.MF
   Manifest-Version: 1.0
   Main-Class: demo.App
   ```

   Run the application.

   ```console
   $ java -jar build/libs/demo.jar
   ```

   This time, it should work.

   ```console
   Hello world.
   ```
