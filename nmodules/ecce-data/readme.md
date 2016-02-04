

http://stackoverflow.com/questions/11340852/how-to-create-client-side-full-text-search-engine-with-pure-javascript-and-html5

--- lunr
http://lunrjs.com/
https://www.new-bamboo.co.uk/blog/2013/02/26/full-text-search-in-your-browser/

--- fullproof
https://github.com/reyesr/fullproof
http://kornr.net/prez/paris.js22/



François Bayrou en Hollande

Catherine Deneuve

Dès qu'un utilisateur teste la recherche des photos du 8 avec plusieurs mots il ne trouve pas les images. Exemple du jour, la recherche avec les 2 mots "Catherine Deneuve" remonte plein d'image avec "Catherine" et sans "Deneuve" alors qu'il y a plein d'images avec "Catherine Deneuve"

On a sans doute le même problème dans la recherche dans les dépêches, à vérifier.


REUTERS

Suite à une remontée de Alexandre Pouchard on a testé le cas problématique suivant:

    une recherche sur "obama" remontent (assez bas dans la liste) des images avec merkel (i.e. il y a bien des images avec "obama" et "merkel" dans les métas)
    une recherche avec "obama merkel" remontent plein d'image avec Merkel seulement et sans Obama





Observations :

    "Ce n'est pas normal que les premiers résultats de la recherche "obama merkel" ne contiennent pas le mot "obama"."
    le TextAnalyzer ne matche jamais rien
    le PhoneticAnalyzer matche trop en mode PHRASE ou TERM_AND_PHRASE (merkel seule avec une query "obama merkel")
    le StandardAnalyzer marche bien mais est manquant sur de nombreux schémas
    [edit] dans les tests manuels effectués avec @desbouis, nous avons observé un comportement inexpliqué du PhoneticAnalyzer qui semble se focaliser sur Merkel et ignorer complètement obama...

Proposition de David :

    corriger les index avec : (repris d'un exemple OSS)

text : indexed, stored (si besoin dans la réponse), TextAnalyzer
+  text_standard_analyzer: indexed, StandardAnalyzer, copyof text
+  text_phonetic_analyzer: indexed, PhoneticAnalyzer, copyof text

puis changer le mode de requête à TERM plutôt que TERM_AND_PHRASE

Point à vérifier :

    puisqu'on supprime PHRASE (nécessaire pour éviter les résultats «merkel» seul sur recherche «obama merkel»), "François Hollande" matchera aussi bien «François Hollande» que «François Dupont photographié pan Bruno Hollande» est-ce gênant ?
    comment migrer les indexes ? brutal ou subtil ?
    fait-on une migration d'abord sur un index peu critique (images pour l'instant) puis dans une autre PR sur les articles ?
    vérifier si possibilité de renommage des indexes au passage
    vérifier recherche par id si toujours ok ou si besoin de la rendre plus subtile
    en profiter pour faire une passe sur les indexed/stored si on peut nettoyer au passage, rappel : le "unique field" (id) doit toujours être indexé, de même que le "default field"




La recherche avec plusieurs mots dans le huit n'était pas fiable. Dans la plupart des templates que nous utilisions dans OSS, aucun opérateur par défaut n'était précisé, ce qui veut dire que ces requêtes étaient effectuées avec un opérateur "OR". Une recherche "obama merkel" renvoyait les images contenant les deux mots, ou un seul.

Le bug des stop words dans la recherche d'articles (#2394) était lié à ce problème : (normément de résultats renvoyés sur "tableau de monet" à cause de la recherche sur "tableau" ou "de" ou "monet".

Cette PR :

    Corrige le problème de la recherche d'articles
    Ajoute dans les templates de recherche utilisés côté serveur et concernés par la recherche textuelle l'opérateur "AND" par défaut (il devait auparavant être manuellement défini côté client)

    Ajoute des tests e2e sur des recherches avec plusieurs mots pour s'assurer qu'une recherche que les résultats sont correctement filtrés (e.g. "Catherine Deneuve" ne renvoie que les articles où les deux mots apparaissent)

    Corriger les stopwords - Configuration manuelle nécessaire pour OSS ajoutée dans le wiki
    Tester le tri correct des résultats de recherche (demande la création des fixtures via knex et un refactoring pour exposer les méthodes pour déclencher des indexations) et la recherche de news (labels de tests e2e vides ajoutés) - Dans une PR séparée.



