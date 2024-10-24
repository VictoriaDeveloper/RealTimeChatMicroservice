# Software Engineering Postmortem: Real-time Chat Microservice

The Real-time Chat Microservice project was a full-stack web application developed using the Firebase ecosystem, React.js, Express.js, and Node.js. The goal was to create a real-time chat experience where users could create an account, log in, and send and receive messages in real time. The messages were saved in Firebase's Firestore Database, and users could view their chat history in an organized manner. This project was completed as part of a Women in Computer Science event, with a tight timeline of just 1.5 hours.

The project followed a tight schedule, with only a day to complete the implementation. The core functionality revolved around:

- User authentication via Firebase's Authentication service.

- User login and listing all registered users from Firebase Firestore.

- Real-time messaging, where users could initiate a chat and have live conversations.

- Message history display, where all chat data was saved in Firestore and retrieved for both users in the conversation.

The Firebase ecosystem was utilized heavily for backend services, while React.js powered the frontend interface. This combination allowed rapid development and deployment.

Despite the limited timeframe, the project achieved several key objectives:

- User registration and authentication: Users could successfully create accounts using email and password, and this was verified via the Firebase Console.

- Login functionality: Users could log in without issues, and the authentication state was managed using Firebase’s onAuthStateChanged method.

- Retrieving user data: All user profiles were pulled from Firestore and displayed in a user list for easy selection.

- Real-time chat functionality: The app successfully established a real-time chat service. Users could open a conversation, send messages, and receive them in real time, with updates happening instantly.

- Message persistence: All messages were saved and displayed correctly, maintaining the order in which they were sent. Firestore's real-time update capabilities ensured smooth message syncing.

There were a few challenges encountered during the development process:

- Message collection structure: Defining the correct fields for the message collection in Firestore was initially tricky. Deciding how to structure the documents and ensure efficient retrieval took some time to resolve.

- Sorting messages: Incorrect query parameters were initially used to retrieve messages in the correct order. This required careful tuning of the Firestore queries to ensure messages were displayed chronologically within each conversation.
Both issues were eventually resolved, allowing the app to work as intended, but they posed significant hurdles in the short time frame.

Throughout this project, several key lessons were learned:

- Query parameters in Firestore: I gained a deep understanding of how to properly use query parameters to filter and sort documents when retrieving data from Firestore collections.

- Firestore structure: Working with Firestore was an insightful experience, particularly recognizing its similarities to MongoDB as a document-based NoSQL database.

Overall, the experience was positive, and the project did not require major improvements, given the successful outcomes.

Looking ahead, there are some features that could enhance the real-time chat microservice:

- Sending attachments: It would be valuable for users to send files or images as attachments in their chats.

- Group chat functionality: Expanding from one-on-one messaging to group chat conversations would significantly increase the app's functionality and use cases.

These features could provide more flexibility and better user engagement in future iterations of the application.

Working on the Real-time Chat Microservice at the Women in Computer Science event was a rewarding experience. Despite the short timeline, the project was a success, delivering a fully functional real-time chat microservice that met all of the original goals. The application effectively handled user authentication, real-time communication, and message persistence using Firebase services.

Overall, the experience was both educational and enjoyable, particularly as it involved working in a collaborative environment with fellow students.

The project was a great success!
