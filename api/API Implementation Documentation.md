# Implementation Documentation: PureLearn API

## 1. Introduction

The PureLearn API is a backend service designed to support a learning and productivity platform. It provides a set of RESTful endpoints for managing learners, goals, tasks, notes, categories, kanban statuses, learning resources, and more. The API enables users to organize their learning journey, set and track goals, manage tasks and subtasks, take notes, and categorize their progress efficiently.

**Technologies Used:**

- **.NET 8**: The API is built using ASP.NET Core 8, leveraging modern C# features and best practices.
- **Entity Framework Core**: Used for database access and ORM, enabling code-first and database-first workflows.
- **SQL Server**: The primary database engine, with support for both Azure-hosted and local SQL Server Express instances.
- **Docker**: Containerization is supported for easy deployment and consistent development environments.
- **Swagger (OpenAPI)**: Integrated for interactive API documentation and testing.
- **Dependency Injection**: Used throughout the application for clean architecture and testability.

The API is structured to be modular and extensible, following best practices for maintainability and scalability.

## 2. Project Setup

This section describes the initial steps required to set up the PureLearn API project for development and deployment.

### 2.1 Repository Structure and Cloning

- The project source code is organized in a monorepo, with the backend API located in the `api` directory.
- To get started, clone the repository and navigate to the API folder:

    ```sh
    git clone https://github.com/your-repo/pure-learn.git
    cd pure-learn/api
    ```

### 2.2 Installing Dependencies

- Ensure you have the [.NET 8 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/8.0) installed.
- Restore all required NuGet packages:

    ```sh
    dotnet restore
    ```

### 2.3 Database Setup

- The API supports two database configurations:
  1. **Azure SQL Database** (hosted): No additional setup required if using the provided Azure connection string.
  2. **Local SQL Server Express**: 
     - Create a local database instance.
     - Update the connection string in `appsettings.json`.
     - Apply database migrations:

        ```sh
        dotnet ef database update
        ```

### 2.4 Running the Application

- Start the backend service in development mode:

    ```sh
    dotnet watch run
    ```

- The API will be available at [http://localhost:5115](http://localhost:5115).
- API documentation is accessible via Swagger UI at [http://localhost:5115/swagger](http://localhost:5115/swagger).

### 2.5 Docker Support

- The project includes a `docker-compose.yml` for containerized development and deployment.
- To build and run the API in Docker:

    ```sh
    docker-compose build
    docker-compose up
    ```

- The API and Swagger UI will be available at the same URLs as above.

---

## 3. Application Architecture

This section provides an overview of the structure and main components of the PureLearn API.

### 3.1 Solution Structure

The API project is organized into several key folders, each with a specific responsibility:

- **Controllers/**: Contains API controllers that handle HTTP requests and responses.
- **Models/**: Defines the data models representing database tables.
- **Dtos/**: Contains Data Transfer Objects used for communication between the API and clients.
- **Repos/**: Implements repository classes for data access logic.
- **Interfaces/**: Defines interfaces for repositories and services.
- **Data/**: Contains the Entity Framework DbContext and database migration files.
- **Helpers/**: Utility classes and helpers (e.g., for filtering, sorting).
- **Mapper/**: Contains mapping profiles for converting between models and DTOs.
- **Migrations/**: Stores Entity Framework migration files for database schema changes.

### 3.2 Main Components

- **Controllers**: Serve as entry points for API endpoints, orchestrating requests and responses.
- **Models**: Represent the core entities such as Learner, Goal, Note, Category, etc.
- **DTOs**: Used to shape data for input/output, ensuring only necessary information is exposed.
- **Repositories**: Encapsulate data access logic, providing a clean interface for querying and manipulating data.
- **DbContext**: Manages database connections and entity tracking using Entity Framework Core.
- **Dependency Injection**: All services and repositories are registered in `Program.cs` for loose coupling and testability.

### 3.3 Flow of a Typical Request

1. **Client** sends an HTTP request to an endpoint (e.g., create a new goal).
2. **Controller** receives the request and validates input.
3. **DTO** is used to transfer data from the client to the server.
4. **Repository** handles the business logic and interacts with the database via the DbContext.
5. **Model** represents the data structure in the database.
6. **Mapper** converts between DTOs and Models as needed.
7. **Controller** returns a response to the client.


## 4. Database Design & Models

This section describes the database structure and how models are represented in the PureLearn API.

### 4.1 Database Structure

- The API uses a relational database (SQL Server) to store all application data.
- The main entities include:
  - **Learner**: Represents a user of the platform.
  - **Goal**: Tracks learning or productivity goals set by learners.
  - **Task**: Sub-units of goals, representing actionable items.
  - **Note**: Allows learners to take and organize notes.
  - **Category**: Used to group goals, tasks, or notes.
  - **KanbanStatus**: Supports kanban-style task management.
  - **LearningResource**: Stores references to external learning materials.

- Relationships between tables are defined using foreign keys (e.g., each Goal is linked to a Learner).

### 4.2 Entity-Relationship Diagram (ERD)

- The ERD provides a visual overview of the tables and their relationships.
- You can find the simplified ERD in the [`database/DBModeling/Simplified ERD Diagram.url`](../database/DBModeling/Simplified%20ERD%20Diagram.url) file.

### 4.3 Model Generation

- Models are generated using Entity Framework Core scaffolding, which creates C# classes based on the database schema.
- Example command to scaffold models:

  ```sh
  dotnet ef dbcontext scaffold "Name=DefaultConnection" Microsoft.EntityFrameworkCore.SqlServer -o Models
  ```

- Each model class corresponds to a table in the database and includes properties for each column.

### 4.4 Example Model

Here is a simplified example of a model class for a `Learner`:

```csharp
// filepath: D:/pure-learn/api/Models/Learner.cs
public class Learner
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string? ProfilePicture { get; set; }
    public string? Bio { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? LastLogin { get; set; }
    public bool IsDeleted { get; set; }
    // Navigation properties for related entities
    public ICollection<Goal> Goals { get; set; }
}
```

### 4.5 Migrations

- Database schema changes are managed using Entity Framework migrations.
- Migration files are stored in the `Migrations/` directory.
- To apply migrations and update the database schema, use:

    ```sh
    dotnet ef database update
    ```

---
### Comparison: Code-First vs Database-First Approaches in Entity Framework

| Aspect                | Code-First Approach                                   | Database-First Approach                                 |
|-----------------------|-------------------------------------------------------|---------------------------------------------------------|
| **Definition**        | Define models/classes in code, then generate DB schema| Start with an existing database, generate models from it |
| **Workflow**          | 1. Create C# classes (models)<br>2. Configure DbContext<br>3. Use migrations to create/update DB | 1. Use EF tools to scaffold models from DB<br>2. Work with generated classes |
| **Best For**          | New projects where you control the schema             | Existing databases or when DB is managed externally      |
| **Schema Changes**    | Change models, then add migrations and update DB      | Change DB, then re-scaffold/update models               |
| **Migrations**        | Fully supported; easy to track and apply changes      | Limited; manual intervention may be needed              |
| **Customization**     | High; full control over model classes and relationships| May require manual edits after scaffolding              |
| **Tooling**           | Visual Studio, CLI (`dotnet ef migrations add/update`)| Visual Studio, CLI (`dotnet ef dbcontext scaffold`)     |
| **Reverse Engineering**| When you have code and don't have DB              | When you have DB and don't have Code                  |
| **Typical Command**   | `dotnet ef migrations add InitialCreate`<br>`dotnet ef database update` | `dotnet ef dbcontext scaffold "connection-string" Microsoft.EntityFrameworkCore.SqlServer -o Models` |

---

**Why We Chose Database-First for a New Project**

Although Code-First is commonly used for new projects, we chose the **Database-First** approach for these reasons:

- **Team Collaboration:** Our team includes members with strong SQL/database backgrounds, making it easier to design and agree on the schema visually and collaboratively before coding.
- **Clear Data Model:** Designing the database first ensures that the data structure is well-defined and normalized from the start, reducing the risk of future refactoring.
- **Rapid Prototyping:** We could quickly set up the database and use scaffolding to generate models, speeding up the initial development phase.
- **Consistency:** Using a single source of truth (the database) helps maintain consistency, especially when multiple services or tools may interact with the same data.
- **Future Integration:** If we need to integrate with other systems or migrate data, having a robust database schema up front is beneficial.

In summary, Database-First allowed us to leverage our team's strengths, ensure a solid foundation, and accelerate the early stages of development—even though the project was new.
## 5. API Endpoints: e.g. Goals endpoints

This section details the endpoints for managing goals in the PureLearn API, including filtering, sorting, and pagination using the `GoalQueryObject`.

---

### Get All Goals for a Learner

- **Endpoint:**  
  `GET /api/learners/{learnerId}/goals`

- **Purpose:**  
  Retrieve all goals for a learner, with support for filtering, sorting, and pagination.

- **Query Parameters (from `GoalQueryObject`):**
  - `Title` (string): Filter by goal title (contains).
  - `IsDeleted` (bool): Show deleted goals.
  - `CategoryId` (long): Filter by category.
  - `Status` (string): Filter by status (`Not-Started`, `In-Progress`, `On-Hold`, `Done`, `Canceled`).
  - `Term` (string): Filter by term (`Short-Term`, `Medium-Term`, `Long-Term`).
  - `SortBy` (string): Sort field (`CreatedAt`, `Title`, etc.).
  - `IsSortAscending` (bool): Sort ascending or descending.
  - `PageNumber` (int): Page number for pagination.
  - `PageSize` (int): Number of items per page.

- **Example Request:**
  ```
  GET /api/learners/1/goals?Status=In-Progress&CategoryId=2&SortBy=Title&IsSortAscending=false&PageNumber=1&PageSize=5
  ```

- **Example Response (`GoalDto`):**
    ```json
    [
      {
        "id": 12,
        "categoryId": 2,
        "title": "Learn ASP.NET Core",
        "term": "Short-Term",
        "status": "In-Progress"
      },
      {
        "id": 15,
        "categoryId": 2,
        "title": "Build Graduation Project",
        "term": "Long-Term",
        "status": "In-Progress"
      }
    ]
    ```

---

### Get a Specific Goal

- **Endpoint:**  
  `GET /api/learners/{learnerId}/goals/{goalId}`

- **Purpose:**  
  Retrieve detailed information about a single goal.

- **Example Response (`GoalDetailDto`):**
    ```json
    {
      "id": 12,
      "categoryId": 2,
      "title": "Learn ASP.NET Core",
      "description": "Complete the official Microsoft tutorial",
      "motivation": "To build modern web APIs",
      "term": "Short-Term",
      "status": "In-Progress",
      "createdAt": "2024-06-01T10:00:00Z",
      "updatedAt": "2024-06-10T09:30:00Z",
      "completionDate": null,
      "tasks": [],
      "learningResources": [],
      "notes": []
    }
    ```

---

### Create a Goal

- **Endpoint:**  
  `POST /api/learners/{learnerId}/goals`

- **Purpose:**  
  Add a new goal for a learner.

- **Request Body (`CreateGoalRequestDto`):**
    ```json
    {
      "categoryId": 2,
      "title": "Read Clean Code",
      "description": "Finish reading by end of June",
      "motivation": "Improve code quality",
      "term": "Short-Term",
      "status": "Not-Started"
    }
    ```

- **Example Response (`GoalDto`):**
    ```json
    {
      "id": 20,
      "categoryId": 2,
      "title": "Read Clean Code",
      "term": "Short-Term",
      "status": "Not-Started"
    }
    ```

---

### Update a Goal

#### Considerations: PATCH vs PUT

When designing the API for updating resources (such as goals), it’s important to choose the appropriate HTTP method. The two main options are **PATCH** and **PUT**.

##### PUT
- **Purpose:** Replaces the entire resource with the provided data.
- **Usage:** The client must send the complete representation of the resource, even if only one field changes.
- **Example:**  
  If a goal has 10 properties and you want to update just the status, you must send all 10 properties in the request body.

##### PATCH
- **Purpose:** Partially updates a resource; only the fields provided are changed.
- **Usage:** The client sends only the fields that need to be updated.
- **Example:**  
  To update just the status of a goal, you can send:
    ```json
    { "status": "Done" }
    ```

##### Why PATCH is Used in This API
- **Efficiency:** Only the changed fields are sent and processed, reducing payload size and risk of accidental data loss.
- **Flexibility:** Clients can update one or more fields without needing to know or send the entire resource.
- **Best Practice:** PATCH is recommended for partial updates, especially when resources have many properties or when frequent small updates are expected.

**In summary:**  
We use PATCH for updating goals and similar resources to allow partial, efficient, and safe updates, following RESTful

- **Endpoint:**  
  `PATCH /api/learners/{learnerId}/goals/{goalId}`

- **Purpose:**  
  Update goal details.

- **Request Body (`PatchGoalRequestDto`):**
    ```json
    {
      "status": "Done",
      "completionDate": "2024-06-20"
    }
    ```

- **Example Response (`GoalDetailDto`):**
    ```json
    {
      "id": 20,
      "categoryId": 2,
      "title": "Read Clean Code",
      "description": "Finish reading by end of June",
      "motivation": "Improve code quality",
      "term": "Short-Term",
      "status": "Done",
    }
    ```

---

### Soft Delete, Restore, and Hard Delete

- **Soft Delete:**  
  `DELETE /api/learners/{learnerId}/goals/{goalId}/soft-delete`  
  *Marks the goal as deleted (IsDeleted = true).*

- **Restore:**  
  `PATCH /api/learners/{learnerId}/goals/{goalId}/restore`  
  *Restores a soft-deleted goal (IsDeleted = false).*

- **Hard Delete:**  
  `DELETE /api/learners/{learnerId}/goals/{goalId}/hard-delete`  
  *Permanently removes the goal.*

---

**DTOs Used:**
- [`GoalDto`](Dtos/Goals/GoalDto.cs)
- [`GoalDetailDto`](Dtos/Goal/GoalDetailDto.cs)
- [`CreateGoalRequestDto`](Dtos/Goal/CreateGoalRequestDto.cs)
- [`PatchGoalRequestDto`](Dtos/Goal/PatchGoalRequestDto.cs)
- [`GoalQueryObject`](Helpers/GoalQueryObject.cs)

---
## 6. Data Transfer Objects (DTOs) 

### Purpose of DTOs

DTOs (Data Transfer Objects) are simple objects used to transfer data between the API and clients. They help:
- Control what data is exposed to the client (hiding sensitive/internal fields/ irrelevant Data).
- Validate incoming data for create/update operations.
- Shape responses for different views (summary vs. details).
- Decouple the API contract from the internal database models.

---

### Example: Task DTOs

#### 1. TaskDto (Summary View)
Used for listing tasks with essential information.

```csharp
// filepath: Dtos/Task/TaskDto.cs
public class TaskDto
{
    public long Id { get; set; }
    public string Title { get; set; } = null!;
    public bool? IsCompleted { get; set; } = false;  
    public long? GoalId { get; set; }
    public long? TypeId { get; set; }
    public long? KanbanStatusId { get; set; }
    public string EisenhowerStatus { get; set; } = null!;
}
```

#### 2. TaskDetailsDto (Detailed View)
Used for showing all details of a specific task.

```csharp
// filepath: Dtos/Task/TaskDetailsDto.cs
public class TaskDetailsDto
{
    public long Id { get; set; }
    public long? GoalId { get; set; }
    public string Title { get; set; } = "Untitled Task";
    public bool? IsCompleted { get; set; } = false;  
    public long? TypeId { get; set; }
    public long? KanbanStatusId { get; set; }
    public string EisenhowerStatus { get; set; } = "Urgent & Important";
    public DateTime? CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
    public DateTime? DeletedAt { get; set; }
    public bool IsDeleted { get; set; }
}
```

#### 3. CreateTaskRequestDto (For Creating Tasks)
Used for validating and receiving data when creating a new task.

```csharp
// filepath: Dtos/Task/CreateTaskRequestDto.cs
public class CreateTaskRequestDto
{
    [Required]
    [StringLength(100, MinimumLength = 1, ErrorMessage = "Title must be between 1 and 100 characters.")]
    public string Title { get; set; } = "Untitled Task";

    public long? GoalId { get; set; }
    public long TypeId { get; set; }
    public long KanbanStatusId { get; set; }

    [StringLength(50, ErrorMessage = "EisenhowerStatus cannot exceed 50 characters.")]
    [RegularExpression(
        "Not Urgent & Not Important|Urgent but Not Important|Not Urgent but Important|Urgent & Important",
        ErrorMessage = "Invalid EisenhowerStatus value."
    )]
    public string EisenhowerStatus { get; set; } = "Urgent & Important";
}
```

#### 4. PatchTaskRequestDto (For Updating Tasks)
Used for partial updates (PATCH), allowing clients to send only the fields they want to change.

```csharp
// filepath: Dtos/Task/PatchTaskRequestDto.cs
public class PatchTaskRequestDto
{
    public long? GoalId { get; set; }
    public long? KanbanStatusId { get; set; }
    public long? TypeId { get; set; }

    [StringLength(100, MinimumLength = 1, ErrorMessage = "Title must be between 1 and 100 characters.")]
    public string? Title { get; set; }
    public bool? IsCompleted { get; set; } 
}
```

**Summary:**  
DTOs are essential for clean, secure, and maintainable API design. They ensure that only the intended data is exchanged between the client and server, and they provide a clear contract for each operation.

## 7. Business Logic & Repositories

This section explains how business logic is separated from controllers using repositories, how repositories are structured and injected, and provides examples of repository methods.

---

### Repository Structure

- **Purpose:**  
  Repositories encapsulate all data access logic, providing a clean interface for querying and manipulating entities. This keeps controllers focused on handling HTTP requests and responses.

- **Location:**  
  Repository interfaces are defined in the `Interfaces/` directory, and their implementations are in the `Repos/` directory.

- **Example Interface (`IGoalRepository`):**
    ```csharp
    // filepath: Interfaces/IGoalRepository.cs
    public interface IGoalRepository
    {
        Task<IEnumerable<GoalDto>> GetGoalsAsync(long learnerId, GoalQueryObject queryObject);
        Task<GoalDetailDto?> GetGoalByIdAsync(long learnerId, long goalId);
        Task<GoalDto> CreateGoalAsync(long learnerId, CreateGoalRequestDto dto);
        Task<bool> PatchGoalAsync(long learnerId, long goalId, PatchGoalRequestDto dto);
        Task<bool> SoftDeleteGoalAsync(long learnerId, long goalId);
        Task<bool> RestoreGoalAsync(long learnerId, long goalId);
        Task<bool> HardDeleteGoalAsync(long learnerId, long goalId);
    }
    ```

- **Example Implementation (`GoalRepository`):**
    ```csharp
    // filepath: Repos/GoalRepository.cs
    public class GoalRepository : IGoalRepository
    {
        private readonly PureLearnDbContext _context;
        private readonly IMapper _mapper;

        public GoalRepository(PureLearnDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<IEnumerable<GoalDto>> GetGoalsAsync(long learnerId, GoalQueryObject queryObject)
        {
            var query = _context.Goals
                .Where(g => g.LearnerId == learnerId && g.IsDeleted == queryObject.IsDeleted);

            if (!string.IsNullOrEmpty(queryObject.Title))
                query = query.Where(g => g.Title.Contains(queryObject.Title));

            if (queryObject.CategoryId.HasValue)
                query = query.Where(g => g.CategoryId == queryObject.CategoryId);

            if (!string.IsNullOrEmpty(queryObject.Status))
                query = query.Where(g => g.Status == queryObject.Status);

            if (!string.IsNullOrEmpty(queryObject.Term))
                query = query.Where(g => g.Term == queryObject.Term);

            // Sorting
            if (!string.IsNullOrEmpty(queryObject.SortBy))
            {
                // Example: sort by CreatedAt or Title
                if (queryObject.SortBy == "Title")
                    query = queryObject.IsSortAscending ? query.OrderBy(g => g.Title) : query.OrderByDescending(g => g.Title);
                else
                    query = queryObject.IsSortAscending ? query.OrderBy(g => g.CreatedAt) : query.OrderByDescending(g => g.CreatedAt);
            }

            // Pagination
            query = query
                .Skip((queryObject.PageNumber - 1) * queryObject.PageSize)
                .Take(queryObject.PageSize);

            var goals = await query.ToListAsync();
            return _mapper.Map<IEnumerable<GoalDto>>(goals);
        }

        // Other methods (GetGoalByIdAsync, CreateGoalAsync, PatchGoalAsync, etc.) follow similar patterns.
    }
    ```

---

### Dependency Injection

- **Registration:**  
  Repositories are registered in `Program.cs` for dependency injection, allowing them to be injected into controllers and services.

    ```csharp
    // filepath: Program.cs
    builder.Services.AddScoped<IGoalRepository, GoalRepository>();
    ```

- **Usage in Controllers:**  
  The repository is injected via constructor injection.

    ```csharp
    // filepath: Controllers/GoalsController.cs
    public class GoalsController : ControllerBase
    {
        private readonly IGoalRepository _goalRepository;

        public GoalsController(IGoalRepository goalRepository)
        {
            _goalRepository = goalRepository;
        }

        // Controller actions call repository methods
    }
    ```

---

**Summary:**  
Repositories abstract the data access layer, promote code reuse, and make the application easier to test and maintain. Dependency injection ensures loose coupling between controllers and

## 8. Controllers

This section explains how controllers are structured in the PureLearn API and provides examples of typical controller actions.

---

### Controller Structure

- **Purpose:**  
  Controllers handle HTTP requests, validate input, call repository/business logic, and return appropriate HTTP responses.
- **Location:**  
  Controllers are located in the `Controllers/` directory.
- **Naming:**  
  Each main resource (e.g., Goal, Task, Note) has its own controller, typically named `{Resource}Controller` (e.g., `GoalsController`).

---

### Example: GoalsController

```csharp
// filepath: Controllers/GoalsController.cs
[ApiController]
[Route("api/learners/{learnerId}/goals")]
public class GoalsController : ControllerBase
{
    private readonly IGoalRepository _goalRepository;

    public GoalsController(IGoalRepository goalRepository)
    {
        _goalRepository = goalRepository;
    }

    // GET: api/learners/{learnerId}/goals
    [HttpGet]
    public async Task<IActionResult> GetGoals(long learnerId, [FromQuery] GoalQueryObject query)
    {
        var goals = await _goalRepository.GetGoalsAsync(learnerId, query);
        return Ok(goals);
    }

    // GET: api/learners/{learnerId}/goals/{goalId}
    [HttpGet("{goalId}")]
    public async Task<IActionResult> GetGoal(long learnerId, long goalId)
    {
        var goal = await _goalRepository.GetGoalByIdAsync(learnerId, goalId);
        if (goal == null)
            return NotFound();
        return Ok(goal);
    }

    // POST: api/learners/{learnerId}/goals
    [HttpPost]
    public async Task<IActionResult> CreateGoal(long learnerId, [FromBody] CreateGoalRequestDto dto)
    {
        var createdGoal = await _goalRepository.CreateGoalAsync(learnerId, dto);
        return CreatedAtAction(nameof(GetGoal), new { learnerId, goalId = createdGoal.Id }, createdGoal);
    }

    // PATCH: api/learners/{learnerId}/goals/{goalId}
    [HttpPatch("{goalId}")]
    public async Task<IActionResult> PatchGoal(long learnerId, long goalId, [FromBody] PatchGoalRequestDto dto)
    {
        var updated = await _goalRepository.PatchGoalAsync(learnerId, goalId, dto);
        if (!updated)
            return NotFound();
        return NoContent();
    }

    // DELETE: api/learners/{learnerId}/goals/{goalId}/soft-delete
    [HttpDelete("{goalId}/soft-delete")]
    public async Task<IActionResult> SoftDeleteGoal(long learnerId, long goalId)
    {
        var deleted = await _goalRepository.SoftDeleteGoalAsync(learnerId, goalId);
        if (!deleted)
            return NotFound();
        return NoContent();
    }

    // PATCH: api/learners/{learnerId}/goals/{goalId}/restore
    [HttpPatch("{goalId}/restore")]
    public async Task<IActionResult> RestoreGoal(long learnerId, long goalId)
    {
        var restored = await _goalRepository.RestoreGoalAsync(learnerId, goalId);
        if (!restored)
            return NotFound();
        return NoContent();
    }

    // DELETE: api/learners/{learnerId}/goals/{goalId}/hard-delete
    [HttpDelete("{goalId}/hard-delete")]
    public async Task<IActionResult> HardDeleteGoal(long learnerId, long goalId)
    {
        var deleted = await _goalRepository.HardDeleteGoalAsync(learnerId, goalId);
        if (!deleted)
            return NotFound();
        return NoContent();
    }
}
```

---

**Summary:**  
Controllers in the PureLearn API are thin, focusing on request validation and response formatting, while delegating business logic and data access to repositories. This separation improves maintainability and

## 9. Dependency Injection & Program Configuration

This section describes how services and repositories are registered for dependency injection and highlights important configuration in `Program.cs`.

---

### Dependency Injection

- **Purpose:**  
  Dependency Injection (DI) allows services, repositories, and other dependencies to be provided to classes (like controllers) automatically, promoting loose coupling and easier testing.

- **Registration:**  
  In `Program.cs`, repositories and services are registered with the DI container using `AddScoped`, `AddSingleton`, or `AddTransient` as appropriate.

- **Example Registration:**
    ```csharp
    // filepath: Program.cs
    builder.Services.AddScoped<IGoalRepository, GoalRepository>();
    builder.Services.AddScoped<ITaskRepository, TaskRepository>();
    builder.Services.AddScoped<INoteRepository, NoteRepository>();
    // ...register other repositories and services
    ```

---

### Database Context Configuration

- **Entity Framework Core:**  
  The database context is registered and configured to use SQL Server (local or Azure).

    ```csharp
    // filepath: Program.cs
    builder.Services.AddDbContext<PureLearnDbContext>(options =>
        options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
    ```

---

### Other Program.cs Configuration

- **Swagger/OpenAPI:**  
  Swagger is enabled for API documentation and testing.

    ```csharp
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen();
    ```

- **CORS Policy:**  
  Cross-Origin Resource Sharing (CORS) is configured to allow frontend applications to access the API.

    ```csharp
    builder.Services.AddCors(options =>
    {
        options.AddPolicy("AllowAll", policy =>
        {
            policy.AllowAnyOrigin()
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
    });
    ```

- **Middleware Pipeline:**  
  The middleware pipeline is set up to use Swagger, CORS, HTTPS redirection, authentication, and authorization as needed.

    ```csharp
    var app = builder.Build();

    app.UseSwagger();
    app.UseSwaggerUI();

    app.UseCors("AllowAll");

    app.UseHttpsRedirection();

    app.UseAuthorization();

    app.MapControllers();

    app.Run();
    ```

---

**Summary:**  
All repositories and services are registered in `Program.cs` for dependency injection. The file also configures the database context, Swagger, CORS, and the middleware pipeline, ensuring the API is ready for development and

## 10. Running & Testing the API

This section explains how to run the PureLearn API locally or with Docker, how to access the Swagger UI for interactive documentation, and outlines the testing strategy.

---

### Running Locally

- **Prerequisites:**  
  - .NET 8 SDK installed  
  - SQL Server (local or Azure) configured

- **Steps:**  
    ```sh
    cd api
    dotnet restore
    dotnet watch run
    ```
- **Result:**  
  The API will be available at [http://localhost:5115](http://localhost:5115).

---

### Running with Docker

- **Prerequisites:**  
  - Docker Desktop installed

- **Steps:**  
    ```sh
    cd api
    docker-compose build
    docker-compose up
    ```
- **Result:**  
  The API will be available at [http://localhost:5115](http://localhost:5115).

---

### Accessing Swagger UI

- **URL:**  
  [http://localhost:5115/swagger](http://localhost:5115/swagger)

- **Purpose:**  
  Swagger UI provides interactive API documentation, allowing you to explore and test endpoints directly from the browser.

---

### Testing Strategy

- **Unit Tests:**  
  - Test individual components (e.g., repositories, services) in isolation.
  - Use frameworks like xUnit or NUnit.
  - Example command:
    ```sh
    dotnet test
    ```

- **Integration Tests:**  
  - Test the API endpoints as a whole, often using an in-memory database or test SQL Server instance.
  - Ensure that controllers, repositories, and data access work together as expected.

- **Continuous Integration:**  
  - Tests can be run automatically in CI pipelines to ensure code quality and prevent regressions.

---

**Summary:**  
You can run the API locally or in Docker, access interactive documentation via Swagger UI, and ensure reliability through unit and

## 11. Additional Features

This section highlights extra features implemented in the PureLearn API and explains how they work.

---

### 1. Advanced Filtering, Sorting, and Pagination

- **Description:**  
  Endpoints like goals, tasks, and notes support advanced filtering, sorting, and pagination using query parameters.
- **Implementation:**  
  - Query objects (e.g., `GoalQueryObject`) are used to capture filter and sort options from the request.
  - LINQ is used in repositories to apply filters, sorting, and pagination before returning results.
  - Example usage:
    ```
    GET /api/learners/1/goals?Status=In-Progress&CategoryId=2&SortBy=Title&IsSortAscending=false&PageNumber=1&PageSize=5
    ```

---

### 2. Soft Delete and Restore

- **Description:**  
  Instead of permanently deleting records, the API supports soft deletion (marking records as deleted) and restoration.
- **Implementation:**  
  - Entities include `IsDeleted` and `DeletedAt` fields.
  - Soft delete endpoints set `IsDeleted = true` and record the deletion time.
  - Restore endpoints set `IsDeleted = false` and clear the deletion time.
  - Hard delete endpoints permanently remove records from the database.

---

### 3. Swagger/OpenAPI Documentation

- **Description:**  
  The API is documented and testable via Swagger UI.
- **Implementation:**  
  - Swagger is enabled in `Program.cs` using `AddSwaggerGen()` and `UseSwaggerUI()`.
  - All endpoints and DTOs are automatically documented and available for interactive testing.

---

### 4. Manual Mapping vs. AutoMapper

- **Manual Mapping:**  
  Manual mapping involves explicitly writing code to convert between entity models and DTOs. For example, you assign each property from the entity to the DTO (and vice versa) in mapping methods or constructors.

- **AutoMapper:**  
  AutoMapper is a library that automatically maps properties between objects with similar structures using configuration profiles. It reduces boilerplate code but can sometimes obscure mapping logic and make debugging harder.

#### Comparison

| Aspect            | Manual Mapping                          | AutoMapper                              |
|-------------------|----------------------------------------|-----------------------------------------|
| **Control**       | Full control over mapping logic         | Convention-based, less explicit         |
| **Debugging**     | Easier to debug and trace               | Can be harder to trace mapping issues   |
| **Performance**   | No reflection, generally faster         | Uses reflection, slight overhead        |
| **Flexibility**   | Easy to handle complex scenarios        | Requires custom configuration           |
| **Boilerplate**   | More code to write and maintain         | Less code, but more magic               |

#### Why Manual Mapping Was Chosen

Manual mapping was selected for this project to ensure:
- **Explicitness:** All mapping logic is visible and easy to understand.
- **Debuggability:** Issues in data transformation are easier to trace and fix.
- **Flexibility:** Complex or custom mapping scenarios are straightforward to implement.
- **Performance:** Avoids the runtime overhead of reflection-based mapping.

While AutoMapper can reduce repetitive code, manual mapping provides greater transparency and control, which is preferred for maintainability and clarity in this API.

---

### 5. CORS Support

- **Description:**  
  Cross-Origin Resource Sharing (CORS) is enabled to allow frontend applications to access the API.
- **Implementation:**  
  - CORS policy is configured in `Program.cs` to allow any origin, header, and method.

---

### 6. Authentication & Authorization

- **Description:**  
  The API is designed to support authentication and authorization for secure access.
- **Implementation:**  
  - Middleware and attributes can be added for JWT or cookie-based authentication.
  - Endpoints can be protected using `[Authorize]` attributes.

---

**Summary:**  
The PureLearn API includes advanced querying, soft delete/restore, interactive documentation, DTO mapping, CORS, and is ready for secure authentication and authorization.

## 12. Conclusion

The PureLearn API is a robust, modular backend designed to support a modern learning and productivity platform. It leverages .NET 8, Entity Framework Core, and SQL Server, following best practices for maintainability, scalability, and security. The API provides comprehensive features such as advanced filtering, sorting, pagination, soft delete/restore, and interactive Swagger documentation. Its architecture separates concerns through controllers, repositories, DTOs, and dependency injection, ensuring clean code and ease of testing.

**Next Steps & Future Improvements:**
- Implement comprehensive authentication and authorization (e.g., JWT).
- Expand integration and end-to-end testing coverage.
- Add support for additional resource types and relationships.
- Enhance error handling and validation feedback.
- Optimize performance for large datasets and high concurrency.
- Integrate monitoring, logging, and analytics for production readiness.

The API is well-positioned for further development and integration with frontend applications, supporting the evolving needs of learners and educators.


---


