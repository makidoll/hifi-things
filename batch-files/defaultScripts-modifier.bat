@echo off
setlocal enabledelayedexpansion

:::
:::  .'.         .'.    .'.         .'. 
:::  |  \       /  |    |  \       /  | 
:::  '.  \  |  /  .'    '.  \  |  /  .' 
:::    '. \\|// .'        '. \\|// .'   
:::      '-- --'            '-- --'     
:::      .'/|\'.            .'/|\'.     
:::     '..'|'..'          '..'|'..'    
:::      _       __             _ _          
:::   __| | ___ / _| __ _ _   _| | |_        
:::  / _` |/ _ | |_ / _` | | | | | __|       
::: | (_| |  __|  _| (_| | |_| | | |_        
:::  \__,_|\___|_| _\__,_|\__,_|_|\__|       
:::  ___  ___ _ __(_)_ __ | |_ ___           
::: / __|/ __| '__| | '_ \| __/ __|          
::: \__ | (__| |  | | |_) | |_\__ \          
::: |___/\___|_|  |_| .__/ \__|___/          
:::  _ __ ___   ___ |_|_| (_)/ _(_) ___ _ __ 
::: | '_ ` _ \ / _ \ / _` | | |_| |/ _ | '__|
::: | | | | | | (_) | (_| | |  _| |  __| |   
::: |_| |_| |_|\___/ \__,_|_|_| |_|\___|_|
:::
:::  another script by the cutelab faries
:::    by caitlyn and maki <3
:::

for /f "delims=: tokens=*" %%a in ('findstr /b ::: "%~f0"') do @echo(%%a

:away
set /p away=do you want to disable away.js (y/n)? 
if /i "%away%" equ "y" goto :teleport
if /i "%away%" equ "n" goto :teleport
goto :away

:teleport
set /p teleport=do you want to disable teleport.js (y/n)? 
if /i "%teleport%" equ "y" goto :_modify
if /i "%teleport%" equ "n" goto :_modify
goto :teleport

:_modify
echo.
for %%a in (A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z) do (
	if exist %%a: (
		%%a:

		for %%b in ("", "Program Files\","Program Files (x86)\") do (
			for %%c in ("","Steam\steamapps\common\","SteamLibrary\steamapps\common\") do (
				for %%d in ("High Fidelity","High Fidelity Interface") do (
					if exist "%%a:\%%~b%%~c%%~d" (

						rem defaultScripts.js
						cd "%%a:\%%~b%%~c%%~d\scripts"
						(for /f "tokens=1,* delims=¶" %%a in (defaultScripts.js) do (
							set str=%%a

							if /i "%away%" equ "y" set str=!str:    "system/away.js",=    //"system/away.js",%!
							if /i "%away%" equ "n" set str=!str:    //"system/away.js",=    "system/away.js",%!

							echo !str!
						))>"defaultScripts.js.tmp"
						move /y defaultScripts.js.tmp defaultScripts.js > nul

						rem system\controllers\controllerScripts.js
						cd system\controllers
						(for /f "tokens=1,* delims=¶" %%a in (controllerScripts.js) do (
							set str=%%a

							if /i "%teleport%" equ "y" set str=!str:    "controllerModules/teleport.js",=    //"controllerModules/teleport.js",%!
							if /i "%teleport%" equ "n" set str=!str:    //"controllerModules/teleport.js",=    "controllerModules/teleport.js",%!

							echo !str!
						))>"controllerScripts.js.tmp"
						move /y controllerScripts.js.tmp controllerScripts.js > nul

						echo ok we modified "%%a:\%%~b%%~c%%~d"
					)
				)
			)
		)
	)
)

echo.
echo okiiiii byeeeeee!!!!!! ^<^3
echo have a nice day!!!~
echo.
pause