# Define the path to the 'Dtos' directory
$DtosDirectory = "D:\pure-learn\api\Dtos"

# Ensure the 'Dtos' directory exists
if (-not (Test-Path -Path $DtosDirectory)) {
    Write-Host "Creating 'Dtos' directory..."
    New-Item -ItemType Directory -Path $DtosDirectory
}

# Define the path to the 'Models' directory
$ModelsDirectory = "D:\pure-learn\api\models"

# Get all .cs files in the 'Models' directory
$ModelFiles = Get-ChildItem -Path $ModelsDirectory -Filter *.cs

# Print the files found in the 'Models' folder
Write-Host "Found model files:"
$ModelFiles

# Create a subfolder for each model file inside the 'Dtos' directory
foreach ($ModelFile in $ModelFiles) {
    $ModelName = [System.IO.Path]::GetFileNameWithoutExtension($ModelFile.Name)
    $ModelDtosDirectory = Join-Path -Path $DtosDirectory -ChildPath $ModelName

    # Print the path where the subfolder will be created
    Write-Host "Creating folder: $ModelDtosDirectory"

    # Create the subfolder if it doesn't exist
    if (-not (Test-Path -Path $ModelDtosDirectory)) {
        New-Item -ItemType Directory -Path $ModelDtosDirectory
    }
}
