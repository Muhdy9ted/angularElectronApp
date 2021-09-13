//
// Created by lynx on 09.09.2021.
//

#include "Screenshot.h"

struct cMonitorsVec
{
    std::vector<int>       iMonitors;
    std::vector<HMONITOR>  hMonitors;
    std::vector<HDC>       hdcMonitors;
    std::vector<RECT>      rcMonitors;

    static BOOL CALLBACK MonitorEnum(HMONITOR hMon, HDC hdc, LPRECT lprcMonitor, LPARAM pData)
    {
        cMonitorsVec* pThis = reinterpret_cast<cMonitorsVec*>(pData);

        pThis->hMonitors.push_back(hMon);
        pThis->hdcMonitors.push_back(hdc);
        pThis->rcMonitors.push_back(*lprcMonitor);
        pThis->iMonitors.push_back(pThis->hdcMonitors.size());
        return TRUE;
    }

    cMonitorsVec()
    {
        EnumDisplayMonitors(0, 0, MonitorEnum, (LPARAM)this);
    }
};

Screenshot::Screenshot()
{
    get_screen();
}


void Screenshot::get_screen()
{
    while(work)
    {
        this_thread::sleep_for(60.0s);
        if(activtask) {
            /*
             * TTTTTTTTTTTTT-M-F.jpg
             * M - monitor (display) id (0,1,2,3,4,5) because we can have several displays
             * F - flag of the file type, O (original), T (thumbnail)
             */
            string str_utc ="./screenshots/"+ to_uts();
          //  string path="./screenshots/";/*path+=*/
            SaveVectorToFile(str_utc);
        }
    }
}

void Screenshot::SaveVectorToFile(std::string& fileName)
{
    cMonitorsVec Monitors;
    for (int monitorIndex=0;  monitorIndex < Monitors.iMonitors.size(); monitorIndex++)
    {
//        std::wcout << "Screen id: " << monitorIndex << std::endl;
//        std::wcout << "-----------------------------------------------------" << std::endl;
//        std::wcout << " - screen left-top corner coordinates : (" << Monitors.rcMonitors[monitorIndex].left
//                   << "," << Monitors.rcMonitors[monitorIndex].top
//                   << ")" << std::endl;
//        std::wcout << " - screen dimensions (width x height) : (" << std::abs(Monitors.rcMonitors[monitorIndex].right - Monitors.rcMonitors[monitorIndex].left)
//                   << "," << std::abs(Monitors.rcMonitors[monitorIndex].top - Monitors.rcMonitors[monitorIndex].bottom)
//                   << ")" << std::endl;
//        std::wcout << "-----------------------------------------------------" << std::endl;

        HDC hMemoryDC = CreateCompatibleDC(Monitors.hdcMonitors[monitorIndex]);

        int x = GetDeviceCaps(Monitors.hdcMonitors[monitorIndex], HORZRES);
        int y = GetDeviceCaps(Monitors.hdcMonitors[monitorIndex], VERTRES);


        HBITMAP hBitmap = CreateCompatibleBitmap(Monitors.hdcMonitors[monitorIndex], x, y);

        HBITMAP hOldBitmap = reinterpret_cast<HBITMAP>(SelectObject(hMemoryDC, hBitmap));

        BitBlt(hMemoryDC,   0,0, x, y, Monitors.hdcMonitors[monitorIndex],0,0, SRCCOPY);
        hBitmap = reinterpret_cast<HBITMAP>(SelectObject(hMemoryDC, hOldBitmap));

        DeleteDC(hMemoryDC);

        GdiplusStartupInput gdiplusStartupInput;
        ULONG_PTR gdiplusToken;
        GdiplusStartup(&gdiplusToken, &gdiplusStartupInput, NULL);

        HDC scrdc, memdc;
        HBITMAP membit;
        scrdc = ::GetDC(0);
        int Width=    std::abs(Monitors.rcMonitors[monitorIndex].right - Monitors.rcMonitors[monitorIndex].left);
        int Height = std::abs(Monitors.rcMonitors[monitorIndex].top - Monitors.rcMonitors[monitorIndex].bottom);
        memdc = CreateCompatibleDC(scrdc);
        membit = CreateCompatibleBitmap(scrdc, Width, Height);
        HBITMAP hOldBitmap1 =(HBITMAP) SelectObject(memdc, membit);

        BitBlt(memdc, 0, 0, Width, Height,scrdc, Monitors.rcMonitors[monitorIndex].left, Monitors.rcMonitors[monitorIndex].top, SRCCOPY);

        Gdiplus::Bitmap bitmap(membit, NULL);
        CLSID clsid;
        GetEncoderClsid(L"image/jpeg", &clsid);

        string name = fileName;
        name+="-"+to_string((int)monitorIndex);
        name+="-O";
        name += ".jpeg";
        std::cout << name << '\n';
        std::wstring widestr = std::wstring(name.begin(), name.end());
        const wchar_t* widecstr = widestr.c_str();

        bitmap.Save(widecstr,&clsid, NULL);
        EncoderParameters encoderParameters;
        ULONG    quality;
        encoderParameters.Count = 1;
        encoderParameters.Parameter[0].Guid = EncoderQuality;
        encoderParameters.Parameter[0].Type = EncoderParameterValueTypeLong;
        encoderParameters.Parameter[0].NumberOfValues = 1;
        quality = 100;
        encoderParameters.Parameter[0].Value = &quality;

        Gdiplus::Bitmap   bitmaps (membit, NULL);

        UINT o_height = bitmaps.GetHeight();
        UINT o_width = bitmaps.GetWidth();
        INT n_width = 64;
        INT n_height = 64;
        double ratio = ((double)o_width) / ((double)o_height);
        if (o_width > o_height) {
            // Resize down by width
            n_height = static_cast<int>(((double)n_width) / ratio);
        } else {
            n_width = static_cast<int>(n_height * ratio);
        }
        Gdiplus::Bitmap newBitmap (n_width, n_height, bitmaps.GetPixelFormat());
        Gdiplus::Graphics graphics(&newBitmap);
        graphics.DrawImage(&bitmaps, 0, 0, n_width, n_height);

        string names = fileName;
        names+="-"+to_string((int)monitorIndex);
        names+="-T";
        names += ".jpeg";
        std::cout << names << '\n';
        std::wstring widestrs = std::wstring(names.begin(), names.end());
        const wchar_t* widecstrs = widestrs.c_str();
        newBitmap.Save(widecstrs,&clsid,NULL);
    }

}

string Screenshot::to_uts()
{
    time_t ltime;
    time(&ltime);
    //printf("Current local time as unix timestamp: %li\n", ltime);
    return std::to_string(ltime);
}
