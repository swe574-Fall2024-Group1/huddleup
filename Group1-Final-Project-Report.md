# Table of Contents

1. [Project Overview](#project-overview)
2. [Project Links](#project-links)
   - [Repository Link](#repository-link)
   - [Deployment Link](#deployment-link)
   - [Demonstration Video Link](#demonstration-video-link)
   - [Final Release Link](#final-release-link)
3. [System Manual - How to Run Project Locally with Docker](#system-manual)
4. [Project Goals](#project-goals)
5. [Key Features Completed](#key-features-completed)
6. [Current Technology Stack](#current-technology-stack)
7. [Future Enhancements](#future-enhancements)
8. [Software Requirements Specification](#software-requirements-specification)
   - [1. Functional Requirements](#functional-requirements)
     - [1.1 Authentication and User Management](#authentication-and-user-management)
     - [1.2 Community Management](#community-management)
     - [1.3 Post and Content Management](#post-and-content-management)
     - [1.4 User Engagement and Analytics](#user-engagement-and-analytics)
     - [1.5 Community and User Recommendation System](#community-and-user-recommendation-system)
     - [1.6 Badge System](#badge-system)
   - [2. System Constraints and Limitations](#system-constraints-and-limitations)
9. [Status of The Project](#status-of-the-project)
10. [Software Design Mockups](#software-design-mockups)
    - [1. User Profile](#user-profile)
    - [2. Activity Feed](#activity-feed)
    - [3. Badges](#badges)
    - [4. Tags](#tags)
    - [5. Recommendation](#recommendation)
11. [User Scenarios](#user-scenarios)
    - [1. Coffee Fortune Telling](#coffee-fortune-telling)
    - [2. Create Book Discussion Template](#create-book-discussion-template)
    - [3. Post Creation Screen - Plant Identification Community](#post-creation-screen-plant-identification-community)
12. [User Tests](#user-tests)
13. [User Manual](#user-manual)
    - [Login/Registration](#login-registration)
    - [Main Page](#main-page)
    - [Create Community](#create-community)
    - [Community Setting](#community-setting)
    - [Adding Template](#adding-template)
    - [Add Post](#add-post)
    - [Editing a Post](#editing-a-post)
    - [Adding a Comment](#adding-a-comment)
    - [Editing Comments](#editing-comments)
    - [Upvoting/Downvoting a Comment or Post](#upvotingdownvoting-a-comment-or-post)
    - [Managing User Settings](#managing-user-settings)
    - [Managing Moderator Settings](#managing-moderator-settings)
    - [Creating a Manual Badge](#creating-a-manual-badge)
    - [Assigning a Badge](#assigning-a-badge)
    - [Creating an Automatic Badge](#creating-an-automatic-badge)
    - [Seeing Recommending Users and Connecting with Them](#seeing-recommending-users-and-connecting-with-them)
    - [Editing Profile and Setting Tags](#editing-profile-and-setting-tags)
    - [Seeing Recommended Communities and Interacting with Them](#seeing-recommended-communities-and-interacting-with-them)
    - [Basic Search and Advanced Search](#basic-search-and-advanced-search)
    - [Downloading the Mobile and Desktop App](#downloading-the-mobile-and-desktop-app)
14. [Individual Contributions](#individual-contributions)
    - [Ömer Aslan](#ömer-aslan)
    - [Doruk Büyükyıldırım](#doruk-büyükyıldırım)
    - [Erkin Gönültaş](#erkin-gönültaş)
    - [Muharrem Ustaoğlu](#muharrem-ustaoglu)
    - [Aibek Aldabergenov](#aibek-aldabergenov)
    - [Övünç Ertunç](#övünç-ertunç)

## Project Overview
**HuddleUp** is an innovative social media platform tailored for building and engaging with communities. The platform fosters collaboration and interaction through structured post templates, user-driven communities, and gamified participation, creating a dynamic space for users to connect and share ideas.

### **Project Links**
#### **Repository Link**
[https://github.com/swe574-Fall2024-Group1/huddleup](https://github.com/swe574-Fall2024-Group1/huddleup/releases/tag/v0.9)
#### **Deployment link**
[https://group1.swe574.com](https://group1.swe574.com)
#### **Demonstration Video Link**
[https://youtu.be/XyLsM2wwD9o](https://youtu.be/XyLsM2wwD9o)
#### **Final Release Link**
[https://github.com/swe574-Fall2024-Group1/huddleup/releases/tag/v0.9](https://github.com/swe574-Fall2024-Group1/huddleup/releases/tag/v0.9)

### **System Manual - How to run project locally w/ Docker**
The project is fully dockerized, with Docker Compose configured for seamless deployment and local execution.
Requirements to run locally:
- docker version 20.10.x or greater
- docker compose version v2.2.x or greater
- Internet connection to [Docker hub](https://hub.docker.com)

To build the application locally:
- The `docker compose up` command should be executed inside the top directory (`/huddleup`).
- After executing the command, all necessary components (database, backend, and frontend instances) will be created and configured.
- The required software packages will be downloaded during the initial `docker compose up` run, which may take some time during the first run. Following runs will take much less time due to Docker's caching feature.
- The PostgreSQL database will run automatically and create `postgres_data:` folder for database files.
- During the `docker compose up` the database migrations required by Django will run automatically.
- Execute `docker compose down` to stop the project. After shutting down data in the database will be persistent under `postgres_data:` folder. Any user, user, community, etc. created in a previous run will be available if data under `postgres_data:` is not deleted.

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
  
### **Current Technology Stack**  
HuddleUp is built using:  
- **Frontend**: ReactJS (leveraging Ant Design components)  
- **Backend**: Django  
- **Database**: PostgreSQL  
- **Deployment**: Google Cloud Platform

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


## Software Design Mockups

### 1.User Profile
Scenario: Badges that user earned from different communities are listed on the user profile page.

<img src="https://github.com/user-attachments/assets/ad00dd35-6e86-4bf5-a3ce-bc3464bc7da7" height="480px" width="auto"/>
<img src="https://github.com/user-attachments/assets/15397706-deee-4b67-bbf7-6a9e0f8fe209" height="480px" width="auto"/>

### 2.Activity Feed

<img src="https://github.com/user-attachments/assets/6bd92154-a9d2-48a5-bf34-401e1f1688d5" height="480px" width="auto"/>
<img src="https://github.com/user-attachments/assets/96d565ad-e33e-4c37-92f7-a558c8961583" height="480px" width="auto"/>

### 3.Badges
#### Manuel Badge Scenario: 
The community owner Alan wants to create a Community Specific Badge, therefore he goes to the Badge Management.

<img src="https://github.com/user-attachments/assets/a21d12a6-22aa-42f2-bcec-3a8783d43762" height="480px" width="auto"/>

#### Community Specific Badges - Automatic Badges with Predefined Criteria Scenario:


**Scenario 1:** The community owner Alan, creates community specific badge for the community Travel for Food.

<img src="https://github.com/user-attachments/assets/d1432615-3232-4ce8-8477-7ded0c98e0fd" height="480px" width="auto"/>

Ali has been a member of HuddleUp for a while now, primarily engaging with the “Travel for Food” community. He has been posting food recommendations from different locations.When he posted Köskeroglu post, he has earned the "Gourmet" badge, which is given to users by specifically posting food recommendations from 30 different locations.

<img src="https://github.com/user-attachments/assets/9d320c4b-d3c2-405c-aa2a-1cff0ad5c85b" height="480px" width="auto"/>
<img src="https://github.com/user-attachments/assets/b8484aca-0525-4404-9de2-1c7d8f00103a" height="480px" width="auto"/>


**Scenario 2:** The community owner Fred, creates community specific badge for the community Chill Soundscape.

<img src="https://github.com/user-attachments/assets/96c42f47-08d0-46df-83fa-366a787c937c" height="480px" width="auto"/>

Sarah, a passionate ambient music creator, posts her music composition “Echoes of Yesterday”. As days pass, Sarah's post gains attention. The upvotes climbs to 1,000. Therefore, the system assigns "Soul Whisperer" badge to her.

<img src="https://github.com/user-attachments/assets/20ec15f3-103c-4a2b-94b4-eec53d3277f3" height="480px" width="auto"/>

#### Community Specific Badges - Manual Badges:

**Scenario:** In the "Healthy Living" community, owner Jamie decides to award the "Creative Genius" badge to member Alex for consistently sharing innovative recipes that have garnered enthusiastic responses from other members.
After noticing that Alex's unique smoothie recipes not only received over 100 upvotes but also sparked a lively discussion on nutrient combinations, Jamie opens the badge assignment modal.

<img src="https://github.com/user-attachments/assets/6f0d2502-126d-4f6c-9796-c0deaf6f5bf3" height="480px" width="auto"/>


### 4.Tags

**Scenario:** Ali logs into the HuddleUp app and navigates to the "Travel for Food" community. From there, they click on the "Tags" button for managing tags.Within the  panel, Ali finds the "Tags" section. This section allows community member to create and manage tags that users can apply to their posts. Ali clicks on the "Create New Tag" button and enters the following information: Tag Name: "Turkish Street Food",Description: "We eat on the streets of Türkiye."After filling out the details, Ali saves the tag. Once the new tags are created, Ali drafts an announcement to the huddleup. The message explains the purpose of the new tags and encourages users to start tagging their posts accordingly for better visibility and organization.

<img src="https://github.com/user-attachments/assets/2222d924-86c0-4258-b0d0-1f87635bece0" height="480px" width="auto"/>
<img src="https://github.com/user-attachments/assets/29c5725f-197f-485e-be62-4a59cbbcdf4c" height="480px" width="auto"/>
<img src="https://github.com/user-attachments/assets/04f5227e-6427-4e6a-88ee-10ad9174091e" height="480px" width="auto"/>

Sarah logs into the HuddleUp app and navigates to the "Travel for Food" community. She clicks the "Add Post" button.Sarah fills a location, restaurant name, detailing her experience with the food. Before publishing the post, Sarah sees a "Tags" section at the bottom of the post creation form. She clicks on the tag input field, and a dropdown list of available tags appears.Sarah selects the following tag from the list: French Cuisine. After assigning the tags, Sarah clicks the "Submit" button, and her post is published in the community feed. The tags are displayed under the post, and users can click on them to find related content.

<img src="https://github.com/user-attachments/assets/06949896-4765-4071-a727-86b04667e33d" height="480px" width="auto"/>
<img src="https://github.com/user-attachments/assets/a71fe3ee-42d1-4cec-ae07-a7f2ac3373bf" height="480px" width="auto"/>

**Scenario:** Adam discovers new posts through HuddleUp's tag system. He filters by selecting the tag street food.

<img src="https://github.com/user-attachments/assets/4618b16c-35f8-4024-857f-99d1b0433d68" height="480px" width="auto"/>
<img src="https://github.com/user-attachments/assets/147cbe00-f82c-43e4-b946-3200d59a6b3e" height="480px" width="auto"/>

### 5.Recommendation
Scenario: Alan begins the registration process by entering her email, creating a password, and filling out basic profile information. After completing her profile setup, the system prompts Alan to select 3 tags that best reflect her interests. A message on the screen reads: “Pick 3 tags that describe your interests so we can recommend relevant content and communities.” Alan is presented with a list of available tags organized by categories. Alan scrolls through the list and selects the following tags: Italian Cuisine,Spicy Food and Breakfast.After selecting her 3 tags, Alan clicks “Continue” to complete the registration process. The system processes her preferences and tailors her experience based on these tags.Upon completing her registration, Alan is directed to the main feed. The system immediately shows her personalized recommendations: Posts, Communities.

<img src="https://github.com/user-attachments/assets/8c547190-b21d-4ce7-94e8-96f47911516f" height="480px" width="auto"/>
<img src="https://github.com/user-attachments/assets/a2eef9ee-9bb1-4ce2-85aa-1901d0c15771" height="480px" width="auto"/>
<img src="https://github.com/user-attachments/assets/c2c51122-d31b-4dd2-93d7-eb6f1afa5123" height="480px" width="auto"/>
<img src="https://github.com/user-attachments/assets/f416ddfd-4ac2-4be3-9f92-ef348f05f5a1" height="480px" width="auto"/>
<img src="https://github.com/user-attachments/assets/a0556e97-d0a0-45dd-b20c-8b61436cd608" height="480px" width="auto"/>

**Scenario:** David discovers new communities through HuddleUp’s recommendation system. The recommendations are relevant due to their shared tags with communities he already follows, and the platform helps him find both popular, active communities and new, exciting groups to join. By using the prioritized recommendation system, David stays engaged and connected to new communities that align with his passions.

<img src="https://github.com/user-attachments/assets/1c4a183c-ec04-431d-b771-cf001430c8aa" height="480px" width="auto"/>
<img src="https://github.com/user-attachments/assets/aa434c99-c3ce-4d90-ad16-759dc3e20e20" height="480px" width="auto"/>


## User Scenarios
### 1. Coffee Fortune Telling

Scenario: A user joins a coffee fortune-telling community, uploads a photo of their coffee cup, and asks the community for opinions about their fortune based on the coffee grounds.

#### Step 1: Post Creation (Community-Specific Template)
**"Create a Post"**

1. Title: "What does my coffee fortune say?"
2. Photo Upload: A button to upload the coffee photo (JPEG, JPG, PNG)
3. Optional Description Field: "I've had this cup in the morning, and I’m curious about the fortune the grounds reveal!"
4. Post Button: "Share with Community"

Here, the user can quickly add a title, upload the photo, and describe what they're looking for in the community-specific template. The user can see that a default template is available with an optional photo and description field, tailored for coffee-related posts.

#### Step 2: Community Engagement (Post Interaction)
**"View Post"**

1. Post Information: Displays the coffee photo, title, description, and user's name..
2. Timestamp: Shows when the post was made.
3. Upvote/Downvote Buttons: Allows members to vote on the post.
4. Comment Section: Allows users to comment with interpretations like "I see wealth in your near future!" or "Looks like a journey is ahead."
5. Reply Functionality: Enables users to reply to specific comments for more detailed discussions.

This page encourages community members to engage with the user's coffee post and provide their own fortune-telling interpretations.

<img src="https://github.com/user-attachments/assets/3205cb5e-470b-4aa3-8dfa-f9abc911ffd9" height="480px" width="auto"/>
<img src="https://github.com/user-attachments/assets/58915114-658f-4a5c-babc-039a155451e9" height="480px" width="auto"/>
<img src="https://github.com/user-attachments/assets/5a3faa84-58f0-4c2e-9594-f3de0eb74750" height="480px" width="auto"/>

### 2. Create Book Discussion Template

<img src="https://github.com/user-attachments/assets/c75a4587-4f90-45d6-9a3b-7910336072a2" height="480px" width="auto"/>

#### Step 1 - Access the Template Dashboard

Ahmet (moderator) logs into the "Reading Community" and navigates to the "Reading Community Templates" section. He sees a list of existing templates like "Book Review" and "Reading Challenge.", created by other moderators before.

#### Step 2 - Initiate New Template Creation
He clicks the "Create Template" button at the top of the page. A modal window opens with a form to create a new template.

#### Step 3 - Fill in Template Details and Add Additional Fields

He enters "Book Club Discussion" as the template name and he writes a description "Start a discussion about the current book club selection."

Ahmet needs specific input fields to guide the conversation:

He adds "Book Title" (text) so members can specify the book and "Author" (text) for the author's name.
For structuring the conversation, he adds "Discussion Topic" (text) and "Initial Thoughts" (textarea) to allow for free-form input.
Finally, he adds "Meeting Date" (date) to schedule the in-person or online discussion.

#### Step 4 - Review and Save the Template
Before saving, he reviews the list of fields and confirms they cover all aspects of the discussion.

He clicks "Create Template." The new "Book Club Discussion" template now appears in the template list, complete with fields like "Book Title," "Author," and "Discussion Topic."


### 3. Post Creation Screen - Plant Identification Community

This wiki page provides an overview of the post creation screen mockup designed for the Plant Identification Community app. The screen allows users to easily capture and share plant photos for identification by other community members.

#### Overview
The post creation process consists of two primary steps:  
1. **Capturing a Photo**  
2. **Writing the Post**  

During the creation of a post, the app automatically gathers important metadata (location, altitude, time, date) from the user's phone, which can later be manually edited if needed.

<img src="https://github.com/user-attachments/assets/87eeebdf-19f5-477e-aa58-cb764fbcbfe0" height="480px" width="auto"/>

#### Step 1: Capturing the Plant Photo
When the user initiates the post creation process, the app activates the phone's camera. The user is prompted to take a photo of the plant they want to post. This image will be the central piece of the post for the plant identification request.

**Action:**  
- Take a clear, focused photo of the plant to ensure other community members can accurately identify it.

#### Step 2: Writing the Post
After capturing the plant photo, the user is taken to the second step of the post creation process, where they can add more details to their post.

##### Fields:
- **Post Title:** A brief title summarizing the plant or the request for identification.
- **Post Body:** A more detailed description where the user can add relevant information about the plant, such as its characteristics, the environment it was found in, or any other details that might help with identification.

##### Automatically Filled Information
In addition to the user-provided content, the following information is automatically gathered from the user's device and added to the post:

- **Location:** The geographical coordinates or area where the plant photo was taken (e.g., "Eastern Aegean").
- **Altitude:** The altitude at which the photo was taken.
- **Time & Date:** The exact time and date of the photo.

##### Editing Auto-filled Information
The user can manually edit the automatically filled information by clicking on the respective fields (location, altitude, time, date) before submitting the post. This ensures flexibility in case any corrections are needed.

##### Finalizing the Post
Once the user is satisfied with the photo, the written content, and the metadata, they can submit the post for the community to view and assist with identification.


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

You can find a demonstration video of the app on [YouTube](https://youtu.be/XyLsM2wwD9o).

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

### Doruk Büyükyıldırım

#### **1. Cloud Infrastructure**
- **Description:** Created and managed public cloud accounts across multiple providers, including Microsoft Azure and Google Cloud Platform, while facilitating migrations between them. Set up essential cloud services to host the project, managed cloud and server users, configured DNS records, implemented redirection, and handled TLS certificates.
- **Issue URLs:**  
   - [#48](https://github.com/swe574-Fall2024-Group1/huddleup/issues/48)  
   - [#57](https://github.com/swe574-Fall2024-Group1/huddleup/issues/57)  
- **Challenges:** To avoid incurring costs, free credits were prioritized when creating public cloud accounts. This necessitated setting up infrastructure and gaining a thorough understanding of cloud service pricing.
#### **2. Deployment and Test Automation**
- **Description:** Automated the deployment of source code to cloud resources and integrated unit tests as a prerequisite for approving merge requests.
- **Issue URLs:**  
   - [#58](https://github.com/swe574-Fall2024-Group1/huddleup/issues/58)  
   - [#59](https://github.com/swe574-Fall2024-Group1/huddleup/issues/59)
- **Relevant Content:**
   - [Test Automation Pipeline](https://github.com/swe574-Fall2024-Group1/huddleup/blob/dev/.github/workflows/ci-test.yaml) executes the unit tests whenever a merge request is created into dev or main branches. The script is also added as a requirement (PR Check) to the merging behaviour of the repository resulting with a mandatory prequisite for any merging activity into important branches.
   - [Deployment Automation Script](https://github.com/swe574-Fall2024-Group1/huddleup/blob/dev/.github/workflows/ci-test.yaml)  runs unit tests automatically whenever a merge request is created for the dev or main branches. Additionally, the pipeline is configured as a repository prerequisite (PR Check), making it a mandatory requirement for any merge activity into these critical branches.
#### **3. Containerization Efforts**
- **Description:** Provided guidance on containerized code, performed testing, and debugged containerized deployments on cloud infrastructure.
- **Issue URLs:**  
   - [#13](https://github.com/swe574-Fall2024-Group1/huddleup/issues/13)  
   - [#64](https://github.com/swe574-Fall2024-Group1/huddleup/issues/64)
   - [#66](https://github.com/swe574-Fall2024-Group1/huddleup/issues/66)
#### Executive Summary
I managed cloud infrastructure, automated deployments and testing, and provided support for containerized code to ensure efficient and reliable project delivery.
#### Documentation
For the SRS document I added the [Software Design Diagrams](https://github.com/swe574-Fall2024-Group1/huddleup/wiki/Software-Design)
For mockups I designed and created the [Plant Identification Community Mockup](https://github.com/swe574-Fall2024-Group1/huddleup/wiki/Scenarios-&-Mockups#3-post-creation-screen---plant-identification-community)
#### Major Pull Requests by Me
-[#121](https://github.com/swe574-Fall2024-Group1/huddleup/pull/121)
-[#81](https://github.com/swe574-Fall2024-Group1/huddleup/pull/81)
-[#72](https://github.com/swe574-Fall2024-Group1/huddleup/pull/72)
-[#63](https://github.com/swe574-Fall2024-Group1/huddleup/pull/63)
#### Issues Created by Me  
| **Title** | **URL** |
|-----------|---------|
| Decide on labeling strategy | [#2](https://github.com/swe574-Fall2024-Group1/huddleup/issues/2) |
| Add branch protection for default (main) branch decision enhancement | [#67](https://github.com/swe574-Fall2024-Group1/huddleup/issues/67) |
| Delete container_name parameters from docker compose files | [#66](https://github.com/swe574-Fall2024-Group1/huddleup/issues/66) |
| Should add backend to ALLOWED_HOSTS on .env.sample file in dev branch | [#64](https://github.com/swe574-Fall2024-Group1/huddleup/issues/64) |
| Set up a CD pipeline on GitHub Actions for deployment and release management | [#59](https://github.com/swe574-Fall2024-Group1/huddleup/issues/59) |
| Create CI pipeline for unit tests | [#58](https://github.com/swe574-Fall2024-Group1/huddleup/issues/58) |
| Migrate infrastructure to another cloud account | [#57](https://github.com/swe574-Fall2024-Group1/huddleup/issues/57) |
| Spin up a VM and deploy last semester's version just in case | [#48](https://github.com/swe574-Fall2024-Group1/huddleup/issues/48) |
| CSS and HTML files should be kept in Nginx, not in built container | [#47](https://github.com/swe574-Fall2024-Group1/huddleup/issues/47) |
| Create docker compose file to spin up the project and the required database | [#13](https://github.com/swe574-Fall2024-Group1/huddleup/issues/13) |
| Create infrastructure diagram (proposal) | [#5](https://github.com/swe574-Fall2024-Group1/huddleup/issues/5) |
| Decide on branching strategy | [#4](https://github.com/swe574-Fall2024-Group1/huddleup/issues/4) |
| Check each other's SWE573 repositories | [#3](https://github.com/swe574-Fall2024-Group1/huddleup/issues/3) |
#### Issues Assigned to Me  
| **Title** | **URL** |
|-----------|---------|
| Add branch protection for default (main) branch decision enhancement | [#67](https://github.com/swe574-Fall2024-Group1/huddleup/issues/67) |
| Delete container_name parameters from docker compose files | [#66](https://github.com/swe574-Fall2024-Group1/huddleup/issues/66) |
| Set up a CD pipeline on GitHub Actions for deployment and release management | [#59](https://github.com/swe574-Fall2024-Group1/huddleup/issues/59) |
| Create CI pipeline for unit tests | [#58](https://github.com/swe574-Fall2024-Group1/huddleup/issues/58) |
| Migrate infrastructure to another cloud account | [#57](https://github.com/swe574-Fall2024-Group1/huddleup/issues/57) |
| Spin up a VM and deploy last semester's version just in case | [#48](https://github.com/swe574-Fall2024-Group1/huddleup/issues/48) |
| Research about wikidata for use in recommendations and tagging | [#26](https://github.com/swe574-Fall2024-Group1/huddleup/issues/26) |
| Create Mockup Screens from Requirements documentation | [#18](https://github.com/swe574-Fall2024-Group1/huddleup/issues/18) |
| Create docker compose file to spin up the project and the required database | [#13](https://github.com/swe574-Fall2024-Group1/huddleup/issues/13) |
| Decide how user reputation should work | [#9](https://github.com/swe574-Fall2024-Group1/huddleup/issues/9) |
| Decide how user recommendation should work | [#8](https://github.com/swe574-Fall2024-Group1/huddleup/issues/8) |
| Decide how post recommendation should work | [#7](https://github.com/swe574-Fall2024-Group1/huddleup/issues/7) |
| Decide how community recommendation should work | [#6](https://github.com/swe574-Fall2024-Group1/huddleup/issues/6) |
| Create infrastructure diagram (proposal) | [#5](https://github.com/swe574-Fall2024-Group1/huddleup/issues/5) |
| Check each other's SWE573 repositories | [#3](https://github.com/swe574-Fall2024-Group1/huddleup/issues/3) |
| Decide on labeling strategy | [#2](https://github.com/swe574-Fall2024-Group1/huddleup/issues/2) |
| Decide if we should start the backend functionality from scratch or use one of our own repositories as base | [#1](https://github.com/swe574-Fall2024-Group1/huddleup/issues/1) |


---

### Erkin Gönültaş

#### **1. Mobile Version Creation**
- **Description:** Created a PWA version for the project and migrated all of the UI elements to make them suitable for smaller screens. 
- **Relevant Content:** #55

#### **2. UI Enhancements**
- **Description:** Improved UI elements in web and mobile to match the quality requirements. 
- **Relevant Content:** #116,  #88

#### **3. Geolocation Map Implementation**
- **Related Requirements:** F31
- **Description:** Implemented location picker and map view feature to post creation section in both mobile and web. Leaflet for React is used to implement map view into the frontend. OpenStreetView is used to get the map tiles to display a world map. 
- **Relevant Content:** #88

#### Executive Summary  
In this project, I contributed mainly to frontend on mobile and web versions. I created PWA version and migrated screens to make them suitable for smaller screens. I improved UI quality, where needed, and implemented missing UI elements. Also, I implemented a location picker and map view feature. 

#### Documentation 

For documentation, I mainly contributed to the mockups and user scenarios.
https://github.com/swe574-Fall2024-Group1/huddleup/wiki/Scenarios-&-Mockups


#### Demo

Designed and implemented map view for post creation: 

<img src="https://camo.githubusercontent.com/405fe6e54460652d472d04701b2ea5fa342a28566ce6ee6a7dd59e0ae66f2d47/68747470733a2f2f6c68372d72742e676f6f676c6575736572636f6e74656e742e636f6d2f646f63737a2f41445f346e586641654f6c624f7762686c4a2d386237326d38586d7159526d4d3548434954785849734d35374e59434e62427837577862534d4841796975754f75756155776b335f5167713248524d41345036714238787061367a48785443694b63596d5a44503158327a5438506d4c525132357a6f4c4d51415642764c694450775958426947463245626f3f6b65793d64783739477734664579726e5f595456744e394f2d553861" height="480px" width="auto"/>
<img src="https://camo.githubusercontent.com/8b58e6a55d4f0ae845312f99f24e3a3cf1eb16692bac1f2de7831c62d8b96bd2/68747470733a2f2f6c68372d72742e676f6f676c6575736572636f6e74656e742e636f6d2f646f63737a2f41445f346e58655667385068594376686b4b77773265346c66496642345968746a4959473273787572675036306a3450377558796c39326b4f5630377a6e754d455242745973314c662d435f64494e5f364a6471737868564f502d33455139504a4c436c39416569645876554e464657727271507248523365586f3636744c6b7661454d6b61442d4a56695945513f6b65793d64783739477734664579726e5f595456744e394f2d553861" height="480px" width="auto"/>

#### Challenges:

The only challenge was to find a reliable source to serve our users a good quality map, while being on budget. Google Maps API could seem like the first choice but being costly and more complex to implement (Google API account creation, API implementation to project, fetching from an API, etc.) puts it below the list. We chose OpenStreetView, because it is open source and free. Also, it needs only a script import to the index file. Thus, it is basically the only contender.

#### Code Review  

#### Code Reviewed by Me  
- **Pull Request:**  #111, #106 (frontend part)

I reviewed most of the frontend code implemented to the project by our group.

**Result:** Thanks to our talented group, the codes were already met up to the quality needs most of the time. If not, I either respond with a detailed description of the problem or if there is an urgency, i fix it myself and merge.


### Muharrem Ustaoğlu

#### Related Requirements

**Activity Feed:** F45, F46, F47  
**Badge:** F69, F70, F71, F72, F73, F74, F75, F76  

---

#### Description 

I actively contributed to key features of the project, focusing on the Activity Feed and Badge System functionalities. For the Activity Feed, I developed both backend and frontend components to display user activities with relative timestamps, showcasing the last ten actions. This feature supports a wide range of user and community actions, including creating posts, adding comments, earning badges, liking posts, following users, joining or creating communities, and performing administrative tasks such as assigning moderators or banning users. In the Badge System, I implemented backendside both default community-specific and criteria based community-specific badges, automating badge assignments based on predefined criteria. This included developing functionality to evaluate whether users meet badge criteria based on specific activity metrics within a defined period (e.g., the last year). The metrics tracked encompass the number of posts, comments, likes, templates created, and users followed within a community. By leveraging database queries and timestamp filtering, the system ensures real-time tracking and accurate badge assignments.

---

#### URLs

---
##### Issue URLs  

- **#45**: [Determine Badge-User Entity Relation](https://github.com/swe574-Fall2024-Group1/huddleup/issues/45)  
- **#46**: [Determine Post-Tag Entity Relation](https://github.com/swe574-Fall2024-Group1/huddleup/issues/46)  
- **#60**: [Community Parameter Based Badge Endpoint Implementation](https://github.com/swe574-Fall2024-Group1/huddleup/issues/60)  
- **#90**: [Community Activity Feed](https://github.com/swe574-Fall2024-Group1/huddleup/issues/90)  
- **#107**: [Badge Like Action Logic](https://github.com/swe574-Fall2024-Group1/huddleup/issues/107)  
---
##### Source Code URLs  

- **Branches:**  
  - [feature/parameter-based-badge](https://github.com/swe574-Fall2024-Group1/huddleup/tree/feature/parameter-based-badge)  
  - [feature/community-activity-feed](https://github.com/swe574-Fall2024-Group1/huddleup/tree/feature/community-activity-feed)  
  - bugfix/badge-like-action-logic  
---
##### Documentation URLs  

- **Mockups:**  
  [Scenarios & Mockups](https://github.com/swe574-Fall2024-Group1/huddleup/wiki/Scenarios-&-Mockups)  
- **Requirements:**  
  [Software Requirements Specification (SRS)](https://github.com/swe574-Fall2024-Group1/huddleup/wiki/Software-Requirements-Specification-(SRS))
- **Requirements Review:** Reviewing old requirements to merge with new requirements.   
---
##### Designing Entity Relationships  

- Developed entity relationships for newly added features such as badges, recommendations, and tags. 
- **#45**: [Determine Badge-User Entity Relation](https://github.com/swe574-Fall2024-Group1/huddleup/issues/45)  
- **#46**: [Determine Post-Tag Entity Relation](https://github.com/swe574-Fall2024-Group1/huddleup/issues/46)  

---
#### Pull Requests and Commits  

**Pull Request:** Feature/community activity feed **#99**  
- **Commits:**  
  - [`7ffe4f1`](https://github.com/swe574-Fall2024-Group1/huddleup/pull/99/commits/7ffe4f1130d3de8766080ee0adc62e5512ab5b6c): feat: community activity model is added  
  - [`7bb027f`](https://github.com/swe574-Fall2024-Group1/huddleup/pull/99/commits/7bb027fdc20a84b197336284705908c2a8d3a3c2): feat: community activity feed endpoint is added  
  - [`44b51e7`](https://github.com/swe574-Fall2024-Group1/huddleup/pull/99/commits/44b51e75b39088c036c8de50307493ec1cf27033): feat: activity feed for community is added  
  - [`fd6d6b4`](https://github.com/swe574-Fall2024-Group1/huddleup/pull/99/commits/fd6d6b43e8833726479836dd7846f3f75e2ad492): feat: create badge action log is added  
  - [`37070b1`](https://github.com/swe574-Fall2024-Group1/huddleup/pull/99/commits/37070b1abcd6e8af620ab0800356a3fc32d0ba9f): feat: community activity feed scroll is added  
  - [`f30f369`](https://github.com/swe574-Fall2024-Group1/huddleup/pull/99/commits/f30f3699b43ead4ee87471036688c4b488d940c9): feat: user management (make owner, make moderator, banned) for activity feed  
  - [`e2e80c5`](https://github.com/swe574-Fall2024-Group1/huddleup/pull/99/commits/e2e80c598199c770817852ec17593b96fbcbadf8): fix: duplicated description fields removed  

**Pull Request:** fix: badge like action logic is fixed **#108**  
- **Commits:**  
  - [`b5723ec`](https://github.com/swe574-Fall2024-Group1/huddleup/pull/108/commits/b5723ec): fix: badge like action logic is fixed  

**Pull Request:** Feature/parameter based badge **#80**  
- **Commits:**  
  - [`16f3fb0`](https://github.com/swe574-Fall2024-Group1/huddleup/pull/80/commits/16f3fb08f961f6fb86228ec62b4e8e57d1296cee): feat: community-based badge system is added  
  - [`cb4d40a`](https://github.com/swe574-Fall2024-Group1/huddleup/pull/80/commits/cb4d40a396ea65ed9255e5cc7859a8250ad8b659): feat: multiple parameter badge control is added  
  - [`c1dcf26`](https://github.com/swe574-Fall2024-Group1/huddleup/pull/80/commits/c1dcf264a727dc540446563b19445c7473247758): fix: badge with community_id get request  
  - [`e1a05f9`](https://github.com/swe574-Fall2024-Group1/huddleup/pull/80/commits/e1a05f9a32252db78659686045549cf42a7d03aa): fix: badge model community field is null removed  
  - [`c8c7689`](https://github.com/swe574-Fall2024-Group1/huddleup/pull/80/commits/c8c768997f1f7c5607b4001d298ae10540d01c3a): fix: check_and_award_badges automatic badge filter is added  
  - [`63da640`](https://github.com/swe574-Fall2024-Group1/huddleup/pull/80/commits/63da6406b0f8114027272e788068d52465a17c21): fix: seeder intended block & multi-parameter null check  
---
#### Executive Summary  

I actively contributed to the Activity Feed, Badge System, and the design of Entity Relationships to develop newly added features such as badges, recommendations, and tags. My efforts focused on developing and integrating backend and frontend components to ensure seamless functionality and scalability.


---
##### Activity Feed  

- Developed a community activity feed to display user activities with relative timestamps (e.g., "2 minutes ago"), restricted to the last ten actions.  
- Supported a diverse range of user and community actions, including:  
  - Creating posts  
  - Adding comments  
  - Creating badges  
  - Earning badges  
  - Liking posts  
  - Creating templates  
  - Joining communities  
  - Creating communities  
  - Assigning moderators  
  - Banning members  
  - Transferring ownership of communities  
- Implemented real-time tracking and pagination for efficient scrolling through the feed.  
- Leveraged optimized database queries for time filtering and activity categorization, ensuring high performance and scalability.  


**Related Requirements:** F45, F46, F47  
**Related Scenario:** [Wiki Page: Scenarios & Mockups](https://github.com/swe574-Fall2024-Group1/huddleup/wiki/Scenarios-&-Mockups)  
**Related Issues:** [#90](https://github.com/swe574-Fall2024-Group1/huddleup/issues/90)  

---
##### Badge System  

- Designed and implemented a **comprehensive badge system** supporting both default and community-specific badges with automatic and manual assignment.  
- Developed functionality to evaluate user activity metrics within a defined timeframe (e.g., the last year) to determine badge eligibility.  
- Integrated parameters such as:  
  - Number of posts  
  - Comments  
  - Likes on posts  
  - Templates created  
  - Users followed  
- Supported **default badges** with system criteria (criteria for each default is 5):  
  - **Post Master:** Awarded for creating a specific number of posts.  
  - **Commentator:** Awarded for creating a specific number of comments.  
  - **Social Butterfly:** Awarded for gaining a specific number of followers.  
  - **Template Creator:** Awarded for creating a specific number of templates.  
  - **Appreciated:** Awarded for receiving a specific number of likes.  
- Enabled **community-specific badges**, allowing community owners to define criteria for automatic badges or assign manual badges.  
- Ensured badges are restricted to the community where they were earned.  

**Related Requirements:** F69, F70, F71, F72, F73, F74, F75, F76  
**Related Scenario:** [Wiki Page: Scenarios & Mockups](https://github.com/swe574-Fall2024-Group1/huddleup/wiki/Scenarios-&-Mockups)  
**Related Issues:** [#45](https://github.com/swe574-Fall2024-Group1/huddleup/issues/45), [#60](https://github.com/swe574-Fall2024-Group1/huddleup/issues/60), [#107](https://github.com/swe574-Fall2024-Group1/huddleup/issues/107)  


---
##### Entity Relationship Design  

- Designed **entity relationships** for badges and tags to support new features.  
- Developed models including **Badge**, **Tag**, **UserBadge**, and **CommunityActivity** to ensure compatibility with requirements.  

**Related Issues:**  
- [Database Entity Decision #45](https://github.com/swe574-Fall2024-Group1/huddleup/issues/45)  
- [Database Entity Decision #46](https://github.com/swe574-Fall2024-Group1/huddleup/issues/46)  

---
##### Documentation & Mockups  

- Created scenarios and mockups for badges, recommendations, and tags in the [Wiki Scenarios & Mockups section](https://github.com/swe574-Fall2024-Group1/huddleup/wiki/Scenarios-&-Mockups).  
- Reviewed and merged new requirements with older specifications to maintain a coherent project scope.  
- Determined the status of project requirements.  
- Prepared the user manual in final report.  

#### Code Explanation  

##### Activity Feed

###### Implemented Features

###### Real-time Activity Tracking
- **Feed Display**:
  - Displays user and community activities, such as:
    - Creating posts, comments, and templates.
    - Earning badges.
    - Liking posts and comments.
    - Managing community roles (e.g., assigning moderators, banning users, transferring ownership).
  - Activities are displayed with relative timestamps (e.g., "2 minutes ago").
  - Limited to the last 10 actions for efficiency.

###### Backend Logic
###### CommunityActivity Model
A model to log user actions with detailed attributes:
- **Fields**:
  - `activity_id`: A unique ID for the activity.
  - `user`: Links to the user who performed the action.
  - `community`: Links to the community where the action occurred.
  - `action`: Type of action (e.g., "Created a post").
  - `target`: Additional context for the action (e.g., post ID, badge name).
  - `timestamp`: Auto-generated timestamp for the activity.

###### Functions
###### `log_community_activity(user, community_id, action, target=None)`
- Records a user action in the community activity feed.
- Tracks actions such as:
  - Creating posts, comments, badges, and templates.
  - Earning badges.
  - Liking posts and comments.
  - Joining and creating communities.
  - Managing community roles (e.g., assigning moderators, banning members).
- **Implementation**:
  - Creates a new record in the `CommunityActivity` model.
  - Stores optional details (e.g., badge name, post ID) as a JSON string in the `target` field.

###### `@api_view(['POST'])`
###### `get_community_activity_feed(request)`
- Fetches the most recent activities in a community.
- **Steps**:
  1. Parse the `community_id` from the request payload.
  2. Query the `CommunityActivity` model for the last 10 activities in the specified community.
  3. Return the data as a JSON response.

###### Related Requirements
- **F45, F46, F47**

###### Issues and Pull Requests
- **Issue**: #90 Community Activity Feed
- **Pull Request**: Feature/community activity feed #99

---
##### Badge System

###### Implemented Features

###### Default Badges
- **Automated Assignment**:
  - Based on predefined criteria, such as:
    - Post Master
    - Commentator
    - Social Butterfly
    - Template Creator
    - Appreciated
  - Criteria include activity metrics (e.g., post count, likes, templates created).

###### Community-Specific Badges
- **Manual Badges**:
  - Created and assigned by community owners.
- **Automatic Badges**:
  - Defined by criteria (e.g., posts, comments, upvotes, locations).
- **Integrated Badge Logic**:
  - Function: `meets_badge_criteria`
  - Handles single and multiple criteria.

###### API Endpoints
- **Badge Assignment**:
  - Automatically evaluates user activities and assigns badges.
- **Default Badge Initialization**:
  - Creates default badges for new communities.

###### Backend Logic

###### Badge Model
- **Fields**:
  - `badge_id`: A unique ID for each badge.
  - `name`: Name of the badge (e.g., "Post Master").
  - `criteria`: JSON field defining rules for earning badges (e.g., `{"post_count": 10}`).
  - `community_id`: Links the badge to a specific community; null for system-wide badges.
  - `type`: Badge type (default, manual, or automatic).
  - `description`: Explanation of the badge's purpose.
  - `image_url`: Optional image for the badge.
  - `created_at`: Auto-generated timestamp when the badge is created.

###### UserBadge Model
- **Fields**:
  - `user_badge_id`: A unique ID for the record.
  - `user`: Links to the user who earned the badge.
  - `badge`: Links to the badge the user earned.
  - `awarded_at`: Auto-generated timestamp when the badge was awarded.

###### Functions
###### `check_and_award_badges(user, community_id)`
- Evaluates if a user qualifies for automatic badges in a community.
- **Steps**:
  1. Fetch the community and its automatic badges.
  2. Skip badges the user already possesses.
  3. Use `meets_badge_criteria` to evaluate badge requirements.
  4. Award the badge by creating a `UserBadge` record.
  5. Log the event in the community activity feed via `log_community_activity`.

###### `meets_badge_criteria(user, community, criteria)`
- Determines if a user satisfies the conditions for earning a badge.
- **Steps**:
  1. Define a one-year timeframe for evaluating user activities.
  2. Fetch user-specific metrics (e.g., posts, comments, likes) for the community.
  3. Compare metrics against the badge criteria.
  4. Return `True` if all conditions are met, otherwise `False`.

###### `create_default_badges_for_community(community)`
- Automatically generates standard badges with predefined criteria for new communities.
- **Example**:
  - Community: "Foodies"
  - Badges Created:
    - "Foodies - Post Master"
    - "Foodies - Commentator"
    - "Foodies - Social Butterfly"

###### Related Work  
- **F69-F70-F71-F72-F73-F74-F75-F76**  
- **Issues**:
  - [#45 Badge-User Entity Relation](https://github.com/swe574-Fall2024-Group1/huddleup/issues/45)  
  - [#60 Community Parameter Based Badge](https://github.com/swe574-Fall2024-Group1/huddleup/issues/60)  
  - [#107 Badge Like Action Logic](https://github.com/swe574-Fall2024-Group1/huddleup/issues/107)  
- **Pull Requests**:  
  - [Feature/parameter-based-badge #80](https://github.com/swe574-Fall2024-Group1/huddleup/pull/80)  
  - [Fix: Badge Like Action Logic #108](https://github.com/swe574-Fall2024-Group1/huddleup/pull/108)  
- **Documentation**: [Scenarios & Mockups](https://github.com/swe574-Fall2024-Group1/huddleup/wiki/Scenarios-&-Mockups)  
---

#### Documentation  

##### Contributions  
- Created scenarios and mockups for badges, recommendations, and tags in the [Wiki Scenarios & Mockups section](https://github.com/swe574-Fall2024-Group1/huddleup/wiki/Scenarios-&-Mockups).  
- Reviewed and merged new requirements with older specifications to maintain a coherent project scope.  
- Formatted requirements and updated the status of project requirements.  
- Prepared a comprehensive user manual to assist users in understanding and utilizing the system's functionalities.  

---

#### Demo  

##### **Activity Feed**  
![Activity Feed Screenshot](https://i.ibb.co/YZM39tN/feed.png)
- Developed a real-time activity feed displaying the latest user and community activities with relative timestamps (e.g., "2 minutes ago").  
- Integrated scroll functionality with server-side pagination and frontend lazy loading for seamless user experience.  

##### **System Automatic Badge**  
![System Automatic Badge Screenshot](https://i.ibb.co/q00jZfc/17-create-automatic-badge.png) 
- Automated badge assignment based on predefined criteria (e.g., "Post Master" for creating a specific number of posts).  
- Implemented dynamic real-time updates of badge achievements in the activity feed.

---

#### Challenges and Solutions  

During the implementation, I faced several challenges that required careful attention and problem-solving. This was my first experience working collaboratively on the same repository with other team members, which made managing conflicts and integrating code a new and complex process. Resolving merge conflicts and maintaining coding standards was initially difficult, but I addressed this by adopting best practices, such as using feature branches, rebasing, and regularly synchronizing with the main branch. Adding scroll functionality to the activity feed was another significant challenge, as it required integrating real-time updates while ensuring smooth user experience and efficient data fetching.Displaying relative timestamps like "2 minutes ago" in the activity feed also presented difficulties, particularly in dynamically calculating time differences while considering time zones. I resolved this by using calculation to format timestamps. Badge integration was equally complex, as badges are used in various actions like earning or creating them, requiring real-time updates and linking badge data to the activity feed. Furthermore, the algorithm for evaluating badge criteria involved checking multiple parameters, such as posts, comments, and likes, within specific timeframes. This added complexity in querying large datasets efficiently and dynamically handling diverse conditions. I addressed this by optimizing database queries with Django’s ORM and structuring the criteria-checking logic to handle various combinations of conditions flexibly. These challenges taught me the importance of efficient problem-solving and effective collaboration in delivering robust features.

 
#### Code Review  

##### Pull Requests Reviewed  

###### **1. Feature: Parameter-Based Badge System (#80)**  
- **Author**: Mustafa Tuna  
- **Scope**: Frontend implementation of the parameter-based badge system.  
- **Review Process**:  
I reviewed the pull request created by Mustafa Tuna for the parameter-based badge system. While I had already completed the backend development for this feature, Mustafa implemented the frontend side and created the pull request. Before merging, I performed a bugfix to address issues in the backend logic and then merged the pull request after ensuring the feature was fully functional. 

###### **2. Feature: Adding the M2 Customer Report (#87)**  
- **Author**: Aibek Aldabergenov  
- **Scope**: Implementation of the M2 customer report functionality.  
- **Review Process**:  
I reviewed the pull request created by Aibek Aldabergenov titled "Adding the m2 customer report" #87. During the review process, I carefully examined the code for functionality, adherence to project standards, and compatibility with existing modules. I did not find any bug and I approved the pull request.

###### Inferences  
- Collaborative reviews helped identify and fix issues early, ensuring high-quality deliverables.  
- Enhanced features by addressing minor bugs and improving system performance during the review process.  

##### Results of Code Reviews  

###### Review Outcomes  

###### **1. Integration**  
  - I thoroughly reviewed the functionality, readability, and overall design.  
  - Upon confirming that the code met all criteria, I approved the changes without requesting modifications.  
  - This streamlined the development process, avoiding unnecessary delays and maintaining project momentum.

###### **2. Conflict Resolution and Bug Fixing**  
- When the submitted code contained issues, such as conflicts with the existing codebase or logical errors:  
  - I identified specific problems, including:  
    - **Merge conflicts**: Code inconsistencies arising from parallel changes.  
    - **Logical errors**: Flaws in the implementation affecting functionality.  
  - Communicated these issues to the contributor through comments, providing clear feedback, suggestions, and alternative approaches.  
  - For more complex issues, I actively collaborated with the contributor to:  
    - Resolve merge conflicts.  
    - Debug and fix errors.  
    - Enhance test coverage.
 - I actively engaged in collaborative feedback, debugging, and validation processes, providing detailed guidance, resolving complex issues, and ensuring all updates met project standards before approval. 

##### **Resulting Code Improvements**  
- **Parameter-Based Badge System (#80)**:  
  - As a result of my review, backend bugs were identified and fixed to ensure compatibility with Mustafa Tuna’s frontend implementation.  
  - The finalized feature exhibited seamless integration between frontend and backend, offering a robust and user-friendly badge system.  

- **M2 Customer Report (#87)**:  
  - During the review, I reviewed Aibek Aldabergenov’s implementation and did not find  any bug and I approved it.   


#### Major Pull Request: Activity Feed  

##### **1. Feature/community-activity-feed (#99)**  

###### **Description**  
- Implemented the **Community Activity Feed**, a key feature that displays user and community activities in real-time.  
- Activities are displayed with relative timestamps (e.g., "2 minutes ago") and include a wide range of actions, such as:  
  - Creating posts, comments, and templates.  
  - Earning badges.  
  - Liking posts and comments.  
  - Managing community roles (e.g., assigning moderators, banning members, transferring ownership).  

- **Backend Implementation**:  
  - Created the `CommunityActivity` model to log user actions with fields like `user`, `community`, `action`, `target`, and `timestamp`.  
  - Developed a function `log_community_activity` to record activities efficiently.  
  - Implemented server-side pagination for fetching the last 10 activities in a community to optimize performance and scalability.  

- **API Endpoint**:  
  - Created the `get_community_activity_feed` endpoint to retrieve recent activities.  
  - Returned structured JSON data with user details, action descriptions, targets, and timestamps for seamless integration with the frontend.  

- **Frontend Integration**:  
  - Collaborated with frontend developers to ensure proper display and functionality.  
  - Supported lazy loading for efficient scrolling through the activity feed.  

###### **Challenges Addressed**  
1. **Real-Time Updates**:  
   - Implemented efficient logging and querying to ensure that activities are displayed in real-time without performance bottlenecks.  
   
2. **Relative Timestamps**:  
   - Ensured accurate display of timestamps across different time zones by formatting them on the backend.  

3. **Diverse Actions**:  
   - Integrated support for various user and community actions, including administrative tasks like banning members and transferring ownership.  

###### **Outcome**  
- Delivered a fully functional, scalable activity feed that provides users with a real-time view of community actions.  
- The feature was tested extensively for performance, usability, and compatibility with existing modules.  
- Addressed all code review feedback to ensure the feature met project standards.

###### **Pull Request Details**  
- **Pull Request**: [Feature/community-activity-feed #99](https://github.com/swe574-Fall2024-Group1/huddleup/pull/99)  
- **Commits**:  
  - `7ffe4f1`: feat: community activity model is added.  
  - `7bb027f`: feat: community activity feed endpoint is added.  
  - `44b51e7`: feat: activity feed for community is added.  
  - `fd6d6b4`: feat: create badge action log is added.  
  - `37070b1`: feat: community activity feed scroll is added.  
  - `f30f369`: feat: user management (make owner, make moderator, banned) for activity feed.  
  - `e2e80c5`: fix: duplicated description fields are removed.  

#### Issues  

##### **Major Issues Created**  

| **Issue ID** | **Title** | **URL** |
|--------------|---------------------------|---------------------------------------------------------------------------------------------|
| #45          | Badge-User Entity Relation|[Issue #45](https://github.com/swe574-Fall2024-Group1/huddleup/issues/45)|
| #46          | Post-Tag Entity Relation  | [Issue #46](https://github.com/swe574-Fall2024-Group1/huddleup/issues/46)|
| #60          | Community Parameter-Based Badge Endpoint Implementation|[Issue #60](https://github.com/swe574-Fall2024-Group1/huddleup/issues/60)|
| #90          | Community Activity Feed   | [Issue #90](https://github.com/swe574-Fall2024-Group1/huddleup/issues/90)|
| #107         | Badge Like Action Logic| [Issue #107](https://github.com/swe574-Fall2024-Group1/huddleup/issues/107)|
---

##### **Major Issues Assigned to Me**  
 

| **Issue ID** | **Title** | **URL**  |
|--------------|------------------------------------------------|---------------------------------------------------------------------------------------|
| #3 | Check each other's swe573 repositories|[Issue #3](https://github.com/swe574-Fall2024-Group1/huddleup/issues/3) |
| #17| Create requirements for HuddleUp application| [Issue #17](https://github.com/swe574-Fall2024-Group1/huddleup/issues/17)|



---

##### Other Work Performed  

1. **Documentation**:  
   - Created detailed scenarios and mockups for badges, recommendations, and tags in the [Wiki Scenarios & Mockups section](https://github.com/swe574-Fall2024-Group1/huddleup/wiki/Scenarios-&-Mockups).  
   - Reviewed and merged new requirements with older specifications to maintain a coherent project scope.  
   - Prepared a user manual to assist users in understanding the system's functionalities.  

2. **Code Reviews**:  
   - Reviewed pull requests, including [Feature/parameter-based-badge #80](https://github.com/swe574-Fall2024-Group1/huddleup/pull/80) and [Adding the m2 customer report #87](https://github.com/swe574-Fall2024-Group1/huddleup/pull/87).  
   - Provided feedback, suggested improvements, and fixed backend issues where necessary.

---

### Aibek Aldabergenov

#### **1. Backend Architecture Enhancements**

- **Description:** Prepared the backend for group development in the early stages of the project. The major contributions are: switching the database system from MongoDB to PostgreSQL, changing the User model for registration and authentication using token, creating Docker files for local development by team members.
- **Relevant Issue:** [#12](https://github.com/swe574-Fall2024-Group1/huddleup/issues/12) [#47](https://github.com/swe574-Fall2024-Group1/huddleup/issues/47)

#### **2. Developing the Tagging system for Posts and Users**

- **Description:** Added the functionality of attaching tags to User profiles and to Posts. The changes were made on the database side, backend side and the frontend.
- **Relevant Issue:** [#46](https://github.com/swe574-Fall2024-Group1/huddleup/issues/46)

#### **3. Developing the logic for Community recommendation based on cosine similarity**
- **Description:** Added the logic for recommending communities to users based on the tag strings used by users and in communities. The method uses cosine similarity algorithm.
- **Relevant Issue:** [#6](https://github.com/swe574-Fall2024-Group1/huddleup/issues/6)

#### **4. Developing the logic for Community recommendation based on semantic tags from Wikidata**
- **Description:** Adapting the existing database structure and functions for integrating labels from Wikidata for using as tags in posts and user profiles. The community recommendation system uses Wikidata properties P279 (subclass of) and P31 (instance of).
- **Relevant Issue:** [#6](https://github.com/swe574-Fall2024-Group1/huddleup/issues/6) [#26](https://github.com/swe574-Fall2024-Group1/huddleup/issues/26)

#### Executive Summary
My major contribution to this project is adding the community recommendation system based on semantic tags powered by Wikidata labels.

#### Documentation
I did not make any major contributions to project documentation.

#### Challenges
The main challenge in this project for me was making changes to existing frontend code since I only focus on backend development. Specifically, when adding the functionality for tagging posts and user profiles, integrating the autocomplete component for tag searching into the UI required me to read ReactJS documentation and spend a considerable amount of time debugging and fixing code. You can see the component on the screenshot below.

#### Demo
Tagging system using semantic tags powered by Wikidata
<img src="https://github.com/user-attachments/assets/7e894326-9033-4ec8-908c-d69dc9303fe1"/>

#### Code review
**Each pull request I reviewed was first ran by me locally to test if it does not break existing functionality. Also, if there were any conflicts with the target branch, they were fixed where needed**
- PR[#79](https://github.com/swe574-Fall2024-Group1/huddleup/pull/79) Reviewed Övünç's pull request related to User recommendation. I approved the PR, and it was merged to dev from feature/user-recommendation branch.
- PR[#111](https://github.com/swe574-Fall2024-Group1/huddleup/pull/111) Reviewed Mustafa's pull request related to enhancements in the User profile. The pull request was merged to dev from feature/user-profile-enhancement after being reviewed by me and Erkin.
- PR[#112](https://github.com/swe574-Fall2024-Group1/huddleup/pull/112) Reviewed Övünç's pull request related to User recommendation based on Wikidata relationship data. I approved the PR, and it was merged to dev from feature/user-wikidata-recommendations branch.

#### Pull requests
- PR[#68](https://github.com/swe574-Fall2024-Group1/huddleup/pull/68) Includes the functionality for attaching tag strings to posts and user profiles
- PR[#74](https://github.com/swe574-Fall2024-Group1/huddleup/pull/74) Adding the Recommended Communities section on the frontend
- PR[#106](https://github.com/swe574-Fall2024-Group1/huddleup/pull/106) This PR includes the changes that integrate the Wikidata label usage as tags when creating posts or adding tags to user profiles

#### Issues  

##### **Major Issues Created by Me**  

| **Issue ID** | **Title** | **URL**                                                                     |
|--------------|---------------------------|-----------------------------------------------------------------------------|
| #1           | Decide if we should start the backend functionality from scratch or use one of our own repository as base| [Issue #1](https://github.com/swe574-Fall2024-Group1/huddleup/issues/1)    |
---

##### **Major Issues Assigned to Me**  
 

| **Issue ID** | **Title** | **URL**                                                                   |
|--------------|------------------------------------------------|---------------------------------------------------------------------------|
| #6           | Decide how community recommendation should work| [Issue #6](https://github.com/swe574-Fall2024-Group1/huddleup/issues/6)   |
| #12          | Change database from mongodb to postgresql | [Issue #12](https://github.com/swe574-Fall2024-Group1/huddleup/issues/12) |


---

### Övünç Ertunç

#### Key Contributions:

##### 1. Edit Geolocation with Interactive Map
###### Requirement: F35
###### Description: 
F35 is about editing existing post. My part was about editing geolocation field.
###### Related Issues: #96
###### Implementation: 
I added the functionality to edit geolocation field via interactive map. [commit](https://github.com/swe574-Fall2024-Group1/huddleup/pull/97/commits/0e637e486670748eed1c2de6eeac040a598f3b9d)
###### Pull request: #97
PR #97 Erkin is reviewed and inform me that we lost map view adjustment when user selects "current location". And I revert the related function to bring it back. PR #101

###### Demo:
![alt text](image.png)

##### 2. Redirect Users to User Page in Basic Search
###### Requirement: F40
###### Description: 
F40 is related to basic search functionality. The basic search was implemented before. However, it was not redirecting for user profile.
###### Related Issues: #113
###### Implementation:
I added "else if" statement for "option type" user and I navigated users to user endpoint with the option id. "Option" comes from basic search result of the user. Type is community or user.
###### Pull request: #111
I included this in PR #111 with other related issues. This PR also has Mustafa's commits. Therefore, it is reviewed by other team members. Aibek reviewed backend side, and by Erkin reviewed frontend side. Both stated that everything is fine, and PR is merged to dev.
###### Demo:
![alt text](report_assets/image-1.png)

##### 3. User Recommendations with Wikidata Tags
###### Requirement: F64
###### Description: 
F64 states that user recommendation mechanism should include both user interactions and user tags. In MVP, we only had user interaction based user recommendations.
###### Related Issues: #109
###### Implementation:
In [update_recommendations.py](https://github.com/swe574-Fall2024-Group1/huddleup/huddleupAPI/communityAPI/management/commands/update_recommendations.py) file, Aibek has developed community recommendation logic. I improved the existing ones and added new functions for user to user recommendation. 
1. get_user_interest_profile function gets user tags from both their profile and their posts. I improved this function to include get_all_ancestors function, which searches for ancestor wikidata tags.
2. I created get_not_followed_users(user) function. It returns the users that are not followed by the input user.
3. I created recommend_users(user) function. It calls previously stated functions to get user tags and not followed users. It also calls get_user_interest_profile for each candidate user (not followed user). And, if it finds exact match between input user and candidate user, it calculates cosine simularity score. If there is no exact match, but have parent-child relationship, it does not calculate cosine simularity, but it appends user recommendation list, though. It returns the first 10 recommendation results.
4. I called recommend_users(user) function inside handle function so that update_recommendation can also include user recommendation logic. It runs for every active user. If it finds any recommendation, it adds new record to UserUserRecommendation table in database. The table is created in django models with user and recommended_user fields as foreign keys of "authAPI.User" table. It also has score (cosine similarity score) and created_at date.
###### Unit tests: 
This [commit](https://github.com/swe574-Fall2024-Group1/huddleup/commit/74c7edc33ee7c1a479080d62200a304a6bfa0756) includes unit tests for the get_recommended_users API to ensure it provides correct user recommendations. The setup involves creating four users, a community, posts, comments, likes, and follow connections to simulate a realistic environment. In the first test, the endpoint is tested with active interactions, where user1 should receive recommendations for user3 and user4 since they are not already followed but have interacted with user1’s posts or comments. The second test clears all interactions and follow connections, ensuring the endpoint returns no recommendations, validating that recommendations are based on existing interactions.
###### Pull request: #112
PR #112 is reviewed by Aibek. He solved the merge conflicts. In this conflict, p31 relationship was removed in community recommendation. He readded this relationship. However, he removed p279 relationship in user recommendation system. And approved and merged this PR. After that we talked about that. He reverted p279 relationship to user recommendation system.
 

##### 4. User Interface Improvements
###### Requirement:
This section covers user interface enhancements. These are not explicitly stated in requirements, but they improve usability in the application.
###### Description and related issues: 
Mustafa has initialized user profile picture functionality in user profile with other necessary fields. He also added user profile picture and user profile redirection in some parts of the application. I reviewed his code in PR #111 and I added the other remaning parts. These are can be listed as:
1. Members in community members panel  were centered before, which was seen untidy (Can be seen in issue #114)
2. User profile redirection was not set: #92
3. User profile picture was not shown in some parts: #94, #115, #118

###### Implementation:
1. Community members are aligned to be at left hand side. Issue: #114
In [Community Layout](https://github.com/swe574-Fall2024-Group1/huddleup/blob/main/huddleupui/src/layouts/CommunityLayout.jsx) row of Owners, Moderators and Members Card updated as justify "start".

2. User profile redirection is set in community page in members section and in posts for author names. #92
In Community Layout, row of Owners, Moderators and Members Card avatar link is added with users endpoint with user id. 

3. User profile picture is set. #115
3.1. Community members/moderators/owners profile picture is set.
In Community Layout, row of Owners, Moderators and Members Card avatar is replaced by user profile_picture which comes from backend django views (get_community_members, get_community_owners, get_community_moderators).

3.2. At posts, at right side bar connections list, at discover users page, at navigation bar. #94
In [Post JS](https://github.com/swe574-Fall2024-Group1/huddleup/blob/main/huddleupui/src/components/Community/Post.js), card meta avatar is updated to include profile picture of the post author. Since backend sends profile_picture, I dont need to add any logic to backend side. Same logic is also added to [Feed Post](https://github.com/swe574-Fall2024-Group1/huddleup/blob/main/huddleupui/src/components/Feed/FeedPost.js), [RightSide bar](https://github.com/swe574-Fall2024-Group1/huddleup/blob/main/huddleupui/src/components/MainLayout/RightSidebar.jsx), [Nav bar](https://github.com/swe574-Fall2024-Group1/huddleup/blob/main/huddleupui/src/components/MainLayout/Navbar.jsx), [Discover User](https://github.com/swe574-Fall2024-Group1/huddleup/blob/main/huddleupui/src/pages/DiscoverUsers.jsx).

###### Pull request: #111
I included this in PR #111 with other related issues. This PR also has Mustafa's commits. Therefore, it is reviewed by other team members. Aibek reviewed backend side, and by Erkin reviewed frontend side. Both stated that everything is fine, and PR is merged to dev.
###### Demo:
![alt text](report_assets/image-2.png)
![alt text](report_assets/image-3.png)
![alt text](report_assets/image-4.png)


##### 5. Badge Icon Improvement
###### Requirement:
This section covers user interface enhancements. These are not explicitly stated in requirements, but they improve usability in the application.
###### Description and related issues: 
All default badge icons were the same picture. They should distinct icons and they should reflect its meaning. #117
###### Implementation:
There was a static badge icon for default badges by stating src link with badge name. I created switch-case statement. For example, if badge name equals to "community name - Post Master", its icon link is a postman. In case "community name - Commentator", its icon is call center representative, because they answer people's questions. 
This switch-case logic is added to the places where badges are shown. These are:
1. At user profile page, there are awarded badges.
2. In community page, at the right side bar, there is badges panel which shows available badges for that community.
3. In community page, near post author name, we show awarded badges of the post author.
###### Pull request: #119
Doruk reviewed the PR #119. He approved and merged to dev environment.
###### Demo:
![alt text](report_assets/image-5.png)
![alt text](report_assets/image-6.png)
![alt text](report_assets/image-7.png)


#### Executive Summary:

##### 1. Edit Geolocation with Interactive Map (F35)
Erkin developed interactive map for geolocation field. However, when user wants to edit their post, the geolocation field was not providing interactive map. I added this functionality to edit post. In PR review of Erkin, he informed me about the partial loss of his development in adjusting map view when "current location" is selected. Based on this peer review, I reverted that part back.

##### 2. User Redirection in Basic Search (F40)
I enhanced the basic search functionality to redirect users to the profile pages. Its PR #111 includes other improvements, and 2 team members are reviewed both backend and frontend side and approved.

##### 3. User Recommendations with Wikidata Tags (F64)
I introduced a robust user recommendation system by incorporating both user social interaction and semantic tags from Wikidata. I included multiple functions for tag analysis, similarity scoring, and user ranking based on Aibek's implementation of wikidata on community recommendation system. The unit tests validated the user social interaction logic. The PR #112 is reviewed by Aibek. He fixed the conflicts and merged to dev branch.

##### 4. User Interface Improvements
For increasing user experience in the application, I populated user profile pictures and redirection links to user profile across multiple application sections. These changes are grouped in a collaborative pull request #111 and reviewed by 2 team members are reviewed both backend and frontend side, approved and merged.

##### 5. Badge Icon Enhancement
I customized badge icons to reflect their themes, replacing default static images. This update enhanced visual clarity of default badges across profile pages, community sidebars, and post author details. Its PR #119 reviewed, approved and merged by Doruk.


### Issues  
#### Issues Created by Me  

| **Title** | **URL** |  
|-----------|---------|  
| Create requirements for huddleup application | [#17](https://github.com/swe574-Fall2024-Group1/huddleup/issues/17) |  
| Create Mockup Screens from Requirements | [#18](https://github.com/swe574-Fall2024-Group1/huddleup/issues/18) |  
| Finalize requirements and create new elicitation questions based on unclear requirements  | [#19](https://github.com/swe574-Fall2024-Group1/huddleup/issues/19) |  
| Shall moderators or owners be able to manually give a "community specific badge" to a member? | [#10](https://github.com/swe574-Fall2024-Group1/huddleup/issues/20) |  
| Shall community specific badges be generated by the system according to the predefined criteria? | [#21](https://github.com/swe574-Fall2024-Group1/huddleup/issues/21) |  
| What kind of default badges is needed? | [#22](https://github.com/swe574-Fall2024-Group1/huddleup/issues/22) |  
| Is there a need to employ hashtags to keep track of trending topics in communities? | [#23](https://github.com/swe574-Fall2024-Group1/huddleup/issues/23) |  
| Is there a need to create polls in communities? If so, who can create, any member or moderators? | [#24](https://github.com/swe574-Fall2024-Group1/huddleup/issues/24) |  
| Default Badges Backend Implementation | [#65](https://github.com/swe574-Fall2024-Group1/huddleup/issues/65) |  
| User Recommendation Page Creation | [#71](https://github.com/swe574-Fall2024-Group1/huddleup/issues/71) |  
| bug: user recommendation the people who likes the comments of the current user are not listed in Discover Users page | [#77](https://github.com/swe574-Fall2024-Group1/huddleup/issues/77) |  
| Unit Test for User Recommendation | [#78](https://github.com/swe574-Fall2024-Group1/huddleup/issues/78) |  
| Bug: In community page, user profile redirection is not set for members and post authors | [#92](https://github.com/swe574-Fall2024-Group1/huddleup/issues/92) |  
| User profile should include name, surname, birthday, profile picture | [#93](https://github.com/swe574-Fall2024-Group1/huddleup/issues/93) |  
| User profile picture should be populated in all applicable areas. | [#32](https://github.com/swe574-Fall2024-Group1/huddleup/issues/94) |  
| interactive map implementation | [#96](https://github.com/swe574-Fall2024-Group1/huddleup/issues/96) |  
| Bug: Map view does not fit to current location | [#100](https://github.com/swe574-Fall2024-Group1/huddleup/issues/100) |  
| Add wikidata logic to user recommendation | [#109](https://github.com/swe574-Fall2024-Group1/huddleup/issues/109) |  
| Bug: Basic search user profile redirection does not work | [#113](https://github.com/swe574-Fall2024-Group1/huddleup/issues/113) |  
| Community Layout members are not aligned in members panel | [#114](https://github.com/swe574-Fall2024-Group1/huddleup/issues/114) |  
| Community members/moderators/owners profile picture is not visible | [#115](https://github.com/swe574-Fall2024-Group1/huddleup/issues/115) |  
| Default Badges do not have distinct and meaningful icons | [#117](https://github.com/swe574-Fall2024-Group1/huddleup/issues/117) |  
| bug: feed post author profile pictures are coming from the current user profile picture | [#118](https://github.com/swe574-Fall2024-Group1/huddleup/issues/118) |  
| editing own profile and viewing own profile are not separated | [#120](https://github.com/swe574-Fall2024-Group1/huddleup/issues/120) |  
| What kind of highlighting mechanism can be applied to a new or low-engaged communities? | [#25](https://github.com/swe574-Fall2024-Group1/huddleup/issues/25) |  
| Invitations should include community picture and link to redirect community page | [#95](https://github.com/swe574-Fall2024-Group1/huddleup/issues/95) |  
| Bug: User can follow themselves | [#102](https://github.com/swe574-Fall2024-Group1/huddleup/issues/102) |  
| Add description, members, owners, moderators to the community panel | [#105](https://github.com/swe574-Fall2024-Group1/huddleup/issues/105) |  
| While creating a post, if template has "time duration" field, post create bugs and community cannot be accessible | [#122](https://github.com/swe574-Fall2024-Group1/huddleup/issues/122) |
| While creating post template, if the order of the W3C standard data types are not followed, the posts created with this template gives mismatched field types | [#123](https://github.com/swe574-Fall2024-Group1/huddleup/issues/123) |

---

#### Issues Assigned to Me  

| **Title** | **URL** |  
|-----------|---------|  
| What kind of highlighting mechanism can be applied to a new or low-engaged communities? | [#25](https://github.com/swe574-Fall2024-Group1/huddleup/issues/25) |  
| Bug: User can follow themselves | [#102](https://github.com/swe574-Fall2024-Group1/huddleup/issues/102) |  
| Finalize requirements and create new elicitation questions based on unclear requirements | [#19](https://github.com/swe574-Fall2024-Group1/huddleup/issues/19) |  
| Shall moderators or owners be able to manually give a "community specific badge" to a member? | [#20](https://github.com/swe574-Fall2024-Group1/huddleup/issues/20) |  
| Shall community specific badges be generated by the system according to the predefined criteria? | [#21](https://github.com/swe574-Fall2024-Group1/huddleup/issues/21) |  
| What kind of default badges is needed? | [#22](https://github.com/swe574-Fall2024-Group1/huddleup/issues/22) |  
| User Recommendation Page Creation | [#71](https://github.com/swe574-Fall2024-Group1/huddleup/issues/71) |  
| bug: user recommendation the people who likes the comments of the current user are not listed in Discover Users page | [#77](https://github.com/swe574-Fall2024-Group1/huddleup/issues/77) |  
| Unit Test for User Recommendation | [#78](https://github.com/swe574-Fall2024-Group1/huddleup/issues/78) |  
| interactive map implementation | [#96](https://github.com/swe574-Fall2024-Group1/huddleup/issues/96) |  
| Bug: Map view does not fit to current location | [#100](https://github.com/swe574-Fall2024-Group1/huddleup/issues/100) |  
| Add wikidata logic to user recommendation | [#109](https://github.com/swe574-Fall2024-Group1/huddleup/issues/109) |  
| Bug: Basic search user profile redirection does not work | [#113](https://github.com/swe574-Fall2024-Group1/huddleup/issues/113) |  
| Community Layout members are not aligned in members panel | [#114](https://github.com/swe574-Fall2024-Group1/huddleup/issues/114) |  
| Community members/moderators/owners profile picture is not visible | [#115](https://github.com/swe574-Fall2024-Group1/huddleup/issues/115) |  
| Default Badges do not have distinct and meaningful icons | [#117](https://github.com/swe574-Fall2024-Group1/huddleup/issues/117) |  
| bug: feed post author profile pictures are coming from the current user profile picture | [#118](https://github.com/swe574-Fall2024-Group1/huddleup/issues/118) |  
| editing own profile and viewing own profile are not separated  | [#120](https://github.com/swe574-Fall2024-Group1/huddleup/issues/120) |  


### Code Review  

#### Code Reviewed by Me  
- **Pull Request:** [#11](https://github.com/swe574-Fall2024-Group1/huddleup/pull/11)  
MongoDB host is removed in dev environment. PR is requested by Ömer and I approved. Ömer merged to main.

- **Pull Request:** [#99](https://github.com/swe574-Fall2024-Group1/huddleup/pull/99)  
Community activity feed is created by Muharrem. I reviewed his changes in feature branch. I commented under PR informing him about the bug having two description fields in community page by adding screenshot. 

I also suggest him to move community description, members, owners, moderators near community name and picture panel. Because I thought that activity feed is squeezed by these fields. He replied me that activity feed has slider, it shows more than 2 activity. After that, we agreed that this suggestion is not an urgent thing, it can be nice to have. I created issue #105 and assigned to Erkin, since it is frontend related issue. 

Muharrem fixed the bug, and I reviewed again. I approved PR and merged to dev branch.


- **Pull Request:** [#104](https://github.com/swe574-Fall2024-Group1/huddleup/pull/104)  

Ömer developed badge improvements and request PR review. I initially noticed a conflict caused by overlapping changes in the frontend components. He added new commit to address these conflicts. I reviewed the PR again. But in this case, I noticed error in drawer closings. I commented to PR by pointing out the related line. He then resolved this issue, and I informed him that this version is working. Then he merged his changes to dev branch. 


- **Pull Request:** [#108](https://github.com/swe574-Fall2024-Group1/huddleup/pull/108)  

Muharrem fixed the bug related to getting badge logic. I reviewed and approved his PR. Then I merged to dev branch.

- **Pull Request:** [#121](https://github.com/swe574-Fall2024-Group1/huddleup/pull/121)  

Doruk requested a review from dev to main branch to prepare our repository for demonstration. I reviewed the PR. I have already tested dev branch and there were no additional commits since then. I approved and merged the changes to be reflected in main branch.


##### Code Reviewed by Others  
- **Pull Request:** [#79](https://github.com/swe574-Fall2024-Group1/huddleup/pull/79)
User recommendation based on social interaction is developed and included to this PR. It is reviewed by Aibek. He approved and merged to dev branch.

- **Pull Request:** [#97](https://github.com/swe574-Fall2024-Group1/huddleup/pull/97)
This PR was related to the adding interactive map view while post editing. Erkin is reviewed, approved the PR and merged to dev.

- **Pull Request:** [#101](https://github.com/swe574-Fall2024-Group1/huddleup/pull/101)
Erkin informed me that we lost map view adjustment when user selects "current location" in PR #97. Therefore, I reverted the related function to bring it back. And created a new PR #101. He reviewed, approved and merged to dev.

- **Pull Request:** [#111](https://github.com/swe574-Fall2024-Group1/huddleup/pull/111)
This PR includes UI improvements for adding profile pictures of users in every possible places, adding redirecting links to user profile and visual alignment of frontend elements. PR is reviewed by 2 team members. Aibek reviewed backend side, Erkin reviewed frontend side. Both stated that everything is fine by commenting to the PR. Then it is merged to dev.

- **Pull Request:** [#112](https://github.com/swe574-Fall2024-Group1/huddleup/pull/112)
This PR is about adding wikidata logic to user recommendation system. It is reviewed by Aibek. He solved the merge conflicts that is about unintentional removal of wikidata p31 relationship in community recommendation system. He readded this relationship. However, he also removed p279 relationship in user recommendation system. And approved and merged this PR. After that, when I realized this loss, we talked about that. He reverted p279 relationship in user recommendation system in dev branch.

- **Pull Request:** [#119](https://github.com/swe574-Fall2024-Group1/huddleup/pull/119)
This PR is about adding specific default badge icons and a bug fix. Bug was about having profile picture of current user in every posts under Feed. This PR is reviewed by Doruk. He approved and merged to dev branch.
### Mustafa Tuna
#### Badge System
**Related Requirements:** F69, F70, F71, F72, F73, F74, F75, F76 \
**Related Scenario:** [Wiki Page: Badge Scenario](https://github.com/swe574-Fall2024-Group1/huddleup/wiki/Scenarios-&-Mockups#3badges)\
**Related Issues:** [#69](https://github.com/swe574-Fall2024-Group1/huddleup/issues/69), [#89](https://github.com/swe574-Fall2024-Group1/huddleup/issues/69)

**Manual Badges**: I created the manual badge functionality in both backend and frontend. I created the badge model and userbadge model in the backend. Prepared the badge creation and badge assignment endpoints in the backend. \
**Automatic (Parameter Based) Badges**: I scaffolded the automatic badge functionality in the frontend. \
**Demo**: \
![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXeEA-3ii_jRija5n0EkNeFIBYJENucUn8rkKRgNRt8F8oOvmM6cgz7ZrDMuL67fJztQFqtIU6-95QH6pDwRgBi_xWzje9JY1IdTZg2TVE_O08uS-y-8D6yjRVNtZBTNpzZKoACrZw?key=dx79Gw4fEyrn_YTVtN9O-U8a)

#### Enhance Profile Page
**Related Requirements:** F4 \
**Related Scenario:** [Wiki Page: Profile Page](https://github.com/swe574-Fall2024-Group1/huddleup/wiki/Scenarios-&-Mockups#1user-profile)
**Related Issues:** [#92](https://github.com/swe574-Fall2024-Group1/huddleup/issues/92), [#93](https://github.com/swe574-Fall2024-Group1/huddleup/issues/93), [#94](https://github.com/swe574-Fall2024-Group1/huddleup/issues/94)

Profile page was enhanced with the following features: Editing profile information, setting tags for the user, and changing profile picture. Fixed the bugs in the profile page. \
**Demo**: \
![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXeLfXVD9NhFBQDrkmvFWVDIs7X-Bclw8Hzj3KL3jlYKjaJ-XVWw2lCmo4mpq2i3JKtrsTWOnaAzy01yjwW8677Z4NoMoT45Ryw0Q4JwU4eBCrmG0FT8s46MErK4dIKcBD9fIed5NQ?key=dx79Gw4fEyrn_YTVtN9O-U8a)

#### Optimizing the Development Environment and Containerization
**Related Requirements:** - (Non-functional) \
**Related Scenario:** - \
**Related Issues:** [#53](https://github.com/swe574-Fall2024-Group1/huddleup/issues/53)

Since our project is a Single Page Application, it is important to have a fast and steady development environment. I optimized the development environment by adding hot reloading to the frontend and backend. This way the changes are reflected immediately without the need to restart the server. I also fixed some bugs related to the local containerization of the project via creating docker-compose-dev and dockerfile-dev files.

#### Documentation
- Created the mockups and scenarios for the templating system: [Wiki Page: Book Discussion Template](https://github.com/swe574-Fall2024-Group1/huddleup/wiki/Scenarios-&-Mockups#2-create-book-discussion-template)
- Added the related docker development command to the readme file

#### Code Review
| **Title**                               | **PR #** | **Author**       |
| --------------------------------------- | -------- | ---------------- |
| fix: badge like action logic is fixed.  | #108     | ustaoglumuharrem |
| Feature: adding tags to posts and users | #68      | aaldaber         |
| Feature/mobile UI enhancement           | #55      | erkingonultas    |

#### Major Pull Requests 
| **Title**                        | **PR #** |
| -------------------------------- | -------- |
| Feature/user profile enhancement | #111     |
| Feature/parameter based badge    | #80      |
| Feature/manual badge             | #70      |
| Feature/docker dev enhancement   | #54      |

#### Issues
| **ID** | **Issue**                                                                                | **Category**                    |
| ------ | ---------------------------------------------------------------------------------------- | ------------------------------- |
| #94    | User profile picture should be populated in all applicable areas.                        | User Profile                    |
| #93    | User profile should include name, surname, birthday, profile picture                     | User Profile                    |
| #92    | Bug: In community page, user profile redirection is not set for members and post authors | Bug, Community                  |
| #89    | Badges UI Improvements                                                                   | Frontend                        |
| #69    | Manual Badges Backend Implementation                                                     | Backend, Enhancement            |
| #53    | Enable Recompiling and Hot Reloading for React in Dockerized Dev Environment             | Enhancement                     |
| #52    | Use of TailwindCSS Framework                                                             | Decision, Frontend              |
| #18    | Create Mockup Screens from Requirements                                                  | Documentation, Frontend, Mobile |
| #3     | Check each others swe573 repositories                                                    | Decision                        |
