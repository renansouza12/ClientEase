# ClientEase

A streamlined client management system designed specifically for small fitness studios, built with Angular and Firebase.

![Dashboard Overview](https://i.ibb.co/cSL8pNHL/dashboard-overview.png)

## 🛠️ Built With

![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![RxJS](https://img.shields.io/badge/RxJS-B7178C?style=for-the-badge&logo=reactivex&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![SCSS](https://img.shields.io/badge/SCSS-1572B6?style=for-the-badge&logo=scss&logoColor=white)

## 📋 Table of Contents

- [About The Project](about-the-project)
- [Features](#features)
- [Screenshots](#screenshots)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## 🎯 About The Project

This application was created to address a real-world organizational challenge at a CrossFit studio. The studio was initially using another management platform, but several pain points became apparent: the system was slow, overly complex with numerous configurations that weren't necessary for a small studio operation, and performing basic tasks like adding or editing client information was time-consuming.

This project was born out of the need for a streamlined, efficient solution tailored specifically to the needs of a small fitness studio. Rather than dealing with an abundance of features that would go unused, the focus was on building a simple, fast interface with only the essential functions required for day-to-day operations.

The application is currently functional for core tasks, though additional features are still in development to further enhance its capabilities.

## ✨ Features

### Authentication
- **Email/Password Authentication** - Secure login and registration
- **Google OAuth Integration** - Quick sign-in with Google account
- **Password Recovery** - Forgot password functionality with email reset
- **Route Guards** - Protected routes and automatic redirects based on auth state

### Client Management
- **Add/Edit Clients** - Complete client information management
- **Client Cards** - Visual cards displaying key client information
  - Name and membership plan
  - Start and end dates
  - Active status tracking
- **Drag & Drop** - Reorder client cards with Angular CDK
- **Client Details View** - Expanded view for comprehensive client information
- **Active Client Counter** - Track how many clients are currently active
- **Delete Clients** - Remove client records when needed

### Snippets & Quick Links
- **Create Snippets** - Save frequently used text or URLs
- **Smart Click Behavior**
  - Text snippets automatically copy to clipboard
  - URL snippets open in new tab/window
- **Drag & Drop Reordering** - Organize snippets by priority
- **Editable Cards** - Inline editing for title and content
- **Expandable Text Areas** - Collapse/expand for better space management

### Annotations
- **Freeform Notes** - Quick annotation space for general notes
- **Auto-save** - Changes are automatically saved
- **Distraction-free** - Simple, clean text area

### User Profile
- **Profile Display** - Shows user photo and name
- **Quick Logout** - Easy session management

## 📸 Screenshots

### Authentication
![Login Page](https://i.ibb.co/mrzXygtk/login.png)
*Secure login with email/password or Google OAuth*

![Sign Up Page](https://i.ibb.co/Y4wH4qqQ/sign-up.png)
*Easy registration process*

![Forgot Password](https://i.ibb.co/cS53K7nD/forgot.png)
*Password recovery via email*

### Dashboard
![Overview Dashboard](https://i.ibb.co/4gNYkxbj/dashboard.png)
*Main dashboard with all features accessible*

![Add Client Form](https://i.ibb.co/V0c2DGc9/form.png)
*Simple form for adding new clients*

![Client Details](https://i.ibb.co/gLfcKWRY/card-view.png)
*Expanded client information view*

### Snippets
![Snippets Section](https://i.ibb.co/wZXchYsw/snippets.png)
*Quick access to frequently used text and links*

### Annotations
![Annotations Area](https://i.imgur.com/uZpvzab.png)
*Freeform text area for notes*

## 🛠️ Tech Stack

**Frontend:**
- [Angular](https://angular.io/) - Frontend framework
- [TypeScript](https://www.typescriptlang.org/) - Programming language
- [Angular CDK](https://material.angular.io/cdk/categories) - Drag & Drop functionality
- [RxJS](https://rxjs.dev/) - Reactive programming
- [RemixIcon](https://remixicon.com/) - Icon library

**Backend & Services:**
- [Firebase Authentication](https://firebase.google.com/products/auth) - User authentication
- [Firebase Firestore](https://firebase.google.com/products/firestore) - Database
- [Firebase Hosting](https://firebase.google.com/products/hosting) - Deployment

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Angular CLI
- Firebase account

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/ClientEase.git
cd ClientEase
```

2. Install dependencies
```bash
npm install
```

3. Set up Firebase
   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication (Email/Password and Google)
   - Create a Firestore database
   - Copy your Firebase configuration

4. Create environment files
   - Create `src/environments/environment.ts` and `src/environments/environment.prod.ts`
   - Add your Firebase configuration:

```typescript
export const environment = {
  production: false,
  firebase: {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
  }
};
```

5. Run the development server
```bash
ng serve
```

6. Navigate to `http://localhost:4200/`

## 💡 Usage

### Getting Started

1. **Create an Account**
   - Sign up with email/password or use Google OAuth
   - Verify your email if required

2. **Add Your First Client**
   - Click the "+" button on the dashboard
   - Fill in client information (name, plan, dates, phone)
   - Submit the form

3. **Manage Clients**
   - **Edit**: Click the options button (≡) and select edit
   - **View Details**: Click the eye icon for expanded information
   - **Delete**: Click the trash icon to remove a client
   - **Reorder**: Drag and drop cards to organize by priority

4. **Create Snippets**
   - Click "Add Snippet" in the snippets section
   - Enter a title and content (text or URL)
   - Click text snippets to copy, click URLs to open

5. **Take Notes**
   - Use the annotations area for quick notes
   - Changes save automatically

## 📁 Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── annotation/
│   │   ├── cards/
│   │   ├── card-client/
│   │   ├── form-client/
│   │   ├── links-and-snippets/
│   │   ├── snippet-card/
│   │   ├── login/
│   │   ├── register/
│   │   └── forgot-password/
│   ├── guards/
│   │   ├── auth.guard.ts
│   │   └── login.guard.ts
|   |── models/
|   |   ├── annotation.interface.ts
|   |   ├── client.interface.ts
|   |   └── snippet.interface.ts
│   └── services/
|       ├── annotations/
|       ├── authentication/
|       ├── clients/
|       ├── data/
|       ├── snippets/
│       └── users/
├
├── environments/
|
```

## 🔐 Route Guards

The application uses two guards to manage access:

- **Auth Guard**: Protects authenticated routes, redirects to login if not authenticated
- **Login Guard**: Prevents authenticated users from accessing login/register pages, redirects to overview

## 🎨 Features in Detail

### Client Management
Each client card displays:
- Client name
- Membership plan type
- Start and end dates (formatted)
- Action buttons (edit, view, delete)

The system tracks active clients based on their subscription dates and displays a counter.

### Snippets System
Snippets can contain:
- **Text**: Automatically copies to clipboard on click
- **URLs**: Opens in a new tab on click
- Editable inline with expandable text areas
- Reorderable via drag and drop

### Form Validation
All forms include:
- Real-time validation
- Visual error indicators
- Disabled submit buttons until valid
- Loading states for async operations

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Author

Renan Souza
- GitHub: [@renansouza12](https://github.com/renansouza12)

## 🙏 Acknowledgments

- Built with [Angular](https://angular.io/)
- Icons by [RemixIcon](https://remixicon.com/)
- Powered by [Firebase](https://firebase.google.com/)

---

**Note**: This project is under active development. Some features may be incomplete or subject to change.
