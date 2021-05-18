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
				sh 'node --max_old_space_size=1532 ./node_modules/@angular/cli/bin/ng build --prod'
			}
		}
		stage('Deploy') {
			steps {
				dir('dist/personal-website') {
					sh 'rm -rf /var/www/html/*'
					sh 'cp -r * /var/www/html/'
				}
		    }
		}
	}
}
