import torch as T
import torch.nn as nn
import torch.nn.functional as F

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
        x = T.sigmoid(self.output_layer(x))
        return x

    def get_num_correct(self, preds, labels):
        return preds.round().squeeze().eq(labels).numpy().sum()
