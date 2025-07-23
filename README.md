# 🍽️ Eat and Repeat - Family Restaurant App

A microservices-based restaurant management system for a seamless digital dining experience. This app supports user authentication, menu browsing, cart management, order placement, payment processing, and delivery tracking.

> ✅ **Backend (complete)**: All services containerized with Docker & integrated via API Gateway  
> 🚧 **Frontend (pending)**: Planned to be built using React.js  
> 🧪 **Tested** with Thunder Client (screenshots included)

---

## ⚙️ Backend Microservices

| Service           | Description                                       | Folder Path                      |
|-------------------|---------------------------------------------------|----------------------------------|
| 👤 **User Service**     | Manages user details and roles                  | `backend/user-service/`          |
| 🔐 **Auth Service**     | Firebase-based user authentication              | `backend/auth-service/`          |
| 🍽️ **Menu Service**     | Menu CRUD: add, update, view food items         | `backend/menu-service/`          |
| 🛒 **Cart Service**     | Handles user's cart (add/remove/view items)     | `backend/cart-service/`          |
| 📦 **Order Service**    | Order placement, status updates                 | `backend/order-service/`         |
| 💳 **Payment Service**  | Payment gateway (mock/payments tracking)        | `backend/payment-service/`       |
| 🛵 **Delivery Service** | Assigns & tracks deliveries                     | `backend/delivery-service/`      |
| 🌐 **API Gateway**      | Routes all external requests to services        | `Eat and Repeat Family Restaurant/api-gateway/`           |

---

## 🐳 Dockerized Setup

Each service has:
- `Dockerfile` to containerize the service
- `.env` for environment configuration
- Express-based backend logic

### 🧩 Docker Compose

All services are orchestrated using Docker Compose.

```bash
docker-compose up --build
```

## 🌐 API Gateway Routing
The API Gateway handles all routing logic using http-proxy-middleware.

Incoming Route	Redirected to
/api/auth/...	Auth Service
/api/user/...	User Service
/api/menu/...	Menu Service
/api/cart/...	Cart Service
/api/order/...	Order Service
/api/payment/...	Payment Service
/api/delivery/...	Delivery Service

All frontend-to-backend communication passes through the gateway.





## 🚀 Setup Instructions
1. Clone the Repository
bash
Copy code
git clone https://github.com/shubhanjali04/Eat-and-Repeat-Family-Restaurant.git
cd Eat-and-Repeat-Family-Restaurant
2. Setup Environment Files
Create .env files in each service directory with required environment variables. (Do not commit secrets like Firebase credentials.)

3. Start Services with Docker Compose
bash
Copy code
docker-compose up --build
All services will run on their assigned ports, accessible via the API Gateway.

4. Test APIs via Thunder Client or Postman
Import the endpoints and test each service.

## 🎨 Frontend (Coming Soon)
 The frontend will be developed using:

 React.js + Tailwind CSS

 Axios to consume API Gateway routes

 Features: login, menu browsing, cart, order, payment & delivery tracking



 #### API Testing Screenshots(Thunder Client)

 ### 📦 Auth Service

![Auth Register](screenshots/AuthRegister.png)  
*Register API tested via Thunder Client*

![Auth Login](screenshots/AuthLogin.png)  
*Login API tested via Thunder Client*

![Auth Logout](screenshots/AuthLogout.png)  
*Logout API tested via Thunder Client*

---

### 📋 Menu Service

![Menu Fetch](screenshots/GetMenuItem.png)  
*View all menu items using menuItemId*

![Menu Add](screenshots/MenuItemAdd.png)  
*Add a new menu item*

---

### 🛒 Cart Service

![Cart Add](screenshots/cartAdd.png)  
*Add item to cart*

---

### 🧾 Order Service

![Order Place](screenshots/OrderPlace.png)  
*Place order API*

---

### 💳 Payment Service

![Payment](screenshots/payment1.png)  
*Payment gateway simulation*

![Payment Verify](screenshots/Paymentverify.png)  
*Verify payment transaction*

---

### 🚚 Delivery Service

![Delivery Status](screenshots/deliveryAssign.png)  
*Assign/Track delivery status*



 ### 🙌 Acknowledgement

I would like to express my sincere gratitude to **Celebal Technologies** for providing me the opportunity to work on this project as part of my internship. This experience has been a valuable milestone in my learning journey, offering deep insights into real-world software development practices.

I am especially thankful to my mentor, **Mr. Ayush Rathore sir**, for his constant guidance, encouragement, and constructive feedback throughout the project. His support and mentorship were instrumental in the successful completion of this project.

I also extend my appreciation to all team members and peers who supported me directly or indirectly during this internship.

Through this project, I gained practical experience in:
- Building backend microservices using **Node.js** and **Express.js**  
- Containerizing services with **Docker** and orchestrating them using **Docker Compose**  
- Integrating services through an **API Gateway**  
- Testing REST APIs with **Thunder Client**  
- Managing code and version control using **Git** and **GitHub**

The technical skills and experience acquired during this internship will greatly benefit my future endeavors in software engineering.

