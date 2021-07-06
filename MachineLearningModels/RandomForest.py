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


