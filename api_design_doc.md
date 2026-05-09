# Student Exchange Hub - API Design Document

Based on the Student Exchange Hub Design Document, this API design covers the CRUD (Create, Read, Update, Delete) endpoints for the two main data models: **Profiles** and **Projects**.

## Base URL
`/api/v1`

---

## Data Models

### User Profile ("The Passport")
```json
{
  "username": "marcopolo_23",
  "bio": "CS major moving to Tokyo!",
  "class": "Junior (Year 3)",
  "targetCollege": "Waseda University",
  "homeCountry": "Italy",
  "targetCountry": "Japan",
  "prefCurrency": "JPY",
  "createdAt": "2026-05-09T12:00:00Z"
}
```

### Project ("The Initiative")
```json
{
  "projectId": "proj_987654",
  "projectName": "Akihabara Tech Crawl",
  "aboutPitch": "Exploring retro gaming tech.",
  "description": "Detailed itinerary and goals for exploring the Akihabara district.",
  "budgetValue": 5000,
  "budgetCurrency": "JPY",
  "ownerUsername": "marcopolo_23",
  "createdAt": "2026-05-09T14:30:00Z"
}
```

---

## 1. Profiles API ("The Passport")

### 1.1 Create Profile
* **Endpoint:** `POST /profiles`
* **Description:** Creates a new user profile.
* **Request Body:**
  ```json
  {
    "username": "marcopolo_23",
    "bio": "CS major moving to Tokyo!",
    "class": "Junior (Year 3)",
    "targetCollege": "Waseda University",
    "homeCountry": "Italy",
    "targetCountry": "Japan",
    "prefCurrency": "JPY"
  }
  ```

### 1.2 Read Profile
* **Endpoint:** `GET /profiles/:username`
* **Description:** Retrieves a user profile by their primary identifier (username).
* **Response Body:**
  ```json
  {
    "username": "marcopolo_23",
    "bio": "CS major moving to Tokyo!",
    "class": "Junior (Year 3)",
    "targetCollege": "Waseda University",
    "homeCountry": "Italy",
    "targetCountry": "Japan",
    "prefCurrency": "JPY",
    "createdAt": "2023-10-25T12:00:00Z"
  }
  ```

### 1.3 Update Profile
* **Endpoint:** `PUT /profiles/:username`
* **Description:** Updates an existing user profile's details.
* **Request Body (Partial or Full):**
  ```json
  {
    "bio": "Updated bio text here...",
    "prefCurrency": "USD"
  }
  ```

### 1.4 Delete Profile
* **Endpoint:** `DELETE /profiles/:username`
* **Description:** Deletes a user profile and their associated data.

---

## 2. Projects API ("The Initiative")

### 2.1 Create Project
* **Endpoint:** `POST /projects`
* **Description:** Creates a new project.
* **Request Body:**
  ```json
  {
    "projectName": "Akihabara Tech Crawl",
    "aboutPitch": "Exploring retro gaming tech.",
    "description": "Detailed itinerary and goals...",
    "budgetValue": 5000,
    "budgetCurrency": "JPY",
    "ownerUsername": "marcopolo_23"
  }
  ```

### 2.2 Read Project
* **Endpoint:** `GET /projects/:projectId`
* **Description:** Retrieves details of a specific project.
* **Response Body:**
  ```json
  {
    "projectId": "proj_987654",
    "projectName": "Akihabara Tech Crawl",
    "aboutPitch": "Exploring retro gaming tech.",
    "description": "Detailed itinerary and goals...",
    "budgetValue": 5000,
    "budgetCurrency": "JPY",
    "ownerUsername": "marcopolo_23",
    "createdAt": "2023-10-26T14:30:00Z"
  }
  ```

### 2.3 Update Project
* **Endpoint:** `PUT /projects/:projectId`
* **Description:** Updates the details of an existing project.
* **Request Body (Partial or Full):**
  ```json
  {
    "projectName": "Akihabara Tech Crawl - Updated",
    "budgetValue": 6000
  }
  ```

### 2.4 Delete Project
* **Endpoint:** `DELETE /projects/:projectId`
* **Description:** Deletes a specific project from the discovery feed and database.
