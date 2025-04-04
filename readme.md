# Rudy's Catering - React Native App

## Description
Rudy's Catering is a mobile application built with React Native using Expo. The app allows customers to place orders, employees to clock in/out, and managers to manage order statuses. Firebase is used for authentication and complex data storage. Async storage is used to store the current status of employees locally. The app also integrates native features such as the camera for feedback submission and a third-party API to fetch contact information from the cafe's website.

## Features
- Customer ordering system
- Employee clock-in/out functionality
- Real-time order updates for admins
- User authentication via Firebase
- Feedback submission with image upload (camera integration)
- Third-party API integration for fetching contact details from the cafe's website

## Technologies Used
- **React Native** (Expo framework)
- **Firebase** (Authentication & Firestore database)
- **Google Maps API** (For location services)
- **Camera API** (For capturing images in feedback submissions)
- **Third-Party API Integration** (For retrieving cafe contact details)

## Setup & Installation
### 1. Clone the repository:
```sh
  git clone https://git.cs.dal.ca/courses/2025-winter/csci-4176_5708/project-milestone-3/archie.git
  cd <project-directory>
```
### 2. Install dependencies:
```sh
  npm i
```
### 3. Start the application:
```sh
  npx expo start
```

## Troubleshooting
### If you encounter an error like `fetch failed`, try the following:
1. Delete the `node_modules` folder and `package-lock.json` file:
   ```sh
   rm -rf node_modules package-lock.json
   ```
2. Reinstall dependencies and restart Expo:
   ```sh
   npm i
   npx expo start
   ```
## Admin's Access
The admin access is restricted and fixed:
- **Email**: admin@gmail.com
- **Password**: adminpassword
Only the cafe owner has access to this admin account. There is no functionality to create new admin accounts through the app.

## Emulator Setup (Optional)
For testing the location-based features (like employees clockin), set your emulator's location to:
- **Address**: 6969 Bayers Road
- **Coordinates**:
  ```json
  {
    "latitude": 44.656787,
    "longitude": -63.6241815
  }
  ```

## Contribution
Pull requests are welcome! Feel free to submit any issues or suggestions for improvement.

## License
This project is licensed under the MIT License.

