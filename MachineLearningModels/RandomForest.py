import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
# import sklearn
from sklearn import preprocessing as encoder




intrusion_Data = pd.read_csv('DDosProject\\MachineLearningModels\\NF-ToN-IoT.csv')
value =intrusion_Data[intrusion_Data.columns[0]].count()

intrusion_Data = intrusion_Data.dropna()
intrusion_Data['Attack'].value_counts().plot(kind='bar', color='green')
plt.show()

#perfoming one hot enconding to convert abstract & categorical data to numerical

intrusion_Data['IPV4_SRC_ADDR'] = encoder().fit_transform(intrusion_Data['IPV4_SRC_ADDR'])
intrusion_Data['IPV4_DST_ADDR'] = encoder().fit_transform(intrusion_Data['STANCE1'])
intrusion_Data['Attack'] = encoder().fit_transform(intrusion_Data['Attack'])
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


