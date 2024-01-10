** Projektstellung**

Als ein Schulprojekt war es die Aufgabe ein Spiel mit Javascript zu Programmieren. Unsere Gruppe hat sich dazu entschieden eine Gameengine zu schreiben und mit dieser ein Schere Stein Papier Spiel, wie auch Snake darzustellen. 

** Installierung und Starten**

Um die Applikation ausführen zu können benötigt man npm. Als erstes müssen die Node modules installiert werden mit; 

npm install 

Um den Localhost server zu starten benötigt man den Command;

npm start


** Die Engine **

Die Dateien main.js, scene.js, screen.js, Element.js und settings.js sind der Hauptbestandteil der Engine.

Main.js ist hier der Start und Hauptdrehpunkt. In dieser Datei wird die gesammte Engine initiallisiert, Daten an die richtige stelle weitergeleitet, Events gehandelt und die Iteration überwacht.

Scene.js ist die Datei zuständig um alles was sich in der aktuellen Szene befindet abzuarbeiten. Es ist sozusagen die zwischen Instanz zwischen Main.js und den verschiedenen Canvas Elementen.

Screen.js wird dafür verwendet um verschiedene befehle spezifisch für das jeweilige Canvas Element auszuführen.

Element.js hier befinden sich alle aktuell dargestellten Elemente. Nicht nur das was auf dem Bildschirm selbst sein soll, sondern auch logiken werden den Elementen hier zugefügt.

im Inputcontrolles Ordner befinden sich die verschiedenen Inputmöglichkeiten. Das wäre einmal der Mauszeiger in Pointer.js und die Keyboard events in Keys.js. Sie beinhalten die Daten zu möglichen Events bei den von Ihnen initialisierten Event listeners. Die Events selbser oder auch wann genau ein Event getriggert wird, wird in anderen Dateien gehandhabt.

actions sind die Events an sich. Nach einem klassischen Entity Component System, wären das die components. Hier befinden sich Logiken, Listener, wie auch eine call method wenn das Event getriggered wird.

An sich ist es schon Möglich was man möchte darzustellen in dem man neue actions hinzufügt und in Data.json neue Elemente beifügt. Es ist allerdings noch ein wenig umständlich und neu generierte actions müssen noch bei ihrer entsprechenden Inputcontrolles eingetragen werden, wie auch der action.Listener in der richtigen Methode vermerkt werden.

Mit der korrekten Notation erfüllt diese Engine allerdings den anspruch dieses Projektes und es lässt sich nur durch änderungen in data.json, also den Daten zum aussehen und vermerk zu actions an denen sie gebunden werden müssen, dem schreiben einer gewollten action für ein bestimmtes Event und dem eintragen dieser action, nahezu alles darstellen.

** Notation **

data.json oder besser gesagt Elemente

data.json muss folgenden aufbau erfüllen.

"index":[]      beinhaltet den namen jeder szene mit gleicher Reihenfolge wie scenes und ist sozusagen ein Inhaltsverzeichnis

"scenes" : [    Die tatsätchlichen Daten jeder szene

    {  Objekt mit Daten einer bestimmten szene

        "name":"szenenname", "index": "szenenindex",

        "ui":[  szenenelemte welche sich auf der ui Ebene befinden

            { Objekt des Elements

                "type":"Typ des Elements", "name":"name des Elements", "pos":{"x":"x-position des Elements", "y":"y-position des Elements"}, dim:{"w":"breite des gesammten elements", "h":"höhe gesammtes Element"},
                    "actions":[ actions welche dem Element zugeschrieben werde
                        {"type":"typ der action", "value":"Wert dieses Elements"},
                        ... Angemerkt, der value einer action kann für jedes Element eine andere sein für die selbe action
                    ],
                    "display":[ beinhaltet alle Daten um mit das Element im Canvas darzustellen
                                Zu beachten ist, dass es hier informationen gibt, welche die draw function immer brauch und solche, welche nur für spezifische Formen oder für Images gebraucht werden.
                            {
                                "type":"Pflicht und ist rect, text, circle oder image", "x":"Pflicht, x-position", "y":"Pflicht, y-position", "w":"Pflicht", 
                                "maxw":"freiwillig", "h":"Pflicht bei rect", "r":"Pflicht für circle","size":"pflicht bei text", "text":"Pflicht für text",
                                "img":"Pflicht, Bild url", "color":"freiwillig", "composition":"boolean, ob compostion einstellungen im canvas verwendet werden sollen", "comp":"wert der compositon einstellung"
                            },
                            ....
                    ],
                    .....
            }
        ],
        "entitys":[ szenenelemte welche sich auf der main Ebene befinden
            ...
        ],
        "bg":[ szenenelemte welche sich auf der background Ebene befinden
            ...
        ]

    }, ....

]

Notation für actions

export default class action {
  static #attached = [];
  static #index = [];
  

  //adding elements with respective actions to this.#attached
  static add(obj) {
    // Push Elements in this.#attached
    this.#attached.push(obj);

    // get an reference array for each obj name, (This is an unnecessary step and will be removed in the future)
    this.#index.push(obj.name);

  }

  //Remove an Element from this.#attached by it's name
  static removebyname(name) {
    //find the right index for removal and safe it in c
    var c = this.#index.indexOf(name);
    //check if anything is found and when there is something delete one entry at index c
    c = -1
      ? console.log("error no element found")
      : this.#attached.splice(c, 1);
  }

  //remove all Elements from this.#attached and this.#index
  static removeAll() {
    this.#attached.splice(0, this.#attached.length);
    this.#index.splice(0, this.#index.length);
    return;
  }

  // method called when when an event triggers this action
  static action(resolve) {
   

  }

  // the listener, watcher or conditions for this action to trigger
  static listener() {
    // code that handles when and how an event happens
   
  }
}




** Ressources **

https://www.youtube.com/watch?v=Y2NUdjkt5M4&t=1587

