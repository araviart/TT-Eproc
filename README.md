# TEST TECHNIQUE EPROC-FACTORY

https://github.com/user-attachments/assets/4f497896-4760-452f-8239-50ea9d2f42be

## Lancer le site

### Lancer l'API Platform 

Clonez l'API Platform  [API Platform](https://github.com/EprocFactory/technical-test_api-products/commits/main/)

Modifier le fichier CaddyFile :

```-{$SERVER_NAME:localhost} {``` - > ```http://{$SERVER_NAME:localhost} {```

Modifier le fichier compose.yaml 

```published: ${HTTP_PORT:-80}``` > ```published: 8080```


### Lancer l'application NextJS

Clonez le projet NextJS dans un repertoire différent de celui de l'API Platform.

Au sein du projet, installer les dépendances, ouvrez un terminal dans le répertoire du projet et exécutez la commande suivante pour installer toutes les dépendances listées dans package.json :

```
npm install
```

Démarrer le serveur de développementn lancez le serveur de développement avec la commande suivante :

```
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) avec le navigateur pour voir le résultat.

## Deploy on Vercel



## 1. Structure du projet

Ce projet utilise NextJS + Typescript et TailwindCSS (ShadcnUI) et utilise une API REST Symfony : [API Platform](https://github.com/EprocFactory/technical-test_api-products/commits/main/)

Le projet Next.js est organisé autour de routes groupées (shop) pour le côté boutique et (admin) pour le panneau d'administration ou se situe les fonctionnalitées CRUD. Cette organisation permet de ne pas impacter l'URL pour la partie boutique et de définir des layouts racine différents. Par exemple, nous ne souhaitons pas de footer lorsque nous naviguons sur le côté admin du site. [Route Groups Doc](https://nextjs.org/docs/app/building-your-application/routing/route-groups#creating-multiple-root-layouts)

Définir un layout racine et ne pas utiliser le groupage de roroutes ot m'aurait dirigé vers des layouts imbriqués peu-pratique dans mon cas.
 
Donc nous avons : 

- app/(shop) : Sous-dossier qui représente la boutique, contenant les pages principales liées aux produits.

- app/(shop)/layout.tsx : Définit la structure de la page pour l'affichage des produits (ex. entête, sections).

- (shop)/products/[category]/page.tsx : Fichiers pour gérer l'affichage des produits dans une catégorie, usage d'une route dynamique et de useParams pour récupèrer l'id de l'URL. [Dynamic Routes Doc](https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes)

- app/admin : route vers les pages admin
admin/[tab] : Fichier dynamique pour basculer entre différents onglets (produits et catégories) pour l'administration.

- admin/layout.tsx : Définit la structure pour l’interface d’administration, sans Footer donc.

- components : Répertoire qui contient les composants réutilisables tels que Navbar, Footer, ProductList, AdminCard pour afficher la liste des produits et les cartes d’administration, ainsi qu'un répertoire regroupant les composants Shadcn UI.

- forms : Répertoire qui contient les composants représentant les formulaires pour les produits et catégories, ainsi que les schémas associés à leur structure de données.

- hooks : Répèrtoire qui contient des hooks personnalisés pour la gestion des produits et des catégories. Je précise l'architecture pour l'API

- service : Répertoire qui gère la connexion avec les appels API.

- types : Interfaces utilisées pour représenter les structures de données Product et Category.

- lib : Répertoire qui contient des fonctions utilitaires (conversion de prix par exemple) et les polices d'écriture.

## 2. Architecture API

### Service API centralisé

Le projet contient un fichier centralisé pour effectuer les appels API, situé dans le répertoire service/api.ts.

```tsx
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080', 
  headers: {
    'Content-Type': 'application/ld+json',
  },
});
export const getProducts = () => api.get('/products');
export const getProduct = (id: string) => api.get(`/products/${id}`);
export const createProduct = (data: any) => api.post('/products', data);
```

Ces fonctions permettent d'effectuer les actions CRUD à travers des appels HTTP (GET, POST, PUT, DELETE).

### Hooks personnalisées

Ces fonctions sont utilisées dans des hooks personnalisés. Pour faciliter la gestion d'état (chargement, gestion d'erreurs) et une meilleure séparation des responsabilités, j'ai utilisé des hooks personnalisés que je peux appeler directement dans mes composants.

Par exemple, useProducts qui encapsule la logique pour récupérer et manipuler les données des produits, et useCategories pour les catégories.

src/hooks/useProducts

```tsx
import { useState, useEffect } from 'react';
import { getCategories, createCategory, updateCategory, deleteCategory } from '../service/api';
import { Category } from '@/types/Category';

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await getCategories();
      setCategories(response.data['hydra:member']);
    } catch (error) {
      setError(error instanceof Error ? error : new Error("Une erreur s'est produite"));
    } finally {
      setLoading(false);
    }
```

### Utilisation

src/components/products/ProductList.tsx

```tsx
import { useProducts } from '../hooks/useProducts'; // import hook personalisé

const ProductList = () => {
  const { products, loading, error } = useProducts(); //

  // affichage de la liste des produits une fois que les données ont été récupérées avec succès
  // on peut utiliser les état loading et error, j'ai par exemple utiliser le loading pour générée des styles Skeleton (style d'un composant qui charge)
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Nos Produits</h2>
      <div className="grid grid-cols-2 gap-4">
        {products.map((product) => (
          <ProductListing key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
```

# 3. Gestion des formulaires

https://github.com/user-attachments/assets/272568ed-04c6-4d09-b02f-c5a1aaf096ba

## React Hook Form

Le projet utilise la librairie React Hook Form pour la gestion des formulaires. Les formulaires sont contrôlés via le hook useForm, qui est configuré avec un resolver pour la validation via Zod. Grâce à useForm, les champs du formulaire sont liés à des objets de validation (productSchema), ce qui permet de déclencher la validation lors des interactions utilisateur.

Exemple : 

```tsx
const form = useForm<ProductFormValues>({
  resolver: zodResolver(productSchema), 
  defaultValues, 
});
```

## Zod

Zod est une bibliothèque de validation de données utilisée pour garantir que les données du formulaire respectent un format défini avant d’être soumises.

Contrôle des erreurs utilisateur : en renvoyant des messages d’erreurs personnalisés.
Assurance de l'intégrité des données : garantir que les données soumises respectent les contraintes du schéma.

Par exemple pour le schéma d'un produit : 

src/forms/productSchema.tsx

```tsx
export const productSchema = z.object({
  name: z.string().min(1, "Le nom est requis"),
  description: z.string().optional(),
  price: z.coerce.number().min(0, "Le prix doit être positif"),
  image: z.string().url().optional(),
  category: z.array(z.string()).min(1, "Au moins une catégorie est requise"),
});
```


## Données
 
defaultValues est utilisé pour pré-remplir les champs du formulaire lors de son initialisation. Le même formulaire est utilisé à la fois pour créer et modifier des données. Lorsqu'on modifie un produit ou une catégorie existante, les valeurs par défaut des champs (ex : nom, description, prix) doivent être les données actuelles du produit ou de la catégorie.

```tsx
<ProductForm
  isOpen={isDialogOpen}
  onClose={handleFormClose}
  onSubmit={handleProductFormSubmit}
  defaultValues={currentItem ? (currentItem as ProductFormValues) : undefined}
/>
```

Soumission :

```tsx
const handleSubmit = async (data: ProductFormValues) => {
  const isValid = await form.trigger();
  if (isValid) {
    onSubmit({
      ...data,
      category: selectedCategories,
    });
    onClose();
    form.reset();
  }
};
```


# 4. Expérience UI/UX avec TailwindCSS et ShadcnUI

## Description

Le projet utilise Tailwind CSS pour gérer la mise en page et le style de manière responsive. En effet les classes Tailwind permettent d’adapter rapidement l'interface en fonction de la taille de l'écran (mobile, tablette, desktop) grâce à des classes telles que sm:, md:, lg:.. En complément, Shadcn UI est intégré pour créer des composants d'interface utilisateur (UI) prêts à l'emploi avec un style cohérent et modulaire.

TailwindCSS combiné à ShadcnUI permet une vitesse de développement élevée, j'ai importé de nombreux composants que j'ai modifiée (par exemple la variante default du composant Button) pour répondre à mes besoins.

La page d'accueil du projet à était maquetté sur Figma. [Maquette Figma](https://www.figma.com/design/ywlQziaWYgRggcvcd6Ta4y/TestTechniqueEcommerce?node-id=0-1&t=ixKOB000dAY1JfSW-1)

Concepts : [Concept UX](https://www.visily.ai/blog/ux-design-principles/)

### 1. Retour visuel immédiat (Feedback)

https://github.com/user-attachments/assets/75f02d71-5e19-44aa-9398-7ffca84813b1

Il est essentiel de penser en "User-Centered Experience", c'est à dire se mettre à la place de l'utilisateur.
L’utilisateur doit toujours savoir ce qui se passe : si une action a été prise en compte, si une opération est en cours, ou s’il y a une erreur.


Par exemple, 

src/components/products/ProductList.tsx
 
```tsx 
import { Skeleton } from "@/components/ui/skeleton";

const ProductList = () => {
  const { products, loading, error } = useProducts();

  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {[...Array(8)].map((_, i) => (
          <Skeleton key={i} className="w-full h-48 rounded-lg" />
        ))}
      </div>
    );
  }

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

```
Expérience utilisateur améliorée : En montrant des Skeletons au lieu d’un écran vide pendant le chargement, l’utilisateur comprend que le système fonctionne et que les produits arriveront sous peu.

Ce principe est également respectée avec le composant ShadcnUI Toast utilisé dans les formulaires CRUD, en effet lorsqu'un utilisateur soumet son formulaire il sera notifié de la bonne ou mauvaisse soumission des données.

https://github.com/user-attachments/assets/77e0cfd7-ea0a-40e7-b48b-b563496acd3e

Par exemple,

```tsx
import { toast } from "@/components/ui/toast";

const handleSubmit = async () => {
  try {
    await submitForm();
    toast({
      title: "Succès",
      description: "Les données ont été soumises avec succès.",
    });
  } catch (error) {
    toast({
      variant: "error",
      title: "Erreur",
      description: "Une erreur est survenue lors de la soumission.",
    });
  }
};
```



## 2. Consistance (Consistency)

Les utilisateurs doivent retrouver les mêmes éléments avec les mêmes comportements à travers toute l’application. Cela réduit la charge cognitive et permet une utilisation intuitive de l’interface. L'utilisateur associe le style à l'action ; ces deux éléments doivent donc être cohérents.

Shadcn UI et Tailwind CSS assurent cette consistance :
Composants réutilisables : Avec Shadcn UI, tous les composants (comme les boutons, les modales, les menus déroulants, etc.) sont stylisés de manière cohérente en utilisant Tailwind CSS. 

Peu importe où l’utilisateur rencontre ces composants (un bouton ou un menu déroulant), ils fonctionneront et auront le même style à chaque fois.

Ce concept est en lien avec la clarté visuelle. Les espaces et alignements influant également sur la hiérarchie visuelle.

## 3. Accessibilité

Le site est entièrement responsive (admin et shop) notamment grâce aux breakpoints que fournit TailwindCSS

https://github.com/user-attachments/assets/a1a48828-7f4d-4273-8090-260fe40e6569

# Perspectives d'évolution

## Optimisation des appels API avec un système de cache :

Une des principales problématiques que j'ai rencontré est la lenteur des appels API et des réponses. 

Pour résoudre cette lenteur, l'implémentation d'un système de mise en cache est judicieux :

React Query (ou TanStack Query) qui permet de : 
- Cacher les données après leur première récupération, pour éviter les appels répétés à l'API.
- Invalidation automatique du cache en fonction de certaines actions (ajout, modification, suppression).

## Fonctionnalitées d'un site E-Commerce

- Modifier la structure de l'API pour inclure les users
- Ajouter l'authentification
- Utiliser le Context ou Redux pour la gestion des paniers
- Intégration de Stripe pour les paiements
- Page du produit
- Améliorer l'accessibilité
Ect..
