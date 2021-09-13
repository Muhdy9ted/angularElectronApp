//
// Created by lynx on 09.09.2021.
//

#include "Wrapper.h"

Wrapper::Wrapper()
{
    cout<<"start "<<this_thread::get_id()<<endl;
    start_threads();
    save_log();
}

//template<typename T>
void Wrapper::start_screen()
{
    screen = new Screenshot();
}

void Wrapper::startKeycount()
{
    keyboardCount=new KeyboardCount();
}

void Wrapper::startMousecount()
{
    mouseCount=new MouseCount();
}

void Wrapper::start_threads()
{
    activtask=true;

    std::thread thr_screen (&Wrapper::start_screen,this);
    std::thread thr_keycount (&Wrapper::startKeycount, this);
    std::thread thr_mcount (&Wrapper::startMousecount, this);
    int i=0,y=0,z=0;
    i=(int)thr_screen.native_handle();
    y=(int)thr_keycount.native_handle();
    z=(int)thr_mcount.native_handle();
    thr_screen.detach();
    thr_keycount.detach();
    thr_mcount.detach();
}

void Wrapper::save_log()
{
    while(work)
    {
        while (activtask)
        {
            this_thread::sleep_for(60.0s);
            std::string str ="./screenshots/"+to_uts()+".json";
            int kp,mp,mm,ms;
            kp=count_key;
            mp=count_mouse;
            mm=count_mouse_move;
            ms=count_mouse_scroll;
            count_key=0;
            count_mouse=0;
            count_mouse_move=0;
            count_mouse_scroll=0;
            cout<<str<<endl;
            std::string my_string = "{\n"
                    "\"keyboard_press\": "+std::to_string(kp)+",\n"
                    "\"mouse_click\": "+std::to_string(mp)+",\n"
                    "\"mouse_move\": "+std::to_string(mm)+",\n"
                    "\"mouse_scroll\": "+std::to_string(ms)+"\n"+
            "}";
            std::ofstream out(str);
            out << my_string;
            out.close();
        }
    }
}

string Wrapper::to_uts()
{
    time_t ltime;
    time(&ltime);
    return std::to_string(ltime);
}
