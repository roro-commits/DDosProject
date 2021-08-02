from flask import Flask,render_template,send_from_directory,render_template
from flask_cors import CORS, cross_origin
from flask import jsonify
from flask import request
from sklearn.preprocessing import MinMaxScaler
from sklearn import preprocessing as encoder
import pandas as pd
import matplotlib.pyplot as plt
import numpy as np
import os
import pickle




app = Flask(__name__, static_folder='/app/build',template_folder='/app/build', static_url_path='/')
CORS(app, support_credentials=True)
# app = Flask(__name__, static_folder='C:\\Users\captain-blacc\Documents\FYP-Project\DDosProject\\build',template_folder='C:\\Users\captain-blacc\Documents\FYP-Project\DDosProject\\build', static_url_path='/')
# CORS(app, support_credentials=True)


# randModel = pickle.load(open('C:\\Users\captain-blacc\Documents\FYP-Project\DDosProject\\build\mlModel\RandModel.pkl', 'rb'))
randModel = pickle.load(open('/app/build/mlModel/RandModel.pkl', 'rb'))


@app.route('/', methods=['GET', 'POST'])
def home():
    print("ccheking2", flush=True)
    return send_from_directory(app.static_folder, "index.html")

# @app.route("/static/csvjson.json", methods=["GET"])
# @cross_origin(supports_credentials=True)
# def get_example():
#     """GET in server"""
#     response = jsonify(message="Simple server is running")

#     # Enable Access-Control-Allow-Origin
#     response.headers.add("Access-Control-Allow-Origin", "*")
#     return response

# catching React Router urls 
@app.errorhandler(404)   
def not_found(e):   
  return app.send_static_file('index.html')


@app.route('/api/react_api', methods=['POST'])
@cross_origin(supports_credentials=True)
def react_api():
    
    if request.method == 'POST':
        if request.data:
            data = request.data.decode('UTF-8')
            # print(request.data)
            # print(len(request.data))
            print("data", data)

          # after receiving data
            print("receiving data", flush=True)
            data = data.replace("[", "")  # dataset = [x for x in data] stored in a list
            data = data.replace("]", "")
            data = data.replace('"', "")

            dataset = lambda x: list(x.split(","))
            dataset = dataset(data)   

            print("Datasets", dataset, flush=True)
            print("Datasets 2", dataset[0], flush=True)
            print("Datasets 3", dataset[1], flush=True)
            print("Datasets 4", dataset[2], flush=True)

            # intrusion_Data = pd.read_csv('/app/build/static/basic_data.csv')
            intrusion_Data = pd.read_csv('C:\\Users\captain-blacc\Documents\FYP-Project\DDosProject\MachineLearningModels\\NF-ToN-IoT.csv')

            value =intrusion_Data[intrusion_Data.columns[0]].count()

            intrusion_Data = intrusion_Data.dropna()
           
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

            
            #Dropping Lable as its not need
            intrusion_Data = intrusion_Data.drop(['Attack'],axis=1)
            intrusion_Data = intrusion_Data.drop(['Label'],axis=1)

             #attaching webapp data to data list 
            length_dataframe = len(intrusion_Data)
            intrusion_Data.loc[length_dataframe] = dataset

            intrusion_Data['IPV4_SRC_ADDR'] = encoder.LabelEncoder().fit_transform(intrusion_Data['IPV4_SRC_ADDR'])
            intrusion_Data['IPV4_DST_ADDR'] = encoder.LabelEncoder().fit_transform(intrusion_Data['IPV4_DST_ADDR'])
            
            #Check data before normalization
            # print ("Data check !!!!\n",intrusion_Data.iloc[-1])
            # print ("Data check !!!!\n",intrusion_Data.iloc[1])


            # normarlising data to covert data range between 0-1

            cols_to_normarlize = ["IPV4_SRC_ADDR","L4_SRC_PORT","IPV4_DST_ADDR","L4_DST_PORT","PROTOCOL","L7_PROTO",
                                "IN_BYTES","OUT_BYTES","IN_PKTS","OUT_PKTS","TCP_FLAGS","FLOW_DURATION_MILLISECONDS"
                                    ]

            scaler = MinMaxScaler()
            intrusion_Data[cols_to_normarlize] = scaler.fit_transform(intrusion_Data[cols_to_normarlize])

            # checking if data is is attached and normalised  
            print (intrusion_Data.head())
            print ("Data check !!!!",intrusion_Data.iloc[-1])


            #################### Prediction Data #################
            toPredict = np.asarray(intrusion_Data.iloc[-1]).reshape(1, -1)

            print("Data for Prediction", toPredict)

             ## Random \Forest prediction
            prediction = randModel.predict_proba(toPredict)
            print("Output",prediction)
            


        return prediction




if __name__ == "__main__":
    # app.run(debug=True)
    # app.run()
     app.run(host='0.0.0.0', debug=False, port=os.environ.get('PORT'))


