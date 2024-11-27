## Milestone Review: 

### Deliverables
| Functional Requirements | Not Started | In Progress | Completed |
|--------------------------|-------------|-------------|-----------|
| F1                       |             |             | X         |
| F2                       | X           |             |           |
| F3                       | X           |             |           |
| F4                       |             | X           |           |
| F5                       | X           |             |           |
| F6                       | X           |             |           |
| F7                       |             |             | X         |
| F8                       |             |             | X         |
| F9                       |             |             | X         |
| F10                      |             |             | X         |
| F11                      |             |             | X         |
| F12                      |             |             | X         |
| F13                      |             |             | X         |
| F14                      |             |             | X         |
| F15                      |             |             | X         |
| F16                      |             |             | X         |
| F17                      |             |             | X         |
| F18                      |             |             | X         |
| F19                      |             |             | X         |
| F20                      | X           |             |           |
| F21                      |             |             | X         |
| F22                      |             |             | X         |
| F23                      |             |             | X         |
| F24                      |             |             | X         |
| F25                      |             |             | X         |
| F26                      |             |             | X         |
| F27                      |             |             | X         |
| F28                      |             |             | X         |
| F29                      |             |             | X         |
| F30                      |             |             | X         |
| F31                      |             | X           |           |
| F32                      |             |             | X         |
| F33                      |             |             | X         |
| F34                      |             |             | X         |
| F35                      |             |             | X         |
| F36                      |             |             | X         |
| F37                      |             | X           |           |
| F38                      |             | X           |           |
| F39                      |             |             | X         |
| F40                      |             |             | X         |
| F41                      |             |             | X         |
| F42                      |             |             | X         |
| F43                      |             |             | X         |
| F44                      | X           |             |           |
| F45                      |             | X           |           |
| F46                      |             | X           |           |
| F47                      |             | X           |           |
| F48                      | X           |             |           |
| F49                      | X           |             |           |
| F50                      | X           |             |           |
| F51                      |             |             | X         |
| F52                      | X           |             |           |
| F53                      |             |             | X         |
| F54                      |             | X           |           |
| F55                      |             | X           |           |
| F56                      |             |             | X         |
| F57                      |             |             | X         |
| F58                      |             | X           |           |
| F59                      | X           |             |           |
| F60                      | X           |             |           |
| F61                      |             | X           |           |
| F62                      |             |             | X         |
| F63                      |             |             | X         |
| F64                      |             | X           |           |
| F65                      |             | X           |           |
| F66                      |             |             | X         |
| F67                      | X           |             |           |
| F68                      | X           |             |           |
| F69                      |             |             | X         |
| F70                      |             |             | X         |
| F71                      |             |             | X         |
| F72                      |             |             | X         |
| F73                      |             |             | X         |
| F74                      |             |             | X         |
| F75                      |             |             | X         |
| F76                      |             |             | X         |
| F77                      |             | X           |           |
| F78                      |             | X           |           |
| F79                      |             | X           |           |
| F80                      |             | X           |           |
### Testing

#### Testing strategy

##### Backend

Automated tests: For all new features that we add on the backend, we are required to add unit tests. Unit tests are executed when a pull request is created, and a successful run of unit tests is a requirement for a pull request to be merged to a target branch.

Manual tests: Since we have configured automatic deployment on push events, we can test manually our functionality on our server right away. Any new developed functionality is tested by team members, and any bugs or errors are reported to the developer of the feature.

##### Frontend & Mobile

Manual tests: Feature related to UI are all tested manually by all the team members.

### Planning and Team Process

#### Team Process
Since Milestone 1, we have implemented several core features, including a community recommendation system, a user recommendation system, manual badges, and automatic badges (default badges and community-specific badges).

In community recommendation system, users can create tags in their posts as free texts. All the post tags belong to their community. Also, users can create tags about their interests in their user profile. According to the cosine similarity of the tags, users get community recommendations. 
In user recommendation system, user interactions are prioritized. These interactions are liking others posts and comments, getting likes from owning posts and comments, making comments to the posts and getting comments from owning posts.
In badge system, all badges are valid for the scope of the community where is earned. Manual badges can be created by community owner, and assigned to any member. Automatic badges includes default badges which are assigned to the deserved user who provides pre-defined criteria. The other automatic badge is community specific badge whose criteria can be determined by community owner and assigned to any of the community member.

These features were implemented collaboratively by all group members, ensuring coordinated progress. Developing these core functionalities has provided us with valuable insights into potential improvements. We collectively review and refine each feature as a team.

#### Plans for Final Submission
For the final submission, we plan to enhance the platform further with the following updates:

Semantic Tagging: We will add semantic labels to tags to improve the community recommendation system, as it is the system's most critical functionality. \
User Profiles: User Profiles will be introduced to provide a more meaningful user recommendation system. Profiles will also display earned badges, promoting user engagement. \
Improved Badge System: We will refine the badge system's usability by defining how badges can be accessed via the user interface. Also, we will revise them to have a specific date/time range so that earning them will be more logical. \
Mobile Features: Mobile-specific features will be added, such as the ability for users to share their GPS coordinates for map-related fields in posts, if they choose to. \

By the final delivery, we will present a fully functional HuddleUp application, offering a seamless user experience. The platform will enable users to: \
Discover communities that match their interests precisely,
Connect with users they wish to interact with more,
Earn badges that motivate engagement,
And explore many additional functional features and non-functional enhancements.
With these improvements, HuddleUp will provide an engaging, dynamic, and user-centric platform.

### Evaluation

#### Customer Feedback and Reflection

The MVP of HuddleUp has received valuable feedback from our customer, guiding our next steps. Below are the main points of feedback and our reflections on them:

#### Community Recommendation System

**Feedback:** Users appreciated the tagging feature but requested a more intelligent tagging mechanism to improve the accuracy of recommendations.

**Reflection:** We recognize the need for semantic tagging, which will add contextual relevance to tags and significantly enhance the recommendation system. This will require integrating NLP-based solutions into our backend.
User Recommendation System

**Feedback:** While users found recommendations helpful, they requested additional personalization features, such as profile-driven suggestions.

**Reflection:** We need to enhance user profiles, allowing them to store more detailed information and enabling better matchmaking algorithms.
Badge System

**Feedback:** The badge system was praised for its gamification potential but lacked clarity in terms of accessibility and duration.

**Reflection:** Improvements are required to define intuitive UI pathways for badge management and include time-bound criteria for badge validity.
Mobile Features

**Feedback:** Users showed interest in GPS-enabled post functionality, suggesting it could help discover localized content.

**Reflection:** **Implementing this feature will require careful consideration of user privacy and performance trade-offs.

#### Evaluation of Used Tools and Processes

#### Development Tools:

We used Node.js and React.js for backend and frontend development, respectively, which proved effective for iterative development. The ability to quickly prototype and deploy changes helped us respond to feedback efficiently.
PostgreSQL served as our database, providing flexibility for schema design, particularly for dynamic features like tags and badges.

#### Collaboration and Processes:

Our team adopted Agile methodologies, focusing on short sprints and regular feedback cycles. This iterative process facilitated frequent course corrections.
Code reviews were conducted using GitHub, ensuring high-quality deliverables. Automated CI/CD pipelines further streamlined deployment.
Challenges arose in integrating front-end and back-end components seamlessly, which required additional coordination and debugging efforts.
Lessons Learned and Improvements for Final Delivery

#### User-Centric Iteration:
Customer feedback highlighted the importance of iterative testing and validation of features before release. For the final delivery, we will prioritize testing prototypes with users to validate new functionalities like semantic tagging and enhanced user profiles.

#### Scalability and Performance:
Initial feedback has shown that as data grows (e.g., tags, recommendations), performance may degrade. Optimizing database queries and implementing caching strategies will be essential.

#### Clear Role Allocation:
While collaboration was strong, clearer role definitions for certain features would have reduced bottlenecks. Going forward, we plan to assign ownership of new features to specific team members for faster progress.

By incorporating this feedback and reflection into our next development phases, we aim to deliver a polished and impactful final product that aligns with user needs and exceeds expectations.

## Individual Contributions:

#### Member: Övünç Ertunç
**Responsibilities:** Feature implementation, team coordination \
**Main Contributions:** Backend and frontend parts of the user recommendation system is implemented. \
**Code-related Significant Issues:** Feature #71, Bug Fix #77, Test #78 \
**Non-code-related Significant Issues:** - \
**Pull requests:** PR #79 is created and approved by Aibek \
**Additional Information:** -

#### Member: Muharrem Ustaoğlu
**Responsibilities:** Backend feature implementations and entity modeling \
**Main Contributions:** Backend part of system automatic and community based system automatic badge. \
**Code-related Significant Issues:** Feature #65,Feature #60 \
**Non-code-related Significant Issues:** Database entity decision #45 Database entity decision #46 \
**Pull requests:** PR #70 reviewed by me. PR #80 reviewed, bug fixed, approved and merged by me \
**Additional Information:** -

#### Member: Doruk Büyükyıldırım
**Responsibilities:** Automation, Infrastructure, and DevOps Practices Implementation  \
**Main Contributions:** Infrastructure Creation, Management, and Debugging. Automate Branch Protection/ Unit Tests. Automate Deployments to Multiple Environments.  \
**Code-related Significant Issues:** Feature #13, Feature #58, Feature #59  \
**Non-code-related Significant Issues:** Feature #48,  Feature #57 \
**Pull requests:** PR #63 unit test automation & checks, PR #72 cd pipeline (automated deployment), PR #81 merge team efforts to main \
**Additional Information:** -

#### Member: Erkin Gönültaş
**Responsibilities:** Feature implementation, UI/UX Implementations \
**Main Contributions:** Frontend of the badge system is implemented. The project implemented to mobile screens. \
**Code-related Significant Issues:** Feature #71, Feature #72, Issue #56 \
**Non-code-related Significant Issues:** - \
**Pull requests:** PR #55 Mobile UI Implementations \
**Additional Information:** -

#### Member: Mustafa Tuna
**Responsibilities:** Backend and Frontend Feature Implementation \
**Main Contributions:** Backend part of the manual badge system, frontend part of the automatic badge system. Optimizing local dev environment \
**Code-related Significant Issues:** Feature #69, Feature #53 \
**Non-code-related Significant Issues:** Issue #52. \
**Pull requests:** PR #54 manual badges feature, PR #70 docker dev created. PR #55 mobile UI and PR #80 parameter based badge reviewed.\
**Additional Information:** -

#### Member: Omer Aslan
**Responsibilities:** Backend and Frontend Feature Implementation \
**Main Contributions:** Backend and frontend for user profile page where users can see other users personal info, badges and communities.\
**Code-related Significant Issues:** Feature #85, Feature #86 \
**Non-code-related Significant Issues:**  \
**Pull requests:** PR #84 includes both backend and frontend developments for user profile page.\
**Additional Information:** -

#### Member: Aibek Aldabergenov
**Responsibilities:** Backend and Frontend Feature Implementation \
**Main Contributions:** Developing the backend and frontend parts of post tagging, adding tags to user profile, and an algorithm for community recommendation to users. \
**Code-related Significant Issues:** Feature #53, Feature #57, Feature #62, Feature #63 \
**Non-code-related Significant Issues:** Decision on how to implement the database structure relating to tagging. Research on similarity calculation based on tag usage. \
**Pull requests:** PR #68, #73, #74 and #75 were created by me. #70, #72, #79 and #81 were reviewed by me. \
**Additional Information:** -


