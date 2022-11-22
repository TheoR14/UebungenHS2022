import uvicorn
from fastapi import FastAPI, Depends, status, Request, Form
from fastapi.responses import RedirectResponse, HTMLResponse
from fastapi.security import OAuth2PasswordRequestForm
from fastapi_login import LoginManager
from fastapi_login.exceptions import InvalidCredentialsException
from fastapi.templating import Jinja2Templates
import sqlalchemy
import databases

#Crée nouveau DB
database = databases.Database("sqlite:///datenbankuebun08.db")
engine = sqlalchemy.create_engine("sqlite:///datenbankuebun08.db", connect_args={"check_same_thread": False})
metadata = sqlalchemy.MetaData()

notes = sqlalchemy.Table(
    "notes", metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True),
    sqlalchemy.Column("titel", sqlalchemy.String),
    sqlalchemy.Column("text", sqlalchemy.String))

metadata.create_all(engine)


app = FastAPI()
templates = Jinja2Templates(directory="templates/")

manager = LoginManager("jsk2e1urh3fku371", token_url="/auth/login", use_cookie=True)
manager.cookie_name = "ch.fhnw.testapp_hezd736"

#DB avec les users et pwd
DB = {"user1": {"name": "Hans Muster",
                "email": "hanswurst@gmail.com",
                "passwort": "12345"},
      "user2" : {
                "name": "Alexandra Meier",
                "email": "ameier@gmx.net",
                "passwort": "pass"}
    }

@manager.user_loader()
def load_user(username: str):
    user = DB.get(username)
    return user


@app.post("/auth/login")
def login(data: OAuth2PasswordRequestForm = Depends()):
    username = data.username
    password = data.password
    user = load_user(username)

    if not user:
        raise InvalidCredentialsException
    if user['passwort'] != password:
        raise InvalidCredentialsException

    access_token = manager.create_access_token(
        data = {"sub": username}
    )

    resp = RedirectResponse(url="/private", status_code=status.HTTP_302_FOUND) #lorsque OK redirect vers new (des que connecter pouvoir ecrire)
    manager.set_cookie(resp, access_token)

    return resp

@app.get('/')
def read_form():
    return RedirectResponse(url="/login")
    
@app.get("/login")
def login():
    file = open("templates/login.html", encoding="utf-8") #utiliser login.html pour la fenetre login
    data = file.read()
    file.close()
    return HTMLResponse(content=data)

@app.get("/private", response_class=HTMLResponse)
def getSecretPage(user=Depends(manager)):
    return RedirectResponse(url="/new")

@app.on_event("startup")
async def startup():
    print("Verbinde DB")
    await database.connect()

@app.on_event("shutdown")
async def shutdown():
    print("Beende DB Verbindung")
    await database.disconnect()

@app.get("/user/{name}")
async def read_notes():
    query=notes.select()
    return await database.fetch_all(query)

@app.get("/new")    
async def create_note(request: Request):
        return templates.TemplateResponse("form2.html",context={"request": request})

@app.post("/new")
async def post_note(titel=Form(), text=Form()):
    query = notes.insert().values(titel=titel, text=text)
    myid = await database.execute(query)
    return {"id":myid, "titel":titel, "text":text}
    

uvicorn.run(app, host="127.0.0.1", port=7000)