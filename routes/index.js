module.exports = function(app, Class)

{
    // GET ALL class
    app.get('/api/class', function(req,res){
        Class.find(function(err, classes){
            if(err) return res.status(500).send({error: 'database failure'});
            // var dataobj = {
            //     data : classes
            // }
            res.json(classes);
        })
    });

    // GET SINGLE class
    app.get('/api/class/:mClass_id', function(req, res){
        Class.findOne({_id: req.params.mClass_id}, function(err, classes){ //id값으로 검색하는 로직
            if(err) return res.status(500).json({error: err});
            if(!classes) return res.status(404).json({error: 'Class not found'});
            res.json(classes);
        })
    });

    // GET class BY title
    app.get('/api/class/title/:title', function(req, res){
        Class.find({title: req.params.title}, {_id: 0, tutor: 1, video: 1 , project:1, discussion:1},  function(err, classes){ // {}안에 있는 5개의 항목은 해당 타이틀을 검색했을때, 나오는 데이터
            if(err) return res.status(500).json({error: err});
            if(classes.length === 0) return res.status(404).json({error: 'Class not found'});
            res.json(classes);
        })
    });

    // CREATE class
    app.post('/api/class', function(req, res){
        var mClass = new Class();
        mClass.title = req.body.title;
        mClass.tutor = req.body.tutor;
        mClass.totalDuration = req.body.totalDuration;
        mClass.feedback = req.body.feedback;
        mClass.subscriberCount = req.body.subscriberCount;
        mClass.subScriber = req.body.subScriber;
        mClass.video = req.body.video;
        mClass.project = req.body.project;
        mClass.review = req.body.review;
        mClass.category = req.body.category;
        mClass.relatedClass  = req.body.relatedClass ;
        mClass.discussion  = req.body.discussion ;
        
     

        mClass.save(function(err){
            if(err){
                console.error(err);
                res.json({result: 0});
                return;
            }

            res.json({result: 1});

        });
    });

    // UPDATE THE title
    app.put('/api/class/:title', function(req, res){
        Class.update({ title: req.params.title }, { $set: req.body }, function(err, output){
            if(err) res.status(500).json({ error: 'database failure' });
            console.log(output);
            if(!output.n) return res.status(404).json({ error: 'title not found' });
            res.json( { message: 'title updated' } );
        })

    });

    // DELETE class
    app.delete('/api/class/:mClass_id', function(req, res){
        Class.remove({ _id: req.params.mClass_id }, function(err, output){
            if(err) return res.status(500).json({ error: "database failure" });

            /* ( SINCE DELETE OPERATION IS IDEMPOTENT, NO NEED TO SPECIFY )
            if(!output.result.n) return res.status(404).json({ error: "book not found" });
            res.json({ message: "book deleted" });
            */

            res.status(204).end();
        })
    });
     
}
