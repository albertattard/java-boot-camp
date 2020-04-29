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

Maven is the most popular build tool.

![Popularity](assets/images/Maven%20vs.%20Gradle.png)

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

1. Gradle in Action ([O'Reilly Books](https://learning.oreilly.com/library/view/gradle-in-action/9781617291302/))
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

    Comments removed for brevity.

    Plugins enable more features.  For example, the following plugin will enable [Spring Boot](https://docs.spring.io/spring-boot/docs/current/gradle-plugin/reference/html/) gradle tasks.

    ```groovy
    plugins {
        id 'org.springframework.boot' version '2.2.6.RELEASE'
    }
    ```

    The dependency section manages other libraries that our project uses.  For example, we can add new dependency, such as the [Apache Commons Lang3](https://mvnrepository.com/artifact/org.apache.commons/commons-lang3/3.0) shown next by, adding the dependency.

    ```groovy
    dependencies {
        implementation group: 'org.apache.commons', name: 'commons-lang3', version: '3.0'
    }
    ```

    Note that we are pulling dependencies from Maven central, a very popular dependency repository.

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

    IntelliJ

    1. Open the `App.java` file

        ![App](assets/images/IntelliJ%20App%20Class.png)

    1. Click any of the green arrows next to the line numbers.  Alternatively, click anywhere in the class and click `[control] + [shift] + [R]`

        ![Output](assets/images/IntelliJ%20App%20Run%20Output.png)

    VS Code

    1. Open the `App.java` file

    1. Right click on the file and select `Run`

        ![App](assets/images/VS%20Code%20App%20Class.png)

For more details, please refer to: [https://guides.gradle.org/creating-new-gradle-builds/](https://guides.gradle.org/creating-new-gradle-builds/)

## Hello World Application (packaged as an executable application)

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

    ```bash
    $ java -jar build/libs/demo.jar
    no main manifest attribute, in build/libs/demo.jar
    ```

    This JAR is not yet an executable JAR.  The `MANIFEST.MF` is missing the `Main-Class` attribute.

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

### Setup Docker

1. Verify that docker is installed

    ```bash
    $ docker --version
    Docker version 19.03.8, build afacb8b
    ```

    Install docker if missing following the instructions: [https://docs.docker.com/docker-for-mac/install/](https://docs.docker.com/docker-for-mac/install/)

1. Verify that docker is running

    ![Docker Desktop](assets/images/Docker%20Desktop%20Tray%20Icon.png)

### Dockerize the Application

1. Built the project

    ```bash
    ./gradlew clean build
    ```

1. Create file `Dockerfile`

    ```dockerfile
    FROM adoptopenjdk/openjdk14:jre-14.0.1_7-alpine
    WORKDIR /opt/app
    COPY ./build/libs/demo.jar ./application.jar
    CMD ["java", "-jar", "application.jar"]
    ```

    The above docker file relies on the JAR file

    ```
    build/libs/demo.jar
    ```

    This needs to be an executable JAR

1. Build the Java image

    ```bash
    $ docker build . -t demo:local
    ```

1. Run the docker image

    ```bash
    $ docker run -it demo:local
    Hello world.
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

### Recommended Readings

1. Docker in Action, Second Edition ([O'Reilly Books](https://learning.oreilly.com/library/view/docker-in-action/9781617294761/))
1. Docker Essentials: The Definitive Guide to Docker Containerization ([O'Reilly Video Series](https://learning.oreilly.com/videos/docker-essentials-the/9781634625814))
