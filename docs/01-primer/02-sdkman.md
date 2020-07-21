---
layout: default
title: Setup environment (SDKMAN)
parent: Primer
nav_order: 2
permalink: docs/primer/sdkman/
---

# Setup environment (SDKMAN)

SDKMAN is a command line tool that allows us to install different versions of Java, Gradle, Maven and more.  SDKMAN also takes care of setting environment variables for you. Installing SDKMAN.

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

   To switch between versions just use `java11` and `java14`.

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
