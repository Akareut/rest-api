const express = require('express');
const app = express();
const fs = require('fs');

//middleware functions
app.use(express.json())



//create route handlers
app.get('/quotes',(request,response)=>{
    fs.readFile('quotes.json',(err,quotes)=>{
        if(quotes){
            response.send(quotes);
        }else{
            response.send('Quotes Not Found');
        }
    })
   // response.send('List og Quotes');
})

app.post('/quotes',(request,response)=>{
    let newQuote = request.body

    let quotes =[]
    fs.readFile('quotes.json' , (err,data)=>{
        if(data){
            quotes=data
        }else{
            console.log('File Not Found')
        }
    })

    //add newQuote to quotes array
    quotes.push(newQuote);

    //update the quotes.json file
fs.writeFile('quotes.json', JSON.stringify(quotes),(err,data)=>{
    if(data){
        console.log(data)
        response.send('Successfully added new quote');
    }else{
        console.log(data)
        response.send('Failed to add a quote');
    }
})

    //console.log(request.body, 'Request Body')
   
})

//create an individual route handler

app.get('/quotes:quoteId',(request,response)=>{
    response.send('Here is a single quote');
})
app.patch('/quotes:quoteId',(request,response)=>{
    response.send('Updated the quote');
})
app.delete('/quotes:quoteId',(request,response)=>{
    response.send('Deleted the quote');
})

const PORT = 8000;
app.listen(PORT,()=>{
    console.log('Server is listening on:http//:localhost${PORT}')
})
