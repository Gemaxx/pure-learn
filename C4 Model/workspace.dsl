workspace "Pure-Learn App" "This workspace represents the architecture of the Pure-Learn App, a self-learning management system. It includes both mobile and web front-end interfaces, a back-end API, and an AI Container for advanced personalized features." {

    model {
        # Main Entities

        # Persons
        learner = person "Learner" "A person who uses the Pure-Learn App to manage and track their self-learning goals." "User"

        # Our System
        pureLearnApp = softwareSystem "Pure-Learn App" "A self-learning management system that allows users to set, track, and achieve their self-learning goals." "Software System" {
            
            # Front-end
            spa = container "Single Page Application" "Provides an interface for learners to interact with their learning goals." "React" "Web Browser" {
                 login = component "Login" "Any Describtion""React Components"
            }

            mobileApp = container "Mobile App" "Allows learners to access their learning goals on mobile devices." "Jetpack Compose" "Mobile App" {
                
            }

            # Back-end
            apiApp = container "API App" "Serves data to the front-end applications, built using .NET, and connects to the SQL database for data persistence." ".NET" {
            }

            sqlDatabase = container "SQL Database" "Stores user data, learning goals, and progress tracking information." "SQL Server" "Database" {
            }

            # AI Features
            aiContainer = container "AI Container" "Provides personalized learning recommendations, intelligent progress tracking, and learning insights powered by machine learning models." "Python + TensorFlow/PyTorch" "Server-Side Service" {
            }
        }

        # External Systems
        firebaseAuthentication = softwareSystem "Firebase Authentication" "A service for authenticating users, integrated into the app for secure login." "Existing System"
        firebaseCloudMessaging = softwareSystem "Firebase Cloud Messaging (FCM)" "A service used to send push notifications to the app, keeping users updated on their learning progress and reminders." "Existing System"

        # Relationships - Context level
        learner -> pureLearnApp "Uses"
        pureLearnApp -> firebaseAuthentication "Uses for user authentication"
        pureLearnApp -> firebaseCloudMessaging "Uses for push notifications"

        # Relationships - Container level
        learner -> mobileApp "Interacts with via Mobile App" "Interacts"
        learner -> spa "Interacts with via Web Browser" "Interacts"
        mobileApp -> apiApp "Makes API calls to" "JSON/HTTPS"
        spa -> apiApp "Makes API calls to" "JSON/HTTPS"
        apiApp -> sqlDatabase "Reads from and writes to" "SQL/TCP"
        apiApp -> aiContainer "Calls for AI-driven recommendations and tracking" "gRPC/JSON"

        # Internal Container relationships
        aiContainer -> sqlDatabase "Reads training data from" "SQL/TCP"
        aiContainer -> apiApp "Sends learning insights and recommendations to" "gRPC/JSON"
        apiApp -> firebaseAuthentication "Uses for authentication" "JSON/HTTPS"
        apiApp -> firebaseCloudMessaging "Uses to send notifications" "JSON/HTTPS"
        apiApp -> mobileApp "Sends notifications via" "JSON/HTTPS"
        apiApp -> spa "Sends notifications via" "JSON/HTTPS"
    }

    views {
        # Define System Context View
        systemContext "pureLearnApp" "System-Context-Diagram" {
            include *
            description "The system context diagram showing how the learner interacts with the Pure-Learn App and the external systems like Firebase Authentication and Cloud Messaging."
        }

        # Define Container View
        container "pureLearnApp" "Container-Diagram" {
            include *
            description "The container diagram showing the different components of the Pure-Learn App, including the front-end web and mobile apps, API backend, SQL Database, and AI Container for advanced features."
        }
      

        styles {
            element "Person" {
                background "#FFFAF0"
                color "#333333"
                shape "person"
            }
            element "Existing System" {
                background "#999999"
                color "#ffffff"
            }
            element "Software System" {
                background "#FFFFFF"
                color "#000000"
            }
            element "Container" {
                background "#E0FFFF"
                color "#00008B"
                shape "box"
            }
            element "Web Browser" {
                shape WebBrowser
            }
            element "Mobile App" {
                shape MobileDeviceLandscape
            }
            element "Database" {
                shape Cylinder
            }
            element "Server-Side Service" {
                background "#FFD700"
                color "#000000"
            }
        }
    }
}
