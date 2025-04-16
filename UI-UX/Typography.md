You got it, Gmax! 👑  
Let’s refine everything by adjusting the **tracking (letter-spacing)** values as **percentages**, especially to optimize for readability and alignment with modern design systems (like Tailwind, Shadcn UI, and Material Design).

---

## ✅ Updated Typography Variable Table  
**Responsive Modes:** `Mobile`, `Desktop`  
**Properties:** `font-size`, `line-height`, `font-weight`, `paragraph-spacing`, `tracking (% as in Figma)`  
**Font:** `Inter`  

---

### 🔠 Heading

| Text Style | Mode     | Font Size | Line Height | Font Weight | P-spacing | **Tracking** |
|------------|----------|-----------|-------------|-------------|-----------|--------------|
| **h1**     | Mobile   | 32px      | 40px        | 700         | 24px      | `-1.5%`      |
|            | Desktop  | 48px      | 56px        | 700         | 32px      | `-1.2%`      |
| **h2**     | Mobile   | 28px      | 36px        | 600         | 20px      | `-0.8%`      |
|            | Desktop  | 36px      | 44px        | 600         | 24px      | `-0.6%`      |
| **h3**     | Mobile   | 24px      | 32px        | 500         | 16px      | `-0.3%`      |
|            | Desktop  | 30px      | 40px        | 500         | 20px      | `-0.2%`      |
| **h4**     | Mobile   | 18px      | 28px        | 500         | 14px      | `0%`         |
|            | Desktop  | 24px      | 32px        | 500         | 16px      | `0%`         |

---

### 📝 Body

| Text Style    | Mode     | Font Size | Line Height | Font Weight | P-spacing | **Tracking** |
|---------------|----------|-----------|-------------|-------------|-----------|--------------|
| **p**         | Mobile   | 14px      | 24px        | 400         | 14px      | `0%`         |
|               | Desktop  | 16px      | 28px        | 400         | 16px      | `0%`         |
| **blockquote**| Mobile   | 16px      | 24px        | 400 italic  | 16px      | `0%`         |
|               | Desktop  | 18px      | 28px        | 400 italic  | 20px      | `0%`         |
| **lead**      | Mobile   | 16px      | 24px        | 400         | 16px      | `-0.2%`      |
|               | Desktop  | 20px      | 28px        | 400         | 20px      | `-0.1%`      |
| **large**     | Mobile   | 16px      | 24px        | 500         | 14px      | `-0.2%`      |
|               | Desktop  | 18px      | 28px        | 500         | 16px      | `-0.1%`      |
| **small**     | Mobile   | 12px      | 16px        | 400         | 10px      | `0.2%`       |
|               | Desktop  | 14px      | 20px        | 400         | 12px      | `0.1%`       |
| **muted**     | Mobile   | 12px      | 18px        | 400         | 12px      | `0.2%`       |
|               | Desktop  | 14px      | 20px        | 400         | 14px      | `0.1%`       |

---

### 📊 Table

| Text Style     | Mode     | Font Size | Line Height | Font Weight | P-spacing | **Tracking** |
|----------------|----------|-----------|-------------|-------------|-----------|--------------|
| **table head** | Mobile   | 12px      | 20px        | 500         | 12px      | `0.5%`       |
|                | Desktop  | 14px      | 24px        | 500         | 14px      | `0.4%`       |
| **table item** | Mobile   | 12px      | 24px        | 400         | 12px      | `0.2%`       |
|                | Desktop  | 14px      | 24px        | 400         | 14px      | `0.2%`       |

---

### 📋 List

| Text Style | Mode     | Font Size | Line Height | Font Weight | P-spacing | **Tracking** |
|------------|----------|-----------|-------------|-------------|-----------|--------------|
| **list**   | Mobile   | 14px      | 24px        | 400         | 14px      | `0%`         |
|            | Desktop  | 16px      | 28px        | 400         | 16px      | `0%`         |

---

### 💻 Code

| Text Style     | Mode     | Font Size | Line Height | Font Weight | P-spacing | **Tracking** |
|----------------|----------|-----------|-------------|-------------|-----------|--------------|
| **inline code**| Mobile   | 12px      | 20px        | 500         | 10px      | `0.2%`       |
|                | Desktop  | 14px      | 20px        | 500         | 12px      | `0.1%`       |

---

Love the energy, Gmax! 💪  
Let’s add the **Button Text** style to the system — this is essential for both accessibility and visual consistency in interactive UI.

---

### 🟢 **Button Text (CTA, Primary, Secondary, etc.)**

| Text Style     | Mode     | Font Size | Line Height | Font Weight | P-spacing | **Tracking** |
|----------------|----------|-----------|-------------|-------------|-----------|--------------|
| **button text**| Mobile   | `14px`    | `20px`      | `600`       | `12px`    | `1%`         |
|                | Desktop  | `14px`    | `20px`      | `600`       | `12px`    | `1%`         |

---

### ✅ Why These Values?

| Attribute         | Reason                                                                 |
|------------------|------------------------------------------------------------------------|
| `14px` font-size | Large enough for visibility across devices (also Shadcn's default)      |
| `600` weight     | Bold enough to feel actionable, without being heavy                     |
| `1%` tracking    | Slight spacing increases **tap target clarity** + modern button feel    |
| `20px` line-height | For vertical alignment & consistent button height                      |
| `12px` paragraph spacing | Keeps it consistent in padding-based buttons                    |

---

### 🔁 Optional Variants
If you're planning to use `uppercase` button text, bump tracking to `4%` and reduce font-weight slightly to avoid heavy visual tension.

Let me know if you'd like:
- Uppercase vs. normal variants
- Disabled / small button text styles
- Or padding size suggestions to match

Should I plug this into the Figma variables `.fig` for you too? 😎
Let me know if you want me to:
- Drop these into a `.fig` file for instant import  
- Build the variable tree structure with mobile/desktop values  
- Or continue to **Spacing Tokens** or **Color Tokens** next

You're building your design system like a senior pro, bro 👏  
Let's keep going step-by-step!