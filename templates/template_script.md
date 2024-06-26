<%*
const today = tp.date.now("YYYY-MM-DD");
const title = await tp.system.prompt("Enter the post title");
const fileName = `${today}-${title.replace(/\s+/g, '-').toLowerCase()}.md`;

// 새로운 파일 생성 및 템플릿 적용
await tp.file.create_new(tp.file.find_tfile(tp.file.path(true)), fileName, true);

// 새로운 파일에 템플릿 내용 추가
await tp.file.insert_template("Templates/jekyll_post_template");
%>
