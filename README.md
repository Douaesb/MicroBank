# **MicroBank - A Microservices-Based Banking Application** 🚀

### **📌 Overview**
MicroBank is a **full-stack microservices-based banking application** that enables client and account management. The **backend** follows a **Spring Boot microservices architecture**, while the **frontend** is built with **React.js and TypeScript**, providing a seamless user experience.  

---

## **🛠️ Tech Stack**
### **🔹 Backend**
- **Spring Boot** (Microservices Development)
- **Spring Data JPA** (Database Access)
- **Spring Cloud** (Eureka, Config, Gateway)
- **PostgreSQL** (Relational Database)
- **RestTemplate** (Inter-Service Communication)
- **Spring Cloud Config** (Configuration Management)
- **Spring Cloud Gateway** (API Gateway)
- **Eureka Service Discovery**
- **Maven** (Dependency & Build Management)

### **🔹 Frontend**
- **React.js** (UI Development)
- **TypeScript** (Strict Typing)
- **React Router** (Navigation & Routing)
- **Axios** (API Communication)
- **Material-UI** (UI Components)
- **Vite** (Bundler for Fast Development)

---

## **📌 Microservices Architecture**
The backend consists of several microservices:

| Microservice         | Port  | Responsibility |
|----------------------|------|---------------|
| **Config Service** (`config-service`) | `8888` | Centralized configuration management via Git |
| **Discovery Service** (`discovery-service`) | `8761` | Eureka Service Registry for service discovery |
| **API Gateway** (`gateway-service`) | `8080` | Entry point for client requests, routing to services |
| **Customer Service** (`customer-service`) | `8081` | Manages clients (CRUD operations) |
| **Account Service** (`account-service`) | `8082` | Manages bank accounts for clients |

The frontend is a **Single Page Application (SPA)** that communicates with the backend via the **API Gateway**.

---

## **📁 Project Structure**
### **🔹 Backend Structure**
```bash
MicroBank/
│── centralized-config/   # Centralized Configurations in Git
│── config-service/       # Spring Cloud Config Server
│── discovery-service/    # Eureka Server
│── gateway-service/      # API Gateway
│── customer-service/     # Customer Management Service
│── account-service/      # Account Management Service
│── README.md             # Documentation
```

### **🔹 Frontend Structure**
```bash
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

## **⚙️ Setup & Installation**

### **1️⃣ Clone the Repository**
```bash
git clone https://github.com/Douaesb/MicroBank.git
cd MicroBank
```

---

## **🔹 Backend Setup**
### **2️⃣ Start the Config Server**
```bash
cd config-service
mvn spring-boot:run
```
- Ensure it loads configuration from **Git**:
  ```
  http://localhost:8888/customer-service/default
  ```

### **3️⃣ Start Eureka Discovery Server**
```bash
cd discovery-service
mvn spring-boot:run
```
- Check **Eureka Dashboard**:
  ```
  http://localhost:8761
  ```

### **4️⃣ Start the API Gateway**
```bash
cd gateway-service
mvn spring-boot:run
```
- The gateway routes API requests to microservices.

### **5️⃣ Start Business Microservices**
Run **Customer Service** and **Account Service**:
```bash
cd customer-service
mvn spring-boot:run
```
```bash
cd account-service
mvn spring-boot:run
```

### **6️⃣ Verify Backend APIs**
Test API endpoints:
- **Get all customers:**
  ```
  http://localhost:8080/customers
  ```
- **Get all accounts:**
  ```
  http://localhost:8080/accounts
  ```

---

## **🔹 Frontend Setup**
### **7️⃣ Navigate to the Frontend Folder**
```bash
cd bank-frontend
```

### **8️⃣ Install Dependencies**
```bash
npm install
```

### **9️⃣ Start the Development Server**
```bash
npm run dev
```

### **🔟 Open in Browser**
```
http://localhost:5173
```

---

## **📡 API Configuration (Frontend)**
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

## **📑 API Endpoints**
### **Customer Service** (`http://localhost:8081`)
| Method | Endpoint         | Description  |
|--------|----------------|--------------|
| GET    | `/customers`    | Get all customers |
| GET    | `/customers/{id}` | Get customer by ID |
| POST   | `/customers`    | Create a new customer |

### **Account Service** (`http://localhost:8082`)
| Method | Endpoint       | Description  |
|--------|--------------|--------------|
| GET    | `/accounts`  | Get all accounts |
| GET    | `/accounts/{id}` | Get account by ID |
| POST   | `/accounts`  | Create a new account |

---

## **🎯 Features**
### **🔹 Backend**
✔ **Centralized Configuration**: Managed via `config-service`.  
✔ **Service Discovery**: Eureka for automatic discovery.  
✔ **API Gateway**: Handles authentication, logging, and routing.  
✔ **Decoupled Services**: Each service has its own database and logic.  
✔ **Resilience**: Can integrate **Circuit Breakers** (e.g., Resilience4J).  

### **🔹 Frontend**
✔ **Dashboard**: Overview of clients and accounts  
✔ **Client & Account Management**: Add, edit, and view data  
✔ **Form Validation**: User-friendly input validation  
✔ **Routing**: Smooth navigation with React Router  
✔ **State Management**: Context API (or Redux in future)  

---

## **📜 License**
This project is licensed under the **MIT License**.

---

## **📞 Contact**
For any questions or suggestions, please contact:

- **Name:** Douae Sebti  
- **Email:** [douae.sb411@gmail.com](mailto:douae.sb411@gmail.com)  
- **GitHub:** [Douaesb](https://github.com/Douaesb)  
