pipeline {
    agent { dockerfile true }
    stages {
        stage('Test') {
            steps {
              echo 'Hello ruby!!'
              sh 'ruby --version'
              sh 'echo MyCustomEnvVar=$MyCustomEnvVar'
            }
        }
    }
}