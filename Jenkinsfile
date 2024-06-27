pipeline {
    agent any

    environment {
        BUILD_NUMBER = "env.BUILD_NUMBER"
        DOCKER_USERNAME = "thetharz"
    }
    stages {
        stage('GIT Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/TheTharz/DesignFlow.git'
            }
        }
        stage('Build Image') {
            steps {
                dir('client'){
                    script{
                        sh "docker build -t designflow-client ."
                    }
                }
                dir('server'){
                    script{
                        sh "docker build -t designflow-server ."
                    }
                }
            }
        }
        stage('Tag Image') {
            steps {
               script{
                   sh "docker tag designflow-client ${DOCKER_USERNAME}/designflow-ci-client:v${BUILD_NUMBER}"
                   sh "docker tag designflow-server ${DOCKER_USERNAME}/designflow-ci-server:v${BUILD_NUMBER}"
               }
            }
        }
        stage('Docker Image Push') {
            steps {
                script { 
                    withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'docker_user', passwordVariable: 'docker_pass')]) {
                        sh "docker login -u '${docker_user}' -p '${docker_pass}'"
                        sh "docker push ${DOCKER_USERNAME}/designflow-ci-client:v${BUILD_NUMBER}"
                        sh "docker push ${DOCKER_USERNAME}/designflow-ci-server:v${BUILD_NUMBER}"
                        sh "docker logout"
                    }
                }
            }
        }
        stage('Cleanup Local Images') {
            steps {
                sh "docker rmi ${DOCKER_USERNAME}/designflow-ci-client:v${BUILD_NUMBER}"
                sh "docker rmi ${DOCKER_USERNAME}/designflow-ci-server:v${BUILD_NUMBER}"
                
            }
        }
    }
}
