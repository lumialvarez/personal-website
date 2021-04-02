pipeline {
	agent any
	stages {
		stage('Build') {
			steps {
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
