pipeline {
  environment {
    registry = "192.168.1.151:5000"
    imageName = "deftr--webclient"
    imageVersion = "dockerfile-test"
    imageDestination = "${registry}/${imageName}"
    imageFullTag = "${imageDestination}:${imageVersion}"
    projectPath = "${imageName}"
    dockerImage = ''
    testPath = ''
    buildPath = ''
    CI = true // This is important for yarn test to run without hanging
  }

  agent any

  stages {
    stage('Test') {
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
          testPath = pwd()
        }
        sh "echo PWD: ${pwd()}"
        sh "yarn --version && yarn cache dir"
        sh "git clone -b separate_dockerfiles https://github.com/utkusarioglu/deftr--webclient.git"
        sh "git clone https://github.com/utkusarioglu/deftr--public-api.git"

        dir('deftr--webclient') {
          sh 'yarn install --frozen-lockfile'
          sh 'yarn test'
        }
      }
    }

    stage('Build') {
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
          buildPath = pwd()
        }
        sh "echo PWD: ${pwd()}"
        sh "yarn --version && yarn cache dir"
        sh "mv ${testPath}/deftr--webclient ./deftr--webclient"
        sh "mv ${testPath}/deftr--public-api ./deftr--public-api"

        dir('deftr--webclient') {
          sh 'yarn install --frozen-lockfile --production'
          sh 'yarn build'
        }
      }
    }

    stage('Containerize') {
      steps{
        sh "echo PWD: ${pwd()}"
        script {
          dockerImage = docker.build(
            imageFullTag, 
            """
            -f ${buildPath}/deftr--webclient/Dockerfile.webclient.ci 
            ${buildPath}
            """
            )
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
        sh "docker rmi $(docker images -q)"
      }
    }
  }
}
