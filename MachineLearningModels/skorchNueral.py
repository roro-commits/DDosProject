import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
# import sklearn
from sklearn import preprocessing as encoder
from sklearn.preprocessing import MinMaxScaler
import os



intrusion_Data = pd.read_csv('C:\\Users\\captain-blacc\\Documents\\FYP-Project\\DDosProject\\MachineLearningModels\\NF-ToN-IoT.csv')
value =intrusion_Data[intrusion_Data.columns[0]].count()

intrusion_Data = intrusion_Data.dropna()
intrusion_Data['Attack'].value_counts().plot(kind='bar', color='green')
plt.show()

print (intrusion_Data.columns)

#perfoming one hot enconding to convert abstract & categorical data to numerical

#[5 rows x 13 columns]
#0 injection     468539
#1 ddos          326345
#2 Benign        270279
#3 password      156299
#4 xss            99944
#5 scanning       21467
#6 Dos            17717
#7 backdoor       17247
#8 mitm            1295
#9 ransomware       142

intrusion_Data['IPV4_SRC_ADDR'] = encoder.LabelEncoder().fit_transform(intrusion_Data['IPV4_SRC_ADDR'])
intrusion_Data['IPV4_DST_ADDR'] = encoder.LabelEncoder().fit_transform(intrusion_Data['IPV4_DST_ADDR'])


# setting the structure of the categorical data 
intrusion_Data['Attack'] = intrusion_Data['Attack'].replace('injection','0')
intrusion_Data['Attack'] = intrusion_Data['Attack'].replace('ddos','1')
intrusion_Data['Attack'] = intrusion_Data['Attack'].replace('Benign','2')
intrusion_Data['Attack'] = intrusion_Data['Attack'].replace('password','3')
intrusion_Data['Attack'] = intrusion_Data['Attack'].replace('xss','4')
intrusion_Data['Attack'] = intrusion_Data['Attack'].replace('scanning','5')
intrusion_Data['Attack'] = intrusion_Data['Attack'].replace('dos','6')
intrusion_Data['Attack'] = intrusion_Data['Attack'].replace('backdoor','7')
intrusion_Data['Attack'] = intrusion_Data['Attack'].replace('mitm','8')
intrusion_Data['Attack'] = intrusion_Data['Attack'].replace('ransomware','9')
intrusion_Data['Attack'] = encoder.LabelEncoder().fit_transform(intrusion_Data['Attack'])


#Dropping Lable as its not need
intrusion_Data = intrusion_Data.drop(['Label'],axis=1)

# normarlising data to covert data range between 0-1

cols_to_normarlize = ["IPV4_SRC_ADDR","L4_SRC_PORT","IPV4_DST_ADDR","L4_DST_PORT","PROTOCOL","L7_PROTO",
                       "IN_BYTES","OUT_BYTES","IN_PKTS","OUT_PKTS","TCP_FLAGS","FLOW_DURATION_MILLISECONDS"
                        ]

scaler = MinMaxScaler()
intrusion_Data[cols_to_normarlize] = scaler.fit_transform(intrusion_Data[cols_to_normarlize])

# checking if data is normalised 
print (intrusion_Data.head())
print (intrusion_Data["Attack"].value_counts())


#sepertaing lables and fetaures 

x_data = intrusion_Data.drop('Attack', axis=1)

#label has mutliple atrributes that must be determined later
labels = intrusion_Data['Attack']

X_train, X_test, y_train, y_test = train_test_split(x_data, labels, test_size=0.33, random_state=200)

