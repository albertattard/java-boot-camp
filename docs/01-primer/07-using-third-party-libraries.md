---
layout: default
title: Extend your application capabilities (using third-party libraries)
parent: Primer
nav_order: 7
permalink: docs/primer/using-third-party-libraries/
---

# Extend your application capabilities (using third-party libraries)
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

It is not recommended to reinvent the wheel and in many cases a library already exists which does exactly what you need.

1. Import the third-party library (dependency)

    The application also contains the Guava dependency.

    ```groovy
    dependencies {
      implementation 'com.google.guava:guava:28.2-jre'
    }
    ```

    Classes that are part of this library (referred to as dependency as our project depends on this library) can now be used by our program.

1. Use the third-party library

    One of the most popular classes with the Guava library is the [`Preconditions` class](https://github.com/google/guava/wiki/PreconditionsExplained).  This class contains useful methods that can be used to check parameters to make sure that these adhere to the method contract.  For example, a function may only accept positive numbers.  The `Preconditions` class has methods to validate such parameters.

    ```java
    package demo;

    import com.google.common.base.Preconditions;

    public class App {
      public String getGreeting() {
        return "Hello world.";
      }

      public static void main( String[] args ) {
        String greeting = Preconditions.checkNotNull( new App().getGreeting() );
        System.out.println( greeting );
      }
    }
    ```

    The above is a naïve example use of the `Preconditions` class.

1. Build the project

    ```bash
    $ ./gradlew clean build
    ```

1. Run the project

    ```bash
    $ java -jar build/libs/demo.jar
    ```

    Note that this time the application will not run and will produce a `NoClassDefFoundError` error as shown next.

    ```bash
    Exception in thread "main" java.lang.NoClassDefFoundError: com/google/common/base/Preconditions
        at demo.App.main(App.java:11)
    Caused by: java.lang.ClassNotFoundException: com.google.common.base.Preconditions
        at java.base/jdk.internal.loader.BuiltinClassLoader.loadClass(BuiltinClassLoader.java:602)
        at java.base/jdk.internal.loader.ClassLoaders$AppClassLoader.loadClass(ClassLoaders.java:178)
        at java.base/java.lang.ClassLoader.loadClass(ClassLoader.java:522)
        ... 1 more
    ```

Our program is making use of a class that is not part of the Java standard library and it is not part of our code.  Java has no way to locate this class and use it in our program.  Not that our JAR file only contains two files.  The `Preconditions` class is not part of our JAR file.

## The Classpath

Java searches for classes that are on the [classpath](https://docs.oracle.com/javase/8/docs/technotes/tools/findingclasses.html).  When using the `-jar` option, all classes within that JAR file are automatically included as part of the classpath.

Instead of using the `-jar` option, we can use the `-cp` to set the claspath, similar to what is shown below

```
$ java -cp path/to/lib-a.jar:path/to/lib-b.jar path.to.mainclass
```

One or more JAR files can be included in a classpath separated by a colon (`:`) on a Mac or semicolon (`;`) on a Windows OS.  We need to include two JAR files for our application to run.

1. Our application JAR file, found at

    ```bash
    ./build/libs/demo.jar
    ```

    The above JAR is built and produced by Gradle

1. The Guava JAR file.

    Gradle downloaded this library at

    ```bash
    /Users/albertattard/.gradle/caches/modules-2/files-2.1/com.google.guava/guava/28.2-jre/8ec9ed76528425762174f0011ce8f74ad845b756/guava-28.2-jre.jar
    ```

    You can locate the Guava library, used by our application, using the following command

    ```bash
    $ find -L ~/.gradle/caches -name "guava-28.2-jre.jar"
    ```

    Note that if you have not yet built the application Gradle may have not yet downloaded the Guava library into the local cache.

1. Run the application using the `-cp` option

    ```bash
    $ java -cp ./build/libs/demo.jar:/Users/albertattard/.gradle/caches/modules-2/files-2.1/com.google.guava/guava/28.2-jre/8ec9ed76528425762174f0011ce8f74ad845b756/guava-28.2-jre.jar demo.App
    ```

    **The above command needs to be updated according to the location where your Guava library is found**.

    The application should now be able to run and output

    ```bash
    Hello world.
    ```

This is quite inconvenient as together with our application we need to also include the libraries this application needs.  In this case, we only needed one library, but a typical program makes use many libraries.  Together with the libraries our program uses, we also need to include the transitive libraries (libraries used by the libraries we are using and so on and so forth).

This can be a nightmare for large project as Java will only fail at runtime, when that particular library is required.  A missing library can go unnoticed for some time, until the functionality that requires it is executed at runtime.

Running the application is not as simple as before, when we used the `-jar` option.  A better way is to make use of a fat JAR where all classes are packaged in one fat JAR.

## Make a fat JAR

There are several ways how to create a fat JAR

1. Update the `jar` task

    ```groovy
    jar {
      manifest {
        attributes 'Main-Class': application.mainClassName
      }
      from {
        configurations.runtimeClasspath.collect {
          it.isDirectory() ? it : zipTree(it)
        }
      }
    }
    ```

    Build the project and unzip it

    ```bash
    $ ./gradlew clean build
    $ rm -rf temp
    $ unzip build/libs/demo.jar -d temp
    ```

    Notice that this time much more many files are included

    ```bash
    Archive:  build/libs/demo.jar
       creating: temp/META-INF/
      inflating: temp/META-INF/MANIFEST.MF
       creating: temp/demo/
      inflating: temp/demo/App.class
       creating: temp/META-INF/maven/
       creating: temp/META-INF/maven/com.google.guava/
    ...
      inflating: temp/com/google/j2objc/annotations/RetainedWith.class
      inflating: temp/com/google/j2objc/annotations/Weak.class
      inflating: temp/com/google/j2objc/annotations/WeakOuter.class
    ```

    The JAR file now contains runtime dependencies (dependencies with scope `implementation`).  Note that no JUnit related classes are included as this dependency has a test scope (`testImplementation`).

1. Create custom task

    ```groovy
    task fatJar(type: Jar) {
      group = 'Distribution'
      description = 'Create an executable fat JAR'
      archiveBaseName = 'fat-jar'
      manifest {
        attributes 'Main-Class': application.mainClassName
      }
      from {
        configurations.runtimeClasspath.collect {
          it.isDirectory() ? it : zipTree(it)
        }
      }
      with jar
    }
    ```

    List the available Gradle tasks (some tasks may not be visible but still be available).

    ```bash
    $ ./gradlew tasks
    ```

    Note that `fatJar` task under the `Distribution tasks` section.

    ```bash
    ...

    Distribution tasks
    ------------------
    assembleDist - Assembles the main distributions
    distTar - Bundles the project as a distribution.
    distZip - Bundles the project as a distribution.
    fatJar - Create an executable fat JAR
    installDist - Installs the project as a distribution as-is.

    ...
    ```

    Create the fat JAR using the custom task

    ```bash
    $ ./gradlew fatJar
    ```

    The JAR file: `build/libs/fat-jar.jar` will be created containing the application together with its runtime dependencies.

    Run the application.

    ```bash
    $ java -jar build/libs/fat-jar.jar
    Hello world.
    ```

   For more information about Gradle tasks, please refer to the [tasks user guide](https://docs.gradle.org/current/userguide/tutorial_using_tasks.html).

1. Use a plugin

    **This is the preferred approach as we are reusing an existing Gradle plugin rather than adding a new Gradle task ourselves**.

    The [shadowJar](https://plugins.gradle.org/plugin/com.github.johnrengelman.shadow) plugin is a very popular plugin.

    Add the `shadowJar` plugin (do no remove the other plugins)

    ```groovy
    plugins {
        id 'com.github.johnrengelman.shadow' version '5.2.0'
    }
    ```

    List the available tasks

    ```bash
    $ ./gradlew tasks
    ```

    `shadowJar` is one of the newly available tasks

    ```bash
    ...

    Shadow tasks
    ------------
    knows - Do you know who knows?
    shadowJar - Create a combined JAR of project and runtime dependencies

    ...
    ```

    Create the fat JAR using the `shadowJar` task

    ```bash
    $ ./gradlew shadowJar
    ```

    JAR file will be created

    ```bash
    $ ls -l build/libs
    -rw-r--r-- demo-all.jar
    ```

    The `shadowJar` task is also triggered with the `build` task.

     ```bash
    $ ./gradlew clean build
     ```

     In this case two JAR files will be produced

    ```bash
    $ ls -l build/libs
    -rw-r--r-- demo-all.jar
    -rw-r--r-- demo.jar
    ```

    The `demo.jar` file does not include dependencies, while the `demo-all.jar` file does.

    Run the application.

    ```bash
    $ java -jar build/libs/demo-all.jar
    Hello world.
    ```

Irrespective from which approach we use, running the application as a fat JAR is simpler than running the application using the `-cp` option.  It also makes it simpler to distribute as all we need to share is one JAR file.
