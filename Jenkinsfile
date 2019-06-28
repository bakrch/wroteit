pipeline {
  agent any
  stages {
    stage('run') {
      steps {
        bat 'mongod        yarn install        yarn start'
      }
    }
  }
}