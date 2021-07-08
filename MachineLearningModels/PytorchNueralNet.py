import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
# import sklearn
from sklearn import preprocessing as encoder
from sklearn.preprocessing import MinMaxScaler
import os
from sklearn.model_selection import train_test_split
import torch
import torch.nn as nn
import torch.nn.functional as F
import torchvision
import torch.optim as optim
from torch.utils.data import DataLoader, Dataset




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

    def __init__(self):
        super(Net, self).__init__()

        self.fc1 = nn.Linear(12, 700)  # 9*1
        self.fc2 = nn.Linear(700, 500)
        self.fc3 = nn.Linear(500, 200)
        self.fc4 = nn.Linear(200, 60)
        self.fc5 = nn.Linear(60, 10)

    def forward(self, x):
        x = F.relu(self.fc1(x))
        x = F.relu(self.fc2(x))
        x = F.relu(self.fc3(x))
        x = F.relu(self.fc4(x))
        x = F.sigmoid(self.fc5(x))
        return x

    def get_num_correct(self, preds, labels):
        return preds.round().squeeze().eq(labels).numpy().sum()

device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")
print("### GPU", device)

X_train = torch.tensor(X_train.values).float()
X_train = X_train.to(device)
X_test = torch.tensor(X_test.values).float()
y_train = torch.tensor(y_train.values).float()
y_train = y_train.to(device)
y_test = torch.tensor(y_test.values).float()



train_data = []
test_data = []

for i in range(len(X_train)):
    train_data.append([X_train[i], y_train[i]])

for i in range(len(X_test)):
    test_data.append(([X_test[i], y_test[i]]))

# print(train_data)
train_loader = DataLoader(train_data, batch_size=100, shuffle=False)
test_loader = DataLoader(test_data, batch_size=100, shuffle=False)

i1, l1 = next(iter(train_loader))
print(l1[-1])

# training_dataset = Dataset(X_train,y_train)

# train_loader = DataLoader(training_dataset, batch_size=100)
#
net = Net()
# test = net(i1[98])

net.to(device)

# criterion = nn.MSELoss()
criterion = nn.CrossEntropyLoss()
# criterion = nn.BCEWithLogitsLoss()
# criterion = nn.BCELoss()
# loss = criterion(test, l1[98])
# print("original", l1[98], i1[98])
# print("test", test)
# print("loss", loss)

optimizer = optim.Adam(net.parameters(), lr=0.001)

EPOCHS = 100

for epoch in range(EPOCHS):
    totalLoss = 0
    totalCorrect = 0
    for data in train_loader:
        X, y = data
        X =X.to(device)
        y = y.to(device)
        # y = y.numpy()
        # y = y.reshape(100,1)
        # y = torch.LongTensor(y)
        net.zero_grad()
        net = net.to(device)

        output = net(X)
        print("###output of testing ",output)
        # print("training output", output[99], "test",y)
        # print("training output", type(output), type(y))
        # y = y.size([100,1])
        # y = y.view(100,1)

        # for i in range(len(output)):
        # loss = F.mse_loss(output, y)
        # loss = criterion
        # print(type(loss))
        # criterion = nn.BCEWithLogitsLoss()
        # y = y.unsqueeze(1)
        ### The target is converted to Long as catorical values can not be floats for multi class 



        y = y.type(torch.LongTensor)
        y = y.to(device)


        loss = criterion(output, y)  # loss functions output - y (target)
        print("loosss", loss)
        loss = loss.type(torch.FloatTensor)
        loss.backward()  # back propagation
        optimizer.step()  # adjust weights

        totalLoss += loss.item()
        # print("output",output)
        # totalCorrect += net.get_num_correct(output, y)
        # print("Total right for training", totalCorrect)
    # print(loss)

    # PATH = "Final\WebAPP\MlModels\modle.pth"
    # saving the model
    # torch.save(net,PATH)
    # torch.save(net.state_dict(), PATH)
    # torch.save(net.state_dict(),PATH)
