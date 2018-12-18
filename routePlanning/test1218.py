import sys

fl = open('test.txt','w')
a = sys.argv[1]
b = sys.argv[2]
c = sys.argv[3]
d = sys.argv[4]
f1.write(a + b + c + d)
fl.close()
print(a,b,c,d)