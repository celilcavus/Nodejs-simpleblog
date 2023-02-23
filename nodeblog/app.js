//#region express js
// const expres = require("express");
// const app = expres();

// app.set("view engine","ejs");

// app.listen(3000);
// app.get("/", (req, res) => {
//   // res.send("<h1>anasayfa</h1>")
//   res.sendfile("./views/index.html", { root: __dirname });
// });

// app.get("/abaout", (req, res) => {
//   res.sendfile("./views/abaout.html", { root: __dirname });
// });
// app.get("/abaout-us", (req, res) => {
//    res.redirect("/abaout");
//  });

// app.use((req, res) => {
//    res.status(404).sendfile("./views/404.html",{root:__dirname});
// });

//#endregion

const morgan = require("morgan");
const expres = require("express");
const mongs = require("mongoose");
const Blog = require("./models/blogs");

const app = expres();

mongs.set("strictQuery", true);
const dburl = ""; // kendi mongodb bağlantı urlnizi buraya koyarsınız bi sorun yaşamadan çalıştırırsınız..
mongs
  .connect(dburl, { useNewUrlParser: true })
  .then((res) => app.listen(3000))
  .catch((err) => console.log(err));

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use(expres.static("public"));
app.use(expres.urlencoded({extended:true}));//iç içe nesne gönderme
app.use(morgan("dev"));

// app.get("/add", (req, res) => {
//   const blog = new Blog({
//     title: "Yeni Yazı 2",
//     short: "kısa açıklama",
//     long: "uzun açıklama",
//   });

//   blog
//     .save()
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// app.get("/all", (req, res) => {
//   Blog.find()
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// app.get("/getbyId", (req, res) => {
//   Blog.findById("63f79afa45d671fb2f0adf96")
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

app.get("/", (req, res) => {
  Blog.find()
    .then((result) => {
      res.render("index", { blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get('/blog/:id',(req,res)=>{
  const id = req.params.id;
  Blog.findById(id)
  .then((result)=>{res.render("blog",{blog:result})})
  .catch((err)=>{res.render("404")});
})
// .short({ createdAt: -1 })

app.get("/admin",(req,res)=>{
  Blog.find()
  .then((result) => {
    res.render("admin", { blogs: result });
  })
  .catch((err) => {
    console.log(err);
  });
});

app.get("/admin/add",(req,res)=>{
  res.render("add");
});

app.post("/admin/add",(req,res)=>{
  const value = new Blog(req.body);
  value.save()
  .then((result)=>{res.redirect("/admin")})
  .catch((err)=>{alert(`Hata Oluştu Hata ${err}`)})
});


app.delete('/dmin/delete/:id',(req,res)=>{
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
  .then((result)=>{
    res.json({
      link:'/admin'
    })
  })
  .catch((err)=>console.log(err))
});

app.get("/abaout", (req, res) => {
  res.render("abaout", { title: "Anasayfa" });
});

app.use(morgan("dev"));

app.get("/abaout-us", (req, res) => {
  res.redirect("/abaout");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.use((req, res) => {
  res.status(404).render("404");
});
