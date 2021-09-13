//
// Created by lynx on 09.09.2021.
//

#ifndef TEST_SPY_SCREENSHOT_H
#define TEST_SPY_SCREENSHOT_H

#include "global.h"
using namespace std;
using namespace std::chrono;
#include <gdiplus.h>
#pragma comment(lib, "gdiplus.lib")


using namespace Gdiplus;

class Screenshot
{
public:
    explicit Screenshot();
    int GetEncoderClsid(const WCHAR* format, CLSID* pClsid)
    {
        UINT  num = 0;
        UINT  size = 0;

        ImageCodecInfo* pImageCodecInfo = NULL;

        GetImageEncodersSize(&num, &size);
        if (size == 0)
        {
            return -1;
        }
        pImageCodecInfo = (ImageCodecInfo*)(VirtualAlloc(0, size, MEM_COMMIT | MEM_RESERVE, PAGE_READWRITE));
        if (pImageCodecInfo == NULL)
        {
            return -1;
        }
        GetImageEncoders(num, size, pImageCodecInfo);

        for (UINT j = 0; j < num; ++j)
        {
            if (lstrcmpW(pImageCodecInfo[j].MimeType, format) == 0)
            {
                *pClsid = pImageCodecInfo[j].Clsid;
                VirtualFree(pImageCodecInfo, 0, MEM_RELEASE);
                return j;
            }
        }

        VirtualFree(pImageCodecInfo, 0, MEM_RELEASE);
        return -1;
    }
    void get_screen();
    void SaveVectorToFile(std::string& fileName);
    string to_uts();
};


#endif //TEST_SPY_SCREENSHOT_H
