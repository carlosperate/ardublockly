var Ardublockly = Ardublockly || {};
Ardublockly.LOCALISED_TEXT = {
  translationLanguage: "Deutsch",
  title: "Ardublockly",
  blocks: "Blöcke",
  /* Menu */
  open: "Öffnen",
  save: "Speichern",
  deleteAll: "Alles löschen",
  settings: "Einstellungen",
  documentation: "Dokumentation",
  reportBug: "Report Bug",
  examples: "Beispiele",
  /* Settings */
  compilerLocation: "Arduino Verzeichnis",
  compilerLocationDefault: "Arduino Verzeichnis unbekannt",
  sketchFolder: "Sketch Verzeichnis",
  sketchFolderDefault: "Sketch Verzeichnis unbekannt",
  arduinoBoard: "Arduino Board",
  arduinoBoardDefault: "Arduino Board unbekannt",
  comPort: "COM Port",
  comPortDefault: "COM Port unbekannt",
  defaultIdeButton: "Default IDE Taste",
  defaultIdeButtonDefault: "IDE Optionen unbekannt",
  language: "Sprache",
  languageDefault: "Sprache unbekannt",
  sketchName: "Sketch Name",
  /* Arduino console output */
  arduinoOpMainTitle: "Arduino IDE Code",
  arduinoOpWaiting: "Warte auf den Arduino Code...",
  arduinoOpUploadedTitle: "Sketch erfolgreich geladen",
  arduinoOpVerifiedTitle: "Sketch erfolgreich verifiziert",
  arduinoOpOpenedTitle: "Sketch in Arduino IDE geöffnet",
  arduinoOpOpenedBody: "Der Sketch sollte in der Arduino IDE geladen sein.",
  arduinoOpErrorTitle: "Es ist ein Fehler aufgetreten",
  arduinoOpErrorIdContext_0: "Keine Fehler.",
  arduinoOpErrorIdContext_1: "Kompilieren oder Hochladen fehlgeschlagen.",
  arduinoOpErrorIdContext_2: "Sketch nicht gefunden.",
  arduinoOpErrorIdContext_3: "Ungültiges Argument.",
  arduinoOpErrorIdContext_4: "Präferenz weitergegen zu 'get-pref' existiert nicht.",
  arduinoOpErrorIdContext_5: "Nicht klar, aber Arduino IDE zeigt manchmal Fehler.",
  arduinoOpErrorIdContext_50: "Unerwarteter Fehler von Arduino IDE",
  arduinoOpErrorIdContext_51: "Konnte Sketch Datei nicht erzeugen",
  arduinoOpErrorIdContext_52: "Ungültiger Pfad um Sketch Datei intern zu erzeugen",
  arduinoOpErrorIdContext_53: "Arduino IDE nicht auffindbar<br>" +
                              "Das Kompiliererverzeichnis ist nicht korrekt eingestellt.<br>" +
                              "Bitte überprüfe den korrekten Pfad für den Kompilierer in Settings.",
  arduinoOpErrorIdContext_54: "Was soll mit dem Sketch gemacht werden?<br>" +
                              "Das Arduino IDE Programm Option ist noch nicht eingestellt.<br>" +
                              "Bitte wähle die Arduino IDE Option in Settings.",
  arduinoOpErrorIdContext_55: "Serial Port nicht verfügbar<br>" +
                              "Das Serial Port ist nicht erreichbar.<br>" +
                              "Bitte überprüfe, ob der Arduino mit dem Computer verbunden ist und wähle das richtige Serial Port in Settings.",
  arduinoOpErrorIdContext_56: "Unbekanntes Arduino Board<br>" +
                              "Das Arduino Board wurde noch nicht definiert.<br>" +
                              "Bitte wähle das richtige Arduino Board von Settings.",
  arduinoOpErrorIdContext_52: "Unerwarteter Server Fehler.",
  arduinoOpErrorIdContext_64: "Unmöglich den zu JSON gesendeten Code zu analysieren.",
  arduinoOpErrorUnknown: "Unerwarteter Fehler",
  /* Modals */
  noServerTitle: "Ardublockly app not running",
  noServerTitleBody: "<p>Um alle Ardublockly Features zu nutzen, ist es notwendig diese Software auf einem lokalen Computer zu benutzen.</p>" +
                     "<p>Falls dies eine Online Version ist, wirst Du die Settings nicht speichern und/oder den Code nicht auf den Arduino laden können.</p>" +
                     "<p>Installationshinweise hier >> <a href=\"https://gitlab.com/DigitalStages/ardublockly\">Ardublockly repository</a>.</p>" +
                     "<p>Wenn Ardublockly bereits installiert ist, lese die Installationsdokumentation.</p>",
  noServerNoLangBody: "Wenn die Ardublockly Applikation nicht läuft, kann die Sprache nicht vollständig geändert werden.",
  addBlocksTitle: "Zusätzliche Blöcke",
  /* Alerts */
  loadNewBlocksTitle: "Neue Blöcke laden?",
  loadNewBlocksBody: "Laden einer neuen XML Datei wird die momentanen Blöcke von der Arbeitsfläche entfernen.<br>" +
                     "Möchtest du fortfahren?",
  discardBlocksTitle: "Blöcke löschen?",
  discardBlocksBody: "%1 Blöcke auf der Arbeitsfläche.<br>" +
                     "Bist du sicher dies zu löschen?",
  invalidXmlTitle: "Ungültiger XML",
  invalidXmlBody: "Die XML Datei wurde nicht erfolgreich in Blöcke analysiert. Bitte überprüfe den XML code und versuche es erneut.",
  /* Tooltips */
  uploadingSketch: "Lade Sketch in den Arduino...",
  uploadSketch: "Lade Sketch zum Arduino",
  verifyingSketch: "Verifiziere Sketch...",
  verifySketch: "Verifiziere den Sketch",
  openingSketch: "Öffne Sketch in der Arduino IDE...",
  openSketch: "Öffne Sketch in IDE",
  notImplemented: "Funktion noch nicht implementiert",
  /* Prompts */
  ok: "OK",
  okay: "Okay",
  cancel: "Abbruch",
  return: "Rückgabe",
  /* Cards */
  arduinoSourceCode: "Arduino Source Code",
  blocksXml: "Blocks XML",
  /* Toolbox Categories*/
  catLogic: "Logik",
  catLoops: "Schleife",
  catMath: "Mathe",
  catText: "Text",
  catVariables: "Variable",
  catFunctions: "Funktion",
  catInputOutput: "Eingang/Ausgang",
  catTime: "Zeit",
  catAudio: "Audio",
  catMotors: "Motor",
  catComms: "Kommunikation",
  catSensors: "Sensor",
  catDisplays: "Bildschirm",
  catVarious: "Verschieden",
};
