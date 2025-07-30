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

Here's the complete process for two developers (you and your friend) to work on separate branches and merge both into the main branch without conflicts.

🧠 PREREQUISITE:
Both of you have the same GitHub repository cloned.

Main branch is named main.

🧑‍💻 Developer 1 (You): mahesh-feature
1. Create your branch and switch to it
bash
Copy
Edit
git checkout -b mahesh-feature
2. Work and make your changes, then stage and commit
bash
Copy
Edit
git add .
git commit -m "Mahesh feature done"
3. Push your branch to GitHub
bash
Copy
Edit
git push origin mahesh-feature
👨‍💻 Developer 2 (Friend): friend-feature
1. Create and switch to their own branch
bash
Copy
Edit
git checkout -b friend-feature
2. Work, then commit and push
bash
Copy
Edit
git add .
git commit -m "Friend feature done"
git push origin friend-feature
🔀 Merge Both Branches into main
Step 1: Merge mahesh-feature into main
bash
Copy
Edit
git checkout main
git pull origin main
git merge mahesh-feature
git push origin main
Step 2: Now Friend pulls updated main
bash
Copy
Edit
git checkout main
git pull origin main
Step 3: Merge friend-feature into updated main
bash
Copy
Edit
git merge friend-feature
git push origin main
🧼 Clean Up (Optional)
After merging, you can delete feature branches:

bash
Copy
Edit
git branch -d mahesh-feature
git branch -d friend-feature

git push origin --delete mahesh-feature
git push origin --delete friend-feature
📊 Visual Summary (Branch Diagram)
text
Copy
Edit
main
 ├── mahesh-feature → merge → main
 └── friend-feature → pull updated main → merge → main
📌 Final Note:
Always do git pull origin main before merging anything into main.

Use git status often to avoid mistakes.

Let me know if you want the same process using GitHub Pull Requests (PRs) or GUI tools like GitHub Desktop.









Ask ChatGPT
