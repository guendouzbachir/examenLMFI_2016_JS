Groupe

Guendouz Bachir
Humbert Thibaut

A faire

L'application ayant étant codé en utilisant nginx, en faisant un npm start dans le dossier frontend ce dernier n'appliquera que "npm run tsc:w". Pour utiliser lite-server il faut modifier package.json avec : "start": "concurrently \"npm run tsc:w\" \"npm run lite\"".

La base de données mongo pour l'utilisation du backend est "todomvc-db".

A noter

Sur aucune de nos machines disponibles lite-server n'a pu fonctionner, donc de notre experience il est nécéssaire de recharger la page après avoir mis à jour un todo ou encore après créé un todo. Nous ne savons pas comment se comportera l'application avec lite-server.
