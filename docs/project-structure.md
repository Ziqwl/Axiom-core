# Axiom Project Structure

This document explains the directory structure and purpose of each component in the Axiom project.

## Directory Structure

```
axiom-core/
├── client/              # Frontend application (React + TypeScript)
│   ├── public/          # Static assets
│   ├── src/             # Source code
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Page components
│   │   ├── services/    # API service layer
│   │   ├── styles/      # CSS/SCSS files
│   │   ├── utils/       # Utility functions
│   │   └── tests/       # Frontend tests
├── server/              # Backend application (Node.js + Express)
│   ├── src/             # Source code
│   │   ├── controllers/ # Request handlers
│   │   ├── routes/      # API route definitions
│   │   ├── services/    # Business logic
│   │   ├── models/      # Data models
│   │   ├── middleware/  # Custom middleware
│   ├── tests/           # Backend tests
├── infrastructure/      # Infrastructure as Code (Terraform)
│   ├── aws/             # AWS configurations
│   ├── azure/           # Azure configurations
│   └── gcp/             # Google Cloud Platform configurations
├── ci-cd/               # CI/CD pipelines (GitHub Actions)
│   ├── build/           # Build workflows
│   ├── deploy/          # Deployment workflows
│   └── test/            # Test workflows
├── monitoring/          # Monitoring configurations (Prometheus, Grafana)
├── ai/                  # AI components and services
├── docs/                # Project documentation
├── scripts/             # Utility scripts
├── tests/               # End-to-end tests
├── docker/              # Docker configurations
└── public/              # Static files served by the backend
```

## Component Descriptions

### Client (Frontend)
The frontend is built with React and TypeScript, providing a visual interface for designing cloud infrastructure. It communicates with the backend via REST API.

### Server (Backend)
The backend is a Node.js application using Express framework. It provides REST API endpoints for managing infrastructure designs and serves the frontend application.

### Infrastructure
Contains Infrastructure as Code (IaC) configurations using Terraform for different cloud providers (AWS, Azure, GCP).

### CI/CD
Contains GitHub Actions workflows for continuous integration and deployment processes.

### Monitoring
Configuration files for monitoring tools like Prometheus and Grafana.

### Documentation
Project documentation including guides, tutorials, and explanations.

## DevOps Practices in This Structure

1. **Separation of Concerns**: Each component has its own directory making it easy to manage and scale.
2. **Containerization Ready**: Dockerfiles are provided for both client and server components.
3. **CI/CD Ready**: GitHub Actions workflows are included for automated testing and deployment.
4. **Testing Support**: Dedicated test directories for both frontend and backend.
5. **Infrastructure as Code**: Terraform configurations for managing cloud infrastructure.
6. **Monitoring Ready**: Directory structure prepared for monitoring configurations.

This structure follows industry best practices and allows for easy expansion as the project grows.