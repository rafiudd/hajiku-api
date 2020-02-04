const express = require('express');
const router = express.Router();
const db = require('../../helpers/db');
const Haji = db.Haji;
const Umrah = db.Umroh;

// routes

router.post('/post/all', create);
router.get('/all', getAll);
router.get('/', getById);
router.delete('/delete', _delete);

module.exports = router;

async function create(req,res) {
    let dataHaji = require('../../data/haji.json');
    let dataUmroh = require('../../data/umrah.json');

    if(req.query.data === "haji") {
        let query = await Haji.insertMany(dataHaji);
   
        let result = res.json(
            {
                "message" : "Success Post Materi Haji" , 
                "code" : 200, 
                "data" : query
            }
        )
        return result
    } else if(req.query.data === "umrah") {
        let query = await Umrah.insertMany(dataUmroh);
   
        let result = res.json(
            {
                "message" : "Success Post Materi Umroh" , 
                "code" : 200, 
                "data" : query
            }
        )
        return result
    }

}

async function getAll(req, res) {
    if(req.query.data === "haji") {
        let query = await Haji.find();
        let result = res.json(
            {
                "message" : "Success Get All Materi Haji" , 
                "code" : 200, 
                "data" : query 
            }
        )
        
        return result
    } else if(req.query.data === "umrah") {
        let query = await Umrah.find();
        let result = res.json(
            {
                "message" : "Success Get All Materi Umroh" , 
                "code" : 200, 
                "data" : query 
            }
        )
        
        return result
    } else if(req.query.data === "discover") {
        let umrah = await Umrah.find({ "isHome" : true });
        let haji = await Haji.find({ "isHome" : true });

        let result = res.json(
            {
                "message" : "Success Get Materi On Discover" , 
                "code" : 200, 
                "data" : umrah.concat(haji) 
            }
        )
        return result

    }
    
}

async function getById(req, res) {
    let model = {
        _id : req.query.id
    }

    if(req.query.data === "haji") {
        let query = await Haji.findById(model._id);
        let result = res.json(
            {
                "message" : "Success Get Haji by Id" , 
                "code" : 200, 
                "data" : query 
            }
        )
        
        return result
    } else if(req.query.data === "umrah") {
        let query = await Umrah.findById(model._id);
        let result = res.json(
            {
                "message" : "Success Get Umrah by Id" , 
                "code" : 200, 
                "data" : query 
            }
        )
        
        return result
    }

   
}

async function _delete(req, res) {
    if(req.query.data === "haji") {
        let query = await Haji.remove();
        let result = res.json(
            {
                "message" : "Success Remove Haji" , 
                "code" : 200, 
                "data" : query
            }
        )
        return result
    } else if(req.query.data === "umrah") {
        let query = await Umrah.remove();
        let result = res.json(
            {
                "message" : "Success Remove Umrah" , 
                "code" : 200, 
                "data" : query
            }
        )
        return result
    }
   
}
