# Draft

Outline:

1. **Ideation**
   > items:
   1. Prodcut Vision `Stratigic`
   2. Themes `Stratigic`
   3. Epics `Stratigic`
   4. User stories
2. **Planing:**
   - > selecting which **Epic / related group of User stories** we should work on
     > **for which peroid of time (Month/Sprint/Week)**
   - > After Selecting Group we start new cycle of
   1. **OO** Analysis
        > **\*note**: OO -> means object oriented
        - Analyze _selected group_ of userstories and do 2 things
        - Database /**Data Layer**:
        1. Data Analysis
            - Extract components from
                - attrbuites
                - validations & constrains
                - has index?
            - Define Components Relationships
   2. Design
   3. Implemention

Product Vision -> Themes -> epics -> user stories -> tasks

## Layers

    Database -> backend -> UI_UX -> Frontend

### Tech stack

    Database:
        SQL:
        NoSQL:

    backend:

    UI_UX:

    Frontend:

## Phases

    Analysis -> Design -> Implementation

### Analysis phase

    input: Themes/epics
    output: components, relationships;

    Database:
        Input: components, relationships;
        output:
            Entities:
                attributes:
                    Validations,
                    indices
                Relationships

    UI_UX:
        Input: Product Vision
        output:
            UX Research
            Personas
            Brand
            Brand pages
                IA

### Design phase

    Database:
        Input:
            Entities:
                attributes: Validations,
                Relationships
        output: databse_model.dbml

    UI_UX:
        Input:
        output:
            UX Research
            Personas
            Brand
            Design System
                Foundations Raw values
                    Colors
                    Typography
                    Spacing
                Semantics


    Frontend:
        Input:
        Output:
            Design System
            Foundations Raw values
            Semantics

### Implementation

    Database:
        Input:
        output: Physical_Scheme

    Backend:
        Input: Physical_Scheme
        output: API

    UI_UX:
        Input: API Endpoints / Physical_Scheme
        output:
            Library
                Components
                UI Patterns
            Brand / Application pages

    frontend:
        Input:
        output:
            Library
                Components
                UI Patterns
            Brand / Application pages

---
