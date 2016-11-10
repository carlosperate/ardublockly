var Ardublockly = Ardublockly || {};
Ardublockly.LOCALISED_TEXT = {
  translationLanguage: "한국어",
  title: "Ardublockly",
  blocks: "블록",
  /* Menu */
  open: "열기",
  save: "저장",
  deleteAll: "모두 지우기",
  settings: "설정",
  documentation: "도움말",
  reportBug: "버그 리포트",
  examples: "예제",
  /* Settings */
  compilerLocation: "아두이노 컴파일러 위치",
  compilerLocationDefault: "Compiler Location unknown",
  sketchFolder: "아두이노 코드를 저장할 폴더",
  sketchFolderDefault: "Sketch Folder unknown",
  arduinoBoard: "아두이노 보드",
  arduinoBoardDefault: "Arduino Board unknown",
  comPort: "COM 포트",
  comPortDefault: "COM Port unknown",
  defaultIdeButton: "기본 IDE 버튼",
  defaultIdeButtonDefault: "IDE options unknown",
  language: "언어",
  languageDefault: "Language unknown",
  sketchName: "코드 이름",
  /* Arduino console output */
  arduinoOpMainTitle: "아두이노 IDE 출력 결과",
  arduinoOpWaiting: "Waiting for the IDE output...",
  arduinoOpUploadedTitle: "코드를 성공적으로 업로드 하였습니다.",
  arduinoOpVerifiedTitle: "코드를 성공적으로 검토하였습니다.",
  arduinoOpOpenedTitle: "코드를 아두이노 IDE에서 열기",
  arduinoOpOpenedBody: "The sketch should be loaded in the Arduino IDE.",
  arduinoOpErrorUpVerTitle: "빌드 또는 업로드가 실패하였습니다.",
  arduinoOpErrorSketchTitle: "코드를 찾을 수 없습니다.",
  arduinoOpErrorFlagTitle: "Invalid command line argument",
  arduinoOpErrorFlagPrefTitle: "Preference passed to 'get-pref' flag does not exist",
  arduinoOpErrorIdeDirTitle: "Unable to find Arduino IDE",
  arduinoOpErrorIdeDirBody: "The compiler directory has not been set.<br>" +
                            "Please set it in the Settings.",
  arduinoOpErrorIdeOptionTitle: "What should we do with the Sketch?",
  arduinoOpErrorIdeOptionBody: "The launch IDE option has not been set.<br>" +
                               "Please select an IDE option in the Settings.",
  arduinoOpErrorIdePortTitle: "시리얼 포트를 사용할 수 없습니다.",
  arduinoOpErrorIdePortBody: "The Serial Port is not accessible.<br>" +
                             "Please check if the Arduino is correctly connected to the PC and select the Serial Port in the Settings.",
  arduinoOpErrorIdeBoardTitle: "Unknown Arduino Board",
  arduinoOpErrorIdeBoardBody: "The Arduino Board has not been set.<br>" +
                              "Please select the appropriate Arduino Board from the settings.",
  /* Modals */
  noServerTitle: "Ardublockly 앱이 정상적으로 작동되지 않고 있습니다.",
  noServerTitleBody: "<p>For all the Ardublockly features to be enabled, the Ardublockly desktop application must be running locally on your computer.</p>" +
                     "<p>If you are using an online version you will not be able to configure the settings nor load the blocks code into an Arduino.</p>" +
                     "<p>Installation instruction can be found in the <a href=\"https://github.com/carlosperate/ardublockly\">Ardublockly repository</a>.</p>" +
                     "<p>If you have Ardublockly already installed, make sure the application is running correctly.</p>",
  noServerNoLangBody: "If the Ardublockly application is not running the language cannot be fully changed.",
  addBlocksTitle: "Additional Blocks",
  /* Alerts */
  loadNewBlocksTitle: "Load new blocks?",
  loadNewBlocksBody: "Loading a new XML file will replace the current blocks from the workspace.<br>" +
                     "Are you sure you want to proceed?",
  discardBlocksTitle: "블록을 지울까요?",
  discardBlocksBody: "워크스페이스에 블록이 %1 개 있습니다 <br>" +
                     "정말로 모든 블록을 지울까요?",
  invalidXmlTitle: "Invalid XML",
  invalidXmlBody: "The XML file was not successfully parsed into blocks. Please review the XML code and try again.",
  /* Tooltips */
  uploadingSketch: "아두이노에 코드 업로딩...",
  uploadSketch: "아두이노에 코드 업로드",
  verifyingSketch: "코드 검토중...",
  verifySketch: "코드 검토하기",
  openingSketch: "아두이노 IDE에서 코드 여는 중..",
  openSketch: "아두이노 IDE에서 코드 열기",
  notImplemented: "Function not yet implemented",
  /* Prompts */
  ok: "OK",
  okay: "네",
  cancel: "취소",
  return: "돌아가기",
  /* Cards */
  arduinoSourceCode: "아두이노 소스 코드",
  blocksXml: "블록 XML",
  /* Toolbox Categories*/
  catLogic: "제어구조",
  catLoops: "반복",
  catMath: "수식",
  catText: "문자",
  catVariables: "변수",
  catFunctions: "함수",
  catInputOutput: "입출력",
  catTime: "시간",
  catAudio: "오디오",
  catMotors: "모터",
  catComms: "통신",
};
