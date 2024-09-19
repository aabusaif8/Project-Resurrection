async function update(req, res, next) {
    const { comment_id } = req.body.data;
    const { manga_id } = req.params;
    await service.update(manga_id, comment_id);
    res.status(200).json({ data: comment_id });
  }
  
  async function destroy(req,res,next){
      const {comment_id} = req.body.data
      const { manga_id } = req.params;
      const action =await service.destroy(comment_id,manga_id)
      res.json({data:action})
  }
  
  async function create(req, res) {
      const comment = req.body.data;
      const { commentCreation } = await service.create(comment);
      comment.comment_id = commentCreation;
      res.status(201).json({ data: comment });
    }