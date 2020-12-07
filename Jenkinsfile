pipeline {
  environment {
    registry = "http://192.168.1.151:5000"
    imageName = "deftr--webclient"
    imageVersion = "dockerfile-test"
    imageNameVersioned = "${imageName}:${imageVersion}"
    // imageDestination = "${registry}/${imageName}"
    imageFullTag = "${registry}/${imageNameVersioned}"
    dockerImage = ''
    buildPath = ''
    CI = true // This is important for yarn test to run without hanging
  }

  agent any

  stages {
    stage('Test') {
      agent {
        docker {
          image 'node:latest'
        } 
      }        
      steps {
        script {
          buildPath = pwd()
        }
        sh "echo buildPath: ${buildPath}"

        sh "rm -rf ${buildPath}/deftr--webclient"
        sh "git clone -b separate_dockerfiles https://github.com/utkusarioglu/deftr--webclient.git"

        sh "rm -rf ${buildPath}/deftr--public-api"
        sh "git clone https://github.com/utkusarioglu/deftr--public-api.git"

        dir('deftr--webclient') {
          sh 'yarn install --frozen-lockfile'
          sh 'yarn test'
          sh 'yarn build'
        }
      }
    }

    stage('Containerize') {
      steps{
        sh "echo buildPath: ${buildPath}"
        sh "echo buildPath: ${buildPath}"
        script {
          df = "${buildPath}/deftr--webclient/Dockerfile.webclient.ci"
          dockerImage = docker.build(imageNameVersioned, "-f ${df} ${buildPath}")
        }
      }
    }

    stage('Deploy') {
      steps{
        sh "echo PWD: ${pwd()}"
        script {
          docker.withRegistry(registry, '') {
            dockerImage.push()
          }
        }
      }
    }

    // these don't work
    stage('Cleanup') {
      steps{
        sh "echo PWD: ${pwd()}"
        script {
          try {
            sh "docker container stop \$(docker ps -aq)"
          } catch {}
          try {
            sh "docker container rm \$(docker ps -aq)"
          } catch {}
          try {
            sh "docker rmi ${imageFullTag}"
          } catch {}
        }
      }
    }
  }
}
