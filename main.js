const requestData = () =>{
    let name = localStorage.getItem("name")
    if(name === null){
      name = prompt("Ingrese su nombre");
    }
    localStorage.setItem("name", name);
    if(name){
      alert(`Bienvenido ${name} a la tienda de peliculas online!`)
      return true
    }
    
}

let movies = [];

fetch("./movies.json")
  .then((res) => res.json())
  .then((data)=>{
    moviesRelative(data)});

const moviesRelative = (data) =>{
movies = data;
const contenedor = document.getElementById("container");
data.forEach((movie,index) =>{
  let card = document.createElement("div");
  card.classList.add("card", "fondo", "col-sm-12", "col-lg-3");
  card.innerHTML =`<img src="${movie.image}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title ">${movie.name}</h5>
    <p class="card-text">$ ${movie.price}</p>
    <p class="card-text"><a href="#" class="btn btn-boton" onClick = "addCart(${index})">Agregar al carrito</a></p>
  </div>`
  contenedor.appendChild(card);
});
};

let modalCarrito = document.getElementById("cart");
let total = 0;

const cartShop = () =>{
modalCarrito.className = "cart";
modalCarrito.innerHTML = "";
if(cart.length > 0){
  cart.forEach((movie, index) => {
    total = total + movie.price * movie.cantidad;
    const cartContainer = document.createElement("div");
    cartContainer.className = "producto-carrito";
    modalCarrito.innerHTML = `
    <img class = "car-img" src = "${movie.image}"/> 
    <div class = "product-details">${movie.name}</div>
    <div class = "product-details"> cantidad: ${movie.cantidad}</div>
    <div class = "product-details"> Precio: $ ${movie.cantidad}</div>
    <div class = "product-details"> subtotal: $ ${movie.cantidad * movie.price}</div>
    <button class = "btn btn-info" id = "remove-product" onClick = "removeMovie(${index})"> Eliminar Pelicula </button>`
    modalCarrito.appendChild(cartContainer)
  })


const totalContainer = document.createElement("div");
totalContainer.className = "total-carrito";
totalContainer.innerHTML = `<div class = "total"> Total $ ${total}</div>
<button class = "btn btn-info finalizar" id = "finalizar" onClick = "checkout()"> REALIZAR LA COMPRA </button>`;
modalCarrito.appendChild(totalContainer);
} else{
modalCarrito.innerHTML = `<h1 class = "carrito_titulo"> Seleccione alguna pelicula para Continuar</h1>`;
}
}

const removeMovie = (index) =>{
  cart.splice(index, 1);
  storage(cart);
  cartShop()
  }

let cart = [];

const addCart = (indexEncontrado) =>{
const indexCart = cart.findIndex((element)=>{
  return element.id === movies [indexEncontrado].id;
});
if(indexCart === -1){
  let productoAgregar = movies[indexEncontrado];
  productoAgregar.cantidad = 1;
  cart.push(productoAgregar);
  storage(cart);
  cartShop();
} else{
  cart[indexCart].cantidad += 1
  storage(cart);
  cartShop();
}
}


function checkout (){
  Swal.fire(
    'Compra Finalizada con Exito',
    'Gracias por su compra! ',
    'success'
  )
}

const storage = (cart) =>{
localStorage.setItem("cart", JSON.stringify(cart));
}

requestData();
























