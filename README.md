# Description
This repository contains the labs for COMP-4002 Fullstack development.

## Lab 5.2 explanation
What change you wanted to make in your application

For this lab, I wanted to make a change that added something useful to the project without forcing me to rewrite much of my existing frontend or backend logic.
I decided to integrate Swagger documentation into my backend. I had used Swagger before, and I had also heard you mention it in class, so it felt like a good option.
My goal was to give the application a clear, browsable API documentation page that would make it easier for other developers to understand how to use the API endpoints.

What tool or tools you've made use of to make this change

To make this change, I used Swagger through the swagger-ui-express package in my Express backend.
I created a Swagger/OpenAPI document manually in a separate file and then connected it to my Express app so it would render at the /api-docs route.
I also relied on my existing Express backend structure and route organization to describe the endpoints accurately.

How this change affects the user experience

This change improves the user experience by making the backend much easier to understand and inspect.
With the Swagger documentation, users (especially developers) can easily see what endpoints are available,
what parameters they accept, and what responses they return, all in a clean and interactive format.'
If I were a dev heading onto a new project, I would appreciate having this documentation.

How this change affects your understanding, or conceptualization, of the app.

this class as a whole has a big emphasis on teamwork and collaboration, and moving forward into the working world,
I will be working on teams even moreso. Implementing Swagger documentation was a way of practicing writing clear documentation
for the future, when I will be expected to write code that might be passed onto others. this final piece of the labs has
made me think of apps beyond just a personal project.