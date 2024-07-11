---
title: 
excerpt: kaggle titanic notebook
categories:
  - Machine Learning
tags: 
permalink: 
toc: true
toc_sticky: true
date: 2024-07-06
last_modified_at: 2024-07-12
---

# 서론
링크: [https://www.kaggle.com/c/titanic](https://www.kaggle.com/c/titanic)   
참고: [https://kaggle-kr.tistory.com/17?category=868316](https://kaggle-kr.tistory.com/17?category=868316)

타이타닉의 탑승한 사람들의 신상정보를 활용하여, 승선한 사람들의 생존여부를 예측하는 모델을 생성하는 것이 목표다.  
코드는 참고 링크에 자세히 적혀있으니 거시적인 관점에서 흐름 위주로의 정리를 해보겠다. 

hello, world

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
![](/assets/images/posts_img/IMG-2024-07-11-01-56-36-980.png)
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
![](/assets/images/posts_img/IMG-2024-07-11-02-05-51-694.png)
```python
df_train[['Pclass', 'Survived']].groupby(['Pclass'], as_index=True).sum()
```
![](/assets/images/posts_img/IMG-2024-07-11-02-05-59-220.png)  

위와 같이 .groupby() 함수를 이용해서 Pclass로 묶고 Survived의 여부의 값들을 .count() 하면 각 클래스마다 몇 명의 인원이 있는지 확인할 수 있고, .sum()을 하면 각 클래스마다 몇 명이 생존했는지 확인할 수 있다.


pandas의 crosstab을 사용하면 위 과정을 좀 더 수월하게 해볼 수 있다.
![](/assets/images/posts_img/IMG-2024-07-11-02-07-11-748.png)
또한 그룹 객체에 mean()을 하게 되면, 각 클래스 별 생존률을 얻을 수 있다.
![](/assets/images/posts_img/IMG-2024-07-11-02-08-25-768.png)

여기에 seaborn과 countplot을 사용하면, 특정 label에 따른 개수를 확인해 볼 수 있다.
![](/assets/images/posts_img/IMG-2024-07-11-02-10-32-739.png)

보다시피, Pclass가 좋을 수록 생존확률이 높은 것을 확인할 수 있다.   
여기에서 우리는 생존에 Pclass가 큰 영향을 미친다고 생각해 볼 수 있다. 나중에 모델을 세울 때 이 feature을 사용하는 것이 좋을 것이라 판단할 수 있다.

### 2.2 Sex
이번에는 성별로 생존률이 어떻게 달라지는 지 보자  
마찬가지로 pandas의 groupby와 seaborn countplot을 사용해서 시각화 해본다.
![](/assets/images/posts_img/Pasted%20image%2020240712010319.png)

결과를 보다시피 여성의 생존확률이 높았다.

### 2.3 Both Sex and Pclass
이번에는 sex와 pclass의 연관도를 살펴보자.  
seaborn의 factorplot을 이용하면 손쉽게 3차원으로 이루어진 그래프를 그릴 수 있다.  
![](/assets/images/posts_img/Pasted%20image%2020240712010754.png)

모든 클래스에서 female이 male 보다 생존률이 높은 것을 확인할 수 있다.  
또한 성별 상관없이 pclass가 높을수록 생존확률이 높다.  

### 2.4 Age
이번에는 연령대에 따른 생존률을 확인해보자.  
![](/assets/images/posts_img/Pasted%20image%2020240712010907.png)

10~50대의 연령층이 비교적 생존자가 많은 것을 알 수 있다.  

여기에 pclass를 넣어서 확인해보자.  
```python
# Age distribution withing classes
plt.figure(figsize=(8, 6))
df_train['Age'][df_train['Pclass'] == 1].plot(kind='kde')
df_train['Age'][df_train['Pclass'] == 2].plot(kind='kde')
df_train['Age'][df_train['Pclass'] == 3].plot(kind='kde')

plt.xlabel('Age')
plt.title('Age Distribution within classes')
plt.legend(['1st Class', '2nd Class', '3rd Class'])
```
![](/assets/images/posts_img/Pasted%20image%2020240712010956.png)

생존확률을 그려보자.
![](/assets/images/posts_img/Pasted%20image%2020240712011111.png)

### 2.5 Pclass, Sex, Age
지금까지 본 Sex, Pclass, Age, Survived 모두에 대해서 보고 싶다. 이를 쉽게 그려주는 것이 seaborn의 violinplot이다.  
x축은 우리가 나눠서 보고 싶어하는 case(여기선 Pclass, Sex)를 나타내고, y축은 보고 싶어하는 distribution(여기선 Age)으로 그려보자.
```python
f,ax=plt.subplots(1,2,figsize=(18,8))
sns.violinplot("Pclass","Age", hue="Survived", data=df_train, scale='count', split=True,ax=ax[0])
ax[0].set_title('Pclass and Age vs Survived')
ax[0].set_yticks(range(0,110,10))
sns.violinplot("Sex","Age", hue="Survived", data=df_train, scale='count', split=True,ax=ax[1])
ax[1].set_title('Sex and Age vs Survived')
ax[1].set_yticks(range(0,110,10))
plt.show()
```
![](/assets/images/posts_img/Pasted%20image%2020240712011309.png)
왼쪽은 Pclass 별로 Age의 distribution을 볼 수 있고, 오른 쪽은 성별 별로 Age의 distribution을 확인할 수 있다.  

### 2.6 Embarked
탑승한 항구를 뜻한다.  
마찬가지로 Embarked에 따른 생존률을 확인해보자.

```python
f, ax = plt.subplots(1, 1, figsize=(7, 7))
df_train[['Embarked', 'Survived']].groupby(['Embarked'], as_index=True).mean().sort_values(by='Survived', ascending=False).plot.bar(ax=ax)
```
![](/assets/images/posts_img/Pasted%20image%2020240712011445.png)
보다시피, 약간의 차이는 있지만 전체적으로 큰 차이는 나지 않는다. 그래도 C가 가장 생존률이 높다는 것을 알 수 있다.  
모델에 얼마나 유용할 지 모르겠지만 그래도 한 번 사용해 보자.

사실, 모델을 만들고 나면 우리가 사용한 feature들이 얼마나 중요한 역할을 했는지 확인해 볼 수 있다. 이는 추후에 모델을 만들고 나서 살펴보자.  

다른 feature로 split해서 한 번 살펴보자.
```python
f,ax=plt.subplots(2, 2, figsize=(20,15))
sns.countplot('Embarked', data=df_train, ax=ax[0,0])
ax[0,0].set_title('(1) No. Of Passengers Boarded')
sns.countplot('Embarked', hue='Sex', data=df_train, ax=ax[0,1])
ax[0,1].set_title('(2) Male-Female Split for Embarked')
sns.countplot('Embarked', hue='Survived', data=df_train, ax=ax[1,0])
ax[1,0].set_title('(3) Embarked vs Survived')
sns.countplot('Embarked', hue='Pclass', data=df_train, ax=ax[1,1])
ax[1,1].set_title('(4) Embarked vs Pclass')
plt.subplots_adjust(wspace=0.2, hspace=0.5)
plt.show()
```
![](/assets/images/posts_img/Pasted%20image%2020240712011650.png)
- Figure1  
	전체 인원을 살펴보니, S에서 가장 많이 탑승했음을 알 수 있다.
- Figure2  
	C와 Q는 남여 비율이 비슷하고 S는 남성이 더 많다.
- Figure3  
	S에서 탑승한 사람들의 생존비율이 비교적 낮다.
- Figure4  
	Pclass로 나눠보니 C가 생존확률이 높은 건 클래스가 높은 사람의 비율이 비교적 높기 때문임을 알 수 있다.

### 2.7 Family - SibSp(형제자매) + Parch(부모, 자녀)
가족의 구성에 따른 생존률을 분석해보자.  
```python
df_train['FamilySize'] = df_train['SibSp'] + df_train['Parch'] + 1 # 자신을 포함해야하니 1을 더합니다
df_test['FamilySize'] = df_test['SibSp'] + df_test['Parch'] + 1 # 자신을 포함해야하니 1을 더합니다
```
![](/assets/images/posts_img/Pasted%20image%2020240712012036.png)
- 가족크기가 1 ~ 11 까지 있다는 것을 알 수 있다.
- 가족 크기에 따라 생존률이 달라진다는 것을 알 수 있다. 4명의 가족인원의 생존확률이 가장 높고 그보다 커진다면 생존확률이 줄어든 다는 것을 알 수 있다. 

### 2.8 Fare
Fare는 탑승 요금이고 continous feature이다.  
마찬가지로 그래프를 그려보자.
![](/assets/images/posts_img/Pasted%20image%2020240712012300.png)
분포가 비대칭이다. 이를 그대로 모델에 학습시킨다면 모델이 잘못 학습시킬 가능성이 있다.  
이를 fare column에 log를 취해 비대칭성을 줄이는 기법을 사용해 볼 수 있다.
```python
# 아래 줄은 뒤늦게 발견하였습니다. 13번째 강의에 언급되니, 일단 따라치시고 넘어가면 됩니다.
df_test.loc[df_test.Fare.isnull(), 'Fare'] = df_test['Fare'].mean() # testset 에 있는 nan value 를 평균값으로 치환합니다.

df_train['Fare'] = df_train['Fare'].map(lambda i: np.log(i) if i > 0 else 0)
df_test['Fare'] = df_test['Fare'].map(lambda i: np.log(i) if i > 0 else 0)
```
![](/assets/images/posts_img/Pasted%20image%2020240712012433.png)
위와 같이 비대칭성이 많이 사라진 것을 볼 수 있다.  
사실 위 부분은 feature engineering에 들어가는 부분인데 여기서 작업했다.  
모델을 학습시킬 때 성능을 높이기 위해 feature들에 여러 조작을 가하거나 새로운 feature를 추가하는 것을 feature engineering이라 한다.

### 2.9 Cabin
객실 위치를 뜻하는 feature이다.  
해당 feature는 NaN이 80%이므로 유의미한 정보를 얻어내기가 쉽지 않아 보인다.  
따라서 모델 학습에는 사용하지 않겠다.

### 2.10 Ticket
위 feature에 NaN은 없다.  
String 데이터 이므로 전처리르 해줘야 모델 학습에 사용할 수 있다. 이르 어떻게 해야 할까?  

데이터를 출력해보고 추후에 이를 실험해 보겠다.  
