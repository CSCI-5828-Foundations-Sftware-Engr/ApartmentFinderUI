## What is your project all about? What are you trying to achieve?

The website is a user-friendly, comprehensive online platform designed to simplify and streamline the apartment hunting experience for those looking to rent in the beautiful city of Boulder, Colorado. Our goal is to provide prospective tenants with a hassle-free, personalized experience to find the perfect apartment that matches their unique preferences and requirements.
The project also aims to let the user book and manage appointments. Also, it will let the users write reviews of properties and these reviews will them be processed through sentiment analysis library and stored into the database with the analysis. The analysis will be used to rate the properties. 

## Objectives:

```
- Create an intuitive, easy-to-navigate website that offers a seamless user experience.
- Consolidate a wide range of available apartment listings in Boulder, ensuring up-to-date and accurate information.
- Implement advanced search filters and sorting options to allow users to refine their search based on their preferences, including budget, location, property size, amenities, pet-friendliness, and more.
- Incorporate a reliable rating and review system that encourages users to provide honest feedback on their rental experiences, fostering trust and transparency within the community.
- Implement responsive design principles to ensure the website is compatible with a variety of devices, including desktops, laptops, tablets, and smartphones.
```
## What design decisions have you made?

### Data Collection
We have data collection scripts where we decided to implement rabbitmq between the client and server scripts. The script script calls the API from where we are collecting the data and pushes the response onto the message queue. The sever ingests the message, transforms the data into JSON with useful information and stores into the database.

### Froont end and Backend

We are using MERN stack to design out project. In addition to that, we will be deploying our code on Heroku.

1. Responsive Design: Ensure that the website is fully responsive, automatically adjusting its layout and design to fit different devices and screen sizes. This will provide a seamless user experience across desktops, laptops, tablets, and smartphones.
2. User Interface (UI) Elements: Design consistent and recognizable UI elements, such as buttons, input fields, checkboxes, and sliders, that are easy to interact with and visually appealing.
3. Loading Speed: Optimize the website's performance to reduce loading times, which can be achieved by compressing images, using browser caching, and minimizing the use of JavaScript and CSS files.

## What processes are you using to coordinate your team?

```
1. We are using agile methodology for our project for flexible and iterative project.
2. JIRA is used as a project management software to create stories and all other tasks and assign to team members.
3. We are using a SLACK channel, to communicate for updates, questions and information sharing.
```

## How is work distributed across the team? Who is doing what for each iteration?

    Initially:
    Backend: Rithik, Shreyas
    Frontend: Ishika, Evan and Lakshmi

    In the future the work is distributed in such a way that everyone gets a chance to work on everything and get hands on experience.
    The tasks that each of us worked on are on the JIRA board.


## What technologies are you using?

```
Python, MongoDB, Express, React, Node. 
```



## How are you deploying your system?

We are using Heroku to deploy our system.

