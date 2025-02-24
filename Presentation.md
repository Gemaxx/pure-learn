---
marp: true
theme: default
class: invert
paginate: true

---

<!-- Slide 1: Title Slide -->
# **PureLearn App**
### The Ultimate Self-Learning Management System
**CS Student - [Your Name]**  
**Date: [Date of Presentation]**

---

<!-- Slide 2: Vision & Mission -->
## **Vision & Mission**
### **Vision** ✨
PureLearn is the ultimate self-learning management system, guiding individuals through a structured, goal-driven learning journey.

### **Mission** 🎯
Enable lifelong learners to adopt a sustainable, goal-oriented self-learning process.

---

<!-- Slide 3: Problem Statement -->
## **Problem Statement** ⚠️
Self-directed learners struggle with:
- **Fragmented Tools**: Multiple apps for note-taking, task management, and scheduling.
- **Inefficiency**: Lack of integration leads to wasted time and effort.
- **Loss of Focus**: Difficulty in tracking progress and staying organized.

---

<!-- Slide 4: Solution -->
## **Solution** 💡
### **PureLearn**
A unified platform for:
- **Goal Management** 🎯
- **Task & Time Management** ⏰
- **Progress Tracking** 📊
- **Knowledge Documentation** 📚
- **AI Assistance** 🤖

---

<!-- Slide 5: Target Users -->
## **Target Users** 🎯
1. **Lifelong Learner**: Professionals in fast-evolving fields.
2. **Institution-Guided Learner**: Students & Academics.
3. **Career Switcher**: Transitioning into a new field.
4. **Self-Improver**: Hobbyists & Personal Growth Learners.

---

<!-- Slide 6: Technologies Used -->
## **Technologies Used** 🛠️
- **Frontend**: [Next.js 15](https://nextjs.org/), [React 19](https://react.dev/), [Tailwind CSS 4](https://tailwindcss.com/), [Shadcn UI](https://ui.shadcn.com/)
- **Backend**: [ASP.NET Web API 9.0](https://dotnet.microsoft.com/en-us/)
- **Database**: [Azure SQL](https://azure.microsoft.com/en-us/products/azure-sql-database/)
- **AI Integration**: Machine Learning for personalization.

---

<!-- Slide 7: Development Workflow -->
## **Development Workflow** 🔄
### **1. Input**
- **User Stories** → [Sprint Backlog](https://shaedu-my.sharepoint.com/:x:/g/personal/322223887_sha_edu_eg/EXpawZtbkkNEnLTxyfj3mygBFqBjSf25JH3_d2dJOZfWcQ?e=3eDieX)
- **MindMap**: [PureLearn MindMap](docs/Mindmap)
- **Additional Inputs**: Team Brainstorming, Competitor Analysis, AI Insights.

### **2. Process**
- **High-Level Planning**: Themes → Epics → Component Groups.
- **Extract Key Elements**: DB, Backend, Frontend, AI.

### **3. Output**
- **Analysis & Specification**: DB Schema, API Endpoints, Components.
- **Design**: ERD, C4 Model, UI/UX.
- **Development**: DB, Backend, Frontend, AI.
- **Deployment**: Azure, Vercel.

---

<!-- Slide 8: Core Entities & Functions -->
## **Core Entities & Functions** 🗂️
### **Learner**
- **Attributes**: ID, Name, Email, PasswordHash, ProfilePicture, Bio.
- **Relationships**: 1:M with Goals, Tasks, Resources, Notes.

### **Goal Management**
- **Category**: Title, Color, Description.
- **Goal**: Title, Description, Status.
- **Subgoal**: Title, Status.

### **Task Management**
- **Task**: Title, EisenhowerStatus, RepeatFrequency.
- **Subtask**: Title, Status.

---

<!-- Slide 9: Database Schema -->
## **Database Schema** 🗄️
### **ERD Logical Schema**
- **Tool**: [dbdiagram.io](https://dbdiagram.io/d/Pure-learn-6755b24ee9daa85aca085b40)
- **Visual**: Screenshot of ERD.

---

<!-- Slide 10: System Architecture -->
## **System Architecture** 🏗️
### **C4 Model - Component Level**
- **Backend**: [ASP.NET Web API](https://github.com/Gemaxx/pure-learn/tree/main/C4%20Model)
- **Frontend**: [Next.js, TailwindCSS, Shadcn UI](https://github.com/Gemaxx/pure-learn/tree/main/C4%20Model)
- **Visual**: Screenshot of C4 Model.

---

<!-- Slide 11: Key Features in Detail -->
## **Key Features** 🚀
### **Goal Management**
- Set and track learning goals.

### **Task Management**
- Organize tasks with Kanban and Eisenhower Matrix.

### **Progress Tracking**
- Monitor learning progress.

### **AI Assistance**
- Personalized recommendations and automation.

---

<!-- Slide 12: Themes & Epics -->
## **Themes & Epics** 🌟
| **Theme**              | **Epic**                          |
|-------------------------|------------------------------------|
| Process & Structure     | User Onboarding, Goal Management  |
| Problems & Challenges   | Distraction Management            |
| Best Practices          | Productivity Tips & Techniques    |
| Account Management      | Authentication & Authorization    |
| AI Assistance           | Personalized Learning Suggestions |

---

<!-- Slide 13: Deployment -->
## **Deployment** 🚀
- **Database**: [Azure SQL Database](https://azure.microsoft.com/en-us/products/azure-sql-database/)
- **Backend**: [Azure App Service](https://azure.microsoft.com/en-us/products/app-service/)
- **Frontend**: [Vercel Hobby Tier](https://vercel.com/)
- **AI Integration**: TBD.

---

<!-- Slide 14: Future Work -->
## **Future Work** 🔮
- **AI Enhancements**: Advanced personalization and automation.
- **Mobile App**: Develop a mobile version of PureLearn.
- **User Testing**: Gather feedback and iterate on the design.

---

<!-- Slide 15: Conclusion -->
## **Conclusion** 🎉
### **PureLearn**
- A unified platform for self-directed learners.
- Combines goal management, task management, progress tracking, and AI assistance.

### **Let’s unlock the potential of self-learning together!** 🚀