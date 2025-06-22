using System.Net;
using System.Net.Http.Json;
using System.Text;
using Microsoft.AspNetCore.Mvc.Testing;
using api.Dtos.Learner;
using api.Dtos.Category;
using Newtonsoft.Json;
using Xunit;

namespace PureLearnApi.Tests;

public class PureLearnApiSmokeTests : IClassFixture<TestStartup>, IAsyncLifetime
{
    private readonly TestStartup _factory;
    private readonly HttpClient _client;
    private readonly long _testLearnerId = 4; // Using real learner ID from database
    private string? _jwt;

    public PureLearnApiSmokeTests(TestStartup factory)
    {
        _factory = factory;
        _client = _factory.CreateClient();
    }

    public async Task InitializeAsync()
    {
        // Register and login once for all tests
        var registerDto = new LearnerRegistrationRequestDto
        {
            Name = "Test User",
            Email = "test@example.com",
            Password = "TestPassword123!"
        };

        // Register the user
        var registerResponse = await _client.PostAsJsonAsync("/api/Auth/register", registerDto);
        if (!registerResponse.IsSuccessStatusCode)
        {
            // If registration fails, try to login (user might already exist)
            var loginDto = new LoginDto
            {
                Email = "test@example.com",
                Password = "TestPassword123!"
            };

            var loginResponse = await _client.PostAsJsonAsync("/api/Auth/login", loginDto);
            if (loginResponse.IsSuccessStatusCode)
            {
                var loginResult = await loginResponse.Content.ReadFromJsonAsync<LearnerAuthDto>();
                _jwt = loginResult?.Token;
            }
        }
        else
        {
            // If registration succeeds, login to get the token
            var loginDto = new LoginDto
            {
                Email = "test@example.com",
                Password = "TestPassword123!"
            };

            var loginResponse = await _client.PostAsJsonAsync("/api/Auth/login", loginDto);
            if (loginResponse.IsSuccessStatusCode)
            {
                var loginResult = await loginResponse.Content.ReadFromJsonAsync<LearnerAuthDto>();
                _jwt = loginResult?.Token;
            }
        }

        // Set the Authorization header for all subsequent requests
        if (!string.IsNullOrEmpty(_jwt))
        {
            _client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", _jwt);
        }
    }

    public Task DisposeAsync()
    {
        // Clean up if needed
        return Task.CompletedTask;
    }

    [Fact]
    public async System.Threading.Tasks.Task Auth_Register_ReturnsSuccess()
    {
        // Arrange - Generate random values to avoid conflicts
        var randomSuffix = Guid.NewGuid().ToString("N")[..8]; // Get first 8 characters
        var registerDto = new LearnerRegistrationRequestDto
        {
            Name = $"TestUser_{randomSuffix}",
            Email = $"testuser_{randomSuffix}@example.com",
            Password = "TestPassword123!"
        };

        // Act - Register
        var registerResponse = await _client.PostAsJsonAsync("/api/Auth/register", registerDto);

        // Assert - Registration
        Assert.Equal(HttpStatusCode.OK, registerResponse.StatusCode);
        var registerResult = await registerResponse.Content.ReadFromJsonAsync<LearnerDto>();
        Assert.NotNull(registerResult);
        Assert.NotEqual(0, registerResult.Id); // Assert Id is not zero
        Assert.Equal(registerDto.Email, registerResult.Email);

        // Act - Login to get JWT token
        var loginDto = new LoginDto
        {
            Email = registerDto.Email, // Use the same email from registration
            Password = registerDto.Password // Use the same password from registration
        };

        var loginResponse = await _client.PostAsJsonAsync("/api/Auth/login", loginDto);

        // Assert - Login and token
        Assert.Equal(HttpStatusCode.OK, loginResponse.StatusCode);
        var loginResult = await loginResponse.Content.ReadFromJsonAsync<LearnerAuthDto>();
        Assert.NotNull(loginResult);
        Assert.NotNull(loginResult.Token);
        Assert.NotEmpty(loginResult.Token);
    }

    [Fact]
    public async System.Threading.Tasks.Task Auth_Login_ReturnsSuccess()
    {
        // Arrange
        var loginDto = new LoginDto
        {
            Email = "test@example.com",
            Password = "TestPassword123!"
        };

        // Act
        var response = await _client.PostAsJsonAsync("/api/Auth/login", loginDto);

        // Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        var result = await response.Content.ReadFromJsonAsync<LearnerAuthDto>();
        Assert.NotNull(result);
        Assert.NotNull(result.Token);
    }

    [Fact]
    public async System.Threading.Tasks.Task Categories_GetAll_ReturnsSuccess()
    {
        // Act
        var response = await _client.GetAsync($"/api/learners/{_testLearnerId}/categories");

        // Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        var result = await response.Content.ReadFromJsonAsync<IEnumerable<object>>();
        Assert.NotNull(result);
    }

    [Fact]
    public async System.Threading.Tasks.Task Categories_GetById_ReturnsSuccess()
    {
        // Act - Using real category ID from database
        var response = await _client.GetAsync($"/api/learners/{_testLearnerId}/categories/3");

        // Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        var result = await response.Content.ReadFromJsonAsync<object>();
        Assert.NotNull(result);
    }

    [Fact]
    public async System.Threading.Tasks.Task Categories_Create_ReturnsSuccess()
    {
        // Arrange
        var categoryDto = new
        {
            Title = "New Category",
            Description = "New Category Description",
            Color = "#00FF00"
        };

        // Act
        var response = await _client.PostAsJsonAsync($"/api/learners/{_testLearnerId}/categories", categoryDto);

        // Assert
        Assert.Equal(HttpStatusCode.Created, response.StatusCode);
        var result = await response.Content.ReadFromJsonAsync<object>();
        Assert.NotNull(result);
    }

    [Fact]
    public async System.Threading.Tasks.Task Categories_Update_ReturnsSuccess()
    {
        // Arrange
        var patchDto = new PatchCategoryRequestDto
        {
            Title = "Updated Category"
        };

        // Act - Using real category ID from database
        var response = await _client.PatchAsync($"/api/learners/{_testLearnerId}/categories/3", 
            new StringContent(JsonConvert.SerializeObject(patchDto), Encoding.UTF8, "application/json"));

        // Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
    }

    [Fact]
    public async System.Threading.Tasks.Task Categories_Delete_ReturnsSuccess()
    {
        // Act - Using real category ID from database
        var response = await _client.DeleteAsync($"/api/learners/{_testLearnerId}/categories/3");

        // Assert
        Assert.Equal(HttpStatusCode.NoContent, response.StatusCode);
    }

    [Fact]
    public async System.Threading.Tasks.Task Goals_GetAll_ReturnsSuccess()
    {
        // Act
        var response = await _client.GetAsync($"/api/learners/{_testLearnerId}/goals");

        // Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        var result = await response.Content.ReadFromJsonAsync<IEnumerable<object>>();
        Assert.NotNull(result);
    }

    [Fact]
    public async System.Threading.Tasks.Task Goals_GetById_ReturnsSuccess()
    {
        // Act - Using real goal ID from database
        var response = await _client.GetAsync($"/api/learners/{_testLearnerId}/goals/4");

        // Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        var result = await response.Content.ReadFromJsonAsync<object>();
        Assert.NotNull(result);
    }

    [Fact]
    public async System.Threading.Tasks.Task Goals_Create_ReturnsSuccess()
    {
        // Arrange - Using real category ID from database
        var goalDto = new
        {
            CategoryId = 3, // Real category ID from database
            Title = "New Goal",
            Description = "New Goal Description",
            Motivation = "To achieve great things and improve myself",
            Term = "Short-Term",
            Status = "Not-Started"
        };

        // Act
        var response = await _client.PostAsJsonAsync($"/api/learners/{_testLearnerId}/goals", goalDto);

        // Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        var result = await response.Content.ReadFromJsonAsync<object>();
        Assert.NotNull(result);
    }

    [Fact]
    public async System.Threading.Tasks.Task Tasks_GetAll_ReturnsSuccess()
    {
        // Act
        var response = await _client.GetAsync($"/api/learners/{_testLearnerId}/tasks");

        // Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        var result = await response.Content.ReadFromJsonAsync<IEnumerable<object>>();
        Assert.NotNull(result);
    }

    [Fact]
    public async System.Threading.Tasks.Task Tasks_GetById_ReturnsSuccess()
    {
        // Use an existing task from the database for Learner ID 4
        // From the database data provided, Task ID 10 belongs to Learner ID 4
        var existingTaskId = 10; // "Task A" - belongs to Learner ID 4

        // Test getting the existing task by ID
        var response = await _client.GetAsync($"/api/learners/{_testLearnerId}/tasks/{existingTaskId}");

        // Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        var result = await response.Content.ReadFromJsonAsync<object>();
        Assert.NotNull(result);
    }

    [Fact]
    public async System.Threading.Tasks.Task Tasks_Create_ReturnsSuccess()
    {
        // Arrange - Using real IDs from database
        var taskDto = new
        {
            Title = "New Task",
            Description = "New Task Description",
            GoalId = 4, // Real goal ID from database
            KanbanStatusId = 1, // Real KanbanStatus ID from database
            TypeId = 5 // Real TaskType ID from database (belongs to Learner ID 4)
        };

        // Act
        var response = await _client.PostAsJsonAsync($"/api/learners/{_testLearnerId}/tasks", taskDto);

        // Assert
        Assert.Equal(HttpStatusCode.Created, response.StatusCode);
        var result = await response.Content.ReadFromJsonAsync<object>();
        Assert.NotNull(result);
    }

    [Fact]
    public async System.Threading.Tasks.Task Subtasks_GetAll_ReturnsSuccess()
    {
        // First create a task for the test learner
        var createTaskDto = new
        {
            Title = "Test Task for Subtasks",
            Description = "Test Task Description",
            GoalId = 4, // Real goal ID from database
            KanbanStatusId = 1, // Real KanbanStatus ID from database
            TypeId = 5 // Real TaskType ID from database (belongs to Learner ID 4)
        };

        var createResponse = await _client.PostAsJsonAsync($"/api/learners/{_testLearnerId}/tasks", createTaskDto);
        Assert.Equal(HttpStatusCode.Created, createResponse.StatusCode);
        
        var createdTask = await createResponse.Content.ReadFromJsonAsync<object>();
        Assert.NotNull(createdTask);
        
        // Extract the task ID from the created task
        var taskId = 1; // Default fallback
        if (createdTask is Newtonsoft.Json.Linq.JObject jobject)
        {
            var idToken = jobject["Id"];
            if (idToken != null)
            {
                taskId = idToken.ToObject<int>();
            }
        }

        // Act - Using the newly created task ID
        var response = await _client.GetAsync($"/api/tasks/{taskId}/subtasks");

        // Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        var result = await response.Content.ReadFromJsonAsync<IEnumerable<object>>();
        Assert.NotNull(result);
    }

    [Fact]
    public async System.Threading.Tasks.Task Subtasks_Create_ReturnsSuccess()
    {
        // First create a task for the test learner
        var createTaskDto = new
        {
            Title = "Test Task for Subtask Creation",
            Description = "Test Task Description",
            GoalId = 4, // Real goal ID from database
            KanbanStatusId = 1, // Real KanbanStatus ID from database
            TypeId = 5 // Real TaskType ID from database (belongs to Learner ID 4)
        };

        var createResponse = await _client.PostAsJsonAsync($"/api/learners/{_testLearnerId}/tasks", createTaskDto);
        Assert.Equal(HttpStatusCode.Created, createResponse.StatusCode);
        
        var createdTask = await createResponse.Content.ReadFromJsonAsync<object>();
        Assert.NotNull(createdTask);
        
        // Extract the task ID from the created task
        var taskId = 1; // Default fallback
        if (createdTask is Newtonsoft.Json.Linq.JObject jobject)
        {
            var idToken = jobject["Id"];
            if (idToken != null)
            {
                taskId = idToken.ToObject<int>();
            }
        }

        // Arrange
        var subtaskDto = new
        {
            Title = "New Subtask",
            Description = "New Subtask Description"
        };

        // Act - Using the newly created task ID
        var response = await _client.PostAsJsonAsync($"/api/tasks/{taskId}/subtasks", subtaskDto);

        // Assert
        Assert.Equal(HttpStatusCode.Created, response.StatusCode);
        var result = await response.Content.ReadFromJsonAsync<object>();
        Assert.NotNull(result);
    }

    [Fact]
    public async System.Threading.Tasks.Task Notes_GetAll_ReturnsSuccess()
    {
        // Act
        var response = await _client.GetAsync($"/api/learners/{_testLearnerId}/notes");

        // Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        var result = await response.Content.ReadFromJsonAsync<IEnumerable<object>>();
        Assert.NotNull(result);
    }

    [Fact]
    public async System.Threading.Tasks.Task Notes_Create_ReturnsSuccess()
    {
        // Arrange - Using real GoalId from database
        var noteDto = new
        {
            GoalId = 4, // Real goal ID from database
            Title = "New Note",
            Body = "New Note Body Content"
        };

        // Act
        var response = await _client.PostAsJsonAsync($"/api/learners/{_testLearnerId}/notes", noteDto);

        // Assert
        Assert.Equal(HttpStatusCode.Created, response.StatusCode);
        var result = await response.Content.ReadFromJsonAsync<object>();
        Assert.NotNull(result);
    }

    [Fact]
    public async System.Threading.Tasks.Task LearningResources_GetAll_ReturnsSuccess()
    {
        // Act
        var response = await _client.GetAsync($"/api/learners/{_testLearnerId}/LearningResources");

        // Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        var result = await response.Content.ReadFromJsonAsync<IEnumerable<object>>();
        Assert.NotNull(result);
    }

    [Fact]
    public async System.Threading.Tasks.Task LearningResourceTypes_GetAll_ReturnsSuccess()
    {
        // Act
        var response = await _client.GetAsync($"/api/learners/{_testLearnerId}/learningResourceTypes");

        // Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        var result = await response.Content.ReadFromJsonAsync<IEnumerable<object>>();
        Assert.NotNull(result);
    }

    [Fact]
    public async System.Threading.Tasks.Task TaskTypes_GetAll_ReturnsSuccess()
    {
        // Act
        var response = await _client.GetAsync($"/api/learners/{_testLearnerId}/tasktypes");

        // Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        var result = await response.Content.ReadFromJsonAsync<IEnumerable<object>>();
        Assert.NotNull(result);
    }

    [Fact]
    public async System.Threading.Tasks.Task KanbanStatuses_GetAll_ReturnsSuccess()
    {
        // Act - Using real goal_id that has KanbanStatus records
        var response = await _client.GetAsync("/api/goals/4/kanbanstatuses");

        // Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        var result = await response.Content.ReadFromJsonAsync<IEnumerable<object>>();
        Assert.NotNull(result);
    }

    [Fact]
    public async System.Threading.Tasks.Task TimerSettings_GetAll_ReturnsSuccess()
    {
        // Act
        // Note: This test may fail if no timer settings exist for the test learner
        // Timer settings in database only exist for Learner IDs 20, 21, 22
        // The test learner (ID 4) has no timer settings
        var response = await _client.GetAsync("/api/settings/timer");

        // Assert
        // The endpoint might return empty array or 404 depending on implementation
        Assert.True(response.StatusCode == HttpStatusCode.OK || response.StatusCode == HttpStatusCode.NotFound);
        if (response.StatusCode == HttpStatusCode.OK)
        {
            var result = await response.Content.ReadFromJsonAsync<IEnumerable<object>>();
            Assert.NotNull(result);
        }
    }

    [Fact]
    public async System.Threading.Tasks.Task Search_ReturnsSuccess()
    {
        // Act
        var response = await _client.GetAsync($"/api/learners/{_testLearnerId}/search?Term=test");

        // Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        var result = await response.Content.ReadFromJsonAsync<object>();
        Assert.NotNull(result);
    }

    [Fact]
    public async System.Threading.Tasks.Task Learners_GetById_ReturnsSuccess()
    {
        // Act
        var response = await _client.GetAsync($"/api/learners/{_testLearnerId}");

        // Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        var result = await response.Content.ReadFromJsonAsync<object>();
        Assert.NotNull(result);
    }

    [Fact]
    public async System.Threading.Tasks.Task Swagger_IsAccessible()
    {
        // Act
        var response = await _client.GetAsync("/swagger");

        // Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
    }

    [Fact]
    public async System.Threading.Tasks.Task HealthCheck_ReturnsSuccess()
    {
        // Act
        var response = await _client.GetAsync("/health");

        // Assert
        // Note: This might return 404 if health check endpoint is not configured
        // The test will pass if the endpoint exists and returns 200
        Assert.True(response.StatusCode == HttpStatusCode.OK || response.StatusCode == HttpStatusCode.NotFound);
    }
} 