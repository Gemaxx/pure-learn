# Sequence of Backend Development

## Project Setup

1. Clone the repository:

    ```sh
    git clone https://github.com/your-repo/pure-learn.git
    cd pure-learn/api
    ```

2. Install dependencies:

    ```sh
    dotnet restore
    ```

3. Set up the database:
    - Update the connection string in  and  if necessary.
    - Run the database migrations:

        ```sh
        dotnet ef database update
        ```

## Running the Application

1. Start the backend service:

    ```sh
    dotnet watch run
    ```

2. The application will be available at:
    - HTTP: `http://localhost:5115`

3. You can access the Swagger UI for API documentation at:
 
    ```sh
    http://localhost:5115/swagger
    ```

## Docker Setup

1. Build and run the Docker container:
  
    ```sh
    docker-compose up 
    ```

2. The application will be available at:
    - HTTP: `http://localhost:5115`

3. You can access the Swagger UI for API documentation at:

    ```sh
    http://localhost:5115/swagger
    ```

## Testing

Not Yet

## Development 

1️⃣ Create Models (Category.cs) (already created at [Modlels](Models) ✅)

2️⃣ Setup DbContext (AppDbContext.cs) (already done at [PureLearnDbContext.cs](Data/PureLearnDbContext.cs))

3️⃣ Define DTOs (CategoryDTO.cs) for different endpoints as needed at [text](Dtos)

4️⃣ Configure Manual Mapper (CategoryMappers.cs)

5️⃣ Create Repository Interface (ICategoryRepository.cs)
    Create QueryObject in [Helpers Dir](Helpers)

6️⃣ Implement Repository (CategoryRepository.cs)

7️⃣ Create Controller (CategorysController.cs)

8️⃣ Register Dependencies in Program.cs
