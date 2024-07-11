---
title: 
excerpt: Atcoder Typical 90 문제 풀이
categories: 
tags: 
permalink: 
toc: true
toc_sticky: true
date: 2024-07-11
last_modified_at: 2024-07-11
---

Atcoder Typical 90 문제들을 풀면서 인상깊었던 문제들만을 정리해 놓을 생각이다.

# 005 - Restricted Digits
$c_1 \sim c_k$ 의 한 자리수들로 N자리 문자를 만들었을 때 B의 배수의 갯수를 구하는 문제

## 풀이
n이 무지막지하게 크므로 무조건 $log_2(n)$을 만들어야 한다.  

처음에는 분할정복으로 `sol(길이 n, 값 val) := n자리 수로 mod B 했을 때 val이 되도록 하는 수의 갯수` 를 구해서 l과 r 로 반으로 나눠서 l의 값이 0~B-1 일 때 $l\_val \times 10^r + r\_val = val$ 이 나오도록 하는 r_val을 구해서 재귀적으로 해결한다고 생각했다.   
이때 시간복잡도는 $O(log(n) B^2)$으로 통과할 수 있어 보이지만 n 값이 크기 때문에 map으로 관리해줘야 하고 이로 인해서 인지 시간초과가 났다.  

결국 풀이를 보았는데 비슷하긴 하나 n을 $10^18$말고 최대 60자리의 이진수로 표현할 수 있다.   
n은 $10^18$이긴 하지만 2진수로 표현하면 60자리이다.   
이를 이용해 `dp[i][j]` := ($10^{2^i} * j$를 현재 c1~ck로 만들 수 있는 갯수) 를 의미한다.
이를 이용해 반복문으로 dp[0][c1~ck] = 1로 초기화해서 모든 반복문을 돌아보면 원하는 값을 구할 수 있다.

## 코드
```cpp
#include <bits/stdc++.h>  
  
#define endl "\n"  
#define all(v) (v).begin(), (v).end()  
#define For(i, n) for(int i=0; i<n; ++i)  
#define For1(i, n) for(int i=1; i<=n; ++i)  
#define For2(i, a, b) for(int i=(a); i<=(b); ++i)  
#define ft first  
#define sd second  
#define Get(i, v) get<i>(v)  
  
using namespace std;  
using ll = long long;  
using ld = long double;  
using pii = pair<int, int>;  
using pll = pair<ll, ll>;  
using ti3 = tuple<int, int, int>;  
using tl3 = tuple<ll, ll, ll>;  
  
const int INF = numeric_limits<int>::max();  
const ll LNF = numeric_limits<ll>::max();  
  
const int logmxn = 62, mxn = 1e3+1;  
const ll MOD = 1e9+7;  
  
ll N;  
int B, K;  
  
ll dp[logmxn][mxn];  
ll ans[logmxn][mxn];  
int pow10[logmxn];  
  
// a^b mod c  
ll pow(ll a, ll b, ll c) {  
    ll res = 1;  
    while(b) {  
        if(b%2) res = (res * a) % c;  
        a = (a * a) % c;  
        b >>= 1;  
    }  
    return res;  
}  
  
void solve() {  
    memset(dp,0,sizeof dp);  
    memset(ans, 0, sizeof ans);  
  
    cin >> N >> B >> K;  
    while(K--) {  
        int x; cin >> x;  
        dp[0][x%B]++;  
    }  
  
    for(int i=0; i<logmxn; i++) {  
        pow10[i] = (int)pow(10LL, 1LL << i, B);  
    }  
  
    for(int i=0; i<logmxn-1; i++) {  
        for(int j=0; j<B; j++) {  
            for(int k=0; k<B; k++) {  
                int nxt = (j*pow10[i] + k) % B;  
                dp[i+1][nxt] += dp[i][j]*dp[i][k];  
                dp[i+1][nxt] %= MOD;  
            }  
        }  
    }  
  
  
    ans[0][0] = 1;  
    for(int i=0; i<logmxn-1; i++) {  
        if((N & (1LL<<i)) == 0) {  
            for(int j=0; j<B; j++) ans[i+1][j] = ans[i][j];  
            continue;  
        }  
        for(int j=0; j<B; j++) {  
            for(int k=0; k<B; k++) {  
                int nxt = (j*pow10[i] + k) % B;  
                ans[i+1][nxt] += ans[i][j] * dp[i][k];  
                ans[i+1][nxt] %= MOD;  
            }  
        }  
    }  
  
    cout << ans[logmxn-1][0] << endl;  
}  
  
int main(void) {  
    ios_base::sync_with_stdio(false);  
    cin.tie(nullptr);  
    cout.tie(nullptr);  
  
    int tc = 1;  
//    cin >> tc;  
    while(tc--) {  
        solve();  
//        cout << solve() << endl;  
    }  
  
  
    return 0;  
}
```