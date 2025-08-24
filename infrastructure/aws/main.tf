# Terraform configuration for AWS infrastructure
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

# Configure the AWS Provider
provider "aws" {
  region = "us-west-2"
}

# Create a VPC
resource "aws_vpc" "axiom_vpc" {
  cidr_block = "10.0.0.0/16"

  tags = {
    Name = "Axiom-VPC"
  }
}

# Create a subnet
resource "aws_subnet" "axiom_subnet" {
  vpc_id     = aws_vpc.axiom_vpc.id
  cidr_block = "10.0.1.0/24"
  availability_zone = "us-west-2a"

  tags = {
    Name = "Axiom-Subnet"
  }
}

# Create an internet gateway
resource "aws_internet_gateway" "axiom_igw" {
  vpc_id = aws_vpc.axiom_vpc.id

  tags = {
    Name = "Axiom-IGW"
  }
}

# Output the VPC ID
output "vpc_id" {
  value = aws_vpc.axiom_vpc.id
}

# Output the subnet ID
output "subnet_id" {
  value = aws_subnet.axiom_subnet.id
}