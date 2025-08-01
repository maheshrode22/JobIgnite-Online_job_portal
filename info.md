Job_Portal> npm install express ejs mysql2 dotenv body-parser ejs


create databse name ==jobIgnite

query
create databse jobIgnite;
use jobIgnite;


github setup
___________________________________

echo "# JobIgnite-Online_job_portal" >> README.md
git init
git add  .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/maheshrode22/JobIgnite-Online_job_portal.git
git push -u origin main
_______________________________

…or push an existing repository from the command line
git remote add origin https://github.com/maheshrode22/JobIgnite-Online_job_portal.git
git branch -M main
git push -u origin main

----------------------------------------------

git pull origin main
git fetch origin
git checkout job_portal

git checkout main
git merge job_portal
git push origin main

__________________________________________

✅ Extra: जर conflict आले merge करताना?
मित्राने आणि तू दोघांनी एकाच फाईलमध्ये वेगवेगळं काम केलं तर conflict येऊ शकतो. त्या वेळेस Git तुमचं manually resolve करायला सांगेल. उदा.:

bash
Copy
Edit
(mitrache code)
तो conflict resolve करून save कर, मग:

bash
Copy
Edit
git add .
git commit -m "Resolved conflict and merged"
git push origin main


_____________________________________________________________________________________________________________
// github process
https://chatgpt.com/share/688a1f30-346c-8002-9869-cfb79f131bb1