# Getting Started with Axiom

This guide will help you set up and run the Axiom platform locally.

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or higher)
- [Docker](https://www.docker.com/)
- [Git](https://git-scm.com/)
- A code editor (we recommend [VS Code](https://code.visualstudio.com/))

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/axiom-core.git
   cd axiom-core
   ```

2. Install backend dependencies:
   ```bash
   cd server
   npm install
   cd ..
   ```

## Running the Application

### Option 1: Using Docker (Recommended)

To run the entire application with Docker:
```bash
docker-compose up
```

This will start both the frontend and backend services. Visit `http://localhost` to access the application.

### Option 2: Running Services Separately

1. Start the backend server:
   ```bash
   cd server
   npm start
   ```

2. In a new terminal, serve the frontend:
   ```bash
   # From the project root
   cd public
   npx serve  # or use any static file server
   ```

## Testing

To run the backend tests:
```bash
cd server
npm test
```

## Project Structure

For a detailed explanation of the project structure, see [Project Structure](project-structure.md).

## Development Workflow

1. Create a new branch for your feature:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes

3. Test your changes

4. Commit your changes:
   ```bash
   git commit -m "Add your feature description"
   ```

5. Push to your fork and create a pull request

## Next Steps

1. Try creating your first infrastructure design using the visual constructor
2. Explore the API endpoints in the backend
3. Check out the Terraform configurations in the infrastructure directory
4. Review the CI/CD workflows in the ci-cd directory

## Troubleshooting

If you encounter any issues:

1. Make sure all prerequisites are installed and running
2. Check that no other services are using the required ports (80, 3001)
3. Ensure Docker is running if using the docker-compose option
4. Check the console logs for error messages

For additional help, please open an issue on GitHub.