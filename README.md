# HuddleUp 

Huddleup is a community building platform where each community has its own post templates. Members can use these templates to create posts with different contents. Other members can respond to posts with either commenting or upvoting/downvoting. There are 2 types of communities: private and public. Public communities are open to any member to join whereas private communities require invitation to users to become members. Users can follow other users.  Users can see all posts from the joined communities and follow users in their feed. Any user can create a community and become the owner of that community. Owners can assign new moderators from members. Owners have all the authorities that moderators have.  Moderators can create new templates, ban/unban members and delete posts, comments. Only owners can archive communities and change ownership. 

Application is developed to use in web browsers using Django and React and is not mobile friendly yet.   

Here is [wiki page](https://github.com/swe574-Fall2024-Group1/huddleup/wiki)


## Running the app locally

STEP 1:

Clone the repo using https

`git clone https://github.com/swe574-Fall2024-Group1/huddleup`


or using ssh

`git@github.com:swe574-Fall2024-Group1/huddleup.git`

STEP 2:

Prepare the environment variables that are needed for backend and db services. The sample
files are given in .env.sample and .db.env.sample files.

STEP 3:
In the root of the project folder run the command:

`docker-compose -f docker-compose-dev.yml up --build`

or run docker in daemon mode:

`docker-compose -f docker-compose-dev.yml up --build`

This will build and run all the needed containers.

STEP 4:
In your browser go to below address after docker builds all containers:

`http://localhost:8080`

STEP 5: Here is the list of containers:

backend_huddleup - Django backend

db_huddleup - PostgreSQL database

frontend_huddleup - nginx container that serves the compiled frontend files, and also routes the requests to backend_huddleup. It runs on `localhost:8080`

frontend_huddleup_dev - a Node.js container needed for developing and testing reactjs changes. It runs on `localhost:3000`

STEP 6:

If you are developing the frontend part of the app, you can edit the files in huddlepui/src, and you can 
see the changes by going to `http://localhost:3000`. If you want to bundle the frontend files for serving in nginx, you will need to delete the 
frontend_huddleup container and its corresponding image from Docker, and rebuild the image for frontend_huddleup. This will 
build the frontend files, and start the nginx server to serve these files.

STEP 7:

If you are developing the backend part of the app, you can edit the files in huddleupAPI folder. You can see your changes by restarting
the backend_huddleup container. You also can utilize the Django admin part of the app to see your models. In order to access Django admin,
 create a superuser by first going to backend_huddleup shell:

`docker exec -it backend_huddleup bash`

and then running:

`python manage.py createsuperuser`

Fill out the username and password, and with this credentials you can go to `http://localhost:8080/admin` and login to the admin site.

