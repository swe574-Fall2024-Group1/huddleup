### Software Requirements Specification: [SRS](https://docs.google.com/document/d/1hnuMbitSzb_vdQ4_ygvQ9weSAMKnsHUE1DyNN3DpwTY/edit?usp=sharing)

### Software Design:

### Scenarios and Mockups: [Scenarios and Mockups](https://github.com/swe574-Fall2024-Group1/huddleup/wiki/Scenarios-&-Mockups)

### Project Plan:

### Communication Plan: 


#### Version Control Standards
##### Branching Strategy
###### Main Branch (main):

The main branch is always in a deployable state. Only stable and tested code should be merged into this branch.

###### Development Branch (dev):

Use a develop branch for integrating features. This branch is where development occurs and is used to prepare for the next release.

###### Feature Branches:

Create a separate branch for each feature or bug fix. Use the following naming convention:
```
feature/<feature-name> 
bugfix/<bug-name>
```
Example: 
```
feature/user-authentication
bugfix/fix-login-error
```

##### Commit Message Standards

Commit messages should be clear and concise, following the format:
```
<type>: <description>
```
Example: 
```
feat: add user authentication
```
For reference, the following types can be used:
- feat: a new feature
- fix: a bug fix
- docs: changes to documentation
- style: formatting, missing semi-colons, etc; no code change
- refactor: refactoring production code
- test: adding tests, refactoring test; no production code change
- chore: updating build tasks, package manager configs, etc; no production code change
- ci: changes to CI configuration files and scripts
- perf: a code change that improves performance
- build: changes that affect the build system or external dependencies
- revert: reverts a previous commit
- security: changes that address security issues

##### Pull Request Standards

When creating a pull request, follow these guidelines:
- Assign at least one reviewer to the PR.
- Provide a clear and concise title and description.
- Include a reference to the issue the PR addresses.

#### Communication Tools

- Discord: #group-1 channel for customer communication and team discussions.
- GitHub: For code reviews, issue tracking, and project management.

#### Meeting Schedule
- Weekly team meetings: Every Tuesday at 19:00 (GMT+3) to discuss progress, issues, and upcoming tasks.

#### Conflict Resolution
- In case of conflicts, the team will discuss the issue and reach a consensus.
- If a resolution cannot be reached, the team will vote on the resolution.

#### Coding Standards

##### Backend:

- Follow the PEP 8 style guide for Python code. Reference: https://pep8.org/
- Use descriptive variable and function names.

##### Frontend:
- Follow the Airbnb JavaScript style guide. Reference: https://github.com/airbnb/javascript 

### Responsibility Assignment Matrix: 

| **Task**                              | **Aibek**   | **Doruk**   | **Erkin**   | **Muharrem**   | **Mustafa**   | **Ömer**   | **Övünç**   |
|---------------------------------------|----------|----------|----------|----------|----------|----------|----------|
| **Requirements Gathering**            | R        | R        | R        | R        | R        | R        | R        |
| **Project Planning**                  | C        | R        | C        | C        | C        | R        | R        |
| **System Design**                     | A        | A        | A        | A        | A        | A        | A        |
| **Frontend Development**              | C        | A        | R        | A        | C        | C        | A        |
| **Backend Development**               | R        | A        | A        | R        | R        | C        | C        |
| **Database Design**                   | R        | A        | C        | R        | R        | R        | C        |
| **Testing and QA**                    | I        | I        | I        | I        | I        | A        | I        |
| **Code Review**                       | R        | R        | R        | R        | R        | R        | R        |
| **Deployment**                        | A        | R        | C        | C        | C        | A        | A        |
| **Documentation**                     | A        | R        | A        | A        | A        | R        | R        |
| **Progress Reporting**                | C        | C        | C        | C        | C        | R        | R        |

Legend \
R: Responsible (the person who does the work) \
A: Accountable (the person ultimately answerable for the task) \
C: Consulted (provides input and expertise) \

### Weekly Reports and Meeting Notes:

#### Week 1: Project Initialization and Repository Setup

During the first week, we created a new GitHub repository to serve as the foundation for our project. We established repository rules to maintain a structured workflow, focusing on how to handle pull requests and merges. After thoroughly reviewing the project proposals from each team member, we unanimously agreed to move forward with Ömer's project, Huddleup, a community-building platform. This project will be the basis for our development moving forward.

Action Items:

Open new GitHub repository for the project.
Define repository rules for pull request (PR) merging.
Review all project proposals and finalize project selection (Huddleup).

#### Week 2: Requirements Merging and Task Assignments
In the second week, the team discussed how to handle project requirements. We decided to combine requirements from all team members, removing any duplicates to create a consolidated set. Additionally, we focused on the upcoming assignment, which involves creating mockups for the new requirements. The team discussed the requirements and organized tasks into action groups for efficiency.

Action Items:

Group 1 (Ömer and Muharrem): Merge requirements from all members and eliminate duplicates.
Group 2 (Erkin & Doruk): Create mockups based on the merged requirements.
Group 3 (Ovunc & Aibek): Formulate new requirements and draft elicitation questions after Group 1 completes the merging.


#### Week 3: Discussion on Recommendations and Badges, Task Assignments

In the third week, we had an in-depth discussion about how to approach the recommendations and badges features. Each team member shared their thoughts and contributed ideas for these functionalities. We created issues for the new requirements identified during the meeting. Aibek and Doruk were assigned to focus on the deployment and containerization of the project, ensuring the software can be easily deployed in future iterations. The remaining team members were assigned tasks related to developing the new requirements and brainstorming additional ideas.

Action Items:

Open issues for new requirements.
Aibek and Doruk: Focus on deployment and containerization of the project.
Other members: Work on new requirements and contribute ideas for future development.

#### Week 4: Demo Preparation and Mockup Development

This week, the focus shifted to preparing for the upcoming demo. The team emphasized creating detailed and genuine mockups that effectively showcase our ideas and help gather valuable feedback from the customer. Since the recommendations feature had not yet been finalized, we prioritized the badges and other new requirements. Tasks were divided among members to create mockups and ensure they were included in the customer presentation. Aibek and Doruk ensured that the deployment was fully functional for the demo.

Action Items:

Create and finalize mockups for the customer presentation.
Doruk and Aibek: Ensure a working deployment for the demo.
Task breakdown for mockups:
User Profile (Tags) – Ömer
Activity Feed (ali joined, owner pinned, badge rewarded) – Mustafa
Manual badges by owner – Erkin
Badges: Predefined criteria by owner – Muharrem
Automatic Badges: Predefined criteria by system – Övünç

#### Week 5: Preparation for Milestone 1 and Task Assignments

In the fifth week, we discussed the upcoming first milestone and the deliverables due, including the project report and pre-release. With the deadline approaching, we emphasized the importance of starting the coding process alongside preparing the report. Tasks were assigned for both the report and coding work to ensure we meet the requirements for the submission on time.

Action Items:

Aibek: Arrange the backend and write instructions for how to run the project locally, enabling all members to contribute.
Övünç: Finalize the requirements by adding missing elements from the previous term and new requirements, and list all potentially needed new endpoints. Add this to the project report.
Muharrem: Write the Scenarios and Mockups section for the project report.
Mustafa: Write the Communication Plan section for the project report.
Ömer: Write the Weekly Reports, Meeting Notes, and Milestone Review sections for the project report.
Doruk: Prepare the Software Design section for the project report.
Everyone: Share UML diagrams with Doruk for inclusion in the report.
Erkin: Make existing pages mobile-friendly and write the Responsibility Assignment Matrix section.
Everyone: Complete the Individual Contributions section for the report.


### Milestone Review: 

At this point, we believe we are in a strong position, having successfully covered most of the requirements from the previous term. Although we started coding the new features a bit later than anticipated, we are confident that we will be able to deliver them on time. A significant portion of our efforts this week was dedicated to preparing for the next stage of development, including migrating our database from MongoDB to PostgreSQL and ensuring the existing frontend is mobile-friendly.

For this milestone, our focus has primarily been on the badges system and user activity features. However, we have yet to fully address the recommendation requirements, which remain unclear. We acknowledge that this aspect needs further consideration and refinement in the upcoming development phase to better meet the project's needs and expectations.

Pre-release Version of Software: # Release version needs to be indicated

### Individual Contributions:

#### Member: Övünç Ertunç
**Responsibilities:** Reviewing the contributions and project maintanence. Supporting devops practices and backend feature implementations. \
**Main Contributions:** Creating scenarios and mockups for badges. Adding new requirements about new functionalities (Recommendation, tags, badges, community statistics). \
**Code-related Significant Issues:** - \
**Non-code-related Significant Issues:** I created requirement elicitation questions and we asked them to the instructor and then finalized our thoughts. \
**Pull Requests:** - \
**Additional Information:** I configured PR rules to prevent merging to main branch without any approval.

--

#### Member: Muharrem Ustaoğlu
**Responsibilities:** Designing database entity relationship and backend feature implementations. \
**Main Contributions:** Creating scenarios and mockups for badges, recommendations and tags(Wiki page Scenarios & Mockups). Reviewing old requirements to merge news requirements. \
**Code-related Significant Issues:** - \
**Non-code-related Significant Issues:** Designing Entity relationships to develop newly added features such as badges, recommendations and tags. \
**Pull Requests:** - \
**Additional Information:** -

--

#### Member: Ömer Aslan
**Responsibilities:** As the primary contributor to the Huddleup project, onboarding team members and ensuring they understand the existing project structure. Main duties involve writing and refactoring backend APIs. \
**Main Contributions:** Onboarding team members and addressing backend-related questions. Writing and refactoring backend APIs to support new features. \
Merging requirements from all members and ensuring consistency. Assigning action items to team members during meetings. \
**Code-related significant issues:** Contributed to backend development and API refactoring. \
**Non-code-related significant issues:** Led the effort to merge requirements from different team members. Find and list the incomplete requirements. Designing of user profile page and badges section. \
Provided support on non-code-related queries regarding project structure and workflow. \
**Pull requests:** Created and merged PR #11, restructuring APIs and database queries. \
**Additional Information:** -

--

#### Member: Erkin Gönültaş
**Responsibilities:** Overall frontend and mobile development of the project.  \
**Main Contributions:** Addressing frontend-related questions. Providing consultation for both frontend and mobile development process plans. Creating scenarios and mockups for the new features.   \
**Code-related significant issues:** - \
**Non-code-related significant issues:** Decision making process about creating a mobile version of the project. \
**Pull requests:** - \
**Additional Information:** -

#### Member: Mustafa Tuna
**Responsibilities:** Developing backend features and supporting the frontend development. \
**Main Contributions:** Writing the Communication Plan section for the project report. Creating mockups for the activity feed. Converting the existing pages to be mobile-friendly. \
**Code-related significant issues:** - \
**Non-code-related significant issues:** - Decision-making process about refactoring the existing pages to be mobile-friendly. \
**Pull requests:** - \