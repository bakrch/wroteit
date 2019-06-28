pipeline {
  agent none
  stages {
    stage('run') {
      steps {
        sh 'mongod && yarn start'
      }
    }
  }
}