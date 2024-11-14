export const mappingDataFoodItem = (dataApi: any[]) => {
  return dataApi?.map((item) => {
    return {
      id: item.id,
      image: item.imageFoods[0]?.image,
      rate: 0,
      name: item.name,
      price: Number(item.price) ?? 0,
      discountPercent: 15,
      isFavorite: false,
    };
  });
};
