import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchProduct = async () => {
    const response = await axios.get('https://fakestoreapi.com/products/1');

    console.log('response', response.data)
    return response.data;
  };


function MyComponent(){

    const {data,isLoading,error} = useQuery({
        queryKey: ['product'], 
        queryFn: fetchProduct,  
      });
console.log('data :>> ', data);
    if(isLoading) return <div>Loading...</div>
    if(error) return <div>Error :{error.message}</div>






return (


<div>
      <h1>{data.description}</h1>
      <p>{data.title}</p>
    </div>

   
)




}

export default MyComponent;