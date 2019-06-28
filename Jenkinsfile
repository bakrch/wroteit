pipeline {
  agent any
  stages {
    stage('run') {
      parallel {
        stage('run') {
          steps {
            bat 'yarn install        yarn start'
          }
        }
        stage('mongod') {
          steps {
            bat 'mongod'
          }
        }
      }
    }
  }
}