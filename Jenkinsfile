pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "docker.io/yogeshrajendran/timerx-webapp"
        EC2_HOST = "100.27.234.136"
    }

    stages {

        stage("Checkout Code") {
            steps {
                git branch: "main", url: "https://github.com/yogeshrajendran-24/timerx-webapp.git"
            }
        }

        stage("Build Docker Image") {
            steps {
                sh "docker build -t ${DOCKER_IMAGE}:latest ."
            }
        }

        stage("Login to DockerHub") {
            steps {
                withCredentials([usernamePassword(credentialsId: "dockerhub-creds", usernameVariable: "DOCKER_USER", passwordVariable: "DOCKER_PASS")]) {
                    sh "echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin"
                }
            }
        }

        stage("Push Image to DockerHub") {
            steps {
                sh "docker push ${DOCKER_IMAGE}:latest"
            }
        }

        stage("Deploy to AWS EC2") {
            steps {
                sshagent(['ec2-ssh-key']) {
                    sh """
                    ssh -o StrictHostKeyChecking=no ubuntu@${EC2_HOST} '
                      docker pull ${DOCKER_IMAGE}:latest &&
                      docker stop timerx || true &&
                      docker rm timerx || true &&
                      docker run -d --name timerx -p 80:80 ${DOCKER_IMAGE}:latest
                    '
                    """
                }
            }
        }
    }
}
