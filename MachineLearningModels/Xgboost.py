import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
# import sklearn
from sklearn import preprocessing as encoder
from sklearn.preprocessing import MinMaxScaler
import os
from sklearn.metrics import accuracy_score
from sklearn.model_selection import train_test_split, RepeatedStratifiedKFold, cross_val_score
import pickle
import xgboost as xgb
from sklearn.model_selection import train_test_split, cross_val_score, KFold
import matplotlib.pyplot as plt
# from sklearn.preprocessing import LabelEncoder as encoder, MinMaxScaler
from sklearn.metrics import plot_confusion_matrix
from xgboost import plot_tree





# intrusion_Data = pd.read_csv('C:\\Users\\captain-blacc\\Documents\\FYP-Project\\DDosProject\\MachineLearningModels\\NF-ToN-IoT.csv')
intrusion_Data = pd.read_csv('C:\\Users\captain-blacc\Documents\FYP-Project\DDosProject\\sampled_data.csv')

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



model = xgb.XGBClassifier(objective="multi:softprob",
                          learning_rate=0.1,
                          missing=None,
                          gamma=0.25,
                          max_depth=5,
                          seed=42,
                          n_estimators=100,
                          use_label_encoder=False,
                          eval_metric="error"
                          )
model.fit(X_train, y_train, verbose=True, early_stopping_rounds=100, eval_metric='mlogloss', eval_set=[(X_test, y_test)])

# plot_confusion_matrix(model, X_test, y_test, values_format='d')

plt.figure(figsize=(12, 12))
xgb.plot_importance(model)
plt.savefig('tree_high_dpi', dpi=300)
plt.show()

# # pickle.dump(model, open("XGBboostModel.dat", "wb"))
# joblib.dump(model, open("joblibXGBboostModel.dat", "wb"))
# # model.save_model("XGBboost.model")

# def_two = np.asarray(x_data.iloc[9].values).reshape(1, -1)
# single = model.predict(def_two)

# # print("data 2",x_data)

# # single_no = model.predict(def_two)

# print("prediciting single data", single)
# print("predicting none")

kfold = KFold(n_splits=10)
results = cross_val_score(model, X_test, y_test, cv=kfold)
print("Accuracy: %.2f%% (%.2f%%)" % (results.mean() * 100, results.std() * 100))

# # # Grid Search Parameters
# grid_search_params = {
#     'learning_rate': [0.01, 0.1, 0.2, 0.5],
#     'n_estimators': [100],
#     'max_depth': [2, 3, 5]
# }

# grid = GridSearchCV(estimator= model, param_grid=grid_search_params, scoring='roc_auc',
#                     cv=4, verbose=0)

# grid.fit(X_test, y_test)
# print("GridSearchCV")
# print("Best parameters found: ", grid.best_params_)
# print("Lowest RMSE found: ", np.sqrt(np.abs(grid.best_score_)))


