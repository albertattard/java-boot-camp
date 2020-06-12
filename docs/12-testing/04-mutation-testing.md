---
layout: default
title: Mutation Testing (PIT)
parent: Testing
nav_order: 4
permalink: docs/testing/mutation-testing/
---

# Mutation Testing (PIT)
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Mutation Testing (PIT)

[Mutation testing](https://en.wikipedia.org/wiki/Mutation_testing) is used to design new software tests and evaluate the quality of existing software tests.  [PITest](https://pitest.org/) is a mutation testing system, providing great test coverage for Java and the JVM.  ThoughtWorks has moved PITest in the [access group in the technology radar](https://www.thoughtworks.com/de/radar/tools/pitest) in November 2016 where it is still today.

PITest requires some Gradle configuration

1. Plugin

    ```groovy
    plugins {
      id 'info.solidsoft.pitest' version '1.4.8'
    }
    ```

1. JUnit 5 runtime dependency

    ```groovy
    dependencies {
      testRuntimeOnly 'org.pitest:pitest-junit5-plugin:0.12'
    }
    ```

1. Configuring PITest

    ```groovy
    pitest {
      testPlugin = 'junit5'
      targetClasses = ['demo.*']
      timestampedReports = false
    }
    ```

No further changes are required to the code.  Run the `pitest` task

```bash
$ ./gradlew clean pitest
```

The `clean` task is not necessary, but it is useful in cleaning the reports from the previous run.

PITest produces a report at `build/reports/pitest/index.html`

![Pit Test Coverage Report]({{site.baseurl}}/assets/images/Pit-Test-Coverage-Report.png)

## Recommended reading

1. Chapter 8 Test Adequacy Assessment using Program Mutation *of Foundations of Software Testing, 2nd Edition* ([O'Reilly Books](https://learning.oreilly.com/library/view/foundations-of-software/9788131794760/xhtml/chapter008-1.xhtml))
