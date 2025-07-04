plugins {
    alias(libs.plugins.androidApplication)
    alias(libs.plugins.jetbrainsKotlinAndroid)
    alias(libs.plugins.ksp)
    alias(libs.plugins.hilt)
}

android {
    namespace = "com.example.purelearn"
    compileSdk = 35

    defaultConfig {
        applicationId = "com.example.purelearn"
        minSdk = 28
        targetSdk = 35
        versionCode = 1
        versionName = "1.0"

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
        vectorDrawables {
            useSupportLibrary = true
        }
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
    kotlinOptions {
        jvmTarget = "17"
    }
    buildFeatures {
        compose = true
    }

    buildFeatures {
        compose = true
    }
    composeOptions {
        kotlinCompilerExtensionVersion = "1.5.1"
    }
    packaging {
        resources {
            excludes += "/META-INF/{AL2.0,LGPL2.1}"
        }
    }
}

dependencies {

    implementation(libs.androidx.core.ktx)
    implementation(libs.androidx.lifecycle.runtime.ktx)
    implementation(libs.androidx.activity.compose)
    implementation(platform(libs.androidx.compose.bom))
    implementation(libs.androidx.ui)
    implementation(libs.androidx.ui.graphics)
    implementation(libs.androidx.ui.tooling.preview)
   // implementation(libs.androidx.material3)
    //implementation(libs.androidx.material3.android)
    //implementation(libs.androidx.compose.material)
   // implementation(libs.androidx.material3.android)
    implementation("androidx.compose.material3:material3:1.2.0")  // Or the latest version

    testImplementation(libs.junit)
    androidTestImplementation(libs.androidx.junit)
    androidTestImplementation(libs.androidx.espresso.core)
    androidTestImplementation(platform(libs.androidx.compose.bom))
    androidTestImplementation(libs.androidx.ui.test.junit4)
    debugImplementation(libs.androidx.ui.tooling)
    debugImplementation(libs.androidx.ui.test.manifest)


    debugImplementation(libs.chucker)
    // coil
    implementation(libs.coil.compose)
    // navigation
    implementation(libs.androidx.navigation.compose)



    testImplementation(libs.mockk)
    testImplementation(libs.turbine)
    androidTestImplementation(libs.espresso)

    implementation(libs.lifecycle.runtime.ktx)

    implementation(libs.lifecycle.viewmodel.compose)
    implementation(libs.lifecycle.runtime.compose)
    implementation(libs.lifecycle.viewmodel.ktx)
    implementation(libs.lifecycle.runtime.ktx)

    implementation(libs.hilt)
    ksp(libs.hilt.compiler)
    implementation(libs.hilt.navigation.compose)

    implementation(libs.coroutines)
    implementation(libs.retrofit)
    implementation(libs.okhttp3)
    implementation(libs.gson)
    implementation(libs.gson.converter)

    implementation(libs.room)
    ksp(libs.room.compiler)

    implementation(libs.datastore)
    implementation(libs.lottie.compose)

    implementation( "com.squareup.okhttp3:logging-interceptor:4.9.3")

    implementation("io.ktor:ktor-client-android:2.2.3")
    implementation("io.ktor:ktor-serialization-kotlinx-json:2.2.3")
    implementation("io.ktor:ktor-client-content-negotiation:2.2.3")
    implementation("io.ktor:ktor-client-logging:2.2.3")
    implementation("io.ktor:ktor-client-gson:2.2.3")
    implementation("io.ktor:ktor-serialization-gson:2.2.3")

    //implementation ("androidx.compose.material:material:1.2.0-alpha02")

    //moshi
    implementation ("com.squareup.moshi:moshi-kotlin:1.13.0")

    implementation( "com.squareup.retrofit2:converter-moshi:2.9.0")

    implementation(platform("com.squareup.okhttp3:okhttp-bom:4.10.0"))

    // define any required OkHttp artifacts without version
    implementation("com.squareup.okhttp3:okhttp")
    implementation("com.squareup.okhttp3:logging-interceptor")

    implementation ("androidx.core:core-ktx:1.12.0")

    implementation("com.google.accompanist:accompanist-systemuicontroller:0.31.0-alpha")




    implementation("androidx.lifecycle:lifecycle-runtime-ktx:2.6.2")
    implementation("androidx.lifecycle:lifecycle-viewmodel-compose:2.6.2")
    implementation("androidx.work:work-runtime-ktx:2.8.1")
    implementation("androidx.datastore:datastore-preferences:1.0.0")


    implementation( "com.google.accompanist:accompanist-flowlayout:0.30.1")

    implementation("org.kohsuke:github-api:1.313")
    implementation("com.github.PhilJay:MPAndroidChart:v3.1.0")



    implementation("com.github.skydoves:colorpicker-compose:1.1.2")


}