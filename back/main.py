from fastapi import FastAPI

app = FastAPI()

# TODO REMOVE AFTER DEV
app.debug = True


@app.get("/")
def read_root():
    return {"Hello": "World"}
