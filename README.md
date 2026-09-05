# Student Hub

Build ONLY the Student Profile module for a college attendance management web application.

IMPORTANT PROJECT CONTEXT:
This is a module inside a larger hackathon project being built by a 6-member team. Each member is building a separate module/page and everything will be integrated later.

I am responsible ONLY for the Student Profile module.

DO NOT build:
- the complete website
- admin dashboard
- teacher dashboard
- attendance management system
- login/authentication system
- other team members' modules

The website/project name, logo, and final branding have NOT been decided yet.

Therefore:
- Do NOT invent a project name.
- Do NOT add a logo with a made-up name.
- Use "Student Profile" as the page heading.
- Keep the design professional, modern, clean and neutral.
- Make the theme easy to change later.

TECHNOLOGY:
The team is using plain HTML, CSS and vanilla JavaScript.
Do NOT use React, Next.js, Vue, Angular, Bootstrap or Tailwind.
Keep this module self-contained and easy to integrate into a plain HTML/CSS/JS project later.

================================
STUDENT PROFILE
================================

Create a polished Student Profile page containing:

1. Profile photo/avatar
2. Student Name
3. Course
4. Roll Number
5. Mobile Number
6. Email ID

Use realistic MOCK DATA for now.

Example:
Name: Nishtha Dhiman
Course: B.Sc. (Hons.) Physics
Roll Number: 12345
Mobile: +91 XXXXX XXXXX
Email: student@example.com

Clearly keep mock data separate so it can later be replaced with real database data.

================================
EDIT PROFILE
================================

Add an "Edit Profile" button.

When clicked:
- Open an edit form or modal.
- Allow editing:
  Name
  Course
  Roll Number
  Mobile Number
  Email ID
- Include Save Changes and Cancel buttons.
- Validate required fields.
- Validate email format.
- Show a success message after saving.
- Use localStorage for the prototype so changes persist after refresh.

================================
ATTENDANCE SUMMARY
================================

Add an Attendance Summary section.

Display:
- Overall Attendance %
- Classes Attended
- Classes Missed
- Total Classes

Use mock data:

Overall Attendance: 82%
Classes Attended: 41
Classes Missed: 9
Total Classes: 50

Include a visually attractive progress bar or circular progress indicator.

IMPORTANT:
Attendance data is MOCK DATA only.

Another team member will build the actual attendance system later.

Keep the attendance data in a separate JavaScript object so it can easily be replaced with real data later.

================================
SUBJECT-WISE ATTENDANCE
================================

Add a Subject-wise Attendance section.

Example:

Physics — 88%
Mathematics — 76%
Computer Science — 91%
Electronics — 79%

Each subject should have:
- Subject name
- Percentage
- Progress bar
- Clear attendance status

Use:
75% and above = Good
60–74% = Warning
Below 60% = Low

Keep these thresholds easy to modify later.

================================
RECENT ACTIVITY
================================

Add a Recent Activity section showing examples such as:

Physics Class — Present
Mathematics Class — Present
Computer Science Class — Missed
Mathematics Test — Missed

Each activity should show:
- Class/Test name
- Date/time
- Present/Missed status

Use mock data only.

================================
EMAIL NOTIFICATION SETTINGS
================================

Add a Notification Settings card.

Include:

Email Notifications

"Receive an email when you miss a class or test."

Add a functional ON/OFF toggle.

Also provide an "Unsubscribe" option.

IMPORTANT:
DO NOT implement actual email sending.

There is currently no backend or email service.

For this prototype:
- Make the toggle work using JavaScript.
- Store the preference using localStorage.
- If notifications are OFF, clearly show that email notifications are disabled.
- Allow the student to turn them ON again.
- Unsubscribe must ONLY disable email notifications.
- It must NOT delete student data or attendance records.

================================
EMAIL NOTIFICATION PREVIEW
================================

Add a small "Notification Preview" section demonstrating what a missed-class email could look like.

Example:

Missed Class Alert

Subject:
Attendance Alert: Class Missed

Message:
You missed your scheduled Physics class on [date/time].

This is ONLY a visual preview.
DO NOT actually send an email.

================================
DESIGN
================================

Create a modern, professional college web-app design.

Use:
- Light/white background
- One professional accent colour
- Clean cards
- Rounded corners
- Subtle shadows
- Clear typography
- Good spacing
- Professional buttons
- Simple icons if useful

Do not use:
- excessive animations
- excessive gradients
- childish design
- unnecessary decorative elements

Use CSS variables for colours so the entire theme can easily be changed later.

For example:

:root {
  --primary-color: ...;
  --secondary-color: ...;
  --background-color: ...;
  --card-color: ...;
  --text-color: ...;
  --success-color: ...;
  --warning-color: ...;
  --danger-color: ...;
}

DO NOT hard-code a project name anywhere.

================================
RESPONSIVENESS
================================

The page must work properly on:

- Desktop
- Laptop
- Tablet
- Mobile

On mobile:
- Cards should stack properly.
- No horizontal scrolling.
- Buttons should remain easy to tap.
- Text should remain readable.
- Profile information should adapt to the smaller screen.

================================
INTEGRATION REQUIREMENTS
================================

This module will later be integrated into another team member's main website.

Therefore:

- Keep the Student Profile module self-contained.
- Do not create unnecessary global CSS.
- Prefix CSS classes with "sp-" where practical.

Examples:
sp-profile
sp-card
sp-attendance
sp-notifications
sp-modal

- Keep JavaScript functions modular.
- Keep mock student data, attendance data, activity data and notification settings separate.
- Do not assume another team member's code structure.
- Do not modify or create unrelated modules.
- Make it easy to replace mock data with real backend/database data later.

================================
FILE STRUCTURE
================================

Create:

student-profile/
    index.html
    style.css
    script.js

Keep HTML, CSS and JavaScript separate.

Use semantic HTML5 and clean, readable code.

================================
FUNCTIONALITY
================================

Make sure these work:

1. Profile information displays.
2. Edit Profile works.
3. Save Changes works.
4. Cancel works.
5. Form validation works.
6. Profile changes persist using localStorage.
7. Attendance summary displays.
8. Subject attendance displays.
9. Recent activity displays.
10. Notification toggle works.
11. Notification preference persists after refresh.
12. Unsubscribe works.
13. Notifications can be enabled again.
14. Email preview is displayed but no real email is sent.
15. Responsive layout works.
16. No horizontal scrolling on mobile.
17. No console errors.

IMPORTANT:
Do not add backend functionality yet.
Do not add Firebase yet.
Do not add actual email sending yet.

The goal is a polished, fully functional FRONTEND PROTOTYPE of ONLY the Student Profile module that can later be integrated with the rest of the team's project.

Before finishing, test the page and make sure all buttons and interactions work.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/63091a3a-7f98-47f4-9448-a335693defb0).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
