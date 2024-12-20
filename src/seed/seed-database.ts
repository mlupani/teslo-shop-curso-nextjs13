import { initialData } from "./seed";
import prisma from "../lib/prisma";

async function main(){
    // 1. delete all info in tables
    //await Promise.all([

    await prisma.orderAddress.deleteMany();
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();

    await prisma.productImage.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();
    await prisma.user.deleteMany();
    await prisma.country.deleteMany();
    //]);

    const { categories, products, users, countries } = initialData

    // 2. categories
    await prisma.category.createMany({ data: categories.map(name => ({name})) });

    // 3 map categories
    const categoriesDB = await prisma.category.findMany();
    const categoriesMap = categoriesDB.reduce((acc, category) => {
        acc[category.name.toLowerCase()] = category.id;
        return acc;
    }, {} as {[key: string]: string});

    // 4 products
    products.forEach(async product => {
        const { type, images, ...rest } = product;
        const categoryId = categoriesMap[type.toLowerCase()];

        const productDB = await prisma.product.create({
            data: {
                ...rest,
                categoryId
            }
        });

        // 5 images
        await prisma.productImage.createMany({
            data: images.map(image => ({
                url: image,
                productId: productDB.id
            }))
        });

    })

    // 6 users
    await prisma.user.createMany({ data: users });

    // countries
    await prisma.country.createMany({ data: countries });


    console.log('Database seeded!');
}

(async () => {
    await main();
})();
