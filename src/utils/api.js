
async function fetchData() {
    try{
      const response = await fetch('https://api.escuelajs.co/api/v1/products');
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    }catch(error){
        console.error("Error fetching data:", error);
    }
}

export default fetchData;