export interface Product {
    id: string;
    description: string;
    images: string[];
    inStock: number;
    price: number;
    sizes: ValidSizes[];
    slug: string;
    tags: string[];
    title: string;
    //type: ValidTypes;
    gender: 'men'|'women'|'kid'|'unisex'
}

export interface ProductInCart {
    id: string;
    slug: string;
    title: string;
    price: number;
    quantity: number;
    size: ValidSizes;
    image: string;
}

export interface ProductInOrder {
    id: string;
    quantity: number;
    size: ValidSizes;
    image: string;
    title: string;
    slug: string;
    price: number;
}

export type ValidSizes = 'XS'|'S'|'M'|'L'|'XL'|'XXL'|'XXXL';
export type ValidTypes = 'shirts'|'pants'|'hoodies'|'hats';