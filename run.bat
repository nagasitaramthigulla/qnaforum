@echo off
set argC=0
for %%x in (%*) do Set /A argC+=1
IF %argC% == 0 (
    GOTO FLAG
)
IF %1 == prod (
    python manage.py runserver 0:80 --settings qnaproject.prodsettings
)ELSE IF %1 == dev (
    python manage.py runserver 0:80 
)ELSE IF %1 == cs (
    python manage.py collectstatic
)ELSE (
    :FLAG
    @ECHO usage:
    @ECHO. %0 COMMAND 
    @ECHO.
    @ECHO COMMAND options are:
    @ECHO %TAB%       dev  development server
    @ECHO %TAB%       prod  production server
    @ECHO %TAB%       cs  collect static files
)