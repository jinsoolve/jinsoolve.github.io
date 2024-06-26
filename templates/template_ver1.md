---
creation date: <% tp.file.creation_date() %>
modification date: <% tp.file.last_modified_date("dddd Do MMMM YYYY HH:mm:ss") %>
---
<%* 
const today = tp.date.now("YYYY-MM-DD"); 
const title = await tp.system.prompt("Enter the post title"); 
const fileName = `${today}-${title.replace(/\s+/g, '-')}.md`; 
tp.file.title = fileName;
%>