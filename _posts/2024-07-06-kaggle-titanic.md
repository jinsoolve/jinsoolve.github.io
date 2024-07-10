---
title: 
excerpt: 
categories: 
tags: 
permalink: 
toc: true
toc_sticky: true
date: 2024-07-06
last_modified_at: 2024-07-06
---

# 서론
링크: https://www.kaggle.com/c/titanic   
참고: https://kaggle-kr.tistory.com/17?category=868316    

타이타닉의 탑승한 사람들의 신상정보를 활용하여, 승선한 사람들의 생존여부를 예측하는 모델을 생성하는 것이 목표다.  
코드는 참고 링크에 자세히 적혀있으니 거시적인 관점에서 흐름 위주로의 정리를 해보겠다.
  
## 해야 할 프로세스  
1. 데이터셋 확인
	1. Null 데이터 있는 지 확인
	2. Target Label 분포 확인
2. 본격적인 데이터 분석
	1. Pclass
	2. Sex 
	3. Both Sex and Pclass
	4. Age
	5. Pclass, Sex, Age
	6. Embarked
	7. Family - SibSp(형제자매) + Parch(부모, 자녀)
	8. Cabin
  
# 본론
  
## 1 데이터셋 확인
데이터를 읽어드리고 나서 .describe() 함수를 통해 어떤 데이터인지 대락적으로 분석한다.

### 1.1 Null Data 있는 지 확인
.isnull().sum() / .shape[0] 를 통해 각 데이터 feature마다 null 값이 어느 정도로 분포되어있는 지 확인한다.  
msno 라이브러리를 이용하면 좀 더 시각화해서 편하게 볼 수 있다. (msno.matrix(), msno.bar() 등)  
확인해 보니 Age, Cabin, Emarked 등에서 null 값이 나타나는 걸 알 수 있다. 이는 후에 처리해주도록 하자.

### 1.2 Target Label 분포 확인
```python
# 1행 2열의 서브플롯을 생성한다. figsize는 그림의 크기를 의미한다.
f, ax = plt.subplots(1, 2, figsize=(18,8)) 

# Survived 의 열의 값들을 세어 각 값의 빈도를 반환한다.
# '.plot.pie()': 파이 차트를 그려주는 pandas 메서드이다.
# 'explode=[0, 0.1]': 파이 차트의 조각 중 두번째 조각 (즉, 생존자를 나타내는 조각)을 강조하기 위해 약간 분리한다.
# `autopct='%1.1f%%'`: 각 조각에 백분율 값을 표시하며, 소수점 한 자리까지 표시합니다.
# `ax=ax[0]`: 파이 차트를 첫 번째 서브플롯(`ax[0]`)에 그립니다.
# `shadow=True`: 파이 차트에 그림자를 추가하여 3D 효과를 줍니다.
df_train['Survived'].value_counts().plot.pie(explode=[0, 0.1],autopct='%1.1f%%', ax=ax[0], shadow=True)  

ax[0].set_title('Pie plot - Survived') 
ax[0].set_ylabel('')  
sns.countplot(x='Survived', data=df_train, ax=ax[1])  
ax[1].set_title('Count plot - Survived')
```
![](assets/images/posts_img/IMG-2024-07-11-01-56-36-980.png)
해당 코드의 결과는 다음과 같이 나타나게 된다.  

여기서 우리는 target label의 분포가 제법 고르게 나타난다는 것을 알 수 있다.  
지금은 아니긴 하지만 만약 100 중 1이 99, 0이 1인 경우는 모델이 모든 예측을 1로 하더라도 정확도가 99%가 나오게 된다. 0을 찾아내는 것이 문제라면 이 모델은 원하는 결과를 갖고 올 수 없게 된다. 

## 2 본격적인 데이터 분석
지금부터 본격적인 데이터 분석을 해보자.  
데이터의 각 feature들이 무엇을 의미하고 각 feature들의 데이터 정보를 통해서 어떤 걸 알 수 있는 지를 분석해야 한다.  
데이터를 시각화해서 직관을 얻는데 도움을 받아볼 수 있을 것이다.

### 2.1 Pclass
Pclass는 ordinal, 서수형 데이터이다. 카테고리이면서 순서가 있는 데이터 타입이다.  
쉽게 말하면, 자리의 클래스이다. (특등석, 일반석 등) 1이 더 좋은 자석, 3이 가장 안 좋은 자석이라 생각하면 편하다.

각 Pclass에 따른 생존 비율을 한 번 살펴보자.  
```python
df_train[['Pclass', 'Survived']].groupby(['Pclass'], as_index=True).count()
```
![](assets/images/posts_img/IMG-2024-07-11-02-05-51-694.png)
```python
df_train[['Pclass', 'Survived']].groupby(['Pclass'], as_index=True).sum()
```
![](assets/images/posts_img/IMG-2024-07-11-02-05-59-220.png)
위와 같이 .groupby() 함수를 이용해서 Pclass로 묶고 Survived의 여부의 값들을 .count() 하면 각 클래스마다 몇 명의 인원이 있는지 확인할 수 있고, .sum()을 하면 각 클래스마다 몇 명이 생존했는지 확인할 수 있다.


pandas의 crosstab을 사용하면 위 과정을 좀 더 수월하게 해볼 수 있다.
![](assets/images/posts_img/IMG-2024-07-11-02-07-11-748.png)
또한 그룹 객체에 mean()을 하게 되면, 각 클래스 별 생존률을 얻을 수 있다.
![](assets/images/posts_img/IMG-2024-07-11-02-08-25-768.png)
여기에 seaborn과 countplot을 사용하면, 특정 label에 따른 개수를 확인해 볼 수 있다.
![](assets/images/posts_img/IMG-2024-07-11-02-10-32-739.png)
보다시피, Pclass가 좋을 수록 생존확률이 높은 것을 확인할 수 있다.   
여기에서 우리는 생존에 Pclass가 큰 영향을 미친다고 생각해 볼 수 있다. 나중에 모델을 세울 때 이 feature을 사용하는 것이 좋을 것이라 판단할 수 있다.

### 2.2 Sex
