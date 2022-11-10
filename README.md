<!-- PROJECT LOGO -->
## IS212 SPM G6T2
<!-- Project Link: [https://github.com/redwhirl11/IS212-G6T2](https://github.com/redwhirl11/IS212-G6T2) -->
<div align="center">
  <p align="center">
    <a href="https://github.com/redwhirl11/IS212-G6T2"><strong>Project Link »</strong></a>
    <br />
    <br />
    <a href="https://github.com/redwhirl11/IS212-G6T2/actions">CI Pipeline</a>&nbsp&nbsp
    ·
    <a href="https://github.com/redwhirl11/IS212-G6T2/graphs/contributors">Contributions</a>&nbsp&nbsp
    ·
    <a href="https://github.com/redwhirl11/IS212-G6T2/graphs/commit-activity">Commit Frequency</a>
  </p>
</div>

<br>
An agile software project that uses scrum process to manage coding activities which focuses on 5 core features: 

- Users are able to select a role they want and see a list of skills required
- Users are able to see the courses they can take to acquire those skills, and add/remove them on their learning journey
- CRUD for roles
- CRUD for skills
- Assigning skills to roles; assigning skills to courses

## Built With
- [Vue][Vue-url]
- [PHP][PHP-url]
- [SQL][SQL-url]
- [Bootstrap][Bootstrap-url]


## Prerequisites

1. You will need [Node.js](https://nodejs.org) version 18.0 or greater installed on your system.

2. Clone the repository to your local WAMP/MAMP directory by typing the following into your console:

```
git clone https://github.com/redwhirl11/IS212-G6T2
```

3. MySQL/phpMyAdmin Set Up
  - i. Start up your WAMP/MAMP
  - ii. Go to http://localhost/phpmyadmin/ > Login > Import
  - iii. "Choose File" to import and select "spmg6t2.sql" (under the IS212-G6T2 folder)
  - iv. Click "Go" to run the sql   
  
<br>
## Getting Started
Make sure you have an up-to-date version of [Node.js](https://nodejs.org) installed, then run the following command in your IS212-G6T2 directory's command line:

### install packages

```sh
npm install
```

### Start a Node development server.

```sh
npm run dev
```

It will return you a <b>Local</b> Link after a few seconds. 
<b>Ctrl + Click</b> on the link, the application will open automatically in your browser.

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

## Folder Structure
| Files | Role | Purpose | Features | 
| ------------- | :-----------: | ------------- | ------------- |
| UserLogin.vue | both Learner & HR | User Landing Page  | Login with respective role |
| hrHome.vue | HR | HR Landing Page  | Select tasks to perform (Edit Roles / Edit Skills) |
| LJHome.vue  | Learner | Learner Landing Page  | View their Learning Journey with the roles, skills and courses that they have planned  |
| LJrole.vue  | ^^  | View and Select Role  | View and search all the available active roles |
| createLJ.vue  | Select Course   | Learner can choose the courses that they are interested in |
| editLJ.vue  | Update Course(s) selected  | Learner can update the course(s) that they have previously planned in their Learning Journey |
| hrRole.vue  | View Roles | HR can view both active and inactive roles under different tabs |
| hrCreateRole.vue  | Create Roles  | HR can create new role |
| hrEditRole.vue  | Update Roles | HR can update the data of the existing roles |
| hrEditDeletedRole.vue  | Edit Soft Deleted Role | HR can reopen the soft deleted roles |
| hrSkill.vue  | View Skills | HR can view both active and inactive skills under different tabs |
| hrCreateSkill.vue  |  Create Skills | HR can create new skill |
| hrEditSkill.vue  | Update Skills | HR can update the data of the existing skills |
| hrEditDeletedSkill.vue  | Update Soft Deleted Skill | HR can reopen the soft deleted skills  |


## Vue Project Structure
| File | Purpose |
| ------------- | ------------- |
| UserLogin.vue | User Landing Page  |
| hrHome.vue | HR Landing Page  |
| Content Cell  | Content Cell  |

- database: public --> db
- main pages: src --> views
- components: src --> components
- declare routing path: src --> router --> index.js

## Clarifications on XXXX



## Contact
Chua Kai Wei -  kaiwei.chua.2020@scis.smu.edu.sg</br>
Earnest Ho Jay En - earnestho.2020@scis.smu.edu.sg</br>
Lam Suet Li - suetli.lam.2020@scis.smu.edu.sg</br>
Lim Zhan Li - zhanli.lim.2020@scis.smu.edu.sg</br>
Neo Fang Ting - ftneo.2020@scis.smu.edu.sg</br>
Tang Jing Wen- jwtang.2020@scis.smu.edu.sg</br>


<!-- MARKDOWN LINKS & IMAGES -->
[Vue-url]: https://vuejs.org/
[Bootstrap-url]: https://getbootstrap.com
[PHP-url]:https://www.php.net/downloads.php
[SQL-url]:http://localhost/phpmyadmin/
