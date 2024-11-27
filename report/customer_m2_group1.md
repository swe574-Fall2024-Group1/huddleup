## Milestone Review: 

### Deliverables
| Functional Requirements | Not Started | In Progress | Completed |
|--------------------------|-------------|-------------|-----------|
| F1                       |             |             |           |
| F2                       |             |             |           |
| F3                       |             |             |           |
| F4                       |             |             |           |
| F5                       |             |             |           |
| F6                       |             |             |           |
| F7                       |             |             |           |
| F8                       |             |             |           |
| F9                       |             |             |           |
| F10                      |             |             |           |
| F11                      |             |             |           |
| F12                      |             |             |           |
| F13                      |             |             |           |
| F14                      |             |             |           |
| F15                      |             |             |           |
| F16                      |             |             |           |
| F17                      |             |             |           |
| F18                      |             |             |           |
| F19                      |             |             |           |
| F20                      |             |             |           |
| F21                      |             |             |           |
| F22                      |             |             |           |
| F23                      |             |             |           |
| F24                      |             |             |           |
| F25                      |             |             |           |
| F26                      |             |             |           |
| F27                      |             |             |           |
| F28                      |             |             |           |
| F29                      |             |             |           |
| F30                      |             |             |           |
| F31                      |             |             |           |
| F32                      |             |             |           |
| F33                      |             |             |           |
| F34                      |             |             |           |
| F35                      |             |             |           |
| F36                      |             |             |           |
| F37                      |             |             |           |
| F38                      |             |             |           |
| F39                      |             |             |           |
| F40                      |             |             |    X       |
| F41                      |             |             |    X       |
| F42                      |             |             |    X       |
| F43                      |             |             |    X       |
| F44                      |      X       |             |           |
| F45                      |             |       X      |           |
| F46                      |             |      X       |           |
| F47                      |             |      X       |           |
| F48                      |      X       |             |           |
| F49                      |      X       |             |           |
| F50                      |      X       |             |           |
| F51                      |             |             |     X      |
| F52                      |       X      |             |           |
| F53                      |             |             |      X     |
| F54                      |             |     X        |           |
| F55                      |             |     X        |           |
| F56                      |             |             |     X      |
| F57                      |             |             |     X      |
| F58                      |             |      X       |           |
| F59                      |    X         |             |           |
| F60                      |    X        |             |           |
| F61                      |             |      X       |           |
| F62                      |             |             |     X      |
| F63                      |             |             |     X      |
| F64                      |             |     X        |           |
| F65                      |             |     X        |           |
| F66                      |             |             |     X      |
| F67                      |      X       |             |           |
| F68                      |      X       |             |           |
| F69                      |             |             |      X     |
| F70                      |             |             |      X     |
| F71                      |             |             |      X     |
| F72                      |             |             |      X     |
| F73                      |             |             |      X     |
| F74                      |             |             |      X     |
| F75                      |             |             |      X     |
| F76                      |             |             |      X     |
| F77                      |             |    X         |           |
| F78                      |             |    X         |           |
| F79                      |             |    X        |           |
| F80                      |             |    X         |           |
### Testing

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
