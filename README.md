# Notifications microsservice

My very first Nest.js, Prisma, and SQLite backend experience. It is a notifications microsservice for getting, creating, cancelling, and marking notifications as read and unread.

## Stack

### Nest.js + Prisma + SQLite

## Important

-   Concept, folder structures and configs are from Rocketseat's Ignite Lab (Dec. 2022);
-   'Send Notification' use-case is Rocketseat's code;
-   Cancel, count, read and unread use-cases codes are my own;
-   It is unit-tested with an in-memory repository;
-   It follows SOLID principles.

# How to run

-   Clone repository
-   Run `npm install` on root folder
-   Run `npm run start`, or `npm run start:dev` for development server (default NODE_PORT is 3000)
    -   Hit http://localhost:$NODE_PORT/ in any API platform (Postman, Insomnia, Hoppscotch) (check routes bellow)
-   Run `npm run build` for building for production
-   Run `npx prisma studio` for checking out the database insides

## API

### GET /notifications

Get all notifications in JSON format.
Response body structure:

```
{
    "notifications": [
        {
            "id": "string", // UUID
            "recipientId": "string", // UUID
            "content": "string", // 5 to 140 char
            "category": "string",
            "readAt": "Date | null",
            "createdAt": "Date",
            "cancelled": "boolean",
        }
    ]
}
```

### GET /notifications/:recipient_id

Get all notifications for a specific recipient in JSON format.
Response body structure:

```
{
    "notifications": [
        {
            "id": "string", // UUID
            "recipientId": "string", // UUID, same as :recipient_id from request
            "content": "string", // 5 to 140 char
            "category": "string",
            "readAt": "Date | null",
            "createdAt": "Date",
            "cancelled": "boolean",
        }
    ]
}
```

### POST /notifications

Request Body structure:

```
{
  "recipientId": "9e015d7c-86c6-4dfd-9226-9d09fe8c69be",
  "content": "Whatever text you'd like",
  "category": "sample"
}
```

-   RecipiendId must be UUID
-   Content must be 5 to 140 characters long
-   Category must include a text

### GET notifications/:recipient_id/count

Get notifications count for a specific recipient.

```
{
    "count": number
}
```

### PATCH notifications/:notification_id/cancel

Request updates notification's "cancelled" property to true.

### PATCH notifications/:notification_id/read

Request updates notification's readAt property to server's request processing date (aka: new Date() on the server side)

### PUT notifications/:recipient_id/read

Request updates many notifications with a single "readAt" date, defined on the request processing at server side. Request body must provide array of notification ids.

```
// Request body, application/json
{
    "notification_ids": [
        "UUID string",
        "UUID string 2",
        "UUID string 3",
    ]
}
```

Important: If any notification update fails, every change will be uncommited from database.

### PATCH notifications/:notification_id/unread

Request updates notification's readAt property to `null`.

### PUT notifications/:recipient_id/unread

Request updates many notifications with "readAt" as `null`. Request body must provide array of notification ids.

```
// Request body, application/json
{
    "notification_ids": [
        "UUID string",
        "UUID string 2",
        "UUID string 3",
    ]
}
```

Important: If any notification update fails, every change will be uncommited from database.
