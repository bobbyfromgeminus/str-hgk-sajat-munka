const ProductsService = async (productApi) => {

    let products = await productApi.get();
  
    const sum = async () => {
      let sumProductsPrices = 0;
      await products.map( product => {
        sumProductsPrices += (product.count * product.price)
      })
      return sumProductsPrices;
    };
  
    const avg = async () => {
      let avgPriceCount = 0;
      await products.map( product => {
        (avgPriceCount += product.price) / products.length
      })
      return avgPriceCount;
  
    };
  
    const lessthan = async (count) => {
      return await products.filter( product => product.count < count )
    };
  
    return {
      sum,
      avg,
      lessthan
    };
  }
  
  module.exports = ProductsService;