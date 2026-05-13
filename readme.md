# 🗳️ PollPulse Pro
**Next-gen real-time polling for modern teams.**

PollPulse is a high-performance, full-stack polling platform built with a focus on precision, security, and real-time analytics. Designed with a premium Apple-inspired aesthetic, it allows users to capture insights through lightning-fast feedback loops.

---

## 🚀 Live Demo
**[--]**

---

## ✨ Core Features
*   **Dual Response Modes**: Supports both **Anonymous** and **Authenticated** responses to suit different privacy needs.
*   **Smart Expiry System**: Polls automatically become inactive after a user-defined expiry time, preventing late submissions.
*   **Real-time Analytics**: Powered by **Socket.io** for live response counts and instant data visualization updates.
*   **Apple-style UI/UX**: A professional, high-contrast Dark/Light mode interface with glassmorphism, smooth transitions, and a clean San Francisco-inspired aesthetic.
*   **Creator Dashboard**: Comprehensive analytics including question-wise summaries, option counts, and participation insights.
*   **Public Result Publishing**: Creators can choose to publish results, making them viewable via the original poll link once the session ends.

---

## 🛠️ Tech Stack
*   **Frontend**: React.js, Tailwind CSS, Lucide React (Icons), Framer Motion.
*   **Backend**: Node.js, Express.js.
*   **Real-time**: Socket.io (WebSockets).
*   **Security**: JWT (JSON Web Tokens) for protected routes and authentication.
*   **Database**: MongoDB / PostgreSQL (Dynamic poll storage and response collection).

---

## 📂 Project Structure
```text
/pollpulse-root
  ├── client/             # Frontend React application (Tailwind + Lucide)
  │    └── src/           # Components, Pages, and Apple-style Theme Logic
  ├── server/             # Express API and WebSocket logic
  │    ├── models/        # Database Schemas (Polls, Users, Responses)
  │    └── routes/        # API Endpoints (Auth, Poll Management, Results)
  ├── package.json        # Root configuration
  └── README.md