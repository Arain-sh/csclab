import pickle
import json
import numpy as np
import pandas as pd
import shapefile
import geopandas as gp
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

def top(x1,y1,x2,y2,time):
	vStamp = (int(time[0:2])*60+int(time[3:5]))//2
	qStamp = (int(time[0:2])*60+int(time[3:5]))//10
	data = pd.read_csv('./static.csv')	
	data = data[data.timestamp == [vStamp]]
	data = data.fillna(data['value'].mean())
	data['value'] = data['value'].max() + data['value'].min() - data['value']
	# data['value'] = (data['value']-data['value'].min())/(data['value'].max()-data['value'].min())
	
	data['posi'] = data.x * 60 + data.y
	for i in range(2866):
		ss[int(data.iloc[i].posi)] = data.iloc[i].value

	weights = [{} for i in range(3600)]
	graph = grid2graph()
	for i in range(3600):
		for j in graph[i]:
			if ss[j] is np.nan:
				continue
			weights[i][j] = ss[j]
	

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

def bottom(x1,y1,x2,y2,time):
	upper = top(x1,y1,x2,y2,time)
	seg = pickle.Unpickler(open('./SurfaceRoad.dat','rb')).load()
	tt = 0
	bottom = []
	for ele in upper:
		x = ele // 60
		y = ele % 60
		length = max(seg[x][y].values())
		print(x,y,ss[ele],length)
		# print(length,seg[x][y])
		for key in seg[x][y]:
			bottom.append(key)
	
	road = ['main2015','sub2015','ord2015']
	features = []
	for roadtype in road:
		roadfile = gp.GeoDataFrame.from_file('./shp/'+roadtype+'.shp',encoding = 'gb18030')
		sf = shapefile.Reader('./shp/'+roadtype+'.shp')		
		for i in range(len(sf.records())):
			if roadfile.iloc[i]['BM_CODE'] not in bottom:
				continue
			feature = {}
			feature['properties'] = {'路名':roadfile.iloc[i]['路名'], 'BM_CODE':roadfile.iloc[i]['BM_CODE']}
			feature['points'] = list(map(list,sf.shape(i).points))
			features.append(feature)
	geojson = {'type':'FeatureCollection','features':features}
	with open('./path.json','w',encoding = 'utf-8') as f:
		json.dump(geojson, f, ensure_ascii = False)

	return upper

ss = [np.nan for i in range(3600)]
path = top(int(sys.argv[1]),int(sys.argv[2]),int(sys.argv[3]),int(sys.argv[4]),sys.argv[5])
road = pickle.Unpickler(open('./SurfaceRoad.dat','rb')).load()
tt = 0
for ele in path:
	x = ele // 60
	y = ele % 60
	length = max(road[x][y].values())
	tt += length/(ss[ele]*5/18)
# path = bottom(sys.argv[1],sys.argv[2],sys.argv[3],sys.argv[4],sys.argv[5])
print(path)
print(tt)
# print(tt)