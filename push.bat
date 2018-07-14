git init .
git add .
git rm --cached -r -f .idea
git commit -m  "commit %time%,%date%"
git remote add -m origin qnaforum https://github.com/nagasitaramthigulla/qnaforum.git
git push -u origin master
