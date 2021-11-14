pipeline {
	agent any
	tools {
        jdk 'JDK'
    }
	environment {
		GOOGLE_ID_TRACKING = credentials("GOOGLE_ID_TRACKING")
		SSH_MAIN_SERVER = credentials("SSH_MAIN_SERVER")
	}
	stages {
		stage('Build') {
			steps {
				sh 'java ReplaceSecrets.java GOOGLE_ID_TRACKING $GOOGLE_ID_TRACKING'
				sh 'npm i'
				sh 'node --max_old_space_size=1024 ./node_modules/@angular/cli/bin/ng build --prod'
			}
		}
		stage('Deploy') {
			steps {
				script {
					REMOTE_HOME = sh (
						script: "ssh ${SSH_MAIN_SERVER} 'pwd'",
						returnStdout: true
					).trim()
				}
				
				sh "echo '${BUILD_TAG}' > BUILD_TAG.txt"
				sh "ssh ${SSH_MAIN_SERVER} 'sudo rm -rf ${REMOTE_HOME}/tmp_jenkins/${JOB_NAME}'"
    			sh "ssh ${SSH_MAIN_SERVER} 'sudo mkdir -p -m 777 ${REMOTE_HOME}/tmp_jenkins/${JOB_NAME}'"
				sh "scp -r ${WORKSPACE}/BUILD_TAG.txt ${SSH_MAIN_SERVER}:${REMOTE_HOME}/tmp_jenkins/${JOB_NAME}"
				
				sh "scp -r ${WORKSPACE}/dist/personal-website/* ${SSH_MAIN_SERVER}:${REMOTE_HOME}/tmp_jenkins/${JOB_NAME}"
				
				sh "ssh ${SSH_MAIN_SERVER} 'sudo rm -rf /var/www/html/*'"
				sh "ssh ${SSH_MAIN_SERVER} 'sudo cp -r ${REMOTE_HOME}/tmp_jenkins/${JOB_NAME}/* /var/www/html/'"
		    }
		}
	}
}
