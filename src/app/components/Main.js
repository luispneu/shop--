"use client"
import { useEffect,useState } from "react";
import Image from "next/image";
import style from "../page.module.css";
import Spinner from "./Spinner";


export default function Main() {
  const [listProduct, setProduct] = useState([]);
  const [listComplete, setlistComplete] = useState([]);
  const [textSearch, setTextSearch] = useState("");



  useEffect(() => {
    const getProduct = async () => {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      setProduct(data);
    }
    getProduct();
  }, []);
  const orderAz=() =>{
  const listAux = [...listProduct].sort((a, b) =>
    a.title.localeCompare(b.title));
    setProduct(listAux)
  }
  const Search = (text) => {
    setTextSearch(text);
    if (text == "")  {
      setlistProduct(listComplete);
      return
    }
  }

  const orderZa=() =>{
    const listAux =[...listProduct].sort((a,b)=>
    a.title.localeCompare(b.title) );
    listAux = listAux.reverse();
    setProduct(listProduct);
  }
  const ordeP=() =>{
    const listAux =[...listProduct].sort((a,b)=>
    a.price.localeCompare(b.price) );
    setProduct(listAux)
  }
  const ordePRV=() =>{
    const listAux =[...listProduct].sort((a,b)=>
    a.price.localeCompare(b.price) );
    listAux = listAux.reverse();
    setProduct(listProduct);
  }
  if (listProduct[0]== null){
    return <Spinner/>
  }
  return (
    <>
      <div className={"styles.filter"}>
      <input type="text" value={TextSearch}
          placeholder="Pesquise um produto"
          onChange={(event) =>} />
        <div>
        <button onClick={ordePRV}></button>
        <button onClick={ordeP}></button>
        <button onClick={orderZa}>Za</button>
          <button onClick={orderAz}>Az</button>
        </div>
      </div>
      <main className={style.body}>
        {listProduct.map((product) => (
          <div className={style.card} key={product.id}>
            <h1 className={style.title}>{product.title.slice(0, 16) + "..."}</h1>
            <Image
              width={300}
              height={300}
              src={product.image}
              alt={product.title}
              className={style.image}
            />
            <h3 className={style.price}>R$: {product.price}</h3>
            <p className={style.description}>{product.description.slice(0, 78) + "..."}</p>
            <p className={style.category}>{product.category}</p>
            <p>Estoque:{product.rating.count}</p>
          </div>
        ))}
      </main>
    </>
  );
}
