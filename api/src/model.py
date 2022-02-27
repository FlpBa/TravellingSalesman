import math
import random
from typing import List, Dict

from src import operations

class Point:
    def __init__(self, _x: float, _y: float):
        self.x = _x
        self.y = _y

    def calculate_distance(self, other):
        return math.sqrt((self.x-other.x)*(self.x-other.x)+(self.y-other.y)*(self.y-other.y))

class Canvas:
    def __init__(self, _points: Dict[str, Point]):
        self.points = _points

class TSPInstance:
    def __init__(self, _canvas: Canvas):
        self.canvas = _canvas
        self.route = list(_canvas.points.keys())
        random.shuffle(self.route)

    def change_route(self, _route: List[str]):
        self.route = _route

    def get_current_cost(self) -> float:
        return self.get_cost(self.route)

    def get_cost(self, route) -> float:
        dist = 0.0
        for i in range(len(route) - 1):
            p1 = self.canvas.points[route[i]]
            p2 = self.canvas.points[route[i+1]]
            dist += p1.calculate_distance(p2)
        dist += self.canvas.points[route[-1]].calculate_distance(self.canvas.points[route[0]])
        return dist

    def get_neighbor(self, operation: operations.Operation) -> List[str]:
        new_route = self.route.copy()
        operation.transform(operation, new_route, random.randint(0, len(new_route) - 1), random.randint(0, len(new_route) - 1))
        return new_route
