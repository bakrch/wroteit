pipeline {
  agent any
  stages {
    stage('run') {
      steps {
        sh 'mongod && yarn start'
      }
    }
  }
}