# User Statistic

This part of the project collects statistics on user actions.
All events are saved every minute to the Screenshots folder.

JSON structure:
```
{
"keyboard_press": 43,
"mouse_click": 4,
"mouse_move": 2816,
"mouse_scroll": 0
}
```

File naming:
```
TTTTTTTTTT-M-F.jpg
TTTTTTTTTT.json
* M - monitor (display) id (0,1,2,3,4,5) because we can have several displays
* F - flag of the file type, O (original), T (thumbnail)
TTTTTTTTTT - Unix Timestamp
```
## installation (Need CMake)
```
cd user_statistic
npm install
npm start
```

