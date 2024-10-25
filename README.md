# HuddleUp 

Huddleup is a community building platform where each community has its own post templates. Members can use these templates to create posts with different contents. Other members can respond to posts with either commenting or upvoting/downvoting. There are 2 types of communities: private and public. Public communities are open to any member to join whereas private communities require invitation to users to become members. Users can follow other users.  Users can see all posts from the joined communities and follow users in their feed. Any user can create a community and become the owner of that community. Owners can assign new moderators from members. Owners have all the authorities that moderators have.  Moderators can create new templates, ban/unban members and delete posts, comments. Only owners can archive communities and change ownership. 

Application is developed to use in web browsers using Django and React and is not mobile friendly yet.   

Here is [wiki page](https://github.com/qouv/swe573-omeraslan/wiki)

## Deployment Links
### Production Environment:
[https://huddleup.space](https:huddleup.space)
### Development Environment:
[https://dev.group1.swe574.com]


## Setup

STEP 1:

Clone the repo using https

`git clone https://github.com/qouv/swe573-omeraslan.git`


or using ssh

`git clone git@github.com:qouv/swe573-omeraslan.git`


STEP 2:
Start docker on your computer.

STEP 3:
Inside “swe573-omeraslan”  folder run below command:

`docker-compose up --build`


or run docker in daemon mode:

`docker-compose up --build -d`


STEP 4:
In your browser go to below address after docker build all containers:

`http://localhost:3000`


