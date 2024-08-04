# Minimalist Real-Time Code Editor 

## Overview 

The Minimalist Real-Time Code Editor is a web-based application that allows multiple users to collaborate on code editing in real time. This project leverages JavaScript, React, Socket.IO, and the Monaco Editor to provide a seamless and interactive coding experience.

## Features 
 
- **Real-Time Collaboration** : Multiple users can edit the same document simultaneously, with changes reflected in real time.
 
- **Syntax Highlighting** : The Monaco Editor provides rich code editing features, including syntax highlighting.
 
- **User-Friendly Interface** : A clean and intuitive UI built with React and Tailwind CSS.
 
- **Scalable Backend** : A Node.js server with Socket.IO to handle real-time communication between clients.

## Project Structure 

![diagram-export-8-4-2024-10_32_24-PM](https://github.com/user-attachments/assets/f585c194-e8bc-4617-b4c2-a60d8fd35cd6)



## Getting Started 

### Prerequisites 

- Node.js

- npm or yarn

### Installation 
 
1. **Clone the repository** :

```sh
git clone https://github.com/karikay18/Minimalist-Real-Time-Code-Editor.git
```
 
2. **Navigate to the client directory and install dependencies** :

```sh
cd client
npm install
```
 
3. **Navigate to the server directory and install dependencies** :

```sh
cd ../server
npm install
```

### Running the Application 
 
1. **Start the server** :

```sh
node server.js
```
 
2. **Start the client** :

```sh
cd ../client
npm run dev
```
 
3. **Open your browser**  and navigate to `http://localhost:5173` to see the application in action.

## System Design 

### Architecture 

The application follows a client-server architecture with the following components:
 
1. **Client** : 
  - **React Application** : Handles the UI and user interactions.
 
  - **Monaco Editor** : Provides the code editing interface.
 
  - **Socket.IO Client** : Manages real-time communication with the server.
 
2. **Server** : 
  - **Node.js Server** : Manages connections and broadcasts changes to all connected clients.
 
  - **Socket.IO Server** : Handles real-time events and communication.

### Data Flow 
 
1. **User Interaction** : A user makes changes in the code editor.
 
2. **Event Emission** : The changes are captured and emitted to the server via Socket.IO.
 
3. **Broadcasting** : The server receives the changes and broadcasts them to all connected clients.
 
4. **Real-Time Update** : All clients receive the changes and update their editors in real time.

### Key Components 
 
- **CodeEditor.jsx** : The main component that integrates the Monaco Editor and handles code editing.
 
- **Socket.js** : Manages the Socket.IO connection and events.
 
- **server.js** : Sets up the Node.js server and Socket.IO event handling.

### Scalability 

To ensure scalability and performance, consider the following strategies:
 
- **Load Balancing** : Use a load balancer to distribute incoming traffic across multiple server instances.
 
- **Horizontal Scaling** : Run multiple instances of the server to handle more simultaneous connections.
 
- **Database Integration** : For persistent storage, integrate a database to save and retrieve code snippets.

## Contributing 

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.

2. Create a new branch for your feature or bug fix.

3. Commit your changes.

4. Push your branch and create a pull request.

## License 

This project is licensed under the MIT License.

## Acknowledgments 

- Inspired by various real-time collaborative editors.
 
- Uses the [Monaco Editor]()  for code editing.
