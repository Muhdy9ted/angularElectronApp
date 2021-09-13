// #include "example.h"
// using namespace std;
// int example::add(int x, int y){
//  return (x+y);
// }
// Napi::Number example::addWrapped(const Napi::CallbackInfo& info){
//  Napi::Env env = info.Env();
//  //check if arguments are integer only.
//  if(info.Length()<2 || !info[0].IsNumber() || !info[1].IsNumber()){
//     Napi::TypeError::New(env, "arg1::Number, arg2::Number expected").ThrowAsJavaScriptException();
//  }
//  Wrapper wrap;
//  //convert javascripts datatype to c++
//  Napi::Number first = info[0].As<Napi::Number>();
//  Napi::Number second = info[1].As<Napi::Number>();
// //run c++ function return value and return it in javascript
//  Napi::Number returnValue = Napi::Number::New(env, example::add(first.Int32Value(), second.Int32Value()));
//
//  return returnValue;
// }
//
//
// Napi::Object example::Init(Napi::Env env, Napi::Object exports)
// {
//   //export Napi function
//   exports.Set("add", Napi::Function::New(env, example::addWrapped));
//   return exports;
// }
#include <node.h>
#include "myobject.h"

namespace demo {

using v8::Local;
using v8::Object;

void InitAll(Local<Object> exports) {
  MyObject::Init(exports);
}

NODE_MODULE(NODE_GYP_MODULE_NAME, InitAll) //NODE_GYP_MODULE_NAME

}
