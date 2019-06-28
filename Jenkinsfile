pipeline {
  agent any
  stages {
    stage('install') {
      steps {
        bat 'yarn install'
      }
    }
    stage('run') {
      steps {
        bat 'yarn start'
      }
    }
  }
}