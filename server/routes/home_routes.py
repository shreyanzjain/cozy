from main import app
from methods import auth

# initial dummy route
@app.get("/{number}")
def home(number: int):
    return f"Hello, {number}"

@app.post("/api/login")
def login(user: str):
    return auth.login(user)