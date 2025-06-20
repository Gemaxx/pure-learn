## **CHAPTER 4: System Design**

### **4.1. Introduction**
The purpose of this chapter is to provide a comprehensive overview of the system design for PureLearn. It outlines the strategic approach taken to ensure the system is robust, scalable, and user-focused. The chapter begins with the design objectives and introduces the overall architecture, leveraging the C4 Model for clear, code-driven visualization of system structure and interactions. Key models and tools featured include Structurizr DSL for architectural diagrams, dbdiagram.io for database entity-relationship modeling, and Figma for UI/UX design and prototyping. Together, these tools and models guide the design process, ensuring clarity, maintainability, and alignment with user needs.

---

### **4.2. Design Objectives**

The design objectives for PureLearn are centered on creating a platform that is robust, scalable, and user-focused. The following objectives guided all architectural and design decisions:

* **Alignment with Product Vision and User Needs:**  
  The system design is closely aligned with the overall product vision, ensuring that every architectural choice directly supports the core needs and goals of learners, educators, and administrators using PureLearn.

* **Scalability, Modularity, and Maintainability:**  
  The architecture is structured to support future growth in both user base and features. By emphasizing modularity—through clear separation of concerns and well-defined interfaces—the system is easier to maintain, extend, and test. This modular approach also allows for independent development and deployment of different system components.

* **User-Centered Design Principles:**  
  User experience is prioritized at every stage of the design process. The architecture and interface are crafted to be intuitive and accessible, supporting efficient workflows and a positive learning experience. Feedback loops and usability testing are integrated to ensure the platform remains responsive to user needs.

These objectives ensure that PureLearn’s system design not only meets current requirements but is also adaptable for future enhancements and real-
---
### **4.3. System Architecture**

The system architecture of PureLearn is designed for clarity, scalability, and maintainability. This section presents a high-level view of the system, explains the rationale for using the C4 Model over traditional UML diagrams, and describes our modeling-as-code approach using Structurizr DSL. It also illustrates the main system components and their interactions.

---

#### **C4 Model vs. UML Diagrams**

| Aspect                | UML Diagrams                                                                 | C4 Model                                                                                  |
|-----------------------|------------------------------------------------------------------------------|------------------------------------------------------------------------------------------|
| **Approach**          | Traditional, visual modeling with various diagram types                      | Code-driven, hierarchical modeling focused on four abstraction levels                     |
| **Complexity**        | Can become overly complex and hard to maintain                               | Designed for clarity and simplicity at each level                                         |
| **Accessibility**     | Less accessible for developers and non-technical stakeholders                | Developer-friendly and easier for all stakeholders to understand                          |
| **Abstraction Levels**| Multiple diagram types, sometimes overlapping or unclear                     | Four clear levels: Context, Container, Component, and Code                                |
| **Communication**     | May obscure the big picture or detailed design                               | Balances high-level overview with detailed design, improving communication                |
| **Version Control**   | Typically managed as images or binary files                                  | Supports modeling-as-code, enabling version control and automation                        |

**Why C4 Model?**
- **Clarity:** Each diagram serves a specific purpose and audience, reducing ambiguity.
- **Scalability:** The hierarchical structure allows zooming in and out as needed.
- **Developer Alignment:** The modeling process is closer to how developers think about systems.
- **Code-Driven:** Supports modeling-as-code, enabling version control and automation.

---

#### **Modeling-as-Code with Structurizr DSL**

To ensure our architecture diagrams are always up-to-date and version-controlled, we use **Structurizr DSL** for modeling-as-code. This approach allows us to define architectural views in plain text files, which can be rendered into diagrams automatically.

**Example from our codebase (`c4-model-architecture/workspace.dsl`):**
```dsl
workspace "Pure-Learn App" "This workspace represents the architecture of the Pure-Learn App, a self-learning management system. It includes both mobile and web front-end interfaces, a back-end API, and an AI Container for advanced personalized features." {

    model {
        # Persons
        learner = person "Learner" "A person who uses the Pure-Learn App to manage and track their self-learning goals." "User"

        # System
        pureLearnApp = softwareSystem "Pure-Learn App" "A self-learning management system that allows users to set, track, and achieve their self-learning goals." "Software System" {
            
            # Front-end
            spa = container "Single Page Application" "Provides an interface for learners to interact with their learning goals." "React" "Web Browser"
            mobileApp = container "Mobile App" "Allows learners to access their learning goals on mobile devices." "Jetpack Compose" "Mobile App"

            # Back-end
            apiApp = container "API App" "Serves data to the front-end applications, built using .NET, and connects to the SQL database for data persistence." ".NET"
            sqlDatabase = container "SQL Database" "Stores user data, learning goals, and progress tracking information." "SQL Server" "Database"
            aiContainer = container "AI Container" "Provides personalized learning recommendations, intelligent progress tracking, and learning insights powered by machine learning models." "Python + TensorFlow/PyTorch" "Server-Side Service"
        }

        # External Systems
        firebaseAuthentication = softwareSystem "Firebase Authentication" "A service for authenticating users, integrated into the app for secure login." "Existing System"
        firebaseCloudMessaging = softwareSystem "Firebase Cloud Messaging (FCM)" "A service used to send push notifications to the app, keeping users updated on their learning progress and reminders." "Existing System"

        # Relationships
        learner -> pureLearnApp "Uses"
        pureLearnApp -> firebaseAuthentication "Uses for user authentication"
        pureLearnApp -> firebaseCloudMessaging "Uses for push notifications"
        learner -> mobileApp "Interacts with via Mobile App"
        learner -> spa "Interacts with via Web Browser"
        mobileApp -> apiApp "Makes API calls to" "JSON/HTTPS"
        spa -> apiApp "Makes API calls to" "JSON/HTTPS"
        apiApp -> sqlDatabase "Reads from and writes to" "SQL/TCP"
        apiApp -> aiContainer "Calls for AI-driven recommendations and tracking" "gRPC/JSON"
        aiContainer -> sqlDatabase "Reads training data from" "SQL/TCP"
        aiContainer -> apiApp "Sends learning insights and recommendations to" "gRPC/JSON"
        apiApp -> firebaseAuthentication "Uses for authentication" "JSON/HTTPS"
        apiApp -> firebaseCloudMessaging "Uses to send notifications" "JSON/HTTPS"
        apiApp -> mobileApp "Sends notifications via" "JSON/HTTPS"
    }

    views {
        # System Context View
        systemContext "pureLearnApp" "System-Context-Diagram" {
            include *
            description "The system context diagram showing how the learner interacts with the Pure-Learn App and the external systems like Firebase Authentication and Cloud Messaging."
        }

        # Container View
        container "pureLearnApp" "Container-Diagram" {
            include *
            description "The container diagram showing the different components of the Pure-Learn App, including the front-end web and mobile apps, API backend, SQL Database, and AI Container for advanced features."
        }
    }
}
```
*You can insert the rendered System Context Diagram and Container Diagram here for visual reference.*

---

#### **C4 Level 1: Context Diagram**

The **Context Diagram** illustrates the PureLearn system’s boundaries and its interactions with external actors and systems.  
**[Insert System Context Diagram Figure Here]**

- **Learner:** Interacts with PureLearn via web (SPA) or mobile app.
- **External Systems:** Firebase Authentication (for secure login) and Firebase Cloud Messaging (for notifications).

---

#### **C4 Level 2: Container Diagram**

The **Container Diagram** details the internal structure of PureLearn, showing the main containers:
**[Insert Container Diagram Figure Here]**

- **Frontend:** Next.js Single Page Application (SPA) for web, Jetpack Compose Mobile App for mobile.
- **Backend:** ASP.NET Core API serving both frontend clients.
- **Database:** Azure SQL for persistent storage.
- **AI Container:** Python-based service for personalized recommendations and analytics.

---

#### **Component Interactions**

- **Frontend (Next.js SPA & Mobile App):**  
  Users interact with the system through responsive web and mobile interfaces.
- **Backend (ASP.NET Core API):**  
  Handles business logic, data processing, and serves as the main integration point for frontend, database, and AI services.
- **Database (Azure SQL):**  
  Stores all persistent data, including users, goals, progress, and learning resources.
- **AI Container:**  
  Provides advanced features like personalized recommendations and progress tracking.

---

This architecture, modeled and visualized using Structurizr DSL, ensures that PureLearn is both robust and adaptable, supporting current needs and future growth.

---

### **4.4. Component-Level Design**

At the component level (C4 Level 3), we detail the internal structure of both the backend and frontend, showing how responsibilities are separated and how data flows through the system. This approach ensures maintainability, testability, and clear ownership of logic.

---

#### **Backend Components (API Folder)**

The backend is structured around the following key components:

- **Controllers:** Handle HTTP requests, validate input, and coordinate responses.
- **DTOs (Data Transfer Objects):** Define the shape of data exchanged between client and server.
- **Services:** (If present) Contain business logic and orchestrate repository calls.
- **Repositories:** Encapsulate data access logic, interacting with the database via Entity Framework Core.
- **Mappers:** Convert between database models and DTOs.

**Example: Getting List of Goals (Goals Workflow)**

The following sequence illustrates how a request to get a list of goals flows through the backend:

1. **Client** (SPA or Mobile App) sends an HTTP GET request to `/api/learners/{learnerId}/goals`.
2. **GoalsController** receives the request, validates input, and constructs a `GoalQueryObject` from query parameters.
3. **GoalRepository** is called to fetch goals, applying filters and pagination.
4. **GoalRepository** queries the database using `PureLearnDbContext` and retrieves `Goal` entities.
5. **GoalMapper** converts `Goal` entities to `GoalDto` objects.
6. **GoalsController** returns a list of `GoalDto` objects as a JSON response to the client.

**Component Diagram (Structurizr DSL Example):**
```dsl
component "apiApp" "Component-Diagram" {
    include goalsComponent
    include goalController
    include goalService
    include goalRepository
    include goalMapper
    include goalDto
    include sqlDatabase

    description "Component-level view of how the SPA’s Goals UI requests the list of goals and how it flows through the API into the SQL Database and back."
}
```
*Insert the rendered Component Diagram here for visual reference.*

---

#### **Frontend Components**

The frontend (SPA) is organized into:

- **Pages:** Route-based components (e.g., `/goals`, `/dashboard`).
- **Shared Components:** Reusable UI elements (e.g., GoalCard, Navbar, Sidebar).
- **UI Layout Structure:** Defines the overall layout, navigation, and theming.

**Example: Goals UI**
- **Goals Page:** Fetches and displays the list of goals using the API.
- **GoalCard Component:** Renders individual goal details.
- **State Management:** Handles loading, error, and data states for a responsive user experience.

---

#### **Visual Component Diagrams**

- **Backend:** Shows the flow from Controller → Repository → DbContext → Mapper → DTO.
- **Frontend:** Shows the composition of pages and shared components, and how they interact with the backend API.

**[Insert Backend and Frontend Component Diagrams Here]**

---

This component-level design ensures that each part of the system has a clear responsibility, making the codebase easier to understand, maintain, and extend.

---

### **4.5. Database Design**

The database design for PureLearn is foundational to ensuring data integrity, scalability, and efficient access patterns. This section presents the Entity Relationship Diagram (ERD), describes the main entities and their relationships, and justifies the choice of Azure SQL as the database platform.

---

#### **Entity Relationship Diagram (ERD)**

The ERD was created using **dbdiagram.io** and visually represents all major entities, their attributes, and the relationships between them.  
**[Insert ERD diagram image or link here]**

---
This database schema models a productivity and learning platform, focusing on how users (learners) organize and track their goals, tasks, resources, and notes.

**Logic and Semantics:**

- **Learner** is the core user entity. All other main entities (goals, categories, etc.) are linked to a learner, ensuring data is scoped per user.
- **Category** enables hierarchical organization (e.g., categories and subcategories) for goals, tasks, and notes, supporting flexible grouping.
- **Goal** represents a major objective. Each goal is assigned to a category and can have related tasks, notes, and learning resources.
- **LearningResourceType** and **LearningResource** allow tracking of different types of study materials or resources, with progress monitoring.
- **KanbanStatus** and TaskType support workflow management and task categorization, enabling visual task boards and custom task types.
- **Task** is an actionable item under a goal, supporting advanced features like Kanban workflow, Eisenhower matrix, time tracking, and recurrence.
- **Subtask** allows breaking down tasks into smaller steps, supporting granular progress tracking.
- **Note** provides a way to attach detailed information or reflections to goals, tasks, or subgoals.

**Relationships:**  
- Most entities use foreign keys to establish ownership and context (e.g., tasks belong to goals, subtasks belong to tasks).
- The schema supports soft deletion (`IsDeleted`, `DeletedAt`) for safe data recovery.
- Referential integrity is enforced, ensuring that related records are consistent and valid.

**Gotchas:**  
- Some foreign keys are commented out, possibly for simplification. 
  
This design supports flexible goal management, detailed tracking, and user-centric organization.

---
#### **Diagramming-as-Code (DBML Brief)**

Diagramming-as-code is a practice where system and database diagrams are defined using code, often through a Domain-Specific Modeling Language such as **DBML** (Database Markup Language). Instead of creating diagrams manually, teams write DBML code to describe tables, fields, relationships, and constraints. This approach enables version control, automation, and consistency—diagrams and documentation can be regenerated as the database evolves, ensuring accuracy. Tools like dbdiagram.io use DBML to make ERDs reproducible, reviewable, and easily shared across development teams.

```sql
// Simplified DB PureLearn
 // Learner
    Table Learner {
        id BIGINT [primary key, unique, increment]
        Name NVARCHAR(255) [not null]
        Email NVARCHAR(255) [not null, unique]
        PasswordHash NVARCHAR(255) [not null]
        ProfilePicture NVARCHAR(MAX)
        Bio NVARCHAR(MAX)
        IsDeleted BIT [default: 0]
        CreatedAt DATETIME [default: 'GETDATE()']
        UpdatedAt DATETIME [default: 'GETDATE()']
        LastLogin DATETIME
        DeletedAt DATETIME
    }

// Goal Management
    Table Category {
        id BIGINT [primary key, unique, increment]
        // ParentCategoryID BIGINT [ref: > Category.id]
        Title NVARCHAR(255) [not null]
        Color NVARCHAR(50) [not null]
        Description NVARCHAR(MAX)
        CreatedAt DATETIME [default: 'GETDATE()']
        UpdatedAt DATETIME [default: 'GETDATE()']
        LearnerID BIGINT [not null, ref: > Learner.id]
        DeletedAt DATETIME
        IsDeleted BIT [default: 0]
    }

    Table Goal {
        // LearnerID BIGINT [not null, ref: > Learner.id]
        CategoryID BIGINT [not null, ref: > Category.id]
        id BIGINT [primary key, unique, increment]
        Title NVARCHAR(255) [not null]
        Description NVARCHAR(MAX) [not null]
        Motivation NVARCHAR(MAX) [not null]
        Term NVARCHAR(50) [not null, note: "CHECK (Term IN ('Long-Term', 'Medium-Term', 'Short-Term'))"]
        Status NVARCHAR(50) [not null, note: "CHECK (Status IN ('Not-Started', 'In-Progress', 'On-Hold', 'Done', 'Canceled'))"]
        CompletionDate DATE
        CreatedAt DATETIME [default: 'GETDATE()']
        UpdatedAt DATETIME [default: 'GETDATE()']
        DeletedAt DATETIME
    }
    Table LearningResourceType {
        LearnerID BIGINT [not null, ref: > Learner.id]
        id BIGINT [primary key, unique, increment]
        Name NVARCHAR(255) [not null, unique]
        UnitType NVARCHAR(255) [not null, unique]
        DeletedAt DATETIME
        IsDeleted BIT [default: 0]
    }

    Table LearningResource {
        GoalID BIGINT [not null, ref: > Goal.id]
        TypeID BIGINT [not null, ref: > LearningResourceType.id]
        id BIGINT [primary key, unique, increment]
        Title NVARCHAR(255) [not null]
        TotalUnits INT [not null, note: "CHECK (TotalUnits > 0)"]
        Progress INT [not null, note: "CHECK (Progress >= 0 AND Progress <= TotalUnits)"]
        Status NVARCHAR(50) [not null, note: "CHECK (Status IN ('Not-Started', 'In-Progress', 'On-Hold', 'Done', 'Canceled'))"]
        Link NVARCHAR(MAX)
        IsDeleted BIT [default: 0]
        CreatedAt DATETIME [default: 'GETDATE()']
        UpdatedAt DATETIME [default: 'GETDATE()']
        // LearnerID BIGINT [not null, ref: > Learner.id]
        // CategoryID BIGINT [ref: > Category.id]
        // SubgoalID BIGINT [ref: > Subgoal.id]
        DeletedAt DATETIME
    }

    Table KanbanStatus {
        // new update, learner remover   
        GoalID BIGINT [not null, ref: > Goal.id]
        id BIGINT [primary key, unique, increment]
        Name NVARCHAR(255) [not null, unique]
        MaxTasks INT [note: 'Maximum number of tasks allowed, must be positive']
        IsDeleted BIT [default: 0]
        DeletedAt DATETIME
    }

    Table TaskType {
        LearnerID BIGINT [not null, ref: > Learner.id]
        id BIGINT [primary key, unique, increment]
        Name NVARCHAR(255) [not null, unique]
        Description NVARCHAR(500)
        Icon VARBINARY(MAX)
        DeletedAt DATETIME
        IsDeleted BIT [default: 0]
    }

    Table Task {
        GoalID BIGINT [not null, ref: > Goal.id]
        KanbanStatusID BIGINT [not null, ref: > KanbanStatus.id]
        TypeID BIGINT [not null, ref: > TaskType.id]
        id BIGINT [primary key, unique, increment]
        Title NVARCHAR(255) [not null]
        EisenhowerStatus NVARCHAR(50) [not null, note: "CHECK (EisenhowerStatus IN ('Urgent & Important', 'Not Urgent but Important', 'Urgent but Not Important', 'Not Urgent & Not Important'))"]
        TimeTaskRelated NVARCHAR(50) [not null, note: "CHECK (TimeTaskRelated IN ('Today', 'Tomorrow', 'This Week', 'Someday'))"]
        DueDate DATE
        EstimatedTime TIME
        TimeSpent TIME
        RepeatFrequency NVARCHAR(50) [not null, default: 'None', note: "CHECK (RepeatFrequency IN ('None', 'Daily', 'Weekly', 'Monthly', 'Annually', 'Custom'))"]
        RepeatInterval INT
        RepeatOnSunday BIT [default: 0]
        RepeatOnMonday BIT [default: 0]
        RepeatOnTuesday BIT [default: 0]
        RepeatOnWednesday BIT [default: 0]
        RepeatOnThursday BIT [default: 0]
        RepeatOnFriday BIT [default: 0]
        RepeatOnSaturday BIT [default: 0]
        RepeatEnds NVARCHAR(50) [note: "CHECK (RepeatEnds IN ('Never', 'On Date', 'After Occurrences'))"]
        RepeatEndDate DATE
        RepeatEndOccurrences INT
        IsDeleted BIT [default: 0]
        DeletedAt DATETIME
        CreatedAt DATETIME [default: 'GETDATE()']
        UpdatedAt DATETIME [default: 'GETDATE()']
        // LearnerID BIGINT [not null, ref: > Learner.id]
        // CategoryID BIGINT [ref: > Category.id]
        // SubgoalID BIGINT [ref: > Subgoal.id]
        // LearningResourceID BIGINT [ref: > LearningResource.id]
    }

    Table Subtask {
        TaskID BIGINT [not null, ref: > Task.id]
        id BIGINT [primary key, unique, increment]
        Title NVARCHAR(255) [not null]
        Status NVARCHAR(50) [not null, note: "CHECK (Status IN ('Not Started', 'In Progress', 'Completed'))"]
        IsDeleted BIT [default: 0]
        DeletedAt DATETIME
        CreatedAt DATETIME [default: 'GETDATE()']
        UpdatedAt DATETIME [default: 'GETDATE()']
    }

    Table Note {
        GoalID BIGINT [not null, ref: > Goal.id]
        id BIGINT [primary key, unique, increment]
        Title NVARCHAR(255) [not null]
        Body NVARCHAR(MAX) [not null]
        CreatedAt DATETIME [default: 'GETDATE()']
        UpdatedAt DATETIME [default: 'GETDATE()']
        //CategoryID BIGINT [ref: > Category.id]
        // SubgoalID BIGINT [ref: > Subgoal.id]
        // TaskID BIGINT [ref: > Task.id]
        // LearnerID BIGINT [not null, ref: > Learner.id]
        DeletedAt DATETIME
        IsDeleted BIT [default: 0]
    }

```
---

#### **Why Azure SQL?**

- **Relational Model:**  
  Azure SQL provides a robust relational database engine, supporting complex queries, transactions, and data integrity constraints.
- **Cloud-Ready & Scalable:**  
  Azure SQL is fully managed, offers automatic scaling, high availability, and geo-replication, making it ideal for modern SaaS platforms.
- **Integration:**  
  Seamlessly integrates with .NET applications and supports advanced security, backup, and monitoring features.
- **Cost-Effective:**  
  Pay-as-you-go pricing and elastic pools allow for cost optimization as the platform grows.

---

#### **ERD Reference**

*The full ERD can be found at:*  
**[Link or embed: `/database/DBModeling/Simplified ERD Diagram.url`]**

---

This database design ensures PureLearn can efficiently store, retrieve, and manage all user and learning data, supporting both current requirements and future expansion.

---

### **4.6. UI/UX Design**

The UI/UX design of PureLearn is crafted to deliver a seamless, accessible, and engaging learning experience. This section outlines the design system, navigation structure, and the iterative process used to refine the interface.

---

#### **4.6.1. Design System**

A consistent design system was established in Figma to ensure visual harmony and usability across the platform. Key elements include:

- **a. Typography:**  
  The platform uses a clear, legible font hierarchy for headings, subheadings, body text, and captions, ensuring readability on all devices.

- **b. Colors:**  
  A carefully selected color palette supports brand identity, accessibility, and visual clarity. Primary, secondary, and accent colors are used for emphasis and feedback, with sufficient contrast for accessibility.

- **c. Layout Grid Systems:**  
  A responsive grid system is implemented, following a **mobile-first approach** to guarantee optimal usability on smartphones, tablets, and desktops.

- **d. Spacing:**  
  Consistent spacing tokens are defined for margins, paddings, and gaps, creating a balanced and uncluttered interface.

- **e. Radius:**  
  Standardized border-radius values are applied to cards, buttons, and input fields, contributing to a modern and friendly look.

- **f. Elevation:**  
  Shadows and elevation levels are used to distinguish interactive elements and create a sense of depth, improving visual hierarchy.

---

#### **4.6.2. Application Sitemap**

The sitemap defines the core navigation structure, ensuring users can easily access all major features:

- **Authentication (Login/Register)**
- **Home**
- **Categories**
  - **Goals**
    - **Tasks**
    - **Notes**
    - **Learning Resources**
    - **About**
- **Profile/Settings**

*Insert sitemap diagram here for visual reference.*

---

#### **4.6.3. Wireframes**

Wireframes were created in Figma to map out key user flows, such as:

- Onboarding and authentication
- Creating and managing goals
- Tracking tasks and progress
- Taking and organizing notes

---

#### **4.6.4. High-Fidelity Mockups & Figma Prototype**

High-fidelity mockups illustrate the final look and feel of the application, including color, typography, and interactive states.  
A clickable Figma prototype demonstrates navigation and user interactions.

*Insert mockup images and Figma prototype link here.*

---

#### **4.6.5. Usability, Accessibility, and Learning Experience**

- **Usability:**  
  The interface is intuitive, with clear calls to action, feedback, and error handling.
- **Accessibility:**  
  Color contrast, keyboard navigation, and ARIA labels are considered to support all users.
- **Learning Experience:**  
  The design supports focus, motivation, and progress tracking, making self-learning engaging and effective.

---

#### **4.6.6. Interactive Prototype Testing and Refinement**

Interactive prototypes were tested with users to gather feedback on navigation, clarity, and overall experience.  
Designs were iteratively refined based on this feedback, ensuring the final product meets user needs and expectations.

---

### **4.7. Design Tools Used**

A range of specialized tools were used throughout the design process to ensure clarity, consistency, and collaboration:

- **Structurizr DSL**  
  Used for creating C4 models and architecture diagrams. Structurizr DSL enables modeling-as-code, allowing the architecture to be version-controlled, easily updated, and rendered into clear, multi-level diagrams for both technical and non-technical stakeholders.

- **dbdiagram.io:**  
  Utilized for designing the Entity Relationship Diagram (ERD) and visualizing the database schema. dbdiagram.io supports collaborative editing, export of diagrams for documentation and implementation, and enables diagramming-as-code through DBML, ensuring version control and reproducibility of database models.

- **Figma:**  
  Employed for wireframing, high-fidelity UI mockups, and interactive prototyping. Figma’s collaborative features enabled real-time feedback and iterative refinement of the user interface, ensuring a user-centered
---

### **4.8. Summary**

The system design of PureLearn is grounded in several key decisions that shape both its technical architecture and user experience. The design embraces **minimalism**, **glassmorphism**, and a **monochromatic black-and-white palette** to create a modern, visually appealing, and distraction-free environment. This aesthetic is consistently applied across the platform, ensuring clarity and focus for learners.

From a technical perspective, the use of the **C4 Model** (via Structurizr DSL) and a modular, component-based architecture (leveraging the Shadcn Figma component library) ensures that the system is both **scalable** and **maintainable**. Each layer—frontend, backend, and database—is clearly separated, with reusable components and well-defined interfaces that facilitate independent development and testing.

The adoption of a robust design system in Figma, combined with modern UI/UX patterns, positions PureLearn for **future extension** and **real-world deployment**. The architecture supports easy integration of new features, adaptation to increased user demand, and seamless updates, making PureLearn ready for ongoing growth and innovation.
