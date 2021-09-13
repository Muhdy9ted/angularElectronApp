//
// Created by lynx on 11.09.2021.
//

#include "KeyboardCount.h"

LRESULT CALLBACK keyboard_proc(int nCode, WPARAM wParam, LPARAM lParam)
{
    if (wParam == WM_KEYDOWN)
    {
        count_key++;
    }
    return CallNextHookEx(NULL, nCode, wParam, lParam);
}

KeyboardCount::KeyboardCount()
{
    start_count();
}

void KeyboardCount::start_count()
{
    keyboard = SetWindowsHookEx(WH_KEYBOARD_LL, keyboard_proc, NULL, NULL);
    MSG msg;
    while(work) {
        if (activtask) {
            while (!GetMessage(&msg, NULL, NULL, NULL)) {

            }
        }
    }
}