//
// Created by lynx on 11.09.2021.
//

#ifndef TEST_SPY_KEYBOARDCOUNT_H
#define TEST_SPY_KEYBOARDCOUNT_H

#include "global.h"

using namespace std;

class KeyboardCount
{
public:
    explicit KeyboardCount();
    void start_count();

private:
    HHOOK keyboard;
};


#endif //TEST_SPY_KEYBOARDCOUNT_H
