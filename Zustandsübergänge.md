### Zustandsünergänge

# benötigte Variablen
- Array aus Tupeln von {Name, Status, Selection, Points}
    - Name ist der vom Spieler:in gewählte Name
    - Status speichert für jede:n Spieler:in, ob sie:er schon Fotos hochgeladen hat als boolean
    - Selection speichert pro Runde den:die ausgewählte:n Spieler:in. Zu Beginn ist dies überall auf NULL gesetzt
    - Points speichert den Punktestand des:der Spielr:in
- default ist (Name, false, NULL, 0)
- int numRounds
- Events, die jemand schickt, sollte auch diese Person selber bekommen


# Event: "Name JoinGame"
- Effekt: im Array wird dieser Name mit Status false hinzugefügt

# uploadPhotos
- Lobby-> Lobby
- Vorbedingung: eigener status = false
- Nachbedingung: 
    - send Event "Name Photoupload"
    - Fotos sind hochgeladen (wo werden sie gespeichert?)

# Event: "Name Photoupload"
- Effekt: im Array wird für diesen Name, der Status auf true gesetzt
- dies wird im UI angezeigt

# startGame
- Lobby -> Round(viewPhoto)
- Vorbedingung: Für alle Elemente im Array muss der Status = true sein
- Nachbedingung: 
    - Zustand wurde gewechselt und es wird das erste Bild angezeigt
    - send Event: "GameStart"

# Event: "GameStart"
- Lobby -> Round(viewPhoto)
- resete den Punktestand von allen Spielr:innen auf 0
- resete den Status von allen Spieler:innen auf false

# selectPerson
- viewPhoto -> viewPoints
- Nachbedingung
    - sendEvent(Name1 selected Name2)

# Event: "Name1 selected Name2"
- im Array Selection wird Name2 als ausgewählter Name für Name1 hinzugefügt

# roundFinished
- viewPhoto -> viewPoints
- Sobald alle Spieler:innen einen Namen ausgewählt haben, ist die Runde beendet
- Vorbedinung: Für alle Elemente der Liste Selection muss ausgewählterName!=Null sein
- Nachbedingung:
    - sendEvent(roundFished)
    - CalculatePoints: Alle Spieler:inen die richtig geraten haben, bekommen einen Punkt

# Event:"roundFinished"
-  viewPhoto -> viewPoints
- calculatePoints

# moveOn
- viewPoints -> viewPhoto
- es geht weiter mit dem nächsten Foto, sobald eine Person auf "Weiter klickt"
- an dieser Stelle könnte noch eingefügt werden, dass der owner des Fotos, dieses nochmal anzeigen kann und dann auch die einzige Person ist, die auf Weiter klicken 
- numRounds ++
- Selection wird für alle reseted auf NULL

# finishGame
- nach 20 Runden soll das Spiel beendet werden 
- viewPoints -> Lobby
- in der Lobby soll dann nochmal der Endpunktestand angezeigt werden