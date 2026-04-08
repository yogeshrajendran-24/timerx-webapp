pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "docker.io/yogeshrajendran/timerx-webapp"
        EC2_HOST = "50.19.47.198"
    }

    stages {

        stage("Checkout Code") {
            steps {
                git branch: "main", url: "https://github.com/yogeshrajendran-24/timerx-webapp.git"
            }
        }

        stage('Build Docker Image'){
            steps{
                script{
                    dockerImage = docker.build("${DOCKER_IMAGE}:${BUILD_NUMBER}")
                }
            }
        }

        stage('Push Image to DockerHub'){
            steps{
                script{
                    docker.withRegistry('', 'dockerhub-creds') {
                    dockerImage.push("${BUILD_NUMBER}")
                    dockerImage.push("latest")
                     }
                }
             }
        }

        stage("Deploy to AWS EC2") {
            steps {
                sshagent(['ec2-ssh-key']) {
                    sh """
                    ssh -o StrictHostKeyChecking=no ubuntu@${EC2_HOST} '
                      docker pull ${DOCKER_IMAGE}:latest &&
                      docker stop timerx-webapp || true &&
                      docker rm timerx-webapp || true &&
                      docker run -d --name timerx-webapp -p 80:80 ${DOCKER_IMAGE}:latest
                    '
                    """
                }
            }
        }
    }
}
