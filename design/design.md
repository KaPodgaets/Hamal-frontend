# project descrition

This is a small callcenter application.
With minimalistic interface.

it should contain a few features according openapi backend documentation

details:

- home page - autoreditect to login page if user does not have valid accesstoken, if there is valid access token redirect for admin to admin page and for operator to 'get next form' page
- login page - only 2 input fields and
- whole application containts only: 404 (not found) page, home page (empty), login page, 'get next form' page, form page, admin page
- 'get next form' page contain only 1 button in the center with text 'get next form'. By click on this button - redirect to page 'form'
- page 'form' containt input fields according api documentation and button 'submit'. By click on button submit - send http request to backend to update form, and redirect to page 'get next form'
- admin page has to provide feature to create, delete and update users (operators) and see whole list of users, and also has to be able send http request to upload csv file, export to csv file or delete all data of citizens

### Tech stack

this application - vite - react-ts
this application has to use at least axios, tailwind css
