from fastapi import FastAPI
from routes import CPU_Usage_Route,MEMORY_Usage_Route
app = FastAPI()

app.include_router(CPU_Usage_Route)
app.include_router(MEMORY_Usage_Route)

@app.get('/')
def index():
    return 'Prediction Server Backend api Up and running'
