@echo off
set "ROOT_DIR=%~dp0"
"%ROOT_DIR%backend\.maven\apache-maven-3.9.6\bin\mvn.cmd" -f "%ROOT_DIR%backend\pom.xml" %*
