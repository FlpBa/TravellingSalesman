from src.model import Point, Canvas
import random

def generate(k: int, x_min: float, x_max: float, y_min=float, y_max=float) -> Canvas:
    points = {}
    for i in range(k):
        points[str(i)] = Point(random.uniform(x_min, x_max), random.uniform(y_min, y_max))
    return Canvas(points)