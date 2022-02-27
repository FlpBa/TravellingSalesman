from flask import Flask, request
from src import simulated_annealing, canvas_generator
from src.model import Canvas, Point, TSPInstance
from src.operations import JumpOperation, SwapOperation
import json
from flask_api import status

app = Flask(__name__)

@app.route('/tsp', methods=['POST'])
def solve():
    body = request.get_json()
    points = {}
    for key, el in body.get("points").items():
        points[key] = Point(el["x"], el["y"])
    kmax = body["k_max"] if "k_max" in body else 10
    operations = [SwapOperation, JumpOperation]
    if "operations" in body:
        operations = []
        for op in body["operations"]:
            if op == "swap":
                operations.append(SwapOperation)
            elif op == "jump":
                operations.append(JumpOperation)
            else:
                return "Unknown operation " + op, status.HTTP_400_BAD_REQUEST
    canvas = Canvas(points)
    log = simulated_annealing.solve(TSPInstance(canvas), int(kmax), operations)
    return {"response": log}

@app.route('/points', methods=['GET'])
def get_random_canvas():
    k = request.args.get('k', default=10, type=int)
    x_min = request.args.get('x_min', default=0., type=float)
    x_max = request.args.get('x_max', default=10., type=float)
    y_min = request.args.get('y_min', default=0., type=float)
    y_max = request.args.get('y_max', default=10., type=float)

    canvas = canvas_generator.generate(k, x_min, x_max, y_min, y_max)
    response = app.response_class(
        response=json.dumps(canvas, default=lambda x: x.__dict__),
        status=200,
        mimetype='application/json'
    )
    return response
