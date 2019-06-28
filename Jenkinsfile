pipeline {
  agent any
  stages {
    stage('install') {
      parallel {
        stage('install') {
          steps {
            bat 'yarn install'
          }
        }
        stage('mongod') {
          agent any
          steps {
            bat 'mongod'
          }
        }
      }
    }
    stage('run') {
      steps {
        bat 'yarn start'
      }
    }
  }
}