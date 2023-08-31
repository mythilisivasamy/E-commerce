import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'Mythili',
      email: 'admin@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: true,
    },
    {
      name: 'Mahi',
      email: 'user@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: false,
    },
  ],
  products: [
    {
      name: 'Lilliput casuals',
      slug: 'lilliput-casuals',
      category: 'Casuals',
      image: './images/kids/casual-1.jpg', // 679px × 829px
      price: 350,
      countInStock: 10,
      brand: 'Lilliput',
      rating: 4.5,
      numReviews: 10,
      description: 'high quality Dresses',
    },
    {
      name: 'Max Casuals',
      slug: 'max-casuals',
      category: 'Casuals',
      image: './images/kids/casual-2.jpg', // 679px × 829px
      price: 250,
      countInStock: 10,
      brand: 'Max',
      rating: 4.5,
      numReviews: 10,
      description: 'high quality Dresses',
    },

    {
      name: 'Adidas Fit Shirt',
      slug: 'adidas-fit-shirt',
      category: 'Shirt',
      image: './images/men/casual-1.jpg',
      price: 500,
      countInStock: 0,
      brand: 'Adidas',
      rating: 4.0,
      numReviews: 10,
      description: 'high quality product',
    },
    {
      name: 'Indian Terrain Shirt',
      slug: 'indian-terrain-shirt',
      category: 'Shirt',
      image: './images/men/casual-2.jpg',
      price: 425,
      countInStock: 15,
      brand: 'Indian Terrain',
      rating: 4.5,
      numReviews: 14,
      description: 'high quality product',
    },
    {
      name: 'Max Shirt',
      slug: 'Max-shirt',
      category: 'Shirt',
      image: './images/men/casual-3.jpg',
      price: 2065,
      countInStock: 5,
      brand: 'Max',
      rating: 4.5,
      numReviews: 10,
      description: 'high quality product',
    },
    {
      name: 'Allen Solly Shirt',
      slug: 'Allen-Solly-shirt',
      category: 'Shirt',
      image: './images/men/casual-6.jpg',
      price: 2065,
      countInStock: 5,
      brand: 'Allen Solly',
      rating: 4.5,
      numReviews: 10,
      description: 'high quality product',
    },
    {
      name: 'Peter England Shirt',
      slug: 'Peter England-shirt',
      category: 'Shirt',
      image: './images/men/casual-7.jpg',
      price: 2065,
      countInStock: 5,
      brand: 'Peter England',
      rating: 4.5,
      numReviews: 10,
      description: 'high quality product',
    },
  ],
};
export default data;
