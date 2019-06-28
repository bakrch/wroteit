pipeline {
  agent any
  stages {
    stage('run') {
      steps {
        bat '''mongod
        yarn start'''
      }
    }
  }
}
