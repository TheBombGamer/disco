export { default } from 'next-auth/middleware';

export const config = {
    matcher: [
        '/app', 
    "/app/courses", 
    "/app/upcoming-courses",
     "/app/live-courses", 
     "/app/chat", 
     "/app/assignment", 
     '/admin', 
     "/admin/chat",
      "/admin/upload", 
      "/admin/upload-meet", 
      "/admin/upload-assignment", 
      "/admin/upload-project", 
      "/admin/add-new", 
      "/admin/my-students",
       "/admin/students", 
       "/admin/admins"]
}
