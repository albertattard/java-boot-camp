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
    
    1. 14.0.1.hs-adpt
    1. 11.0.6.hs-adpt
    1. 8.0.252.hs-adpt
    
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
For more details, please refer to: [https://gradle.org/install/](https://gradle.org/install/)

## IDE (IntelliJ IDEA and VS Code)

## Create a project using Gradle

## Hello World Application (packaged as an executable application)

## Docker
