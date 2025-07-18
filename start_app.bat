@echo off
REM START BACKEND IN NEW TERMINAL
start cmd /k "call run_backend.bat"

REM START FRONTEND IN NEW TERMINAL
start cmd /k "cd frontend && npm run dev"

exit
