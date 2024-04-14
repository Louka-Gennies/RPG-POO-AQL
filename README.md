# RPG-POO-AQL

## Objectif du devoir

Le but de ce projet est de vous faire travailler et évaluer les concepts de programmation orientée objet vus au cours du projet.

Il s'agira d'un petit jeu en ligne de commande permettant de faire des combats de type RPG en mode texte. Les personnages seront contrôlés par l'utilisateur et des monstres auront une IA simpliste.

Les choix du joueur se feront à travers des menus en ligne de commande.

🚧 L'architecture devra être orientée objet, et moins de dix lignes de code devront pouvoir être trouvées en dehors de classes!

## Lancer le programme

Il y a un fichier .bat, il faut juste le lancer, cela ouvrira une invite de commande et vous pourrez jouer au jeu.

Si vous ne pouvez pas le lancer de cette manière, il faudra installer Deno.

### Windows (Powershell)

```C
irm https://deno.land/install.ps1 | iex
```

### Linux (Using Shell)

```C
curl -fsSL https://deno.land/install.sh | sh
```

### MacOS (Using Shell)

```C
curl -fsSL https://deno.land/install.sh | sh
```

Ensuite, il faudra lancer le programme avec la commande suivante :

```C
deno run --allow-env main.ts
```

## Fonctionnalité : Interaction joueur

Le programme fonctionne en affichant une série de questions ou de menus numérotés. Le joueur doit alors choisir une option en saisissant le numéro correspondant via le clavier.

## Langage utilisé

TypeScript uniquement
