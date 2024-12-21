
## Project Overview
**HuddleUp** is an innovative social media platform tailored for building and engaging with communities. The platform fosters collaboration and interaction through structured post templates, user-driven communities, and gamified participation, creating a dynamic space for users to connect and share ideas.


### **Project Goals**  
The primary goal of HuddleUp is to create a scalable and interactive platform where users can:  
- Join and engage with communities of shared interests.  
- Build structured and meaningful posts using predefined templates.  
- Foster participation through comments, voting, and rewards (badges).  
- Empower community leaders with moderation tools to ensure a healthy and safe environment.  

### **Key Features Completed**  

1. **Community Management**  
   - Public and private communities allow users to join based on their interests.  
   - Owners can manage the structure and hierarchy of communities by assigning moderators.  
   - Moderators have robust tools to create templates, moderate content, and manage member participation.  

2. **Post Templates and User Interaction**  
   - Post templates streamline user-generated content, making it relevant and engaging.  
   - Members can upvote or downvote posts, comment on them, and engage in discussions.  

3. **Badge System (Partially Completed)**  
   - Badges incentivize activity within communities.  
   - Owners and moderators can award badges for predefined milestones or exceptional contributions.  

4. **Follow System**  
   - Users can follow other members to stay updated on their activities.  
   - Personalized feeds display posts from followed users and joined communities.  

5. **Mobile-Friendly Design**  
   - Optimized user experience for smaller screens with adaptive UI, including converting sidebars into drawers.  

---

### **Pending Requirements**  

While the core functionalities have been implemented, some critical features are yet to be addressed:  

- **F5**: *Advanced Analytics*  
   - Detailed insights into user and community activity metrics, such as post engagement, growth trends, and more.  

- **F6**: *Personalized Notifications*  
   - Implement notifications for events like replies, badges, and community updates.  

- **F37**: *Community Discovery*  
   - Build a recommendation system to help users discover communities based on their interests.  

- **F38**: *Content Moderation Tools for Owners and Moderators*  
   - Enhance content moderation, including AI-based flagging of inappropriate posts or comments.  

- **F44**: *Search Functionality*  
   - A robust search system allowing users to find communities, posts, and other users easily.  

- **F48**: *Integration of Multimedia Posts*  
   - Allow users to upload and share multimedia files like images, videos, and documents in posts.  


### **Current Technology Stack**  
HuddleUp is built using:  
- **Frontend**: ReactJS (leveraging Ant Design components)  
- **Backend**: Django  
- **Database**: PostgreSQL  
- **Deployment**: AWS  

### **Future Enhancements**  
Once the pending requirements are addressed, the platform will:  
- Offer a seamless and fully personalized user experience.  
- Provide advanced analytics and real-time updates for improved interaction.  
- Enable multimedia-rich posts and gamification, fostering even greater engagement.  

HuddleUp is well on its way to becoming a feature-rich social media platform for communities. By completing the pending requirements, it will further empower users to create, collaborate, and thrive in an interactive digital ecosystem.

## Software Requirements Specification
### 1. Functional Requirements

The functional requirements for HuddleUp focus on authentication and user management, community management, post and content management, user engagement and analytics, community and user recommendation system, and badge system.

#### 1.1 Authentication and User Management

1. **User Registration and Login**  
   - F1- Users shall be able to register using a valid email address and a strong password containing at least 12 characters, including at least one special character (*.-!@?).
   - F2-Users shall be able to log in using their email and password.
   - F3-Users shall be able to reset their password via a password recovery process sent to their registered email address.
   - F4-Users shall be able to create and edit their profile, including setting a display name, avatar, "about me" section, title/profession, birthday, living location, and profile picture.
   - F5-Users shall be able to change their nickname to a unique nickname.
   - F6-Users shall have the option to participate anonymously.

2. **User Roles**  
   - F7-The platform shall support four types of users:
     - **Non-Members/Wanderers**: Can view public content but cannot access private communities.
     - **Members**: Can access and participate in public or private communities, create posts, and comment on posts.
     - **Moderators**: Assigned by community owners to manage posts, comments, templates, and community members.
     - **Owners**: Creators of a community, who manage moderators and community settings, including ownership transfer.

3. **Profile Features**  
   - F8-Users shall be able to follow other users and see their activities on a personal feed.

#### 1.2 Community Management

1. **Community Creation and Membership**  
   - F9-Users shall be able to create a new community by providing a unique name, description, and selecting the type (public or private).
   - F10-Users shall be able to join public communities directly.
   - F11-Users shall be able to join private communities based on invitations or by submitting a join request.
   - F12-Community owners shall be able to accept or reject join requests for private communities.
   - F13-Community owners shall be able to transfer ownership to another member.
   - F14-Community owners shall not be allowed to leave the community without transferring ownership.
   - F15-Community owners shall be able to archive communities, instead of deleting them, to preserve user-generated content.
   - F16-The platform's front page shall display a mix of popular, recently active, and newly created communities.

2. **Community Roles and Permissions**  
   - F17-**Owner**: Manages the community, assigns moderators, and transfers ownership. Cannot delete communities but can archive them.
   - F18-**Moderator**: Manages posts, comments, and membership in the community. Can create and edit post templates and invite members.
   - F19-**Members**: Can create posts, comment, and interact within the community.

3. **Community Rules and Moderation**  
   - F20-Community owners and moderators shall be able to publish and edit community rules.
   - F21-Moderators shall be able to dismiss community members (excluding other moderators and owners).
   - F22-Owners shall be able to dismiss moderators.
   - F23-Owners and moderators shall be able to delete posts or comments that violate community rules.
   - F24-Owners and moderators shall be able to ban users who break community rules.

4. **Privacy and Invitations**  
   - F25-Private communities require an invitation or join request for membership.
   - F26-Community owners and moderators shall be able to invite users to join private communities.

#### 1.3 Post and Content Management

1. **Post Templates**  
   - F28-Community moderators shall be able to create community specific templates. These templates shall include:
     - **Field Name**: Describes the type of content.
     - **Data Type**: Supports W3C and XSD data types such as text, images, videos, URLs, documents, dates, geolocation, and tags.
     - **Requirement Status**: Indicates whether the field is required or optional.
   - F29-A community specific template shall only be available for the community where it is created.
   - F30-Users shall be able to create posts using a default template or community specific templates.
   - F31-The default template shall include:
     - Required field "Title" (text, max 50 characters).
     - Optional field "Description" (text, max 300 characters).
     - Optional field "Photo" (JPEG, JPG, PNG).
     - Optional field "Location" (geolocation format).

2. **Posting and Interaction**  
   - F32-Users shall be able to create posts using post templates.
   - F33-Posts shall display information such as the creator, timestamp, and upvote/downvote counts.
   - F34-Users shall be able to edit or delete their own posts, with an "edited" label displayed on modified content.
   - F35-Users shall be able to comment on posts, reply to comments, and edit or delete their own comments. Edited comments shall be labeled as "edited."
   - F36-Users shall be able to upvote or downvote posts and comments.

3. **Sorting and Filtering**  
   - F37-Users shall be able to sort posts within a community by most viewed, most commented,or date of publication (default).
   - F38-Users shall be able to view their post history and commented posts in their profile, sorted by date.
   - F40-Users shall be able to search via basic search by giving full or partial name for communities and by giving full or partial title, description, creator or created date for posts.
   - F41-Users shall be able to search via advanced search for posts by selecting the template, and the filling the fields of their choose.

4. **Content Archiving and Reporting**  
   - F42-Communities and posts, which do not include harmful content, shall not be deleted but archived to prevent loss of user-generated content.
   - F43-Offensive or harmful content shall be deleted by moderators following community guidelines.
   - F44-The system shall include a reporting mechanism for users to flag unwanted content to be reviewed by moderators.

#### 1.4 User Engagement and Analytics

1. **Activity Feed**  
   - F45-In community page, users shall be able to see the other user activities including creating posts, claiming badge, joining the community.
   - F46-Activity feed shall include how much time passed in a relative format like "2 days ago", "1 minute ago". 
   - F47-Activity feed shall include last 1 week period.

2. **Reporting System**  
   - F48-The platform shall provide reports about usage statistics, including the most crowded communities, the most upvoted and commented posts, and the most active users based on number of posts.

3. **Trending and Popular Content**  
   - F49-The system shall highlight popular communities based on having the highest number of posts in a weekly period.
   - F50-The system shall highlight popular posts based on having the highest number of upvotes or comments.
   - F51-The system shall highlight other communities to the users based on label similarity with the previously followed communities. 
   - F52-Users who do not follow any community or any user shall see both popular communities and low-engaged communities in homepage. Low-engaged communities shall be chosen randomly to avoid "The rich get richer".


#### 1.5 Community and User Recommendation System

1. **Community Tagging System**

   - F53-Community owners shall be able to create and manage tags that describe the themes, topics, or activities relevant to their community like "Technology", "Music", "Game".
   - F54-Tags shall be visible on the community profile page and searchable by users.
   - F55-The platform shall allow maximum 10 tags that a community can have.
   - F56-Name of the community tags shall not be editable.

2. **Post Tags and User Profile Updates**
   - F57-Users shall be able to add up to 5 tags when creating a post, describing the content or theme of the post.
   - F58-The post tags shall automatically be added to the profile of the user who created the post.
   - F59-When another user likes or comments on a post, the tags associated with that post shall automatically be added to their profile as well.
   - F60-Users' profiles shall display the combined tags from the communities they follow and the posts they interact with (via likes, comments, or creation), reflecting their areas of interest.
   - F61-Users shall be able to view and search for other users based on the collective tags in their profile.

3. **Community Recommendation System**
   - F62-The platform shall recommend communities to users based on the tags of the communities they currently follow.
   - F63-Community recommendations shall appear on the community discovery page, prioritized by:
     - Common Tags: Communities that share tags with the ones a user follows.
     - Popular and Active Communities: Communities with a high number of members or recent activity, filtered by shared tags.
     - Recently Created Communities: New communities with shared tags shall be highlighted for users who follow similar tags.

4. **User Recommendation System**
   - F64-The platform shall recommend users to follow based on the communities they both follow and the tags associated with their profiles.
   - F65-Users shall be able to see a “Users You May Want to Follow” section, which suggests users with:
     - Shared Community Tags: Other users who follow similar communities based on tags.
     - Mutual Follows: Users followed by people the current user already follows.
     - Top Contributors: Users who have created popular posts or comments in communities with shared tags.
   - F66-Recommendations shall be updated regularly to reflect changes in user behavior (e.g., joining new communities, following new users).

5. **Recommendation Filtering**
   - F67-Users shall be able to filter the community and user recommendations by:
     - Tag Relevance: Displaying only those recommendations that match a specific tag or set of tags.
     - Activity Level: Prioritizing communities and users with higher engagement (e.g., posts, comments, upvotes).
     - Recency: Showing the latest communities or users active within a selected timeframe.

6. **Initial Community Recommendation upon Login**

   - F68-Upon a user’s first login to the platform, the system shall display a branch of community recommendations based on various factors:
     - Popularity: Communities with the highest number of members and posts shall be displayed.
     - Recently Created Communities: New communities that have been added recently shall be highlighted.
     - Trending Communities: Communities with a spike in user activity (e.g., high rate of post creation or interactions in the past week).
     - Diverse Category Exposure: The system shall recommend communities from a diverse set of categories (e.g., Technology, Sports, Art) to encourage exploration.
     - Interest Tags: If the user has previously followed topics of interest (from sign-up or other activity), communities matching these tags shall be prioritized.


#### 1.6 Badge System
The platform shall support two types of badges, default badges and community specific badges. Default badges are the badges that the system automatically gives to the members with a certain pre-defined criteria which are common among communities. The community specific badges can be both manual and automatic.

1. **Default Badges**
   - F69-Default badges shall be assigned automatically by the system when a user meets the specific criteria for each badge.
   - F70-Default badges shall include:
     - Template Creator: Automatically assigned when a user creates 5 post templates, each used by over 100 community members.
     - Community Guardian: Automatically assigned when a user helps maintain a respectful and productive community environment through moderation.
     - Milestone Contributor: Automatically assigned when a user reaches 1,000 quality posts in the community.
     - Problem Solver: Automatically assigned when a user provides solutions to over 50 community questions with a 90% helpfulness rate.

2. **Community-Specific Badges**
   
   2.1. Manual Badges
      - F71-Community owners shall be able to create manual badges with a unique name and description.
      - F72-Community owners shall be able to assign these badges to any member of their community as a form of personalized recognition.
      - F73-Manual badges shall be unique to each community and not transferable across communities.

   2.2. Automatic Badges
      - F74-Community owners shall be able to create community-specific automatic badges by defining the following:
        - Badge Name: A unique name for the badge.
        - Description: A short description of what the badge represents.
        - Criteria: The rules or conditions under which the system will automatically assign the badge to members. The criteria shall include:
          - Number of posts
          - Number of comments
          - Number of upvotes
          - Number of locations
      - F75-Once the owner defines the criteria, the system shall automatically track the activities of the members and assign the badge when the conditions are met.
      - F76-Community-specific badges shall only be valid within the community that created them, and they will not appear in other communities.

3. **Badge Display**
   - F77-Users shall be able to view all badges they have earned, both default and community specific badges, on their profile.
   - F78-Each badge shall include its name, description, and the community where it was earned.
   - F79-Badges shall also be visible on a user’s profile when viewed by others, providing social recognition for contributions across different communities.
   - F80-The users shall be able to select top 3 community specific badges that they earned so that these badges can be highlighted near their names in all activities of the user inside the community.

### 2. System Constraints and Limitations
1. **Direct Messaging**
   - The platform shall not provide a direct messaging feature between users.
2. **Content Labeling**
   - Updated posts and comments shall be labeled as "edited" to indicate modifications.
3. **Privacy Considerations**
   - Users shall have the option to participate anonymously.
   - Community owners shall be able to define and update the privacy policy for their communities.
  
## Status of The Project

| Functional Requirements | Not Started | In Progress | Completed |
| ----------------------- | ----------- | ----------- | --------- |
| F1                      |             |             | X         |
| F2                      |             |             | X         |
| F3                      |             |             | X         |
| F4                      |             |             | X         |
| F5                      | X           |             |           |
| F6                      | X           |             |           |
| F7                      |             |             | X         |
| F8                      |             |             | X         |
| F9                      |             |             | X         |
| F10                     |             |             | X         |
| F11                     |             |             | X         |
| F12                     |             |             | X         |
| F13                     |             |             | X         |
| F14                     |             |             | X         |
| F15                     |             |             | X         |
| F16                     |             |             | X         |
| F17                     |             |             | X         |
| F18                     |             |             | X         |
| F19                     |             |             | X         |
| F20                     |             |             | X         |
| F21                     |             |             | X         |
| F22                     |             |             | X         |
| F23                     |             |             | X         |
| F24                     |             |             | X         |
| F25                     |             |             | X         |
| F26                     |             |             | X         |
| F27                     |             |             | X         |
| F28                     |             |             | X         |
| F29                     |             |             | X         |
| F30                     |             |             | X         |
| F31                     |             |             | X         |
| F32                     |             |             | X         |
| F33                     |             |             | X         |
| F34                     |             |             | X         |
| F35                     |             |             | X         |
| F36                     |             |             | X         |
| F37                     |             | X           |           |
| F38                     |             | X           |           |
| F39                     |             |             | X         |
| F40                     |             |             | X         |
| F41                     |             |             | X         |
| F42                     |             |             | X         |
| F43                     |             |             | X         |
| F44                     | X           |             |           |
| F45                     |             |             | X         |
| F46                     |             |             | X         |
| F47                     |             |             | X         |
| F48                     | X           |             |           |
| F49                     |             |             | X         |
| F50                     |             |             | X         |
| F51                     |             |             | X         |
| F52                     |             |             | X         |
| F53                     |             |             | X         |
| F54                     |             |             | X         |
| F55                     |             |             | X         |
| F56                     |             |             | X         |
| F57                     |             |             | X         |
| F58                     |             |             | X         |
| F59                     |             |             | X         |
| F60                     |             |             | X         |
| F61                     |             |             | X         |
| F62                     |             |             | X         |
| F63                     |             |             | X         |
| F64                     |             |             | X         |
| F65                     |             |             | X         |
| F66                     |             |             | X         |
| F67                     |             |             | X         |
| F68                     | X           |             |           |
| F69                     |             |             | X         |
| F70                     |             |             | X         |
| F71                     |             |             | X         |
| F72                     |             |             | X         |
| F73                     |             |             | X         |
| F74                     |             |             | X         |
| F75                     |             |             | X         |
| F76                     |             |             | X         |
| F77                     |             |             | X         |
| F78                     |             |             | X         |
| F79                     |             |             | X         |
| F80                     |             |             | X         |


# USER TESTS

| **Test Case**            | **Steps**                                                                                                                                                 | **Expected**                                                                                          | **Actual** | **Notes** | **Post-condition**                                      |
|---------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------|-----------|----------|---------------------------------------------------------|
| **1: Register**          | 1. Navigate to /register page.<br>2. Fill in the registration form.<br>3. Click "Register".                                                                  | Redirect to the login page with a success message.                                                    | True      |          | A new user is created in the database.                  |
| **2: Login**             | 1. Navigate to /login page.<br>2. Enter valid credentials.<br>3. Click "Login".                                                                              | Redirect to /feed page and user is logged in.                                                         | True      |          | The user is logged in.                                  |
| **3: Create Community**  | 1. Login as an existing user.<br>2. Navigate to /communities/new.<br>3. Fill in the form.<br>4. Click "Create Community".                                    | New community is created, and redirect to community feed.                                             | True      |          | A new community is created in the database.             |
| **4: Join Community**    | 1. Login as an existing user.<br>2. Navigate to /discover.<br>3. Select a public community.<br>4. Click "Join".                                              | User added to community as a member, and appears in user’s community list.                            | True      |          | The user is a member of the selected community.         |
| **5: Create Post**       | 1. Login as an existing user.<br>2. Navigate to community feed.<br>3. Click "Create Post".<br>4. Fill in the form.<br>5. Click "Create Post".                | New post is created and appears in the community feed.                                                | True      |          | A new post is created in the community.                 |
| **6: Like Post**         | 1. Login as an existing user.<br>2. Navigate to community feed.<br>3. Click "Like" on a post.                                                                | Post is liked by the user and like count increases.                                                   | True      |          | The user has liked the post.                            |
| **7: Follow User**       | 1. Login as an existing user.<br>2. On any of the other user’s posts click "Follow".                                                                        | User follows the selected user, and the selected user appears in the user's connection list.          | True      |          | The user is following the selected user.               |
| **8: Create Template**   | 1. Login as an owner/moderator.<br>2. Navigate to /communities/{communityId}/create-template.<br>3. Fill in the form.<br>4. Click "Create Template".          | New template is created and appears in the community templates list.                                 | True      |          | A new template is created for the community.           |
| **9: Accept Invitation** | 1. Login as an existing user.<br>2. Navigate to /invitations.<br>3. Click "Accept" for an invitation.                                                        | User is added to the community as a member, and invitation removed from list.                         | True      |          | The user is a member of the community.                 |
| **10: Delete Comment**   | 1. Login as owner/moderator.<br>2. Navigate to community feed.<br>3. Click on a post to view comments.<br>4. Click "Delete" for a comment.                    | Comment is deleted and no longer appears in the list.                                                | True      |          | The comment is deleted from the post.                  |
| **11: Edit Post**        | 1. Login as post owner.<br>2. Navigate to community feed.<br>3. Click "Edit" for the post.<br>4. Modify details.<br>5. Click "Save".                          | Post is updated with new details and appears in the community feed.                                  | True      |          | The post is updated with new details.                  |
| **12: Create Manual Badge** | 1. Login as community owner.<br>2. Navigate to community feed.<br>3. Click the “Create Badge” button.<br>4. Enter Badge Name.<br>5. Select badge type as “manual”.<br>6. Enter Badge Description.<br>7. Upload Badge Image.<br>8. Click "Ok". | Created badge will appear on the right sidebar in the community.                                     | True      |          | Created badge will appear on the right sidebar.        |
| **13: Create Automatic Badge** | 1. Login as community owner.<br>2. Navigate to community feed.<br>3. Click the “Create Badge” button.<br>4. Enter Badge Name.<br>5. Select badge type as “automatic”.<br>6. Enter parameters.<br>7. Enter Badge Description.<br>8. Upload Badge Image.<br>9. Click "Ok". | Created badge will appear on the right sidebar in the community.                                     | True      |          | Created badge will appear on the right sidebar.        |
| **14: Assign Badge**     | 1. Login as community owner.<br>2. Navigate to community feed.<br>3. On any post create “Assign Badge”.<br>4. Select Badge.<br>5. Click "Assign".            | Badge will be assigned to the owner of the post.                                                     | True      |          | Assigned badge will appear on post and user profile.   |
| **15: Edit Profile**     | 1. Login as an existing user.<br>2. Navigate to /profile.<br>3. Enter new details.<br>4. Click “Save Profile”.                                               | User profile will be updated.                                                                        | True      |          | New profile info will appear on “my profile” page.     |

