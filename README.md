# ⏱️ TimerX — Free Online Timer Web App

TimerX is a clean and responsive **online timer web application** built with **HTML, CSS, and JavaScript**.  
It supports countdown timers, quick timer buttons, alarm sounds, volume control, and a reminder message popup.

---

## 🚀 Features

✅ Start / Pause / Reset timer  
✅ Quick timer presets (1 min, 5 min, 10 min, …)  
✅ Shows estimated end time  
✅ Count Up mode option  
✅ Alarm sound options  
✅ Adjustable alarm volume  
✅ Alarm duration selector  
✅ Reminder message popup when timer finishes  
✅ Fully responsive UI

---

## 🧰 Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Deployment:** Docker + Nginx
- **CI/CD:** GitHub Webhook → Jenkins → DockerHub → AWS EC2
- **Cloud:** AWS

---

## 📁 Project Structure

```bash```
timerx-webapp/
├── index.html
├── style.css
├── script.js
├── Dockerfile
├── Jenkinsfile
└── README.md

🖥️ Run Locally (Without Docker)
Just open the file:

```bash```
Copy code
index.html
OR use a simple server:

```bash```
Copy code
python3 -m http.server 8080
Then open:

```arduino```
Copy code
http://localhost:8080

☁️ AWS + Jenkins CI/CD Deployment (Step Summary)
✅ Tools Used
GitHub Webhook

Jenkins Pipeline

DockerHub (latest tag)

AWS EC2

Nginx (inside container)

✅ Pipeline Flow
Push code to GitHub

GitHub webhook triggers Jenkins pipeline

Jenkins builds Docker image

Jenkins pushes image to DockerHub (latest)

Jenkins SSH into EC2

EC2 pulls latest image

Container restarts with updated app

