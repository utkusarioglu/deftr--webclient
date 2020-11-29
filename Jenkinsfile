pipeline {
  environment {
    registry = "192.168.1.151:5000"
    imageName = "deftr--webclient"
    imageVersion = "dockerfile-test"
    imageDestination = "${registry}/${imageName}"
    imageFullTag = "${imageDestination}:${imageVersion}"
    projectPath = "${imageName}"
    dockerImage = ''
    dockerContentPath = ''
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
        script {
          dockerContentPath = pwd()
        }
        sh "echo PWD: ${pwd()}"
        sh "yarn --version && yarn cache dir"
        sh "git clone -b separate_dockerfiles https://github.com/utkusarioglu/deftr--webclient.git"
        sh "git clone https://github.com/utkusarioglu/deftr--public-api.git"

        dir('deftr--webclient') {
          sh 'yarn'
          sh 'yarn test'
        }
      }
    }

    stage('Containerize') {
      steps{
        sh "echo PWD: ${pwd()}"
        script {
          dockerImage = docker.build(imageFullTag, "-f ${dockerContentPath}/deftr--webclient/docker/Dockerfile.webclient.production ${dockerContentPath}")
        }
      }
    }

    stage('Deploy') {
      steps{
        sh "echo PWD: ${pwd()}"
        script {
          docker.withRegistry( '', '' ) {
            dockerImage.push()
          }
        }
      }
    }

    stage('Cleanup') {
      steps{
        sh "echo PWD: ${pwd()}"
        sh "docker rmi ${imageFullTag} deftr--webclient--ci--build deftr--webclient--ci--test"
      }
    }
  }
}
