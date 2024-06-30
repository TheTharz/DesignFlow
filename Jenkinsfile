pipeline {
    agent any

    environment {
        BUILD_NUMBER = "env.BUILD_NUMBER"
        DOCKER_USERNAME = "thetharz"
        SCANNER_HOME = tool 'sonar-tool'
    }
    
    tools {
        nodejs "nodejs"
    }
    
    stages {
        stage('GIT Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/TheTharz/DesignFlow.git'
            }
        }
         stage('Install Dependencies') {
            steps {
                dir('client') {
                    sh 'npm install'
                }
                dir('server') {
                    sh 'npm install'
                }
            }
        }
        stage('Run Tests') {
            steps {
                dir('server') {
                    catchError(buildResult: 'SUCCESS', stageResult: 'UNSTABLE') {
                        sh 'npm test'
                    }
                }
            }
            
        }
        stage('Sonarqube Scan') {
            steps {
                withSonarQubeEnv('sonar-scanner') {
                    sh '''$SCANNER_HOME/bin/sonar-scanner -Dsonar.projectName=DevOps \
                    -Dsonar.java.binaries=. \
                    -Dsonar.projectKey=DevOps '''
                }
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
        stage('Scan Client Image') {
            steps {
                script {
                    // Run Trivy to scan the Docker image and output JSON
                    def trivyOutput = sh(script: "trivy image --format json designflow-client", returnStdout: true).trim()

                    // Save Trivy JSON report
                    writeFile file: "trivy_client_scan_report.json", text: trivyOutput

                    // Archive JSON report as artifact
                    archiveArtifacts artifacts: 'trivy_client_scan_report.json', allowEmptyArchive: true

                    // Display Trivy scan summary
                    echo "Trivy scan results for designflow-client:"
                    println trivyOutput

                    // Check if vulnerabilities were found
                    if (trivyOutput.contains("Total: 0")) {
                        echo "No vulnerabilities found in the Docker image."
                    } else {
                        echo "Vulnerabilities found in the Docker image."
                        // You can take further actions here based on your requirements
                        // error "Vulnerabilities found in the Docker image."
                    }
                }
            }
        }
        stage('Scan Server Image') {
            steps {
                script {
                    // Run Trivy to scan the Docker image and output JSON
                    def trivyOutput = sh(script: "trivy image --format json designflow-server", returnStdout: true).trim()

                    // Save Trivy JSON report
                    writeFile file: "trivy_server_scan_report.json", text: trivyOutput

                    // Archive JSON report as artifact
                    archiveArtifacts artifacts: 'trivy_server_scan_report.json', allowEmptyArchive: true

                    // Display Trivy scan summary
                    echo "Trivy scan results for designflow-server:"
                    println trivyOutput

                    // Check if vulnerabilities were found
                    if (trivyOutput.contains("Total: 0")) {
                        echo "No vulnerabilities found in the Docker image."
                    } else {
                        echo "Vulnerabilities found in the Docker image."
                        // You can take further actions here based on your requirements
                        // error "Vulnerabilities found in the Docker image."
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
    
    post {
        always {
             emailext body: 'A Test EMail', recipientProviders: [[$class: 'DevelopersRecipientProvider'], [$class: 'RequesterRecipientProvider']], subject: 'Test'
            
            // Convert JSON to HTML and archive HTML report as artifact
            script {
                def clientJson = readFile('trivy_client_scan_report.json').trim()
                def serverJson = readFile('trivy_server_scan_report.json').trim()

                writeFile file: 'trivy_client_scan_report.html', text: convertJsonToHtml(clientJson)
                writeFile file: 'trivy_server_scan_report.html', text: convertJsonToHtml(serverJson)

                archiveArtifacts artifacts: 'trivy_client_scan_report.html, trivy_server_scan_report.html', allowEmptyArchive: true
                
                
                echo "slack notifications"
                
                // Slack notification
                def COLOR_MAP = [
                    "SUCCESS": "good",
                    "FAILURE": "danger",
                    "UNSTABLE": "warning",
                    "ABORTED": "warning"
                ]

                slackSend (
                    channel: '#devopsproject',
                    color: COLOR_MAP[currentBuild.currentResult] ?: 'good',
                    message: "*${currentBuild.currentResult}:* Job ${env.JOB_NAME} build ${env.BUILD_NUMBER} completed. More info at: ${env.BUILD_URL}"
                )
            }
        }
    }
}

import groovy.json.JsonSlurper

def convertJsonToHtml(jsonData) {
    // Parse JSON data
    def slurper = new JsonSlurper()
    def data = slurper.parseText(jsonData)

    // Construct HTML content
    def htmlContent = """
    <html>
    <head>
        <style>
            table {
                width: 100%;
                border-collapse: collapse;
            }
            th, td {
                padding: 8px;
                text-align: left;
                border-bottom: 1px solid #ddd;
            }
            th {
                background-color: #f2f2f2;
            }
        </style>
    </head>
    <body>
        <h2>Trivy Scan Results</h2>
        <table>
            <tr>
                <th>Package</th>
                <th>Severity</th>
                <th>Vulnerability</th>
                <th>Installed Version</th>
                <th>Fixed Version</th>
            </tr>
    """

    // Iterate over vulnerabilities and populate table rows
    data.vulnerabilities.each { vuln ->
        htmlContent += """
            <tr>
                <td>${vuln.packageName}</td>
                <td>${vuln.severity}</td>
                <td>${vuln.title}</td>
                <td>${vuln.installedVersion}</td>
                <td>${vuln.fixedVersion ?: 'N/A'}</td>
            </tr>
        """
    }

    // Close HTML content
    htmlContent += """
        </table>
    </body>
    </html>
    """

    return htmlContent
}
