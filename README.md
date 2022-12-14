# MFA App

## Backend
-   1: Open the folder.

-   2: Install the npm packages:
    ```
    npm install
    ```

-   3: Create the schema:
    ```
    npx prisma migrate dev
    ```

-   4: Set up the docker container:
    ```
    docker-compose up
    ```

-   5: If the container is running, we can start the backend:
    ```
    npm run dev
    ```

If everything is working, the backend should now be running on port 4000. If it doesn't work, check the .env file.

___
## Frontend 

-   1: Open the folder.

-   2: Install the npm packages:
    ```
    npm install
    ```
-   3: Start the frontend:
    ```
    npm run start
    ```
If everything is working, the frontend should now be running on port 3000.

