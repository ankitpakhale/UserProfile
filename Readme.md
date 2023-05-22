# Project Name: UserProfile

## Purpose
This project provides authentication features and CRUD operations on user profile data. It utilizes Django for the backend and React.js for the frontend.

## Note
The code includes extensive comments that provide explanations for both the frontend and backend aspects. Additionally, the documentation `ApiDocument.txt` has been enhanced to include API information and comprehensive docstrings for each API.

## Super User Credentials
Email: admin@gmail.com
Password: admin

## Installation

1. Clone the repository:

```
git clone https://github.com/ankitpakhale/UserProfile
```

2. Change into the project directory:

```
cd UserProfile
```

3. Create a virtual environment:

```
python -m venv venv
```

4. Activate the virtual environment:
- For Windows:
  ```
  venv\Scripts\activate
  ```
- For Unix or Linux:
  ```
  source venv/bin/activate
  ```

5. Install the required dependencies:

```
pip install -r requirements.txt
```

6. Perform database migrations:
```
python manage.py migrate
```

6. 7. Run the development server:
```
python manage.py runserver
```

## Technology Used
- Backend: Django
- Frontend: React.js

## Backend Code Structure
- `backend/accounts`: Contains all the APIs related to user accounts.
- `backend/demoproject`: Main project directory.

## Frontend Code Structure
- `frontend/src/Components`: Contains all the screens/components such as navbar, login, signup, and profile.
- `frontend/src/App.js`: Contains all the routes corresponding to different screens.
- `frontend/src/.env`: Contains the backend endpoints.

## Known Issues
- While updating user data, there is an error related to updating the profile image. One possible solution is to call the GET API again, but this might not be a feasible option. Another solution is to destructure the image and create a manual image URL, but this process can be lengthy and may not be suitable for production-level code.





