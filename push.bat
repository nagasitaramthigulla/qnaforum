git init .
git add .
git rm --cached -r -f .idea
git commit -m "@echo %time /T%,%date /T%"
git push -u origin master
