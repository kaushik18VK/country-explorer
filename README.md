# 🌍 Country Explorer

A modern Next.js app to explore countries, mark favorites, and enjoy dark mode.  
Built with Next.js App Router, Tailwind CSS, React Context, and Jest for testing.

---

## 🚀 Setup and Run Instructions

1. **Clone the repository**
git clone https://github.com/your-username/country-explorer.git
cd country-explorer

text

2. **Install dependencies**
npm install

text

3. **Run the development server**
npm run dev

text
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 Credentials for Mock Login

- **Username:** `testuser`
- **Password:** `password123`

---

## 🛠️ Design Choices, Assumptions, and SSG/SSR Explanation

### **Design Choices**
- **Next.js App Router** for file-based routing, layouts, and modern data fetching.
- **Tailwind CSS** for rapid, responsive, and dark mode-friendly styling.
- **Google Fonts** via `next/font/google` for performance and consistent typography.
- **React Contexts** for global state management (authentication and favorites).
- **next-themes** for seamless dark/light mode toggling.

### **Assumptions**
- **Authentication is mock-only:** Only the above credentials are accepted; no real backend.
- **Favorites are per-browser:** Stored in `localStorage` for persistence across reloads.
- **Country data is static:** Assumed to not change frequently, so SSG is suitable.

### **SSG/SSR Choices**
- **Static Site Generation (SSG):**
- The country list and individual country pages are statically generated at build time for fast loading and SEO.
- **Server-Side Rendering (SSR):**
- Would be used for any pages needing real-time data or user-specific content (not required in this demo).
- **Why SSG?**
- Country data is not user-specific and does not change often, making SSG the best choice for performance and scalability.

---

## 🏗️ State Management Solution

- **Authentication**
- Managed via a custom React Context (`AuthContext`).
- User state is persisted in `localStorage` for session continuity.
- **Favorites**
- Managed via a custom React Context (`FavoritesContext`).
- Favorites are stored in `localStorage` and provided globally.
- **Theme (Dark/Light)**
- Managed via [`next-themes`](https://github.com/pacocoursey/next-themes).
- Supports system preference and user toggling.
- **Why Context?**
- React Context is lightweight and ideal for global state in an app of this scale.

---

## 🧪 Testing

- Unit and integration tests are written using **Jest** and **React Testing Library**.
- To run tests:
npm test

text
- Tests cover:
- Navbar (auth links, theme toggle)
- ThemeSwitcher (toggle functionality)
- CountryCard (country info, favorite toggle)
- AuthContext (login/logout logic)

---

## 🌐 Live Demo

[Live Demo](https://your-app.vercel.app)  


---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License

MIT

Working Login page:
<img width="1440" alt="image" src="https://github.com/user-attachments/assets/b820af26-313c-425e-92f1-b3a36174e97f" />

Home page:
<img width="1440" alt="image" src="https://github.com/user-attachments/assets/86c67529-5dae-4a57-ab9b-14e4e51e3b91" />

Favorities Page:
<img width="1440" alt="image" src="https://github.com/user-attachments/assets/92081e8b-36ff-4431-aebd-edccd7d28081" />


