//
// Created by lynx on 11.09.2021.
//

#ifndef TEST_SPY_MOUSECOUNT_H
#define TEST_SPY_MOUSECOUNT_H

#include "global.h"

class MouseCount
{
public:
    explicit MouseCount();
    void start_mcount();

private:
    HHOOK mouse_hook;
};


#endif //TEST_SPY_MOUSECOUNT_H
