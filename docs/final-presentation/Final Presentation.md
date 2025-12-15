# PureLearn Final Presentation

---

## 🎤 PRESENTATION PREPARATION

### 👥 PRESENTING OUR TEAM
- Introducing ourselves  
  - Roles and Responsibilities

---

## ⚙️ SELECTING PROCESS & METHODOLOGY

1. **Selecting Software Engineering Method**  
   - We Select (Modern Software Engineering)  
   - Product based vs project based

2. **Selecting Product Management Methodology**  
   - We Select (Agile Product Management)  
     - Under Agile we select scrum framework

3. **UX Process**  
   - Empathize → Define → Ideate → Prototype → Test

---

## 🎯 SELECTING PROBLEM & OUR VISION

4. **Selecting the Problem Domain & Ideas to Solve It**  
   - We Select Self-Learning Process  
     - Talking about  
     - Why is it so important?  
     - I wanted to maximize productivity & overcome frustrations of learning process.

5. **Product Vision**  
   - What’s it? Why’s it important? How to develop effective ones?  
   - Presenting our product Vision  
   - Vision statement

---

## 🙋 EMPATHIZE — USER-CENTRIC DESIGN

6. Research papers & books

7. Asking a real self-learner about frustrations and their opinions of my solution  
   - انا، وزملائي سواء على المستوى الاكاديمي او على مستوى مجال التيك  
     - بتقابلنا صعوبات وتحديات كتير ف حكاية التعلم الذاتي، وعندنا طرق للتغلب عليها  
   - المواصلات  
     - واحد ف كلية علوم عنده 27 شغال فرونت ايند، التعلم الذاتي غيرله حياته حتى لو بدأ ف وقت متأخر  
     - واحد كان شغال ف شئون قانونيه ومتزوج 35 سنة وكان عايز يسوتش كارير وبدأ يتعلم عشان يدخل مجال تاني – كول سنتر

---

## 🧠 DEFINE

8. Developing Personas & Scenarios  
   - Presenting Our Personas Sections  
     - Basic info  
     - Quote  
     - Bio  
     - Core needs  
     - Frustrations

9. Problem Statement

10. Prompt (The start of brainstorming)

---

## 💡 IDEATION

11. Extracting Themes from (Product Vision, Personas & Scenarios, Prompt)  
12. Themes → Epics  
13. Epics → User Stories  
14. All of this under the product backlog and its refinements

---

## 🔍 ANALYSIS

15. More brainstorming to develop the technical solution from the theoretical solution  
16. Extracting Components from user stories  
17. Make mind maps to group components with the same context  
18. Competitor analysis  
19. Start Incremental by choosing parts  
   - Select big parts like (theme → epic → Group of components)  
   - Start Sprint planning

20. DB Analysis & Data Specifications  
   - Process  
     - Extract Entities from components  
     - Relationships & Attributes that will serve the functionalities of the user stories  
   - Tools  
     - [Database.build](https://database.build/db/pg4i6qjrd0fx29fm)  
   - DB

---

## 🧱 MODELING – CODING AS MODEL

21. Software Architecture Model  
   - C4 Model  
     - C4 vs UML  
     - Why use it  
     - Present our C4

22. DB Modeling  
   - Logical Scheme ERD  
   - [ERD Diagram](https://dbdiagram.io/d/Simplified-PureLearn-67b8b339263d6cf9a0068299)

---

## 🛠 DEVELOPMENT

- Version Control – Git & GitHub  
- Choosing DB First Approach

---

### 🗄 DB DEVELOPMENT

23. Physical Scheme  
   - Tools  
     - [Database.build](https://database.build/db/pg4i6qjrd0fx29fm)  
     - VSCode SQLSERVER Extension  
     - VSCode Database Project

---

### 🌐 API DEVELOPMENT

24. From DB To API Models & DB Context  
   - We used EF scaffolds, it saved a lot of development time  
   - If updates are needed, we use migration

25. DTOs  
26. Mappers  
27. Repositories Interface  
28. Repositories  
29. Controllers  
30. Dependency Injection in `program.cs` file  
31. Containerization

---

## 🎨 UI/UX DESIGN

32. Information Architecture  
33. Design Decisions  
   - Minimalism UI Design  
   - Glass Morphism

34. Design System  
   - Typography  
   - Colors (Dark / White mode)  
   - Layout Grid Systems  
     - Mobile-first approach  
   - Spacing  
   - Radius  
   - Elevation

35. Components System  
36. Wireframes (Low-Fidelity)  
37. Mockups (High-Fidelity)  
38. Prototyping + Usability Testing

---

## 💻 FRONTEND DEVELOPMENT

---

## 📱 MOBILE FRONTEND DEVELOPMENT

39.  
**1)** Why Kotlin and Jetpack Compose?  
**2)** Application Architecture Overview  
**3)** Technologies Used  

| Technology              | Purpose                                |
|-------------------------|----------------------------------------|
| Jetpack Compose         | Modern UI development for Android      |
| Kotlin                  | Main programming language              |
| Retrofit + Moshi        | API communication and JSON parsing     |
| Dagger Hilt             | Dependency Injection                   |
| Kotlin Coroutines/Flow  | Asynchronous data handling             |
| Jetpack Navigation      | Navigation between screens             |

**4)** Layered Architecture Breakdown

| Layer                 | Key Role                               | Technologies Used                        |
|-----------------------|----------------------------------------|------------------------------------------|
| 1. Presentation UI    | Displays data, handles interaction     | Jetpack Compose, ViewModel, StateFlow    |
| 2. Domain Layer       | App logic, models, and use cases       | Kotlin Data Classes, Use-Case logic      |
| 3. Data Layer         | API or local data provider             | Retrofit, Repository Pattern             |
| 4. Dependency Injection | Global object provisioning           | Dagger Hilt, NetworkModule               |

**5)** Integration Flow Between Mobile App and Backend

```
\[ UI (Jetpack Compose) ]
↓
\[ ViewModel (StateFlow, Coroutines) ]
↓
\[ Repository (Injected with Hilt) ]
↓
\[ Retrofit Service Interface ]
↓
\[ .NET Backend API ]
↑
\[ Moshi parses JSON into Kotlin data models ]
↑
\[ Data returned to ViewModel and UI is updated ]
```

**6)** App Demo

---

## 🌍 WEB FRONTEND DEVELOPMENT *(In Progress)*

- **Tech Stack**: Next.js, Shadcn UI, Tailwind CSS  
- **Page Structure & Components**  
- **Reusable Components**  
- **Dynamic Routing**  
- **Data Fetching**  
- **API Integration**  
- **Loading/Error States**  
- **Challenges & Learnings**  
- **Demo**

---

## ☁️ DEPLOYMENT

Azure Cloud  
Free monthly limited hosting  
$100 credit for students

40. **Database Deployment**  
   - Azure SQL Database (Serverless)

41. **API Deployment**  
   - Azure App Service

