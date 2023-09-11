from fastapi import APIRouter
from controller import make_predictions_cpu
router = APIRouter(
    prefix="/model-prdiction-cpu",
    tags=['CPU_prediction']
)


@router.get('/make-prediction_singlepod')
async def make_predictions_cpu(pod_name:str):
    result = await make_predictions_cpu(pod_name)
    return result