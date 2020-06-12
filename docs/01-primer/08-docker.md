---
layout: default
title: Making applications portable (containerisation using docker)
parent: Primer
nav_order: 8
permalink: docs/primer/docker/
---

# Making applications portable (containerisation using docker)
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## What is Docker?

Say that we write an application with [OpenJDK 14](https://openjdk.java.net/projects/jdk/14/) and we would like to deploy this application on a server somewhere within the organisation.  The OS where our application will be running needs to have OpenJDK 14 installed otherwise our application will not run.

Another team builds another application, this time using [NodeJS 12](https://nodejs.org/en/).  The OS where this application will be running needs to have the right version of NodeJS installed.

This raises the following questions

1. Who will be managing this?
1. Who will make sure that the correct version of libraries/frameworks platforms are installed?
1. How can we manage multiple version of libraries/frameworks/platforms running at the same time?
1. How can we ensure that the application works as expected on the production environment?
1. How will we save the configuration such that we can scale it to hundreds or thousands of servers?

Gradle helps us building and packaging all application's dependencies into one fat JAR, but it falls short in setting up the operating system.  That's outside its scope.

[Docker](https://docs.docker.com/) is a tool that we can use to bridge this gap and have an environment ready for our application to run on.

## How does this work?

In a nutshell, an application is packaged into a [Docker Image](https://docs.docker.com/get-started/overview/#docker-objects).  For example, if OpenJDK 14 is needed to run the application, we set up Docker image to have OpenJDK 14 installed.  If another application requires Oracle JRE 8, we setup a separate Docker image for the second application.

Similar to Java JAR files, docker creates images, which are the unit of work for docker.  A docker image can be started using a command similar to the following.

```bash
$ docker run my-app
```

Docker takes the image named `my-app` and runs it as a docker container.  **Note that here we switched from docker image to docker container**.

**An instance of a docker image is called a docker container**.

A docker container is a running version of the docker image.  If the application produces logs files, these logs files will be in the docker container (not in the docker image).

A docker container can start and stop like any OS.  The state of a docker container may or may not be preserved between different runs.  With that said, **do not rely on the container state in production**.  [Docker Volumes](https://docs.docker.com/storage/volumes/) can be used to address this issue, but this goes way beyond the scope of this literature.

## More than just Containers

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

## Setup Docker

1. Verify that docker is installed

    ```bash
    $ docker --version
    Docker version 19.03.8, build afacb8b
    ```

    Install docker if missing following the instructions: [https://docs.docker.com/docker-for-mac/install/](https://docs.docker.com/docker-for-mac/install/)

1. Verify that docker is running

    ![Docker Desktop]({{site.baseurl}}/assets/images/Docker-Desktop-Tray-Icon.png)

## Working with Docker

1. A docker hub account is required.  [Create an account](https://hub.docker.com/signup/) if you do not have one yet.

1. Work with an existing docker image (created by someone else)

    This [docker image `bash:5.0.17`](https://hub.docker.com/_/bash) is a basic Linux OS that has `bash` support.

    ```bash
    $ docker pull bash:5.0.17
    ```

    Alternative, we can run the image immediately using `run` instead of `pull`.

    You need to be logged in, otherwise you will get an error similar to the following.

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

    The [`-i` option](https://docs.docker.com/engine/reference/run/#foreground) indicates that we need to interact with the docker container.  Without it, we will not be able to interact with the docker container.  This is very useful while debugging.

1. Open another terminal and run

    ```bash
    $ docker ps
    ```

    This will show the running docker containers

    ```bash
    CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS               NAMES
    110810b3d472        bash:5.0.17         "docker-entrypoint.s…"   53 minutes ago      Up 53 minutes                           brave_payne
    ```

    Some of the information, such as the `CONTAINER ID` and the `NAMES`, will be different.  Note that rerunning the image will create a new container which will have different and independent state from any other containers, even containers for the same image.

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

    `curl` is not available on the image we are using.  We can use a different image that already contains `curl`, or install it ourselves.

    **⚠️ Note that we are working inside a container and all changes we make to this container will be lost once this container is stopped.**

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

    The `bash:5.0.17` image does not include Java.

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

    The above is instructing docker to open a shell terminal.  Note that the image `adoptopenjdk/openjdk14:jre-14.0.1_7-alpine` does not have `bash` installed.  We can use the `sh` instead.  That is why we are running the `/bin/sh` command instead of `/bin/bash`.

    Check the Java version installed

    ```bash
    # java -version
    openjdk version "14.0.1" 2020-04-14
    OpenJDK Runtime Environment AdoptOpenJDK (build 14.0.1+7)
    OpenJDK 64-Bit Server VM AdoptOpenJDK (build 14.0.1+7, mixed mode, sharing)
    ```

    This docker image comes with Java 14 already setup.  A more important observation is that given that we are using a specific version of the image, we will always have the same version of Java installed.

    How do we get our application in the docker container?  The application needs to be dockerize, [described in the Dockerize the Application section](#dockerize-the-application).

## Dockerize the Application

1. The `Dockerfile` text file

    Docker will use a text file named `Dockerfile` to create our image.  The `Dockerfile` file is part of the source code and can be used by the build pipeline to build our docker images and deploy them into production environments.

    **Steps**:

    1. Create the `Dockerfile`

        ```bash
        $ vi Dockerfile
        ```

1. Extend an existing docker image

    We can create a docker image from scratch, but this will require lots of effort as we need to install the OS files, the packages we need (such as `curl` for example) and install the correct version of Java.  Alternatively, we can use an existing image from the docker repository that does this for us.

    **⚠️ Note that many companies, have internal docker repositories and only allow images coming from these repositories for security purposes**.  Such docker repositories scan the images and make sure that these docker images are secure and do not contain any funny business.

    ```dockerfile
    FROM adoptopenjdk/openjdk14:jre-14.0.1_7-alpine
    ```

    The above docker file is extending one of the [adoptopenjdk](https://hub.docker.com/r/adoptopenjdk/openjdk14) images as defined by the [`FROM` instruction](https://docs.docker.com/engine/reference/builder/#from).

    Fragments of the docker image [adoptopenjdk/openjdk14:jre-14.0.1_7-alpine](https://github.com/AdoptOpenJDK/openjdk-docker/blob/master/14/jre/alpine/Dockerfile.hotspot.releases.full) are shown next.

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

    Please note that the above is incomplete for brevity and the full example can be found [here]( https://github.com/AdoptOpenJDK/openjdk-docker/blob/master/14/jre/alpine/Dockerfile.hotspot.releases.full).

    The `adoptopenjdk/openjdk14:jre-14.0.1_7-alpine` installs the [Adopt OpenJDK 14](https://adoptopenjdk.net/releases.html) and set the environment.  The `adoptopenjdk/openjdk14:jre-14.0.1_7-alpine` docker image is built on top of another image, the [alpine:3.11](https://github.com/alpinelinux/docker-alpine/blob/c5510d5b1d2546d133f7b0938690c3c1e2cd9549/x86_64/Dockerfile), shown next.

    ```dockerfile
    FROM scratch
    ADD alpine-minirootfs-3.11.6-x86_64.tar.gz /
    CMD ["/bin/sh"]
    ```

    The `alpine:3.11` does not depend on anything (as indicated by the [`FROM scratch` instruction]( https://docs.docker.com/develop/develop-images/baseimages/)) and is referred to as base image.

    If we want to create a docker image from scratch, we need to merge both docker images, and the files they are referring to, into our docker file.  Note that this is necessary in our case, and will simply extend an existing image.

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

    The [`WORKDIR` instruction](https://docs.docker.com/engine/reference/builder/#workdir) defines directory where our application will be running from.

    Why do we need to change the working directory?

    1. Putting our application in a specific directory helps us organise our application better.  In some cases, we have more than one file.  For example, a web application may contain several files and other web assets.  Having such application in the root directory is a bit messy.  Furthermore, the application itself may expose some files found on the OS and return these to the caller.  We do not want to return a sensitive file by mistake, just because we deployed our application in the root folder.

    1. Putting our application in a specific directory allows us to limit the access rights for the users that will be used to run our application to just this directory.  This will prevent an attacker, accessing anywhere else in the docker container by simply taking advantage of a vulnerability within our application.

    The working directory of our docker image is `/` (the root folder).  We will change this it to `/opt/app`.  The directory does not need to exist and will be created automatically.

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

    Note that now we have two steps, one for every line in the `Dockerfile`

    1. Run the image and print the current working directory

        ```bash
        $ docker run -it demo:local /bin/sh
        # pwd
        /opt/app
        ```

1. Copy our application to docker

    We need to copy our JAR file from the local filesystem to the docker image using the [`COPY` instruction](https://docs.docker.com/engine/reference/builder/#copy).

    ```dockerfile
    COPY ./build/libs/demo-all.jar ./application.jar
    ```

    When docker builds the image, it will copy the file `./build/libs/demo-all.jar` to the docker image being created.  Here we are also renaming the JAR file to `application.jar`.

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

        Note that now we have three steps, one for every instruction we have in the `Dockefile`.

    1. Manually run the application

        Run the newly built docker image and list the files in the current directory.

        ```bash
        $ docker run -it demo:local /bin/sh
        # pwd
        /opt/app
        # ls -l
        -rw-r--r-- application.jar
        ```

        Run the application using the same `java -jar` command passing `application.jar` as the JAR file

        ```bash
        # java -jar application.jar
        Hello world.
        ```

    Note that our application was copied into docker, but we have to manually start it.

1. Make the application to run on start-up

    ```dockerfile
    CMD ["java", "-jar", "application.jar"]
    ```

    The [`CMD` instruction](https://docs.docker.com/engine/reference/builder/#cmd) instructs docker container to run the given command when the container starts.

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

        Note that now we have four steps, one for every instruction we have in the `Dockefile`.

    1. Run the docker image

        ```bash
        $ docker run -t demo:local
        Hello world.
        ```

        Note that we are not using the `-i` flag anymore.  Docker knows what needs to be done and we do not need to interact with it unless we need to debug something.  This is how docker will actually run our container.

The complete `Dockerfile` is shown next

```dockerfile
FROM adoptopenjdk/openjdk14:jre-14.0.1_7-alpine
WORKDIR /opt/app
COPY ./build/libs/demo.jar ./application.jar
CMD ["java", "-jar", "application.jar"]
```

## Multi-Stage Docker Build

The docker file depends on the JAR file to be generated before it runs.  Docker can be used to first build the executable JAR and then creates the image.

For docker to be able to build the application it now needs the source code and any other artefacts required to run `./gradlew build`.  We can copy all files, but that's considered as bad practice as ideally docker build a clean image and should not reuse anything else but the source files from our local filesystem.  **Docker should be able to build the image by simply checking out the source from the repository and the execute `docker build`**.

We have two options to selectively copy the files required by the `./gradlew build` to successfully run.

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

    I personally prefer this option as I intentionally include the file and folders I need to copy.  If the IDE generates new files, these are not automatically copied as I forgot to include them to the `.dockerignore`.

1. Clean the project

    ```bash
    $ ./gradlew clean
    ```

    This is not required, but I prefer to remove any artefacts from the local filesystem to iron out any chances that built artefacts are copied by mistake.

1. Update the `dockerfile` making it a multi-stage docker file

    Example using `.dockerignore`

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

    Alternatively, copy individual files and folders (preferred option).

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

    The [`RUN` instruction](https://docs.docker.com/engine/reference/builder/#run) can be used to run command, such as install packages that we need (like `curl`) or build the project as we did here.

    We do not need to include the `clean` Gradle task here as we only copied the sources without any built artefacts.  Therefore, there is nothing to clean as the `build` directory was not copied.

    This time docker will build the JAR and then package it.  Unfortunately, it does not take advantage of any caching and makes it a bit slower.  **While this is slow for development purposes, it ensures that the build is not relying on caches.**

1. Run the docker image

    ```bash
    $ docker run -it demo:local
    Hello world.
    ```

For more details, please refer to: [https://docs.docker.com/develop/develop-images/multistage-build/](https://docs.docker.com/develop/develop-images/multistage-build/).

Multi-stage docker images are not very common as this feature is not supported by some providers.  Furthermore, the functionality provided by the Multi-stage docker built is also provided by the Pipeline tools such as [Jenkins](https://www.jenkins.io/) and [GoCD](https://www.gocd.org/) and developers/dev-ops prefer to use this as they tend to provide more than just build the project.

## Managing Docker Containers

Once an application is built and packaged into a container, this needs to be executed.  We ran our application by using the `run` command

```bash
$ docker run -it demo:local
```

That's all great for development.

Consider the following:

1. What happens if our application becomes unresponsive or crashes?
1. What happens if our application experiences more load and new instances need to be started?
1. How will we reduce the number of instances running when our application is not being used?
1. How will we deploy new versions of our application?
1. Can we have red/green deployments?
1. How will we monitor our application?
1. How can we access the logs of our application?

There are many more things to consider when running an application irrespective from docker.  Docker enables developers to take advantage of tools that can help us with the above concerns and more as discussed before (such as security).  Following are **some** (not complete) tools and services we can use to manage our docker containers in a production environment.

1. [AWS](https://aws.amazon.com/)
1. [Google Cloud](https://cloud.google.com/)
1. [Microsoft Azure](https://azure.microsoft.com/)
1. [Digital Ocean](https://www.digitalocean.com/)
1. [Kubernetes](https://kubernetes.io/)
1. [Docker Swarm](https://docs.docker.com/engine/swarm/)
1. [Portainer](https://www.portainer.io/)
1. [Rancher](https://rancher.com/)

Some of the above services are able work with JAR files directly and we do not need to create a docker container.  For example, using [AWS Elastic Beanstalk](https://aws.amazon.com/elasticbeanstalk/)  we can deploy the JAR file and have AWS handling the rest.

## Recommended reading

1. Docker in Action, Second Edition ([O'Reilly Books](https://learning.oreilly.com/library/view/docker-in-action/9781617294761/))
1. Docker Essentials: The Definitive Guide to Docker Containerization ([O'Reilly Video Series](https://learning.oreilly.com/videos/docker-essentials-the/9781634625814))
1. Docker, Dockerfile, and Docker-Compose (2020 Ready!)
 ([O'Reilly Video Series](https://learning.oreilly.com/videos/docker-dockerfile-and/9781800206847))
1. Kubernetes in Action ([O'Reilly Books](https://learning.oreilly.com/library/view/kubernetes-in-action/9781617293726/))
1. Kubernetes: Up and Running, 2nd Edition ([O'Reilly Books](https://learning.oreilly.com/library/view/kubernetes-up-and/9781492046523/))
