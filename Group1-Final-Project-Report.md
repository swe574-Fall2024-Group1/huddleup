
## Project Overview
**HuddleUp** is an innovative social media platform tailored for building and engaging with communities. The platform fosters collaboration and interaction through structured post templates, user-driven communities, and gamified participation, creating a dynamic space for users to connect and share ideas.


### **Project Goals**  
The primary goal of HuddleUp is to create a scalable and interactive platform where users can:  
- Join and engage with communities of shared interests.  
- Build structured and meaningful posts using predefined templates.  
- Foster participation through comments, voting and rewards (badges).  
- Empower community leaders with moderation tools to ensure a healthy and safe environment.  

### **Key Features Completed**  

1. **Community Management**  
   - Public and private communities allow users to join based on their interests.  
   - Owners can manage the structure and hierarchy of communities by assigning moderators.  
   - Moderators have robust tools to create templates, moderate content and manage member participation.  

2. **Post Templates and User Interaction**  
   - Post templates streamline user-generated content, making it relevant and engaging.  
   - Members can upvote or downvote posts, comment on them and engage in discussions.  

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

## User Manual

### Login/Registration

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXdbzdGE-Ahqi9dgC2cQ9G8W_gw7ZmpsCpYzOV769bS0mYWYOoY64dIfkVhZTsU_hQ8bK7xusk7DmSAj4wNGtycggT4wHqL0F7NZxNU2BX0ypFWmRSBb59AL_MXHFb40ntOHsRnZGg?key=dx79Gw4fEyrn_YTVtN9O-U8a)

On the Login Page, If the user has an account, he/she can log in by entering his/her username and password. If he/she does not have an account, he/she can go to the registration page by clicking the Sign Up button.

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXctsedmMB41YF5kS_DaxTlY4Pvae_pP-M-261mtjNkNFkGWpVM3tKrma0_UCTfkA1y9n3j_MLuv7EJUrNGWglXseytRflopbHDn5i_dPebZO2KmUJcN28TQ6jitK11Vl9Q2Nqh9eQ?key=dx79Gw4fEyrn_YTVtN9O-U8a)

On the Register Page, User can register by entering username and password.

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXfpi3WBOJ6QXwxvtx6Z5Kpw1CbQCCUVdhJ_cToxRp85nkTvD44239SvQ582IhBzAG5oECEt9v-kHBJOViAtncl9HZkPXq6jAfFElawUyYHbjWMi1--XGy43o66Kcuw41DvQQaim?key=dx79Gw4fEyrn_YTVtN9O-U8a)

After Registration, On the Login page User can enter username and password to enter application.

### Main page

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXdU5ZqmMK_UtvVAZIEr_prR5JTop91y6G5jKm0cbZl4lLbEXPOfDulzNyrl3ylk99gp40rFQ0U__8P7tl8LPd8gfQbL4AVXnpFsgyLlsbjdysTt-ZcNROpoP-TMDFfSy0B-c8wi?key=dx79Gw4fEyrn_YTVtN9O-U8a)

After login user will see the most active and some promoted communities in his/her feed if there is no post yet.

User can use the left-side menu to navigate:

- Click Feed to view posts from communities and connections.
- Click Connections to manage his friends and followers.
- Click Communities to explore or manage his communities.
- Click Invitations to view pending invitations.
- Click Discover Users to find and connect with new users.

User can use the search bar at the top of the page to search for specific users or communities.

### Create Community

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXdlgU-lbrUMpZ7uhQzXMw3H2jPPJY34BjYppqPiJ8TbzUKYZXjLoZjNL8ogIwgmOW_1avkl1OSEShhOYIAsUyqpuIZ6JA6bsdN9TqZ9hbC1VsHj7UuiCR-1yzPA9xgpIJrU1BA1SA?key=dx79Gw4fEyrn_YTVtN9O-U8a)

User can click Start Community from the left-side menu.

Fill in the required fields:

- Enter a Name for your community.
- Add a brief Description about the purpose of the community.
- Upload an image for the community by clicking Choose File.
- (Optional) Toggle the Make this community private switch if user want the community to be private.

User can click the Create Community button to finalize the setup.

Community Page![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXc9i7Fgvbrq4KF-ZMuaesi98I0yjI77edJby8yOsfALER6rCK4LqSgYV8n1VZtIybZ2bv5_OgzM24n2s6auTSbKUKEO97OhS5DSt3L1R5RE8xA5MVHyLO3c3LzkjFYgwBoO2s-w?key=dx79Gw4fEyrn_YTVtN9O-U8a)![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXdMASQkbgacT_NQUy3exdC81voSHiIazAweHYyuJtHun54nHrXKNKVBx-bEDxKC349BCELzJbVG3Y90Vtpp4GYp-MfB0zE7qcOijdxw05lhC8lOuLX32B72bIZM6YUdhimHKKw17Q?key=dx79Gw4fEyrn_YTVtN9O-U8a)

On the community page, user can:

- Click Add Post to share content.
- Click Create Badge to design and assign badges for members.
- View the Community Activity Feed to see recent actions within the group.
- Check the Description section for details about the community.
- Explore the Badges section to see all available badges.

### Community Setting

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXecFQLeFFrnUPNShC4nkcMjwXmTpvMSoj4JEsHoBVlj_HP9oHsO-BOoPQorJPc8bpFnkQNM6QiuO8eSvxNIyaEMJc143HFONZc6-huFidoIiVR_BEE1mcL3oNyVss7ATY8OFFyH?key=dx79Gw4fEyrn_YTVtN9O-U8a)

Within the community page, click Community Settings in the right-hand menu.

User uses the following options:

- Click + Add Template to create a new template for organizing data submissions.
- Click Delete next to any existing template to remove it.
- Click Archive Community to deactivate the community if needed.

### Adding Template

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXc4T8vP6hMg88JBdHuDAJ1Rqvb7lj637y0vS3RPmBndBs37V_eF6Cig0CBw_4l-09XoQeHnLdv-Anusaoa5P5e9ChI0RNoOZU3MEY-k5Jl8gde97_dL1A3dSdr4ao5Cp59-p1qG?key=dx79Gw4fEyrn_YTVtN9O-U8a)

In the Community Settings, click + Add Template.

Enter a Template Name (e.g., “Exchange Books”).

Add data rows:

- For each row, select a data type (e.g., Text, Geographic Location) from the dropdown.
- Mark fields as Required if applicable.

Click Create to save the template.

### Add post

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXcom8yQceyEzmujvcFnAkYQ2XLx1VC0Cq-ww8OiH6VgOpM5h2_kVwAQ67_TE05iK-FIX8lNtqtFP9kKo1-8LJIK9oU2lSNBsQ_nJTJmwTNLpF5q7KjT_QzgWdiSRwWcXetVLRTDcQ?key=dx79Gw4fEyrn_YTVtN9O-U8a)

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXfAeOlbOwbhlJ-8b72m8XmqYRmM5HCITxXIsM57NYCNbBx7WxbSMHAyiuuOuuaUwk3_Qgq2HRMA4P6qB8xpa6zHxTCiKcYmZDP1X2zT8PmLRQ25zoLMQAVBvLiDPwYXBiGF2Ebo?key=dx79Gw4fEyrn_YTVtN9O-U8a)

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXeVg8PhYCvhkKww2e4lfIfB4YhtjIYG2sxurgP60j4P7uXyl92kOV07znuMERBtYs1Lf-C_dIN_6JdqsxhVOP-3EQ9PJLCl9AeidXvUNFFWrrqPrHR3eXo66tLkvaEMkaD-JViYEQ?key=dx79Gw4fEyrn_YTVtN9O-U8a)

Start Adding a Post

- On the community page, click the + Add Post button.
- Select a template from the dropdown list (e.g., "Exchange Books").
- Click Next to proceed.

Fill in Post Details

- Enter the required details in the template fields (e.g., Place Name, Genre, and Location).
- Use the map to pin a geographic location:

- Drag and drop the pin.
- Or, click Use Current Location to auto-fill your coordinates.

- Click Submit to publish the post.

### Editing a Post

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXcBWwMpJ7aXsUL9uMh8KH6ZJefzQ0Ce52Z5Q7Zq2FgDJN9KwhPk94Zgr1tnS9j2K6l5sqE21n_UeBPASNvjfrqC_f0w-Dd7GVfbFQMKbuaJax_OwGfO7uNQlvjlryJX5dUGmV1CVw?key=dx79Gw4fEyrn_YTVtN9O-U8a)![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXd39U48GfQh6rsZYMtTmHBb3CiXNc2REKeZQTbiI4cM6WAHXpGudRcgwWfD21v4Vwu9a8g5zwrQdsvtSRoXfOk3q4xTwqXLpjNK-x2QQ_KnVApdTLLsK6qWGTD4yPwjC9mjtYx9?key=dx79Gw4fEyrn_YTVtN9O-U8a)

Start Editing

- Click the Edit Post button associated with the post.
- Update any fields, including text or location:

- Adjust the map pin for a new location if needed.
- Modify other details like the title or description.

Save Changes

- Click Update Post to save your edits.
- Verify the updated content on the community page.

### Adding a Comment

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXcjIcNFHzRhQDqRgCqxAlbDzT4hMe3JVC6IzSquOPzMyAv6GSdhz02ouCsKGuziW6gXSr7PxuTSnASeo9tjBrVBtLwR8adG2jlBXMw5AtHUraRGNy8Lbf3Bu_EuQsD8G2aQtTahcQ?key=dx79Gw4fEyrn_YTVtN9O-U8a)![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXcdHu1Uy8lHOVkGyVOpGOhiDdc69retf16634eU5Zq2qMJgnnCN523d-J-hTLKNbbmecSittFP3Wtpqg9hjSbgx5YflhR6F1xM3QDs78GWQ0ApV2GhxAbuX80xM-pFf0Dr0H5_S?key=dx79Gw4fEyrn_YTVtN9O-U8a)

- Scroll to the comments section of a post.
- Type your comment and click Add Comment.

- Click the Edit Comment button next to your comment.
- Update the text in the popup box (e.g., "I will bring Dune books (edited)").
- Click Save to confirm the changes.

### Editing Comments

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXcOAnZhQole0QeYZX2rEd_l7jscoNj3sMG8BQRkRnKIuoBtjvHCMMnCtJNtrZRODy4tP-Tw1MdtpkeS_gXCXV6dQ83yXXmJOZUXCcvAMqG_lvggP8pdRm-tIKfHNJtlKMq6VZv61g?key=dx79Gw4fEyrn_YTVtN9O-U8a)![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXe7XH8jHDx6xhwPphNM3xK0ZNa2J_j7zrr-VhE4oBEQYCxWbnroAKsjBIel9HHQV79YRBx6VUxakbkMJfv7IvhoVMrznWId0FGsbPlyMs6TO8FszDlLTkJcAzb2nZauO9zCCI2qLA?key=dx79Gw4fEyrn_YTVtN9O-U8a)

- Click the Edit Comment button below the comment.
- A dialog box will appear with the current comment text.
- Modify the text as desired.
- Click the Save button to update the comment.
- A confirmation message, such as "Comment edited successfully," will appear, indicating the update was successful.
- Update the text in the popup box (e.g., "I will bring Dune books (edited)").

### Upvoting/Downvoting a Comment or Post

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXe5mRpvWwDeDaTKsK_jK5E_5W0Ss05akhyxrHg9-mFu60ioElFlaq9Z_0KyGXDhWSOUxaPl7lpoJEUJQFLw3ZS9oH-nStjNvzI7YxZMG3j31NmqRaSRwq_qEn8CcayqTl5FuR_2?key=dx79Gw4fEyrn_YTVtN9O-U8a)

- Navigate to the post or comment you want to interact with.
- To upvote, click the thumbs-up icon.
- To downvote, click the thumbs-down icon.
- The vote count will update immediately after your action.

###  Managing User Settings

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXepXAaIW2V33cPEXxwCHZCYHLtI2RELvIm52N833zFBprJiWSUvazBEcDyCGavg0eVL_GedbxnWntDkXkK1hNnWjOMx7yj1gC4W0m1Pyf_tWOHw1xTzXfCipD1WWMusEt8DZ8LbXw?key=dx79Gw4fEyrn_YTVtN9O-U8a)

- Go to the User Settings section.
- Click the user for whom you want to manage settings.
- Available actions include:

- Ban: Restrict the user from participating in the community.
- Make Moderator: Grant moderator privileges to the user.
- Make Owner: Transfer ownership of the community to the user.

### Managing Moderator Settings

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXeGy8e93X2YG4wfo2TAAzp1optvZ_MOg-YdZaZMHZTD6unxDe_lpRU60PkWnnCiku6i4lkDYTNhftxNz5Klgp67Ha-QCTyC1v9Vq3_Z6GretNT1U0SwKADvxV-dZqQQvYKr9Nkrwg?key=dx79Gw4fEyrn_YTVtN9O-U8a)

- Navigate to the Moderator Settings section.
- Select the moderator you want to manage.
- Click the Remove Moderator button to revoke their privileges.

### Creating a Manual Badge

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXcG62eFIOxFS1jHvS5C-BZxZeXhhn2N7gWsheTgmDyIhU0uWFFy0tGJtOLf2SLuXZ9HLUtIK2VUVaa3Bvw8WgfScQQIbtTwIRLpWpSSqsq1lE-ffWWGc_LQ0eEbVVS-ACBQbiUBlg?key=dx79Gw4fEyrn_YTVtN9O-U8a)

- Click the Create Badge button.
- In the dialog box:

- Enter the badge name in the Badge Name field.
- Set the badge type to Manual.
- Write a description in the Badge Description field.
- Upload an image for the badge using the Upload button.

- Click the OK button to create the badge.
- The new badge will appear in the list of existing badges.

### Assigning a Badge

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXe8rBGlSaR57bAAT8W9WKpn8-kE7NZRpLcTaoof4bnLkF4CwBxdqCx81Hw5cQe0Fk-MbMe11YINv9mT2HkXN5qhvJ7ELXhS4NW0YdQaPvbaT0mEuaCangfsQKZNnMW0b6xHt3QSgA?key=dx79Gw4fEyrn_YTVtN9O-U8a)

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXeEA-3ii_jRija5n0EkNeFIBYJENucUn8rkKRgNRt8F8oOvmM6cgz7ZrDMuL67fJztQFqtIU6-95QH6pDwRgBi_xWzje9JY1IdTZg2TVE_O08uS-y-8D6yjRVNtZBTNpzZKoACrZw?key=dx79Gw4fEyrn_YTVtN9O-U8a)

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXct9hGIAkcdmeabEXW4ptNChUcAD5NeJACoamnVy438NFdYSaaz8HuvL6cO749AVrJV82PVUBATXMyk0Vdj-9UZZyPaJNzwQdXyA9Z5vRC4yve9vUPydp9RvhreAoVvSYJ6LiMhcA?key=dx79Gw4fEyrn_YTVtN9O-U8a)

- Click the Assign Badge button next to the relevant post or user.
- In the dialog box:

- Select a badge from the dropdown menu.
- Optionally, add a message in the Message field.

- Click the Assign button.
- A confirmation will appear, and the badge will be displayed with the user’s profile and post.
### Creating an Automatic Badge

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXf-pgAZ8km-OT1Gs0n4MDo0A0Q2S3MZJbgTkiM3G4kjvA2odjewKc3s46V3Kpd_uKtARhLJR_vxrVSroUY-pDtgyj1GncVbLwqgl_x5BEkiZY0nnf_1-qEGtaABqiJOy1b2-ufs?key=dx79Gw4fEyrn_YTVtN9O-U8a)

- Click the Create Badge button.
- In the dialog box:

- Enter the badge name in the Badge Name field.
- Set the badge type to Automatic.
- Configure criteria such as Template Count, Post Count, Follower Count, Comment Count, and Like Count.
- Add a description in the Badge Description field.
- Upload an image for the badge using the Upload button.

- Click the OK button to save the badge.
- The system will automatically assign the badge when users meet the defined criteria.

###  Seeing Recommending Users and Connecting with Them

- Click the Discover Users in left sidebar
- The recommended users based on interests are listed

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXdGy2CJFfPVx9MIpYCHZIIRPoG836fChjaOe9v91VByerc87FUOlG_9r32bZ29XKqiUoXaaj5Y0fXgE6TKG2Oal8tEvz_VJZxbwHuT1d_62nGgJ8GL27ziygb1mtIAqcwLLpuD8gw?key=dx79Gw4fEyrn_YTVtN9O-U8a)

- Follow the user via clicking the Follow button

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXfp1t4gOsvlIViS5N0CrIfLM9gnFFgE6nEyH9wSobZWpSgoz5kfMqU_5cvX5_bBl1_RqLrCovNmFXOgqTIY1ByorshPD3qx7RUvLiknrk4jTflc9zr5fn1RDhKxE7KGX_iqalF8Dg?key=dx79Gw4fEyrn_YTVtN9O-U8a)

- The followed user is now in the Connections section in the right Sidebar and it is not recommended anymore.

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXcI7Wjk2DXajPWJVddlfqJJcqXuyVrXfFK0ykNa2b-7s0ZktILq5JhHVwY46znBFfFqbD3goDwrRbsG4fTRHVUH3nWobpxuR-4OyRQB3TgggyWUCi5Vhl4h8yPcUYaf-1JusO30lQ?key=dx79Gw4fEyrn_YTVtN9O-U8a)

- Click the profile of the user in the Connections tab
- The full profile of the followed user show up.

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXfijiRbQh2guLIrvzq_XKbi-a0-ANRFr9OXNmTy3UGNl79nRRhSq0xYLaxIVlddKBmE4skNVyqNwLml15K7ryh_CCI0hj6xq4puawuAuQEfjyqTrkGz3luB97m4A8WuTOy10qGv?key=dx79Gw4fEyrn_YTVtN9O-U8a)

### Editing Profile and Setting Tags

- Click on the avatar icon on top right
- Click the Edit Profile

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXeLXMrPq5K7ODYk-kqyab8q43OF272yv8MopsYf-tgfJSEw-UGI4rdHvp-Zud3jbFCDS_LyHMPdPrY4CuGfhrkF-C1lwWcefVGuPWc_Cj8g6NyNjrLhPSOFPbwrzofKXStxaebStg?key=dx79Gw4fEyrn_YTVtN9O-U8a)

- Fill your profile information, such as name, surname and about.

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXeLfXVD9NhFBQDrkmvFWVDIs7X-Bclw8Hzj3KL3jlYKjaJ-XVWw2lCmo4mpq2i3JKtrsTWOnaAzy01yjwW8677Z4NoMoT45Ryw0Q4JwU4eBCrmG0FT8s46MErK4dIKcBD9fIed5NQ?key=dx79Gw4fEyrn_YTVtN9O-U8a)

- Set the tags based on your interests

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXflbJoX3ZTidrfvwlIR1GEMxoWCi0lgygzgLVdS0bEvggwHOHIpj2Q1-1fiNJIs6wra8u-DKpDywpKg0QONXpcG86INpcLLAW8e7n_BDQkcAcQuAje7ZPrx6Dr6UzyQXvZQt2xFoQ?key=dx79Gw4fEyrn_YTVtN9O-U8a)

- Click Save Profile

### Seeing Recommended Communities and Interacting with Them

- The recommended communities are listed in the right sidebar, based on the user’s interests

### ![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXf80Xe5NYBmvciqLdJBO7TR8jtHwZLzxLoCG-LdXkM_83X7urJV5Ljw9MQj1HFztSEjOYlle_9oFuU3nIqR-R8QUxEfQ1QimqDi3KW7tir5S0ZcDyXxxVICDMcb8xrGJWT8ipFDwg?key=dx79Gw4fEyrn_YTVtN9O-U8a)

- Click one of the Recommended Communities and Click Join

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXeFRn-V8_GJjtE8Nl1nO1mbOmEnNzJ1Ryn92EUtf97BJQ-kpJA6Z4sJgBR2DTyBryJYxC7Cy1rMI3EANznDoN0Q6OB9TbDy4OVxdc1bzBp_jyr-sX0mDHOFKhjYosygYVxVryybuQ?key=dx79Gw4fEyrn_YTVtN9O-U8a)

- The user is in the community right now, and his/her name and activities show up in the activity field

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXfPb3DYCaV9tcJocpnZ0PJJ7aR_zFOWTVssuRDc26iJLWKowOeZ39BRkW0LofvMqY0PjP8lGMEYrRvbkxqgu_KgihtCMxUCgqpLJyAEGNNd110hDoWy3rljA-d1j9JXtWSaLC5b?key=dx79Gw4fEyrn_YTVtN9O-U8a)

### Basic Search and Advanced Search

#### Basic Search

- Click the top search bar
- Start to type any keyword
- The System will show the results and categorize as the type, such as users and communities

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXdmCZv3VaMApQiEnVOJqp7BiNDD_MgSrSb1yMMI9iuamRWusfq1T-uu0TKyspVUg0ueUk8jSm2XfM1tBW8D9doSV3gTEt0aQWQNk5OwflvlKfil3JJDPdm4hMBCZjtdaRm_wEfVyg?key=dx79Gw4fEyrn_YTVtN9O-U8a)

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXfd5S_Uk5TWnezC7PtdbXatIjin8L1a5yNq7RArEadt1XAqyPiANlb_ui8dbXwwF7OIs_-LI5-iw-mKVqlW0GfWN0-N9iBUpqxp83NzldO6a_6Cf5bUbWPCCyKY-PinN3ZFoX-lPw?key=dx79Gw4fEyrn_YTVtN9O-U8a)

#### Advanced Search

- Navigate to a community
- Click Search in Community button

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXfB-r4k3ZVFOYfLisRCMi7GqJKZ5iL1mKvykjmzUNZA1UszlgUFthHHYELvOepETY9uFqR4IkEvU_TOhThDPWqN_IZTlzstCa5f4h0BRSQPgkYrFKsZRngSYBxrr9C3L-29iyyo?key=dx79Gw4fEyrn_YTVtN9O-U8a)

- Click on Advanced Search to search in a detailed way

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXeGrLPF2eOOxoKqpsoxm_vsqXSDu36XrgJwSIa8zhcyJz_a02jEKi7D2riCGm7KeOXcmx-HBX4LZ2W4Shrp0UUuRYd6fiCov6OECLr2qQ5vq2_ienNn-roZ4y9hq2_esD0LGgvBgQ?key=dx79Gw4fEyrn_YTVtN9O-U8a)

- Select a template to search

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXeCqcNhX9VEPIW9zotzZhwky88yG_oLhQvbRzdzyLaio414MC8tnunvJ_wpO41xAt4HKxgJQgifI06hu7YJ0pzF_TKgIhE5MT2J9zeI-quputj4xA49aGAqf2QdRFkcxTZKP8r0fw?key=dx79Gw4fEyrn_YTVtN9O-U8a)

- Type the text and click Search button

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXfN1g0yy9gcYecaibSWWsd3EJXexF08naqo67sgLPtIa90fml6pgqo6fkVhHJgHbuZVZcy24zAbkvytMeZn9xDTG3yYa0AKSA-npW6wbAQrsPvd5bN_xECHZ4tHxAjmkr4kfAlp?key=dx79Gw4fEyrn_YTVtN9O-U8a)

### Downloading the Mobile and Desktop App

#### For Desktop:

- In desktop browser, click the Monitor icon in the URL bar

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXdIIAaUWRDyQGDmsdr_RCayWPcRTnXvfoYHASZKu2JmlCEf181A8QH63BRqIdNckbsoEFdHceWxiDyq-vVIG9qouaypippaRM032b7qfAGOP-wI0Xfz-15eGY9IKtiZJ03jsRShmQ?key=dx79Gw4fEyrn_YTVtN9O-U8a)

- Click the “Install”, or “Yükle” button

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXcDEvt_bMXIGdBi91WSYsePUDAaNlV9qMavJZaZYwenIArq2qxnWZEhdZhUQBrTKCulqxcG1JQ_93920nFcr47-f1G5kMgPVsb8vtwBF2RZ9yL1Vs7cpaIq7J84lMCmadfw1B1yXw?key=dx79Gw4fEyrn_YTVtN9O-U8a)

- After that you can feel the native experience in your desktop pc, a start button should be created in your system.

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXebWZZVbWK_Mv_s3Urpq60-BEn6059-50nKpb-DV2tcQAfa_SKL1MIy2fDjNQrhNjSKpHRNF9uYneBiCoElfqYMTyqihR9dkK8rhI3myRMW5_15HoQXckX-HlcxnB5DwzB5Cr1P4w?key=dx79Gw4fEyrn_YTVtN9O-U8a)

#### For Mobile:

- Click Add to Home Screen in your mobile browser settings
- Click Install in the bottom drawer and again in the modal
- Then you can feel the native mobile experience
<div align="center">
<img src="https://lh7-rt.googleusercontent.com/docsz/AD_4nXdORRICYbwhcihrtod3A-4bQ4IZq_Q9wxTM-FgNJbI_M5O3ubx32c_mvHNodQat7SSgMmvgwNeUX_kgtRmgxvm0Xsr7jTP_F0JW-jY1AO6FDoF9ZMhccoOwNS-eQvd-OqmytBI-0w?key=dx79Gw4fEyrn_YTVtN9O-U8a" width="250" />
<img src="https://lh7-rt.googleusercontent.com/docsz/AD_4nXdxwFoE8yW5LpACEEODNNJHUKvFhR0q14HmPfjopiin4qJ16GVDNH93gLDLv0RI-bvX_v4Fm-hG2QKlSXChwHevja7413RFDuqRFGBwF78qsWnjMkLvmmp5udfFCPk2g5bqeh5ePQ?key=dx79Gw4fEyrn_YTVtN9O-U8a" width="250" />
<img src="https://lh7-rt.googleusercontent.com/docsz/AD_4nXcrRYCLHqmH4n_DrJihEZMKB1y1r4srop3xvhs6ZNdSj4OxtI2lFTGv1MxuNfhpQLG5w9dMZ5CxtBbliKLgnNGqvL8lP33HlOKOFu6JUMSgPLrM7AQVuxKvT1WO5z-zhib0rvn_?key=dx79Gw4fEyrn_YTVtN9O-U8a" width="250" />
</div>



## Individual Contributions

---

### Ömer Aslan

#### **1. User Profile Page Enhancement**
- **Related Requirements:** F77, F79  
- **Description:** Developed a user profile page accessible via user ID, displaying all the communities a user has joined and the badges they have earned. Implemented both backend APIs and frontend UI components. Additionally, added clickable links to all usernames throughout the application for seamless navigation.  
- **Issue URLs:**  
   - [#86](https://github.com/swe574-Fall2024-Group1/huddleup/issues/86)  
   - [#85](https://github.com/swe574-Fall2024-Group1/huddleup/issues/85)  
- **Relevant Content:** [Pull Request #84](https://github.com/swe574-Fall2024-Group1/huddleup/pull/84)  

---

#### **2. Badge System Improvements**
- **Related Requirements:** F77, F79, F69, F75  
- **Description:** Enhanced the automatic badge assignment process by introducing date limitations. Added a dedicated badges section on community pages, allowing users to view potential badges and earned ones. Unacquired badges are displayed in a blurred state. Improved the overall badge UI based on customer feedback.  
- **Issue URLs:**  
   - [#89](https://github.com/swe574-Fall2024-Group1/huddleup/issues/89)  
- **Relevant Content:** [Pull Request #104](https://github.com/swe574-Fall2024-Group1/huddleup/pull/104)

#### Executive Summary  

Throughout the project, I have contributed significantly to both backend and frontend development, focusing on enhancing user experience and improving core functionalities. My contributions align closely with the defined requirements, design specifications and overall project management goals.  

##### Key Contributions:  
1. **User Profile Page Enhancement**  
   - Designed and implemented a user profile page accessible by user ID, showcasing user-specific details such as joined communities and earned badges.  
   - Ensured seamless navigation by adding clickable links to usernames across the application.  
   - **Related Requirements:** F77, F79  
   - **Issue URLs:** [#86](https://github.com/swe574-Fall2024-Group1/huddleup/issues/86), [#85](https://github.com/swe574-Fall2024-Group1/huddleup/issues/85)  
   - **Relevant Content:** [Pull Request #84](https://github.com/swe574-Fall2024-Group1/huddleup/pull/84)  

2. **Badge System Improvements**  
   - Enhanced the automatic badge assignment system with date restrictions.  
   - Added a dedicated badge section on community pages, displaying earned and potential badges, with unearned badges shown in a blurred state.  
   - Refined the badge UI based on customer feedback to improve clarity and usability.  
   - **Related Requirements:** F77, F79, F69, F75  
   - **Issue URLs:** [#89](https://github.com/swe574-Fall2024-Group1/huddleup/issues/89)  
   - **Relevant Content:** [Pull Request #104](https://github.com/swe574-Fall2024-Group1/huddleup/pull/104)  

3. **Project Foundation and Team Onboarding**  
   - The project was built on my individual work from the previous term, forming the foundation for the current implementation.  
   - Onboarded team members by introducing them to the codebase, explaining architectural decisions, and ensuring a smooth transition into active development.  
   - Actively participated in team ideation sessions, contributing to discussions on how to approach and implement project requirements effectively.  
   - Managed meetings on multiple occasions, assigned action items to team members, and ensured alignment with project milestones.  
   - Authored the **user scenario** for the final demonstration, providing a clear narrative to showcase project functionalities.  

##### Alignment with Project Goals:  
- **Requirements:** Delivered features that directly address key functional requirements (e.g., F77, F79).  
- **Design:** Ensured UI/UX consistency across profile and badge-related pages while maintaining technical integrity in backend API design.  
- **Management:** Proactively addressed key issues, onboarded team members, facilitated meetings, co-wrote the final demonstration scenario and contributed to strategic planning during ideation sessions.  

#### Documentation 

For the SRS document I merged all requirements from the all team members and ensured consistency. Found and listed the incomplete requirements:
https://github.com/swe574-Fall2024-Group1/huddleup/wiki/Software-Requirements-Specification-(SRS)
https://github.com/swe574-Fall2024-Group1/huddleup/wiki/Archive#missing-or-incomplete-functionalities

For mockups I designed and created mockup for user profile section:
https://github.com/swe574-Fall2024-Group1/huddleup/wiki/Scenarios-&-Mockups

#### Demo

Designed and implemented a user profile page accessible by user ID, showcasing user-specific details such as joined communities and earned badges: 

![](https://i.ibb.co/4W3f5wB/Screenshot-2024-12-22-at-12-42-13.png)

#### Challenges:

One significant challenge arose while adding the **badge section** to the community page, where users can view potential badges, including earned and unearned ones (with unearned badges displayed in a blurred state).  

While waiting for my **pull request** to be reviewed and merged, another team member introduced **UI changes** to the same frontend components. This resulted in **merge conflicts**, requiring careful reconciliation to ensure both sets of changes were properly integrated without breaking existing functionality or design consistency.  

To address this, I:  
- Thoroughly reviewed the conflicting changes to understand their intent and impact.  
- Manually resolved the merge conflicts, ensuring both features coexisted seamlessly.  
- Conducted additional testing to verify that no regressions were introduced.  

This experience highlighted the importance of **team communication** and **timely code reviews** to prevent overlapping changes in shared components.  

#### Code Review  

#### Code Reviewed by Me  
- **Pull Request:** [#14](https://github.com/swe574-Fall2024-Group1/huddleup/pull/14)  

During the **initial phase** of the project, I reviewed a **major architectural change** introduced by Ovunc. After carefully analyzing the structure, implementation, and potential impacts on the system, everything appeared to be in order. I left a comment stating **"perfect"**, indicating no issues were found during my review.  

**Result:** The pull request was successfully **merged into the main branch** without requiring any further adjustments.  

##### Code Reviewed by Ovunc  
- **Pull Request:** [#104](https://github.com/swe574-Fall2024-Group1/huddleup/pull/104)  

While implementing the **badge improvements and community badge section**, Ovunc reviewed my changes. She initially noticed a **merge conflict** caused by overlapping changes in the frontend components. I addressed these conflicts and **requested another review**.  

In the second review, Ovunc identified **additional issues** related to the integration, which she clearly detailed in her feedback. I carefully resolved each issue, conducted tests to ensure functionality remained intact, and **requested review again**.  

**Result:** After confirming that all problems were addressed, Ovunc **approved the pull request**, and it was successfully **merged into the main branch**.  

This challenge was also explained in detail in the **Challenges Faced** section, highlighting the importance of **effective collaboration and iterative review processes**.  

### Issues  

#### Issues Created by Me  

| **Title** | **URL** |  
|-----------|---------|  
| Decide how community recommendation should work | [#6](https://github.com/swe574-Fall2024-Group1/huddleup/issues/6) |  
| Decide how post recommendation should work | [#7](https://github.com/swe574-Fall2024-Group1/huddleup/issues/7) |  
| Decide how user recommendation should work | [#8](https://github.com/swe574-Fall2024-Group1/huddleup/issues/8) |  
| Decide how badges should work | [#10](https://github.com/swe574-Fall2024-Group1/huddleup/issues/10) |  
| Change database from MongoDB to PostgreSQL | [#12](https://github.com/swe574-Fall2024-Group1/huddleup/issues/12) |  
| Implementing existing frontend to backend | [#15](https://github.com/swe574-Fall2024-Group1/huddleup/issues/15) |  
| Add user profile page backend | [#85](https://github.com/swe574-Fall2024-Group1/huddleup/issues/85) |  
| Add user profile page frontend | [#86](https://github.com/swe574-Fall2024-Group1/huddleup/issues/86) |  
| Decide how user reputation should work | [#9](https://github.com/swe574-Fall2024-Group1/huddleup/issues/9) |  
| Research about Wikidata for use in recommendations and tagging | [#26](https://github.com/swe574-Fall2024-Group1/huddleup/issues/26) |  
| Enforce Password Complexity in Registration | [#28](https://github.com/swe574-Fall2024-Group1/huddleup/issues/28) |  
| Implement Profile Editing Functionality | [#29](https://github.com/swe574-Fall2024-Group1/huddleup/issues/29) |  
| Add Nickname Change Feature | [#30](https://github.com/swe574-Fall2024-Group1/huddleup/issues/30) |  
| Support Anonymous Participation for Users | [#31](https://github.com/swe574-Fall2024-Group1/huddleup/issues/31) |  
| Add Community Rules Publishing and Editing | [#32](https://github.com/swe574-Fall2024-Group1/huddleup/issues/32) |  
| Ban Users Based on Community Rule Violations | [#33](https://github.com/swe574-Fall2024-Group1/huddleup/issues/33) |  
| Implement Content Reporting Mechanism | [#34](https://github.com/swe574-Fall2024-Group1/huddleup/issues/34) |  
| Implement Post Sorting by Views and Comments | [#35](https://github.com/swe574-Fall2024-Group1/huddleup/issues/35) |  
| Provide Analytics for User Engagement and Popular Posts | [#36](https://github.com/swe574-Fall2024-Group1/huddleup/issues/36) |  
| Add Password Validation on Registration Form | [#37](https://github.com/swe574-Fall2024-Group1/huddleup/issues/37) |  
| Implement Profile Editing UI | [#38](https://github.com/swe574-Fall2024-Group1/huddleup/issues/38) |  
| Add Nickname Change Feature in Profile | [#39](https://github.com/swe574-Fall2024-Group1/huddleup/issues/39) |  
| Add Option for Anonymous Participation in Posts and Comments | [#40](https://github.com/swe574-Fall2024-Group1/huddleup/issues/40) |  
| Implement UI for Publishing and Editing Community Rules | [#41](https://github.com/swe574-Fall2024-Group1/huddleup/issues/41) |  
| Add UI for Reporting Content | [#42](https://github.com/swe574-Fall2024-Group1/huddleup/issues/42) |  
| Add Sorting Options for Posts by Views and Comments | [#43](https://github.com/swe574-Fall2024-Group1/huddleup/issues/43) |  
| Display User Engagement and Popular Post Analytics | [#44](https://github.com/swe574-Fall2024-Group1/huddleup/issues/44) |  

---

#### Issues Assigned to Me  

| **Title** | **URL** |  
|-----------|---------|  
| Decide if we should start the backend functionality from scratch or use one of our own repository as base | [#1](https://github.com/swe574-Fall2024-Group1/huddleup/issues/1) |  
| Decide on labeling strategy | [#2](https://github.com/swe574-Fall2024-Group1/huddleup/issues/2) |  
| Check each other's SWE573 repositories | [#3](https://github.com/swe574-Fall2024-Group1/huddleup/issues/3) |  
| Decide how community recommendation should work | [#6](https://github.com/swe574-Fall2024-Group1/huddleup/issues/6) |  
| Decide how post recommendation should work | [#7](https://github.com/swe574-Fall2024-Group1/huddleup/issues/7) |  
| Decide how user recommendation should work | [#8](https://github.com/swe574-Fall2024-Group1/huddleup/issues/8) |  
| Create requirements for Huddleup application | [#17](https://github.com/swe574-Fall2024-Group1/huddleup/issues/17) |  
| Add user profile page backend | [#85](https://github.com/swe574-Fall2024-Group1/huddleup/issues/85) |  
| Add user profile page frontend | [#86](https://github.com/swe574-Fall2024-Group1/huddleup/issues/86) |  
| Badges UI Improvements | [#89](https://github.com/swe574-Fall2024-Group1/huddleup/issues/89) |  

---

This structured table provides a clear overview of the **major issues** I created and was **assigned to** during the project.  


---


