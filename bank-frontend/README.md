# **Bank Frontend**  
🚀 **Single Page Application (SPA) for Banking System**  

This project is a React.js + TypeScript frontend for managing bank clients and accounts. It communicates with the backend via API calls to the `gateway-service`.  

## **📌 Features**  

✅ **Dashboard**: Overview of clients and accounts  
✅ **Client Management**: Add, edit, and view client details  
✅ **Account Management**: Open, update, and view bank accounts  
✅ **API Integration**: Fetch and manage data via `Axios`  
✅ **Form Validation**: User-friendly input validation and error handling  
✅ **Routing**: Smooth navigation using React Router  

---

## **🛠️ Tech Stack**  

| Technology        | Description                           |
|------------------|-----------------------------------|
| **React.js**      | Frontend framework                |
| **TypeScript**    | Strongly typed JavaScript        |
| **React Router**  | Navigation and routing management |
| **Axios**         | API communication tool            |
| **Material-UI** _(optional)_ | UI design framework          |

---

## **📂 Project Structure**  

```
bank-frontend/
│── public/                # Static files (favicon, index.html, etc.)
│── src/                   # Source code
│   ├── api/               # API service files
│   │   ├── accountApi.ts  # Account API requests
│   │   ├── customerApi.ts # Customer API requests
│   │   ├── axiosInstance.ts # Axios global configuration
│   ├── components/        # Reusable UI components
│   │   ├── Navbar.tsx     # Navigation bar
│   │   ├── AccountCard.tsx # Account card UI
│   │   ├── ClientForm.tsx # Client form component
│   ├── pages/             # Page components
│   │   ├── Dashboard.tsx  # Dashboard page
│   │   ├── AccountManagement.tsx # Account management page
│   │   ├── ClientManagement.tsx  # Client management page
│   │   ├── AccountDetails.tsx  # Account details page
│   │   ├── ClientDetails.tsx  # Client details page
│   ├── types/             # TypeScript type definitions
│   │   ├── account.ts     # Account type definitions
│   │   ├── client.ts      # Client type definitions
│   │   ├── theme.ts       # Theme settings (if applicable)
│── package.json           # Project dependencies & scripts
│── tsconfig.json          # TypeScript configuration
│── README.md              # Project documentation
```

---

## **⚙️ Installation & Setup**  

1️⃣ Clone the repository  
```sh
git clone https://github.com/Douaesb/bank-frontend.git
cd bank-frontend
```

2️⃣ Install dependencies  
```sh
npm install
```

3️⃣ Start the development server  
```sh
npm run dev
```

4️⃣ Open in browser  
```
http://localhost:5173
```

---

## **📡 API Configuration**  

- The frontend interacts with the backend (`gateway-service`) using Axios.  
- Configure the **base URL** in `axiosInstance.ts`:  
```ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080', 
  headers: { 'Content-Type': 'application/json' }
});

export default api;
```

---

## **📜 License**
This project is licensed under the **MIT License**


## Contact

For any questions or suggestions, please contact:

- **Name:** Douae Sebti
- **Email:** [douae.sb411@gmail.com](mailto:douae.sb411@gmail.com)
- **GitHub:** [Douaesb](https://github.com/Douaesb)

