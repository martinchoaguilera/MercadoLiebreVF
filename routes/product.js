var express            = require('express');
var router             = express.Router();
let productController  = require('../Controllers/productController');
const product          = require('../Controllers/productController');
const multer           = require('multer');
let path               = require( 'path' );


var storage = multer.diskStorage(
    {
        destination: function (req, file, cb) {
                cb(null, 'public/images')
        },
        filename: function (req, file, cb) {
                cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
        }
  }
);
   
  var upload = multer({ storage: storage });

//S ======> Buscar productos      {SEARCH}
router.get( '/search' , productController.search );

// C =====> Crear Producto        { CREATE }
router.get('/create', productController.create);
router.post('/create', upload.any() ,productController.save);

// R =====> leer producto         { READ }
router.get('/:id', productController.view);

//U ======> Actualizar producto   { UPDATE }
router.get('/edit/:id' , productController.viewEdit);
router.put('/edit/:id' , upload.any(), productController.saveEdit);

//D ======> Borrar producto       { DELETE }
router.delete('/delete/:id', productController.delete);



// router.delete('/:id', productController.delete);

// router.get('/edit' , productController.listadoProductos);
// router.put('/edit/:id' , productController.edit);


module.exports= router;