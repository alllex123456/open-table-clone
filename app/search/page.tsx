import React from 'react';
import { PRICE, PrismaClient, Review } from '@prisma/client';

import Header from './components/Header';
import SearchSideBar from './components/SearchSideBar';
import RestaurantCard from './components/RestaurantCard';

export const metadata = {
  title: 'Search | OpenTable',
};

const prisma = new PrismaClient();

interface SearchParams {
  city?: string;
  cuisine?: string;
  price?: PRICE;
}

const select = {
  id: true,
  name: true,
  main_image: true,
  price: true,
  cuisine: true,
  location: true,
  slug: true,
  reviews: true,
};

const fetchRestaurantsByLocation = async (searchParams: SearchParams) => {
  const where: any = {};

  if (searchParams.city) {
    where.location = { name: { equals: searchParams.city.toLowerCase() } };
  }
  if (searchParams.cuisine) {
    where.cuisine = { name: { equals: searchParams.cuisine.toLowerCase() } };
  }
  if (searchParams.price) {
    where.price = { equals: searchParams.price };
  }

  return await prisma.restaurant.findMany({
    where,
    select,
  });
};

const fetchLocations = async () => {
  return await prisma.location.findMany();
};

const fetchCuisines = async () => {
  return await prisma.cuisine.findMany();
};

const SearchPage = async ({ searchParams }: { searchParams: SearchParams }) => {
  const restaurants = await fetchRestaurantsByLocation(searchParams);

  const locations = await fetchLocations();
  const cuisines = await fetchCuisines();
  return (
    <>
      <Header />
      <div className="flex py-4 m-auto w-2/3 justify-between items-start">
        <SearchSideBar
          locations={locations}
          cuisines={cuisines}
          searchParams={searchParams}
        />
        <div className="w-5/6">
          {restaurants.map((restaurant, index) => (
            <RestaurantCard key={index} restaurant={restaurant} />
          ))}
        </div>
      </div>
    </>
  );
};

export default SearchPage;
