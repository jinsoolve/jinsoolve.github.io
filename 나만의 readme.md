# Posting

1. _ posts/YYYY-MM-DD-(나만의-제목) 이런식으로 포스팅한다.
2. title : 말 그대로 제목 블로그에서는 .md파일의 제목이 아닌 title에 넣은 값이 제목이다
3. excerpt: 포스트 글을 미리 볼 때 밑의 작은 설명 글이다.
4. categoreis: 어느 카테고리에 넣을 지 정함
5. tags: 해당 글의 태그들을 달음
6. permalink: 내부의 링크로 해당 링크로 주소가 나타난다. 
	ex) jinsoolve.github.io/permalink/,,, 이런식으로
7. toc: 우측에 목차 네비게이션 (Table of content)
8. toc_sticky: 본문 목차 네비게이션 고정 여부
9. date: 처음 포스팅한 날짜 YYYY-MM-DD 형식
10. last_modified_at: 가장 최근에 수정한 날짜. 마찬가지로 YYYY-MM-DD 형식

## 이미지 첨부
포스팅에서 이미지를 첨부할 때, 기본적으로 아무 위치에나 넣어도 되지만 경로의 맨 앞에는 '/'가 있어야 한다.
# Category
카테고리를 추가하려면 다음과 같다.
1. _ pages/categories/ 하위에 category-(카테고리이름).md 를 추가한다.
	아래와 같이 title과 permalink, taxonomy 를 수정해준다.
	taxonomy는 title과 같이 하면 된다.
	```
	title: "Categories1" # 카테고리 이름(수정할 것)
	layout: category
	permalink: /categories/categories1/ # url(수정할 것)
	author_profile: true
	taxonomy: Categories1(수정할 것)
	sidebar:
	nav: "categories"
	```
2. _ data/navigation.yml 파일에 title과 url을 만든다.
	이때, title과 url이 1.에서 했던 title과 permalink와 각각 같아야 한다.