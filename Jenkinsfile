pipeline {
  environment {
    registry = "192.168.1.151:5000"
    imageName = "deftr--webclient"
    imageVersion = "latest"
    imageDestination = "${registry}/${imageName}"
    imageFullTag = "${imageDestination}:${imageVersion}"
    projectPath = "${imageName}"
    dockerImage = ''
    CI = true // This is important for yarn test to run without hanging
  }

  agent any

  stages {
    stage('Testing') {
      agent {
        docker {
          image 'node:latest'
          args """
            -p 80:3000 
          """
        } 
      }        
      steps {
        sh "rm -rf ${pwd()}/deftr--webclient"
        sh "git clone https://github.com/utkusarioglu/deftr--webclient.git"

        sh "rm -rf ${pwd()}/deftr--public-api"
        sh "git clone https://github.com/utkusarioglu/deftr--public-api.git"

        dir('deftr--webclient') {
          sh 'yarn'
          sh 'yarn test'
        }
        sh 'echo "Im only here to look cool"'
      }
    }

    stage('Containerize') {
      steps{
        script {
          dockerImage = docker.build(imageFullTag, "-f ${pwd()}/deftr--webclient/Dockerfile.webclient.production .")
        }
      }
    }

    stage('Deploy') {
      steps{
        script {
          docker.withRegistry( '', '' ) {
            dockerImage.push()
          }
        }
      }
    }

    stage('Cleanup') {
      steps{
        sh "docker rmi ${imageFullTag}"
      }
    }
  }
}