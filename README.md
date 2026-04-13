⏱️ TimerX Web App - DevOps CI/CD Project

A simple web application deployed using a complete DevOps pipeline including CI/CD automation, containerization, and cloud deployment.

---

## 🚀 Project Overview

This project demonstrates an end-to-end DevOps workflow:

- Source code hosted on GitHub
- CI/CD pipeline using Jenkins
- Docker image build and push to DockerHub
- Deployment on AWS EC2 using Docker containers

---

## 🧰 Tech Stack

- **Frontend**: HTML, CSS, JavaScript
- **CI/CD**: Jenkins
- **Containerization**: Docker
- **Cloud**: AWS EC2
- **Version Control**: GitHub
- **Registry**: DockerHub

---

## 📁 Project Structure
```

timex-webapp/
│── imgs/
│── index.html
│── style.css
│── script.js
│── Dockerfile
│── Jenkinsfile
```

---

## ⚙️ CI/CD Pipeline Flow

1. Developer pushes code to GitHub
2. Jenkins triggers pipeline
3. Code checkout from repository
4. Docker image is built
5. Image pushed to DockerHub
6. Application deployed on AWS EC2

---

## 🏗️ Architecture Diagram

```

[ Developer ]
      |
      v
[ GitHub Repository ]
      |
      v
[ Jenkins CI/CD Pipeline ]
      |
      v
[ Docker Build ]
      |
      v
[ DockerHub Registry ]
      |
      v
[ AWS EC2 Instance ]
      |
      v
[ Running Container ]
      |
      v
[ Web Application (Port 80) ]


---

🐳 Docker Commands
# Build Image
docker build -t timex-webapp .

# Run Container
docker run -d -p 80:80 timex-webapp

---

🔄 Jenkins Pipeline Stages
Checkout SCM
Build Docker Image
Push to DockerHub
Deploy to AWS EC2
Post-build Actions

---

🌐 Deployment Details
Cloud Provider: AWS
Instance Type: EC2 (Ubuntu)
Port Exposed: 80
Container Status: Running

---

📌 Key Features
Automated CI/CD pipeline
Dockerized application
Cloud deployment using AWS EC2
Version-controlled workflow
Scalable and reusable setup

---

📈 Future Improvements
Add Kubernetes deployment
Implement monitoring (Prometheus + Grafana)
Add HTTPS with Nginx
Integrate Terraform for infrastructure as code
```
