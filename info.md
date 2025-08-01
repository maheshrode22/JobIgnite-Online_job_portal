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

-
bash
Copy
Edit
git add .
git commit -m "Resolved conflict and merged"
git push origin main

______________________________________________________________----------------

✅ Yogya Process: Tumhi & Tumcha Mitra GitHub Var Safe Kam Kasa Karava
🔁 Step-by-Step:
🔹 Step 1: Tumcha mitr job_portal branch var kam karto
bash
Copy
Edit
git checkout -b job_portal      # Already created and working here
To push:

bash
Copy
Edit
git add .
git commit -m "Job portal changes"
git push origin job_portal
🔹 Step 2: Tumhi tumchi navin branch create kara (mahesh_branch dharun chaluya)
bash
Copy
Edit
git checkout main
git pull origin main              # Ensure tumcha main updated ahe
git checkout -b mahesh_branch    # Create and switch to new branch
Kam kela ki:

bash
Copy
Edit
git add .
git commit -m "Mahesh changes"
git push origin mahesh_branch
🔹 Step 3: Donhi kam complete zalyavar main branch var merge karne
Option 1: GitHub var Pull Request banva
GitHub la jaa → Tumcha repo → Compare & Pull Request

job_portal branch → main branch var merge

Mag mahesh_branch suddha pull request ne main var merge kara

Option 2: Locally Merge Kara
bash
Copy
Edit
git checkout main
git pull origin main             # Update main
git merge job_portal             # Merge job_portal branch into main
git merge mahesh_branch          # Merge mahesh_branch into main
git push origin main             # Push final main
⚠️ TIPS:
Situation	Command
Local branch updated, remote la push karaycha	git push origin branch_name
Remote changes ahet, local pull karaycha	git pull origin branch_name --rebase
Don branches merge karaycha	git merge branch_name
Conflicts aale tar?	Open file → fix conflicts → git add . → git commit

✅ Flow Tumcha Mitr & Tumcha Sathi:
Tumcha Mitr	Tumhi
job_portal branch var kam kara	mahesh_branch var kam kara
Push to job_portal	Push to mahesh_branch
Pull request → merge to main	Pull request → merge to main
main branch la direct kam nako	main branch la direct kam nako