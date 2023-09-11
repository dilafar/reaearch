from fastapi import APIRouter
from controller import make_pod_predictions_memory
router = APIRouter(
    prefix="/model-prdiction-memory",
    tags=['MEMORY_prediction']
)


@router.get('/make-prediction_singlepod')
async def make_pod_predictions_memory(pod_name:str):
    result = await make_pod_predictions_memory(pod_name)
    return result
