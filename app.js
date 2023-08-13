const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Welcome to Shaurya Singh's Tech Bytes Blog! Join me in exploring the exciting world of technology through insightful articles, tutorials, and discussions. As a 4th year CSE engineering student, I'll take you on a journey through programming languages, web development, AI, cybersecurity, and the latest tech trends. Let's unravel the mysteries of the digital realm together and stay updated on the ever-evolving tech landscape. Engage in vibrant conversations with fellow enthusiasts in the comments, and don't forget to subscribe for the latest updates. Get ready to dive into the fascinating realm of code and innovation. Happy reading!";

const aboutContent = "I am currently pursuing Computer Science and Engineering from SRM University, equipped withstrong knowledge in C, C++, Python, and frontend web development. With a passion forproblem-solving and excellent skills in Data Structures and Algorithms, I strive for innovativesolutions. Besides my technical abilities, I stay well-informed about the latest geopoliticalissues and enjoy watching web series and listening to podcasts. Sports, particularly cricket andfootball, fascinate me, and I find solace in both Hindi and English music. Known for myconsistency and punctuality, I approach daily activities with dedication and a focus on achieving goals";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let array = [];

app.get("/", (req, res) => {
  res.render("home.ejs", {
    starting: homeStartingContent,
    posts: array
  });
});

app.get("/about", (req, res) => {
  res.render("about.ejs", { about: aboutContent });
});

app.get("/contact", (req, res) => {
  res.render("contact.ejs",);
});

app.get("/compose", (req, res) => {
  res.render("compose.ejs");
});

app.post("/compose", (req, res) => {
  const posts = {
    titles: req.body.title,
    contents: req.body.post
  };

  array.push(posts);
  res.redirect("/");

});

app.get("/blog/:postname", (req, res) => {

  const reqdata = _.toLower(req.params.postname);

  array.forEach(function (post) {
    const storeddata = _.toLower(post.titles);

    if(storeddata === reqdata){

      res.render("post.ejs",{
        titled: post.titles, 
        contended: post.contents
      });
    };
    
  });

});


app.listen(3000, function () {
  console.log("Server started on port 3000");
});
