exports.upload = function (req,res)
{
    console.dir(req.files);
    res.send('OK');
    res.end();
};