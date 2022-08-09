#include<iostream>
using namespace std;

int main()
{

    int a,b;
    cout<<"a=";
    cin>>a;
    cout<<"b=";
    cin>>b;
    cout<<"Before Swap a="<<a<<" and b="<<b<<endl;

    a=a+b;
    b=a-b;
    a=a-b;

    cout<<"Before Swap a="<<a<<" and b="<<b;
}
