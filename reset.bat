@echo off

for %%f in (alltests\*.json) do (
  if not "%%~nf"=="index.json" del "%%f"
)

(
  echo {
  echo   "tests": []
  echo }
) > alltests\index.json

if exist "notes_school" (
  rmdir /s /q notes_school
)
