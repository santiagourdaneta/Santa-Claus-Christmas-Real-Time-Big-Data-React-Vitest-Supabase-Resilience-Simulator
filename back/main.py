from fastapi import FastAPI
from pydantic import BaseModel
import numpy as np

app = FastAPI()

class SimulationInput(BaseModel):
    regalos: int
    clima_factor: float

@app.post("/simular-vuelo")
async def calcular_vuelo(data: SimulationInput):
    # Ecuación de Optimización (Cálculo Numérico)
    # V = sqrt((2 * masa * gravedad) / (densidad_aire * Area * Coeficiente))
    masa_total = 500 + (data.regalos * 0.5) # kg
    gravedad = 9.81
    densidad_aire = 1.225 * data.clima_factor
    
    velocidad_optima = np.sqrt((2 * masa_total * gravedad) / (densidad_aire * 0.5 * 0.4))
    
    # Simulación de Monte Carlo: Probabilidad de éxito del viaje
    iteraciones = 1000
    fallos = np.random.normal(0.1, 0.05, iteraciones)
    prob_exito = (fallos < 0.2).mean() * 100

    return {
        "velocidad": round(velocidad_optima, 2),
        "probabilidad_exito": round(prob_exito, 2),
        "status": "Cálculo Computacional Completado"
    }