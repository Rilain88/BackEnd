const  fs = require("fs");

/*
const productos = [
   {
        title:"Pikachu",
        price:150,
        id:1
    },
    {
        title:"Bulbasaur",
        price:100,
        id:2
    },
    {
        title:"Squartle",
        price:100,
        id:3
    },
];
*/

class Contenedor {
    async  save(productos){
        try{
            await fs.promises.writeFile(
                "./productos.txt", 
                JSON.stringify (productos, null , 2),
                "utf-8"
                );
        } catch(e) {
            console.log(e);
        }
    }
    async getAll() {
        try{
            const contenido = await fs.promises.readFile("./productos.txt", "utf-8");
            //console.log(contenido)
            return JSON.parse(contenido);
        } catch (error){}
    }
    async saveNew(productoNuevo){
        const contenido  = await this.getAll();
        const indice = contenido.sort((a, b) => b.id - a.id)[0].id; 
        productoNuevo.id = indice + 1;
        contenido.push(productoNuevo);
        this.save(contenido);

    }
    async getById (id){
        const contenido = await this.getAll();
        const productoBuscado = contenido.filter((producto) => producto.id !== id);
        console.log(productoBuscado);
    }
    async deleteById(id) {
        try {
          const contenido = await this.getAll();
          const parsedData = JSON.parse(contenido);
          const objectIdToBeRemoved = parsedData.find(
            (producto) => producto.id === id
          );
          if (objectIdToBeRemoved) {
        const index = parsedData.indexOf(objectIdToBeRemoved);
        parsedData.splice(index, 1);
        await fs.promises.writeFile(
            "./productos.txt", 
            JSON.stringify (id, null , 2),
            "utf-8"
            );;
      } else {
        console.log(`ID ${id} does not exist in the file`);
        return null;
      }
    } catch (error) {}
  }
  async DeleteAll(){
    try {
        const contenido = fs.unLinkSync("./productos.txt")
    }catch(error){
        console.log("Error")
    }
  }

}

const contenedor = new Contenedor ();
//contenedor.save(productos);
//contenedor.getAll(); 

const productoN  = {
    title:"Chalmander",
    price:200,
};


// contenedor.saveNew(productoN);

// contenedor.getById(2);

// contenedor.deleteById(1);





