plugins {
    kotlin("jvm") version "1.9.0"
}

group = "com.sdkwork"
version = ""
description = "Manual-owned Kotlin semantic SDK boundary for IM"
base {
    archiveBaseName.set("im-sdk")
}

repositories {
    mavenCentral()
}

dependencies {
    implementation(kotlin("stdlib"))
}

tasks.test {
    useJUnitPlatform()
}

kotlin {
    jvmToolchain(11)
}
