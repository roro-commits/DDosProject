# An efficient Python3 program
# to randomly select k items
# from a stream of items
import random
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# A utility function
# to print an array
def printArray(stream,n):
    for i in range(n):
        print(stream[i],end=" ")
    print()
 
# A function to randomly select
# k items from stream[0..n-1].
#stream = data-source, n = data length, k = n of datapoint to sample
def selectKItems(stream, n, k):
        i=0
        sample = pd.DataFrame(columns=['IPV4_SRC_ADDR','L4_SRC_PORT',
        'IPV4_DST_ADDR','L4_DST_PORT','PROTOCOL',
        'L7_PROTO','IN_BYTES','OUT_BYTES','IN_PKTS','OUT_PKTS',
        'TCP_FLAGS','FLOW_DURATION_MILLISECONDS','Label','Attack' ])

        print("HEAD1!""",sample.head(5))
         
        # index for elements
        # in stream[]
         
        # reservoir[] is the output
        # array. Initialize it with
        # first k elements from stream[]
        reservoir = [0]*k
        for i in range(k):
            reservoir[i] = stream.loc[[i]].values
            # values_to_add =  stream.loc[[i]].values
            # sample.append(values_to_add, ignore_index = True
             # print("vaue of Row ",reservoir[[i][]])
            # sample = sample[''] = np.concatenate(values_to_add)

      

         
        # Iterate from the (k+1)th
        # element to nth element
        while(i < n):
            # Pick a random indexs
            # from 0 to i.
            j = random.randrange(i+1)
             
            # If the randomly picked
            # index is smaller than k,
            # then replace the element
            # present at the index
            # with new element from stream
            if(j < k):
                reservoir[j] =  stream.loc[[i]].values
            i+=1
         
        print("Following are k randomly selected items")
        # printArray(reservoir, k)

        # Add Data to panda dafatframe 

        for i in range (0,len(reservoir)):
            # print (reservoir[i][0])
            sample.loc[len(sample)] = reservoir[i][0]

        
        print("sample DATA ")
        print("sample size:",len(sample))
        print(sample.head(100))
        sample.to_csv("sampled_data.csv",encoding='utf-8',index=True)
        
        intrusion_Data = pd.read_csv('C:\\Users\captain-blacc\Documents\FYP-Project\DDosProject\\sampled_data.csv')
        value =intrusion_Data[intrusion_Data.columns[0]].count()

        intrusion_Data = intrusion_Data.dropna()
        intrusion_Data['Attack'].value_counts().plot(kind='bar', color='green')
        plt.show()

        print (intrusion_Data.columns)
# Driver Code

# intrusion_Data = pd.read_csv('C:\\Users\captain-blacc\Documents\FYP-Project\DDosProject\\basic_data copy.csv')
intrusion_Data = pd.read_csv('C:\\Users\captain-blacc\Documents\FYP-Project\DDosProject\MachineLearningModels\\NF-ToN-IoT.csv')
n =intrusion_Data[intrusion_Data.columns[0]].count()
stream = intrusion_Data #.loc[[280]].values
# print(value_value)
 
if __name__ == "__main__":
    # stream = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    # C:\Users\captain-blacc\Documents\FYP-Project\DDosProject\basic_data copy.csv
    # n = len(stream)
    k = 15000
    selectKItems(stream, n, k)
 
# This code is contributed by mits