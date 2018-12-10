import pickle
import numpy as np
import pandas as pd
import sys

def intersection2graph():
	da = pickle.Unpickler(open('CrossLocation.dat','rb')).load()
	graph = [[] for i in range(len(da))]
	for num1 in range(len(da)):
		x1 = da[num1][0]
		y1 = da[num1][1]
		for num2 in range(num1+1,len(da)):
			x2 = da[num2][0]
			y2 = da[num2][1]
			if abs(x1-x2)+abs(y1-y2) <= 1:
				graph[num1].append(num2)
				graph[num2].append(num1)
	return graph

def grid2graph():
	graph = [[] for i in range(3600)]
	for i in range(3600):
		if i%60 != 0:
			graph[i].append(i-1)
		if i%59 != 0:
			graph[i].append(i+1)
		if i > 59:
			graph[i].append(i-60)
		if (i+60) < 3600:
			graph[i].append(i+60)
	return graph

def routePlanning(x1,y1,x2,y2,time):
	vStamp = (int(time[0:2])*60+int(time[3:5]))//2
	qStamp = (int(time[0:2])*60+int(time[3:5]))//10
	data = pd.read_csv('20150525.csv')	
	data = data[data.timestamp == [vStamp]]
	data = data.fillna(data['value'].mean())
	data['value'] = data['value'].max() + data['value'].min() - data['value']
	# data['value'] = (data['value']-data['value'].min())/(data['value'].max()-data['value'].min())
	
	data['posi'] = data.x * 60 + data.y
	for i in range(2866):
		speed[int(data.iloc[i].posi)] = data.iloc[i].value

	weights = [{} for i in range(3600)]
	graph = grid2graph()
	for i in range(3600):
		for j in graph[i]:
			if speed[j] is np.nan:
				continue
			weights[i][j] = speed[j]
	

	start = x1*60 + y1
	end = x2*60 + y2
	path = [[] for i in range(3600)]
	flag = [0 for i in range(3600)]
	length = [10000000 for i in range(3600)]
	length[start] = 0
	path[start].append(start)
	flag[start] = 1 
	while start != end and sum(flag) != 3600:       
		for vertex in weights[start]:
			if flag[vertex] == 0 and length[vertex] > length[start] + weights[start][vertex]:
				length[vertex] = length[start] + weights[start][vertex]
				if path[vertex] == []:
					path[vertex].append(start)  # Parent vertex saved in first position
				else:
					path[vertex][-1] = start

		for i in range(3600):
			if flag[i] == 0:
				nextV = i
				break
		for i in range(3600):
			if flag[i] == 0 and length[i] < length[nextV]:
				nextV = i    
		start = nextV
		flag[start] = 1
		if path[start] == []:
			continue
		parent = path[start][-1]
		path[start] = path[parent]+[start]
		# print(start,length[start],path[start])
	return path[end]

if __name__ == '__main__':	
	# speed = [np.nan for i in range(3600)]
	# path = routePlanning(sys.argv[1],sys.argv[2],sys.argv[3],sys.argv[4],sys.argv[5])
	print(sys.argv[1])
	print(sys.argv[2])
	print(sys.argv[3])
	print(sys.argv[4])
	print(sys.argv[5])
