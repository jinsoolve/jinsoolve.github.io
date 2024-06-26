---
layout: post
title: "<% title %>"
date: <% tp.date.now("YYYY-MM-DD HH:mm:ss") %>
categories: [category1, category2]
tags: [tag1, tag2]
creation date: <% tp.file.creation_date() %>
modification date: <% tp.file.last_modified_date("dddd Do MMMM YYYY HH:mm:ss") %>
---


<%*
const today = tp.date.now("YYYY-MM-DD");
const title = await tp.system.prompt("Enter the post title");
const fileName = `${today}-${title.replace(/\s+/g, '-').toLowerCase()}.md`;
tp.file.move(fileName, "_posts/");
%>


<< [[<% tp.date.now("YYYY-MM-DD", -1) %>]] | [[<% tp.date.now("YYYY-MM-DD", 1) %>]] >>

# <% title %>

<% tp.web.daily_quote() %>
