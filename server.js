const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore} = require('firebase-admin/firestore');

const express = require("express")
const bp = require("body-parser");
const a = require("alert");

const app =express()

app.use(bp.urlencoded({extended: false}))

var serviceAccount = require("./key.json");

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

app.get("/", (req, res)=>{
    res.sendFile(__dirname + "/page1.html")
})

app.get("/signup", (req, res)=>{
    res.sendFile(__dirname + "/Signup.html")
})

app.post("/signupsubmit", async (req, res) => {
    const email = req.body.email;
    const psw1 = req.body.password1;
    const psw2 = req.body.password2;
    if (psw1 == psw2) {
      await db.collection("userData").add({
        email: email,
        password: psw1
      }).then(() => {
        res.sendFile(__dirname + "/Login.html");
      });
    } else {
      res.send(`
          <script>
            alert('Password doesn't match. Please try again.');
            window.location.href = '/signup';
          </script>
      `);
    }
  });
  

app.get("/login", (req, res)=>{
    res.sendFile(__dirname+"/Login.html")
})

app.post("/loginsubmit", async(req,res)=>{
    const email = req.body.email;
    const psw = req.body.password1;
    await db.collection("userData").where("email", "==", email).where("password", "==", psw).get().then((docs)=>{
        if(!docs.empty){
            res.sendFile(__dirname+"/page2.html");
        }else{res.send(`
          <script>
            alert("Login failed. Please check your credentials.");
            window.location.href = '/login';
          </script>
      `);
    }
    });
});


app.get("/Ecommerce",(req,res)=>{
    res.sendFile(__dirname+"/Ecommerce.html")
})

app.get("/Sellwaste",(req,res)=>{
  res.sendFile(__dirname+"/sellwaste.html");
})

app.get("/Sellcraft",(req,res)=>{
  res.sendFile(__dirname+"/Sellcrafts.html");
})

app.get("/Buycrafts",(req,res)=>{
  res.sendFile(__dirname+"/Buycrafts.html");
})

app.get("/classification",(req,res)=>{
  res.sendFile(__dirname+"/classification.html");
})

app.get("/Learning",(req,res)=>{
  res.sendFile(__dirname+"/learning.html");
})

app.get("/bottel",(req, res)=>{
  res.sendFile(__dirname+"/bottel.html")
})
app.get("/wood",(req, res)=>{
  res.sendFile(__dirname+"/wood.html")
})

app.get("/paper",(req, res)=>{
  res.sendFile(__dirname+"/paper.html")
})

app.get("/plastic",(req, res)=>{
  res.sendFile(__dirname+"/plastic.html")
})

app.get("/adminLog", (req,res)=>{
  res.sendFile(__dirname+"/Adminlogin.html")
})

app.post("/adminloginsubmit",(req, res)=>{
  const email = req.body.uname;
  const psw = req.body.psw;
  const preAdmin = "admin123@gmail.com";
  const preAdminpsw = "12345"
  if(email == preAdmin && psw == preAdminpsw){
    res.sendFile(__dirname+"/adminHome.html");
  }else{
    res.send(`
          <script>
            alert("Login failed. Please check your credentials.");
            window.location.href = '/adminLog';
          </script>`)
  }
})

app.get("/requests", (req,res)=>{
  res.sendFile(__dirname+"/Requests.html")
})

app.get("/adminHome", (req, res)=>{
  res.sendFile(__dirname+"/adminHome.html")
})

app.listen(3000, ()=> console.log("Server Start at Port 3000"))