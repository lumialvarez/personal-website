pipeline {
	agent any
	tools {
        jdk 'JDK'
    }
	environment {
		GOOGLE_ID_TRACKING = credentials("GOOGLE_ID_TRACKING")
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
						script: "ssh centos@lmalvarez.com 'pwd'",
						returnStdout: true
					).trim()
				}
				//script_internal_ip.sh -> ip route | awk '/docker0 /{print $9}'
				script {
					INTERNAL_IP = sh (
						script: "ssh centos@lmalvarez.com 'sudo bash script_internal_ip.sh'",
						returnStdout: true
					).trim()
				}
				
				sh "echo '${BUILD_TAG}' > BUILD_TAG.txt"
				sh "ssh centos@lmalvarez.com 'sudo rm -rf ${REMOTE_HOME}/tmp_jenkins/${JOB_NAME}'"
    			sh "ssh centos@lmalvarez.com 'sudo mkdir -p -m 777 ${REMOTE_HOME}/tmp_jenkins/${JOB_NAME}'"
				sh "scp -r ${WORKSPACE}/BUILD_TAG.txt centos@lmalvarez.com:${REMOTE_HOME}/tmp_jenkins/${JOB_NAME}"
				
				sh "scp -r ${WORKSPACE}/dist/personal-website/* centos@lmalvarez.com:${REMOTE_HOME}/tmp_jenkins/${JOB_NAME}"
				
				sh "ssh centos@lmalvarez.com 'sudo rm -rf /var/www/html/*'"
				sh "ssh centos@lmalvarez.com 'sudo cp -r ${REMOTE_HOME}/tmp_jenkins/${JOB_NAME}/* /var/www/html/'"
		    }
		}
	}
}
