---
layout: default
title: Create a project using Gradle
parent: Primer
nav_order: 5
permalink: docs/primer/create-gradle-project/
---

# Create a project using Gradle
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Create Project

1. Create a directory

   ```bash
   $ mkdir demo
   ```

   Navigate inside the directory

   ```bash
   $ cd demo
   ```

   **All command will be executed from within the `demo` directory unless otherwise stated.**

1. Create the project

   The following command is using the version of Gradle that is available at the OS level.

   ```bash
   $ gradle init
   ```

   This will bring up an interactive menu

   | Selection               | Value                     |
   |-------------------------|---------------------------|
   | Type of project         | `2: application`          |
   | Implementation language | `3: Java` (the default)   |
   | Build script DSL        | `1: Groovy` (the default) |
   | Test framework          | `4: JUnit Jupiter`        |
   | Project name            | `demo` (the default)      |
   | Source package          | `demo` (the default)      |

   Full run

   ```bash
   Starting a Gradle Daemon, 2 incompatible Daemons could not be reused, use --status for details

   Select type of project to generate:
     1: basic
     2: application
     3: library
     4: Gradle plugin
   Enter selection (default: basic) [1..4] 2

   Select implementation language:
     1: C++
     2: Groovy
     3: Java
     4: Kotlin
     5: Swift
   Enter selection (default: Java) [1..5]

   Select build script DSL:
     1: Groovy
     2: Kotlin
   Enter selection (default: Groovy) [1..2]

   Select test framework:
     1: JUnit 4
     2: TestNG
     3: Spock
     4: JUnit Jupiter
   Enter selection (default: JUnit 4) [1..4] 4

   Project name (default: demo):
   Source package (default: demo):

   > Task :init
   Get more help with your project: https://docs.gradle.org/6.3/userguide/tutorial_java_projects.html

   BUILD SUCCESSFUL in 1m 23s
   2 actionable tasks: 2 executed
   ```

Demo

![Create Java Project using Gradle]({{site.baseurl}}/assets/gifs/Create-Java-Project-using-Gradle.gif)

## Explore Project

1.  Print the directory structure

   ```bash
   $ tree -a .
   ```

   Gradle created the following directory structure

   ```bash
   .
   ├── .gitattributes
   ├── .gitignore
   ├── .gradle
   ... content of the .gradle directory removed for brevity
   ├── build.gradle
   ├── gradle
   │   └── wrapper
   │       ├── gradle-wrapper.jar
   │       └── gradle-wrapper.properties
   ├── gradlew
   ├── gradlew.bat
   ├── settings.gradle
   └── src
       ├── main
       │   ├── java
       │   │   └── demo
       │   │       └── App.java
       │   └── resources
       └── test
           ├── java
           │   └── demo
           │       └── AppTest.java
           └── resources
   ```

1. [Gradle Wrapper](https://docs.gradle.org/current/userguide/gradle_wrapper.html)

   ```bash
   $ ls -l
   -rw-r--r-- .gitattributes
   -rw-r--r-- .gitignore
   drwxr-xr-x .gradle
   -rw-r--r-- build.gradle
   drwxr-xr-x gradle
   -rwxr-xr-x gradlew
   -rw-r--r-- gradlew.bat
   -rw-r--r-- settings.gradle
   drwxr-xr-x src
   ```

   A Gradle wrapper was included by the `gradle init` process as this is the preferred way to work ([reference](https://docs.gradle.org/current/userguide/gradle_wrapper.html)).  Other developers do not require Gradle to be installed when working with the Gradle Wrapper.  Build Pipelines, such as [Jenkins](https://www.jenkins.io/) and [GoCD](https://www.gocd.org/), do not need to have Gradle installed as they can use the Gradle wrapper included with the project.

   ```bash
   drwxr-xr-x gradle
   -rwxr-xr-x gradlew
   -rw-r--r-- gradlew.bat
   ```

   Instead of using `gradle`, now we can use `./gradlew` (or `./gradlew.bat` on Windows).  As mentioned before, **when using the wrapper, we do not require to have Gradle installed**.

   **It is imperative to include the Gradle wrapper files and folder in the project repository**.

1. Open the project in IDE

   IntelliJ

   ```bash
   $ idea .
   ```

   VS Code

   ```bash
   $ code .
   ```

1. Open the `gradle/wrapper/gradle-wrapper.properties` file

   ```properties
   distributionBase=GRADLE_USER_HOME
   distributionPath=wrapper/dists
   distributionUrl=https\://services.gradle.org/distributions/gradle-6.5-bin.zip
   zipStoreBase=GRADLE_USER_HOME
   zipStorePath=wrapper/dists
   ```

   The list of releases is found at: [releases](https://gradle.org/releases/) page.

   We can configure Gradle's properties to be used by the project from this file, including the version of Gradle.  This ensures that everyone on the project make use of the same configuration (and version) of Gradle.

1. Open the `build.gradle` file

   Comments removed for brevity.

   ```groovy
   plugins {
     id 'java'
     id 'application'
   }

   repositories {
     jcenter()
   }

   dependencies {
     implementation 'com.google.guava:guava:28.2-jre'
     testImplementation 'org.junit.jupiter:junit-jupiter:5.7.0-M1'
   }

   application {
     mainClassName = 'demo.App'
   }

   test {
     useJUnitPlatform()
   }
   ```

   [Plugins](https://docs.gradle.org/current/userguide/plugins.html) enable more Gradle features.  For example, the following plugin will enable [Spring Boot](https://docs.spring.io/spring-boot/docs/current/gradle-plugin/reference/html/) Gradle tasks.

   ```groovy
   plugins {
     id 'org.springframework.boot' version '2.2.6.RELEASE'
   }
   ```

   A list of plugins is available [here](https://plugins.gradle.org/).

   The [dependency](https://docs.gradle.org/current/userguide/declaring_dependencies.html) section manages other libraries that our project uses.  For example, we can add new dependency, such as the [Apache Commons Lang3](https://mvnrepository.com/artifact/org.apache.commons/commons-lang3/3.0) shown next by, adding the dependency.

   ```groovy
   dependencies {
     implementation group: 'org.apache.commons', name: 'commons-lang3', version: '3.0'
   }
   ```

   The dependencies can defined as a single line, delimited by a `:`

   ```groovy
   dependencies {
     implementation 'org.apache.commons:commons-lang3:3.0'
   }
   ```

   Dependencies have [scopes](https://docs.gradle.org/current/userguide/java_plugin.html#tab:configurations).  Dependencies that are only needed for tests, will have the `testImplementation` scope and are excluded from other scopes.  These two scopes are enabled by the [Java plugin](https://docs.gradle.org/current/userguide/java_plugin.html).

   Dependencies of the same scope can be grouped together as shown next.

   ```groovy
   dependencies {
     implementation(
      'org.apache.commons:commons-lang3:3.0',
      'com.google.guava:guava:28.2-jre'
     )
   }
   ```

   Dependencies are fetched from [repositories](https://docs.gradle.org/current/userguide/declaring_repositories.html), defined in the `repositories` section.  We are using the [JCenter](https://bintray.com/bintray/jcenter) repository.

   ```groovy
   repositories {
     jcenter()
   }
   ```

   The application and tests are configured in the following respective sections.

   ```groovy
   application {
     mainClassName = 'demo.App'
   }

   test {
     useJUnitPlatform()
   }
   ```

1. Run the project from the IDE

   1. Open the `App.java` file

      ![App]({{site.baseurl}}/assets/images/IntelliJ-App-Class.png)

   1. Click any of the green arrows next to the line numbers.  Alternatively, click anywhere in the class and click `[control] + [shift] + [R]`

      ![Output]({{site.baseurl}}/assets/images/IntelliJ-App-Run-Output.png)
