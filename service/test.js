const test = (app) => {
    app.get('/test1', (req, res) =>{
        res.send("working fine! #1")
    });
    app.get('/test2', (req, res) =>{
        res.send("working fine! #2")
    });
    app.get('/test3', (req, res) =>{
        res.send("working fine! #3")
    })
};

module.exports = test;