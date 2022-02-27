import math
import random
from typing import List
from src import operations
from src.model import TSPInstance

 
def solve(instance: TSPInstance, k_max: int, available_ops: List[operations.Operation]):
    current_cost = instance.get_current_cost()
    log = [{
        "route": instance.route.copy(),
        "step": 0,
        "cost": current_cost
    }]
    for k in range(k_max):
        temp = 1 - k/k_max
        op = random.choice(available_ops)
        new_route = instance.get_neighbor(op)
        new_cost = instance.get_cost(new_route)
        if new_cost < current_cost:
            current_cost = new_cost
            instance.change_route(new_route)
            log.append({
                "route": new_route,
                "step": k+1,
                "cost": new_cost
            })
        else:
            pr = math.exp(-(new_cost - current_cost) / temp)
            rand = random.random()
            if rand < pr:
                instance.change_route(new_route)
                log.append({
                "route": new_route,
                "step": k+1,
                "cost": new_cost
            })
    return log