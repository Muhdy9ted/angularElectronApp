//
// Created by lynx on 09.09.2021.
//

#ifndef TEST_SPY_WRAPPER_H
#define TEST_SPY_WRAPPER_H

#include "Screenshot.h"
#include "global.h"
#include "KeyboardCount.h"
#include "MouseCount.h"

using namespace std;

class Wrapper
{
public:
    explicit Wrapper();
    void start_screen();
    void startKeycount();
    void startMousecount();
    void start_threads();
    void save_log();
    string to_uts();


private:
    Screenshot *screen;
    KeyboardCount *keyboardCount;
    MouseCount *mouseCount;
};


#endif //TEST_SPY_WRAPPER_H
