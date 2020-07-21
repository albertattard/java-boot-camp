---
layout: default
title: Gradle and Maven
parent: Primer
nav_order: 3
permalink: docs/primer/gradle-and-maven/
---

# Gradle and Maven
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

Gradle and Maven are *build automation tools* that are designed to be flexible enough to build almost any type of software, ranging from mobile application to web applications and command line applications.

1. Gradle ([https://gradle.org/](https://gradle.org/))
1. Maven ([http://maven.apache.org/](http://maven.apache.org/))

According to [Google Trends](https://trends.google.com/trends/explore?q=maven,gradle), Maven is the most popular build tool.

![Popularity]({{site.baseurl}}/assets/images/Maven-vs.-Gradle.png)

## Advantages of Gradle over Maven

1. **Flexible**

   Changing the build lifecycle using Maven is harder than expected.  Gradle addressed this and made it easy to customise the lifecycles as required ([reference](https://gradle.org/maven-vs-gradle/)).

1. **Performant**

   ![Performance](https://gradle.org/images/performance/maven-vs-gradle.gif)<br/>
   ([Reference](https://gradle.org/gradle-vs-maven-performance/))

1. **Better Dependency Management**

   Maven allows one to override a dependency, but only by their version. Gradle provides customizable dependency selection and substitution rules that can be declared once and handle unwanted dependencies project-wide.  This substitution mechanism enables Gradle to build multiple source projects together to create composite builds ([reference](https://gradle.org/maven-vs-gradle/)).

## Install Gradle

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

## Recommended reading

1. Gradle in Action ([O'Reilly Books](https://learning.oreilly.com/library/view/gradle-in-action/9781617291302/))
1. Gradle Beyond the Basics ([O'Reilly Books](https://learning.oreilly.com/library/view/gradle-beyond-the/9781449373801/))
1. Building and Testing with Gradle ([O'Reilly Books](https://learning.oreilly.com/library/view/building-and-testing/9781449306816/))
1. Gradle Fundamentals ([O'Reilly Video Series](https://learning.oreilly.com/videos/gradle-fundamentals/9781491937266))
