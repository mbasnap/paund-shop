
#define MyAppName "PShop"
#define MyAppVersion "1.11"
#define MyAppPublisher "MbaSnap"
#define MyAppURL "mbasnap@yandex.ua"
#define MyAppExeName "paund-shop.exe"
#define MyAppDir "D:\P-Shop"
#define MyAppOutputDir "C:\Users\stalker\Documents"

[Setup]
PrivilegesRequired=admin
AppId={{BE0DE29F-E050-41D3-97B5-956A5E6CDFB9}
AppName={#MyAppName}
AppVersion={#MyAppVersion}
AppPublisher={#MyAppPublisher}
AppPublisherURL={#MyAppURL}
AppSupportURL={#MyAppURL}
AppUpdatesURL={#MyAppURL}
DefaultDirName={autopf}\{#MyAppName}
DisableProgramGroupPage=yes
UsedUserAreasWarning=no
OutputDir={#MyAppOutputDir}\PShopSetup
OutputBaseFilename=PShopSetup
SetupIconFile={#MyAppDir}\paund-shop\build\icons\icon.ico
Compression=lzma
SolidCompression=yes
WizardStyle=modern

[Languages]
Name: "english"; MessagesFile: "compiler:Default.isl"
Name: "russian"; MessagesFile: "compiler:Languages\Russian.isl"

[Tasks]
Name: "desktopicon"; Description: "{cm:CreateDesktopIcon}"; GroupDescription: "{cm:AdditionalIcons}"; Flags: unchecked
Name: "quicklaunchicon"; Description: "{cm:CreateQuickLaunchIcon}"; GroupDescription: "{cm:AdditionalIcons}"; Flags: unchecked; OnlyBelowVersion: 6.1; Check: not IsAdminInstallMode

[Files]
Source: "{#MyAppDir}\paund-shop\build\paund-shop-win32-ia32\paund-shop.exe"; DestDir: "{app}"; Flags: ignoreversion
Source: "{#MyAppDir}\paund-shop\build\paund-shop-win32-ia32\*"; DestDir: "{app}"; Flags: ignoreversion recursesubdirs createallsubdirs

[Icons]
Name: "{autoprograms}\{#MyAppName}"; Filename: "{app}\{#MyAppExeName}"
Name: "{autodesktop}\{#MyAppName}"; Filename: "{app}\{#MyAppExeName}"; Tasks: desktopicon
Name: "{userappdata}\Microsoft\Internet Explorer\Quick Launch\{#MyAppName}"; Filename: "{app}\{#MyAppExeName}"; Tasks: quicklaunchicon

[Run]
Filename: "{app}\{#MyAppExeName}"; Description: "{cm:LaunchProgram,{#StringChange(MyAppName, '&', '&&')}}"; Flags: nowait postinstall skipifsilent

