//
// Created by lynx on 11.09.2021.
//

#include "MouseCount.h"

LRESULT CALLBACK mouse_proc(int Code, WPARAM wParam, LPARAM lParam)
{
    MOUSEHOOKSTRUCT * m_struct = (MOUSEHOOKSTRUCT *)lParam;
    if(m_struct != nullptr) {
        switch (wParam) {
            case WM_MOUSEMOVE:
                count_mouse_move++;
                break;
            case WM_LBUTTONDOWN:
                count_mouse++;
                break;
            //case WM_LBUTTONUP:
               // count_mouse++;
                break;
            case WM_RBUTTONDOWN:
                count_mouse++;
                break;
            //case WM_RBUTTONUP:
                //count_mouse++;
                break;
            case WM_MBUTTONDOWN:
                count_mouse++;
                break;
            //case WM_MBUTTONUP:
               // count_mouse++;
                break;
            case WM_MOUSEWHEEL:
                count_mouse_scroll++;
                break;
            default:
                break;
        }
    }
    return CallNextHookEx(NULL, Code, wParam, lParam);
}

MouseCount::MouseCount()
{
    start_mcount();
}

void MouseCount::start_mcount()
{
    mouse_hook = SetWindowsHookEx(WH_MOUSE_LL, mouse_proc, NULL, NULL);
    MSG msg;
    while(work) {
        if (activtask) {
            while (!GetMessage(&msg, NULL, NULL, NULL)) {

            }
        }
    }
}