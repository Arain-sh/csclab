import sys

f = open('./test.txt','w')
a = sys.argv[1]
b = sys.argv[2]
c = sys.argv[3]
d = sys.argv[4]
f.write(a + b + c + d)
f.close()