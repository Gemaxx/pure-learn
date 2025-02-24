# **PureLearn Development Workflow**

## **1. INPUT: Requirements & Resources**

### **Sources of Input**

-  [**Product backlog** > **Sprint Backloag** > **User Stories** ](https://shaedu-my.sharepoint.com/:x:/g/personal/322223887_sha_edu_eg/EXpawZtbkkNEnLTxyfj3mygBFqBjSf25JH3_d2dJOZfWcQ?e=3eDieX)
- **[MindMap](../docs/Mindmap/PURR-LEARN.vmind)**
- **Additional Inputs:**
  - [Team Brainstorming Meetings](https://discord.com/channels/1299649170965135360/1304127482215268453)
  - [Competitor Analysis from [2. prompt sheet] ](https://shaedu-my.sharepoint.com/:x:/g/personal/322223887_sha_edu_eg/EXpawZtbkkNEnLTxyfj3mygBFqBjSf25JH3_d2dJOZfWcQ?e=3eDieX)
  - [AI Insights](https://chatgpt.com/)

## **2. PROCESS: Development Breakdown**

### **High-Level Planning**

1. [Identify Major Themes → Epics → Component Groups](https://shaedu-my.sharepoint.com/:x:/g/personal/322223887_sha_edu_eg/EXpawZtbkkNEnLTxyfj3mygBFqBjSf25JH3_d2dJOZfWcQ?e=3eDieX)
2. [Conduct Sprint Planning Meeting](https://discord.com/channels/1299649170965135360/1304127482215268453)

### **Extract Key Elements**

- **Database (DB)**

  - Define Entities, Relationships, and Attributes using inputs
  - Use [Database Build](https://database.build/db/pg4i6qjrd0fx29fm) for structure analysis & assistant.

- **Backend (ASP.NET Web API 8.0)**

  - Define API Endpoints & DTOs for each entity 

- **UI/UX Design**
  
  - Create and iterate wireframes
  - Develop high-fidelity prototypes
  - Define design system (Typography, Color Palette, Components)
  - **UI Design Reference**: 
    - [Mobil UI Design Prototype](https://www.figma.com/proto/zSX1hrAACeHMjNBHVj7E5Q/Pure-Learn-Mobile-UI?page-id=0%3A1&node-id=31-17&p=f&viewport=189%2C43%2C0.34&t=PgKHtGcTvfo4QMB4-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=31%3A17)
    - [Web UI Design (Not-Started)](https://www.figma.com/proto/zSX1hrAACeHMjNBHVj7E5Q/Pure-Learn-Mobile-UI?node-id=34-22&t=7utWEtpwKHrcuHhh-1&starting-point-node-id=34%3A22)
  
- **Frontend Development (Next.js, TailwindCSS, ShadCN UI)**

  - Identify Required Components & Pages
  - Develop Components & Pages
  - Implement Views:
    - **Task List, Kanban Board, Eisenhower Matrix, Time-Task View**

- **Frontend (Android)**  

  - **Jetpack Compose** – A modern UI toolkit for building native Android UI declaratively.  
  - **Dagger Hilt** – A dependency injection framework for efficient dependency management.  
  - **Coroutines & Flow**  
    - **Coroutines** – Handles asynchronous operations efficiently.  
    - **StateFlow & SharedFlow** – Ensures reactive UI updates and real-time data flow.  

  - **Architecture & Design Patterns**  
    - **MVVM (Model-View-ViewModel)** – Enhances separation of concerns for better maintainability.  

  - **Networking**  
    - **Retrofit & Ktor**  
      - **Retrofit** – Manages API requests with Moshi for JSON serialization/deserialization.  
      - **Ktor** – A lightweight HTTP client used for network requests and WebSockets.  


- **AI Development**

  - Implement AI-driven learning recommendations, task automation, and optimization

## **3. OUTPUT: Analysis & Specification**

### **Database (Relational)**

- **Entities** (Attributes, Relationships)
- **ERD Logical Schema**: [ERD on dbdiagram.io](https://dbdiagram.io/d/Pure-learn-6755b24ee9daa85aca085b40)

### **Backend (ASP.NET Web API 8.0)**

- API Endpoints & DTOs
- **C4 Model - Component Level**: [C4 Model on GitHub](https://github.com/Gemaxx/pure-learn/tree/main/C4%20Model)

### **Frontend Development (Next.js, TailwindCSS, ShadCN UI)**

- **Component Breakdown**: [C4 Model - SPA & Mobile](https://github.com/Gemaxx/pure-learn/tree/main/C4%20Model)

## **4. DEVELOPMENT**

### **Database (SQL Server - Azure SQL)**

- **Physical Schema**
- **Tools**: [Database Build](https://database.build/db/pg4i6qjrd0fx29fm), SSMS

### **Backend (ASP.NET Web API 8.0)**

1. Convert tables from the database to [Models](Models) and set up [DbContext](Data/PureLearnDbContext.cs) in the [Data Directory](Data) using scaffolding:
   ```sh
   dotnet ef dbcontext scaffold "Name=DefaultConnection" Microsoft.EntityFrameworkCore.SqlServer -o Models
   ```
2. Define [DTOs](Dtos) for different endpoints as needed, for example:
   - **Read DTO Requests**
     - `EntityDto` (for list view)
     - `EntityDetailsDto` (for details view of a specific entity)
   - **Write DTO Requests**
     - `CreateEntityRequestDto`
     - `PatchEntityRequestDto`
3. Configure Manual [Mapper](Mapper)
4. Create Repository [Interfaces](Interfaces)
5. Create QueryObject in [Helpers Dir](Helpers) for filtering and sorting operations for entities.
6. Implement [Repository](Repos)
7. Create [Controllers](Controllers)
8. Register Dependencies in [Program.cs file](Program.cs)
9. 🎉 🚀 We are Done, Happy Coding!!! ✨

### **Frontend Development (Next.js, TailwindCSS, ShadCN UI)**

- Develop Components & Pages
- Implement Views:
  - **Task List, Kanban Board, Eisenhower Matrix, Time-Task View**
- Utilize AI for UI optimization

### **UI/UX Design**

- Wireframing & Prototyping
- High-Fidelity Design in Figma
- User Testing & Iteration
- Design System Implementation

## **5. DEPLOYMENT**

- **Database:** Azure SQL ✅
- **Backend:** ASP.NET Web API 8.0
- **Frontend:** Next.js, TailwindCSS, ShadCN UI
- **AI Integration**





## **6. CORE ENTITIES & FUNCTIONS**

### **Learner**

**Attributes:**

- ID, Name, Email, PasswordHash, ProfilePicture, Bio, CreatedAt, UpdatedAt, LastLogin

### **Goal Management**

**Category ✅**

- Attributes: Title, Color, Description, CreatedAt, UpdatedAt, ParentCategoryID (nullable)
- Relationships:
  - Learner → Category (1:M, Mandatory)
  - Category → Category (1:M, Optional)
- Views: Default & User-Defined Categories
- Functions: CRUD Operations

**Goal ✅**

- Attributes: Title, Description, Motivation, Status, CompletionDate, CreatedAt, UpdatedAt
- Relationships:
  - Learner → Goal (1:M, Mandatory)
  - Category → Goal (1:M, Optional)

**Subgoal ✅**

- Attributes: Title, Description, Status, CreatedAt, UpdatedAt
- Relationships: Goal → Subgoal (1:M, Mandatory)

### **Task Management**

**Task ✅**

- Attributes:
  - Title, Type, KanbanStatusID, EisenhowerStatus, DueDate, EstimatedTime, TimeSpent, CreatedAt, UpdatedAt
  - Foreign Keys: LearnerID, CategoryID, GoalID, SubgoalID, ResourceID
- **Views:** Kanban Board, Eisenhower Matrix, Time-Task View
- **Components:** TaskItem.jsx, ComponentList.jsx
- **Functions:** CRUD, Repeat Tasks ✅, Max Kanban Tasks ✅, Set Reminders (Planned)

**Subtask ✅**

- Attributes: Title, Status, CreatedAt, UpdatedAt
- Relationships: Task → Subtask (1:M, Mandatory)

**Resource ✅**

- Attributes: Title, TypeID, UnitTypeID, TotalUnits, Progress, Percentage, Link, CreatedAt, UpdatedAt
- Relationships:
  - Learner → Resources (1:M, Mandatory)
  - Category, Goal, Subgoal → Resource (1:M, Optional)
- Additional Tables: ResourceType, UnitType

**Note ✅**

- Attributes: Title, Body, CreatedAt, UpdatedAt
- Relationships:
  - Learner → Note (1:M, Mandatory)
  - Category, Goal, Subgoal, Task → Note (1:M, Optional)
- Views: Uncategorized Notes, Task-Note View

## **7. TIME MANAGEMENT (TO-DO)**

- Self-Reflection Prompts
- Time Tracking Features

## **8. AUTOMATION & AI**

- AI-assisted insights & optimizations
- Task prioritization & learning recommendations

## **CONCLUSION**

🚀 PureLearn’s development is structured for efficiency, scalability, and learning-centric functionality. Let’s build an impactful self-learning platform!

****