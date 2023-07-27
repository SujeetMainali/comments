import express from "express";
import bodyParser from "body-parser";
import { v4 as uuid } from "uuid";
import cors from 'cors'
const app = express();
app.use(bodyParser.json());
app.use(cors())

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] || [])
});

app.post("/posts/:id/comments", (req, res) => {
  const commentId = uuid();
  const { content } = req.body;
  const comments = commentsByPostId[req.params.id] || [];
  comments.push({
    id: commentId,
    content,
  });

  commentsByPostId[req.params.id] = comments;

  res.status(200).send(comments)
});

app.listen(4001, () => {
  console.log(`http://localhost:4001`);
});
