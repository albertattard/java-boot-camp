# Primer

## TOC

1. [Setup Environment (SDKMAN)](#setup-environment-sdkman)
1. [Gradle and Maven](#gradle-and-maven)
    1. [Advantages of Gradle over Maven](#advantages-of-gradle-over-maven)
    1. [Install Gradle](#install-gradle)
1. [IDE (IntelliJ IDEA and VS Code)](#ide-intellij-idea-and-vs-code)
1. [Create a project using Gradle](#create-a-project-using-gradle)
    1. [Create Project](#create-project)
    1. [Explore Project](#explore-project)
1. [Hello World Application (packaged as an executable application)](#hello-world-application-packaged-as-an-executable-application)
    1. [Gradle Task Dependency Tree](#gradle-task-dependency-tree)
    1. [Project Dependencies](#project-dependencies)
    1. [Package Project](#package-project)
    1. [Make a fat JAR](#make-a-fat-jar)
1. [Docker](#docker)
    1. [What is Docker?](#what-is-docker)
    1. [How does this work?](#how-does-this-work)
    1. [More than just Containers](#more-than-just-containers)
    1. [Setup Docker](#setup-docker)
    1. [Working with Docker](#working-with-docker)
    1. [Dockerize the Application](#dockerize-the-application)
    1. [Multi-Stage Docker Build](#multi-stage-docker-build)
1. [Java Language Specification](#java-language-specification)

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
    alias java11='sdk default java 11.0.7.hs-adpt'
    alias java14='sdk default java 14.0.1.hs-adpt'
    ```

    Note that the aliases will need to be updated when different versions of Java are added or removed.

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

Gradle and Maven are build automation tool that are designed to be flexible enough to build almost any type of software, ranging from mobile application to web applications and command line applications.

1. Gradle ([https://gradle.org/](https://gradle.org/))
1. Maven ([http://maven.apache.org/](http://maven.apache.org/))

According to [Google Trends](https://trends.google.com/trends/explore?q=maven,gradle), Maven is the most popular build tool.

![Popularity](assets/images/Maven%20vs.%20Gradle.png)

### Advantages of Gradle over Maven

1. **Flexible**

    Changing the build lifecycle using Maven is harder than expected.  Gradle addressed this and made it easy to customise the lifecycles as required ([reference](https://gradle.org/maven-vs-gradle/)).

1. **Performant**

    ![Performance](https://gradle.org/images/performance/maven-vs-gradle.gif)
    ([Reference](https://gradle.org/gradle-vs-maven-performance/))

1. **Better Dependency Management**

   Maven allows one to override a dependency, but only by their version. Gradle provides customizable dependency selection and substitution rules that can be declared once and handle unwanted dependencies project-wide. This substitution mechanism enables Gradle to build multiple source projects together to create composite builds ([reference](https://gradle.org/maven-vs-gradle/)).

### Install Gradle

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

1. Gradle in Action ([O'Reilly Books](https://learning.oreilly.com/library/view/gradle-in-action/9781617291302/))
1. Gradle Beyond the Basics ([O'Reilly Books](https://learning.oreilly.com/library/view/gradle-beyond-the/9781449373801/))
1. Building and Testing with Gradle ([O'Reilly Books](https://learning.oreilly.com/library/view/building-and-testing/9781449306816/))
1. Gradle Fundamentals ([O'Reilly Video Series](https://learning.oreilly.com/videos/gradle-fundamentals/9781491937266))

## IDE (IntelliJ IDEA and VS Code)

1. **IntelliJ IDEA** ([https://www.jetbrains.com/idea/download/#section=mac](https://www.jetbrains.com/idea/download/#section=mac))

    Plugins
    1. [Nyan Progress Bar](https://plugins.jetbrains.com/plugin/8575-nyan-progress-bar)
    1. [jclasslib Bytecode viewer](https://plugins.jetbrains.com/plugin/9248-jclasslib-bytecode-viewer)
    1. [Lombok](https://plugins.jetbrains.com/plugin/6317-lombok)
    1. [Rainbow Brackets](https://plugins.jetbrains.com/plugin/10080-rainbow-brackets)
    1. [FindBugs-IDEA](https://plugins.jetbrains.com/plugin/3847-findbugs-idea)

    Setup command-line Launcher

    ![IntelliJ Create Command-Line Launcher](assets/images/IntelliJ%20Create%20Command-Line%20Launcher.png)

1. **VS Code** ([https://code.visualstudio.com/](https://code.visualstudio.com/))

    Extensions
    1. [Java Extension Pack](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-pack)
    1. [Gradle Tasks](https://marketplace.visualstudio.com/items?itemName=richardwillis.vscode-gradle)
    1. [Spring Boot Tools](https://marketplace.visualstudio.com/items?itemName=Pivotal.vscode-spring-boot)
    1. [Spring Initializr Java Support](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-spring-initializr)
    1. [Spring Boot Dashboard](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-spring-boot-dashboard)

    Setup shell command.  (Press [`F1`])

    ![VS Code Shell Command](assets/images/VS%20Code%20Shell%20Command.png)

**The examples shown refer to IntelliJ IDEA**.

## Create a project using Gradle

### Create Project

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

![Create Java Project using Gradle](assets/gifs/Create%20Java%20Project%20using%20Gradle.gif)

### Explore Project

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
    │   └── wrapper
    │       ├── gradle-wrapper.jar
    │       └── gradle-wrapper.properties
    ├── gradlew
    ├── gradlew.bat
    ├── settings.gradle
    └── src
        ├── main
        │   ├── java
        │   │   └── demo
        │   │       └── App.java
        │   └── resources
        └── test
            ├── java
            │   └── demo
            │       └── AppTest.java
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

    A gradle wrapper was included by the `gradle init` process as this is the preferred way to run gradle ([reference](https://docs.gradle.org/current/userguide/gradle_wrapper.html)).

    ```bash
    drwxr-xr-x gradle
    -rwxr-xr-x gradlew
    -rw-r--r-- gradlew.bat
    ```

    Instead of using `gradle`, now we can use `./gradlew` (or `./gradlew.bat` on Windows).  **Using the wrapper, we do not require to have gradle installed**.

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
    distributionUrl=https\://services.gradle.org/distributions/gradle-6.3-bin.zip
    zipStoreBase=GRADLE_USER_HOME
    zipStorePath=wrapper/dists
    ```

    The list of releases is found at: [releases](https://gradle.org/releases/) page.

    We can configure gradle's properties to be used by the project from this file, including the version of gradle.  This ensures that everyone on the project make use of the same configuration (and version) of gradle.

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
      testImplementation 'org.junit.jupiter:junit-jupiter-api:5.6.0'
      testRuntimeOnly 'org.junit.jupiter:junit-jupiter-engine:5.6.0'
    }

    application {
      mainClassName = 'demo.App'
    }

    test {
      useJUnitPlatform()
    }
    ```

    [Plugins](https://docs.gradle.org/current/userguide/plugins.html) enable more features.  For example, the following plugin will enable [Spring Boot](https://docs.spring.io/spring-boot/docs/current/gradle-plugin/reference/html/) gradle tasks.

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

        ![App](assets/images/IntelliJ%20App%20Class.png)

    1. Click any of the green arrows next to the line numbers.  Alternatively, click anywhere in the class and click `[control] + [shift] + [R]`

        ![Output](assets/images/IntelliJ%20App%20Run%20Output.png)

## Hello World Application (packaged as an executable application)

### Gradle Task Dependency Tree

1. Run the project

    ```bash
    $ ./gradlew run

    > Task :run
    Hello world.
    ```

1. Adjust Logging Level

    The [run](https://docs.gradle.org/current/userguide/command_line_interface.html#running_applications) tasks will also compile the code and perform all necessary things.  It performs three more tasks:

    1. [compileJava](https://docs.gradle.org/current/userguide/java_plugin.html#sec:java_tasks)
    1. [processResources](https://docs.gradle.org/current/userguide/java_plugin.html#sec:java_tasks)
    1. [classes](https://docs.gradle.org/current/userguide/java_plugin.html#sec:java_tasks)

    Using the `-i` (or `--info`) [logging option](https://docs.gradle.org/current/userguide/logging.html#logging), gradle will produce more information.

    ```bash
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

    ```bash
    $ ./gradlew run taskTree
    ```

    The result shows an inverted tree, where the top nodes depend on the lower nodes

    ```bash
    :run
    \--- :classes
         +--- :compileJava
         \--- :processResources
    ```

    The `run` task depends on the `classes` task which depends on two more tasks.

Demo

![Display Task Dependency Tree](assets/gifs/Display%20Task%20Dependency%20Tree.gif)

### Project Dependencies

1. List project dependencies

    ```bash
    $ ./gradlew dep
    ```

    This is very useful to identify any conflicting dependencies

    ```bash
    > Task :dependencies

    ------------------------------------------------------------
    Root project
    ------------------------------------------------------------

    ...

    testCompileClasspath - Compile classpath for source set 'test'.
    +--- com.google.guava:guava:28.2-jre
    |    +--- com.google.guava:failureaccess:1.0.1
    |    +--- com.google.guava:listenablefuture:9999.0-empty-to-avoid-conflict-with-guava
    |    +--- com.google.code.findbugs:jsr305:3.0.2
    |    +--- org.checkerframework:checker-qual:2.10.0
    |    +--- com.google.errorprone:error_prone_annotations:2.3.4
    |    \--- com.google.j2objc:j2objc-annotations:1.3
    \--- org.junit.jupiter:junit-jupiter-api:5.6.0
         +--- org.junit:junit-bom:5.6.0
         |    +--- org.junit.jupiter:junit-jupiter-api:5.6.0 (c)
         |    \--- org.junit.platform:junit-platform-commons:1.6.0 (c)
         +--- org.apiguardian:apiguardian-api:1.1.0
         +--- org.opentest4j:opentest4j:1.2.0
         \--- org.junit.platform:junit-platform-commons:1.6.0
              +--- org.junit:junit-bom:5.6.0 (*)
              \--- org.apiguardian:apiguardian-api:1.1.0

    ...

    BUILD SUCCESSFUL in 769ms
    1 actionable task: 1 executed
    ```

### Package Project

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
    $ tree temp
    temp
    ├── META-INF
    │   └── MANIFEST.MF
    └── demo
        └── App.class

    2 directories, 2 files
    ```

    The `temp/META-INF/MANIFEST.MF` file is a text file

    ```bash
    $ cat temp/META-INF/MANIFEST.MF
    Manifest-Version: 1.0
    ```

    The `demo/App.class` file is the compiled version of the source file: `src/main/java/demo/App.java`.

    ![What does a modern JVM look like](assets/images/What%20does%20a%20modern%20JVM%20look%20like.png)
    Image copied from: [Theory: JVM Subsystems](https://learning.oreilly.com/videos/optimizing-java/9781492044673/9781492044673-video323884)

    The bytecode produced when compiling this class can be viewed using the [Jclasslib plugin](https://plugins.jetbrains.com/plugin/9248-jclasslib-bytecode-viewer).

    Click on `View > Show Bytecode with Jclasslib`

    ![Show Bytecode With Jclasslib](assets/images/Show%20Bytecode%20With%20Jclasslib.png)

    Expand `Methods > main > Code`

    ![Bytecode](assets/images/App%20Main%20Method%20Bytecode.png)

    The section [Internals: Bytecode Basics](https://learning.oreilly.com/videos/optimizing-java/9781492044673/9781492044673-video323889), part of the [Optimizing Java O'Reilly Video Series](https://learning.oreilly.com/videos/optimizing-java/9781492044673), covers this topic in some depth and is a recommended follow up.

1. Run the application

    ```bash
    $ java -jar build/libs/demo.jar
    no main manifest attribute, in build/libs/demo.jar
    ```

    This JAR is not yet an executable JAR.  The `MANIFEST.MF` is missing the `Main-Class` attribute.

1. Configure the `jar` task

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

### Make a fat JAR

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

    The JAR file now contains runtime dependencies.

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

   For more information about tasks, please refer to the [tasks user guide](https://docs.gradle.org/current/userguide/tutorial_using_tasks.html).

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

## Docker

### What is Docker?

Say that we write an application with [OpenJDK 14](https://openjdk.java.net/projects/jdk/14/) and we would like to deploy this application on a server somewhere within the organisation.  The OS where our application will be running needs to have OpenJDK 14 installed otherwise our application will not run.

Another team builds another application, this time using [NodeJS 12](https://nodejs.org/en/).  The OS where this application will be running needs to have the right version of NodeJS installed.

This raises the following questions

1. Who will be managing this?
1. Who will make sure that the correct version of libraries/frameworks are installed?
1. How can we ensure that the application works as expected on the production environment?
1. How will we save the configuration such that we can scale it to hundreds or thousands of servers?

Gradle helps us building and packaging all application dependencies into one fat JAR, but it falls short in setting up the operating system.  That's outside its scope.

[Docker](https://docs.docker.com/) is a tool that we can use to bridge this gap and have an environment ready for our application to run on.

### How does this work?

In a nutshell, an application is packaged into a [Docker Image](https://docs.docker.com/get-started/overview/#docker-objects).  For example, if OpenJDK 14 is needed to run the application, we set up Docker to have OpenJDK 14 installed.

Similar to Java JAR files, docker creates images, which are the unit of work for docker.  Similar to Java, an image can be started using a command similar to the following.

```bash
$ docker run my-app
```

Docker takes the image named `my-app` and runs it as a docker container.  Docker also starts our application and kick off any initialisation tasks if needed.

**An instance of a docker image is called a docker container**.

A docker container is a running version of the docker image.  If the application produces logs files, these logs files will be in the docker container (not in the docker image).

A docker container can start and stop like any OS and it will preserve state.  With that said, **do not rely on the container state in production**.

### More than just Containers

Docker provides more than just the correct configuration.

1. **Limited Access**

    Consider the case where two or more applications are running on the same OS.  One of the applications may be able (intentionally or unintentionally) be able to access files saved by another application running on the same OS.

    Someone needs to make sure that an application does not access resources that belong to another application.

    Secrets used to access resources, such as databases, may be saved as environment variables.  OS scope environment variables are available to all applications running on the same OS.  Any application running on the same OS will be able to access the secrets that belong to another application.

1. **Limit attack surface area**

    Say that we have a server with several applications running on it and one of these applications have a security vulnerability.

    Vulnerabilities may come from different places including libraries used by an application or the platform on which it runs.

    The other applications running on the same OS may be affected by this vulnerability too.

1. **Limit Damage**

    An application may misbehave such that it causes the OS to misbehave, perform poorly or crash

    1. Consume more memory than planned
    1. Open too many files handles
    1. Open too many threads

    It is not always easy to configure the OS such that it limits the resources each application uses.

### Setup Docker

1. Verify that docker is installed

    ```bash
    $ docker --version
    Docker version 19.03.8, build afacb8b
    ```

    Install docker if missing following the instructions: [https://docs.docker.com/docker-for-mac/install/](https://docs.docker.com/docker-for-mac/install/)

1. Verify that docker is running

    ![Docker Desktop](assets/images/Docker%20Desktop%20Tray%20Icon.png)


### Working with Docker

1. A docker hub account is required.  [Create an account](https://hub.docker.com/signup/) if you do not have one yet.

1. Work with an existing docker image (created by someone else)

    This [docker image `bash:5.0.17`](https://hub.docker.com/_/bash) is a basic linux OS that has bash support.

    ```bash
    $ docker pull bash:5.0.17
    ```

    Alternative, we can run the image immediately using `run` instead of `pull`.

    You need to be logged in, otherwise you will get an error similar ot the following.

    ```bash
    Error response from daemon: Get https://registry-1.docker.io/v2/library/bash/manifests/5.0.17: unauthorized: incorrect username or password
    ```

    Login

    ```bash
    $ docker login --username <YOUR-USERNAME>
    Login Succeeded
    ```

1. Run the docker image

    ```bash
    $ docker run -it bash:5.0.17
    ```

    Now you are in the `bash:5.0.17` docker container

    ```bash
    bash-5.0#
    ```

    The [`-i` option](https://docs.docker.com/engine/reference/run/#foreground) indicates that we need to interact with the docker container.  Without it we will not be able to interact with the docker container.  This is very useful while debugging.

1. Open another terminal and run

    ```bash
    $ docker ps
    ```

    This will show the running docker containers

    ```bash
    CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS               NAMES
    110810b3d472        bash:5.0.17         "docker-entrypoint.s…"   53 minutes ago      Up 53 minutes                           brave_payne
    ```

    Some of the information, such as the `CONTAINER ID` and the `NAMES`, will be different.

1. Try out some commands

    1. `pwd`

        ```bash
        bash-5.0# pwd
        /
        ```

    1. `ls -la`

        ```bash
        bash-5.0# ls -la
        total 64
        drwxr-xr-x    1 root     root          4096 May  5 09:54 .
        drwxr-xr-x    1 root     root          4096 May  5 09:54 ..
        -rwxr-xr-x    1 root     root             0 May  5 09:54 .dockerenv
        drwxr-xr-x    1 root     root          4096 Apr 24 22:51 bin
        drwxr-xr-x    5 root     root           360 May  5 09:54 dev
        drwxr-xr-x    1 root     root          4096 May  5 09:54 etc
        drwxr-xr-x    2 root     root          4096 Apr 23 06:25 home
        drwxr-xr-x    1 root     root          4096 Apr 24 22:51 lib
        drwxr-xr-x    5 root     root          4096 Apr 23 06:25 media
        drwxr-xr-x    2 root     root          4096 Apr 23 06:25 mnt
        drwxr-xr-x    2 root     root          4096 Apr 23 06:25 opt
        dr-xr-xr-x  188 root     root             0 May  5 09:54 proc
        drwx------    2 root     root          4096 Apr 23 06:25 root
        drwxr-xr-x    2 root     root          4096 Apr 23 06:25 run
        drwxr-xr-x    2 root     root          4096 Apr 23 06:25 sbin
        drwxr-xr-x    2 root     root          4096 Apr 23 06:25 srv
        dr-xr-xr-x   13 root     root             0 May  5 09:54 sys
        drwxrwxrwt    1 root     root          4096 Apr 24 22:51 tmp
        drwxr-xr-x    1 root     root          4096 Apr 24 22:51 usr
        drwxr-xr-x    1 root     root          4096 Apr 24 22:51 var
        ```

    1. `echo`

        ```bash
        bash-5.0# echo "Hello Docker"
        Hello Docker
        ```

    1. `env`

        ```bash
        bash-5.0# env
        HOSTNAME=110810b3d472
        PWD=/
        _BASH_GPG_KEY=7C0135FB088AAF6C66C650B9BB5869F064EA74AB
        HOME=/root
        _BASH_VERSION=5.0
        _BASH_PATCH_LEVEL=0
        _BASH_LATEST_PATCH=17
        TERM=xterm
        SHLVL=1
        PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
        _=/usr/bin/env
        ```

1. Add [curl](https://curl.haxx.se/)

    `curl` is not available on the image we are using.  We can use a different image that already contains it, or install it ourselves.

    ```bash
    bash-5.0# curl http://www.google.com
    bash: curl: command not found
    ```

    Use the package manager available to the OS you are using.  Alpine, the OS we are using, uses the [`apk` package manager](https://wiki.alpinelinux.org/wiki/Alpine_Linux_package_management).  A list of available packages is available [here](https://pkgs.alpinelinux.org/packages).

    ```bash
    bash-5.0# apk add curl
    fetch http://dl-cdn.alpinelinux.org/alpine/v3.11/main/x86_64/APKINDEX.tar.gz
    fetch http://dl-cdn.alpinelinux.org/alpine/v3.11/community/x86_64/APKINDEX.tar.gz
    (1/4) Installing ca-certificates (20191127-r1)
    (2/4) Installing nghttp2-libs (1.40.0-r0)
    (3/4) Installing libcurl (7.67.0-r0)
    (4/4) Installing curl (7.67.0-r0)
    Executing busybox-1.31.1-r9.trigger
    Executing ca-certificates-20191127-r1.trigger
    OK: 8 MiB in 21 packages
    ```

    Now we have `curl` installed

    ```bash
    bash-5.0# curl http://www.google.com
    <!doctype html><html itemscope="" ...
    ```

    Note that `curl` is not part of the image.  Only this container has `curl` installed.  The `curl` will not be available on any other container for the same image.

    1. Stop the container

        ```bash
        bash-5.0# exit
        $ exit
        ```

    1. Start a new container

        ```bash
        $ docker run -it bash:5.0.17
        bash-5.0#
        ```

    1. Try the `curl` command

        ```bash
        bash-5.0# curl http://www.google.com
        bash: curl: command not found
        ```

    **Any changes made to a container are lost once the container is stopped**.

1. How can we run a Java application within a container?

    The `bash:5.0.17`  image does not include Java.

    ```bash
    $ docker run -it bash:5.0.17
    bash-5.0# java -version
    bash: java: command not found
    ```

    We can use an image which have the Java we need already installed, such as the [`adoptopenjdk/openjdk14:jre-14.0.1_7-alpine` image](https://hub.docker.com/r/adoptopenjdk/openjdk14).

    ```bash
    $ docker run -it adoptopenjdk/openjdk14:jre-14.0.1_7-alpine
    ```

    Note that some examples may also append the command to be executed when the container starts, such as

    ```bash
    $ docker run -it adoptopenjdk/openjdk14:jre-14.0.1_7-alpine /bin/sh
    ```

    The above is instructing docker to open a shell terminal.  Note that the image `adoptopenjdk/openjdk14:jre-14.0.1_7-alpine` does not have `bash` installed.  We can use the `sh` instead.  That is why we are running the `/bin/sh` command instead.

    Check the Java version installed

    ```bash
    # java -version
    openjdk version "14.0.1" 2020-04-14
    OpenJDK Runtime Environment AdoptOpenJDK (build 14.0.1+7)
    OpenJDK 64-Bit Server VM AdoptOpenJDK (build 14.0.1+7, mixed mode, sharing)
    ```

    This docker image comes with Java 14 already setup.

    How do we get our application in the docker container?  The application needs to be dockerize, [described in the Dockerize the Application section](#dockerize-the-application).

### Dockerize the Application

1. The `Dockerfile` text file

    Docker will use this text file to create our image.  The `Dockerfile` file is part of the source code and can be used by the build pipeline to build our docker images and deploy them into production environments.

    **Steps**:

    1. Create the `Dockerfile`

        ```bash
        $ vi Dockerfile
        ```

1. Extend an existing docker image

    We can create a docker image from scratch, but this will require lots of effort as we need to install the OS files, the packages we need and install Java.  Alternatively, we can use an existing image from the docker repository.

    **⚠️ Note that many companies, have internal docker repositories and only allow images coming from these repositories**.

    ```dockerfile
    FROM adoptopenjdk/openjdk14:jre-14.0.1_7-alpine
    ```

    The above docker file is extending one of the [adoptopenjdk](https://hub.docker.com/r/adoptopenjdk/openjdk14) images as defined by the [`FROM` instruction](https://docs.docker.com/engine/reference/builder/#from).

    Fragments of the image [adoptopenjdk/openjdk14:jre-14.0.1_7-alpine](https://github.com/AdoptOpenJDK/openjdk-docker/blob/master/14/jre/alpine/Dockerfile.hotspot.releases.full) are shown next.

    ```dockerfile
    FROM alpine:3.11

    ENV LANG='en_US.UTF-8' LANGUAGE='en_US:en' LC_ALL='en_US.UTF-8'

    RUN apk add --no-cache --virtual .build-deps curl binutils \
        && GLIBC_VER="2.31-r0" \
        && ALPINE_GLIBC_REPO="https://github.com/sgerrand/alpine-pkg-glibc/releases/download" \
        && GCC_LIBS_URL="https://archive.archlinux.org/packages/g/gcc-libs/gcc-libs-9.1.0-2-x86_64.pkg.tar.xz" \
        && GCC_LIBS_SHA256="91dba90f3c20d32fcf7f1dbe91523653018aa0b8d2230b00f822f6722804cf08" \

    ...

    ENV JAVA_HOME=/opt/java/openjdk \
        PATH="/opt/java/openjdk/bin:$PATH"
    ```

    Please note that the above is incomplete for brevity.

    The `adoptopenjdk/openjdk14:jre-14.0.1_7-alpine` installs the [Adopt OpenJDK 14](https://adoptopenjdk.net/releases.html) and set the environemnt.  The `adoptopenjdk/openjdk14:jre-14.0.1_7-alpine` docker image is build on top of another image, the [alpine:3.11](https://github.com/alpinelinux/docker-alpine/blob/c5510d5b1d2546d133f7b0938690c3c1e2cd9549/x86_64/Dockerfile).

    ```dockerfile
    FROM scratch
    ADD alpine-minirootfs-3.11.6-x86_64.tar.gz /
    CMD ["/bin/sh"]
    ```

    The `alpine:3.11` does not depend on anything (`FROM scratch`) and creates a basic and small Linux OS.

    If we want to create a docker image from scratch we need to merge both docker images and the files they are referring to.

    **Steps**:

    1. Import from `adoptopenjdk/openjdk14:jre-14.0.1_7-alpine` in the `Dockerfile`

        ```dockerfile
        FROM adoptopenjdk/openjdk14:jre-14.0.1_7-alpine
        ```

    1. Build the new docker image

        ```bash
        $ docker build . -t demo:local
        Sending build context to Docker daemon  166.9kB
        Step 1/1 : FROM adoptopenjdk/openjdk14:jre-14.0.1_7-alpine
         ---> 82f70d1be68e
        Successfully built 82f70d1be68e
        Successfully tagged demo:local
        ```

    1. Run the newly built docker image

        ```bash
        $ docker run -it demo:local /bin/sh
        #
        ```

    1. Verify the Java version

        ```bash
        # java -version
        openjdk version "14.0.1" 2020-04-14
        OpenJDK Runtime Environment AdoptOpenJDK (build 14.0.1+7)
        OpenJDK 64-Bit Server VM AdoptOpenJDK (build 14.0.1+7, mixed mode, sharing)
        ```

    1. Check the working directory

        ```bash
        # pwd
        /
        ```

1. Set the working directory

    ```dockerfile
    WORKDIR /opt/app
    ```

    The [`WORKDIR` instruction](https://docs.docker.com/engine/reference/builder/#workdir) is the directory where our application will be running from.

    The working directory of our image was `/` (the root folder).  Now we changed it to be `/opt/app`.  The directory does not need to exists and will be created automatically.

    **Steps**:

    1. Add the working directory to the `Dockerfile`

        ```dockerfile
        WORKDIR /opt/app
        ```

    1. Build the new docker image

        ```bash
        $ docker build . -t demo:local
        Sending build context to Docker daemon  166.9kB
        Step 1/2 : FROM adoptopenjdk/openjdk14:jre-14.0.1_7-alpine
         ---> 82f70d1be68e
        Step 2/2 : WORKDIR /opt/app
         ---> Using cache
         ---> e5738c7ba12f
        Successfully built e5738c7ba12f
        Successfully tagged demo:local
        ```

    1. Run the image and print the current working directory

        ```bash
        $ docker run -it demo:local /bin/sh
        # pwd
        /opt/app
        ```

1. Copy our application to docker

    We need to copy our JAR file from the local filesystem to the docker image using the [`COPY` instruction](https://docs.docker.com/engine/reference/builder/#copy).

    ```dockerfile
    COPY ./build/libs/demo.jar ./application.jar
    ```

    When docker builds the image, it will copy the file `./build/libs/demo.jar` to the docker image being created.

    **Steps**:

    1. Built the project

        ```bash
        ./gradlew clean build
        ```

        The JAR file produced by the build task will be used to create the docker image.  The docker image relies on the fat JAR file

        ```
        build/libs/demo-all.jar
        ```

        This needs to be an executable (fat) JAR containing all dependencies.  The JAR file needs to be able to run using just

        ```bash
        $ java -jar build/libs/demo.jar
        ```

        This is how docker will run our application

    1. Add the `COPY` instruction to the `Dockerfile`

        ```dockerfile
        COPY ./build/libs/demo-all.jar ./application.jar
        ```

    1. Build the new docker image

        ```bash
        $ docker build . -t demo:local
        Sending build context to Docker daemon  14.77MB
        Step 1/3 : FROM adoptopenjdk/openjdk14:jre-14.0.1_7-alpine
         ---> 82f70d1be68e
        Step 2/3 : WORKDIR /opt/app
         ---> Using cache
         ---> e5738c7ba12f
        Step 3/3 : COPY ./build/libs/demo-all.jar ./application.jar
         ---> b5ff637e4e91
        Successfully built b5ff637e4e91
        Successfully tagged demo:local
        ```

    1. Manually run the application

        ```bash
        $ docker run -it demo:local /bin/sh
        # pwd
        /opt/app
        # ls -l
        -rw-r--r-- application.jar
        ```

        ```bash
        # java -jar application.jar
        Hello world.
        ```

    Note that our application was copied into docker, but we have to manually start it.

1. Make the application to run on startup

    ```dockerfile
    CMD ["java", "-jar", "application.jar"]
    ```

    The [`CMD` instruction](https://docs.docker.com/engine/reference/builder/#run) instructs docker container to run the given command when the container starts.

    **Steps**:

    1. Add the `CMD` instruction to the `Dockerfile`

        ```dockerfile
        CMD ["java", "-jar", "application.jar"]
        ```

    1. Build the new docker image

        ```bash
        $ docker build . -t demo:local
        Sending build context to Docker daemon  14.77MB
        Step 1/4 : FROM adoptopenjdk/openjdk14:jre-14.0.1_7-alpine
         ---> 82f70d1be68e
        Step 2/4 : WORKDIR /opt/app
         ---> Using cache
         ---> e5738c7ba12f
        Step 3/4 : COPY ./build/libs/demo-all.jar ./application.jar
         ---> Using cache
         ---> b5ff637e4e91
        Step 4/4 : CMD ["java", "-jar", "application.jar"]
         ---> Running in cd66c5b54493
        Removing intermediate container cd66c5b54493
         ---> efab5e9092f4
        Successfully built efab5e9092f4
        Successfully tagged demo:local
        ```

    1. Run the docker image

        ```bash
        $ docker run -t demo:local
        Hello world.
        ```

        Note that we are not using the `-i` flag anymore.  Docker know what needs to be done and we do not need to interact with it unless we need to debug something.  This is how docker will actually run our container.,

The complete `Dockerfile` is shown next

```dockerfile
FROM adoptopenjdk/openjdk14:jre-14.0.1_7-alpine
WORKDIR /opt/app
COPY ./build/libs/demo.jar ./application.jar
CMD ["java", "-jar", "application.jar"]
```

### Multi-Stage Docker Build

The docker file depends on the JAR file to be generated before it runs.  Docker can be used to first build the executable JAR and then creates the image.

1. Create [.dockerignore](https://docs.docker.com/engine/reference/builder/#dockerignore-file) file

    ```
    .classpath
    .dockerignore
    .git
    .gitattributes
    .gitignore
    .gradle
    .idea
    .project
    .settings
    .vscode
    Dockerfile
    bin
    build
    gradlew.bat
    out
    ```

    The `COPY` command will ignore all matching files.

    Alternatively to adding a `.dockerignore`, add multiple `COPY` commands to the `Dockerfile`

    ```dockerfile
    COPY ./build.gradle .
    COPY ./gradle ./gradle
    COPY ./gradlew .
    COPY ./settings.gradle .
    COPY ./src ./src
    ```

1. Clean the project

    ```bash
    $ ./gradlew clean
    ```

1. Update the `dockerfile` making it a multi-stage docker file

    ```dockerfile
    FROM adoptopenjdk/openjdk14:jdk-14.0.1_7-alpine-slim AS builder
    WORKDIR /opt/app
    COPY . .
    RUN ./gradlew build

    FROM adoptopenjdk/openjdk14:jre-14.0.1_7-alpine
    WORKDIR /opt/app
    COPY --from=builder /opt/app/build/libs/demo.jar ./application.jar
    CMD ["java", "-jar", "application.jar"]
    ```

    Alternatively, copy individual files and folders.

    ```dockerfile
    FROM adoptopenjdk/openjdk14:jdk-14.0.1_7-alpine-slim AS builder
    WORKDIR /opt/app
    COPY ./build.gradle .
    COPY ./gradle ./gradle
    COPY ./gradlew .
    COPY ./settings.gradle .
    COPY ./src ./src
    RUN ./gradlew build

    FROM adoptopenjdk/openjdk14:jre-14.0.1_7-alpine
    WORKDIR /opt/app
    COPY --from=builder /opt/app/build/libs/demo.jar ./application.jar
    CMD ["java", "-jar", "application.jar"]
    ```

    This time docker will build the JAR and then package it.  Unfortunately it does not take advantage of any caching and makes it a bit slower.  **While this is slow for development purposes, it ensures that the build is not relying on caches.**

1. Run the docker image

    ```bash
    $ docker run -it demo:local
    Hello world.
    ```

For more details, please refer to: [https://docs.docker.com/develop/develop-images/multistage-build/](https://docs.docker.com/develop/develop-images/multistage-build/)

### Recommended Reading

1. Docker in Action, Second Edition ([O'Reilly Books](https://learning.oreilly.com/library/view/docker-in-action/9781617294761/))
1. Docker Essentials: The Definitive Guide to Docker Containerization ([O'Reilly Video Series](https://learning.oreilly.com/videos/docker-essentials-the/9781634625814))

## Java Language Specification

The [Java Language Specification](https://docs.oracle.com/javase/specs/jls/se14/html/index.html) is the definitive technical reference for the Java programming language.

For examples, Java supports the following comments styles

1. /* comment */
1. // comment

These are defined in [section 3.7 of the specification](https://docs.oracle.com/javase/specs/jls/se14/html/jls-3.html#jls-3.7).
