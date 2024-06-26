<%*
const today = tp.date.now("YYYY-MM-DD");
const title = await tp.system.prompt("Enter the post title");
const fileName = `${today}-${title.replace(/\s+/g, '-').toLowerCase()}.md`;
const filePath = `_posts/${fileName}`;
await tp.file.create_new(filePath);

// 내용 작성
const content = `---
layout: post
title: "${title}"
date: ${tp.date.now("YYYY-MM-DD HH:mm:ss")}
categories: [category1, category2]
tags: [tag1, tag2]
creation date: ${tp.date.now("YYYY-MM-DD")}
modification date: ${tp.date.now("dddd Do MMMM YYYY HH:mm:ss")}
---

<< [[${tp.date.now("YYYY-MM-DD", -1)}]] | [[${tp.date.now("YYYY-MM-DD", 1)}]] >>

# ${title}

${tp.web.daily_quote()}
`;

// 새로운 파일에 내용 추가
await tp.file.write(content, filePath);
%>
