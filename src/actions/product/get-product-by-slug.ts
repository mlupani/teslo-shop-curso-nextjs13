'use server'

import prisma from "@/lib/prisma"

type Props = {
    slug: string
}

export const getProductBySlug = async ({ slug }: Props) => {
    try {
        const product = await prisma.product.findFirst({
            include: {
                productImage: {
                    select: {
                        id: true,
                        url: true,
                        productId: true
                    },
                }
            },
            where: {
                slug
            }
        })

        if(!product) return null;

        return {
            ...product,
            images: product.productImage.map((image) => image.url)
        }
    } catch (error) {
        throw new Error('Error getting product by slug')
    }
    
}