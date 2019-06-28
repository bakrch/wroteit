pipeline {
  agent {
    node {
      label 'idk'
    }

  }
  stages {
    stage('start') {
      steps {
        sh '''mongod
yarn start'''
      }
    }
  }
}