import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Student Profile — Attendance Overview" },
      {
        name: "description",
        content:
          "Student profile page with editable details, attendance summary, subject-wise attendance and email notification settings.",
      },
      { property: "og:title", content: "Student Profile — Attendance Overview" },
      {
        property: "og:description",
        content:
          "Student profile page with editable details, attendance summary, subject-wise attendance and email notification settings.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

// The module itself is plain HTML/CSS/JS in public/student-profile/.
// This route simply displays it so it can be previewed and handed over as-is.
function Index() {
  return (
    <iframe
      src="/student-profile/index.html"
      title="Student Profile"
      style={{ border: "none", width: "100%", height: "100vh", display: "block" }}
    />
  );
}
