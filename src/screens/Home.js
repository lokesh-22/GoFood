import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'


export default function Home() {
const  [foodCat,setFoodcat] = useState([])
const [foodItem,setFoodItem] = useState([])
const [search,setSearch] = useState('')

const loadData = async () => {
  try {
    let response = await fetch("http://localhost:5000/api/displaydata", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    response = await response.json();
    setFoodItem(response[0]);
    setFoodcat(response[1]);
  } catch (error) {
    console.error('Error fetching data:', error);
    
  }
};


useEffect(()=>{
  loadData()
},[])



  return (
    <>
    <div> <Navbar/> </div>
    <div>
        <div id="carouselExampleControls" className="carousel slide " data-bs-ride="carousel" style={{objectFit:"contain !important"}}>
    <div className="carousel-inner" id='carousel'>
    <div className="carousel-caption " style={{zIndex:"10"}}>
    <div className="d-flex justify-content-center">
      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
      
    </div>
      </div>
      <div className="carousel-item active">
        <img src="https://source.unsplash.com/random/900x700/?pizza" className="d-block w-100" alt="..."/>
      </div>
      <div className="carousel-item">
        <img src="https://source.unsplash.com/random/900x700/?burger" className="d-block w-100" alt="..."/>
      </div>
      <div className="carousel-item">
        <img src="https://source.unsplash.com/random/900x700/?biryani" className="d-block w-100" alt="..."/>
      </div>
    </div>
    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Previous</span>
    </button>
    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
      <span className="carousel-control-next-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Next</span>
    </button>
  </div>
  </div>
    <div className='container'> 
    {
      foodCat.length !== 0
      ? foodCat.map((data)=>{
        return(
          <div className='row mb-3'>
            <div key={data._id} className='fs-3 m-3'>
            {data.CategoryName}
            </div>
            <hr/>
            {
              foodItem.length !== 0
              ? foodItem.filter((item)=>
                (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase()))
              ).map((filteredItems)=>{
                return (
                  <div key={filteredItems._id} className='col-12 col-md-6 col-lg-3'>
                    <Card foodName={filteredItems.name}
                    options={filteredItems.options[0]}
                    img={filteredItems.img}>

                    </Card>
                    </div>
                )
              }):<div>Not found</div>
            }
          </div>
        )
      })
      :""
      
    }
   
    
    
     </div>
    <div> <Footer/> </div>
    </>
  )
}
