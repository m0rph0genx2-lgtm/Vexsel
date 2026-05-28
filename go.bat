@echo off
:loop
taskkill /F /IM inventor.exe /T
dotnet run --project CupCreator.vbproj
goto loop
