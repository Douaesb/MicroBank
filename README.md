## **MicroBank - A Microservices-Based Banking Application** 🚀

### **📌 Overview**
MicroBank is a **microservices-based banking backend application** that manages clients and their bank accounts (checking and savings). The system provides REST APIs for client and account management, leveraging **Spring Cloud** for scalability and flexibility.

---

## **🛠️ Tech Stack**
- **Backend**: Spring Boot, Spring Data JPA
- **Microservices**: Spring Cloud (Eureka, Config, Gateway)
- **Database**: PostgreSQL
- **Inter-Service Communication**: RestTemplate
- **Configuration Management**: Spring Cloud Config
- **API Gateway**: Spring Cloud Gateway
- **Service Discovery**: Eureka
- **Version Control**: Git + GitHub
- **Build & Dependency Management**: Maven

---

## **📌 Microservices Architecture**
The application consists of the following microservices:

| Microservice         | Port  | Responsibility |
|----------------------|------|---------------|
| **Config Service** (`config-service`) | `8888` | Centralized configuration management via Git |
| **Discovery Service** (`discovery-service`) | `8761` | Eureka Service Registry for service discovery |
| **API Gateway** (`gateway-service`) | `8080` | Entry point for client requests, routing to services |
| **Customer Service** (`customer-service`) | `8081` | Manages clients (CRUD operations) |
| **Account Service** (`account-service`) | `8082` | Manages bank accounts for clients |

---

## **📁 Project Structure**

```bash
MicroBank/
│── centralized-config/   # Centralized Configurations in Git
│── config-service/       # Spring Cloud Config Server
│── discovery-service/    # Eureka Server
│── gateway-service/      # API Gateway
│── customer-service/     # Customer Management Service
│── account-service/      # Account Management Service
└── README.md             # Documentation
```

---

## **⚙️ Setup & Installation**

### **1️⃣ Clone the Repository**
```bash
git clone https://github.com/Douaesb/MicroBank.git
cd MicroBank
```

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

### **6️⃣ Verify Everything is Running**
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

## **📑 Configuration Management**

All configuration files are stored in **centralized-config** (Git repository).

Structure:
```
centralized-config/
│── customer-service.yml
│── account-service.yml
│── gateway-service.yml
│── discovery-service.yml
│── config-service.yml
```

Each service **fetches its config from** the **Spring Cloud Config Server** (`http://localhost:8888`).

---

## **📌 API Endpoints**

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

## **🛠️ Best Practices & Considerations**

✔ **Centralized Configuration**: All configs are managed via `config-service`.  
✔ **Service Discovery**: All services register with Eureka for automatic discovery.  
✔ **API Gateway**: Handles authentication, logging, and routing for external requests.  
✔ **Decoupled Services**: Each service has its own database and logic.  
✔ **Resilience**: Can integrate **Circuit Breakers** (e.g., Resilience4J) for fault tolerance.

---

## **📜 License**
This project is licensed under the **MIT License**


## Contact

For any questions or suggestions, please contact:

- **Name:** Douae Sebti
- **Email:** [douae.sb411@gmail.com](mailto:douae.sb411@gmail.com)
- **GitHub:** [Douaesb](https://github.com/Douaesb)
