# Setup

## TOC

1. [Setup Environment (SDKMAN)](#setup-environment-sdkman)
1. [Gradle and Maven](#gradle-and-maven)
1. [IDE (IntelliJ IDEA and VS Code)](#ide-intellij-idea-and-vs-code)
1. [Create a project using Gradle](#create-a-project-using-gradle)
1. [Hello World Application (packaged as an executable application)](#hello-world-application-packaged-as-an-executable-application)
1. [Docker](#docker)

## Setup Environment (SDKMAN)

1. Install

    ```bash
    $ curl -s "https://get.sdkman.io" | bash
    $ source "~/.sdkman/bin/sdkman-init.sh"
    ```

1. Check version after installation

    ```bash
    $ sdk version
    SDKMAN 5.7.4+362
    ```

1. List all available Java versions

    ```bash
    $ sdk list java
    ```

    This will print all versions available to SDKMAN from different [vendors](https://sdkman.io/jdks).

    ```bash
    ================================================================================
    Available Java Versions
    ================================================================================
     Vendor        | Use | Version      | Dist    | Status     | Identifier
    --------------------------------------------------------------------------------
     AdoptOpenJDK  |     | 14.0.1.j9    | adpt    |            | 14.0.1.j9-adpt
                   |     | 14.0.1.hs    | adpt    | installed  | 14.0.1.hs-adpt
                   |     | 13.0.2.j9    | adpt    |            | 13.0.2.j9-adpt
                   |     | 13.0.2.hs    | adpt    |            | 13.0.2.hs-adpt
                   |     | 12.0.2.j9    | adpt    |            | 12.0.2.j9-adpt
                   |     | 12.0.2.hs    | adpt    |            | 12.0.2.hs-adpt
                   |     | 11.0.7.j9    | adpt    |            | 11.0.7.j9-adpt
                   |     | 11.0.7.hs    | adpt    |            | 11.0.7.hs-adpt
                   |     | 11.0.6.hs    | adpt    | local only | 11.0.6.hs-adpt
                   |     | 8.0.252.j9   | adpt    |            | 8.0.252.j9-adpt
                   | >>> | 8.0.252.hs   | adpt    | installed  | 8.0.252.hs-adpt
    ...
    ```

    The above shows three versions of Java installed

    1. `14.0.1.hs-adpt`
    1. `11.0.6.hs-adpt`
    1. `8.0.252.hs-adpt`

    The version `11.0.6.hs-adpt` is not available anymore as there is a newer version available, the version `11.0.7.hs-adpt`. That's why it has the status of `local only`.

    The version `8.0.252.hs-adpt` is the current default version of Java.

1. Install the latest Java 11 and Java 14

    ```bash
    $ sdk install java 14.0.1.hs-adpt
    $ sdk install java 11.0.7.hs-adpt
    ```

    OpenJDK comes in two flavours:

    1. **HotSpot** (`...x.hs-adpt`) is the VM from the OpenJDK community. It is the most widely used VM today and is used in Oracle's JDK ([reference](https://openjdk.java.net/groups/hotspot/)).

    1. **Eclipse OpenJ9** (`...x.j9-adpt`) is the VM from the Eclipse community. It is an enterprise-grade VM designed for low memory footprint and fast start-up and is used in IBM's JDK ([reference](https://www.eclipse.org/openj9/)).

1. Change the default Java

    ```bash
    $ sdk default java 14.0.1.hs-adpt
    Default java version set to 14.0.1.hs-adpt
    ```

    Verify the version

    ```bash
    $ java -version
    openjdk version "14.0.1" 2020-04-14
    OpenJDK Runtime Environment AdoptOpenJDK (build 14.0.1+7)
    OpenJDK 64-Bit Server VM AdoptOpenJDK (build 14.0.1+7, mixed mode, sharing)
    ```

    **Optionally**, add an alias to simplify switching from one version to another.

    ```bash
    $ vi ~/.oh-my-zsh/custom/dev.zsh
    ```

    Add the aliases

    ```bash
    alias java11='sdk default java 11.0.6.hs-adpt'
    alias java14='sdk default java 14.0.1.hs-adpt'
    ```

    Two switch between versions just use `java11` and `java14`.

    ```bash
    $ java14
    Default java version set to 14.0.1.hs-adpt
    ```

1. Set the `JAVA_HOME` environment variable

    ```bash
    $ echo $JAVA_HOME
    ~/.sdkman/candidates/java/current
    ```

    If the environment variable is missing, it will be blank.  Edit the `~/.zshrc` to set the `JAVA_HOME` environment variable.

    ```bash
    $ vi ~/.zshrc
    ```

    Add the `JAVA_HOME` environment variable

    ```bash
    export JAVA_HOME="~/.sdkman/candidates/java/current"
    ```

    Open a new terminal and verify that this was properly set.

    ```bash
    $ ${JAVA_HOME}/bin/java -version
    openjdk version "14.0.1" 2020-04-14
    OpenJDK Runtime Environment AdoptOpenJDK (build 14.0.1+7)
    OpenJDK 64-Bit Server VM AdoptOpenJDK (build 14.0.1+7, mixed mode, sharing)
    ```

For more details, please refer to: [https://sdkman.io/install](https://sdkman.io/install)

## Gradle and Maven

1. Gradle ([https://gradle.org/](https://gradle.org/))
1. Maven ([http://maven.apache.org/](http://maven.apache.org/))

![Popularity](images/Maven%20vs.%20Gradle.png)

### Advantages of Gradle over Maven

1. **Flexible**

    Changing the build lifecycle using Maven is harder than expected.  Gradle addressed this and made it easy to customise the lifecycles as required ([reference](https://gradle.org/maven-vs-gradle/)).

1. **Performant**

    ![Performance](https://gradle.org/images/performance/maven-vs-gradle.gif)
    ([Reference](https://gradle.org/gradle-vs-maven-performance/))

1. **Better Dependency Management**

   Maven allows one to override a dependency, but only by their version. Gradle provides customizable dependency selection and substitution rules that can be declared once and handle unwanted dependencies project-wide. This substitution mechanism enables Gradle to build multiple source projects together to create composite builds ([reference](https://gradle.org/maven-vs-gradle/)).

### Setup

1. Install

    Either using `SDKMAN`

    ```bash
    $ sdk install gradle 6.3
    ```

    or using `brew`

    ```bash
    $ brew install gradle
    ```

1. Verify

    ```bash
    $ gradle -version

    ------------------------------------------------------------
    Gradle 6.3
    ------------------------------------------------------------

    Build time:   2020-03-24 19:52:07 UTC
    Revision:     bacd40b727b0130eeac8855ae3f9fd9a0b207c60

    Kotlin:       1.3.70
    Groovy:       2.5.10
    Ant:          Apache Ant(TM) version 1.10.7 compiled on September 1 2019
    JVM:          14.0.1 (AdoptOpenJDK 14.0.1+7)
    OS:           Mac OS X 10.15.4 x86_64
    ```

For more details, please refer to: [https://gradle.org/install/](https://gradle.org/install/).

### Recommended Readings

1. Gradle Beyond the Basics ([O'Reilly Books](https://learning.oreilly.com/library/view/gradle-beyond-the/9781449373801/))
1. Gradle Fundamentals ([O'Reilly Video Series](https://learning.oreilly.com/videos/gradle-fundamentals/9781491937266))

## IDE (IntelliJ IDEA and VS Code)

1. **IntelliJ IDEA** ([https://www.jetbrains.com/idea/download/#section=mac](https://www.jetbrains.com/idea/download/#section=mac))

    Plugins
    1. [Nyan Progress Bar](https://plugins.jetbrains.com/plugin/8575-nyan-progress-bar)
    1. [Lombok](https://plugins.jetbrains.com/plugin/6317-lombok)
    1. [Rainbow Brackets](https://plugins.jetbrains.com/plugin/10080-rainbow-brackets)
    1. [FindBugs-IDEA](https://plugins.jetbrains.com/plugin/3847-findbugs-idea)

    Setup command-line Launcher

    ![IntelliJ Create Command-Line Launcher](images/IntelliJ%20Create%20Command-Line%20Launcher.png)

1. **VS Code** ([https://code.visualstudio.com/](https://code.visualstudio.com/))

    Extensions
    1. [Java Extension Pack](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-pack)
    1. [Spring Boot Tools](https://marketplace.visualstudio.com/items?itemName=Pivotal.vscode-spring-boot)
    1. [Spring Initializr Java Support](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-spring-initializr)
    1. [Spring Boot Dashboard](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-spring-boot-dashboard)

    Setup shell command.  (Press [`F1`])

    ![VS Code Shell Command](images/VS%20Code%20Shell%20Command.png)

## Create a project using Gradle

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

    ```bash
    $ gradle init
    ```

    This will bring up an interactive menu

    | Selection               | Value                     |
    |-------------------------|---------------------------|
    | Type of project         | `2: application`          |
    | Implementation language | `3: Java`                 |
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
    Enter selection (default: Java) [1..5] 3

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

1. Open the project in IDE

    IntelliJ

    ```bash
    $ idea .
    ```

    VS Code

    ```bash
    $ code .
    ```

For more details, please refer to: [https://guides.gradle.org/creating-new-gradle-builds/](https://guides.gradle.org/creating-new-gradle-builds/)

## Hello World Application (packaged as an executable application)

1. Run the project

    ```bash
    $ ./gradlew run

    > Task :run
    Hello world.
    ```

1. Build the project

    ```bash
    $ ./gradlew clean build
    ```

    This will produce a [JAR](https://docs.oracle.com/javase/8/docs/technotes/guides/jar/jarGuide.html) file at

    ```
    build/libs/demo.jar
    ```

    JAR is a simple ZIP file.  Unzip it.

    ```bash
    $ unzip build/libs/demo.jar -d temp
    Archive:  build/libs/demo.jar
      creating: temp/META-INF/
     inflating: temp/META-INF/MANIFEST.MF
      creating: temp/demo/
     inflating: temp/demo/App.class
    ```

    The `temp` dir contains two folders and each folder will contain one file.

    ```
    temp
     +-META-INF
     |  +-MANIFEST.MF
     +-demo
        +-App.class
    ```

    The `temp/META-INF/MANIFEST.MF` file is a text file

    ```bash
    $ cat temp/META-INF/MANIFEST.MF
    Manifest-Version: 1.0
    ```

    The `demo/App.class` file is the compiled version of the source file: `src/main/java/demo/App.java`.

1. Run the application

    This JAR is not yet an executable JAR.

    ```bash
    $ java -jar build/libs/demo.jar
    no main manifest attribute, in build/libs/demo.jar
    ```

1. Add the `jar` task

    File: `build.gradle`

    ```groovy
    jar {
      manifest {
        attributes 'Main-Class': application.mainClassName
      }
    }
    ```

    Build the project

    ```bash
    $ ./gradlew clean build
    ```

    Remove the `temp` directory and unzip it again

    ```bash
    $ rm -rf temp
    $ unzip build/libs/demo.jar -d temp
    ```

    The manifest will now contain the `Main-Class`

    ```bash
    $ cat temp/META-INF/MANIFEST.MF
    Manifest-Version: 1.0
    Main-Class: demo.App
    ```

    Run the application

    ```bash
    $ java -jar build/libs/demo.jar
    ```

    This time, it should work.

    ```bash
    Hello world.
    ```

1. Make a fat JAR

    Update the `jar` task

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

    The JAR file now contains runtime dependencies.

    There are other ways to create fat JARs.

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

        List the available gradle tasks (some tasks may bot be visible but still be available).

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

        The JAR file: `build/libs/fat-jar.jar` will be created containing the application together with it's runtime dependencies.

        Run the application.

        ```bash
        $ java -jar build/libs/fat-jar.jar
        Hello world.
        ```

    1. Use a plugin

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

        Two JAR file will be created

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

## Docker
