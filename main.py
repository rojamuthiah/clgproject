from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from uvicorn import run
from clgapi import router as geminirouter

app = FastAPI()

# Allow CORS for your frontend
origins = [
    "http://localhost:5173","http://localhost:5174","http://localhost:5175" # Adjust the port if your frontend runs on a different port
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(geminirouter)

if __name__ == "__main__":
    run("main:app", host="127.0.0.1", port=8000, reload=True)
