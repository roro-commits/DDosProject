import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
# import sklearn
from sklearn import preprocessing as encoder
from sklearn.preprocessing import MinMaxScaler
import os
from sklearn.metrics import accuracy_score
from sklearn.model_selection import train_test_split, RepeatedStratifiedKFold, cross_val_score
import torch
import torch.nn as nn
import torch.nn.functional as F
import torchvision
import torch.optim as optim
from torch.utils.data import DataLoader, Dataset
from sklearn.model_selection import GridSearchCV


from skorch.callbacks import EpochScoring

from skorch import NeuralNetClassifier
from skorch import NeuralNetBinaryClassifier



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



class Net(nn.Module):

    def __init__(self,
                 layer_one_units=28,
                 layer_two_units=17,
                 layer_three_units=17,
                 layer_four_units=17,
                 general_layer_node=17):
        super(Net, self).__init__()
        self.layer_one_units = layer_one_units
        self.layer_two_units = layer_two_units
        self.layer_three_units = layer_three_units
        self.layer_four_units = layer_four_units
        self.general_layer_node = general_layer_node

        self.input_layer = nn.Linear(12, layer_one_units)
        self.hidden_layer1 = nn.Linear(layer_one_units, layer_two_units)
        self.hidden_layer2 = nn.Linear(layer_two_units, layer_three_units)
        self.hidden_layer3 = nn.Linear(general_layer_node, general_layer_node)
        self.hidden_layer4 = nn.Linear(general_layer_node, general_layer_node)
        self.hidden_layer5 = nn.Linear(general_layer_node, general_layer_node)
        self.hidden_layer6 = nn.Linear(general_layer_node, general_layer_node)
        self.hidden_layer7 = nn.Linear(general_layer_node, general_layer_node)
        self.hidden_layer8 = nn.Linear(general_layer_node, general_layer_node)
        self.output_layer = nn.Linear(general_layer_node, 10)

    def forward(self, x):
        x = F.relu(self.input_layer(x))
        x = F.relu(self.hidden_layer1(x))
        x = F.relu(self.hidden_layer2(x))
        x = F.relu(self.hidden_layer3(x))
        x = F.relu(self.hidden_layer4(x))
        x = F.relu(self.hidden_layer5(x))
        x = F.relu(self.hidden_layer6(x))
        x = F.relu(self.hidden_layer7(x))
        x = F.relu(self.hidden_layer8(x))
        x = torch.sigmoid(self.output_layer(x))
        return x

    def get_num_correct(self, preds, labels):
        return preds.round().squeeze().eq(labels).numpy().sum()


X_train, X_test, y_train, y_test = train_test_split(x_data, labels, test_size=0.33, random_state=200)

# converting th data type to float for the nueral network
X_train = X_train.astype(np.float32)
X_test = X_test.astype(np.float32)
y_train = y_train.astype(np.longlong)
y_test = y_test.astype(np.float32)

print("X_train", y_train)

# auc = EpochScoring(scoring='roc_auc', lower_is_better=False)

# skorch.make_binary_classifier(squeeze_output=True)

net = NeuralNetClassifier(
    Net,
    max_epochs=120,
    lr=1,
    # criterion=nn.BCEWithLogitsLoss,
    criterion = nn.CrossEntropyLoss,
    # optimizer=optim.AdamW,
    optimizer=optim.ASGD,
    device='cuda'
)

print("X train values",X_train.values)
# print("X train values",X_train)

net.fit(X_train.values, y_train.values)

# y_proba = net.predict_proba(X_test[:20].values)
Accuracy = net.score(X_test.values, y_test.values)
y_probas = net.predict_proba(X_test.values)
print("Accuracy",Accuracy)

