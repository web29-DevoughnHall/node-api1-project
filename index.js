const express = require('express');
const shortId = require('shortid')

const server = express();

server.use(express.json());

let users = [
    {
    id: shortId.generate(), 
    name: "Jane Doe", 
    bio: "Not Tarzan's Wife, another Jane",  
  }
]

server.get('/', (reg, res)=>{
    res.json({api: "api running"})
})

server.get('/api/users', (reg, res)=>{
    res.status(200).json(users)
})

server.post('/api/users', (req,res) => {
    const post = req.body
    post.id = shortId.generate()
    if(!post.name && !post.bio) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
        
    } else if(post.name && post.bio) {
        users.push(post)
        res.status(201).json(users)
    }
    else{
        res.status(500).json({ errorMessage: "There was an error while saving the user to the database"});
    }
})

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const user = users.find(user => user.id == id)
    if(user){
        res.status(200).json(user);
    }else {
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    }

})


server.listen(8000,() => console.group('!!! API is Up !!!'))