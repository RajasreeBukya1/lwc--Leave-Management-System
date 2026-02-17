**Project Overview – Leave Management System**

This project is a Salesforce Leave Management Application developed using Lightning Web Components (LWC) and Apex, designed to streamline leave requests and approvals for both Employees and Managers.

--------------------------------------

**Application Structure**

The application uses a Tabset Layout with two primary modules:

- Employee

- Manager
-------------------------------------------

**Employee Module** 

**1. Toggle Information Section**

- Implemented a dynamic toggle button.

- Button label updates between Show / Hide.

- Clicking the button displays or hides informational content using conditional rendering.

**2. Leave Actions**

A radio/button group provides three main actions:

* Apply 

    - Opens a Lightning Record Edit Form in a modal popup.

    - Users can create a new leave record.

    - Includes Save and Cancel buttons.

    - On successful save, the onsuccess event is triggered and a Toast Notification is displayed.
 
    - <img width="3789" height="2052" alt="image" src="https://github.com/user-attachments/assets/30607ddd-5ebe-446d-a96c-0bb0cbb493bc" />

* Pending 

    - Displays all pending leave records in a data table.

    - Edit button is enabled only for records with “Pending” status.

    - Clicking Edit opens the record in a record edit form modal.
 
    - <img width="3797" height="1358" alt="image" src="https://github.com/user-attachments/assets/24399c3a-2c10-4487-a4d6-a8a2165e8241" />

* History 

    - Displays all leave records (Pending, Approved, Rejected).

    - Only Pending records are editable.

    - Edit button is disabled for Approved and Rejected records.
 
    - <img width="3776" height="2165" alt="image" src="https://github.com/user-attachments/assets/fbec4870-119e-4c2c-8064-d16ee4fec5cb" />

**3. UI Enhancements**

- Applied custom CSS styling to the Status column in the data table to visually distinguish:

    - Approved

    - Rejected

    - Pending
------------------------------
**Manager Module**
- Managers can view only the leave records of employees assigned to them.

- Ensures role-based data visibility and access control.

  <img width="2274" height="768" alt="image" src="https://github.com/user-attachments/assets/bea6ec34-4e4c-4a8f-a736-1ad87259fbd1" />

 ----------------------------------

**Backend Implementation**

- Developed an Apex Controller – LeaveManagementHandler.

- Apex methods are invoked from LWC components to:

    - Fetch pending leave records

    - Fetch leave history

    - Enforce business logic and data filtering
--------------------------------------
**Key Features**

- Role-based UI (Employee vs Manager)

- Dynamic conditional rendering

- Record creation and editing using lightning-record-edit-form

- Toast notifications on successful operations

- Data tables with conditional button enable/disable

- Custom CSS styling based on record status

- Apex integration for server-side data handling
