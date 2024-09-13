var store = [{
        "title": "Archivedata",
        "excerpt":"{ \"categories\": [\"Algorithm Theory\",\"Diary\",\"Problem Solving\",\"Kaggle\",\"ML-Lecture-cs224n\"], \"tags\": [\"문제-풀이-후기\",\"그리디\",\"구현\",\"완전-탐색\",\"Union-Find\",\"많은-조건-분기\",\"스택\",\"해구성하기\",\"느리게-갱신되는-세그먼트-트리\",\"이분-탐색\",\"세그먼트-트리\",\"머지소트-트리\",\"최대유량-최소비용\",\"수학\",\"큰-수-연산\",\"정렬\",\"정수론\",\"누적합\",\"다이나믹-프로그래밍\",\"펜윅-트리\",\"문자열\",\"KMP\",\"위상정렬\",\"그래프-이론\",\"사이클-검사\",\"우선순위-큐\",\"DFS\",\"트리\",\"test\"], \"years\": [\"2024\",\"2024\",\"2024\",\"2024\",\"2024\",\"2024\",\"2024\",\"2024\",\"2024\",\"2024\",\"2024\",\"2024\",\"2024\",\"2024\",\"2024\",\"2024\",\"2024\",\"2024\",\"2024\",\"2024\",\"2024\",\"2024\",\"2024\",\"2024\"] } ","categories": [],
        "tags": [],
        "url": "/archives/archivedata/",
        "teaser": null
      },{
        "title": "기하학",
        "excerpt":"Convex Hull 볼록 껍질 회전하는 캘리퍼스(Rotating Calipers) 참고: https://stonejjun.tistory.com/42 i -&gt; ni 와 j-&gt;nj 가 있다고 하자. 둘의 ccw가 음수가 되기 시작하는 점 j가 점 i로부터 가장 먼 점이다. 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21...","categories": ["Algorithm Theory"],
        "tags": [],
        "url": "/algorithm/geometry/",
        "teaser": null
      },{
        "title": "강한 연결 요소(Strongly Connected Component, SCC)",
        "excerpt":"참고 https://blog.naver.com/ndb796/221236952158 SCC는 강하게 결합된 정점 집합을 의미한다. 즉, SCC의 임의의 u와 v는 u→v , v→u 모두 가능하다는 뜻이다. 사이클이 발생하면 무조건 SCC에 해당되는 특징이 있다. 시간복잡도 : O(V+E) ![[assets/images/posts_img/Untitled 6.png Untitled 6.png]] 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17...","categories": ["Algorithm Theory"],
        "tags": [],
        "url": "/algorithm/scc/",
        "teaser": null
      },{
        "title": "이분 매칭",
        "excerpt":"이분매칭이란? 위 그림과 같이 인접한 정점끼리 서로 다른 색으로 색칠하는데 모든 정점을 2가지 색으로만 표현할 수 있으면 이를 이분 그래프라고 한다. 이분매칭은 이러한 이분 그래프에서 각 정점이 최대 1개의 간선만 갖을 수 있으면서 그러한 간선(매칭)을 최대로 하는 기법이다. 시간복잡도 dfs로 구현하면 O(VE)이다. 코드 1 2 3 4 5 6 7...","categories": ["Algorithm Theory"],
        "tags": [],
        "url": "/algorithm/bipartite/",
        "teaser": null
      },{
        "title": "2024년 여름 방학 계획",
        "excerpt":"서론 드디어 2024년의 여름방학이 다가왔다. 군 휴학과 추가 1년 휴학으로 인해 3년 만의 복학 후 첫 학기라 너무 어색했지만 그래도 나름 잘 해쳐온 것 같다. 너무 오랜만에 대학교 학점 따기를 해서 중간고사 때는 많이 헤맸지만 다행히 기말고사 때 재활이 돼서 많이 복구할 수 있었다. (무엇보다 중간고사 첫 시험 때 애플펜슬만...","categories": ["Diary"],
        "tags": [],
        "url": "/diary/2024%EB%85%84-%EC%97%AC%EB%A6%84-%EB%B0%A9%ED%95%99-%EA%B3%84%ED%9A%8D/",
        "teaser": null
      },{
        "title": "Atcoder Typical 90",
        "excerpt":"Atcoder Typical 90 문제들을 풀면서 인상깊었던 문제들만을 정리해 놓을 생각이다. 005 - Restricted Digits $c_1 \\sim c_k$ 의 한 자리수들로 N자리 문자를 만들었을 때 B의 배수의 갯수를 구하는 문제 풀이 n이 무지막지하게 크므로 무조건 $log_2(n)$을 만들어야 한다. 처음에는 분할정복으로 sol(길이 n, 값 val) := n자리 수로 mod B 했을 때...","categories": ["Problem Solving"],
        "tags": [],
        "url": "/problem%20solving/Atcoder-Typical-90/",
        "teaser": null
      },{
        "title": "Kaggle Curriculum",
        "excerpt":"이유한님 캐글 커리큘럼을 공부한 노트북들이다.  제공받은 노트북들 기반으로 공부하면서 적은 노트북들이다.   Binary Classification : Tabular data  1st level. Titanic: Machine Learning from Disaster      My Titanic Notebook   2nd level. Porto Seguro’s Safe Driver Prediction  ","categories": ["Kaggle"],
        "tags": [],
        "url": "/kaggle/Kaggle-Curriculum/",
        "teaser": null
      },{
        "title": "UCPC 2024 예선 후기 및 풀이",
        "excerpt":"2024 UCPC 예선을 참가했다. 사실 팀으로서 처음 참가하는 거라 기대했고 즐거운 경험이었다. 하지만 연습 때는 꽤 솔브를 많이 받았는데, 실전에서는 2솔 밖에 받지 못 했다. 원인은 실력부족, 경험부족이었다. 연습 때도 시간을 잡고 했지만 실전의 스코어보드가 주는 압박감과 내가 무언가를 해내야 한다는 심리적 쫓김으로 인해 온전히 집중하지 못 했고, 무엇보다도 이런...","categories": ["Problem Solving"],
        "tags": ["문제-풀이-후기","그리디","구현","완전-탐색","Union-Find","많은-조건-분기","스택","해구성하기"],
        "url": "/problem%20solving/UCPC-2024-%EC%98%88%EC%84%A0/",
        "teaser": null
      },{
        "title": "백준 26306 - Balanced Seesaw Array",
        "excerpt":"백준 26306 - Balanced Seesaw Array 풀이 문제에서 주어진 공식을 정리하면 다음과 같다. \\[\\Sigma_{i=1}^{m}(i\\times a_i) - k \\times \\Sigma_{i=1}^{m}(a_i) = 0\\] \\[\\Sigma_{i=1}^{m}(i\\times a_i) = k \\times \\Sigma_{i=1}^{m}(a_i)\\] 위를 만족시키는 k를 찾으면 해결할 수 있다. 구간 쿼리가 들어오는 걸로 보았을 때 lazy segment tree를 사용하면 된다는 것을 알 수 있다. 즉,...","categories": ["Problem Solving"],
        "tags": ["느리게-갱신되는-세그먼트-트리"],
        "url": "/problem%20solving/boj-26306/",
        "teaser": null
      },{
        "title": "Educational Codeforces Round 168 - E. Level Up",
        "excerpt":"Educational Codeforces Round 168 - E. Level Up 요약 1번부터 n번까지 monster와 싸우는데, 현재 lv보다 작은 lv의 몬스터는 도망친다. 이때 유저는 k명의 몬스터와 싸우고 나서 레벨업을 한다. 이때, 총 q개의 쿼리가 들어온다. i,x가 들어온다. k=x일 때, i번째 몬스터는 싸우는 지 여부를 출력해야 한다. Solution. 1 풀이 k = 1 -&gt;...","categories": ["Problem Solving"],
        "tags": ["이분-탐색","세그먼트-트리","머지소트-트리"],
        "url": "/problem%20solving/Edu-CF168-E/",
        "teaser": null
      },{
        "title": "cs224n 1주차 강의",
        "excerpt":"테스트 중입니다.  ","categories": ["ML-Lecture-cs224n"],
        "tags": [],
        "url": "/ml-lecture-cs224n/cs224n-lecture-1/",
        "teaser": null
      },{
        "title": "백준 1154 - 팀 편성",
        "excerpt":"백준 1154 - 팀 편성 풀이 한 학생을 기준으로 해당 학생과 아는 사이가 아닌 학생들은 서로 같은 그룹이어야 한다. 이를 union-find를 사용하여 그룹을 묶는다. 각 그룹들의 학생들이 서로 모두 아는 사이인지 확인한다. 이때, 해당 그룹은 여러 개가 나올 수 있는데 1번 학생이 포함된 그룹에 포함시킬 수 있는 만큼 포함시키고 나머지는...","categories": ["Problem Solving"],
        "tags": ["Union-Find"],
        "url": "/problem%20solving/boj-1154-%ED%8C%80-%ED%8E%B8%EC%84%B1/",
        "teaser": null
      },{
        "title": "백준 1585 - 경찰",
        "excerpt":"백준 1585 - 경찰 풀이 최대유량 최소비용 문제이다. 들어오는 시간을 s, 나가는 시간을 e라 할 때 $s &lt; e$ 이면서 걸린 시간 $S(= e-s)$라 하자. $min((T-S)^2, F)$를 간선의 cost로 정한다. max flow의 값이 N인지 확인하고 아니라면 -1을 출력한다. 만약 N이라면 최소 비용과 최대 비용을 각각 출력해주면 된다. 코드 1 2...","categories": ["Problem Solving"],
        "tags": ["최대유량-최소비용"],
        "url": "/problem%20solving/boj-1585/",
        "teaser": null
      },{
        "title": "백준 25323 - 수 정렬하기, 근데 이제 제곱수를 곁들인",
        "excerpt":"백준 25323 - 수 정렬하기, 근데 이제 제곱수를 곁들인 풀이 $a \\times b$ 가 제곱수이고 $b \\times c$가 제곱수이면, 이 2개를 곱한 $a \\times b^2 \\times c$는 제곱수이다. 근데 $b^2$가 제곱수이므로 $a \\times c$는 제곱수이어야 한다. 위 사실을 생각해보면 우리는 서로 곱하면 제곱수가 되는 애들끼리 그룹으로 묶을 수 있다. 그룹...","categories": ["Problem Solving"],
        "tags": ["수학","큰-수-연산","정렬","정수론"],
        "url": "/problem%20solving/boj-25323/",
        "teaser": null
      },{
        "title": "백준 20052 - 괄호 문자열?",
        "excerpt":"백준 20052 - 괄호 문자열? 풀이 ’(‘를 +1, ‘)’를 -1로 해서 누적합을 계산한 배열 a를 하나 만들자. 이 배열에 대한 min segment tree를 하나 만든다. l, r이 주어졌을 때, a[r]-a[l-1] == 0 이고, min(l~r)이 a[r]보다 크거나 같다면 위 쿼리는 성립된다. a[r]-a[l-1] == 0이라는 건 ‘(‘와 ‘)’의 갯수가 같다는 것이고, min(l~r)이...","categories": ["Problem Solving"],
        "tags": ["세그먼트-트리","누적합"],
        "url": "/problem%20solving/boj-20052/",
        "teaser": null
      },{
        "title": "백준 15560 - 구간 합 최대? 1",
        "excerpt":"백준 15560 - 구간 합 최대? 1 풀이 수열 K의 모든 값들을 $K[i] = U*K[i] + V$로 변환한다. 1번 쿼리의 경우, A~B 동안 이동하면서 변환시킨 K 수열에 대한 누적합이 최대가 되도록 만든다. 즉, sum &lt; 0인 경우 굳이 다음 것에 누적시켜줄 필요 없이 sum = 0으로 만들어준다. 최종 결과에서 $V...","categories": ["Problem Solving"],
        "tags": ["수학"],
        "url": "/problem%20solving/boj-15560/",
        "teaser": null
      },{
        "title": "백준 11883 - 생일수 I",
        "excerpt":"백준 11883 - 생일수 I 풀이 N이 $10^6$ 이므로 미리 dp배열에 전처리 해놓는다. 이때 dp배열을 string으로 하면 매번 비교하고 문자열을 만드는데 최악의 경우 33333길이가 되므로 $10^6 \\times 33333$ 이므로 시간초과가 된다. 따라서 array&lt;int,3&gt;를 이용해서 {3의 갯수, 5의 갯수, 8의 갯수} 이런 식으로 저장하고 마지막에 출력할 때는 3,5,8 순으로 출력하면 가장...","categories": ["Problem Solving"],
        "tags": ["다이나믹-프로그래밍","그리디"],
        "url": "/problem%20solving/boj-11883/",
        "teaser": null
      },{
        "title": "백준 1898 - 이전 수열은 어떤 수열일까",
        "excerpt":"이전 수열은 어떤 수열일까 풀이 원래 수가 x이고 새로운 수가 nx로 두고 싶다고 하자. 왼쪽부터 접근한다고 했을 때 가장 작은 수가 되려면 nx는 x보다 작으면 좋고 최소한 같아야 한다. 따라서 nx = x-1이거나 x이다. nx = x인 경우는 그냥 그대로 넣으면 되므로 상관없고 nx = x-1인 경우를 살펴보자. 1 2...","categories": ["Problem Solving"],
        "tags": ["그리디"],
        "url": "/problem%20solving/boj-1898/",
        "teaser": null
      },{
        "title": "백준 17409 - 증가 수열의 개수",
        "excerpt":"증가 수열의 개수 풀이 왼쪽부터 수열 A를 받아 dp에 저장한다고 하자. dp[n][k] := n을 최대 수로 갖는 길이가 k인 증가하는 부분 수열의 갯수 이라 하자. 현재 수를 n+1이라 할 때, dp[n+1][k+1]은 dp[1~n][k]의 모든 합을 더한 값이 될 것이다. 왜냐하면 dp[1~n][k]은 현재 수보다 왼쪽에 있으면서 끝 수가 n+1보다 작은 증가하는 부분수열의...","categories": ["Problem Solving"],
        "tags": ["세그먼트-트리","펜윅-트리","다이나믹-프로그래밍"],
        "url": "/problem%20solving/boj-17409/",
        "teaser": null
      },{
        "title": "백준 9623 - 부분 수열의 길이",
        "excerpt":"부분 수열의 길이 풀이 주어진 배열의 누적합을 구해서 max segment tree에 넣는다. target을 찾고 싶다고 하자. if target &lt;= tree[2*node] 이라면, $2\\times node$에서 구하면 된다. else, $2 \\times node + 1$에서 구한다. start == end라면(자식 노드가 없다면), start를 반환한다. 모든 시작 인덱스에서부터 검사해야 하므로 i번째부터 시작한 연속 부분수열을 찾고 싶다면...","categories": ["Problem Solving"],
        "tags": ["세그먼트-트리","누적합","이분-탐색"],
        "url": "/problem%20solving/boj-9623/",
        "teaser": null
      },{
        "title": "백준 1498 - 주기문",
        "excerpt":"주기문 풀이 KMP 알고리즘의 pi 배열을 이용한다. 길이가 a인 문자열의 pi[a]를 b라 하자. [ [------b------][--(a-b)--] ] 이런 식으로 문자열 a가 있다고 하자. 만약 a를 (a-b)로 나눴을 때 나눠 떨어진다면 문자열 a는 (a-b) 문자열의 반복으로 이루어져 있다. 그 이유는 a가 (a-b)로 나눠진다는 건 b 또한 (a-b) 덩어리들로 나눌 수 있다는 거고...","categories": ["Problem Solving"],
        "tags": ["문자열","KMP"],
        "url": "/problem%20solving/boj-1498/",
        "teaser": null
      },{
        "title": "백준 1432 - 그래프 수정",
        "excerpt":"그래프 수정 풀이 위상정렬을 반대로 하면 풀리는 문제다. 방향 그래프를 반대로 한다. 사이클 검사를 한다. 사이클이 있다면 불가능하므로 -1을 출력한다. 반대 그래프로 위상정렬을 하는데, 우선순위 큐를 이용해서 숫자가 클수록 먼저 방문한다. 3번의 이유는 반대로 방문하는 것이므로 order 가 n 부터 시작하므로 숫자가 큰 걸 먼저 방문한다는 것은 원래대로 방문이 숫자가...","categories": ["Problem Solving"],
        "tags": ["위상정렬","그래프-이론","사이클-검사","우선순위-큐"],
        "url": "/problem%20solving/boj-1432/",
        "teaser": null
      },{
        "title": "백준 28219 - 주유소",
        "excerpt":"주유소 풀이 DFS탐색으로 트리를 순회한다. 이때, 어떤 서브트리의 루트 u에 대해서 모든 자식들의 길이 중 가장 긴 2개를 a,b라 하자. $a+b &gt;= k$ 라면 정점 u에는 주유소를 설치해야 해당 서브트리에서 서로 이동할 때 무조건 주유소를 포함함을 보장할 수 있다. 그리고 $dist[u]$를 0으로 초기화해준다. 여기서, $dist[u]$는 정점 u를 루트로 하는 서브트리에서...","categories": ["Problem Solving"],
        "tags": ["DFS","그리디","그래프-이론","트리"],
        "url": "/problem%20solving/boj-28219/",
        "teaser": null
      },{
        "title": "백준 17407 - 괄호 문자열과 쿼리",
        "excerpt":"백준 17407 - 괄호 문자열과 쿼리 풀이 (을 +1, )을 -1로 한 다음 누적합을 먼저 계산한다. 이 누적합에 대한 lazy segment tree를 만든다. 만약 x번째 문자를 (에서 )으로 바꾼다면 x ~ n번째(전체 문자길이가 n일 때) 문자까지 누적합을 전부 -2를 시켜주면 되고 그 반대의 경우는 +2를 시켜주면 된다. 위 내용은 구간...","categories": ["Problem Solving"],
        "tags": ["느리게-갱신되는-세그먼트-트리","누적합"],
        "url": "/problem%20solving/boj-17407/",
        "teaser": null
      },{
        "title": "필수",
        "excerpt":"테스트 중입니다.   테스트 중입니다.   테스트 중이네요.   asdf  ","categories": ["Algorithm Theory"],
        "tags": ["test"],
        "url": "/algorithm%20theory/test/",
        "teaser": null
      }]
