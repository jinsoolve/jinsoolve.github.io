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

# 소개  
링크: https://www.kaggle.com/c/titanic  참고: https://kaggle-kr.tistory.com/17?category=868316    
타이타닉의 탑승한 사람들의 신상정보를 활용하여, 승선한 사람들의 생존여부를 예측하는 모델을 생성  
참고링크를 공부하며 적은 노트북이다.  
  
# 해야 할 프로세스  
1. dataset 확인    
null 값이 있는 지 확인하고 이를 수정한다.  
2. data analysis    
    여러 feature들을 분석하고, 이들 간의 상관관계를 확인.    
    시각화 툴로 insight를 얻는다.    
3. feature engineering     
    모델의 성능을 높이기 위해 feature 들을 engineering한다.    
    one-hot encoding, class 나누기, 구간으로 나누기, 텍스트 데이터 처리 등을 한다.    
4. 모델 생성    
sklearn을 사용해 모델 생성.    
    딥러닝을 위해 tensorflow나 pytorch를 사용할 수도 있다.    
5. 모델 학습 및 예측    
trainset으로 모델 학습시킨 후, testset을 가지고 prediction을 한다.    
6. 모델 평가    
    예측 성능이 원하는 수준인지 판단한다.    
    풀려는 문제에 따라 모델을 평가하는 방식도 달라진다.    
  
# 해결  
  
필요한 헤더파일들을 가져와보자.  
  
  
```python  
import numpy as np  
import pandas as pd  
import matplotlib.pyplot as plt  
import seaborn as sns  
  
plt.style.use('seaborn-v0_8')  
sns.set(font_scale=2.5) # 이 두줄은 본 필자가 항상 쓰는 방법입니다. matplotlib 의 기본 scheme 말고 seaborn scheme 을 세팅하고, 일일이 graph 의 font size 를 지정할 필요 없이 seaborn 의 font_scale 을 사용하면 편합니다.  
import missingno as msno  
  
#ignore warnings  
import warnings  
warnings.filterwarnings('ignore')  
  
%matplotlib inline  
```  
  
## 1. Dataset 확인  
  
해당 파트에서 사용할 pandas 라이브러리는 테이블화된 데이터를 다루는데 최적화되어 있다.     
pandas를 사용해, 데이터셋의 간단한 통계적 분석부터 복잡한 처리들을 간단한 메소드를 사용해 처리할 수 있다.      
파이썬으로 데이터분석을 한다고 하면 반드시 능숙해져야 할 라이브러리이니, 여러 커널들을 공부하면서 사용법에 익숙해지도록 하자.     
  
train, test 데이터셋을 읽어오자.  
  
  
```python  
df_train = pd.read_csv('/Users/jinsoo/PycharmProjects/study_kaggle/titanic/input/train.csv')  
df_test = pd.read_csv('/Users/jinsoo/PycharmProjects/study_kaggle/titanic/input/test.csv')  
```  
  
pandas에서 head() 함수는 처음 몇 개의 행을 출력하는데 사용한다.  
default로는 5개의 행을 보여주고, head(x) 이면 x개의 행을 보여준다.  
  
  
```python  
df_train.head(10)  
```  
  
  
  
  
<div>  
<style scoped>  
    .dataframe tbody tr th:only-of-type {  
        vertical-align: middle;  
    }  
  
    .dataframe tbody tr th {        vertical-align: top;    }  
    .dataframe thead th {        text-align: right;    }</style>  
<table border="1" class="dataframe">  
  <thead>  
    <tr style="text-align: right;">  
      <th></th>  
      <th>PassengerId</th>  
      <th>Survived</th>  
      <th>Pclass</th>  
      <th>Name</th>  
      <th>Sex</th>  
      <th>Age</th>  
      <th>SibSp</th>  
      <th>Parch</th>  
      <th>Ticket</th>  
      <th>Fare</th>  
      <th>Cabin</th>  
      <th>Embarked</th>  
    </tr>  
  </thead>  
  <tbody>  
    <tr>  
      <th>0</th>  
      <td>1</td>  
      <td>0</td>  
      <td>3</td>  
      <td>Braund, Mr. Owen Harris</td>  
      <td>male</td>  
      <td>22.0</td>  
      <td>1</td>  
      <td>0</td>  
      <td>A/5 21171</td>  
      <td>7.2500</td>  
      <td>NaN</td>  
      <td>S</td>  
    </tr>  
    <tr>  
      <th>1</th>  
      <td>2</td>  
      <td>1</td>  
      <td>1</td>  
      <td>Cumings, Mrs. John Bradley (Florence Briggs Th...</td>  
      <td>female</td>  
      <td>38.0</td>  
      <td>1</td>  
      <td>0</td>  
      <td>PC 17599</td>  
      <td>71.2833</td>  
      <td>C85</td>  
      <td>C</td>  
    </tr>  
    <tr>  
      <th>2</th>  
      <td>3</td>  
      <td>1</td>  
      <td>3</td>  
      <td>Heikkinen, Miss. Laina</td>  
      <td>female</td>  
      <td>26.0</td>  
      <td>0</td>  
      <td>0</td>  
      <td>STON/O2. 3101282</td>  
      <td>7.9250</td>  
      <td>NaN</td>  
      <td>S</td>  
    </tr>  
    <tr>  
      <th>3</th>  
      <td>4</td>  
      <td>1</td>  
      <td>1</td>  
      <td>Futrelle, Mrs. Jacques Heath (Lily May Peel)</td>  
      <td>female</td>  
      <td>35.0</td>  
      <td>1</td>  
      <td>0</td>  
      <td>113803</td>  
      <td>53.1000</td>  
      <td>C123</td>  
      <td>S</td>  
    </tr>  
    <tr>  
      <th>4</th>  
      <td>5</td>  
      <td>0</td>  
      <td>3</td>  
      <td>Allen, Mr. William Henry</td>  
      <td>male</td>  
      <td>35.0</td>  
      <td>0</td>  
      <td>0</td>  
      <td>373450</td>  
      <td>8.0500</td>  
      <td>NaN</td>  
      <td>S</td>  
    </tr>  
    <tr>  
      <th>5</th>  
      <td>6</td>  
      <td>0</td>  
      <td>3</td>  
      <td>Moran, Mr. James</td>  
      <td>male</td>  
      <td>NaN</td>  
      <td>0</td>  
      <td>0</td>  
      <td>330877</td>  
      <td>8.4583</td>  
      <td>NaN</td>  
      <td>Q</td>  
    </tr>  
    <tr>  
      <th>6</th>  
      <td>7</td>  
      <td>0</td>  
      <td>1</td>  
      <td>McCarthy, Mr. Timothy J</td>  
      <td>male</td>  
      <td>54.0</td>  
      <td>0</td>  
      <td>0</td>  
      <td>17463</td>  
      <td>51.8625</td>  
      <td>E46</td>  
      <td>S</td>  
    </tr>  
    <tr>  
      <th>7</th>  
      <td>8</td>  
      <td>0</td>  
      <td>3</td>  
      <td>Palsson, Master. Gosta Leonard</td>  
      <td>male</td>  
      <td>2.0</td>  
      <td>3</td>  
      <td>1</td>  
      <td>349909</td>  
      <td>21.0750</td>  
      <td>NaN</td>  
      <td>S</td>  
    </tr>  
    <tr>  
      <th>8</th>  
      <td>9</td>  
      <td>1</td>  
      <td>3</td>  
      <td>Johnson, Mrs. Oscar W (Elisabeth Vilhelmina Berg)</td>  
      <td>female</td>  
      <td>27.0</td>  
      <td>0</td>  
      <td>2</td>  
      <td>347742</td>  
      <td>11.1333</td>  
      <td>NaN</td>  
      <td>S</td>  
    </tr>  
    <tr>  
      <th>9</th>  
      <td>10</td>  
      <td>1</td>  
      <td>2</td>  
      <td>Nasser, Mrs. Nicholas (Adele Achem)</td>  
      <td>female</td>  
      <td>14.0</td>  
      <td>1</td>  
      <td>0</td>  
      <td>237736</td>  
      <td>30.0708</td>  
      <td>NaN</td>  
      <td>C</td>  
    </tr>  
  </tbody>  
</table>  
</div>  
  
  
  
위 결과를 살펴보면, 우리가 다뤄야 할 feature들을 파악할 수 있다.  
1. Pclass : 타겟의 클래스. 1st, 2nd, 3rd 으로 나뉜다.  
2. Sex : 성별  
3. Age : 나이  
4. SibSp : 탑승한 형제, 배우자의 수  
5. Parch : 탑승한 부모, 아이의 수  
6. Ticket : 티켓 번호  
7. Fare : 요금  
8. Cabin : 객실 번호  
9. Embarked : 탑승 항구  
  
Survived는 우리가 구하고자 하는 target label이다.   
  
pandas에서 describe() 메소드를 사용하면 각 feature가 가진 통계치들을 보여준다.  
  
  
```python  
df_train.describe()  
```  
  
  
  
  
<div>  
<style scoped>  
    .dataframe tbody tr th:only-of-type {  
        vertical-align: middle;  
    }  
  
    .dataframe tbody tr th {        vertical-align: top;    }  
    .dataframe thead th {        text-align: right;    }</style>  
<table border="1" class="dataframe">  
  <thead>  
    <tr style="text-align: right;">  
      <th></th>  
      <th>PassengerId</th>  
      <th>Survived</th>  
      <th>Pclass</th>  
      <th>Age</th>  
      <th>SibSp</th>  
      <th>Parch</th>  
      <th>Fare</th>  
    </tr>  
  </thead>  
  <tbody>  
    <tr>  
      <th>count</th>  
      <td>891.000000</td>  
      <td>891.000000</td>  
      <td>891.000000</td>  
      <td>714.000000</td>  
      <td>891.000000</td>  
      <td>891.000000</td>  
      <td>891.000000</td>  
    </tr>  
    <tr>  
      <th>mean</th>  
      <td>446.000000</td>  
      <td>0.383838</td>  
      <td>2.308642</td>  
      <td>29.699118</td>  
      <td>0.523008</td>  
      <td>0.381594</td>  
      <td>32.204208</td>  
    </tr>  
    <tr>  
      <th>std</th>  
      <td>257.353842</td>  
      <td>0.486592</td>  
      <td>0.836071</td>  
      <td>14.526497</td>  
      <td>1.102743</td>  
      <td>0.806057</td>  
      <td>49.693429</td>  
    </tr>  
    <tr>  
      <th>min</th>  
      <td>1.000000</td>  
      <td>0.000000</td>  
      <td>1.000000</td>  
      <td>0.420000</td>  
      <td>0.000000</td>  
      <td>0.000000</td>  
      <td>0.000000</td>  
    </tr>  
    <tr>  
      <th>25%</th>  
      <td>223.500000</td>  
      <td>0.000000</td>  
      <td>2.000000</td>  
      <td>20.125000</td>  
      <td>0.000000</td>  
      <td>0.000000</td>  
      <td>7.910400</td>  
    </tr>  
    <tr>  
      <th>50%</th>  
      <td>446.000000</td>  
      <td>0.000000</td>  
      <td>3.000000</td>  
      <td>28.000000</td>  
      <td>0.000000</td>  
      <td>0.000000</td>  
      <td>14.454200</td>  
    </tr>  
    <tr>  
      <th>75%</th>  
      <td>668.500000</td>  
      <td>1.000000</td>  
      <td>3.000000</td>  
      <td>38.000000</td>  
      <td>1.000000</td>  
      <td>0.000000</td>  
      <td>31.000000</td>  
    </tr>  
    <tr>  
      <th>max</th>  
      <td>891.000000</td>  
      <td>1.000000</td>  
      <td>3.000000</td>  
      <td>80.000000</td>  
      <td>8.000000</td>  
      <td>6.000000</td>  
      <td>512.329200</td>  
    </tr>  
  </tbody>  
</table>  
</div>  
  
  
  
  
```python  
df_test.describe()  
```  
  
  
  
  
<div>  
<style scoped>  
    .dataframe tbody tr th:only-of-type {  
        vertical-align: middle;  
    }  
  
    .dataframe tbody tr th {        vertical-align: top;    }  
    .dataframe thead th {        text-align: right;    }</style>  
<table border="1" class="dataframe">  
  <thead>  
    <tr style="text-align: right;">  
      <th></th>  
      <th>PassengerId</th>  
      <th>Pclass</th>  
      <th>Age</th>  
      <th>SibSp</th>  
      <th>Parch</th>  
      <th>Fare</th>  
    </tr>  
  </thead>  
  <tbody>  
    <tr>  
      <th>count</th>  
      <td>418.000000</td>  
      <td>418.000000</td>  
      <td>332.000000</td>  
      <td>418.000000</td>  
      <td>418.000000</td>  
      <td>417.000000</td>  
    </tr>  
    <tr>  
      <th>mean</th>  
      <td>1100.500000</td>  
      <td>2.265550</td>  
      <td>30.272590</td>  
      <td>0.447368</td>  
      <td>0.392344</td>  
      <td>35.627188</td>  
    </tr>  
    <tr>  
      <th>std</th>  
      <td>120.810458</td>  
      <td>0.841838</td>  
      <td>14.181209</td>  
      <td>0.896760</td>  
      <td>0.981429</td>  
      <td>55.907576</td>  
    </tr>  
    <tr>  
      <th>min</th>  
      <td>892.000000</td>  
      <td>1.000000</td>  
      <td>0.170000</td>  
      <td>0.000000</td>  
      <td>0.000000</td>  
      <td>0.000000</td>  
    </tr>  
    <tr>  
      <th>25%</th>  
      <td>996.250000</td>  
      <td>1.000000</td>  
      <td>21.000000</td>  
      <td>0.000000</td>  
      <td>0.000000</td>  
      <td>7.895800</td>  
    </tr>  
    <tr>  
      <th>50%</th>  
      <td>1100.500000</td>  
      <td>3.000000</td>  
      <td>27.000000</td>  
      <td>0.000000</td>  
      <td>0.000000</td>  
      <td>14.454200</td>  
    </tr>  
    <tr>  
      <th>75%</th>  
      <td>1204.750000</td>  
      <td>3.000000</td>  
      <td>39.000000</td>  
      <td>1.000000</td>  
      <td>0.000000</td>  
      <td>31.500000</td>  
    </tr>  
    <tr>  
      <th>max</th>  
      <td>1309.000000</td>  
      <td>3.000000</td>  
      <td>76.000000</td>  
      <td>8.000000</td>  
      <td>9.000000</td>  
      <td>512.329200</td>  
    </tr>  
  </tbody>  
</table>  
</div>  
  
  
  
describe()의 통계치를 살펴보자.  
count의 갯수가 다른 행들이 몇개 있는 것으로 보인다. 따라서 null 데이터가 있는 것으로 추측된다.  
이를 좀 더 자세히 살펴보자.   
  
### 1.1 Null data check  
  
  
```python  
for col in df_train.columns:  
    msg = 'column: {:>10}\t Percent of NaN value: {:.2f}%'.format(col, 100 * (df_train[col].isnull().sum() / df_train[col].shape[0]))  
    print(msg)  
```  
  
    column: PassengerId  Percent of NaN value: 0.00%    column:   Survived   Percent of NaN value: 0.00%    column:     Pclass   Percent of NaN value: 0.00%    column:       Name   Percent of NaN value: 0.00%    column:        Sex   Percent of NaN value: 0.00%    column:        Age   Percent of NaN value: 19.87%    column:      SibSp   Percent of NaN value: 0.00%    column:      Parch   Percent of NaN value: 0.00%    column:     Ticket   Percent of NaN value: 0.00%    column:       Fare   Percent of NaN value: 0.00%    column:      Cabin   Percent of NaN value: 77.10%    column:   Embarked   Percent of NaN value: 0.22%  
  
- 'column: {:>10}': {:>10}은 오른쪽 정렬하여 10칸의 너비를 차지하도록 합니다. 열 이름이 짧으면 공백으로 채웁니다.    
- '\t Percent of NaN value: {:.2f}%': {:.2f}는 소수점 두 번째 자리까지 포맷팅합니다. 나중에 %.2f로 포맷할 값은 NaN 값의 비율입니다.  
- .isnull(): null이면 true, 아니면 false  
- .sum(): 합을 더하므로, null인 것의 갯수를 결국 구하게 됨  
- shape[0]: row의 갯수를 구하게 됨.  
  
  
```python  
for col in df_test.columns:  
    msg = 'column: {:>10}\t Percent of NaN value: {:.2f}%'.format(col, 100*(df_test[col].isnull().sum() / df_test[col].shape[0]))  
    print(msg)  
```  
  
    column: PassengerId  Percent of NaN value: 0.00%    column:     Pclass   Percent of NaN value: 0.00%    column:       Name   Percent of NaN value: 0.00%    column:        Sex   Percent of NaN value: 0.00%    column:        Age   Percent of NaN value: 20.57%    column:      SibSp   Percent of NaN value: 0.00%    column:      Parch   Percent of NaN value: 0.00%    column:     Ticket   Percent of NaN value: 0.00%    column:       Fare   Percent of NaN value: 0.24%    column:      Cabin   Percent of NaN value: 78.23%    column:   Embarked   Percent of NaN value: 0.00%  
  
- 결과를 확인해보니 Train, Test 데이터 에서 Age, Fare, Cabin에서 null 값이 있고, Emabrked는 train에서만 null아 나타난다.  
- MANO라는 라이브러리르 사용하면 null data의 존재를 더 쉽게 볼 수 있다.  
  
  
```python  
msno.matrix(df=df_train.iloc[:,:], figsize=(8,8), color=(0.8, 0.5, 0.2))  
```  
  
  
  
  
    <Axes: >  
  
  
  
    ![png](%ED%83%80%EC%9D%B4%ED%83%80%EB%8B%89%20%ED%8A%9C%ED%86%A0%EB%A6%AC%EC%96%BC%201%20-%20Exploratory%20data%20analysis%2C%20visualization%2C%20machine%20learning_files/%ED%83%80%EC%9D%B4%ED%83%80%EB%8B%89%20%ED%8A%9C%ED%86%A0%EB%A6%AC%EC%96%BC%201%20-%20Exploratory%20data%20analysis%2C%20visualization%2C%20machine%20learning_20_1.png)  
      
  
  
  
```python  
msno.matrix(df=df_test.iloc[:,:], figsize=(8,8), color=(0.8, 0.5, 0.2))  
```  
  
  
  
  
    <Axes: >  
  
  
  
    ![png](%ED%83%80%EC%9D%B4%ED%83%80%EB%8B%89%20%ED%8A%9C%ED%86%A0%EB%A6%AC%EC%96%BC%201%20-%20Exploratory%20data%20analysis%2C%20visualization%2C%20machine%20learning_files/%ED%83%80%EC%9D%B4%ED%83%80%EB%8B%89%20%ED%8A%9C%ED%86%A0%EB%A6%AC%EC%96%BC%201%20-%20Exploratory%20data%20analysis%2C%20visualization%2C%20machine%20learning_21_1.png)  
      
  
  
- 이떄 `df_test.iloc[:,:]`은 모든 행과 열을 선택한다는 의미다.  
- iloc은 인덱싱 및 슬라이싱을 해준다.  
- iloc[0] := 첫번째 행, iloc[:,0] := 첫번째 열을 가리킨다.  
- iloc[:2] := 1,2행을 선택, iloc[:,:2] := 1,2열을 선택  
- iloc[0,1] := 0행 1열의 값을 선택  
- iloc[:2, :2] := 첫 두행과 첫 두열을 선택 2x2를 출력하게 된다.  
  
  
```python  
msno.bar(df=df_train.iloc[:,:], figsize=(8,8), color=(0.8, 0.5, 0.2))  
```  
  
  
  
  
    <Axes: >  
  
  
  
    ![png](%ED%83%80%EC%9D%B4%ED%83%80%EB%8B%89%20%ED%8A%9C%ED%86%A0%EB%A6%AC%EC%96%BC%201%20-%20Exploratory%20data%20analysis%2C%20visualization%2C%20machine%20learning_files/%ED%83%80%EC%9D%B4%ED%83%80%EB%8B%89%20%ED%8A%9C%ED%86%A0%EB%A6%AC%EC%96%BC%201%20-%20Exploratory%20data%20analysis%2C%20visualization%2C%20machine%20learning_23_1.png)  
      
  
  
- 이런 식으로 bar로 나타낼 수도 있다.   
  
### 1.2 Target Label 확인  
- Target의 label이 어떤 분포를 갖고 있는 지 확인해야 함  
- 지금 같은 binary classification의 경우, 0과 1의 분포가 어떠냐에 따라 모델의 평가 방법이 달라질 수 있다.  
  
  
```python  
f, ax = plt.subplots(1, 2, figsize=(18, 8))  
  
df_train['Survived'].value_counts().plot.pie(explode=[0, 0.1], autopct='%1.1f%%', ax=ax[0], shadow=True)  
ax[0].set_title('Pie plot - Survived')  
ax[0].set_ylabel('')  
sns.countplot(x='Survived', data=df_train, ax=ax[1])  
ax[1].set_title('Count plot - Survived')  
  
plt.show()  
```  
  
  
    ![png](%ED%83%80%EC%9D%B4%ED%83%80%EB%8B%89%20%ED%8A%9C%ED%86%A0%EB%A6%AC%EC%96%BC%201%20-%20Exploratory%20data%20analysis%2C%20visualization%2C%20machine%20learning_files/%ED%83%80%EC%9D%B4%ED%83%80%EB%8B%89%20%ED%8A%9C%ED%86%A0%EB%A6%AC%EC%96%BC%201%20-%20Exploratory%20data%20analysis%2C%20visualization%2C%20machine%20learning_26_0.png)  
      
  
  
위 코드는 matplotlib와 pandas를 사용하여 두 개의 서브플롯을 생성하고, 첫 번째 서브플롯에 파이 차트를 그리는 작업을 수행합니다. 아래는 코드의 상세한 해석입니다:  
  
1. **서브플롯 생성**:  
    ```python  
    f, ax = plt.subplots(1, 2, figsize=(18, 8))  
    ```    - `plt.subplots(1, 2, figsize=(18, 8))`는 1행 2열의 서브플롯을 생성합니다.  
   - `figsize=(18, 8)`는 전체 그림의 크기를 설정하며, 너비가 18인치, 높이가 8인치입니다.  
   - `f`는 전체 그림 객체(`Figure`)를 나타내고, `ax`는 서브플롯의 배열로서 두 개의 `Axes` 객체를 포함합니다.  
  
2. **파이 차트 생성**:  
    ```python  
    df_train['Survived'].value_counts().plot.pie(explode=[0, 0.1], autopct='%1.1f%%', ax=ax[0], shadow=True)  
    ```    - `df_train['Survived'].value_counts()`는 `Survived` 열의 값들을 세어 각 값의 빈도를 반환합니다. 예를 들어, 생존자와 비생존자의 수를 셉니다.  
   - `.plot.pie(...)`는 파이 차트를 그리는 pandas 메서드입니다.  
  
    파이 차트를 그리는 메서드에 전달된 인수들은 다음과 같습니다:  
   - `explode=[0, 0.1]`: 파이 차트의 조각 중 두 번째 조각(즉, 생존자를 나타내는 조각)을 강조하기 위해 약간 분리합니다.  
   - `autopct='%1.1f%%'`: 각 조각에 백분율 값을 표시하며, 소수점 한 자리까지 표시합니다.  
   - `ax=ax[0]`: 파이 차트를 첫 번째 서브플롯(`ax[0]`)에 그립니다.  
   - `shadow=True`: 파이 차트에 그림자를 추가하여 3D 효과를 줍니다.  
  
3. **설정된 파이 차트 예시**:  
  
    예를 들어, `df_train['Survived']`가 다음과 같다고 가정해보겠습니다:  
    ```python  
    df_train = pd.DataFrame({  
        'Survived': [0, 1, 1, 0, 1, 0, 1, 0, 0, 1]    })    ```    `df_train['Survived'].value_counts()`의 결과는 다음과 같습니다:  
    ```  
    0    5  
    1    5    Name: Survived, dtype: int64    ```    이는 생존자와 비생존자가 각각 5명씩 있다는 것을 의미합니다.   
  
    이 정보를 바탕으로 파이 차트가 그려지며, `explode=[0, 0.1]`에 따라 생존자를 나타내는 조각이 원의 중심에서 약간 분리되어 표시됩니다. 각 조각에는 백분율 값이 표시됩니다.  
  
이 코드를 실행하면 다음과 같은 결과를 얻을 수 있습니다:  
  
- 왼쪽 서브플롯에 생존 여부에 대한 파이 차트가 그려지며, 생존자의 조각이 약간 분리되어 강조됩니다.  
- 오른쪽 서브플롯은 비어있거나 다른 플롯을 추가할 수 있도록 준비된 상태입니다.  
  
  
```python  
  
```  
  
  
```python  
  
```