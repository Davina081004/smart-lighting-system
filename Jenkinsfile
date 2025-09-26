pipeline {
    agent any

    environment {
        NODE_ENV = 'development'
        MONGO_URI = credentials('mongodb-uri') 
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Davina081004/smart-lighting-system.git'
            }
        }

        stage('Build') {
            steps {
                echo 'Installing dependencies...'
                bat 'npm install'
            }
        }

        stage('Test') {
            steps {
                echo 'Running tests...'
                bat 'npm test -- --detectOpenHandles'
            }
        }

        stage('Code Quality') {
            steps {
                echo 'Running lint...'
                bat 'npx eslint server.js tests/*.js'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying application...'
                bat 'echo "Deploy commands go here"'
            }
        }

    }

    post {
        always {
            echo 'Pipeline finished.'
        }
        success {
            echo 'Pipeline succeeded!'
        }
        failure {
            echo 'Pipeline failed.'
        }
    }
}
